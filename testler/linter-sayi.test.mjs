// KAPI 19 fikstur testleri — sentetik iddialarla kapinin yakalama davranisi.
//   node testler/linter-sayi.test.mjs
import assert from 'node:assert/strict';
import { sayiDenetimi, nufusIddialari } from '../araclar/linter-sayi.mjs';

const seri = new Map([
  [1800, { deger: 983104755, projeksiyon: false }],
  [2020, { deger: 7887001289, projeksiyon: false }],
  [-10000, { deger: 4501152, projeksiyon: false }],
]);
const yap = (id, govde) => ({ fm: { id }, goreli: `icerik/test/${id}.md`, govde });
let n = 0;
const test = (ad, fn) => { fn(); n += 1; console.log(`ok  ${ad}`); };

test('dogru deger gecer', () => {
  const r = sayiDenetimi([yap('a', "Uzun dönemli seride dünya nüfusu 2020'de yaklaşık 7,89 milyardır.[^k1]")], { seri });
  assert.equal(r.hatalar.length, 0);
});

test('sapan deger HATA', () => {
  const r = sayiDenetimi([yap('a', "Uzun dönemli seride dünya nüfusu 2020'de yaklaşık 7,84 milyardır.[^k1]")], { seri });
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /7,89/);
});

test('olmayan yil HATA', () => {
  const r = sayiDenetimi([yap('a', "Uzun dönemli seride dünya nüfusu 1789'da yaklaşık 938,2 milyondur.[^k1]")], { seri });
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /içermiyor/);
});

test('MÖ yillari negatif esler', () => {
  const i = nufusIddialari('Uzun dönemli seride dünya nüfusu MÖ 10000 için yaklaşık 4,5 milyondur.');
  assert.equal(i.length, 1);
  assert.equal(i[0].yil, -10000);
});

test('kalip disi "yaklasik X milyon" olculmez', () => {
  const r = sayiDenetimi([yap('a', 'Savaşta yaklaşık 2 milyon insan öldü.[^k1]')], { seri });
  assert.equal(r.olcum.olculen, 0);
});

test('coklu cift ayni cumlede', () => {
  const i = nufusIddialari("dünya nüfusu 1800'de yaklaşık 983,1 milyon, 2020'de yaklaşık 7,89 milyar oldu.");
  assert.equal(i.length, 2);
});

console.log(`\n${n} test gecti`);
