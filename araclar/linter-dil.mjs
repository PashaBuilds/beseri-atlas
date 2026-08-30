// KAPI 18 — dil borcu kapisi: sablon/meta-dil kaliplarinin geri kaymasini durdurur.
//
// 2026-08-28 kesif dalgasinin olcumu: "Atlas ..." oz-gonderimi 4.396 gecis /
// 450 dosya, "bu dosya" 1.512 gecis / 460 dosya, "ayrica kaydeder" 1.016
// gecis / 128 dosya, sablon kapanis basliklari 500+ dosya. Bu kaliplar
// platformun okunabilirligini dusuren en olculebilir sorundur; ama 460 dosya
// tasirken kapiyi mutlak yasaga cevirmek butun commit'leri bloke ederdi.
//
// Cozum KAPI 11 desenidir (karar tablosu K5): kapinin devreye girdigi andaki
// gecis sayilari borc defterine yazilir; BORC BUYUYEMEZ.
//   - Yeni makale (defterde yok) kalip iceriyorsa      -> HATA
//   - Var olan makalede sayi defterdekini asiyorsa     -> HATA
//   - Defterde kalip sayi §0'in ustundeyse              -> borc; ozette gorunur
// Onarim borcu eritir; defter yalnizca --dil-taban-yaz ile ve yalnizca
// ASAGI yonde guncellenir (deger dusurme serbest, yukseltme yasak) — boylece
// defter yeniden yazilarak borc gizlenemez.
//
//   node araclar/linter-dil.mjs            (tek basina kos, ozet yaz)
//   node araclar/linter-dil.mjs --taban-yaz (defteri kur/asagi cek)
import fs from 'node:fs';
import path from 'node:path';
import { KOK, makaleleriTopla, Rapor, yaz } from './ortak.mjs';

export const DIL_TABAN_YOLU = path.join(KOK, 'denetim', 'dil-taban.json');

// Sayilan kaliplar. Her biri govde uzerinde calisir; frontmatter dahil degildir.
// "Atlas Okyanusu/Daglari" gibi cografi adlar oz-gonderim sayilmaz.
export const KALIPLAR = {
  atlas_oz: {
    ad: '"Atlas" oz-gonderimi',
    say(govde) {
      let n = 0;
      for (const e of govde.matchAll(/\bAtlas(?:'[a-zçğıöşü]+|[ıiaun][a-zçğıöşü]*)?\b/gu)) {
        const devam = govde.slice(e.index + e[0].length, e.index + e[0].length + 12);
        if (/^\s+(Okyanus|Dağ)/u.test(devam)) continue;
        n += 1;
      }
      return n;
    },
  },
  bu_dosya: {
    ad: '"bu dosya" oz-gonderimi',
    say: (govde) => (govde.match(/\bbu dosya/gi) || []).length,
  },
  ayrica_kaydeder: {
    ad: '"ayrica kaydeder" kalibi',
    say: (govde) => (govde.match(/ayrıca kaydeder/gi) || []).length,
  },
  sablon_kapanis: {
    ad: 'sablon kapanis basligi',
    say: (govde) => (govde.match(/^#{2,3}\s+(Bu dosyanın sınırı|Bu dosyanın kapsamadıkları|Okuma yönlendirmesi)\s*$/gim) || []).length,
  },
  korpus_oz: {
    ad: '"korpus" oz-gonderimi',
    say: (govde) => (govde.match(/\bkorpus(?:un|u|a|ta|taki)?\b/giu) || []).length,
  },
  inceleme_tekrari: {
    ad: 'yinelenen "bu inceleme" oz-gonderimi',
    // Konuyu ve kaynak sinirini birer kez adlandirmak dogaldir. Ucuncu ve
    // sonraki gecisler ise eski seri uretim iskeletinin belirgin izidir.
    say(govde) {
      const n = (govde.match(/\bbu inceleme(?:nin|de|den|ye|yi|yle|ler|si|sinde)?\b/giu) || []).length;
      return Math.max(0, n - 2);
    },
  },
};

export function kalipSay(govde) {
  const sonuc = {};
  for (const [anahtar, k] of Object.entries(KALIPLAR)) sonuc[anahtar] = k.say(govde);
  return sonuc;
}

export function dilTabanOku() {
  if (!fs.existsSync(DIL_TABAN_YOLU)) return null;
  try { return JSON.parse(fs.readFileSync(DIL_TABAN_YOLU, 'utf8')); } catch { return null; }
}

/**
 * Defteri kurar ya da ASAGI ceker. Var olan defterdeki bir deger, mevcut
 * sayimdan dusukse korunur (yukseltme yasak): defter yeniden yazilarak borc
 * buyutulemez.
 */
export function dilTabanHesapla(makaleler, { eski = dilTabanOku() } = {}) {
  const kayit = {
    aciklama: 'KAPI 18 dil borcu defteri. Kapinin devreye girdigi andaki kalip '
      + 'gecis sayilari. Yalnizca --dil-taban-yaz ile ve yalnizca asagi yonde '
      + 'guncellenir; onarim borcu eritir, defter borcu gizleyemez.',
    zaman: new Date().toISOString(),
    makaleler: {},
  };
  const eskiKayit = eski?.makaleler || {};
  for (const m of makaleler) {
    const simdiki = kalipSay(m.govde);
    const onceki = eskiKayit[m.fm.id];
    const satir = {};
    for (const anahtar of Object.keys(KALIPLAR)) {
      satir[anahtar] = onceki === undefined
        ? simdiki[anahtar]
        : Math.min(onceki[anahtar] ?? simdiki[anahtar], simdiki[anahtar]);
    }
    if (Object.values(satir).some((v) => v > 0)) kayit.makaleler[m.fm.id] = satir;
  }
  return kayit;
}

export function dilTabanYaz(makaleler, secenekler = {}) {
  const kayit = dilTabanHesapla(makaleler, secenekler);
  yaz(DIL_TABAN_YOLU, JSON.stringify(kayit, null, 2));
  return kayit;
}

export function dilDenetimi(makaleler, { taban = dilTabanOku() } = {}) {
  const r = new Rapor('KAPI 18 — dil borcu (sablon/meta-dil kaliplari)');
  if (taban === null) {
    r.hata('denetim/dil-taban.json', 'dil borcu defteri yok — `node araclar/linter-dil.mjs --taban-yaz` ile uretilmeli');
    return r;
  }
  const tabanKayit = taban.makaleler || {};
  const toplamlar = Object.fromEntries(Object.keys(KALIPLAR).map((k) => [k, 0]));
  let borclu = 0;

  for (const m of makaleler) {
    const simdiki = kalipSay(m.govde);
    const tabandaki = tabanKayit[m.fm.id];
    let dosyaBorclu = false;
    for (const [anahtar, k] of Object.entries(KALIPLAR)) {
      const n = simdiki[anahtar];
      toplamlar[anahtar] += n;
      const esik = tabandaki?.[anahtar] ?? 0;
      if (n > esik) {
        r.hata(m.goreli, `${k.ad}: ${n} gecis — defterdeki esik ${esik} `
          + (tabandaki === undefined ? '(yeni makale kalip iceremez)' : '(borc buyuyemez)'));
      }
      if (n > 0) dosyaBorclu = true;
    }
    if (dosyaBorclu) borclu += 1;
  }

  const ozet = Object.entries(KALIPLAR)
    .map(([anahtar, k]) => `${k.ad}: ${toplamlar[anahtar]}`).join(' · ');
  r.ozetSatirlari = [
    `${ozet}`,
    `kalip tasiyan makale: ${borclu}/${makaleler.length} — borc yalnizca onarimla erir, defter yukari yazilamaz`,
  ];
  r.olcum = { ...toplamlar, borclu };
  return r;
}

if (process.argv[1]?.endsWith('linter-dil.mjs')) {
  const hepsi = makaleleriTopla();
  if (process.argv.includes('--taban-yaz')) {
    const kayit = dilTabanYaz(hepsi);
    console.log(`dil borcu defteri yazildi: ${Object.keys(kayit.makaleler).length} makalede kalip var`);
  } else {
    // DOSYA KAPSAMI (2026-08-30, kavram-ideoloji hakeminin olcumu). Arac dosya
    // argumanini TAMAMEN yok sayiyordu: bir hakem kendi dosyasini verdiginde
    // BASKA bir dosyanin borcunu HATA olarak goruyordu. Hakem yonergesi
    // "kendi dosyanda calistir, KIRILDI ise DUZELT" diyor, ama duzeltilecek
    // sey baska bir dosyada ve ona dokunmak yasak — yonergeyle arac
    // celisiyordu. Artik arguman verilirse hatalar o dosyalara daraltilir;
    // korpus toplami yine basilir ama BILGI olarak, hata olarak degil.
    const secilenler = process.argv.slice(2).filter((a) => !a.startsWith('-'));
    const makaleler = secilenler.length
      ? hepsi.filter((m) => secilenler.some((s) => m.goreli === s || m.yol === s
        || m.fm?.id === s || m.dosya === s || s.endsWith(`/${m.dosya}`)))
      : hepsi;
    if (secilenler.length && !makaleler.length) {
      console.error(`linter-dil: eslesen makale yok — ${secilenler.join(' ')}`);
      process.exit(2);
    }
    const r = dilDenetimi(makaleler);
    r.yazdir();
    if (secilenler.length) {
      // Kapsam daraltildiginda ozet satiri yaniltici olmasin: korpusun tamami
      // ayrica olculur ve KAPSAM DISI oldugu acikca yazilir.
      const tam = dilDenetimi(hepsi, { borcDefteriYaz: false });
      console.log(`   [bu kosu ${makaleler.length} dosyayla sinirli]`);
      for (const satir of tam.ozetSatirlari || []) console.log(`   korpus geneli — ${satir}`);
      if (!tam.gecti && r.gecti) {
        console.log(`   korpusun BASKA dosyalarinda ${tam.hatalar.length} dil hatasi var; bu kosuda hata sayilmadi`);
      }
    } else {
      for (const satir of r.ozetSatirlari || []) console.log(`   ${satir}`);
    }
    process.exit(r.gecti ? 0 : 1);
  }
}
