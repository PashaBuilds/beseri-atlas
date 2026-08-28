// KAPI 19 — sayisal dogrulama: nufus kalip cumleleri depo ici referansla olculur.
//
// 2026-08-28 kesif dalgasi (ROL 14): "Uzun donemli seride dunya nufusu ..."
// kalibi 132 dosyada gecer ve degerlerin bir bolumu kaynaktaki seriyle
// uyusmaz (en buyuk sapma %19,6); ayni yil icin farkli dosyalar farkli deger
// verir (2020: 7,84 vs 7,89). KAPI 10 yalnizca dize varligina baktigi icin
// bunlarin tamami bugune dek "gecti" gorunuyordu.
//
// Bu kapi, kalip cumlelerdeki her (yil, deger) ciftini depoya kaydedilmis
// OWID World serisine (veri-setleri/dunya-nufusu-uzun.csv) karsi olcer.
// Cevrimdisi calisir; ag gerektirmez. Tolerans, yazilan basamak sayisinin
// yarim birimidir: "1,27 milyar" icin ±0,005 milyar, "503,1 milyon" icin
// ±0,05 milyon. Yil seride yoksa HATA ("olmayan yila deger atfedilemez").
//
//   node araclar/linter-sayi.mjs
import fs from 'node:fs';
import path from 'node:path';
import { KOK, makaleleriTopla, Rapor } from './ortak.mjs';

export const SERI_YOLU = path.join(KOK, 'veri-setleri', 'dunya-nufusu-uzun.csv');

export function seriOku(yol = SERI_YOLU) {
  if (!fs.existsSync(yol)) return null;
  const seri = new Map();
  for (const satir of fs.readFileSync(yol, 'utf8').trim().split('\n').slice(1)) {
    const [, , yil, projeksiyon, tarihsel] = satir.split(',');
    const deger = tarihsel !== '' && tarihsel !== undefined ? Number(tarihsel) : Number(projeksiyon);
    if (Number.isFinite(deger)) seri.set(Number(yil), { deger, projeksiyon: !(tarihsel !== '' && tarihsel !== undefined) });
  }
  return seri;
}

// Kalip cumlenin kapsami: "dünya nüfusu" gecisinden cumle sonuna kadar.
// (Yil, deger, birim) ciftleri yalnizca bu kapsamda aranir; boylece baska
// konulardaki "yaklasik X milyon" ifadeleri kapiya takilmaz.
const CIFT = /(MÖ|MS)?\s*(\d{1,5})(?:'\p{L}+|\s+yılında|\s+için)?\s+yaklaşık\s+(\d+(?:,\d+)?)\s+(milyar|milyon)\p{L}*/gu;

export function nufusIddialari(govde) {
  const iddialar = [];
  const metin = govde.replace(/\[\^k\d+\]/g, '').replace(/\s+/g, ' ');
  let i = -1;
  const kalip = /dünya nüfusu/gi;
  let e;
  while ((e = kalip.exec(metin)) !== null) {
    // Cumle sonu: rakam icermeyen ilk nokta (1,27 icindeki virgul degil,
    // "yaklaşık 1.27" yazimi kullanilmiyor; nokta yalnizca cumle sonudur).
    const basla = e.index;
    const kalan = metin.slice(basla, basla + 500);
    const son = kalan.search(/\.(?!\d)/);
    const cumle = son === -1 ? kalan : kalan.slice(0, son + 1);
    for (const c of cumle.matchAll(CIFT)) {
      const isaret = c[1] === 'MÖ' ? -1 : 1;
      iddialar.push({
        yil: isaret * Number(c[2]),
        deger: Number(c[3].replace(',', '.')),
        birim: c[4],
        ondalik: c[3].includes(',') ? c[3].split(',')[1].length : 0,
        cumle: cumle.slice(0, 160),
      });
    }
    i = e.index;
  }
  return iddialar;
}

export function sayiDenetimi(makaleler, { seri = seriOku() } = {}) {
  const r = new Rapor('KAPI 19 — sayisal dogrulama (nufus kalip cumleleri)');
  if (seri === null) {
    r.hata('veri-setleri/dunya-nufusu-uzun.csv', 'referans seri yok — LISANS notundaki URL ile indirilmeli');
    return r;
  }
  let olculen = 0, dogru = 0;
  for (const m of makaleler) {
    for (const iddia of nufusIddialari(m.govde)) {
      olculen += 1;
      const kayit = seri.get(iddia.yil);
      if (!kayit) {
        r.hata(m.goreli, `nüfus iddiası ${iddia.yil} yılına değer atfediyor ama seri o yılı içermiyor `
          + `("${iddia.cumle.slice(0, 90)}…")`);
        continue;
      }
      const olcek = iddia.birim === 'milyar' ? 1e9 : 1e6;
      const beklenen = kayit.deger / olcek;
      const tolerans = 0.5 * 10 ** -iddia.ondalik;
      if (Math.abs(beklenen - iddia.deger) > tolerans + 1e-9) {
        const dogrusu = beklenen.toFixed(Math.max(iddia.ondalik, 2)).replace('.', ',');
        r.hata(m.goreli, `${iddia.yil} için ${String(iddia.deger).replace('.', ',')} ${iddia.birim} yazılmış; `
          + `seri ${dogrusu} ${iddia.birim} veriyor (fark toleransı aşıyor)`);
      } else {
        dogru += 1;
      }
    }
  }
  r.ozetSatirlari = [`ölçülen nüfus iddiası: ${olculen} · seriyle uyumlu: ${dogru}`];
  r.olcum = { olculen, dogru };
  return r;
}

if (process.argv[1]?.endsWith('linter-sayi.mjs')) {
  const r = sayiDenetimi(makaleleriTopla());
  r.yazdir();
  for (const satir of r.ozetSatirlari || []) console.log(`   ${satir}`);
  process.exit(r.gecti ? 0 : 1);
}
