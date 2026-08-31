import assert from 'node:assert/strict';
import { yetimOlcumKayitlariniBuda } from '../araclar/kaynak-canlilik.mjs';

const defter = {
  'https://kullanilan.example/a': { kez: 2 },
  'https://yetim.example/b': { kez: 1 },
};

assert.equal(
  yetimOlcumKayitlariniBuda(defter, ['https://kullanilan.example/a']),
  1,
  'tam korpus defterinden kullanilmayan URL budanir',
);
assert.deepEqual(
  Object.keys(defter),
  ['https://kullanilan.example/a'],
  'kullanilan URL kaydi korunur',
);
assert.equal(
  yetimOlcumKayitlariniBuda(defter, ['https://kullanilan.example/a']),
  0,
  'ikinci kosu idempotenttir',
);

console.log('kaynak-canlilik.test.mjs: 3/3 gecti');
