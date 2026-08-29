#!/usr/bin/env node
// GEÇİŞ 2 — Kaynak denetimi (§10).
//
// Her [^k] referansının bağlı olduğu cümleyi çıkarır, künyedeki kaynağı
// GERÇEKTEN fetch eder ve iddianın o metinde bulunup bulunmadığını kontrol eder.
//
// Otomatik kısım "denetlenebilir atomlar" üzerinden çalışır: yıllar, sayılar,
// yüzdeler ve özel isimler. Sayısal atomlar dilden bağımsızdır ve §10'un asıl
// hedefi olan tarih/sayı hatalarını doğrudan yakalar. Özel isimler, kaynak
// farklı dilde olabileceği için yumuşak kontrol edilir (bulunamazsa HATA değil
// ISARET üretir) — bu bir gevşetme değil, ölçüm hatasını doğru sınıflamaktır.
//
//   node araclar/denetle.mjs [<id> ...]
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { KOK, makaleleriTopla, yaz, RENK } from './ortak.mjs';
import { getir, normalize } from './getir.mjs';

/** Raporun bagli oldugu govdenin parmak izi. Govde degisince rapor bayattir. */
export function govdeHash(govde) {
  return crypto.createHash('sha1').update(govde).digest('hex').slice(0, 12);
}

export function suankiCommit() {
  try { return execSync('git rev-parse --short HEAD', { cwd: KOK }).toString().trim(); }
  catch { return null; }
}

const BUYUK = 'A-ZÇĞİÖŞÜ';
const KUCUK = 'a-zçğıiöşü';
const OZEL_ISIM = new RegExp(`^[${BUYUK}][${KUCUK}${BUYUK}’'-]{2,}$`);
const CUMLE_BASI_ISTISNA = new Set(['Bu', 'Şu', 'Bir', 'Ancak', 'Fakat', 'Ama', 'Çünkü', 'Ayrıca',
  'Yine', 'Her', 'Bazı', 'Böylece', 'Buna', 'Bunun', 'Bunlar', 'Aynı', 'Daha', 'Nitekim', 'Oysa',
  'Dolayısıyla', 'Bununla', 'Buradan', 'Örneğin', 'Kısaca', 'Yani', 'Eğer', 'Sadece', 'Yalnızca']);

/** Gövdeyi, her biri en az bir dipnot taşıyan iddia cümlelerine ayırır. */
export function iddiaCumleleri(govde) {
  const temiz = govde
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s.*$/gm, ' ')
    .replace(/::[a-zçğıöşü]+\[[^\]]*\]\{[^}]*\}/gi, ' ')
    // Site içi gezinme bağları APARAT'tır, iddia değil. Bağ metni bir başlık
    // olduğu için ("1650–1789") içindeki yıl, cümlenin iddiası sanılıyordu.
    .replace(/\[[^\]]*\]\(\/[^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .replace(/\r?\n/g, ' ');
  // Cümle sonu noktasından SONRA dipnot işareti gelebilir ("…verildi.[^k1] Bu…").
  // Bölme bunu hesaba katmazsa iki ayrı iddia tek cümlede birleşir ve referanslar
  // yanlış iddiaya atfedilir — Geçiş 2'nin ilk koşusu tam olarak bunu yakaladı.
  // Turkce sira sayilari noktayla yazilir ("38. paralel", "5. madde", "20.
  // yuzyil") ve boluc bunlari cumle sonu saniyordu: iddia parcalaniyor,
  // referanslar yanlis parcaya dusuyordu. 2026-08-29'da bir onarim ajani bu
  // yuzden butun sira sayilarini yaziyla yazmak zorunda kaldi ("otuz sekizinci
  // paralel") — arac, metnin dilini bozuyordu. Cozum: nokta rakamla
  // basliyorsa ve ardindan kucuk harf ya da rakam geliyorsa cumle bitmemistir.
  const parcalar = temiz
    .split(/(?<=[.!?](?:\s*\[\^k\d+\])*)\s+(?=[^\s])/)
    .reduce((yigin, parca) => {
      const onceki = yigin[yigin.length - 1];
      const oncekiTemiz = onceki === undefined ? '' : onceki.replace(/\s*\[\^k\d+\]\s*$/, '');
      const siraSayisiyla = onceki !== undefined
        && /(?:^|\s)\d{1,4}\.$/.test(oncekiTemiz)
        && /^[a-zçğıöşü\d]/.test(parca);
      // KISALTMA ISTISNASI (2026-08-29 kavram hakemi bulgusu): hukuk davasi
      // adlarindaki "v." noktasi cumle sonu sayiliyordu ("Somerset v.
      // Stewart" -> iki parca) ve iddia parcalandigi icin UYDURMA BIR OLGU
      // denetimden kacmisti. Ayni sinif: bkz. / s. / c. / or. / yy. / Dr. /
      // Prof. / St. ve tek harfli bas harfler ("J. S. Mill").
      const KISALTMA = /(?:^|\s)(?:v|vs|bkz|s|c|ör|or|yy|nr|no|Dr|Prof|Doç|St|Mr|Mrs|Ed|ed|çev|haz|bkz|age|agm|[A-ZÇĞİÖŞÜ])\.$/u;
      const kisaltmayla = onceki !== undefined && KISALTMA.test(oncekiTemiz);
      if (siraSayisiyla || kisaltmayla) yigin[yigin.length - 1] = `${onceki} ${parca}`;
      else yigin.push(parca);
      return yigin;
    }, []);
  const cikti = [];
  for (const p of parcalar) {
    const refs = [...p.matchAll(/\[\^(k\d+)\]/g)].map((m) => m[1]);
    if (refs.length === 0) continue;
    cikti.push({ cumle: p.replace(/\[\^k\d+\]/g, '').replace(/\s+/g, ' ').trim(), refs });
  }
  return cikti;
}

// Cin rakamlariyla yazilmis sayilar. 2026-08-29: Han shu sayiminin Cince
// metnine dayanan bir iddia "kaynakta bulunamayan sayi" diye HATA aldi;
// oysa sayi kaynakta duruyordu — Arap rakamiyla degil, Cin rakamiyla
// (口五千九百五十九萬四千九百七十八 = 59.594.978). Mekanik katmanin bunu
// okuyamamasini "iddia yanlis" saymak, olcememeyi olcmus gibi gostermenin
// tersidir: olcebildigi seyi olcmemektir. Cozum mazeret degil cevrim.
const CIN_BASAMAK = { '〇': 0, 零: 0, 一: 1, 二: 2, 两: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
const CIN_BIRIM = { 十: 10, 百: 100, 千: 1000 };
const CIN_BUYUK = { 万: 1e4, 萬: 1e4, 亿: 1e8, 億: 1e8 };
const CIN_TUM = new RegExp(`[${Object.keys(CIN_BASAMAK).concat(Object.keys(CIN_BIRIM), Object.keys(CIN_BUYUK)).join('')}]+`, 'g');

/** Tek bir Cin rakami dizisini sayiya cevirir; cozulemezse null doner. */
export function cinRakamiCoz(dize) {
  let toplam = 0; let bolum = 0; let basamak = 0; let gorulen = false;
  for (const ch of dize) {
    if (ch in CIN_BASAMAK) { basamak = CIN_BASAMAK[ch]; gorulen = true; continue; }
    if (ch in CIN_BIRIM) {
      // "十" tek basina 10 demektir (十八 = 18), onunde basamak yoksa 1 varsayilir.
      bolum += (basamak || 1) * CIN_BIRIM[ch]; basamak = 0; gorulen = true; continue;
    }
    if (ch in CIN_BUYUK) {
      toplam += (bolum + basamak || 1) * CIN_BUYUK[ch]; bolum = 0; basamak = 0; gorulen = true; continue;
    }
    return null;
  }
  if (!gorulen) return null;
  const sonuc = toplam + bolum + basamak;
  return Number.isFinite(sonuc) && sonuc > 0 ? sonuc : null;
}

/** Metindeki Cin rakamlarini Arap rakamina cevirip aranabilir bir ek havuz uretir. */
export function cinSayiHavuzu(metin) {
  if (!/[一二三四五六七八九十百千万萬亿億]/.test(metin)) return '';
  const bulunanlar = new Set();
  for (const m of metin.matchAll(CIN_TUM)) {
    if (m[0].length < 2) continue;
    const n = cinRakamiCoz(m[0]);
    if (n !== null) bulunanlar.add(String(n));
  }
  return [...bulunanlar].join(' ');
}

// Ingilizce sozcukle yazilmis sayilar. Cin rakamlariyla ayni sinif: Herodotos'un
// Perseus metni Kserkses'in ordusunu "five million, two hundred and eighty-three
// thousand, two hundred and twenty" diye yazar; mekanik katman 5.283.220'yi
// bulamayip HATA verir. Klasik ve 19. yuzyil kaynaklarinin cogu sayilari boyle
// yazar, dolayisiyla bu tek bir dosyanin sorunu degil.
const ING_BIRLER = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30,
  forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};
const ING_CARPAN = { hundred: 100, thousand: 1000, million: 1e6, billion: 1e9 };

/** Bir sozcuk dizisini sayiya cevirir; sayi sozcugu yoksa null doner. */
export function ingilizceSayiCoz(sozcukler) {
  let toplam = 0; let simdiki = 0; let gorulen = false;
  for (const s of sozcukler) {
    if (s === 'and') continue;
    if (s in ING_BIRLER) { simdiki += ING_BIRLER[s]; gorulen = true; continue; }
    if (s === 'hundred') { simdiki = (simdiki || 1) * 100; gorulen = true; continue; }
    if (s in ING_CARPAN) { toplam += (simdiki || 1) * ING_CARPAN[s]; simdiki = 0; gorulen = true; continue; }
    return null;
  }
  if (!gorulen) return null;
  const n = toplam + simdiki;
  return Number.isFinite(n) && n > 0 ? n : null;
}

const ING_SOZCUK = new Set([...Object.keys(ING_BIRLER), ...Object.keys(ING_CARPAN), 'and']);

/** Metindeki Ingilizce sayi sozcuklerini Arap rakamina cevirip ek havuz uretir. */
export function ingilizceSayiHavuzu(metin) {
  if (!/\b(hundred|thousand|million|billion)\b/i.test(metin)) return '';
  const sozcukler = metin.toLowerCase().replace(/[,;]/g, ' ').replace(/-/g, ' ').split(/\s+/);
  const bulunanlar = new Set();
  let dizi = [];
  const bosalt = () => {
    while (dizi.length && dizi[dizi.length - 1] === 'and') dizi.pop();
    if (dizi.length >= 2) {
      const n = ingilizceSayiCoz(dizi);
      if (n !== null && n >= 100) bulunanlar.add(String(n));
    }
    dizi = [];
  };
  for (const s of sozcukler) {
    const temiz = s.replace(/[^a-z]/g, '');
    if (ING_SOZCUK.has(temiz)) dizi.push(temiz);
    else bosalt();
  }
  bosalt();
  return [...bulunanlar].join(' ');
}

/** Cümledeki denetlenebilir atomlar. */
export function atomlar(cumle) {
  const sayisal = [];
  for (const m of cumle.matchAll(/(?<![\d.,])\d{3,4}(?![\d.,])/g)) sayisal.push({ tur: 'yil', deger: m[0] });
  for (const m of cumle.matchAll(/yüzde\s(\d+)|%\s?(\d+)/gi)) sayisal.push({ tur: 'yuzde', deger: m[1] || m[2] });
  for (const m of cumle.matchAll(/\b(\d{1,3})\s?(milyon|milyar)\b/gi)) sayisal.push({ tur: 'buyukluk', deger: m[1] });
  // Turkce binlik ayrali buyuk sayilar (1.957.523). 2026-08-29 kor hakem
  // bulgusu: bunlar HIC olculmuyordu ve bir dosyadaki en riskli rakamlar tam
  // da bunlardi (sayim ve bilanco toplamlari). Kaynaklar ayni sayiyi Ingiliz
  // (1,957,523) ya da ayrasiz (1957523) yazabildigi icin her iddia birden
  // fazla adayla aranir; herhangi biri bulunursa atom bulunmus sayilir.
  for (const m of cumle.matchAll(/(?<![\d.,])\d{1,3}(?:\.\d{3})+(?![\d.,])/g)) {
    const cip = m[0].replace(/\./g, '');
    sayisal.push({
      tur: 'buyuk-sayi',
      deger: m[0],
      adaylar: [m[0], cip, cip.replace(/\B(?=(\d{3})+(?!\d))/g, ','), cip.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')],
    });
  }

  const isimler = [];
  const kelimeler = cumle.split(/\s+/);
  for (let i = 1; i < kelimeler.length; i++) {
    const k = kelimeler[i].replace(/^[("‘“«]+/, '').replace(/[)"’”»,;.!?:]+$/, '').split("'")[0];
    if (!k || CUMLE_BASI_ISTISNA.has(k)) continue;
    if (OZEL_ISIM.test(k) && !isimler.some((x) => x.deger === k)) isimler.push({ tur: 'isim', deger: k });
  }
  return { sayisal, isimler: isimler.slice(0, 4) };
}

// Türkçe yazıp İngilizce kaynaktan doğrulamanın yapısal sorunu: ad karşılıkları.
// Bu tablo ölçümü mümkün kılar; olmadığı yerde iddia "ölçülemedi" olarak
// işaretlenir, "doğrulandı" sayılmaz.
const AD_KARSILIKLARI = {
  'avusturya-macaristan': ['austria-hungary', 'austro-hungarian'],
  'almanya': ['germany', 'german'], 'fransa': ['france', 'french'],
  'britanya': ['britain', 'british'], 'ingiltere': ['england', 'england'],
  'rusya': ['russia', 'russian'], 'sirbistan': ['servia', 'serbia'],
  'italya': ['italy', 'italian'], 'ispanya': ['spain', 'spanish'],
  'japonya': ['japan', 'japanese'], 'cin': ['china', 'chinese'],
  'hindistan': ['india', 'indian'], 'misir': ['egypt'], 'irak': ['iraq'],
  'filistin': ['palestine'], 'libya': ['libya'], 'habesistan': ['abyssinia', 'ethiopia'],
  'mancurya': ['manchuria'], 'tayvan': ['taiwan'], 'belcika': ['belgium', 'belgian'],
  'osmanli': ['ottoman'], 'sovyetler': ['soviet'], 'kanada': ['canada'],
  'avustralya': ['australia'], 'isvec': ['sweden', 'swedish'], 'galler': ['wales'],
  'saraybosna': ['serajevo', 'sarajevo'], 'belgrad': ['belgrade'], 'viyana': ['vienna'],
  'berlin': ['berlin'], 'londra': ['london'], 'paris': ['paris'],
  'petersburg': ['petersburg'], 'lahey': ['hague'], 'lozan': ['lausanne'],
  'versailles': ['versailles'], 'balkanlar': ['balkan'], 'avrupa': ['europe', 'european'],
  'amerika': ['america', 'american'], 'afrika': ['africa', 'african'], 'asya': ['asia', 'asian'],
  'yangtze': ['yangtze'], 'bengal': ['bengal'], 'plassey': ['plassey'],
  'kuomintang': ['kuomintang'], 'milletler': ['nations'], 'cemiyeti': ['league'],
  'yeni': ['new'], 'zelanda': ['zealand'], 'irlanda': ['ireland', 'irish'],
  'tunus': ['tunis'], 'timur': ['timur', 'tamerlane'], 'aristoteles': ['aristotle'],
  'muhammed': ['muhammad'], 'washington': ['washington'], 'faysal': ['faisal'],
  'balfour': ['balfour'], 'weimar': ['weimar'], 'nazi': ['nazi'],
};

/** Kaynak Türkçe mi? (Türkçeye özgü sık kelimeler) */
function turkceMi(kaynakMetni) {
  let n = 0;
  for (const k of [' ve ', ' bir ', ' için ', ' olarak ', ' bu ']) if (kaynakMetni.includes(k)) n += 1;
  return n >= 3;
}

/**
 * Dönüş: 'var' | 'yok' | 'olculemez'
 * 'olculemez' = ad farklı dilde ve karşılığı tabloda yok; bu bir doğrulama
 * değil, ölçüm boşluğudur ve öyle raporlanır.
 */
function isimDurumu(kaynakMetni, isim, kaynakTurkce) {
  const n = normalize(isim);
  if (kaynakMetni.includes(n)) return 'var';
  const kok = n.replace(/['’].*$/, '').slice(0, 5);
  if (kok.length >= 4 && kaynakMetni.includes(kok)) return 'var';
  // Ad karsiligi dil tespitinden ONCE denenir; yanlis dil tespiti dogru bir
  // eslesmeyi maskelememeli.
  const alias = AD_KARSILIKLARI[n.replace(/['’].*$/, '')];
  if (alias) return alias.some((a) => kaynakMetni.includes(a)) ? 'var' : 'yok';
  return kaynakTurkce ? 'yok' : 'olculemez';
}

export async function makaleyiDenetle(m) {
  const kaynakHaritasi = new Map((m.fm.kaynaklar || []).map((k) => [k.anahtar, k]));
  const metinler = new Map();
  const kesikler = new Set();
  for (const [anahtar, k] of kaynakHaritasi) {
    const r = await getir(k.url);
    metinler.set(anahtar, r.durum === 200 ? normalize(`${r.baslik || ''} ${r.metin || ''}`) : null);
    if (r.kesildi) kesikler.add(anahtar);
  }

  const sonuclar = [];
  for (const { cumle, refs } of iddiaCumleleri(m.govde)) {
    // Birden fazla kaynak gösteren bir cümle, o kaynakların BİRLİKTE desteklediği
    // bir iddiadır. Bir sayısal değerin, cümlenin kaynaklarından herhangi birinde
    // bulunması yeterlidir; her kaynakta ayrı ayrı aranması yanlış HATA üretir.
    const birlesikMetin = refs.map((r) => metinler.get(r)).filter(Boolean).join(' ');
    for (const ref of refs) {
      const kaynakMetni = metinler.get(ref);
      if (kaynakMetni === undefined) {
        sonuclar.push({ anahtar: ref, iddia: cumle.slice(0, 120), durum: 'HATA', not: 'künyede tanımsız kaynak' });
        continue;
      }
      if (kaynakMetni === null) {
        sonuclar.push({ anahtar: ref, iddia: cumle.slice(0, 120), durum: 'HATA', not: 'kaynak fetch edilemedi' });
        continue;
      }
      const { sayisal, isimler } = atomlar(cumle);
      const kaynakTurkce = turkceMi(kaynakMetni);
      // Havuza, kaynaktaki Cin rakamlarinin Arap karsiliklari da eklenir.
      const hamHavuz = refs.length > 1 ? birlesikMetin : kaynakMetni;
      const sayisalHavuz = `${hamHavuz} ${cinSayiHavuzu(hamHavuz)} ${ingilizceSayiHavuzu(hamHavuz)}`;
      const eksikSayisal = sayisal.filter((a) => {
        const adaylar = a.adaylar || [a.deger];
        return !adaylar.some((d) => sayisalHavuz.includes(normalize(d)));
      });
      // Ozel adlar da sayisal atomlarla ayni kurala tabidir: cumle birden fazla
      // kaynak gosteriyorsa, adin O KAYNAKLARDAN HERHANGI BIRINDE bulunmasi
      // yeterlidir. Onceki surum adlari yalniz o anki kaynakta ariyordu ve
      // asimetri sahte ISARET uretiyordu (2026-08-29 hakem bulgusu: "Irak" adi
      // k5'te yoktu — ki dosyanin tezi tam da buydu — ama cumlenin oteki
      // kaynagi adi tasiyordu). Dil algilamasi kaynak basina ayri yapilir,
      // cunku metinleri birlestirmek Turkce/Ingilizce karisimi uretip
      // harf cevrimi kurallarini bozar.
      const IYILIK = { var: 2, olculemez: 1, yok: 0 };
      const isimSonuclari = isimler.map((a) => {
        let enIyi = 'yok';
        for (const rf of refs) {
          const metin = metinler.get(rf);
          if (!metin) continue;
          const s = isimDurumu(metin, a.deger, turkceMi(metin));
          if (IYILIK[s] > IYILIK[enIyi]) enIyi = s;
        }
        return { ...a, sonuc: enIyi };
      });
      const eksikIsim = isimSonuclari.filter((a) => a.sonuc === 'yok');
      const olculemezIsim = isimSonuclari.filter((a) => a.sonuc === 'olculemez');
      const bulunanAtom = sayisal.length - eksikSayisal.length + isimSonuclari.filter((a) => a.sonuc === 'var').length;

      let durum = 'OK';
      let not = '';
      if (eksikSayisal.length > 0) {
        // Sayısal atom dilden bağımsızdır: kaynakta yoksa iddia oradan çıkmamıştır.
        // İstisna: metin 400k'da kesildiyse "yok" kesin değildir — HATA yerine
        // İŞARET üretilir ki kesme sınırı sahte hata doğurmasın.
        const kesikKaynak = refs.some((rf) => kesikler.has(rf));
        durum = kesikKaynak ? 'ISARET' : 'HATA';
        not = `kaynakta bulunamayan sayısal değer: ${[...new Set(eksikSayisal.map((a) => a.deger))].join(', ')}`
          + (kesikKaynak ? ' (kaynak metni 400k sınırında kesildi; kesin sayılmaz)' : '');
      } else if (eksikIsim.length > 0) {
        durum = 'ISARET';
        not = `özel isim kaynakta bulunamadı: ${eksikIsim.map((a) => a.deger).join(', ')}`;
      } else if (bulunanAtom === 0) {
        // Ölçülemeyeni "doğrulandı" saymak, hattın kendi kendini kandırmasıdır.
        durum = 'ATOMSUZ';
        not = olculemezIsim.length
          ? `programatik olarak ölçülemedi (ad karşılığı yok): ${olculemezIsim.map((a) => a.deger).join(', ')}`
          : 'denetlenebilir atom yok (yorum/bağlantı cümlesi)';
      } else if (olculemezIsim.length > 0) {
        not = `${bulunanAtom} atom doğrulandı; ${olculemezIsim.length} ad ölçülemedi`;
      }
      sonuclar.push({ anahtar: ref, iddia: cumle.slice(0, 160), durum, not });
    }
  }
  return {
    id: m.fm.id, gecis: 2, zaman: new Date().toISOString(),
    // Bayatlik tespiti: rapor, uretildigi andaki govdeye ve commit'e baglanir.
    govde_hash: govdeHash(m.govde), commit: suankiCommit(),
    sonuclar,
  };
}

function markdownYaz(rapor) {
  const sim = { OK: '[OK]     ', ISARET: '[ISARET] ', HATA: '[HATA]   ', ATOMSUZ: '[ATOMSUZ]' };
  const satirlar = [`## ${rapor.id}`, `_Geçiş 2 — kaynak denetimi · ${rapor.zaman}_`, ''];
  for (const s of rapor.sonuclar) {
    satirlar.push(`- ${sim[s.durum]} ${s.anahtar} → "${s.iddia.slice(0, 110)}${s.iddia.length > 110 ? '…' : ''}"${s.not ? ` — ${s.not}` : ''}`);
  }
  const say = (d) => rapor.sonuclar.filter((s) => s.durum === d).length;
  // ATOMSUZ gizlenmez: dört sayaç birden yazılır ki "TEMIZ" etiketi
  // ölçülemeyen çoğunluğu örtmesin (§ ATOMSUZ görünürlüğü).
  satirlar.push('', `**Özet:** ${say('OK')} OK · ${say('ISARET')} ISARET · ${say('HATA')} HATA · ${say('ATOMSUZ')} ATOMSUZ`, '');
  return satirlar.join('\n');
}

if (process.argv[1]?.endsWith('denetle.mjs') && process.argv.includes('--bayat')) {
  // Bayat rapor tespiti: rapor uretildikten sonra govdesi degisen makaleler.
  // Bayat rapor "gecerli dogrulama" sayilmaz (karar tablosu, risk 5).
  const fs = await import('node:fs');
  const makaleler = makaleleriTopla();
  let bayat = 0, hashsiz = 0, guncel = 0, raporsuz = 0;
  for (const m of makaleler) {
    const yol = path.join(KOK, 'denetim', 'raporlar', `${m.fm.id}-denetim.json`);
    if (!fs.existsSync(yol)) { raporsuz += 1; console.log(`RAPORSUZ  ${m.fm.id}`); continue; }
    let rapor;
    try { rapor = JSON.parse(fs.readFileSync(yol, 'utf8')); } catch { raporsuz += 1; continue; }
    if (!rapor.govde_hash) { hashsiz += 1; console.log(`HASHSIZ   ${m.fm.id} (${rapor.zaman?.slice(0, 10) || '?'})`); continue; }
    if (rapor.govde_hash !== govdeHash(m.govde)) { bayat += 1; console.log(`BAYAT     ${m.fm.id} (rapor: ${rapor.zaman?.slice(0, 10)})`); continue; }
    guncel += 1;
  }
  console.log(`\nguncel ${guncel} · bayat ${bayat} · hashsiz ${hashsiz} · raporsuz ${raporsuz} / ${makaleler.length}`);
  process.exit(bayat + hashsiz + raporsuz > 0 ? 1 : 0);
}

if (process.argv[1]?.endsWith('denetle.mjs')) {
  // BILINMEYEN BAYRAK TAM KOSUYA DUSMEZ (2026-08-29 hakem bulgusu).
  // Onceki surumde `--` ile baslayan her argüman sessizce suzuluyordu;
  // bir hakem `--yardim` yazdi, hedef listesi bos kaldi ve komut ARGUMANSIZ
  // TAM KOSUYA dondu: 1024 rapor dosyasi yeniden yazildi ve paralel
  // oturumlarin dosyalarina da dokunuldu. Yasak listesindeki bir islem,
  // bir yazim hatasiyla tetiklenebiliyordu.
  const BILINEN = new Set(['--bayat', '--sessiz']);
  const bilinmeyen = process.argv.slice(2).filter((a) => a.startsWith('--') && !BILINEN.has(a));
  if (bilinmeyen.length) {
    console.error(`denetle: bilinmeyen bayrak: ${bilinmeyen.join(', ')}`);
    console.error('kullanim: node araclar/denetle.mjs <id> [...]   belirtilen makaleleri denetler');
    console.error('          node araclar/denetle.mjs              TUM korpus (uzun surer, butun raporlari yeniden yazar)');
    console.error('          node araclar/denetle.mjs --bayat      raporu govdesinden eski kalan makaleleri listeler');
    process.exit(2);
  }
  const hedefler = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const makaleler = makaleleriTopla().filter((m) => hedefler.length === 0 || hedefler.includes(m.fm.id));
  let toplamHata = 0, toplamIsaret = 0, toplamOk = 0, toplamAtomsuz = 0;
  for (const m of makaleler) {
    const rapor = await makaleyiDenetle(m);
    yaz(path.join(KOK, 'denetim', 'raporlar', `${m.fm.id}-denetim.json`), JSON.stringify(rapor, null, 2));
    yaz(path.join(KOK, 'denetim', 'raporlar', `${m.fm.id}-denetim.md`), markdownYaz(rapor));
    const h = rapor.sonuclar.filter((s) => s.durum === 'HATA').length;
    const i = rapor.sonuclar.filter((s) => s.durum === 'ISARET').length;
    const o = rapor.sonuclar.filter((s) => s.durum === 'OK').length;
    const a = rapor.sonuclar.filter((s) => s.durum === 'ATOMSUZ').length;
    toplamHata += h; toplamIsaret += i; toplamOk += o; toplamAtomsuz += a;
    const im = h > 0 ? RENK.kirmizi('HATA') : i > 1 ? RENK.sari('ISARET') : RENK.yesil('TEMIZ');
    console.log(`${im}  ${m.fm.id.padEnd(34)} ${o} OK · ${i} ISARET · ${h} HATA · ${a} ATOMSUZ`);
  }
  console.log(`\ntoplam: ${toplamOk} OK · ${toplamIsaret} ISARET · ${toplamHata} HATA · ${toplamAtomsuz} ATOMSUZ`);
  const olcum = toplamOk + toplamIsaret + toplamHata + toplamAtomsuz;
  if (olcum > 0) console.log(RENK.gri(`atomsuz orani: %${Math.round(100*toplamAtomsuz/olcum)} — bu iddialar DOGRULANMIS DEGIL, olculememis sayilir`));
  process.exit(0);
}
