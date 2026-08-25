// KAPI 15 — ayni konuyu iki kez anlatan dosyalari yakalar.
//
// Gerekce: atlas buyudukce ayni siyasi birim ya da ayni kavram icin ikinci bir
// dosya acilmasi kolaylasiyor. Iki dosya ayri ayri butun kapilardan gecebilir
// ama okuyucu ayni konuda farkli tarihler veren iki kayit gorur. Bu, hicbir
// kapinin olcmedigi bir tutarsizlik bicimiydi; 2026-08-25'te iki ornegi
// (Gana Imparatorlugu / Gana Kralligi ve Buyuk Selcuklu / Selcuklular) elle
// birlestirildikten sonra bu kapi yazildi.
//
// Olcut: ayni tipteki iki dosyanin baslik cekirdegi ortusuyorsa VE tarih
// araliklari kesisiyorsa hata verilir. Cekirdek, yonetim bicimi ve tur bildiren
// sozcukler atilarak bulunur; boylece "X Imparatorlugu" ile "X Kralligi" ayni
// cekirdege iner. Sozcuk eslesmesi Turkce eklere karsi toleranslidir:
// "selcuklu" ile "selcuklular" ayni sayilir.
//
// Kapsam disi: donem dosyalari (tasarim geregi bitisik yil dilimleridir) ve
// veri dosyalari (ayni seriye birden cok dosya bagli olabilir).

import { Rapor } from './ortak.mjs';

// Ayirt edici olmayan sozcukler. Bunlarin cogu ayni konunun iki farkli
// adlandirilmasinin sebebidir, dolayisiyla cekirdege girmezler.
const GENEL = new Set([
  'imparatorlugu', 'imparatorluk', 'imparatorluklari', 'devleti', 'devlet',
  'devletleri', 'kralligi', 'krallik', 'kaganligi', 'kaganlik', 'hanedani',
  'hanedan', 'hilafeti', 'hilafet', 'sultanligi', 'sultanlik', 'cumhuriyeti',
  'cumhuriyet', 'birligi', 'birlik', 'sirketi', 'uygarligi', 'medeniyeti',
  'buyuk', 'kucuk', 'yeni', 'eski', 'dogu', 'bati', 'kuzey', 'guney', 'orta',
  'sehir', 'hareketi', 'pakti', 'bankasi', 'orgutu', 'kavrami', 'sorunu',
  'tarihleri', 'donemi', 'savasi', 'savaslari', 'savaslar', 'seferleri',
  'devrimi', 'devrim', 'devrimleri', 'cagi', 'dunya', 'kuresel', 'dunyasi',
  'ticaret', 'antlasmasi', 'krizi', 'bagimsizlik', 'sistemi', 'duzeni',
]);

function katla(s) {
  return String(s ?? '').toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/i̇/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u')
    .replace(/[^a-z0-9\s-]/g, ' ');
}

export function cekirdek(baslik) {
  return [...new Set(
    katla(baslik).split(/[\s-]+/).filter((w) => w.length >= 4 && !GENEL.has(w) && !/^\d+$/.test(w)),
  )];
}

// Turkce ek toleransi: biri otekinin oneki ise ve fark 4 harfi gecmiyorsa
// ayni sozcuk sayilir. "selcuklu" ~ "selcuklular", "osmanli" ~ "osmanlilar".
function ayniSozcuk(a, b) {
  if (a === b) return true;
  const [k, u] = a.length <= b.length ? [a, b] : [b, a];
  return k.length >= 5 && u.startsWith(k) && u.length - k.length <= 4;
}

function yil(t) {
  const m = /^(-?)0*(\d+)/.exec(String(t ?? '').trim());
  return m ? (m[1] === '-' ? -1 : 1) * Number(m[2]) : null;
}

function araliklarKesisiyor(a, b) {
  const a1 = yil(a.fm.tarih_baslangic); const a2 = yil(a.fm.tarih_bitis) ?? a1;
  const b1 = yil(b.fm.tarih_baslangic); const b2 = yil(b.fm.tarih_bitis) ?? b1;
  // Tarihsiz dosyalarda (kavram, tartisma) tarih olcutu uygulanamaz; baslik
  // cakismasi tek basina yeterli sayilir.
  if (a1 === null || b1 === null) return true;
  return a1 <= b2 && b1 <= a2;
}

const KAPSAM_DISI = new Set(['donem', 'veri']);

export function tekrarDenetimi(makaleler) {
  const r = new Rapor('KAPI 15 — ayni konunun iki dosyasi');
  const tipe = new Map();
  for (const m of makaleler) {
    if (KAPSAM_DISI.has(m.fm.tip)) continue;
    const c = cekirdek(m.fm.baslik);
    if (c.length === 0) continue; // cekirdegi bos baslikta karar verilemez
    if (!tipe.has(m.fm.tip)) tipe.set(m.fm.tip, []);
    tipe.get(m.fm.tip).push({ ...m, cekirdek: c });
  }

  let cift = 0;
  for (const [, grup] of tipe) {
    for (let i = 0; i < grup.length; i++) {
      for (let j = i + 1; j < grup.length; j++) {
        const a = grup[i]; const b = grup[j];
        const [kucuk, buyuk] = a.cekirdek.length <= b.cekirdek.length
          ? [a.cekirdek, b.cekirdek] : [b.cekirdek, a.cekirdek];
        // Kucuk cekirdegin her sozcugu buyuk cekirdekte karsilik buluyorsa
        // iki baslik ayni konuyu adlandiriyor demektir.
        // Tek sozcuklu kucuk cekirdek, daha genis bir cekirdegin icinde
        // bulundugunda zayif kanittir: 2026-08-25'te "Hukuk devleti" ile
        // "Hukuki belge okumasi" bu yoldan yanlis eslesti ({hukuk} ~ {hukuki}).
        // Bu durumda ek toleransi kapatiliyor; tam esitlik araniyor.
        // Gercek birlestirme vakalari (Gana Kralligi/Imparatorlugu, Buyuk
        // Selcuklu/Selcuklular) iki tarafta da tek sozcuklu cekirdege indigi
        // icin bu daralmadan etkilenmez.
        const zayif = kucuk.length === 1 && buyuk.length > 1;
        const esles = zayif ? ((w, v) => w === v) : ayniSozcuk;
        const kapsiyor = kucuk.every((w) => buyuk.some((v) => esles(w, v)));
        if (!kapsiyor) continue;
        if (!araliklarKesisiyor(a, b)) continue;
        cift++;
        r.hata(a.goreli,
          `ayni konu iki dosyada olabilir: "${a.fm.baslik}" ve "${b.fm.baslik}" `
          + `(${b.goreli}). Birlestirin ya da basliklari ayirin.`);
      }
    }
  }
  r.ozetSatirlari = [`olculen ${makaleler.length} makale · cakisan cift ${cift}`];
  return r;
}
