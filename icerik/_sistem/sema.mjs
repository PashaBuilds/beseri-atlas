// Beseri Atlas — Zod semalari.
// TEK KAYNAK: hem Astro content collections hem de araclar/ altindaki linterler
// bu dosyayi import eder. Sema burada degisirse her iki tarafta birden degisir.
import { z } from 'zod';

export const TIPLER = ['donem','olay','aktor','dusunur','kavram','tartisma','veri','kaynak'];
// 'orta-asya' 2026-08-21'de eklendi: Gokturk, Timur gibi Ic Asya siyasi
// birimlerini 'dogu-asya' altina yazmak ust veriyi yanlislastiriyordu. Bu bir
// kapi gevsetmesi degil, denetimli sozlugun genisletilmesidir.
export const BOLGELER = ['avrupa','islam-dunyasi','orta-asya','dogu-asya','guney-asya','afrika','amerika','kuresel'];
export const EKSENLER = ['siyasi','askeri','ekonomik','kulturel','felsefi','dini','demografik','mitolojik'];
export const GUVEN = ['kesin','yaygin','tartismali'];
export const KAYNAK_TURLERI = ['ansiklopedi','akademik','birincil','veri','ders','kitap'];

// Bir kaynagin `birincil` olmasi tek bir sey demek degildir. 2026-08-25'te
// yazilan uc Guney Asya dosyasi ayni boslugu isaret etti:
//
//   Indus Vadisi — kazi raporu; metin yok, yalnizca nesne
//   Asoka        — kamuya kazinmis duyuru; yonetim kendini anlatir
//   Chola        — tapinak duvarindaki islem kaydi; yonetim ne yaptigini yazar
//
// Ucu de kunyede `tur: birincil` etiketini tasiyordu ve kunye aralarindaki
// farki gostermiyordu. Oysa fark ONEMLIDIR: her tur farkli bir soruya cevap
// verir ve hicbiri otekinin yerine gecmez. Bir duyurudan yonetim pratigi,
// bir islem kaydindan yonetim soylemi okunamaz.
//
// Alan ZORUNLU DEGILDIR; yalnizca tur: birincil kunyelerde anlamlidir ve
// doldurulmasi tesvik edilir. Zorunlu yapilmasi 373 makaleyi bir anda
// bozardi; borc olarak olculur (KAPI 13).
// 'nesne' 2026-08-25'te eklendi. Gerekce: Benin Kralligi dosyasi yazilirken
// semanin metin kaynaklarina gore tasarlandigi ortaya cikti. Bir dosyanin en
// guclu kaniti bir metin degil bir nesne ise (dokum levha, heykel, kazi
// buluntusu) kunyede yeri yoktu ve dosya "birincil kaynagi yok" gorunuyordu.
export const BIRINCIL_TURLERI = ['eser', 'belge', 'kitabe', 'kazi', 'tanik', 'nesne'];

/** Okur icin Turkce karsiliklar. */
export const BIRINCIL_TUR_ADLARI = {
  eser: 'Eserin kendisi',
  belge: 'Belge',
  kitabe: 'Kitabe',
  kazi: 'Kazı raporu',
  tanik: 'Tanıklık',
  nesne: 'Nesnenin kendisi',
};
export const DENETIM_DURUMLARI = ['bekliyor','gecti','isaretli','onaylandi','onarimda','karantina'];

// MO tarihleri icin isaretli yil: "-10000", "-0500-03-15", "1914-06-28".
// YAML tarihsiz stringleri Date'e cevirebildigi icin once normalize ediyoruz.
const tarih = z.preprocess((v) => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'number') return String(v);
  return v;
}, z.string().regex(/^-?\d{1,5}(-\d{2}(-\d{2})?)?$/, 'tarih formati: [-]YYYY[-MM[-DD]]'));

const isoGun = z.preprocess((v) => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v;
}, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'tarih formati: YYYY-MM-DD'));

export const kaynakSemasi = z.object({
  anahtar: z.string().regex(/^k\d+$/, 'kaynak anahtari k1, k2 ... formatinda olmali'),
  tur: z.enum(KAYNAK_TURLERI),
  // Yalnizca tur: birincil kunyelerde anlamlidir; bkz. BIRINCIL_TURLERI.
  birincil_tur: z.enum(BIRINCIL_TURLERI).optional(),
  ad: z.string().min(8),
  url: z.string().url(),
  erisim_tarihi: isoGun,
  // Kapi 10 (uydurma kaynak kontrolu) icin: fetch edilen sayfada aranacak dize.
  // Bos birakilirsa `ad` alanindan turetilir.
  dogrulama_dizesi: z.string().min(3).optional(),
  not: z.string().optional(),
}).strict();

export const pozisyonSemasi = z.object({
  ad: z.string().min(3),
  savunanlar: z.array(z.string().min(2)).min(1),
  tez: z.string().min(20),
  guclu_yani: z.string().min(20),
  zayif_yani: z.string().min(20),
}).strict();

// Her icerik tipinde ortak olan alanlar.
const ortak = {
  id: z.string().regex(/^(donem|olay|aktor|dusunur|kavram|tartisma|veri|kaynak)-[a-z0-9-]+$/),
  tip: z.enum(TIPLER),
  baslik: z.string().min(3).max(120),
  ozet: z.string().min(30).max(400),
  donem: z.string().regex(/^(0[1-9]|1[0-6])$/).optional(),
  tarih_baslangic: tarih.optional(),
  tarih_bitis: tarih.optional(),
  bolge: z.array(z.enum(BOLGELER)).min(1),
  eksen: z.array(z.enum(EKSENLER)).min(1),
  guven_geneli: z.enum(GUVEN),
  etiketler: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
  ilgili: z.array(z.string()).default([]),
  okuma_onerisi: z.array(z.string()).default([]),
  kaynaklar: z.array(kaynakSemasi).min(1),
  son_denetim: isoGun,
  denetim_durumu: z.enum(DENETIM_DURUMLARI),
  // Denetim hattinin yazdigi alanlar
  denetim_notu: z.string().optional(),
  onarim_turu: z.number().int().min(0).max(3).default(0),
};

const donemSemasi = z.object({
  ...ortak,
  tip: z.literal('donem'),
  donem: z.string().regex(/^(0[1-9]|1[0-6])$/),
  eksen_cumlesi: z.string().min(20).max(240),
  // Paralel zaman seridi bileseninin besledigi alan: her bolge icin tek satir.
  serit: z.array(z.object({
    bolge: z.enum(BOLGELER),
    baslik: z.string().min(3).max(80),
    satir: z.string().min(20).max(300),
    anahtar: z.string().regex(/^k\d+$/),
  }).strict()).min(4),
}).strict();

const tartismaSemasi = z.object({
  ...ortak,
  tip: z.literal('tartisma'),
  soru: z.string().min(20),
  neden_onemli: z.string().min(30),
  pozisyonlar: z.array(pozisyonSemasi).min(2),
  hakem_yok: z.literal(true),
}).strict();

const veriSemasi = z.object({
  ...ortak,
  tip: z.literal('veri'),
  veri_dosyasi: z.string().regex(/^veri-setleri\/[a-z0-9-]+\.csv$/),
  veri_lisansi: z.string().min(3),
  veri_kaynagi_anahtari: z.string().regex(/^k\d+$/),
  birim: z.string().min(1),
}).strict();

const kaynakDosyasiSemasi = z.object({
  ...ortak,
  tip: z.literal('kaynak'),
  yazar: z.string().min(3),
  eser_adi: z.string().min(3),
  yayin_yili: z.number().int().min(-500).max(2100),
  telif_durumu: z.enum(['kamu-mali','telifli']),
  tez_ozeti: z.string().min(80).max(900),
  hangi_tartismada: z.array(z.string()).default([]),
}).strict();

const sadeSemasi = (tipAdi) => z.object({ ...ortak, tip: z.literal(tipAdi) }).strict();

export const semalar = {
  donem: donemSemasi,
  olay: sadeSemasi('olay'),
  aktor: sadeSemasi('aktor'),
  dusunur: sadeSemasi('dusunur'),
  kavram: sadeSemasi('kavram'),
  tartisma: tartismaSemasi,
  veri: veriSemasi,
  kaynak: kaynakDosyasiSemasi,
};

export function semaDogrula(tip, veri) {
  const s = semalar[tip];
  if (!s) return { ok: false, hatalar: [`bilinmeyen tip: ${tip}`] };
  const r = s.safeParse(veri);
  if (r.success) return { ok: true, veri: r.data, hatalar: [] };
  return { ok: false, hatalar: r.error.issues.map((i) => `${i.path.join('.') || '(kok)'}: ${i.message}`) };
}
