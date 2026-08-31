// KAPI 12 — Cikti denetimi.
//
// NEDEN VAR
//   On kapinin tamami markdown KAYNAGI ve frontmatter uzerinde calisiyordu.
//   Hicbiri derlenmis sayfaya bakmiyordu (KAPI 6'nin dist tarafi haric, o da
//   yalnizca "onaysiz icerik yayina girmis mi" diye soruyor). Bu kor noktada
//   iki gercek hata yasadi ve ikisi de butun kapilardan gecti:
//
//     - hakkinda sayfasi kendisiyle celisen bir cumle yayimliyordu
//       ("%100 dogrulama — her 20 iddiadan ~1'i dogrulanamaz").
//     - veri grafiklerinin eksen etiketleri 1000'e bolunup " mr" ile
//       etiketleniyordu; 8,2 milyar kisi "8.231.613,1 mr" olarak okunuyordu.
//       24 veri sayfasinin 8'i etkilenmisti.
//
//   Ikisi de kaynakta degil RENDER'da yasiyordu. Kaynagi denetleyen bir hat,
//   okuyucunun gordugu seyi denetlemis olmuyor.
//
// NE OLCULUR
//   1. Render artigi   — undefined / NaN / [object Object] / Invalid Date gibi
//                        sizintilar sayfa metnine dusmus mu.
//   2. Ic bag butunlugu— dist icindeki her ic href gercek bir sayfaya cikiyor mu.
//                        (KAPI 5 markdown baglarina bakar, render edilenlere degil.)
//   3. Grafik dogrulugu— her veri sayfasinin eksen etiketi, CSV'deki gercek
//                        degerle ve beyan edilen olcekle tutarli mi.
//
//   Ucuncusu bu kapinin asil sebebidir: grafik hatasini yakalayacak tek kontrol
//   budur. Digerleri ucuz ve genel; birlikte "okuyucunun gordugu sayfa" katmanini
//   kapatirlar.
//
//   node araclar/linter-cikti.mjs        (dist/ uzerinde calisir)
import fs from 'node:fs';
import path from 'node:path';
import { Rapor, KOK, makaleleriTopla, varMi, oku } from './ortak.mjs';

const DIST = path.join(KOK, 'dist');

// Site GitHub Pages proje sayfasi olarak bir alt dizinde yayimlanir; derlenmis
// href'ler o taban ile baslar ama dist/ agacinda taban dizini YOKTUR. Taban,
// astro.config.mjs MODUL OLARAK import edilerek okunur — kaynak kodu regex'le
// kazimak, config'teki satir bicimi degistiginde sessizce bos donuyordu
// (2026-08-28 kesif dalgasi bulgusu). Modul importu bicimden bagimsizdir.
const { default: astroConfig } = await import(path.join(KOK, 'astro.config.mjs'));
const TABAN = String(astroConfig?.base || '').replace(/\/+$/, '');
if (!TABAN) {
  // Sessiz ayrisma yasak: taban okunamiyorsa KAPI 12 ic bag denetimi anlamsizlasir.
  throw new Error('linter-cikti: astro.config.mjs base okunamadi — ic bag denetimi calisamaz');
}

/** Derlenmis bir href'i dist/ agacindaki yola cevirir. */
export function tabaniSoy(href) {
  if (!TABAN) return href;
  if (href === TABAN) return '/';
  return href.startsWith(`${TABAN}/`) ? href.slice(TABAN.length) : null;  // null: taban disi ic bag
}

/** Render sizintilari — sayfa METNINDE gorunurse hatadir. */
const SIZINTI = [
  { re: /\bundefined\b/, ad: 'undefined' },
  { re: /\bNaN\b/, ad: 'NaN' },
  { re: /\[object Object\]/, ad: '[object Object]' },
  { re: /\bInvalid Date\b/, ad: 'Invalid Date' },
  { re: /\bnull\b/, ad: 'null' },
  // remark eklentisi bir direktifi tanimazsa okur bu ham sozdizimini gorur.
  // KAPI 14 metnin ulasmasini olcer; bu kapı ise yanlis BICIMDE ulasmasini yakalar.
  { re: /::tartismali\s*\[/, ad: '::tartismali[' },
];

/** HTML'den betik/stil cikarilmis duz metin. */
export function metneCevir(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

function htmlDosyalari(kok) {
  const cikti = [];
  const gez = (d) => {
    for (const g of fs.readdirSync(d, { withFileTypes: true })) {
      const tam = path.join(d, g.name);
      if (g.isDirectory()) { if (g.name !== 'pagefind' && g.name !== '_astro') gez(tam); }
      else if (g.name.endsWith('.html')) cikti.push(tam);
    }
  };
  gez(kok);
  return cikti;
}

/** §12 imza olcegi: eksen etiketinden ve birim beyanindan degeri geri kurar. */
const OLCEK_ADLARI = { trilyon: 1e12, milyar: 1e9, milyon: 1e6, bin: 1e3 };

/** "1.234,5" -> 1234.5  (tr-TR biçimi) */
export function trSayi(s) {
  return Number(String(s).replace(/\./g, '').replace(',', '.'));
}

/**
 * Bir veri sayfasinin en ust y ekseni etiketini, birimde beyan edilen olcekle
 * carpip CSV'deki gercek en buyuk degerle karsilastirir.
 */
export function grafikDenetimi(html, csvEnBuyuk) {
  const tikler = [...html.matchAll(/<text[^>]*grafik__etiket[^>]*>([^<]+)<\/text>/g)].map((m) => m[1].trim());
  const birimM = /<text[^>]*grafik__eksenAd[^>]*>([^<]+)<\/text>/g;
  const birimler = [...html.matchAll(birimM)].map((m) => m[1].trim());
  if (tikler.length === 0 || birimler.length === 0) return null;

  // Y ekseni tikleri once gelir (5 tane), x ekseni tikleri sonra.
  // Birim etiketlerinin SONUNCUSU y ekseni birimidir.
  const yTik = tikler.slice(0, 5);
  const birim = birimler[birimler.length - 1];

  const olcekM = /[(—]\s*(trilyon|milyar|milyon|bin)\s*\)?$/.exec(birim);
  const carpan = olcekM ? OLCEK_ADLARI[olcekM[1]] : 1;

  const enUst = trSayi(yTik[yTik.length - 1]);
  if (!Number.isFinite(enUst)) return { hata: `y ekseni etiketi sayiya cevrilemedi: "${yTik[yTik.length - 1]}"` };

  const ima = enUst * carpan;
  // Tik degerleri yuvarlanir; %2 tolerans bu yuvarlamayi karsilar.
  const sapma = Math.abs(ima - csvEnBuyuk) / csvEnBuyuk;
  return {
    yTik, birim, carpan, ima, gercek: csvEnBuyuk, sapma,
    ok: sapma <= 0.02,
  };
}

export function ciktiDenetimi({ makaleler = makaleleriTopla() } = {}) {
  const r = new Rapor('KAPI 12 — cikti denetimi (dist/)');
  if (!varMi(DIST)) { r.hata('dist/', 'build ciktisi yok — once `astro build`'); return r; }

  const sayfalar = htmlDosyalari(DIST);
  const varOlanYollar = new Set(sayfalar.map((f) => `/${path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/')}`));
  let bagSayisi = 0;
  let grafikSayisi = 0;

  for (const dosya of sayfalar) {
    const goreli = path.relative(KOK, dosya);
    const html = oku(dosya);

    // 1 — render artigi
    const govde = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html)?.[1] ?? html;
    const metin = metneCevir(govde);
    for (const s of SIZINTI) {
      if (s.re.test(metin)) {
        const c = new RegExp(`.{0,45}${s.ad.replace(/[[\]().]/g, '\\$&')}.{0,45}`).exec(metin);
        r.hata(goreli, `render artigi "${s.ad}" sayfa metninde: "…${(c?.[0] || '').trim()}…"`);
      }
    }

    // 2 — ic bag butunlugu (render edilmis href'ler)
    for (const m of html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)"/g)) {
      bagSayisi += 1;
      const ic = tabaniSoy(m[1]);
      if (ic === null) {
        r.hata(goreli, `taban disi ic bag: ${m[1]} — bag() yardimcisindan gecmemis`);
        continue;
      }
      const hedef = ic.endsWith('/') ? ic : `${ic}/`;
      if (varOlanYollar.has(hedef)) continue;
      // Dosya olarak var mi (ornegin /favicon.svg, /veri-setleri/x.csv)?
      if (varMi(path.join(DIST, ic.replace(/^\//, '')))) continue;
      r.hata(goreli, `kirik ic bag: ${m[1]}`);
    }
  }

  // 3 — grafik dogrulugu
  for (const m of makaleler) {
    if (m.ayristirmaHatasi || m.fm.tip !== 'veri' || !m.fm.veri_dosyasi) continue;
    const [tip, ...rest] = m.fm.id.split('-');
    const sayfa = path.join(DIST, tip, rest.join('-'), 'index.html');
    if (!varMi(sayfa)) continue;
    const csv = path.join(KOK, m.fm.veri_dosyasi);
    if (!varMi(csv)) { r.hata(m.goreli, `veri dosyasi yok: ${m.fm.veri_dosyasi}`); continue; }

    const satirlar = oku(csv).trim().split(/\r?\n/).slice(1);
    const degerler = satirlar.map((s) => Number(s.split(',')[1])).filter(Number.isFinite);
    if (degerler.length === 0) { r.hata(m.goreli, `${m.fm.veri_dosyasi}: sayisal deger okunamadi`); continue; }
    const enBuyuk = Math.max(...degerler);

    const g = grafikDenetimi(oku(sayfa), enBuyuk);
    if (!g) continue;
    grafikSayisi += 1;
    if (g.hata) { r.hata(m.goreli, `grafik: ${g.hata}`); continue; }
    if (!g.ok) {
      r.hata(m.goreli, `grafik ekseni gercek veriyle tutmuyor: en ust tik "${g.yTik[g.yTik.length - 1]}" `
        + `× ${g.carpan.toLocaleString('tr-TR')} = ${Math.round(g.ima).toLocaleString('tr-TR')}, `
        + `CSV en buyuk ${Math.round(g.gercek).toLocaleString('tr-TR')} `
        + `(sapma %${(g.sapma * 100).toFixed(1)}; birim beyani: "${g.birim}")`);
    }
  }

  r.ozetSatirlari = [
    `${sayfalar.length} sayfa · ${bagSayisi} ic bag · ${grafikSayisi} grafik ekseni CSV'ye karsi dogrulandi`,
  ];
  return r;
}

if (process.argv[1]?.endsWith('linter-cikti.mjs')) {
  const { RENK } = await import('./ortak.mjs');
  const r = ciktiDenetimi();
  r.yazdir();
  for (const s of r.ozetSatirlari || []) console.log(`   ${RENK.gri(s)}`);
  process.exit(r.gecti ? 0 : 1);
}

/**
 * 4 — Icerik kaybi. Kaynaktaki govde ciktiya ULASTI mi?
 *
 * NEDEN VAR (2026-08-25): sekiz makalede `:::tartismali` blok direktifi
 * kullanildi. remark-directive bunu containerDirective olarak ayristiriyor;
 * remark-eklentileri.mjs dugumu html'e cevirip children'i bosaltiyor ve metin
 * gerekli `harita` parametresi olmadigi icin hicbir yere yazilmadan DUSUYOR.
 *
 * Sonuc: sekiz makalenin en onemli paragrafi — atlasin tartismayi ilan edip
 * hukum vermeyi reddettigi yer — kaynakta duruyor, sayfada yoktu. On kapilarin
 * hicbiri bunu goremezdi:
 *   KAPI 2/3 markdown govdesinde metni GORUYOR ve kaynakli sayiyor
 *   KAPI 11 metni kelime sayimina KATIYOR — makale olculdugunden kisa
 *   KAPI 12 render artigi ve kirik bag ariyordu, EKSIK icerik degil
 *
 * OLCUM BICIMI: birebir dize eslesmesi kullanilmaz. Dipnot ust simgeleri
 * ciktida rakama donustugu icin birebir karsilastirma 248 yanlis pozitif
 * uretti. Bunun yerine her kaynak paragrafinin AYIRT EDICI kelimeleri
 * (6 harften uzun) sayfada aranir; ortusme orani esigin altina duserse
 * paragraf kayip sayilir.
 */
const KAYIP_ESIK = 0.5;

/**
 * Bilinen, kok nedeni cozulmemis icerik kaybi.
 *
 * Su an BOS. Tek kayit olan olay-cernobil 2026-08-25'te cozuldu: kok neden
 * remark-directive'in `:X` desenini metin direktifi saymasiydi (bkz.
 * araclar/remark-eklentileri.mjs). Liste, ileride kok nedeni hemen
 * cozulemeyen bir kayip cikarsa diye duruyor; doldurmak bir gevsetme degil,
 * borcun isaretlenmesidir ve MUDAHALE-GEREKLI.md'ye de yazilir.
 */
const BILINEN_KAYIP = new Set();

export function icerikKaybi({ makaleler }) {
  const r = new Rapor('KAPI 14 — icerik kaybi (kaynak -> dist)');
  let olculen = 0;
  let kayipli = 0;

  for (const m of makaleler) {
    if (m.ayristirmaHatasi || !m.fm.id) continue;
    const [tip, ...rest] = m.fm.id.split('-');
    const sayfa = path.join(DIST, tip, rest.join('-'), 'index.html');
    if (!varMi(sayfa)) continue;
    olculen += 1;
    const ciktiKelimeler = new Set(kelimele(metneCevir(oku(sayfa))));

    const paragraflar = m.govde
      .replace(/```[\s\S]*?```/g, ' ')
      .split(/\n\s*\n/)
      .map((x) => x.trim())
      .filter((x) => x && !x.startsWith('#') && !x.startsWith('|'));

    for (const par of paragraflar) {
      const kelimeler = [...new Set(kelimele(kayipKarsilastirmaMetni(par)))].filter((k) => k.length > 6);
      if (kelimeler.length < 5) continue;
      const bulunan = kelimeler.filter((k) => ciktiKelimeler.has(k)).length;
      const oran = bulunan / kelimeler.length;
      if (oran < KAYIP_ESIK) {
        kayipli += 1;
        const mesaj = `paragraf ciktida yok (%${Math.round(oran * 100)} ortusme): "${par.slice(0, 60).replace(/\s+/g, ' ')}…"`;
        if (BILINEN_KAYIP.has(m.fm.id)) r.uyari(m.goreli, `${mesaj} — BILINEN, MUDAHALE-GEREKLI.md'de kayitli`);
        else r.hata(m.goreli, mesaj);
        break;
      }
    }
  }

  r.ozetSatirlari = [`${olculen} sayfa karsilastirildi · icerigi ciktiya ulasmayan makale: ${kayipli}`];
  r.olcum = { olculen, kayipli };
  return r;
}

/**
 * Kaynaktaki leaf direktifinin sözdizimi ve `harita` hedefi HTML'de görünür
 * metin değildir. İçerik-kaybı karşılaştırması yalnız okurun gördüğü çağrı
 * cümlesini ölçmelidir; aksi hâlde kısa fakat eksiksiz çağrılar yanlış pozitif
 * üretir.
 */
export function kayipKarsilastirmaMetni(paragraf) {
  return String(paragraf || '').replace(
    /^::tartismali\[([\s\S]+)\]\{harita=[^}\s]+\}$/i,
    '$1',
  );
}

/** Karsilastirilabilir kelime dizisi: kucuk harf, noktalama ve rakam yok. */
function kelimele(s) {
  return String(s || '')
    .toLocaleLowerCase('tr')
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}
