// KAPI 19 fikstur testleri — sentetik iddialarla kapinin yakalama davranisi.
// Seriler enjekte edilir; testler veri-setleri/ altindaki gercek dosyalara
// bagli degildir (ve onlari asla yazmaz).
//   node testler/linter-sayi.test.mjs
import assert from 'node:assert/strict';
import { sayiDenetimi, nufusIddialari, seriIddialari, SERILER } from '../araclar/linter-sayi.mjs';

const nufusSeri = new Map([
  [1800, { deger: 983104755, projeksiyon: false }],
  [2020, { deger: 7887001289, projeksiyon: false }],
  [-10000, { deger: 4501152, projeksiyon: false }],
]);
const okurSeri = new Map([[1820, { deger: 12.046689 }], [2024, { deger: 87.74 }]]);
const bugdaySeri = new Map([[1961, { deger: 1.0889001 }], [2024, { deger: 3.64 }]]);

const yalnizNufus = { seriler: { nufus: SERILER.nufus }, veriler: { nufus: nufusSeri } };
const yalnizOkur = { seriler: { okuryazarlik: SERILER.okuryazarlik }, veriler: { okuryazarlik: okurSeri } };
const yalnizBugday = { seriler: { tarimsal_verim: SERILER.tarimsal_verim }, veriler: { tarimsal_verim: bugdaySeri } };

const yap = (id, govde) => ({ fm: { id }, goreli: `icerik/test/${id}.md`, govde });
let n = 0;
const test = (ad, fn) => { fn(); n += 1; console.log(`ok  ${ad}`); };

test('dogru deger gecer', () => {
  const r = sayiDenetimi([yap('a', "Uzun dönemli seride dünya nüfusu 2020'de yaklaşık 7,89 milyardır.[^k1]")], yalnizNufus);
  assert.equal(r.hatalar.length, 0);
});

test('sapan deger HATA', () => {
  const r = sayiDenetimi([yap('a', "Uzun dönemli seride dünya nüfusu 2020'de yaklaşık 7,84 milyardır.[^k1]")], yalnizNufus);
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /7,89/);
});

test('olmayan yil HATA', () => {
  const r = sayiDenetimi([yap('a', "Uzun dönemli seride dünya nüfusu 1789'da yaklaşık 938,2 milyondur.[^k1]")], yalnizNufus);
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /içermiyor/);
});

test('MÖ yillari negatif esler', () => {
  const i = nufusIddialari('Uzun dönemli seride dünya nüfusu MÖ 10000 için yaklaşık 4,5 milyondur.');
  assert.equal(i.length, 1);
  assert.equal(i[0].yil, -10000);
});

test('kalip disi "yaklasik X milyon" olculmez', () => {
  const r = sayiDenetimi([yap('a', 'Savaşta yaklaşık 2 milyon insan öldü.[^k1]')], yalnizNufus);
  assert.equal(r.olcum.olculen, 0);
});

test('coklu cift ayni cumlede', () => {
  const i = nufusIddialari("dünya nüfusu 1800'de yaklaşık 983,1 milyon, 2020'de yaklaşık 7,89 milyar oldu.");
  assert.equal(i.length, 2);
});

// --- seri kutugu genislemesi (2026-08-29) ---

test('yuzde serisi dogru deger gecer', () => {
  const r = sayiDenetimi([yap('a', 'Okuryazarlık serisinde dünya değeri 1820 için yüzde 12,05.[^k1]')], yalnizOkur);
  assert.equal(r.hatalar.length, 0);
  assert.equal(r.olcum.olculen, 1);
});

test('yuzde serisi sapan deger HATA', () => {
  const r = sayiDenetimi([yap('a', 'Okuryazarlık serisinde dünya değeri 1820 için yüzde 99,9.[^k1]')], yalnizOkur);
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /okuryazarlık oranı/);
});

test('yuzde serisinde olmayan yil HATA', () => {
  const r = sayiDenetimi([yap('a', 'Okuryazarlık oranı 1493 için yüzde 12,0 idi.[^k1]')], yalnizOkur);
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /içermiyor/);
});

test('kapsam disi yuzde olculmez', () => {
  const r = sayiDenetimi([yap('a', 'Seçimde 1820 yılında oyların yüzde 12,05 kadarı geçersizdi.[^k1]')], yalnizOkur);
  assert.equal(r.olcum.olculen, 0);
});

test('ton serisi araya giren sozcukle de olculur', () => {
  const i = seriIddialari("Buğday verimi 1961'de hektar başına 1,09 tondu.", { tarimsal_verim: SERILER.tarimsal_verim });
  assert.equal(i.length, 1);
  assert.equal(i[0].yil, 1961);
});

test('ton serisi sapan deger HATA', () => {
  const r = sayiDenetimi([yap('a', "Buğday verimi 1961'de hektar başına 9,90 tondu.[^k1]")], yalnizBugday);
  assert.equal(r.hatalar.length, 1);
});

test('sayi yuzeyi ozette gorunur — olculemeyen gizlenmez', () => {
  const r = sayiDenetimi([yap('a', 'Kayıt 1453, 1683 ve 1918 yıllarını verir.[^k1]')], yalnizNufus);
  assert.equal(r.olcum.olculen, 0);
  assert.ok(r.olcum.yuzey >= 3);
});

test('eksik seri dosyasi HATA uretir', () => {
  const r = sayiDenetimi([yap('a', 'metin')], { seriler: { nufus: SERILER.nufus }, veriler: {} });
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /referans seri yok/);
});

console.log(`\n${n} test gecti`);
