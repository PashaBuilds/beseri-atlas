import assert from 'node:assert/strict';
import { makaleleriTopla } from '../araclar/ortak.mjs';
import {
  rotaYapisiniCikar,
  makaleKalitesi,
  ogrenmeCekirdegiDenetimi,
} from '../araclar/linter-ogrenme-cekirdegi.mjs';

let n = 0;
function test(ad, fn) {
  try { fn(); n += 1; }
  catch (e) { console.error(`HATA: ${ad}`); throw e; }
}

const ornekRota = `
  slug: 'ornek-rota',
  ilkTahmin: 'Bu, açıklama kurduracak kadar uzun bir başlangıç tahmini sorusudur; okuru düşünmeye çağırır.',
  kapanisSorusu: 'Bu, öğrenilen mekanizmaları birbirine bağlayıp sınırlarını da tarttıracak kadar uzun bir kapanış sentezi sorusudur.',
  adimlar: [
    { id: 'olay-ornek', rol: 'Başlangıç', soru: 'Bu olayda hangi karar geri döndürülebilirdi ve bunu hangi kanıtla savunabiliriz?' },
    { id: 'kavram-ornek-1', rol: 'Kavram', soru: 'Bu kavram olayın hangi parçasını açıklar ve hangi parçasını görünmez bırakır?' },
    { id: 'aktor-ornek', rol: 'Aktör', soru: 'Bu aktörün amaçları ile sonuçları arasındaki farkı hangi mekanizma açıklayabilir?' },
    { id: 'kavram-ornek-2', rol: 'Karşılaştır', soru: 'İki açıklama aynı kanıtı neden farklı yorumlar ve hangisi daha fazla sınanabilir?' },
    { id: 'dusunur-ornek', rol: 'Çerçeve', soru: 'Bu düşünürün çerçevesi olguları nasıl seçer ve hangi varsayıma dayanır?' },
    { id: 'tartisma-ornek', rol: 'Sentez', soru: 'Rakip açıklamalardan hangisi daha güçlüdür ve hangi yeni kanıt kararımızı değiştirir?' },
  ],`;

test('rota ayrıştırıcısı altı adımı ve soruları korur', () => {
  const [rota] = rotaYapisiniCikar(ornekRota);
  assert.equal(rota.slug, 'ornek-rota');
  assert.equal(rota.adimlar.length, 6);
  assert.equal(rota.adimlar.at(-1).id, 'tartisma-ornek');
});

test('makale kalite puanı dokuz ölçütten hesaplanır', () => {
  const zayif = {
    fm: { id: 'kavram-zayif', tip: 'kavram', kaynaklar: [] },
    govde: 'Bu dosya kısa.',
  };
  const sonuc = makaleKalitesi(zayif);
  assert.equal(Object.keys(sonuc.olcutler).length, 9);
  assert.ok(sonuc.puan < 5);
});

test('yayındaki altı rota çekirdek sözleşmesini eksiksiz geçer', () => {
  const rapor = ogrenmeCekirdegiDenetimi(makaleleriTopla());
  assert.deepEqual(rapor.hatalar, []);
  assert.equal(rapor.olcum.rota, 6);
  assert.equal(rapor.olcum.adim, 36);
  assert.equal(rapor.olcum.tekrar, 0);
  assert.equal(rapor.olcum.ortalama, 10);
});

console.log(`ogrenme-cekirdegi.test.mjs: ${n}/3 gecti`);
