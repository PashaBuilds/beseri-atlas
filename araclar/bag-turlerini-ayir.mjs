#!/usr/bin/env node
// Eski korpustaki `ilgili` alanini iki anlamli bag turune ayirir.
//
// - Karsilikli kenarlar `ilgili` olarak kalir.
// - Yalniz bir makaleden acilan kenarlar `baglam` alanina tasinir.
//
// Boylece kavram merkezlerine yuzlerce yapay geri bag eklenmez; okur mevcut
// gecisleri kaybetmez ve KAPI 5 gercekten karsilikli olmasi gereken komsulugu
// denetler. Varsayilan kip kuru provadir; yazmak icin `--uygula` gerekir.
import fs from 'node:fs';
import { makaleleriTopla } from './ortak.mjs';

function listeBloku(satirlar, alan) {
  const bas = satirlar.findIndex((s) => new RegExp(`^${alan}:\\s*(?:\\[\\s*\\])?\\s*$`).test(s));
  if (bas < 0) return null;
  let son = bas;
  while (son + 1 < satirlar.length && /^\s+-\s+/.test(satirlar[son + 1])) son += 1;
  return { bas, son };
}

function listeSatirlari(alan, degerler) {
  return degerler.length ? [`${alan}:`, ...degerler.map((x) => `  - ${x}`)] : [`${alan}: []`];
}

/** Ham Markdown frontmatter'inda iki listeyi bicimi bozmadan yeniler. */
export function bagListeleriniYaz(ham, ilgili, baglam) {
  const satirlar = ham.split(/\r?\n/);
  const ilgiliBloku = listeBloku(satirlar, 'ilgili');
  if (!ilgiliBloku) throw new Error('ilgili alani bulunamadi');
  satirlar.splice(ilgiliBloku.bas, ilgiliBloku.son - ilgiliBloku.bas + 1,
    ...listeSatirlari('ilgili', ilgili));

  const baglamBloku = listeBloku(satirlar, 'baglam');
  if (baglamBloku) {
    satirlar.splice(baglamBloku.bas, baglamBloku.son - baglamBloku.bas + 1,
      ...listeSatirlari('baglam', baglam));
  } else if (baglam.length) {
    const yeniIlgili = listeBloku(satirlar, 'ilgili');
    satirlar.splice(yeniIlgili.son + 1, 0, ...listeSatirlari('baglam', baglam));
  }
  return satirlar.join('\n');
}

export function baglariAyir(makaleler) {
  const harita = new Map(makaleler.filter((m) => m.fm.id).map((m) => [m.fm.id, m]));
  const degisiklikler = [];
  for (const m of makaleler) {
    const tasinan = [];
    const kalan = [];
    for (const hedefId of m.fm.ilgili || []) {
      const hedef = harita.get(hedefId);
      const geri = hedef && ((hedef.fm.ilgili || []).includes(m.fm.id)
        || (hedef.fm.okuma_onerisi || []).includes(m.fm.id)
        || (hedef.fm.hangi_tartismada || []).includes(m.fm.id));
      if (hedef && !geri) tasinan.push(hedefId);
      else kalan.push(hedefId);
    }
    if (!tasinan.length) continue;
    const baglam = [...new Set([...(m.fm.baglam || []), ...tasinan])];
    degisiklikler.push({ makale: m, ilgili: kalan, baglam, tasinan });
  }
  return degisiklikler;
}

if (process.argv[1]?.endsWith('bag-turlerini-ayir.mjs')) {
  const uygula = process.argv.includes('--uygula');
  const degisiklikler = baglariAyir(makaleleriTopla());
  const kenar = degisiklikler.reduce((n, x) => n + x.tasinan.length, 0);
  for (const d of degisiklikler) {
    console.log(`${uygula ? 'AYRILDI' : 'KURU'} ${d.makale.fm.id}: ${d.tasinan.length} yonlu bag`);
    if (uygula) fs.writeFileSync(d.makale.yol,
      bagListeleriniYaz(d.makale.ham, d.ilgili, d.baglam));
  }
  console.log(`\n${kenar} kenar · ${degisiklikler.length} makale${uygula ? ' guncellendi' : ' degisecek'}`);
}
