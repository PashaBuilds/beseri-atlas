// KAPI 16 — tartisma dosyalarindaki 'savunanlar' adlarinin kutukte olmasi.
//
// Gerekce: tartisma semasi her pozisyon icin en az bir savunan adi zorunlu
// kiliyor (pozisyonSemasi.savunanlar.min(1)) ama hicbir kapi bu alani
// denetlemiyordu. Bir kisiyi savunmadigi bir konuma yerlestirmek atlasin
// yapabilecegi en agir hatadir ve sessizce gecerdi.
//
// Bu kapi dogrulama yapmaz — dogrulama otomatiklestirilemez. Yaptigi sey,
// yeni bir adin atlasa girmesini **gorunur ve kasitli** bir islem haline
// getirmektir: ad once icerik/_sistem/savunanlar.yaml kutuguene yazilmali,
// yazilirken durumu (dogrulandi / devralinan) beyan edilmelidir.
//
// 2026-08-25'te kuruldu; kutuk 144 adla acildi, bunlarin 9'u dogrulandi
// olarak isaretlendi, kalani devralinan olarak borc defterine yazildi.

import fs from 'node:fs';
import path from 'node:path';
import { Rapor, KOK } from './ortak.mjs';

export function kutuguOku() {
  const yol = path.join(KOK, 'icerik', '_sistem', 'savunanlar.yaml');
  if (!fs.existsSync(yol)) return null;
  const metin = fs.readFileSync(yol, 'utf8');
  const kayit = new Map();
  let suAn = null;
  for (const satir of metin.split('\n')) {
    const ad = /^\s*-\s+ad:\s*"(.*)"\s*$/.exec(satir);
    if (ad) { suAn = ad[1]; kayit.set(suAn, 'bilinmiyor'); continue; }
    const durum = /^\s+durum:\s*(\S+)\s*$/.exec(satir);
    if (durum && suAn) kayit.set(suAn, durum[1]);
  }
  return kayit;
}

export function savunanDenetimi(makaleler) {
  const r = new Rapor('KAPI 16 — savunan adlari kutugu');
  const kutuk = kutuguOku();
  if (!kutuk) {
    r.hata('icerik/_sistem/savunanlar.yaml', 'savunan kutugu bulunamadi');
    return r;
  }

  let toplam = 0; let dogrulanmis = 0; const eksik = new Set();
  for (const m of makaleler) {
    if (m.fm?.tip !== 'tartisma') continue;
    for (const p of m.fm.pozisyonlar ?? []) {
      for (const s of p.savunanlar ?? []) {
        toplam++;
        if (!kutuk.has(s)) { eksik.add(s); r.hata(m.goreli, `savunan "${s}" kutukte yok — once icerik/_sistem/savunanlar.yaml dosyasina, atfi dogrulayarak ekleyin`); }
        else if (kutuk.get(s) === 'dogrulandi') dogrulanmis++;
      }
    }
  }
  r.ozetSatirlari = [
    `kutukte ${kutuk.size} ad · makalelerde ${toplam} atif · dogrulanmis ${dogrulanmis} (%${toplam ? Math.round((dogrulanmis / toplam) * 100) : 0})`,
    `devralinan (dogrulanmamis) atif: ${toplam - dogrulanmis}`,
  ];
  return r;
}
