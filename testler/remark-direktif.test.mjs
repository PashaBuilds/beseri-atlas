import assert from 'node:assert/strict';
import { remarkDirektif } from '../araclar/remark-eklentileri.mjs';

const agac = {
  type: 'root',
  children: [{
    type: 'paragraph',
    children: [{
      type: 'text',
      value: '::tartismali[İlk satırda başlayan\nve ikinci satırda süren açıklama.]{harita=tartisma-deneme}',
    }],
  }],
};

remarkDirektif()(agac, { fail(mesaj) { throw new Error(mesaj); } });

assert.equal(agac.children[0].type, 'html');
assert.match(agac.children[0].value, /class="tartismali-cagri"/);
assert.match(agac.children[0].value, /İlk satırda başlayan ve ikinci satırda süren açıklama\./);
assert.match(agac.children[0].value, /\/tartisma\/deneme\//);
assert.doesNotMatch(agac.children[0].value, /::tartismali/);

console.log('ok  cok satirli tartismali cagrisi ham metin olarak sizmaz');
