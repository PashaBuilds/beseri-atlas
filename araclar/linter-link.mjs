// KAPI 5 — Link butunlugu. Kirik ic link yok.
// `ilgili`, `okuma_onerisi`, ::tartismali{harita=...} ve gövdedeki /tip/slug
// linklerinin tamami var olan bir makaleye cozulmek zorundadir.
import { Rapor } from './ortak.mjs';

export function linkDenetimi(makaleler) {
  const r = new Rapor('KAPI 5 — link butunlugu');
  const idler = new Set(makaleler.filter((m) => m.fm && m.fm.id).map((m) => m.fm.id));
  const idHaritasi = new Map(makaleler.filter((m) => m.fm && m.fm.id).map((m) => [m.fm.id, m]));

  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    const kendi = m.fm.id;

    for (const alan of ['ilgili', 'okuma_onerisi']) {
      for (const hedef of m.fm[alan] || []) {
        if (!idler.has(hedef)) {
          r.hata(m.goreli, `${alan}: "${hedef}" diye bir makale yok (kirik ic link)`);
        } else if (hedef === kendi) {
          r.hata(m.goreli, `${alan}: makale kendine referans veriyor`);
        }
      }
    }

    // okuma_onerisi yalnizca kaynak dosyalarina isaret edebilir
    for (const hedef of m.fm.okuma_onerisi || []) {
      if (idler.has(hedef) && !hedef.startsWith('kaynak-')) {
        r.hata(m.goreli, `okuma_onerisi: "${hedef}" bir kaynak dosyasi degil`);
      }
    }

    // ::tartismali direktifinin isaret ettigi harita var olmali
    for (const d of m.govde.matchAll(/::tartismali\[[^\]]*\]\{[^}]*harita\s*=\s*([a-z0-9-]+)[^}]*\}/gi)) {
      const hedef = d[1];
      if (!idler.has(hedef)) r.hata(m.goreli, `::tartismali harita="${hedef}" — boyle bir makale yok`);
      else if (!hedef.startsWith('tartisma-')) r.hata(m.goreli, `::tartismali harita="${hedef}" bir tartisma dosyasi degil`);
    }

    // Govdedeki dahili linkler
    for (const l of m.govde.matchAll(/\]\((\/(donem|olay|aktor|dusunur|kavram|tartisma|veri|kaynak)\/[a-z0-9-]+)\/?\)/g)) {
      const parca = l[1].split('/').filter(Boolean);
      const hedef = `${parca[0]}-${parca[1]}`;
      if (!idler.has(hedef)) r.hata(m.goreli, `kirik ic link: ${l[1]}`);
    }

    // donem alani gercek bir donem makalesine baglanmali
    if (m.fm.donem && m.fm.tip !== 'donem') {
      const hedef = `donem-${m.fm.donem}`;
      if (!idHaritasi.has(hedef)) {
        r.uyari(m.goreli, `donem: "${m.fm.donem}" — ${hedef} henuz uretilmemis`);
      }
    }

    // Dosya adi ile id uyusmali
    const beklenen = `${m.fm.id}.md`;
    if (m.fm.id && m.dosya !== beklenen) {
      r.hata(m.goreli, `dosya adi id ile uyusmuyor (beklenen: ${beklenen})`);
    }
    if (m.fm.tip && m.fm.tip !== m.tip) {
      r.hata(m.goreli, `tip alani "${m.fm.tip}" ama dosya icerik/${m.tip}/ altinda`);
    }
  }

  // Cift yonlu bag kontrolu — tek yonlu bag uyaridir, capraz gecisinde hataya donusur.
  // `okuma_onerisi` bir kaynak dosyasina isaret ettiginde, o kaynagin `ilgili`
  // alanindaki geri bagin mesru karsiligidir: iki alan ayni iliskinin iki ucudur.
  const geriBagVar = (hedefMakale, id) =>
    (hedefMakale.fm.ilgili || []).includes(id)
    || (hedefMakale.fm.okuma_onerisi || []).includes(id)
    || (hedefMakale.fm.hangi_tartismada || []).includes(id);

  for (const m of makaleler) {
    if (m.ayristirmaHatasi || !m.fm.id) continue;
    for (const hedef of m.fm.ilgili || []) {
      const h = idHaritasi.get(hedef);
      if (h && !geriBagVar(h, m.fm.id)) {
        r.uyari(m.goreli, `tek yonlu ilgili bagi: ${m.fm.id} -> ${hedef} (geri bag yok)`);
      }
    }
  }
  return r;
}
