import assert from 'node:assert/strict';
import { geciciHttpDurumuMu } from '../araclar/getir.mjs';

assert.equal(geciciHttpDurumuMu(408), true, '408 gecici olcum sorunudur');
assert.equal(geciciHttpDurumuMu(425), true, '425 gecici olcum sorunudur');
assert.equal(geciciHttpDurumuMu(429), true, '429 hiz siniridir; olu kaynak degildir');
assert.equal(geciciHttpDurumuMu(500), true, '5xx gecici sunucu sorunudur');
assert.equal(geciciHttpDurumuMu(403), false, '403 kalici erisim engeli olarak kalmalidir');
assert.equal(geciciHttpDurumuMu(404), false, '404 olu baglanti olarak kalmalidir');
assert.equal(geciciHttpDurumuMu(200), false, '200 gecici durum degildir');

console.log('getir.test.mjs: 7/7 gecti');
