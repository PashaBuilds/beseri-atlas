#!/usr/bin/env node
// BOSLUK — atlasin kendi icinden olculen genisleme kuyrugu.
//
// Gerekce: "3000 makaleye cikalim" bir sayi hedefidir ve tek basina kaliteyi
// dusurur; hangi makalenin yazilacagini o hedef secemez. Bu arac, yazilacak
// makaleyi TAHMIN etmez, OLCER: atlasin halihazirda adini andigi, bir iddiaya
// dayanak yaptigi ya da kutugune yazdigi, ama dosyasi olmayan konulari sayar.
// Her aday, VAR OLAN bir dosyanin yarim kalmasina neden olan bir bosluktur.
//
// Kullanim:
//   node araclar/bosluk.mjs                 # ozet + ilk 40 aday
//   node araclar/bosluk.mjs --hepsi         # butun adaylar
//   node araclar/bosluk.mjs --tur kutuk     # tek kanal
//   node araclar/bosluk.mjs --json          # makine okunur
//
// Kanallar (kanit gucune gore siralanmistir):
//   kutuk   — savunanlar.yaml'da POZISYONU dogrulanmis bir kisi; atlas onun
//             bir gorusu savundugunu soyluyor ama kendisini hic tanitmiyor.
//   terim   — terimler.yaml'da kilitli bir terim; sozluk onu atlasin ortak
//             dili sayiyor ama kavram dosyasi yok.
//   sarkan  — bir dosyanin `ilgili` listesinde ya da ::tartismali haritasinda
//             gecen, var olmayan id. Okur o baga tiklarsa hicbir yere varmaz.
//   ad      — govdelerde birden cok dosyada gecen, dosyasi olmayan ozel ad.
//             En gurultulu kanal; esik yuksek tutulur ve aday olarak isaretlenir,
//             kesin bulgu sayilmaz.

import { makaleleriTopla, yamlOku, varMi, RENK, KOK } from './ortak.mjs';
import path from 'node:path';

const ESIK_AD = 4; // bir ad en az kac AYRI dosyada gecerse aday sayilir

// Cografi bolge adlari `bolge` semasinin degerleridir, makale konusu degil.
// "Dogu Asya" 38 dosyada geciyor ama bir aktor makalesi olamaz.
const BOLGE_KALIBI = /^(Kuzey|G[uü]ney|Do[gğ]u|Bat[iı]|Orta|G[uü]neydo[gğ]u|G[uü]neybat[iı]|Kuzeydo[gğ]u|Kuzeybat[iı])\s+(Asya|Afrika|Avrupa|Amerika|Anadolu|Akdeniz|Atlantik|Pasifik)$|^(Asya|Afrika|Avrupa|Amerika|Okyanusya|Latin Amerika)$/;

// Buyuk harfle baslayan her sozcuk ozel ad degil. Cumle basi, kilitli terimler,
// kurum sozcukleri ve ay/gun adlari elenir. Liste eksik kaldiginda sonuc
// gurultulenir ama yanlis olmaz — bu kanal zaten "aday" olarak isaretlidir.
const ELE = new Set([
  'Bu', 'Bir', 'Ama', 'Ancak', 'Cunku', 'Çünkü', 'Ne', 'Her', 'Hem', 'Ise', 'İse',
  'Yine', 'Once', 'Önce', 'Sonra', 'Simdi', 'Şimdi', 'Boyle', 'Böyle', 'Oyle', 'Öyle',
  'Iki', 'İki', 'Uc', 'Üç', 'Dort', 'Dört', 'Bes', 'Beş', 'On', 'Yuz', 'Yüz', 'Bin',
  'Ocak', 'Subat', 'Şubat', 'Mart', 'Nisan', 'Mayis', 'Mayıs', 'Haziran', 'Temmuz',
  'Agustos', 'Ağustos', 'Eylul', 'Eylül', 'Ekim', 'Kasim', 'Kasım', 'Aralik', 'Aralık',
  'Pazartesi', 'Sali', 'Salı', 'Carsamba', 'Çarşamba', 'Persembe', 'Perşembe', 'Cuma',
  'Cumartesi', 'Pazar', 'Kaynak', 'Not', 'Ozet', 'Özet', 'Atlas', 'Ilke', 'İlke',
  'Nasil', 'Nasıl', 'Neden', 'Kim', 'Hangi', 'Butun', 'Bütün', 'Cok', 'Çok', 'Az',
  'Daha', 'Kendi', 'Ayni', 'Aynı', 'Baska', 'Başka', 'Sadece', 'Yalniz', 'Yalnız',
  'Buna', 'Bunun', 'Onun', 'Onlarin', 'Onların', 'Ilk', 'İlk', 'Son', 'Yeni', 'Eski',
]);

/** Bir baslik/addan olasi id govdesi uretir (yalnizca eslestirme icin). */
export function adiSadelestir(ad) {
  return String(ad)
    .normalize('NFC')
    .toLocaleLowerCase('tr')
    .replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Kisi adi mi, yoksa bir cizgi/okul/yaklasim adi mi? Kutukte `kisi-degil`
// isaretlenmesi gereken ama isaretlenmemis kayitlari ayirmak icin.
const KISI_DEGIL_SOZCUK = /\b(yaklas[iı]m[iı]?|gelene[gğ]i|[cç]izgi(si)?|okulu?|kuram[iı]?|tez(i)?|ekol|perspektif|analiz(i)?|[cç][oö]z[uü]mleme(si)?|yorum(u)?|bak[iı][sş](_?a[cç][iı]s[iı])?|literat[uü]r[uü]?|arast[iı]rmalar[iı]?|tarih[cç]ili[gğ]i|iktisat[cç][iı]lar[iı]?|kolu)\b/i;
export function kisiAdiMi(ad) {
  const s = String(ad).trim();
  if (KISI_DEGIL_SOZCUK.test(s)) return false;
  // Ad parcaciklari kucuk harfle yazilir ve kisi adini bozmaz:
  // "Bartolome de las Casas", "Leopold von Ranke", "Ibn Haldun".
  const PARCACIK = /^(de|del|della|di|da|do|dos|das|du|la|las|le|les|los|van|von|der|den|bin|ibn|al|el|abu|ben|ter|zu|of|y)$/i;
  const sozcukler = s.split(/\s+/).filter((w) => !PARCACIK.test(w));
  if (!sozcukler.length) return false;
  const buyuk = sozcukler.filter((w) => /^[A-ZÇĞİÖŞÜ]/.test(w)).length;
  return buyuk >= Math.max(1, sozcukler.length - 1);
}

/** Bir ad korpusta zaten bir dosyayla karsilaniyor mu? */
function karsilaniyorMu(ad, dizin) {
  const s = adiSadelestir(ad);
  if (!s) return true;
  if (dizin.has(s)) return true;
  // Soyad eslesmesi: "James Fitzjames Stephen" -> "stephen"
  const parcalar = s.split(' ').filter((p) => p.length > 2);
  const soyad = parcalar[parcalar.length - 1];
  if (soyad && dizin.has(soyad)) return true;
  // Baslik icinde tam gecis: "kavram-zarar-ilkesi" icinde "zarar ilkesi"
  for (const k of dizin) if (k.includes(s) || (s.length > 8 && s.includes(k))) return true;
  return false;
}

export function bosluklariOlc() {
  const makaleler = makaleleriTopla();
  const idler = new Set(makaleler.map((m) => m.fm?.id).filter(Boolean));

  // Eslestirme dizini: id govdesi + baslik, ikisi de sadelestirilmis.
  const dizin = new Set();
  for (const m of makaleler) {
    const id = String(m.fm?.id || '');
    dizin.add(adiSadelestir(id.replace(/^(donem|olay|aktor|dusunur|kavram|tartisma|veri|kaynak)-/, '')));
    if (m.fm?.baslik) dizin.add(adiSadelestir(m.fm.baslik));
  }
  dizin.delete('');

  const adaylar = [];

  // --- Kanal 1: savunanlar kutugu ---
  const kutukYolu = path.join(KOK, 'icerik/_sistem/savunanlar.yaml');
  if (varMi(kutukYolu)) {
    const kutuk = yamlOku(kutukYolu) || {};
    const kayitlar = Array.isArray(kutuk.adlar) ? kutuk.adlar
      : Array.isArray(kutuk) ? kutuk
        : Object.entries(kutuk).filter(([, v]) => v && typeof v === 'object').map(([ad, v]) => ({ ad, ...v }));
    for (const k of kayitlar) {
      const ad = k?.ad || k?.isim;
      if (!ad) continue;
      if (k?.durum === 'kisi-degil') continue;
      // Kutukte KISI olarak duran ama kisi adi olmayan kayitlar var
      // ("anlati cozumlemesi yaklasimi", "Belge merkezli tarihcilik gelenegi").
      // Bunlar makale adayi degil, kutuk KUSURUDUR — ayri bildirilir.
      if (!kisiAdiMi(ad)) {
        adaylar.push({
          tur: 'kutuk-kusuru', aday: ad, onerilenTip: '-',
          kanit: `kutukte durum=${k.durum} ile duruyor ama kisi adi degil — kayit \`kisi-degil\` olmali`,
          gecenDosya: (k.gectigi || []).join(', ') || null, guc: 5,
        });
        continue;
      }
      if (karsilaniyorMu(ad, dizin)) continue;
      // Yuk tasima gucu: ad kac AYRI dosyada bir pozisyon tasiyor?
      const gectigi = Array.isArray(k.gectigi) ? k.gectigi : [];
      if (k.durum !== 'dogrulandi' || gectigi.length < 2) continue;
      adaylar.push({
        tur: 'kutuk',
        aday: ad,
        onerilenTip: 'dusunur',
        kanit: `${gectigi.length} dosyada pozisyonu dogrulanmis olarak aniliyor, kendi dosyasi yok`,
        gecenDosya: gectigi.slice(0, 3).join(', '),
        guc: 2 + Math.min(3, gectigi.length - 1),
      });
    }
  }

  // --- Kanal 2: kilitli terimler ---
  const terimYolu = path.join(KOK, 'icerik/_sistem/terimler.yaml');
  if (varMi(terimYolu)) {
    const t = yamlOku(terimYolu) || {};
    const kayitlar = Array.isArray(t.terimler) ? t.terimler
      : Object.entries(t.terimler || {}).map(([tr, v]) => (typeof v === 'object' ? { tr, ...v } : { tr }));
    for (const k of kayitlar) {
      const ad = k?.tr || k?.terim || k?.ad;
      if (!ad) continue;
      if (k?.kullanim === 'tercih_edilen') continue; // yazim birligi kaydi, kavram degil
      if (karsilaniyorMu(ad, dizin)) continue;
      adaylar.push({
        tur: 'terim',
        aday: ad,
        onerilenTip: 'kavram',
        kanit: `kilitli terim sozlugunde (kullanim=${k.kullanim || 'bilinmiyor'}), kavram dosyasi yok`,
        gecenDosya: null,
        guc: 2,
      });
    }
  }

  // --- Kanal 3: sarkan baglar ---
  for (const m of makaleler) {
    for (const ref of m.fm?.ilgili || []) {
      if (!idler.has(ref)) {
        adaylar.push({
          tur: 'sarkan', aday: ref, onerilenTip: String(ref).split('-')[0],
          kanit: `${m.goreli} dosyasinin \`ilgili\` listesinde, karsiligi yok`,
          gecenDosya: m.goreli, guc: 4,
        });
      }
    }
    for (const e of m.govde.matchAll(/harita=([a-z0-9-]+)/g)) {
      if (!idler.has(e[1])) {
        adaylar.push({
          tur: 'sarkan', aday: e[1], onerilenTip: String(e[1]).split('-')[0],
          kanit: `${m.goreli} icindeki ::tartismali haritasi, karsiligi yok`,
          gecenDosya: m.goreli, guc: 4,
        });
      }
    }
  }

  // --- Kanal 4: govdelerde gecen dosyasiz ozel adlar ---
  const adSayaci = new Map(); // ad -> Set(dosya)
  for (const m of makaleler) {
    // Dipnot tanimlarini ve kunye bloklarini disarida birak: oralarda gecen
    // adlar yazar adlaridir, konu degil.
    const govde = m.govde.replace(/^\[\^k\d+\]:.*$/gm, '').replace(/`[^`]*`/g, '');
    // Iki ya da uc buyuk harfli sozcugun ard arda gelmesi: kisi/yer adi kalibi.
    // DIKKAT: JavaScript'te \b ASCII tabanlidir — "Kamarasi"nin sonundaki 'i'
    // sozcuk disi sayilir ve ad "Avam Kamaras" diye kirpilir. Sinir bu yuzden
    // elle yazilir: once/sonra Turkce harf GELMEMELI.
    const AD_KALIBI = /(?<![.!?]\s)(?<!^)(?<![A-Za-zÇĞİÖŞÜçğıöşü])([A-ZÇĞİÖŞÜ][a-zçğıöşü]{2,}(?:[^\S\r\n]+[A-ZÇĞİÖŞÜ][a-zçğıöşü]{2,}){1,2})(?![A-Za-zÇĞİÖŞÜçğıöşü])/gm;
    for (const e of govde.matchAll(AD_KALIBI)) {
      const ad = e[1].trim();
      if (ad.split(/\s+/).some((w) => ELE.has(w))) continue;
      if (BOLGE_KALIBI.test(ad)) continue; // cografi bolge, makale konusu degil
      if (!adSayaci.has(ad)) adSayaci.set(ad, new Set());
      adSayaci.get(ad).add(m.goreli);
    }
  }
  for (const [ad, dosyalar] of adSayaci) {
    if (dosyalar.size < ESIK_AD) continue;
    if (karsilaniyorMu(ad, dizin)) continue;
    adaylar.push({
      tur: 'ad', aday: ad, onerilenTip: 'aktor',
      kanit: `${dosyalar.size} ayri dosyada geciyor, kendi dosyasi yok`,
      gecenDosya: [...dosyalar].slice(0, 3).join(', '),
      guc: Math.min(3, 1 + Math.floor(dosyalar.size / 6)),
    });
  }

  // Ayni aday birden cok kanaldan gelebilir: kanitlari birlestir, gucu topla.
  const birlesik = new Map();
  for (const a of adaylar) {
    const anahtar = `${a.tur}::${adiSadelestir(a.aday)}`;
    if (!birlesik.has(anahtar)) birlesik.set(anahtar, { ...a, kez: 1 });
    else {
      const v = birlesik.get(anahtar);
      v.kez += 1; v.guc += 1;
      if (v.gecenDosya && a.gecenDosya && !v.gecenDosya.includes(a.gecenDosya)) v.gecenDosya += `, ${a.gecenDosya}`;
    }
  }

  const sirali = [...birlesik.values()].sort((x, y) => y.guc - x.guc || x.aday.localeCompare(y.aday, 'tr'));
  return { makaleSayisi: makaleler.length, adaylar: sirali };
}

function cli() {
  const argv = process.argv.slice(2);
  const bilinen = new Set(['--hepsi', '--json', '--tur', '--yardim', '-h']);
  const bilinmeyen = argv.filter((a) => a.startsWith('-') && !bilinen.has(a));
  if (bilinmeyen.length || argv.includes('--yardim') || argv.includes('-h')) {
    if (bilinmeyen.length) console.error(`bilinmeyen secenek: ${bilinmeyen.join(' ')}`);
    console.log('kullanim: node araclar/bosluk.mjs [--hepsi] [--json] [--tur kutuk|terim|sarkan|ad]');
    process.exit(bilinmeyen.length ? 2 : 0);
  }
  const turIdx = argv.indexOf('--tur');
  const tur = turIdx >= 0 ? argv[turIdx + 1] : null;

  const { makaleSayisi, adaylar } = bosluklariOlc();
  const suzulmus = tur ? adaylar.filter((a) => a.tur === tur) : adaylar;

  if (argv.includes('--json')) {
    console.log(JSON.stringify({ makaleSayisi, adaylar: suzulmus }, null, 2));
    return;
  }

  const sayim = new Map();
  for (const a of adaylar) sayim.set(a.tur, (sayim.get(a.tur) || 0) + 1);

  console.log(RENK.kalin('BOSLUK — atlasin kendi icinden olculen genisleme kuyrugu'));
  console.log(RENK.gri(`${makaleSayisi} makale tarandi · ${adaylar.length} aday`));
  for (const [t, n] of [...sayim].sort((a, b) => b[1] - a[1])) {
    console.log(RENK.gri(`  ${t.padEnd(8)} ${String(n).padStart(4)}`));
  }
  console.log(RENK.gri('\n"sarkan" kanali kesin bulgudur: bag var, karsiligi yok.'));
  console.log(RENK.gri('"kutuk" kanali, atlasin bir gorus yukledigi ama tanitmadigi kisilerdir;'));
  console.log(RENK.gri('yuk gucu `gectigi` alanindaki dosya sayisiyla olculur.'));
  console.log(RENK.gri('"kutuk-kusuru" bir makale adayi DEGIL, kutugun duzeltilmesi gereken kaydidir.'));
  console.log(RENK.gri('"ad" ve "terim" kanallari ADAYDIR — tek tek bakilmalidir.\n'));

  const gosterilecek = argv.includes('--hepsi') ? suzulmus : suzulmus.slice(0, 40);
  for (const a of gosterilecek) {
    console.log(`${RENK.kalin(String(a.guc).padStart(2))} ${a.tur.padEnd(7)} ${a.aday}`);
    console.log(RENK.gri(`     -> ${a.onerilenTip} · ${a.kanit}`));
  }
  if (!argv.includes('--hepsi') && suzulmus.length > gosterilecek.length) {
    console.log(RENK.gri(`\n... ${suzulmus.length - gosterilecek.length} aday daha (--hepsi)`));
  }
}

if (process.argv[1] && process.argv[1].endsWith('bosluk.mjs')) cli();
