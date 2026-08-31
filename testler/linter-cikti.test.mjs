import assert from 'node:assert/strict';
import { kayipKarsilastirmaMetni } from '../araclar/linter-cikti.mjs';

const direktif = '::tartismali[Aynı yıl için üç ayrı sayı bulunuyor.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}';
assert.equal(
  kayipKarsilastirmaMetni(direktif),
  'Aynı yıl için üç ayrı sayı bulunuyor.',
  'içerik-kaybı denetimi leaf direktifin yalnız görünür metnini ölçmeli',
);

const normalParagraf = 'Normal bir paragraf olduğu gibi kalır.';
assert.equal(kayipKarsilastirmaMetni(normalParagraf), normalParagraf);

console.log('linter-cikti.test.mjs: 2/2 gecti');
