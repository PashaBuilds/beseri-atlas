#!/usr/bin/env node
// Kuyruk ↔ korpus eşitleyicisi.
//
// `plan/kuyruk.yaml` ile `icerik/` altındaki gerçek durum ayrışabilir:
// - Bir makale üretilip onaylanır ama kuyruk satırı güncellenmez.
// - Plan düzeltmesiyle kuyruğa girmemiş bir makale üretilir.
//
// DURUM.md ile git geçmişi ayrışırsa hat kaldığı yerden devam edemez (§15).
// Bu araç korpusu doğru kabul eder ve kuyruğu ona göre düzeltir.
//
//   node araclar/kuyruk-esitle.mjs [--kuru]
import path from 'node:path';
import YAML from 'yaml';
import { KOK, makaleleriTopla, yamlOku, yaz, RENK } from './ortak.mjs';

const kuru = process.argv.includes('--kuru');
const KUYRUK = path.join(KOK, 'plan', 'kuyruk.yaml');
const isler = yamlOku(KUYRUK)?.isler || [];
const makaleler = makaleleriTopla();
const kapsam = yamlOku(path.join(KOK, 'plan', 'kapsam.yaml'))?.fazlar || {};

/** Bir id'nin kapsamda hangi faza ait olduğunu bulur. */
function fazBul(id) {
  for (const [faz, liste] of Object.entries(kapsam)) {
    if ((liste || []).some((k) => k.id === id)) return Number(faz);
  }
  return null;
}

const satirlar = new Map(isler.map((i) => [i.id, i]));
let guncellenen = 0;
let eklenen = 0;

for (const m of makaleler) {
  if (!m.fm.id) continue;
  const durum = m.fm.denetim_durumu;
  const satir = satirlar.get(m.fm.id);
  if (!satir) {
    const faz = fazBul(m.fm.id) ?? 0;
    isler.push({
      id: m.fm.id, tip: m.fm.tip, baslik: m.fm.baslik,
      durum, faz, bagimlilik: [], atanan_parti: null, deneme: 1,
    });
    eklenen += 1;
    console.log(`${RENK.yesil('EKLENDI')}   ${m.fm.id} (faz ${faz}, ${durum})`);
    continue;
  }
  if (satir.durum !== durum) {
    console.log(`${RENK.sari('GUNCEL')}    ${m.fm.id}: ${satir.durum} -> ${durum}`);
    satir.durum = durum;
    guncellenen += 1;
  }
}

// Karantinaya alınmış makaleler icerik/ altında olmaz; kuyruk satırı korunur.
const korpusIdleri = new Set(makaleler.map((m) => m.fm.id));
for (const i of isler) {
  if (i.durum === 'onaylandi' && !korpusIdleri.has(i.id)) {
    console.log(`${RENK.kirmizi('UYARI')}     ${i.id}: kuyrukta onayli ama korpusta yok`);
  }
}

if (!kuru) {
  yaz(KUYRUK, `# plan/kuyruk.yaml — merkezi iş listesi (§9)\n`
    + `# durum: bekliyor|uretiliyor|denetleniyor|onarimda|onaylandi|karantina\n\n`
    + YAML.stringify({ isler }, { lineWidth: 100 }));
}

const sayim = {};
for (const i of isler) sayim[i.durum] = (sayim[i.durum] || 0) + 1;
console.log(`\n${eklenen} satir eklendi, ${guncellenen} satir guncellendi`);
console.log(`kuyruk: ${JSON.stringify(sayim)}`);
