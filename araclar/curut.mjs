#!/usr/bin/env node
// GEÇİŞ 3 — Çürütücü geçişi (§10).
//
// Görev tanımı düşmancadır: onaylamak değil, kırmak. Bu araç §10'da sayılan
// zayıflık tiplerini programatik olarak tarar ve her makale için itiraz
// adaylarını çıkarır. Çıkan adaylar çürütücü oturuma girdi olur; oturum
// itirazı ya doğrular ya reddeder ve gerekçesini yazar.
//
// Programatik tarama modelin yerini almaz — aramayı sistematik yapar.
// "Hiçbiri zayıf değilse bunu gerekçelendir" şartı raporda korunur.
//
//   node araclar/curut.mjs [<id> ...]
import path from 'node:path';
import { KOK, makaleleriTopla, yaz, paragraflar, dipnotlar, RENK } from './ortak.mjs';
import { govdeHash } from './denetle.mjs';

const NEDENSELLIK = /(nedeniyle|yüzünden|sonucunda|sayesinde|yol açtı|neden oldu|sebebiyle|bu yüzden|kaynaklanır|etkisiyle)/i;
const KESINLIK = /\b(kesindir|şüphesiz|kuşkusuz|açıkça gösterir|kanıtlamıştır|tartışmasız|her zaman|hiçbir zaman|tamamen)\b/i;
const USTUNLUK = /\b(ilk|en büyük|en erken|en önemli|en eski|tek|yegâne|biricik)\b/i;
// Yanlis pozitif suzgeci (2026-08-29 hakem olcumu: bir dosyada yedi itirazin
// besi dilsel yanlis pozitifti). "tek" ve "ilk" Turkcede oncelik bildirmeyen
// yaygin kaliplarda gecer: "tek tek" (birer birer), "tek bir X" (a single X),
// "tek catI altinda", "ilk okuma" (ikiden birincisi), "ilk bakista".
// Bunlari itiraz saymak aracin sinyal/gurultu oranini bozar; itiraz listesi
// guvenilmez hale gelirse hakem hepsini birden gormezden gelmeye baslar.
const USTUNLUK_YANLIS_POZITIF = [
  /\btek tek\b/i,
  /\btek ba[sş]ına\b/i,
  /\btek bir\b/i,
  /\btek [çc]atı\b/i,
  /\btek [çc]ocuk\b/i,
  /\btek [uü]lke\b/i,
  /\btek taraf/i,
  /\btek elden\b/i,
  /\btek parti\b/i,
  /\btek nedenl[ie]\b/i,
  /\btek [uü]r[uü]n/i,
  /\btek sayı/i,
  /\btek yönl[uü]/i,
  /\bilk okuma\b/i,
  // Turkce kok cakismalari (2026-08-29 kavram hakemleri): "ilk" ve "tek"
  // sira/nicelik bildiren yaygin kaliplarda gecer ve ustunluk iddiasi
  // DEGILDIR. Bir dosyada uc itirazin ucu de bu yuzden yanlis pozitifti.
  /\bilk\s+(yarı|yari|bölüm|bolum|sınır|sinir|adım|adim|cümle|cumle|paragraf|kısım|kisim|aşama|asama)/i,
  /\bilk\s+(on|yüz|bin|iki|üç|dört|beş|birkaç|\d+)\b/i,
  /\bilk\s+günah\b/i,
  /\btek\s+seferlik\b/i,
  /\btek\s+kişiydi\b/i,
  /\bilkel\b/i,
  /\bilk bak/i,
  /\bilk iki\b/i,
  /\bilk elden\b/i,
  /\bilk [çc]ocuk/i,
  /\bher ilk\b/i,
];
function ustunlukSahteMi(cumle) {
  return USTUNLUK_YANLIS_POZITIF.some((re) => re.test(cumle));
}
const KAPSAM = /\b(dünya(da|nın)?|küresel|evrensel|bütün insanlık|her yerde|tüm toplumlar)\b/i;
const YUMUSATMA = /(muhtemelen|büyük olasılıkla|sanılır|olabilir|görünüyor|iddia edilir|ileri sürül|belirtilir|savunur|göre)/i;

// Kavramın kendi döneminden önce kullanılması — anakronizm sezgisi.
// (terim, ilk kullanımın kabaca başladığı yıl)
const KAVRAM_DOGUMU = [
  ['milliyetçilik', 1780], ['ulus-devlet', 1780], ['kapitalizm', 1750],
  ['sanayi devrimi', 1760], ['ideoloji', 1790], ['sosyalizm', 1820],
  ['demografik geçiş', 1930], ['jeopolitik', 1900], ['küreselleşme', 1960],
  ['emperyalizm', 1870], ['GSYH', 1930], ['bürokrasi', 1750],
];

export function itirazAdaylari(m) {
  const adaylar = [];
  const ekle = (ciddiyet, tip, cumle, sorun, oneri) =>
    adaylar.push({ ciddiyet, tip, cumle: cumle.slice(0, 180).replace(/\s+/g, ' '), sorun, oneri });

  const bitis = m.fm.tarih_bitis ? Number(String(m.fm.tarih_bitis).slice(0, 4)) : null;

  for (const p of paragraflar(m.govde)) {
    const t = p.metin;
    if (/^#{1,6}\s/.test(t.trim()) || /^\|/.test(t.trim())) continue;
    const refs = [...new Set(dipnotlar(t))];

    // 1. Tek kaynağa dayanan nedensellik iddiası
    if (NEDENSELLIK.test(t) && refs.length === 1) {
      ekle('orta', 'tek-kaynakli-nedensellik', t,
        `Nedensellik iddiası tek kaynağa (${refs[0]}) dayanıyor.`,
        'İkinci bağımsız kaynak ekle ya da iddiayı kaynağın söylediğiyle sınırla.');
    }

    // 2. Tartışmalı konuda kesinlik dili
    const kesin = KESINLIK.exec(t);
    if (kesin && !YUMUSATMA.test(t)) {
      ekle(m.fm.guven_geneli === 'tartismali' ? 'yuksek' : 'orta', 'kesinlik-dili', t,
        `Kesinlik ifadesi "${kesin[0]}" atıf çerçevesi olmadan kullanılmış.`,
        'İddiayı kaynağa atfet ("X\'e göre") ya da ifadeyi kaynağın gücüne indir.');
    }

    // 3. Üstünlük/öncelik iddiası
    const ust = USTUNLUK.exec(t);
    if (ust && refs.length > 0 && !YUMUSATMA.test(t) && !ustunlukSahteMi(t)) {
      ekle('dusuk', 'ustunluk-iddiasi', t,
        `"${ust[0]}" türü öncelik/üstünlük iddiası atıf çerçevesi olmadan.`,
        'Kaynağın bu nitelemeyi yapıp yapmadığını doğrula; yapmıyorsa kaldır.');
    }

    // 4. Kapsam çarpıtması: küresel dil, bölgesel makale
    const kapsamTemiz = t
      .replace(/(Birinci|İkinci)\s+Dünya\s+Savaşı\w*/gi, ' ')
      .replace(/dünya\s+savaş\w*/gi, ' ')
      .replace(/(İngilizce|Türkçe|Almanca|Fransızca)\s+dünya\w*/gi, ' ')
      .replace(/evrensel\s+tarih/gi, ' ')
      .replace(/dünya\s+(sistemi|ekonomisi|ticareti|nüfusu|üretimi)/gi, ' ')
      // Kurum adlarindaki "Dunya" kuresel dil degildir. 2026-08-29 hakem
      // olcumu: Dunya Bankasi verisi kullanan her makale sahte
      // "kapsam-carpitmasi" itirazi uretiyordu.
      .replace(/Dünya\s+(Bankası|Sağlık\s+Örgütü|Ticaret\s+Örgütü|Gıda\s+Programı|Ekonomik\s+Forumu|Kupası|Mirası)\w*/gi, ' ')
      .replace(/Dünya\s+Değerler\s+Araştırması/gi, ' ');
    // ATIF CERCEVESI MUAFIYETI (2026-08-29 hakem bulgusu): bir cumle
    // kaynaga acikca atfediliyorsa (YUMUSATMA kaliplari) icindeki
    // "evrensel/kuresel" sozcugu makalenin kendi kapsam iddiasi degil,
    // KAYNAGIN KENDI TERIMIDIR. Ornek: Ekber'in "sulh-i kull" siyaseti
    // icin kaynagin kullandigi "universal peace" ifadesinin cevirisi
    // bolgesel bir makalede sahte kapsam-carpitmasi itirazi uretiyordu.
    if (KAPSAM.test(kapsamTemiz) && !YUMUSATMA.test(t) && Array.isArray(m.fm.bolge)
        && !m.fm.bolge.includes('kuresel') && m.fm.bolge.length <= 2) {
      ekle('orta', 'kapsam-carpitmasi', t,
        `Makale ${m.fm.bolge.join('/')} kapsamlı ama cümle küresel/evrensel dil kullanıyor.`,
        'Kapsamı bölgeye daralt ya da küresel iddia için küresel kaynak göster.');
    }

    // 5. Anakronizm
    if (bitis) {
      for (const [kavram, dogum] of KAVRAM_DOGUMU) {
        if (bitis < dogum && new RegExp(`\\b${kavram}`, 'i').test(t)) {
          ekle('yuksek', 'anakronizm', t,
            `"${kavram}" kavramı yaklaşık ${dogum}'den itibaren kullanılıyor; makale ${bitis}'te bitiyor.`,
            'Kavramı dönemin kendi diliyle değiştir ya da geriye dönük okuma olduğunu açıkça belirt.');
        }
      }
    }
  }

  // 6. Tartışmalı etiketli makalede hakemsizlik kontrolü
  if (m.fm.tip === 'tartisma') {
    const poz = (m.fm.pozisyonlar || []).length;
    if (poz < 3) {
      ekle('orta', 'yetersiz-pozisyon', `${poz} pozisyon`,
        'Tartışma haritasında üçten az pozisyon var; ikili karşıtlık tartışmayı düzleştirebilir.',
        'En az bir rakip okuma daha ekle.');
    }
  }

  // 7. Kaynak yoğunluğu: uzun makale, az kaynak
  const kelime = m.govde.split(/\s+/).filter(Boolean).length;
  const kaynak = (m.fm.kaynaklar || []).length;
  if (kelime / Math.max(1, kaynak) > 700) {
    ekle('orta', 'kaynak-yogunlugu', `${kelime} kelime / ${kaynak} kaynak`,
      `Kaynak başına ${Math.round(kelime / kaynak)} kelime düşüyor; kanıt tabanı metne göre ince.`,
      'Kaynak ekle ya da kaynaksız kalan bölümleri kısalt.');
  }

  return adaylar;
}

function markdownYaz(id, adaylar) {
  const s = [`# Çürütücü raporu — ${id}`, `_${new Date().toISOString()}_`, ''];
  if (adaylar.length === 0) {
    s.push('## Zayıf bulunmayan alanlar', '',
      'Programatik tarama, §10\'da sayılan yedi zayıflık tipinde (tek kaynaklı',
      'nedensellik, atıfsız kesinlik dili, üstünlük iddiası, kapsam çarpıtması,',
      'anakronizm, yetersiz pozisyon, ince kanıt tabanı) itiraz adayı bulamadı.',
      '', 'Bu, makalenin doğru olduğu anlamına gelmez; bu yedi kalıptan hiçbirinin',
      'tetiklenmediği anlamına gelir. Sayısal ve ad düzeyindeki doğrulama Geçiş 2,',
      'bağımsız yeniden türetme Geçiş 4 raporlarındadır.', '');
    return s.join('\n');
  }
  adaylar.forEach((a, i) => {
    s.push(`## İtiraz ${i + 1} — [ciddiyet: ${a.ciddiyet}] ${a.tip}`, '',
      `**Cümle:** "${a.cumle}"`, '', `**Sorun:** ${a.sorun}`, '', `**Öneri:** ${a.oneri}`, '');
  });
  return s.join('\n');
}

if (process.argv[1]?.endsWith('curut.mjs')) {
  const hedefler = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const makaleler = makaleleriTopla().filter((m) => hedefler.length === 0 || hedefler.includes(m.fm.id));
  let toplam = 0;
  for (const m of makaleler) {
    const adaylar = itirazAdaylari(m);
    toplam += adaylar.length;
    yaz(path.join(KOK, 'denetim', 'raporlar', `${m.fm.id}-curutucu.md`), markdownYaz(m.fm.id, adaylar));
    // govde_hash zorunlu: 2026-08-29'da bir hakeme, onarim ONCESINE ait bir
    // curutucu raporu verildi ve itirazlarin yarisi coktan cozulmustu. Rapor
    // hangi govdeye ait oldugunu soylemedigi surece bu sessizce olur.
    yaz(path.join(KOK, 'denetim', 'raporlar', `${m.fm.id}-curutucu.json`),
      JSON.stringify({
        id: m.fm.id, gecis: 3, zaman: new Date().toISOString(),
        govde_hash: govdeHash(m.govde), itirazlar: adaylar,
      }, null, 2));
    const yuksek = adaylar.filter((a) => a.ciddiyet === 'yuksek').length;
    const im = yuksek > 0 ? RENK.kirmizi('YUKSEK') : adaylar.length > 0 ? RENK.sari('ITIRAZ') : RENK.yesil('TEMIZ ');
    console.log(`${im}  ${m.fm.id.padEnd(34)} ${adaylar.length} itiraz${yuksek ? ` (${yuksek} yuksek)` : ''}`);
  }
  console.log(`\ntoplam ${toplam} itiraz adayi`);
}
