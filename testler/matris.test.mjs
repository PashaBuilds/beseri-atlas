// Matris dogrulayicisinin fikstur testleri.
//   node testler/matris.test.mjs
import assert from 'node:assert/strict';
import { matrisiDogrula, sayaclariHesapla, iddiaSinifi, cumleSadelestir } from '../araclar/matris.mjs';
import { govdeHash } from '../araclar/denetle.mjs';

let n = 0;
const test = (ad, fn) => { fn(); n += 1; console.log(`ok  ${ad}`); };

const iddia = (ek = {}) => ({
  iddia_id: 'i001', cumle: 'Roma MS 476da yikildi.', onem: 'destek', tur: 'tarih',
  kaynaklar: [{ anahtar: 'k1', destek: 'dogrudan' }], guven: 'yuksek', inceleme: '', ...ek,
});
const matris = (iddialar) => ({
  id: 'test', govde_hash: 'abc', commit: 'abc1234', zaman: '2026-08-28', hakem: 'hakem-a',
  iddialar, sayaclar: sayaclariHesapla(iddialar),
});

test('gecerli matris gecer', () => {
  const r = matrisiDogrula(matris([iddia()]));
  assert.equal(r.gecerli, true, r.hatalar.join('; '));
});

test('merkezi iddia desteksiz kalamaz', () => {
  const r = matrisiDogrula(matris([iddia({ onem: 'merkezi', kaynaklar: [] })]));
  assert.ok(r.hatalar.some((h) => h.includes('MERKEZI')));
});

test('merkezi iddia yalniz baglam kaynagiyla olculemez sayilir ve HATA', () => {
  const r = matrisiDogrula(matris([iddia({ onem: 'merkezi', kaynaklar: [{ anahtar: 'k1', destek: 'baglam' }] })]));
  assert.ok(r.hatalar.some((h) => h.includes('MERKEZI')));
});

test('sayac beyani hesapla tutmali', () => {
  const m = matris([iddia()]);
  m.sayaclar.dogrudan = 5;
  const r = matrisiDogrula(m);
  assert.ok(r.hatalar.some((h) => h.includes('sayac tutmuyor')));
});

test('celisir destek inceleme notu ister', () => {
  const r = matrisiDogrula(matris([iddia({ kaynaklar: [{ anahtar: 'k1', destek: 'celisir' }] })]));
  assert.ok(r.hatalar.some((h) => h.includes('inceleme')));
});

test('bayat hash yakalanir', () => {
  const makale = { fm: { id: 'test', kaynaklar: [{ anahtar: 'k1' }] }, govde: 'guncel govde' };
  const m = matris([iddia()]);
  m.govde_hash = 'eski-hash';
  const r = matrisiDogrula(m, makale);
  assert.equal(r.bayat, true);
});

test('guncel hash gecer', () => {
  const makale = { fm: { id: 'test', kaynaklar: [{ anahtar: 'k1' }] }, govde: 'guncel govde' };
  const m = matris([iddia()]);
  m.govde_hash = govdeHash(makale.govde);
  const r = matrisiDogrula(m, makale);
  assert.equal(r.bayat, false);
  assert.equal(r.gecerli, true, r.hatalar.join('; '));
});

test('kunyede olmayan anahtar HATA', () => {
  const makale = { fm: { id: 'test', kaynaklar: [{ anahtar: 'k1' }] }, govde: 'g' };
  const m = matris([iddia({ kaynaklar: [{ anahtar: 'k9', destek: 'dogrudan' }] })]);
  m.govde_hash = govdeHash('g');
  const r = matrisiDogrula(m, makale);
  assert.ok(r.hatalar.some((h) => h.includes('k9')));
});

test('yinelenen iddia_id HATA', () => {
  const r = matrisiDogrula(matris([iddia(), iddia()]));
  assert.ok(r.hatalar.some((h) => h.includes('yinelenen')));
});

test('celisir sinifi desteksizdir', () => {
  assert.equal(iddiaSinifi({ tur: 'olgu', kaynaklar: [{ anahtar: 'k1', destek: 'celisir' }] }), 'desteksiz');
  assert.equal(iddiaSinifi({ tur: 'yorum', kaynaklar: [] }), 'olculemez');
});


// --- cumle sadelestirme kalibrasyonu (2026-08-29) ---
// Iki olcum (K-6 tazelenebilirMi ve --eksik-iddia) farkli sadelestirme
// kullaniyordu ve bir dosya ayni anda ikisini birden saglayamiyordu.
// Bir ajan bunu olcup bildirdi; ikisi tek fonksiyona baglandi.

test('sadelestirici dipnot isaretini siler', () => {
  assert.equal(cumleSadelestir('Bir iddia.[^k3] Devami.'), 'Bir iddia. Devami.');
});

test('sadelestirici markdown vurgusunu siler', () => {
  assert.equal(cumleSadelestir('*Cinselligin Tarihi*nin ilk cildi'), 'Cinselligin Tarihinin ilk cildi');
  assert.equal(cumleSadelestir('`kod` ve _vurgu_'), 'kod ve vurgu');
});

test('sadelestirici markdown bagini metnine indirger', () => {
  assert.equal(cumleSadelestir('bkz. [Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasi'),
    'bkz. Sanayi Devrimi dosyasi');
});

test('sadelestirici boslugu normallestirir', () => {
  assert.equal(cumleSadelestir('  iki   satira\n  bolunmus  '), 'iki satira bolunmus');
});

test('markdownli matris cumlesi markdownsiz govdede bulunur', () => {
  // Kalibrasyon hatasinin ta kendisi: matris vurgulu, govde vurgusuz.
  const matrisCumlesi = cumleSadelestir("*Kanunlarin Ruhu*'nun XVII. kitabi");
  const govde = cumleSadelestir("Yazar, Kanunlarin Ruhu'nun XVII. kitabinda bunu yazar.");
  assert.ok(govde.includes(matrisCumlesi));
});

console.log(`\n${n} test gecti`);
