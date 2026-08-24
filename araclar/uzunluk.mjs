// Taslak uzunluk olcer.
//
// KAPI 11'in §3 hedefini tek bir dosya icin, tam lint kosmadan raporlar.
// Yeni makale yazarken ise yarar: yeni makaleler borc defterine giremedigi
// icin hedefi ILK COMMIT'te tutmak zorundadir ve eksik kalan her tur bir
// genisletme dongusu demektir.
//
//   node araclar/uzunluk.mjs icerik/aktor/aktor-selcuklular.md
//   node araclar/uzunluk.mjs --hedefler
import fs from 'node:fs';
import path from 'node:path';
import { HEDEFLER, kelimeSay } from './linter-derinlik.mjs';
import { ayristir, KOK, RENK } from './ortak.mjs';

function hedefleriYazdir() {
  console.log(RENK.kalin('\n§3 uzunluk hedefleri\n'));
  for (const [tip, h] of Object.entries(HEDEFLER)) {
    console.log(`  ${tip.padEnd(10)} ${String(h.min).padStart(5)}–${h.max} kelime`);
  }
  console.log(RENK.gri('\n  veri ve kaynak tiplerinde hedef yoktur; olcum disidir.\n'));
}

function olc(dosya) {
  const tam = path.isAbsolute(dosya) ? dosya : path.join(KOK, dosya);
  if (!fs.existsSync(tam)) { console.error(`bulunamadi: ${dosya}`); process.exitCode = 1; return; }
  const { fm, govde } = ayristir(fs.readFileSync(tam, 'utf8'), path.basename(tam));
  const tip = fm.tip;
  const n = kelimeSay(govde);
  const h = HEDEFLER[tip];
  if (!h) { console.log(`${path.basename(tam)}: ${n} kelime · tip "${tip}" olcum disi`); return; }

  const durum = n < h.min ? RENK.kirmizi(`${h.min - n} kelime EKSIK`)
    : n > h.max ? RENK.sari(`${n - h.max} kelime fazla`)
      : RENK.yesil('hedefte');
  const oran = Math.round((100 * n) / h.min);
  console.log(`${path.basename(tam)}`);
  console.log(`  ${n} kelime · hedef ${h.min}–${h.max} (${tip}) · ${durum} · hedefin %${oran}'i`);
}

const argv = process.argv.slice(2);
if (argv.includes('--hedefler') || argv.length === 0) hedefleriYazdir();
else for (const d of argv) olc(d);
