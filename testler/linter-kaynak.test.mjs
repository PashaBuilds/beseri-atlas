import assert from 'node:assert/strict';
import { birincilSayilirMi, kaynakDenetimi } from '../araclar/linter-kaynak.mjs';

const siniflar = {
  girisKapisi: new Set(['en.wikipedia.org']),
  birincil: new Set(['gutenberg.org']),
  veri: new Set(['ourworldindata.org']),
};

assert.equal(birincilSayilirMi([
  { tur: 'veri', url: 'https://ourworldindata.org/grapher/example.csv' },
], siniflar), true, 'veri seti her makale tipinde birincil kanittir');

assert.equal(birincilSayilirMi([
  { tur: 'birincil', birincil_tur: 'eser', url: 'https://persee.fr/doc/example' },
], siniflar), true, 'denetlenmis künye sinifi alan adinin genel sinifindan daha ozeldir');

assert.equal(birincilSayilirMi([
  { tur: 'akademik', url: 'https://example.edu/article' },
], siniflar), false, 'ikincil akademik kaynak kendiliginden birincil sayilmaz');

const makale = (id, ek = {}) => ({
  goreli: `icerik/kavram/${id}.md`,
  tip: 'kavram',
  fm: {
    id,
    tip: 'kavram',
    kaynaklar: [
      { anahtar: 'k1', tur: 'ansiklopedi', url: 'https://en.wikipedia.org/wiki/A' },
      { anahtar: 'k2', tur: 'akademik', url: 'https://example.edu/a' },
      { anahtar: 'k3', tur: 'akademik', url: 'https://example.org/b' },
    ],
    ...ek,
  },
  govde: '',
});

let r = kaynakDenetimi([makale('sinirli', { kaynak_siniri: 'Telif nedeniyle açık tam metin yok.' })], {
  havuz: { whitelist: [
    { alan: 'en.wikipedia.org', kullanim: 'giris_kapisi' },
    { alan: 'gutenberg.org', tur: 'birincil' },
    { alan: 'ourworldindata.org', tur: 'veri' },
  ] },
  borcDefteriYaz: false,
});
assert.equal(r.olcum.kanitAcigi, 0, 'acik kaynak siniri kanit boslugunu sessiz birakmaz');

r = kaynakDenetimi([makale('verili', { kaynaklar: [
  { anahtar: 'k1', tur: 'ansiklopedi', url: 'https://en.wikipedia.org/wiki/A' },
  { anahtar: 'k2', tur: 'veri', url: 'https://ourworldindata.org/grapher/example.csv' },
  { anahtar: 'k3', tur: 'akademik', url: 'https://example.org/b' },
] })], {
  havuz: { whitelist: [
    { alan: 'en.wikipedia.org', kullanim: 'giris_kapisi' },
    { alan: 'ourworldindata.org', tur: 'veri' },
  ] },
  borcDefteriYaz: false,
});
assert.equal(r.olcum.birincilsiz, 0, 'veri kaniti kavram makalesinde de sayilir');
assert.equal(r.olcum.kanitAcigi, 0);

r = kaynakDenetimi([makale('fazla-giris', { kaynaklar: [
  { anahtar: 'k1', tur: 'ansiklopedi', url: 'https://en.wikipedia.org/wiki/A' },
  { anahtar: 'k2', tur: 'ansiklopedi', url: 'https://en.wikipedia.org/wiki/B' },
  { anahtar: 'k3', tur: 'birincil', birincil_tur: 'eser', url: 'https://gutenberg.org/a' },
] })], {
  havuz: { whitelist: [
    { alan: 'en.wikipedia.org', kullanim: 'giris_kapisi' },
    { alan: 'gutenberg.org', tur: 'birincil' },
  ] },
  borcDefteriYaz: false,
});
assert.equal(r.gecti, false, 'ikinci giris kapisi artik olcum degil sert hatadir');
assert.equal(r.olcum.kuralIhlali, 1);

r = kaynakDenetimi([makale('kanitsiz')], {
  havuz: { whitelist: [
    { alan: 'en.wikipedia.org', kullanim: 'giris_kapisi' },
    { alan: 'gutenberg.org', tur: 'birincil' },
  ] },
  borcDefteriYaz: false,
});
assert.equal(r.gecti, false, 'birincil kaniti ve acik kaynak siniri olmayan makale artik sert hatadir');
assert.equal(r.olcum.kanitAcigi, 1);

console.log('linter-kaynak.test.mjs: 10/10 gecti');
