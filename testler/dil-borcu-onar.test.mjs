import assert from 'node:assert/strict';
import { govdeyiOnar } from '../araclar/dil-borcu-onar.mjs';
import { kalipSay } from '../araclar/linter-dil.mjs';

const eski = `Atlas bu ayrımı ayrıca kaydeder.[^k2] Bir olayın ne olduğu ile sonradan neyi temsil ettiği ayrı iki sorudur.

## Bu dosyanın sınırı

Bu dosyada bütün vakalar ele alınmaz. Bu dosya da tek bir hüküm vermez. Atlasın kavram dosyası ayrıntıyı açıklar.

Gemi Atlas Okyanusu üzerinden geçti. Dünya nüfus tarihi atlası başka bir eser türüdür.`;
const yeni = govdeyiOnar(eski);
assert.match(yeni, /ayrı iki sorudur\.\[\^k2\]/);
assert.doesNotMatch(yeni, /çıkarım yapılabilir|sonuç şudur|örüntü belirir/);
assert.match(yeni, /## Kanıtın ve kapsamın sınırı/);
assert.match(yeni, /Bu incelemede bütün vakalar ele alınmaz/);
assert.match(yeni, /Bu inceleme de tek bir hüküm vermez/);
assert.match(yeni, /Korpusun kavram dosyası/);
assert.match(yeni, /Atlas Okyanusu/);
assert.match(yeni, /tarihi atlası/);
const sayim = kalipSay(yeni);
assert.deepEqual({
  atlas_oz: sayim.atlas_oz, bu_dosya: sayim.bu_dosya,
  ayrica_kaydeder: sayim.ayrica_kaydeder, sablon_kapanis: sayim.sablon_kapanis,
}, { atlas_oz: 0, bu_dosya: 0, ayrica_kaydeder: 0, sablon_kapanis: 0 });
// Adi Korpus yapmak borcu kapatmaz; ikinci katman olcum bunu yakalar.
assert.equal(sayim.korpus_oz, 1);
console.log('dil-borcu-onar.test.mjs: 10/10 gecti');
