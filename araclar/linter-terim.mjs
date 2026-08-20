// KAPI 4 — Terim linteri. icerik/_sistem/terimler.yaml kilitli sozluktur;
// yasak_varyantlar'dan biri govdede gecerse build kirilir.
import path from 'node:path';
import { Rapor, yamlOku, ICERIK } from './ortak.mjs';

const HARF = 'a-zA-ZçğıöşüÇĞİÖŞÜ';

export function terimleriYukle() {
  const y = yamlOku(path.join(ICERIK, '_sistem', 'terimler.yaml'));
  if (!y || !Array.isArray(y.terimler)) {
    throw new Error('terimler.yaml okunamadi veya `terimler:` listesi yok');
  }
  return y.terimler;
}

function kacir(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function terimDenetimi(makaleler, terimler) {
  const liste = terimler || terimleriYukle();
  const r = new Rapor('KAPI 4 — terim kilidi');
  const yasakli = [];
  for (const t of liste) {
    for (const v of t.yasak_varyantlar || []) {
      yasakli.push({
        dogru: t.tr,
        re: new RegExp(`(?<![${HARF}])${kacir(v)}(?![${HARF}])`, 'gi'),
      });
    }
  }
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    const metin = `${m.govde}\n${m.fm.ozet || ''}\n${m.fm.baslik || ''}`;
    for (const y of yasakli) {
      const bulunan = metin.match(y.re);
      if (bulunan) {
        r.hata(m.goreli, `yasak terim varyanti "${bulunan[0]}" — dogrusu: "${y.dogru}"`);
      }
    }
  }
  return r;
}
