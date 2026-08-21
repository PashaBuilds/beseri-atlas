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
