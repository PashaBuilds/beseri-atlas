#!/usr/bin/env node
// On build kapisinin tek calistiricisi.
//
//   node araclar/kapilar.mjs --lint   -> cevrimdisi kapilar (1,2,3,4,5,7,9,11,13,15,16,20)
//   node araclar/kapilar.mjs --ag     -> ag kapilari (8,10)
//   node araclar/kapilar.mjs --pre    -> lint + onay filtresi (6) + ag kapilari
//   node araclar/kapilar.mjs --post   -> build ciktisi uzerinde onay filtresi (6), 12, 14
//   node araclar/kapilar.mjs --tam    -> hepsi, onbellek atlanarak
//
// Hicbir kapi uyariya dusurulemez, hicbiri atlanamaz (§11).
import fs from 'node:fs';
import path from 'node:path';
import { makaleleriTopla, Rapor, RENK, KOK, yaz } from './ortak.mjs';
import { semaDogrula } from '../icerik/_sistem/sema.mjs';
import { dipnotDenetimi } from './linter-dipnot.mjs';
import { terimDenetimi } from './linter-terim.mjs';
import { telifDenetimi } from './linter-telif.mjs';
import { hakemlikDenetimi } from './linter-hakemlik.mjs';
import { linkDenetimi } from './linter-link.mjs';
import { canlilikDenetimi } from './kaynak-canlilik.mjs';
import { derinlikDenetimi } from './linter-derinlik.mjs';
import { ciktiDenetimi, icerikKaybi } from './linter-cikti.mjs';
import { kaynakDenetimi } from './linter-kaynak.mjs';
import { tekrarDenetimi } from './linter-tekrar.mjs';
import { savunanDenetimi } from './linter-savunan.mjs';
import { ozetDenetimi } from './linter-ozet.mjs';
import { dilDenetimi } from './linter-dil.mjs';
import { sayiDenetimi } from './linter-sayi.mjs';
import { ogrenmeCekirdegiDenetimi } from './linter-ogrenme-cekirdegi.mjs';

export const YAYIN_DURUMU = 'onaylandi';

/** KAPI 1 — Zod sema dogrulamasi */
export function semaDenetimi(makaleler) {
  const r = new Rapor('KAPI 1 — Zod sema dogrulamasi');
  const gorulenId = new Map();
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) { r.hata(m.goreli, m.ayristirmaHatasi); continue; }
    const tip = m.fm.tip || m.tip;
    const s = semaDogrula(tip, m.fm);
    if (!s.ok) for (const h of s.hatalar) r.hata(m.goreli, h);
    if (m.fm.id) {
      if (gorulenId.has(m.fm.id)) r.hata(m.goreli, `id cakismasi: "${m.fm.id}" zaten ${gorulenId.get(m.fm.id)} icinde`);
      else gorulenId.set(m.fm.id, m.goreli);
    }
    // Makale basina en az 3 kaynak (kapilar.yaml: makale_basina_kaynak_min)
    if ((m.fm.kaynaklar || []).length < 3) {
      r.hata(m.goreli, `${(m.fm.kaynaklar || []).length} kaynak — en az 3 bagimsiz kaynak zorunlu (§9)`);
    }
    // Kaynak cesitliligi: ayni alan adindan gelen kaynaklar bagimsiz sayilmaz
    const alanlar = new Set();
    for (const k of m.fm.kaynaklar || []) {
      try { alanlar.add(new URL(k.url).hostname.replace(/^www\./, '')); } catch { /* KAPI 8 yakalar */ }
    }
    if (alanlar.size < 2 && (m.fm.kaynaklar || []).length >= 3) {
      r.hata(m.goreli, `butun kaynaklar tek alan adindan (${[...alanlar][0]}) — bagimsizlik sarti ihlali (Ilke 6)`);
    }
  }
  return r;
}

/** KAPI 6 — Onay filtresi (kaynak tarafi) */
export function onayFiltresi(makaleler) {
  const r = new Rapor('KAPI 6 — onay filtresi');
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    const d = m.fm.denetim_durumu;
    if (d === 'karantina') {
      r.hata(m.goreli, 'karantina durumundaki makale icerik/ altinda duruyor — karantina/ klasorune tasinmali');
    }
  }
  return r;
}

/** KAPI 6 — Onay filtresi (build ciktisi tarafi) */
export function ciktiFiltresi(makaleler) {
  const r = new Rapor('KAPI 6 — onay filtresi (dist/)');
  const dist = path.join(KOK, 'dist');
  if (!fs.existsSync(dist)) { r.hata('dist/', 'build ciktisi yok'); return r; }
  const onaysiz = makaleler.filter((m) => m.fm.denetim_durumu !== YAYIN_DURUMU && m.fm.id);
  for (const m of onaysiz) {
    const [tip, ...rest] = m.fm.id.split('-');
    const sayfa = path.join(dist, tip, rest.join('-'), 'index.html');
    if (fs.existsSync(sayfa)) {
      r.hata(m.goreli, `denetim_durumu="${m.fm.denetim_durumu}" oldugu halde prod ciktida sayfasi var: ${path.relative(KOK, sayfa)}`);
    }
  }
  return r;
}

function ozet(raporlar) {
  const hata = raporlar.reduce((a, r) => a + r.hatalar.length, 0);
  const uyari = raporlar.reduce((a, r) => a + r.uyarilar.length, 0);
  const kirilan = raporlar.filter((r) => !r.gecti).length;
  console.log('');
  console.log(RENK.kalin(`${raporlar.length - kirilan}/${raporlar.length} kapi gecti — ${hata} hata, ${uyari} uyari`));
  return hata === 0;
}

export async function kapilariCalistir(mod = '--lint') {
  const makaleler = makaleleriTopla();
  console.log(RENK.kalin(`\nBesERI ATLAS — build kapilari (${mod}), ${makaleler.length} makale\n`));
  const raporlar = [];

  if (mod !== '--post') {
    raporlar.push(semaDenetimi(makaleler));
    raporlar.push(dipnotDenetimi(makaleler));
    raporlar.push(terimDenetimi(makaleler));
    raporlar.push(linkDenetimi(makaleler));
    raporlar.push(telifDenetimi(makaleler));
    raporlar.push(hakemlikDenetimi(makaleler));
    raporlar.push(derinlikDenetimi(makaleler));
    raporlar.push(kaynakDenetimi(makaleler));
    raporlar.push(tekrarDenetimi(makaleler));
    raporlar.push(savunanDenetimi(makaleler));
    raporlar.push(ozetDenetimi(makaleler));
    raporlar.push(dilDenetimi(makaleler));
    raporlar.push(sayiDenetimi(makaleler));
    raporlar.push(ogrenmeCekirdegiDenetimi(makaleler));
  }
  if (mod === '--pre' || mod === '--tam') raporlar.push(onayFiltresi(makaleler));
  if (mod === '--ag' || mod === '--pre' || mod === '--tam') {
    const { r8, r10 } = await canlilikDenetimi(makaleler, { taze: mod === '--tam' });
    raporlar.push(r8, r10);
  }
  if (mod === '--post') {
    raporlar.push(ciktiFiltresi(makaleler));
    raporlar.push(ciktiDenetimi({ makaleler }));
    raporlar.push(icerikKaybi({ makaleler }));
  }

  for (const r of raporlar) {
    r.yazdir();
    // KAPI 11 gibi kapilar, hata uretmeseler de olctukleri seyi bildirir.
    // Borcun her kosuda gorunmesi kapinin isinin yarisidir.
    for (const satir of r.ozetSatirlari || []) console.log(`   ${RENK.gri(satir)}`);
  }
  // COMMIT KAPSAMI. Kapilar korpusun TAMAMINI olcer — kapsam daraltmak
  // capraz kapilari (bag butunlugu, ayni konunun iki dosyasi) anlamsiz
  // kilardi. Ama bir commit yalnizca ICERDIGI dosyalardaki hatadan sorumlu
  // tutulabilir. 2026-08-29: paralel onarim dalgalari surerken agac hicbir
  // an temiz kalmadigi icin commit penceresi hic acilmiyordu; kanca, baska
  // bir ajanin yarim yazdigi dosya yuzunden alakasiz bir altyapi commit'ini
  // durduruyordu. BESERI_KAPSAM verildiginde hatalar hala YAZDIRILIR ama
  // gecti/kaldi hukmu yalnizca kapsamdaki dosyalara bakar.
  const kapsamHam = process.env.BESERI_KAPSAM;
  let gecti;
  if (kapsamHam) {
    const kapsam = kapsamHam.split(/[,\s]+/).filter(Boolean);
    const icinde = (h) => {
      const yer = String(h.dosya || h.yol || '');
      return kapsam.some((k) => yer.includes(k));
    };
    ozet(raporlar);
    const kapsamHatalari = raporlar.flatMap((r) => r.hatalar.filter(icinde));
    const disHatalar = raporlar.reduce((a, r) => a + r.hatalar.filter((h) => !icinde(h)).length, 0);
    console.log(`\n${RENK.gri(`commit kapsami: ${kapsam.length} dosya · kapsam ici hata ${kapsamHatalari.length} · kapsam disi hata ${disHatalar} (baska oturumlarin yarim isi; bu commit'i baglamaz)`)}`);
    for (const h of kapsamHatalari.slice(0, 20)) console.log(`   ${RENK.kirmizi('KAPSAM ICI HATA')} ${h.dosya || h.yol}: ${h.mesaj}`);
    gecti = kapsamHatalari.length === 0;
  } else {
    gecti = ozet(raporlar);
  }

  yaz(path.join(KOK, 'denetim', 'kapi-sonucu.json'), JSON.stringify({
    mod, zaman: new Date().toISOString(), gecti, makale_sayisi: makaleler.length,
    kapilar: raporlar.map((r) => ({ kapi: r.kapi, gecti: r.gecti, hata: r.hatalar.length, uyari: r.uyarilar.length,
      hatalar: r.hatalar.slice(0, 50), ...(r.olcum ? { olcum: r.olcum } : {}) })),
  }, null, 2));
  // `kapi-sonucu.json` her kipte yeniden yazılır; --post yalnızca üç çıktı
  // kapısını taşıdığı için KAPI 20 ölçümü orada kalıcı değildir. Okura
  // gösterilen çekirdek puanı ayrı, yalnız KAPI 20 gerçekten çalıştığında
  // yenilenen bir ölçüm dosyasından gelir. Post koşusu bu kaydı silemez.
  const ogrenmeRaporu = raporlar.find((r) => String(r.kapi).startsWith('KAPI 20'));
  if (ogrenmeRaporu?.gecti && ogrenmeRaporu.olcum) {
    yaz(path.join(KOK, 'denetim', 'ogrenme-cekirdegi.json'), JSON.stringify({
      surum: 1,
      kapi: ogrenmeRaporu.kapi,
      ...ogrenmeRaporu.olcum,
    }, null, 2));
  }
  return { gecti, raporlar, makaleler };
}

if (process.argv[1]?.endsWith('kapilar.mjs')) {
  const mod = process.argv.find((a) => a.startsWith('--')) || '--lint';
  const { gecti } = await kapilariCalistir(mod);
  process.exit(gecti ? 0 : 1);
}
