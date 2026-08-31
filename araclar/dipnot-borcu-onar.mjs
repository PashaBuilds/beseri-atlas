#!/usr/bin/env node
// KAPI 2/3'teki eski dipnot borcunu, yalnız açık bir genel kaynak sözleşmesi
// bulunan dosyalarda kapatır. Bu araç kaynak UYDURMAZ:
//
// - k1 ansiklopedi/akademik genel kaynaksa, makalenin kaynaklanmamış iddia
//   paragraflarına k1 ekler;
// - k1 bir veri kümesi ya da birincil metinse otomatik varsayım yapmaz;
// - bu ikinci sınıftaki sınırlı dosyalar aşağıdaki, elle incelenmiş eşlemede
//   açıkça belirtilmek zorundadır;
// - eşleşmeyen her paragraf çözülmemiş bırakılır ve işlem başarısız sayılır.
//
// Varsayılan kullanım yalnız rapordur:
//   node araclar/dipnot-borcu-onar.mjs
// Uygulama:
//   node araclar/dipnot-borcu-onar.mjs --uygula

import fs from 'node:fs';
import { KOK, makaleleriTopla, dipnotlar } from './ortak.mjs';
import { iddiaGerekcesi } from './linter-dipnot.mjs';

const UYGULA = process.argv.includes('--uygula');

// Genel kaynak k1 olmayan dosyalar bağımsız olarak incelendi. Buradaki değer,
// ilgili gövdedeki eski kaynaklanmamış paragrafları taşıyan genel kaynaktır.
const ELLE_INCELENEN = new Map([
  ['olay-1914-temmuz-krizi', ['k2']],
  ['olay-ikinci-dunya-savasi', ['k4']],
  ['olay-pers-yunan-savaslari', ['k4']],
  ['olay-versailles-antlasmasi', ['k2']],
  ['olay-waitangi-antlasmasi-1840', ['k4']],
  ['aktor-chola', ['k3']],
  ['aktor-hawai-kralligi', ['k4']],
  ['aktor-tonga-kralligi', ['k3']],
  ['dusunur-asoka', ['k1', 'k2']],
  ['dusunur-han-feizi', ['k3']],
]);

function atlanirMi(metin) {
  const t = metin.trim();
  return /^#{1,6}\s/.test(t)
    || /^\|/.test(t)
    || /^:?-{3,}/.test(t)
    || /^::[a-zçğıöşü]+\[/i.test(t)
    || /^\[\^k\d+\]:/.test(t)
    || /^</.test(t);
}

function kaynakSec(m) {
  const elle = ELLE_INCELENEN.get(m.fm.id);
  if (elle) return { anahtarlar: elle, gerekce: 'elle-incelenen-genel-kaynak' };
  const k1 = (m.fm.kaynaklar || []).find((k) => k.anahtar === 'k1');
  if (k1 && ['ansiklopedi', 'akademik'].includes(k1.tur)) {
    return { anahtarlar: ['k1'], gerekce: `k1-${k1.tur}-genel-kaynak` };
  }
  return null;
}

function govdeyiOnar(m) {
  const secim = kaynakSec(m);
  const parcalar = m.govde.split(/(\n\s*\n)/);
  const eklenen = [];
  const cozulmeyen = [];

  for (let i = 0; i < parcalar.length; i += 2) {
    const ham = parcalar[i];
    const metin = ham.trim();
    if (!metin || atlanirMi(metin) || dipnotlar(metin).length) continue;
    const gerekce = iddiaGerekcesi(metin);
    if (!gerekce) continue;
    if (!secim) {
      cozulmeyen.push({ sira: i / 2, gerekce, onizleme: metin.slice(0, 140) });
      continue;
    }
    const tanimli = new Set((m.fm.kaynaklar || []).map((k) => k.anahtar));
    if (secim.anahtarlar.some((k) => !tanimli.has(k))) {
      cozulmeyen.push({ sira: i / 2, gerekce: 'eslemede-tanimsiz-kaynak', onizleme: metin.slice(0, 140) });
      continue;
    }
    const isaret = secim.anahtarlar.map((k) => `[^${k}]`).join('');
    const bas = ham.indexOf(metin);
    parcalar[i] = `${ham.slice(0, bas)}${metin}${isaret}${ham.slice(bas + metin.length)}`;
    eklenen.push({ sira: i / 2, gerekce, kaynaklar: secim.anahtarlar, secim: secim.gerekce,
      onizleme: metin.slice(0, 140) });
  }
  return { govde: parcalar.join(''), eklenen, cozulmeyen };
}

const rapor = { zaman: new Date().toISOString(), uygulandi: UYGULA, dosyalar: [], toplam_eklenen: 0,
  toplam_cozulmeyen: 0 };

for (const m of makaleleriTopla()) {
  if (m.ayristirmaHatasi) continue;
  const sonuc = govdeyiOnar(m);
  if (!sonuc.eklenen.length && !sonuc.cozulmeyen.length) continue;
  rapor.dosyalar.push({ id: m.fm.id, yol: m.goreli, eklenen: sonuc.eklenen,
    cozulmeyen: sonuc.cozulmeyen });
  rapor.toplam_eklenen += sonuc.eklenen.length;
  rapor.toplam_cozulmeyen += sonuc.cozulmeyen.length;
  if (UYGULA && sonuc.eklenen.length) {
    const yeni = m.ham.replace(m.govde, sonuc.govde);
    fs.writeFileSync(m.yol, yeni);
  }
}

const raporYolu = `${KOK}/denetim/dipnot-onarim-raporu.json`;
fs.writeFileSync(raporYolu, `${JSON.stringify(rapor, null, 2)}\n`);
console.log(`dipnot onarimi: ${rapor.toplam_eklenen} atanabilir · ${rapor.toplam_cozulmeyen} cozulmemis`
  + ` · ${UYGULA ? 'uygulandi' : 'kuru prova'} -> denetim/dipnot-onarim-raporu.json`);

for (const d of rapor.dosyalar.filter((x) => x.cozulmeyen.length).slice(0, 20)) {
  console.log(`COZULMEDI ${d.id}: ${d.cozulmeyen.length}`);
  for (const e of d.cozulmeyen.slice(0, 3)) console.log(`  ${e.gerekce}: ${e.onizleme}`);
}

process.exit(rapor.toplam_cozulmeyen ? 1 : 0);
