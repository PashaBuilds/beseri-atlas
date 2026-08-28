// İddia-kaynak matrisi — hakem katmanının makine-okur kaydı (karar tablosu K2).
//
// İki katman ayrımı:
//   Mekanik katman (denetle.mjs): atomlar + 4 sayaç. Yalnızca TABAN;
//     asla "doğrulandı" beyanı üretmez (alt-dize eşleşmesi kanıt değildir).
//   Hakem katmanı (bu dosya): model-hakemli oturum her iddiaya destek düzeyi
//     yazar. Bir makale ancak GEÇERLİ ve GÜNCEL bir matrisle "doğrulanmış"
//     sayılır. Hakem, makalenin yazarı OLAMAZ (yazar ≠ hakem şartı).
//
// Dosya yolu: denetim/matris/<id>-matris.json
// Şema (zorunlu alanlar):
//   { id, govde_hash, commit, zaman, hakem,
//     iddialar: [{ iddia_id, cumle, onem: merkezi|destek|renk,
//                  tur: olgu|sayi|tarih|aktarim|yorum,
//                  kaynaklar: [{ anahtar, destek: dogrudan|kismi|baglam|celisir }],
//                  guven: yuksek|orta|dusuk, inceleme }],
//     sayaclar: { dogrudan, kismi, desteksiz, olculemez } }
//
// Kurallar:
//   K-1 Sayaçlar iddialardan yeniden hesaplanabilir olmalı (beyan ≠ hesap ise HATA).
//   K-2 MERKEZİ iddia desteksiz ya da ölçülemez kalamaz (sözleşme şartı).
//   K-3 govde_hash güncel gövdeyle eşleşmeli; eşleşmiyorsa matris BAYAT.
//   K-4 `celisir` destekli iddia açık `inceleme` notu taşımalı.
//   K-5 kaynak anahtarları makalenin künyesinde var olmalı.
//
//   node araclar/matris.mjs <id> [...]     matris(ler)i dogrula
//   node araclar/matris.mjs --hepsi        var olan butun matrisleri dogrula
import fs from 'node:fs';
import path from 'node:path';
import { KOK, makaleleriTopla, RENK } from './ortak.mjs';
import { govdeHash } from './denetle.mjs';

export const MATRIS_DIZINI = path.join(KOK, 'denetim', 'matris');

const ONEMLER = new Set(['merkezi', 'destek', 'renk']);
const TURLER = new Set(['olgu', 'sayi', 'tarih', 'aktarim', 'yorum']);
const DESTEKLER = new Set(['dogrudan', 'kismi', 'baglam', 'celisir']);
const GUVENLER = new Set(['yuksek', 'orta', 'dusuk']);

/** Bir iddianin 4-sayac sinifi: en guclu destegi belirleyicidir. */
export function iddiaSinifi(iddia) {
  const destekler = (iddia.kaynaklar || []).map((k) => k.destek);
  if (destekler.includes('dogrudan')) return 'dogrudan';
  if (destekler.includes('kismi')) return 'kismi';
  if (destekler.includes('celisir')) return 'desteksiz'; // celiski destek degildir
  if (destekler.includes('baglam')) return 'olculemez';  // baglam kaniti tasimaz
  return iddia.tur === 'yorum' ? 'olculemez' : 'desteksiz';
}

export function sayaclariHesapla(iddialar) {
  const s = { dogrudan: 0, kismi: 0, desteksiz: 0, olculemez: 0 };
  for (const i of iddialar) s[iddiaSinifi(i)] += 1;
  return s;
}

/**
 * Tek matrisi dogrular. Donen deger: { gecerli, bayat, hatalar[] }.
 * `makale` verilirse K-3 (hash) ve K-5 (kunye anahtarlari) da olculur.
 */
export function matrisiDogrula(matris, makale = null) {
  const hatalar = [];
  let bayat = false;
  for (const alan of ['id', 'govde_hash', 'commit', 'zaman', 'hakem', 'iddialar', 'sayaclar']) {
    if (matris[alan] === undefined) hatalar.push(`zorunlu alan eksik: ${alan}`);
  }
  if (!Array.isArray(matris.iddialar) || matris.iddialar.length === 0) {
    hatalar.push('iddialar bos — matris en az bir iddia icermeli');
    return { gecerli: false, bayat, hatalar };
  }

  const gorulenId = new Set();
  const kunyeAnahtarlari = makale
    ? new Set((makale.fm.kaynaklar || []).map((k) => k.anahtar)) : null;

  for (const i of matris.iddialar) {
    const kim = i.iddia_id || '(kimliksiz)';
    if (!i.iddia_id) hatalar.push('iddia_id eksik — iddialar kimliksiz izlenemez');
    else if (gorulenId.has(i.iddia_id)) hatalar.push(`yinelenen iddia_id: ${kim}`);
    gorulenId.add(i.iddia_id);
    if (!i.cumle) hatalar.push(`${kim}: cumle eksik`);
    if (!ONEMLER.has(i.onem)) hatalar.push(`${kim}: onem gecersiz (${i.onem})`);
    if (!TURLER.has(i.tur)) hatalar.push(`${kim}: tur gecersiz (${i.tur})`);
    if (!GUVENLER.has(i.guven)) hatalar.push(`${kim}: guven gecersiz (${i.guven})`);
    for (const k of i.kaynaklar || []) {
      if (!DESTEKLER.has(k.destek)) hatalar.push(`${kim}: destek gecersiz (${k.destek})`);
      if (kunyeAnahtarlari && !kunyeAnahtarlari.has(k.anahtar)) {
        hatalar.push(`${kim}: kunyede olmayan kaynak anahtari (${k.anahtar})`); // K-5
      }
      if (k.destek === 'celisir' && !(i.inceleme || '').trim()) {
        hatalar.push(`${kim}: 'celisir' destegi inceleme notu sart kosar`); // K-4
      }
    }
    // K-2: merkezi iddia desteksiz/olculemez kalamaz.
    const sinif = iddiaSinifi(i);
    if (i.onem === 'merkezi' && (sinif === 'desteksiz' || sinif === 'olculemez')) {
      hatalar.push(`${kim}: MERKEZI iddia '${sinif}' kalamaz — kaynak bulunmali ya da iddia govdeden cikarilmali`);
    }
  }

  // K-1: beyan edilen sayaclar hesapla tutmali.
  const hesap = sayaclariHesapla(matris.iddialar);
  for (const [k, v] of Object.entries(hesap)) {
    if ((matris.sayaclar?.[k] ?? null) !== v) {
      hatalar.push(`sayac tutmuyor: ${k} beyan ${matris.sayaclar?.[k]}, hesap ${v}`);
    }
  }

  // K-3: hash guncelligi.
  if (makale && matris.govde_hash && matris.govde_hash !== govdeHash(makale.govde)) {
    bayat = true;
    hatalar.push('BAYAT: govde_hash guncel govdeyle eslesmiyor — matris yeniden hakemlenmeli');
  }

  return { gecerli: hatalar.length === 0, bayat, hatalar };
}

export function matrisOku(id) {
  const yol = path.join(MATRIS_DIZINI, `${id}-matris.json`);
  if (!fs.existsSync(yol)) return null;
  return JSON.parse(fs.readFileSync(yol, 'utf8'));
}

if (process.argv[1]?.endsWith('matris.mjs')) {
  const makaleler = makaleleriTopla();
  const haritada = new Map(makaleler.map((m) => [m.fm.id, m]));
  let idler;
  if (process.argv.includes('--hepsi')) {
    idler = fs.existsSync(MATRIS_DIZINI)
      ? fs.readdirSync(MATRIS_DIZINI).filter((f) => f.endsWith('-matris.json')).map((f) => f.replace(/-matris\.json$/, ''))
      : [];
    if (idler.length === 0) { console.log('denetim/matris/ altinda matris yok.'); process.exit(0); }
  } else {
    idler = process.argv.slice(2).filter((a) => !a.startsWith('--'));
    if (idler.length === 0) { console.error('kullanim: node araclar/matris.mjs <id> ... | --hepsi'); process.exit(1); }
  }
  let kirik = 0;
  for (const id of idler) {
    const matris = matrisOku(id);
    if (!matris) { console.log(`${RENK.kirmizi('YOK    ')} ${id} — matris dosyasi bulunamadi`); kirik += 1; continue; }
    const { gecerli, bayat, hatalar } = matrisiDogrula(matris, haritada.get(id) || null);
    const im = gecerli ? RENK.yesil('GECERLI') : bayat ? RENK.sari('BAYAT  ') : RENK.kirmizi('KIRIK  ');
    const s = sayaclariHesapla(matris.iddialar || []);
    console.log(`${im} ${id.padEnd(34)} ${s.dogrudan} dogrudan · ${s.kismi} kismi · ${s.desteksiz} desteksiz · ${s.olculemez} olculemez`);
    for (const h of hatalar.slice(0, 8)) console.log(`         ${RENK.gri(h)}`);
    if (!gecerli) kirik += 1;
  }
  process.exit(kirik ? 1 : 0);
}
