// Dünya Örgüsü kişisel öğrenme durumu.
//
// Tasarım ilkesi: "okundu" bir öğrenme ölçüsü değildir. Kalıcı öğrenme için
// okurun önce bir tahminde bulunması, okuma sırasında bağ kurması, metin
// kapandıktan sonra bilgiyi geri çağırması ve unutmaya başlamadan yeniden
// karşılaşması gerekir. Bu modül o döngünün küçük, yerel ve taşınabilir
// hafızasıdır. Sunucuya veri göndermez.

export const OGRENME_ANAHTARI = 'baglam-ogrenme-v2';
export const ESKI_OKUMA_ANAHTARI = 'baglam-okunanlar-v1';
export const DURUM_SURUMU = 2;
export const TEKRAR_ARALIKLARI = [1, 3, 7, 14, 30, 60, 120];

const GUN = 86_400_000;

export function bosDurum() {
  return {
    surum: DURUM_SURUMU,
    profil: {
      tamamlandi: false,
      amac: '',
      tempo: 20,
      baslangicRotasi: 'tarihci-gibi-dusunmek',
      baslangic: '',
    },
    makaleler: {},
    rotalar: {},
    aktif: { rota: '', makale: '' },
    gunler: [],
  };
}

function nesneMi(v) {
  return Boolean(v) && typeof v === 'object' && !Array.isArray(v);
}

export function gunDamgasi(zaman = new Date()) {
  return new Date(zaman).toISOString().slice(0, 10);
}

export function gunEkle(zaman, gun) {
  return new Date(new Date(zaman).getTime() + gun * GUN).toISOString();
}

function makaleKaydi(kayit = {}) {
  return {
    ilkAcilis: String(kayit.ilkAcilis || ''),
    sonAcilis: String(kayit.sonAcilis || ''),
    ilerleme: Math.max(0, Math.min(1, Number(kayit.ilerleme) || 0)),
    tamamlandi: Boolean(kayit.tamamlandi),
    tamamlanma: String(kayit.tamamlanma || ''),
    guven: Math.max(0, Math.min(3, Number(kayit.guven) || 0)),
    tekrarAsamasi: Math.max(0, Math.min(TEKRAR_ARALIKLARI.length - 1, Number(kayit.tekrarAsamasi) || 0)),
    sonrakiTekrar: String(kayit.sonrakiTekrar || ''),
    onceCevap: String(kayit.onceCevap || ''),
    sonraCevap: String(kayit.sonraCevap || ''),
    kanitNotu: String(kayit.kanitNotu || ''),
    not: String(kayit.not || ''),
    tekrarSayisi: Math.max(0, Number(kayit.tekrarSayisi) || 0),
  };
}

export function normallestir(ham) {
  const temel = bosDurum();
  if (!nesneMi(ham)) return temel;

  const profil = nesneMi(ham.profil) ? ham.profil : {};
  temel.profil = {
    tamamlandi: Boolean(profil.tamamlandi),
    amac: String(profil.amac || ''),
    tempo: [10, 20, 40].includes(Number(profil.tempo)) ? Number(profil.tempo) : 20,
    baslangicRotasi: String(profil.baslangicRotasi || 'tarihci-gibi-dusunmek'),
    baslangic: String(profil.baslangic || ''),
  };

  if (nesneMi(ham.makaleler)) {
    for (const [id, kayit] of Object.entries(ham.makaleler)) {
      if (/^(donem|olay|aktor|dusunur|kavram|tartisma|veri|kaynak)-[a-z0-9-]+$/.test(id)) {
        temel.makaleler[id] = makaleKaydi(kayit);
      }
    }
  }
  if (nesneMi(ham.rotalar)) {
    for (const [slug, kayit] of Object.entries(ham.rotalar)) {
      if (!nesneMi(kayit)) continue;
      temel.rotalar[slug] = {
        baslangic: String(kayit.baslangic || ''),
        ilkCevap: String(kayit.ilkCevap || ''),
        sonCevap: String(kayit.sonCevap || ''),
        tamamlandi: Boolean(kayit.tamamlandi),
        tamamlanma: String(kayit.tamamlanma || ''),
      };
    }
  }
  if (nesneMi(ham.aktif)) {
    temel.aktif = { rota: String(ham.aktif.rota || ''), makale: String(ham.aktif.makale || '') };
  }
  temel.gunler = Array.isArray(ham.gunler)
    ? [...new Set(ham.gunler.map(String).filter((x) => /^\d{4}-\d{2}-\d{2}$/.test(x)))].sort()
    : [];
  return temel;
}

export function eskiOkumalariTasi(durum, eskiOkumalar, zaman = new Date()) {
  const sonuc = normallestir(durum);
  const simdi = new Date(zaman).toISOString();
  for (const id of Array.isArray(eskiOkumalar) ? eskiOkumalar : []) {
    if (sonuc.makaleler[id]) continue;
    sonuc.makaleler[id] = makaleKaydi({
      ilkAcilis: simdi,
      sonAcilis: simdi,
      ilerleme: 1,
      tamamlandi: true,
      tamamlanma: simdi,
      guven: 1,
      sonrakiTekrar: simdi,
    });
  }
  return sonuc;
}

export function durumOku(depo = globalThis.localStorage) {
  let ham = null;
  let eski = [];
  try { ham = JSON.parse(depo?.getItem(OGRENME_ANAHTARI) || 'null'); } catch { /* bozuk kayıt sıfırlanır */ }
  try { eski = JSON.parse(depo?.getItem(ESKI_OKUMA_ANAHTARI) || '[]'); } catch { /* eski kayıt zorunlu değil */ }
  const durum = eskiOkumalariTasi(normallestir(ham), eski);
  durumYaz(durum, depo);
  return durum;
}

export function durumYaz(durum, depo = globalThis.localStorage) {
  const temiz = normallestir(durum);
  try { depo?.setItem(OGRENME_ANAHTARI, JSON.stringify(temiz)); } catch { /* özel kip / kota */ }
  return temiz;
}

function gunuIsle(durum, zaman) {
  const gun = gunDamgasi(zaman);
  durum.gunler = [...new Set([...(durum.gunler || []), gun])].sort().slice(-365);
}

export function profilKaydet(durum, profil, zaman = new Date()) {
  const sonuc = normallestir(durum);
  sonuc.profil = {
    tamamlandi: true,
    amac: String(profil.amac || ''),
    tempo: [10, 20, 40].includes(Number(profil.tempo)) ? Number(profil.tempo) : 20,
    baslangicRotasi: String(profil.baslangicRotasi || 'tarihci-gibi-dusunmek'),
    baslangic: sonuc.profil.baslangic || new Date(zaman).toISOString(),
  };
  sonuc.aktif.rota = sonuc.aktif.rota || sonuc.profil.baslangicRotasi;
  gunuIsle(sonuc, zaman);
  return sonuc;
}

export function makaleBaslat(durum, id, zaman = new Date()) {
  const sonuc = normallestir(durum);
  const simdi = new Date(zaman).toISOString();
  const kayit = makaleKaydi(sonuc.makaleler[id]);
  kayit.ilkAcilis ||= simdi;
  kayit.sonAcilis = simdi;
  sonuc.makaleler[id] = kayit;
  sonuc.aktif.makale = id;
  gunuIsle(sonuc, zaman);
  return sonuc;
}

export function makaleAlaniKaydet(durum, id, alan, deger, zaman = new Date()) {
  const izinli = new Set(['onceCevap', 'sonraCevap', 'kanitNotu', 'not']);
  if (!izinli.has(alan)) return normallestir(durum);
  const sonuc = makaleBaslat(durum, id, zaman);
  sonuc.makaleler[id][alan] = String(deger || '').trim().slice(0, 6000);
  return sonuc;
}

export function ilerlemeKaydet(durum, id, ilerleme, zaman = new Date()) {
  const sonuc = makaleBaslat(durum, id, zaman);
  sonuc.makaleler[id].ilerleme = Math.max(
    sonuc.makaleler[id].ilerleme,
    Math.max(0, Math.min(1, Number(ilerleme) || 0)),
  );
  return sonuc;
}

export function makaleTamamla(durum, id, { guven = 1, zaman = new Date() } = {}) {
  const sonuc = makaleBaslat(durum, id, zaman);
  const kayit = sonuc.makaleler[id];
  const simdi = new Date(zaman).toISOString();
  kayit.tamamlandi = true;
  kayit.tamamlanma ||= simdi;
  kayit.ilerleme = 1;
  kayit.guven = Math.max(1, Math.min(3, Number(guven) || 1));
  kayit.tekrarAsamasi = 0;
  kayit.sonrakiTekrar = gunEkle(zaman, TEKRAR_ARALIKLARI[0]);
  sonuc.aktif.makale = id;
  return sonuc;
}

export function tekrarDegerlendir(durum, id, sonucTuru, zaman = new Date()) {
  const sonuc = makaleBaslat(durum, id, zaman);
  const kayit = sonuc.makaleler[id];
  const eskiAsama = kayit.tekrarAsamasi || 0;
  let yeniAsama = eskiAsama;
  if (sonucTuru === 'zor') yeniAsama = 0;
  else if (sonucTuru === 'kolay') yeniAsama = Math.min(TEKRAR_ARALIKLARI.length - 1, eskiAsama + 2);
  else yeniAsama = Math.min(TEKRAR_ARALIKLARI.length - 1, eskiAsama + 1);
  kayit.tekrarAsamasi = yeniAsama;
  kayit.tekrarSayisi += 1;
  kayit.sonrakiTekrar = gunEkle(zaman, TEKRAR_ARALIKLARI[yeniAsama]);
  kayit.guven = sonucTuru === 'zor' ? 1 : sonucTuru === 'kolay' ? 3 : 2;
  gunuIsle(sonuc, zaman);
  return sonuc;
}

export function rotaCevabiKaydet(durum, slug, alan, cevap, zaman = new Date()) {
  const sonuc = normallestir(durum);
  const onceki = nesneMi(sonuc.rotalar[slug]) ? sonuc.rotalar[slug] : {};
  const kayit = {
    baslangic: String(onceki.baslangic || new Date(zaman).toISOString()),
    ilkCevap: String(onceki.ilkCevap || ''),
    sonCevap: String(onceki.sonCevap || ''),
    tamamlandi: Boolean(onceki.tamamlandi),
    tamamlanma: String(onceki.tamamlanma || ''),
  };
  if (alan === 'ilkCevap' || alan === 'sonCevap') kayit[alan] = String(cevap || '').trim().slice(0, 6000);
  sonuc.rotalar[slug] = kayit;
  sonuc.aktif.rota = slug;
  gunuIsle(sonuc, zaman);
  return sonuc;
}

export function rotaBaslat(durum, slug, zaman = new Date()) {
  const sonuc = normallestir(durum);
  const onceki = nesneMi(sonuc.rotalar[slug]) ? sonuc.rotalar[slug] : {};
  sonuc.rotalar[slug] = {
    baslangic: String(onceki.baslangic || new Date(zaman).toISOString()),
    ilkCevap: String(onceki.ilkCevap || ''),
    sonCevap: String(onceki.sonCevap || ''),
    tamamlandi: Boolean(onceki.tamamlandi),
    tamamlanma: String(onceki.tamamlanma || ''),
  };
  sonuc.aktif.rota = slug;
  gunuIsle(sonuc, zaman);
  return sonuc;
}

export function rotaTamamla(durum, slug, zaman = new Date()) {
  const sonuc = rotaCevabiKaydet(durum, slug, 'sonCevap', durum.rotalar?.[slug]?.sonCevap || '', zaman);
  sonuc.rotalar[slug].tamamlandi = true;
  sonuc.rotalar[slug].tamamlanma ||= new Date(zaman).toISOString();
  return sonuc;
}

export function rotaIlerlemesi(durum, adimlar) {
  const temiz = normallestir(durum);
  const idler = Array.isArray(adimlar) ? adimlar : [];
  const tamam = idler.filter((id) => temiz.makaleler[id]?.tamamlandi).length;
  const baslanan = idler.find((id) => !temiz.makaleler[id]?.tamamlandi) || '';
  return { tamam, toplam: idler.length, siradaki: baslanan, oran: idler.length ? tamam / idler.length : 0 };
}

export function ozetle(durum, zaman = new Date()) {
  const temiz = normallestir(durum);
  const simdi = new Date(zaman).getTime();
  const makaleler = Object.entries(temiz.makaleler);
  const tamamlanan = makaleler.filter(([, k]) => k.tamamlandi).length;
  const baslanan = makaleler.filter(([, k]) => !k.tamamlandi && k.ilkAcilis).length;
  const tekrarlar = makaleler
    .filter(([, k]) => k.tamamlandi && k.sonrakiTekrar && new Date(k.sonrakiTekrar).getTime() <= simdi)
    .sort((a, b) => new Date(a[1].sonrakiTekrar).getTime() - new Date(b[1].sonrakiTekrar).getTime())
    .map(([id]) => id);
  const notlar = makaleler.filter(([, k]) => k.not || k.onceCevap || k.sonraCevap || k.kanitNotu).map(([id]) => id);
  const tamamlananRota = Object.values(temiz.rotalar).filter((r) => r.tamamlandi).length;

  let seri = 0;
  const gunler = new Set(temiz.gunler);
  const cursor = new Date(zaman);
  for (;;) {
    if (!gunler.has(gunDamgasi(cursor))) break;
    seri += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return { tamamlanan, baslanan, tekrarlar, notlar, tamamlananRota, seri };
}
