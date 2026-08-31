// KAPI 13 — Kaynak bileşimi.
//
// NEDEN VAR
//   Kaynak havuzu (icerik/_sistem/kaynak-havuzu.yaml) en.wikipedia.org için
//   şunu yazıyordu ve bunu 2026-08-20'den beri yazıyor:
//
//     "Yalnızca giriş kapısı olarak. Makalenin kendi dipnotundaki asıl kaynağa
//      inilir ve künyeye o kaynak yazılır. Tek başına kaynak gösterilemez —
//      her makalede en fazla bir Wikipedia künyesi bulunabilir."
//
//   Hiçbir kontrol bunu ölçmüyordu. Ölçüldüğünde çıkan tablo şu (2026-08-23):
//
//     226 / 359 makale (%63) kuralı ihlal ediyor — 2, 3, hatta 4 Wikipedia künyesi
//     326 / 359 makale (%91) hiç birincil kaynak taşımıyor
//     1105 künyenin 589'u (%53) tek bir alan adından: en.wikipedia.org
//
//   Havuz gutenberg.org, archive.org, perseus.tufts.edu, avalon.law.yale.edu,
//   marxists.org ve en.wikisource.org'u ZATEN birincil olarak onaylıyordu.
//   İzin vardı; kullanılmadı. marxists.org korpusta sıfır kez, gutenberg.org
//   bir kez geçiyor — üstelik 33 kaynak dosyasının 24'ü kamu malı kitaplar.
//   Atlas kitapları listeliyor ama okumuyor: Kapital dosyası Kapital'i değil,
//   Kapital hakkındaki ansiklopedi maddesini kaynak gösteriyor.
//
// NE OLCULUR
//   1. Giriş kapısı sınırı — `kullanim: giris_kapisi` işaretli alan adından
//                            makale başına en fazla bir künye (havuzun kuralı).
//   2. Birincil kapsama    — makalede en az bir `tur: birincil` künye var mı.
//
// SERT KAPIYA GECIS
//   Ilk olcumdeki 226 fazla giris-kapisi ve 326 kanit acigi 2026-08-30'da
//   sifirlandi. Bu tarihten sonra iki kural da yalniz raporlanmaz: tek bir yeni
//   ihlal bile build'i kirar. Borc defteri geriye donusu gosteren tarihsel
//   rapordur; eski ihlal icin istisna listesi artik yoktur.
import path from 'node:path';
import { Rapor, yamlOku, yaz, ICERIK, KOK, linterCli } from './ortak.mjs';

const BORC_YOLU = path.join(KOK, 'denetim', 'kaynak-borcu.md');

/** Havuzdan alan adı sınıflarını okur — kural veriden gelir, koda gömülmez. */
export function havuzSiniflari(havuz) {
  const girisKapisi = new Set();
  const birincil = new Set();
  const veri = new Set();
  for (const w of havuz?.whitelist || []) {
    if (!w?.alan) continue;
    if (w.kullanim === 'giris_kapisi') girisKapisi.add(w.alan);
    if (w.tur === 'birincil') birincil.add(w.alan);
    if (w.tur === 'veri') veri.add(w.alan);
  }
  // Wikisource havuzda ayrı bir satır olarak bulunmayabilir; Wikipedia'nın
  // kardeş projesi olsa da tam metin taşır ve birincil sayılır.
  birincil.add('en.wikisource.org');
  return { girisKapisi, birincil, veri };
}

/**
 * Bir makale için "birincil kanıt" yalnız alan adından okunamaz.
 *
 * Veri seti, yalnız `veri` tipindeki bir makalede değil; bir olayın nüfusunu,
 * bir aktörün üretimini veya bir kavramın dağılımını ölçen makalede de
 * birincil kanıttır. Aynı şekilde doğrulanabilir bir alandaki künye editörce
 * `tur: birincil` ve denetimli `birincil_tur` ile sınıflandırılmışsa alanın
 * bütünü akademik bir depo olsa bile o tek kayıt birincil olabilir (örneğin
 * bir düşünürün kendi makalesi). Yalnız alan adına bakmak, kanıtın makaledeki
 * işlevini değil barındırıcısını ölçüyordu.
 */
export function birincilSayilirMi(kaynaklar, { birincil, veri }) {
  return kaynaklar.some((k) => {
    const alan = alanAdi(k.url);
    return k.tur === 'birincil' || birincil.has(alan) || veri.has(alan);
  });
}

function alanAdi(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

export function kaynakDenetimi(makaleler, { havuz = null, borcDefteriYaz = true } = {}) {
  const r = new Rapor('KAPI 13 — kaynak bilesimi');

  // HAVUZ BUTUNLUGU: ayni alan adi iki kez tanimlanamaz. 2026-08-29'da
  // population.un.org havuzda IKI kez geciyordu — biri `dogrulanabilir:
  // true` (veri portali API'si calisiyor), oteki `false` (WPP insan yuzu
  // ciziliyor). Kapi ikincisini gordugu icin gecerli bir kunyeyi reddetti.
  // Cift kayit, kapinin hangi olcumu kullanacagini belirsiz birakir.
  {
    const havuzListesi = (havuz?.whitelist || []).concat(havuz?.blacklist || []);
    const gorulen = new Map();
    for (const w of havuzListesi) {
      const alan = typeof w === 'string' ? w : w.alan;
      if (!alan) continue;
      gorulen.set(alan, (gorulen.get(alan) || 0) + 1);
    }
    for (const [alan, n] of gorulen) {
      if (n > 1) {
        r.hata('icerik/_sistem/kaynak-havuzu.yaml',
          `"${alan}" havuzda ${n} kez tanimli — cift kayit, kapinin hangi olcumu kullanacagini belirsiz birakir`);
      }
    }
  }
  const h = havuz || yamlOku(path.join(ICERIK, '_sistem', 'kaynak-havuzu.yaml'));
  const siniflar = havuzSiniflari(h);
  const { girisKapisi } = siniflar;

  const borclu = [];
  let olculen = 0;
  let birincilTasiyan = 0;
  let kaynakSiniriBeyanli = 0;
  let kanitAcigi = 0;
  let toplamKunye = 0;
  let toplamGiris = 0;
  // birincil_tur alani 2026-08-25'te eklendi; doldurulmamis kunyeler borctur.
  let birincilKunye = 0;
  let turlenmemis = 0;

  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    const kaynaklar = m.fm.kaynaklar || [];
    if (kaynaklar.length === 0) continue;
    olculen += 1;
    toplamKunye += kaynaklar.length;

    const tip = m.fm.tip || m.tip;
    for (const k of kaynaklar) {
      if (k.tur !== 'birincil') continue;
      birincilKunye += 1;
      if (!k.birincil_tur) turlenmemis += 1;
    }
    const alanlar = kaynaklar.map((k) => alanAdi(k.url));
    const giris = alanlar.filter((a) => girisKapisi.has(a));
    const birVar = birincilSayilirMi(kaynaklar, siniflar);
    const kaynakSiniri = String(m.fm.kaynak_siniri || '').trim();
    const kanitYaDaSinirVar = birVar || kaynakSiniri.length > 0;
    toplamGiris += giris.length;
    if (birVar) birincilTasiyan += 1;
    if (kaynakSiniri) kaynakSiniriBeyanli += 1;
    if (!kanitYaDaSinirVar) kanitAcigi += 1;

    const sorunlar = [];
    if (giris.length > 1) sorunlar.push(`${giris.length} giris kapisi kunyesi (${giris.join(', ')}) — havuz en fazla 1 diyor`);
    if (!kanitYaDaSinirVar) sorunlar.push('birincil kanit veya acik kaynak siniri yok');
    if (giris.length > 1) {
      r.hata(m.goreli, `${giris.length} giris kapisi kunyesi var — makale basina en fazla 1; `
        + 'baglam kaynagi uzmanlik yayini, birincil metin veya site-ici okuma zinciriyle degistirilmeli');
    }
    if (!kanitYaDaSinirVar) {
      r.hata(m.goreli, 'birincil kaniti da `kaynak_siniri` beyani da yok — kaynak erisilemiyorsa '
        + 'sinir okura aciklanmali, erisilebiliyorsa iddiaya dogrudan baglanmali');
    }
    if (sorunlar.length) {
      borclu.push({ dosya: m.goreli, id: m.fm.id, tip,
        kunye: kaynaklar.length, giris: giris.length, birincil: birVar ? 1 : 0, sorunlar });
    }
  }

  const kuralIhlali = borclu.filter((b) => b.giris > 1).length;
  const birincilsiz = olculen - birincilTasiyan;

  r.ozetSatirlari = [
    `olculen ${olculen} makale · ${toplamKunye} kunye`,
    `giris kapisi kuralini asan: ${kuralIhlali} makale (%${olculen ? Math.round(100 * kuralIhlali / olculen) : 0})`,
    `birincil kanit tasimayan: ${birincilsiz} makale (%${olculen ? Math.round(100 * birincilsiz / olculen) : 0})`,
    `acik kaynak siniri beyanli: ${kaynakSiniriBeyanli} makale`,
    `birincil kaniti da acik kaynak siniri da olmayan: ${kanitAcigi} makale`,
    `giris kapisi kunyesi toplami: ${toplamGiris} / ${toplamKunye} (%${toplamKunye ? Math.round(100 * toplamGiris / toplamKunye) : 0})`,
    `birincil kunye ${birincilKunye} · alt turu yazilmamis ${turlenmemis}`,
  ];
  r.olcum = { olculen, toplamKunye, kuralIhlali, birincilsiz, kaynakSiniriBeyanli,
    kanitAcigi, toplamGiris, birincilKunye, turlenmemis };

  // Olcum ile YAZMA ayrilir: bir arac depoyu olcerken depoyu
  // degistirmemelidir (fikstur defteri ezme dersi).
  r.ozetSatirlari = (r.ozetSatirlari || []).concat([
    `sert kapi etkin: ${kuralIhlali} fazla giris-kapisi · ${kanitAcigi} kanit/sinir acigi; `
      + 'bu degerlerden biri sifirdan buyukse build kirilir',
  ]);

  if (borcDefteriYaz) borcYaz(borclu, r.olcum);
  return r;
}

function borcYaz(borclu, olcum) {
  const tipe = new Map();
  for (const b of borclu) tipe.set(b.tip, (tipe.get(b.tip) || 0) + 1);

  const satirlar = [
    '# Kaynak borcu',
    '',
    '_Bu dosya `araclar/linter-kaynak.mjs` (KAPI 13) tarafından her koşuda',
    'yeniden yazılır. Elle düzenlenmez._',
    '',
    'Ölçülen kural, kaynak havuzunun kendi kuralıdır: bir makalede en fazla bir',
    'giriş kapısı (ansiklopedi) künyesi bulunabilir ve makale en az bir birincil',
    'kanıta dayanmalı veya neden erişilemediğini açık bir `kaynak_siniri` beyanıyla',
    'okura göstermelidir. Veri setleri, kullanıldıkları her makale tipinde birincil',
    'kanıt sayılır. Havuz `gutenberg.org`, `archive.org`, `perseus.tufts.edu`,',
    '`avalon.law.yale.edu`, `marxists.org` ve `en.wikisource.org` alanlarını birincil',
    'metin barındırıcıları olarak tanır; tekil kayıtların türü ayrıca künyede yazılır.',
    '',
    '| Ölçüm | Değer |',
    '|---|---|',
    `| Ölçülen makale | ${olcum.olculen} |`,
    `| Toplam künye | ${olcum.toplamKunye} |`,
    `| Giriş kapısı kuralını aşan makale | ${olcum.kuralIhlali} |`,
    `| Birincil kanıt taşımayan makale | ${olcum.birincilsiz} |`,
    `| Açık kaynak sınırı beyanlı makale | ${olcum.kaynakSiniriBeyanli} |`,
    `| Kanıtı da sınır beyanı da olmayan makale | ${olcum.kanitAcigi} |`,
    `| Giriş kapısı künyesi payı | ${olcum.toplamKunye ? Math.round(100 * olcum.toplamGiris / olcum.toplamKunye) : 0}% |`,
    '',
    '## Tipe göre borçlu makale',
    '',
    '| Tip | Borçlu |',
    '|---|---|',
    ...[...tipe.entries()].sort((a, b) => b[1] - a[1]).map(([t, n]) => `| ${t} | ${n} |`),
    '',
    '## Makale dökümü',
    '',
    '| Makale | Künye | Giriş kapısı | Birincil | Sorun |',
    '|---|---|---|---|---|',
    ...borclu
      .sort((a, b) => b.giris - a.giris || a.dosya.localeCompare(b.dosya))
      .map((b) => `| \`${b.id}\` | ${b.kunye} | ${b.giris} | ${b.birincil} | ${b.sorunlar.join('; ')} |`),
    '',
  ];
  yaz(BORC_YOLU, satirlar.join('\n'));
}

if (process.argv[1]?.endsWith('linter-kaynak.mjs')) linterCli('linter-kaynak', kaynakDenetimi);
