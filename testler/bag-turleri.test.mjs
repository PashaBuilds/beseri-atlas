import assert from 'node:assert/strict';
import { baglariAyir, bagListeleriniYaz } from '../araclar/bag-turlerini-ayir.mjs';
import { linkDenetimi } from '../araclar/linter-link.mjs';

const makale = (id, ilgili = [], baglam = []) => ({
  fm: { id, ilgili, baglam, okuma_onerisi: [] },
  goreli: `icerik/test/${id}.md`, dosya: `${id}.md`, tip: id.split('-')[0],
  govde: '', ham: `---\nid: ${id}\nilgili:\n${ilgili.map((x) => `  - ${x}`).join('\n')}\nokuma_onerisi: []\n---\n\nMetin.`,
});

const a = makale('olay-a', ['kavram-b', 'olay-c']);
const b = makale('kavram-b');
const c = makale('olay-c', ['olay-a']);
const degisiklik = baglariAyir([a, b, c]);
assert.equal(degisiklik.length, 1);
assert.deepEqual(degisiklik[0].tasinan, ['kavram-b']);
assert.deepEqual(degisiklik[0].ilgili, ['olay-c']);

const ham = bagListeleriniYaz(a.ham, degisiklik[0].ilgili, degisiklik[0].baglam);
assert.match(ham, /ilgili:\n  - olay-c\nbaglam:\n  - kavram-b\nokuma_onerisi/);

const temiz = [
  { ...a, fm: { ...a.fm, ilgili: ['olay-c'], baglam: ['kavram-b'] } }, b, c,
];
const rapor = linkDenetimi(temiz);
assert.equal(rapor.hatalar.length, 0);
assert.equal(rapor.uyarilar.length, 0);
console.log('bag-turleri.test.mjs: 4/4 gecti');
