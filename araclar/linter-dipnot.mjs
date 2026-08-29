// KAPI 2 + KAPI 3 — Dipnot linteri ve kaynak anahtari butunlugu.
// Ilke 1'in teknik karsiligi: tarih, sayi, ozel isim veya nedensellik iceren
// her paragraf en az bir [^k] referansi tasimak zorundadir.
import { Rapor, paragraflar, dipnotlar, linterCli } from './ortak.mjs';

const BUYUK = 'A-ZÇĞİÖŞÜ';
const KUCUK = 'a-zçğıiöşü';

// Cumle basi buyuk harfi ozel isim sanmamak icin: bu kelimeler cumle basinda
// sik gecer ve ozel isim degildir.
const CUMLE_BASI_ISTISNA = new Set([
  'Bu', 'Şu', 'Bir', 'Ancak', 'Fakat', 'Ama', 'Çünkü', 'Ayrıca', 'Yine', 'Hem', 'Her', 'Bazı',
  'Böylece', 'Buna', 'Bunun', 'Bunlar', 'Şöyle', 'Böyle', 'Aynı', 'Daha', 'İki', 'Üç', 'Dört',
  'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz', 'Nitekim', 'Oysa', 'Dolayısıyla', 'Bununla',
  'Buradan', 'Örneğin', 'Kısaca', 'Yani', 'Eğer', 'Hâlâ', 'Sadece', 'Yalnızca', 'Üstelik',
]);

// Nedensellik ifadeleri — §6
const NEDENSELLIK = /(nedeniyle|yüzünden|sonucunda|sayesinde|dolayısıyla|neden oldu|yol açtı|kaynaklanır|etkisiyle|sebebiyle|bu yüzden)/i;
const YIL = /(^|[^\d])\d{3,4}([^\d]|$)/;
const YUZDE = /(%\s?\d|yüzde\s\d)/i;
const SAYI = /(\d{1,3}([.,]\d{3})+|\d+([.,]\d+)?\s?(milyon|milyar|bin|kişi|km))/i;
// Yaziyla yazilmis nicelik de bir iddiadir: "dort buyuk imparatorluk dagildi".
// Cürütücü geçişi bu boşluğu bulduğu için eklendi.
const YAZIYLA_SAYI = /(?<![\p{L}])(iki|üç|dört|beş|altı|yedi|sekiz|dokuz|yirmi|otuz|kırk|elli|yüz|bin|milyon|milyar)\s+(\p{L}+\s+)?(\p{L}+)/u;
const NICELIK_ADI = /(imparatorluk|devlet|ülke|kıta|bölge|savaş|devrim|yüzyıl|yıl|kat|misli|kişi|milyon|milyar)/iu;

const OZEL_ISIM_RE = new RegExp(`^[${BUYUK}][${KUCUK}${BUYUK}’'-]{2,}$`);

/** Paragraftan markdown suslerini ve dipnot referanslarini temizler. */
function govdeMetni(p) {
  return p
    .replace(/\[\^k\d+\]/g, '')
    .replace(/::[a-zçğıöşü]+\[[^\]]*\]\{[^}]*\}/gi, '')
    // Site ici gezinme baglari APARAT'tir, iddia degil: bag metni bir makale
    // basligidir ("MO 1200-500") ve icindeki yil cumlenin iddiasi degildir.
    // Ayni duzeltme araclar/denetle.mjs'te de yapildi; iki taraf tutarli olmali.
    // Paragraftaki gercek iddialar tetiklemeye devam eder.
    .replace(/\[[^\]]*\]\(\/[^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>]/g, '');
}

function ozelIsimVar(metin) {
  // Cumleleri ayir; her cumlenin ilk kelimesini atlayarak buyuk harfli kelime ara.
  const cumleler = metin.split(/(?<=[.!?:])\s+/);
  for (const cumle of cumleler) {
    const kelimeler = cumle.trim().split(/\s+/).filter(Boolean);
    for (let i = 1; i < kelimeler.length; i++) {
      const k = kelimeler[i].replace(/^[("‘“«]+/, '').replace(/[)"’”»,;.!?:]+$/, '');
      if (!k || CUMLE_BASI_ISTISNA.has(k)) continue;
      if (OZEL_ISIM_RE.test(k)) return k;
    }
  }
  return null;
}

/** Paragraf iddia tasiyor mu? Tasiyorsa gerekcesini dondurur. */
export function iddiaGerekcesi(paragraf) {
  const m = govdeMetni(paragraf);
  if (YIL.test(m)) return 'yil/tarih';
  if (YUZDE.test(m)) return 'yuzde';
  if (SAYI.test(m)) return 'sayi';
  if (YAZIYLA_SAYI.test(m) && NICELIK_ADI.test(m)) return 'yaziyla nicelik';
  if (NEDENSELLIK.test(m)) return 'nedensellik';
  const oi = ozelIsimVar(m);
  if (oi) return `ozel isim (${oi})`;
  return null;
}

function atlanirMi(p) {
  const t = p.trim();
  if (/^#{1,6}\s/.test(t)) return true;              // baslik
  if (/^\|/.test(t)) return true;                    // tablo
  if (/^:?-{3,}/.test(t)) return true;               // ayirac
  if (/^::[a-zçğıöşü]+\[/i.test(t)) return true;     // saf direktif blogu
  if (/^\[\^k\d+\]:/.test(t)) return true;           // dipnot tanimi
  if (/^</.test(t)) return true;                     // ham HTML blogu
  return false;
}

export function dipnotDenetimi(makaleler) {
  const r = new Rapor('KAPI 2+3 — dipnot butunlugu / kaynak anahtari');
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) { r.hata(m.goreli, m.ayristirmaHatasi); continue; }
    const tanimli = new Set((m.fm.kaynaklar || []).map((k) => k.anahtar));
    const kullanilan = new Set();

    for (const p of paragraflar(m.govde)) {
      const refs = dipnotlar(p.metin);
      refs.forEach((k) => kullanilan.add(k));
      if (atlanirMi(p.metin)) continue;
      const gerekce = iddiaGerekcesi(p.metin);
      if (gerekce && refs.length === 0) {
        const onizleme = govdeMetni(p.metin).slice(0, 90).replace(/\s+/g, ' ');
        r.hata(m.goreli, `kaynaksiz iddia paragrafi [${gerekce}]: "${onizleme}..."`);
      }
    }
    // KAPI 3 — tanimsiz referans hatadir, kullanilmayan kaynak uyaridir (§6)
    for (const k of kullanilan) {
      if (!tanimli.has(k)) r.hata(m.goreli, `frontmatter'da tanimsiz kaynak anahtari: [^${k}]`);
    }
    for (const k of tanimli) {
      if (!kullanilan.has(k)) r.uyari(m.goreli, `govdede kullanilmayan kaynak anahtari: ${k}`);
    }
    // ::tartismali direktifi harita parametresi olmadan kullanilamaz (§6)
    for (const d of m.govde.matchAll(/::tartismali\[([^\]]*)\](\{[^}]*\})?/gi)) {
      if (!d[2] || !/harita\s*=\s*[a-z0-9-]+/i.test(d[2])) {
        r.hata(m.goreli, `::tartismali direktifi 'harita' parametresi olmadan: "${(d[1] || '').slice(0, 50)}"`);
      }
    }
  }
  return r;
}

if (process.argv[1]?.endsWith('linter-dipnot.mjs')) linterCli('linter-dipnot', dipnotDenetimi);
