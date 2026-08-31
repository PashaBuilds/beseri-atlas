---
id: olay-internetin-yayginlasmasi
tip: olay
baslik: İnternetin yaygınlaşması
ozet: >-
  Kaynak ağı tek bir icat olarak değil birleşen ağlar dizisi olarak yazar ve
  yayılmanın eşitsizliğine kendi başlığını ayırır.
donem: "15"
tarih_baslangic: "1969"
tarih_bitis: "2004"
bolge: [amerika, avrupa, kuresel]
eksen: [ekonomik, kulturel, siyasi]
guven_geneli: yaygin
etiketler: [internet, arpanet, paket-anahtarlama, tcp-ip, sayisal-ucurum]
ilgili:
  - donem-15
  - aktor-abd
  - olay-uzay-yarisi
  - kavram-kamusal-alan
  - kavram-kuresellesme
  - veri-internet-kullanimi
okuma_onerisi: []
kaynaklar:
  - anahtar: k1
    tur: ansiklopedi
    ad: "Wikipedia (EN) - History of the Internet"
    url: https://en.wikipedia.org/wiki/History_of_the_Internet
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "History of the Internet"
  - anahtar: k2
    tur: ders
    ad: "OpenStax — World History Volume 2, 7.3 Revolutions: America, France, and Haiti"
    url: https://openstax.org/books/world-history-volume-2/pages/7-3-revolutions-america-france-and-haiti
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: United States
    not: Rice University tarafindan acik lisansla yayimlanan, yazar ve hakem kurulu acik universite ders
      kitabi; onceki genel Wikipedia baglam kaynaginin yerine kullanildi.
  - anahtar: k3
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
son_denetim: 2026-08-30
denetim_durumu: onaylandi
onarim_turu: 0
---
ARPA, ARPANET projesinin geliştirilmesi için 1969'da sözleşmeler verdi; proje Robert
Taylor'ın yönetiminde, Lawrence Roberts'ın idaresindeydi.[^k1]

## Fikir, projeden yedi yıl öncedir

Kaynak Paul Baran'ın 1960'ların başında mesaj bloklarındaki veriye dayalı dağıtık
bir ağ önerdiğini, Donald Davies'in ise 1965'te Ulusal Fizik Laboratuvarı'nda
paket anahtarlamayı tasarladığını ve Birleşik Krallık'ta ulusal bir ticari veri
ağı önerdiğini yazar; ARPANET'in Davies'in önerdiği paket anahtarlama teknolojisini
benimsediği ve Baran'dan görüş aldığı kaydedilir.[^k1]

Bir teknolojinin, onu hayata geçiren projeden yıllar önce ve başka bir ülkede
tasarlanmış olarak kaydedilmesi,[^k1] "internetin icadı" gibi tekil bir ifadeyi
kaydın kendisinin desteklemediğini gösterir.

## Yapanlar ayrı ayrı sayılır

Arayüz Mesaj İşlemcileri ağının Bolt, Beranek ve Newman'daki bir ekip tarafından
kurulduğu, tasarım ve şartnamenin Bob Kahn önderliğinde yürütüldüğü, ana
bilgisayarlar arası protokolün ise büyük ölçüde UCLA'da Steve Crocker
önderliğindeki lisansüstü öğrenciler ile Jon Postel ve diğerleri tarafından
belirlendiği yazılır.[^k1]

Protokolün lisansüstü öğrencilere atfedilmesi,[^k1] teknik standartların
kurumsal hiyerarşinin tepesinde değil çalışma düzeyinde belirlendiği bir örnek
olarak kayda geçer.

## Paket anahtarlama neden farklıydı?

Geleneksel telefon ağı bir görüşme boyunca iki uç arasında ayrılmış devre
kuruyordu. Paket anahtarlama ise veriyi küçük parçalara bölüyor, her paketin ağda
uygun yoldan ilerlemesine ve varışta yeniden birleşmesine izin veriyordu.[^k1]
Hat tek kullanıcı için boş beklemediği için patlamalı bilgisayar iletişimine daha
uygundu.

Dağıtık yönlendirme bir merkezin yok edilmesine dayanıklı olabilirdi; ancak
ARPANET'i yalnız nükleer savaştan sağ çıkmak için kurulmuş ağ diye anlatmak
eksiktir. Pahalı bilgisayar kaynaklarını paylaşma, uzak araştırma merkezlerini
bağlama ve etkileşimli hesaplama hedefleri de belirleyiciydi.[^k1] Savunma
finansmanı ile akademik kullanım aynı altyapıda birleşti.

Paketlerin kaybolabileceğini kabul edip yeniden gönderimi uç bilgisayarlara
bırakmak ağın içini görece basit tuttu. Bu tasarım kararı ileride çok farklı
fiziksel ağların aynı iletişim ilkesi altında birleşmesini kolaylaştırdı.
Güvenilirlik her ara düğümün kusursuzluğundan değil, sistemin hata beklemesinden
doğdu.

## İlk ağ ve beklenmedik kullanım

1969'da UCLA, Stanford Araştırma Enstitüsü, UC Santa Barbara ve Utah
Üniversitesi ilk ARPANET düğümlerini oluşturdu.[^k1] İlk uzak giriş denemesinde
“LOGIN” sözcüğünün yalnız ilk iki harfi iletilebildi, sistem çöktü. Bu küçük
başarısızlık altyapı tarihinin gerçek ilerleme biçimini gösterir: kusursuz açılış
değil, çalışan parçanın hata üzerinden genişlemesi.

Elektronik posta kısa sürede ağın en yoğun kullanımlarından biri oldu.[^k1]
Projenin resmî gerekçesi bilgisayar paylaşımıyken kullanıcılar insan-insan
iletişimini öne çıkardı. Teknolojinin toplumsal etkisi tasarımcının ilk amacıyla
sınırlı değildir; kullanıcıların basit ve değerli bulduğu işlev altyapının
yönünü değiştirebilir.

E-posta adresindeki `@` işareti, kullanıcı ile ev sahibi bilgisayarı ayıran
pratik bir seçimden standarda dönüştü. Günlük görünen işaretin küresel ortaklık
olması, büyük teknolojik sistemlerin yalnız büyük icatlardan değil küçük ve
uyumlu sözleşmelerden kurulduğunu hatırlatır.

## Ağların ağı: TCP/IP

1970'lerde ARPANET, radyo ve uydu gibi farklı iletim ağlarını birbirine bağlama
sorunu doğdu. Vint Cerf ve Bob Kahn'ın geliştirdiği TCP/IP yaklaşımı, her ağın
iç yapısını değiştirmeden ortak paket ve adresleme kurallarıyla iletişmesini
sağladı.[^k1] “İnternet” sözcüğünün özü burada, tek büyük ağda değil ağlar arası
bağlantıdadır.

TCP verinin sıralı ve eksiksiz ulaşmasını, IP paketlerin adreslenip
yönlendirilmesini üstlendi. Katmanları ayırmak, uygulama geliştiricisinin kablo
ve yönlendiricinin bütün ayrıntısını bilmesini gereksiz kıldı. Modülerlik yeni
uygulamanın altyapı sahibinden tek tek izin almadan ortaya çıkabilmesinin teknik
zeminlerinden biridir.

1 Ocak 1983'te ARPANET'in TCP/IP'ye toplu geçişi önemli eşiktir.[^k1] Bir protokol
ancak başkaları da aynı anda kullanırsa değerlidir; geçiş takvimi ve ortak test
bu koordinasyon sorununu çözdü. İnternetin tarihi yalnız icat değil, rakip
kurumların aynı standarda ne zaman güveneceği tarihidir.

## Adlar, adresler ve ölçek

İlk dönemde ağdaki bilgisayarların adları merkezi bir dosyada tutulabiliyordu.
Düğüm sayısı büyüdükçe bu yöntem güncelleme ve çakışma sorununa yol açtı. Alan
Adı Sistemi, hiyerarşik adları dağıtık sunucular üzerinden sayısal IP adreslerine
çevirdi.[^k1] İnsan için hatırlanabilir ad ile makine için yönlendirilebilir
adres birbirinden ayrıldı.

`.com`, `.org`, ülke kodları ve alan kaydı teknik olduğu kadar yönetişim
sorusudur. Hangi adın kime verileceği, kayıt kuruluşlarının yetkisi ve küresel
kök sisteminin kimce koordine edileceği ekonomik ve siyasal değer taşır.
“Merkezsiz internet” ortak kök ve standart kurumlarının olmadığı anlamına gelmez.

Standartlar büyük ölçüde açık belge, çalışma grubu ve “çalışan kod ile kaba
uzlaşma” kültürü içinde gelişti. Bu süreç devlet antlaşmasından daha esnek,
özel mülkiyet standardından daha erişilebilirdi. Yine de katılım için dil,
uzmanlık, zaman ve seyahat kaynağı gerektiği için fiilî temsil hiçbir zaman
tam eşit değildi.

## ARPANET'ten NSFNET'e

Savunma amaçlı trafik MILNET'e ayrılırken üniversite ağları genişledi. Amerikan
Ulusal Bilim Vakfı'nın NSFNET omurgası süper bilgisayar merkezlerini ve bölgesel
ağları bağladı, 1980'lerin sonlarında internet büyümesinin ana taşıyıcılarından
biri oldu.[^k1] Kamu finansmanı altyapıyı, üniversiteler kullanıcı ve uzman
ağını sağladı.

Başka ülkelerde ulusal araştırma ağları ve farklı protokol projeleri gelişti;
hepsi baştan TCP/IP kullanmadı. Açık Sistemler Bağlantısı gibi resmî standartlar
uzun süre rakipti. TCP/IP'nin zaferi yalnız teknik üstünlük değil, çalışan
uygulama, erişilebilir yazılım, kurulu kullanıcı tabanı ve zamanlama sonucuydu.[^k1]

NSFNET omurgasının ticari trafiğe ilişkin sınırlamaları kaldırılıp özel ağlar
birbirine bağlandığında 1990'larda internet ticarileşti.[^k1] Devlet ağı bir
gecede “özel sektör icadı”na dönüşmedi; kamu araştırması, açık protokol ve özel
yatırım ardışık katmanlar oluşturdu.

## İnternet ile Web aynı şey değildir

Tim Berners-Lee, CERN'de bağlantılı belgeleri paylaşmak için URL, HTTP ve HTML
bileşimini geliştirerek Dünya Çapında Ağ'ı kurdu.[^k1] İnternet bilgisayar ağını;
Web o ağ üzerinde çalışan belge ve bağlantı hizmetini anlatır. E-posta, dosya
aktarımı ve başka hizmetler Web'den önce vardı ve Web değildir.

Web'in temel teknolojilerinin telifsiz ve açık uygulanabilir olması hızlı
yayılımı kolaylaştırdı. Mosaic ve ardından ticari tarayıcılar metin ile görseli
kullanıcı dostu arayüzde birleştirdi. Teknik adres yazmak yerine bağlantıya
tıklamak, ağı uzman çevresinden gündelik kullanıma taşıyan davranış değişimiydi.

Arama motorları sayfa sayısı büyüdükçe bilgi bulma sorununu çözdü; sıralama
algoritması hangi bilginin görünür olduğunu belirleyen yeni bir aracılık gücü
yarattı. Kapı bekçisi ortadan kalkmadı, gazeteci ve kütüphaneciden platform ile
algoritmaya doğru yer değiştirdi.

## Ticaret ve yeni iş modelleri

İnternet marjinal iletişim maliyetini düşürerek yazılım, haber, müzik ve finansal
hizmetin küresel dağıtımını kolaylaştırdı. Elektronik ticaret daha geniş müşteri
erişimi sağladı; buluşma maliyeti düşerken ödeme, güven, lojistik ve iade yeni
kurumlar gerektirdi. “Aracısızlaşma” çoğu kez eski aracının yerine platform,
ödeme şirketi ve dağıtım ağı getirdi.

1990'ların dot-com balonu gelecekteki kullanım beklentisini bugünkü şirket
değerlerine taşıdı. Birçok firma gelir modeli kuramadan battı; döşenen fiber,
yetişen uzman ve çevrimiçi alışkanlık ise sonraki büyümeye altyapı kaldı.[^k1]
Finansal başarısızlık ile teknolojik yatırımın toplumsal sonucu aynı bilanço
değildir.

Ağ etkisi, daha çok kullanıcının aynı hizmeti daha değerli kılması nedeniyle
birkaç platformun hızla büyümesine yol açtı. Açık internet protokolleri üzerinde
kapalı ve merkezî hizmetler kurulabildi. Altyapının dağıtık olması ekonomik gücün
dağıtık kalacağını garanti etmedi.[^k1]

## Sayısal uçurumun katmanları

Erişim farkı yalnız “bağlı mı değil mi?” değildir. Elektrik, cihaz fiyatı,
bağlantı hızı, veri kotası, dil, engellilik erişimi, eğitim ve güvenli kullanım
becerisi aynı bağlantının değerini değiştirir.[^k1] Telefon üzerinden sınırlı
paket kullanan kişi ile sabit hızlı bağlantıda bilgisayar kullanan kişi ikisi de
internet kullanıcısı sayılabilir, üretim kapasitesi eşit değildir.

Kentsel yoğunluk altyapı yatırımını daha kârlı kılar; kırsal ve yoksul bölge
daha pahalı hizmet alabilir. Kamu yatırımı, evrensel hizmet fonu, ortak erişim
merkezi ve mobil şebeke farklı çözümler sundu. Piyasa büyüdükçe uçurum bazı
ölçülerde azalırken yeni yüksek hız ve beceri farkları doğdu.

İçerik dili de erişimdir. Yerel dilde bilgi ve klavye desteği yoksa fiziksel
bağlantı toplumsal katılım sağlamaz. Unicode ve uluslararası alan adları teknik
standart görünür; hangi kültürün bilgi üretebildiğini ve bulunabildiğini
etkiler.

## Kamusal alan ve denetim

İnternet düşük maliyetli yayın sayesinde yurttaş, toplumsal hareket ve küçük
medyaya geniş kitleye ulaşma imkânı verdi. Diasporalar, bilim insanları ve açık
kaynak toplulukları sınır ötesi ortak üretim kurdu. Devlet sansürünü aşan ağ,
belge ve tanıklığın hızlı yayılmasını sağladı.[^k1]

Aynı altyapı gözetim, dezenformasyon, taciz ve örgütlü nefret için de kullanıldı.
Veri paketinin içeriğe kayıtsız taşınması, doğru ile yanlışı teknik olarak
ayırt etmez. İfade özgürlüğü, platform sorumluluğu ve zarar önleme arasında
karar kod, şirket kuralı ve devlet hukuku üzerinden verilir.

İnternet “hiç kimsenin kontrol etmediği” alan değildir. Devletler kablo ve
şebekeyi kesebilir, şirketler hesabı ve görünürlüğü yönetebilir, standart
kuruluşları teknik seçenekleri belirleyebilir, kullanıcılar şifreleme ve açık
yazılımla karşı güç kurabilir. Kontrol tek merkezde değil, katmanlara dağılmıştır.

## Güvenlik başlangıç varsayımı değildi

İlk araştırma ağında kullanıcılar sınırlı ve görece güvenilir topluluktu;
kimlik doğrulama, şifreleme ve kötüye kullanım bugünkü ölçekte tasarım önceliği
değildi. Küresel ve ticari büyüme, spam, zararlı yazılım, dolandırıcılık ve
altyapı saldırısı için büyük hedef alanı yarattı.[^k1]

Güvenlik sonradan eklenen tek duvar değil, yazılım güncellemesi, şifreleme,
sertifika, kullanıcı davranışı ve kurumlar arası olay paylaşımından oluşur.
Ağın en zayıf cihazı başkalarına saldırı aracı olabilir. Bağlantının faydası
arttıkça kopmanın ve ihlalin sistemik maliyeti de artar.

## “İcat” yerine ekosistem

İnterneti tek kişiye, tek tarihe veya tek devlete atfetmek paket anahtarlama,
protokol, donanım, alan adı, kamu omurgası, Web ve ticari erişim katmanlarını
birbirine karıştırır. Her katmanda önemli kişiler vardır; hiçbiri tek başına
bugünkü sistemi kurmadı.[^k1]

Daha doğru soru “interneti kim icat etti?” değil, farklı ağların neden ortak ve
açık kuralları benimseyebildiği, maliyeti kimin karşıladığı ve kullanıcıların
hangi beklenmedik uygulamayı büyüttüğüdür. Yenilik burada kahramanın bir anlık
buluşundan çok, birlikte çalışabilirliği sürdüren kurum ve topluluk kapasitesidir.

Yaygınlaşmanın başarısı kullanıcı sayısıyla ölçülebilir; niteliği ise erişim,
özgürlük, güvenlik, rekabet ve bilgi kalitesiyle ayrı ayrı değerlendirilmelidir.
Bir boyutta genişleme başka boyutta iyileşme garantisi vermez. İnternet aynı
anda daha çok insanı konuşturabilir ve konuşmanın geçtiği birkaç şirketi daha
güçlü hâle getirebilir.

## Vizyon sahibi, ağ açıldığında orada değildi

Licklider'in Ekim 1962'de ARPA içinde yeni kurulan Bilgi İşleme Teknikleri
Ofisi'nin başına getirildiği ve görevinin Savunma Bakanlığı'nın Cheyenne Dağı,
Pentagon ve SAC Karargâhı'ndaki ana bilgisayarlarını birbirine bağlamak olduğu
yazılır; 1963'te dağıtık bir ağı anlatan notlar yazdığı, 1964'te ofisten
ayrıldığı ve bunun ARPANET'in devreye girmesinden beş yıl önce olduğu
kaydedilir.[^k1]

## Yayılma kendi başlığını taşır

Kaynak 1980'lerdeki küresel yayılmayı ayrı bir başlıkta işler ve altına Afrika,
Asya ve Okyanusya, Latin Amerika ile bir sayısal uçurumun ortaya çıkışı alt
başlıklarını koyar; 1989-2004 arası ise küresel internetin yükselişi olarak
adlandırılır.[^k1]

Yayılmanın yanına eşitsizliğin de bir başlık olarak yazılması,[^k1] bir teknolojinin
yaygınlaşmasının herkes için aynı anlama gelmediğini kaydın kendisinin belirttiğini
gösterir.

## İlk bağlantıların ülkesi

ARPANET'in Birleşik Devletler genelinde hızla yayıldığı, Birleşik Krallık ve
Norveç'e bağlantılar kurulduğu yazılır.[^k1] Ağın çıkış ülkesi
[Amerika Birleşik Devletleri](/aktor/abd/) dosyasında ele alınıyor.[^k2]

## Ölçek

Uzun dönemli seride dünya nüfusu 1969 için yaklaşık 3,62 milyar, 2004 için
yaklaşık 6,50 milyardır.[^k3] Ağa bağlı nüfusa dair bir ölçüm kullanılan kaynak
bölümünde bulunmadığı için bu değerler içindeki pay burada hesaplanmamıştır.

## Kanıtın ve kapsamın sınırı
TCP/IP'nin geliştirilmesi, NSFNET'e geçiş, optik ağlar, Web'in tarihi ve 2004
sonrası burada ayrı başlıklar altında ele alınmamıştır; kaynak bunları ayrı
bölümler olarak işler.[^k1] Dönemin bütünü [1991-2008](/donem/15/) dosyasında ele
alınıyor.
