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
import { MATRIS_DIZINI, matrisOku, matrisiDogrula, sayaclariHesapla } from './matris.mjs';
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
  for (const id of matrisler) {
    const mat = matrisOku(id);
    if (!mat) continue;
    if (String(mat.hakem || '').startsWith('kor-hakem')) hakemli += 1;
    const s = sayaclariHesapla(mat.iddialar || []);
    for (const k of Object.keys(sayac)) sayac[k] += s[k];
    const d = matrisiDogrula(mat, harita.get(id) || null);
    if (d.gecerli) gecerli += 1;
    if (d.bayat) bayat += 1;
  }

  // Mekanik denetim raporlari (Gecis 2): atom sayaclari.
  const raporDizini = path.join(KOK, 'denetim', 'raporlar');
  let ok = 0, hata = 0, isaret = 0, atomsuz = 0, raporlu = 0;
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
          else if (sim === 'ATOMSUZ') atomsuz += 1;
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
    matris: { dosya: matrisler.length, gecerli, bayat, korHakemli: hakemli, sayac },
    atom: { raporlu, ok, hata, isaret, atomsuz },
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
  console.log(`mekanik atom katmani: ${f.atom.ok} OK · ${f.atom.hata} HATA · ${f.atom.isaret} ISARET · ${f.atom.atomsuz} ATOMSUZ (${f.atom.raporlu} rapor)`);
  console.log(`dil borcu: ${f.dil.kalipToplam} kalip gecisi / ${f.dil.kalipliDosya} dosya`);
  const kk = f.kaynak;
  console.log(`kaynak bilesimi (KAPI 13 olcumu): giris kapisi kuralini asan ${kk.kuralIhlali} makale · birincil kaynagi olmayan ${kk.birincilsiz} makale`);
  console.log(`                 giris kunyesi ${kk.toplamGiris} · birincil kunye ${kk.birincilKunye} / ${kk.toplamKunye}`);
}
