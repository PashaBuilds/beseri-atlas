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
    const y = await fetch(url, { headers: { 'user-agent': 'beseri-atlas/dok' } });
    ham = await y.text();
    s = { durum: y.status, onbellek: false, kesildi: false };
    fs.mkdirSync(dizin, { recursive: true });
    const gecici = `${yol}.${process.pid}.tmp`;
    fs.writeFileSync(gecici, JSON.stringify({ url, durum: s.durum, ham }));
    fs.renameSync(gecici, yol);
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
// ETIKETLEME KURALI (2026-08-29 hakem bulgusu): dizeGeciyorMu, kelimelerin
// tamami gectiginde de oran 1 dondurebilir; onceki surum bunu "BIREBIR"
// diye etiketliyordu ve bir kor hakem "money supply fell 35" aramasinin
// BIREBIR dondugunu, oysa sayfada "The money supply had fallen 35 percent"
// yazdigini bildirdi. Yanlis "dogruladim" hukmu bu araci degersizlestirir.
// Artik BIREBIR yalnizca gercek alt-dize eslesmesinde yazilir.
const etiket = (metinK, dize) => {
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
  // Baglam: normalize edilmemis metinde ilk anlamli parcayi bul.
  const parca = ara.split(/\s+/).find((w) => w.length > 5) || ara.slice(0, 20);
  const i = metin.indexOf(parca);
  if (i !== -1) {
    bas('--- baglam ---');
    console.log(metin.slice(Math.max(0, i - 300), i + 500));
  }
  process.exit(e.ok ? 0 : 1);
}

if (dilim) {
  const [b, sn] = dilim.map(Number);
  console.log(metin.slice(b, sn));
} else {
  console.log(metin);
}
