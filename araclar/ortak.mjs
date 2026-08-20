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
        const { fm, govde } = ayristir(ham, dosya);
        cikti.push({ tip, dosya, yol: tam, goreli: `icerik/${tip}/${dosya}`, fm, govde, ham });
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
