import assert from 'node:assert/strict';
import { makaleleriTopla } from '../araclar/ortak.mjs';
import {
  uretimKuyruguOku,
  uretimHattiDenetimi,
  paketMetni,
  iskeletBenzerligi,
  sonrakiParti,
} from '../araclar/uretim-hatti.mjs';

let n = 0;
function test(ad, fn) {
  try { fn(); n += 1; }
  catch (e) { console.error(`HATA: ${ad}`); throw e; }
}

test('üretim kuyruğu on gelecek rotada altmış dengeli aday taşır', () => {
  const veri = uretimKuyruguOku();
  assert.equal(veri.adaylar.length, 60);
  assert.equal(new Set(veri.adaylar.map((a) => a.rota)).size, 10);
  assert.equal(veri.sozlesme.yayin_puani, 10);
  assert.equal(veri.sozlesme.yonlu_bag_alani, 'baglam');
});

test('yeni üretim sözleşmesi bütün adaylarda geçer', () => {
  const rapor = uretimHattiDenetimi(makaleleriTopla());
  assert.deepEqual(rapor.hatalar, []);
  assert.equal(rapor.olcum.arastirmayaHazir, 5);
  assert.equal(rapor.olcum.canliKaynak, 21);
  assert.equal(rapor.olcum.kaynakSayisi, 21);
  assert.equal(rapor.olcum.paketli, 60);
  assert.equal(rapor.olcum.parti, 12);
});

test('paket kalite sözleşmesini ve doğal öğrenme iskeletini taşır', () => {
  const veri = uretimKuyruguOku();
  const metin = paketMetni(veri.adaylar[0], veri.sozlesme);
  assert.match(metin, /En az \*\*6 kaynak\*\*/);
  assert.match(metin, /Bağımsız oturum/);
  assert.match(metin, /Doğal öğrenme iskeleti/);
  assert.match(metin, /tek yönlü geçişler `baglam`/);
  assert.match(metin, /dolgu ile değil/);
});

test('bölüm iskeleti kopyası ölçülebilir', () => {
  const a = { fm: { id: 'a' }, govde: '## Bir\n## İki\n## Üç' };
  const b = { fm: { id: 'b' }, govde: '## Bir\n## İki\n## Üç' };
  const sonuc = iskeletBenzerligi(a, [a, b]);
  assert.equal(sonuc.oran, 1);
  assert.equal(sonuc.id, 'b');
});

test('tam sıra her adayı yalnız bir kez ve dengeli partilenebilir biçimde taşır', () => {
  const veri = uretimKuyruguOku();
  const sirali = sonrakiParti(veri.adaylar, veri.adaylar.length);
  assert.equal(sirali.length, 60);
  assert.equal(new Set(sirali.map((a) => a.id)).size, 60);
  assert.equal(sirali.slice(0, 5).every((a) => a.durum === 'arastirmada'), true);
});

console.log(`uretim-hatti.test.mjs: ${n}/5 gecti`);
