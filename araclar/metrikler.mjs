// Koşan istatistikler. Faz kapıları ve DURUM.md bu hesaplardan beslenir.
// Kaynak: denetim/raporlar/*.json (Geçiş 2 ve 4 çıktıları) + kuyruk + korpus.
import fs from 'node:fs';
import path from 'node:path';
import { KOK, varMi, makaleleriTopla } from './ortak.mjs';

export const RAPOR_KLASORU = path.join(KOK, 'denetim', 'raporlar');
export const METRIK_YOLU = path.join(KOK, 'denetim', 'metrikler.json');

export function raporlariOku() {
  if (!varMi(RAPOR_KLASORU)) return [];
  return fs.readdirSync(RAPOR_KLASORU)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try { return JSON.parse(fs.readFileSync(path.join(RAPOR_KLASORU, f), 'utf8')); }
      catch { return null; }
    })
    .filter(Boolean);
}

export function metrikDosyasi() {
  if (!varMi(METRIK_YOLU)) return { ornekleme_gecmisi: [], capraz_gecmisi: [] };
  try { return JSON.parse(fs.readFileSync(METRIK_YOLU, 'utf8')); }
  catch { return { ornekleme_gecmisi: [], capraz_gecmisi: [] }; }
}

export function metrikYaz(guncelle) {
  const m = metrikDosyasi();
  const yeni = { ...m, ...guncelle, guncelleme: new Date().toISOString() };
  fs.mkdirSync(path.dirname(METRIK_YOLU), { recursive: true });
  fs.writeFileSync(METRIK_YOLU, JSON.stringify(yeni, null, 2));
  return yeni;
}

/**
 * Kaynak doğrulama oranı = doğrulanan iddia / kontrol edilen iddia.
 * Geçiş 2 (kaynak denetimi) ve Geçiş 4 (yeniden türetme) sonuçlarını birleştirir.
 * ISARET yarım sayılır: ne doğrulanmış ne çürütülmüştür.
 */
export function dogrulamaOrani(raporlar) {
  let ok = 0, isaret = 0, hata = 0, atomsuz = 0;
  for (const r of raporlar) {
    for (const s of r.sonuclar || []) {
      if (s.durum === 'OK') ok += 1;
      else if (s.durum === 'ISARET') isaret += 1;
      else if (s.durum === 'HATA') hata += 1;
      else if (s.durum === 'ATOMSUZ') atomsuz += 1;
    }
  }
  // ATOMSUZ = programatik olarak olculemeyen iddia. Ne dogrulanmis ne
  // curutulmustur; orana KATILMAZ ama gizlenmez de — RAPOR.md'de ayrica
  // beyan edilir. Olculemeyeni dogrulanmis saymak, hattin kendini
  // kandirmasi olurdu (§16).
  const toplam = ok + isaret + hata;
  return {
    oran: toplam ? Number(((ok + isaret * 0.5) / toplam).toFixed(4)) : null,
    ok, isaret, hata, atomsuz, toplam, olculen_oran: toplam + atomsuz ? Number((toplam / (toplam + atomsuz)).toFixed(4)) : null,
  };
}

export function metrikleriHesapla({ makaleler = null, isler = [] } = {}) {
  const mk = makaleler || makaleleriTopla();
  const raporlar = raporlariOku();
  const dg = dogrulamaOrani(raporlar);
  const mf = metrikDosyasi();

  const kaynakSayilari = mk.map((m) => (m.fm.kaynaklar || []).length).filter((n) => n > 0);
  const ortalama = kaynakSayilari.length
    ? Number((kaynakSayilari.reduce((a, b) => a + b, 0) / kaynakSayilari.length).toFixed(2)) : null;

  const karantina = isler.filter((i) => i.durum === 'karantina').length;
  const islenmis = isler.filter((i) => i.durum === 'karantina' || i.durum === 'onaylandi').length;

  const capraz = varMi(path.join(KOK, 'denetim', 'capraz-sonucu.json'))
    ? JSON.parse(fs.readFileSync(path.join(KOK, 'denetim', 'capraz-sonucu.json'), 'utf8'))
    : null;

  return {
    kaynak_dogrulama_orani: dg.oran,
    dogrulama_detay: dg,
    ortalama_kaynak_sayisi: ortalama,
    karantina_orani: islenmis ? Number((karantina / islenmis).toFixed(4)) : 0,
    karantina_sayisi: karantina,
    onayli_sayisi: mk.filter((m) => m.fm.denetim_durumu === 'onaylandi').length,
    korpus_sayisi: mk.length,
    ornekleme_son: mf.ornekleme_gecmisi?.length ? mf.ornekleme_gecmisi[mf.ornekleme_gecmisi.length - 1].skor : null,
    ornekleme_gecmisi: mf.ornekleme_gecmisi || [],
    capraz_celiski: capraz ? (capraz.celiskiler?.length ?? 0) : 0,
  };
}

if (process.argv[1]?.endsWith('metrikler.mjs')) {
  const { kuyrukOku } = await import('../otonom/orkestrator.mjs').catch(() => ({ kuyrukOku: () => [] }));
  console.log(JSON.stringify(metrikleriHesapla({ isler: kuyrukOku ? kuyrukOku() : [] }), null, 2));
}
