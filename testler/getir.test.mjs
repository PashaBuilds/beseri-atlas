import assert from 'node:assert/strict';
import { geciciHttpDurumuMu, istekBasliklari } from '../araclar/getir.mjs';

assert.equal(geciciHttpDurumuMu(202), true, '202 temsilin henuz hazir olmadigini bildirir');
assert.equal(geciciHttpDurumuMu(408), true, '408 gecici olcum sorunudur');
assert.equal(geciciHttpDurumuMu(425), true, '425 gecici olcum sorunudur');
assert.equal(geciciHttpDurumuMu(429), true, '429 hiz siniridir; olu kaynak degildir');
assert.equal(geciciHttpDurumuMu(500), true, '5xx gecici sunucu sorunudur');
assert.equal(geciciHttpDurumuMu(403), false, '403 kalici erisim engeli olarak kalmalidir');
assert.equal(geciciHttpDurumuMu(404), false, '404 olu baglanti olarak kalmalidir');
assert.equal(geciciHttpDurumuMu(200), false, '200 gecici durum degildir');

assert.equal(istekBasliklari('https://r.jina.ai/https://example.org').Accept, 'text/plain',
  'Jina Reader metin istemi alir');
assert.equal(istekBasliklari('https://example.org').Accept.includes('text/html'), true,
  'diger kaynaklarin istek basliklari degismez');

console.log('getir.test.mjs: 10/10 gecti');
