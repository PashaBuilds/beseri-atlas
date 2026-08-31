#!/usr/bin/env node
// Aynı kaynaktan birden çok tırnaklı aktarım görünen dosyalarda, kaynak başına
// tek gerçek alıntıyı korur; diğer kısa adlandırma ve kalıpları alıntı gibi
// göstermeyen italik terimlere çevirir. On beş kelimeyi aşan ifadeye DOKUNMAZ:
// uzun alıntı, mekanik biçim değişikliğiyle değil editoryal özetle onarılmalıdır.
//
// Kuru prova: node araclar/telif-borcu-onar.mjs
// Uygulama:   node araclar/telif-borcu-onar.mjs --uygula

import fs from 'node:fs';
import { KOK, makaleleriTopla, paragraflar } from './ortak.mjs';

const UYGULA = process.argv.includes('--uygula');
const TIRNAK = /"([^"\n]{10,})"|“([^”\n]{10,})”|«([^»\n]{10,})»/g;

function alintilar(govde) {
  const sonuc = [];
  let aramaBaslangici = 0;
  for (const p of paragraflar(govde)) {
    if (/^#{1,6}\s/.test(p.metin.trim()) || /^\[\^k\d+\]:/.test(p.metin.trim())) continue;
    const paragrafKonumu = govde.indexOf(p.metin, aramaBaslangici);
    if (paragrafKonumu < 0) continue;
    aramaBaslangici = paragrafKonumu + p.metin.length;
    for (const e of p.metin.matchAll(TIRNAK)) {
      const icerik = (e[1] || e[2] || e[3] || '').trim();
      const kelime = icerik.split(/\s+/).filter(Boolean).length;
      const bitis = (e.index || 0) + e[0].length;
      const kalan = p.metin.slice(bitis);
      const yakin = p.metin.slice(bitis, bitis + 40);
      const kaynak = /\[\^(k\d+)\]/.exec(yakin)?.[1] || /\[\^(k\d+)\]/.exec(kalan)?.[1];
      if (!kaynak) continue;
      sonuc.push({ kaynak, icerik, kelime, tam: e[0],
        bas: paragrafKonumu + (e.index || 0), son: paragrafKonumu + bitis });
    }
  }
  return sonuc;
}

const rapor = { zaman: new Date().toISOString(), uygulandi: UYGULA, dosyalar: [],
  donusen: 0, uzun_cozulmeyen: 0 };

for (const m of makaleleriTopla()) {
  if (m.ayristirmaHatasi) continue;
  const tum = alintilar(m.govde);
  const gruplar = new Map();
  for (const a of tum) (gruplar.get(a.kaynak) || gruplar.set(a.kaynak, []).get(a.kaynak)).push(a);
  const donusecek = [];
  const dosyaRaporu = { id: m.fm.id, yol: m.goreli, kaynaklar: [] };

  for (const [kaynak, liste] of gruplar) {
    if (liste.length <= 1) continue;
    // En uzun ifade gerçek alıntı olma olasılığı en yüksek olandır; eşitlikte
    // metinde ilk gelen korunur. Kalan kısa ifadeler adlandırma/terim olarak
    // italikleştirilir.
    const sirali = [...liste].sort((a, b) => b.kelime - a.kelime || a.bas - b.bas);
    const korunan = sirali[0];
    const donusen = [];
    const uzun = [];
    for (const a of liste) {
      if (a === korunan) continue;
      if (a.kelime > 15) { uzun.push(a); rapor.uzun_cozulmeyen += 1; continue; }
      donusecek.push(a); donusen.push(a); rapor.donusen += 1;
    }
    dosyaRaporu.kaynaklar.push({ kaynak, korunan: korunan.icerik,
      donusen: donusen.map((a) => a.icerik), uzun_cozulmeyen: uzun.map((a) => a.icerik) });
  }

  if (!dosyaRaporu.kaynaklar.length) continue;
  rapor.dosyalar.push(dosyaRaporu);
  if (UYGULA && donusecek.length) {
    let yeniGovde = m.govde;
    for (const a of donusecek.sort((a, b) => b.bas - a.bas)) {
      yeniGovde = `${yeniGovde.slice(0, a.bas)}*${a.icerik}*${yeniGovde.slice(a.son)}`;
    }
    fs.writeFileSync(m.yol, m.ham.replace(m.govde, yeniGovde));
  }
}

fs.writeFileSync(`${KOK}/denetim/telif-onarim-raporu.json`, `${JSON.stringify(rapor, null, 2)}\n`);
console.log(`telif onarimi: ${rapor.donusen} kisa terim italiklestirilecek · `
  + `${rapor.uzun_cozulmeyen} uzun ifade cozulmemis · ${UYGULA ? 'uygulandi' : 'kuru prova'}`
  + ' -> denetim/telif-onarim-raporu.json');
process.exit(rapor.uzun_cozulmeyen ? 1 : 0);
