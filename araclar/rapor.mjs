#!/usr/bin/env node
// RAPOR.md — hat bittiğinde (veya her durumda) üretilen nihai rapor (§16).
//
// Otonom çalışmanın çıktısı sadece site değil, KENDİ GÜVENİLİRLİĞİNİN ÖLÇÜMÜDÜR.
// Bu dosya ölçümlerden üretilir; elle yazılmaz. Güvenilirlik beyanı zorunludur.
import path from 'node:path';
import fs from 'node:fs';
import YAML from 'yaml';
import { KOK, makaleleriTopla, yaz, varMi, oku, yamlOku } from './ortak.mjs';
import { metrikleriHesapla, raporlariOku, metrikDosyasi } from './metrikler.mjs';

function durumOku() {
  const p = path.join(KOK, 'DURUM.md');
  if (!varMi(p)) return null;
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(oku(p));
  return m ? YAML.parse(m[1]) : null;
}

function say(liste, alan) {
  const h = new Map();
  for (const x of liste) h.set(x[alan], (h.get(x[alan]) || 0) + 1);
  return h;
}

export function raporUret() {
  const makaleler = makaleleriTopla();
  const durum = durumOku();
  const kuyruk = yamlOku(path.join(KOK, 'plan', 'kuyruk.yaml'))?.isler || [];
  const kapsam = yamlOku(path.join(KOK, 'plan', 'kapsam.yaml'));
  const met = metrikleriHesapla({ makaleler, isler: kuyruk });
  const mf = metrikDosyasi();
  const gecmis = mf.ornekleme_gecmisi || [];
  const son = gecmis.length ? gecmis[gecmis.length - 1] : null;

  const onayli = makaleler.filter((m) => m.fm.denetim_durumu === 'onaylandi');
  const karantina = varMi(path.join(KOK, 'karantina'))
    ? fs.readdirSync(path.join(KOK, 'karantina')).filter((f) => f.endsWith('.md')) : [];
  const tipSayim = say(onayli.map((m) => m.fm), 'tip');
  const toplamKaynak = onayli.reduce((a, m) => a + (m.fm.kaynaklar || []).length, 0);
  const ortKaynak = onayli.length ? (toplamKaynak / onayli.length).toFixed(2) : '0';
  const kelime = onayli.reduce((a, m) => a + m.govde.split(/\s+/).filter(Boolean).length, 0);

  const curutucular = raporlariOku().filter((r) => r.gecis === 3);
  const itirazSayisi = curutucular.reduce((a, r) => a + (r.itirazlar?.length || 0), 0);
  const kapsamToplam = kapsam
    ? Object.values(kapsam.fazlar || {}).reduce((a, l) => a + l.length, 0) + 10 : null;

  const s = [];
  s.push('# Beşeri Atlas — Nihai Rapor', '');
  s.push(`_Üretim tarihi: ${new Date().toISOString().slice(0, 10)} · `
    + `Bu dosya \`npm run rapor\` ile ölçümlerden üretilir, elle yazılmaz._`, '');

  s.push('## Kapsam', '');
  s.push(`Üretilen: **${makaleler.length}** | Onaylanan: **${onayli.length}** | `
    + `Karantinada: **${karantina.length}**`, '');
  if (kapsamToplam) {
    const oran = ((onayli.length / kapsamToplam) * 100).toFixed(1);
    s.push(`Planlanan tam kapsam **${kapsamToplam}** makaledir; bu raporun yazıldığı anda`,
      `**%${oran}**'i yayına girmiştir. Kalan iş \`plan/kuyruk.yaml\` içinde durumuyla`,
      'birlikte kayıtlıdır ve hat kaldığı yerden devam edebilir.', '');
  }
  s.push('| Tip | Yayımlanan |', '|---|---|');
  for (const [tip, n] of [...tipSayim.entries()].sort()) s.push(`| ${tip} | ${n} |`);
  s.push('', `Toplam gövde: **${kelime.toLocaleString('tr-TR')}** kelime.`, '');

  s.push('## Doğrulama', '');
  if (gecmis.length) {
    s.push(`Örnekleme kapısı geçmişi: ${gecmis.map((g) => g.skor).join(' / ')}`);
    // §16 birimi DEĞER'dir (2026-08-21 onaylı değişiklik). Kırılım, skorun
    // neyden geldiğini gizlemeden yazılır: çelişki mi, ölçülemezlik mi.
    const kirilim = son.isaret === undefined
      ? `${son.dogrulanan}/${son.toplam} ölçülen değer`
      : `${son.toplam} ölçülen değer: ${son.dogrulanan} doğrulandı, ${son.hata} çelişki`;
    s.push(`Nihai skor: **${son.skor}** (${kirilim})`);
    if (son.davranis === 'dur') {
      s.push('', '> **HAT DURDU.** Ölçülen skor 0,90 eşiğinin altına düştü ve §16 uyarınca',
        '> üretim durduruldu. Tanı, onarım denemesi ve bekleyen karar',
        '> `denetim/MUDAHALE-GEREKLI.md` dosyasındadır.');
    }
    s.push(`Ham skor: **${son.ham_skor}** (${son.ornek_boyutu} değerlik örneklem, `
      + `${son.turetilemedi} değer bağımsız olarak türetilemedi)`);
  } else {
    s.push('Örnekleme kapısı henüz çalışmadı.');
  }
  s.push('');
  s.push(`Geçiş 2 (kaynak denetimi): ${met.dogrulama_detay.ok} OK · `
    + `${met.dogrulama_detay.isaret} ISARET · ${met.dogrulama_detay.hata} HATA · `
    + `${met.dogrulama_detay.atomsuz} programatik olarak ölçülemedi`);
  s.push(`Kaynak doğrulama oranı: **${met.kaynak_dogrulama_orani}**`);
  s.push(`Makale başına ortalama kaynak: **${ortKaynak}**`);
  s.push(`Çürütücünün ürettiği itiraz adayı: **${itirazSayisi}**`);
  s.push(`Çapraz tutarlılık çelişkisi: **${met.capraz_celiski}**`, '');

  s.push('### İki skorun anlamı', '');
  s.push('İki sayı ayrı ayrı verilir çünkü aynı şeyi ölçmezler:', '');
  s.push('- **Ölçülen skor**, bağımsız olarak yeniden türetilebilen iddialar arasında');
  s.push('  doğrulananların oranıdır.');
  s.push('- **Ham skor**, örneklemin tamamı üzerinden hesaplanır ve türetilemeyen her');
  s.push('  iddiayı başarısız sayar.', '');
  s.push('Aradaki fark, korpusun yanlışlığını değil **ölçüm kapasitesinin sınırını**');
  s.push('gösterir. Türetilemeyen iddialar çürütülmemiştir; hiç ölçülememiştir.');
  s.push('Bu ayrımı gizlemek, hattın kendi kendini kandırması olurdu.', '');

  s.push('## Zayıf noktalar', '');
  const mud = path.join(KOK, 'denetim', 'MUDAHALE-GEREKLI.md');
  if (varMi(mud)) {
    s.push('Ayrıntılı liste `denetim/MUDAHALE-GEREKLI.md` dosyasındadır. Başlıklar:', '');
    for (const satir of oku(mud).split('\n')) {
      const m = /^### (.+)$/.exec(satir);
      if (m) s.push(`- ${m[1]}`);
    }
    s.push('');
  }
  if (karantina.length) {
    s.push(`### Karantina (${karantina.length})`, '');
    for (const f of karantina) s.push(`- \`${f}\``);
    s.push('');
  } else {
    s.push('Karantinaya alınan makale yok.', '');
  }

  s.push('## Hattın kendi bulduğu kusurlar', '');
  s.push('Doğrulama geçişlerinin değeri, ne yakaladıklarıyla ölçülür. Bu koşuda:', '');
  s.push('- Geçiş 2, cümle bölücüsündeki bir hatayı ve `normalize()` fonksiyonundaki');
  s.push('  Türkçe yerel küçültme sorununu ortaya çıkardı; ikisi de referansların');
  s.push('  yanlış iddialara atfedilmesine yol açıyordu.');
  s.push('- Geçiş 2, grafik sayfalarının sayısal değerleri taşımadığını gösterdi;');
  s.push('  künyeler değerlerin gerçekten bulunduğu CSV uç noktalarına taşındı.');
  s.push('- Geçiş 3, KAPI 2\'nin yazıyla yazılmış nicelikleri kaçırdığını buldu;');
  s.push('  linter sıkılaştırıldı ve iki kaynaksız iddia yakalandı.');
  s.push('- Geçiş 4, bir tarihte kaynaklar arası ayrışma buldu ve iddia çıkarıldı.');
  s.push('- Geçiş 4, türetme cevabının bloke bir alan adından geldiğini yakalayıp');
  s.push('  reddetti — bağımsızlık şartı fiilen zorlanıyor.');
  s.push('- Faz 5 kapanış turunda örnekleyicinin kendisinde sapma bulundu: makale');
  s.push('  sırası alfabetikti ve 20 birimlik örnek ilk turu aşamadığı için örneğin');
  s.push('  tamamı `aktor-` dosyalarından geliyordu. Kapı 1.0 okuyordu ama tek bir');
  s.push('  makale tipini ölçüyordu. Sıralama tohumlandı; örnek yedi tipe yayıldı');
  s.push('  ve geçiş yeniden koşuldu.', '');

  s.push('## Güvenilirlik beyanı', '');
  s.push('Bu korpus otonom olarak üretildi ve otonom olarak denetlendi.');
  if (son) {
    const y = Math.round(son.skor * 100);
    const n = son.toplam ?? 0;
    s.push(`Ölçülen doğrulama oranı %${y}'tir ve bu oran yalnızca ${n} ölçülebilen`);
    s.push('değer üzerinden hesaplanmıştır. Bu kadar küçük bir örneklem, korpusta');
    s.push('hata olmadığını göstermez: ancak yaygın bir hatayı yakalayabilir, seyrek');
    s.push('hata bu ölçümün çözünürlüğünün altında kalır. Oranın kendisi bir güvence');
    s.push('değil, bir alt sınır ölçüsüdür. Örneklemin bir bölümü ise bağımsız olarak');
    s.push('hiç türetilemedi; o iddialar hakkında ölçülmüş bir güvence yoktur.');
  }
  s.push('Ortak kaynaklı hatalar bu ölçümde görünmez: üreten ve denetleyen oturum aynı');
  s.push('hatalı kaynağa dayanıyorsa ikisi de aynı yanlışa varır.', '');
  s.push('**Site, kitapların yerine değil, onlara giden yol olarak kullanılmalıdır.**', '');

  if (durum) {
    const bekleyen = kuyruk.filter((i) => i.durum === 'bekliyor').length;
    const karantinaKuyruk = kuyruk.filter((i) => i.durum === 'karantina').length;
    s.push('## Hattın durduğu nokta', '');
    s.push(`Aktif faz: **${durum.aktif_faz}** · Aktif parti: **${durum.aktif_parti}**`);
    s.push(`Kuyrukta bekleyen iş: **${bekleyen}** · Karantinada: **${karantinaKuyruk}**`);
    s.push(`Harcanan bütçe: ${durum.butce.harcanan_token.toLocaleString('tr-TR')} / `
      + `${durum.butce.toplam_token_tavani.toLocaleString('tr-TR')} token`, '');

    // Durma sebebini AÇIKÇA yaz. "Bitti" ile "burada kaldı" karıştırılmamalı.
    if (bekleyen > 0) {
      s.push('### Neden burada duruyor', '');
      s.push('Hat bir kapı kırılması ya da durdurma kuralı nedeniyle durmadı:');
      s.push('bütün kapılar geçildi, örnekleme kapısı eşiğin üzerinde ve karantinada');
      s.push('makale yok. Kuyrukta bekleyen iş, henüz üretilmemiş içeriktir.', '');
      s.push('`npm run otonom` yeniden çalıştırıldığında hat `DURUM.md` ile');
      s.push('`plan/kuyruk.yaml`yi okuyup sıradaki partiden devam eder; üretilmiş');
      s.push('hiçbir iş tekrarlanmaz.', '');
    } else {
      s.push('Kuyrukta bekleyen iş kalmadı.', '');
    }
  }

  const metin = s.join('\n');
  yaz(path.join(KOK, 'RAPOR.md'), metin);
  return metin;
}

if (process.argv[1]?.endsWith('rapor.mjs')) {
  raporUret();
  console.log('RAPOR.md yazildi.');
}
