import assert from 'node:assert/strict';
import { kaynakBlogunuKaldir, matrisiAyikla } from '../araclar/giris-kapisi-onar.mjs';

const fm = `id: ornek
kaynaklar:
  - anahtar: k1
    ad: Ana
    url: https://example.org
  - anahtar: k2
    ad: Kaldir
    not: >
      Iki satirli
      bir not
    url: https://en.wikipedia.org/wiki/X
  - anahtar: k3
    ad: Son
    url: https://example.com
son_denetim: 2026-08-31`;

const yeni = kaynakBlogunuKaldir(fm, 'k2');
assert.ok(!yeni.includes('anahtar: k2'));
assert.ok(yeni.includes('anahtar: k1'));
assert.ok(yeni.includes('anahtar: k3'));
assert.ok(yeni.includes('son_denetim: 2026-08-31'));

const matris = {
  iddialar: [
    { iddia_id: 'i1', tur: 'olgu', kaynaklar: [{ anahtar: 'k2', destek: 'dogrudan' }] },
    { iddia_id: 'i2', tur: 'olgu', kaynaklar: [
      { anahtar: 'k1', destek: 'kismi' }, { anahtar: 'k2', destek: 'baglam' },
    ] },
  ],
};
const sonuc = matrisiAyikla(matris, ['k2']);
assert.deepEqual(sonuc, { kaynakBaglantisi: 2, iddia: 1 });
assert.equal(matris.iddialar.length, 1);
assert.deepEqual(matris.iddialar[0].kaynaklar, [{ anahtar: 'k1', destek: 'kismi' }]);
assert.deepEqual(matris.sayaclar, { dogrudan: 0, kismi: 1, desteksiz: 0, olculemez: 0 });

console.log('giris-kapisi-onar.test.mjs: 9/9 gecti');
