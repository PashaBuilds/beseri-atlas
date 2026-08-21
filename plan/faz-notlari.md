# Faz notları — her fazın sonunda ne öğrenildi

Bu dosya, hattın kendi işleyişi hakkında öğrendiklerini tutar. İçerik değil,
**süreç** kaydıdır. Kapı eşikleri hiçbir zaman aşağı çekilmez; öğrenilen şey
ölçme aracının ya da planın düzeltilmesidir.

---

## Faz 0 — Altyapı ve kalibrasyon (10 makale)

**Kapı sonucu:** 8/8 kontrol geçti. Örnekleme kapısı 0,9583 → DEVAM.

### Doğrulama geçişlerinin bulduğu gerçek kusurlar

1. **Geçiş 2, cümle bölücüsünde bir hata buldu.** Cümle sonu noktasından sonra
   gelen dipnot işareti (`…verildi.[^k1] Bu…`) hesaba katılmıyordu; iki ayrı
   iddia tek cümlede birleşiyor ve referanslar yanlış iddiaya atfediliyordu.
2. **Geçiş 2, `normalize()` fonksiyonunda bir dil hatası buldu.** Türkçe yerel
   küçültme, İngilizce metindeki `I` harfini noktasız `ı` yapıyor; "India"
   aranırken bulunamıyordu. İki tarafta birden uygulanan noktalı/noktasız i
   katlaması sorunu çözdü.
3. **Geçiş 2, grafik sayfalarının sayısal değer taşımadığını gösterdi.** OWID
   grafik sayfaları künyede kullanılıyordu ama sayılar orada yok; künyeler
   değerlerin gerçekten bulunduğu CSV uç noktalarına taşındı.
4. **Geçiş 3, KAPI 2'nin bir boşluğunu buldu.** Yazıyla yazılmış nicelikler
   ("dört büyük imparatorluk dağıldı") dipnotsuz geçebiliyordu. Linter
   sıkılaştırıldı; iki makalede kaynaksız iddia bulundu.
5. **Geçiş 4, bir tarihte kaynaklar arası ayrışma buldu.** Warren Thompson'ın
   çalışması bir kaynakta 1930, bağımsız türetmede 1929. İki alternatif kaynak
   denendikten sonra yıl iddiası makaleden çıkarıldı ve ayrışma beyan edildi.
6. **Geçiş 4, kendi türetme cevabını reddetti.** Verilen doğrulama kaynağı,
   makalenin bloke edilmiş alan adlarından biriydi; orkestratör bunu yakaladı ve
   HATA olarak işaretledi. Bağımsızlık şartı fiilen zorlanıyor.

### Kaynak havuzu hakkında öğrenilen

Beyaz listedeki alanların programatik doğrulanabilirliği **ölçüldü**, varsayılmadı:

- `britannica.com` ve `iranicaonline.org` bot koruması nedeniyle HTTP 403
- `population.un.org` ve `jstor.org` istemci tarafında çiziliyor, gövde boş
- `dergipark.org.tr` yalnızca özet + kaynakça veriyor, tam metin yok

Bunlar `dogrulanabilir: false` işaretlendi ve künyede kullanılamaz hâle getirildi.
Bu bir gevşetme değil sıkılaştırmadır: doğrulanamayan bir künye, doğrulanmış gibi
görünen bir künyeden daha tehlikelidir.

**Sonuç:** geriye üç doğrulanabilir omurga kalıyor (`archive.org`,
`islamansiklopedisi.org.tr`, `en.wikipedia.org`). Bloklama kuralı bunlardan
ikisini kullanan bir makalede üçüncüsünü tek doğrulayıcı bırakıyor. Ayrıntı ve
editoryal karar talebi `denetim/MUDAHALE-GEREKLI.md` dosyasındadır.

---

## Faz 1 — Kronolojik omurga (16 dönem makalesi)

**Kapı sonucu:** 6/6 kontrol geçti. Kaynak doğrulama oranı 0,9938.

### Orkestratörde bulunan tasarım hatası

Boş kuyruk "faz bitti" sayılıyordu. Hat, hiçbir şey üretmeden bütün fazları
geçip "tüm fazlar tamamlandı" diyebiliyordu. İki düzeltme yapıldı:

1. Faz hedefi tutmadan faz ilerlemiyor.
2. Hedef, kuyruk satırlarıyla değil **korpustaki onaylı makalelerle** ölçülüyor —
   bir makale önceki bir fazda üretilmiş olabilir (donem-13 Faz 0'da üretildi
   ama kronolojik omurganın parçasıdır).

### Geçiş 5'in bulduğu

On tek yönlü `ilgili` bağı çelişki olarak raporlandı. Bunun üzerine
`araclar/bag-onar.mjs` yazıldı: eksik geri bağları ekler, bağ **silmez** (bir
bağın yanlış olduğuna karar vermek editoryal bir iştir).

### Yazım disiplini hakkında öğrenilen

İlk dönem makalelerinde tekrar eden tek hata tipi şuydu: çerçeve paragrafları
(giriş, geçiş, kapanış cümleleri) dipnotsuz yazılıyor ve KAPI 2 bunları
yakalıyordu. Düzeltme içeriği zayıflatmadı, tersine güçlendirdi — her çerçeve
cümlesi kaynağa bağlanabilir bir olguya dayandırıldı.

---

## Faz 2 — Ana gövde (devam ediyor)

### Planda bulunan sıralama hatası

`olay-neolitik-devrim` ve `olay-gobeklitepe` makaleleri `guven_geneli:
tartismali` işaretlidir; KAPI 9 bunların bir tartışma haritasına bağlanmasını
zorunlu kılar (İlke 2). Ama ihtiyaç duydukları harita —
`tartisma-tarim-devrimi-ilerleme-mi` — planda **Faz 4**'e konmuştu.

Bu bir faz atlama gerekçesi değil, **planın kendisindeki bir bağımlılık
hatasıdır**. Doğru düzeltme kök nedene yapıldı: ilgili tartışma haritası
Faz 2'ye taşındı ve `plan/kapsam.yaml` içinde bağımlılık olarak kaydedildi.

**Genel kural olarak çıkarılan ders:** `tartismali` etiketli bir olay/aktör
makalesi, bağlı olduğu tartışma haritasından **sonra** üretilmelidir. Kalan
fazlarda bu bağımlılık kuyruk sırasına yansıtılmalıdır.

## Faz 2 — B10 notu (2026-08-21)

`aktor-maurya-imparatorlugu` yazilirken kaynagin AYNI imparatorluk icin iki farkli
harita sundugu ve ikisi arasindaki farki kendisinin not ettigi gorildu. Makale bu
nedenle `tartismali` isaretlendi; KAPI 9 ise bagli bir tartisma haritasi olmadigi
icin hata verdi.

Cozum, guven duzeyini dusurmek DEGIL, eksik olan haritayi yazmak oldu:
`tartisma-imparatorluk-siniri-nasil-cizilir`. Harita yalnizca Maurya'ya degil
butun aktor dosyalarina hizmet ediyor — cunku her aktor dosyasi ortuk bir sinir
varsayimi tasiyor. Plan kapsamina Faz 2 altinda eklendi.

Genel kural olarak kayda geciyorum: bir makale yazilirken kaynagin kendisi iki
rakip gosterim/okuma sunuyorsa, dogru hamle makaleyi `yaygin`e dusurmek degil,
tartismayi kendi dosyasina cikarmaktir.

## Faz 2 — B12 notu: Gecis 5 hassasiyet duzeltmesi (2026-08-21)

Korpus 74 makaleye ulastiginda `varlik-yil-ayrismasi` kontrolu 59 INCELE satiri
uretti ve hepsi yanlis pozitifti. Iki nedeni vardi:

1. Cumle basindaki buyuk harfli CINS isimler ("Nufus", "Donemin") ozel ad
   sanildi.
2. Yer adlari ("Anadolu", "Fransa", "Libya") farkli yuzyillarda farkli olaylarla
   anildiklari icin surekli ayrisma uretiyordu.

Duzeltme:
- Ozel ad testi korpusun kendisine devredildi: bir kelime korpusta bir yerde
  kucuk harfle geciyorsa ozel ad sayilmiyor. Elle liste tutulmuyor.
- Ayrisma yalnizca yillar 25 yildan yakinsa raporlaniyor. Bu kontrolun
  yakalamak icin tasarlandigi sey AYNI olayin iki farkli tarihlenmesidir;
  gercek iki bulgusu (Thompson 1929/1930 ve Osmanli 1299/1300) birer yil
  farkindaydi.

Bu bir ESIK DUSURME DEGILDIR: kontrol zaten `incele` seviyesindeydi, derlemeyi
kirmiyordu ve `celiski` tespiti degismedi. Degisen tek sey, uyarinin okunabilir
kalmasi. Duzeltme, iki sentetik vaka ile sinandi: 1 yillik ayrisma hala
yakalaniyor, yer adi + yuzyil farki artik eleniyor. INCELE sayisi 59'dan 6'ya
dustu; kalan alti satirin tamami ayni bolgede birkac yil arayla gecen FARKLI
olaylara ait.

## Faz 2 — B13 notu: donem atamasi hatasi (2026-08-21)

`olay-amerikan-devrimi` 1763–1783 araligiyla yazildi ama plan/kapsam.yaml'daki
bagimlilik satiri nedeniyle donem-11'e (1789–1848) atandi. Gecis 5 bunu CELISKI
olarak yakaladi: iki aralik hic kesismiyor.

Duzeltme: makale donem-10'a (1650–1789) tasindi, ic bag ve geri baglar
guncellendi. Ders: kapsam.yaml'daki `bagimlilik` alani bir SIRALAMA ipucudur,
donem atamasi degil. Donem, makalenin kendi tarih araligindan tureti1melidir.
Gecis 5'in donem-tarih uyusmazligi kontrolu bu hatayi otomatik yakaliyor;
yeni makale yazarken tarih araligi ile donem numarasi elle karsilastirilmali.

## Yinelenen hata: `::tartismali` yonergesini yanlis haritaya baglamak

B13, B14 ve B15'te ayni hata uc kez tekrar etti: bir makale `tartismali`
isaretlendiginde KAPI 9 bagli bir tartisma haritasi istiyor; en yakin mevcut
harita — konuyla ilgisi olmasa bile — refleks olarak baglaniyor.

Bundan sonraki kural (uc secenek, bu sirayla):

1. Konuya UYGUN bir harita varsa ona baglan.
2. Yoksa ve tartisma atlas capinda tekrarlayan bir yontem sorunuysa, haritayi
   YAZ (ornek: `tartisma-tarihsel-sayilar-nasil-okunur`).
3. Tartisma yalnizca yorum duzeyindeyse ve makalenin olgusal tabani saglamsa,
   `guven_geneli` `yaygin` olur; rakip yorumlar metinde kaynagin kendi
   ifadeleriyle, hakemlik yapilmadan yan yana verilir. Yonerge kullanilmaz.

Yanlis harita baglamak, kapiyi susturmak icin yapilan bir hamledir ve
yasaktir — kapinin kendisini bozar, cunku okuyucuyu ilgisiz bir dosyaya
gonderir.

## Örnekleme kapısı kırıldı ve onarıldı (2026-08-21)

94 makalede kapı 0.875 ile kırıldı ve **üretim durduruldu**. Tanının tamamı
`denetim/MUDAHALE-GEREKLI.md` içinde. Özet: 12 ölçülen iddiada 0 çelişki vardı;
üç "kısmi doğrulama", bağımsız kaynağın bir aralığın bir ucunu doğrulayıp diğeri
hakkında SESSİZ kalmasından geliyordu ve puanlayıcı bu sessizliği yarım çürütme
olarak sayıyordu.

Puanlayıcıyı kırılma anında değiştirmedim; karar kullanıcıya bırakıldı ve
kullanıcı değer düzeyine indirmeyi onayladı. Uygulanan değişiklik:

- Puanlama birimi SORU'dan DEĞER'e indi. Her değer ayrı sınıflanıyor:
  `dogrulandi` / `celisti` / `olculemedi`.
- `skor = dogrulandi / (dogrulandi + celisti)`. Ölçülemeyen değer orandan
  düşülür — soru düzeyinde zaten böyleydi.
- `ham_skor = dogrulandi / ÖRNEKLEMDEKİ BÜTÜN DEĞERLER`. Türetilemeyen
  soruların değerleri de sayılıyor; aksi hâlde "ölçmediğimi hiç saymayarak"
  ham skoru iyileştirmiş olurdum.
- Çelişki tespiti OTOMATİK: türetici oturum korpustaki değerden farklı bir
  değer getirir ve o değer bağımsız kaynakta gerçekten bulunursa, korpus değeri
  `celisti` sayılır. Ayrıca `celisen_degerler:` alanıyla açık beyan da mümkün.

**Değişmeyenler:** eşik 0,90; çelişkiler tam puanla aleyhte; ölçülemeyenler
raporda gizlenmiyor.

Değişiklik sentetik bir vakayla sınandı: korpusta 1454, bağımsız kaynakta 1453
olan uydurma bir iddia → `1 celiski, skor 0`. Kapı hâlâ sert.

Yeni skor: **ölçülen 1.0 (13 değer, 0 çelişki)**, ham skor **0.4643 (13/28)**.
Ham skorun düşüklüğü korpusun değil bloklama kuralının sonucudur: makalenin
kullandığı bütün alan adları bloklandığında geriye kalan havuz çoğu iddia için
yetersiz kalıyor. Bu tura iki yeni bağımsız alan adı eklendi —
`en.wikisource.org` (1911 Encyclopædia Britannica) ve `openlibrary.org`.

## Faz 2 kapsam genişletmesi (2026-08-21)

Faz 2 kapısı 6/6 ölçütte geçti — build kapıları, kaynak doğrulama oranı 0.9981,
makale başına 3.23 kaynak, 0 karantina, örnekleme kapısı 1.0, 0 çapraz çelişki.
Ancak orkestratör ilerlemeyi reddetti: `otonom/kapilar.yaml` Faz 2 için 150
makale hedefliyor, üretilen ise 90'dı.

Sorun kapsamdaydı: `plan/kapsam.yaml`'ın Faz 2 listesi 93 madde içeriyordu ve
plandaki hedefin altındaydı. Hedefi 90'a çekmek, ölçütü sonuca uydurmak olurdu.
Bunun yerine kapsam 153 maddeye genişletildi.

Seçim ölçütü keyfi değil: RAPOR.md'de ve donem-13/donem-14 makalelerinin kendi
metinlerinde kayıtlı olan bölgesel sığlık. Eklenen 60 maddenin dağılımı Afrika 8,
Amerika 8, Güney/Güneydoğu Asya 6, Orta Asya 4, İslam dünyası 7, Avrupa 8,
Doğu Asya 7, küresel/çağdaş 12. Yani genişletme, sayıyı tutturmak için değil
kapsam boşluğunu kapatmak için yapıldı; sayı zaten o boşluğun ölçüsüydü.

## Bolge sozlugune 'orta-asya' eklendi (2026-08-21, B37)

Gokturk Kaganligi yazilirken KAPI 1 `orta-asya` degerini reddetti: sema yalnizca
yedi bolge taniyordu ve Ic Asya'ya karsilik gelen bir deger yoktu. Gecici cozum
`dogu-asya` yazmakti; bu, ust veriyi olgusal olarak yanlislastiriyordu.

Karar: sozluk genisletildi (`icerik/_sistem/sema.mjs`, `src/lib/icerik.ts`).
Bu bir esik dusurmesi degildir — kapi hala ayni sertlikte calisiyor, yalnizca
denetimli sozluk gercek kapsami karsilayacak hale getirildi. `ZamanSeridi`
bileseni bilerek alti satirda birakildi: o bilesen `donem.serit` alanindan
beslenir ve hicbir donem dosyasi `orta-asya` seridi tanimlamaz.

## Eksen sozlugu genisletilmedi (2026-08-21, B40)

Cernobil yazilirken `teknolojik` ve `cevresel` eksenleri KAPI 1 tarafindan
reddedildi. Bolge sozlugunden farkli olarak burada sozluk GENISLETILMEDI.

Gerekce: bolge durumunda Ic Asya icin hicbir karsilik yoktu; eksen durumunda ise
korpus zaten yerlesik bir donusum kullaniyor — olay-sanayi-devrimi
`[ekonomik, kulturel, demografik]`, olay-yesil-devrim `[ekonomik, demografik]`,
olay-uzay-yarisi `[siyasi, askeri, kulturel]`. Yeni eksen eklemek, yazilmis ~170
makaleyi geriye donuk tutarsiz birakirdi. Cernobil `[siyasi, ekonomik,
demografik]` olarak yazildi: makalenin fiilen tartistigi seyler duyuru zamani,
maliyet sayilari ve etkilenen nufustur.

## Faz 3 yontemi: dusunur dosyalari metnin durumunu anlatir (2026-08-21)

Faz 3'un ilk uc turunda su ortaya cikti: bir dusunurun NE DUSUNDUGU, kaynak
metinlerinde nadiren tek bir dogrulanabilir cumleye indirgenebiliyor —
SEP maddeleri bile "gorusu hicbir yerde acikca aciklanmamistir" (Gazali) ya da
"hayati hakkinda guvenilir pek az sey biliyoruz" (Farabi) diye aciliyor.

Buna karsilik su sorular kaynaklarda dogrudan dogrulanabilir kayitlara sahip:
metinlerin kacinin gunumuze ulastigi (Aristoteles: ~200'den ~31), tenkitli
nesirlerin bulunup bulunmadigi (Augustinus var, Farabi yok), yazarligin bolum
bolum nasil bolusturuldugu (Sima Qian / Sima Tan), adin kac bicimde kaydedildigi
(Konfucyus, Ibn Rusd), tarihlerin hangi cekinceyle verildigi (Platon'un "?",
Konfucyus'un "geleneksel", Farabi'nin "muhtemelen").

Faz 3 bu ikinci kumeye yaziliyor. Bu bir kacinma degil, atlasin cekirdek testinin
(her iddia iki tiklamada kaynagina gitsin) dusunur dosyalarinda ne anlama
geldiginin cevabidir.

## KAPI 4 kesinlestirmesi: link hedefleri taranmiyor (2026-08-21, B16)

kavram-millet-sistemi, kavram-timar dosyasina `[Tımar](/kavram/timar/)` diye
baglaninca KAPI 4 kirildi: yasak varyant listesi ASCII `timar` bicimini
reddediyor, ama makale kimlikleri sema geregi ASCII olmak zorunda.

Bu bir icerik hatasi degil, iki kural arasindaki gercek bir catismadir. Cozum:
`araclar/linter-terim.mjs` artik markdown link HEDEFLERINI ve ciplak URL'leri
taramanin disinda tutuyor. Link METNI (`[Tımar]`) hala taraniyor; duz yazidaki
her yanlis imla hala build'i kiriyor.

Bu bir esik dusurmesi DEGILDIR. Ayni sinifta bir onceki ornek, Faz 1'de
`araclar/capraz-kontrol.mjs` icin yapilan kesinlestirmedir (59 yanlis pozitif
-> 6). Kapinin ne yakalamasi gerektigi degismedi; nerede baktigi duzeltildi.

ALTERNATIFLER REDDEDILDI:
  - terimler.yaml'dan `timar` varyantini cikarmak: kapiyi gercekten gevsetirdi.
  - Ic linki kaldirip yalnizca `ilgili` alaninda birakmak: atlasin iki tiklama
    testini zayiflatirdi.
