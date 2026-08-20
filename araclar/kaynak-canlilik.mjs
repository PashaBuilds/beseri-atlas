// KAPI 8 — Kaynak canliligi  : her kaynak URL'i HTTP 200 donmeli.
// KAPI 10 — Uydurma kaynak     : kunyedeki baslik fetch edilen sayfada gecmeli.
//
// NOT (bilincli sertlik): bot korumasi nedeniyle 403 donen siteler (ornegin
// Britannica) bu kapidan gecemez. Kapiyi gevsetmek yerine o siteler
// kaynak-havuzu.yaml'da `dogrulanabilir: false` olarak isaretlenir ve
// kunyede kullanilmazlar. Bkz. §15 "Kapiyi gevsetmek" yasagi.
import path from 'node:path';
import { Rapor, makaleleriTopla, yamlOku, ICERIK } from './ortak.mjs';
import { getir, normalize } from './getir.mjs';

/** Kunyeden sayfada aranacak dizeyi turetir. */
export function dogrulamaDizesi(kaynak) {
  if (kaynak.dogrulama_dizesi) return kaynak.dogrulama_dizesi;
  const ad = kaynak.ad || '';
  // "Kaynak Adi — Sayfa Basligi" formatinda ise sag taraf daha ayirt edicidir.
  const parcalar = ad.split(/\s[—–-]\s/);
  return (parcalar.length > 1 ? parcalar[parcalar.length - 1] : ad).trim();
}

/** Aranan dize sayfa metninde geciyor mu? Tam eslesme yoksa kelime orani bakilir. */
export function dizeGeciyorMu(sayfaMetni, dize) {
  const s = normalize(sayfaMetni);
  const d = normalize(dize);
  if (!d) return { ok: false, oran: 0 };
  if (s.includes(d)) return { ok: true, oran: 1 };
  const kelimeler = d.split(' ').filter((k) => k.length > 3);
  if (kelimeler.length === 0) return { ok: false, oran: 0 };
  const bulunan = kelimeler.filter((k) => s.includes(k)).length;
  const oran = bulunan / kelimeler.length;
  return { ok: oran >= 0.8, oran };
}

export async function canlilikDenetimi(makaleler, { taze = false, izinliHavuz = null } = {}) {
  const r8 = new Rapor('KAPI 8 — kaynak canliligi');
  const r10 = new Rapor('KAPI 10 — uydurma kaynak kontrolu');
  const havuz = izinliHavuz || yamlOku(path.join(ICERIK, '_sistem', 'kaynak-havuzu.yaml'));
  const kara = (havuz?.blacklist || []).map((b) => (typeof b === 'string' ? b : b.alan));
  const dogrulanamaz = (havuz?.whitelist || []).filter((w) => w.dogrulanabilir === false).map((w) => w.alan);

  const gorulen = new Map();
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;
    for (const k of m.fm.kaynaklar || []) {
      if (!k.url) continue;
      let alan;
      try { alan = new URL(k.url).hostname.replace(/^www\./, ''); } catch {
        r8.hata(m.goreli, `${k.anahtar}: gecersiz URL "${k.url}"`); continue;
      }
      if (kara.some((b) => b && alan.includes(b))) {
        r8.hata(m.goreli, `${k.anahtar}: kara listedeki alan adi "${alan}" (§8)`);
        continue;
      }
      if (dogrulanamaz.some((b) => b && alan.includes(b))) {
        r8.hata(m.goreli, `${k.anahtar}: "${alan}" bot korumasi nedeniyle programatik dogrulanamiyor — kunyede kullanilamaz`);
        continue;
      }
      if (!gorulen.has(k.url)) gorulen.set(k.url, []);
      gorulen.get(k.url).push({ m, k });
    }
  }

  const urller = [...gorulen.keys()];
  const ESZAMANLI = 6;
  for (let i = 0; i < urller.length; i += ESZAMANLI) {
    const dilim = urller.slice(i, i + ESZAMANLI);
    const sonuclar = await Promise.all(dilim.map((u) => getir(u, { taze })));
    for (let j = 0; j < dilim.length; j++) {
      const s = sonuclar[j];
      for (const { m, k } of gorulen.get(dilim[j])) {
        if (s.durum !== 200) {
          r8.hata(m.goreli, `${k.anahtar}: HTTP ${s.durum || 'baglanti hatasi'}${s.hata ? ` (${s.hata})` : ''} — ${dilim[j]}`);
          continue;
        }
        const dize = dogrulamaDizesi(k);
        const kontrol = dizeGeciyorMu(`${s.baslik || ''} ${s.metin || ''}`, dize);
        if (!kontrol.ok) {
          r10.hata(m.goreli, `${k.anahtar}: kunye dizesi sayfada bulunamadi (eslesme %${Math.round(kontrol.oran * 100)}) — aranan: "${dize}"`);
        }
      }
    }
  }
  return { r8, r10, kontrolEdilen: urller.length };
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('kaynak-canlilik.mjs')) {
  const taze = process.argv.includes('--taze');
  const makaleler = makaleleriTopla();
  const { r8, r10, kontrolEdilen } = await canlilikDenetimi(makaleler, { taze });
  console.log(`${kontrolEdilen} benzersiz URL kontrol edildi\n`);
  r8.yazdir();
  r10.yazdir();
  process.exit(r8.gecti && r10.gecti ? 0 : 1);
}
