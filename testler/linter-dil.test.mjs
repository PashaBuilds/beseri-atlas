// KAPI 18 fikstur testleri — kapinin yakalamasi GEREKENLERI sentetik ornekle
// dogrular. Kapi degisikligi bu dosyayi kirmadan bu davranislari bozamaz.
//
//   node testler/linter-dil.test.mjs
import assert from 'node:assert/strict';
import { dilDenetimi, dilTabanHesapla, kalipSay } from '../araclar/linter-dil.mjs';

const yap = (id, govde) => ({ fm: { id }, goreli: `icerik/test/${id}.md`, govde });
let kosulan = 0;
const test = (ad, fn) => { fn(); kosulan += 1; console.log(`ok  ${ad}`); };

// 1) Temiz makale gecer.
test('temiz makale hata uretmez', () => {
  const r = dilDenetimi([yap('temiz', 'Roma ordusu MS 9 yılında pusuya düştü.')],
    { taban: { makaleler: {} } });
  assert.equal(r.hatalar.length, 0);
});

// 2) Defterde olmayan (yeni) makale kalip iceremez.
test('yeni makalede kalip HATA', () => {
  const r = dilDenetimi([yap('yeni', 'Atlas bu geçişi ayrıca kaydeder. Bu dosyanın sınırı dardır.')],
    { taban: { makaleler: {} } });
  assert.ok(r.hatalar.length >= 2, `beklenen >=2 hata, gelen ${r.hatalar.length}`);
});

// 3) Var olan makalede borc buyuyemez.
test('borc buyumesi HATA', () => {
  const r = dilDenetimi([yap('eski', 'Atlas kaydeder. Atlas yine kaydeder.')],
    { taban: { makaleler: { eski: { atlas_oz: 1, bu_dosya: 0, ayrica_kaydeder: 0, sablon_kapanis: 0 } } } });
  assert.equal(r.hatalar.length, 1);
  assert.match(r.hatalar[0].mesaj, /borc buyuyemez/);
});

// 4) Defterdeki esikte kalan makale gecer (borc olarak gorunur ama hata degil).
test('esikte kalan gecer', () => {
  const r = dilDenetimi([yap('eski', 'Atlas kaydeder.')],
    { taban: { makaleler: { eski: { atlas_oz: 1, bu_dosya: 0, ayrica_kaydeder: 0, sablon_kapanis: 0 } } } });
  assert.equal(r.hatalar.length, 0);
});

// 5) Defter yeniden yazilarak borc BUYUTULEMEZ (yalnizca asagi yon).
test('taban yukari yazilamaz', () => {
  const eski = { makaleler: { x: { atlas_oz: 2, bu_dosya: 0, ayrica_kaydeder: 0, sablon_kapanis: 0 } } };
  // makale su an 5 gecis tasiyor olsa da defter 2'de kalir:
  const kayit = dilTabanHesapla([yap('x', 'Atlas. Atlas. Atlas. Atlas. Atlas.')], { eski });
  assert.equal(kayit.makaleler.x.atlas_oz, 2);
  // iyilesme defteri asagi ceker:
  const kayit2 = dilTabanHesapla([yap('x', 'Atlas.')], { eski });
  assert.equal(kayit2.makaleler.x.atlas_oz, 1);
});

// 6) Cografi "Atlas" oz-gonderim sayilmaz.
test('Atlas Okyanusu / Atlas Daglari sayilmaz', () => {
  const s = kalipSay('Gemi Atlas Okyanusu üzerinden geçti; Atlas Dağları güneyde kalır.');
  assert.equal(s.atlas_oz, 0);
});

// 7) Ek almis oz-gonderimler sayilir.
test('Atlasin / Atlasa gibi ekli bicimler sayilir', () => {
  const s = kalipSay("Atlasın bu dosyası konuyu Atlas'a bağlar.");
  assert.ok(s.atlas_oz >= 2, `beklenen >=2, gelen ${s.atlas_oz}`);
  assert.equal(s.bu_dosya, 1); // "bu dosyası" da oz-gonderimdir; ekli bicim sayilir
});

// 8) Sablon kapanis basligi yalniz baslik olarak sayilir.
test('sablon kapanis basligi tespiti', () => {
  const s = kalipSay('## Bu dosyanın sınırı\n\nMetin. Okuma yönlendirmesi sözü gövdede geçebilir.');
  assert.equal(s.sablon_kapanis, 1);
});

console.log(`\n${kosulan} test gecti`);
