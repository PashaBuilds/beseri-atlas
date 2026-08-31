// Butun linterlerin ve denetim gecislerinin paylastigi yardimcilar.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1'), '..');
export const ICERIK = path.join(KOK, 'icerik');
export const TIP_KLASORLERI = ['donem','olay','aktor','dusunur','kavram','tartisma','veri','kaynak'];

export function oku(p) { return fs.readFileSync(p, 'utf8'); }
export function yaz(p, s) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); }
export function varMi(p) { return fs.existsSync(p); }

export function yamlOku(p) {
  if (!varMi(p)) return null;
  return YAML.parse(oku(p));
}
export function yamlYaz(p, obj) { yaz(p, YAML.stringify(obj, { lineWidth: 100 })); }

/** Bir markdown dosyasini frontmatter + govde olarak ayirir. */
export function ayristir(metin, dosya) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(metin);
  if (!m) throw new Error(`${dosya}: frontmatter bulunamadi (--- ile baslamali)`);
  let fm;
  try { fm = YAML.parse(m[1]); } catch (e) { throw new Error(`${dosya}: frontmatter YAML hatasi — ${e.message}`); }
  return { fm: fm || {}, govde: m[2] || '', hamFm: m[1] };
}

/** icerik/ altindaki butun makaleleri toplar. karantina/ dahil degildir. */
export function makaleleriTopla({ tipler = TIP_KLASORLERI } = {}) {
  const cikti = [];
  for (const tip of tipler) {
    const klasor = path.join(ICERIK, tip);
    if (!varMi(klasor)) continue;
    for (const dosya of fs.readdirSync(klasor).filter((f) => f.endsWith('.md')).sort()) {
      const tam = path.join(klasor, dosya);
      const ham = oku(tam);
      try {
      const { fm, govde, hamFm } = ayristir(ham, dosya);
      cikti.push({ tip, dosya, yol: tam, goreli: `icerik/${tip}/${dosya}`, fm, govde, hamFm, ham });
      } catch (e) {
        cikti.push({ tip, dosya, yol: tam, goreli: `icerik/${tip}/${dosya}`, ayristirmaHatasi: e.message, fm: {}, govde: '', ham });
      }
    }
  }
  return cikti;
}

/** Govdeyi paragraflara boler; kod blogu, frontmatter ve tablo satirlarini disarida birakir. */
export function paragraflar(govde) {
  const temiz = govde.replace(/```[\s\S]*?```/g, '\n\n');
  return temiz.split(/\n\s*\n/).map((p, i) => ({ metin: p.trim(), sira: i })).filter((p) => p.metin.length > 0);
}

/** Bir metindeki [^k1] tarzi dipnot referanslarini dondurur. */
export function dipnotlar(metin) {
  return [...metin.matchAll(/\[\^(k\d+)\]/g)].map((m) => m[1]);
}

export const RENK = {
  kirmizi: (s) => `\x1b[31m${s}\x1b[0m`,
  yesil: (s) => `\x1b[32m${s}\x1b[0m`,
  sari: (s) => `\x1b[33m${s}\x1b[0m`,
  gri: (s) => `\x1b[90m${s}\x1b[0m`,
  kalin: (s) => `\x1b[1m${s}\x1b[0m`,
};

/** Kapi sonucu toplayici. */
export class Rapor {
  constructor(kapiAdi) { this.kapi = kapiAdi; this.hatalar = []; this.uyarilar = []; }
  hata(dosya, mesaj) { this.hatalar.push({ dosya, mesaj }); }
  uyari(dosya, mesaj) { this.uyarilar.push({ dosya, mesaj }); }
  get gecti() { return this.hatalar.length === 0; }
  yazdir() {
    const durum = this.gecti ? RENK.yesil('GECTI') : RENK.kirmizi('KIRILDI');
    console.log(`${durum}  ${this.kapi}  (${this.hatalar.length} hata, ${this.uyarilar.length} uyari)`);
    for (const h of this.hatalar) console.log(`   ${RENK.kirmizi('HATA')}  ${h.dosya}: ${h.mesaj}`);
    for (const u of this.uyarilar) console.log(`   ${RENK.sari('UYARI')} ${u.dosya}: ${u.mesaj}`);
  }
}

/**
 * Tek dosyalik linter CLI'si — YEDI ayri linterde tekrarlanmasin diye burada.
 *
 * Gerekce olculmus bir olaydir. 2026-08-30'da Avam Kamarasi hakemi
 * linter-dipnot, linter-kaynak, linter-ozet, linter-terim, linter-tekrar,
 * linter-savunan ve linter-link araclarini kendi dosyasiyla calistirdi ve
 * HICBIRI cikti vermedi: yedisinde de CLI blogu yoktu. Ajan "sessizce gecti"
 * ile "hic calismadi"yi ayirt edemiyordu. Ayni kusur daha once telif
 * linterinde de vardi ve orada bir hakemin telif denetimi sessizce
 * yapilmamisti.
 *
 * Ortak bir yardimci kullanilmasinin nedeni de bu depoda olculmus bir ders:
 * bir tanim iki yerde duruyorsa biri er gec yanlis olur. Yedi kopya yerine
 * tek bir tanim.
 */
export function linterCli(ad, denetimFn, { ozet } = {}) {
  const hepsi = makaleleriTopla();
  const secim = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const secilen = secim.length
    ? hepsi.filter((m) => secim.some((s) => s === m.fm?.id || m.goreli.endsWith(s)
      || s.endsWith(`${m.fm?.id}.md`) || m.dosya === s))
    : hepsi;
  if (secim.length && secilen.length === 0) {
    console.error(`${ad}: eslesen makale yok — ${secim.join(', ')}`);
    process.exit(2);
  }

  // DENETIM HER ZAMAN KORPUSUN TAMAMINDA KOSAR; yalnizca RAPOR daraltilir.
  //
  // Ilk surumde girdiyi daraltmistim ve bu, tam olarak duzeltmeye calistigim
  // kusurun aynisini uretti: linter-link kimlik dizinini kendisine verilen
  // listeden kuruyor, tek dosyayla cagrilinca kavram-lonca'nin ON bagini
  // birden "kirik ic link" ilan etti — oysa kavram-timar da otekiler de
  // korpusta duruyordu. Ayni tuzak borc defteri yazan denetimlerde daha da
  // agirdi: daraltilmis kosu defteri tek dosyayla yeniden kurardi.
  //
  // Anlami girdisine bagli olan bir olcume dar bir girdi vermek, olcumu
  // bozmaktir. Dogrusu tam girdiyle olcup ciktiyi suzmektir.
  const tam = denetimFn(hepsi);
  const uyar = (secilen.length !== hepsi.length);
  const suz = (liste) => (uyar
    ? liste.filter((x) => secilen.some((m) => m.goreli === x.dosya || m.fm?.id === x.dosya
      || String(x.dosya || '').endsWith(m.dosya)))
    : liste);

  const r = new Rapor(tam.kapi);
  for (const h of suz(tam.hatalar)) r.hata(h.dosya, h.mesaj);
  for (const u of suz(tam.uyarilar)) r.uyari(u.dosya, u.mesaj);
  r.yazdir();

  if (uyar) {
    console.log(`   [rapor ${secilen.length} dosyaya daraltildi; olcum korpusun tamaminda kostu]`);
    for (const satir of tam.ozetSatirlari || []) console.log(`   korpus geneli — ${satir}`);
    const disarida = tam.hatalar.length - r.hatalar.length;
    if (disarida > 0) {
      console.log(`   korpusun BASKA dosyalarinda ${disarida} hata var; bu kosuda sayilmadi`);
    }
  } else {
    for (const satir of tam.ozetSatirlari || []) console.log(`   ${satir}`);
    if (ozet) console.log(`   ${ozet(hepsi, tam)}`);
    console.log(`   olculen ${hepsi.length} makale`);
  }
  process.exit(r.gecti ? 0 : 1);
}
