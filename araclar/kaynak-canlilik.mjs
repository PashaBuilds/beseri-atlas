// KAPI 8 — Kaynak canliligi  : her kaynak URL'i HTTP 200 donmeli.
// KAPI 10 — Uydurma kaynak     : kunyedeki baslik fetch edilen sayfada gecmeli.
//
// NOT (bilincli sertlik): bot korumasi nedeniyle 403 donen siteler (ornegin
// Britannica) bu kapidan gecemez. Kapiyi gevsetmek yerine o siteler
// kaynak-havuzu.yaml'da `dogrulanabilir: false` olarak isaretlenir ve
// kunyede kullanilmazlar. Bkz. §15 "Kapiyi gevsetmek" yasagi.
//
// OLU ile OLCULEMEDI ayrimi (2026-08-23):
//   kalici 4xx -> kaynak erisilemez. HATA. Kunyede kullanilamaz.
//   202 / 408/425/429 / 5xx / baglanti hatasi -> sunucunun O ANKI durumu.
//   "Olu" degil "olcemedim".
//
// Bu ayrim projenin kendi ilkesidir; turet.mjs ayni cumleyi kuruyor:
// "Turetilemeyen iddia bir CURUTME DEGILDIR." Gecici bir kesintiyi olu link
// saymak, kapiyi sert degil YANLIS yapar — olcmedigi seyi olctugunu sanir.
//
// Ama "olcemedim" sonsuza kadar bedava degildir. Olculemeyen her URL
// denetim/olculemeyen.json defterine ilk gorulme tarihiyle yazilir; OLCULEMEZ_
// SABIR_GUN gun boyunca olculemeyen URL HATA olur. Bir haftadir erisilemeyen
// kaynak gecici kesinti degil, kullanilamaz kaynaktir. Ayrica olculemeyenlerin
// orani tavani asarsa kapi kirilir: o noktada basarisiz olan sey korpus degil
// olcumun kendisidir ve "gecti" demek yanlis beyan olur.
import path from 'node:path';
import { Rapor, makaleleriTopla, yamlOku, oku, yaz, varMi, ICERIK, KOK } from './ortak.mjs';
import { geciciHttpDurumuMu, getir, normalize } from './getir.mjs';

// Ayni alan adina paralel baglanmak sitenin hiz sinirlamasini tetikliyor ve
// kapi kendi trafigi yuzunden kiriliyordu. Es zamanlilik artik FARKLI alan
// adlari arasinda; ayni alana istekler sirayla ve araliklarla gider.
const ESZAMANLI_ALAN = 6;
const AYNI_ALAN_ARALIK_MS = 600;

const OLCULEMEZ_SABIR_GUN = 7;
const OLCULEMEZ_TAVAN_ORAN = 0.20;
const DEFTER = path.join(KOK, 'denetim', 'olculemeyen.json');

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

function defterOku() {
  if (!varMi(DEFTER)) return {};
  try { return JSON.parse(oku(DEFTER)); } catch { return {}; }
}
function defterYaz(d) {
  yaz(DEFTER, `${JSON.stringify(d, null, 2)}\n`);
}

/** Kunyeden sayfada aranacak dizeyi turetir. */
export function dogrulamaDizesi(kaynak) {
  if (kaynak.dogrulama_dizesi) return kaynak.dogrulama_dizesi;
  const ad = kaynak.ad || '';
  // "Kaynak Adi — Sayfa Basligi" formatinda ise sag taraf daha ayirt edicidir.
  const parcalar = ad.split(/\s[—–-]\s/);
  return (parcalar.length > 1 ? parcalar[parcalar.length - 1] : ad).trim();
}

/** Aranan dize sayfa metninde geciyor mu? Tam eslesme yoksa kelime orani bakilir. */
export function dizeGeciyorMu(sayfaMetni, dize) {
  const s = normalize(sayfaMetni);
  const d = normalize(dize);
  if (!d) return { ok: false, oran: 0 };
  if (s.includes(d)) return { ok: true, oran: 1 };
  const kelimeler = d.split(' ').filter((k) => k.length > 3);
  if (kelimeler.length === 0) return { ok: false, oran: 0 };
  const bulunan = kelimeler.filter((k) => s.includes(k)).length;
  const oran = bulunan / kelimeler.length;
  return { ok: oran >= 0.8, oran };
}

export async function canlilikDenetimi(makaleler, { taze = false, izinliHavuz = null } = {}) {
  const r8 = new Rapor('KAPI 8 — kaynak canliligi');
  const r10 = new Rapor('KAPI 10 — uydurma kaynak kontrolu');
  const havuz = izinliHavuz || yamlOku(path.join(ICERIK, '_sistem', 'kaynak-havuzu.yaml'));
  const kara = (havuz?.blacklist || []).map((b) => (typeof b === 'string' ? b : b.alan));
  const dogrulanamaz = (havuz?.whitelist || []).filter((w) => w.dogrulanabilir === false).map((w) => w.alan);

  const gorulen = new Map();
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    for (const k of m.fm.kaynaklar || []) {
      if (!k.url) continue;
      let alan;
      try { alan = new URL(k.url).hostname.replace(/^www\./, ''); } catch {
        r8.hata(m.goreli, `${k.anahtar}: gecersiz URL "${k.url}"`); continue;
      }
      if (kara.some((b) => b && alan.includes(b))) {
        r8.hata(m.goreli, `${k.anahtar}: kara listedeki alan adi "${alan}" (§8)`);
        continue;
      }
      if (dogrulanamaz.some((b) => b && alan.includes(b))) {
        r8.hata(m.goreli, `${k.anahtar}: "${alan}" bot korumasi nedeniyle programatik dogrulanamiyor — kunyede kullanilamaz`);
        continue;
      }
      if (!gorulen.has(k.url)) gorulen.set(k.url, []);
      gorulen.get(k.url).push({ m, k });
    }
  }

  const urller = [...gorulen.keys()];

  // Alan adina gore kumele; her alanin kendi sirasi var.
  const alanKuyruklari = new Map();
  for (const u of urller) {
    const a = new URL(u).hostname;
    if (!alanKuyruklari.has(a)) alanKuyruklari.set(a, []);
    alanKuyruklari.get(a).push(u);
  }

  const cevaplar = new Map();
  const alanlar = [...alanKuyruklari.keys()];
  let siradaki = 0;
  async function isci() {
    while (siradaki < alanlar.length) {
      const liste = alanKuyruklari.get(alanlar[siradaki++]);
      let oncekiAgdanGeldi = false;
      for (const u of liste) {
        // Onbellekten donen cevap sunucuya dokunmaz; bekleme yalnizca gercek
        // istekler arasinda gerekir, aksi halde onbellekli kosu bosuna yavaslar.
        if (oncekiAgdanGeldi) await bekle(AYNI_ALAN_ARALIK_MS);
        const s = await getir(u, { taze });
        oncekiAgdanGeldi = !s.onbellek;
        cevaplar.set(u, s);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(ESZAMANLI_ALAN, alanlar.length) }, isci));

  const defter = defterOku();
  const simdi = Date.now();
  const olculemeyenler = [];
  let birebir = 0; let ortusme = 0; const ortusmeOrnekleri = [];

  for (const u of urller) {
    const s = cevaplar.get(u);
    const olculemedi = s.durum === 0 || geciciHttpDurumuMu(s.durum);

    if (olculemedi) {
      const kayit = defter[u] || { ilk_gorulme: new Date(simdi).toISOString(), kez: 0 };
      kayit.kez += 1;
      kayit.son_gorulme = new Date(simdi).toISOString();
      kayit.son_durum = s.durum === 0 ? (s.hata || 'baglanti hatasi') : `HTTP ${s.durum}`;
      defter[u] = kayit;

      const gun = (simdi - Date.parse(kayit.ilk_gorulme)) / 86400000;
      olculemeyenler.push({ url: u, gun, kayit });
      if (gun > OLCULEMEZ_SABIR_GUN) {
        for (const { m, k } of gorulen.get(u)) {
          r8.hata(m.goreli, `${k.anahtar}: ${Math.floor(gun)} gundur olculemiyor (${kayit.son_durum}) — kaynak degistirilmeli: ${u}`);
        }
      }
      continue;
    }

    // Olculdu: defterden dusur, sonucu yargila.
    delete defter[u];
    for (const { m, k } of gorulen.get(u)) {
      if (s.durum !== 200) {
        r8.hata(m.goreli, `${k.anahtar}: HTTP ${s.durum} — ${u}`);
        continue;
      }
      const dize = dogrulamaDizesi(k);
      const kontrol = dizeGeciyorMu(`${s.baslik || ''} ${s.metin || ''}`, dize);
      if (!kontrol.ok) {
        r10.hata(m.goreli, `${k.anahtar}: kunye dizesi sayfada bulunamadi (eslesme %${Math.round(kontrol.oran * 100)}) — aranan: "${dize}"`);
      } else if (kontrol.oran === 1) {
        birebir += 1;
      } else {
        // Geri dusus: dize birebir gecmiyor, kelimelerinin %80'i geciyor.
        // Bu "gecti" sayilir ama BIREBIR DOGRULAMA DEGILDIR ve sayilmadan
        // gecerse kapinin verdigi guvence tasidigindan buyuk gorunur.
        ortusme += 1;
        ortusmeOrnekleri.push(`${m.fm.id}/${k.anahtar} %${Math.round(kontrol.oran * 100)}`);
      }
    }
  }

  defterYaz(defter);

  // Olculemeyenler sessizce gecmez: her kosuda gorunur.
  const oran = urller.length ? olculemeyenler.length / urller.length : 0;
  r8.ozetSatirlari = [
    `${urller.length} benzersiz URL · ${alanlar.length} alan adi · olculemeyen ${olculemeyenler.length} (%${(oran * 100).toFixed(1)})`,
    ...olculemeyenler
      .sort((a, b) => b.gun - a.gun)
      .slice(0, 10)
      .map((o) => `  ${o.kayit.son_durum} · ${o.gun < 1 ? 'bugun' : `${Math.floor(o.gun)} gundur`} · ${o.url}`),
  ];
  r8.olcum = { url: urller.length, alan: alanlar.length, olculemeyen: olculemeyenler.length, oran: Number(oran.toFixed(4)) };

  if (oran > OLCULEMEZ_TAVAN_ORAN) {
    r8.hata('denetim/olculemeyen.json',
      `URL'lerin %${(oran * 100).toFixed(1)}'i olculemedi (tavan %${OLCULEMEZ_TAVAN_ORAN * 100}) — basarisiz olan korpus degil olcumun kendisi; "gecti" demek yanlis beyan olur`);
  }

  const dogrulanan = birebir + ortusme;
  r10.ozetSatirlari = [
    `dogrulanan kunye dizesi: ${dogrulanan} — birebir gecen ${birebir}, yalnizca kelime ortusmesiyle gecen ${ortusme}`,
    ortusme
      ? `  kelime ortusmesi tam dogrulama DEGILDIR; ornekler: ${ortusmeOrnekleri.slice(0, 5).join(' · ')}`
      : '  geri dusus hic kullanilmadi — her dize sayfada birebir duruyor',
  ];
  r10.olcum = { dogrulanan, birebir, ortusme };

  return { r8, r10, kontrolEdilen: urller.length, olculemeyen: olculemeyenler.length };
}

// process.argv[1], modul `node -e` ile import edildiginde TANIMSIZDIR; korumasiz
// okuma modulu import aninda cokertiyordu. Iki kol da opsiyonel zincirle okur.
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || process.argv[1]?.endsWith('kaynak-canlilik.mjs')) {
  const taze = process.argv.includes('--taze');
  const makaleler = makaleleriTopla();
  const { r8, r10, kontrolEdilen } = await canlilikDenetimi(makaleler, { taze });
  console.log(`${kontrolEdilen} benzersiz URL kontrol edildi\n`);
  r8.yazdir();
  for (const s of r8.ozetSatirlari || []) console.log(`   ${s}`);
  r10.yazdir();
  process.exit(r8.gecti && r10.gecti ? 0 : 1);
}
