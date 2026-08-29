#!/usr/bin/env node
// ALINTI DOGRULA — tirnak icindeki her dizeyi kaynaginda arar.
//
// NEDEN. Bir kor hakem ayni dosyada IKI ayri turda ayni hatayi buldu: matris
// `inceleme` notu, kaynakta SIFIR kez gecen bir dizeyi tirnak icinde kaynaga
// mal ediyordu ("Muteczuma was fully devoted...", "los de Tlaxcalla sus
// leales amigos"). Ikisi de govde alintisiyla birlikte geliyordu ve ikisi de
// elle yakalandi. Elle yakalanan sey, kacirilabilecek seydir.
//
// KAPI 10 yalnizca kunyenin `dogrulama_dizesi` alanini sinar. Govdede okura
// gosterilen alintiyi ve matristeki gerekce dizesini HICBIR SEY sinamiyordu.
// Bu arac o boslugu kapatir.
//
// Kullanim:
//   node araclar/alinti-dogrula.mjs <id> [<id>...]   # belirli makaleler
//   node araclar/alinti-dogrula.mjs --hepsi          # butun korpus
//   node araclar/alinti-dogrula.mjs <id> --json
//
// Cikti sinifi:
//   BIREBIR   — dize kaynakta aynen geciyor
//   ORTUSME   — kelimelerin tamami geciyor ama ardisik degil (kirpilmis ya da
//               araya girmis olabilir; hakemin bakmasi gerekir)
//   GECMIYOR  — kaynakta yok. Uydurma alinti adayi.
//   OKUNAMADI — kaynak metni cikarilamadi (ham PDF, 403, bos govde).
//               Bu bir SUCLAMA DEGILDIR; olculemedi demektir.
//   PENCERE   — kaynak 400k'da kesildi ve dize pencerede yok; --tam gerekir.

import fs from 'node:fs';
import path from 'node:path';
import { makaleleriTopla, KOK, RENK } from './ortak.mjs';
import { getir } from './getir.mjs';
import { dizeGeciyorMu } from './kaynak-canlilik.mjs';

const EN_KISA = 12;      // bundan kisa tirnaklar terim/vurgu olabilir, alinti degil
const EN_UZUN = 400;

// Turkce yazilmis bir tirnak, cogu zaman yabanci dildeki kaynagin CEVIRISIDIR
// ya da makalenin kendi vurgusudur; kaynak metninde birebir aranmasi anlamsiz
// olur. Bunlar ayri sayilir, hata sayilmaz.
const TURKCE_SOZCUK = new Set([
  've', 'ile', 'bir', 'bu', 'şu', 'o', 'için', 'olarak', 'değil', 'göre', 'daha',
  'kadar', 'üzere', 'gibi', 'ama', 'ancak', 'çünkü', 'ise', 'her', 'hem', 'ne',
  'iki', 'üç', 'dört', 'beş', 'on', 'yüz', 'bin', 'en', 'çok', 'az', 'var', 'yok',
  'olan', 'olmak', 'eden', 'yapan', 'kendi', 'aynı', 'başka', 'yalnız', 'sadece',
  'egemen', 'efendi', 'devlet', 'halk', 'toplum', 'tarih', 'savaş', 'yasa',
  'tek', 'kalmadi', 'kalmadı', 'degil', 'yonetim', 'yönetim', 'degismedi',
  'yetkisini', 'elinden', 'alan', 'hukum', 'hüküm', 'budur', 'oranini', 'oranını',
  'basina', 'başına', 'belirleme', 'uyeleri', 'üyeleri', 'meclis', 'program',
  'rol', 'sulara', 'sularina', 'sularına', 'yayilan', 'yayılan', 'temelli',
  'hakemli', 'kim', 'nasil', 'nasıl', 'neden', 'yil', 'yıl', 'yila', 'yıla',
  'kez', 'sonra', 'once', 'önce', 'arasinda', 'arasında', 'uzerine', 'üzerine',
]);
// Turkce cekim ekleri: dizenin sonundaki bu kaliplar Ingilizce/Latince/Ispanyolca
// bir kaynak metninde bulunmaz.
const TURKCE_EK = /(lar|ler|ın|in|un|ün|da|de|dan|den|ta|te|tan|ten|sı|si|su|sü|nın|nin|dır|dir|dur|dür|ki|ce|ca|lık|lik|luk|lük)$/;
function turkceMi(dize) {
  if (/[çğıöşüÇĞİÖŞÜ]/.test(dize)) return true;
  // Ajanlar notlarini cogu zaman diyakritiksiz yaziyor ("yonetim degismedi",
  // "gumruk oranini tek basina"). Katlanmis kume ile de sinanir.
  const katlanmis = katla(dize).toLowerCase();
  const sozcukler = katlanmis.split(/[^\p{L}]+/u).filter(Boolean);
  if (!sozcukler.length) return false;
  const isaret = sozcukler.filter((s) => TURKCE_SOZCUK.has(s) || TURKCE_EK.test(s)).length;
  // Kisa dizelerde tek bir Turkce sozcuk yeter; uzun dizelerde oran aranir.
  return sozcukler.length <= 4 ? isaret >= 1 : isaret / sozcukler.length >= 0.3;
}

// ESER ADI SEZGISI. "The Darker Side of the 'Original Affluent Society'"
// bir alinti degil, bir makale basligidir; kaynak METNINDE aranmasi anlamsiz.
// Kalip: sozcuklerin cogu buyuk harfle baslar (kucuk baglaclar sayilmaz).
const BAGLAC = new Set(['of', 'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to',
  'for', 'from', 'by', 'with', 'as', 'is', 'was', 'not', 'without', 'de', 'la', 'el',
  'y', 'und', 'der', 'die', 'das', 'von', 'zu', 'et', 'le', 'les', 'du', 'des']);
function eserAdiMi(dize) {
  const s = dize.split(/\s+/).filter((w) => /\p{L}/u.test(w));
  if (s.length < 3) return false;
  const anlamli = s.filter((w) => !BAGLAC.has(w.toLowerCase().replace(/[^\p{L}]/gu, '')));
  if (anlamli.length < 2) return false;
  const buyuk = anlamli.filter((w) => /^['"“«(]*[A-ZÇĞİÖŞÜÄÖÜ]/.test(w)).length;
  return buyuk / anlamli.length >= 0.8;
}

const TIRNAK = /"([^"\n]{4,400})"|“([^”\n]{4,400})”|«([^»\n]{4,400})»/g;

// DIYAKRITIK KATLAMA. Ajanlar not yazarken cogu zaman diyakritikleri
// dusuruyor ("verbluffend" / "verbluffend einseitig"), kaynak metninde ise
// "verbluffend" umlautlu duruyor. Katlamadan karsilastirmak, saglam bir
// alintiyi "uydurma" ilan eder — aracin yapabilecegi en zararli hata.
const katla = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/ß/g, 'ss').replace(/[øØ]/g, 'o').replace(/[æÆ]/g, 'ae').replace(/[đĐ]/g, 'd')
  .replace(/[ıİ]/g, 'i').replace(/[ŁłĿŀ]/g, 'l');
const normal = (s) => katla(String(s)).toLowerCase().replace(/[’'`´]/g, "'").replace(/\s+/g, ' ').trim();

/** Bir metnin ham PDF sozdizimi olup olmadigi (metin cikarilamamis demektir). */
function hamPdfMi(metin) {
  return /%PDF-|\/(XHeight|Leading|FontBBox|MediaBox|Linearized)\b|\bendobj\b/.test(String(metin).slice(0, 4000));
}

/** Govdedeki alintilari, ardindan gelen dipnota baglayarak cikarir. */
export function govdeAlintilari(govde) {
  const cikti = [];
  for (const satir of govde.split(/\n\s*\n/)) {
    const p = satir.trim();
    if (/^#{1,6}\s/.test(p)) continue;
    if (/^\[\^k\d+\]:/.test(p)) continue;   // kaynakca, govde degil
    for (const e of p.matchAll(TIRNAK)) {
      const dize = (e[1] || e[2] || e[3] || '').trim();
      if (dize.length < EN_KISA || dize.length > EN_UZUN) continue;
      const bitis = (e.index || 0) + e[0].length;
      // Dipnot, destekledigi seyi TAKIP eder.
      const anahtar = /\[\^(k\d+)\]/.exec(p.slice(bitis, bitis + 60))?.[1]
        || /\[\^(k\d+)\]/.exec(p.slice(bitis))?.[1];
      if (!anahtar) continue;               // dipnotsuz alinti bu aracin isi degil
      cikti.push({ nerede: 'govde', dize, anahtar });
    }
  }
  return cikti;
}

/** Matris inceleme notlarindaki alintilari cikarir. */
export function matrisAlintilari(matris) {
  const cikti = [];
  for (const i of matris?.iddialar || []) {
    const not = String(i.inceleme || '');
    if (!not) continue;
    const anahtarlar = (i.kaynaklar || []).map((k) => k.anahtar).filter(Boolean);
    if (!anahtarlar.length) continue;
    for (const e of not.matchAll(TIRNAK)) {
      const dize = (e[1] || e[2] || e[3] || '').trim();
      if (dize.length < EN_KISA || dize.length > EN_UZUN) continue;
      cikti.push({ nerede: `matris:${i.iddia_id}`, dize, anahtar: anahtarlar[0], adaylar: anahtarlar });
    }
  }
  return cikti;
}

async function sina(dize, url) {
  const r = await getir(url);
  const metin = String(r.metin ?? '');
  if (!metin) return { sinif: 'OKUNAMADI', not: `durum ${r.durum}, govde bos` };
  if (hamPdfMi(metin)) return { sinif: 'OKUNAMADI', not: 'ham PDF — metin cikarilamadi' };
  if (normal(metin).includes(normal(dize))) return { sinif: 'BIREBIR', not: '' };
  const k = dizeGeciyorMu(metin, dize);
  if (k.ok) return { sinif: 'ORTUSME', not: `kelime ortusmesi %${Math.round(k.oran * 100)} ama ardisik degil` };
  if (r.kesildi) return { sinif: 'PENCERE', not: 'kaynak 400k\'da kesildi; --tam ile yeniden sina' };
  return { sinif: 'GECMIYOR', not: `kelime ortusmesi %${Math.round(k.oran * 100)}` };
}

export async function makaleyiSina(m) {
  const matrisYolu = path.join(KOK, 'denetim/matris', `${m.fm.id}-matris.json`);
  let matris = null;
  if (fs.existsSync(matrisYolu)) {
    try { matris = JSON.parse(fs.readFileSync(matrisYolu, 'utf8')); } catch { /* bozuk matris */ }
  }
  const kunyeler = new Map((m.fm.kaynaklar || []).map((k) => [k.anahtar, k]));
  const isler = [...govdeAlintilari(m.govde), ...(matris ? matrisAlintilari(matris) : [])];

  const sonuclar = [];
  for (const is of isler) {
    if (eserAdiMi(is.dize)) {
      sonuclar.push({ ...is, sinif: 'ESER ADI', not: 'eser adi gibi — kaynak metninde aranmadi' });
      continue;
    }
    if (turkceMi(is.dize)) {
      sonuclar.push({ ...is, sinif: 'TURKCE', not: 'Turkce dize — kaynagin ceviri/parafrazi sayildi, sinanmadi' });
      continue;
    }
    const k = kunyeler.get(is.anahtar);
    if (!k?.url) {
      sonuclar.push({ ...is, sinif: 'KUNYE YOK', not: `${is.anahtar} kunyesi ya da url'si yok` });
      continue;
    }
    let r = await sina(is.dize, k.url);
    // Matris notlarinda ilk anahtar yanlis olabilir; oteki adaylari da dene.
    if (r.sinif === 'GECMIYOR' && is.adaylar?.length > 1) {
      for (const a of is.adaylar.slice(1)) {
        const k2 = kunyeler.get(a);
        if (!k2?.url) continue;
        const r2 = await sina(is.dize, k2.url);
        if (r2.sinif === 'BIREBIR' || r2.sinif === 'ORTUSME') {
          r = { ...r2, not: `${r2.not} (${is.anahtar} degil ${a} kaynaginda bulundu)`.trim() };
          break;
        }
      }
    }
    sonuclar.push({ ...is, ...r, url: k.url });
  }
  return { id: m.fm.id, goreli: m.goreli, sonuclar };
}

async function cli() {
  const argv = process.argv.slice(2);
  const bilinen = new Set(['--hepsi', '--json', '--yardim', '-h']);
  const bilinmeyen = argv.filter((a) => a.startsWith('-') && !bilinen.has(a));
  if (bilinmeyen.length || argv.includes('--yardim') || argv.includes('-h')) {
    if (bilinmeyen.length) console.error(`bilinmeyen secenek: ${bilinmeyen.join(' ')}`);
    console.log('kullanim: node araclar/alinti-dogrula.mjs <id> [<id>...] | --hepsi  [--json]');
    process.exit(bilinmeyen.length ? 2 : 0);
  }
  const idler = argv.filter((a) => !a.startsWith('-'));
  const hepsi = argv.includes('--hepsi');
  if (!idler.length && !hepsi) {
    console.error('kullanim: node araclar/alinti-dogrula.mjs <id> [<id>...] | --hepsi');
    process.exit(1);
  }

  const makaleler = makaleleriTopla().filter((m) => hepsi || idler.includes(m.fm.id));
  if (!makaleler.length) { console.error('eslesen makale yok'); process.exit(1); }

  const hepsiSonuc = [];
  for (const m of makaleler) hepsiSonuc.push(await makaleyiSina(m));

  if (argv.includes('--json')) { console.log(JSON.stringify(hepsiSonuc, null, 2)); return; }

  const sayim = new Map();
  let kotu = 0;
  for (const r of hepsiSonuc) {
    const bozuk = r.sonuclar.filter((s) => s.sinif === 'GECMIYOR');
    for (const s of r.sonuclar) sayim.set(s.sinif, (sayim.get(s.sinif) || 0) + 1);
    if (!r.sonuclar.length) continue;
    if (bozuk.length) {
      kotu += bozuk.length;
      console.log(RENK.kirmizi(`GECMIYOR`) + `  ${r.id}  (${bozuk.length}/${r.sonuclar.length} alinti)`);
      for (const s of bozuk) {
        console.log(RENK.gri(`    ${s.nerede} · ${s.anahtar} · ${s.not}`));
        console.log(`    "${s.dize.slice(0, 100)}"`);
      }
    }
  }
  console.log('');
  console.log(RENK.kalin(`${makaleler.length} makale · ${[...sayim.values()].reduce((a, b) => a + b, 0)} tirnakli dize`));
  for (const [s, n] of [...sayim].sort((a, b) => b[1] - a[1])) {
    const boya = s === 'GECMIYOR' ? RENK.kirmizi : s === 'BIREBIR' ? RENK.yesil : RENK.gri;
    console.log(boya(`  ${s.padEnd(10)} ${String(n).padStart(5)}`));
  }
  if (kotu) {
    console.log(RENK.gri('\nGECMIYOR = uydurma alinti ADAYI. Once kaynagin 400k penceresinin'));
    console.log(RENK.gri('otesinde olup olmadigini `dok.mjs --tam` ile sina; hala gecmiyorsa'));
    console.log(RENK.gri('alintiyi KALDIR — parafraz etmek yetmez, tirnak bir olgu iddiasidir.'));
  }
}

if (process.argv[1] && process.argv[1].endsWith('alinti-dogrula.mjs')) await cli();
