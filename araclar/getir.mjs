// Ortak fetch katmani. Disk onbellegi kullanir; ayni URL'i bir kosuda
// birden fazla kapi isterse tek istek atilir.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { KOK } from './ortak.mjs';

const ONBELLEK = path.join(KOK, 'denetim', '.onbellek');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const ZAMAN_ASIMI_MS = 25000;

function yol(url) {
  const h = crypto.createHash('sha1').update(url).digest('hex').slice(0, 20);
  return path.join(ONBELLEK, `${h}.json`);
}

export function onbellektenOku(url) {
  const p = yol(url);
  if (!fs.existsSync(p)) return null;
  try {
    const k = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (Date.now() - k.zaman > TTL_MS) return null;
    // Kaydin kendi URL'i istenenle ayni degilse kayit bozulmustur: yanlis
    // metni "kaynak boyle diyor" diye dondurmek, dogrulama zincirinin
    // yapabilecegi en agir hatadir. 2026-08-29'da bir hakem oturumu
    // onbellekten alakasiz bir sayfa aldigini bildirdi; bu kontrol o
    // sinifin tamamini kapatir.
    if (k.url !== url) return null;
    // `kesildi` bayragi onbellege sonradan eklendi; ondan onceki kayitlarda
    // alan YOK ve bu, kesme algilamasini sessizce devre disi birakiyordu.
    // 2026-08-29: bir OWID CSV'sinin World satirlari 400k penceresinin
    // otesinde kaldigi icin denetle.mjs sahte HATA uretti — kesikligi
    // gormedigi icin "kaynakta yok" hukmunu kesin sandi. Uzunluk tavana
    // dayaniyorsa kayit kesiktir; bunu bayrak yoklugunda uzunluktan turet.
    if (k.kesildi === undefined && typeof k.metin === 'string' && k.metin.length >= 400000) {
      k.kesildi = true;
    }
    return k;
  } catch { return null; }
}

/** HTML'den okunabilir metin cikarir. */
export function metneCevir(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    // Sayisal varliklar cozulmezse "Ibn Khald&#363;n" gibi adlar KAPI 10'da
    // bulunamaz. Once sayisal, sonra adli varliklar.
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Tek denemede ag hatasi alan URL'i olu saymak yanlis pozitif uretir; bu kapiyi
 * gevsetmek degil, dogru olcmektir.
 *
 * 4xx donduyse tekrar denenmez — 404 gercekten 404'tur. 5xx ise sunucunun O ANKI
 * durumudur, kaynagin kalici ozelligi degil: hiz sinirlamasi ve gecici kesinti
 * bu sinifa duser, dolayisiyla ag hatasi gibi yeniden denenir.
 */
export async function getir(url, { taze = false, metinSakla = true, deneme = 3 } = {}) {
  if (!taze) {
    const k = onbellektenOku(url);
    if (k) return { ...k, onbellek: true };
  }
  let sonuc;
  for (let i = 0; i < deneme; i++) {
    sonuc = { url, zaman: Date.now(), onbellek: false, denemeler: i + 1 };
    const kontrol = new AbortController();
    const zamanlayici = setTimeout(() => kontrol.abort(), ZAMAN_ASIMI_MS);
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8', 'Accept-Language': 'en,tr;q=0.8' },
        redirect: 'follow',
        signal: kontrol.signal,
      });
      sonuc.durum = r.status;
      sonuc.sonUrl = r.url;
      const tip = r.headers.get('content-type') || '';
      if (metinSakla && r.ok) {
        const ham = await r.text();
        const tamMetin = tip.includes('html') ? metneCevir(ham) : ham;
        sonuc.metin = tamMetin.slice(0, 400000);
        // 400k sonrasi atilir; "dizede yok" sonucu bu durumda KESIN degildir.
        if (tamMetin.length > 400000) sonuc.kesildi = true;
        sonuc.baslik = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(ham)?.[1]?.trim().slice(0, 300) || '';
      }
      // 5xx: sunucu gecici olarak cevap veremiyor. Son deneme degilse bekle ve tekrar dene.
      if (r.status >= 500 && i < deneme - 1) { await bekle(1500 * (i + 1)); continue; }
      break; // kalici HTTP cevabi alindi
    } catch (e) {
      sonuc.durum = 0;
      sonuc.hata = e.name === 'AbortError' ? 'zaman asimi' : (e.cause?.code || e.message);
      if (i < deneme - 1) await bekle(1500 * (i + 1));
    } finally {
      clearTimeout(zamanlayici);
    }
  }
  fs.mkdirSync(ONBELLEK, { recursive: true });
  // Ag hatalari onbellege alinmaz; sonraki kosuda yeniden denenmelidir.
  // 5xx ayni sinifa girer. Onbelleklenirse tek bir hiz-sinirlama cevabi TTL
  // boyunca (7 gun) geri donulur ve kapi, sunucu coktan duzeldigi halde kirik
  // kalir — 2026-08-22'de gutenberg.org'da tam olarak bu yasandi.
  if (sonuc.durum !== 0 && sonuc.durum < 500) {
    // Atomik yazma: paralel ajanlar ayni onbellek dizinine yazarken yarim
    // dosya birakmasin diye once gecici ada yaz, sonra tasi.
    const hedef = yol(url);
    const gecici = `${hedef}.${process.pid}.${sonuc.zaman}.tmp`;
    try {
      fs.writeFileSync(gecici, JSON.stringify(sonuc));
      fs.renameSync(gecici, hedef);
    } catch {
      try { fs.rmSync(gecici, { force: true }); } catch { /* yoksay */ }
    }
  }
  return sonuc;
}

/** Turkce ve aksanli karakterleri normalize ederek karsilastirmaya hazirlar. */
export function normalize(s) {
  return (s || '')
    // Turkce yerel kucultme, Ingilizce metindeki "I" harfini "i" degil "i"
    // (noktasiz) yapar; "India" -> "india" olur ve eslesme kacar. Iki tarafta
    // birden uygulanan noktali/noktasiz i katlamasi bunu simetrik olarak cozer.
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i').replace(/İ/g, 'i').replace(/i̇/g, 'i')
    .replace(/[’'`´]/g, "'")
    .replace(/[—–−]/g, '-')
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
