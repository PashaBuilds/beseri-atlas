// Depo durumunun tek komutla olculmesi — sozlesmenin baslangic/bitis tablosu.
//
// Her sayi bir olcumden gelir; hicbiri elle yazilmaz. Cikti hem insan icin
// (metin) hem rapor icin (--json) uretilir.
//
//   node araclar/fotograf.mjs [--json]
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { KOK, makaleleriTopla } from './ortak.mjs';
import { kelimeSay, HEDEFLER } from './linter-derinlik.mjs';
import { kalipSay } from './linter-dil.mjs';
import { MATRIS_DIZINI, matrisOku, matrisiDogrula, sayaclariHesapla, cumleSadelestir } from './matris.mjs';
import { iddiaCumleleri } from './denetle.mjs';
import { kaynakDenetimi } from './linter-kaynak.mjs';

// Hedefler KAPI 11'in KENDI tablosundan gelir (sartname §3'ten birebir
// alinmis). Burada ikinci bir tablo tutmak, kelime sayimi ve "birincil"
// tanimlarinda yasanan ayrisma hatasinin ucuncusu olurdu. `veri` ve
// `kaynak` tiplerinde sartname hedef vermez; bu arac da uydurmaz.

export function fotograf() {
  const ms = makaleleriTopla();
  const tipler = {};
  let kunye = 0, kalipToplam = 0, kalipliDosya = 0;
  for (const m of ms) {
    const t = m.fm.tip;
    const n = kelimeSay(m.govde);
    const hedef = HEDEFLER[t]?.min ?? null;
    const k = Object.values(kalipSay(m.govde)).reduce((a, b) => a + b, 0);
    kunye += (m.fm.kaynaklar || []).length;
    kalipToplam += k;
    if (k > 0) kalipliDosya += 1;
    const g = (tipler[t] ||= { adet: 0, kelime: 0, hedefAlti: 0, acik: 0 });
    g.adet += 1; g.kelime += n;
    if (hedef !== null && n < hedef) { g.hedefAlti += 1; g.acik += hedef - n; }
  }

  // Matris katmani: kac makale hakemden gecmis ve gecerli.
  const matrisler = fs.existsSync(MATRIS_DIZINI)
    ? fs.readdirSync(MATRIS_DIZINI).filter((f) => f.endsWith('-matris.json')).map((f) => f.replace(/-matris\.json$/, ''))
    : [];
  const harita = new Map(ms.map((m) => [m.fm.id, m]));
  let gecerli = 0, bayat = 0, hakemli = 0;
  const sayac = { dogrudan: 0, kismi: 0, desteksiz: 0, olculemez: 0 };
  // Matris katmaninin IKI YONLU butunlugu. Ikisi de 2026-08-29'da olculdu
  // ve ikisi de sessizdi: sayaclar dogru gorunuyordu cunku olmayan iddia
  // sayilmaz, kayan cumle de hash'e takilmaz.
  //   kayanCumle : matriste kayitli ama govdede bulunamayan iddia cumlesi
  //   kaydsizCumle: govdede dipnotlu ama matriste kaydi olmayan cumle
  let kayanCumle = 0, kaydsizCumle = 0, dipnotluCumle = 0;
  // USTVERI KUNYESINE BAGLI DOGRUDAN DESTEK. Havuz kurali acik:
  // api.crossref.org ve api.semanticscholar.org kayitlari yazar/yil/baslik
  // iddialarina dogrudan destek olur; makalenin ICERIGI hakkindaki iddiaya
  // en fazla ozet duzeyinde KISMI. Bir hakem 2026-08-29'da bu kuralin
  // korpus capinda uygulanmadigini olctu ve bir dosyada 18 destegi
  // indirdi. Sayi mekanik olarak "ihlal" demek DEGILDIR — kunyenin kendisi
  // hakkindaki iddialar mesru sekilde dogrudan olabilir — ama gorunur
  // olmasi hakem turunun bakmasi gereken yeri isaret eder.
  let ustveriDogrudan = 0, ustveriToplam = 0;
  const sade = cumleSadelestir;
  for (const id of matrisler) {
    const mat = matrisOku(id);
    if (!mat) continue;
    if (String(mat.hakem || '').startsWith('kor-hakem')) hakemli += 1;
    const s = sayaclariHesapla(mat.iddialar || []);
    for (const k of Object.keys(sayac)) sayac[k] += s[k];
    const makale = harita.get(id) || null;
    const d = matrisiDogrula(mat, makale);
    if (d.gecerli) gecerli += 1;
    if (d.bayat) bayat += 1;
    if (makale) {
      kayanCumle += d.kayipCumle || 0;
      const ustveriAnahtar = new Set();
      for (const k of makale.fm.kaynaklar || []) {
        let h = '';
        try { h = new URL(k.url).hostname.replace(/^www\./, ''); } catch { /* url yok */ }
        if (h === 'api.crossref.org' || h === 'api.semanticscholar.org') ustveriAnahtar.add(k.anahtar);
      }
      if (ustveriAnahtar.size) {
        for (const i of mat.iddialar || []) {
          for (const kk of i.kaynaklar || []) {
            if (!ustveriAnahtar.has(kk.anahtar)) continue;
            ustveriToplam += 1;
            if (kk.destek === 'dogrudan') ustveriDogrudan += 1;
          }
        }
      }
      // Kapsama olcusu matris.mjs --eksik-iddia ile AYNI tanimi kullanir:
      // bir govde cumlesi, matristeki bir iddia cumlesi onun icinde geciyorsa
      // (ya da tersi) kapsanmis sayilir. Iki olcumun ayrisması 2026-08-29'da
      // gercek bir kalibrasyon hatasiydi.
      const kayitliCumleler = (mat.iddialar || []).map((i) => sade(i.cumle)).filter(Boolean);
      const cumleler = iddiaCumleleri(makale.govde);
      dipnotluCumle += cumleler.length;
      kaydsizCumle += cumleler.filter((c) => {
        const g = sade(c.cumle);
        return !kayitliCumleler.some((k) => g.includes(k) || k.includes(g));
      }).length;
    }
  }

  // Mekanik denetim raporlari (Gecis 2): atom sayaclari.
  const raporDizini = path.join(KOK, 'denetim', 'raporlar');
  let ok = 0, hata = 0, isaret = 0, atomsuz = 0, raporlu = 0;
  // IKI BORCUN KESISTIGI YER (2026-08-29 olcumu). Sablon cumleleri ("Atlas bu
  // X'i ayrica kaydeder.") olculebilir hicbir iddia tasimaz ama DIPNOT tasir —
  // yani tanimi geregi sus dipnotudurlar. Bu sayi, dil borcunun (KAPI 18)
  // olcum borcunun (ATOMSUZ) ne kadarini urettigini gosterir ve ikisinin ayni
  // onarim turuyla erecegini kanitlar.
  const SABLON = /(^|\s)Atlas\s|bu (dosya|makale)\b|ayrıca kaydeder|^Dosya,\s/i;
  let sablonAtomsuz = 0;
  if (fs.existsSync(raporDizini)) {
    for (const f of fs.readdirSync(raporDizini).filter((x) => x.endsWith('.json') && !x.endsWith('-curutucu.json'))) {
      try {
        const r = JSON.parse(fs.readFileSync(path.join(raporDizini, f), 'utf8'));
        raporlu += 1;
        for (const s of r.sonuclar || []) {
          const sim = s.durum;
          if (sim === 'OK') ok += 1;
          else if (sim === 'HATA') hata += 1;
          else if (sim === 'ISARET') isaret += 1;
          else if (sim === 'ATOMSUZ') {
            atomsuz += 1;
            if (SABLON.test(s.iddia || '')) sablonAtomsuz += 1;
          }
        }
      } catch { /* bozuk rapor sayilmaz */ }
    }
  }

  // Kaynak bilesimi KAPI 13'un KENDI olcumunden okunur, burada yeniden
  // hesaplanmaz. Ayni seyin iki tanimi olmasi bu depoda daha once gercek bir
  // hata uretti (kelime sayimi); "birincil"in tanimi da kapiya aittir:
  // kunyedeki `tur` alanina degil, havuzda birincil ilan edilmis ALAN ADINA
  // bakar ve veri makalelerinde veri serilerini de birincil sayar.
  const kaynakOlcum = kaynakDenetimi(ms, { borcDefteriYaz: false }).olcum || {};

  let commit = null;
  try { commit = execSync('git rev-parse --short HEAD', { cwd: KOK }).toString().trim(); } catch { /* git yok */ }

  return {
    zaman: new Date().toISOString().slice(0, 10),
    commit,
    makale: ms.length,
    kunye,
    tipler,
    hedefAlti: Object.values(tipler).reduce((a, g) => a + g.hedefAlti, 0),
    toplamAcik: Object.values(tipler).reduce((a, g) => a + g.acik, 0),
    dil: { kalipToplam, kalipliDosya },
    matris: { dosya: matrisler.length, gecerli, bayat, korHakemli: hakemli, sayac, kayanCumle, kaydsizCumle, dipnotluCumle, ustveriDogrudan, ustveriToplam },
    atom: { raporlu, ok, hata, isaret, atomsuz, sablonAtomsuz },
    kaynak: kaynakOlcum,
  };
}

if (process.argv[1]?.endsWith('fotograf.mjs')) {
  const f = fotograf();
  if (process.argv.includes('--json')) { console.log(JSON.stringify(f, null, 2)); process.exit(0); }
  console.log(`# Depo fotografi — ${f.zaman} (${f.commit})\n`);
  console.log(`makale ${f.makale} · kunye ${f.kunye} · hedef alti ${f.hedefAlti} · toplam acik ${f.toplamAcik.toLocaleString('tr')} kelime\n`);
  console.log('tip        adet  hedef alti   acik kelime');
  for (const [t, g] of Object.entries(f.tipler).sort((a, b) => b[1].acik - a[1].acik)) {
    console.log(`${t.padEnd(10)} ${String(g.adet).padStart(4)} ${String(g.hedefAlti).padStart(11)} ${String(g.acik).padStart(13)}`);
  }
  console.log(`\nkor hakemden gecmis makale: ${f.matris.korHakemli} · gecerli matris ${f.matris.gecerli}/${f.matris.dosya} · bayat ${f.matris.bayat}`);
  const s = f.matris.sayac;
  console.log(`hakem katmani iddialari: ${s.dogrudan} dogrudan · ${s.kismi} kismi · ${s.desteksiz} desteksiz · ${s.olculemez} olculemez`);
  console.log(`matris butunlugu: ${f.matris.kayanCumle} kayan cumle (matriste var, govdede yok) · `
    + `${f.matris.kaydsizCumle}/${f.matris.dipnotluCumle} dipnotlu cumle matriste kaydsiz`);
  console.log(`ustveri kunyesi (crossref/s2) destegi: ${f.matris.ustveriDogrudan}/${f.matris.ustveriToplam} `
    + 'dogrudan isaretli — kunye hakkindaki iddia dogrudan olabilir, ICERIK iddiasi en fazla kismi');
  console.log(`mekanik atom katmani: ${f.atom.ok} OK · ${f.atom.hata} HATA · ${f.atom.isaret} ISARET · ${f.atom.atomsuz} ATOMSUZ (${f.atom.raporlu} rapor)`);
  console.log((`  ATOMSUZ'un ${f.atom.sablonAtomsuz} tanesi sablon cumlesidir ("Atlas bu X'i ayrica kaydeder.") — olculebilir iddia tasimaz ama dipnot tasir; dil borcuyla ayni onarim turunde erir`));
  console.log(`dil borcu: ${f.dil.kalipToplam} kalip gecisi / ${f.dil.kalipliDosya} dosya`);
  const kk = f.kaynak;
  console.log(`kaynak bilesimi (KAPI 13 olcumu): giris kapisi kuralini asan ${kk.kuralIhlali} makale · birincil kaynagi olmayan ${kk.birincilsiz} makale`);
  console.log(`                 giris kunyesi ${kk.toplamGiris} · birincil kunye ${kk.birincilKunye} / ${kk.toplamKunye}`);
}
