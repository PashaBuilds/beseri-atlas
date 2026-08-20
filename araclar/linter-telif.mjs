// KAPI 7 — Telif linteri (Ilke 4).
//   * tirnak icindeki dogrudan alinti > 15 kelime  -> HATA
//   * ayni kaynaktan birden fazla alinti           -> HATA
//   * telifli eser dosyasinda uzun anlati          -> HATA
import { Rapor, paragraflar } from './ortak.mjs';

const MAX_KELIME = 15;
const TELIFLI_MAX_KELIME = 700;

// Turkce tirnak varyantlari: "...", uzun tirnak, ac-kapa tirnak.
const TIRNAK = /"([^"\n]{10,})"|“([^”\n]{10,})”|«([^»\n]{10,})»/g;

export function telifDenetimi(makaleler) {
  const r = new Rapor('KAPI 7 — telif siniri');
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    const kaynakSayaci = new Map();

    for (const p of paragraflar(m.govde)) {
      if (/^#{1,6}\s/.test(p.metin.trim())) continue;
      for (const e of p.metin.matchAll(TIRNAK)) {
        const alinti = (e[1] || e[2] || e[3] || '').trim();
        const kelime = alinti.split(/\s+/).filter(Boolean).length;
        if (kelime > MAX_KELIME) {
          r.hata(m.goreli, `dogrudan alinti ${kelime} kelime (sinir ${MAX_KELIME}): "${alinti.slice(0, 60)}..."`);
        }
        // Alintiyi takip eden ilk dipnot, alintinin kaynagidir.
        const bitis = (e.index || 0) + e[0].length;
        const sonrasi = p.metin.slice(bitis, bitis + 40);
        const k = /\[\^(k\d+)\]/.exec(sonrasi)?.[1] || /\[\^(k\d+)\]/.exec(p.metin)?.[1];
        if (k) kaynakSayaci.set(k, (kaynakSayaci.get(k) || 0) + 1);
      }
    }

    for (const [k, n] of kaynakSayaci) {
      if (n > 1) {
        r.hata(m.goreli, `${k} kaynagindan ${n} alinti — kaynak basina en fazla 1 alinti (Ilke 4)`);
      }
    }

    // Telifli kitaptan bolum ozeti / yeniden yapilandirilmis anlati uretimi yasagi.
    if (m.fm.tip === 'kaynak' && m.fm.telif_durumu === 'telifli') {
      const kelime = m.govde.replace(/\[\^k\d+\]/g, '').split(/\s+/).filter(Boolean).length;
      if (kelime > TELIFLI_MAX_KELIME) {
        r.hata(m.goreli, `telifli eser dosyasi ${kelime} kelime — sinir ${TELIFLI_MAX_KELIME} (Ilke 4)`);
      }
    }
  }
  return r;
}
