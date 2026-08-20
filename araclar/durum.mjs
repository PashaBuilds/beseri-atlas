#!/usr/bin/env node
// DURUM.md'yi okunabilir ozet olarak yazdirir.
import path from 'node:path';
import YAML from 'yaml';
import { KOK, oku, varMi, yamlOku, RENK } from './ortak.mjs';

const p = path.join(KOK, 'DURUM.md');
if (!varMi(p)) { console.error('DURUM.md yok — `npm run otonom -- --baslat`'); process.exit(1); }
const d = YAML.parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(oku(p))[1]);
const isler = yamlOku(path.join(KOK, 'plan', 'kuyruk.yaml'))?.isler || [];
const sayim = {};
for (const i of isler) sayim[i.durum] = (sayim[i.durum] || 0) + 1;

console.log(RENK.kalin('\nBESERI ATLAS — DURUM'));
console.log(`  Aktif faz     : ${d.aktif_faz}`);
console.log(`  Aktif parti   : ${d.aktif_parti}`);
console.log(`  Son commit    : ${d.son_commit || '-'}`);
console.log(`  Guncelleme    : ${d.son_guncelleme}`);
console.log(RENK.kalin('\n  Kuyruk'));
for (const [k, v] of Object.entries(sayim)) console.log(`    ${k.padEnd(14)} ${v}`);
console.log(RENK.kalin('\n  Metrikler'));
for (const [k, v] of Object.entries(d.metrikler)) {
  if (Array.isArray(v)) continue;
  console.log(`    ${k.padEnd(30)} ${v ?? '-'}`);
}
console.log(RENK.kalin('\n  Butce'));
console.log(`    ${d.butce.harcanan_token.toLocaleString('tr-TR')} / ${d.butce.toplam_token_tavani.toLocaleString('tr-TR')} token`);
console.log(`    ardisik ayni hata: ${d.engeller.ardisik_ayni_hata}`);
console.log(`    onarim turu      : ${d.onarim.tur}\n`);
