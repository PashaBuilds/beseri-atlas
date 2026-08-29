// denetle.mjs sayi cevrimleri — Cin rakami ve Ingilizce sayi sozcugu.
//
// Ikisi de 2026-08-29'da eklendi: mekanik katman Arap rakami olmayan
// kaynaklarda sayilari bulamiyor ve "kaynakta yok" hukmunu KESIN saniyordu.
// Han shu sayimi (Cince) ve Herodotos'un Perseus metni (Ingilizce sozcuk)
// bu yuzden sahte HATA uretiyordu.
//   node testler/denetle-sayi.test.mjs
import assert from 'node:assert/strict';
import {
  cinRakamiCoz, cinSayiHavuzu, ingilizceSayiCoz, ingilizceSayiHavuzu, atomlar, iddiaCumleleri,
} from '../araclar/denetle.mjs';

let n = 0;
const test = (ad, fn) => { fn(); n += 1; console.log(`ok  ${ad}`); };

test('cin rakami: Han shu nufus sayisi', () => {
  assert.equal(cinRakamiCoz('五千九百五十九萬四千九百七十八'), 59594978);
});

test('cin rakami: Han shu hane sayisi', () => {
  assert.equal(cinRakamiCoz('一千二百二十三萬三千六十二'), 12233062);
});

test('cin rakami: onlu kaliplar', () => {
  assert.equal(cinRakamiCoz('十八'), 18);
  assert.equal(cinRakamiCoz('三百'), 300);
  assert.equal(cinRakamiCoz('二萬'), 20000);
});

test('cin rakami: sayi olmayan dize null doner', () => {
  assert.equal(cinRakamiCoz('漢書'), null);
});

test('cin havuzu Arap karsiligini uretir', () => {
  const h = cinSayiHavuzu('民戶一千二百二十三萬三千六十二，口五千九百五十九萬四千九百七十八');
  assert.ok(h.includes('12233062'));
  assert.ok(h.includes('59594978'));
});

test('cin havuzu: Cin rakami yoksa bos', () => {
  assert.equal(cinSayiHavuzu('plain english text'), '');
});

test('ingilizce sozcuk: Herodotos toplami', () => {
  assert.equal(
    ingilizceSayiCoz('five million two hundred and eighty three thousand two hundred and twenty'.split(' ')),
    5283220,
  );
});

test('ingilizce sozcuk: klasik "seventeen hundred thousand"', () => {
  assert.equal(ingilizceSayiCoz(['seventeen', 'hundred', 'thousand']), 1700000);
});

test('ingilizce havuz tireli yazimi cozer', () => {
  const h = ingilizceSayiHavuzu('was five million, two hundred and eighty-three thousand, two hundred and twenty.');
  assert.ok(h.includes('5283220'));
});

test('ingilizce havuz: carpan yoksa bos', () => {
  assert.equal(ingilizceSayiHavuzu('there were seven men and twelve horses'), '');
});

test('ingilizce havuz bileske sayiyi butun olarak cozer', () => {
  // "twenty thousand and seven" = 20.007; parcalara bolmez.
  const h = ingilizceSayiHavuzu('twenty thousand and seven');
  assert.deepEqual(h.split(' ').filter(Boolean), ['20007']);
});

test('ingilizce havuz 100 altindaki tekil degerleri almaz', () => {
  // Kucuk sayilar gurultudur: yillarla ve baska atomlarla carpisir. Ayrica
  // tek sozcukluk dizi (yalniz "thousand") sayi sayilmaz — onunde carpani
  // olmayan birim, metinde "a thousand" gibi belirsiz bir nicelik olabilir.
  const h = ingilizceSayiHavuzu('seven men, twelve horses and two thousand arrows');
  assert.ok(h.split(' ').includes('2000'));
  assert.ok(!h.split(' ').includes('7'));
  assert.ok(!h.split(' ').includes('12'));
  assert.equal(ingilizceSayiHavuzu('a thousand arrows'), '');
});

test('binlik ayrali sayi atom olarak cikarilir', () => {
  const a = atomlar('Sayim 1.957.523 kisi verdi.');
  const buyuk = a.sayisal.find((x) => x.tur === 'buyuk-sayi');
  assert.ok(buyuk);
  assert.ok(buyuk.adaylar.includes('1957523'));
  assert.ok(buyuk.adaylar.includes('1,957,523'));
});

test('sira sayisi cumleyi kirmaz', () => {
  const c = iddiaCumleleri('Sınır 38. paralelde çizildi.[^k1] Antlaşmanın 5. maddesi bunu düzenler.[^k2]');
  assert.equal(c.length, 2);
  assert.ok(c[0].cumle.includes('38. paralelde'));
  assert.ok(c[1].cumle.includes('5. maddesi'));
});

console.log(`\n${n} test gecti`);
