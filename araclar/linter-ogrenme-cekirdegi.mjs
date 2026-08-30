// KAPI 20 — öğrenme çekirdeği.
//
// Arşivin büyüklüğü ile okura önerilen yolun kalitesi aynı şey değildir.
// Bu kapı, `src/lib/rotalar.ts` içinde ilk kullanıcıya önerilen bütün makaleleri
// doğrudan bulur ve onlar için borç defteri kabul etmez. Bir rota adımı:
//   - türüne ait derinlik hedefini tutmalı,
//   - en az 5 künye ve 3 bağımsız alan adı taşımalı,
//   - en fazla bir giriş-kapısı kaynağı kullanmalı,
//   - birincil kaynak veya açık kaynak sınırı göstermeli,
//   - şablon/meta-dilden arınmış olmalı,
//   - güncel, kör hakemli iddia-kaynak matrisine sahip olmalı.
//
// Böylece “Bugün” sayfasındaki öneri, 540 dosyalık arşivde henüz kapanmamış
// editoryal borçlardan etkilenmez. Çekirdeğin eşiği düşürülemez ve tabanı yoktur.
import fs from 'node:fs';
import path from 'node:path';
import { KOK, Rapor, linterCli } from './ortak.mjs';
import { HEDEFLER, kelimeSay } from './linter-derinlik.mjs';
import { KALIPLAR, kalipSay } from './linter-dil.mjs';
import { matrisOku, matrisiDogrula } from './matris.mjs';

export const ROTALAR_YOLU = path.join(KOK, 'src', 'lib', 'rotalar.ts');

function alanAdi(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

export function rotaYapisiniCikar(metin) {
  const rotalar = [];
  const desen = /slug:\s*'([^']+)'[\s\S]*?ilkTahmin:\s*'([^']+)'[\s\S]*?kapanisSorusu:\s*'([^']+)'[\s\S]*?adimlar:\s*\[([\s\S]*?)\n\s*\],/g;
  for (const eslesme of metin.matchAll(desen)) {
    const adimlar = [...eslesme[4].matchAll(/\{\s*id:\s*'([^']+)',\s*rol:\s*'([^']+)',\s*soru:\s*'([^']+)'\s*\}/g)]
      .map((m) => ({ id: m[1], rol: m[2], soru: m[3] }));
    rotalar.push({ slug: eslesme[1], ilkTahmin: eslesme[2], kapanisSorusu: eslesme[3], adimlar });
  }
  return rotalar;
}

export function makaleKalitesi(makale) {
  const kaynaklar = makale.fm.kaynaklar || [];
  const alanlar = new Set(kaynaklar.map((k) => alanAdi(k.url)).filter(Boolean));
  const girisKapisi = kaynaklar.filter((k) => /(^|\.)wikipedia\.org$/i.test(alanAdi(k.url))).length;
  const birincil = kaynaklar.some((k) => k.tur === 'birincil');
  const kaynakSiniri = Boolean(String(makale.fm.kaynak_siniri || '').trim());
  const dil = kalipSay(makale.govde);
  const dilToplami = Object.values(dil).reduce((a, b) => a + b, 0);
  const hedef = HEDEFLER[makale.fm.tip];
  const kelime = kelimeSay(makale.govde);
  const matris = matrisOku(makale.fm.id);
  const matrisSonucu = matris ? matrisiDogrula(matris, makale) : null;
  const korHakemli = Boolean(matris && String(matris.hakem || '').startsWith('kor-hakem'));

  const olcutler = {
    yayinda: makale.fm.denetim_durumu === 'onaylandi',
    derinlik: !hedef || kelime >= hedef.min,
    kaynak_sayisi: kaynaklar.length >= 5,
    kaynak_cesitliligi: alanlar.size >= 3,
    giris_kapisi: girisKapisi <= 1,
    kanit_siniri: birincil || kaynakSiniri,
    dogal_dil: dilToplami === 0,
    guncel_kor_hakem: Boolean(matrisSonucu?.gecerli && korHakemli),
    izlenebilir_iddia: Boolean(matrisSonucu && (matrisSonucu.kayipCumle || 0) === 0),
  };
  const gecen = Object.values(olcutler).filter(Boolean).length;
  return {
    olcutler,
    puan: Number((10 * gecen / Object.keys(olcutler).length).toFixed(1)),
    kelime,
    hedef: hedef?.min ?? null,
    kaynak: kaynaklar.length,
    alan: alanlar.size,
    girisKapisi,
    birincil,
    kaynakSiniri,
    dil,
    matrisSonucu,
    korHakemli,
  };
}

export function ogrenmeCekirdegiDenetimi(makaleler, { rotaMetni = null } = {}) {
  const r = new Rapor('KAPI 20 — öğrenme çekirdeği (rota + makale kalitesi)');
  const metin = rotaMetni ?? fs.readFileSync(ROTALAR_YOLU, 'utf8');
  const rotalar = rotaYapisiniCikar(metin);
  if (rotalar.length < 10) r.hata('src/lib/rotalar.ts', `en az 10 rota bekleniyordu; ayrıştırılan ${rotalar.length}`);

  const tumIdler = [];
  for (const rota of rotalar) {
    if (rota.ilkTahmin.length < 60) r.hata(rota.slug, 'ilk tahmin sorusu en az 60 karakter olmalı');
    if (rota.kapanisSorusu.length < 80) r.hata(rota.slug, 'kapanış sentezi en az 80 karakter olmalı');
    if (rota.adimlar.length !== 6) r.hata(rota.slug, `rota 6 adımdan oluşmalı; bulunan ${rota.adimlar.length}`);
    if (rota.adimlar[0] && !/^(olay|aktor|dusunur|kaynak)-/.test(rota.adimlar[0].id)) {
      r.hata(rota.slug, 'doğal öğrenme sırası somut bir olay, aktör, düşünür veya kaynakla başlamalı');
    }
    if (rota.adimlar.at(-1) && !rota.adimlar.at(-1).id.startsWith('tartisma-')) {
      r.hata(rota.slug, 'rota rakip açıklamaları tartan bir tartışma makalesiyle bitmeli');
    }
    for (const adim of rota.adimlar) {
      tumIdler.push(adim.id);
      if (adim.soru.length < 55) r.hata(`${rota.slug}/${adim.id}`, 'adım sorusu açıklama kurduracak kadar özgül değil');
    }
  }

  const tekrarlar = [...new Set(tumIdler.filter((id, i) => tumIdler.indexOf(id) !== i))];
  for (const id of tekrarlar) r.hata(id, 'aynı makale birden fazla çekirdek rotada; çekirdek çeşitliliği azalıyor');

  const harita = new Map(makaleler.map((m) => [m.fm.id, m]));
  const ayrinti = [];
  for (const id of tumIdler) {
    const makale = harita.get(id);
    if (!makale) { r.hata(id, 'rota adımı korpusta bulunamadı'); continue; }
    const k = makaleKalitesi(makale);
    ayrinti.push({ id, puan: k.puan, kelime: k.kelime, kaynak: k.kaynak, alan: k.alan });
    const bozuk = Object.entries(k.olcutler).filter(([, gecti]) => !gecti).map(([ad]) => ad);
    if (bozuk.length) {
      const detay = [];
      if (!k.olcutler.yayinda) detay.push(`yayın durumu ${makale.fm.denetim_durumu || 'yok'}`);
      if (!k.olcutler.derinlik) detay.push(`${k.kelime}/${k.hedef} kelime`);
      if (!k.olcutler.kaynak_sayisi) detay.push(`${k.kaynak}/5 kaynak`);
      if (!k.olcutler.kaynak_cesitliligi) detay.push(`${k.alan}/3 alan adı`);
      if (!k.olcutler.giris_kapisi) detay.push(`${k.girisKapisi} Wikipedia künyesi`);
      if (!k.olcutler.kanit_siniri) detay.push('birincil kaynak veya kaynak sınırı yok');
      if (!k.olcutler.dogal_dil) {
        const kaliplar = Object.entries(k.dil).filter(([, n]) => n > 0)
          .map(([ad, n]) => `${KALIPLAR[ad].ad}=${n}`).join(', ');
        detay.push(kaliplar);
      }
      if (!k.olcutler.guncel_kor_hakem) detay.push('güncel kör-hakem matrisi yok');
      if (!k.olcutler.izlenebilir_iddia) detay.push(`${k.matrisSonucu?.kayipCumle ?? '—'} kayan matris cümlesi`);
      r.hata(makale.goreli, `çekirdek kalite ${k.puan}/10; eksik: ${bozuk.join(', ')} (${detay.join('; ')})`);
    }
  }

  const ortalama = ayrinti.length
    ? Number((ayrinti.reduce((a, x) => a + x.puan, 0) / ayrinti.length).toFixed(2)) : 0;
  r.ozetSatirlari = [
    `${rotalar.length} rota · ${tumIdler.length} benzersiz öğrenme adımı`,
    `çekirdek makale puanı ortalaması ${ortalama}/10 · hedef 10/10`,
  ];
  r.olcum = { rota: rotalar.length, adim: tumIdler.length, tekrar: tekrarlar.length, ortalama, ayrinti };
  return r;
}

if (process.argv[1]?.endsWith('linter-ogrenme-cekirdegi.mjs')) {
  linterCli('linter-ogrenme-cekirdegi', ogrenmeCekirdegiDenetimi);
}
