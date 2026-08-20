#!/usr/bin/env node
// Çift yönlü bağ onarıcısı (§9, üretim adımı 5).
//
// `ilgili` bağları simetrik olmak zorundadır: A, B'yi ilgili sayıyorsa B de A'yı
// saymalıdır. Geçiş 5 tek yönlü bağı ÇELİŞKİ olarak raporlar; bu araç eksik geri
// bağları frontmatter'a ekler.
//
// Bağı SİLMEZ — yalnızca ekler. Bir bağın yanlış olduğuna karar vermek editoryal
// bir iştir ve otomatikleştirilmez.
import fs from 'node:fs';
import { makaleleriTopla, RENK } from './ortak.mjs';

const kuruProva = process.argv.includes('--kuru');
const makaleler = makaleleriTopla();
const harita = new Map(makaleler.filter((m) => m.fm.id).map((m) => [m.fm.id, m]));

/** Hedef makalenin frontmatter'ındaki `ilgili` listesine id ekler. */
function ilgiliEkle(makale, id) {
  const satirlar = makale.ham.split(/\r?\n/);
  const bas = satirlar.findIndex((s) => /^ilgili:\s*$/.test(s));
  if (bas >= 0) {
    let son = bas;
    while (son + 1 < satirlar.length && /^\s+-\s/.test(satirlar[son + 1])) son += 1;
    satirlar.splice(son + 1, 0, `  - ${id}`);
    return satirlar.join('\n');
  }
  // `ilgili: []` biçimi
  const bosIndis = satirlar.findIndex((s) => /^ilgili:\s*\[\s*\]\s*$/.test(s));
  if (bosIndis >= 0) {
    satirlar.splice(bosIndis, 1, 'ilgili:', `  - ${id}`);
    return satirlar.join('\n');
  }
  return null;
}

let eklenen = 0;
const bekleyen = new Map(); // hedef id -> eklenecek id listesi

for (const m of makaleler) {
  if (!m.fm.id) continue;
  for (const hedefId of m.fm.ilgili || []) {
    const h = harita.get(hedefId);
    if (!h) continue;
    const geri = (h.fm.ilgili || []).includes(m.fm.id)
      || (h.fm.okuma_onerisi || []).includes(m.fm.id)
      || (h.fm.hangi_tartismada || []).includes(m.fm.id);
    if (geri) continue;
    if (!bekleyen.has(hedefId)) bekleyen.set(hedefId, []);
    if (!bekleyen.get(hedefId).includes(m.fm.id)) bekleyen.get(hedefId).push(m.fm.id);
  }
}

for (const [hedefId, idler] of bekleyen) {
  const h = harita.get(hedefId);
  for (const id of idler) {
    const yeni = ilgiliEkle(h, id);
    if (!yeni) { console.log(RENK.kirmizi(`ATLANDI ${hedefId}: ilgili alani bulunamadi`)); continue; }
    h.ham = yeni;
    eklenen += 1;
    console.log(`${RENK.yesil('EKLENDI')} ${hedefId} <- ${id}`);
  }
  if (!kuruProva) fs.writeFileSync(h.yol, h.ham);
}

console.log(`\n${eklenen} geri bag ${kuruProva ? 'eklenecek (kuru prova)' : 'eklendi'}`);
