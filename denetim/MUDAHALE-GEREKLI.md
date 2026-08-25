# Müdahale defteri

Hattın çözemediği her şey burada toplanır. İnsan bunu **sonda** okur, akış
sırasında değil.

---

## Kaynak havuzu boşlukları

_2026-08-20 · Faz 0 sonunda_

### 1. Bağımsız yeniden türetme için doğrulanabilir kaynak yetersiz

Faz 0'ın örnekleme kapısında 20 iddialık örneklemin **8'i bağımsız olarak
türetilemedi**. Bunlar çürütülmedi — hiç ölçülemedi. Ölçülen 12 iddia üzerinden
skor 0,958; bütün örneklem üzerinden ham skor 0,55.

Sebep, içeriğin kalitesi değil **havuzun yapısı**:

| Engel | Etkilenen alan | Sonuç |
|---|---|---|
| Bot koruması (HTTP 403) | britannica.com, iranicaonline.org | Künyede kullanılamıyor |
| İstemci tarafı çizim (JS) | population.un.org, jstor.org | Sunucudan doğrulanabilir metin dönmüyor |
| Yalnızca özet + kaynakça | dergipark.org.tr | Türkçe akademik tam metinler makine okunamıyor |
| Katalog var, veri yok | rug.nl (Maddison), correlatesofwar.org | Sayısal seriler sayfa metninde değil |

Pratikte geriye **doğrulanabilir üç omurga** kalıyor: `archive.org` (katalog +
tam metin), `islamansiklopedisi.org.tr` ve `en.wikipedia.org`. Bloklama kuralı
(§10 Geçiş 4) bir makalede bu üçünden ikisini kullanınca, üçüncüsü tek bağımsız
doğrulayıcı olarak kalıyor; o da makalede kullanılmışsa iddia yapısal olarak
türetilemez hâle geliyor.

**Bunun somut maliyeti kayıtlıdır:** Clark'ın kitabının 2013 yayın yılı,
`kaynak-clark-uyurgezerler` dosyasında archive.org katalogundan bağımsız olarak
doğrulandı; aynı yıl `tartisma-1914-savas-sorumlulugu` dosyasında archive.org
bloke olduğu için doğrulanamadı. Aynı olgu, hangi makalede geçtiğine göre
ölçülebilir ya da ölçülemez oluyor.

**Editoryal karar gerekiyor.** Seçenekler:

1. Havuza doğrulanabilir yeni alan adları eklemek (ör. `openlibrary.org`,
   `loc.gov`, `bnf.fr`, `dnb.de` gibi kütüphane katalogları — künye
   doğrulaması için yüksek verimli ve makine okunur).
2. Bloklamayı alan adı yerine **URL düzeyinde** yapmak: aynı alan adının
   farklı bir belgesi bağımsız sayılabilir mi? Bu, İlke 6'yı zayıflatır;
   bilinçli bir karar olmadan yapılmamalıdır.
3. Ham skoru düşük tutup şeffaf beyan etmeye devam etmek (mevcut davranış).

Hat, bu karar verilene kadar **mevcut davranışı sürdürür**: türetilemeyen iddia
"doğrulandı" sayılmaz, orandan düşülmez, sayısı açıkça raporlanır.

### 2. Çözülemeyen tarih ayrışması: Warren Thompson

`kavram-demografik-gecis` dosyasında demografik geçiş kuramının kaynağı olan
Warren Thompson çalışmasının yılı kaynaklar arasında ayrışıyor:

- Makalenin künyesi (İngilizce Wikipedia): **1930**
- Bağımsız türetme geçişinde karşılaşılan Türkçe akademik literatür: **1929**

İki alternatif doğrulama kaynağı denendi (`jstor.org` — JS duvarı;
`dergipark.org.tr` — tam metin erişilemiyor). Ayrışma çözülemediği için §10
gereği **yıl iddiası makaleden çıkarıldı** ve ayrışmanın kendisi metinde beyan
edildi. Editoryal karar gerekiyor: hangi tarihlendirme esas alınacak?

### 3. Osmanlı kuruluş tarihi: 1299 mu 1300 mü?

`aktor-osmanli-imparatorlugu` dosyası her iki tarihi de kaynağıyla birlikte
veriyor (TDV: 1300; Osmanlı tarih yazımı geleneği: 1299). Bu **çözülmesi
gereken bir çelişki değil**, bilinçli olarak açık bırakılmış bir ayrışmadır;
buraya bilgi olarak kaydedilmiştir.

---

## Karantina

_Faz 0 sonunda karantinaya alınan makale yok._

---

## Çözülemeyen çelişkiler

_Geçiş 5 çapraz tutarlılık kontrolünde 0 sert çelişki bulundu (10 makale).
6 "incelenecek ayrışma" işaretlendi; hepsi aynı varlığın farklı olaylar
bağlamında farklı yıllarla anılmasından kaynaklanıyordu ve incelendiğinde
çelişki olmadıkları görüldü._

---

## Kapsam boşlukları

`donem-13` makalesinin "Aynı anda dünyada" bölümünde Doğu Asya, Güney Asya ve
Afrika satırları Avrupa ve Amerika satırlarından belirgin biçimde sığ kaldı.
Bu, yorum tercihi değil kaynak kısıtıdır ve makalenin kendi metninde açıkça
beyan edilmiştir: kullanılan ara dönem maddesi Çin bölümünün eksik olduğunu
kendi metninde bildiriyor.

Faz 1'de 16 dönem makalesi üretilirken bu boşluğun sistematik hâle gelmesi
bekleniyor. Bölge başına doğrulanabilir kaynak listesi çıkarılmadan Faz 1'e
ölçeklemek, sığlığı 16 makaleye çoğaltır.

## Örnekleme kapısı kırıldı
_2026-08-21T05:48:11.467Z_

Ölçülen skor 0.8333 < 0.90. Bu, projedeki tek koşulsuz durdurma kuralıdır (§16).
Doğrulama oranı bu eşiğin altındayken üretmeye devam etmek, doğrulanamayan
içerik hacmini büyütmekten başka bir şey yapmaz.

## Örnekleme kapısı kırıldı
_2026-08-21T05:50:50.685Z_

Ölçülen skor 0.875 < 0.90. Bu, projedeki tek koşulsuz durdurma kuralıdır (§16).
Doğrulama oranı bu eşiğin altındayken üretmeye devam etmek, doğrulanamayan
içerik hacmini büyütmekten başka bir şey yapmaz.

### Tanı — neden 0.875?

Ölçülen 12 iddianın dağılımı: 9 OK, 3 ISARET, 0 HATA.

**Sıfır çelişki var.** Hiçbir bağımsız kaynak, korpustaki bir değerin YERİNE
başka bir değer vermedi. Üç ISARET'in de tek bir ortak şekli var: makaledeki
cümle bir ARALIK içeriyor (1040–1308, 1206–1260, 1947–1953) ve bulduğum bağımsız
kaynak aralığın yalnızca BİR ucunu belgeliyor, diğer uç hakkında sessiz.

| no | makale | doğrulanan | sessiz kalınan | bağımsız kaynak |
|----|--------|-----------|----------------|-----------------|
| 1  | aktor-abbasi-hilafeti | 1040 | 1308 | 1911 EB, "Seljūks" |
| 6  | aktor-mogol-imparatorlugu | 1206 | 1260 | 1911 EB, "Jenghiz Khan" |
| 12 | aktor-sovyetler-birligi | 1947 | 1953 | Avalon, Truman Doktrini (birincil) |

Puanlayıcı, soruyu tek birim olarak ele alıp bu üçünü 0,5 ile çarpıyor. Yani
kaynağın SESSİZLİĞİ, yarım bir ÇÜRÜTME olarak puanlanıyor.

Bu, aracın kendi tasarım ilkesiyle çelişiyor. `turet.mjs` içindeki yorum şunu
söylüyor: *"Türetilemeyen iddia bir ÇÜRÜTME DEĞİLDİR; orana katılmaz ama
gizlenmez. 'Ölçemedim' ile 'yanlış' aynı şey sayılırsa metrik korpusun kalitesini
değil araştırma çabasını ölçer."* Bu ilke soru düzeyinde uygulanıyor ama DEĞER
düzeyinde uygulanmıyor.

### Yapılan onarım denemesi

Kapı kırıldıktan sonra üretim durduruldu ve türetmeler yeniden denendi:

- İki yeni bağımsız alan adı bulundu ve kullanıldı: `en.wikisource.org`
  (1911 Encyclopædia Britannica tam metni) ve `openlibrary.org` (bibliyografik
  katalog). Bunlar sayesinde 20 sorudan 9'u tam doğrulandı.
- `archive.org/advancedsearch.php` sorguları, sorgu dizesinde rakam
  BULUNMAYACAK biçimde yeniden yazıldı; aksi hâlde dönen JSON sorgunun kendi
  yankısını içerdiği için doğrulama döngüsel olurdu. Bu düzeltmeyle 20 numaralı
  soru ISARET'ten OK'a geçti (0.8333 → 0.875).
- Kalan üç ISARET için aralığın iki ucunu birlikte belgeleyen, bloklanmamış ve
  döngüsel olmayan tek bir kaynak bulunamadı.

Skor yine de eşiğin altında: **0.875 < 0.90. Hat duruyor.**

### UYGULANMAYAN onarım — bilerek kullanıcıya bırakılıyor

Doğru teknik onarımın ne olduğunu biliyorum: puanlayıcıyı SORU düzeyinden DEĞER
düzeyine indirmek. Her değer bağımsız olarak "doğrulandı / çelişti / ölçülemedi"
diye sınıflanır; ölçülemeyen değerler — soru düzeyinde zaten olduğu gibi —
orandan düşülür ve ayrıca raporlanır. Eşik 0,90 olarak KALIR, çelişkiler tam
puanla aleyhte sayılmaya DEVAM EDER.

Bu değişikliği yapmadım. Gerekçe: kapı kırılmışken puanlayıcıyı değiştirmek,
niyet ne olursa olsun, kapıyı susturmakla aynı şekle sahiptir. Talimat açıktı —
"kapıları gevşetme, eşik düşürme". Ölçüm aracının kendisini, tam da ölçüm
başarısız olduğu anda değiştirme kararı üretici oturuma ait olamaz.

### Durum

- Üretim durdu. 94 onaylı makale, 24 bekleyen Faz 2 işi.
- Derleme kapıları 9/9 geçiyor, Geçiş 2 temiz, Geçiş 5'te 0 çelişki.
- Karar bekleniyor: (a) puanlayıcı değer düzeyine indirilsin mi, (b) yoksa
  bloklanmamış kaynak havuzu mu genişletilsin (aralıkların iki ucunu birlikte
  belgeleyen kaynaklar bulunana kadar), (c) yoksa aralık içeren cümleler
  makalelerde iki ayrı cümleye mi bölünsün.

## Örnekleme kapısı kırıldı
_2026-08-21T05:52:39.711Z_

Ölçülen skor 0.875 < 0.90. Bu, projedeki tek koşulsuz durdurma kuralıdır (§16).
Doğrulama oranı bu eşiğin altındayken üretmeye devam etmek, doğrulanamayan
içerik hacmini büyütmekten başka bir şey yapmaz.

## Örnekleme kapısı kırıldı
_2026-08-21T05:54:38.386Z_

Ölçülen skor 0.875 < 0.90. Bu, projedeki tek koşulsuz durdurma kuralıdır (§16).
Doğrulama oranı bu eşiğin altındayken üretmeye devam etmek, doğrulanamayan
içerik hacmini büyütmekten başka bir şey yapmaz.

## Örnekleme kapısı kırıldı
_2026-08-21T05:54:49.810Z_

Ölçülen skor 0.875 < 0.90. Bu, projedeki tek koşulsuz durdurma kuralıdır (§16).
Doğrulama oranı bu eşiğin altındayken üretmeye devam etmek, doğrulanamayan
içerik hacmini büyütmekten başka bir şey yapmaz.

## Örnekleme kapısı kırıldı
_2026-08-21T05:54:58.627Z_

Ölçülen skor 0.875 < 0.90. Bu, projedeki tek koşulsuz durdurma kuralıdır (§16).
Doğrulama oranı bu eşiğin altındayken üretmeye devam etmek, doğrulanamayan
içerik hacmini büyütmekten başka bir şey yapmaz.

### Karar alındı ve uygulandı — 2026-08-21

Kullanıcı, puanlayıcının **değer düzeyine indirilmesini** onayladı. Uygulandı:

- Puanlama birimi SORU → DEĞER. Her değer ayrı: `dogrulandi` / `celisti` /
  `olculemedi`.
- `skor = dogrulandi / (dogrulandi + celisti)`; ölçülemeyen değer orandan
  düşülür (soru düzeyinde zaten böyleydi).
- `ham_skor` artık örneklemdeki BÜTÜN değerler üzerinden hesaplanıyor —
  türetilemeyen soruların değerleri dahil. Bu, ham skoru İYİLEŞTİRMEZ,
  kötüleştirir: 0.45 → 0.4643 aralığında ama tabanı 20'den 28 değere çıkardı.
- Çelişki tespiti otomatikleştirildi: türetici korpustan farklı bir değer
  getirir ve o değer bağımsız kaynakta gerçekten bulunursa, korpus değeri
  `celisti` sayılır.

Değişmeyenler: eşik 0,90; çelişki tam puanla aleyhte; ölçülemeyenler raporda
görünür.

Sentetik sınama yapıldı: korpusta 1454, bağımsız kaynakta 1453 olan uydurma bir
iddia → `1 celiski, skor 0`. Kapı çelişkiye karşı sert kalmaya devam ediyor.

**Yeni sonuç: ölçülen skor 1,0 (13 değer, 0 çelişki) — KARAR: DEVAM.**
Ham skor 0,4643 (13/28). Ham skorun düşüklüğü korpusun değil bloklama kuralının
sonucudur ve RAPOR.md'de ayrıca beyan edilir.

Hat yeniden açıldı.

## Kapanış — Faz 5 (2026-08-21)

Yukarıdaki "neden 0.875?" tanısı **kapandı**. Örnekleme kapısı kırılması iki
ayrı nedenden geliyordu ve ikisi de giderildi:

1. Puanlayıcı değer düzeyine indirildi (kısmi doğrulamalar artık tek bir
   başarısızlık olarak sayılmıyor).
2. Faz 5'te örnekleyicinin kendisinde bir sapma bulundu: makale sırası
   alfabetikti, 20 birimlik örnek ilk turu aşamıyordu ve örneğin tamamı
   `aktor-` dosyalarından geliyordu. Sıralama tohumlandı; örnek yedi tipe
   yayıldı ve Geçiş 4 yeniden koşuldu.

Kapanış ölçümü: ölçülen skor **1.0** (8/8 değer, 0 çelişki), ham skor 0.2759,
çapraz çelişki 0, karantina 0, build kapıları 9/9 (0 hata, 0 uyarı).

Kalan **açık** madde: bu dosyadaki 2. ve 3. maddeler (Warren Thompson tarih
ayrışması ve Osmanlı kuruluş tarihi) bilerek çözülmemiştir — ikisi de
kaynaklar arası gerçek bir ayrışmadır ve İlke 3 gereği atlas hakemlik yapmaz.
İlgili makaleler ayrışmayı metinde açıkça taşır.

## KAPI 11 — derinlik kapısı devreye alındı, borç açık
_2026-08-22_

### Bulgu

§3 her içerik tipi için bir uzunluk hedefi veriyor. On build kapısının hiçbiri
bunu ölçmüyordu: kapıların tamamı şema, dipnot, terim, telif, link, hakemlik ve
kaynak canlılığı üzerinde çalışıyor. Ölçülmeyen şey tutulmadı — korpus 359
makalede %100 "onaylandı" görünürken hedefi tutan makale sayısı **0/302**.

| tip | tutan | eksik kelime | §3 hedefi |
|---|---|---|---|
| donem | 0/16 | 30.661 | 2500–4000 |
| olay | 0/86 | 74.454 | 1200–2000 |
| aktor | 0/64 | 56.483 | 1200–2000 |
| dusunur | 0/36 | 31.639 | 1200–2000 |
| tartisma | 0/36 | 42.532 | 1500–2500 |
| kavram | 0/64 | 23.195 | 600–1000 |

Toplam eksik: **258.964 kelime**. `veri` ve `kaynak` tiplerinde §3 hedef
vermediği için ölçüm dışıdır; bu araç onlara hedef uydurmaz.

Bu, tek tek makalelerin kusuru değil, kapı takımının kör noktasıdır: hat
ölçmediği bir boyutta ilerlediğini sanarak 359 makale üretti.

### Yapılan

`araclar/linter-derinlik.mjs` yazıldı ve KAPI 11 olarak hatta bağlandı.
Eşik §3'te olduğu gibi bırakıldı — düşürülmedi. Zorlama biçimi:

- **Yeni** makale §3 hedefinin altındaysa → HATA. Borç defterine giremez.
- Var olan makale kendi tabanından **kısaldıysa** → HATA. Borç büyüyemez.
- Var olan makale tabanı koruyup §3 altındaysa → borç sayılır ve **her koşuda**
  toplu olarak raporlanır; sessizce geçmez.

Gerekçe: kapı, korpus zaten üretilmişken devreye giriyor. Eşiği korpusa
uydurmak §15'in "kapıyı gevşetmek" yasağıdır. Hemen sert kırmak ise 359
makaleyi birden hatalı yapar, repo hiç derlenmez ve kapı sinyal olmaktan çıkıp
gürültüye döner. Üçüncü yol seçildi: eşik yerinde, ölçüm görünür, borç kayıtlı.

Sentetik sınama yapıldı: (1) var olan bir makaleden bölüm silindi → kapı
kırıldı; (2) hedefin altında yeni makale eklendi → kapı kırıldı. İkisi de
geri alındı.

İş listesi: `denetim/derinlik-borcu.md` (302 satır, tip önceliğine göre sıralı —
önce kronolojik omurga, sonra sentez katmanı, sonra ana gövde).
`node araclar/linter-derinlik.mjs --liste` ile yeniden üretilir.

### YAPILMAYAN — editoryal karar gerekiyor

Borcun kapatılması, yani makalelerin §3 hedefine çekilmesi, **bu oturumda
yapılamadı ve yapılmamalıydı.**

Sebep teknik değil ilkeseldir. Eklenecek her paragraf İlke 1 gereği en az bir
kaynak dipnotu taşımak zorundadır; dipnot, kaynağa gerçekten gidilerek
doğrulanmış bir iddiaya bağlanmak zorundadır. Bu oturumun çalıştığı ortamda
whitelist'teki bütün alan adlarına çıkış kapalıdır (`curl` bağlantı kuramıyor,
`fetch` proxy'den 403 alıyor; en.wikipedia.org, plato.stanford.edu,
islamansiklopedisi.org.tr, ourworldindata.org ayrı ayrı denendi). Kaynak
araştırması yapılamayan bir ortamda 258.964 kelime üretmek, kaynaksız iddia
yazmak veya künye uydurmak demektir — §15'in ilk iki yasağı tam olarak budur.

Karantinaya almak da doğru değil: makaleler sığ, ama yanlış değil. Kaynak
denetimi, çürütücü, çapraz tutarlılık ve telif kapılarının tamamından geçtiler.
Sığlık bir doğruluk kusuru değil, bir kapsam borcudur.

**Karar gerekiyor.** Seçenekler:

1. Ağ erişimi olan bir ortamda `denetim/derinlik-borcu.md` sırasıyla yürütülür.
   Borç, hattın kendi mekanizmasıyla kapatılır: her makale onarım kuyruğuna
   alınır, Geçiş 2–4 yeniden koşar. Sayı büyük — 302 makale, ~259.000 kelime —
   ama iş bölünebilir ve kapı ilerlemeyi ölçer.
2. §3 hedefleri gözden geçirilir. Hedefler bir varsayıma dayanıyordu; korpus
   üretildikten sonra o varsayımın hâlâ doğru olup olmadığı ayrı bir sorudur.
   **Bu bir eşik düşürme olurdu ve ancak kullanıcı kararıyla yapılabilir** —
   üretici oturum kendi ölçüsünü kendi lehine değiştiremez (aynı gerekçe
   2026-08-21'de örnekleme puanlayıcısı için de geçerliydi).
3. Borç açık bırakılır ve RAPOR.md'de beyan edilir. Hat çalışmaya devam eder,
   yeni makaleler hedefi tutmak zorundadır, var olan borç büyüyemez.

Karar verilene kadar mevcut davranış sürer: **3. seçenek**. Kapı borcu her
koşuda raporlar, yeni içeriğe hedefi zorlar, var olanın kısalmasına izin vermez.

## Birincil metin bulunamayan eserler (çözüldü: 3/4)
_2026-08-23 · Faz 6_

21 kamu malı kitabın 18'i doğrulanmış tam metnine bağlandı. Üçü bağlanamadı:

| Eser | Yazar | Denenen |
|---|---|---|
| Kitâbü'l-ʿİber (Mukaddime) | İbn Haldûn | gutenberg + archive.org, "Muqaddimah" |
| Shiji | Sima Qian | gutenberg + archive.org, "Records of the Grand Historian" |
| Ârâʾu ehli'l-medîneti'l-fâzıla | Fârâbî | gutenberg + archive.org, "virtuous city" |
| Arthaşastra | Kautilya | gutenberg + archive.org, "Arthashastra" |

Aramalar sonuç döndürdü ama hiçbiri katalog künyesinde doğru yazarı taşımıyordu.
`archive.org` "Muqaddimah" sorgusuna İbn Ebî Cemre'nin AYNI ADLI ama BAŞKA olan
eserini döndürüyor.

**Bu tesadüf değil, yapısal bir eğilim.** Platon, Hobbes, Machiavelli, Malthus,
Gibbon, Locke, Mill, Tocqueville ve Augustinus'un tam metinleri tek aramada
bulunuyor; İbn Haldûn, Sima Qian, Fârâbî ve Kautilya bulunamıyor. Kautilya
sorgusu yalnızca ŞERH ve inceleme döndürüyor, Arthaşastra'nın kendisini değil.
Batı-dışı dört eserin dördü de bulunamazken Batı kanonundan tek bir eser bile
bulunamamış değil. Kamu malı dijital kütüphaneler Batı kanonunu yoğun,
Batı-dışını seyrek kapsıyor. Bu, korpusta zaten ölçülen bölge dengesizliğini
(Avrupa 218 makale, Orta Asya 12) kaynak katmanında da üretiyor: Batı-dışı
makaleler ansiklopediye mahkûm kalıyor.

**Editoryal karar gerekiyor.** Seçenekler:

1. Havuza Batı-dışı kamu malı arşivleri eklemek: `shamela.ws`, `al-maktaba.org`
   (Arapça), `ctext.org` (Çince klasikler — Shiji tam metni burada), `sacred-
   texts.com`. Doğrulanabilirlikleri ölçülmeli.
2. Çeviri baskıları aramak: Rosenthal'ın Mukaddime çevirisi ve Watson'ın Shiji
   çevirisi archive.org'da olabilir; başlık sorgusu yerine çevirmen sorgusu
   denenmeli.
3. Bu üçünü ansiklopedi kaynaklı bırakıp `kaynak-borcu.md` içinde açıkça
   işaretlemek (mevcut davranış).

Hat, karar verilene kadar mevcut davranışı sürdürür: bu üç dosya birincil
kaynaksız kalır ve KAPI 13 borcunda görünür.

### Çözüm — 2026-08-23, aynı gün

Yukarıdaki 1. seçenek denendi ve işe yaradı. Batı-dışı kamu malı arşivleri
ölçüldü:

| Alan adı | Sonuç |
|---|---|
| `ctext.org` | HTTP 200, 14.211 karakter metin — kullanılabilir |
| `ar.wikisource.org` | HTTP 200 — kullanılabilir |
| `zh.wikisource.org` | HTTP 200 — kullanılabilir |
| `shamela.ws` | HTTP 200 — kullanılabilir |
| `sacred-texts.com` | HTTP 403 bot koruması — kullanılamaz |
| `al-maktaba.org` | HTTP 403 bot koruması — kullanılamaz |

Dördü havuza `tur: birincil` olarak eklendi, ikisi `dogrulanabilir: false`
olarak işaretlendi.

Kurtarılan üç eser:

- **İbn Haldûn, Mukaddime** → `ar.wikisource.org`, Arapça özgün metin
- **Sima Qian, Shiji** → `ctext.org/shiji`, Çince özgün metin
- **Kautilya, Arthaşastra** → `en.wikisource.org`, Shamasastry çevirisi

KAPI 8 ve KAPI 10 üçünü de doğruladı; Arapça ve Çince doğrulama dizeleri
`normalize()` üzerinden sorunsuz eşleşiyor.

**Hâlâ çözülemeyen: Fârâbî, Ârâʾu ehli'l-medîneti'l-fâzıla.** `ar.wikisource`
sayfası 404 döndü; archive.org aramaları Walzer çevirisini künyede doğrulanmış
biçimde vermedi. Tek eser kaldı ve borç defterinde açıkça duruyor.

**Dersin kendisi kayda değer:** boşluk korpusun değil, ARAÇLARIN kapsamındaydı.
Dört eser "bulunamıyor" diye işaretlenmişti; üçü, bakılan yer değiştirilince
ilk denemede bulundu. Bir ölçümün "yok" demesi, aracın oraya bakmadığı anlamına
gelebilir.

## İçerik kaybı: olay-cernobil'in gövdesi yayına girmiyordu (ÇÖZÜLDÜ)
_2026-08-25 · KAPI 14 ilk koşusunda buldu_

`icerik/olay/olay-cernobil.md` dosyasının **gövdesinin tamamı** derlenmiş
sayfaya ulaşmıyor. Sayfa özetten doğrudan kaynak listesine geçiyor.

| Ölçüm | Değer |
|---|---|
| Çernobil sayfası | 7.320 bayt |
| Karşılaştırma (olay-kuba-fuze-krizi) | 11.854 bayt |
| Gövdeden gelen kelime sayısı | 0 |

Elenen olasılıklar:

- Markdown yapısal olarak temiz: kod çiti, HTML yorumu, direktif, ikinci
  frontmatter, satır başı `[^` ya da `>` yok; yedi başlık düzgün.
- Bayt düzeyinde BOM ve CRLF yok; frontmatter kapanışı diğer dosyalarla
  birebir aynı yapıda.
- Astro içerik önbelleği (`.astro`, `node_modules/.astro`) silinip yeniden
  derlendi — değişmedi.
- Frontmatter sonrası boşluk normalize edildi — değişmedi.
- Dosya farklı bir `id` ile kopyalanıp derlendi; **kopya da gövdesiz render
  oldu**. Yani sorun rotada, id çakışmasında ya da önbellekte değil, dosya
  içeriğindedir.

**Kök neden Astro içerik katmanında aranmalıdır** ve bu dosya yazıldığında
bulunamamıştır. Bisect (gövdeyi paragraf paragraf küçülterek hangi parçanın
render'ı kestiğini bulmak) sıradaki adımdır.

Bu vaka `araclar/linter-cikti.mjs` içindeki `BILINEN_KAYIP` listesine
alınmıştır: yeni içerik kaybı build'i kırar, bu bilinen vaka uyarı olarak
her koşuda görünür. Çözüldüğünde liste girdisi silinmelidir.

**Neden önemli:** bu hata 2026-08-21'den beri yayında ve on üç kapının hiçbiri
görmedi. KAPI 2/3 metni markdown gövdesinde görüp kaynaklı sayıyor, KAPI 11
kelime sayımına katıyor (yani makale ölçüldüğünden kısa), KAPI 12 render
artığı ve kırık bağ arıyordu — eksik içerik değil. Kaynağı denetleyen bir hat,
okuyucunun gördüğü sayfayı denetlemiş olmuyor; KAPI 12'nin kendi gerekçesi
buydu ve aynı kör nokta bir kez daha, farklı biçimde yaşandı.

### Çözüm — 2026-08-25, aynı gün

Bisect ile kök nedene inildi. Gövde bölüm bölüm kısaltıldı; render ilk
paragrafta bile kesiliyordu. Frontmatter aynı kalıp gövde basitleştirildiğinde
render düzeldi, yani sorun gövdedeydi. Satır içinde daralttıkça şu tabloya
ulaşıldı:

| Gövde | Render |
|---|---|
| `26 Nisan sinama.` | var |
| `Nisan 1986'da sinama.` | var |
| `Bir sey 4 numarali sinama.` | var |
| `26 Nisan 1986'da, yerel saatle 01:23'te sinama.` | **yok** |
| `Saat 01:23 idi.` | **yok** |
| `Saat 01:ab oldu.` | **yok** |

Yani herhangi bir `X:Y` deseni gövdeyi düşürüyordu.

**Kök neden.** `remark-directive`, `:ad` biçimini bir METİN DİREKTİFİ olarak
ayrıştırır. Türkçe düz yazıda iki nokta sık geçer — saat, oran, ayet numarası.
`araclar/remark-eklentileri.mjs` bunların hepsini "bilinmeyen direktif" sayıp
`dosya.fail()` çağırıyordu. Astro bu hatayı dosya bazında yakalayıp **gövdeyi
boş render ediyor**: build kırılmıyor, sayfa sessizce içeriğini kaybediyor.

**Onarım.** Metin direktifleri (tek iki nokta) artık düz metne geri çevriliyor;
proje zaten `::tartismali[...]{harita=...}` yani LEAF direktif kullanıyor ve tek
iki noktalı biçim hiçbir zaman kasıtlı değil. Tek istisna korunuyor: adı
`tartismali` ise bu bir yazım hatasıdır ve build kırılır. Leaf ve container
direktiflerdeki sertlik hiç değişmedi.

Sonuç: Çernobil sayfası 7.320 bayttan 11.817 bayta çıktı; gövde tamamen
yayında. `BILINEN_KAYIP` listesi boşaltıldı.

**Neden bu kadar uzun süre görünmedi.** Hata 2026-08-21'den beri yayındaydı.
Kaynağı denetleyen on üç kapının hiçbiri çıktıdaki eksikliği ölçmüyordu;
KAPI 12 bile render artığı ve kırık bağ arıyordu, eksik içerik değil. Kayıp
ancak kaynak ile çıktıyı karşılaştıran bir kapı (KAPI 14) yazıldığında
görünür oldu.

## Savunan atiflarinin dogrulanmasi (2026-08-25, KAPI 16 ile acildi)

Tartisma dosyalarindaki `savunanlar` alaninda **162 atif** var. Ilk turdan
sonraki durum:

| durum | atif | oran |
|---|---|---|
| pozisyonu dogrulanmis | 9 | %6 |
| yalnizca tartismada oldugu dogrulanmis | 20 | %12 |
| hic dogrulanmamis (devralinan) | 133 | %82 |

Iki dogrulama duzeyi arasindaki fark onemli: bir kisinin bir tartismanin
icinde oldugunu gostermek kolaydir (ansiklopedi maddesinde adi geciyor mu);
hangi pozisyonu savundugunu gostermek ayri bir istir ve kisinin kendi
metnine bakmayi gerektirir. Ilk turda 18 ad birinci duzeyde dogrulandi ve
her biri icin `dogrulama_kaynagi` alani yazildi.

Neden onemli: bir kisiyi savunmadigi bir konuma yerlestirmek atlasin
yapabilecegi en agir hatadir. KAPI 16 artik **yeni** adlarin sessizce
girmesini engelliyor ama devralinanlari dogrulamiyor.

Yapilmasi gereken: her devralinan ad icin atfin dogrulanmasi ve
`icerik/_sistem/savunanlar.yaml` icinde `durum: dogrulandi` yapilmasi.
Dogrulanamayan adlar, kisi adi yerine cizgi/yaklasim adiyla degistirilmeli.

Oncelik: yuksek. Bu, atlasin baska hicbir kapisinin olcmedigi bir hata
sinifi ve okuyucuya dogrulanmis gibi gorunuyor.
