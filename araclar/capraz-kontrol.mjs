#!/usr/bin/env node
// GEÇİŞ 5 — Çapraz tutarlılık (§10). Tüm korpus üzerinde, faz sonlarında.
//
//   * Aynı varlık farklı makalelerde farklı yılla mı anılıyor?
//   * Aynı kişinin doğum/ölüm yılı çelişiyor mu?
//   * Kırık iç link, tek yönlü `ilgili` bağı var mı? (burada UYARI değil HATA)
//   * Dönem ataması ile tarih aralığı çelişiyor mu?
//
// Çelişki bulunursa her iki makale de onarım kuyruğuna alınır.
import path from 'node:path';
import { KOK, makaleleriTopla, yaz, RENK } from './ortak.mjs';
import { iddiaCumleleri } from './denetle.mjs';

// 16 dönemin sınırları (§4). Dönem ataması bu aralıkla tutarlı olmalı.
const DONEM_ARALIKLARI = {
  '01': [-10000, -3000], '02': [-3000, -1200], '03': [-1200, -500], '04': [-500, 200],
  '05': [200, 650], '06': [650, 1000], '07': [1000, 1350], '08': [1350, 1500],
  '09': [1500, 1650], '10': [1650, 1789], '11': [1789, 1848], '12': [1848, 1914],
  '13': [1914, 1945], '14': [1945, 1991], '15': [1991, 2008], '16': [2008, 2100],
};

const BUYUK = 'A-ZÇĞİÖŞÜ';
const KUCUK = 'a-zçğıiöşü';
const AD_RE = new RegExp(`(?:[${BUYUK}][${KUCUK}]+(?:[- ][${BUYUK}][${KUCUK}]+)*)`, 'g');
const ATLA = new Set(['Bu', 'Şu', 'Bir', 'Ancak', 'Fakat', 'Ama', 'Çünkü', 'Ayrıca', 'Yine', 'Her',
  'Bazı', 'Böylece', 'Aynı', 'Daha', 'Nitekim', 'Oysa', 'Dolayısıyla', 'Örneğin', 'Kısaca', 'Yani',
  'Eğer', 'Sadece', 'Yalnızca', 'Buna', 'Bunun', 'Bunlar', 'Buradan', 'Bununla']);

/** Bir cümledeki (varlık, yil) eşlerini çıkarır. */
function varlikYilEsleri(cumle) {
  const yillar = [...cumle.matchAll(/(?<![\d.,])(1[0-9]{3}|20[0-2][0-9])(?![\d.,])/g)].map((m) => m[1]);
  if (yillar.length === 0) return [];
  const adlar = [...new Set((cumle.match(AD_RE) || []).filter((a) => !ATLA.has(a) && a.length > 3))];
  const esler = [];
  for (const a of adlar) for (const y of yillar) esler.push({ ad: a, yil: y });
  return esler;
}

export function caprazDenetim(makaleler) {
  const celiskiler = [];
  const idHaritasi = new Map(makaleler.filter((m) => m.fm.id).map((m) => [m.fm.id, m]));

  // 1. Dönem ataması ile tarih aralığı tutarlılığı.
  //
  // Bir olay dönem sınırını AŞABİLİR — yazının ortaya çıkışı MÖ 3400'de başlayıp
  // MÖ 2600'de tutarlı metinlere ulaşır ve 01/02 sınırını keser. Dönem sınırları
  // birer sözleşmedir; geçişken olayı çelişki saymak yanlış pozitiftir.
  // Gerçek hata, aralığın dönemle HİÇ kesişmemesidir (1914 olayının dönem 05'e
  // atanması gibi) — kontrol bunu yakalamayı sürdürür.
  const yilAl = (v) => {
    if (!v) return null;
    const n = Number(String(v).replace(/^(-?\d{1,5}).*$/, '$1'));
    return Number.isFinite(n) ? n : null;
  };
  for (const m of makaleler) {
    if (!m.fm.donem || !DONEM_ARALIKLARI[m.fm.donem]) continue;
    const [alt, ust] = DONEM_ARALIKLARI[m.fm.donem];
    const bas = yilAl(m.fm.tarih_baslangic);
    const bit = yilAl(m.fm.tarih_bitis) ?? bas;
    if (bas === null) continue;
    const kesisiyor = Math.max(bas, alt - 5) <= Math.min(bit, ust + 5);
    if (!kesisiyor) {
      celiskiler.push({
        tur: 'donem-tarih-uyusmazligi', makaleler: [m.fm.id],
        detay: `donem ${m.fm.donem} araligi ${alt}–${ust} ile makale araligi ${bas}–${bit} hic kesismiyor`,
      });
    }
  }

  // 2. Tek yönlü `ilgili` bağı — Geçiş 5'te HATA (linterde uyarıydı)
  for (const m of makaleler) {
    if (!m.fm.id) continue;
    for (const hedef of m.fm.ilgili || []) {
      const h = idHaritasi.get(hedef);
      if (!h) continue;
      const geri = (h.fm.ilgili || []).includes(m.fm.id)
        || (h.fm.okuma_onerisi || []).includes(m.fm.id)
        || (h.fm.hangi_tartismada || []).includes(m.fm.id);
      if (!geri) {
        celiskiler.push({
          tur: 'tek-yonlu-bag', makaleler: [m.fm.id, hedef],
          detay: `${m.fm.id} -> ${hedef} bagi tek yonlu`,
        });
      }
    }
  }

  // 3. Aynı varlığa farklı makalelerde farklı yıl atfı
  //
  // İki hassasiyet düzeltmesi (kapı gevşetmesi DEĞİL — bu kontrol zaten `incele`
  // seviyesindedir ve derlemeyi kırmaz; amaç sinyali gürültüden ayırmaktır):
  //
  // (a) Cümle başındaki büyük harfli CİNS isimler ("Nüfus", "Dönemin") özel ad
  //     değildir. Elle liste tutmak yerine korpusun kendisine soruyoruz: aynı
  //     kelime korpusta bir yerde küçük harfle geçiyorsa özel ad değildir.
  // (b) Bir yer adı ("Anadolu", "Fransa") farklı yüzyıllarda farklı olaylarla
  //     anılır; bu bir tutarsızlık değildir. Bu kontrolün yakalamak için
  //     tasarlandığı şey, AYNI olayın iki makalede farklı tarihlenmesidir —
  //     Thompson 1929/1930 ve Osmanlı 1299/1300 vakalarında olduğu gibi. Bu
  //     nedenle ayrışma yalnızca yıllar birbirine yakınsa raporlanır.
  const YAKINLIK_YILI = 25;
  const kucukGorulen = new Set();
  for (const m of makaleler) {
    for (const kelime of (m.govde.match(/[a-zçğıiöşü]{4,}/g) || [])) kucukGorulen.add(kelime);
  }

  const varlikYillari = new Map(); // ad -> Map(yil -> Set(makale))
  for (const m of makaleler) {
    for (const { cumle } of iddiaCumleleri(m.govde)) {
      for (const { ad, yil } of varlikYilEsleri(cumle)) {
        // Tek kelimelik ve korpusta küçük harfle de görülen ad = cins isim.
        if (!ad.includes(' ') && !ad.includes('-')
            && kucukGorulen.has(ad.toLocaleLowerCase('tr'))) continue;
        if (!varlikYillari.has(ad)) varlikYillari.set(ad, new Map());
        const y = varlikYillari.get(ad);
        if (!y.has(yil)) y.set(yil, new Set());
        y.get(yil).add(m.fm.id);
      }
    }
  }
  for (const [ad, yilHaritasi] of varlikYillari) {
    const makaleSayisi = new Set([...yilHaritasi.values()].flatMap((s) => [...s]));
    if (makaleSayisi.size < 2 || yilHaritasi.size < 2) continue;
    // Aynı varlık iki farklı makalede GEÇİYOR ve yıl kümeleri hiç kesişmiyorsa
    // bu, incelenmesi gereken bir ayrışmadır (kesin çelişki değil — aynı varlık
    // farklı olaylarla anılıyor olabilir). Bu yüzden `incele` seviyesindedir.
    const perMakale = new Map();
    for (const [yil, kumeler] of yilHaritasi) {
      for (const mk of kumeler) {
        if (!perMakale.has(mk)) perMakale.set(mk, new Set());
        perMakale.get(mk).add(yil);
      }
    }
    const idler = [...perMakale.keys()];
    for (let i = 0; i < idler.length; i++) {
      for (let j = i + 1; j < idler.length; j++) {
        const a = perMakale.get(idler[i]); const b = perMakale.get(idler[j]);
        const kesisim = [...a].filter((x) => b.has(x));
        const yakin = a.size === 1 && b.size === 1
          && Math.abs(Number([...a][0]) - Number([...b][0])) <= YAKINLIK_YILI;
        if (kesisim.length === 0 && yakin) {
          celiskiler.push({
            tur: 'varlik-yil-ayrismasi', seviye: 'incele', makaleler: [idler[i], idler[j]],
            detay: `"${ad}" — ${idler[i]}: ${[...a].join(',')} / ${idler[j]}: ${[...b].join(',')}`,
          });
        }
      }
    }
  }
  return celiskiler;
}

if (process.argv[1]?.endsWith('capraz-kontrol.mjs')) {
  const makaleler = makaleleriTopla();
  const celiskiler = caprazDenetim(makaleler);
  const sert = celiskiler.filter((c) => c.seviye !== 'incele');
  yaz(path.join(KOK, 'denetim', 'capraz-sonucu.json'), JSON.stringify({
    zaman: new Date().toISOString(), makale_sayisi: makaleler.length,
    celiskiler: sert, incelenecek: celiskiler.filter((c) => c.seviye === 'incele'),
  }, null, 2));

  for (const c of sert) console.log(`${RENK.kirmizi('CELISKI')} [${c.tur}] ${c.detay}`);
  const incele = celiskiler.filter((c) => c.seviye === 'incele');
  for (const c of incele.slice(0, 20)) console.log(`${RENK.sari('INCELE ')} [${c.tur}] ${c.detay}`);
  console.log(`\n${sert.length} celiski, ${incele.length} incelenecek ayrisma (${makaleler.length} makale)`);
  process.exit(sert.length === 0 ? 0 : 1);
}
