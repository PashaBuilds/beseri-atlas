// KAPI 19 — sayisal dogrulama: metindeki seri iddialari depo ici veriyle olculur.
//
// 2026-08-28 kesif dalgasi (ROL 14): "Uzun donemli seride dunya nufusu ..."
// kalibi 132 dosyada gecer ve degerlerin bir bolumu kaynaktaki seriyle
// uyusmaz (en buyuk sapma %19,6); ayni yil icin farkli dosyalar farkli deger
// verir (2020: 7,84 vs 7,89). KAPI 10 yalnizca dize varligina baktigi icin
// bunlarin tamami bugune dek "gecti" gorunuyordu.
//
// 2026-08-29 genisletme: kapi tek seriye bagliydi; veri-setleri/ altinda 26
// seri var ve metin bunlarin altisina daha sayiyla atifta bulunuyor. Kapi
// artik bir SERI KUTUGU uzerinden calisir — yeni seri eklemek bir kayit
// satiridir. Kapinin olcemedigi sayi (yerel serisi olmayan) HATA degildir
// ama ozet satirinda gorunur: olculemeyen sayi gizlenmez.
//
// Cevrimdisi calisir; ag gerektirmez. Tolerans, yazilan basamak sayisinin
// yarim birimidir: "1,27 milyar" icin ±0,005 milyar, "yuzde 43,4" icin ±0,05.
// Yil seride yoksa HATA ("olmayan yila deger atfedilemez").
//
//   node araclar/linter-sayi.mjs
import fs from 'node:fs';
import path from 'node:path';
import { KOK, makaleleriTopla, Rapor } from './ortak.mjs';

export const VERI_DIZINI = path.join(KOK, 'veri-setleri');
export const SERI_YOLU = path.join(VERI_DIZINI, 'dunya-nufusu-uzun.csv');

/**
 * Seri kutugu. Her kayit: hangi CSV, metinde hangi kapsam ifadesiyle anilir,
 * degerler hangi birimde yazilir.
 *   birim: 'mutlak' → "yaklasik 2,38 milyar" (olcek sozcukten okunur)
 *          'yuzde'  → "yuzde 43,4" / "%43,4"
 *          'sayi'   → "1,09 ton" (olcek 1)
 * `zorunluYaklasik`: true ise yalnizca "yaklasik" ile yazilmis degerler
 * olculur (mutlak seride kiyaslama/fark cumlelerini disarida tutar).
 */
export const SERILER = {
  nufus: {
    ad: 'dünya nüfusu',
    csv: 'dunya-nufusu-uzun.csv',
    kapsam: /dünya nüfusu/gi,
    birim: 'mutlak',
    zorunluYaklasik: true,
  },
  okuryazarlik: {
    ad: 'okuryazarlık oranı',
    csv: 'okuryazarlik.csv',
    kapsam: /okuryazarlık serisi|okuryazarlık oranı/gi,
    birim: 'yuzde',
  },
  yoksulluk: {
    ad: 'aşırı yoksulluk oranı',
    csv: 'yoksulluk-orani.csv',
    kapsam: /aşırı yoksulluk|yoksulluk oranı serisi/gi,
    birim: 'yuzde',
  },
  cocuk_olumleri: {
    ad: 'çocuk ölüm oranı',
    csv: 'cocuk-olumleri.csv',
    kapsam: /çocuk ölüm oranı|çocuk ölümleri serisi/gi,
    birim: 'yuzde',
  },
  kentlesme: {
    ad: 'kentsel nüfus payı',
    csv: 'kentlesme-orani.csv',
    kapsam: /kentsel (nüfus )?payı|kentleşme oranı serisi/gi,
    birim: 'yuzde',
  },
  tarimsal_verim: {
    ad: 'buğday verimi',
    csv: 'tarimsal-verim.csv',
    kapsam: /buğday verimi/gi,
    birim: 'sayi',
  },
  yasam_beklentisi: {
    ad: 'yaşam beklentisi',
    csv: 'yasam-beklentisi.csv',
    kapsam: /yaşam beklentisi serisi/gi,
    birim: 'sayi',
  },
};

export function seriOku(yol = SERI_YOLU) {
  if (!fs.existsSync(yol)) return null;
  const seri = new Map();
  const satirlar = fs.readFileSync(yol, 'utf8').trim().split('\n');
  const basliklar = satirlar[0].split(',');
  // Uzun nufus serisi 5 sutunludur (varlik, kod, yil, projeksiyon, tarihsel);
  // sadelestirilmis seriler iki sutunludur (yil, deger).
  const uzun = basliklar.length >= 5;
  for (const satir of satirlar.slice(1)) {
    const s = satir.split(',');
    if (uzun) {
      const [, , yil, projeksiyon, tarihsel] = s;
      const deger = tarihsel !== '' && tarihsel !== undefined ? Number(tarihsel) : Number(projeksiyon);
      if (Number.isFinite(deger)) seri.set(Number(yil), { deger, projeksiyon: !(tarihsel !== '' && tarihsel !== undefined) });
    } else {
      const deger = Number(s[1]);
      if (Number.isFinite(deger)) seri.set(Number(s[0]), { deger, projeksiyon: false });
    }
  }
  return seri;
}

// Mutlak: "MÖ? YIL ... yaklasik N milyar/milyon"
const CIFT_MUTLAK = /(MÖ|MS)?\s*(\d{1,5})(?:'\p{L}+|\s+yılında|\s+için)?\s+yaklaşık\s+(\d+(?:,\d+)?)\s+(milyar|milyon)\p{L}*/gu;
// Yuzde: "YIL ... (yaklasik)? yuzde N" — yil ile deger arasi en fazla 12 karakter,
// boylece uzak yil/deger ciftleri yanlislikla eslesmez.
const CIFT_YUZDE = /(\d{3,4})(?:'\p{L}+|\s+yılında|\s+için|\s+değeri)?[^.]{0,12}?(?:yaklaşık\s+)?(?:yüzde\s+|%\s*)(\d+(?:,\d+)?)/gu;
// Sayi: "YIL ... (yaklasik)? N birim" (ton, yil)
const CIFT_SAYI = /(\d{3,4})(?:'\p{L}+|\s+yılında|\s+için|\s+değeri)?[^.]{0,24}?(?:yaklaşık\s+)?(\d+(?:,\d+)?)\s*(?:ton|yıl)\p{L}*/gu;

function ciftler(cumle, seriTanim) {
  const cikan = [];
  if (seriTanim.birim === 'mutlak') {
    for (const c of cumle.matchAll(CIFT_MUTLAK)) {
      cikan.push({
        yil: (c[1] === 'MÖ' ? -1 : 1) * Number(c[2]),
        deger: Number(c[3].replace(',', '.')),
        birim: c[4],
        olcek: c[4] === 'milyar' ? 1e9 : 1e6,
        ondalik: c[3].includes(',') ? c[3].split(',')[1].length : 0,
      });
    }
    return cikan;
  }
  const kalip = seriTanim.birim === 'yuzde' ? CIFT_YUZDE : CIFT_SAYI;
  for (const c of cumle.matchAll(kalip)) {
    cikan.push({
      yil: Number(c[1]),
      deger: Number(c[2].replace(',', '.')),
      birim: seriTanim.birim === 'yuzde' ? 'yüzde' : '',
      olcek: 1,
      ondalik: c[2].includes(',') ? c[2].split(',')[1].length : 0,
    });
  }
  return cikan;
}

/**
 * Bir govdedeki olculebilir seri iddialarini cikarir.
 * Kapsam: seri adinin gectigi yerden cumle sonuna kadar; boylece baska
 * konulardaki sayilar kapiya takilmaz.
 */
export function seriIddialari(govde, seriler = SERILER) {
  const iddialar = [];
  const metin = govde.replace(/\[\^k\d+\]/g, '').replace(/\s+/g, ' ');
  for (const [anahtar, tanim] of Object.entries(seriler)) {
    const kapsam = new RegExp(tanim.kapsam.source, tanim.kapsam.flags.replace('g', '') + 'g');
    let e;
    while ((e = kapsam.exec(metin)) !== null) {
      const kalan = metin.slice(e.index, e.index + 500);
      const son = kalan.search(/\.(?!\d)/);
      const cumle = son === -1 ? kalan : kalan.slice(0, son + 1);
      for (const c of ciftler(cumle, tanim)) {
        iddialar.push({ seri: anahtar, ...c, cumle: cumle.slice(0, 160) });
      }
    }
  }
  return iddialar;
}

/** Geriye donuk ad: nufus serisi tek basina. */
export function nufusIddialari(govde) {
  return seriIddialari(govde, { nufus: SERILER.nufus });
}

/** Govdedeki toplam sayi yuzeyi — kapinin olcemedigini gizlememek icin. */
function sayiYuzeyi(govde) {
  const metin = govde.replace(/\[\^k\d+\]/g, '');
  return (metin.match(/(?<![\w/-])\d[\d.,]*(?![\w/-])/g) || []).length;
}

/**
 * `veriler` verilirse dosya okunmaz (fikstur testleri icin): anahtar → Map(yil→{deger}).
 */
export function sayiDenetimi(makaleler, { seriler = SERILER, veriler: hazir = null } = {}) {
  const r = new Rapor('KAPI 19 — sayisal dogrulama (yerel seri kutugu)');
  const veriler = {};
  for (const [anahtar, tanim] of Object.entries(seriler)) {
    const seri = hazir ? hazir[anahtar] ?? null : seriOku(path.join(VERI_DIZINI, tanim.csv));
    if (seri === null) {
      r.hata(`veri-setleri/${tanim.csv}`, `referans seri yok — LISANS notundaki URL ile indirilmeli (${tanim.ad})`);
      continue;
    }
    veriler[anahtar] = seri;
  }
  if (!r.gecti) return r;

  let olculen = 0, dogru = 0, yuzey = 0;
  for (const m of makaleler) {
    yuzey += sayiYuzeyi(m.govde);
    for (const iddia of seriIddialari(m.govde, seriler)) {
      const seri = veriler[iddia.seri];
      const tanim = seriler[iddia.seri];
      olculen += 1;
      const kayit = seri.get(iddia.yil);
      if (!kayit) {
        r.hata(m.goreli, `${tanim.ad} iddiası ${iddia.yil} yılına değer atfediyor ama seri o yılı içermiyor `
          + `("${iddia.cumle.slice(0, 90)}…")`);
        continue;
      }
      const beklenen = kayit.deger / iddia.olcek;
      const tolerans = 0.5 * 10 ** -iddia.ondalik;
      if (Math.abs(beklenen - iddia.deger) > tolerans + 1e-9) {
        const dogrusu = beklenen.toFixed(Math.max(iddia.ondalik, 2)).replace('.', ',');
        r.hata(m.goreli, `${tanim.ad}: ${iddia.yil} için ${String(iddia.deger).replace('.', ',')} ${iddia.birim} `
          + `yazılmış; seri ${dogrusu} ${iddia.birim} veriyor (fark toleransı aşıyor)`);
      } else {
        dogru += 1;
      }
    }
  }
  r.ozetSatirlari = [
    `ölçülen seri iddiası: ${olculen} · seriyle uyumlu: ${dogru} · kütükteki seri: ${Object.keys(veriler).length}`,
    `gövdelerdeki toplam sayı: ${yuzey} — bunun ${olculen} tanesi yerel seriyle ölçülebiliyor, `
      + `kalanı yalnızca künye ve hakem katmanıyla denetlenir`,
  ];
  r.olcum = { olculen, dogru, yuzey, seri: Object.keys(veriler).length };
  return r;
}

if (process.argv[1]?.endsWith('linter-sayi.mjs')) {
  const r = sayiDenetimi(makaleleriTopla());
  r.yazdir();
  for (const satir of r.ozetSatirlari || []) console.log(`   ${satir}`);
  process.exit(r.gecti ? 0 : 1);
}
