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

export const BOLGE_ADLARI: Record<string, string> = {
  avrupa: 'Avrupa', 'islam-dunyasi': 'İslam dünyası', 'orta-asya': 'Orta Asya',
  'dogu-asya': 'Doğu Asya',
  'guney-asya': 'Güney Asya', afrika: 'Afrika', amerika: 'Amerika', kuresel: 'Küresel',
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

export function yol(id: string) {
  const [tip, ...rest] = id.split('-');
  return `/${tip}/${rest.join('-')}/`;
}

/** Bir makalenin `ilgili` id'lerini, yalnızca yayınlanmış olanlarla çözer. */
export function baglariCoz(idler: string[] = [], korpus: any[]) {
  return idler
    .map((id) => korpus.find((k) => k.data.id === id))
    .filter(Boolean);
}

export type Makale = CollectionEntry<'olay'>;
