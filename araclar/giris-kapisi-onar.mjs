#!/usr/bin/env node
// Bir makalede ikinci bir ansiklopedi kaynagi yalniz ilgili ic makaleye
// gecis yapan baglam cumlelerini destekliyorsa, kaynak zincirini o ic makaleye
// devreder. Bu arac kaynak UYDURMAZ ve ana konu kaynagina dokunmaz.
//
// Guvenlik kosullari:
// - kaldirilacak her dipnotun paragrafi ilgili bir site-ici makale bagi tasir;
// - islem sonunda en az uc kunye ve en fazla bir giris-kapisi kunyesi kalir;
// - iddia-kaynak matrisindeki kaldirilan anahtarlar da ayiklanir; yalniz o
//   baglam kaynagina dayanan matris satiri, artik dipnotlu iddia olmadigi icin
//   kaldirilir; sayac ve govde hash'i yeniden hesaplanir;
// - liste otomatik kesfedilmez: asagidaki her esleme insan tarafindan okunmus
//   paragraf ve mevcut ic bag denetiminden sonra eklenmistir.
//
// Kuru prova: node araclar/giris-kapisi-onar.mjs
// Uygulama:   node araclar/giris-kapisi-onar.mjs --uygula

import fs from 'node:fs';
import path from 'node:path';
import { KOK, makaleleriTopla, paragraflar } from './ortak.mjs';
import { govdeHash, suankiCommit } from './denetle.mjs';
import { MATRIS_DIZINI, sayaclariHesapla } from './matris.mjs';

const UYGULA = process.argv.includes('--uygula');
const IC_BAG = /\]\(\/(?:donem|olay|aktor|dusunur|kavram|tartisma|veri|kaynak)\//;

export const KALDIRILACAK = new Map([
  ['olay-vestfalya-barisi', ['k2']],
  ['aktor-asur-imparatorlugu', ['k2']],
  ['aktor-han-imparatorlugu', ['k2']],
  ['aktor-nato', ['k2']],
  ['dusunur-clausewitz', ['k3']],
  ['dusunur-kautilya', ['k2']],
  ['dusunur-sima-qian', ['k3']],
  ['kavram-egemenlik', ['k3']],
  ['kavram-guc-dengesi', ['k2']],
  ['kavram-hukuk-devleti', ['k3']],
  ['kavram-kapitalizm', ['k3']],
  ['kavram-malthus-tuzagi', ['k2']],
  ['kavram-merkantilizm', ['k3']],
  ['kavram-sehir-devleti', ['k2']],
  ['kavram-tarihsel-materyalizm', ['k3']],
  ['kavram-topyekun-savas', ['k2']],
  ['kaynak-aristoteles-politika', ['k3']],
  ['kaynak-clausewitz-savas-uzerine', ['k2']],
  ['kaynak-hobbes-leviathan', ['k3']],
  ['kaynak-konfucyus-lunyu', ['k3']],
  ['kaynak-machiavelli-prens', ['k3']],
  ['kaynak-mackinder-cografi-eksen', ['k2']],
  ['kaynak-mahan-deniz-gucu', ['k2']],
  ['kaynak-malthus-nufus', ['k2']],
  ['kaynak-marx-kapital', ['k3']],
  ['kaynak-montesquieu-kanunlarin-ruhu', ['k3']],
  ['kaynak-platon-devlet', ['k3']],
  ['kaynak-sima-qian-shiji', ['k3']],
  ['kaynak-smith-uluslarin-zenginligi', ['k3']],
  ['kaynak-tacitus-annales', ['k2']],
  ['kaynak-weber-protestan-ahlaki', ['k2']],
]);

export function kaynakBlogunuKaldir(hamFm, anahtar) {
  const satirlar = hamFm.split('\n');
  const bas = satirlar.findIndex((s) => s === `  - anahtar: ${anahtar}`);
  if (bas < 0) throw new Error(`kaynak blogu bulunamadi: ${anahtar}`);
  let son = bas + 1;
  while (son < satirlar.length) {
    const s = satirlar[son];
    if (/^  - anahtar: /.test(s) || (s && !/^\s/.test(s))) break;
    son += 1;
  }
  satirlar.splice(bas, son - bas);
  return satirlar.join('\n');
}

export function matrisiAyikla(matris, anahtarlar) {
  const sil = new Set(anahtarlar);
  let kaynakBaglantisi = 0;
  let iddia = 0;
  matris.iddialar = (matris.iddialar || []).filter((i) => {
    const once = i.kaynaklar || [];
    i.kaynaklar = once.filter((k) => !sil.has(k.anahtar));
    kaynakBaglantisi += once.length - i.kaynaklar.length;
    if (i.kaynaklar.length === 0) { iddia += 1; return false; }
    return true;
  });
  matris.sayaclar = sayaclariHesapla(matris.iddialar);
  return { kaynakBaglantisi, iddia };
}

function alan(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

export function onarimPlani(m) {
  const anahtarlar = KALDIRILACAK.get(m.fm.id) || [];
  if (!anahtarlar.length) return null;
  const kaynaklar = m.fm.kaynaklar || [];
  const sorunlar = [];
  let isaret = 0;
  for (const anahtar of anahtarlar) {
    const k = kaynaklar.find((x) => x.anahtar === anahtar);
    if (!k) { sorunlar.push(`${anahtar}: kunye yok`); continue; }
    if (alan(k.url) !== 'en.wikipedia.org') sorunlar.push(`${anahtar}: giris-kapisi kaynagi degil (${alan(k.url)})`);
    const ps = paragraflar(m.govde).filter((p) => p.metin.includes(`[^${anahtar}]`));
    if (!ps.length) sorunlar.push(`${anahtar}: govdede dipnot yok`);
    for (const p of ps) {
      const adet = p.metin.split(`[^${anahtar}]`).length - 1;
      isaret += adet;
      if (!IC_BAG.test(p.metin)) sorunlar.push(`${anahtar}: ic bagsiz paragraf — ${p.metin.slice(0, 100)}`);
    }
  }
  const kalan = kaynaklar.filter((k) => !anahtarlar.includes(k.anahtar));
  if (kalan.length < 3) sorunlar.push(`islem sonunda ${kalan.length} kunye kaliyor; alt sinir 3`);
  const giris = kalan.filter((k) => alan(k.url) === 'en.wikipedia.org').length;
  if (giris > 1) sorunlar.push(`islem sonunda ${giris} giris-kapisi kunyesi kaliyor`);
  return { anahtarlar, isaret, kalan: kalan.length, giris, sorunlar };
}

function calistir() {
  const harita = new Map(makaleleriTopla().map((m) => [m.fm.id, m]));
  const rapor = { zaman: new Date().toISOString(), uygulandi: UYGULA, dosyalar: [],
    dipnot: 0, kunye: 0, matris_kaynak_baglantisi: 0, matris_iddiasi: 0, sorun: 0 };

  for (const [id, anahtarlar] of KALDIRILACAK) {
    const m = harita.get(id);
    if (!m) { rapor.dosyalar.push({ id, sorunlar: ['makale bulunamadi'] }); rapor.sorun += 1; continue; }
    const plan = onarimPlani(m);
    if (plan.sorunlar.length) {
      rapor.dosyalar.push({ id, ...plan }); rapor.sorun += plan.sorunlar.length; continue;
    }

    let yeniFm = m.hamFm;
    let yeniGovde = m.govde;
    for (const anahtar of anahtarlar) {
      yeniFm = kaynakBlogunuKaldir(yeniFm, anahtar);
      yeniGovde = yeniGovde.replaceAll(`[^${anahtar}]`, '');
    }

    const matrisYolu = path.join(MATRIS_DIZINI, `${id}-matris.json`);
    let matrisSonucu = { kaynakBaglantisi: 0, iddia: 0 };
    let matris = null;
    if (fs.existsSync(matrisYolu)) {
      matris = JSON.parse(fs.readFileSync(matrisYolu, 'utf8'));
      matrisSonucu = matrisiAyikla(matris, anahtarlar);
      matris.govde_hash = govdeHash(yeniGovde);
      matris.commit = suankiCommit();
      (matris.tazeleme ||= []).push({
        zaman: new Date().toISOString().slice(0, 10),
        gerekce: `${anahtarlar.join(', ')} baglam dipnotu ilgili site-ici makaleye devredildi; `
          + `${matrisSonucu.iddia} artik dipnotlu olmayan baglam iddiasi matristen cikarildi`,
      });
    }

    rapor.dosyalar.push({ id, ...plan, matris: matrisSonucu });
    rapor.dipnot += plan.isaret;
    rapor.kunye += anahtarlar.length;
    rapor.matris_kaynak_baglantisi += matrisSonucu.kaynakBaglantisi;
    rapor.matris_iddiasi += matrisSonucu.iddia;

    if (UYGULA) {
      const yeni = m.ham.replace(m.hamFm, yeniFm).replace(m.govde, yeniGovde);
      fs.writeFileSync(m.yol, yeni);
      if (matris) fs.writeFileSync(matrisYolu, `${JSON.stringify(matris, null, 2)}\n`);
    }
  }

  const raporYolu = path.join(KOK, 'denetim', 'giris-kapisi-onarim.json');
  fs.writeFileSync(raporYolu, `${JSON.stringify(rapor, null, 2)}\n`);
  console.log(`giris-kapisi onarimi: ${rapor.dosyalar.length} makale · ${rapor.kunye} kunye · `
    + `${rapor.dipnot} baglam dipnotu · ${rapor.matris_iddiasi} matris iddiasi · `
    + `${rapor.sorun} sorun · ${UYGULA ? 'uygulandi' : 'kuru prova'}`);
  return rapor.sorun ? 1 : 0;
}

if (process.argv[1]?.endsWith('giris-kapisi-onar.mjs')) process.exit(calistir());
