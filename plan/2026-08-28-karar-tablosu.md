# Karar tablosu — 16 rollü keşif dalgasının sentezi (28 Ağustos 2026)

Dalga: 16/16 ajan tamamlandı, 0 hata (`wf_91a6dbb1-e71`, ~1,83M jeton,
350 araç çağrısı). Bu belge çelişen önerileri tartar, öncelik sırasını ve
sahiplik haritasını sabitler. Başlangıç ölçümleri:
`2026-08-28-baslangic-fotografi.md`.

## Bu oturumda dalga sürerken kapatılanlar (küçük, güvenli işler)

| İş | Commit |
|---|---|
| Kanonik kelime tanımı sabitlendi; donem-04/06 kanonik tanımla hedefte | f3ae86a |
| 146 raporsuz makaleye Geçiş 2+3 raporu → 505/505 raporlu | (rapor commit'i) |
| ATOMSUZ görünürlüğü: denetle.mjs 4 sayaç; `undefined` hatası giderildi | acbbc21 |
| Geçiş 2'nin 10 kaynak-iddia HATASI onarıldı (6 dosya) | 060dac1 |

## Doğrulanmış kilit sayılar

- Dipnotlu iddiaların **%84'ü (12.448/14.794) hiç ölçülmemiş** (ATOMSUZ);
  "TEMİZ" etiketi bugüne dek bunu gizliyordu.
- "Atlas ..." öz-gönderimi 4.396 geçiş / 450 dosya; "ayrıca kaydeder"
  kalıbı 1.016 geçiş / 128 dosya; "bu dosya" 1.512 geçiş / 460 dosya.
- 37 yanlış nüfus değeri (en büyük sapma %19,6); aynı yıl için depo içi
  çelişen değerler (2020: 7,84 vs 7,89; 1800: üç farklı değer).
- 29/54 düşünür dosyası düşünürün düşüncesini anlatmıyor.
- 358/359 eski denetim raporu bayattı (hash/commit bağı yok) — bu oturumda
  505'i de yeniden üretildi, ancak bağ hâlâ yok.
- RAPOR.md/DURUM.md 196 commit geride; Hakkında sayfası 359 makalelik
  ölçümü 505 makalelik korpusun beyanı gibi sunuyor.
- Örnekleme kapısı manşeti 1,0; ham skor 0,2759 (29 iddianın 21'i
  türetilemedi ve skordan DÜŞÜLÜYOR).

## Karar tablosu (çelişen öneriler)

### K1. Meta-dil temizliği ↔ KAPI 11 taban kuralı
ROL 5/6: meta-dil kalıpları silinsin. ROL 16 itirazı: %80 silme 161/162
hedefteki makaleyi hedef altına düşürür, lint toplu kırılır; ayrıca taban
dosyasını yeniden yazmak "ölçüm oynatma" kalıbıdır.
**Karar:** Meta-dil SİLME ile İÇERİK EKLEME aynı dosya-onarımında
birleştirilir: kalıp cümle çıkarken yerine konuya ait gerçek cümle girer;
dosya kanonik tanımla hedefin altına düşemez. Taban dosyası yeniden
YAZILMAZ. Toplu sed/replace ile korpus çapında silme YAPILMAZ (ROL 16 #6
sessiz render kaybı riski) — onarım dosya dosya, kapı koşusuyla gider.

### K2. Semantik iddia-kaynak matrisi ↔ "atom çıkarımıyla kurulursa yüzeysel olur"
ROL 4: matris şeması + hash bağı. ROL 16 itirazı: mevcut atom çıkarımı
üstüne kurulursa desen eşleştirme olur (bu oturumda kanıtlandı: TDV/1911
metinlerinde "618", tablo rakamı ve bibliyografyadan sahte-pozitif çıktı).
**Karar:** İki katman ayrılır. (a) Mekanik katman: atomlar + 4 sayaç —
yalnızca TABAN, asla "doğrulandı" beyanı üretmez. (b) Hakem katmanı:
model-hakemli oturum her iddiaya destek düzeyi (dogrudan/kismi/baglam/
celisir) yazar; matris ancak hakem katmanıyla "doğrulanmış" sayılır.
Matris kaydına gövde hash'i + commit yazılır; gövde değişince rapor
otomatik "bayat" düşer.

### K3. Kapsam büyütme ↔ "büyüme aynı havuzu sulandırır"
ROL 7: kuyruk boş, eksik eksenler (Okyanusya, kadın düşünürler, gündelik
hayat, Babil/Fenike/Zhou). ROL 16 itirazı: 249 birincilsiz + 210
giriş-kapısı ihlali kapanmadan büyüme borcu büyütür.
**Karar:** Sözleşmenin faz sırası korunur: pilot (Faz 2) → eski borç
(Faz 3) → büyüme (Faz 4). Yeni makale ancak yeni kapı setinden geçerek
girer; Faz 4 kuyruğu ROL 7'nin eksen açıklarından doldurulur.

### K4. "1911 Britannica değişimi" ↔ havuz kıtlığı
ROL 3: 1911 EB 29 dosyada modern-olgu kaynağı, değişmeli. Bu oturumda
ölçüldü: britannica.com 403, iranicaonline erişilemez, uzun metinler
400k'da kesiliyor (getir sınırı).
**Karar:** 1911 EB YASAKLANMAZ; rolü daraltılır: yalnızca dönem-tanığı /
tarihyazımı bağlamında, künye notunda tarihi beyan edilerek. Modern olgu
iddiaları için OWID/BM/arşiv tam metinleri (bu oturumda kanıtlanan Li Ung
Bing deseni: archive.org `_djvu.txt` tam metin URL'si) tercih edilir.
Havuza alan eklemek serbesttir ama her ekleme gerekçe notuyla yapılır.

### K5. Dil kapısı hemen zorunlu mu?
ROL 5/6: kalıplar kapıyla engellensin. Risk: 460 dosya "bu dosya"
taşıyorken zorunlu kapı, onarılmamış her dosyada lint'i kırar ve tüm
commit'leri bloke eder.
**Karar:** Dil/tekrar kapısı KAPI 11 deseninde kurulur: devreye girdiği
andaki geçiş sayıları borç defterine yazılır; BORÇ BÜYÜYEMEZ (yeni dosya
kalıp giremez, mevcut dosyada sayı artamaz), onarım borcu eritir. Böylece
hem geri kayma durur hem mevcut korpus bloke olmaz.

### K6. Ölçüm tanımı şüphesi (ROL 16 #8 → bu oturumdaki f3ae86a'ya itiraz)
İtiraz: "kanonik tanım + 6-22 kelimelik marjla 16/16 beyanı, tanım
oynatma kalıbı olabilir."
**Karar (kayda geçen savunmayla):** Seçilen kanonik tanım (kelimeSay)
İKİ tanımdan DAR olanıdır (daha az kelime sayar); dosyalar eşik düşürerek
değil içerik EKLENEREK hedefe getirildi. Birincilsiz 292→249 da yeni
tanım icadı değil, linter'ın yerleşik ölçüsüne dönüştür. Bundan sonrası
için kural: tanımlar bu iki belgeyle DONDURULDU; herhangi bir tanım
değişikliği ayrı commit + gerekçe + eski/yeni değer tablosu ister.

## Öncelikli uygulama planı

**Faz 1 — kalite altyapısı (şimdi):**
1. Kanonik metrik borusu: örnekleme kapısını güncel korpusta yeniden koş;
   RAPOR.md/DURUM.md yeniden üret; hakkinda.astro'ya "ölçüm tarihindeki
   korpus boyutu" satırı; ham skor manşetten gizlenmez (ROL 1 #1/#2).
2. Denetim raporlarına gövde hash'i + commit bağı (K2-b'nin ön şartı);
   bayat rapor tespiti.
3. `linter-sayi.mjs`: veri makaleleri + nüfus kalıp cümlelerindeki
   sayıların depo CSV'lerinden doğrulanması; negatif fikstürle (ROL 14).
4. Dil/tekrar borç kapısı (K5 kararı): "Atlas" öz-gönderimi, "bu dosya",
   "ayrıca kaydeder", şablon kapanışlar; borç defteri + büyüme yasağı.
5. Çift `id="atif-kN"` onarımı (remark-eklentileri.mjs) — HTML geçerliliği
   ve "metne dön" bağları (ROL 15 #1).
6. `content.config.ts` as any + strictNullChecks (ROL 1 #4) — tip
   güvenliğini aç, `astro check`i CI'ya bağla.
7. getir.mjs 400k kesme sınırı: kesildiğini raporla (sahte "dize yok"
   sonucu engellenir).

**Faz 2 — pilot (12 dosya):** paris-iklim-anlasmasi, cahokia,
kus-kralligi, rapa-nui, olay-covid, aktor-imf, dusunur-marx (29 boş
düşünürden biri), kavram-ideal-tip, kavram-hegemonya, veri-fosil-
elektrik-payi, tartisma-sozlu-gelenek-kaynak-mi, donem-06 (Tang yeniden
hakemliği). Her biri tam boru: araştırma → kaynak → onarım → matris →
Türkçe editör → kör hakem → çürütücü → kapılar.

**Faz 3 — eski borç:** 37 nüfus değeri (kanonik CSV'den betikli onarım),
29 boş düşünür dosyası, 259 hedef altı, Las Casas dönem düzeltmesi,
donem-06 kalan Tang atıfları, aktor-imf çelişkisi, yanlış ::tartismali
hedefleri (donem-04 → eksen-cagi-gercek-mi; aktor-olmek), donem-16
"bugün" eskimesi.

**Faz 4 — kapsam:** ROL 7 eksenleri (Okyanusya sesleri, kadın
düşünürler, gündelik hayat, Babil/Fenike/Zhou, mitolojik eksen) —
hedef ≥750 kapılı makale.

**Faz 5 — site/UX:** ROL 15 listesi (mobil h1, İçindekiler,
guven_geneli açıklaması, sitemap/robots/canonical/og, aria düzeltmeleri,
"altı/yedi bölge" çelişkisi).

**Faz 6 — tükenme denetimi:** art arda 2 temiz adversarial dalga;
nihai teslim raporu (§11 biçimi).

## Sahiplik haritası

| Alan | Sahip |
|---|---|
| araclar/, kapılar, CI, sema | Hat A (orkestratör) |
| İçerik onarımı (tarih katmanları) | Hat B/C dalga ajanları; hakem ayrı ajan (yazar ≠ hakem) |
| Yeni üretim | Hat D (Faz 4'e kadar kapalı) |
| Türkçe editörlük | Hat E (onarım borusunun zorunlu durağı) |
| Site/UX | Hat F (Faz 5) |
| Kör doğrulama | Hat G (her dalgada bağımsız) |

## Risk kaydı

1. **Sessiz render kaybı** (remark direktifi): toplu gövde düzenlemesi
   yasak; dosya başına düzenle + build sonrası KAPI 12/14. (ROL 16 #6)
2. **Eşzamanlı yazma yarışı**: kapi-sonucu.json/raporlar tek yazar
   kuralı — kapı koşuları ve rapor üretimi yalnız orkestratörde.
3. **Kaynak sunucusu hız sınırı**: ağ kapıları toplu koşularda; onarım
   commit'leri --lint ile, tam koşu günde 1-2 kez.
4. **Tanım kayması**: K6 kararı — tanımlar donduruldu.
5. **Bayat rapor**: hash bağı gelene dek (Faz 1.2) hiçbir eski rapor
   "geçerli doğrulama" sayılmaz.
6. **Bütçe**: onarım ↔ büyüme yarışı — faz sırası kesin; Faz 4,
   Faz 3 borcu %80 erimeden açılmaz.

## K7 — Kişi adları ve denetlenebilirlik (29 Ağustos, kör hakem sorusu)

**Sorun.** 11 Eylül dosyası hiç kişi adı kullanmıyordu: "örgüt lideri",
"merkezî istihbaratın başındaki isim", "şüphe çeken kişi". Hakem bunun
ölçülebilir bir bedeli olduğunu gösterdi: dosyanın ATOMSUZ oranı %55'e
çıktı, çünkü mekanik katmanın kaynak metninde arayabileceği özel ad
kalmıyor. Adsız yazım, dosyayı denetlenemez hâle getiriyor.

**Karar.** İki durum ayrılır ve ayrımın kendisi bir ilkedir:

1. **Kamusal görev taşıyanlar ADIYLA yazılır** — devlet görevlileri,
   komisyon başkanları, bilim insanları, siyasetçiler, kurum yöneticileri.
   Bunlar kamusal rolleri nedeniyle tarihin öznesidir ve adları kaynakta
   birebir aranabilir bir atomdur. Adı gizlemek, iddiayı denetlenemez
   kılar ve kimseyi de korumaz.
2. **Fail adları** için kural konuya bağlıdır ve dosyada AÇIKÇA söylenir.
   Terör saldırısı gibi failin adını yaymanın kendisi bir amaç taşıdığı
   durumlarda ad kullanmamak savunulabilir bir editoryal karardır — ama
   o zaman bu tercih gövdede bir cümleyle beyan edilir ve gerekçesi
   yazılır. Sessizce adsız yazmak karar değil, kaçınmadır.

**Ölçülebilir sonuç.** Kural 1 uygulanan dosyalarda ATOMSUZ oranının
düşmesi beklenir; düşmüyorsa neden düşmediği ayrıca incelenir.

## K8 — Eksen sözlüğünde "toplumsal" boşluğu (29 Ağustos)

**Nasıl çıktı.** Meksika Devrimi dosyasını yazan ajan `eksen: toplumsal`
yazdı ve KAPI 1'e takıldı. Sözlükte böyle bir değer yok: siyasi, askeri,
ekonomik, kültürel, felsefi, dini, demografik, mitolojik.

**Boşluk gerçek.** Bir beşerî atlasta kölelik, sınıf, kast, toplumsal
cinsiyet, emek örgütlenmesi ve toplumsal hareketlerin doğal ekseni yok.
Bunlar şu an "kültürel" ya da "ekonomik" altında duruyor ve ikisi de
konuyu çarpıtıyor.

**Karar: ŞİMDİ EKLENMEYECEK.** Gerekçe, boşluğun yokluğu değil eklemenin
yaratacağı yanlış beyandır. Sözlüğe bugün eklenirse yalnızca yeni yazılan
dosyalar bu etiketi taşır; toplumsal tarih işleyen onlarca eski dosya
"kültürel"de kalır. Okur "toplumsal" ekseniyle filtrelediğinde atlasın
gerçekte içerdiğinin küçük bir kısmını görür ve bunu bütün sanır — yani
ölçüm, ölçtüğünden az şey gösterirken çok şey gösteriyormuş gibi durur.
Bu, atlasın kaçınmaya çalıştığı hata sınıfının ta kendisidir.

**Koşul.** Eksen sözlüğüne "toplumsal" ancak korpus genelinde bir yeniden
sınıflandırma geçişiyle birlikte eklenir: her makale yeni sözlüğe göre
tekrar etiketlenir ve geçişin tarihi hakkında sayfasında yazılır.
Kuyruğa yazıldı.

## K9 — Telif altındaki düşünürlerde kaynak sınırı (29 Ağustos)

**Nasıl çıktı.** Düşünür dalgasının kör hakemleri dört dosyaya KOŞULLU
verdi ve gerekçe hep aynıydı. Foucault dosyasında düşünürün kendi
cümlesi YOK; 55 iddianın 36'sı tek bir ansiklopedi maddesine dayanıyor.
Carr dosyasında da Carr'ın tek bir cümlesi yok; merkezî sav yayıncının
tanıtım metninden geliyor. Hakemler haklıydı: bir düşünür dosyası,
düşünürün kendi metnine dayanmadan yazılmamalıdır.

**Ama sınır gerçek.** 20. yüzyıl düşünürlerinin metinleri telif
altındadır ve atlas korsan kopya kullanamaz (§15). Ölçtüm: Arendt için
Kongre Kütüphanesi evrakı programatik erişime kapalı (403), Internet
Archive kopyaları ödünç kısıtlı (401), marxists.org'da Arendt arşivi
yok. Carr için de aynısı; Elton'ın karşı çıkışı da ödünç kısıtlı.
Buna karşılık Foucault için marxists.org'da *Bilginin Arkeolojisi*'nin
tam metni VAR ve Montesquieu için Wikisource'ta İngilizce çeviri kitap
kitap duruyor — yani sınır her dosyada aynı değil, ölçülmesi gerekiyor.

**Karar.** İkisi ayrılır:
1. **Açık erişimli karşılığı olan dosya** düzeltilir. Foucault ve
   Montesquieu için hedefli derinleştirme turu açıldı.
2. **Gerçekten kapalı olan dosya** yayımlanır, AMA sınırı BEYAN EDER.
   Bunun için `kaynak_siniri` alanı eklendi: dosyanın neden düşünürün
   kendi metnine dayanamadığını, hangi kanalların denendiğini ve
   sonucunu yazar. Alan makale sayfasında okura gösterilir.

**Gerekçe.** Telif altındaki bir metne ulaşılamaması meşru bir sınırdır;
sessiz kalması değildir. Beyan olmadan okur, ansiklopedi özetinden
kurulmuş bir metni birincil kaynaklı sanır — atlasın kaçınmaya
çalıştığı hata sınıfının tam örneği.

**Uygulama.** KAPI 13, birincil kaynağı olmayan `dusunur` ve `kaynak`
dosyalarında `kaynak_siniri` alanını zorunlu kılar. Kural konulduğu
andaki 19 ihlal `denetim/kaynak-siniri-taban.json` borç defterine
yazıldı (KAPI 11 ve 18 ile aynı desen): defterdeki dosya borçtur ve
özette görünür, defterde OLMAYAN yeni bir ihlal HATA verir. Defter
yalnızca beyan yazılarak kısalır. Arendt ve Carr beyanları yazılarak
defterden çıkarıldı; kalan borç 18 dosya.
