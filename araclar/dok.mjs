// Kaynak dokumu — ajanlarin ara dosya yazmadan kaynak metnine bakmasi icin.
//
// 2026-08-29: IKI ayri kor hakem, ortak scratchpad dizininde dosya adi
// cakismasi yasadi. Jenerik adlarla (k1.txt ... k9.txt) kaynak dokerken
// paralel calisan baska bir oturum ayni adlari uzerine yazdi; bir hakemin
// `k1.txt`si bir ara Nanking Antlasmasi'na, `k4.txt`si bir Hansard
// tutanagina donustu. Bu, kor hakem icin en tehlikeli hata sinifidir:
// dogrulama dizesi sessizce "bulunamadi" doner ve hakem saglam bir kunyeyi
// haksiz yere celisir'e dusurur — ya da tersi, YANLIS sayfada "dogrulama"
// yapar. getir.mjs'in kendi `k.url !== url` korumasi bu vakayi yakalamaz,
// cunku bozulma onbellekte degil ajanin yazdigi dosyada olur.
//
// Cozum: ajan hic ara dosya yazmasin. Bu arac kaynak metnini dogrudan
// onbellekten (ya da gerekirse agdan) okur ve istenen parcayi basar.
//
//   node araclar/dok.mjs <url>                        metnin tamami
//   node araclar/dok.mjs <id> <anahtar>               kunyeden URL cozulur
//   node araclar/dok.mjs <hedef...> --ara "<dize>"    gecip gecmedigi + baglam
//   node araclar/dok.mjs <hedef...> --dilim 1000 2000 karakter araligi
//   node araclar/dok.mjs <hedef...> --satir "^World,"  satir suzgeci
//   node araclar/dok.mjs <hedef...> --tam            400k sinirini as (onbellege yazmaz)
import { makaleleriTopla } from './ortak.mjs';
import { getir } from './getir.mjs';
import { dizeGeciyorMu } from './kaynak-canlilik.mjs';

const normalizeBosluk = (s) => String(s).toLowerCase().replace(/\s+/g, ' ').trim();

const argv = process.argv.slice(2);
function bayrak(ad, adet = 1) {
  const i = argv.indexOf(ad);
  if (i === -1) return null;
  const degerler = argv.slice(i + 1, i + 1 + adet);
  argv.splice(i, 1 + adet);
  return adet === 1 ? degerler[0] : degerler;
}
const ara = bayrak('--ara');
const satirDeseni = bayrak('--satir');
const dilim = bayrak('--dilim', 2);
const taze = argv.includes('--taze');
const tam = argv.includes('--tam');
const hedefler = argv.filter((a) => !a.startsWith('--'));

if (hedefler.length === 0) {
  console.error('kullanim: node araclar/dok.mjs <url> | <id> <anahtar>  [--ara "dize"] [--dilim bas son] [--satir desen] [--taze] [--tam]');
  process.exit(1);
}

let url = hedefler[0];
let kunye = null;
if (!/^https?:\/\//.test(url)) {
  const [id, anahtar] = hedefler;
  const m = makaleleriTopla().find((x) => x.fm.id === id);
  if (!m) { console.error(`dok: makale yok — ${id}`); process.exit(1); }
  const k = (m.fm.kaynaklar || []).find((x) => x.anahtar === anahtar);
  if (!k) {
    console.error(`dok: ${id} kunyesinde ${anahtar} yok — mevcut: ${(m.fm.kaynaklar || []).map((x) => x.anahtar).join(', ')}`);
    process.exit(1);
  }
  kunye = k; url = k.url;
}

// --tam: 400k onbellek sinirini asar. Buyuk OCR ciltlerinde (bir hakem 510k
// ve 1,67M karakterlik iki cilt bildirdi) iddialar sinirin otesinde kaliyor ve
// dogrulanamiyordu. Bu kip dogrudan okur ve ONBELLEGE YAZMAZ — onbellegin
// 400k'lik tutarli kaydi bozulmasin diye.
let s; let metin;
if (tam) {
  // --tam kendi onbellegini tutar. Ilk surum hic yazmiyordu ve bir hakem
  // art arda cagrilarda archive.org'un baglantiyi dusurdugunu bildirdi
  // (UND_ERR_CONNECT_TIMEOUT). Ayri dizin kullanilir ki getir.mjs'in
  // 400k'lik tutarli kaydi bozulmasin.
  const { createHash } = await import('node:crypto');
  const fs = await import('node:fs');
  const pathm = await import('node:path');
  const { KOK } = await import('./ortak.mjs');
  const dizin = pathm.join(KOK, 'denetim', '.onbellek-tam');
  const yol = pathm.join(dizin, `${createHash('sha1').update(url).digest('hex')}.txt`);
  let ham = null;
  if (!taze && fs.existsSync(yol)) {
    const kayit = JSON.parse(fs.readFileSync(yol, 'utf8'));
    if (kayit.url === url) { ham = kayit.ham; s = { durum: kayit.durum, onbellek: true, kesildi: false }; }
  }
  if (ham === null) {
    // Yeniden deneme ve acik geri dusus. 2026-08-29, Thukydides hakemi:
    // archive.org bir dugum konagini (dn760109.eu.archive.org) dusurdu,
    // fetch ConnectTimeout ile firlatti ve arac hic cikti vermeden coktu.
    // Ajan bunu "dize bulunamadi" sanabilirdi — en tehlikeli hata sinifi.
    // archive.org `_djvu.txt` isteklerini her seferinde baska bir dugume
    // yonlendirir; ayni URL'i tekrar denemek cogu zaman calisan bir dugum
    // verir. Uc deneme de duserse ONBELLEKTEKI 400k penceresine dusulur ve
    // bunun bir --tam sonucu OLMADIGI yuksek sesle yazilir.
    let sonHata = null;
    for (let i = 0; i < 3 && ham === null; i++) {
      try {
        const kontrol = new AbortController();
        const zamanlayici = setTimeout(() => kontrol.abort(), 60000);
        try {
          const y = await fetch(url, { headers: { 'user-agent': 'beseri-atlas/dok' }, signal: kontrol.signal });
          const govde = await y.text();
          ham = govde;
          s = { durum: y.status, onbellek: false, kesildi: false };
        } finally { clearTimeout(zamanlayici); }
      } catch (e) {
        sonHata = e?.cause?.code || e?.name || e?.message;
        process.stderr.write(`# --tam deneme ${i + 1}/3 dustu: ${sonHata}\n`);
        if (i < 2) await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
      }
    }
    if (ham === null) {
      process.stderr.write(`# --tam BASARISIZ (${sonHata}). 400k onbellek penceresine dusuluyor.\n`);
      process.stderr.write('# DIKKAT: asagidaki sonuc bir --tam sonucu DEGILDIR. Bu pencerede\n');
      process.stderr.write('#         bulunamayan bir dize kaynakta VAR olabilir; kunyeyi bu\n');
      process.stderr.write('#         ciktiya bakarak DUSURME, once --tam ile yeniden dene.\n');
      const yedek = await getir(url, { taze: false });
      ham = String(yedek.metin ?? '');
      s = { durum: yedek.durum, onbellek: true, kesildi: true, tamDustu: true };
    } else {
      fs.mkdirSync(dizin, { recursive: true });
      const gecici = `${yol}.${process.pid}.tmp`;
      fs.writeFileSync(gecici, JSON.stringify({ url, durum: s.durum, ham }));
      fs.renameSync(gecici, yol);
    }
  }
  metin = ham
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ');
} else {
  s = await getir(url, { taze });
  metin = String(s.metin ?? '');
}
const bas = (s) => process.stderr.write(`${s}\n`);
bas(`# ${url}`);
bas(`# durum ${s.durum} · ${metin.length} karakter${s.kesildi ? ' · 400k SINIRINDA KESILDI' : ''}${s.onbellek ? ' · onbellekten' : ' · agdan'}`);
if (s.kesildi && !tam) {
  // Onbellege giren surum ham metinden UZUN olabilir (HTML/ust bilgi kalintisi)
  // ve bu yuzden gercek metnin sonu pencerenin disinda kalir. Bir ajan tam
  // olcumu bunu gosterdi: onbellekte 400.000, --tam ile 365.002 karakter.
  bas('# UYARI: bu pencerede bulunamayan bir dize, kaynakta VAR olabilir. Kesin');
  bas('#        hukum icin --tam ile yeniden oku (onbellege yazmaz).');
}
// ETIKETLEME KURALI (2026-08-29 hakem bulgusu): dizeGeciyorMu, kelimelerin
// tamami gectiginde de oran 1 dondurebilir; onceki surum bunu "BIREBIR"
// diye etiketliyordu ve bir kor hakem "money supply fell 35" aramasinin
// BIREBIR dondugunu, oysa sayfada "The money supply had fallen 35 percent"
// yazdigini bildirdi. Yanlis "dogruladim" hukmu bu araci degersizlestirir.
// Artik BIREBIR yalnizca gercek alt-dize eslesmesinde yazilir.
// Ham PDF sozdizimi isaretleri. 2026-08-29, Thukydides hakemi: bir Crossref
// kaydinin PDF baglantisi 200 dondu ama metin cikarilamadi; govde
// "/XHeight 250 /Leading 42" gibi PDF ic yapisiydi. Arac bunu sessizce
// "%0 kelime ortusmesi" diye gosterdi — yani saglam bir kunyeyi haksiz
// dusurmeye davetiye. Artik ayri bir durum olarak bildiriliyor.
const HAM_PDF = /%PDF-|\/(XHeight|Leading|FontBBox|MediaBox|Linearized)\b|\bendobj\b|\bstream\s*$/m;
export function hamPdfMi(metinK) {
  const bas1k = String(metinK || '').slice(0, 4000);
  return HAM_PDF.test(bas1k);
}

const etiket = (metinK, dize) => {
  if (hamPdfMi(metinK)) {
    return {
      yazi: 'METIN CIKARILAMADI — govde ham PDF sozdizimi; dize aramasi ANLAMSIZ. '
        + 'Bu bir "gecmiyor" DEGILDIR: kunyeyi bu sonuca bakarak dusurme. '
        + 'Yayincinin HTML surumunu ya da baska bir tam metin ucunu dene.',
      ok: false, cikarilamadi: true,
    };
  }
  const k = dizeGeciyorMu(metinK, dize);
  const birebir = normalizeBosluk(metinK).includes(normalizeBosluk(dize));
  if (birebir) return { yazi: 'BIREBIR ALT-DIZE', ok: true };
  if (k.ok) return { yazi: `alt-dize DEGIL — kelime ortusmesi %${Math.round(k.oran * 100)}`, ok: true };
  return { yazi: `GECMIYOR (kelime ortusmesi %${Math.round(k.oran * 100)})`, ok: false };
};
if (kunye?.dogrulama_dizesi) {
  bas(`# kunye dizesi: ${etiket(metin, kunye.dogrulama_dizesi).yazi}`);
}

if (satirDeseni) {
  const re = new RegExp(satirDeseni);
  const satirlar = metin.split('\n').filter((l) => re.test(l));
  bas(`# --satir "${satirDeseni}" → ${satirlar.length} satir`);
  metin = satirlar.join('\n');
}

if (ara) {
  const e = etiket(metin, ara);
  bas(`# --ara → ${e.yazi}`);
  // --tam ILE ONBELLEK FARKLI METIN DONDUREBILIR (2026-08-29 hakem olcumu):
  // archive.org'da onbellek kopyasinda kitabin onsozu varken --tam ile agdan
  // gelen OCR onsozsuz basliyordu; kunye dizesi orada "bulunamadi" donuyordu.
  // --tam "siniri asar" diye guvenilirse saglam bir kunye haksiz yere
  // dusurulur. Bu yuzden --tam kipinde ONBELLEK SURUMU DE sinanir ve iki
  // hukum birlikte basilir. KAPININ GORDUGU SURUM ONBELLEKTEKIDIR.
  if (tam) {
    try {
      const o = await getir(url);
      const onbellekMetin = String(o.metin ?? '');
      const oe = etiket(onbellekMetin, ara);
      bas(`# --ara (onbellek surumu, KAPININ GORDUGU) → ${oe.yazi}`);
      // --tam BAZEN ONBELLEKTEN DAHA KISA METIN DONDURUR (2026-08-29
      // olcumu: bir ciltte onbellek 400k, --tam 259k). "Siniri asar"
      // beklentisi bu durumda yaniltir; acikca soylenmeli.
      if (metin.length < onbellekMetin.length) {
        bas(`# UYARI: --tam (${metin.length}) onbellekten (${onbellekMetin.length}) DAHA KISA metin`);
        bas('#        dondurdu. Bu kaynakta --tam pencereyi genisletmiyor, daraltiyor.');
      }
      if (oe.ok !== e.ok) {
        bas('# UYARI: tam metin ile onbellek AYNI SONUCU VERMIYOR. Iki surum');
        bas('#        farkli olabilir (OCR, yonlendirme, onsoz). Kunye kararini');
        bas('#        kapinin gordugu surume gore ver.');
      }
    } catch { bas('# (onbellek surumu okunamadi)'); }
  }
  // BAGLAM PENCERESI HUKUMLE AYNI ESLESMEDEN GELMELI (2026-08-29 ajan
  // bulgusu): onceki surum hukmu normalize edilmis metinden veriyor, baglami
  // ise HAM metinde bir parca arayarak buluyordu. Ikisi ayrildiginda arac
  // "BIREBIR ALT-DIZE" deyip aranan dizeyi ICERMEYEN bir pencere basiyordu —
  // hakemin saglam bir kunyeyi haksiz yere dusurmesine yol acabilir.
  // OCR VARYANTI GERI DUSUSU (2026-08-29 hakem bulgusu): archive.org
  // taramalarinda tek harf bozulmasi yaygin ("Phalguna" -> "Phdlguna",
  // "nusantara" -> "niisantara"). Dize bulunamadiginda arama basarisiz
  // sayilirsa kor hakem SAGLAM bir kunyeyi haksiz yere dusurur. Bu yuzden
  // basarisizlikta, sorgunun uzun sozcukleri tek harf toleransiyla yeniden
  // aranir ve bulunanlar RAPOR EDILIR — hukum degistirilmez, hakeme
  // "OCR varyanti olabilir" diye bilgi verilir.
  if (!e.ok) {
    const sozcukler = [...new Set(ara.split(/\s+/).map((w) => w.replace(/[^\p{L}\p{N}]/gu, '')).filter((w) => w.length >= 5))];
    const bulgular = [];
    for (const w of sozcukler.slice(0, 6)) {
      if (metin.includes(w)) { bulgular.push(`${w}: birebir var`); continue; }
      // Tek konumda herhangi bir karakter: w.length kadar desen, ucuz.
      for (let i = 0; i < w.length; i += 1) {
        const desen = new RegExp(`${w.slice(0, i).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.${w.slice(i + 1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'u');
        const m2 = desen.exec(metin);
        if (m2) { bulgular.push(`${w}: OCR varyanti "${m2[0]}" (konum ${m2.index})`); break; }
      }
    }
    if (bulgular.length) {
      bas('# OCR TARAMASI (hukum degismedi, bilgi):');
      for (const b of bulgular) bas(`#   ${b}`);
      bas('#   Varyant bulunduysa kunye SAGLAM olabilir; --satir ile kok parcayi tara.');
    }
  }

  const hamIndeks = metin.indexOf(ara);
  if (hamIndeks !== -1) {
    bas('--- baglam (ham metin) ---');
    console.log(metin.slice(Math.max(0, hamIndeks - 300), hamIndeks + 500));
  } else {
    // Ham metinde birebir yok; hukum normalize edilmis metinden geldiyse
    // baglami da ORADAN goster ve normalize oldugunu SOYLE.
    const nMetin = normalizeBosluk(metin);
    const nAra = normalizeBosluk(ara);
    const j = nMetin.indexOf(nAra);
    if (j !== -1) {
      bas('--- baglam (normallestirilmis metin; ham metinde birebir yok) ---');
      console.log(nMetin.slice(Math.max(0, j - 300), j + 500));
    } else {
      bas('--- baglam yok: dize ne ham ne normallestirilmis metinde bulundu ---');
      if (s.kesildi) bas('# UYARI: kaynak 400k sinirinda kesik — --tam ile yeniden dene');
    }
  }
  process.exit(e.ok ? 0 : 1);
}

if (dilim) {
  const [b, sn] = dilim.map(Number);
  console.log(metin.slice(b, sn));
} else {
  console.log(metin);
}
