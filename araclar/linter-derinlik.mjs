// KAPI 11 — Derinlik kapisi.
//
// §3 her tip icin bir uzunluk hedefi veriyor. On kapinin hicbiri bunu
// olcmuyordu: hepsi sema, dipnot, terim, telif, link ve hakemlik uzerinde
// calisiyor. Sonuc, hattin kendi kapilarinin goremedigi bir bosluk oldu —
// korpus 359 makalede %100 "onaylandi" gorunurken makalelerin TAMAMI §3
// hedefinin altinda kaldi (olculen: 0/359).
//
// NE OLCULUR
//   §3'te hedefi ACIKCA verilen tipler. `veri` ve `kaynak` icin sartnamede
//   uzunluk hedefi YOKTUR; bu araç onlara hedef UYDURMAZ, olcum disi birakir
//   ve bunu raporda soyler.
//
// NASIL ZORLANIR — bilincli tasarim karari
//   Bu kapi, korpus zaten uretilmisken devreye giriyor. Iki yanlis secenek var:
//     (1) esigi korpusa uydurmak  -> §15'in "kapiyi gevsetmek" yasagi. Yasak.
//     (2) hemen sert kirmak       -> repo hic derlenmez, 359 makale birden
//                                    hatali olur ve kapi sinyal olmaktan cikip
//                                    gurultuye doner.
//   Ucuncu yol: esik §3'te KALIR, olcum gizlenmez, ama borc kayda gecer.
//     - Taban dosyasi (denetim/derinlik-taban.json) kapinin devreye girdigi
//       andaki gercek kelime sayilarini tutar. Bu bir esik DEGIL, bir BORC
//       DEFTERIDIR: neyin eksik oldugunu sayiyla soyler.
//     - YENI makale §3 hedefinin altindaysa            -> HATA.
//     - Var olan makale kendi tabanindan KISALDIYSA    -> HATA (cirit geri
//       kaymaz; borc buyuyemez).
//     - Var olan makale tabanda kalir ve §3 altindaysa -> borc olarak sayilir,
//       her kosuda yuksek sesle raporlanir, sessizce gecmez.
//   Boylece esik dusurulmez, olcum susturulmaz, ama kapi da var olan korpusu
//   rehin almaz. Borcun kapanmasi icerik isidir, kapi isi degil.
import path from 'node:path';
import { Rapor, KOK, yamlOku, varMi, oku, yaz } from './ortak.mjs';

export const TABAN_YOLU = path.join(KOK, 'denetim', 'derinlik-taban.json');

/** §3 uzunluk hedefleri. Bu tablo KICKOFF §3'ten birebir alinmistir. */
export const HEDEFLER = {
  donem: { min: 2500, max: 4000 },
  olay: { min: 1200, max: 2000 },
  aktor: { min: 1200, max: 2000 },
  dusunur: { min: 1200, max: 2000 },
  kavram: { min: 600, max: 1000 },
  tartisma: { min: 1500, max: 2500 },
  // veri ve kaynak: §3'te hedef verilmemis. Uydurulmaz.
};

/**
 * Govde kelime sayisi. Dipnot referanslari, direktif susleri ve markdown
 * isaretleri iddia tasimaz; sayimdan dusulur ki olcu "yazilan is" olsun.
 */
export function kelimeSay(govde) {
  return govde
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[\^k\d+\]/g, ' ')
    .replace(/::[a-zçğıöşü]+\[([^\]]*)\]\{[^}]*\}/gi, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*[|>#*_-]+\s*/gm, ' ')
    .split(/\s+/)
    .filter((k) => /\p{L}|\p{N}/u.test(k))
    .length;
}

export function tabanOku() {
  if (!varMi(TABAN_YOLU)) return null;
  try { return JSON.parse(oku(TABAN_YOLU)); } catch { return null; }
}

/** Taban dosyasini mevcut korpustan uretir (yalnizca --taban-yaz ile cagrilir). */
export function tabanYaz(makaleler) {
  const kayit = {
    aciklama: 'KAPI 11 borc defteri. Kapinin devreye girdigi andaki kelime '
      + 'sayilari. Esik DEGIL: §3 hedefi kapinin kendisindedir. Bu dosya '
      + 'yalnizca "borc buyumesin" ciritini tutar.',
    yazildi: new Date().toISOString(),
    makaleler: {},
  };
  for (const m of makaleler) {
    if (m.ayristirmaHatasi || !m.fm.id) continue;
    if (!HEDEFLER[m.fm.tip]) continue;
    kayit.makaleler[m.fm.id] = kelimeSay(m.govde);
  }
  yaz(TABAN_YOLU, `${JSON.stringify(kayit, null, 2)}\n`);
  return kayit;
}

export function derinlikDenetimi(makaleler, { taban = tabanOku() } = {}) {
  const r = new Rapor('KAPI 11 — derinlik (§3 uzunluk hedefi)');
  const tabanKayit = taban?.makaleler || {};
  const tabanVar = taban !== null;

  let borclu = 0;
  let eksikKelime = 0;
  let hedefTutan = 0;
  let olculen = 0;
  const tipOzet = {};

  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    const tip = m.fm.tip;
    const hedef = HEDEFLER[tip];
    if (!hedef) continue;

    const n = kelimeSay(m.govde);
    olculen += 1;
    tipOzet[tip] ||= { n: 0, tutan: 0, eksik: 0 };
    tipOzet[tip].n += 1;

    if (n >= hedef.min) {
      hedefTutan += 1;
      tipOzet[tip].tutan += 1;
      continue;
    }

    const eksik = hedef.min - n;
    borclu += 1;
    eksikKelime += eksik;
    tipOzet[tip].eksik += eksik;

    const tabandaki = tabanKayit[m.fm.id];

    if (tabandaki === undefined) {
      // Tabanda yoksa YENI makaledir: §3 hedefi dogrudan zorlanir.
      r.hata(m.goreli, `${n} kelime — §3 hedefi ${hedef.min}-${hedef.max}, ${eksik} kelime eksik `
        + `(yeni makale; borc defterine giremez)`);
    } else if (n < tabandaki) {
      // Cirit geri kaydi: borc buyudu.
      r.hata(m.goreli, `${n} kelime — tabandaki ${tabandaki} degerinden ${tabandaki - n} kelime KISALDI `
        + `(§3 hedefi ${hedef.min}; borc buyuyemez)`);
    }
    // Aksi halde: taban korunuyor, §3 altinda. Borc olarak sayilir, asagida
    // toplu raporlanir. Sessizce gecmez ama tek tek hata da uretmez.
  }

  if (!tabanVar) {
    r.hata('denetim/derinlik-taban.json', 'borc defteri yok — `node araclar/linter-derinlik.mjs --taban-yaz` ile uretilmeli');
  }

  const satirlar = [];
  satirlar.push(`olculen ${olculen} makale · §3 hedefini tutan ${hedefTutan} · borclu ${borclu}`);
  if (borclu > 0) {
    satirlar.push(`toplam eksik: ${eksikKelime.toLocaleString('tr-TR')} kelime`);
    for (const [tip, o] of Object.entries(tipOzet).sort()) {
      if (o.eksik === 0) continue;
      satirlar.push(`  ${tip.padEnd(9)} ${o.tutan}/${o.n} tutuyor · ${o.eksik.toLocaleString('tr-TR')} kelime eksik `
        + `(hedef ${HEDEFLER[tip].min}-${HEDEFLER[tip].max})`);
    }
  }
  r.ozetSatirlari = satirlar;
  r.olcum = { olculen, hedefTutan, borclu, eksikKelime, tipOzet };
  return r;
}

/**
 * Borcu, kapatilabilir bir is listesine cevirir: hangi makale, kac kelime,
 * hangi hedefe. Sira eksigin buyuklugune gore degil TIP hedefine gore verilir —
 * once kronolojik omurga (donem), sonra sentez katmani (tartisma), sonra govde;
 * bir atlasin derinligi once omurgasindan okunur.
 */
export function borcListesi(makaleler, { taban = tabanOku() } = {}) {
  const ONCELIK = ['donem', 'tartisma', 'olay', 'aktor', 'dusunur', 'kavram'];
  const satirlar = [];
  for (const m of makaleler) {
    if (m.ayristirmaHatasi || !m.fm.id) continue;
    const hedef = HEDEFLER[m.fm.tip];
    if (!hedef) continue;
    const n = kelimeSay(m.govde);
    if (n >= hedef.min) continue;
    satirlar.push({
      id: m.fm.id, tip: m.fm.tip, goreli: m.goreli, kelime: n,
      hedef_min: hedef.min, hedef_max: hedef.max, eksik: hedef.min - n,
      kaynak_sayisi: (m.fm.kaynaklar || []).length,
    });
  }
  satirlar.sort((a, b) => {
    const f = ONCELIK.indexOf(a.tip) - ONCELIK.indexOf(b.tip);
    return f !== 0 ? f : b.eksik - a.eksik;
  });
  return satirlar;
}

export function borcListesiYaz(makaleler) {
  const liste = borcListesi(makaleler);
  const toplam = liste.reduce((a, s) => a + s.eksik, 0);
  const g = [];
  g.push('# Derinlik borcu — KAPI 11 is listesi', '');
  g.push('_Bu dosya `node araclar/linter-derinlik.mjs --liste` ile uretilir, elle yazilmaz._', '');
  g.push('§3 uzunluk hedefinin altinda kalan makaleler. Sira tip onceligine gore:');
  g.push('once kronolojik omurga, sonra sentez katmani, sonra ana govde.', '');
  g.push(`Borclu makale: **${liste.length}** · Toplam eksik: **${toplam.toLocaleString('tr-TR')}** kelime`, '');
  g.push('> Bu borcun kapatilmasi KAYNAKLI icerik uretimidir. Ilke 1 geregi eklenen');
  g.push('> her paragraf dipnot tasimak zorundadir; kaynak arastirmasi yapilamayan');
  g.push('> bir ortamda bu liste yurutulemez (bkz. denetim/MUDAHALE-GEREKLI.md).', '');
  g.push('| # | makale | tip | kelime | hedef | eksik | kaynak |');
  g.push('|---|---|---|---|---|---|---|');
  liste.forEach((s, i) => {
    g.push(`| ${i + 1} | \`${s.id}\` | ${s.tip} | ${s.kelime} | ${s.hedef_min}-${s.hedef_max} | ${s.eksik} | ${s.kaynak_sayisi} |`);
  });
  g.push('');
  const yol = path.join(KOK, 'denetim', 'derinlik-borcu.md');
  yaz(yol, g.join('\n'));
  return { yol, liste, toplam };
}

if (process.argv[1]?.endsWith('linter-derinlik.mjs')) {
  const { makaleleriTopla, RENK } = await import('./ortak.mjs');
  const makaleler = makaleleriTopla();
  if (process.argv.includes('--liste')) {
    const { yol, liste, toplam } = borcListesiYaz(makaleler);
    console.log(`is listesi yazildi: ${liste.length} makale, ${toplam.toLocaleString('tr-TR')} kelime eksik -> ${path.relative(KOK, yol)}`);
  } else if (process.argv.includes('--taban-yaz')) {
    const k = tabanYaz(makaleler);
    console.log(`borc defteri yazildi: ${Object.keys(k.makaleler).length} makale -> ${path.relative(KOK, TABAN_YOLU)}`);
  } else {
    const r = derinlikDenetimi(makaleler);
    r.yazdir();
    for (const s of r.ozetSatirlari || []) console.log(`   ${RENK.gri(s)}`);
    process.exit(r.gecti ? 0 : 1);
  }
}
