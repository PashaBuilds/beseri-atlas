// KAPI 17 — ozetteki sure iddiasi ile govde arasindaki tutarsizligi yakalar.
//
// Gerekce: 2026-08-25'te Fiji dosyasinin ozetinde "yirmi yil suren" yaziyordu;
// govde uc yil diyordu ve kunye tarihleri de uc yil gosteriyordu. Hata elle
// yakalandi. Hicbir kapi ozet alanindaki iddialarla govdedeki iddialar
// arasindaki tutarliligi denetlemiyordu. Ozet, makale kartlarinda ve arama
// sonuclarinda govdeden once okunur; oradaki yanlis bir sayi, govdeye hic
// bakmayan okurun aklinda kalan tek sayi olur.
//
// Olcut bilincli olarak dardir. Genel bir "ozette gecen her sayi govdede de
// gecmeli" kurali denendi ve 445 makalede 76 bulgu verdi; bulgularin buyuk
// bolumu ondalik ayirici yuzunden bolunmus sayi parcalariydi (42,82 -> "82")
// ya da veri dosyalarinin CSV'den gelen degerleriydi. Kapi bu nedenle yalnizca
// SURE iddialarini denetler: ozette bir sayi ifadesinin hemen ardindan zaman
// birimi geliyorsa (yil, yuzyil, kusak, ay, gun), o sayi ifadesi govdede de
// gecmelidir.
//
// Kapsam disi: veri dosyalari (ozetleri seri degerlerini alintilar) ve
// "bir"/"iki" (belirsiz artikel ve ikili karsilastirma olarak surekli gecer).

import { Rapor } from './ortak.mjs';

const SAYI_SOZCUKLERI = [
  'uc', 'dort', 'bes', 'alti', 'yedi', 'sekiz', 'dokuz',
  'on', 'yirmi', 'otuz', 'kirk', 'elli', 'altmis', 'yetmis', 'seksen',
  'doksan', 'yuz', 'bin',
];

// Zaman birimleri. Turkce ekler icin govde eslesmesinde kok kullanilir:
// "yuzyillik", "yillarca" gibi bicimler de ayni koke iner.
// 'ay' ve 'gun' listeden cikarildi: 'ay' sozcugu 'ayri', 'ayak' gibi
// sozcuklerin basina denk gelip yanlis pozitif uretiyordu ve ozetlerde
// gun/ay olcegindeki sure iddiasi pratikte gecmiyor.
const BIRIMLER = ['yuzyil', 'yil', 'kusak'];

const KAPSAM_DISI_TIP = new Set(['veri']);

function katla(s) {
  return String(s ?? '').toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/i̇/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u');
}

// Ozette "<sayi> <zaman birimi>" kalibini arar ve sayi ifadesini dondurur.
// Ornek: "yirmi yil suren" -> "yirmi"; "uc yuzyil boyunca" -> "uc";
// "40 yillik" -> "40". Bilesik sayilarda ("otuz dort yil") son sozcuk alinir
// cunku eslesme icin bir tanesinin bulunmasi yeterlidir.
function sureIddialari(ozet) {
  const d = katla(ozet);
  const bulunan = new Set();
  const birimAlt = BIRIMLER.join('|');

  for (const m of d.matchAll(new RegExp(`\\b(\\d{1,4})\\s+(?:${birimAlt})`, 'g'))) {
    bulunan.add(m[1]);
  }
  for (const s of SAYI_SOZCUKLERI) {
    const re = new RegExp(`(^|[^a-z0-9])${s}\\s+(?:${birimAlt})`);
    if (re.test(d)) bulunan.add(s);
  }
  return bulunan;
}

export function ozetDenetimi(makaleler) {
  const r = new Rapor('KAPI 17 — ozet sure iddiasi');
  let taranan = 0;
  let iddia = 0;

  for (const m of makaleler) {
    const fm = m.fm ?? {};
    if (KAPSAM_DISI_TIP.has(fm.tip)) continue;
    if (!fm.ozet) continue;
    taranan++;

    const havuz = katla([m.govde ?? '', fm.baslik ?? ''].join('\n'));
    for (const s of sureIddialari(fm.ozet)) {
      iddia++;
      // "yuz yil" ile "yuzyil" ayni seyi soyler; ozet ayri, govde bitisik
      // yazmis olabilir. Bu nedenle "yuz" iddiasi icin bitisik bicim de kabul.
      const kabuller = /^\d+$/.test(s)
        ? [new RegExp(`(^|[^0-9])${s}([^0-9]|$)`)]
        : s === 'yuz'
          ? [/(^|[^a-z0-9])yuz([^a-z0-9]|$)/, /(^|[^a-z0-9])yuzyil/]
          : [new RegExp(`(^|[^a-z0-9])${s}([^a-z0-9]|$)`)];
      if (!kabuller.some((re) => re.test(havuz))) {
        r.hata(m.goreli,
          `ozet "${s}" ile bir sure iddia ediyor ama govde bu sayiyi hic anmiyor`);
      }
    }
  }

  r.ozetSatirlari = [`taranan ${taranan} makale · ozette sure iddiasi ${iddia}`];
  return r;
}
