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

## ONEMLI: "bolum yapisi" makaleleri dogrulanabilir atom tasimiyordu (2026-08-21, B19)

Faz 3'un kavram katmaninda hiz icin benimsedigim bir kalip — makaleyi kaynagin
BOLUM YAPISI uzerinden yazmak — sessiz bir kalite acigi urettiy. Gecis 2 bu
makalelerde `0 OK · 0 ISARET · 0 HATA` veriyordu: butun paragraflar ATOMSUZ
("denetlenebilir atom yok") sayiliyordu.

Butun kapilar yesildi, ama atlasin cekirdek testi karsilanmiyordu: "her iddia iki
tiklamada kaynagina gitsin". Dogrulanacak bir sey yoksa, dipnot bir suslemedir.

Tarama yapildi: 13 kavram dosyasi bu durumdaydi. Hepsi duzeltildi — her dosyaya
kaynakta FIILEN gecen somut atomlar eklendi (ozel adlar, yasam tarihleri, eser
kunyeleri, yuzdeler). Ornekler:
  - kavram-hegemonya: Antonio Gramsci (1891-1937); NATO'nun kuresel askeri
    harcamadaki %70 payi; ABD'nin 2009'da %43'u; Prusya / Alman Imparatorlugu
    (1871-1918); Napolyon / Fransiz Konsullugu (1799-1804).
  - kavram-donemlendirme: Tas Devri / Tunc Cagi / Demir Cagi; Barok'un 1600
    dolayinda baslamasi; muzik tarihinin donemi J. S. Bach'in olumuyle 1750'de
    bitirmesi.
  - kavram-ilkel-birikim: "bir yazar" yerine dogrudan Adam Smith ve Marx.

KURAL (bundan sonra): bir kavram dosyasi, Gecis 2'de en az bir OK almadan
onaylanmaz. Bolum yapisi anlatmak mesrudur ama tek basina yeterli degildir;
yaninda kaynakta dogrulanabilir en az bir somut kayit bulunmalidir.

## Surec onarimi: onay zinciri artik itirazla kapili (2026-08-21, Faz 4 B08)

Iki kez ayni hata oldu: curutucu ciktisi ile onay adimi tek bir kabuk komutunda
calistirildi, cikti onaydan SONRA goruldu ve cozulmemis bir ORTA itiraz
onaylandi (kavram-vergi, kaynak-pomeranz-buyuk-ayrisma). Ikisi de sonradan
incelendi; biri duzeltildi, biri duragan karar kapsaminda reddedildi.

Kalici cozum bir aliskanlik degil bir arac: `araclar/itiraz-ozet.mjs`.
Orta/yuksek itirazlari ozetler ve cozulmemis itiraz varsa cikis kodu 1 verir.

    node araclar/itiraz-ozet.mjs <id...> && sed -i 's/bekliyor/onaylandi/' ...

Zincir `&&` ile kuruldugu icin, cozulmemis bir itiraz varken onay adimi
CALISMAZ. Bu, kapiyi gevsetmenin tam tersidir: insan dikkatine dayanan bir adim
makineye devredildi.

## Veri dosyalarinda turetilmis sayilar (2026-08-21, Faz 4 B19)

veri-cocuk-olumleri'nde Gecis 2 iki HATA verdi: "225 gozlem" ve "224 yil"
sayilari kaynakta bulunamadi. Haklıydi — bu sayilar CSV'yi indirdikten sonra
BEN saydim; kaynagin metninde gecmiyorlar.

Kural: veri dosyalarinda gozlem sayisi, yil sayisi gibi TURETILMIS sayilar
govdede kaynaga atfedilerek yazilmaz. Bunlar indirilen dosyanin ozellikleridir
ve `veri-setleri/<ad>.LISANS.md` icinde kayitlidir. Govdede yalnizca kaynakta
FIILEN gecen degerler (ilk yil, son yil, uc degerler) kaynaga atfedilir.

Onceki veri dosyalari tarandi: yalnizca bu dosya etkilenmisti; digerlerinde
gozlem sayilari CSV metninde tesadufen bulunuyordu ve HATA vermemislerdi. Bu,
kapinin bu turdeki isaretinin guvenilir oldugunu ama sessiz gecen durumlarin da
olabilecegini gosteriyor — bu yuzden kural metne yazildi, kapiya birakilmadi.

## KAPI 10 yakaladi: yonlendirilen OWID adresi (2026-08-21, Faz 4 B19)

veri-askeri-harcama'da KAPI 10 (uydurma kaynak kontrolu) kirildi: makalede
yazili URL `military-expenditure-total`, dogrulama dizesi ise
`military_expenditure` idi. Gercekte o adres 301 ile `military-spending-sipri`
adresine yonleniyor ve varilan sayfanin sutun basligi `constant_usd`.

Yani makale, ICINDE ARADIGI DIZEYI TASIMAYAN bir adresi kaynak gosteriyordu.
Kapi bunu yakaladi. Duzeltme: URL yonlendirmenin VARDIGI adresle, dogrulama
dizesi de o sayfanin gercek sutun basligiyla degistirildi; lisans dosyasina
yonlendirme notu dusuldu.

KURAL: araclar/owid-indir.mjs bir yonlendirme izlediginde, makaleye yazilacak
kaynak URL'si indirilen adres degil VARILAN adrestir. Arac yonlendirmeyi
stderr'e yaziyor; o cikti okunup makaleye o adres yazilmali.

## Yinelenen kapsam-carpitmasi isareti icin standart ifade (2026-08-21, Faz 4 B26)

Bolgesel etiketli bir dosya OWID nufus/GSYH serisine atif yaptiginda curutucu
duzenli olarak ORTA ciddiyette kapsam-carpitmasi isaretliyordu: "dunya toplamini
verir" ifadesi kuresel dil sayiliyor.

Iki cozum vardi. Birincisi bolge etiketine `kuresel` eklemek — bazi dosyalarda
dogru (kavram-konfucyus, kaynak-weber-protestan-ahlaki: kaynak fiilen kuresel
bir kapsam anlatiyor), ama bir dusunur eserinin dosyasinda ust veriyi
genisletmek yanlis olurdu.

Ikinci cozum benimsendi: ifade daraltildi. "dunya toplamini verir" yerine
"saglayicinin toplam satirini verir". Bu daha DOGRU bir ifade — OWID CSV'sinde
`World,OWID_WRL` bir satirdir, bir dunya iddiasi degil — ve kuresel kapsam
iddiasi tasimaz. Bundan sonraki dosyalarda bu ifade kullaniliyor.

## Yeniden dagitilamayan veri kumesi (2026-08-21, Faz 4)

`democracy-index-eiu` grapher uc noktasi 403 doniyor ve govdesinde su yaziyor:
bu grafik yeniden dagitmamiza izin verilmeyen veri iceriyor.

Atlas bu kumeyi kullanmadi ve veri-setleri/ altina indirmedi. Kapsam listesindeki
`veri-demokrasi-endeksi` kalemi, yerine indirilebilir ve CC BY 4.0 lisansli bir
kume konarak degistirildi. Gerekce: Ilke 4 (telif siniri) yalnizca metin
alintilari icin degil veri kumeleri icin de gecerlidir; lisansi elvermeyen bir
kumeyi depoya koymak, atlasin kendi kuralini cignerdi.

Bu bir hedef dusurmesi degildir: kalem sayisi ayni kaldi, yalnizca hangi kumenin
kullanildigi degisti.

## Faz 4 — kitap sayfasi ile donem sayfasi ayrimi (2026-08-21)

`en.wikipedia.org/wiki/The_Age_of_Revolution` adresi kitabin sayfasina degil
**ayni adi tasiyan tarihsel donem** sayfasina yonleniyor. Kaynak olarak bu adres
verildiginde Gecis 2, kitabin devam ciltlerine ait 1875 ve 1914 sayilarini
"kaynakta bulunamadi" diye HATA isaretledi — dogru davranis, cunku o sayfada
gercekten yoklar.

Karar: kitap kunyeleri icin **kitabin kendi sayfasi** kullanilir
(`The_Age_of_Revolution:_Europe_1789%E2%80%931848`). Kaynak `not:` alanina
yonlendirmenin varligi yazilir.

Reddedilen alternatif: iddiayi zayiflatip 1875/1914'i cikarmak. Bu, kaynagi
degil makaleyi budardi; sorun makalenin degil kunyenin adresindeydi.

Ayni kural veri kumelerinde de gecerlidir (bkz. veri-askeri-harcama, KAPI 10).

## Faz 4 — kuyruk yer tutucusunun gercek kumeyle degistirilmesi (2026-08-21)

`veri-demokrasi-endeksi` icin EIU ucu 403 dondugu icin kapsam satirina
`veri-kisi-basi-enerji-yerine` adiyla bir **yer tutucu** konmustu. Sonradan ayni
konu icin yeniden dagitilabilir bir kume bulundu (V-Dem secimsel demokrasi
endeksi, `electoral-democracy-index`) ve `veri-demokrasi-endeksi` gercek
verisiyle uretildi. Boylece yer tutucu satirin varlik nedeni ortadan kalkti.

Karar: yer tutucu **silinmedi** — silmek hedefi bir dusururdu. Yerine gercek bir
kume kondu: `veri-fosil-elektrik-payi` (elektrik uretiminde fosil yakit payi,
1900-2025). Kapsam sayisi degismedi, teslimat gercek bir makaleye baglandi.

Ayrica: `share-of-electricity-production-from-fossil-fuels` adresi
`electricity-mix.csv?...` adresine yonleniyor. KAPI 10 kuralinca kunyeye
**varilan** adres yazildi.

## Faz 5 — ornekleyici sapmasi duzeltildi (2026-08-21)

`araclar/turet.mjs` orneklemi makale id'lerini **alfabetik** siralayip her turda
her makaleden bir iddia aliyordu. 20'lik ornek hicbir zaman ilk turu asamadigi
icin ornegin tamami alfabetik olarak ilk 20 makaleden — yani tamami `aktor-`
dosyalarindan — geliyordu. Kapi 1.0 okuyordu ama **tek bir makale tipini**
olcuyordu.

Duzeltme: makale sirasi `tohum()` ile siralaniyor. Determinizm korunuyor (ayni
korpus ayni ornegi verir), ornek yedi tipe yayiliyor.

Bu bir esik gevsetmesi degil **siki lastirmadir**: kapi artik korpusun tamamini
temsil eden bir ornegi olcuyor.

Reddedilen alternatifler:
- Ornegi buyutmek (20 -> 200): sapmayi gizler, kaldirmaz; ilk turlar yine
  alfabetik onceligi tasir ve maliyeti cok artar.
- Oldugu gibi birakip RAPOR'a dipnot dusmek: rapor dogru olurdu ama kapi yanlis
  olcmeye devam ederdi.

Sonuc (duzeltmeden sonra): olculen skor 1.0 (8/8 deger, 0 celiski), ham skor
8/29 = 0.2759. Ham skorun dusmesinin nedeni kalite dususu degil ornegin
degismesidir: yeni ornekte bes `veri` makalesi var ve bunlarin iddialari
saglayicinin **kendi dosyasinin ic yapisina** dairdir (bir serinin ilk gozlem
yili gibi). Gecis 4 tanimi geregi baska bir alan adi ister; bu tur iddialar
tanim geregi baska alan adindan turetilemez. Onlar Gecis 2'de (denetle.mjs)
dogrudan kaynak dosyasina karsi dogrulanir.

---

## Faz 5 sonrası — kapı takımının kör noktası (2026-08-22)

### Bulgu

On build kapısının **tamamı** markdown kaynağı ve frontmatter üzerinde
çalışıyordu. Tek istisna KAPI 6'nın dist tarafıydı ve o da yalnızca "onaysız
içerik yayına girmiş mi" diye soruyordu. Okuyucunun gördüğü sayfayı denetleyen
hiçbir kapı yoktu.

Bu boşlukta üç gerçek hata yaşadı ve **üçü de on kapının hepsinden geçti**:

1. `/hakkinda/` kendisiyle çelişen bir cümle yayımlıyordu: "Ölçülen doğrulama
   oranı %100 — yani her 20 iddiadan yaklaşık 1 tanesinin doğrulanamaması
   beklenir." Yanlış olan yuvarlama değil çıkarımın kendisiydi; oran 20 iddia
   üzerinden değil, bağımsız türetilebilen 8 değer üzerinden ölçülmüştü.
2. Grafik eksenleri bini aşan her değeri 1000'e bölüp " mr" ile etiketliyordu.
   8,2 milyar kişi "8.231.613,1 mr" okunuyordu; 24 veri sayfasının 8'i etkilendi.
3. Ölçeklenmeyen seriler tam sayıya yuvarlanıyordu. Aralığı 0–1 olan serilerin
   ekseni tamamen çöküyordu: demokrasi endeksi `0 0 0 0 1`, Gini `0 0 0 1 1`.
   Bu üçüncüsü **KAPI 12'nin ilk koşusunda bulundu** — 1 ve 2 elle bulunmuştu.

### Ders

Kaynağı denetleyen bir hat, okuyucunun gördüğünü denetlemiş olmuyor. Bir
doğrulama hattının kapsamı, denetlediği **katman** kadardır: markdown doğru
olabilir ve sayfa yine de yanlış bilgi gösterebilir.

Aynı ders derinlik için de geçerliydi (KAPI 11): ölçülmeyen boyut tutulmaz.
Korpus 359 makalede %100 "onaylandı" görünürken §3 uzunluk hedefini tutan
makale sayısı 0/302'ydi, çünkü hiçbir kapı uzunluğa bakmıyordu.

### Yapılan

- **KAPI 11 — derinlik** (`araclar/linter-derinlik.mjs`): §3 uzunluk hedefi.
- **KAPI 12 — çıktı denetimi** (`araclar/linter-cikti.mjs`): `dist/` üzerinde
  render artığı, render edilmiş iç bağ bütünlüğü ve grafik ekseninin CSV
  gerçeğiyle tutarlılığı. Sonuncusu 2 ve 3 numaralı hataları yakalayan tek
  kontroldür.
- **Pagefind** (§11): derleme anında üretilen tam metin araması. Kurulu değildi.

KAPI 12 sentetik olarak sınandı: orijinal " mr" hatası geri konduğunda kapı 14
hatayla kırıldı, geri alındığında temiz geçti.

### Açık kalan

KAPI 12 render *artıklarını* ve *sayısal tutarlılığı* yakalar; anlam
düzeyindeki çelişkiyi (1 numaralı hata gibi) yakalayamaz. Onu yakalayan şey
bir kapı değil, sayının nereden geldiğini sayfada beyan etme kuralı oldu.


## KAPI 8 kendi trafigi yuzunden kiriliyordu (2026-08-23)

Tam `npm run build` KAPI 8'de 19 hatayla kiriliyordu. Hatalarin tamami iki
alan adindan geliyordu: `plato.stanford.edu` (UND_ERR_CONNECT_TIMEOUT) ve
`gutenberg.org` (HTTP 503). Ayni URL'ler tek tek cekildiginde 200 donuyordu —
curl 1,3 sn, Node fetch 861 ms.

### Kok neden

329 benzersiz URL yalnizca **10 alan adina** dagiliyor; alan basina ~33 istek.
Cekici 6 eszamanli calisiyordu ve dilimleme URL sirasina gore yapildigi icin
ayni alana altisi birden gidiyordu. Site bizi hiz sinirlamasina aliyordu.
Kapi, olcmeye calistigi seyi kendi trafigiyle bozuyordu.

Ikinci ve daha sinsi kusur: `getir.mjs` "ag hatalari onbellege alinmaz" diyordu
ama kosul `durum !== 0` idi — 5xx bir durum kodu oldugu icin **onbellege
giriyordu**, TTL 7 gun. Gutenberg'in gecici 503'u diske yazildi ve sonraki iki
kosuda hic istek atilmadan geri dondu. Gecici bir kisitlama, bir haftalik
build arizasina donusmustu. Onbellek girdisini elle silip dogruladim.

### Yapilan

1. **Alan adi bazli nezaket.** Es zamanlilik artik FARKLI alan adlari arasinda
   (6 alan paralel); ayni alana istekler sirayla ve 600 ms araliklarla gider.
   Onbellekten donen cevap sunucuya dokunmadigi icin bekleme yalnizca gercek
   istekler arasinda uygulanir — onbellekli kosu yavaslamaz.
2. **5xx onbelleklenmez** ve `getir()` icinde yeniden denenir (4xx denenmez;
   404 gercekten 404'tur).
3. **OLU ile OLCULEMEDI ayrildi.** 4xx -> HATA. 5xx/baglanti hatasi ->
   "olcemedim". Bu ayrim projenin kendi ilkesidir; turet.mjs ayni cumleyi
   kuruyor: "Turetilemeyen iddia bir CURUTME DEGILDIR."

### Bu bir kapi gevsetmesi mi?

Hayir — cunku "olcemedim" bedava birakilmadi. Olculemeyen her URL
`denetim/olculemeyen.json` defterine ilk gorulme tarihiyle yazilir:

- 7 gunden uzun suredir olculemeyen URL **HATA** olur. Bir haftadir
  erisilemeyen kaynak gecici kesinti degil, kullanilamaz kaynaktir.
- Olculemeyenlerin orani %20'yi asarsa kapi kirilir: o noktada basarisiz olan
  korpus degil olcumun kendisidir ve "gecti" demek yanlis beyan olur.
- Olculemeyenler her kosuda ozet satirlarinda gorunur; sessizce gecmez.

Net etki eskisinden SERT: eskiden gecici bir 503 hatti kiriyor ama kalici
olarak olu bir kaynak, onbellek suresi doldugunda ayni sekilde yalnizca "bir
kosu" hatasi veriyordu. Simdi gecici kesinti gurultu yapmiyor, kalici kesinti
tarihiyle birlikte kayda geciyor ve kacinilmaz olarak hataya donusuyor.

Reddedilen alternatifler:
- **Es zamanliligi 1'e dusurmek:** kosuyu ~10 kat yavaslatirdi ve sorunu
  cozmezdi; sorun toplam hiz degil, ayni alana paralel baglanmakti.
- **5xx'i basitce yok saymak:** kalici olu bir kaynak sonsuza kadar gecerdi.
  Defter tam olarak bu bosluğu kapatiyor.
- **Bot korumasi gibi `dogrulanabilir: false` isaretlemek:** gutenberg.org
  bot korumali degil, hiz sinirli. Kalici bir yasak, gecici bir olcum
  sorununa yanlis cevaptir.

Sonuc: soguk onbellekle (CI senaryosu) tam kosu 3 dk 20 sn, 329 URL'in 328'i
olculdu, KAPI 8 ve 10 gecti.

## Site alt dizine tasindi — GitHub Pages proje sayfasi (2026-08-23)

GitHub Pages proje sayfalari `kullanici.github.io/<repo>/` altinda yayimlanir.
Astro `base` ayari KENDI urettigi varlik yollarini onekler ama **markup'ta elle
yazilan href'leri oneklemez**. Site tamamen kok-goreli baglarla yazilmisti.

Iki katman ayri ayri ele alindi:

1. **Sablon baglari** — `src/lib/icerik.ts` icinde `bag()` yardimcisi.
   Butun `href`/`src` degerleri buradan gecer; `yol()` de onu kullanir.
   Taban degisirse tek yerde degisir.
2. **Makale govdesindeki baglar** — 349 dosyada 945 kok-goreli bag vardi.
   Bunlari elle onekleyip makalelere dagitim yolunu gommek yanlis olurdu:
   icerik, nerede yayimlandigini bilmemelidir. Yerine `remarkTaban` eklentisi
   yazildi; onek build sirasinda ekleniyor, makaleler `/kavram/asabiyet/`
   yazmaya devam ediyor.

**KAPI 12 bu gocun denetleyicisi oldu.** Derlenmis href'leri gercek sayfalara
karsi dogruladigi icin, oneklenmemis her bagi tek tek yakaladi: once
`[slug].astro`'daki eksik import, sonra 945 markdown bagi. Kapiya "taban disi
ic bag" tanisi eklendi — kirik bagdan farkli bir sey soyluyor: bag var, hedefi
dogru, ama `bag()` yardimcisindan gecmemis.

Yakalanan iki yukleme sirasi hatasi:
- `remark-eklentileri.mjs` tabani modul yuklenirken okuyordu; import'lar hoist
  edildigi icin `astro.config.mjs` ortam degiskenini yazmadan once calisiyor ve
  taban her zaman bos goruunuyordu. Okuma cagri anina alindi.
- `linter-cikti.mjs` tabani `astro.config.mjs`'den regex ile okuyor; `base:`
  satiri `base: TABAN` olunca regex tutmaz oldu, `const TABAN = '...'`
  satirini okuyacak sekilde guncellendi. Taban hala tek yerde tanimli.

Sonuc: 373 sayfa, 7305 ic bagin tamami cozuluyor, 9/9 kapi 0 hata 0 uyari.

## Zaman seridinin negatif marji iki yerde birden bozuyordu (2026-08-23)

`.serit` "izgarayi kiran tek oge" niyetini su satirla uyguluyordu:

    margin-inline-start: calc(-1 * (var(--ray) + 3rem));

Marj `.sayfa` izgarasina gore olculmustu — okuma sutununun sol kenarindan
raya kadar olan mesafe. Ama bilesen IKI ayri kapsayicida kullaniliyor ve
ikisinde de yanlis sonuc veriyordu:

| Kapsayici | Ne oluyordu |
|---|---|
| `.govde` (makale sayfasi) | `.ray` yapiskandir (`position: sticky`). Serit onun ALTINA kayiyor, ray metni ile serit basligi/tablosu ic ice giriyordu. |
| `.genis` (ana sayfa) | Kapsayici zaten tam genislikte. Marj seridi gorunum alaninin SOLUNA itiyordu: olculen deger `sol: -216px`. Seridin ilk 216 pikseli ekran disinda ve erisilemez halde kirpiliyordu. |

Ana sayfadaki hata daha agirdi ve fark edilmemisti: baslik paragrafi soldan
kesiliyordu ("...n sutunu alti seridi birden keser"), yatay kaydirma ile de
geri getirilemiyordu cunku tasma gorunum alaninin disindaydi.

### Karar: negatif marj kaldirildi

Tam genislik artik kapsayicinin isi. Ana sayfada `.genis` bunu zaten veriyor;
makale sayfasinda serit okuma sutununda kaliyor.

Olculen maliyet kucuk: makale sayfasinda serit 933px yerine 669px genisliginde.
Ama serit tablosu **2371px** — yani her iki durumda da yatay kaydirma
kacinilmaz. `.serit__kaydir` (overflow-x) ve yapiskan bolge sutunu tam olarak
bunun icin var. Kazanilan 264px, 2371px'lik bir tabloda ~1,3 sutun demekti.

Reddedilen alternatifler:
- **Seridi rayin uzerine bindirmek** (`z-index` + opak arka plan): govde
  gratikul gradyani tasiyor; opak bir bant o dokuyu bir dikdortgen boyunca
  yok ederdi. Gorsel olarak yeni bir kusur uretirdi.
- **Rayi serit olan sayfalarda yapiskanliktan cikarmak**
  (`.sayfa:has(.serit) .ray { position: static }`): tasmayi korurdu ama
  yapiskan rayi tam da en uzun makalelerde (16 donem makalesi) kaybederdik.
- **Seridi kendi izgara satirina almak** (rayin yapiskan alani boylece biterdi):
  layout acisindan en temizi, ama `<ZamanSeridi>`'yi `<main>` disina cikarmayi
  gerektiriyor. Bu, seridi kaynak listesinin ALTINA dusurur ve
  `data-pagefind-body` disinda birakir — okuma sirasi ve arama davranisi
  degisir. Gorsel bir hata icin fazla buyuk bir bedel.

Dogrulandi (375 / 1280 / 1920): cakisma yok, sola tasma yok, sayfa duzeyinde
yatay kaydirma yok. Mobilde ray zaten statik, orada da temiz.

## Okuma hattı: bir dönemi sırayla okumak (2026-08-23)

Site 359 makaleyi haritalıyordu ama hiçbirini bir SIRAYA koymuyordu. Dönem 14'e
ait 31 makale vardı; dönem sayfası bunların yalnızca elle yazılmış `ilgili`
listesindeki 10 tanesini gösteriyordu. Kalan 21'ine ancak arama ya da dizin
üzerinden, tesadüfen ulaşılabiliyordu. Hiçbir makalede "sonraki" bağı yoktu.

Sıranın verisi zaten korpustaydı (`donem` + `tarih_baslangic` + `tarih_bitis`),
yalnızca hiçbir sayfada gösterilmiyordu.

### Hangi makaleler hatta girer

200 / 359. Dönemi olan tipler: olay (86), aktör (63), tartışma (35), dönem (16).
Kavram (64), düşünür (36), kaynak (33) ve veri (24) makalelerinde `donem` alanı
yoktur ve bu bir eksik değildir: İbn Haldûn'u ya da "asabiyet"i tek bir döneme
koymak yanlış olurdu. Onlar hat boyunca bağlarla girilen derinlik olarak kalır.

### İki sıralama kararı

**MÖ tarihleri sayısal ayrıştırılır.** Metin olarak sıralamak yanlış sonuç
veriyordu: korpusta dolgu tutarsız ("-0094", "-500", "-10000") ve
"-0094" < "-500" karşılaştırması MÖ 94'ü MÖ 500'den önceye koyuyordu.

**Tartışmalar dönemin sonuna alınır.** Bir tartışma dönemin içinde geçen bir
olay değil, dönem hakkında sorulan bir sorudur; `tarih_baslangic` alanı da
sorunun KONUSUNUN tarihini taşır. Düz kronolojide bu, 1888 tarihli
"Demografik geçişin sonuçları ne?" makalesini 1945–1991 döneminin BAŞINA
koyuyordu — okur, hakkında tartışılan malzemeyi görmeden tartışmayı okuyordu.
Önce malzeme, sonra itirazlar.

Yan bulgu: yalnızca başlangıç yılını göstermek yanıltıcıydı. "Çin Devrimi
(1949)" makalesinin yanında `tarih_baslangic` gereği "1927" yazıyor ve başlıkla
çelişiyor gibi duruyordu. Etiket artık aralık gösteriyor: "1927–1949".

### Hat kopmaz

Dönemin son makalesinden sonraki adım bir sonraki dönemin giriş makalesidir.
Dönem 01'in girişinden başlayıp `sonraki` bağlarını takip ederek Dönem 16'nın
sonuna kadar hiç geri dönmeden gidilebilir.

Doğrulandı: hat baştan sona yürütüldü — 200 makaleye ulaşıldı (dönemi olan
makale sayısıyla birebir), 16 dönem girişi sırayla, kırık bağ yok, döngü yok.

### Arama indeksi

Her iki bileşen de `data-pagefind-ignore` taşır. Bunlar gezinme, içerik değil;
30 başlık + özet dönem sayfasının gövdesine girseydi arama sonuçları
seyrelirdi. İndeks sözcük sayısı değişmedi (14.639), yani dışarıda kaldılar.

## Faz 6 — kaynakları gerçek metinlere bağlamak (2026-08-23)

Ölçüldüğünde çıkan tablo:

| Ölçüm | Değer |
|---|---|
| Kural ihlali (>1 giriş kapısı künyesi) | 226 / 359 makale (%63) |
| Hiç birincil kaynağı olmayan makale | 326 / 359 (%91) |
| en.wikipedia.org künyesi | 589 / 1105 (%53) |
| Farklı alan adı sayısı | 10 |

Kural yeni değil. Havuz `en.wikipedia.org` için 2026-08-20'den beri şunu
yazıyordu: *"her makalede en fazla bir Wikipedia künyesi bulunabilir."*
Hiçbir kontrol bunu ölçmüyordu.

Havuz `gutenberg.org`, `archive.org`, `perseus.tufts.edu`, `avalon.law.yale.edu`,
`marxists.org` alanlarını ZATEN birincil olarak onaylıyordu. İzin vardı,
kullanılmadı: marxists.org korpusta sıfır kez, gutenberg.org bir kez geçiyor —
üstelik 33 kaynak dosyasının 24'ü kamu malı kitaplar. Atlas kitapları
listeliyor ama okumuyordu.

### KAPI 13 — kaynak bileşimi

Ölçer, hata vermez. Gerekçe KAPI 11'inkiyle aynı: bugün hata yapılsa 226 makale
build'i kırardı ve tek çıkış ya kuralı gevşetmek ya da 226 makaleyi bir gecede
yeniden kaynaklamak olurdu. Eşik düşürülmez, ölçüm susturulmaz, borç
`denetim/kaynak-borcu.md` dosyasına yazılır. Borç sıfıra indiğinde kapı hataya
çevrilecektir.

### araclar/birincil-bul.mjs

Bir eserin tam metnini gutenberg ve archive.org'da arar, bulduğu adayı fetch
edip doğrular — KAPI 8 ve KAPI 10 build sırasında ne soracaksa onu önden sorar.
Arama için gutendex.com kullanılır; havuz kuralı gereği o alan adı yalnızca
OKUNUR, künyeye yalnızca birincil alan adları yazılır.

### İlk yeniden kaynaklama

`kaynak-smith-uluslarin-zenginligi` — eserin beş kitabının adları artık
ansiklopedi özetinden değil eserin kendi içindekiler tablosundan alınıyor
(gutenberg.org tam metni). Dosya bir zamanlar şunu yazıyordu: *"Bu dosya eserin
metnine bağlanmaz; kullanılan kaynak eser hakkındaki bir ansiklopedi
maddesidir."* Beyan dürüsttü, durum kusurluydu. Bağ kuruldu.

Yan onarım: `kaynak-canlilik.mjs` main-guard'ı `process.argv[1]`i korumasız
okuyordu; modül `node -e` ile import edildiğinde import anında çöküyordu.

## birincil_tur: bir kaynağın "birincil" olması tek bir şey değil (2026-08-25)

Üç Güney Asya dosyası art arda aynı boşluğu işaret etti:

| Dosya | Kaynak | Ne söyler |
|---|---|---|
| İndus Vadisi | kazı raporu | metin yok, yalnızca nesne |
| Aşoka | kamuya kazınmış duyuru | yönetim kendini anlatır |
| Chola | tapınak duvarındaki işlem kaydı | yönetim ne yaptığını yazar |

Üçü de künyede `tur: birincil` taşıyordu ve künye aralarındaki farkı
göstermiyordu. Oysa fark belirleyicidir: bir duyurudan yönetim pratiği, bir
işlem kaydından yönetim söylemi okunamaz. Her tür farklı bir soruya cevap
verir ve hiçbiri ötekinin yerine geçmez.

### Denetimli sözlük

`eser` (eserin kendisi) · `belge` · `kitabe` · `kazi` (kazı raporu) ·
`tanik` (tanıklık)

Beşi de korpusta gerçek örneklere sahiptir; sözlük varsayımla değil eldeki
malzemeyle kuruldu.

### Alan neden zorunlu değil

Zorunlu yapılması 373 makaleyi bir anda bozardı. Alan opsiyoneldir; KAPI 13
doldurulmamış künyeleri her koşuda sayar ve borç olarak raporlar. Şu an
112 birincil künyenin tamamı sınıflandırılmıştır.

### Alt tür künye başınadır, eser başına değil

Aynı eser farklı makalelerde farklı alt tür taşıyabilir ve bu doğrudur.
Thukydides'in eseri, kendi kaynak dosyasında `eser`dir; Pers-Yunan savaşları
makalesinde olayların `tanik`ıdır. Ayrım, metnin ne olduğuyla değil o
makalede ne için kullanıldığıyla ilgilidir.

### Okur tarafı

Künye listesinde tür artık "Birincil · kazı raporu" biçiminde görünür.
Okur, bir iddianın hangi türden bir kayda dayandığını künyeden okuyabilir.

## Tur 28 — kaynak katmaninin bolge acigi kapatildi (2026-08-25)

Kaynak katmani 33 dosyaydi ve dagilimi soyleydi: Avrupa agirlikli, birkac
Cin ve Islam dunyasi metni. Guney Asya, Orta Asya, Afrika ve Amerika'dan
**tek bir metin yoktu**. Oysa bu dort bolgenin aktor ve dusunur katmanlarinda
toplam 200'e yakin dosya bulunuyordu.

Tespit edilen sorun: bir bolge hakkinda dosya bulunmasi ile o bolgenin kendi
metninin atlasa girmesi ayri seylerdir. Ikincisi olmadan bolge, baskalarinin
anlattigi bir konu olarak kalir. Bu, atlasin kendi ilkesine (iki tiklamada
kaynaga inmek) sadik kalirken bile ortaya cikabilen bir yanlilik bicimidir.

Eklenen alti dosya:

| dosya | bolge | birincil_tur | metin |
|---|---|---|---|
| kaynak-kautilya-arthasastra | guney-asya | eser | Shamasastry 1915 + Sanskritce 1919 |
| kaynak-orhon-yazitlari | orta-asya | kitabe | Ross 1930 + Thomsen 1892 |
| kaynak-yusuf-has-hacib-kutadgu-bilig | orta-asya | eser | Vambery 1870 (Uygurca + Almanca) |
| kaynak-guaman-poma-nueva-coronica | amerika | belge | 1615, iki cilt |
| kaynak-popol-vuh | amerika | eser | Recinos-Goetz-Morley |
| kaynak-timbuktu-tarihleri | afrika | eser | Houdas 1898 + Fr. ceviri |

Reddedilen adaylar ve gerekcesi:
- `anonimo-popol-vuh` (archive.org): katalogda yazar, tarih ve dil alanlari
  bos. Dogrulanamaz kunye; reddedildi.
- Gutenberg 56550 "The Popol Vuh" (Lewis Spence): metnin kendisi degil,
  yeniden anlatimi. Birincil sayilamaz; reddedildi.
- `florentine-codex` (archive.org): indirilebilir metin dosyasi yok.
  Okuyucunun metne inememesi kaynak sartini bozar; reddedildi.
- `islamansiklopedisi.org.tr/orhun-yazitlari`, `/gokturkler`, `/bilge-kagan`:
  ucu de arama sonucu sayfasi dondurdu (baslik "Arama - TDV..."). Dogru slug
  `/orhon-yazitlari` olarak bulundu. TDV slug'lari her seferinde baslik
  denetiminden gecirilmelidir.

Acik birakilan: Timbuktu tarihlerinin iki kitabinin katalog kayitlari
birbirine karismis durumda (bir kitabin adi otekinin yazariyla eslesiyor).
Kunyelerde katalog basliklari **oldugu gibi** birakildi ve durum dosyanin
govdesinde kaydedildi. Duzeltmek karisikligi cozmek degil gizlemek olurdu.

Birincil kunye sayisi 119 -> 131. Toplam makale 377 -> 383.

## Tur 29 — ayni konunun iki dosyasi (2026-08-25)

Kaynak katmanini genisletirken aktor katmaninda iki cift dosyanin ayni siyasi
birimi anlattigi gorüldü. Ikisi de bu oturumda benim actigim dosyalardi:
mevcut dosyayi kontrol etmeden yenisini yazmisim.

Onemli olan sudur: **her dosya tek tek butun kapilardan geciyordu.** Sema,
dipnot, terim kilidi, bag butunlugu, telif, hakemlik, derinlik, kaynak
bilesimi — hicbiri "bu konu zaten var mi" diye sormuyordu. Kapilar dosyanin
kendi ic tutarliligini olcuyordu, korpusun tutarliligini degil.

Birlestirme yontemi: eski id korunur (donem okuma hattinda ve capraz
atiflarda gomulu oldugu icin), govde iki dosyanin birlesimi olur, kaynak
kunyeleri sadelestirilir, atiflar yonlendirilir, eski dosya silinir.

Yan kazanc: iki birlesmis dosya da §3 hedefini tutuyor (1597 ve 1716 kelime).
Onceden dordunun hicbiri tutmuyordu. Gana'da giris kapisi kunyesi ucten bire
indi.

KAPI 15 yazildi. Ilk olcut ("ayni tipte iki dosya bir sozcuk paylasiyorsa")
139 yanlis pozitif verdi:
- bitisik donem dosyalari yil sayilarini paylasiyordu,
- "Devrimi", "Savaslari", "Cagi", "Dunya" gibi sozcukler ayirt edici degil.
Duzeltme: (a) donem ve veri tipleri kapsam disi, (b) genel sozcuk listesi
genisletildi, (c) olcut tek ortak sozcukten **kapsama iliskisine** cevrildi —
kucuk cekirdegin her sozcugu buyuk cekirdekte karsilik bulmali, (d) eslesme
Turkce eklere toleransli (selcuklu ~ selcuklular).

Dogrulama: gercek korpusta 0 hata; birlestirdigim iki cifti iceren sahte
korpusta 2 hata. Kapinin yakalamasi gerekeni yakaladigi ancak ikinci testle
gosterilebilirdi — sifir hata tek basina kapinin calistiginin kaniti degil.

Toplam makale 383 -> 381. Sayi dustu; atlas duzeldi.

## Tur 30 — Orta Asya aktor katmani; Hazarlar ertelendi (2026-08-25)

Iki dosya eklendi:

- **aktor-uygur-kaganligi** (1220 kelime): bozkirdan yerlesiklige gecisin
  atlastaki en acik ornegi. Iki birincil kaynak: onceki duzenin tas kaydi
  (Orhon) ve bolgeden cikan elyazmalari (Muller, Uigurica 1908). Bolgenin
  **kendi kaydina baglanan ilk aktor dosyasi**.
- **aktor-sogdlular** (1219 kelime): devlet kurmadan kitalar arasi ticaret
  agini yuruten topluluk. Aktor katmanina siyasi birim olmayan bir konunun
  konmasi bilincli bir tercih; gerekcesi dosyanin icinde yazili. Birincil
  metin bulunamadi ve bu dosyada acikca beyan edildi.

### Hazarlar ertelendi — gerekce kayda gecirilmelidir

Bu tur ucuncu dosya olarak Hazarlar planlanmisti. archive.org'da "khazar
correspondence" aramasi bes sonuc dondurdu ve **besinin dordu Holokost
inkarcisi yayinlardi**; "Hazar" terimi antisemitik bir komplo teorisinin
anahtar kelimesi oldugu icin arama uzayi kirli.

Karar: konu yasakli degil — Hazarlar mesru bir tarih konusudur ve atlasa
girmelidir. Ama kaynak secimi burada normalden daha dikkatli yapilmalidir:
TDV HAZARLAR maddesi (dogrulandi, 200) + akademik bir kaynak + Hazar
Yazismalari'nin **bilimsel bir baskisi**. Ilk turda ne cikarsa onunla
yazilamaz.

Bu, atlasin kaynak havuzu icin genel bir ders tasir: beyaz listede olan bir
alan adi (archive.org) icindeki her ogenin guvenilir oldugu anlamina gelmez.
Havuz alan adini onaylar, tek tek ogeyi degil. Katalog kunyesi dogrulamasi
(tur 27'de eklendi) bu isi kismen yapar ama konu bazli kirlilige karsi tek
basina yetmez.

Kuyruga eklendi: aktor-hazarlar (dikkatli kaynak secimiyle).

Toplam makale 381 -> 383.

## Tur 31 — Hint Okyanusu: atlasin en buyuk yapisal bosluğu (2026-08-25)

Atlasta Atlantik ekonomisi uzerine dosyalar vardi (kole ticareti, merkantilizm,
dunya sistemi, buyuk ayrisma). Ondan yuzyillar once ve daha genis bir cografyada
isleyen Hint Okyanusu duzeni icin **tek bir yapisal dosya yoktu**. Kilva,
Srivijaya, Chola ve Cheng Ho dosyalari atlasta ayri ayri duruyordu; onlari
birbirine baglayan sey yazilmamisti.

Uc dosya eklendi:

- **kavram-hint-okyanusu-ticareti** (694 kelime): duzenin kendisi. Iki birincil
  kaynak arasinda yaklasik bin uc yuz yil var — Periplus (MS 1. yy, tuccar
  rehberi) ve Ibn Battuta (14. yy, yerinde gozlem). Ikisinin ayni limanlari,
  ayni mallari ve ayni ruzgar takvimini anlatmasi, surekliligin yorum degil
  iki bagimsiz kaydin ortusmesi oldugunu gosteriyor.
- **aktor-malaka-sultanligi** (1202 kelime): toprak degil gecit uzerine kurulmus
  devletin en acik ornegi. Kendi saray anlatisini birakmis (Sejarah Melayu) —
  atlasin Guneydogu Asya dosyalari arasinda tek. Yuz yillik omru dosyanin
  gerekcesini zayiflatmaz: kisa omurlu ornekler, uzun omurlu devletlerde
  yuzyillara yayildigi icin gorunmez olan yapiyi tek seferde gosterir.
- **kavram-svahili-kiyisi** (661 kelime): siyasi birlik olmadan kulturel birlik.
  Kokeni ::tartismali — yazili kayitlar okyanus baglantisini, kazilar ic bolgeyi
  one cikariyor; iki kanit turu ayni yone isaret etmiyor.

### Kapilar bu turda is gordu

KAPI 11 (derinlik) yeni bir dosyayi 568 kelimede reddetti — "yeni makale; borc
defterine giremez". Bu kural onceki turlarda yazilmisti ve ilk kez burada
devreye girdi. Eski dosyalarin borcu birikebilir ama yeni dosya borcla dogamaz.

KAPI 2 (terim kilidi) "iki ucundaki" ifadesini kaynaksiz paragrafta yakaladi.
Yaziyla yazilmis nicelik bildiren ifadeler de sayidir.

### Tekrar eden hata: direktif metinlerini ASCII yazmak

Uc dosyanin da ::tartismali direktifini once diyakritiksiz yazdim, sonra
duzelttim. Sebep: direktif govdesi kod gibi hissettiriyor ama okuyucunun
gordugu duz metindir. Sonraki turlarda direktif metni de govde prozasiyla ayni
ozende yazilmali.

Toplam makale 383 -> 386.

## Tur 32 — Guneydogu Asya ve Hint Okyanusu'nun dort kosesi (2026-08-25)

Dort aktor dosyasi eklendi; hepsi bir onceki turda yazilan
kavram-hint-okyanusu-ticareti dosyasina baglaniyor ve her biri o duzenin
farkli bir isleyisini gosteriyor:

| dosya | kelime | gosterdigi mekanizma |
|---|---|---|
| aktor-ayutthaya-kralligi | 1273 | karma gelir (tarim + liman); Avrupa devletlerini dengeleme |
| aktor-pagan-kralligi | 1201 | dini bagisin vergi tabanini kalici olarak asindirmasi |
| aktor-ace-sultanligi | 1229 | ablukanin alternatif guzergahla asilmasi; uretici liman |
| aktor-maldiv-sultanligi | 1263 | iki kitada para olarak kullanilan tek kaynakli mal |

Ace ve Maldivler dosyalarinda **sifir Wikipedia kunyesi** var: ucu de TDV
maddeleri ve birincil metinler. Giris kapisi orani boylece dususe gecti.

### Uzunluk kalibrasyonu (olculdu, tahmin degil)

Uc paragrafli bir bolum ortalama ~62 kelime tutuyor. Aktor hedefi (1200-2000)
icin **20-22 bolum** gerekiyor. Onceki turlarda 9-15 bolumle yazip sonradan
genisletiyordum; bu, dosyayi ikinci kez yazmak demek ve gereksiz.

### Tekrar eden hata: okuma yonlendirmesi kaynaksiz kaliyor

Uc dosyada birden KAPI 2, son bolumdeki "Avrupa", "Afrika", "yuz elli yil"
gibi ifadeleri kaynaksiz paragrafta yakaladi. Okuma yonlendirmesi bolumu
yonlendirme oldugu icin kaynaksiz yazma egilimindeyim; ama icinde ozel isim
ya da nicelik geciyorsa kunye gerekiyor. Sonraki turlarda bu bolume de dipnot
konmali.

Toplam makale 386 -> 390.

## Tur 33 — Guney Asya: kaynak once, aktor sonra (2026-08-25)

Bu turda yontem degistirildi: once iki **kaynak** dosyasi yazildi, sonra o
kaynaklara dayanan aktor dosyalari. Onceki turlarda tersi yapiliyordu ve
aktor dosyalari kaynak bulunamadigi icin ansiklopedi maddelerine
sikisiyordu.

- **kaynak-ain-i-akbari**: bir imparatorlugun kendi kendini saydigi idari
  envanter. Modern oncesi donemde tablo bicimli kaynak seyrektir; cogu kayit
  olay anlatisidir. Gelir rakamlarinin tahsilat mi tahakkuk mu oldugu
  ::tartismali olarak isaretlendi — iki okuma cok farkli ekonomik tablolar
  uretiyor.
- **kaynak-baburname**: bir hukumdarin kendi yenilgilerini de yazdigi
  hatirat. Bir kaydin yazarinin aleyhine bilgi tasimasi guvenilirlik
  isaretidir ama mutlak degil; yenilgiyi kabul etmek de bir anlati teknigi
  olabilir. Dosyada bu ikisi ayri tutuldu.
- **aktor-bengal-sultanligi** (1207 kelime): delta cografyasinin ayni anda
  hem savunmayi kolaylastirip hem merkezilesmeyi engellemesi.
- **aktor-gucerat-sultanligi** (1211 kelime): donanma kurmadan deniz
  ticaretinden zenginlesen liman duzeni. Ace ile karsilastirmasi dosyada
  acikca kuruldu: iki tercih, iki farkli son.

Dort dosyanin hicbirinde Wikipedia kunyesi yok. TDV maddeleri ve birincil
metinler yeterli oldu.

### Yakalanan kendi hatam

Gucerat dosyasinin okuma yonlendirmesinde `[Malva](/aktor/gucerat-sultanligi/)`
yazmisim — dosyanin kendisine giden bir bag. KAPI 4 bunu yakalamadi cunku
hedef gecerli bir dosya. **Kendine giden bag icin kapi yok.** Kuyruga
eklendi: KAPI 4'e oz-bag denetimi.

Toplam makale 390 -> 394.

## Tur 34 — KAPI 5'e oz-bag denetimi + dusunur katmaninin dengesi (2026-08-25)

### KAPI 5 genisletildi

Onceki turda yakalanan hata (dosyanin govdesinde kendisine giden bag) icin
denetim eklendi. `ilgili` ve `okuma_onerisi` alanlarinda oz-referans zaten
denetleniyordu; **govdedeki markdown baglarinda denetlenmiyordu.** Hedef
gecerli bir dosya oldugu icin kirik-link denetiminden geciyordu.

Dogrulama: gercek korpusta 0 hata; kendine bag veren sahte bir makalede
yakaliyor.

### Dusunur katmaninin dengesi

42 dosyanin yaklasik 24'u Avrupa kokenliydi. Uc dosya eklendi:

- **dusunur-zhu-xi** (1221 kelime): bin bes yuz yillik bir metin gelenegini
  yeniden duzenleyip sinav mufredati haline getirmesi. Bir yorumun resmi
  dogru sayilmasinin sonucu ikili: yorum hem korunur hem tartisilamaz hale
  gelir; ikisi ayni kurumun eseri.
- **dusunur-mengzi** (1206 kelime): mesruiyeti yonetilenlerin refahina
  baglamasi. Atlasta metni zaten kunyeliydi ama kisisi icin dosya yoktu —
  sik kullanilan bir kaynagin arkasindaki kisi kendi dosyasini hak eder,
  aksi halde kaynak gorunmez bir otoriteye donusur.
- **dusunur-fanon** (1215 kelime): somurgesizlesme tartismasini kisi
  duzeyinde ilk kez temsil ediyor.

### Fanon dosyasinda dikkat edilen nokta

Atlasta somurgesizlesme kavram ve olay dosyalari vardi ama **duzenin
yonetilen tarafindan yazan bir dusunur yoktu.** Kaynak bilesimi denetimi bu
dengesizligi olcmez: kunye cesitliligi saglanmis olabilir ama kimin yazdigi
sorusu ayri bir olcum gerektirir. Bu, dosyanin icinde de kaydedildi.

Siddet bolumleri konusunda atlas iki okumayi da kaydediyor ve metni bir
taraf lehine ozetlemiyor. Uc ayri elestiri grubu (yontemsel, kadinlarin
konumu, siyasi sonuclar) ayri ayri kaydedildi; farkli gerekcelerle
yoneltilmis itirazlari tek basliga toplamak tartismayi gizler.

### Uzunluk kalibrasyonu duzeltildi

Onceki turda "22 bolum ~1250 kelime" yazmistim; bu turda 21 bolum 997 kelime
verdi. Sebep bolum sayisi degil **paragraf uzunlugu**: paragraflar kisaldikca
bolum basina kelime 62'den 47'ye dustu. Dogru kural: bolum sayisi degil,
paragraf basina 40-45 kelime hedeflenmeli.

Toplam makale 394 -> 397.

## Tur 35 — dusunur katmani: iki dosya, bir reddedilen kaynak (2026-08-25)

- **dusunur-du-bois** (1218 kelime): kavramsal cerceve ile saha arastirmasini
  ayni kiside birlestiren ornek. Dosyanin en dikkate deger kaydi, dusunurun
  kendi beklentisini kendi verisiyle curutmus olmasi: bilimsel arastirmanin
  ayrimciligi azaltacagi beklentisini, topladigi veri ayrimciligin bilgi
  eksikliginden kaynaklanmadigini gosterince acikca terk etmis. Atlas bunu
  bir tutarsizlik degil bir bulgu olarak kaydediyor.
- **dusunur-nagarjuna** (1214 kelime): olumlu bir tez savunmadan ilerleyen
  bir yontemin kendi konumunun ne oldugu sorusu; cizginin kendi icindeki
  yuzyillik bolunme tam bu noktadan cikiyor.

### Reddedilen kaynak: ctext.org/wang-yangming

Wang Yangming icin ctext.org'daki metin denendi ve sayfa **CAPTCHA
dondurdu** ("Please confirm that you are human"). Kunyeye alinmadi ve dosya
bu turda yazilmadi.

Bu, beyaz listedeki bir alan adinin her sayfasinin erisilebilir olmadigini
gosteriyor. ctext.org atlasin en cok kullandigi birincil kaynak alanlarindan
biri (Analects, Mengzi, Dao De Jing, Zhuangzi, Hanfeizi, Shiji, Zhuzi Yulei)
ve bu sayfalarin hepsi calisiyor; ama alan adi duzeyinde bir garanti yok.
KAPI 10 zaten sayfa metnini kontrol ettigi icin boyle bir kunye derlemede
kirilirdi — yani kapi is gorurdu. Yine de kunyeye almadan once elle
kontrol etmek daha ucuz.

### Nagarjuna dosyasinda beyan edilen kisit

Dosyanin uc kaynagindan **hicbiri birincil degil.** archive.org'da bulunan
kayitlarin yazar, tarih ve dil alanlari bostu; atlasin kaynak sarti
karsilanmadi. Dosya yine de yazildi cunku boslugun kendisi bir bilgi:
Guney Asya felsefe gelenegin en cok atif alan figurlerinden birinin
dogrulanabilir bir dijital metninin bulunmamasi, dijital erisimin nasil
dagildigina dair bir kayit. Kisit dosyanin govdesinde acikca yazili.

Toplam makale 397 -> 399.

## Tur 36 — tartisma katmani: atlasin kendi yontemini konu eden dosya (2026-08-25)

**tartisma-sozlu-gelenek-kaynak-mi** (1506 kelime) yazildi. Bu, atlasin
tartisma katmanindaki 37. dosya ama ilk kez **atlasin kendi yontemini**
dogrudan konu ediyor: oteki tartisma dosyalari gecmis hakkindaki sorulari
ele alir, bu dosya gecmisin nasil yazilabilecegini ele alir.

Dort pozisyon kaydedildi. En dikkate deger bulgu, ikisinin — belge onceligi
ile anlati cozumlemesi — birbirine taban tabana karsit gorunmesine ragmen
**pratikte ayni sonucu uretmesi**: ikisi de sozlu aktarimdan olgu cikarmayi
reddediyor, biri guvenilmez buldugu icin oteki yanlis soru saydigi icin.
Konumlarin gerekcesiyle sonuclarinin ayri ayri degerlendirilmesi gerektigini
gosteren bir ornek.

### savunanlar alani ve uydurma atif riski

Tartisma semasi her pozisyon icin en az bir `savunanlar` girdisi zorunlu
kiliyor. Bu, dogrulanmamis atif riski tasiyor: bir kisiyi savunmadigi bir
konuma yerlestirmek, atlasin en agir hatasi olur.

Bu turda uygulanan kural: **yalnizca guvenle dogrulanabilen kisi adlari
yazildi** (Vansina ve Ki-Zerbo icin sozlu gelenek yontemi, Ranke icin belge
onceligi). Kalan iki pozisyonda kisi adi yerine **cizgi/yaklasim adi**
kullanildi ("Surecsel arkeoloji cizgisi", "Folklor ve edebiyat incelemesi
cizgisi"). Sema string kabul ettigi icin bu gecerli ve dogrulanamayan bir
atiftan daha durust.

Kuyruga eklendi: `savunanlar` alanina yazilan kisi adlarinin dogrulanmasi
icin bir kapi dusunulmeli. Su an hicbir kapi bu alani denetlemiyor ve
uydurma bir ad sessizce gecer.

### Dosyanin atlas icin sonucu

Dosyanin sonunda atlasin kendi uygulama tercihi de yazildi: sozlu aktarima
dayanan bilgiler "kaynagin ne aktardiginin kaydi" olarak yazilir,
"dogrulanmis olgu" olarak degil. Bu tercih zaten Bati Afrika, Amerika ve
Orta Asya dosyalarinda uygulanmisti; artik gerekcesi tek bir yerde yazili
ve o dosyalardan buraya bag var.

Toplam makale 399 -> 400.

## Tur 38 — olay katmani: iki kurum sonu (2026-08-25)

- **olay-bagdat-kusatmasi-1258** (1204 kelime): bes yuzyillik bir hilafet
  merkezinin haftalar icinde dusmesi. Dosyanin merkezi soru sembolik guc ile
  fiili guc arasindaki fark. Dort kaynagin ucu TDV, biri Wikisource; sifir
  Wikipedia kunyesi.
- **olay-malaka-fethi-1511** (1204 kelime): bir gecidi denetlemenin ticareti
  denetlemeye yetmedigi. Kaybeden tarafin kendi saray anlatisi birincil kaynak
  olarak kullanildi — olay dosyalarinda seyrek bir durum.

### Ikisinde de uygulanan ayrim

Her iki dosyada da sayilar (olu sayisi, gemi ve asker mevcudu) **verilmedi**
ve gerekce metinde yazildi: bir felaketin buyuklugunu bildiren sayilar
olcum degil vurgu tasir, ve az gemiyle buyuk sehir almak kaydi tutanin
basarisini buyuttugu icin savunan tarafin sayisi yuksek gosterilmeye
egilimlidir. Kaynaklarin yonu belli oldugunda sayi aktarmak, yonun kendisini
aktarmak olur.

### Kapi is gordu

KAPI 11 iki dosyayi da uc kez geri cevirdi (943/916 -> 1158/1138 ->
1181/1178 -> 1204/1204). Yeni makalelerin borcla dogamamasi kurali, bu turda
uc tur genisletme yaptirdi.

Toplam makale 400 -> 402.

## Tur 39 — silahli ticaret zinciri tamamlandi (2026-08-25)

Uc turdur ayri ayri yazilan dosyalar bu turda bir zincire baglandi:

  kavram-hint-okyanusu-ticareti  (silahsiz, coklu-merkezli duzen)
        v
  olay-malaka-fethi-1511         (duzenege ilk sistemli darbe)
        v
  kavram-silahli-ticaret         (duzenegin kendisi; 639 kelime)
        v
  olay-plassey-1757              (son asama: ticaret geliri -> askeri guc ->
                                  ticaret ayricaligi -> VERGI YETKISI; 1244 kelime)

Plassey dosyasinin ayirt edici kaydi, muharebenin askeri olarak kucuk
olmasidir: sonucu belirleyen sey ates gucu degil karsi taraf icinde onceden
yapilmis anlasmaydi. Ayrica anlasmanin taraflarindan birinin **yerel finans
haneleri** oldugu kaydedildi — bu, olayi yalnizca yabanci guc ile yerel
yonetim arasindaki karsilasma olarak okumayi zorlastirir.

### Uzunluk kalibrasyonu tuttu

kavram dosyasi ilk yazimda hedefte cikti (639/600-1000). olay dosyasi 1032
ile basladi ve tek genisletmeyle 1244'e ulasti — onceki turlarda uc tur
gerekiyordu. Kural: kavram icin 10 bolum, olay icin 20 bolum.

Toplam makale 402 -> 404.

## Tur 41 — nesne kunyesi is basinda (2026-08-25)

Onceki turda semaya eklenen `nesne` alt turu bu turda iki dosyada
kullanildi ve amacini gosterdi.

- **aktor-moche** (1217 kelime): atlasin **tumuyle nesne kanitina dayanan
  ilk dosyasi.** Yazi birakmamis bir duzen; iki MET katalog kaydi birincil
  kunye olarak kullanildi. Dosya, nesne kanitinin hangi sorulari
  cevapladigini (yapi, sureklilik, uretim orgutlenmesi) ve hangilerini
  cevaplayamadigini (karar, ad, yonetim bicimi) her bolumde ayri ayri
  yaziyor.
- **kavram-kipu** (650 kelime): sayi kaydettigi kesin, dil kaydedip
  kaydetmedigi tartismali bir kayit sistemi.

### Kipu dosyasinin bulgusu

Dosya atlasin bir varsayimini sinamak icin yazildi: bir toplum hakkinda ne
kadar bilgi edinilebilecegi, o toplumun kayit tutup tutmadigina baglidir.
Varsayim kismen curutuluyor — toplum kayit tutuyordu, kayitlar ayrintiliydi
ve bir imparatorlugun muhasebesini tasiyordu; buna ragmen bugun buyuk olcude
okunamiyor.

Belirleyici olan kayit tutmak degil, **kaydin okunma usulunun de
aktarilabilir olmasi.** Yazi bu usulu metnin icine gomer; kipu gomez ve
gorevli sinifi ortadan kalktiginda anahtar da kaybolur.

Ayni ayrim sayisal okumanin neden cozulup renk kodlamasinin neden
cozulemedigini de acikliyor: bir toplami sinayabilirsiniz, bir rengin ne
demek oldugunu disaridan bir anahtar olmadan bilemezsiniz.

Toplam makale 406 -> 408. Birincil kunye 160 -> 163.

## Tur 42 — Teotihuacan: olcek ile kayit arasindaki kopukluk (2026-08-25)

**aktor-teotihuacan** (1200 kelime) eklendi. Atlasin **nesne kanitina en cok
dayanan dosyasi**: dort kunyenin ucu muze katalog kaydi.

Dosyanin merkezindeki gozlem, atlasin genel bir varsayimini siniyor. Sehir,
kuruldugu donemde dunyanin en kalabalik yerlesimlerinden biriydi; buna ragmen
tek bir yoneticisinin adi, tek bir hanedanin sirasi ve sehrin kendi adi
bilinmiyor. Atlasin kaydettigi benzer olcekli sehirlerin hepsinde hukumdar
listeleri, yilliklar ya da idari kayitlar var.

Yani "buyuk olcekli kentsel duzen ayrintili yazili kayit gerektirir"
varsayimi bu ornekle zayifliyor. Uc alternatif aciklama kaydedildi ve secim
yapilmadi: kayitlar tutulup yok olmus olabilir, baska bir ortamda tutulmus
olabilir, ya da sistem kaydi gerektirmeyecek bicimde islemis olabilir.

### Nesne kanitindan yapilabilen en guclu siyasi cikarim

Dosyanin son bolumu bunu kaydediyor: sehrin izgara duzeni tek bir plana gore
ve yuzyillar boyunca uygulanmis. Bir plana kusaklar boyunca uyulmasi, plani
koruyan ve uygulatan surekli bir otoritenin varligini gosterir — bicimini
degil, varligini. Tek tek yapilar bir donemin urunudur; bir planin
surdurulmesi, donemler arasi bir kurumun urunudur.

Bu, nesne kanitinin karar mekanizmasini gosteremedigi seklindeki genel
kisitin sinirini da belirliyor: yonetim bicimi okunamiyor ama yonetimin
surekliligi okunabiliyor.

Toplam makale 408 -> 409. Birincil kunye 163 -> 166.

## Tur 43 — Olmek: ana kultur tartismasi ve kazi yogunlugu sorunu (2026-08-25)

**aktor-olmek** (1204 kelime) eklendi. Atlasin Amerika aktor katmanindaki en
erken tarihli dosyasi; oteki dosyalar en az bin yil sonrasina ait.

Dosyanin merkezindeki tartisma: duzen sonraki Orta Amerika uygarliklarinin
kaynagi mi (ana kultur) yoksa onlarla eszamanli gelisen bir bileseni mi
(kardes kultur)?

### Tartismanin neden kapanmadigi — yontemsel bulgu

Dosyada kaydedilen en onemli nokta su: tartisma kanit yoklugundan degil
**kazi yogunlugunun esitsiz dagilmasindan** kapanmiyor. Bir unsurun hangi
bolgede once ortaya ciktigi, ancak her iki bolgede de yeterince kazi
yapilmissa belirlenebilir.

Formul olarak: **en erken tarih, kazilmis alanlarin en erken tarihidir;
kazilmamis alanlar hakkinda bir sey soylemez.**

Bu, atlasin baska bolgelerde de kaydettigi bir yanliligin arkeolojik
karsiligidir. Dijital erisim esitsizligi metin kaynaklarinda ne yapiyorsa,
kazi yogunlugu esitsizligi nesne kaynaklarinda ayni seyi yapiyor.

### Teotihuacan ile karsit gozlem

Iki dosya bilincli olarak karsilastirildi. Teotihuacan'da bireysel portre
yoktu ve bu kurumsal bir yonetim bicimine dayanak yapilmisti; Olmek'te
anitsal baslarin her biri farkli yuz ozellikleri tasiyor ve tersi cikarima
dayanak veriyor. Ayni kanit turu, iki yonde de okunabiliyor.

### Kunyede beyan edilen kisit

Dosyanin en cok atifta bulundugu eser grubu — anitsal bazalt baslar —
kunyeye alinamadi. Bulunduklari yerde ve bolgesel muzelerde duruyorlar;
dogrulanabilir bir cevrimici katalog kaydi bulunamadi. Kunyedeki uc nesne
daha kucuk olcekli buluntular. Bu, dosyada acikca yazildi.

Toplam makale 409 -> 410. Birincil kunye 166 -> 169.

## Tur 45 — Okyanusya dolduruluyor; sema siniri gorunur oldu (2026-08-25)

**aktor-avustralya-yerli-halklari** (1215 kelime) eklendi. Bolgenin ucuncu
dosyasi.

### Atlasin donem semasinin kapsayamadigi tek konu

Dosyanin ayirt edici yani konusunun buyuklugu degil, **atlasin kendi
semasinin onu kapsayamamasi.** Atlasin en erken donemi (donem-01) tarimin
yayginlasmasiyla, MO 10000'de basliyor; bu dosyanin konusu o tarihten on
binlerce yil once basliyor.

Kunyeye `donem: "01"` ve `tarih_baslangic: "-50000"` yazildi. Tutarsizlik
gizlenmedi; semanin kapsayamadigi bir konuyu semaya sigdirmanin baska yolu
yok ve dosya bunu acikca yaziyor.

Sema `-50000` degerini kabul etti (tarih regex'i sinirsiz) ve zaman seridi
kirilmadi. Yine de kaydedilmeli: 16 donemlik sema, tarim oncesi on binlerce
yili tek bir baslangic noktasina sikistirir.

### Kayit sistemleri zinciri tamamlandi

Uc turdur yazilan dosyalar bir kavramsal zincir olusturdu:

  yazi (metnin icine gomulu usul, tasiyicidan bagimsiz okunur)
  kipu (usul gorevlide; gorevli sinifi giderse anahtar kaybolur)
  sarki yollari (usul arazide; araziye erisim kesilirse aktarilamaz)

Ucu de kayit tutar, ucu de yazi degildir ve ucunun kayip mekanizmasi
farklidir. Genel gozlem: **bir kayit, tasiyicisi yok edildiginde kaybolur;
tasiyici bir nesne, bir kisi ya da bir arazi olabilir.**

### Bilerek birakilan sinir

Topluluklarin bilgi duzeninde kapali tutulan bolumler var. Atlas bunu konu
etmiyor ve etmeye calismiyor; sinir dosyada acikca beyan edildi. Bu bir
eksiklik degil bir sinir ve oyle kaydedildi.

Toplam makale 412 -> 413.

## Tur 46 — Okyanusya bes dosyaya cikti; mubadelenin ucuncu kategorisi (2026-08-25)

Iki kavram dosyasi eklendi ve birbirine baglandi.

- **kavram-kula-halkasi** (608 kelime): degeri kullanimindan degil
  dolasimindan gelen nesnelerin, ada gruplari arasinda zit yonlerde surekli
  el degistirdigi duzen. Malinowski'nin 1922 alan calismasi (kamu mali tam
  metin) ve iki Massim nesnesi kunyelendi.
- **kavram-aletsiz-seyrusefer** (606 kelime): pusula, kronometre ve harita
  olmadan acik okyanusta yon bulma.

### Mubadelenin ucuncu kategorisi

Kula dosyasi atlasin ekonomik kavram katmanindaki bir varsayimi siniyor.
Katmandaki dosyalarin cogu mubadeleyi ya **pazar** ya **harac** olarak
siniflandiriyor. Bu duzen ikisine de girmiyor: pazar degil cunku fiyat ve
pazarlik yok; harac degil cunku zorlama ve tabiiyet yok. Atlas dosyayi bir
ucuncu kategori olarak tutuyor — bir duzeni iki kategoriden birine zorlamak
onu gorunmez kilar.

Ayrica kaydedildi: **degeri dolasimindan gelen bir nesne, dolasimdan
cikarilip vitrine konduğunda tam olarak degerini olusturan seyi kaybeder.**
Kunyelenen iki nesne bolgenin disindaki bir muzede.

### Kayit sistemleri zincirine dorduncu halka

  yazi          — usul metnin icinde
  kipu          — usul gorevlide
  sarki yollari — usul arazide
  seyrusefer    — usul egitilmis bellekte

Seyrusefer dosyasinin farki: zincir tam kopmadan yakalandi ve yontem
canlandirilabildi. Oteki uc sistemde zincir kirildiginda geri donus olmadi.
**Bir bilgi sisteminin kurtarilabilmesi, kaybin hangi asamada fark
edildigine bagli.**

Bir de sinanabilirlik farki var: bu yontem bugun dogrudan sinanabiliyor ve
sinandi. Atlasin oteki kayit sistemi dosyalarinda bu imkan yok.

Toplam makale 413 -> 415. Okyanusya bolgesi 5 dosya.

## Tur 48 — veri katmani; kapi bir kunye hatasi yakaladi (2026-08-25)

**veri-ticaret-payi** eklendi (1970-2024, dunya toplaminda ihracat+ithalatin
GSYH'ye orani: %25,8 -> %56,7). Veri katmani 24 -> 25.

Dosyanin merkezindeki sinir kaydedildi: seri 1970'ten basliyor ve **daha
onceki kuresellesme dalgalarini gostermiyor.** Serinin gosterdigi yukselis
tarihteki tek yukselis degil; atlasin kavram dosyalari daha erken dalgalari
kaydediyor ama bu seri onlari desteklemiyor.

### KAPI 10 bir kunye hatasi yakaladi

Kunyeye `dogrulama_dizesi: "trade_openness"` yazmistim — bu, indirme
aracinin **yerel dosyaya verdigi** sutun adi. Uzak CSV'de sutun adi
`ne_trd_gnfs_zs`. Kapi, dizeyi uzak sayfada aradi ve bulamadi.

Duzeltme: dogrulama dizesi kaynaktaki gercek sutun adiyla degistirildi ve
yerel CSV'nin sutun basligi da kaynaktakiyle ayni yapildi. Boylece kunye,
yerel dosya ve uzak kaynak uc yerde de ayni adi tasiyor.

Ders: indirme araci sutunlari yeniden adlandirdiginda, kunye kaynaktaki adi
tasimali. Aksi halde dosya yerel olarak tutarli gorunur ama kunye uzak
kaynagi dogrulamaz.

### Bir sayi duzeltildi

Metinde 2020 dunya nufusunu "yaklasik 7,84 milyar" yazmistim; CSV'de deger
7.887.001.289, yani 7,89. Duzeltildi. Kucuk bir fark ama veri dosyasinda
sayilar CSV'den dogrulanmali ve bu kez dogrulama elle yapildi.

Toplam makale 415 -> 416.

## Tur 49 — Kusan; "sentez" adlandirmasinin ayristirilmasi (2026-08-25)

**aktor-kusan-imparatorlugu** (1226 kelime) eklendi. Orta Asya aktor katmani
8 dosyaya cikti.

### Sentez ile bir arada durma ayrimi

Dosyanin en dikkate deger kaydi bir adlandirma ayrimi. Dort gelenegin
unsurlarinin bir arada bulunmasi cogu zaman "sentez" diye anilir; dosya bunu
ikiye ayiriyor:

- **bir arada durma**: unsurlar ayri ayri korunup yan yana kullanilir.
  Sikkelerde boyle — tanrilar birbirine karistirilmaz, sirayla basilir.
- **sentez**: iki gelenek birlesip ucuncusunu uretir ve ayristirilamaz hale
  gelir. Heykel gelenegi boyle — bicim ile konu gercekten birlesir.

Ayrimin sonucu farkli: bir arada durma, taraflardan biri cekildiginde
otekini oldugu gibi birakir; sentez geri dondurulemez bir degisim uretir.

**Ayni imparatorluk, bir alanda unsurlari yan yana tutup baska bir alanda
birlestirebiliyor.** Bu, atlasin kulturel aktarim kaydeden butun dosyalarina
uygulanabilecek bir ayrim ve cogunda belirtilmeden geciliyor.

### Iki nesne turu farkli sorulara cevap veriyor

Dosyanin kanit tabani sikke ve heykel. Sikke devletin ne iddia ettigini
gosterir (seri uretim, tarihlenebilir, resmi mesaj); heykel bir atolye
gelenegin ne yaptigini gosterir (resmi mesaj tasimak zorunda degil). Ikisinin
farkli surecler gostermesi bu yuzden sasirtici degil — devletin mesruiyet
hesabi ile atolyenin bicim tercihi ayri ayri isler.

### Onceki turlarla baglanti

Buda tasvirinin onceligi tartismasi, Olmek dosyasindaki yontemsel sorunun
aynisi: en erken tarih, kazilmis alanlarin en erken tarihidir. Iki dosya
birbirine baglandi.

Toplam makale 416 -> 417.

## Tur 50 — atlasin kendi olcumunu bir kavram dosyasina cevirmek (2026-08-25)

**kavram-kanit-turu** (615 kelime) eklendi. Bu dosya bir tarihsel olguyu
degil, **atlasin kendi dosyalarini yazarken tekrar tekrar karsilastigi bir
kisiti** tanimliyor: elde bulunan kanitin turu, o konuda sorulabilecek
sorulari da belirler.

Dosya yedi ayri bolge dosyasindaki olcumu topluyor — Moche, Teotihuacan,
Olmek, Benin, Maori, Avustralya ve Kusan — ve hepsine karsilikli bag verdi.

### Dort kanit turu ve cevapladiklari

| tur | cevapladigi soru |
|---|---|
| cagdas yazili kayit | olay sirasi, tarih, karar |
| nesne ve yapi | uretim orgutlenmesi, sureklilik, hiyerarsi |
| sozlu aktarim | soy, hak iddiasi, toplulugun kendini anlatisi |
| taniklik | duzenin disaridan nasil gorundugu |

Dordu birbirinin yerine gecmiyor ve **bir turu otekinin eksik bicimi
saymak** atlasin kacindigi en yaygin hata: nesne kaniti yazinin ilkel hali
degil.

### Yanliligin iki bicimi tek yerde toplandi

- **Dijital erisim esitsizligi** (metin kaynaklarinda): ayni donemin bazi
  bolge metinleri tek aramada bulunurken bazilari hic bulunamadi.
- **Kazi yogunlugu esitsizligi** (nesne kaynaklarinda): bir bolgede daha
  erken tarihli bulgu cikmasi, orada daha cok kazi yapildigini da
  gosterebilir.

Ikisi ayni sonucu uretiyor: kaynagi bol gorunen bolgeler daha ayrintili
yazilabiliyor ve **ayrinti, onem saniliyor.**

Iki cumle formule edildi ve oncelik iddialarinin yanina yazilacak:
- En erken tarih, kazilmis alanlarin en erken tarihidir.
- En erken kayit, korunmus kayitlarin en erkenidir.

### Bedelin acikca yazilmasi

Dosya, atlasin bu tutumunun bedelini de kaydediyor: surekli kanitin ne
soyleyip ne soylemedigini yazmak okuma akiciligini dusuruyor. Alternatif
metni akici kilar ama okura kanitin gercekte oldugundan guclu oldugu
izlenimini verir. Gerekce: degerlendirilemeyen bir iddia bir kayit degil bir
beyandir.

Toplam makale 417 -> 418.

## Tur 51 — Altin Orda; fatihin fethettigine donusmesi (2026-08-25)

**aktor-altin-orda** (1215 kelime) eklendi. Orta Asya aktor katmani 9 dosya.

Dosyanin secilme gerekcesi gosterdigi donusum: bir fetih hanedaninin
yonettigi nufusun dilini ve dinini benimsemesi. Sürec **olculebilir** cunku
iki uc da kayitli — gelenlerin dili ve inanci biliniyor, iki kusak
sonrasininki de biliniyor; aradaki fark dogrudan okunabilir.

Belirleyici olan sayi orani: gelen hanedan ve askeri cevre, yonettigi nufusun
yaninda cok kucuk kaldi. Karsi ornek de atlasta var — ayni hanedanin dogudaki
kollari farkli yonlerde donustu. **Ayni cikis noktasindan yola cikan
duzenler, yerlestikleri nufusa gore farkli sonlara vardi.**

Iki nokta ayrica kaydedildi:
- Din degisimi tek adimda olmadi; ilk benimseme ile kurumsallasma arasinda
  yaklasik yetmis yil var ve arada geri donusler kayitli. Bir din degisimini
  tek tarihe baglamak sureci bir karara indirger.
- Inanc bagi kan baginin onune gecti: din degisiminden sonra kurulan ittifak,
  ayni hanedandan gelen dogudaki bir duzene karsiydi.

Kaynak durumu: dort kaynagin **hicbiri birincil degil.** Duzenin yarlik adi
verilen yetki belgeleri arsivlerde duruyor ama dogrulanabilir tam metin
derlemesi bulunamadi. Bu belgeler dil degisimini dogrudan olcebilecek seri;
yoklugu dosyada beyan edildi.

Toplam makale 418 -> 419.

## Tur 52 — Ilhanlilar; atlasin en net dogal deneyi (2026-08-25)

**aktor-ilhanlilar** (1213 kelime) eklendi. Orta Asya aktor katmani 10 dosya.

Bir onceki turda yazilan Altin Orda dosyasiyla birlikte okunmak uzere
yazildi. Ikisi **ayni hanedandan, ayni on yilda, ayni fetih dalgasindan**
cikti ve ters yonlerde donustu:

- Altin Orda: bozkir nufusunun diline ve gocer duzenle bagina.
- Ilhanlilar: yerlesik bir devlet gelenegin burokrasisine ve diline.

Bu, atlasin en net dogal deneyi. Ama dosyada **sinirlari da yazildi**:
baslangic kosullari tam ayni degildi (farkli buyuklukte kuvvet, farkli
komutan) ve cevre kosullari tek degiskene indirgenemez (yerlesik burokrasi,
nufus orani, iklim, guzergah ayni anda farkli). Atlas karsilastirmayi bir
kanit degil bir soru olarak sunuyor.

### Din degisiminin iki bicimi

Iki dosyada ayni sureç farkli isledi: kuzeyde kademeli ve geri donusluydu
(ilk benimseme ile kurumsallasma arasi ~70 yil), burada tek bir hukumdarin
karariyla ve hizli. Bir yonetimin inanc degistirmesi ile nufusun
degistirmesi ayri surecler ve hizlari ayni olmak zorunda degil.

### Kunyedeki birincil kaynak

Duzenin veziri tarafindan sarayin gorevlendirmesiyle yazilmis kitalar arasi
tarih derlemesi kunyelendi (1310). Dosyada iki nokta ayrildi: eserin kapsami
olaganustu (Cin, Hindistan, Islam dunyasi ve Avrupa ayri bolumler halinde,
her biri o bolgeden gelen kaynaklarla) **ama kapsam ile taraflilik ayri
degerlendirilmeli** — metin hanedanin mesruiyetini kurmak uzere yazilmis.

Toplam makale 419 -> 420.

## Tur 53 — Cami'u't-Tevarih; atlasin kendi yontemine en yakin ornek (2026-08-25)

**kaynak-camiut-tevarih** eklendi. Bir onceki turda Ilhanlilar dosyasinda
"eser icin ayri bir kaynak dosyasi gerekir ve bu dosya yazildiginda atlasta
bulunmuyordu" diye yazilan acik kapatildi.

### Neden atlas icin ozel

Eser, atlasin kendi kaynak ilkesini yedi yuzyil once uygulamis gorunuyor:
her bolum icin o bolgeden gelen bilgi tasiyicilariyla calisilmis, yerel
kaynaklara dayanilmis.

Ama benzerlik sinirli ve dosyada ayrildi: **yerel kaynaga dayanmak ile o
kaynagin cercevesini benimsemek ayri seyler.** Eser bilgiyi yerelden aliyor,
duzenlemeyi merkezden yapiyor. Bu ayrim atlasin kendi pratigine de uygulanir
— bir bolgenin kendi metnini kunyelemek, o bolgenin bakis acisini
benimsemek anlamina gelmez.

### Eserin kendisi bir kanit

Ikinci bir okuma kaydedildi: boyle bir derleme ancak kitalar arasi bir siyasi
agin icinden yazilabilirdi. Metnin varligi, yazildigi donemde bolgeler arasi
bilgi akisinin hangi duzeye ulastigini gosteriyor.

**Bir eser, iceriginden bagimsiz olarak da bilgi tasir**; kim tarafindan,
nerede ve hangi imkanlarla yazilabildigi ayri bir veridir.

### Ibn Haldun ile karsilastirma

Ayni yuzyildan iki metin atlasta yan yana duruyor ve farkli isler yapiyorlar:
biri yontem onerisi gelistirip tarihin nasil yazilmasi gerektigini
tartisiyor, oteki yontemi uygulayarak gosteriyor. Kuram ureten metin ile
malzeme sunan metin farkli sorulara cevap verir.

KAPI 9 bir eksik yakaladi: guven_geneli=tartismali oldugu halde ne
::tartismali haritasi ne ilgili tartisma dosyasi vardi. Eserin Mogol
yonetimini nasil degerlendirdigi tartismasi eklendi.

Toplam makale 420 -> 421.

## Tur — düşünür katmanının Doğu Asya ve Güney Asya kolu (25 Ağustos 2026)

Eklenen: `dusunur-wang-yangming`, `dusunur-sankara`. Toplam 421 → 423.

**Neden bu ikisi.** Düşünür katmanı 47 dosyaydı ve ağırlığı Avrupa'daydı.
Doğu Asya'da yalnızca Konfüçyüs, Mengzi, Han Feizi, Sima Qian ve Zhu Xi;
Güney Asya'da Kautilya, Aşoka ve Nagarjuna vardı. İki dosya da mevcut bir
dosyanın karşı tarafını tamamlıyor: Wang Yangming olmadan Zhu Xi dosyası
tek taraflı kalıyordu, Şankara olmadan Nagarjuna'nın hangi konuma karşı
okunacağı görünmüyordu.

**Wang Yangming'in atlasa kattığı soru.** Resmî bir doğru ilan edildiğinde
ne olur. Dosya üç adımlı bir örüntü kaydediyor: yorum kurumsallaşır,
kurumsallaşma onu tartışılmaz kılar, tartışılmazlık ona en iyi hâkim olanın
itirazını üretir. Örüntü bir yasa olarak değil tekrar eden bir gözlem
olarak yazıldı.

**Şankara'nın atlasa kattığı soru.** Yazar kendi konumunu yalnızca
başkasının metnine yazdığı şerhin içinde kurduğunda, ona ait olanı nasıl
ayırt ederiz. Dosya iki kayda bağlanıyor: (1) şerh türünün kuralı karşı
görüşü kendi gerekçeleriyle kurmayı zorunlu kılar, bu yüzden metin
kaybolmuş rakip görüşlerin tek kaynağı olabilir; (2) bu düşünüre atfedilen
metinlerin çoğu ona ait değildir ve künye şemasındaki `yazar` alanı bu
durumda bir kesinlik izlenimi üretir — kural olarak katalog atfı künyeye
yazıldı, atfın tartışmalı olduğu metinde belirtildi.

**Kaynak durumu.** Wang Yangming için birincil metin (Chuanxilu)
künyelenemedi; ctext.org'da doğrulanabilir bir kayıt bulunamadı ve dosyada
bu kısıt beyan edildi. Şankara için 1890 tarihli Thibaut çevirisi
(`archive.org/details/vedntasutrastr01bdar`) künyelendi; katalogda yaratıcı
alanında Sankaracarya ve Thibaut görünüyor, erişim kısıtı yok, PDF ve metin
indirilebilir. Altı künyenin altısı da taze ağ denetiminden geçti.

**Reddedilenler.** `plato.stanford.edu/entries/vedanta/` ve
`.../advaita-vedanta/` 404 döndü; `sacred-texts.com/hin/sbe34/` 403 döndü
(otomasyon engeli); `archive.org/details/vedantasutraswit01badauoft` 404.
`ctext.org/wiki.pl?if=en&res=195345` 200 döndü ama içeriğinin Chuanxilu
olduğu doğrulanamadığı için künyelenmedi.

**Tekrar eden kalibrasyon.** İki dosyanın da ilk hâli hedefin %82 ve
%89'unda kaldı. Düşünür dosyaları için 18 bölüm yetmiyor; 22 bölüm
gerekiyor. Bu, üçüncü kez aynı yerde ölçülüyor.

## Tur — Okyanusya: iki belge dosyasi (25 Ağustos 2026)

Eklenen: `olay-waitangi-antlasmasi-1840`, `aktor-hawai-kralligi`.
Toplam 423 → 425. Okyanusya 5 → 7 makale, şerit 2/16 → 4/16.

**Neden bu ikisi.** Okyanusya borcu denetim defterinde en yüksek öncelikli
maddeydi ve nedeni ilgisizlik değil erişimdi: bölgenin resmî kaynak
siteleri otomatik erişime kapalı. Bu turda çözüm bulundu — kurum sitesi
yerine aynı metnin açık transkripsiyonunu aramak. Wikisource'ta hem
antlaşmanın iki metni hem Hawai anayasalarının üçü bulundu.

**İki dosyanın ortak sorusu.** İkisi de belgenin metniyle belgenin
koşulu arasındaki farkı işliyor:

- Waitangi'de sorun **iki metnin farkı**. Aynı günlerde imzalanan iki
  metin aynı maddede farklı şey söylüyor ve imzaların çoğu yerel metne
  atılmış. Kayda geçirilen kural: *bir belgenin ne söylediği, hangi
  metninin okunduğuna bağlı olabilir.*
- Hawai'de sorun **tek metnin arkasındaki koşul**. 1887 anayasası silahlı
  baskı altında kabul ettirilmiş ama metin sıradan bir anayasa gibi
  okunuyor. Kayda geçirilen kural: *bir belgenin hangi koşullarda kabul
  edildiği, belgenin metninden okunamaz.*

**Hawai dosyasının ikinci gözlemi.** Atlasın Okyanusya dosyaları arasında
en çok birincil belgeye sahip olan dosya bu — ve nedeni bölgeye ilginin
fazlalığı değil, sürecin her adımının bir hukuki belgeye bağlanmış
olması. Belge üreten bir süreç arkasında belge bırakır. Bu, `kanit-turu`
dosyasındaki ölçümü tersinden doğruluyor: kayıt bolluğu, kaydedilen süreç
hakkında tek başına bir şey söylemez.

**Üçüncü gözlem — ilke ile ölçüt.** 1840 metni bütün insanların eşit
olduğunu ilan ediyor; 1887 metni aynı ilkeyi değiştirmeden oy hakkı
ölçütlerini değiştirerek sonucu tersine çeviriyor. Bir belgenin ne
yaptığını anlamak için ilan ettiği ilkeye değil ölçütlerine bakmak
gerekir.

**Reddedilenler.** `nzhistory.govt.nz`, `teara.govt.nz`, `whc.unesco.org`,
`loc.gov`, `britannica.com` — hepsi 403. `legislation.govt.nz` 202 ile boş
gövde döndürdü. `mi.wikisource.org` API'si sonuç vermedi.
`en.wikisource.org/wiki/Treaty_of_Waitangi` yalnızca İngilizce metni
veriyor; Maori metni için Colenso ekine inildi ve bu, olay dosyasında
"erişimin ürettiği varsayılan okuma" bölümünün somut kaynağı oldu.

**Kapı geri bildirimi.** `hukuki` eksen değeri şemada yok (KAPI 1 yakaladı);
şerit girdisindeki `anahtar` gövde kullanımı saymıyor, kaynak gövdede de
anılmalı (KAPI 2+3); aynı kaynaktan iki tırnaklı alıntı telif sınırını
aşıyor (KAPI 7) — Maori terimlerinin ikisini birden tırnak içinde vermek
yerine parafraz edildi.

## Tur — Waitangi tartışma dosyası (25 Ağustos 2026)

Eklenen: `tartisma-waitangi-hangi-metin`. Toplam 425 → 426.
Okyanusya 7 → 8 makale, bölgenin ilk tartışma dosyası.

**Neden bu.** Bir önceki turda olay dosyasını yazarken "bu konu için ayrı
bir tartışma dosyası gereklidir" diye yazıp borç defterine kaydetmiştim.
Bir turda açılan borcu bir sonraki turda kapatmak, defterin işe
yaradığının somut kanıtı.

**Dört konum.** İmzalayanın anladığı metin bağlar / belirsizlik
hazırlayanın aleyhine yorumlanır / yürürlükteki düzeni kuran metin
geçerlidir / soru hukuki değil siyasidir ve metin seçimiyle çözülmez.
İlk ikisi aynı sonuca varıyor, üçüncüsü tersine gidiyor, dördüncüsü
seçim yapmıyor — bu yapı dosyada ayrıca işlendi.

**Savunanlar.** Sekiz adın sekizi de çizgi/yaklaşım adı, kişi adı yok.
Bu bilinçli: kişi atfı için pozisyon düzeyinde doğrulama gerekiyor ve bu
tartışmada doğrulanabilir kaynakla künyeleyebileceğim kişi atfı
bulamadım. Kütüğe sekiz ad `kisi-degil` durumuyla eklendi. Kural dosyanın
kendi metninde de açıkça yazıldı.

**Dosyanın kaydettiği kural.** *Bir belgenin ne söylediği, hangi metninin
okunduğuna bağlı olabilir ve bu bağlılık belgenin kendisinden okunmaz.*
Kanıt dosyasındaki ölçümlerle aynı aileden: kaynağın biçimsel özelliği,
içeriğinden bağımsız olarak sonucu etkiliyor ve bu etki ancak ayrıca
sorulduğunda görünüyor.

**Atlasa dönük somut sonuç.** Çok dilli bir belgeye atıf yapılırken hangi
dildeki metnin kastedildiği künyede yazılmalı. Kural bu dosyadan sonra
bütün antlaşma künyelerine uygulanacak; önceki künyelerdeki eksik borç
defterine yazıldı.

**Beyan edilen eksik.** Dört konum alanın tamamı değil. İki metni ayrı
uygulama alanlarına bölmeyi öneren ve sorunu devletler hukukuna taşıyan
yaklaşımlar künyelenebilir kaynak bulunamadığı için alınmadı; bu, hem
dosyanın metninde hem defterde yazılı.

**Kalibrasyon.** Tartışma dosyalarında ilk gövde %32'de kaldı — pozisyon
blokları uzunluk sayımına girmiyor. Tartışma dosyası için gövde tek
başına 22-24 bölüm gerektiriyor; bu ilk ölçüm.

## Tur — Tonga: karşılaştırmalı Okyanusya dosyası (25 Ağustos 2026)

Eklenen: `aktor-tonga-kralligi`. Toplam 426 → 427. Okyanusya 9 makale.

**Neden bu.** Hawai dosyası tek başına bir vaka anlatısıydı. Tonga onunla
birlikte bir karşılaştırma kuruyor: aynı okyanus, aynı yüzyıl, benzer
baskı, aynı araç (yazılı anayasa, meclis, tanınma arayışı) — karşıt
sonuç. Biri devrildi ve ilhak edildi, öteki hanedanını ve toprak düzenini
korudu.

**Karşılaştırmanın verdiği.** Aynı araç karşıt sonuç verdiyse, sonucu
belirleyen araç değildir. Bu, "yazılı anayasa kabul etmek koruma sağlar"
varsayımını doğrudan bozuyor. Fark aranacak yer belgelerin varlığı değil
içeriği — ve iki metin karşılaştırıldığında en keskin ayrım toprak
hükümlerinde: Tonga anayasası toprağın yabancılara satılmasını yasaklıyor,
Hawai'de toprak yüzyıl ortasında alınıp satılabilir hâle getirilmişti.

Zincir hukuki bir kararla başlıyor: toprak toplanamazsa plantasyon
ekonomisi kurulamaz, kurulamazsa o sermayeyi taşıyan nüfus siyasi ağırlık
kazanamaz. Dosya bunu tek neden saymıyor — konum, büyüklük ve ekonomik
çekicilik farkları da yazılı — ama izlenebilir en keskin ve en doğrudan
fark olarak kaydediyor.

**İkinci gözlem — savunma amaçlı anayasa.** Dönemin uluslararası
pratiğinde bir düzenin devlet sayılması belirli kurumsal biçimleri
taşımasına bağlıydı; taşımayanlar ilhak edilebilir sayılıyordu. Anayasa bu
nedenle savunma amaçlı da okunabilir: devlet kendini dışarıdakilerin
tanıyabileceği biçime sokarak korunmayı umdu. Ama Hawai de aynı biçimi
taşıyordu — biçime uyum bir koşul, güvence değil.

**Yeni künye alt türü kullanımı.** 1911 Britannica maddesi `birincil_tur:
tanik` olarak künyelendi — olgu kaynağı olarak değil dönem tanıklığı
olarak. Bir metnin tanıklık olarak okunması, olgu bildirimi olarak
okunmasından farklı kurallara tabidir ve bu dosyada açıkça yazıldı.

**Beyan edilen sınır.** İki örnekten kural çıkarılamaz. Ölçülebilir bir
iddia için aynı okyanustan daha çok örnek gerekiyor; bu açık borç olarak
dosyanın kendi metnine yazıldı.

## Tur — Orta Asya: ertelenmiş dosya ve dördüncü ardıl devlet (25 Ağustos 2026)

Eklenen: `aktor-hazarlar`, `aktor-cagatay-hanligi`. Toplam 427 → 429.
Orta Asya 30 → 32 makale (bölgeler arasında Okyanusya'dan sonra en ince
katman).

**Hazarlar — neden ertelenmişti, neden şimdi yazıldı.** Bu dosya
turlar önce kuyruğa alınmış ve "dikkatli kaynaklandırma gerekiyor" notuyla
bekletilmişti. Nedeni: açık arama, konu hakkında güvenilir olmayan
malzeme döndürüyordu. Atlasın kuralı ilerlemek için kaynak uydurmamaktır
ve bu, kaynak bulunamadığında dosyayı ertelemeyi de kapsar. Dosya, alanın
standart akademik monografisi (Dunlop 1954, Princeton) archive.org
kütüphane kaydı üzerinden künyelenebilir hâle gelince yazıldı. Künye
kitabın tam metnini değil ödünç verme kaydını gösteriyor ve bu kısıt
dosyada beyan edildi.

**Dosyanın kaydettiği kural.** *Yalnızca dışarıdan yazılmış bir düzen
hakkında bilinenler, o düzenin özelliği değil gözlemcilerin ilgisinin
haritasıdır.* Somut hâli: İslam coğrafyacıları ticaret ve yönetim ihtiyacı
için yazdıkları için yollar, mallar ve vergiler ayrıntılı; hanedan tarihi
ve iç siyaset neredeyse yok. Yani Hazarlar hakkında hangi soruların
cevaplanabildiğini belirleyen şey Hazarların kendisi değil, onları yazanların
ne aradığı.

Karşılaştırma dosyada açıkça kuruluyor: aynı bozkır geleneğinden çıkan
Göktürk Kağanlığı kendi dilinde uzun yazıtlar bıraktı, Hazarlar bırakmadı.
Fark, iki düzenin gelişmişliğini değil kayıt pratiğini gösteriyor.

Modern politik iddialar konusunda dosya tek bir şey yapıyor: bunların
akademik yazında karşılık bulmadığını ve atlasın konusu olmadığını yazıp
pratik sonucu kaydediyor — açık aramanın güvenilir olmayan sonuç
döndürmesi, yani doğrudan bir kaynak sorunu.

**Çağatay Hanlığı — Moğol ardıl dörtlüsü tamamlandı.** Altın Orda ve
İlhanlılar zaten vardı; bu dosyayla dört birim de yazılmış oldu ve
karşılaştırma mümkün hâle geldi. Çıkan örüntü: tek bir ekonomik temele
oturan birimler bütünleşti, iki temeli (yerleşik + bozkır) birlikte
taşıyan birim bölündü. Dosya bunu kural değil, dört örnekle sınırlı bir
hipotez olarak yazıyor.

**İkinci kayıt — meşruiyet kuralının ömrü.** Han unvanı belirli bir soya
bağlıydı ve kural, onu uygulatan zor gücü çöktükten sonra da bağlayıcı
kaldı: bölgeye hâkim olan güç, askerî üstünlüğü tartışmasız olduğu hâlde
unvanı almadı, yönetimi soy şartını taşıyanlar adına yürüttü. *Bir
meşruiyet kuralı, onu kuran gücün çöküşünden sonra da bağlayıcı kalabilir
ve onu çiğneyebilecek olanları da bağlar.* Dosya nedenini de yazıyor:
kurala uymak, aynı geleneği paylaşan bütün bölgelerde tanınabilirlik
sağlıyordu; çiğnemek o tanınırlığı kaybetmekti.

**Bakım işi.** Son turlarda biriken 30 tek yönlü `ilgili` bağı toplu
olarak kapatıldı; uyarı sayısı 20 → 0. Bağ grafiği artık tümüyle
karşılıklı.

**Kalibrasyon teyidi.** İki dosya da ilk hâlde %82 ve %71'de kaldı.
Aktör dosyaları için 22 bölüm hedefi doğru; 18 bölüm sistematik olarak
yetmiyor.

## Tur — Orta Asya: Şeybânî sonrası üçlü (25 Ağustos 2026)

Eklenen: `aktor-seybaniler`, `aktor-buhara-hanligi`, `aktor-hive-hanligi`.
Toplam 429 → 432. Orta Asya 32 → 35.

**Neden bu üçlü.** Timurlular ile Rus fethi arasındaki dört yüzyıl,
atlasta tümüyle boştu. Bu dönem, "Orta Asya deniz yolları açılınca
kenara düştü" cümlesinin dayandığı dönemdir ve atlasta o cümleyi
sınayacak hiçbir dosya yoktu.

**Tur boyunca üç ayrı ölçüm yapıldı:**

1. *Meşruiyet kuralının dördüncü ölçümü.* Han unvanı belirli bir soya
   bağlıydı. Şeybânîler soy şartını karşıladıkları için unvanı aldı;
   1785'te Buhara'da iktidara gelen hanedan karşılamadığı için alamadı ve
   devlet emirliğe dönüştü. Kuralı uygulatan zor gücü beş yüzyıl önce
   ortadan kalkmıştı. **Bir meşruiyet kuralı, onu kuran gücün çöküşünden
   sonra yüzyıllarca bağlayıcı kalabilir ve bunu bir zor gücü olmadan
   yapar.** Kuralın işleme biçimi de kaydedildi: yeni hanedan kuralı
   çiğnemedi, unvanı değiştirdi — kural kimin yöneteceğini değil kimin
   hangi adla yöneteceğini belirliyordu.

2. *Yenilginin başka kıtada devlet kurması.* Şeybânîlerin Mâverâünnehir'i
   almasıyla oradan çıkarılan hanedan mensubunun güneye çekilip
   Hindistan'da devlet kurması arasında doğrudan bağ var. Bağlantı ancak
   iki bölge birlikte okunduğunda görünüyor; atlasın bölge katmanları
   ayrı ayrı okunduğunda kayboluyor.

3. *Yüzölçümünün neyi ölçmediği.* Hîve haritada geniş görünür; yerleşik
   nüfusu ve üretimi tek bir vahaya sıkışmıştı. **Bir devletin haritadaki
   yüzölçümü, o devletin kaynaklarını değil iddia ettiği alanı ölçer.**
   Bu, mevcut `tartisma-imparatorluk-siniri-nasil-cizilir` dosyasına
   somut bir örnek ekliyor.

**Gerileme iddiası konusunda alınan tutum.** Üç dosya da iddiayı
sonuçlandırmıyor ama dayanağını görünür kılıyor: kara ticaretinin hacmi
doğrudan ölçülemez, gümrük kayıtları düzensizdir, ve aynı dönem için hem
gerileme hem büyük ölçekli imar kaydı vardır. Atlas gerileme sözcüğünü
ölçüt belirtmeden kullanmamayı kural hâline getirdi.

**Yeni borç.** `tartisma-orta-asya-neden-cekildi` yazılmadı. Üç dosya da
soruyu açık bırakıp bir tartışma dosyasına havale ediyor ama dosya henüz
yok. Ayrıca Hokand Hanlığı yazılmadı; TDV maddesi doğrulandı
(`hokand-hanligi`, 200) ve üçlü ancak onunla tamamlanır.

**Kapı geri bildirimi.** KAPI 4 "şehirleşme" varyantını iki dosyada
yakaladı; doğru terim "kentleşme". Terim kilidi listesi bu turda ilk kez
bu sözcükte tetiklendi.

**Yöntem değişikliği.** Bu turdan itibaren tur başına 3 makale
hedefleniyor. Kapı çalıştırma, derleme ve doğrulama maliyeti tur başına
sabit; makale başına maliyet, tur başına makale sayısı arttıkça düşüyor.

## Tur — geçen turun iki borcu kapatıldı (25 Ağustos 2026)

Eklenen: `aktor-hokand-hanligi`, `tartisma-orta-asya-neden-cekildi`.
Toplam 432 → 434. Orta Asya 35 → 37.

**Borç kapatma.** Geçen tur iki borç açılmıştı: üçlünün eksik ayağı ve
gerileme tartışmasının dosyası. İkisi de bu turda kapatıldı. Bir turda
açılan borcun bir sonraki turda kapatılması artık üçüncü kez oluyor.

**Hokand'ın kattığı soru.** Üç hanlık aynı gücün karşısındaydı ve aynı
yıllarda baskı altına girdi; ikisi hanedanını korudu (himaye), biri
korumadı (doğrudan ilhak). Aynı güç komşu üç devlete bilinçli olarak iki
farklı araç uyguladı. Dosya üç cevap adayı sıralıyor — coğrafi (sınır
bölgesi), iktisadi (pamuk), siyasi (istikrarsız hanedan) — ve üçünün de
aynı olguya uyduğunu, yani hiçbirinin sınanmadığını yazıyor. Sonucu
bilerek gerekçe aramak atlasın kaçındığı işlem.

**Meşruiyet kuralının üçüncü başa çıkma biçimi.** Hokand hanedanı soy
şartını karşılamıyordu ve kuruluşundan uzun süre sonra han unvanını
kullanmaya başladı — soyunu kurucu soya bağlayan bir iddia üreterek.
Böylece atlas üç seçeneği birden kaydetmiş oldu: **uymak** (Şeybânîler),
**unvanı değiştirmek** (Buhara 1785), **kurala uyduğunu iddia etmek**
(Hokand). Kural karşısında güç sahibinin bulduğu seçenek kümesi artık
tam.

**Tartışma dosyasının yapısı.** Dört konum: deniz yolu kayması / bozkır
koridorunun kapanması / iç kurumsal değişim / öncül yanlış. Dosya
hiçbirini seçmiyor; her birinin hangi noktada veri eksiği taşıdığını
işaretliyor. Dördüncü konum — "çekilme, kayıtların çekilmesidir" — atlasın
başka dosyalarında zaten ölçülmüş bir mekanizmaya dayanıyor ve bu dosyada
da doğrulanıyor: dört künyenin dördü de ansiklopedi maddesi, bölgenin
dönem kaynakları künyelenebilir hâlde bulunamadı.

**Dosyanın en özgün bölümü.** Görece küçülme ile mutlak daralma ayrımı.
Bir bölge hiç değişmeden de dünya toplamındaki payını kaybedebilir;
bunun için başka bölgelerin büyümesi yeterlidir. Atlantik ekonomisinin
büyümesi bütün öteki bölgelerin payını matematiksel olarak düşürür ve
payın düşmesi o bölgede bir şeyin kötüleştiğini göstermez. Bu ayrım
atlasın bütün pay hesaplarına uygulanacak.

**İkinci özgün bölüm.** Bölge içi ticaret dört konumun hiçbirinde
anılmıyor, çünkü uzun mesafeli ticaret sınırlarda kayda geçiyor, bölge
içi ticaret geçmiyor. Ölçülebilen kalem tartışılıyor, ölçülemeyen kalem
tartışmanın dışında kalıyor — ve dışarıda kalması küçük olduğu anlamına
gelmiyor.

**Uygulanan kural.** *Gerileme sözcüğü, ölçüt belirtilmeden
kullanılmaz.* Bu turda ve geçen turda yazılan beş dosyada uygulandı.

## Tur — Afrika ve bir kavram dosyası (25 Ağustos 2026)

Eklenen: `kavram-himaye-duzeni`, `aktor-murabitlar`,
`aktor-kongo-kralligi`. Toplam 434 → 437. Afrika 91 → 94.

**Himaye düzeni — neden ayrı dosya.** Beş ayrı dosyada (Tonga, Buhara,
Hîve, Hokand, Hawai) aynı düzenle karşılaşıldı ve her defasında yeniden
tarif edilmesi gerekiyordu. Dosya düzeni tarif ediyor ve iki gözlem
ekliyor: (1) himaye korunan devletin varlığını garanti etmez — atlasta
iki örnek himaye altındayken sona erdi, bir örnek yetkiyi geri alarak
bağımsızlaştı; (2) iki sonucu ayıran etkenlerden biri yerleşimci
nüfustur ve yerleşim toprağın satın alınabilmesine bağlıdır. Yani hukuki
bir hüküm, demografik bir sonucu ve onun üzerinden siyasi bir sonucu
belirleyebiliyor.

**Murâbıtlar — çölün bağlayan yüzey olması.** Haritada çöl bir ayırıcı
gibi görünür; bu hanedan çölün iki kıyısını ve ardından bir denizin iki
yakasını aynı yönetim altında topladı. Kayda geçen kural: **bir yüzeyin
ayırıcı mı bağlayıcı mı olduğu, coğrafyasından değil o yüzeyde işleyen
ulaşım düzeninden okunur.**

İkinci kayıt: meşruiyet biçiminin sonucu. Bu hanedan yetkisini soya
değil dinî ıslah iddiasına dayandırdı. Soy iddiası sınanamaz, öğreti
iddiası sınanabilir — ve hanedanın sonu tam bu yoldan geldi: aynı
bölgeden çıkan ikinci bir hareket, birincisini yeterince tutarlı
olmamakla suçlayarak yerini aldı. *Öğretiye dayanan bir meşruiyet,
kendisini yıkacak aracı da beraberinde getirir.* Bu, Orta Asya
turlarında ölçülen soy şartıyla doğrudan karşıtlık kuruyor.

**Kongo Krallığı — kanıt kısıtının kısmen aşıldığı yer.** Krallığın
hükümdarlarının yazdırdığı mektuplar, Afrika'dan yazılmış diplomatik
kaydın en erken örneklerinden. Dosya bunu üç adımda işliyor: kayıt var
ve erken; kayıt aracılıdır (yerel dilde değil, gelen din adamlarının
kaleminden); ve kaydın az bilinmesi ile var olmaması ayrı iki olgu.

Dosyanın kaydettiği kural: **bir düzenin kendi kaydını bırakması, o
düzenin başına gelenleri değiştirmez; yalnızca ne olduğunu bilinebilir
kılar.** Kaynak zenginliği ile siyasi sonuç arasında ilişki yok.

**En rahatsız edici kısıt.** Kongo dosyasının asıl konusu olan mektuplar
künyelenemedi — yayımlanmışlar ama açık erişimde değiller. Dosya onlar
hakkında konuşuyor ve onlara atıf yapamıyor. Bu, dosyanın kendi metnine
bu ifadeyle yazıldı.

**Reddedilen kaynak.** archive.org'da "kingdom of kongo" aramasında iki
üst sonuç yapay zekâ üretimi yüklemeydi (yaratıcı alanında
"Claude/Anthropic" ibaresi). Künyelenmedi. Bu, arama sonuçlarının
katalog verisiyle doğrulanması gerektiğinin yeni bir örneği.

## Tur — Afrika: iki hanedan, iki meşruiyet modeli (25 Ağustos 2026)

Eklenen: `aktor-muvahhidler`, `aktor-asanti-imparatorlugu`.
Toplam 437 → 439. Afrika 94 → 96.

**Muvahhidler — bir kaydın ikinci ölçümü.** Geçen tur Murâbıtlar
dosyasında bir kural yazılmıştı: öğretiye dayanan bir meşruiyet,
kendisini yıkacak aracı da beraberinde getirir. Muvahhidler bu kuralın
ikinci ölçümü — seleflerini inanç konusunda yeterince tutarlı olmamakla
suçlayarak iktidara geldiler ve bir buçuk yüzyıl sonra kendi tutarlılık
iddiasını sürdüremediklerinde çözüldüler. Örüntü iki kez üst üste
işledi.

**İki modelin karşılaştırılması — turun asıl kazancı.** Orta Asya
turlarında soya dayanan meşruiyet ölçülmüştü; burada öğretiye dayanan
meşruiyet ölçüldü. İkisi yan yana konduğunda net bir karşıtlık çıkıyor:

- Soya dayanan meşruiyet **sınanamaz** (bir kişi ya o soydandır ya
  değildir), yavaş değişir, ve onu kuran devlet dağıldıktan sonra da
  tanınabilirliğini korur — Orta Asya'da dört yüzyıl sürdüğü ölçüldü.
- Öğretiye dayanan meşruiyet **sınanabilir** (uygulama öğretiye uygun
  mu), hızlı değişir, her değişimi bir ıslah iddiası hâline getirir, ve
  taşıyıcı aygıt dağıldığında öğreti de dağılır.

Atlas ikisini üstünlük sıralaması olarak yazmıyor: öğreti modeli hanedan
dışı kişilere iktidar yolu açıyor, soy modeli istikrar sağlıyor ama
yetkiyi kapalı bir kümede tutuyor.

**Aşanti — yazısız devlet aygıtı.** Kanıt dosyasındaki kısıtın öteki
yüzü. Yazının bulunmaması karmaşık bir devlet aygıtının bulunmadığı
anlamına gelmiyor: vergi, yargı, elçilik ve askerlik düzenleri işliyordu;
hukuk kuralları ve protokol ezberleyicilerin sorumluluğundaydı ve
sorumluluk kalıtsaldı. Bu, sözlü gelenek tartışmasındaki ölçütü doğrudan
karşılıyor — aktarımın kuralları biliniyorsa güvenilirlik derecesi de
değerlendirilebilir.

İki ek gözlem: (1) altın tozu için standart ağırlık takımlarının
kullanılması, yazıya gerek duymadan işleyen bir standardizasyon örneği
— atlas bunu sikke ile aynı aileden sayıyor; (2) ilhak sonrası sembolün
teslim edilmesi talebi geniş bir direniş üretti ve sembol teslim
edilmedi: bir kurumun ortadan kaldırılması ile sembolünün ele
geçirilmesi ayrı iki şey.

**Üçüncü gözlem — taşıma maliyetinin ihracat bileşimini belirlemesi.**
Orman kuşağında tekerlekli taşıma yoktu, yükler insan sırtındaydı. Altın
ve esir bu kısıtın dışındaydı çünkü ikisi de birim ağırlık başına yüksek
değer taşıyordu. Yani bir bölgenin hangi malı ihraç ettiği, o malın
orada bol olmasından çok taşıma maliyetinin hangi malları elediğiyle
açıklanabiliyor.

**Kapı geri bildirimi.** KAPI 1, `batı-afrika` etiketindeki Türkçe
karakteri reddetti; etiketler ASCII olmalı. İlk kez bu turda tetiklendi.

**Kalibrasyon.** İki dosya da 26 bölümle yazıldığında %75-81'de kaldı.
Bölüm sayısını artırmak yerine paragrafları uzatmak daha verimli:
4 satırlık paragraflarla 30 bölüm hedefi tutuyor.

## Tur — Kuş Krallığı ve Haudenosaunee (25 Ağustos 2026)

Eklenen: `aktor-kus-kralligi`, `aktor-haudenosaunee`.
Toplam 439 → 441. Afrika 97, Amerika 87.

**Kuş — kanıt sınıflandırmasında bir bölünme.** Atlasın kanıt dosyası
dört tür tanıyordu ve biri "çağdaş yazılı kayıt"tı. Bu dosya o türün
ikiye ayrılması gerektiğini gösterdi: Meroitik yazının işaretlerinin ses
değerleri biliniyor, metinler seslendirilebiliyor ama dil bilinmediği
için anlaşılamıyor.

**Bir yazının varlığı, o yazının okunabildiği anlamına gelmez;
okunamayan yazı bir metin değil bir nesnedir.** Okunamayan yazı, kanıt
değeri bakımından nesne kanıtına yakın duruyor — nerede bulunduğu,
kimlerin kullandığı, ne kadar yaygın olduğu sorulabiliyor; ne dediği
sorulamıyor. Bu, atlasın kanıt dosyasına eklenmesi gereken bir alt
ayrım ve borç defterine yazıldı.

**İkinci kayıt — kaydın yönü.** Krallık bir yüzyıl boyunca kuzeydeki
komşusunu yönetti ama bu dönemin kaydı büyük ölçüde kuzeyden, yani
yönetilen taraftan geliyor. Hazarlar dosyasındaki mekanizmanın bir
varyantı: orada bir düzen yalnızca komşularının kaydından biliniyordu,
burada bir yönetim dönemi yalnızca yönetilenin kaydından biliniyor.

**Üçüncü kayıt — kalıcı kayıp.** Bölgenin bir bölümü baraj yapımı
nedeniyle su altında. Bu, atlasın olağan kısıtlarından farklı: öteki
kısıtlar zamanla azalabilir, bu azalmaz. Ayrım kaydedildi — bir bilginin
şu anda bulunmaması ile bulunmasının imkânsız hâle gelmiş olması aynı
cümleyle ifade ediliyor ama aynı şey değil. Birincisi bir borç,
ikincisi bir sınır; borç defterine yalnızca birincisi yazılabilir.

**Haudenosaunee — atlasın kendi kategorisinin sınanması.** Amerika
bölgesinde Kuzey Amerika yerli siyasi düzeni hiç yoktu. Bu dosya o
boşluğu açıyor ve aynı zamanda atlasın "aktör" kategorisini sınıyor:
konfederasyonda merkezî bir zor aygıtı yok, kararlar uzlaşmayla
alınıyor, ortak konseyin kararlarını zorla uygulatacak bir merci
bulunmuyor. **Bir siyasi birliğin sürekliliği, merkezî bir zor aygıtına
sahip olmasını gerektirmez; bu iki özellik ayrı ayrı sorulmalıdır.**

**Kaynak durumu — atlasta seyrek.** Üç künyeden ikisi birincil belge:
Wikisource'taki Great Law of Peace metni ve Parker–Newhouse 1916 baskısı
(archive.org, erişim kısıtı yok, katalogda yaratıcı alanında hem
araştırmacı hem konfederasyon üyesi görünüyor). Amerika bölgesindeki
dosyalar için bu olağandışı.

İkisi de geç transkripsiyon ve dosya bunu açıkça yazıyor. Metin
yüzyıllarca wampum dizileri ve sözlü aktarımla taşındı; yazıya geçirilmiş
birden çok sürüm var ve hangisinin bağlayıcı olduğu konfederasyon içinde
de tartışılıyor. Atlas künyeledi ve konumunu belirtti: seçilen sürüm
doğrulanabilir olduğu için seçildi, en doğru sürüm olduğu iddia
edilmiyor.

**Waitangi ile bağ.** Aynı sorunun bir başka biçimi. Orada iki dilli bir
belgenin hangi metninin bağlayıcı olduğu sorusu vardı; burada soru bir
dil farkından değil bir ortam farkından (sözlü/yazılı) doğuyor. Ortak
yan: bir belgenin ne söylediği hangi sürümünün okunduğuna bağlı
olabiliyor ve bu bağlılık belgenin kendisinden okunmuyor.

**Etki tartışması.** Kurucu metnin sonraki bir anayasa üzerinde etkili
olduğu iddiası kaydedildi, sonuçlandırılmadı. Atlasın kuralı yazıldı:
iki kurum arasındaki benzerlik birinin ötekinden alındığını göstermez;
aktarım zinciri gösterilmeden benzerlik yalnızca benzerliktir.

## Tur — Amerika: Mapuçe, Cahokia ve bir borç kapatma (25 Ağustos 2026)

Eklenen: `aktor-mapuche`, `aktor-cahokia`. Güncellenen:
`kavram-kanit-turu`. Toplam 441 → 443. Amerika 87 → 89.

**Önce borç kapatıldı.** Geçen tur Kuş dosyasında "yazılı kayıt türü
ikiye ayrılmalı" diye kaydedilmişti. Kanıt dosyasına iki bölüm eklendi
ve kural yazıldı: *bir yazının varlığı, o yazının okunabildiği anlamına
gelmez; okunamayan yazı bir metin değil bir nesnedir.* Ayrıca künye
kuralı eklendi: çözülmemiş bir yazı sistemine ait metinler birincil
kaynak olarak künyelenmez, onlara ilişkin kazı raporları künyelenir.

**Mapuçe — merkezsizliğin savunma değeri.** Aynı nehir hattı iki kez,
birbirinden bağımsız iki güç için sınır oldu. Dosyanın ölçümü:
**merkezî bir aygıtın bulunmaması, o düzeni merkezine vurarak yenme
yöntemini de ortadan kaldırır.** Merkezî bir düzeni yenmenin olağan yolu
merkezi ele geçirmektir; burada ele geçirilecek merkez yoktu.

Ölçümün sınırı da yazıldı: aynı yapı saldırı ve uzun süreli seferler
için elverişsizdir. Merkezsiz bir düzen kendi topraklarında dayanıklı,
dışarıda etkisizdir — iki özellik aynı yapının iki yüzü.

İkinci gözlem: merkezsiz bir tarafla yapılan antlaşma imzayla değil
tekrarla ayakta duruyor. Antlaşmalar her kuşakta büyük toplantılarla
yenileniyordu ve bu bir formalite değil, muhatabın sürekli yeniden
kurulması işlemiydi.

Üçüncü gözlem: sömürge yönetiminin sona ermesi, sömürge sınırları
içindeki her grup için bağımsızlık anlamına gelmedi. Yeni devletler
toprak iddiasını devraldı, antlaşma yükümlülüğünü değil.

**Kaynak durumu — dosyanın kendi zayıflığı beyan edildi.** Üç künyenin
ikisi karşı taraftan gelen dönem tanıklığı, biri giriş kapısı. Direnen
tarafın kendi kaydı künyelenemedi. Dosya bunu "konusuna göre en zayıf
kaynak bileşimi" diye açıkça yazıyor.

**Cahokia — ölçek ile bilgi arasında ilişki yok.** Kıtanın en büyük
yerleşimi hakkında onu yönetenlerin adı bile bilinmiyor; bugün
kullanılan ad bile yerleşimi kuranlardan değil, yüzyıllar sonra bölgede
yaşayan başka bir topluluktan geliyor. Ölçüm: **bir düzenin ölçeği, o
düzen hakkında ne bilinebileceğini belirlemez; belirleyen şey hangi
kayıt pratiğini sürdürdüğüdür.**

Kuş ile karşılaştırma dosyada kuruldu: orada yazı vardı ama
okunamıyordu, burada yazı hiç yok. Fark önemli — okunamayan yazı ileride
okunabilir, olmayan yazı için böyle bir ihtimal yok.

**Ondokuzuncu yüzyıl sınıflandırması kaydedildi.** Höyüklerin bölgedeki
halklardan başka bir topluluk tarafından yapıldığı görüşü uzun süre
savunuldu ve varsayımla kurulmuştu. Atlas örüntüyü kaydediyor: bir
kanıtın nasıl sınıflandırıldığı, sınıflandıranın ne istediğiyle ilişkili
olabilir. Aynı dosyada künyelenen 1848 tarihli çalışma için de ayrım
yapıldı — ölçüm verisi kullanılabilir, sınıflandırma önerisi
kullanılamaz.

**Kapı geri bildirimi.** KAPI 4 "nüfus geçişi" ifadesini reddetti;
terim, "demografik geçiş" için ayrılmış. Kastettiğim şey insan hareketi
olduğu için ifade değiştirildi. Terim kilidi bu turda ikinci kez farklı
bir sözcükte tetiklendi.

## Tur — Okyanusya: Rapa Nui ve Fiji (25 Ağustos 2026)

Eklenen: `aktor-rapa-nui`, `aktor-fiji-kralligi`. Toplam 443 → 445.
Okyanusya 10 → 12.

**Rapa Nui — bir anlatının çürütülmesinin kaydı.** Yerleşmiş çöküş
anlatısı (orman kesildi, açlık, iç savaş, toplum kendini yok etti) son
yirmi yılda her adımında sorgulandı: kemirgenlerin ormanın yenilenmesini
engellemesi, heykellerin kütük kullanılmadan taşınabildiğinin
gösterilmesi, ve en önemlisi büyük nüfus kaybının Avrupa temasından
*sonra* yoğunlaşması.

Dosyanın kaydettiği kural: **bir çöküş anlatısı, kanıttan önce bir fail
seçtiğinde, kanıt o failin çevresinde toplanır.** Birinci okuma adalıları
sorumlu tutuyor ve kaynak yönetimi hakkında ders veriyor; ikinci okuma
dışarıdan geleni sorumlu tutuyor ve temas hakkında ders veriyor. Fail
seçimi, dersi de belirliyor.

**Künye seçimi bilinçli.** Dört künyeden ikisi eski anlatının kaynakları
(Routledge 1920 ve 1911 Britannica), biri itirazı temsil eden akademik
çalışma (Hunt & Lipo 2011). Bir tartışmayı kaydederken yalnızca kazanan
tarafı künyelemek, tartışmanın nasıl kurulduğunu görünmez kılar — bu
dosyada açıkça yazıldı.

**İkinci gözlem — laboratuvar varsayımının maliyeti.** Kapalı sistem
varsayımı dış etkenleri baştan devre dışı bırakıyor ve bu, çöküş
anlatısının kurulmasındaki belirleyici adım. Varsayım kaldırıldığında
açıklama kümesi genişliyor.

**Üçüncü gözlem — anlatının ömrü.** İtirazlar akademik yazında yerleşmiş
olmasına rağmen yaygın anlatı değişmedi. *Bir anlatı, dayandığı kanıt
çürütüldükten sonra da işlevini sürdürebilir ve işlev, kanıttan daha uzun
ömürlüdür.*

**Fiji — mali yoldan ilhak.** Egemenlik askerî yenilgiyle değil,
ödenemeyen bir borç yüzünden devredildi. **Bir egemenlik devri, askerî
yenilgi olmadan da gerçekleşebilir; ödenemeyen bir borç aynı sonucu
üretir.**

**Okyanusya üçlüsü tamamlandı.** Tonga toprağı kapattı ve bağımsız kaldı;
Hawai toprağı açtı ve devrildi; Fiji toprağı açtı ve devretti. Üç örnek
aynı yöne işaret ediyor: toprağın devredilebilirliği, dış sermayenin ve
dış nüfusun yerleşmesini belirleyen ilk halka. Üç örnek kural kurmaya
yetmiyor ve dosyada bu yazılı.

**Dördüncü kez ölçülen örüntü.** Dış ticarete erişimi olan tarafın aynı
takımadadaki rakiplerine üstünlük kurması, artık Hawai, Tonga ve Fiji'de
ölçüldü. Üç takımadada da birleşme dış temasla aynı yıllara denk geliyor
ve bu, iç gelişmeyle dış etkenin ayrıştırılmasını zorlaştırıyor.

**Uzak bağlantı.** Fiji'deki pamuk plantasyonlarının çöküşü, bambaşka bir
kıtadaki iç savaşın bitmesine bağlı. Bağlantı ancak iki bölge birlikte
okunduğunda görünüyor; tek bir bölgenin dosyasında talep düşüşü nedensiz
bir dalgalanma gibi duruyor.

**Yakalanan hata.** Fiji dosyasının özetinde "yirmi yıl süren" yazmıştım;
metin üç yıl diyor. Düzeltildi. Özet ile gövde arasındaki tutarlılığı
hiçbir kapı denetlemiyor — bu, borç defterine yazılması gereken bir
denetim boşluğu.

## Tur — KAPI 17: özet/gövde tutarlılık denetimi (25 Ağustos 2026)

Yeni kapı: `araclar/linter-ozet.mjs`. Düzeltilen: 6 makale.
Toplam 445 makale (yeni makale yok; bu tur bakım turu).

**Neden.** Geçen tur Fiji dosyasının özetinde "yirmi yıl süren" yazdığımı
elle yakalamıştım; gövde üç yıl diyordu. Hiçbir kapı özet ile gövde
arasındaki tutarlılığı denetlemiyordu ve bu, borç defterine yazılmıştı.
Özet, makale kartlarında ve arama sonuçlarında gövdeden önce okunur —
oradaki yanlış bir sayı, gövdeye hiç bakmayan okurun aklında kalan tek
sayı olur.

**İlk deneme başarısız oldu ve nedeni kaydedildi.** "Özette geçen her
sayı gövdede de geçmeli" kuralı 445 makalede 76 bulgu verdi. Bulguların
büyük bölümü yanlış pozitifti: ondalık ayırıcı yüzünden bölünmüş sayı
parçaları (42,82 → "82") ve veri dosyalarının CSV'den gelen değerleri.
Bu, dar bir ölçütün neden gerekli olduğunun somut ölçümüdür.

**Daraltılmış ölçüt.** Kapı yalnızca SÜRE iddialarını denetliyor: özette
bir sayı ifadesinin hemen ardından zaman birimi geliyorsa (yıl, yüzyıl,
kuşak), o sayı gövdede de geçmeli. 76 → 15 bulgu.

**İki ayarlama daha gerekti:**
- `ay` ve `gün` birim listesinden çıkarıldı; "ay" sözcüğü "ayrı", "ayak"
  gibi sözcüklerin başına denk gelip yanlış pozitif üretiyordu. 15 → 10.
- "yüz yıl" ile "yüzyıl" aynı şeyi söyler; özet ayrı, gövde bitişik
  yazmış olabilir. Bitişik biçim de kabul edildi. 10 → 5.

**Kalan beş bulgunun beşi de gerçekti.** Beş makalenin özeti, gövdenin
hiç söylemediği bir süre iddia ediyordu: Kara Ölüm dönemi (yüz elli yıl),
Fransız Devrimi (on yıl), Bizans (sekiz yüzyıl), Hollanda Doğu Hindistan
Şirketi (sekiz yıl), Maori (beş yüzyıl). Beşi de gövdeye eklendi.

**Ölçümün kendisi bir bulgu.** 39 süre iddiasından 5'i gövdede
karşılıksızdı — yaklaşık sekizde bir. Bu oran, özetlerin gövdeden bağımsız
yazıldığını gösteriyor ve kapı artık bunu engelliyor.

**Kapının bilinen sınırı.** Yalnızca süre iddialarını görür. Özetteki
öteki nicelik iddiaları (nüfus, oran, mesafe) hâlâ denetimsiz ve daha
geniş bir ölçüt yanlış pozitif üretiyor. Bu, borç defterinde açık
kalıyor.

## Tur — Güney Asya: Vijayanagara ve Marathalar (25 Ağustos 2026)

Eklenen: `aktor-vijayanagara`, `aktor-marathalar`. Toplam 445 → 447.
Güney Asya 74 → 76.

**Vijayanagara — iki kanıt türünün bölünmesi.** İmparatorluk kendi
diliyle binlerce yazıt bıraktı; yazıtların içeriği neredeyse tümüyle
bağış, vakıf ve toprak tahsisi. Gündelik hayat, pazar, ordu, tören ise
yalnızca yabancı ziyaretçilerin anlatılarından biliniyor. Bölünme
rastlantı değil: taşa yazmanın amacı kalıcılık istenen şeyi
sabitlemektir ve kalıcılık istenen şey mülkiyettir.

Kayda geçen kural: **bir toplumun neyi taşa yazdığı, o toplumun neyi
kalıcı kılmak istediğini gösterir; geri kalanı başka kaynak
gerektirir.**

İkinci gözlem — malzeme seçiminin hukuki anlamı: taş yazıt kamuya açık
ve taşınamaz, bakır levha taşınabilir ve sahibinin elinde. Biri ilan,
öteki tapu işlevi taşıyor.

Üçüncü gözlem: at ithalatı askerî gücün temel unsuruydu ve iklim
nedeniyle yerel üretim yetersizdi. Bu, kıyı limanlarını denetleyenlere
toprak fethetmeden siyasi etki kurma imkânı verdi.

**Marathalar — yönetim ile gelir hakkının ayrışması.** Düzenin yayılma
aracı, başka bir yöneticinin topraklarından gelir payı talep etmekti ve
talep o toprağın yönetimini üstlenmeyi gerektirmiyordu. Kayda geçen
kural: **bir düzen, toprağı yönetmeden gelirinden pay alabilir; bu
durumda etki alanı yönetim alanından çok daha geniş olur.**

Doğrudan sonucu: bu düzenin haritada sınırı çizilemez. Aynı toprak
üzerinde bir taraf yönetiyor, başka bir taraf gelir payı alıyor
olabilir; yaygın haritalar bunu tek renkle gösterip iki ayrı ilişkiyi
tek bir hâkimiyet ilişkisine indirgiyor. Bu, mevcut
`tartisma-imparatorluk-siniri-nasil-cizilir` dosyasına en somut örneği
sağlıyor.

Dosya bir çözüm de öneriyor: sınırı çizilemeyen bir düzenin kapsamı,
toprak haritasıyla değil gelir defteriyle gösterilebilir. Düzen ayrıntılı
gelir kayıtları tutmuştu.

**İki dosyanın ortak kısıtı.** Her ikisinde de asıl bulgunun dayandığı
kaynak künyelenemedi — Vijayanagara'da yazıt derlemeleri, Marathalar'da
gelir defterleri. İki dosya da bunu metninde beyan ediyor. Künyelerin
çoğu karşı taraftan gelen dönem tanıklığı.

**KAPI 17 çalıştı.** Yeni kapı 422 makale tarayıp 39 süre iddiası
buldu, hepsi tutarlı. Bu turda yazılan iki dosyanın özetinde süre
iddiası yok, dolayısıyla tetiklenmedi.

## Tur — Okyanusya: Samoa ve vesayet yönetimi (25 Ağustos 2026)

Eklenen: `aktor-samoa-kralligi`, `kavram-vesayet-yonetimi`.
Toplam 447 → 449. Okyanusya 12 → 14.

**Samoa — üçüncü taraflar arasında yapılan paylaşım.** Takımada 1900'de
ikiye bölündü ve bölünme adalarda değil uzaktaki başkentlerde
kararlaştırıldı; adaların halkı anlaşmanın tarafı değildi. Bu, Berlin
Konferansı dosyasında kaydedilen yapının Pasifik'teki karşılığı.

Üç ölçüm çıktı:

1. *Dış tanımanın iç mücadeleye etkisi.* Üç dış güç üç farklı adayı
   destekledi ve her destek silah ve tanıma biçimindeydi. **Dışarıdan
   gelen tanıma, iç mücadelede bir tarafa kaynak aktardığında,
   mücadeleyi bitirmez; sürdürülebilir kılar.** Fark üçlü yapıda: tek
   tedarikçi olsa mücadele daha hızlı biterdi.

2. *Yargı yetkisinin uyrukluğa göre bölünmesi.* Üç konsolosluk kendi
   vatandaşları üzerinde yargı yetkisi kullanıyordu — aynı takımadada üç
   ayrı hukuk düzeni eşzamanlı işliyordu. Toprak satışlarının
   geçerliliği hangi mahkemenin baktığına göre değişiyordu, ve bu
   belirsizlik satın alan tarafa sistematik olarak yarıyordu. Dosyanın
   kaydı: bir hukuki belirsizlik taraflardan birine sistematik olarak
   yarıyorsa, o belirsizlik bir kusur değil bir düzenlemedir.

3. *Okyanusya'da dördüncü toprak ölçümü.* Tonga toprağı kapattı ve
   bağımsız kaldı; Hawai, Fiji ve Samoa toprağı açtı ve üçü de
   egemenliğini kaybetti. Dört örnek aynı yöne işaret ediyor ama kural
   kurmuyor; dosya karşı örnek aranması gerektiğini yazıyor.

**Vesayet yönetimi — hiyerarşinin belgeye yazılması.** Milletler
Cemiyeti Misakı'nın 22. maddesi, emanet edilen toprakları üç dereceye
ayırıyor ve dereceyi bağımsızlığa yakınlığa bağlıyor. Atlas için değeri
şu: **bir hiyerarşinin belgede yazılı olması, onu tartışılabilir kılar;
yazılmadığı yerde aynı hiyerarşi işler ama gösterilemez.** Sömürge
dönemi belgelerinin çoğu böyle bir sıralamayı gerekçe olarak kullanır
ama metne dökmez.

İki ek gözlem: emanetçiler örgüt tarafından değil savaşın galipleri
tarafından belirlendi ve çoğu durumda emanet o toprağı işgal etmiş
devlete verildi; ve metin emanetin ne zaman sona ereceğini
tanımlamıyor — süre, o düzenden yararlanan tarafın değerlendirmesine
bırakılmış.

**Adlandırma kararı.** Dosya `kavram-manda-sistemi` yerine
`kavram-vesayet-yonetimi` adıyla açıldı. Nedeni KAPI 15: "manda" çekirdeği,
mevcut `kavram-mandala-devleti` dosyasının çekirdeğiyle Türkçe ek
toleransı yüzünden eşleşiyor ve yanlış bir çakışma uyarısı üretebilirdi.

**Kapı geri bildirimi.** KAPI 7 (telif) `kavram-vesayet-yonetimi`
dosyasında aynı kaynaktan iki alıntı yakaladı. İlke 4 kaynak başına en
fazla bir alıntıya izin veriyor; ikinci ifade tırnaksız hâle getirildi.
Bu kapı ilk kez bu turda tetiklendi.

## Tur — Kaynak katmanında belge türünün açılması (25 Ağustos 2026)

Eklenen: `kaynak-hammurabi-kanunlari`, `kaynak-magna-carta`.
Toplam 449 → 451.

**Neden bu ikisi.** Kaynak katmanı 43 dosyaydı ve neredeyse tamamı
yazarlı kitaplardan oluşuyordu — büyük ölçüde batı kuramı. Hukuk ve
belge türünden tek bir kaynak yoktu: anayasa, antlaşma, kanun metni hiç
künyelenmemişti. Bu, atlasın kendi ilkesiyle çelişen bir boşluktu.

**Şema değişikliği gerekti.** `yayin_yili` alanının alt sınırı -500'dü.
Kaynak katmanı kurulurken yalnızca yazarlı kitaplar düşünülmüş ve en
eski örnek MÖ 5. yüzyıl olmuştu. Belge türü eklenmeye başlayınca sınır
gerçek bir engel hâline geldi; -4000'e çekildi ve gerekçe dosyaya
yazıldı. Atlasın dönem katmanı MÖ 10000'e uzanıyor, kaynak katmanının
MÖ 500'de başlaması için bir gerekçe yoktu.

**Hammurabi — eşitsizliğin açıkça yazılması.** Metnin en belirgin
özelliği cezanın taraflara göre değişmesi ve bunun gizlenmemesi. Hüküm
metinleri konumu doğrudan adlandırıyor ve farklı bedeli açıkça yazıyor.
Metnin kendi adalet anlayışı: *adalet, herkese aynı ölçüyle davranmak
değil, herkese konumuna uygun ölçüyle davranmaktır.*

Bu, geçen tur vesayet dosyasında kaydedilen gözlemin ikinci ölçümü — bir
hiyerarşinin belgede yazılı olması onu tartışılabilir kılıyor. İki belge
arasında üç bin yedi yüz yıl var, yani gözlem artık bir döneme özgü
değil.

İkinci kayıt: metnin kanun mu yoksa hükümdar övgüsü mü olduğu
tartışmalı, çünkü dönemin mahkeme kayıtlarında ona atıf
gösterilememiş. Buradan çıkan künye kuralı: bir metnin kanun sayılması
uygulandığının gösterilmesine bağlı; yazılmış olması yetmiyor.

**Magna Carta — metin ile ona yüklenen anlam.** Maddelerin büyük bölümü
feodal yükümlülükleri düzenliyor; bugün en çok alıntılanan iki madde,
altmışı aşkın maddeden ikisi. Belge imzalandıktan üç ay sonra geçersiz
ilan edilmiş.

Buradan iki künye kuralı çıktı:
- Bu belgeye atıf yapılırken **hangi yılın metninin** kastedildiği
  yazılmalı; bugün yürürlükte sayılan maddeler 1215 metninden değil
  sonraki bir yayımdan geliyor.
- Kural, Waitangi dosyasındaki dil kuralıyla aynı aileden. İkisi
  birlikte: çok dilli ya da çok sürümlü bir belgeye atıf yapılırken
  hangi dil ve hangi tarih kastedildiği yazılmalı.

**İki belgenin karşılaştırılması — turun asıl bulgusu.** Hammurabi
eşitsizliği açıkça yazıyor; Magna Carta yazmıyor, kapsamı daraltarak
uyguluyor. **Bir eşitsizlik, açıkça yazılabileceği gibi kapsam tanımıyla
da kurulabilir; ikinci biçim daha zor görülür** — çünkü metinde bir
ayrım maddesi bırakmaz ve kapsam daraltması unutulduğunda hüküm
gerçekten genelmiş gibi okunabilir.

**Kapı geri bildirimi.** KAPI 5 dönem bağlantısını yakaladı: doğru biçim
`/donem/02/`, `/donem/donem-02/` değil. Kaynak dosyalarında ilk kez
dönem bağlantısı kullanıldığı için bu turda ortaya çıktı.

## Tur — Belge katmanı: Tordesillas ve İnsan Hakları Beyannamesi
## (25 Ağustos 2026)

Eklenen: `kaynak-tordesillas-antlasmasi`,
`kaynak-insan-haklari-beyannamesi`. Toplam 451 → 453. Kaynak katmanı
43 → 47, belge türü 4 dosya.

**Tordesillas — ölçülemeyen hüküm.** İki devlet, çoğunu görmedikleri
toprakları bir boylam çizgisiyle paylaştı. Sorun şu: bir boylamın
denizde belirlenmesi gemide doğru zamanın bilinmesini gerektirir ve bu,
ancak iki buçuk yüzyıl sonra mümkün oldu. Antlaşmanın merkezî hükmü,
imzalandığı tarihte ölçülemiyordu.

Kayda geçen kural: **bir belgenin merkezî hükmü, o belgenin yazıldığı
dönemin tekniğiyle ölçülemiyorsa, hüküm bağlayıcı değil müzakere
edilebilir hâle gelir.** Nitekim Pasifik tarafındaki uyuşmazlık ölçümle
değil ödemeyle çözüldü — bir taraf iddiasından bedel karşılığı
vazgeçti. Belge bir sınır tespiti değil, bir pazarlık çerçevesi
kuruyordu.

İkinci kayıt — üçüncü ölçüm: paylaşımın tarafları arasında bölünen
halkın bulunmaması. Aynı yapı Tordesillas (1494), Berlin (1885) ve
Samoa (1899) dosyalarında üç kez ölçüldü; aralarında dört yüzyıl var,
yani yapı bir döneme özgü değil.

**İnsan Hakları Beyannamesi — üçlü dizinin tamamlanması.** Bu turla
birlikte atlas hak kapsamının üç biçimini de künyelemiş oldu:

- Hammurabi (MÖ 1754): eşitsizliği **açıkça yazar**, konumu adlandırır.
- Magna Carta (1215): eşitsizliği yazmaz, **kapsamı daraltarak** uygular.
- Beyanname (1948): kapsamı daraltmaz, **açıkça genişletir**.

Kayda geçen kural: **hak kapsamı üç biçimde kurulabilir — açıkça
sınırlandırarak, sessizce daraltarak ya da açıkça genişleterek.**
Aralarında üç bin yedi yüz yıl var.

Dosya kapsam ile bağlayıcılığı ayrıca ayırıyor: bu metinde ikisi zıt
yönde ayrışıyor — kapsam en geniş, bağlayıcılık en zayıf hâlde. İkisi
arasında bir bağ olup olmadığı tek örnekten çıkarılamayacağı için açık
soru bırakıldı.

**Bir çelişki kaydedildi, çözülmedi.** Aynı örgüt aynı yıllarda hem
statüden bağımsız eşitlik ilan eden bu metni hem toprakları hazırlık
derecesine göre sıralayan vesayet düzenini taşıyordu. Atlas çelişkiyi
kaydediyor ve şunu ekliyor: bir kurumun aynı anda iki zıt ilkeyi
taşıması olağandır ve bu, ilkelerden birinin sahte olduğunu göstermez.

**Magna Carta ile ters örüntü.** Orada bağlayıcı bir uzlaşma sonradan
genel bir ilkeye dönüştürülmüştü; burada genel bir ilke sonradan
bağlayıcı sözleşmelere dönüştürüldü. İki yön de aynı mekanizmayı
kullanıyor: bir metnin sonraki hukuki değeri, metnin kendisinden değil
sonraki kullanımından geliyor.

## Tur — Osmanlı belgeleri: Gülhane ve Kânûn-ı Esâsî (25 Ağustos 2026)

Eklenen: `kaynak-gulhane-hatti`, `kaynak-kanunuesasi-1876`.
Toplam 453 → 455. Belge türü 4 → 6 dosya.

**Neden bu ikisi.** Son iki tur belge katmanına ayrılmıştı ve dört
dosyanın dördü de Avrupa ya da küresel kaynaklıydı. İslam dünyası
katmanında tek bir hukuk belgesi yoktu. Wikisource'ta hem 1876
anayasasının metni hem 1839 fermanının dönem Fransızcası bulundu; TDV'de
üç ilgili madde de doğrulandı.

**Gülhane — kendini sınırlamanın ikinci biçimi.** Metnin ayırt edici
yanı, hükümdarın kendi koyduğu kurala kendisinin de bağlı olduğunu
bildirmesi ve bağın dışarıdan bir zorlamayla değil kendi iradesiyle
kurulması. Bu, Magna Carta'nın tam tersi: orada sınırlama bir yenilginin
ardından ve zorlamayla gerçekleşmişti.

Kayda geçen kural: **hükümdarın kendini sınırlaması iki yoldan olabilir
— bir güç dengesi onu zorlayarak ya da kendi hesabı onu buna
yönlendirerek.** İkisinin de kendine özgü kırılganlığı var: zorlamayla
kurulan sınır zorlayan taraf zayıflayınca, kendi iradesiyle kurulan sınır
aynı iradeyle kalkabiliyor.

**Hak kapsamı dizisi dörde çıktı.** Sıralama artık şöyle: Hammurabi
(MÖ 1754) eşitsizliği açıkça yazıyor; Magna Carta (1215) kapsamı
daraltarak uyguluyor; Gülhane (1839) kapsamı açıkça genişletiyor;
Beyanname (1948) aynı genişletmeyi bir yüzyıl sonra ve küresel ölçekte
yapıyor. Kânûn-ı Esâsî beşinci ölçüm noktası.

**Kânûn-ı Esâsî — kendini geçersiz kılan madde.** Meclis, anayasanın
ihlal edilmesiyle değil anayasanın kendi maddesi kullanılarak kapatıldı.
Kayda geçen kural: **bir belge, kendini geçersiz kılacak yetkiyi kendi
içinde taşıyabilir; bu durumda ihlal gerekmez, madde yeterlidir.**

Dosya ikinci bir kısıt daha kaydediyor: yürürlüğe girmesi mevcut
iktidarın onayına bağlı olan bir metin, o iktidarı sınırlandırma
kapasitesini baştan sınırlıyor.

Üçüncü kayıt — uykudaki belgenin işlevi. Metin otuz yıl uygulanmadı ama
ortadan kaldırılmadı ve 1908'de bir hareketin temel talebi oldu. Var
olan ama işlemeyen bir belge, yeni bir belge yazmaya gerek kalmadan bir
talep formüle etmeyi mümkün kılıyor. Bir belgenin siyasi değeri,
yürürlükte olup olmamasından bağımsız ölçülmeli.

**Waitangi kuralı iki kez uygulandı.** İki dosyada da künyelenen metin
çeviri: biri dönem Fransızcası, biri İngilizce. Özgün Osmanlıca metinler
künyelenemedi ve iki dosya da bunu açıkça beyan ediyor — dosyalardaki
madde göndermeleri çeviri metne dayanıyor ve özgün metinle
karşılaştırılmadı.

**Beyan edilen dengesizlik.** Belge türü altı dosyaya çıktı: ikisi
Osmanlı, dördü başka gelenekler. Doğu Asya, Güney Asya ve Afrika
geleneklerinden hiçbir hukuk belgesi künyelenmedi. Bu, atlasın öteki
katmanlarındakinden daha keskin bir dengesizlik ve doğrudan kaynak
erişilebilirliğiyle ilgili; borç defterine yazıldı.

## Tur — Belge katmanının bölge dengesizliği kapatıldı (25 Ağustos 2026)

Eklenen: `kaynak-meiji-anayasasi`, `kaynak-hindistan-anayasasi`.
Toplam 455 → 457. Belge türü 6 → 8 dosya.

**Geçen turda beyan edilen borç kapatıldı.** Doğu Asya ve Güney Asya
geleneklerinden hiçbir hukuk belgesi künyelenmemişti. İkisi de bu turda
eklendi; Afrika hâlâ eksik ve defterde duruyor.

**Meiji Anayasası — aynı aracın iki farklı sonucu.** İki anayasa aynı on
yıllarda, benzer dış baskı altında, hükümdarın onayıyla ve yukarıdan
aşağıya hazırlandı. Biri iki yıl sonra işlemez hâle geldi, öteki elli
altı yıl sürdü.

Dosya farkın nerede aranmayacağını önce yazıyor: metinlerin
sınırlayıcılığında değil. Meiji metni de hükümdara geniş yetki tanıyor,
hakları kanunla sınırlandırılabilir kaydıyla veriyor ve orduyu doğrudan
hükümdara bağlıyor — bu son madde Kânûn-ı Esâsî'de yok, yani bu metin
bazı ölçütlerle daha az sınırlayıcı.

Kayda geçen ölçüm: **bir anayasa, iktidarı elinde tutanların işine
yarıyorsa sürer; onlara karşı hazırlanmışsa onların elindeki araçlarla
durdurulur.** İki örnekle sınırlı olduğu ve başka etkenlerin de
ayrıldığı ayrıca yazıldı.

İkinci kayıt — denetim dışı alan: bir anayasa okunurken hangi hakların
tanındığı kadar hangi alanın düzenleme dışında bırakıldığı sorulmalı.
Meiji metninde askerî komuta denetim dışıydı ve bu, sonraki yarım
yüzyılın en belirleyici maddesi oldu. Ölçüt bütün anayasa künyelerine
uygulanacak.

Üçüncü kayıt: yazılı hukuk düzeninin varlığı, yabancıların yerel yargıdan
muaf tutulmasına son verme talebinin gerekçesi olarak kullanıldı ve
kabul gördü. Bir hukuki biçimin benimsenmesi doğrudan bir egemenlik
kazanımına dönüşebiliyor — biçimin iç işlevinden bağımsız bir sonuç.

**Hindistan Anayasası — hak kapsamının dördüncü biçimi.** Dizide üç biçim
ölçülmüştü: eşitsizliği açıkça yazmak, kapsamı sessizce daraltmak,
kapsamı açıkça genişletmek. Bu metin dördüncüsünü kullanıyor: kapsamı
genişletmekle kalmıyor, genişlemenin karşısındaki somut engeli
adlandırıp hedef alıyor.

Kayda geçen kural: **bir eşitlik ilanı, karşısındaki eşitsizliği
adlandırmadığı sürece o eşitsizliği hedef almaz; adlandırma, ilanı bir
uygulama aygıtına bağlar.**

İki ek gözlem: (1) bir anayasanın uzunluğu, kapsamlı olmasından çok
belirsizliğe ne kadar tahammül ettiğinin göstergesi; (2) sömürge
yönetiminin sona ermesi, o yönetimin kurduğu idari aygıtın ortadan
kalkması anlamına gelmiyor — önceki yönetim kanununun birçok maddesi
metne aktarıldı ve iki olgu ayrı ayrı izlenmeli.

**Belge katmanı artık üç anayasa taşıyor.** İkisi hükümdarın onayıyla ve
yukarıdan aşağıya, biri seçilmiş kurucu meclisle hazırlandı. Üç örnek,
hazırlık usulü ile ömür arasında ilişki kurmaya yetmiyor ve dosya bunu
yazıyor.

## Tur — Afrika belgeleri: OAU Şartı ve Liberya Bildirisi (25 Ağustos 2026)

Eklenen: `kaynak-afrika-birligi-sarti`,
`kaynak-liberya-bagimsizlik-bildirisi`. Toplam 457 → 459. Belge türü
8 → 10 dosya.

**Geçen turda beyan edilen borç kapatıldı.** Belge katmanında Afrika
geleneğinden hiçbir metin yoktu; iki dosya eklendi.

**OAU Şartı — paylaşım dizisinin dördüncü halkası.** Dizi Tordesillas
(1494), Berlin (1885) ve Samoa (1899) dosyalarında üç kez ölçülmüştü ve
üçünde de bölünen taraf masada yoktu. Dördüncüde masadakiler,
kendilerini bölmüş olan çizgileri koruma kararı aldı.

Kayda geçen ölçüm: **bir paylaşım masasının sonucu, o masada bulunmayan
tarafların sonraki onayıyla kalıcılaşabilir; onay, masayı meşru kılmaz
ama sonucu değiştirilemez hâle getirir.**

Dosya gerekçeyi de kaydediyor ve bir ayrım yapıyor: bir düzenin haksız
kurulduğunu kabul etmek ile onu değiştirmenin daha maliyetli olacağını
kabul etmek ayrı iki yargı, ve ikisi bir arada tutulabilir.

Dizinin tamamından çıkan sonuç: bir sınırın kalıcılığı, çizildiği andaki
gerekçesinden çok sonraki her kuşağın onu değiştirme maliyetine bağlı ve
bu maliyet zamanla artıyor.

İkinci kayıt — yazılmamış sıralamanın gücü: metin hem toprak
bütünlüğüne saygıyı hem halkların kendi geleceğini belirlemesini
sıralıyor ama aralarında öncelik yazmıyor. Uygulama birinciyi önceledi.
Bir metinde iki ilke sıralanmadan yan yana konduğunda, sıralamayı
uygulama belirliyor ve o sıralama metnin kendisi kadar bağlayıcı hâle
gelebiliyor.

**Liberya Bildirisi — kapsam sorusunun en keskin hâli.** Metin, köleliğin
mağdurları tarafından yazıldı ve maruz kalınan hukuki dışlanmayı tek tek
sayıyor — atlasın en doğrudan tanıklık metinlerinden. Kurulan devletin
anayasası ise yerleşim bölgesinde zaten yaşayan halkları yurttaşlık
kapsamının dışında bıraktı ve bu sınırlama yüzyılı aşkın süre yürürlükte
kaldı.

Kayda geçen ölçüm: **bir hak talebinin haklılığı, o talebi ileri
sürenlerin kuracağı düzenin kapsamını belirlemez; iki soru ayrı ayrı
sorulmalıdır.**

Dosya bunu suçlama olarak yazmıyor; olguyu kaydedip şunu da soruyor:
neden şaşırtıcı bulunuyor. Şaşırma, kapsamın yazanın kimliğinden
çıkarılabileceği varsayımından doğuyor.

**Beyan edilen kalıcı eksik.** Kıtanın kendi hukuk geleneklerinden —
sömürge öncesi hüküm derlemelerinden ve antlaşmalardan — hiçbiri
künyelenemedi. İki dosya da sömürgecilikle temas noktasında duruyor. Bu,
atlasın kendi ölçtüğü dijital erişim eşitsizliğinin doğrudan bir
örneği ve defterde duruyor.

## Tur — Belge dizisinin kapak taşı ve Nauru (25 Ağustos 2026)

Eklenen: `kavram-belge-okumasi`, `aktor-nauru`. Toplam 459 → 461.

**Belge okuması — beş turun toplanması.** Son beş turda on hukuki belge
künyelendi ve her birinde ayrı bir kısıt ölçüldü. Bu dosya yedisini bir
listede topluyor. `kavram-kanit-turu` dosyasının kanıt türleri için
yaptığını, bu dosya hukuki metinler için yapıyor.

Yedi kısıt ve ölçüldükleri yer:

1. **Kapsam dört biçimde kurulur** — eşitsizliği açıkça yaz, kapsamı
   sessizce daralt, kapsamı açıkça genişlet, engeli adlandırıp hedef al.
   (Hammurabi, Magna Carta, Gülhane–Beyanname, Hindistan)
2. **İlan ile uygulama ayrı ölçülür** — yazılmış olmak yetmez.
   (Hammurabi)
3. **Metnin sustuğu yer, konuştuğu yer kadar belirleyici** — ve iki ilke
   sıralanmadan yan yana konduğunda sıralamayı uygulama belirler.
   (Meiji, OAU Şartı)
4. **Hangi sürüm, hangi dil yazılmalı** — atlasın altı künyesinde
   uygulandı, beşinde metin çeviri. (Waitangi, Magna Carta)
5. **Kabul koşulları metinden okunamaz.** (Himaye, Fiji, Tordesillas,
   OAU Şartı)
6. **Sonraki hukuki değer sonraki kullanımdan gelir** — üç yönde de
   işliyor. (Magna Carta, Beyanname, Kânûn-ı Esâsî)
7. **Merkezî hüküm ölçülemiyorsa müzakere zeminine döner.**
   (Tordesillas)

Liste kapalı değil ve kısıtların ağırlığı sıralanmadı.

**Nauru — kaynak ile yaşam alanının örtüşmesi.** Atlasta bir kaynağın
hem gelir hem yaşam alanı olduğu tek örnek. Ölçüm: **bir kaynak,
çıkarıldığı yerin kendisiyse, gelir ile yaşam alanı arasında doğrudan
bir değiş tokuş kurulur ve bu değiş tokuş geri alınamaz.**

İkinci kayıt — vesayet eleştirisinin en somut hâli: emanetçi devletler
aynı zamanda fosfatın alıcısıydı. Bir denetim düzeninin, denetlenen
kaynağın alıcısına emanet edilmesi denetimi işlevsiz kılıyor.

Üçüncü kayıt: **bir gelir kaynağı, onu yönetecek kurum kurulmadan önce
akmaya başlarsa, kurumun kurulması için gereken teşvik de ortadan
kalkar.** Kural değil, eğilim olarak yazıldı; karşı örneklerin
incelenmediği belirtildi.

Dördüncü kayıt — Okyanusya beşinci örneği farklı eksende: önceki dördünde
belirleyici etken toprağın devredilebilirliğiydi, burada toprağın
kendisinin ihraç malı olması. Toprağın mülkiyeti ile maddi varlığı ayrı
ayrı sorulmalı.

**KAPI 15 yanlış pozitif verdi ve dosya adı değiştirildi.** İlk ad
`kavram-hukuki-belge-okumasi` idi; kapı bunu mevcut
`kavram-hukuk-devleti` ile çakıştırdı — "hukuk" çekirdeği Türkçe ek
toleransıyla "hukuki"ye eşleşiyor ve tek sözcüklü çekirdek daha büyük
çekirdeğin içinde kalıyor. Ad `kavram-belge-okumasi` olarak değiştirildi.
Kapının muhafazakârlığı bir kusur değil; ama tek sözcüklü çekirdeklerin
zayıf kanıt olduğu borç defterine yazılmalı.

## Tur — KAPI 15 onarımı ve Orta Asya: Karluklar, Kırgızlar
## (25 Ağustos 2026)

Eklenen: `aktor-karluklar`, `aktor-kirgizlar`. Onarılan:
`araclar/linter-tekrar.mjs`. Toplam 461 → 463. Orta Asya 38 → 40.

**Geçen turda açılan kapı borcu kapatıldı.** KAPI 15, tek sözcüklü
küçük çekirdek daha geniş bir çekirdeğin içinde kaldığında Türkçe ek
toleransıyla yanlış eşleşiyordu. Bu durumda tolerans kapatıldı, tam
eşitlik aranıyor. Sınama: gerçek korpusta 0 hata; sentetik sınamada eski
birleştirme çiftleri (Gana Krallığı/İmparatorluğu, Büyük
Selçuklu/Selçuklular) hâlâ yakalanıyor — ikisinde de çekirdek her iki
tarafta tek sözcüğe indiği için daralma onları etkilemiyor.

**Karluklar — bir topluluğun başkasının dipnotuna sıkışması.** Dört
yüzyıllık varlık, tek bir günün tek bir kararına indirgeniyor: bir
savaşın ortasında taraf değiştirdikleri iddiası. İddia, olaydan sonra ve
olayın taraflarından biri tarafından yazılmış kaynaklara dayanıyor.

Kayda geçen ölçüm: **bir topluluk hakkındaki kaydın tamamı başkalarının
kayıtlarından geliyorsa, o topluluk yalnızca başkalarını etkilediği
anlarda görünür.**

Dosya bir alternatif okuma da öneriyor ve kanıtlanmadığını yazıyor:
Karluklar tek boy değil boy birliğiydi; bir boyun kararı dışarıdan bakan
için bütün birliğin kararı gibi görünebilir. Önerinin değeri iddiayı
çürütmesinde değil, tek okumaya bağlı kalmanın dayanakları
sorgulanamaz kılmasını engellemesinde.

**Kırgızlar — açıklanmayan durma.** 840'ta güneydeki kağanlığı yıktılar
ve yerine geçmediler; kendi havzalarına döndüler. Bozkır tarihinde olağan
örüntü yıkanın yıkılanın yerine geçmesidir. Kaynaklar nedeni
açıklamıyor.

Kayda geçen ölçüm: **bir zaferin genişlemeye dönüşmemesi açıklanması
gereken bir olgudur; olağan sayılan yön, açıklanması gerekmeyen yön
değildir.** Anlatılar genellikle genişlemeyi açıklar ve durmayı
açıklamaz; hangi yönün açıklama gerektirdiği, o anlatının hangi yönü
olağan saydığını gösteriyor.

**Kanıt dosyasına üçüncü ayrım eklendi.** Kanıt dosyası yazılı kaydı
okunabilir/okunamaz diye ikiye ayırmıştı. Kırgız yazıtları okunabilir
ama kısa ve kişisel: tarih, hükümdar adı ve karar kaydı içermiyorlar;
buna karşılık akrabalık düzeni, unvanlar ve gömü pratikleri okunabiliyor.
Yani yazılı kayıt yalnızca okunabilirliğine göre değil, uzunluğuna ve
amacına göre de sınıflandırılmalı.

**Şema alanı düzeltmesi.** İki dosya da başta `guven_geneli: tartismali`
yazılmıştı ve KAPI 9 haklı olarak reddetti — tartışmalı işaretlenen bir
dosya ya `::tartismali` haritası ya ilgili bir tartışma dosyası
gerektiriyor. Doğru değer `yaygin`: dosyaların çekirdek olguları
(varlık, tarih, bölge) yaygın kabul görüyor; tartışmalı noktalar zaten
paragraf paragraf işaretli.

## Tur — Yürürlük tartışması ve kanıt dosyası onarımı (26 Ağustos 2026)

Eklenen: `tartisma-belge-ne-zaman-yururlukte`. Güncellenen:
`kavram-kanit-turu`. Toplam 463 → 464.

**Önce borç kapatıldı.** Kırgızlar dosyasında ölçülen üçüncü ayrım
kanıt dosyasına eklendi. Kanıt dosyası yazılı kaydı okunabilir/okunamaz
diye ikiye ayırıyordu; artık üçüncü bir kırılım var: metnin uzunluğu ve
amacı. Kural: **bir metnin ne söyleyebileceği, okunabilirliği kadar
hangi amaçla yazıldığına da bağlıdır.** Doğrudan künyeleme sonucu: bir
bölge için yazılı kaynak bulunduğunu söylemek, o bölgenin olay tarihinin
yazılabileceği anlamına gelmiyor.

**Yürürlük tartışması — belge katmanının doğal sorusu.** On belge
künyesinden en az dördü bu soruda birbirine düşüyor. Magna Carta
imzalandıktan üç ay sonra geçersiz ilan edildi ve bugün hâlâ bazı
maddeleri yürürlükte sayılıyor. Kânûn-ı Esâsî otuz yıl uygulanmadı ama
yayımlanmayı sürdürdü ve bir hareketin bayrağı oldu. Beyanname kabul
edildiği anda hiçbir devlet için bağlayıcı değildi ve bugün temel
metinlerden sayılıyor.

Dört konum: biçimsel geçerlilik / uygulama / talep dayanağı / soru tek
ölçütle cevaplanamaz.

**Dosyanın asıl bulgusu.** Üç ölçüt birbirini kapsamıyor ve dört
kombinasyonun dördü de atlasın künyelerinde fiilen görülüyor. Dört
durumda tek bir soru sorulsaydı, üçünde yanlış cevap alınırdı.

Kayda geçen ölçüm: **bir belge üç ayrı düzlemde var olabilir — hukuki,
fiilî ve siyasi — ve bir düzlemde yok olması ötekilerde de yok olduğu
anlamına gelmez.**

**İki künyeleme kuralı çıktı:**
- Belge künyelerinde iki tarih tutulmalı: kabul tarihi ve (biliniyorsa)
  uygulamanın başladığı tarih. Aradaki fark, metnin karşılaştığı direnci
  gösteriyor.
- Kısmi yürürlük nedeniyle üç ölçüt madde düzeyinde uygulanmalı; metnin
  tamamı için verilen bir cevap maddelerin çoğu için yanlış olabilir.

**Atlasın kendi konumu yazıldı.** Atlas uyuşmazlık çözmek için değil
kaydı doğru tutmak için ölçüt arıyor; bu nedenle uygulama ölçütüne
ağırlık verip öteki ikisini ayrıca kaydediyor. Bir hukukçu için
kullanışsız olan bir ayrım, bir kayıt tutucu için tam da aranan ayrım
olabilir.

**Genişletme önerisi kaydedildi.** Üç ölçüt hukuk dışı kurallara da
uygulanabilir görünüyor — Çağatay dosyasındaki meşruiyet kuralı örnek:
biçimsel dayanağı yoktu, uygulanıyordu ve talep dayanağıydı. Öneri
olarak kaydedildi, sınanması gerektiği yazıldı.

## Tur — Adva: Waitangi kuralının ikinci ölçümü (26 Ağustos 2026)

Eklenen: `olay-adva-1896`. Toplam 464 → 465.

**Neden bu.** Olay katmanı 90 dosyaydı ve Afrika'da yalnızca dört dosya
vardı: köle ticareti, Berlin Konferansı, bağımsızlık dalgası ve Mansa
Musa'nın haccı. Dördü de ya paylaşım ya sömürgecilik ekseninde; kıtadan
bir askerî sonuç yoktu.

**Asıl bulgu — aynı yapının ikinci ölçümü.** Savaşın nedeni, yedi yıl
önce imzalanmış iki dilli bir antlaşmanın iki metninin aynı maddede
farklı şey söylemesiydi. Avrupa dilindeki metin dış ilişkilerin karşı
taraf aracılığıyla yürütülmesini zorunlu kılıyor, yerel dildeki metin
bunu bir seçenek olarak tanımlıyordu — yani biri himaye kuruyor, öteki
kurmuyor.

Atlas bu yapıyı Waitangi dosyasında ölçmüştü. İki örnek arasında elli
altı yıl ve iki kıta var. Kayda geçen ölçüm: **sömürge dönemi
antlaşmalarının iki metinli olması bir kaza değil, tekrar eden bir
düzenlemedir; çeviriyi hazırlayan taraf kendi metnine daha geniş bir
yetki yazabilir.**

**İki örneğin ayrıldığı yer.** Yapı aynı, sonuç zıt. Waitangi'de çelişki
hukuki tartışmaya dönüştü ve sürüyor; burada savaşa dönüştü ve savaşı
metni dar yorumlayan taraf kazandı, antlaşma feshedildi. Yani aynı belge
sorunu, tarafların askerî kapasitesine göre bambaşka sonuç üretiyor —
belgenin metni sonucun yalnızca bir bileşeni.

**İkinci kayıt — tedarikçi çokluğu.** İmparatorluk silahı birden çok
Avrupa devletinden alıyordu; bir tedarikçi ambargo uyguladığında
ötekiler devreye giriyordu. Ölçüm: **birden çok tedarikçinin bulunması,
alıcının pazarlık gücünü artırır ve bu, silah ticaretinde doğrudan
askerî kapasiteye dönüşür.**

Bu, silahlı ticaret dosyasındaki döngüye bir ek getiriyor: orada döngü
alıcıyı bağımlı kılıyordu, burada tedarikçi çokluğu bağımlılığı
azaltıyor. Aynı ticaret biçimi, piyasa yapısına göre bağımlılık da
özerklik de üretebiliyor.

**Üçüncü kayıt — çelişkinin görünürlük anı.** İki metinli bir belgede
çelişki imza anında değil, taraflardan biri o metne dayanarak işlem
yaptığında görünür hâle geliyor.

**Sonucun sınırı yazıldı.** Bağımsızlık kalıcı olmadı: aynı Avrupa
devleti kırk yıl sonra yeniden saldırdı ve bu kez işgal gerçekleşti.
İlk savaşı kazandıran iki etken — teknolojik yakınlık ve tedarikçi
çokluğu — ikinci savaşta ikisi de ortadan kalkmıştı. Bir savaşın
kazanılması, aynı sorunun kapandığı anlamına gelmiyor.

**Beyan edilen eksik.** Antlaşmanın iki metni künyelenemedi; dosya
çelişki hakkında konuşuyor ve iki metne atıf yapamıyor. Aynı kısıt
Waitangi dosyasında aşılabilmişti — fark doğrudan kaynak
erişilebilirliğinden geliyor.

## Tur — Mfecane: adlandırmanın kendisi tartışma (26 Ağustos 2026)

Eklenen: `olay-mfecane`. Toplam 465 → 466.

**Dosyanın asıl bulgusu adda.** Sürecin bugün kullanılan adı yerel bir
dilden geliyor ve dağılma/ezilme anlamı taşıyor — yani yaşananları
mağdurun konumundan tanımlıyor. Aynı süreç için kullanılan başka adlar
ise olayı belirli bir topluluğun eseri olarak adlandırıyor ve fail
seçimini adın içine yerleştiriyor.

Kayda geçen ölçüm: **bir olayın adı, o olay hakkında bir iddia
taşıyabilir; adlandırma tarafsız bir işlem değildir.**

Atlas yerel dilden gelen adı kullanıyor ama tercihi gerekçelendiriyor:
adın tarafsız olduğu için değil, alternatiflerin daha güçlü bir fail
iddiası taşıdığı için. Kullanılan ad da bir çerçeve taşıyor ve dosya
bunu belirtmeden kullanmıyor.

**İkinci bulgu — fail seçiminin yeri.** Yerleşmiş anlatı süreci tek bir
siyasi birimin yükselişine bağlıyor. İtirazlar faili bölgenin içinden
dışına taşıyor: kıyı limanlarından yürütülen ticaret ve güneydeki
yerleşim bölgesinden gelen emek talebi.

Bu, Rapa Nui dosyasında ölçülen örüntünün ikinci ölçümü. Ölçüm: **bir
çöküş ya da altüst oluş anlatısında failin bölgenin içinde mi dışında mı
arandığı, kanıttan önce yapılan bir seçim olabilir.**

**Üçüncü bulgu — birleşik okumanın riski.** Üçüncü bir açıklama iklime
dayanıyor ve kanıt durumu ötekilerden farklı: iklim verisi bağımsız
üretilebiliyor, sözlü aktarımdan ya da gözlemci kaydından gelmiyor. Yeni
bir kanıt türünün devreye girmesi tartışmayı çözmüyor ama sınanabilir
hâle getiriyor.

Buna karşılık üç açıklamayı birleştiren okuma en makul görünen ve en az
sınanabilir olanı. Kayda geçen uyarı: **her etkeni kapsayan bir
açıklama, hiçbirini sınamayan bir açıklama olabilir.**

**Dördüncü kayıt — boşluk anlatısının işlevi.** Gözlemciler boşalmış
alanlar gördü ve boşluğu bir yıkımla açıkladı; açıklama gözlemin kendisi
değil bir çıkarımdı. Boşalmış toprak anlatısı, sonraki yerleşim
hareketlerinin boş sayılan toprağa yerleşme olarak sunulmasını
kolaylaştırdı. Dosya bunu suçlama değil işlev tespiti olarak kaydediyor:
bir anlatının belirli bir sonucu kolaylaştırması, o amaçla üretildiğini
göstermiyor — ama işlev yine de kaydedilmeli, çünkü bir anlatı dayandığı
kanıt tartışmalıyken bile işlevi sayesinde ayakta kalabiliyor.

**Yeni borç.** Bölgedeki siyasi birimlerin hiçbiri için ayrı bir aktör
dosyası yok. Dosya bunu kendi metninde beyan ediyor.

## Tur — Zulu Krallığı: zafer neden yetmedi (26 Ağustos 2026)

Eklenen: `aktor-zulu-kralligi`. Toplam 466 → 467.

**Geçen turda açılan borç kapatıldı.** Mfecane dosyası, bölgedeki siyasi
birimlerin hiçbiri için aktör dosyası bulunmadığını beyan etmişti.

**Dosyanın sorusu bir karşılaştırmadan doğuyor.** İki tur önce yazılan
Adva dosyasında bir Afrika devleti bir Avrupa ordusunu yenmiş ve zafer
tanınmış bağımsızlığa dönüşmüştü. Burada da bir Avrupa ordusu ağır
yenilgiye uğradı — ve krallık altı ay içinde ilhak edildi. Aynı tür
askerî sonuç, iki bambaşka siyasi sonuç üretti.

**Dört fark ölçüldü:**

1. *Silah tedariki.* Adva'da tedarikçi çokluğu vardı; burada tedarik tek
   yönlü ve sınırlıydı. Zafer ateşli silahla değil sayı ve arazi
   kullanımıyla kazanıldı.
2. *İkmalin yönü.* Adva'da giren ordunun ikmal hattı uzun ve kırılgandı;
   burada saldıran taraf komşu sömürge bölgesinden ilerliyordu ve kısa
   hat, yeni kuvvetin altı ay içinde gönderilmesini mümkün kıldı.
3. *Rekabetin yokluğu.* Adva'da bölgeye ilgi duyan birden çok Avrupa
   devleti vardı; burada tek bir güç vardı ve yenilgiden sonra
   başvurulacak üçüncü taraf yoktu.
4. *İç bölünme.* Adva'da seferberlik bölgesel önderlerin katılımıyla
   savaştan önce sağlanmıştı; burada iç rekabet sürüyordu ve saldıran
   taraf bunu kullandı.

Kayda geçen ölçüm: **bir askerî zaferin siyasi sonuca dönüşmesi,
kazananın zaferden sonra başvurabileceği alternatiflerin sayısına
bağlıdır.** Bu, Karluklar dosyasında ölçülen "özerklik komşu sayısına
bağlı" gözlemiyle aynı aileden; alternatif sayısı hem barış zamanında
hem savaş sonrasında belirleyici bir değişken.

**İkinci kayıt — dış tehdidin birleştirici etkisi bir varsayım.** İki
örnek arasındaki dördüncü fark zamanlamayla ilgili: ortak düşman iç
rekabeti kendiliğinden askıya almıyor, ve bu her örnekte ayrıca
sınanmalı.

**Üçüncü kayıt — yenilginin tırmandırıcı etkisi.** İlk muharebedeki
yenilgi geri çekilmeye değil çok daha büyük bir kuvvetin
gönderilmesine yol açtı. Bir yenilgi, kaybeden tarafın kapasitesi
yüksekse tırmandırma üretiyor; sonucu belirleyen ilk muharebe değil
kapasite farkı.

**Dördüncü kayıt — parçalama bir yönetim aracı.** Bir siyasi birimi
ortadan kaldırmanın iki yolu var: yerine geçmek ya da parçalamak.
Parçalama, doğrudan yönetim maliyetini üstlenmeden merkezî otoriteyi
ortadan kaldırıyor; karşılığında bölgeyi istikrarsız bırakıyor ve o
maliyet parçalayan tarafa gecikmeli dönüyor.

## Tur — Amerika olay katmanı: Túpac Amaru Ayaklanması (26 Ağustos 2026)

Eklenen: `olay-tupac-amaru-ayaklanmasi-1780`. Toplam 467 → 468.

**Neden bu.** Olay katmanında Amerika bölgesi 33 dosyaya bağlıydı ama
sömürge dönemi yerli hareketlerinden hiçbiri künyelenmemişti; katman
keşif, fetih, bağımsızlık ve yirminci yüzyıl olaylarından oluşuyordu.

**Dosyanın asıl bulgusu talep çerçevesinin değişmesi.** Hareket bir
vergi ve idare şikâyetiyle başladı, bağımsızlık talebiyle bitti. İlk
bildiriler kralı hedef almıyor, kral adına ve kralın kanunlarını
uygulatmak üzere hareket edildiğini bildiriyordu.

Kayda geçen ölçüm: **bir ayaklanma, merkezî otoritenin kendi
kurallarına dayanarak yerel uygulamayı hedef alabilir; bu, talebi baştan
meşru kılar ve katılımı genişletir.**

Bastırma sertleştikçe çerçeve değişti. İkinci ölçüm: **bir hareketin
talebi, bastırmanın sertliğine göre değişebilir; başlangıçtaki talebe
bakarak hareketin ne olduğuna karar vermek, sürecin kendisini görmezden
gelmektir.**

**Çerçeve değişiminin bedeli ölçüldü.** Kentli melez ve yerleşik nüfus
ilk aşamada tarafsızdı, ikinci aşamada karşı tarafa geçti — geçiş,
talep çerçevesinin değişmesiyle aynı döneme denk geliyor. Ölçüm: **bir
talebin genişletilmesi, kazandırdığı kadar kaybettirebilir; net etkisi
ancak iki yön birlikte ölçüldüğünde görülür.**

**Üçüncü kayıt — yasağın hedefi.** Bastırmadan sonra hanedan unvanları
kaldırıldı. Bu doğrudan bir kayıt müdahalesi: bir hakkın kaldırılması, o
hakkı taşıyan kaydın geçersiz kılınmasıyla yapılıyor. Bir talebin
dayandığı belge ya da statü ortadan kaldırıldığında, talep yeniden
formüle edilmek zorunda kalıyor.

**Dördüncü kayıt — arşiv yanlılığı.** Hareketin kendi belgeleri yalnızca
ele geçirilmiş oldukları için korunmuş. Aynı mekanizma kadınların
kayda girmesi için de geçerli: bir grubun tarihsel kayda girmesi çoğu
zaman yargılanmış olmasına bağlı ve bu, kaydın kendisinde bir yanlılık
üretiyor.

Buna karşılık aynı arşiv, dosyanın asıl bulgusunu mümkün kıldı: talep
çerçevesindeki değişim bir yorum değil, tarihli iki bildiri kümesinin
karşılaştırılmasından çıkan bir gözlem.

**Yeni borçlar.** Hareketin önderleri ve bölgedeki sömürge idari düzeni
için ayrı dosya yok; ikisi de dosyanın metninde beyan edildi.

## Tur — Komançe: teknolojinin askerî etkisi türevdir (26 Ağustos 2026)

Eklenen: `aktor-komance`. Toplam 468 → 469. Amerika 90 → 91.

**Dosyanın asıl ölçümü at hakkında.** Yaygın anlatı atı bir askerî
üstünlük aracı olarak sunuyor — süvari hareketliliği, baskın kapasitesi.
Bu doğru ama eksik: atın asıl etkisi bizonun avlanma verimini birkaç kat
artırmasıydı. Verim artışı bir fazla üretiyor, fazla ticarete ve nüfus
artışına dönüşüyor; askerî kapasite bu zeminden doğuyor, onu üretmiyor.

Kayda geçen ölçüm: **bir teknolojinin askerî etkisi, çoğu zaman onun
ekonomik etkisinin türevidir; sıralamayı tersine çevirmek, mekanizmayı
görünmez kılar.**

**Simetri, ölçümü güçlendiriyor.** Sonun doğrudan nedeni de ekonomik:
bizon sürüleri birkaç onyılda yok edildi ve askerî kapasite dayandığı
ekonomik temel yok olunca kendiliğinden çöktü. Yükseliş ve çöküş
açıklamaları aynı mekanizmaya dayanıyorsa, mekanizma daha güçlü bir
aday.

**Mapuçe ile ikinci ölçüm.** İki dosya arasında üç ortak unsur var:
merkezsiz örgütlenme, atın hızlı benimsenmesi, karşı tarafın tek muhatap
bulamaması. "Merkezî bir aygıtın bulunmaması, o düzeni merkezine vurarak
yenme yöntemini ortadan kaldırır" ölçümü artık iki yarımkürede bağımsız
olarak ölçülmüş durumda.

İkisi aynı onyıllarda sona erdi — karşı tarafın demiryolu ve telgrafa
erişmesiyle. Merkezsiz örgütlenmenin avantajı, karşı tarafın lojistik ve
haberleşme kapasitesi belirli bir eşiği geçene kadar sürüyor. Atlas
bunu rastlantı saymıyor ama nedensellik de iddia etmiyor.

**Üçüncü kayıt — alternatif sayısı yine belirleyici.** Gruplar üç ayrı
devletin genişleme yönünün kesiştiği bölgedeydi ve üçü de birbirinin
rakibiydi. Yüzyıl ortasında güneydeki iki devlet arasındaki savaş bölgeyi
tek yönetim altına soktuğunda pazarlık kapasitesi doğrudan düştü. Aynı
ölçüm Zulu ve Karluklar dosyalarında da yapılmıştı; artık üç örnekte
ölçülmüş bir eğilim.

**Dördüncü kayıt — esir ticaretinin iki yönü.** Esirlerin bir bölümü
satılıyor, bir bölümü gruplara katılıyor ve zamanla tam üye
sayılabiliyordu. Aynı uygulama hem bir şiddet biçimi hem bir nüfus
stratejisi; ikisi ayrı ayrı ölçülmeli.

## Tur — Commit kancası ve Pasifik nükleer denemeleri (26 Ağustos 2026)

Eklenen: `olay-pasifik-nukleer-denemeleri`. Eklenen araç:
`.git/hooks/pre-commit`. Toplam 469 → 470. Okyanusya 15 → 16.

**Önce geçen turun hatası kalıcı olarak kapatıldı.** KAPI 11'i geçmeyen
bir dosya commit'lenmişti. Kapılar zaten yazılıydı; eksik olan onların
commit anına bağlanmasıydı. Artık `npm run lint` commit öncesinde
çalışıyor ve geçmezse commit duruyor. Kanca gerçek bir bozuk dosyayla
sınandı: commit engellendi ve hata satırları basıldı. Kopyası
`araclar/git-kancalari/` altında tutuluyor ki yeni bir klonda
kurulabilsin.

**KAPI 17 kendi metnimde tetiklendi.** Bu dosyanın özeti "elli yıllık"
diyordu, gövde bu sayıyı hiç anmıyordu — kapının yazılma nedeni tam da
buydu. Düzeltildi.

**Dosyanın asıl konusu vesayetin sınanması.** Deneme alanlarının önemli
bölümü vesayet ya da sömürge statüsündeki adalardı ve o adaların halkı
karar süreçlerinin hiçbirinde temsil edilmiyordu. Emanetçi devlet,
emanet ettiği toprağı kendi silah programı için kullandı.

Kayda geçen ölçüm: **bir emanet ilişkisinde emanetçinin kendi çıkarı ile
emanet edilenin çıkarı çatıştığında, ilişkinin kendisi bir denetim
mekanizması sağlamıyorsa emanetçinin çıkarı üstün gelir.**

**İkinci ölçüm — alan seçiminin siyasi sonucu.** Seçim ölçütleri
teknikti: düşük nüfus yoğunluğu, ana karadan uzaklık, hâkim rüzgâr yönü.
Üçünün de ortak sonucu, riskin taşıyıcısı ile kararın vericisi
arasındaki mesafeyi artırması. Ve mesafe yalnızca fiziksel değil —
vesayet statüsü siyasi mesafeyi hukuki olarak kurumsallaştırıyor:
temsil edilmeyen bir nüfusun yaşadığı alan, riskin yerleştirilmesi için
sistematik olarak daha düşük maliyetli görünüyor.

**Üçüncü ölçüm — belirsizliğin yüklenmesi.** Rüzgâr hesabının yanılma
payı vardı ve payı taşıyan, hesabı yapan taraf değildi. Bu, Samoa
dosyasındaki "bir belirsizlik taraflardan birine sistematik olarak
yükleniyorsa, o belirsizlik bir kusur değil bir düzenlemedir" ölçümünün
ikinci hâli — biri hukuki, öteki teknik belirsizlik, yüklenme yapısı
aynı.

**Dördüncü ölçüm — yasağın kapsamı ölçme kapasitesine göre çizilir.**
1963 antlaşması yer altı denemelerini kapsam dışında bıraktı; ölçüt
ahlaki bir sınır değil, uzaktan doğrulanabilirlikti.

**Okyanusya'da altıncı ölçüm.** Altı dosyada da aynı yapı: bölgeyi
doğrudan etkileyen kararlar bölgenin dışında ve katılımı olmadan
alındı. Ölçüm: **bir bölgenin nasıl kullanılacağına o bölgede
yaşamayanların karar vermesi, sınır çizmekle aynı yapıdadır ve aynı
sonuçları üretir.**

## 2026-08-26 — Kâtib Çelebi ve Kitâb-ı Bahriye

İki dosya birlikte yazıldı: aynı imparatorlukta, bir yüzyıl arayla,
kendi geleneğinin dışından kaynak kullanan iki eser. Fark, tercihin
yazıyla gerekçelendirilip gerekçelendirilmediğidir.

- `dusunur-katib-celebi` — çeviriyle dışarıdan kaynak katmayı
  gerekçelendiren âlim. Ölçüm: bilginin doğruluğu ile kaynağının
  geleneği ayrı iki sorudur.
- `kaynak-piri-reis-kitab-i-bahriye` — bir eserin kaynak listesinin
  kendisi, o tarihte o yerde hangi kayıtların erişilebilir olduğunu
  gösteren bir kanıttır.

Künye: TDV maddeleri birincil tercih olarak, Wikipedia yalnızca giriş
kapısı olarak (dosya başına bir tane). İki eserin de doğrulanabilir
çevrimiçi tam metni bulunamadı; kısıt her iki dosyada da beyan edildi.

Açık borç: iki eserin tam metni künyelenemedi.

## 2026-08-26 — Afrika birincil kaynak katmanı

Denetim defterindeki "sömürge öncesi Afrika hukuk belgesi yok" borcu
kapatıldı; yanına iki dosya daha kondu.

- `kaynak-fetha-nagast` — Mısır'da Arapça derlenip Etiyopya'da Geez'e
  çevrilerek yüzyıllarca yürürlükte kalan kanun kitabı. Ölçüm: bir
  düzenin temel hukuku dışarıdan çeviriyle gelmiş olabilir; yürürlükte
  olması yerli olmasını gerektirmez.
- `kaynak-kurukan-fuga-sarti` — on üçüncü yüzyılda ilan edildiği
  aktarılan, yazılı metni yirminci yüzyılda derlenen düzen belgesi.
  Ölçüm: bir belgenin ilan tarihi ile elde bulunan metninin tarihi ayrı
  iki veridir. `guven_geneli: tartismali`, iki tartışma dosyasına bağlı.
- `kaynak-ibn-battuta-rihle` — atlasta on'dan fazla dosyada tanık
  olarak anılan metnin kendi güvenilirlik kuralları. Ölçüm: bir eserin
  bütünü için verilen güven derecesi her bölümü için geçerli değildir.

Künye notu: Ibn Battûta'nın 1829 Lee çevirisinin Royal College of
Physicians / Wellcome taraması (`archive.org/details/b28406084`)
birincil-tanık olarak künyelendi; kurum taraması olduğu için
provenansı doğrulanabilir.

Reddedilen: `fetha-nagast-english-translation` (archive.org) — tek
kullanımlık e-posta adresli yükleyici, yayıncı ve çevirmen bilgisi yok,
büyük olasılıkla hâlâ telifli bir çevirinin izinsiz kopyası.

Açık borç: Fetha Nagast'ın kölelik hükümleri ayrı dosya bekliyor;
Kurukan Fuga'nın derlenmiş sürümlerinin doğrulanabilir tam metni
künyelenemedi.

## 2026-08-26 — Mitolojik eksen açıldı

Şemada tanımlı sekiz eksenden biri (`mitolojik`) bugüne kadar hiçbir
dosyada kullanılmamıştı. Üç dosyayla açıldı.

- `kavram-kurulus-anlatisi` — kural: bir kuruluş anlatısı, anlattığı
  dönemin değil, yazıya geçirildiği dönemin kaynağıdır.
- `kaynak-kojiki` — saray buyruğuyla derlenen, hanedanı tanrılara
  bağlayan kayıt. Ölçüm: rakip kuruluş anlatıları silinmez, hâkim
  anlatının alt dalı yapılarak etkisizleştirilir.
- `kaynak-gilgamis-destani` — ölçüm: bir metnin "aslı" sorusu her zaman
  anlamlı değildir; bazı metinler bir asıldan değil bir kopyalama
  geleneğinden gelir. Hem `eser` hem kazı buluntusu olduğu için kanıt
  türü dosyasına bağlandı.

Künye notu: iki birincil metin de `en.wikisource.org` üzerinden kamu
malı çevirilerle künyelendi (Chamberlain 1882, Thompson). Her ikisi de
erken çeviri olduğu için sonraki yayınlardaki eklemeleri içermez;
kısıt her iki dosyada da beyan edildi.

## 2026-08-26 — Pasifik emek düzeni ve Talas birleştirmesi

- `kavram-pasifik-isci-toplama` — on dokuzuncu yüzyılda ada
  topluluklarından plantasyonlara işçi taşıyan düzen. Ölçüm: bir
  uygulamanın kaydı yalnızca uygulayan tarafça tutulmuşsa, o kayıttaki
  rıza ifadeleri bağımsız kanıt sayılmaz. İki birincil kaynak da
  toplayan taraftan geliyor; bu, dosyanın ölçümünün kendisi.
- `kaynak-cook-guney-seyir-defteri` — ikinci Pasifik seferinin resmî
  anlatısı. Ölçüm: bir karşılaşmanın tek tarafça tutulmuş kaydı, o
  karşılaşmanın değil kaydı tutanın beklentilerinin de kaynağıdır.
  Bir yüzyıl sonraki işçi toplama kaydıyla karşılaştırmalı okunuyor.
- `olay-talas-savasi` BİRLEŞTİRİLDİ. Eski dosya 301 kelimeydi (hedefin
  %25'i) ve künyesinde iki Wikipedia vardı. Yeni gövde yazıldı, eski
  dosyanın adları ve yer bilgisi taşıyan iki bölümü korundu, künye tek
  Wikipedia'ya indirildi (yerine TDV SEMERKANT). 1205 kelime.

İş kazası: yeni Talas dosyası ile eski dosyayı birleştirmek için
yazdığım betik hata verdi ama `rm` ayrı bir komut olduğu için yine de
çalıştı; henüz commit'lenmemiş yeni dosya silindi ve içerik elle
yeniden yazıldı. Ders: silme işlemi, birleştirmenin başarısına bağlı
olmalı (`&&`), ayrı komut olmamalı.

## 2026-08-26 — Orta Asya turu

Bölge sayımında en zayıf ikinci sıradaydı (41). Üç dosya eklendi.

- `dusunur-ulug-bey` — Semerkant rasathanesi ve yeni gözleme dayanan
  yıldız kataloğu. İki ölçüm: (1) bir kaydın uzun süredir
  tekrarlanıyor olması doğruluğunun değil aktarımının kanıtıdır;
  (2) bir ölçüm onu yaptıran kurumdan uzun yaşayabilir, taşınabilir
  olması bunun koşuludur. Rasathane yıkıldı, zîc kaldı.
- `olay-rus-turkistan-fethi` — üç hanlığın üç farklı akıbeti. Ölçüm:
  aynı fetih dalgasında farklı hukuki biçim seçilmesi yönetim
  maliyetiyle ilgili bir hesaptır, direnişin şiddetiyle orantılı
  değildir.
- `kavram-pamuk-tek-urun` — fethin tarım sonucu. Ölçüm: bir bölgenin
  ne ektiği, toprağının neye elverişli olduğundan çok bağlandığı
  pazarın ne istediğiyle belirlenebilir. Aral'ın kuruması bu dosyada
  bir çevre kararı değil bir tarım kararı sonucu olarak kaydedildi.

İki kapı bu turda kırıldı ve düzeltildi: KAPI 17 (özette "otuz yıl"
diyip gövdede hiç anmamak) ve KAPI 5 (henüz yazılmamış bir kavram
dosyasına link). İkincisi kasıtlıydı — dosyalar aynı turda yazılıyordu.

## 2026-08-26 — Okyanusya turu

Bölge sayımında en zayıf sıradaydı (16). İki dosya eklendi; ikisi de
geçen turda künyelenen Pasifik birincil kaynaklarına dayanıyor.

- `aktor-yeni-hebridler-ortak-yonetimi` — iki imparatorluğun aynı
  adaları paralel iki idareyle yönettiği düzen. Ölçüm: iki yönetimin
  birlikte kurulduğu yerde, hiçbirine ait olmayanlar iki hukukun
  kesişiminde değil dışında kalır. Adalıların vatandaş sayılmaması
  bunun somut hâli.
- `aktor-banaba` — fosfat madenciliği yüzünden yaşanmaz hâle gelen
  ada. Ölçüm: bir imza, iki tarafın aynı şeye rıza gösterdiğini
  kanıtlamaz. Topluluğun kendi fosfat gelirinden ayrılan parayla
  satın alınan bir adaya taşınması, tazminat değil yer değiştirme
  finansmanı olarak kaydedildi. Nauru ile karşılaştırma: aynı kaynak,
  aynı şirketler, farklı sonuç — belirleyici olan geliri kimin ne
  zaman denetlediği.

Yeni birincil kaynak: Albert Ellis'in 1936 tarihli anlatısı (McGill
Library taraması) — fosfatı bulan ve işleten tarafın kendi kaydı.
Cook 1777 ve Wawn 1893 taramaları da bu dosyalarda yeniden kullanıldı.

Reddedilen alan: `britannica.com` havuzda beyaz listede ama otomatik
isteklere 403 dönüyor; canlılık kapısını geçemeyeceği için künyeye
alınmadı. Aynı durum daha önce nzhistory.govt.nz ve teara.govt.nz
için de kaydedilmişti.

## 2026-08-26 — Güney Asya turu

Atlasta ne Gandhi ne Ambedkar dosyası vardı; adları hiçbir dosyada
geçmiyordu. Bir dünya atlası için bu büyük bir boşluktu.

- `dusunur-ambedkar` — dışlandığı düzenin kurucu metnini yazan
  hukukçu. Ölçüm: bir toplumsal düzenin adil olup olmadığı, ondan en
  çok yararlananlara sorularak belirlenemez. Atlas bu ölçütü kendine de
  uyguluyor: bir kaydın eksikliği, kaydı tutanlara değil kayda
  geçmeyenlere bakılarak görülür.
- `dusunur-gandhi` — ölçüm: bir yönetimin gücü, kullandığı zorla değil
  zor kullanmadan sağladığı iş birliğinin miktarıyla ölçülür. Yöntemin
  sınırı da açıkça yazıldı: karşı tarafın kendi kamuoyuna gerekçe
  vermek zorunda olduğu yerlerde işler.
- `olay-bengal-kitligi-1943` — ölçüm: kıtlıkta ölenler gıdanın
  bulunmadığı kişiler değil, bulunan gıdayı satın alamayan kişilerdir.
  Raporun kendi meslek gruplarına göre ölüm dağılımı bunu doğrudan
  gösteriyor.

İki dosya birbirinin karşı tarafını kaydediyor: temsil biçimi
anlaşmazlığı (ayrı seçmen listesi mi ayrılmış koltuk mu) her iki
dosyada da, kendi ağırlığıyla ele alındı. Aynı olayın iki dosyada
farklı ağırlık taşıması ayrıca beyan edildi.

Yeni birincil belgeler: Famine Inquiry Commission'ın 1945 tarihli iki
raporu (Government Printing New Delhi ve Madras Government Press).
Dosyada raporlar hem kaynak hem inceleme nesnesi: bir yönetimin kendi
felaketini soruşturması kanıt üretir ama tarafsız kanıt üretmez.

Reddedilen: archive.org'daki bütün "Annihilation of Caste" yüklemeleri
— hiçbirinde yayıncı, baskı yılı veya doğrulanabilir yükleyici bilgisi
yok. Ambedkar'ın metinleri künyeye giremedi; kısıt dosyada beyan
edildi.

Açık borç: `kavram-kast` künyesinde iki Wikipedia var (Caste system in
India + Delhi Sultanate). Bir sonraki turda düzeltilmeli.

## 2026-08-26 — İki eski dosyanın onarımı

Bu tur yeni makale yazmak yerine, atlasın en zayıf iki eski dosyası
yeniden yazıldı. Tarama sonucu: 488 makalenin 298'i hedef uzunluğun
altında; en kötüleri %14–16 bandında.

- `kavram-kast` 226 → 626 kelime. Künyedeki ikinci Wikipedia (Delhi
  Sultanate) çıkarıldı, yerine 1921 nüfus sayımı raporu (Government of
  India, Calcutta) birincil belge olarak kondu. Yeni ölçüm: bir
  sınıflandırma resmî hâle geldiğinde, sınıflandırılanlar kendi
  konumlarını iyileştirmek için sınıflandırmanın diline geçmek zorunda
  kalır. Eski dosya üç terimi (varna / jāti / kast) ayırıyordu ama
  gerekçesini vermiyordu; şimdi veriyor.
- `tartisma-somurgeciligin-ekonomik-bilancosu` 220 → 1505 kelime.
  Pozisyonlar üçten beşe çıkarıldı ve gerçek ölçüt adlarıyla yeniden
  yazıldı: aktarım, karşı-olgusal, kurumsal miras, sömürgeleştirenin
  kendi hesabı, ölçülemezlik. Dördüncü pozisyon için Adam Smith'in
  1776 metni (Wikisource tam metin) birincil kaynak olarak eklendi ve
  ikinci Wikipedia (Dependency theory) çıkarıldı.

Eski dosyaların ortak kusuru şuydu: pozisyonlar "Kaynağın şu bölümü"
diye adlandırılıyor, yani tartışmanın kendisi değil kaynağın
bölümlenmesi anlatılıyordu. Yeni sürümlerde pozisyonlar ölçüt adıyla
anılıyor ve dördü savunanlar kütüğüne `kisi-degil` olarak yazıldı.

Dosyanın kapanışı bir rakam değil, bir soru listesi: hangi ölçüt,
hangi dönem, hangi tarafın defteri, hangi karşılaştırma noktası,
neyin kaydı yok.

## 2026-08-26 — Amerika: emek düzeni ve içeriden eleştiri

Amerika katmanında büyük bir boşluk vardı: `olay-atlantik-kole-ticareti`
ve `olay-tupac-amaru-ayaklanmasi-1780` dosyaları vardı ama aralarındaki
emek düzenini adlandıran hiçbir kavram dosyası yoktu.

- `kavram-zorunlu-emek-duzeni` — encomienda ve mita'nın ortak adı.
  Üç ölçüt: reddin mümkün olup olmaması, kişinin satılabilir olup
  olmaması, karşılığın kim tarafından belirlendiği. Ölçüm: yerleşik bir
  yükümlülüğün adını koruyup içeriğini değiştirmek, yeni bir yükümlülük
  kurmaktan daha az direnç doğurur. İkinci ölçüm: topluluk başına sabit
  bir yükümlülük, nüfus azaldıkça kendiliğinden ağırlaşır.
- `dusunur-las-casas` — düzenin dönemindeki en ayrıntılı eleştirmeni.
  İki ölçüm: (1) bir düzeni en ayrıntılı biçimde eleştirenler çoğu
  zaman o düzenin içinden çıkar, ayrıntı bilgisinin kaynağı katılımın
  kendisidir — Las Casas önce encomienda sahibiydi; (2) bir
  eleştirinin kimin elinde dolaştığı, doğruluğunu değiştirmez ama neye
  hizmet ettiğini belirler — metni, aynı işi başka yerde yapan rakip
  imparatorluklarca propaganda olarak basıldı.

Sayı sorunu ayrıca ele alındı: metnin ölüm rakamları veri olarak
kullanılmıyor, ama bu metnin bütününü geçersiz kılmıyor. İki hatadan
da kaçınıldı — metni propaganda sayıp içeriğini reddetmek ve metni tam
kayıt sayıp sayılarını doğrudan kullanmak.

Yeni birincil kaynak: 1656 tarihli "The Tears of the Indians"
(Brevísima relación'un erken İngilizce baskısı, archive.org kurum
taraması). Guamán Poma el yazması da zorunlu emek dosyasında yeniden
kullanıldı — düzeni tabi kılınan tarafın konumundan anlatan tek
birincil kayıt.

Reddedilen: `es.wikisource.org` (havuzda beyaz listede değil, daha önce
de reddedilmişti).

Açık borç: `aktor-portekiz-imparatorlugu` hâlâ yok. TDV PORTEKİZ maddesi
ve Tordesillas metni hazır, bir sonraki turda yazılacak.

## 2026-08-26 — Portekiz İmparatorluğu

Geçen turda kaydedilen borç kapatıldı. Atlasta İspanyol, Britanya ve
Hollanda düzenleri vardı ama Portekiz yoktu — hem en uzun ömürlü hem
de biçim olarak en farklı olanı.

Dosyanın ekseni: bu bir toprak imparatorluğu değil, bir ağ. Uzun deniz
yolları üzerinde tahkimli düğüm noktaları tutuluyor. Toplam yüzölçümü
küçük, denetlenen ticaret hacmi büyük.

Ana ölçüm: bir gücün kapsamı, tuttuğu toprakla değil, başkalarının
hangi işlemler için ondan izin almak zorunda kaldığıyla ölçülür.
Kartaz düzeni bunun somut hâli — yüzyıllardır süren bir ticareti
kurmadan, üzerine bir ücret koymak.

İkinci ölçüm: ağ tipi hâkimiyet yüksek getiri ve yüksek kırılganlığı
aynı anda üretir. Kara imparatorluklarında toprak kaybı kademelidir;
burada tek bir düğümün kaybı bütün hattı etkisiz kılabilir.

Üçüncü ölçüm: aynı imparatorluk aynı dönemde iki farklı biçim kullandı
— Hint Okyanusu'nda ağ, Brezilya'da yerleşim. Fark ideolojiden değil
üründen geliyor: şeker ve maden geniş arazi ve yoğun emek istiyor.

Bitiş de ayrıca kaydedildi: sömürge düzeni sömürgede değil merkezde
alınan bir kararla sona erdi, ama karar sömürgedeki direnişin ana
ülkeye yüklediği maliyetten doğdu.

Künye: Wikipedia Portuguese Empire (giriş kapısı), Tordesillas
Wikisource tam metni (birincil belge), TDV PORTEKİZ ve TDV MELAKA —
ikincisi ele geçirilen düğüm noktasını karşı taraftan kaydeden madde.

Açık borç: Portekizce birincil kayıttan doğrulanabilir metin
künyelenemedi; dosyada beyan edildi.

## 2026-08-26 — Kavram katmanında iki yapısal eksik

Kavram listesi tarandı. Atlas her olayı tarihliyor ve her hanedan
dosyasında yetki devrinden söz ediyordu, ama ikisinin de kuralını
tanımlayan dosya yoktu.

- `kavram-takvim` — atlas her olayı tek ölçekle tarihliyor; bu tarafsız
  bir işlem değil. Ana kural: bir kaynaktaki tarih o kaynağın takvimine
  aittir, çevrilmiş bir tarih özgününden daha kesin değildir. Somut üç
  atlas kuralı yazıldı: çeviri olduğu belirtilir, kaynağın kesinliği
  aşılmaz, geçiş dönemlerinde iki tarih birlikte verilir. Ayrıca:
  iki kaynağın aynı tarihi vermesi doğrulama değildir, ikisi de aynı
  çeviriyi kullanmış olabilir.
- `kavram-veraset` — ölüm anında yetkinin nasıl devredildiği. Ana
  ölçüm: bir ölümün geçiş mi kriz mi olacağını belirleyen şey kuralın
  adaleti değil, tarafların kurala uymaktan kârlı çıkıp çıkmadığıdır.
  Dört biçim (birinci doğan / yatay / seçim / açık yarış) ve aralarındaki
  değiş tokuş: açık kural savaşı azaltır ama yetersiz kişiyi başa
  getirebilir; açık yarış yetkin olanı seçer ama her geçişte iç savaş
  maliyeti doğurur.

İkisi de atlasın tekrar eden "seçenek sayısı" ölçütüne bağlandı: aday
sayısı, hem özerkliğin hem veraset istikrarının ortak değişkeni.

Kayıt dengesizliği veraset dosyasında da çıktı: çekişmeli geçişler çok
belge üretir, sorunsuz geçişler az iz bırakır. Kaynakların çekişmeli
geçişlerle dolu olması, geçişlerin çoğunun çekişmeli olduğunu
göstermez.

Künye: her iki dosya da TDV maddelerine (SALTANAT, MİRAS, TAKVİM,
HİCRÎ TAKVİM) dayanıyor, dosya başına tek Wikipedia kuralına uygun.

Kavram katmanında görülen diğer eksikler (sonraki turlar için):
toplumsal cinsiyet düzeni, okuryazarlık, akrabalık.

## 2026-08-26 — Kavram katmanı: kayıt üreten üç yapı

Geçen turda not edilen üç eksik kapatıldı. Üçü de aynı soruya bağlandı:
bir dönemden hangi kayıtların kaldığını ne belirliyor.

- `kavram-okuryazarlik` — ölçüm: bir dönemin kaynak havuzu, o dönemin
  okuryazar nüfusunun bileşimini yansıtır, nüfusun bileşimini değil.
  Yazıcılık katmanı ayrıca kaydedildi: yazıcı aracılığıyla üretilmiş
  bir belge, başvuranın kendi ifadesi sayılamaz; kalıp metinler
  belgeleri birbirine benzetir ve benzerlik olayların değil kalemin
  aynılığından gelebilir.
- `kavram-toplumsal-cinsiyet-duzeni` — kimlik konusu olarak değil kayıt
  konusu olarak ele alındı. Üç sınanabilir ölçüt: kim mülk edinebilir,
  kim tanıklık edebilir, kim kendi adına belge imzalayabilir. Ölçüm:
  bir düzende kimin belge imzalayabildiği, o düzenden kimin sesinin
  kalacağını belirler. Hane içi emeğin kayda girmemesi yönlü bir hata
  olarak işaretlendi — rastgele hata ortalamada kaybolur, yönlü hata
  kaybolmaz.
- `kavram-akrabalik` — ölçüm: akrabalığın hangi yoldan sayıldığı,
  toprağın kaç kuşakta parçalanacağını belirler. Soy listelerinin
  işlevi ayrıca kaydedildi: bir soy ağacı çoğu zaman geçmişi
  kaydetmez, bugünkü bir hak iddiasını gerekçelendirir.

KAPI 9 bir kez daha işe yaradı: cinsiyet dosyasını önce
`guven_geneli: tartismali` yazmıştım ama ne tartışma haritası ne bağlı
tartışma dosyası vardı. Doğru düzeltme `yaygin`di — dosyanın üç ölçütü
tartışmalı değil; tartışmalı olan, kayda girmeyen emeğin geriye dönük
tahmini. O nokta ayrı bir ::tartismali direktifiyle sayılar
tartışmasına bağlandı.

Künye: üç dosya da tek Wikipedia kuralına uygun; TDV KADIN, MEHİR,
AİLE, NİKÂH, MEDRESE maddeleri ve OWID okuryazarlık serisi kullanıldı.

## 2026-08-26 — Kongo Serbest Devleti

Afrika taraması: `olay-berlin-konferansi` ve `aktor-kongo-kralligi`
vardı ama ikisinin arasındaki dönem yoktu.

Ana ölçüm: bir düzene verilen ad, hukuki konumunu değil, o konumun
hangi itirazları karşılamak üzere seçildiğini gösterir. Adında hem
"serbest" hem "devlet" geçen bir düzen, bir kralın kişisel mülküydü;
ad, rakip devletlerin itirazını baştan karşılıyordu.

İkinci ölçüm — denetimin yan etkisi: mermi tüketimi denetlenip her
mermi için ispat istendiğinde, kural amaçladığından başka bir davranışı
ödüllendirdi. Bir denetim kuralının yarattığı teşvik, kuralın amacından
bağımsız işler.

Üçüncü ölçüm: yatırım gerektirmeyen bir çıkarma düzeninde (ormandan
toplama, ekim değil) üretimi artırmanın tek yolu emeği artırmaktır ve
bu doğrudan zorlamaya çevrilir. Bu, plantasyon düzeninden ayrı bir
mekanizma.

Kaynak türü olarak yeni bir ayrım kaydedildi: bir devletin başka bir
devletin yönetimini soruşturması (Casement raporu, 1904), kendi
kendini soruşturmasından (Bengal komisyonu, 1945) farklı bir kanıt
üretir. İkisinin zayıflıkları da farklı: birincisinin kendi çıkarı
olabilir, ikincisi kendi kararlarını sorgulamakta isteksizdir.
Raporu hazırlayan devletin kendi sömürgelerinde benzer uygulamalar
yürüttüğü ayrıca kaydedildi — Las Casas dosyasındaki ölçümün tekrarı.

Yeni birincil belge: Roger Casement'ın 1904 tarihli konsolosluk raporu
(Gutenberg üzerinden archive.org).

Açık borç — Afrika'da hâlâ eksik: apartheid düzeni, Cezayir savaşı,
Herero-Nama, Oyo ve Dahomey. Apartheid için Güney Afrika anayasası
(Wikisource) doğrulandı, sonraki turda yazılacak.

## 2026-08-26 — Apartheid ve vatandaşlık

Apartheid dosyası yazılırken `kavram-vatandaslik` bağı kırık çıktı;
kavram katmanında büyük bir eksik daha ortaya çıktı ve aynı turda
kapatıldı. İkisi birbirini tamamlıyor.

- `kavram-apartheid` — ana ölçüm: bir sınıflandırmanın ölçütünün
  belirsiz olması uygulanmasını engellemez, kararı verenin yetkisini
  artırır. Görünüş, soy ve çevrenin kabulü gibi birbirinden bağımsız
  ölçütler bir arada kullanıldı; sonuç, kişide hiçbir değişiklik
  olmadan sınıfın değiştirilebilmesiydi. İkinci ölçüm: bir kişiyi
  yerinden etmeden yabancı hâline getirmek, yalnızca sınırı yeniden
  çizmekle mümkündür. Geçiş belgesi düzeni ayrıca zorunlu emek
  dosyasına bağlandı — reddin mümkün olmadığı bir emek tahsisi.
- `kavram-vatandaslik` — ölçüm: bir kişinin hangi hukukun koruması
  altında olduğu, kim olduğundan değil hangi düzenin onu üyesi
  saydığından gelir. Haklar evrensel ilan edilebilir; uygulanmaları
  için bir düzenin o kişiyi kendi işi sayması gerekir.

İki dosya, Yeni Hebridler dosyasındaki ölçümü de geriye dönük olarak
sağlamlaştırdı: adalıların iki devletten hiçbirinin vatandaşı
sayılmaması, artık genel bir kavramın sınav durumu olarak
okunabiliyor.

Kast dosyasıyla karşılaştırma ayrıca yazıldı ve iki dosya aynı kefeye
konmadı: ortak bir mekanizma paylaşmak (resmî sayımın akışkan bir
yapıyı sabitlemesi) aynı olmak anlamına gelmiyor.

Afrika'da kalan eksikler: Cezayir savaşı, Herero-Nama, Oyo, Dahomey.
Cezayir için TDV CEZAYİR ve marxists.org Fanon arşivi doğrulandı.

## 2026-08-26 — Cezayir Savaşı (500. makale)

Ana ölçüm: bir çatışmaya verilen ad, karşı tarafa hangi hukuki konumun
tanındığını belirler; savaş demek karşı tarafı taraf saymaktır.
Yöneten devlet otuz yedi yıl boyunca "savaş" demedi, ve bunun somut
sonucu vardı — savaş hukukunun (esir statüsü, tarafsız gözlem, savaş
suçu çerçevesi) uygulanmaması.

Bu, atlasta adlandırma ölçümünün üçüncü örneği: Kongo Serbest Devleti
("serbest" ve "devlet"), zorunlu emek biçimleri (köleliğe
çevrilmemesi) ve burada. Üçünde de ad, karşılanması gereken itirazı
belirliyor. Dosyada bu üçlü açıkça birbirine bağlandı: bir düzenin adı,
hangi hukuka tabi olmak istemediğini gösterir.

İkinci ölçüm — vatandaşlık dosyasının doğrudan uygulaması: bir toprağı
içeri almak ile orada yaşayanları içeri almak ayrı iki karardır ve biri
diğerini gerektirmez. Cezayir hukuken il olarak yönetiliyordu ama
nüfusun büyük bölümü tam vatandaş sayılmıyordu. Oy hakkının kimlere
tanınacağının ilkeden değil aritmetikten belirlendiği ayrıca yazıldı.

Üçüncü: Gandhi dosyasındaki koşulun doğrulaması — sorgu yöntemlerinin
yöneten devletin kendi kamuoyunda tartışılması savaşın seyrini
etkiledi. Yöntem, karşı tarafın kendi kamuoyuna hesap vermek zorunda
olduğu yerde işliyor.

Ayrıca kaydedildi: bir olayın kaydına erişim tarihi, o olay hakkındaki
bilginin tarihidir; arşivlerin kademeli açılması önceki tanıklıkların
bir bölümünü doğruladı bir bölümünü değiştirdi.

Afrika'da kalan: Herero-Nama, Oyo, Dahomey.

## 2026-08-26 — Batı Afrika: Oyo ve Dahomey

İki komşu düzen, iki zıt yönetim biçimi olarak birlikte yazıldı.

- `aktor-oyo-imparatorlugu` — hükümdarı görevden alabilen bir meclisin
  bulunduğu düzen. Ölçüm: yetkinin en tepede sınırlandırılması,
  sınırı uygulayacak bir kurulun ve uygulamanın tanınmış bir biçiminin
  bulunmasına bağlıdır. İki koşul ayrıca yazıldı: kurulun gücü
  hükümdardan bağımsız olmalı, ve işlem isyan değil usul sayılmalı.
  Kurumun kendi krizi de kaydedildi — bir denetim aracı sık
  kullanıldığında denetlediği makamı işlevsiz bırakabilir.
- `aktor-dahomey-kralligi` — tersi: yetki tek merkezde, görevler
  soydan geçmiyor. Ölçüm: geliri tek bir dış talebe bağlı bir düzen,
  o talep kesildiğinde yalnızca yoksullaşmaz, iç düzenini de yeniden
  kurmak zorunda kalır. Palmiye yağına geçiş merkezî otoriteyi
  zayıflattı çünkü yeni gelir merkezde değil yaygın olarak
  toplanıyordu.

Yeni birincil kaynak, atlasın kaynak ilkesi açısından önemli: Samuel
Johnson'ın 1921 tarihli Yoruba tarihi — bölgenin kendi içinden, sözlü
aktarıcılardan derlenerek yazılmış bir tarih. Dosyada hem kullanıldı
hem çerçevesi kaydedildi: yazarın kenti ve mesleği anlatının merkezini
belirliyor. Burton'ın 1864 tarihli elçilik raporu da (Cornell taraması)
aynı biçimde kullanıldı — bir elçilik raporu, gözlenen düzen kadar
gönderen devletin beklentisini de kaydeder.

Dahomey dosyasında kipu ölçümünün başka kıtadaki karşılığı kaydedildi:
düzen yazılı kayıt tutmuyordu ama sayaçlarla sayım tutuyordu. Kayıt
yazıya bağlı değil, aktarılabilirliğe bağlı. Bu kayıtlar günümüze
ulaşmadı — kayıt tutmuş olmak ile kaydın korunmuş olması ayrı iki
durum.

Afrika'da kalan: Herero-Nama. Blue Book 1918 (Wellcome taraması)
doğrulandı.

## 2026-08-26 — Herero ve Nama (1904–1908)

Afrika listesindeki son eksik kapatıldı.

Üç ölçüm:

1. Bir kararın yazılı olması, uygulamayı değil kanıt durumunu
   değiştirir. Bu olayda yazılı bir emir var; benzer olayların
   çoğunda böyle bir metin bulunmuyor. Ayrıca üç ayrı tarih ayrı ayrı
   kaydedildi: emrin verilmesi, geri alınması, uygulamanın fiilen
   durması.
2. Bir raporun varlığı, onu üretenin çıkarının sürmesine bağlıdır.
   1918'de hazırlanan resmî rapor, on yıl sonra iki devlet arasındaki
   ilişkiler düzelince dolaşımdan çekildi ve nüshaları toplatıldı.
   Kongo dosyasıyla birlikte okunduğunda simetri ortaya çıkıyor: aynı
   mekanizma (soruşturan devletin kendi çıkarı) bir kaydı üretebiliyor
   da ortadan kaldırabiliyor da.
3. Bir haksızlığın tanınması iki devlet arasında görüşülüyorsa,
   tanınan taraf o görüşmede yine muhatap sayılmamıştır. Etkilenen
   toplulukların temsilcileri 21. yüzyıldaki tanıma görüşmelerinde
   taraf değildi.

Üçüncüsü atlasta tekrar eden bir ölçümün yeni bir örneği: bölgede
yaşamayanlarca çizilen sınırlar, orada bulunmayanlarca alınan
kararlar, ve şimdi etkilenenler olmadan yapılan tanıma görüşmeleri.
Dosyada bu üçlü açıkça birbirine bağlandı ve tekrarın kendisinin ayrı
bir bulgu olduğu yazıldı.

Terim tartışması dosyada karara bağlanmadı; `tartisma-soykirim-kavrami`
dosyasına bağlandı.

Yeni birincil belge: 1918 tarihli HMSO raporu (Wellcome Library
taraması) — geri çekilme işleminden kurtulan nüshalardan biri.

Afrika listesi tamamlandı. Sonraki turlarda başka bölgelere geçilecek.

## 2026-08-26 — Doğu Asya: eşitsiz antlaşmalar ve Ryukyu

- `kavram-esitsiz-antlasmalar` — kavram katmanında büyük bir eksik.
  Dört tekrar eden madde tanımlandı: tazminat, liman/toprak, yargı
  ayrıcalığı, en çok gözetilen ulus. Ana ölçüm dördüncüsü üzerine:
  bir ayrıcalığın otomatik yayılmasını sağlayan bir madde, her yeni
  antlaşmayı bütün önceki antlaşmaların da genişlemesi hâline getirir.
  Aynı madde geri almayı da zorlaştırıyor — kolayca yayılan bir hak
  aynı kolaylıkla geri alınmıyor.
  İkinci ölçüm: yargı ayrıcalığının kalkması için karşı tarafın
  tanıdığı bir hukuk düzeninin benimsenmesi isteniyordu; yani
  egemenliği geri almanın bedeli, o egemenliğin biçimini karşı tarafın
  belirlemesiydi.
  İki metin sorunu burada üçüncü kez kaydedildi (Waitangi, Adva ve
  şimdi bu düzen).
- `aktor-ryukyu-kralligi` — üç yüz yıl boyunca aynı anda iki merkeze
  bağlılık bildiren krallık. Ana ölçüm: bir küçük düzenin varlığını
  sürdürmesi, kendi gücünden değil, onu ortadan kaldıracak tarafın o
  düzene ihtiyacı olmasından gelebilir. İkinci bağlılık gizli tutuldu
  ve gizleme kurumsaldı — elçilik kıyafeti, dili ve protokolü buna
  göre düzenlenmişti.
  Kaydın iki yüzü ayrıca kaydedildi: batıdaki kayıtlarda bağımsız
  haraçgüzar, kuzeydeki kayıtlarda bağlı bölge. İki kaynağın
  çeliştiği yerde biri yanlış olmak zorunda değil; ikisi de kendi
  çerçevesinde doğru olabilir.
  Dışarıdan gelen gözlemciler ikinci bağlılığı fark etmedi — bir
  tanıklığın ayrıntılı olması kapsamlı olduğunu göstermez.

Kalibrasyon notu: kavram dosyasını 16 bölümle yazdığımda ilk taslak
hedefte çıktı (779/600-1000). Aktör dosyaları için ~30 bölüm gerekiyor;
bu turda da iki ek geçiş gerekti.

## 2026-08-26 — Dönem katmanı: en büyük eksik bulundu

Veri ve dönem katmanı tarandı. Atlasın en zayıf yeri ortaya çıktı:
**16 dönem dosyasının hepsi hedefin çok altında** (433–1142 kelime,
hedef 2500–4000). Bunlar atlasın omurgası — her makale bir dönem
dosyasına bağlanıyor — ve hepsi %20 civarında.

Bu turda en kötüsü onarıldı: `donem-15` (1991–2008), 433 → 2506
kelime.

Eklenen bölümler yalnızca uzunluk değil, atlasın kendi ölçütlerini
döneme uyguluyor:
- Dönem sınırının gerekçesi ve o sınıra yapılan itiraz ayrı ayrı
  yazıldı (ticaret payı 19. yüzyıl sonunda da yüksekti; fark hacimde
  değil iletişim maliyetinde).
- Serbestleşmenin asimetrisi: mal, sermaye ve bilgi için engeller
  düştü, emek için düşmedi. Bir serbestleşme düzeninin kimin lehine
  işlediği, hangi faktörün serbest bırakıldığına bakılarak okunur.
- Eşitsizliğin iki ölçüsü: ülkeler arası fark daraldı, ülke içi fark
  açıldı. Aynı döneme dair "eşitsizlik arttı" ve "azaldı" ifadeleri
  farklı ölçülerle ikisi de doğru olabilir.
- Ölçme kapasitesi tuzağı: daha iyi ölçülen bir olgu artmış gibi
  görünür. Bir serideki artışın ne kadarının olguya ne kadarının
  ölçmeye ait olduğu ayrıca sorulmalı.
- Dönemin kendi anlatısı bir veri olarak kaydedildi: kaçınılmazlık
  iddiası, alınan kararları tercih olmaktan çıkarır ve yürütenlerin
  sorumluluğunu görünmez kılar.

İki yeni veri kaynağı künyelendi (ticaret payı ve internet kullanımı
serileri). KAPI 10 iki kez doğrulama dizesini reddetti — CSV sütun
adları `ne_trd_gnfs_zs` ve `it_net_user_zs`; atlasın veri
dosyalarındaki dizeler alınarak düzeltildi.

Plan: her turda bir dönem dosyası. 15 dosya kaldı.

## 2026-08-26 — donem-14 onarıldı (452 → 2500+)

İkinci dönem dosyası. Aynı yöntem: uzunluk değil, atlasın kendi
ölçütlerinin döneme uygulanması.

Öne çıkan kayıtlar:
- İki büyük eğilim (iki kutuplu rekabet ve sömürgesizleşme) aynı
  yıllara sığıyor ve bağımsız değil: bağımsızlaşan her yeni devlet iki
  tarafın da kazanmak istediği bir taraf hâline geldi. Aynı olay bir
  tarafta kurtuluş, diğerinde nüfuz alanı genişlemesi olarak kayıtlı.
- Vekâlet savaşlarının maliyet dağılımı ölçüm olarak yazıldı: bir
  rekabetin maliyetinin nerede biriktiği, kimin adına yürütüldüğünden
  ayrı bir veri.
- Sınırların devralınması, atlasın "dışarıda alınan karar" ölçümüne
  bağlandı: karar bir kez dışarıda alındığında etkisi kendi
  kaldırılmasından sonra da sürer.
- Kalkınma yarışının sayıları: iki taraf da kendi istatistik düzeniyle
  ölçüyordu. İki tarafın kendi ölçtüğü sayılarla yürüttüğü bir yarışta
  sayılar da yarışın parçasıdır.
- Üçüncü yol ayrıca kaydedildi — bir dönemi iki seçenekle anlatmak,
  denenen üçüncü yolları görünmez kılar.
- Blok içi çatışmalar da kaydedildi: iki kutuplu anlatı bunları
  görünmez kılıp dönemi olduğundan basit gösteriyor.
- Nüfus artışının nedeni doğum değil ölüm oranındaki düşüş olarak
  ayrıştırıldı.

İki yeni veri kaynağı künyelendi (kişi başına gelir ve kentleşme
serileri). Bu kez doğrulama dizeleri baştan atlasın veri
dosyalarından alındı; KAPI 10 ilk seferde geçti.

Kalan dönem dosyaları: 01–13 ve 16.

## 2026-08-26 — donem-10 onarıldı (481 → 2500+)

Üçüncü dönem dosyası. 1650–1789.

Dosyanın ekseni iki eğilimin aynı yıllara sığması: meşruiyetin
kaynağını yeniden tanımlayan düşünce hareketi ile ticaretin ve savaşın
kıtalar arası ölçeğe çıkması. İkisi bağımsız değil — ticari genişleme
düşünce hareketinin maddi tabanını ve yayılma kanallarını sağladı.

Öne çıkan kayıtlar:
- Aynı dönemde Atlantik köle ticareti en yüksek hacmine ulaştı.
  Eşitlik ve doğal hak üzerine yazılan metinlerle taşınan insan sayısı
  aynı yıllarda arttı. Bu çelişki gizlenmedi: bir dönemin ürettiği
  ilkelerle yürüttüğü uygulamalar arasındaki fark, dönemin kendi
  kaydıdır.
- İlkenin kapsamı ayrıca ele alındı: dönemin metinlerinde kimin
  "insan" sayıldığı varsayılmış, tartışılmamış. Kapsam tartışması
  sonraki dönemin konusu ve o tartışma bu dönemin metinlerini kendi
  silahı olarak kullandı — bir ilkenin dar kapsamla formüle edilmesi,
  genişletilmesine karşı engel değil dayanak olabilir.
- Ansiklopedi girişimi üzerinden atlas kendi bölümlemesini sorguladı:
  bir derlemenin sınıflandırma düzeni, derleyenin bilgi anlayışının
  doğrudan kaydıdır. Atlas kendi bölümlemesini bu yüzden açıkça
  bildiriyor.
- Ayrıcalıklı şirketlerin zor kullanma yetkisi Kongo dosyasındaki
  ölçüme bağlandı: yetki bir ticari kuruluşa devredildiğinde
  sorumluluğun kime ait olduğu belirsizleşir.
- Vergi-temsil formülü vatandaşlık dosyasına bağlandı: yönetilen ile
  üye sayılan aynı kişi değil.
- Salon düzenleyicilerinin konumu, toplumsal cinsiyet dosyasındaki
  "resmî listede görünmeyen ama akışı denetleyen görev" ölçütünün bir
  örneği olarak kaydedildi.
- Kaydın bolluğu ile kapsamı ayrıldı: bu dönem çok kaynak bıraktı ama
  kaynağın büyük bölümü kentli, okuryazar ve mülk sahibi kesimlerden
  geliyor.

Kalan dönem dosyaları: 01–09, 11, 12, 13, 16.

## 2026-08-26 — donem-09 onarıldı (506 → 2500+)

Dördüncü dönem dosyası. 1500–1650.

Bu dosyada eksen seçiminin kendisi ayrıca gerekçelendirildi: dosyanın
ekseni Avrupa'nın deniz yoluyla küresel ölçeğe çıkması, ve bu bir
tercih. Gerekçe, o çıkışın diğer bölgelerin tarihini de doğrudan
değiştirmesi. Ama tercih mutlaklaştırılmadı — aynı yıllarda başka
bölgelerde kurulan düzenlerin nüfusu ve geliri daha büyüktü, küresel
ağırlık merkezi henüz kaymamıştı.

Öne çıkan kayıtlar:
- Nüfusun yeniden dağılması: bir kıtada nüfus çökerken aynı yıllarda
  oraya zorla insan taşındı. Emek açığı, zorla taşımanın gerekçesi
  olarak sunuldu ve gerekçe açığın nasıl doğduğunu sormuyor. Bir
  düzenin çözmek için kurulduğu sorun, çoğu zaman aynı düzenin kendi
  ürettiği sorundur.
- Tordesillas çizgisi ölçülemeyen bir sınırdı — boylam güvenilir
  biçimde ölçülemiyordu. Bir sınırın hukuki kesinliği, onu ölçebilme
  kapasitesinden bağımsız değil.
- Barut imparatorluklarının ortak yanı teknoloji değil örgütlenme:
  aynı teknolojiyi kullanan düzenlerin benzemesi, teknolojinin değil
  onun gerektirdiği örgütlenmenin sonucu.
- Vestfalya anlatısının sınırı yazıldı: metin modern devlet düzeninin
  başlangıcı olduğunu iddia etmiyor, anlatı sonradan kuruldu.
  Egemenlik ilkesinin erken biçimi birey haklarını değil hükümdarlar
  arası müdahaleyi düzenliyordu.
- Misyon kayıtları ikili nitelikleriyle kaydedildi: bir topluluğu
  değiştirmek için üretilmiş bir kayıt, o topluluğa dair en ayrıntılı
  kayıt olabilir. Dillerin başka bir alfabeyle yazılması, o dilin bazı
  ayrımlarını kayıt dışı bıraktı.
- Plantasyonun önce Atlantik adalarında denenip sonra kıtaya taşınması:
  bir düzenin nerede denendiği, nerede yaygınlaştığından ayrı bir veri
  ve ilki genellikle daha az kaydediliyor.

İki yeni kaynak künyelendi: Tordesillas metni (birincil belge) ve
kişi başına gelir serisi.

Kalan dönem dosyaları: 01–08, 11, 12, 13, 16.

## 2026-08-26 — donem-16 onarıldı (530 → 2400+)

Beşinci dönem dosyası. 2008–bugün; açık uçlu.

Açık uçlu dosyanın özel sorunu baştan yazıldı: bir dönemin eksenini
belirlemek, o dönem bitmeden yapılan bir tahmindir. Bu dosyanın eksen
cümlesi, atlasta değiştirilmesi en olası cümledir. Ayrıca: yakın
dönemde sorun kaynak azlığı değil kaynak bolluğu; hangi olayın önemli
olduğu ancak sonuçları görüldükten sonra belirlenebiliyor.

Öne çıkan kayıtlar:
- Demografik dönüm: düşüş yeni değil, onlarca yıldır sürüyor. Dönemi
  tanımlayan şey yön değil belirli bir çizginin (yenilenme düzeyi)
  geçilmesi.
- Karşılıklı bağımlılığın silaha dönüşmesi: yaptırım ve ödeme
  sisteminden çıkarma, bağımlılık ne kadar yüksekse o kadar etkili.
  Bağımlılığın barışı sağladığı varsayımı bunu hesaba katmıyor.
- Verimlilik–dayanıklılık değiş tokuşu: en verimli tedarik zinciri en
  kırılgan olanıdır; stok tutmamak bir tasarruf olduğu kadar bir
  sigortadan vazgeçmedir.
- Emisyon sorumluluğu dört ayrı ölçütle verilebiliyor (yıllık, kişi
  başına, birikimli, üretim/tüketim) ve dördü dört farklı tarafı
  sorumlu gösteriyor. Üretim/tüketim ayrımının önceki dönemin üretim
  kaymasının doğrudan sonucu olduğu ayrıca kaydedildi.
- Kaydın yeni kırılganlığı: basılı bir belge yüzyıllarca kalabiliyor,
  çevrimiçi bir kayıt sunucu kapandığında yok oluyor. Erişilebilir
  olmak ile kalıcı olmak ayrı iki özellik ve ikincisi azalıyor.
- Veri sahipliği: dönemin en kapsamlı kaydı kamu kurumlarında değil
  özel şirketlerde birikiyor ve erişim şirketin kararına bağlı.
- Dosyanın kendi kısıtı beyan edildi: aynı biçimde yazılmış iki dosya
  aynı güçte olmayabilir; önceki dönemler birincil belgeye, bu dönem
  sayısal seriye dayanıyor.

Kalan dönem dosyaları: 01–08, 11, 12, 13.

## 2026-08-26 — donem-08 onarıldı (519 → 2500+)

Altıncı dönem dosyası. 1350–1500.

Dosyanın ekseni: aynı ağ hem malı hem hastalığı taşıdı, ikisi ayrı
sistem değil. Bağlantının artması, taşınan her şeyin hızını artırır ve
seçim yapmaz.

En önemli bulgu, dönemin kendi içindeki ayrışma: aynı demografik şok
farklı bölgelerde karşıt kurumsal sonuçlar verdi. Bir yerde kişisel
bağlılığa dayanan yükümlülükler gevşedi, başka yerde tersine
sıkılaştırıldı. Belirleyici olan toprak sahiplerinin örgütlü olup
olmaması. Ölçüm: bir şokun sonucu, şokun büyüklüğünden çok üzerine
düştüğü kurumsal yapıdan belirlenir.

Diğer kayıtlar:
- Ücret tavanı yasaları: bir yasanın çıkarılması, engellemeye
  çalıştığı eğilimin gücünün doğrudan kaydıdır.
- Kişi başına gelirdeki yükselme, üretim artışından değil paydanın
  küçülmesinden geliyor. Aynı gösterge iki bambaşka durumda
  yükselebilir ve bu bir iyileşme değil.
- Karantina: doğru bir tedbir yanlış bir kuramla birlikte var olabilir;
  ikisi ayrı ayrı değerlendirilmeli.
- Ming seferlerinin durdurulması: bir kapasitenin kullanılmaması,
  kapasitenin bulunmadığı anlamına gelmez. Atlas iki açıklama arasında
  taraf tutmuyor.
- Rönesans anlatısındaki boşluk: metinlerin bir bölümü doğudan çeviri
  ve şerh geleneğiyle geldi, ama hareketin kendi anlatısı aktarım
  zincirini kısaltıyor.
- Çift girişli defter tutma atlasın kendi yöntemine bağlandı: iyi bir
  kayıt düzeni yalnızca bilgi saklamaz, kendi hatasını da gösterir.
- Kadınların ücretli işe katılımı kıtlık döneminde arttı, nüfus
  toparlanınca kısıtlar yeniden sıkılaştırıldı. Gevşeyen bir kısıtın
  geri getirilmesi ayrı bir karardır.

Kalan dönem dosyaları: 01–07, 11, 12, 13.

## 2026-08-26 — donem-12 onarıldı (536 → 2500+)

Yedinci dönem dosyası. 1848–1914.

Dosyanın ekseni: sanayi kapasitesinin siyasi hâkimiyete çevrilmesi ve
bu çevirmenin kendiliğinden olmadığı. Üç aracı gerekti — buharlı gemi,
telgraf, seri üretilen ateşli silah — ve dördüncü olarak sıtma ilacı
ayrıca kaydedildi: bir genişlemenin sınırı çoğu zaman askerî değil
biyolojiktir.

Dosyanın en önemli kaydı eş zamanlılık: aynı devletler kendi içinde
temsili genişletirken dışarıda temsilsiz yönetim kurdu. İki uygulama
çelişki olarak görülmedi çünkü kapsam sorusu — bir önceki dönemde
olduğu gibi — varsayımla çözüldü. Ölçüm: bir ilkenin kimlere
uygulanacağı belirtilmediğinde, kapsamı fiilen uygulayanın tercihine
kalır.

Diğer kayıtlar:
- Berlin Konferansı paylaşımı yapmadı, kuralını koydu — ve fiilî
  işgali tanınmanın koşulu sayan kural yarışı hızlandırdı. Bir yarışı
  düzenlemek üzere konan kural, yarışın hızını artırabilir.
- Borç yoluyla denetim: bir egemenliğin sınırlanması için toprak kaybı
  gerekmez, gelirin denetimi yeterlidir. Osmanlı örneğinde egemenliği
  sınırlayan kurumun aynı zamanda dönemin en düzenli kaydını üretmiş
  olması ayrıca kaydedildi.
- Sömürge savaşlarının savaş hukuku dışında kalması, Cezayir
  dosyasındaki adlandırma ölçümünün erken biçimi olarak bağlandı.
- Hawaii 1887 anayasası: bir düzenin denetimi kurumları kaldırmadan da
  ele geçirilebilir — oy hakkının koşulunu değiştirmek yeterli.
- Fotoğrafın kayda girmesi: görüntü kaydı doğrudan göründüğü için
  tarafsız sanılır, oysa her fotoğraf bir seçim sonucudur.
- Dönemin kıtlıkları Bengal dosyasındaki mekanizmaya bağlandı ve
  mekanizmanın farklı kıtalarda tekrarlanmasının onu yapısal kıldığı
  yazıldı.

Kalan dönem dosyaları: 01–07, 11, 13.

## 2026-08-26 — donem-11 onarıldı (567 → 2500+)

Sekizinci dönem dosyası. 1789–1848.

Dosyanın ekseni üç dönüşümün altmış yıla sığması: meşruiyetin halka,
üretimin makineye, kimliğin ulusa bağlanması. Üçü bağımsız değil —
makineye dayalı üretim yeni bir kentli nüfus üretti, o nüfus siyasi
katılım talebinin tabanı oldu.

Dönemin iç gerilimi ayrıca yazıldı: aynı yıllarda hakların evrensel
olduğu yazılırken sınırlar hanedan hakkına göre çiziliyordu. Ölçüm:
bir düzenlemenin görmezden geldiği ilke, birkaç kuşak sonra o
düzenlemenin kendisini hedef alır (1815 düzeni → 1848 dalgası).

Öne çıkan kayıtlar:
- Haiti: bağımsızlığın tanınma koşulu, eski sahiplerine tazminat
  ödenmesiydi. Bir bağımsızlığın tanınması için tazminat istenmesi,
  hangi tarafın hak sahibi sayıldığını gösterir.
- Köleliğin kaldırılmasında tazminat köleleştirilenlere değil köle
  sahiplerine ödendi; gerekçe mülkiyet hakkıydı. Bir haksızlığın
  kaldırılmasında kime tazminat ödendiği, o düzende kimin hak sahibi
  sayıldığını gösterir.
- Ticaretin yasaklanması ile köleliğin kaldırılması ayrı iki adım ve
  aralarında onlarca yıl var: bir uygulamanın beslenme kanalının
  kesilmesi, uygulamanın sona ermesi değil.
- Fabrika düzeninin saate göre kurulması, önceki dönem dosyasında
  kaydedilen zaman ölçümü yaygınlaşmasına bağlandı: bir örgütlenme
  biçimi, kendinden önce kurulmuş bir ölçüm altyapısını gerektirebilir.
- Makine kırıcılığı: hedef makinenin kendisi değil, onunla kurulan
  çalışma düzeniydi.
- Bir bölgede sanayi kurulurken başka bölgede el dokumacılığının
  çözülmesi, aynı sürecin iki ucu olarak birlikte kaydedildi.
- Ulus anlatılarının derlenmesi: bir ulusun geçmişi keşfedilmez,
  mevcut malzemeden seçilerek kurulur.
- Düzenli nüfus sayımının bu dönemde kurulması, atlasın veri
  katmanındaki birçok serinin neden burada başladığını açıklıyor.

Kalan dönem dosyaları: 01–07, 13.

## 2026-08-26 — donem-13 onarıldı (1142 → 2500+)

Dokuzuncu dönem dosyası. 1914–1945.

Dosyanın adlandırma tercihi ayrıca gerekçelendirildi: iki savaş tek bir
uzun krizin parçası sayılıyor, çünkü ikinci savaşın koşullarının önemli
bölümü birincinin ardından kurulan düzenlemelerde kayıtlı. Ama tercih
mutlaklaştırılmadı — aradaki yılları bağımsız dönem sayan okuma da aynı
kayıtlarla uyumlu.

Öne çıkan kayıtlar:
- Ulus ölçütüne dayanan sınır çizimi, karışık yerleşim düzeninde
  kaçınılmaz olarak azınlık üretir. Nüfus mübadelesi bu sorunun
  çözümü olarak denendi ve tercih ayrıca kaydedildi: sınırı nüfusa
  uydurmak yerine nüfusu sınıra uydurmak seçildi; hangi tarafın
  taşınabilir sayıldığını gösteriyor.
- Korumacılığa dönüş: her ülke için tek tek makul olan tedbir toplamda
  zarar verdi. Tek tek akılcı kararların toplamı, hiçbir tarafın
  istemediği bir sonuç üretebilir.
- Sömürge askerleri iki savaşta da toplandı, savaş sonrası hakları
  genişletilmedi. Bir yükümlülüğün paylaşılması, karşılığında hak
  talebini meşrulaştırır — aynı ölçüm oy hakkının genişlemesinde de
  işledi.
- Altın standardını erken bırakanların daha hızlı toparlanması, dönemin
  en net sayısal bulgusu olarak kaydedildi: aynı krize farklı
  zamanlarda verilen aynı cevap, karşılaştırılabilir bir doğal deney
  sunuyor.
- Kamu harcaması payı her savaştan sonra savaş öncesine dönmedi:
  olağanüstü koşullarda genişleyen kapasite, koşullar geçtikten sonra
  tümüyle geri çekilmiyor.
- 1918 salgını savaşın bilançosuyla birlikte kaydedildi — bir savaşın
  bilançosu, kolaylaştırdığı salgını dışarıda bırakarak çıkarılamaz.
- Kadınların savaş yıllarındaki istihdamının savaş sonrası geri
  alınması, donem-08'deki aynı örüntünün tekrarı olarak bağlandı.

Kalan dönem dosyaları: 01–07.

## 2026-08-26 — donem-07 onarıldı (595 → 2400+)

Onuncu dönem dosyası. 1000–1350.

Dosyanın ekseni: bozkır siyasi biçiminin Avrasya ölçeğine çıkması ve
kurduğu ağın hem malı hem hastalığı taşıması. Bu ölçüm, donem-08
dosyasıyla doğrudan bağlandı — bir dönemin en yıkıcı sonucu,
kendinden önceki dönemde kurulan bir altyapının ürünü olabilir.

Öne çıkan kayıtlar:
- Yıkım ile bağlantı birlikte kaydedildi: bir düzenin bilançosu,
  yalnızca kazandırdıklarıyla da yalnızca yıktıklarıyla da
  çıkarılamaz.
- Din siyaseti bir maliyet hesabı olarak okundu: geniş ve çok inançlı
  bir alanı yönetmek, tek bir inancı dayatmakla uyuşmuyordu.
- Vakıf düzeni: bir kurumun sürekliliği, gelirinin siyasi karardan
  bağımsız hâle getirilmesine bağlı.
- Kâğıdın yayılması kaydın miktarına bağlandı: bir dönemin bıraktığı
  kayıt miktarı, o dönemin yazı malzemesinin maliyetiyle doğrudan
  ilişkili.
- Kâğıt paranın batıda tutmaması: bir aracın taşınabilir olması, onu
  mümkün kılan kurumsal güvencenin de taşınabilir olduğunu göstermez.
- Kent büyüklüğü ile su yolu erişimi arasındaki ilişki, dönemin en
  tutarlı örüntülerinden biri olarak kaydedildi.
- Haber menzili bir ölçüt olarak önerildi: bir imparatorluğun fiilî
  büyüklüğü, sınırlarından çok merkezle çeper arasındaki haber
  süresiyle ölçülebilir.
- Aynı yüzyıllarda Hint Okyanusu'nda silahsız ve tekelsiz bir deniz
  düzeni işliyordu; iki deniz düzeni aynı mantığa dayanmıyor.
- Okyanusya'daki eş zamanlı yerleşim ayrıca kaydedildi: bir dönemin
  bütün bölgeleri aynı ağın parçası olmak zorunda değil.

Bir YAML hatası yakalandı ve düzeltildi: yeni künye bloğunu mevcut bir
kaynağın `not:` satırından önce eklemişim, aynı anahtar iki kez
görünmüş. KAPI 1 anında yakaladı.

Kalan dönem dosyaları: 01–06.

## 2026-08-26 — donem-07 onarıldı (595 → 2500)

Onuncu dönem dosyası. 1000–1350.

Dosyanın ekseni: bozkır siyasi biçiminin Avrasya ölçeğine çıkması ve
kurduğu ağın hem malı hem hastalığı taşıması. Bu, donem-08 dosyasına
doğrudan bağlandı — bir dönemin en yıkıcı sonucu, kendinden önceki
dönemde kurulan bir altyapının ürünü olabilir.

Öne çıkan kayıtlar:
- Yıkım ile bağlantı birlikte kaydedildi: bir düzenin bilançosu,
  yalnızca kazandırdıklarıyla da yalnızca yıktıklarıyla da
  çıkarılamaz.
- Din siyaseti bir maliyet hesabı olarak okundu: geniş ve çok inançlı
  bir alanı yönetmek, tek bir inancı dayatmakla uyuşmuyordu.
- Vakıf düzeni: bir kurumun sürekliliği, gelirinin siyasi karardan
  bağımsız hâle getirilmesine bağlı.
- Kâğıdın yayılması kaydın miktarına bağlandı: bir dönemin bıraktığı
  kayıt miktarı, yazı malzemesinin maliyetiyle doğrudan ilişkili.
- Kâğıt paranın batıda tutmaması: bir aracın taşınabilir olması, onu
  mümkün kılan kurumsal güvencenin de taşınabilir olduğunu göstermez.
- Haber menzili bir ölçüt olarak önerildi: bir imparatorluğun fiilî
  büyüklüğü, sınırlarından çok merkezle çevre arasındaki haber
  süresiyle ölçülebilir.
- Aynı yüzyıllarda Hint Okyanusu'nda silahsız ve tekelsiz bir deniz
  düzeni işliyordu; iki deniz düzeni aynı mantığa dayanmıyor.
- Fetheden düzenin bir kuşakta fethedilen bölgenin düzenini
  benimsemesi ve kaydın yerleşik gelenekte tutulması: bir düzen
  hakkındaki kaydın tabi olanlarca tutulması, o düzenin anlatısını da
  onların konumundan kurar.

İki kapı bu turda işe yaradı: KAPI 1 bir YAML hatasını (yeni künye
bloğunu mevcut bir kaynağın `not:` satırından önce eklemişim, anahtar
iki kez görünmüş) ve KAPI 4 kilitli bir terimi ("çeper" yerine
"çevre") yakaladı.

Kalan dönem dosyaları: 01–06.

## 2026-08-26 — donem-06 onarıldı (619 → 2400+)

On birinci dönem dosyası. 650–1000.

Dosyanın ekseni: üç büyük merkezin aynı yüzyıllarda, birbirinden büyük
ölçüde habersiz kurulması ve benzer sorunlarla karşılaşması. Ana ölçüm:
birbirinden habersiz düzenlerin benzer sorunlarla karşılaşması, sorunun
kaynağının aktarım değil ölçek olduğunu gösterir.

Ortak sorun mesafe olarak tanımlandı ve üç merkezin de benzer çözümler
ürettiği kaydedildi: taşraya yetkili görevli, onu denetleyen ikinci bir
kanal, gelirin bir bölümünün yerinde bırakılması. İkinci kanal Dahomey
dosyasındaki aynı düzenlemeye bağlandı.

Diğer kayıtlar:
- Mesafe büyükse, denetim maliyeti belirli bir noktadan sonra
  devredilen yetkinin getirisini aşar — üçünde de taşra fiilen
  bağımsızlaştı.
- Merkeze bağlı olduğu için seçilen bir askerî taban, zamanla merkezin
  kendisine bağlı olduğu tarafa dönüşebilir.
- Karolenj kopyalama hareketi: bir metnin bugüne ulaşması, yazıldığı
  dönemden çok kopyalandığı dönemin kurumsal kapasitesine bağlı. Elde
  bulunan klasik külliyat temsilî bir örnek değil, bir seçim sürecinin
  çıktısı.
- Sınav düzeni: biçimsel olarak açık bir seçme düzeni, hazırlık
  maliyeti yüksekse fiilen kapalıdır.
- Bir başkentin nüfusu merkezin kaynak toplama menzilinin ölçüsü — ve
  akış kesildiğinde kent savunma gerektirmeden küçülüyor.
- Sikke buluntuları siyasi denetimi değil ticari bağlantıyı kanıtlar.
- Dosya bir soruyla kapanıyor: benzerlik aktarımla mı bağımsız çözümle
  mi açıklanır. Atlas soruyu açık tutuyor — benzerlik tek başına
  aktarım kanıtı değil.

Künye onarımı: k3 ikinci bir Wikipedia'ydı (Tang dynasty), yerine TDV
BEYTÜLHİKME kondu ve TDV BAĞDAT k5 olarak eklendi. Dosya artık tek
Wikipedia kuralına uygun.

KAPI 4 yine "çeper" terimini yakaladı — aynı hatayı iki dosyada
yaptım.

Kalan dönem dosyaları: 01–05.

## 2026-08-26 — donem-05 onarıldı (652 → 2300+)

On ikinci dönem dosyası. 200–650.

Dosyanın en önemli kaydı göstergelerin çelişmesi: aynı dönem için
kentleşme ve uzun mesafeli ticaret gerilerken, yerel üretim, kırsal
yerleşim ve dinî kurum sayısı artıyor. Ölçüm: bir dönemi tek bir
göstergeyle değerlendirmek, o göstergenin seçimini gizli bir yargıya
çevirir. "Çöküş mü dönüşüm mü" tartışması bu çelişkiden doğuyor.

Diğer kayıtlar:
- Kavimler hareketi: itici ve çekici etkenler ayrı ayrı sayıldı;
  istila mı yerleşme mi sorusunda arkeolojik kanıtın iki senaryoyla da
  uyumlu olduğu kaydedildi — aynı kanıtla iki senaryo uyumluysa kanıt
  seçim yapmaya yetmiyor.
- Adlandırmanın etkisi: "barbar istilaları" bir tarafın kendi
  kaydından geliyor ve o çerçeveyi taşıyor.
- Denk güçler arasındaki uzun çatışma, sınırı değiştirmeden her iki
  tarafın kaynağını tüketebilir — dönemin sonundaki hızlı genişleme bu
  tükenmeyle birlikte okundu, ama genişleyen tarafın kendi kapasitesi
  de görmezden gelinmedi.
- Prokopios'un aynı hükümdar hakkında karşıt iki metin yazması ayrıca
  kaydedildi: ikisinin de dönemin siyasi baskısı altında yazıldığını
  gösteriyor.
- Kaydın seyrekleşmesi dönem hakkında bir bilgi: az kayıt bırakmak, az
  şey olduğunu değil kayıt kapasitesinin düştüğünü gösteriyor.
- Hukuk derlemesi: bir derleme mevcut hukuku kaydetmekle kalmıyor,
  hangisinin geçerli olduğuna da karar veriyor. Etkisi de derlendiği
  dönemde değil, yüzyıllar sonra yeniden okunduğu dönemde ölçülüyor.

Künye onarımı: k3 dönem dışı bir kaynaktı (Thukydides, MÖ 5. yy).
Yerine Prokopios'un History of the Wars'ı (1914 Dewing çevirisi,
birincil/tanık) kondu; TDV SÂSÂNÎLER ve TDV BİZANS k4 ve k5 olarak
eklendi.

KAPI 7 bir telif hatası yakaladı — aynı kaynaktan iki alıntı; ikincisi
tırnaktan çıkarıldı.

Kalan dönem dosyaları: 01–04.

## 2026-08-26 — donem-04 onarıldı (584 → 2400+)

On üçüncü dönem dosyası. MÖ 500 – MS 200.

Dosya, adını aldığı kavramı bir hipotez olarak kullanıyor ve
doğruluğunu varsaymıyor. Kavrama yönelen iki eleştiri ayrı ayrı
yazıldı; ikincisi atlas için daha önemli: seçilen bölgeler kavramı
önerenin bildiği bölgeler. Ölçüm: bir örüntünün kapsamı, örüntüyü
tanımlayanın bilgi sınırıyla çakışıyorsa, örüntü kısmen o sınırın
kendisidir.

Diğer kayıtlar:
- Eş zamanlılık açıklamaları yetersiz bulundu: aynı koşullar başka
  dönemlerde de var. Bir eş zamanlılığın açıklanması, ortak bir koşul
  göstermekle bitmez; o koşulun neden başka dönemlerde aynı sonucu
  vermediği de gösterilmeli.
- Yazı açıklaması ayrıca ele alındı: örüntünün kendisi düşüncenin
  değil kaydın örüntüsü olabilir.
- Dosyanın iki ekseni arasındaki gerilim yazıldı: düşünce hareketleri
  bölünmüş dönemde belirdi, imparatorluklar onları sonradan devraldı.
  Bir öğretinin devlet tarafından benimsenmesi yayılmasını sağlar ve
  eleştirel kenarını törpüler.
- Aşoka yazıtları bir kanıt türü olarak ele alındı: taşa yazılmış bir
  metin kopyalanma sürecinden geçmemiştir, içeriğini doğrulamaz ama
  metnin bozulmadığını güvence altına alır.
- Kanonun oluşması: bir öğretinin bugünkü içeriği, öğretinin
  kendisinden çok kanonu belirleyenlerin tercihlerini yansıtıyor.
- Sınır yapılarının işlevi: amaç çoğu zaman kapatmak değil geçişi
  kayda bağlamak.
- Köleliğin yaygınlığı, dönemin evrenselci metinleriyle aynı yıllara
  denk geldiği için ayrıca kaydedildi ve gizlenmedi.

Künye sorunu: `ctext.org` (havuzda beyaz listede) artık otomatik
isteklere CAPTCHA sayfası döndürüyor. Konfüçyüs birincil metni bu
yüzden künyeye alınamadı; yerine SEP Confucius maddesi kondu. Havuz
notu: ctext.org canlılık kapısını geçemiyor.

Kalan dönem dosyaları: 01–03.

## 2026-08-26 — ctext.org onarımı: atlasın Doğu Asya kaynak tabanı

Bir tur, dokuz dosyanın künye onarımına ayrıldı.

Sorun: `ctext.org` artık otomatik isteklere CAPTCHA döndürüyor. HTTP
200 döndüğü için canlılık kapısı geçiyor, ama sayfada künye dizesi
bulunmadığından KAPI 10 kırılıyor. Atlasın bütün Çin klasik birincil
metinleri bu alandaydı.

Yedi metin için açık erişimli tam metin bulundu ve künyeler
değiştirildi (Project Gutenberg ve archive.org). İki metin için
(Hanfeizi, Zhuzi Yulei) açık tam metin bulunamadı; yerlerine çevrilmiş
bölüm derlemeleri kondu ve künyede "tam eser değil" kaydı düşüldü.

ctext.org havuzdan çıkarıldı, gerekçesi havuz dosyasına yazıldı. Aynı
notta beyaz listede olup otomatik isteklere kapalı iki alan daha
kaydedildi: sacred-texts.com ve britannica.com (ikisi de 403).

Bu, atlasın kaynak katmanının en geniş tek seferlik onarımıdır.
Ölçüm olarak da kaydedilmelidir: bir kaynak havuzunun sağlamlığı,
alan sayısına değil o alanların tek tek erişilebilirliğine bağlıdır
ve tek bir alanın kapanması bütün bir bölgenin kaynak tabanını
düşürebilir.

## 2026-08-26 — donem-03 onarıldı (623 → 2300+)

On dördüncü dönem dosyası. MÖ 1200–500.

Dosyanın ekseni bir ölçüme bağlandı: bir hammaddenin coğrafi dağılımı,
onu işleyen düzenin merkezî mi dağınık mı olacağını belirler. Tunç iki
uzak kaynağın aynı anda ulaşmasını gerektiriyordu; demir cevheri geniş
bir alanda bulunuyor. Çöküşten sonra düzenin dağınıklaşması buradan
okundu.

Buna bağlı ikinci ölçüm: demirin yaygınlaşmasının nedeni üstünlüğü
değil, tuncun tedarik zincirinin kopması. Bir teknolojinin
benimsenmesi, üstünlüğünden değil alternatifin ortadan kalkmasından da
gelebilir.

Diğer kayıtlar:
- Bağlantının kendisi bir risk: birbirine bağımlı düzenlerden oluşan
  bir sistem, tek tek düzenlerden hem daha verimli hem daha kırılgan.
- Alfabenin işaret sayısı ile kimin yazabileceği arasındaki doğrudan
  bağ kaydedildi.
- "Karanlık çağ" terimi: bir dönemin karanlık sayılması, o dönem
  hakkındaki bilgimizin değil o dönemin kayıt kapasitesinin kaydıdır.
- Deniz kavimleri: yalnızca düşmanının kaydında görünen bir topluluk,
  o kaydın çerçevesiyle tanımlanır. Neden mi sonuç mu oldukları
  belirsiz bırakıldı.
- Behistun kitabesi iki yönüyle ele alındı: üç dilli olması yöneten
  düzenin nüfus çeşitliliğini kabul ettiğinin kaydı, ve aynı özellik
  yüzyıllar sonra çivi yazısının çözülmesini sağladı — bir belgenin
  sonraki değeri, yazıldığı andaki amacından tamamen bağımsız
  olabilir.
- Sözlü geleneğin yazıya geçişi bir değiş tokuş olarak yazıldı: yazıya
  geçirmek bir metni korur ve aynı anda değişme kapasitesini sona
  erdirir.
- Demirin etkisinin savaş alanından çok tarla açmada görüldüğü, ve
  bunun kaydın daha az gösterdiği yan olduğu kaydedildi.

Künye onarımı: k2 ikinci bir Wikipedia'ydı (Bronze Age), yerine
Herodotos'un tam metni (Project Gutenberg) kondu; Behistun kitabesi
(Wikisource) k4 olarak eklendi. Dosya artık tek Wikipedia kuralına
uygun ve iki birincil kaynağı var.

Kalan dönem dosyaları: 01–02.

## 2026-08-26 — donem-02 onarıldı (700 → 2400+)

On beşinci dönem dosyası. MÖ 3000–1200.

Dosyanın ana ölçümü: belirli bir ölçeğin üzerindeki bir yönetim, kaydı
olmadan işleyemez; devletin sınırı, kayıt kapasitesinin sınırıdır.
Yazının ve devletin aynı yüzyıllara düşmesi tesadüf değil.

İkinci ölçüm tunç üzerine: bir alaşımın girdilerinin coğrafi dağılımı,
onu kullanan düzenlerin birbirine ne kadar bağımlı olacağını belirler.
Bu, donem-03'teki çöküşün doğrudan zemini olarak bağlandı.

Öne çıkan kayıtlar:
- Yazının ilk işi muhasebe: anlatı için değil sayma ve izleme için
  icat edildi. Bir aracın ilk kullanımı sonraki kullanımlarını
  belirlemiyor.
- Kilin dayanıklılığı bir kayıt yanlılığı üretiyor: kil kullanan
  bölgeler ayrıntılı, papirüs kullananlar seyrek biliniyor. Bir
  bölgenin daha iyi bilinmesi, daha önemli olduğunu değil kaydının
  daha dayanıklı olduğunu gösteriyor.
- Diplomatik yazışmada hitap biçimi hiyerarşiyi kaydediyor:
  hükümdarlar birbirine "kardeş", küçük düzenlere farklı hitap.
- Hediye ile ticaret ayrımı: aynı mal akışının nasıl adlandırıldığı,
  taraflar arasındaki ilişkinin niteliğini belirliyor.
- Hukuk metinleri eşitlik değil öngörülebilirlik iddia ediyor —
  cezalar failin ve mağdurun statüsüne göre değişiyor.
- Düzenli tekrarlanan borç silme ilanları, borçlanmanın da düzenli
  olarak sürdürülemez hâle geldiğini gösteriyor.
- Batıklar bir kanıt türü olarak kaydedildi: bir batık, kayıt
  tutulmamış bir işlemin kesitini koruyor.
- İki taraflı antlaşma metinlerinin ikisinin birden korunması,
  atlasın tekrar eden "iki metin" sorununu sınamak için en elverişli
  durum olarak işaretlendi.

Künye: Gilgamış Destanı Wikisource tam metni k4 olarak eklendi (ilk
denediğim archive.org kimliği 404 döndü, atlasın kendi kaynak
dosyasındaki doğrulanmış URL kullanıldı).

Kalan dönem dosyası: 01.

## 2026-08-26 — DÖNEM KATMANI TAMAMLANDI

`donem-01` (MÖ 10000–3000) onarıldı: 726 → 2500 kelime. On altıncı ve
son dönem dosyası.

Bu dosyanın ekseni, tarımın yayılmasının bir "iyileşme" olmaması:
buluntular tarıma geçen topluluklarda beslenmenin çeşitsizleştiğini ve
çalışma süresinin arttığını gösteriyor. Ölçüm: bir üretim biçimi, onu
benimseyenler için iyi olduğu için değil daha çok insan taşıyabildiği
için yayılabilir.

Diğer kayıtlar:
- Anıtsal yapıların tarımdan önce kurulmuş olması, nedensellik
  sıralamasını tersine çeviriyor. Aynı kanıtla iki yön uyumluysa,
  kanıt yönü belirlemeye yetmiyor.
- Çanak çömlek tipi ile etnik grup eşitlenmesi bir hata olarak
  kaydedildi: maddi kültürün dağılımı, nüfusun dağılımıyla aynı olmak
  zorunda değil. Genetik kanıtın girişi bunu bağımsız olarak
  sınayabilir hâle getirdi.
- Mezar okuması: zengin bir mezar, ölünün zenginliğini değil gömenlerin
  harcayabildiğini gösteriyor.
- Savunma yapısının varlığı, saldırının gerçekleştiğini değil
  beklendiğini gösteriyor.
- Dönem adının müze sınıflandırmasından geldiği ve o müzenin
  koleksiyonunun coğrafyasını taşıdığı ayrıca beyan edildi.

DÖNEM KATMANI DURUMU — hepsi hedefte (2500–4000):
01:2499 02:2549 03:2550 04:2526 05:2549 06:2536 07:2550 08:2552
09:2550 10:2583 11:2549 12:2548 13:2560 14:2568 15:2552 16:2553

Başlangıç durumu 433–1142 kelime aralığındaydı. Atlasın omurgası artık
gövdesi kadar sağlam.

Bu iş sırasında yan ürün olarak yapılanlar:
- Beş dosyada ikinci Wikipedia künyeden çıkarıldı (donem-03, 06 ve
  başka dosyalar), yerlerine birincil kaynak veya TDV maddesi kondu.
- donem-05'te dönem dışı bir kaynak (Thukydides, MÖ 5. yy, 200–650
  dosyasında) Prokopios ile değiştirildi.
- ctext.org'un çökmesi bu tarama sırasında yakalandı ve dokuz dosya
  onarıldı.

Sıradaki iş: korpusta hâlâ hedefin altında 281 dosya var (505 içinde).
Bunlar aktör, olay, düşünür, kavram ve tartışma dosyaları.

## 2026-08-26 — Kaynak kuramı üçlüsü onarıldı

Dönem katmanından sonra hedefin altındaki 281 dosyaya geçildi. İlk
parti, atlasın kendi yöntemini tanımlayan üç kavram dosyası:

- `kavram-birincil-kaynak` 205 → 600+ : üç ölçüt (zaman, konum,
  aktarım) ve dördüncüsü olarak erişilebilirlik yazıldı. Erişim
  ölçütünün gerekçesi pratik: ulaşılamayan bir kaynağa yapılan atıf
  sınanamaz. Nesne kanıtı ayrıca ele alındı — metin yazan bir düzen
  istediğini yazabilir, ürettiği nesne bunu her zaman doğrulamaz.
- `kavram-ikincil-kaynak` 208 → 600+ : zincir uzunluğu, aynı zincirin
  tekrarı (iki ikincil kaynağın aynı şeyi söylemesi bağımsız doğrulama
  değil), ve atlasın kendi konumu. Atlas kendisinin de ikincil kaynak
  olduğunu ve kendi ölçütlerine tabi olduğunu açıkça yazıyor. Tek
  Wikipedia kuralının gerekçesi de buraya kaydedildi: bir derlemenin
  yapısı, dayandığı tek kaynağın içindekiler sayfası hâline
  gelmemelidir.
- `kavram-tarih-yazimi` 208 → 600+ : bir tarih metnine sorulacak yedi
  soru (yöntem, muhatap, bölümleme, kapsam, sayılar, sonuç, simetri)
  tanımlandı.

Künye onarımı: iki dosyada ikinci Wikipedia vardı. `ikincil-kaynak`ta
yerine SEP "Epistemological Problems of Testimony", `tarih-yazimi`nde
Chavannes'ın Shiji çevirisi kondu — ikincisi ctext onarımında
doğrulanmıştı ve burada da işe yaradı.

Bu üçlü atlasın kendi kurallarını taşıyor; en zayıf hâlde bırakılmaları
diğer bütün dosyaların dayanağını zayıflatıyordu.

## 2026-08-26 — Dört kavram dosyası daha

`kavram-tasavvuf` 159 → 608, `kavram-patrimonyalizm` 189 → 603,
`kavram-emperyalizm` 195 → 600+, `kavram-kamusal-alan` 203 → 600+.

Üç dosyada ikinci Wikipedia künyeden çıkarıldı; yerlerine SEP
maddeleri kondu (Weber, Colonialism, Habermas).

Yöntem notu: bu dört dosyada da kavramlar "sınıflandırma etiketi"
olmaktan çıkarılıp ölçüt hâline getirildi. Her birine üç soruluk bir
uygulama kuralı yazıldı ve sonucun dereceli olduğu belirtildi — ideal
tip varlık yokluk değil mesafe ölçmeye yarıyor.

Öne çıkan kayıtlar:
- Tasavvuf: bir öğretinin coğrafi dağılımı, çoğu zaman onu taşıyan
  ticaret ağının dağılımıdır. Kadın mutasavvıfların anılmakla aktarım
  zincirine girmek arasındaki farkı ayrıca kaydedildi.
- Patrimonyalizm: sadakat–ehliyet gerilimi ve devşirme düzeninin bunu
  çözme denemesi; çözümün kendi sorununu üretmesi (bağımsız olsun diye
  kurulan kurum, bağımsızlığını kuranına karşı da kullanabiliyor) —
  aynı örüntü atlasın Abbasi ve Dahomey dosyalarında da kayıtlı.
- Emperyalizm: sömürgecilikle farkı netleştirildi; biçimsel olmayan
  biçimler (borç, ticaret anlaşması, üs) ayrıca tanımlandı.
- Kamusal alan: biçimsel açıklık ile fiilî katılım ayrıldı; sansür
  listesinin bir gösterge olduğu kaydedildi — neyin yasaklandığı,
  neyin tehdit sayıldığını gösteriyor.

Durum: 505 dosya, hedefin altında 273 (turun başında 276).

## 2026-08-26 — Beş kavram dosyası daha

`kavram-barut-imparatorluklari` 201→600, `kavram-millet-sistemi`
205→600, `kavram-kentlesme` 206→600, ve önceki turda başlanan
`kavram-salgin` ile `kavram-kuresellesme` künyeleri onarıldı.

Beş dosyada ikinci Wikipedia çıkarıldı. Yerlerine: TDV OSMANLILAR,
TDV MİLLET, TDV ŞEHİR, Prokopios (birincil/tanık) ve OWID ticaret
payı serisi.

KAPI 1 bu turda yeni bir kural uyguladı ve iyi ki uyguladı:
`kavram-kentlesme`de üç kaynağın da ourworldindata.org'dan olması
"bağımsızlık şartı ihlali" olarak reddedildi. Üçüncü kaynak TDV ŞEHİR
ile değiştirildi. Bu kural daha önce tetiklenmemişti.

Öne çıkan kayıtlar:
- Barut imparatorlukları: ortak yan teknoloji değil örgütlenme.
  Sonraki dönemde geri kalmanın nedeni de teknolojiye erişim değil
  üretim kapasitesi — silah satın alınabiliyordu, onu üreten sanayi
  ve kullanan eğitim düzeni satın alınamıyordu.
- Millet sistemi: düzen eşitlik değil ayrı ayrı yönetim öngörüyor;
  ikisi karıştırılmamalı. Eşitsiz antlaşmalardaki yargı ayrıcalığıyla
  farkı da netleştirildi — belirleyici olan hukukun çokluğu değil, o
  hukuku kimin belirlediği.
- Kentleşme: sanayisiz kentleşme ayrıca tanımlandı; aynı oran iki
  bambaşka yapıyı gösterebiliyor. Tarihsel oranların çarpanla
  üretildiği ve varsayımın sonucu belirlediği kaydedildi.

Yöntem notu: künye değiştiren yardımcı betik `tur:` alanını
atlıyordu çünkü o alan `ad:` satırından önce geliyor. Üç dosyada
yanlış tür kaldı ve elle düzeltildi. Betik bir sonraki kullanımda
düzeltilmeli.

## 2026-08-26 — Dört kavram dosyası daha

`kavram-salgin` 207→607, `kavram-kuresellesme` 208→603,
`kavram-yazi-sistemi` 210→600, `kavram-caydiricilik` 211→600.

Kalibrasyon notu: kavram dosyalarında bir bölüm (üç kısa paragraf)
yaklaşık 45 kelime tutuyor. +400 kelime için ~9 bölüm gerekiyor;
önceki tahminim 8'di ve iki geçiş gerektirdi.

Öne çıkan kayıtlar:
- Salgın üç koşula bağlandı (bulaşıcılık, yoğunluk, bağlantı) ve
  salgının bir hastalık özelliği değil, hastalık ile yerleşim
  düzeninin kesişimi olduğu yazıldı.
- Küreselleşme tek bir döneme ait olmaktan çıkarıldı: iki dalga ayrı
  ayrı ele alındı ve farkları (bitmiş ürün ticareti vs. parçalanmış
  üretim) kaydedildi. Tersine dönebilirlik ayrıca ele alındı — bazı
  bileşenler tersinir, iletişim maliyetindeki düşüş değil.
- Yazı sistemi: işaret sayısı teknik bir ayrıntı değil bir erişim
  ölçütü. Bir dilin başka bir yazı sistemiyle kaydedilmesinin o dilin
  bir bölümünü kayıt dışı bıraktığı kaydedildi.
- Caydırıcılık: mekanizmanın sınanamazlık sorunu açıkça yazıldı —
  saldırı olmadığında caydırıcılığın işlediği mi yoksa niyet hiç
  bulunmadığı mı bilinmiyor. Hiç sınanmamış bir mekanizma başarılı
  değil, yalnızca çürütülmemiş sayılır. Gizli tutulan bir kapasitenin
  caydırmayacağı da ayrıca kaydedildi.

Durum: 505 dosya, hedefin altında 265.
