// Birincil metin bulucu.
//
// Bir eserin TAM METNİNİ havuzun birincil olarak onayladığı alan adlarında arar
// ve bulduğu adayı fetch edip doğrular. Amaç, künyede ansiklopedi maddesi yerine
// eserin kendisinin durması.
//
// Arama için gutendex.com ve archive.org'un arama uçları kullanılır. Havuz
// kuralı açıktır: bir alan adı araştırma sırasında OKUNABİLİR, künyeye
// yazılamaz. Buradan dönen künye adayları yalnızca gutenberg.org, archive.org,
// en.wikisource.org, marxists.org ve perseus.tufts.edu'dur — hepsi havuzda
// `tur: birincil`.
//
//   node araclar/birincil-bul.mjs "Adam Smith" "Wealth of Nations"
import { getir, normalize } from './getir.mjs';

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

/** Gutenberg kataloğunda arar; gutenberg.org/ebooks/<id> döner. */
export async function gutenbergAra(sorgu) {
  const u = `https://gutendex.com/books?search=${encodeURIComponent(sorgu)}`;
  const s = await getir(u, { metinSakla: true });
  if (s.durum !== 200) return [];
  let j;
  try { j = JSON.parse(s.metin); } catch { return []; }
  return (j.results || []).slice(0, 5).map((b) => ({
    kaynak: 'gutenberg.org',
    url: `https://www.gutenberg.org/ebooks/${b.id}`,
    ad: b.title,
    yazar: (b.authors || []).map((a) => a.name).join(', '),
  }));
}

/**
 * archive.org tam metin arar.
 *
 * NOT (döngüsellik): sorgu dizesinde RAKAM bulunmamalıdır; aksi hâlde dönen
 * JSON sorgunun kendi yankısını içerir ve "sayfada geçiyor mu" kontrolü
 * kendi kendini doğrular. Bu tuzak faz 5'te bir kez yaşandı, kayıtlıdır.
 */
export async function archiveAra(sorgu) {
  const temiz = sorgu.replace(/\d+/g, ' ').replace(/\s+/g, ' ').trim();
  const u = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(`title:(${temiz})`)}`
    + '&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&rows=6&output=json';
  const s = await getir(u, { metinSakla: true });
  if (s.durum !== 200) return [];
  let j;
  try { j = JSON.parse(s.metin); } catch { return []; }
  return (j.response?.docs || []).map((d) => ({
    kaynak: 'archive.org',
    url: `https://archive.org/details/${d.identifier}`,
    ad: Array.isArray(d.title) ? d.title[0] : d.title,
    yil: d.year,
  }));
}

/**
 * Yapısal künye. Sayfa metni eşleşmesi TEK BAŞINA YETMEZ ve bu ders pahalıya
 * öğrenildi (2026-08-23): gevşek eşleşme
 *
 *   Hegel'in Tinin Görüngübilimi yerine  -> Wilhelm Purpus, "Zur Dialektik des
 *                                           Bewusstseins nach Hegel" (1908)
 *   Weber'in Protestan Ahlakı yerine     -> "What's Left of Philosophy" adlı
 *                                           bir PODCAST bölümü (2022)
 *   İbn Haldûn'un Mukaddime'si yerine    -> İbn Ebî Cemre'nin Mukaddime'si
 *   Marx'ın Kapital'i yerine             -> Gabriel Deville'in İspanyolca ÖZETİ
 *
 * kabul ediyordu; dördü de başlık kelimelerini sayfada taşıyor. Eser adı ve
 * yazar adı, sayfa metninden değil kataloğun kendi künyesinden okunmalıdır.
 */
export async function yapisalKunye(url) {
  const arsiv = /archive\.org\/details\/([^/?#]+)/.exec(url);
  if (arsiv) {
    const s = await getir(`https://archive.org/metadata/${arsiv[1]}`, { metinSakla: true });
    if (s.durum !== 200) return null;
    try {
      const m = JSON.parse(s.metin).metadata || {};
      return { ad: String(m.title || ''), yazar: String(m.creator || ''), yil: m.year || m.date || null };
    } catch { return null; }
  }
  const gut = /gutenberg\.org\/ebooks\/(\d+)/.exec(url);
  if (gut) {
    const s = await getir(`https://gutendex.com/books/${gut[1]}`, { metinSakla: true });
    if (s.durum !== 200) return null;
    try {
      const j = JSON.parse(s.metin);
      return { ad: String(j.title || ''), yazar: (j.authors || []).map((a) => a.name).join(', '), yil: null };
    } catch { return null; }
  }
  return null;
}

/**
 * Bir adayı doğrular: HTTP 200 dönmeli, aranan dize sayfa metninde geçmeli ve
 * — katalog künyesi varsa — YAZAR ADI künyede geçmeli. KAPI 8 ve KAPI 10 build
 * sırasında ilk ikisini soracak; yazar şartı buranın kendi sıkılığıdır.
 */
export async function adayiDogrula(aday, dize, { yazar = null } = {}) {
  const s = await getir(aday.url, { metinSakla: true });
  if (s.durum !== 200) return { ...aday, ok: false, neden: `HTTP ${s.durum || 'baglanti hatasi'}` };
  if (yazar) {
    const k = await yapisalKunye(aday.url);
    if (k) {
      const soyad = normalize(yazar).split(' ').filter((w) => w.length > 2).pop() || '';
      if (soyad && !normalize(`${k.ad} ${k.yazar}`).includes(soyad)) {
        return { ...aday, ok: false, kunye: k, neden: `katalog yazari uyusmuyor: "${k.yazar}"` };
      }
      aday = { ...aday, kunye: k, ad: k.ad || aday.ad };
    }
  }
  const metin = normalize(`${s.baslik || ''} ${s.metin || ''}`);
  const hedef = normalize(dize);
  if (metin.includes(hedef)) return { ...aday, ok: true, oran: 1 };
  const kelimeler = hedef.split(' ').filter((k) => k.length > 3);
  const bulunan = kelimeler.filter((k) => metin.includes(k)).length;
  const oran = kelimeler.length ? bulunan / kelimeler.length : 0;
  return { ...aday, ok: oran >= 0.8, oran: Number(oran.toFixed(2)), neden: oran < 0.8 ? `eslesme %${Math.round(oran * 100)}` : undefined };
}

/** Bir eser için doğrulanmış birincil künye adayları döndürür. */
export async function birincilBul(yazar, eser, { dogrulamaDizesi = null } = {}) {
  const dize = dogrulamaDizesi || eser;
  const adaylar = [];
  adaylar.push(...await gutenbergAra(`${yazar} ${eser}`));
  await bekle(600);
  adaylar.push(...await archiveAra(eser));

  const sonuc = [];
  for (const a of adaylar) {
    sonuc.push(await adayiDogrula(a, dize, { yazar }));
    await bekle(600);
  }
  return sonuc.sort((a, b) => (b.ok - a.ok) || ((b.oran || 0) - (a.oran || 0)));
}

if (process.argv[1]?.endsWith('birincil-bul.mjs')) {
  const [yazar, eser, dize] = process.argv.slice(2);
  if (!eser) { console.error('kullanim: node araclar/birincil-bul.mjs "<yazar>" "<eser>" [dogrulama-dizesi]'); process.exit(1); }
  for (const a of await birincilBul(yazar, eser, { dogrulamaDizesi: dize })) {
    console.log(`${a.ok ? 'OK  ' : 'RED '} ${String(a.oran ?? '-').padEnd(5)} ${a.kaynak.padEnd(16)} ${a.url}`);
    console.log(`         ${a.ad}${a.neden ? `  (${a.neden})` : ''}`);
  }
}
