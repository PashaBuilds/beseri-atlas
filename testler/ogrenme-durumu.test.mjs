import assert from 'node:assert/strict';
import {
  bosDurum, normallestir, eskiOkumalariTasi, profilKaydet, makaleBaslat,
  makaleAlaniKaydet, ilerlemeKaydet, makaleTamamla, tekrarDegerlendir,
  rotaBaslat, rotaCevabiKaydet, rotaIlerlemesi, ozetle,
} from '../src/lib/ogrenme-durumu.mjs';

const t0 = new Date('2026-08-30T09:00:00.000Z');
let d = bosDurum();
assert.equal(d.surum, 2);
assert.equal(d.profil.tamamlandi, false);

d = profilKaydet(d, { amac: 'baglam', tempo: 20, baslangicRotasi: 'tarihci-gibi-dusunmek' }, t0);
assert.equal(d.profil.tamamlandi, true);
assert.equal(d.aktif.rota, 'tarihci-gibi-dusunmek');

d = makaleBaslat(d, 'kavram-birincil-kaynak', t0);
d = ilerlemeKaydet(d, 'kavram-birincil-kaynak', .42, t0);
d = ilerlemeKaydet(d, 'kavram-birincil-kaynak', .2, t0);
assert.equal(d.makaleler['kavram-birincil-kaynak'].ilerleme, .42, 'ilerleme geriye gitmez');

d = makaleAlaniKaydet(d, 'kavram-birincil-kaynak', 'onceCevap', 'İlk tahminim', t0);
d = makaleAlaniKaydet(d, 'kavram-birincil-kaynak', 'sonraCevap', 'Yeni açıklamam', t0);
assert.equal(d.makaleler['kavram-birincil-kaynak'].onceCevap, 'İlk tahminim');

d = makaleTamamla(d, 'kavram-birincil-kaynak', { guven: 2, zaman: t0 });
assert.equal(d.makaleler['kavram-birincil-kaynak'].tamamlandi, true);
assert.equal(d.makaleler['kavram-birincil-kaynak'].sonrakiTekrar, '2026-08-31T09:00:00.000Z');

d = tekrarDegerlendir(d, 'kavram-birincil-kaynak', 'orta', new Date('2026-08-31T09:00:00.000Z'));
assert.equal(d.makaleler['kavram-birincil-kaynak'].tekrarAsamasi, 1);
assert.equal(d.makaleler['kavram-birincil-kaynak'].sonrakiTekrar, '2026-09-03T09:00:00.000Z');

d = rotaCevabiKaydet(d, 'tarihci-gibi-dusunmek', 'ilkCevap', 'Kanıt önemlidir.', t0);
assert.equal(d.rotalar['tarihci-gibi-dusunmek'].ilkCevap, 'Kanıt önemlidir.');
d = rotaBaslat(d, 'guc-nasil-kurulur', t0);
assert.equal(d.aktif.rota, 'guc-nasil-kurulur');
assert.equal(d.rotalar['guc-nasil-kurulur'].baslangic, t0.toISOString());
assert.deepEqual(rotaIlerlemesi(d, ['kavram-birincil-kaynak', 'kavram-anakronizm']), {
  tamam: 1, toplam: 2, siradaki: 'kavram-anakronizm', oran: .5,
});

const eski = eskiOkumalariTasi(bosDurum(), ['olay-sanayi-devrimi'], t0);
assert.equal(eski.makaleler['olay-sanayi-devrimi'].tamamlandi, true, 'v1 okuma kaydi tasinir');

const bozuk = normallestir({ profil: { tempo: 999 }, makaleler: { kotu: {}, 'olay-test': { ilerleme: 7 } } });
assert.equal(bozuk.profil.tempo, 20);
assert.equal(bozuk.makaleler.kotu, undefined);
assert.equal(bozuk.makaleler['olay-test'].ilerleme, 1);

const ozet = ozetle(d, new Date('2026-09-04T09:00:00.000Z'));
assert.equal(ozet.tamamlanan, 1);
assert.deepEqual(ozet.tekrarlar, ['kavram-birincil-kaynak']);
assert.equal(ozet.notlar.length, 1);

console.log('ogrenme-durumu.test.mjs: tüm durum ve tekrar senaryoları geçti');
