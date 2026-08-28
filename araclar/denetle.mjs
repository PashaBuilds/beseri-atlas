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

function suankiCommit() {
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
  const parcalar = temiz.split(/(?<=[.!?](?:\s*\[\^k\d+\])*)\s+(?=[^\s])/);
  const cikti = [];
  for (const p of parcalar) {
    const refs = [...p.matchAll(/\[\^(k\d+)\]/g)].map((m) => m[1]);
    if (refs.length === 0) continue;
    cikti.push({ cumle: p.replace(/\[\^k\d+\]/g, '').replace(/\s+/g, ' ').trim(), refs });
  }
  return cikti;
}

/** Cümledeki denetlenebilir atomlar. */
export function atomlar(cumle) {
  const sayisal = [];
  for (const m of cumle.matchAll(/(?<![\d.,])\d{3,4}(?![\d.,])/g)) sayisal.push({ tur: 'yil', deger: m[0] });
  for (const m of cumle.matchAll(/yüzde\s(\d+)|%\s?(\d+)/gi)) sayisal.push({ tur: 'yuzde', deger: m[1] || m[2] });
  for (const m of cumle.matchAll(/\b(\d{1,3})\s?(milyon|milyar)\b/gi)) sayisal.push({ tur: 'buyukluk', deger: m[1] });

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
      const sayisalHavuz = refs.length > 1 ? birlesikMetin : kaynakMetni;
      const eksikSayisal = sayisal.filter((a) => !sayisalHavuz.includes(normalize(a.deger)));
      const isimSonuclari = isimler.map((a) => ({ ...a, sonuc: isimDurumu(kaynakMetni, a.deger, kaynakTurkce) }));
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

if (process.argv[1]?.endsWith('denetle.mjs')) {
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
