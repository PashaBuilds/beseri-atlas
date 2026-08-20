#!/usr/bin/env node
// Araştırma yardımcısı: bir kaynağı fetch eder ve verilen anahtar kelimelerin
// çevresindeki bağlamı yazdırır. Üretici oturumun iddiayı kaynakta GÖRMEDEN
// yazmasını engeller — İlke 1'in pratikteki karşılığı.
//
//   node araclar/arastir.mjs <url> [anahtar1] [anahtar2] ...
//   node araclar/arastir.mjs <url> --bas 3000       ilk N karakteri yazdır
import { getir, normalize } from './getir.mjs';

const [, , url, ...kalan] = process.argv;
if (!url) { console.error('kullanim: node araclar/arastir.mjs <url> [anahtar...]'); process.exit(1); }

const tazeIstendi = kalan.includes('--taze');
const basIndis = kalan.indexOf('--bas');
const basN = basIndis >= 0 ? Number(kalan[basIndis + 1] || 2000) : 0;
const pencere = (() => { const i = kalan.indexOf('--pencere'); return i >= 0 ? Number(kalan[i + 1] || 700) : 700; })();
const anahtarlar = kalan.filter((k, i) =>
  !k.startsWith('--') && kalan[i - 1] !== '--bas' && kalan[i - 1] !== '--pencere');

const r = await getir(url, { taze: tazeIstendi });
console.log(`durum: ${r.durum}${r.onbellek ? ' (onbellek)' : ''}`);
console.log(`baslik: ${r.baslik || '-'}`);
if (r.durum !== 200) { console.log(`HATA: ${r.hata || 'HTTP ' + r.durum}`); process.exit(1); }

const metin = (r.metin || '').replace(/\s+/g, ' ');
console.log(`uzunluk: ${metin.length} karakter\n`);

if (basN) { console.log(metin.slice(0, basN)); process.exit(0); }
if (anahtarlar.length === 0) { console.log(metin.slice(0, 2000)); process.exit(0); }

const nMetin = normalize(metin);
for (const a of anahtarlar) {
  const nA = normalize(a);
  console.log(`\n${'='.repeat(70)}\n  ${a}\n${'='.repeat(70)}`);
  let bulundu = 0;
  let i = nMetin.indexOf(nA);
  while (i >= 0 && bulundu < 4) {
    console.log(`\n[@${i}] ...${metin.slice(Math.max(0, i - pencere / 3), i + pencere)}...`);
    bulundu += 1;
    i = nMetin.indexOf(nA, i + Math.max(1, pencere));
  }
  if (!bulundu) console.log('  GECMIYOR — bu iddia bu kaynaktan yazilamaz.');
}
