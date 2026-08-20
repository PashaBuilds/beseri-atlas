#!/usr/bin/env node
// Beşeri Atlas — otonom üretim hattının orkestratörü (§9).
//
//   BAŞLA
//     DURUM.md oku -> aktif faz, aktif parti, metrikler, bütçe
//     DÖNGÜ:
//       1. Bütçe kontrolü      -> aşıldıysa DURUM.md'ye yaz, temiz çık
//       2. Faz kapısı kontrolü -> geçildiyse fazı ilerlet, geçilmediyse onarım
//       3. Sonraki partiyi al  -> kuyruktan <=5 makale, bağımlılıkları çözülmüş
//       4. Üret / 5. Denetle   -> iş emri yaz, çalıştırıcıya devret
//       6. Karar ver           -> onayla / onar / karantinaya al
//       7. Commit + DURUM.md güncelle
//       8. Context sıfırla, DÖNGÜ'ye dön
//     BİTİR: rapor üret -> RAPOR.md
//
// Kullanım:
//   node otonom/orkestrator.mjs                 döngüyü sürdür (sıradaki işi üret)
//   node otonom/orkestrator.mjs --faz 2         yalnızca 2. fazı çalıştır
//   node otonom/orkestrator.mjs --kayit <id> --sonuc <onaylandi|onarimda|karantina>
//   node otonom/orkestrator.mjs --token <n>     harcanan token ekle
//   node otonom/orkestrator.mjs --kapi          faz kapısını şimdi ölç
import path from 'node:path';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';
import { KOK, oku, yaz, varMi, yamlOku, makaleleriTopla, RENK } from '../araclar/ortak.mjs';
import { kapilariCalistir } from '../araclar/kapilar.mjs';
import { metrikleriHesapla } from '../araclar/metrikler.mjs';

const DURUM_YOLU = path.join(KOK, 'DURUM.md');
const KUYRUK_YOLU = path.join(KOK, 'plan', 'kuyruk.yaml');
const IS_EMRI_YOLU = path.join(KOK, 'otonom', 'is-emri.md');
const KAPILAR = yamlOku(path.join(KOK, 'otonom', 'kapilar.yaml'));
const BUTCE = yamlOku(path.join(KOK, 'otonom', 'butce.yaml'));

// ─── DURUM.md — hattın hafızası ────────────────────────────────────────────

export function durumOku() {
  if (!varMi(DURUM_YOLU)) return varsayilanDurum();
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(oku(DURUM_YOLU));
  if (!m) throw new Error('DURUM.md bozuk: YAML frontmatter yok');
  return YAML.parse(m[1]);
}

function varsayilanDurum() {
  return {
    aktif_faz: 0, aktif_parti: 'B01', son_commit: null,
    son_guncelleme: new Date().toISOString(),
    sayaclar: { uretilen: 0, onaylanan: 0, karantinada: 0, onarim_dongusunde: 0 },
    metrikler: {
      kaynak_dogrulama_orani: null, ortalama_kaynak_sayisi: null,
      ornekleme_kapisi_son_skor: null, ornekleme_kapisi_son_calisma: null,
      ornekleme_kapisi_gecmisi: [],
    },
    butce: {
      makale_basina_max_deneme: BUTCE.limitler.makale_basina_max_deneme,
      faz_basina_max_parti: BUTCE.limitler.faz_basina_max_parti,
      toplam_token_tavani: BUTCE.limitler.toplam_token_tavani,
      harcanan_token: 0,
    },
    engeller: { ardisik_ayni_hata: 0, son_hata_imzasi: null, mudahale_gereken: 0 },
    onarim: { tur: 0, hedef_faz: null, kok_neden: null },
    faz_parti_sayaci: {},
  };
}

export function durumYaz(d) {
  d.son_guncelleme = new Date().toISOString();
  try {
    d.son_commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: KOK, encoding: 'utf8' }).trim();
  } catch { /* henuz commit yok */ }
  const s = d.sayaclar, m = d.metrikler;
  const govde = [
    '', '# DURUM — otonom döngünün hafızası', '',
    '> Bu dosya orkestratör tarafından yazılır. Elle düzenlenmez.',
    '> Hat durduğunda `npm run otonom` bu dosyayı okuyup aynı noktadan sürer.', '',
    `**Aktif faz:** ${d.aktif_faz} — ${KAPILAR.faz_kapsamlari[d.aktif_faz]?.ad || '-'}`,
    `**Aktif parti:** ${d.aktif_parti}`,
    `**Son güncelleme:** ${d.son_guncelleme}`,
    `**Son commit:** ${d.son_commit || '-'}`, '',
    '| Sayaç | Değer |', '|---|---|',
    `| Üretilen | ${s.uretilen} |`, `| Onaylanan | ${s.onaylanan} |`,
    `| Karantinada | ${s.karantinada} |`, `| Onarım döngüsünde | ${s.onarim_dongusunde} |`, '',
    '| Metrik | Değer | Eşik |', '|---|---|---|',
    `| Kaynak doğrulama oranı | ${m.kaynak_dogrulama_orani ?? '-'} | ${d.aktif_faz === 0 ? KAPILAR.faz_0.kaynak_dogrulama_orani_min : KAPILAR.faz_1_5.kaynak_dogrulama_orani_min} |`,
    `| Makale başına ortalama kaynak | ${m.ortalama_kaynak_sayisi ?? '-'} | ${KAPILAR.faz_0.makale_basina_kaynak_min} |`,
    `| Örnekleme kapısı son skor | ${m.ornekleme_kapisi_son_skor ?? '-'} | ${KAPILAR.ornekleme.uyari_esigi} |`, '',
    `**Bütçe:** ${d.butce.harcanan_token.toLocaleString('tr-TR')} / ${d.butce.toplam_token_tavani.toLocaleString('tr-TR')} token`,
    `**Ardışık aynı hata:** ${d.engeller.ardisik_ayni_hata} / ${BUTCE.limitler.ardisik_ayni_hata_max}`,
    `**Onarım turu:** ${d.onarim.tur} / ${BUTCE.limitler.onarim_turu_max}`, '',
  ].join('\n');
  yaz(DURUM_YOLU, `---\n${YAML.stringify(d, { lineWidth: 100 })}---\n${govde}`);
}

// ─── Kuyruk ────────────────────────────────────────────────────────────────

export function kuyrukOku() {
  const y = yamlOku(KUYRUK_YOLU);
  return y?.isler || [];
}
export function kuyrukYaz(isler) {
  yaz(KUYRUK_YOLU, `# plan/kuyruk.yaml — merkezi iş listesi (§9)\n# durum: bekliyor|uretiliyor|denetleniyor|onarimda|onaylandi|karantina\n\n${YAML.stringify({ isler }, { lineWidth: 100 })}`);
}

/** Bağımlılıkları çözülmüş, en fazla `parti_boyutu` kadar iş döndürür. */
export function sonrakiParti(isler, faz, boyut = BUTCE.limitler.parti_boyutu) {
  const bitmis = new Set(isler.filter((i) => i.durum === 'onaylandi').map((i) => i.id));
  return isler
    .filter((i) => i.faz === faz && (i.durum === 'bekliyor' || i.durum === 'onarimda'))
    .filter((i) => (i.bagimlilik || []).every((b) => bitmis.has(b)))
    .filter((i) => (i.deneme || 0) < BUTCE.limitler.makale_basina_max_deneme)
    .slice(0, boyut);
}

// ─── Faz kapısı ────────────────────────────────────────────────────────────

export async function fazKapisi(faz, { agKapilari = true } = {}) {
  const esik = faz === 0 ? KAPILAR.faz_0 : KAPILAR.faz_1_5;
  const makaleler = makaleleriTopla();
  const isler = kuyrukOku();
  const met = metrikleriHesapla({ makaleler, isler });
  const { gecti: buildGecti, raporlar } = await kapilariCalistir(agKapilari ? '--pre' : '--lint');

  const kontroller = [];
  const ekle = (ad, gercek, bekl, ok) => kontroller.push({ ad, gercek, bekl, ok });

  ekle('build kapıları', buildGecti ? 'hepsi geçti' : `${raporlar.filter((r) => !r.gecti).length} kapı kırıldı`, 'hepsi_gecmeli', buildGecti);
  ekle('kaynak doğrulama oranı', met.kaynak_dogrulama_orani ?? 0, `>= ${esik.kaynak_dogrulama_orani_min}`,
    (met.kaynak_dogrulama_orani ?? 0) >= esik.kaynak_dogrulama_orani_min);
  ekle('makale başına kaynak', met.ortalama_kaynak_sayisi ?? 0, `>= ${esik.makale_basina_kaynak_min}`,
    (met.ortalama_kaynak_sayisi ?? 0) >= esik.makale_basina_kaynak_min);
  ekle('karantina oranı', met.karantina_orani, `<= ${esik.karantina_orani_max}`, met.karantina_orani <= esik.karantina_orani_max);

  if (faz === 0) {
    const onayli = makaleler.filter((m) => m.fm.denetim_durumu === 'onaylandi');
    ekle('örnek makale sayısı', onayli.length, `>= ${esik.ornek_makale_sayisi}`, onayli.length >= esik.ornek_makale_sayisi);
    const tipler = new Set(onayli.map((m) => m.fm.tip));
    ekle('her tipten en az bir', `${tipler.size}/8 tip`, '8/8', tipler.size === 8);
    ekle('tasarım planı', varMi(path.join(KOK, 'plan', 'tasarim-plani.md')), 'true', varMi(path.join(KOK, 'plan', 'tasarim-plani.md')));
    const serit = path.join(KOK, 'src', 'components', 'ZamanSeridi.astro');
    ekle('zaman şeridi prototipi', varMi(serit), 'true', varMi(serit));
  } else {
    ekle('örnekleme kapısı', met.ornekleme_son ?? 'çalışmadı', `>= ${esik.ornekleme_kapisi_min}`,
      met.ornekleme_son === null || met.ornekleme_son >= esik.ornekleme_kapisi_min);
    ekle('çapraz çelişki', met.capraz_celiski, `<= ${esik.capraz_celiski_sayisi_max}`, met.capraz_celiski <= esik.capraz_celiski_sayisi_max);
  }

  const gecti = kontroller.every((k) => k.ok);
  return { gecti, kontroller, met };
}

function kapiYazdir(sonuc, faz) {
  console.log(RENK.kalin(`\n── FAZ ${faz} KAPISI ──`));
  for (const k of sonuc.kontroller) {
    const im = k.ok ? RENK.yesil('GECTI ') : RENK.kirmizi('KIRILDI');
    console.log(`  ${im} ${k.ad.padEnd(28)} ${String(k.gercek).padEnd(22)} (beklenen ${k.bekl})`);
  }
  console.log(sonuc.gecti ? RENK.yesil('\n  KAPI GECILDI\n') : RENK.kirmizi('\n  KAPI GECILMEDI -> onarim fazi\n'));
}

// ─── İş emri ───────────────────────────────────────────────────────────────

function sablonOku(ad) {
  return oku(path.join(KOK, 'otonom', 'oturum-sablonlari', `${ad}.md`));
}

/**
 * İş emri yazar. BAĞIMSIZLIK ŞARTI (İlke 6): denetim/çürütme/türetme emirleri
 * yalnızca makale yolunu ve kaynak URL'lerini taşır; üretim gerekçelerini,
 * araştırma notlarını veya önceki denetim çıktılarını ASLA taşımaz.
 */
export function isEmriYaz({ adim, isler, durum, ek = {} }) {
  const sablon = sablonOku(adim);
  const satirlar = [
    `<!-- Orkestratör tarafından üretildi: ${new Date().toISOString()} -->`,
    `<!-- Faz ${durum.aktif_faz} · Parti ${durum.aktif_parti} · Adım: ${adim} -->`,
    '', sablon, '', '---', '', '## Bu partideki işler', '',
  ];
  for (const i of isler) {
    satirlar.push(`### ${i.id}`);
    satirlar.push(`- tip: ${i.tip}`);
    satirlar.push(`- hedef dosya: \`icerik/${i.tip}/${i.id}.md\``);
    if (i.baslik) satirlar.push(`- başlık: ${i.baslik}`);
    if (i.yonerge) satirlar.push(`- yönerge: ${i.yonerge}`);
    if (adim === 'turetici' && ek.bloklu?.[i.id]) {
      satirlar.push(`- **BLOKE ALAN ADLARI (bu oturumda kullanılamaz):** ${ek.bloklu[i.id].join(', ')}`);
    }
    satirlar.push(`- deneme: ${(i.deneme || 0) + 1} / ${BUTCE.limitler.makale_basina_max_deneme}`);
    satirlar.push('');
  }
  satirlar.push('---', '', '## Bittiğinde', '', '```bash',
    ...isler.map((i) => `node otonom/orkestrator.mjs --kayit ${i.id} --sonuc <onaylandi|onarimda|karantina>`),
    '```', '');
  yaz(IS_EMRI_YOLU, satirlar.join('\n'));
  return IS_EMRI_YOLU;
}

// ─── Karar mekanizması (§10) ───────────────────────────────────────────────

export function kararVer({ hata, isaret, onarimTuru }) {
  if (hata === 0 && isaret <= 1) return 'onaylandi';
  if (hata >= 3 || onarimTuru >= BUTCE.limitler.onarim_turu_max) return 'karantina';
  if (hata >= 1 || isaret >= 2) return 'onarimda';
  return 'onaylandi';
}

export function karantinayaAl(id, tip, gerekce) {
  const kaynak = path.join(KOK, 'icerik', tip, `${id}.md`);
  const hedef = path.join(KOK, 'karantina', `${id}.md`);
  if (varMi(kaynak)) {
    const icerik = oku(kaynak);
    yaz(hedef, `<!-- KARANTINA ${new Date().toISOString()}\n     Gerekçe: ${gerekce}\n     Bu dosya kalıcı kayıttır, silinmez (§15). -->\n${icerik}`);
    fs.unlinkSync(kaynak);
  }
  const defter = path.join(KOK, 'denetim', 'karantina-defteri.jsonl');
  fs.mkdirSync(path.dirname(defter), { recursive: true });
  fs.appendFileSync(defter, `${JSON.stringify({ id, tip, gerekce, zaman: new Date().toISOString() })}\n`);
}

// ─── Ana döngü ─────────────────────────────────────────────────────────────

function butceKontrolu(d) {
  if (d.butce.harcanan_token >= d.butce.toplam_token_tavani) {
    console.log(RENK.sari('\nBÜTÇE TAVANI AŞILDI — temiz çıkış. DURUM.md kaldığı yeri kaydetti.'));
    durumYaz(d);
    return false;
  }
  return true;
}

function durdur(d, baslik, govde) {
  const yol = path.join(KOK, 'denetim', 'MUDAHALE-GEREKLI.md');
  const onceki = varMi(yol) ? oku(yol) : '# Müdahale defteri\n\nHattın çözemediği her şey burada toplanır. İnsan bunu **sonda** okur.\n';
  yaz(yol, `${onceki}\n## ${baslik}\n_${new Date().toISOString()}_\n\n${govde}\n`);
  d.engeller.mudahale_gereken += 1;
  durumYaz(d);
  console.log(RENK.kirmizi(`\nHAT DURDU: ${baslik}\n${govde}\n\ndenetim/MUDAHALE-GEREKLI.md yazıldı.`));
}

async function dongu(secilenFaz = null) {
  const d = durumOku();
  if (secilenFaz !== null) d.aktif_faz = secilenFaz;
  if (!butceKontrolu(d)) return 2;

  if (d.engeller.ardisik_ayni_hata >= BUTCE.limitler.ardisik_ayni_hata_max) {
    durdur(d, 'Ardışık aynı hata sınırı', `Aynı hata ${d.engeller.ardisik_ayni_hata} kez üst üste görüldü.\nSon hata imzası: \`${d.engeller.son_hata_imzasi}\``);
    return 3;
  }

  const isler = kuyrukOku();
  const parti = sonrakiParti(isler, d.aktif_faz);

  if (parti.length === 0) {
    // Faz bitmiş olabilir — kapıyı ölç.
    const sonuc = await fazKapisi(d.aktif_faz);
    kapiYazdir(sonuc, d.aktif_faz);
    d.metrikler.kaynak_dogrulama_orani = sonuc.met.kaynak_dogrulama_orani;
    d.metrikler.ortalama_kaynak_sayisi = sonuc.met.ortalama_kaynak_sayisi;

    if (sonuc.gecti) {
      d.onarim = { tur: 0, hedef_faz: null, kok_neden: null };
      if (d.aktif_faz >= 5) {
        console.log(RENK.yesil('\nTÜM FAZLAR TAMAMLANDI — npm run rapor\n'));
        durumYaz(d);
        return 0;
      }
      d.aktif_faz += 1;
      d.aktif_parti = `B${String((d.faz_parti_sayaci[d.aktif_faz] || 0) + 1).padStart(2, '0')}`;
      console.log(RENK.yesil(`\nFAZ İLERLEDİ -> ${d.aktif_faz}\n`));
      durumYaz(d);
      return 10; // cagirana: dongu devam etmeli
    }

    // Onarım fazı
    d.onarim.tur += 1;
    d.onarim.hedef_faz = d.aktif_faz;
    const kirilan = sonuc.kontroller.filter((k) => !k.ok).map((k) => k.ad).join(', ');
    d.onarim.kok_neden = kirilan;
    if (d.onarim.tur > BUTCE.limitler.onarim_turu_max) {
      durdur(d, `Faz ${d.aktif_faz} kapısı ${BUTCE.limitler.onarim_turu_max} onarım turunda geçilemedi`,
        `Kırılan kontroller: ${kirilan}\n\nBunun anlamı: sorun tek tek makalelerde değil, sistem tasarımındadır.\nDetay: \`denetim/kapi-sonucu.json\``);
      return 3;
    }
    console.log(RENK.sari(`\nONARIM FAZI ${d.onarim.tur}/${BUTCE.limitler.onarim_turu_max} — kök neden: ${kirilan}\n`));
    isEmriYaz({ adim: 'onarici', isler: isler.filter((i) => i.faz === d.aktif_faz && i.durum !== 'onaylandi'), durum: d, ek: { kirilan } });
    durumYaz(d);
    return 1;
  }

  // Parti var — üretim iş emri
  const sayac = (d.faz_parti_sayaci[d.aktif_faz] || 0) + 1;
  if (sayac > BUTCE.limitler.faz_basina_max_parti) {
    console.log(RENK.sari(`\nFaz ${d.aktif_faz} parti limiti aşıldı — faz zorla kapatılıyor, kalan iş karantinaya.`));
    for (const i of isler.filter((x) => x.faz === d.aktif_faz && x.durum !== 'onaylandi')) {
      i.durum = 'karantina';
      karantinayaAl(i.id, i.tip, 'faz parti limiti aşıldı');
    }
    kuyrukYaz(isler);
    durumYaz(d);
    return 10;
  }
  d.faz_parti_sayaci[d.aktif_faz] = sayac;
  d.aktif_parti = `B${String(sayac).padStart(2, '0')}`;
  for (const i of parti) if (i.durum === 'bekliyor') i.durum = 'uretiliyor';
  kuyrukYaz(isler);

  const yol = isEmriYaz({ adim: 'uretici', isler: parti, durum: d });
  durumYaz(d);
  console.log(RENK.kalin(`\nSIRADAKİ İŞ — Faz ${d.aktif_faz} · Parti ${d.aktif_parti}`));
  console.log(`  ${parti.length} makale: ${parti.map((i) => i.id).join(', ')}`);
  console.log(`  İş emri: ${path.relative(KOK, yol)}`);
  console.log(`  Çalıştırıcı: ${BUTCE.calistirici}\n`);
  return 1;
}

// ─── Kayıt ─────────────────────────────────────────────────────────────────

function kayit(id, sonuc, gerekce) {
  const d = durumOku();
  const isler = kuyrukOku();
  const is = isler.find((i) => i.id === id);
  if (!is) { console.error(`kuyrukta yok: ${id}`); process.exit(1); }
  is.deneme = (is.deneme || 0) + 1;

  if (sonuc === 'onaylandi') {
    is.durum = 'onaylandi';
    d.sayaclar.onaylanan += 1;
    d.engeller.ardisik_ayni_hata = 0;
  } else if (sonuc === 'onarimda') {
    if (is.deneme >= BUTCE.limitler.makale_basina_max_deneme) {
      is.durum = 'karantina';
      karantinayaAl(id, is.tip, gerekce || `${is.deneme} denemede onarılamadı`);
      d.sayaclar.karantinada += 1;
    } else {
      is.durum = 'onarimda';
      d.sayaclar.onarim_dongusunde += 1;
    }
  } else if (sonuc === 'karantina') {
    is.durum = 'karantina';
    karantinayaAl(id, is.tip, gerekce || 'denetimden geçemedi');
    d.sayaclar.karantinada += 1;
  }
  d.sayaclar.uretilen = isler.filter((i) => i.durum !== 'bekliyor').length;

  const imza = `${sonuc}:${(gerekce || '').slice(0, 60)}`;
  if (sonuc !== 'onaylandi') {
    d.engeller.ardisik_ayni_hata = imza === d.engeller.son_hata_imzasi ? d.engeller.ardisik_ayni_hata + 1 : 1;
    d.engeller.son_hata_imzasi = imza;
  }
  kuyrukYaz(isler);
  durumYaz(d);
  console.log(`kayit: ${id} -> ${is.durum} (deneme ${is.deneme})`);
}

// ─── Giriş ─────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const bayrak = (ad) => { const i = argv.indexOf(ad); return i >= 0 ? argv[i + 1] : null; };

if (argv.includes('--kayit')) {
  kayit(bayrak('--kayit'), bayrak('--sonuc') || 'onarimda', bayrak('--gerekce'));
} else if (argv.includes('--token')) {
  const d = durumOku();
  d.butce.harcanan_token += Number(bayrak('--token') || 0);
  durumYaz(d);
  console.log(`token: ${d.butce.harcanan_token.toLocaleString('tr-TR')} / ${d.butce.toplam_token_tavani.toLocaleString('tr-TR')}`);
} else if (argv.includes('--kapi')) {
  const d = durumOku();
  const faz = bayrak('--faz') !== null ? Number(bayrak('--faz')) : d.aktif_faz;
  const sonuc = await fazKapisi(faz);
  kapiYazdir(sonuc, faz);
  d.metrikler.kaynak_dogrulama_orani = sonuc.met.kaynak_dogrulama_orani;
  d.metrikler.ortalama_kaynak_sayisi = sonuc.met.ortalama_kaynak_sayisi;
  durumYaz(d);
  process.exit(sonuc.gecti ? 0 : 1);
} else if (argv.includes('--baslat')) {
  if (!varMi(DURUM_YOLU)) durumYaz(varsayilanDurum());
  console.log('DURUM.md hazır.');
} else {
  const faz = bayrak('--faz') !== null ? Number(bayrak('--faz')) : null;
  let kod = 10;
  let tur = 0;
  while (kod === 10 && tur < 8) { kod = await dongu(faz); tur += 1; }
  process.exit(kod === 10 ? 0 : kod);
}
