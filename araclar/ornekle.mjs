#!/usr/bin/env node
// ÖRNEKLEME KAPISI (§16) — hattın kendi kendini denetlemesi.
// Geçiş 4 protokolüyle üretilen sonucu okur, eşiğe vurur ve DURUM.md'ye yazar.
//
//   >= 0.95        Devam
//   0.90 – 0.95    Devam + RAPOR.md'ye uyarı, kaynak havuzu gözden geçirilir
//   <  0.90        HAT DURUR — denetim/MUDAHALE-GEREKLI.md yazılır
//
// Bu, projedeki tek koşulsuz durdurma kuralıdır.
import path from 'node:path';
import fs from 'node:fs';
import { KOK, varMi, yaz, RENK, oku } from './ortak.mjs';
import { metrikYaz, metrikDosyasi } from './metrikler.mjs';

const TURETME = path.join(KOK, 'denetim', 'raporlar', 'gecis4-turetme.json');

export function ornekleme() {
  if (!varMi(TURETME)) throw new Error('gecis4-turetme.json yok — once `npm run turet -- --karsilastir`');
  const r = JSON.parse(fs.readFileSync(TURETME, 'utf8'));
  const skor = r.skor;
  const davranis = skor === null ? 'olculemedi'
    : skor >= 0.95 ? 'devam'
      : skor >= 0.90 ? 'devam-uyari'
        : 'dur';
  return { skor, ham_skor: r.ham_skor, olculen: r.olculen, toplam: r.toplam_ornek,
    turetilemedi: r.turetilemedi, davranis,
    // Ham sayimlar; skordan geri hesaplanamaz. `dogrulanan = round(skor*olculen)`
    // 9 OK + 3 ISARET'i "11 dogrulandi" gibi gosteriyordu — kirilma sekli
    // (celiski mi, kismi dogrulama mi) raporda gorunmez oluyordu.
    ok: r.dogrulanan, isaret: r.isaret, hata: r.hata };
}

if (process.argv[1]?.endsWith('ornekle.mjs')) {
  const s = ornekleme();
  const gecmis = metrikDosyasi().ornekleme_gecmisi || [];
  gecmis.push({
    zaman: new Date().toISOString(), skor: s.skor, ham_skor: s.ham_skor,
    dogrulanan: s.ok, isaret: s.isaret, hata: s.hata, toplam: s.olculen,
    ornek_boyutu: s.toplam, turetilemedi: s.turetilemedi, davranis: s.davranis,
  });
  metrikYaz({ ornekleme_gecmisi: gecmis });

  // DURUM.md, hattin operasyonel durum dosyasidir. Kapi skoru buraya
  // yazilmazsa dosya "0.9583 / devam" gosterirken hat fiilen durmus olabilir —
  // yani durum dosyasi yalan soyler. Kapi kendi sonucunu kendisi yazar.
  const durumYolu = path.join(KOK, 'DURUM.md');
  if (varMi(durumYolu)) {
    let d = oku(durumYolu);
    d = d.replace(/^(  ornekleme_kapisi_son_skor: ).*$/m, `$1${s.skor}`);
    d = d.replace(/^(  ornekleme_kapisi_son_calisma: ).*$/m,
      `$1${new Date().toISOString()}\n  ornekleme_kapisi_karar: ${s.davranis}`);
    d = d.replace(/^  ornekleme_kapisi_karar: .*\n(?=  ornekleme_kapisi_karar: )/m, '');
    d = d.replace(/^(  ornekleme_kapisi_gecmisi:\n)(?:    - .*\n)+/m,
      `$1${gecmis.map((g) => `    - ${g.skor}`).join('\n')}\n`);
    yaz(durumYolu, d);
  }

  console.log(RENK.kalin('\n── ÖRNEKLEME KAPISI (§16) ──'));
  console.log(`  Ölçülen skor       : ${s.skor}  (${s.olculen} ölçülen iddia üzerinden)`);
  console.log(`  Ham skor           : ${s.ham_skor}  (${s.toplam} iddialık örneklem)`);
  console.log(`  Türetilemeyen      : ${s.turetilemedi}`);
  const im = s.davranis === 'devam' ? RENK.yesil('DEVAM')
    : s.davranis === 'devam-uyari' ? RENK.sari('DEVAM + UYARI')
      : RENK.kirmizi('HAT DURUR');
  console.log(`  Karar              : ${im}\n`);

  if (s.davranis === 'dur') {
    const yol = path.join(KOK, 'denetim', 'MUDAHALE-GEREKLI.md');
    const onceki = varMi(yol) ? oku(yol) : '# Müdahale defteri\n';
    yaz(yol, `${onceki}\n## Örnekleme kapısı kırıldı\n_${new Date().toISOString()}_\n\n`
      + `Ölçülen skor ${s.skor} < 0.90. Bu, projedeki tek koşulsuz durdurma kuralıdır (§16).\n`
      + `Doğrulama oranı bu eşiğin altındayken üretmeye devam etmek, doğrulanamayan\n`
      + `içerik hacmini büyütmekten başka bir şey yapmaz.\n`);
    process.exit(1);
  }
  process.exit(0);
}
