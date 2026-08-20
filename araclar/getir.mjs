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
 * gevsetmek degil, dogru olcmektir. HTTP durum kodu donduyse tekrar denenmez —
 * 404 gercekten 404'tur.
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
        sonuc.metin = tip.includes('html') ? metneCevir(ham).slice(0, 400000) : ham.slice(0, 400000);
        sonuc.baslik = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(ham)?.[1]?.trim().slice(0, 300) || '';
      }
      break; // HTTP cevabi alindi
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
  if (sonuc.durum !== 0) fs.writeFileSync(yol(url), JSON.stringify(sonuc));
  return sonuc;
}

/** Turkce ve aksanli karakterleri normalize ederek karsilastirmaya hazirlar. */
export function normalize(s) {
  return (s || '')
    .toLocaleLowerCase('tr')
    .replace(/[’'`´]/g, "'")
    .replace(/[—–−]/g, '-')
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
