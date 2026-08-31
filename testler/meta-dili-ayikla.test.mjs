import test from 'node:test';
import assert from 'node:assert/strict';
import { metaDiliAyikla } from '../araclar/meta-dili-ayikla.mjs';

test('meta cumleyi atar, ayni paragraftaki tarihsel cumleyi korur', () => {
  const girdi = 'Bu, korpusun genel kuralıdır.[^k1] Bir teknik değişimin etkisi, yaygınlaştığı tarihte ölçülür.[^k2]\n';
  const cikti = metaDiliAyikla(girdi);
  assert.doesNotMatch(cikti, /korpus/iu);
  assert.match(cikti, /Bir teknik değişimin etkisi/iu);
  assert.match(cikti, /ölçülür\.\[\^k2\]/u);
});

test('meta basligi kaldirir, altindaki icerigi korur', () => {
  const cikti = metaDiliAyikla('## Korpusun konumu\n\nKanıt iki ayrı yoruma izin verir.[^k1]\n');
  assert.doesNotMatch(cikti, /Korpus/iu);
  assert.match(cikti, /Kanıt iki ayrı yoruma izin verir/iu);
});

test('direktifte yalniz meta cumleyi ayiklar', () => {
  const girdi = '::tartismali[İki ölçüt farklı sonuç verir. Korpus birini seçmez.]{harita=tartisma-ornek}\n';
  assert.equal(metaDiliAyikla(girdi), '::tartismali[İki ölçüt farklı sonuç verir.]{harita=tartisma-ornek}\n');
});
