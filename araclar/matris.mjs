// İddia-kaynak matrisi — hakem katmanının makine-okur kaydı (karar tablosu K2).
//
// İki katman ayrımı:
//   Mekanik katman (denetle.mjs): atomlar + 4 sayaç. Yalnızca TABAN;
//     asla "doğrulandı" beyanı üretmez (alt-dize eşleşmesi kanıt değildir).
//   Hakem katmanı (bu dosya): model-hakemli oturum her iddiaya destek düzeyi
//     yazar. Bir makale ancak GEÇERLİ ve GÜNCEL bir matrisle "doğrulanmış"
//     sayılır. Hakem, makalenin yazarı OLAMAZ (yazar ≠ hakem şartı).
//
// Dosya yolu: denetim/matris/<id>-matris.json
// Şema (zorunlu alanlar):
//   { id, govde_hash, commit, zaman, hakem,
//     iddialar: [{ iddia_id, cumle, onem: merkezi|destek|renk,
//                  tur: olgu|sayi|tarih|aktarim|yorum,
//                  kaynaklar: [{ anahtar, destek: dogrudan|kismi|baglam|celisir }],
//                  guven: yuksek|orta|dusuk, inceleme }],
//     sayaclar: { dogrudan, kismi, desteksiz, olculemez } }
//
// Kurallar:
//   K-1 Sayaçlar iddialardan yeniden hesaplanabilir olmalı (beyan ≠ hesap ise HATA).
//   K-2 MERKEZİ iddia desteksiz ya da ölçülemez kalamaz (sözleşme şartı).
//   K-3 govde_hash güncel gövdeyle eşleşmeli; eşleşmiyorsa matris BAYAT.
//   K-4 `celisir` destekli iddia açık `inceleme` notu taşımalı.
//   K-5 kaynak anahtarları makalenin künyesinde var olmalı.
//
//   node araclar/matris.mjs <id> [...]     matris(ler)i dogrula
//   node araclar/matris.mjs --hepsi        var olan butun matrisleri dogrula
//   node araclar/matris.mjs --tazele <id>  iddia cumleleri duruyorsa hash'i tazele
//   node araclar/matris.mjs --cumle-oturt <id>|--hepsi  cumleleri govdeye oturt
//   node araclar/matris.mjs --eksik-iddia --hepsi      matriste kaydi olmayan dipnotlu cumleler
import fs from 'node:fs';
import path from 'node:path';
import { KOK, makaleleriTopla, RENK } from './ortak.mjs';
import { govdeHash, suankiCommit, iddiaCumleleri } from './denetle.mjs';

export const MATRIS_DIZINI = path.join(KOK, 'denetim', 'matris');

const ONEMLER = new Set(['merkezi', 'destek', 'renk']);
const TURLER = new Set(['olgu', 'sayi', 'tarih', 'aktarim', 'yorum']);
const DESTEKLER = new Set(['dogrudan', 'kismi', 'baglam', 'celisir']);
const GUVENLER = new Set(['yuksek', 'orta', 'dusuk']);

/** Bir iddianin 4-sayac sinifi: en guclu destegi belirleyicidir. */
export function iddiaSinifi(iddia) {
  const destekler = (iddia.kaynaklar || []).map((k) => k.destek);
  if (destekler.includes('dogrudan')) return 'dogrudan';
  if (destekler.includes('kismi')) return 'kismi';
  if (destekler.includes('celisir')) return 'desteksiz'; // celiski destek degildir
  if (destekler.includes('baglam')) return 'olculemez';  // baglam kaniti tasimaz
  return iddia.tur === 'yorum' ? 'olculemez' : 'desteksiz';
}

export function sayaclariHesapla(iddialar) {
  const s = { dogrudan: 0, kismi: 0, desteksiz: 0, olculemez: 0 };
  for (const i of iddialar) s[iddiaSinifi(i)] += 1;
  return s;
}

/**
 * Tek matrisi dogrular. Donen deger: { gecerli, bayat, hatalar[] }.
 * `makale` verilirse K-3 (hash) ve K-5 (kunye anahtarlari) da olculur.
 */
export function matrisiDogrula(matris, makale = null) {
  const hatalar = [];
  let bayat = false;
  for (const alan of ['id', 'govde_hash', 'commit', 'zaman', 'hakem', 'iddialar', 'sayaclar']) {
    if (matris[alan] === undefined) hatalar.push(`zorunlu alan eksik: ${alan}`);
  }
  if (!Array.isArray(matris.iddialar) || matris.iddialar.length === 0) {
    hatalar.push('iddialar bos — matris en az bir iddia icermeli');
    return { gecerli: false, bayat, hatalar };
  }

  const gorulenId = new Set();
  const kunyeAnahtarlari = makale
    ? new Set((makale.fm.kaynaklar || []).map((k) => k.anahtar)) : null;

  for (const i of matris.iddialar) {
    const kim = i.iddia_id || '(kimliksiz)';
    if (!i.iddia_id) hatalar.push('iddia_id eksik — iddialar kimliksiz izlenemez');
    else if (gorulenId.has(i.iddia_id)) hatalar.push(`yinelenen iddia_id: ${kim}`);
    gorulenId.add(i.iddia_id);
    if (!i.cumle) hatalar.push(`${kim}: cumle eksik`);
    if (!ONEMLER.has(i.onem)) hatalar.push(`${kim}: onem gecersiz (${i.onem})`);
    if (!TURLER.has(i.tur)) hatalar.push(`${kim}: tur gecersiz (${i.tur})`);
    if (!GUVENLER.has(i.guven)) hatalar.push(`${kim}: guven gecersiz (${i.guven})`);
    for (const k of i.kaynaklar || []) {
      if (!DESTEKLER.has(k.destek)) hatalar.push(`${kim}: destek gecersiz (${k.destek})`);
      if (kunyeAnahtarlari && !kunyeAnahtarlari.has(k.anahtar)) {
        hatalar.push(`${kim}: kunyede olmayan kaynak anahtari (${k.anahtar})`); // K-5
      }
      if (k.destek === 'celisir' && !(i.inceleme || '').trim()) {
        hatalar.push(`${kim}: 'celisir' destegi inceleme notu sart kosar`); // K-4
      }
    }
    // K-2: merkezi iddia desteksiz/olculemez kalamaz.
    const sinif = iddiaSinifi(i);
    if (i.onem === 'merkezi' && (sinif === 'desteksiz' || sinif === 'olculemez')) {
      hatalar.push(`${kim}: MERKEZI iddia '${sinif}' kalamaz — kaynak bulunmali ya da iddia govdeden cikarilmali`);
    }
  }

  // K-1: beyan edilen sayaclar hesapla tutmali.
  const hesap = sayaclariHesapla(matris.iddialar);
  for (const [k, v] of Object.entries(hesap)) {
    if ((matris.sayaclar?.[k] ?? null) !== v) {
      hatalar.push(`sayac tutmuyor: ${k} beyan ${matris.sayaclar?.[k]}, hesap ${v}`);
    }
  }

  // K-3: hash guncelligi.
  if (makale && matris.govde_hash && matris.govde_hash !== govdeHash(makale.govde)) {
    bayat = true;
    hatalar.push('BAYAT: govde_hash guncel govdeyle eslesmiyor — matris yeniden hakemlenmeli');
  }

  // K-6 OLCUM (hata degil, henuz): matristeki iddia cumlesi govdede BIREBIR
  // duruyor mu? Hash (K-3) bunu gostermez — hakem hash'i en son yazdigi icin
  // kendi duzeltmesinden sonraki gövdeyle damgalar, ama matristeki `cumle`
  // alani daha eski bir taslaktan kalmis olabilir. 2026-08-29 olcumu: 68
  // matrisin 43'unde toplam 282 cumle (%9,5) govdede bulunamiyor; ikisinde
  // (kus-kralligi, rapa-nui) HICBIR cumle tutmuyor. Iddia-kaynak matrisinin
  // degeri, cumlenin metinde izlenebilmesine bagli oldugu icin bu gercek bir
  // butunluk acigi. Once olculuyor; temizlik gecisinden sonra HATA olacak.
  let kayipCumle = 0;
  if (makale) kayipCumle = tazelenebilirMi(matris, makale).kayip.length;

  return { gecerli: hatalar.length === 0, bayat, hatalar, kayipCumle };
}

/**
 * Govde hakemlendikten SONRA degistiginde matris bayat kalir. Her degisiklik
 * yeniden hakemlemeyi gerektirmez: bicimsel bir duzeltme (baglanti metni,
 * kelime ekleme) iddialara dokunmamis olabilir. Ama buna "sanirim dokunmadi"
 * diyerek karar verilemez — olculmesi gerekir.
 *
 * Kural: matristeki HER iddia cumlesi guncel govdede birebir duruyorsa,
 * iddia yuzeyi degismemistir ve hash tazelenebilir; tazeleme dosyaya kayit
 * dusulerek yapilir. Tek bir cumle bile kaybolmussa tazeleme REDDEDILIR ve
 * dosya yeniden hakemlenmelidir.
 */
/**
 * Iddia cumlesi karsilastirmasinin TEK normallestiricisi.
 * 2026-08-29: iki olcum (K-6 ve --eksik-iddia) farkli sadelestirme
 * kullaniyordu ve ayni anda ikisini birden saglamak imkansizdi; bir ajan
 * bunu olcup bildirdi. Matris cumleleri markdown vurgusu tasiyabilir
 * (*eser adi*, ic bag), govde karsilastirmasinda ise tasimayabilir.
 * Ikisi de burada ayni bicimde soyulur.
 */
export function cumleSadelestir(s) {
  return String(s || '')
    .replace(/\[\^k\d+\]/g, '')                // dipnot isaretleri
    // SITE ICI BAG TUMUYLE SILINIR — denetle.mjs'teki iddiaCumleleri ile
    // AYNI kural. 2026-08-29: iki hakem bagimsiz olarak, ic bag tasiyan bir
    // cumlenin K-6 ile --eksik-iddia'yi AYNI ANDA gecemedigini olctu; bu
    // korpus genelinde sessiz "kayan cumle" uretiyordu. iddiaCumleleri ic
    // baglari siliyor (bag metni cogu zaman bir baslik oldugu icin
    // icindeki yil cumlenin iddiasi saniliyordu); sadelestirici de ayni
    // seyi yapmali, yoksa iki taraf farkli metinleri karsilastirir.
    .replace(/\[[^\]]*\]\(\/[^)]*\)/g, ' ')    // site ici bag: tumuyle sil
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')   // dis bag: metnini birak
    .replace(/[*_`]/g, '')                      // vurgu isaretleri
    .replace(/\s+/g, ' ')
    .trim();
}

export function tazelenebilirMi(matris, makale) {
  // Dipnot isaretleri karsilastirmadan cikarilir: hakem cumleyi isaretsiz
  // kaydeder, govdede isaret cumlenin ortasinda durabilir. Bu bicimsel fark
  // iddianin degistigi anlamina gelmez.
  const sadelestir = cumleSadelestir;
  const govde = sadelestir(makale.govde);
  const kayip = [];
  for (const i of matris.iddialar || []) {
    const cumle = sadelestir(i.cumle);
    if (!cumle || !govde.includes(cumle)) kayip.push(i.iddia_id || '(kimliksiz)');
  }
  return { tazelenebilir: kayip.length === 0, kayip };
}

/**
 * Matristeki `cumle` alanini govdedeki KARSILIGINA oturtur.
 *
 * Matrisin degeri, iddianin metinde izlenebilmesine baglidir; `cumle` alani
 * eski bir taslaktan kalmissa iddia artik hangi cumleye ait oldugu
 * bulunamaz. 2026-08-29 olcumu: 68 matrisin 43'unde 283 cumle govdede yok.
 *
 * Eslesme KORUMALI yapilir: aday, ayni dipnot anahtarlarini TAM OLARAK
 * tasiyan bir govde cumlesi olmalidir ve benzerlik esigini gecmelidir.
 * Birden fazla aday esik ustundeyse ya da hicbiri gecmiyorsa DOKUNULMAZ —
 * yanlis cumleye oturtmak, kaymanin kendisinden daha kotudur.
 */
function benzerlik(a, b) {
  const A = new Set(a.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
  const B = new Set(b.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
  if (A.size === 0 || B.size === 0) return 0;
  let ortak = 0;
  for (const w of A) if (B.has(w)) ortak += 1;
  return ortak / Math.max(A.size, B.size);
}

export function cumleleriOturt(matris, makale, { esik = 0.55 } = {}) {
  const sade = cumleSadelestir;
  const govde = sade(makale.govde);
  const adaylar = iddiaCumleleri(makale.govde);
  const rapor = { oturan: 0, belirsiz: [], bulunamayan: [] };
  for (const i of matris.iddialar || []) {
    const mevcut = sade(i.cumle);
    if (mevcut && govde.includes(mevcut)) continue;
    const anahtarlar = (i.kaynaklar || []).map((k) => k.anahtar).sort().join(',');
    const esler = adaylar
      .filter((a) => [...a.refs].sort().join(',') === anahtarlar)
      .map((a) => ({ cumle: a.cumle, skor: benzerlik(mevcut, a.cumle) }))
      .filter((a) => a.skor >= esik)
      .sort((a, b) => b.skor - a.skor);
    if (esler.length === 0) { rapor.bulunamayan.push(i.iddia_id); continue; }
    if (esler.length > 1 && esler[1].skor > esler[0].skor - 0.1) {
      rapor.belirsiz.push(i.iddia_id); continue;
    }
    i.cumle = esler[0].cumle;
    rapor.oturan += 1;
  }
  return rapor;
}

export function matrisOku(id) {
  const yol = path.join(MATRIS_DIZINI, `${id}-matris.json`);
  if (!fs.existsSync(yol)) return null;
  return JSON.parse(fs.readFileSync(yol, 'utf8'));
}

if (process.argv[1]?.endsWith('matris.mjs')) {
  const makaleler = makaleleriTopla();
  const haritada = new Map(makaleler.map((m) => [m.fm.id, m]));
  let idler;
  if (process.argv.includes('--hepsi')) {
    idler = fs.existsSync(MATRIS_DIZINI)
      ? fs.readdirSync(MATRIS_DIZINI).filter((f) => f.endsWith('-matris.json')).map((f) => f.replace(/-matris\.json$/, ''))
      : [];
    if (idler.length === 0) { console.log('denetim/matris/ altinda matris yok.'); process.exit(0); }
  } else {
    idler = process.argv.slice(2).filter((a) => !a.startsWith('--'));
    if (idler.length === 0) { console.error('kullanim: node araclar/matris.mjs <id> ... | --hepsi'); process.exit(1); }
  }
  if (process.argv.includes('--eksik-iddia')) {
    // TERS YONDEKI BOSLUK: govdede dipnotlu bir cumle var ama matriste
    // kaydi yok. Bu, matrisin sessizce eksik kalmasi demektir — sayaclar
    // dogru gorunur cunku olmayan iddia sayilmaz. OTOMATIK EKLENMEZ:
    // destek duzeyi (dogrudan/kismi/baglam) bir HUKUMDUR ve uydurulamaz.
    // Bu kip yalnizca olcer ve listeler; ekleme hakem isidir.
    let toplamEksik = 0; let toplamCumle = 0; const dosyalar = [];
    for (const id of idler) {
      const matris = matrisOku(id); const makale = haritada.get(id);
      if (!matris || !makale) continue;
      // KALIBRASYON (2026-08-29 ajan bulgusu): bu kip ile K-6 (tazelenebilirMi)
      // farkli olcuyordu ve ayni anda ikisini birden saglamak imkansizdi.
      // K-6, matristeki cumlenin govdede ALT DIZE olarak durmasini arar;
      // bu kip ise TAM CUMLE esitligi ariyordu, dolayisiyla matriste kismi
      // cumle tutan her kayit "eksik" gorunuyordu. Iki olcum ayni tanimi
      // kullanmali: bir govde cumlesi, matristeki herhangi bir iddia
      // cumlesi onun icinde geciyorsa (ya da tersi) KAPSANMIS sayilir.
      const sade = cumleSadelestir;
      const kayitliCumleler = (matris.iddialar || []).map((i) => sade(i.cumle)).filter(Boolean);
      const kapsanmis = (c) => {
        const g = sade(c.cumle);
        return kayitliCumleler.some((k) => g.includes(k) || k.includes(g));
      };
      const eksik = iddiaCumleleri(makale.govde).filter((c) => !kapsanmis(c));
      toplamCumle += iddiaCumleleri(makale.govde).length;
      toplamEksik += eksik.length;
      if (eksik.length) {
        dosyalar.push([id, eksik.length]);
        console.log(`${RENK.sari('EKSIK  ')} ${id.padEnd(34)} ${eksik.length} dipnotlu cumle matriste yok`);
        for (const e of eksik.slice(0, 3)) console.log(`         ${RENK.gri(`[${e.refs.join(',')}] ${e.cumle.slice(0, 90)}…`)}`);
      }
    }
    console.log(`\n${RENK.gri(`matris kapsami: ${toplamCumle - toplamEksik}/${toplamCumle} dipnotlu cumle matriste kayitli · `
      + `${toplamEksik} cumle kaydsiz (${dosyalar.length} dosyada) — ekleme hakem isidir, otomatik yapilmaz`)}`);
    process.exit(0);
  }

  if (process.argv.includes('--cumle-oturt')) {
    let toplamOturan = 0; let toplamBelirsiz = 0; let toplamBulunamayan = 0;
    for (const id of idler) {
      const matris = matrisOku(id); const makale = haritada.get(id);
      if (!matris || !makale) { console.log(`${RENK.kirmizi('YOK    ')} ${id}`); continue; }
      const r = cumleleriOturt(matris, makale);
      toplamOturan += r.oturan; toplamBelirsiz += r.belirsiz.length; toplamBulunamayan += r.bulunamayan.length;
      if (r.oturan) {
        matris.govde_hash = govdeHash(makale.govde);
        matris.commit = suankiCommit();
        (matris.tazeleme ||= []).push({
          zaman: new Date().toISOString().slice(0, 10),
          gerekce: `${r.oturan} iddia cumlesi govdedeki karsiligina oturtuldu (dipnot imzasi + benzerlik esigi ile)`,
        });
        fs.writeFileSync(path.join(MATRIS_DIZINI, `${id}-matris.json`), `${JSON.stringify(matris, null, 2)}\n`);
      }
      const im = r.bulunamayan.length || r.belirsiz.length ? RENK.sari('KISMI  ') : RENK.yesil('OTURDU ');
      console.log(`${im} ${id.padEnd(34)} oturan ${r.oturan} · belirsiz ${r.belirsiz.length} · karsiligi yok ${r.bulunamayan.length}`);
    }
    console.log(`\ntoplam: oturan ${toplamOturan} · belirsiz ${toplamBelirsiz} · karsiligi yok ${toplamBulunamayan}`);
    process.exit(0);
  }

  if (process.argv.includes('--tazele')) {
    let reddedilen = 0;
    for (const id of idler) {
      const matris = matrisOku(id);
      const makale = haritada.get(id);
      if (!matris || !makale) { console.log(`${RENK.kirmizi('YOK    ')} ${id}`); reddedilen += 1; continue; }
      const guncel = govdeHash(makale.govde);
      if (matris.govde_hash === guncel) { console.log(`${RENK.gri('ZATEN  ')} ${id} — hash guncel`); continue; }
      const { tazelenebilir, kayip } = tazelenebilirMi(matris, makale);
      if (!tazelenebilir) {
        console.log(`${RENK.kirmizi('RED    ')} ${id} — ${kayip.length} iddia cumlesi govdede yok: ${kayip.slice(0, 5).join(', ')}`);
        console.log(`         ${RENK.gri('iddia yuzeyi degismis — dosya yeniden hakemlenmeli, hash tazelenemez')}`);
        reddedilen += 1;
        continue;
      }
      const oncekiHash = matris.govde_hash;
      matris.govde_hash = guncel;
      matris.commit = suankiCommit();
      (matris.tazeleme ||= []).push({
        zaman: new Date().toISOString().slice(0, 10),
        onceki_hash: oncekiHash,
        yeni_hash: guncel,
        gerekce: 'govde degisti ama matristeki iddia cumlelerinin tamami birebir duruyor; iddia yuzeyi degismedi',
      });
      fs.writeFileSync(path.join(MATRIS_DIZINI, `${id}-matris.json`), `${JSON.stringify(matris, null, 2)}\n`);
      console.log(`${RENK.yesil('TAZELEN')} ${id} — ${oncekiHash} -> ${guncel} (${matris.iddialar.length} iddia cumlesi dogrulandi)`);
    }
    process.exit(reddedilen ? 1 : 0);
  }

  let kirik = 0; let toplamKayip = 0; let toplamIddia = 0; let kaymaDosya = 0;
  for (const id of idler) {
    const matris = matrisOku(id);
    if (!matris) { console.log(`${RENK.kirmizi('YOK    ')} ${id} — matris dosyasi bulunamadi`); kirik += 1; continue; }
    const { gecerli, bayat, hatalar, kayipCumle } = matrisiDogrula(matris, haritada.get(id) || null);
    const im = gecerli ? RENK.yesil('GECERLI') : bayat ? RENK.sari('BAYAT  ') : RENK.kirmizi('KIRIK  ');
    const s = sayaclariHesapla(matris.iddialar || []);
    const kayipIm = kayipCumle ? RENK.sari(` · ${kayipCumle} cumle govdede yok`) : '';
    console.log(`${im} ${id.padEnd(34)} ${s.dogrudan} dogrudan · ${s.kismi} kismi · ${s.desteksiz} desteksiz · ${s.olculemez} olculemez${kayipIm}`);
    for (const h of hatalar.slice(0, 8)) console.log(`         ${RENK.gri(h)}`);
    toplamKayip += kayipCumle;
    toplamIddia += (matris.iddialar || []).length;
    if (kayipCumle) kaymaDosya += 1;
    if (!gecerli) kirik += 1;
  }
  if (toplamIddia) {
    console.log(`\n${RENK.gri(`iddia cumlesi izlenebilirligi: ${toplamIddia - toplamKayip}/${toplamIddia} cumle govdede birebir duruyor · `
      + `${toplamKayip} cumle bulunamadi (${kaymaDosya} dosyada) — olcum, henuz hata degil`)}`);
  }
  process.exit(kirik ? 1 : 0);
}
