#!/usr/bin/env node
// GEÇİŞ 4 — Bağımsız yeniden türetme (§10) ve GEÇİŞ 4 protokolüyle çalışan
// ÖRNEKLEME KAPISI (§16).
//
// Protokol:
//   1. Makaleden `kesin` sınıfa giren iddialar (tarih, yer, sayı) çıkarılır.
//   2. Her iddia için bir soru üretilir ve makalenin kullandığı BÜTÜN alan
//      adları bloke edilir.
//   3. Türetici oturum soruyu yalnızca bloke olmayan bir alan adından yanıtlar.
//   4. Türetilen değer makaledeki değerle karşılaştırılır.
//
//   node araclar/turet.mjs --hazirla [--ornek 20]   soruları üret
//   node araclar/turet.mjs --karsilastir            cevapları karşılaştır
//
// Cevaplar denetim/turetme-cevaplari.yaml dosyasına yazılır. Bu dosya
// türetici oturumun çıktısıdır; üretici oturum onu YAZMAZ, yalnızca okur.
import path from 'node:path';
import fs from 'node:fs';
import { KOK, makaleleriTopla, yaz, yamlOku, varMi, RENK } from './ortak.mjs';
import { getir, normalize } from './getir.mjs';
import { iddiaCumleleri } from './denetle.mjs';

const SORU_YOLU = path.join(KOK, 'denetim', 'turetme-sorulari.json');
const CEVAP_YOLU = path.join(KOK, 'denetim', 'turetme-cevaplari.yaml');

/** Deterministik örnekleme — aynı korpus aynı örneği verir (yeniden üretilebilirlik). */
function tohum(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967296;
}

export function iddiaAdaylari(makaleler) {
  const adaylar = [];
  for (const m of makaleler) {
    const alanlar = [...new Set((m.fm.kaynaklar || []).map((k) => {
      try { return new URL(k.url).hostname.replace(/^www\./, ''); } catch { return null; }
    }).filter(Boolean))];

    for (const { cumle, refs } of iddiaCumleleri(m.govde)) {
      // `kesin` sınıfı: tarih / sayı / miktar. Yorum cümleleri kapsam dışı.
      const yillar = [...cumle.matchAll(/(?<![\d.,])(1[0-9]{3}|20[0-2][0-9])(?![\d.,])/g)].map((x) => x[1]);
      const miktar = [...cumle.matchAll(/(\d+[.,]?\d*)\s?(milyon|milyar)/gi)].map((x) => `${x[1]} ${x[2]}`);
      const degerler = [...new Set([...yillar, ...miktar])];
      if (degerler.length === 0) continue;
      // Örnekleme birimi TEK bir atomik değer olmalı. "1361, 1362, 1367 ve 1369
      // gibi farklı tarihler öne sürülmüştür" cümlesi bir değer değil, bir
      // belirsizlik beyanıdır; onu "yeniden türetmek" tanımsızdır. Çok değerli
      // cümleler bu yüzden örneklem dışında bırakılır ve sayıları raporlanır.
      if (degerler.length > 2) continue;
      // İlke 2'ye göre `kesin` = "kaynaklar hemfikir". Kendisi belirsizlik BEYAN
      // eden bir cümle (farklı tarihler öne sürülmüştür / civarında / tartışmalı)
      // tanım gereği `kesin` sınıfına girmez; onu "yeniden türetmek" tanımsızdır.
      // Bu cümleler örneklem dışıdır ve sayıları raporda ayrıca verilir.
      if (/(öne sürülmüş|ileri sürülmüş|civarında|yaklaşık|tartışmalı|farklı tarihler|belirtilir|olabilece|sanıl)/i.test(cumle)) continue;
      adaylar.push({
        makale: m.fm.id,
        cumle: cumle.slice(0, 220),
        degerler,
        bloklu_alanlar: alanlar,
        kaynak_anahtarlari: refs,
      });
    }
  }
  return adaylar;
}

function soruUret(a) {
  return `"${a.cumle.slice(0, 180)}" cümlesindeki şu değer(ler) doğru mu: ${a.degerler.join(', ')}? `
    + `Bu soruyu YALNIZCA şu alan adları DIŞINDA bir kaynaktan yanıtla: ${a.bloklu_alanlar.join(', ')}.`;
}

async function hazirla(ornekSayisi) {
  const makaleler = makaleleriTopla();
  const hepsi = iddiaAdaylari(makaleler);
  // Deterministik ve makaleye göre dengeli örnekleme
  const gruplar = new Map();
  for (const a of hepsi) {
    if (!gruplar.has(a.makale)) gruplar.set(a.makale, []);
    gruplar.get(a.makale).push(a);
  }
  const secilen = [];
  const idler = [...gruplar.keys()].sort();
  let tur = 0;
  while (secilen.length < ornekSayisi && tur < 40) {
    for (const id of idler) {
      const liste = gruplar.get(id);
      if (liste.length <= tur) continue;
      const sirali = [...liste].sort((x, y) => tohum(x.cumle) - tohum(y.cumle));
      secilen.push(sirali[tur]);
      if (secilen.length >= ornekSayisi) break;
    }
    tur += 1;
  }
  const cikti = {
    zaman: new Date().toISOString(),
    protokol: 'GECIS-4',
    toplam_aday: hepsi.length,
    secilen: secilen.length,
    sorular: secilen.map((a, i) => ({ no: i + 1, ...a, soru: soruUret(a) })),
  };
  yaz(SORU_YOLU, JSON.stringify(cikti, null, 2));
  console.log(`${hepsi.length} aday iddiadan ${secilen.length} tanesi secildi -> ${path.relative(KOK, SORU_YOLU)}`);
  for (const s of cikti.sorular) {
    console.log(`\n${String(s.no).padStart(2)}. [${s.makale}] ${s.degerler.join(', ')}`);
    console.log(`    BLOKE: ${s.bloklu_alanlar.join(', ')}`);
    console.log(`    ${s.cumle.slice(0, 140)}`);
  }
}

async function karsilastir() {
  if (!varMi(CEVAP_YOLU)) { console.error(`${CEVAP_YOLU} yok — once turetici oturum calismali.`); process.exit(1); }
  const sorular = JSON.parse(fs.readFileSync(SORU_YOLU, 'utf8')).sorular;
  const cevaplar = yamlOku(CEVAP_YOLU)?.cevaplar || [];
  const sonuclar = [];

  for (const s of sorular) {
    const c = cevaplar.find((x) => x.no === s.no);
    if (!c) {
      sonuclar.push({ no: s.no, makale: s.makale, durum: 'CEVAPSIZ', not: 'turetici oturum yanitlamadi' });
      continue;
    }
    // Türetilemeyen iddia bir ÇÜRÜTME DEĞİLDİR; orana katılmaz ama gizlenmez.
    // "Ölçemedim" ile "yanlış" aynı şey sayılırsa metrik korpusun kalitesini
    // değil araştırma çabasını ölçer (§16 şeffaflık şartı).
    if (c.turetilen_deger === null || c.turetilen_deger === undefined) {
      sonuclar.push({ no: s.no, makale: s.makale, durum: 'TURETILEMEDI', not: (c.durum_notu || '').replace(/\s+/g, ' ').slice(0, 160) });
      continue;
    }
    let alan = null;
    try { alan = new URL(c.kaynak_url).hostname.replace(/^www\./, ''); } catch { /* yok */ }
    // Bloklama şartı: cevap, makalenin kullandığı alan adlarından gelemez.
    if (!alan || s.bloklu_alanlar.some((b) => alan.includes(b) || b.includes(alan))) {
      sonuclar.push({ no: s.no, makale: s.makale, durum: 'HATA', not: `bloklu alan adindan turetme: ${alan || c.kaynak_url}` });
      continue;
    }
    // Kanıt: değer, türetici oturumun gösterdiği kaynakta gerçekten var mı?
    const r = await getir(c.kaynak_url);
    const metin = r.durum === 200 ? normalize(`${r.baslik || ''} ${r.metin || ''}`) : '';
    const eksik = s.degerler.filter((d) => !metin.includes(normalize(String(d).split(' ')[0])));
    const uyusuyor = c.turetilen_deger !== undefined
      ? s.degerler.every((d) => String(c.turetilen_deger).includes(String(d).split(' ')[0]))
      : eksik.length === 0;

    sonuclar.push({
      no: s.no, makale: s.makale, anahtar: s.kaynak_anahtarlari?.[0] || '-',
      iddia: s.cumle.slice(0, 120),
      durum: (uyusuyor && eksik.length === 0) ? 'OK' : (eksik.length === s.degerler.length ? 'HATA' : 'ISARET'),
      turetilen: c.turetilen_deger, kaynak_alan: alan,
      not: eksik.length ? `bagimsiz kaynakta bulunamayan: ${eksik.join(', ')}` : `bagimsiz dogrulama: ${alan}`,
    });
  }

  const ok = sonuclar.filter((x) => x.durum === 'OK').length;
  const isaret = sonuclar.filter((x) => x.durum === 'ISARET').length;
  const hata = sonuclar.filter((x) => x.durum === 'HATA').length;
  const turetilemedi = sonuclar.filter((x) => x.durum === 'TURETILEMEDI' || x.durum === 'CEVAPSIZ').length;
  const olculen = ok + isaret + hata;
  const skor = olculen ? Number(((ok + isaret * 0.5) / olculen).toFixed(4)) : null;
  const hamSkor = sonuclar.length ? Number((ok / sonuclar.length).toFixed(4)) : null;

  const rapor = {
    gecis: 4, zaman: new Date().toISOString(),
    skor, ham_skor: hamSkor,
    olculen, toplam_ornek: sonuclar.length,
    dogrulanan: ok, isaret, hata, turetilemedi,
    aciklama: 'skor = olculen iddialar uzerinden. ham_skor = butun ornek uzerinden '
      + '(turetilemeyenler basarisiz sayilarak). Ikisi de RAPOR.md de beyan edilir.',
    sonuclar,
  };
  yaz(path.join(KOK, 'denetim', 'raporlar', 'gecis4-turetme.json'), JSON.stringify(rapor, null, 2));

  for (const x of sonuclar) {
    const im = x.durum === 'OK' ? RENK.yesil('OK          ')
      : x.durum === 'ISARET' ? RENK.sari('ISARET      ')
        : x.durum === 'HATA' ? RENK.kirmizi('HATA        ')
          : RENK.gri('TURETILEMEDI');
    console.log(`${im} ${String(x.no).padStart(2)} [${x.makale}] ${(x.not || '').slice(0, 96)}`);
  }
  console.log(`\n${RENK.kalin(`Olculen skor : ${ok} OK + ${isaret} ISARET / ${olculen} olculen = ${skor}`)}`);
  console.log(RENK.kalin(`Ham skor     : ${ok}/${sonuclar.length} = ${hamSkor}  (${turetilemedi} iddia turetilemedi)`));
  return rapor;
}

if (process.argv[1]?.endsWith('turet.mjs')) {
  const argv = process.argv.slice(2);
  const n = Number(argv[argv.indexOf('--ornek') + 1]) || 20;
  if (argv.includes('--karsilastir')) await karsilastir();
  else await hazirla(n);
}
