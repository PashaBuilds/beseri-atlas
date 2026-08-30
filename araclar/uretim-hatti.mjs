#!/usr/bin/env node
// Yeni makale üretim hattı.
//
// Amaç daha çok taslak üretmek değil, araştırma darboğazını görünür ve
// paralellenebilir iş paketlerine çevirmektir. Her aday daha yazılmadan önce:
//   - hangi öğrenme sorusunu çözeceğini,
//   - korpusa hangi benzersiz katkıyı yapacağını,
//   - hangi anlatı biçimini kullanacağını,
//   - hangi birincil kanıta ihtiyaç duyduğunu
// taşır. Yayın kararı yalnız 10/10 kalite ve bağımsız kör hakemden sonra gelir.
//
// Kullanım:
//   node araclar/uretim-hatti.mjs --durum
//   node araclar/uretim-hatti.mjs --parti 5
//   node araclar/uretim-hatti.mjs --partileri-hazirla 5
//   node araclar/uretim-hatti.mjs --paket <id>
//   node araclar/uretim-hatti.mjs --kontrol <id>
//   node araclar/uretim-hatti.mjs --kaynak-kontrol [id]
//   node araclar/uretim-hatti.mjs --kapi
import fs from 'node:fs';
import path from 'node:path';
import { KOK, Rapor, makaleleriTopla, yamlOku, yaz, RENK } from './ortak.mjs';
import { getir } from './getir.mjs';
import { makaleKalitesi } from './linter-ogrenme-cekirdegi.mjs';

export const URETIM_KUYRUGU = path.join(KOK, 'plan', 'uretim-kuyrugu.yaml');
export const PAKET_DIZINI = path.join(KOK, 'plan', 'uretim-paketleri');
export const PARTI_DIZINI = path.join(KOK, 'plan', 'uretim-partileri');
export const PARTI_MANIFESTI = path.join(PARTI_DIZINI, 'manifest.json');
export const KAYNAK_RAPORU = path.join(KOK, 'denetim', 'uretim-kaynak-kontrol.json');

const SOMUT_TIPLER = new Set(['olay', 'aktor', 'dusunur', 'kaynak']);
const ZORUNLU_BOLGELER = ['okyanusya', 'afrika', 'amerika', 'bati-asya', 'orta-asya', 'guney-asya'];

function alanAdi(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

export function uretimKuyruguOku() {
  const veri = yamlOku(URETIM_KUYRUGU);
  return { ...veri, adaylar: veri?.adaylar || [] };
}

function basliklar(govde) {
  return [...String(govde || '').matchAll(/^#{2,4}\s+(.+)$/gm)]
    .map((m) => m[1].toLocaleLowerCase('tr-TR')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9çğıöşü\s-]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  if (!A.size || !B.size) return 0;
  const ortak = [...A].filter((x) => B.has(x)).length;
  return ortak / new Set([...A, ...B]).size;
}

/** En benzer bölüm iskeletini bulur; aynı şablonun seri üretimini görünür kılar. */
export function iskeletBenzerligi(makale, makaleler) {
  const imza = basliklar(makale.govde);
  let enYuksek = { id: null, oran: 0 };
  for (const diger of makaleler) {
    if (diger.fm.id === makale.fm.id) continue;
    const oran = jaccard(imza, basliklar(diger.govde));
    if (oran > enYuksek.oran) enYuksek = { id: diger.fm.id, oran };
  }
  return { baslikSayisi: imza.length, ...enYuksek, oran: Number(enYuksek.oran.toFixed(2)) };
}

export function uretimHattiDenetimi(makaleler = makaleleriTopla()) {
  const r = new Rapor('KAPI 21 — yeni makale üretim sözleşmesi');
  const veri = uretimKuyruguOku();
  const soz = veri.sozlesme || {};
  const adaylar = veri.adaylar;
  const durumlar = new Set(veri.durumlar || []);
  const harita = new Map(makaleler.map((m) => [m.fm.id, m]));
  let kaynakRaporu = null;
  try { kaynakRaporu = JSON.parse(fs.readFileSync(KAYNAK_RAPORU, 'utf8')); } catch { /* aşağıda açık hata */ }
  const kaynakKaydi = new Map((kaynakRaporu?.sonuclar || []).map((x) => [`${x.id}\n${x.url}`, x]));
  let partiManifesti = null;
  try { partiManifesti = JSON.parse(fs.readFileSync(PARTI_MANIFESTI, 'utf8')); } catch { /* aşağıda açık hata */ }

  if ((soz.kaynak_min || 0) < 6) r.hata('plan/uretim-kuyrugu.yaml', 'kaynak hedefi 6 altına indirilemez');
  if ((soz.alan_adi_min || 0) < 4) r.hata('plan/uretim-kuyrugu.yaml', 'bağımsız alan adı hedefi 4 altına indirilemez');
  if ((soz.birincil_min || 0) < 1) r.hata('plan/uretim-kuyrugu.yaml', 'en az bir birincil kaynak zorunludur');
  if (soz.kor_hakem_zorunlu !== true) r.hata('plan/uretim-kuyrugu.yaml', 'bağımsız kör hakem zorunluluğu kaldırılamaz');
  if (soz.yayin_puani !== 10) r.hata('plan/uretim-kuyrugu.yaml', 'yayın puanı yalnız 10 olabilir');
  if (soz.meta_dil_yasak !== true) r.hata('plan/uretim-kuyrugu.yaml', 'yeni makalelerde şablon/meta-dil yasağı kaldırılamaz');
  if (soz.yonlu_bag_alani !== 'baglam') r.hata('plan/uretim-kuyrugu.yaml', 'tek yönlü bağlar yalnız `baglam` alanında tutulmalıdır');
  if (soz.kaynakli_derinlik_zorunlu !== true) r.hata('plan/uretim-kuyrugu.yaml', 'uzunluk hedefi yalnız kaynaklı içerikle tamamlanabilir');
  if (adaylar.length < 60) r.hata('plan/uretim-kuyrugu.yaml', `en az 60 araştırma adayı bekleniyor; bulunan ${adaylar.length}`);

  const gorulen = new Set();
  const rotalar = new Map();
  const bolgeler = new Set();
  let arastirmayaHazir = 0;
  let yayinaHazir = 0;

  for (const a of adaylar) {
    const yer = `plan/uretim-kuyrugu.yaml/${a.id || 'kimliksiz'}`;
    if (!a.id || gorulen.has(a.id)) r.hata(yer, a.id ? 'yinelenen aday kimliği' : 'aday kimliği eksik');
    gorulen.add(a.id);
    if (!a.tip || !a.id?.startsWith(`${a.tip}-`)) r.hata(yer, 'id öneki ile tip uyuşmuyor');
    if (!durumlar.has(a.durum)) r.hata(yer, `geçersiz durum: ${a.durum}`);
    if (!a.rota || !Number.isInteger(a.sira)) r.hata(yer, 'gelecek rota ve sıra zorunludur');
    if (String(a.soru || '').length < 80) r.hata(yer, 'öğrenme sorusu en az 80 karakter olmalı');
    if (String(a.benzersiz_katki || '').length < 100) r.hata(yer, 'benzersiz katkı en az 100 karakter olmalı');
    if (String(a.birincil_hedef || '').length < 50) r.hata(yer, 'birincil kanıt hedefi somutlaştırılmalı');
    if (!a.anlati_bicimi) r.hata(yer, 'anlatı biçimi eksik');
    for (const b of a.bolge || []) bolgeler.add(b);
    if (!(a.bolge || []).length || !(a.eksen || []).length) r.hata(yer, 'bölge ve eksen boş bırakılamaz');
    const paketYolu = path.join(PAKET_DIZINI, `${a.id}.md`);
    if (!fs.existsSync(paketYolu)) r.hata(yer, `üretim paketi eksik: ${path.relative(KOK, paketYolu)}`);

    if (!rotalar.has(a.rota)) rotalar.set(a.rota, []);
    rotalar.get(a.rota).push(a);

    const baslangic = a.baslangic_kaynaklari || [];
    const alanlar = new Set(baslangic.map(alanAdi).filter(Boolean));
    if (a.durum === 'arastirmada') {
      arastirmayaHazir += 1;
      if (baslangic.length < 3 || alanlar.size < 3) {
        r.hata(yer, `araştırma başlangıcı için en az 3 kaynak ve 3 alan adı gerekir; ${baslangic.length}/${alanlar.size}`);
      }
      for (const url of baslangic) {
        const kayit = kaynakKaydi.get(`${a.id}\n${url}`);
        if (!kayit?.okunabilir) r.hata(yer, `başlangıç kaynağı canlılık raporunda okunabilir değil: ${url}`);
      }
    }

    const makale = harita.get(a.id);
    if (a.durum === 'onaylandi') {
      if (!makale) { r.hata(yer, 'onaylı kuyruk maddesinin makalesi yok'); continue; }
      const kalite = makaleKalitesi(makale);
      if (kalite.puan !== 10) r.hata(makale.goreli, `yeni üretim ${kalite.puan}/10; yayın için 10/10 zorunlu`);
      const iskelet = iskeletBenzerligi(makale, makaleler);
      if (iskelet.baslikSayisi < 3) r.hata(makale.goreli, 'en az üç konuya özgü ara başlık gerekir');
      if (iskelet.oran >= 0.75) r.hata(makale.goreli, `bölüm iskeleti ${iskelet.id} ile %${Math.round(iskelet.oran * 100)} aynı; şablon tekrarı`);
      yayinaHazir += kalite.puan === 10 ? 1 : 0;
    } else if (makale?.fm.denetim_durumu === 'onaylandi') {
      r.hata(makale.goreli, 'makale yayımlanmış ama yeni üretim kuyruğunda bağımsız onay aşamasını tamamlamamış');
    }
  }

  for (const [slug, liste] of rotalar) {
    const sirali = [...liste].sort((a, b) => a.sira - b.sira);
    if (sirali.length !== 6) r.hata(slug, `gelecek rota 6 aday taşımalı; bulunan ${sirali.length}`);
    const siralar = sirali.map((a) => a.sira).join(',');
    if (siralar !== '1,2,3,4,5,6') r.hata(slug, `rota sırası 1–6 olmalı; bulunan ${siralar}`);
    if (sirali[0] && !SOMUT_TIPLER.has(sirali[0].tip)) r.hata(slug, 'rota somut olay, aktör, düşünür veya kaynakla başlamalı');
    if (sirali.at(-1)?.tip !== 'tartisma') r.hata(slug, 'rota tartışma makalesiyle bitmeli');
    const bicimSayisi = new Set(sirali.map((a) => a.anlati_bicimi)).size;
    if (bicimSayisi < 5) r.hata(slug, `altı makalede en az beş anlatı biçimi gerekir; bulunan ${bicimSayisi}`);
  }

  for (const bolge of ZORUNLU_BOLGELER) {
    if (!bolgeler.has(bolge)) r.hata('plan/uretim-kuyrugu.yaml', `bölgesel açık kapanmıyor: ${bolge}`);
  }

  const partiIdleri = (partiManifesti?.partiler || []).flatMap((p) => p.adaylar || []);
  const partiKimlikleri = new Set(partiIdleri);
  if (!partiManifesti) r.hata('plan/uretim-partileri/manifest.json', 'paralel üretim manifesti yok');
  else {
    if (partiIdleri.length !== adaylar.length) r.hata('plan/uretim-partileri/manifest.json', `partilerde ${partiIdleri.length} yer var; ${adaylar.length} aday bekleniyor`);
    if (partiKimlikleri.size !== adaylar.length) r.hata('plan/uretim-partileri/manifest.json', `adaylar partilerde yalnız birer kez görünmeli; benzersiz ${partiKimlikleri.size}/${adaylar.length}`);
    for (const id of partiKimlikleri) if (!gorulen.has(id)) r.hata('plan/uretim-partileri/manifest.json', `kuyrukta olmayan aday: ${id}`);
    if ((partiManifesti.partiler || []).some((p) => (p.adaylar || []).length !== partiManifesti.parti_boyutu)) {
      r.hata('plan/uretim-partileri/manifest.json', 'her parti manifestteki parti boyutunu tam karşılamalı');
    }
  }

  r.ozetSatirlari = [
    `${adaylar.length} aday · ${rotalar.size} gelecek rota · ${partiIdleri.length}/${adaylar.length} üretim paketi · ${(partiManifesti?.partiler || []).length} paralel parti`,
    `${arastirmayaHazir} adayın başlangıç kaynakları doğrulandı`,
    `${[...kaynakKaydi.values()].filter((x) => x.okunabilir).length}/${kaynakRaporu?.kaynak_sayisi || 0} başlangıç kaynağı canlı ve okunabilir`,
    `yayın sözleşmesi ${soz.kaynak_min} kaynak / ${soz.alan_adi_min} alan adı / ${soz.yayin_puani}/10 · onaylanan ${yayinaHazir}`,
  ];
  r.olcum = {
    aday: adaylar.length,
    gelecekRota: rotalar.size,
    arastirmayaHazir,
    paketli: partiIdleri.length,
    parti: (partiManifesti?.partiler || []).length,
    canliKaynak: [...kaynakKaydi.values()].filter((x) => x.okunabilir).length,
    kaynakSayisi: kaynakRaporu?.kaynak_sayisi || 0,
    onaylanan: yayinaHazir,
    sozlesme: soz,
  };
  return r;
}

const BICIM_NOTU = {
  'metin-catismasi': 'Aynı metnin rakip okumalarını yan yana kur; biyografiyi kronolojik özete çevirme.',
  'nesne-izleme': 'Tek bir nesne grubunun coğrafi izini sür; nesneden toplumun tamamına kanıtsız sıçrama yapma.',
  'deney-yeniden-kurma': 'Bir problemin gözlem, model, itiraz ve sınama adımlarını yeniden kur.',
  'karar-ve-taniklik': 'Karar veren kurumların kaydı ile sonucu yaşayanların tanıklığını aynı kronolojide karşılaştır.',
  'kronik-ve-kent': 'Kuruluş anlatısı, kronik ve maddi kent izlerini ayrı kanıt sınıfları olarak tart.',
};

export function paketMetni(a, sozlesme) {
  const kaynaklar = a.baslangic_kaynaklari || [];
  return [
    `# Üretim paketi — ${a.baslik}`,
    '', `**Kimlik:** \`${a.id}\``,
    `**Gelecek rota:** \`${a.rota}\` · ${a.sira}/6`,
    `**Bölge / eksen:** ${(a.bolge || []).join(', ')} · ${(a.eksen || []).join(', ')}`,
    `**Anlatı biçimi:** \`${a.anlati_bicimi}\``, '',
    '## Makalenin çözeceği soru', '', a.soru, '',
    '## Korpusa benzersiz katkısı', '', a.benzersiz_katki, '',
    '## Anlatı kararı', '', BICIM_NOTU[a.anlati_bicimi]
      || 'Başlıkları konunun kanıt ve mekanizmasına göre kur; başka bir makalenin bölüm sırasını kopyalama.', '',
    '## Birincil kanıt hedefi', '', a.birincil_hedef, '',
    '## Başlangıç kaynakları — kaynak değil, doğrulanacak araştırma uçları', '',
    ...(kaynaklar.length ? kaynaklar.map((url) => `- [ ] ${url}`) : ['- [ ] Birincil kaynak bulunacak', '- [ ] Açık akademik sentez bulunacak', '- [ ] Rakip yorumun özgün metni bulunacak']), '',
    'Bu URL’lerin her biri açılmalı, kaynak havuzunda doğrulanabilir olmalı ve kullanılacak iddiayı gerçekten taşıdığı görülmelidir.', '',
    '## Yayından önce değiştirilemez sözleşme', '',
    `- En az **${sozlesme.kaynak_min} kaynak**, **${sozlesme.alan_adi_min} bağımsız alan adı** ve **${sozlesme.birincil_min} birincil kanıt**.`,
    `- En fazla **${sozlesme.wikipedia_max}** Wikipedia künyesi; giriş kapısı asıl kanıt olamaz.`,
    '- Her olgusal cümle doğru kaynak anahtarına bağlanır; kaynak yalnız “konuyla ilgili” olduğu için kullanılamaz.',
    '- Karşı görüş, belirsizlik ve kaynak sınırı metnin içinde görünür olur.',
    '- `ilgili` yalnız karşı makalede de geri bağ varsa kullanılır; tek yönlü geçişler `baglam` alanına yazılır.',
    '- “Atlas kaydeder”, “bu dosya” ve stok kapanışlar kullanılmaz; anlatıcı platformu değil kanıtı ve mekanizmayı görünür kılar.',
    '- Uzunluk hedefi tekrar, meta-cümle ya da dolgu ile değil; kaynaklı kanıt, mekanizma, karşı örnek ve sınırla tamamlanır.',
    '- Makale `bekliyor` durumunda yazılır. Üretici kendi metnini onaylayamaz.',
    '- Bağımsız oturum bütün dipnotlu iddialar için kör-hakem matrisi oluşturur.',
    '- Dil taraması, bölüm iskeleti benzerliği ve KAPI 20 ölçütleri 10/10 olmadan yayın yoktur.', '',
    '## Doğal öğrenme iskeleti', '',
    '1. Okurun taşıdığı güçlü ama eksik sezgiyi somut bir sahne veya nesneyle aç.',
    '2. Açıklanması gereken şaşırtıcı farkı tek cümlede kur.',
    '3. Kanıt türlerini birbirine karıştırmadan mekanizmayı adım adım göster.',
    '4. Rakip açıklamanın en güçlü yanını çelikleştir; sonra hangi kanıtın ayırıcı olduğunu söyle.',
    '5. Sonuçta hükmü tekrarlama; okurun başka bir vakaya taşıyabileceği kontrol sorusunu bırak.', '',
  ].join('\n');
}

export function paketYaz(a, sozlesme) {
  const hedef = path.join(PAKET_DIZINI, `${a.id}.md`);
  yaz(hedef, paketMetni(a, sozlesme));
  return hedef;
}

export function sonrakiParti(adaylar, n) {
  const oncelik = { arastirmada: 0, bekliyor: 1, onarimda: 2, yaziliyor: 3, 'kor-hakemde': 4, onaylandi: 9 };
  return [...adaylar]
    .filter((a) => a.durum !== 'onaylandi')
    .sort((a, b) => (oncelik[a.durum] ?? 8) - (oncelik[b.durum] ?? 8) || a.sira - b.sira || a.rota.localeCompare(b.rota, 'tr'))
    .slice(0, n);
}

export function partiMetni(parti, yollar, { no = 1, toplam = 1 } = {}) {
  return [
    `# Dengeli üretim partisi ${String(no).padStart(2, '0')}/${String(toplam).padStart(2, '0')}`, '',
    'Her paket ayrı bir üretici bağlamında araştırılabilir. Ortak olan yalnız kalite sözleşmesidir; cümle, bölüm sırası ve anlatı sesi ortak şablondan kopyalanamaz.', '',
    ...parti.flatMap((a, i) => [`## ${i + 1}. ${a.baslik}`, '', `- Paket: \`${path.relative(KOK, yollar[i])}\``, `- Gelecek rota: \`${a.rota}\` · ${a.sira}/6`, `- Öğrenme sorusu: ${a.soru}`, '']),
    '## Birleştirme kuralı', '',
    'Dosyalar paralel yazılabilir; fakat her biri ayrı kör-hakem oturumundan geçmeden `onaylandi` yapılamaz. Parti sonunda `npm run uretim -- --kapi`, `npm test` ve `npm run lint` birlikte geçmelidir.', '',
  ].join('\n');
}

/** Kuyrugun tamamini tekrar etmeyen, esit buyuklukte paralel is paketlerine boler. */
export function tumPartileriHazirla(veri, boyut = 5) {
  if (!Number.isInteger(boyut) || boyut < 1) throw new Error('parti boyutu pozitif tam sayı olmalı');
  const sirali = sonrakiParti(veri.adaylar, veri.adaylar.length);
  const toplam = Math.ceil(sirali.length / boyut);
  const paketYollari = new Map(sirali.map((a) => [a.id, paketYaz(a, veri.sozlesme)]));
  const partiler = [];
  for (let i = 0; i < toplam; i += 1) {
    const adaylar = sirali.slice(i * boyut, (i + 1) * boyut);
    const yollar = adaylar.map((a) => paketYollari.get(a.id));
    const dosya = `parti-${String(i + 1).padStart(2, '0')}.md`;
    yaz(path.join(PARTI_DIZINI, dosya), partiMetni(adaylar, yollar, { no: i + 1, toplam }));
    partiler.push({ no: i + 1, dosya: `plan/uretim-partileri/${dosya}`, adaylar: adaylar.map((a) => a.id) });
  }
  const manifest = {
    surum: 1,
    parti_boyutu: boyut,
    aday_sayisi: sirali.length,
    parti_sayisi: partiler.length,
    kural: 'Her aday tek partide; her makale 10/10 ve ayrı kör hakem olmadan yayımlanamaz.',
    partiler,
  };
  yaz(PARTI_MANIFESTI, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

function durumYazdir(veri) {
  const sayim = {};
  for (const a of veri.adaylar) sayim[a.durum] = (sayim[a.durum] || 0) + 1;
  console.log(RENK.kalin('\nYENİ MAKALE ÜRETİM HATTI'));
  console.log(`  aday            ${veri.adaylar.length}`);
  console.log(`  gelecek rota    ${new Set(veri.adaylar.map((a) => a.rota)).size}`);
  for (const [durum, sayi] of Object.entries(sayim)) console.log(`  ${durum.padEnd(16)} ${sayi}`);
  console.log(`  sözleşme        ${veri.sozlesme.kaynak_min} kaynak · ${veri.sozlesme.alan_adi_min} alan adı · ${veri.sozlesme.yayin_puani}/10`);
  console.log('\n  sıradaki dengeli parti');
  for (const a of sonrakiParti(veri.adaylar, 5)) console.log(`    ${a.id.padEnd(42)} ${a.rota}`);
}

/**
 * Araştırma uçlarının gerçekten okunabildiğini üretim başlamadan sınar.
 * Bu kontrol bir URL'nin iddiayı desteklediğini kanıtlamaz; yalnızca ölü,
 * erişilemeyen veya anlamlı metin vermeyen uçları yazara ulaşmadan ayıklar.
 */
export async function kaynakKontrolu(adaylar) {
  const sonuclar = [];
  for (const aday of adaylar) {
    for (const url of aday.baslangic_kaynaklari || []) {
      const sonuc = await getir(url, { taze: true, metinSakla: true, deneme: 2 });
      const karakter = String(sonuc.metin || '').length;
      sonuclar.push({
        id: aday.id,
        url,
        alan_adi: alanAdi(url),
        durum: sonuc.durum || 0,
        son_url: sonuc.sonUrl || '',
        karakter,
        kesildi: sonuc.kesildi === true,
        okunabilir: sonuc.durum >= 200 && sonuc.durum < 300 && karakter >= 300,
        hata: sonuc.hata || '',
      });
    }
  }
  const rapor = {
    olculdu: new Date().toISOString(),
    aday_sayisi: adaylar.length,
    kaynak_sayisi: sonuclar.length,
    okunabilir: sonuclar.filter((x) => x.okunabilir).length,
    sonuclar,
  };
  yaz(KAYNAK_RAPORU, `${JSON.stringify(rapor, null, 2)}\n`);
  console.log(`kaynak kontrolü: ${rapor.okunabilir}/${rapor.kaynak_sayisi} okunabilir -> denetim/uretim-kaynak-kontrol.json`);
  for (const x of sonuclar.filter((sonuc) => !sonuc.okunabilir)) {
    console.log(`  HATA ${x.id}: HTTP ${x.durum} · ${x.karakter} karakter · ${x.url}${x.hata ? ` · ${x.hata}` : ''}`);
  }
  return rapor;
}

if (process.argv[1]?.endsWith('uretim-hatti.mjs')) {
  const argv = process.argv.slice(2);
  const veri = uretimKuyruguOku();
  if (argv.includes('--kapi')) {
    const rapor = uretimHattiDenetimi();
    rapor.yazdir();
    process.exit(rapor.gecti ? 0 : 1);
  } else if (argv.includes('--paket')) {
    const id = argv[argv.indexOf('--paket') + 1];
    const aday = veri.adaylar.find((a) => a.id === id);
    if (!aday) { console.error(`aday bulunamadı: ${id}`); process.exit(1); }
    console.log(path.relative(KOK, paketYaz(aday, veri.sozlesme)));
  } else if (argv.includes('--parti')) {
    const n = Number(argv[argv.indexOf('--parti') + 1]) || 5;
    const parti = sonrakiParti(veri.adaylar, n);
    const yollar = parti.map((a) => paketYaz(a, veri.sozlesme));
    const metin = partiMetni(parti, yollar);
    const hedef = path.join(PARTI_DIZINI, 'siradaki-parti.md');
    yaz(hedef, metin);
    console.log(`${parti.length} paket -> ${path.relative(KOK, hedef)}`);
  } else if (argv.includes('--partileri-hazirla')) {
    const konum = argv.indexOf('--partileri-hazirla');
    const boyut = Number(argv[konum + 1]) || 5;
    const manifest = tumPartileriHazirla(veri, boyut);
    console.log(`${manifest.aday_sayisi} paket · ${manifest.parti_sayisi} parti -> plan/uretim-partileri/manifest.json`);
  } else if (argv.includes('--kontrol')) {
    const id = argv[argv.indexOf('--kontrol') + 1];
    const makaleler = makaleleriTopla();
    const makale = makaleler.find((m) => m.fm.id === id);
    if (!makale) { console.error(`makale bulunamadı: ${id}`); process.exit(1); }
    const kalite = makaleKalitesi(makale);
    const iskelet = iskeletBenzerligi(makale, makaleler);
    console.log(JSON.stringify({ id, puan: kalite.puan, olcutler: kalite.olcutler, iskelet }, null, 2));
    process.exit(kalite.puan === 10 && iskelet.baslikSayisi >= 3 && iskelet.oran < 0.75 ? 0 : 1);
  } else if (argv.includes('--kaynak-kontrol')) {
    const konum = argv.indexOf('--kaynak-kontrol');
    const id = argv[konum + 1]?.startsWith('--') ? '' : (argv[konum + 1] || '');
    const adaylar = id
      ? veri.adaylar.filter((a) => a.id === id)
      : veri.adaylar.filter((a) => a.durum === 'arastirmada');
    if (!adaylar.length) { console.error(id ? `aday bulunamadı: ${id}` : 'araştırmada aday yok'); process.exit(1); }
    const rapor = await kaynakKontrolu(adaylar);
    process.exit(rapor.okunabilir === rapor.kaynak_sayisi ? 0 : 1);
  } else {
    durumYazdir(veri);
  }
}
