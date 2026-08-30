// KAPI 6 — Onay filtresi, tek geçiş noktası.
//
// `onaylandi` olmayan hiçbir içerik production build'e girmez. Bütün sayfalar
// içeriği YALNIZCA buradan alır; böylece filtreyi atlamak mümkün olmaz (§10).
import { getCollection, type CollectionEntry } from 'astro:content';

export const TIPLER = ['donem', 'olay', 'aktor', 'dusunur', 'kavram', 'tartisma', 'veri', 'kaynak'] as const;
export type Tip = typeof TIPLER[number];

export const TIP_ADLARI: Record<Tip, string> = {
  donem: 'Dönem', olay: 'Olay', aktor: 'Aktör', dusunur: 'Düşünür',
  kavram: 'Kavram', tartisma: 'Tartışma', veri: 'Veri', kaynak: 'Kaynak',
};

// Sema .mjs'te oldugu icin koleksiyon verisi TS'e `any` olarak gelir; tip
// alanini guvenle ada cevirmek icin tek gecis noktasi. Bilinmeyen deger
// oldugu gibi doner (gizlemek yerine gorunur kilinir).
export function tipAdi(tip: unknown): string {
  return TIP_ADLARI[tip as Tip] ?? String(tip);
}

export const BOLGE_ADLARI: Record<string, string> = {
  avrupa: 'Avrupa', 'bati-asya': 'Batı Asya', 'islam-dunyasi': 'İslam dünyası', 'orta-asya': 'Orta Asya',
  'dogu-asya': 'Doğu Asya',
  'guney-asya': 'Güney Asya', afrika: 'Afrika', amerika: 'Amerika',
  okyanusya: 'Okyanusya', kuresel: 'Küresel',
};

export const GUVEN_ADLARI: Record<string, string> = {
  kesin: 'Kesin', yaygin: 'Yaygın görüş', tartismali: 'Tartışmalı',
};

const YAYIN_DURUMU = 'onaylandi';

export async function onayliIcerik(tip: Tip) {
  const hepsi = await getCollection(tip as any);
  return hepsi.filter((e: any) => e.data.denetim_durumu === YAYIN_DURUMU);
}

export async function tumOnayliIcerik() {
  const gruplar = await Promise.all(TIPLER.map(async (t) => (await onayliIcerik(t)).map((e: any) => ({ ...e, _tip: t }))));
  return gruplar.flat();
}

// Site GitHub Pages proje sayfasi olarak /beseri-atlas/ altinda yayimlanir.
// Astro yalnizca KENDI urettigi varlik yollarini taban ile onekler; markup'ta
// elle yazilan href'leri oneklemez. Bu yuzden BUTUN ic baglar bag()'dan gecer —
// tek gecis noktasi olmasi, taban degisirse tek yerde degismesini saglar.
// KAPI 12 (linter-cikti.mjs) derlenmis href'leri gercek sayfalara karsi
// dogruladigi icin, buradan gecmeyi unutan bir bag build'i kirar.
const TABAN = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function bag(p: string) {
  return `${TABAN}${p.startsWith('/') ? p : `/${p}`}`;
}

export function yol(id: string) {
  const [tip, ...rest] = id.split('-');
  return bag(`/${tip}/${rest.join('-')}/`);
}

/** Bir makalenin `ilgili` id'lerini, yalnızca yayınlanmış olanlarla çözer. */
export function baglariCoz(idler: string[] = [], korpus: any[]) {
  return idler
    .map((id) => korpus.find((k) => k.data.id === id))
    .filter(Boolean);
}

// ─── Okuma hattı ────────────────────────────────────────────────────────────
//
// Bir dönemi baştan sona okuyabilmek için sıralı bir hat gerekir. Hattın
// verisi zaten korpusta duruyordu (`donem` + `tarih_baslangic`), yalnızca
// hiçbir sayfada gösterilmiyordu.
//
// Hatta yalnızca bir döneme ait olabilen tipler girer: olay, aktör, tartışma.
// Kavram, düşünür, veri ve kaynak makalelerinde `donem` alanı YOKTUR ve bu
// bir eksik değildir — İbn Haldûn'u ya da "asabiyet"i tek bir döneme koymak
// yanlış olurdu. Onlar yol boyunca bağlarla girilen derinlik olarak kalır.

/**
 * Tarihi sıralanabilir bir sayıya çevirir.
 *
 * Metin olarak sıralamak MÖ tarihlerinde yanlış sonuç verir: korpusta dolgu
 * tutarsız ("-0094", "-500", "-10000") ve "-0094" < "-500" karşılaştırması
 * MÖ 94'ü MÖ 500'den önceye koyardı. Yıl negatif olduğunda ay/gün eklemesi
 * yine ileri yönde çalışır: -500 yılının Mart'ı Temmuz'undan önce gelir.
 */
export function tariheSayi(t: unknown): number {
  const m = /^(-?)(\d+)(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/.exec(String(t ?? '').trim());
  if (!m) return Number.POSITIVE_INFINITY;
  const yil = (m[1] === '-' ? -1 : 1) * Number(m[2]);
  return yil * 10000 + Number(m[3] ?? 1) * 100 + Number(m[4] ?? 1);
}

/**
 * Bir dönemin okuma hattı: [dönem makalesi (giriş), ...kronolojik makaleler].
 * Giriş başa sabitlenir; kendi tarihiyle araya karışması okuma sırasını bozardı.
 */
export function okumaHatti(korpus: any[], donemNo: string) {
  const uyeler = korpus.filter((e: any) => String(e.data.donem ?? '') === String(donemNo));
  const giris = uyeler.find((e: any) => e.data.tip === 'donem');
  // Tartışmalar sona alınır. Bir tartışma dönemin İÇİNDE geçen bir olay değil,
  // dönem hakkında sorulan bir sorudur; tarihi de sorunun konusunun tarihidir.
  // Düz kronolojide bu, 1888 tarihli "Demografik geçişin sonuçları ne?"
  // makalesini 1945–1991 döneminin BAŞINA koyuyordu: okur, hakkında tartışılan
  // malzemeyi görmeden tartışmayı okuyordu. Önce malzeme, sonra itirazlar.
  const sonaAl = (e: any) => (e.data.tip === 'tartisma' ? 1 : 0);
  const govde = uyeler
    .filter((e: any) => e.data.tip !== 'donem')
    .sort((a: any, b: any) =>
      sonaAl(a) - sonaAl(b)
      || tariheSayi(a.data.tarih_baslangic) - tariheSayi(b.data.tarih_baslangic)
      || String(a.data.baslik).localeCompare(String(b.data.baslik), 'tr'));
  return giris ? [giris, ...govde] : govde;
}

/** On altı dönemin hatları uç uca: sitenin tek sürekli okuma sırası. */
export function butunHat(korpus: any[]) {
  return korpus
    .filter((e: any) => e.data.tip === 'donem')
    .map((e: any) => String(e.data.donem))
    .sort()
    .flatMap((no: string) => okumaHatti(korpus, no));
}

/**
 * Bir makalenin hattaki komşuları. Dönemin son makalesinden sonraki adım,
 * bir sonraki dönemin giriş makalesidir — hat 16 dönem boyunca kopmaz.
 * Dönemi olmayan makaleler (kavram, düşünür, veri, kaynak) hatta değildir.
 */
export function komsular(korpus: any[], girdi: any) {
  const no = girdi.data.donem;
  if (!no) return null;
  const hat = butunHat(korpus);
  const i = hat.findIndex((e: any) => e.data.id === girdi.data.id);
  if (i < 0) return null;
  const kendi = okumaHatti(korpus, String(no));
  return {
    onceki: hat[i - 1] ?? null,
    sonraki: hat[i + 1] ?? null,
    sira: kendi.findIndex((e: any) => e.data.id === girdi.data.id), // 0 = giriş
    toplam: kendi.length - 1,
    donemNo: String(no),
  };
}

export type Makale = CollectionEntry<'olay'>;
