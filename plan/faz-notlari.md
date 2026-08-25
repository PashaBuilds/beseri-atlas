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
