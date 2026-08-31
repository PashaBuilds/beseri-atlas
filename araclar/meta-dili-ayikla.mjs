#!/usr/bin/env node
// Kalan proje oz-gonderimlerini cumle duzeyinde ayiklar.
//
// Ilke: "korpus"u baska bir es anlamliyla degistirip sayaci kandirmak yerine,
// okura tarihsel bilgi vermeyen meta cumleyi kaldirir. Ayni paragraftaki
// tarihsel cumleler korunur. Markdown dipnotlari cumle bolme sirasinda gecici
// olarak noktalama isaretinin onune alinir, sonra eski bicimine dondurulur.
// Varsayilan kip kuru provadir; yazmak icin `--uygula` gerekir.
import fs from 'node:fs';
import { makaleleriTopla } from './ortak.mjs';
import { kalipSay } from './linter-dil.mjs';

const META = /\b(?:korpus(?:un|u|a|ta|taki)?|bu inceleme(?:nin|de|den|ye|yi|yle|ler|si|sinde)?)\b/iu;
const segmenter = new Intl.Segmenter('tr', { granularity: 'sentence' });

function dipnotuNoktaninOnuneAl(metin) {
  return metin.replace(/([.!?])((?:\[\^[^\]]+\])+)/gu, (_m, nokta, dipnot) => `${dipnot}${nokta}`);
}

function dipnotuYerineKoy(metin) {
  return metin.replace(/((?:\[\^[^\]]+\])+)([.!?])/gu, (_m, dipnot, nokta) => `${nokta}${dipnot}`);
}

function cumlelereAyir(metin) {
  const hazir = dipnotuNoktaninOnuneAl(metin.replace(/\s+/gu, ' ').trim());
  return [...segmenter.segment(hazir)].map((s) => dipnotuYerineKoy(s.segment.trim())).filter(Boolean);
}

function satirla(metin, genislik = 88) {
  const kelimeler = metin.replace(/\s+/gu, ' ').trim().split(' ').filter(Boolean);
  const satirlar = [];
  let satir = '';
  for (const kelime of kelimeler) {
    if (satir && satir.length + kelime.length + 1 > genislik) {
      satirlar.push(satir);
      satir = kelime;
    } else {
      satir = satir ? `${satir} ${kelime}` : kelime;
    }
  }
  if (satir) satirlar.push(satir);
  return satirlar.join('\n');
}

function direktifiAyikla(paragraf) {
  const es = /^(::[^\[]+\[)([\s\S]*?)(\]\{[\s\S]*\})\s*$/u.exec(paragraf.trim());
  if (!es) return META.test(paragraf) ? '' : paragraf;
  const kalan = cumlelereAyir(es[2]).filter((cumle) => !META.test(cumle));
  return kalan.length ? `${es[1]}${kalan.join(' ')}${es[3]}` : '';
}

export function metaDiliAyikla(govde) {
  if (!META.test(govde)) return govde;
  const parcalar = govde.split(/\n\s*\n/gu);
  const yeni = [];
  for (const ham of parcalar) {
    const paragraf = ham.trim();
    if (!paragraf) continue;

    if (/^#{1,6}\s/u.test(paragraf)) {
      if (!META.test(paragraf)) yeni.push(paragraf);
      continue;
    }

    if (/^::/u.test(paragraf)) {
      const d = direktifiAyikla(paragraf);
      if (d) yeni.push(d);
      continue;
    }

    // Kod, tablo, liste ve alinti yapisini cumle sarma ile bozma.
    if (/^(?:```|\||[-*+]\s|\d+[.)]\s|>)/u.test(paragraf)) {
      if (!META.test(paragraf)) yeni.push(paragraf);
      continue;
    }

    if (!META.test(paragraf)) {
      yeni.push(ham.replace(/^\n+|\n+$/gu, ''));
      continue;
    }

    const kalan = cumlelereAyir(paragraf).filter((cumle) => !META.test(cumle));
    if (kalan.length) yeni.push(satirla(kalan.join(' ')));
  }
  return `${yeni.join('\n\n').replace(/\n{3,}/gu, '\n\n')}\n`;
}

function toplam(makaleler) {
  const sonuc = { makale: 0, gecis: 0 };
  for (const m of makaleler) {
    const s = kalipSay(m.govde);
    const n = Object.values(s).reduce((a, b) => a + b, 0);
    if (n) sonuc.makale += 1;
    sonuc.gecis += n;
  }
  return sonuc;
}

if (process.argv[1]?.endsWith('meta-dili-ayikla.mjs')) {
  const uygula = process.argv.includes('--uygula');
  const tipKonumu = process.argv.indexOf('--tip');
  const tip = tipKonumu >= 0 ? process.argv[tipKonumu + 1] : '';
  const hepsi = makaleleriTopla();
  const makaleler = tip ? hepsi.filter((m) => m.fm.tip === tip) : hepsi;
  if (tip && !makaleler.length) {
    console.error(`bilinmeyen ya da bos tip: ${tip}`);
    process.exit(2);
  }

  const once = toplam(makaleler);
  let degisen = 0;
  const sonrakiler = makaleler.map((m) => {
    const govde = metaDiliAyikla(m.govde);
    if (govde !== m.govde) {
      degisen += 1;
      if (uygula) fs.writeFileSync(m.yol, m.ham.replace(m.govde, govde));
    }
    return { ...m, govde };
  });
  const sonra = toplam(sonrakiler);
  console.log(JSON.stringify({ kip: uygula ? 'uygula' : 'kuru', tip: tip || 'hepsi', degisen, once, sonra }, null, 2));
  if (sonra.gecis !== 0) process.exitCode = 1;
}
