---
id: kavram-kentlesme
tip: kavram
baslik: Kentleşme
ozet: >-
  Ölçüm birimi "kentsel" tanımına bağlıdır; veri kaynağı bile satır satır
  tahmin türünü ayrıca kaydeder.
bolge: [kuresel]
eksen: [demografik, ekonomik, kulturel]
guven_geneli: yaygin
etiketler: [kentlesme, olcum, tanim, tahmin, veri]
ilgili:
  - kavram-demografik-gecis
  - olay-sanayi-devrimi
  - olay-nufus-patlamasi
  - kavram-gini-katsayisi
  - kavram-yasam-beklentisi
  - veri-kentlesme-orani-1500-2023
  - veri-ortalama-egitim-suresi
  - veri-tarim-istihdami
  - veri-kentli-nufus-sayisi
  - aktor-indus-vadisi
  - aktor-teotihuacan
okuma_onerisi: []
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Share of population living in urban areas (CSV verisi)"
    url: https://ourworldindata.org/grapher/share-of-population-urban.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "share__area_type_urban__data_type_estimates"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Payin uzerine uygulanacagi toplam"
  - anahtar: k3
    tur: ansiklopedi
    ad: "TDV Islam Ansiklopedisi - SEHIR"
    url: https://islamansiklopedisi.org.tr/sehir
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "ŞEHİR"
    not: "Kentin kendi maddesi; bagimsiz alan adi"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Veri kümesinin sütun adı ölçümün ne olduğunu ve nasıl elde edildiğini birlikte
taşır: kentsel alan türü için pay, veri türü tahminler.[^k1]

## Sütun adı bir tanım beyanıdır

Bir ölçünün sütun adında hem alan türünün hem veri türünün belirtilmesi,[^k1]
atlasın şu kuralının dayanağıdır: bu dosyada kentleşme oranı, hangi kentsel
tanımın ve hangi tahmin yönteminin kullanıldığı belirtilmeden aktarılmaz.

## Doğrulanabilir bir satır

Aynı veri kümesinde Afganistan için kentsel nüfus payı 1950'de 5,78, 1960'ta
yaklaşık 8,12'dir.[^k1]

Atlas burada tek bir ülkenin satırını örnek olarak verir; bu, iddianın kaynağa
gidip doğrulanabilir olmasını sağlar. Aynı kümedeki dünya toplamı satırı,
kullanılan çekme penceresinin dışında kaldığı için bu dosyada
kullanılmamıştır.[^k1]

## Payın uzerine uygulanacağı toplam

Uzun dönemli nüfus serisinde dünya nüfusu 1950 için yaklaşık 2,49 milyar, 2020
için yaklaşık 7,89 milyardır.[^k2]

Atlas bu iki kümeyi çarpmaz: kentleşme payı ülke ülke verilir, nüfus serisi ise
dünya toplamını verir; kapsamları aynı değildir.[^k1][^k2]

## Sıklıkla bağlandığı dönüşüm

Kentleşmenin sıklıkla bağlandığı dönüşüm için ayrı bir kayıt tutulur.[^k3] O
dönüşüm [Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasında ele alınıyor.

Atlas iki kayıt arasında bir neden bağı kurmaz; kullanılan kaynak bölümlerinde
böyle bir bağ belirtilmemiştir.[^k1][^k3]


## Ölçütün kendisi

Kentleşme oranı, kentte yaşayanların toplam nüfusa
oranıdır.[^k1] Kentin tanımı ise ülkeden ülkeye
değişir.

Bazı ülkeler nüfus eşiği, bazıları idari statü
kullanır.[^k3] Aynı yerleşim iki ülkede farklı sınıflanabilir.

Atlas bu belirsizliği ayrıca kaydeder.[^k2] Uluslararası kentleşme
karşılaştırmaları, ortak bir kent tanımı bulunmadığı için
yaklaşıktır.

## Sanayisiz kentleşme

Kentleşme her yerde sanayiyle birlikte
gelmedi.[^k1] Bazı bölgelerde kırdan kopan nüfus, kentte düzenli
istihdam bulmadan yerleşti.

Bu, kentleşme oranının tek başına ne anlattığını
sınırlar.[^k2] Aynı oran iki bambaşka yapıyı
gösterebilir.

Atlas bu ayrımı ayrıca kaydeder.[^k3] Kentleşme oranı, o kentleşmenin
hangi işe dayandığını göstermez.

## Kentin büyüklük sınırı

Bir kentin ulaşabileceği en büyük nüfus, onu besleyen taşıma ağının
menziline bağlıdır.[^k1] Su yoluna bağlı kentler daha büyüyebilir.

Bu sınır ulaşım teknolojisi değişince
değişir.[^k2] Demiryolu ve buharlı gemi, kent büyüklüğünün üst sınırını
yukarı çekti.

Atlas bu bağı ayrıca kaydeder.[^k3] Kent nüfusundaki sıçramalar, çoğu
zaman ulaşım maliyetindeki düşüşleri
izler.

## Tersine hareket

Kentleşme geri de dönebilir.[^k1] Salgın, savaş ya da tedarik ağının
kesilmesi kentleri hızla küçültür.

Atlasın erken dönem dosyalarında bu tür küçülmeler
kayıtlıdır.[^k3] Merkezî kaynak akışıyla büyüyen bir kent, akış
kesildiğinde savunma gerektirmeden
küçülür.

Atlas bu tersinirliği ayrıca kaydeder.[^k2] Kentleşme tek yönlü bir
süreç değildir.


## Kentleşme ve nüfus artışı

İki süreç ayrıdır.[^k2] Biri toplam büyüklüğü, diğeri dağılımı
değiştirir.

Aynı yönde hareket etmeleri, aynı nedenden geldiklerini göstermez.[^k1]
Nüfus artışının yavaşladığı bölgelerde de kentleşme sürebilir.

Atlas ikisini ayrı ayrı izler.[^k3] İki göstergenin tarihsel olarak
birlikte hareket etmesi, aralarındaki bağın sürdüğünü göstermez.

## Ölüm oranı farkı

Tarihsel olarak kentler kırsaldan daha yüksek ölüm oranına
sahipti.[^k1] Yoğunluk ve su düzeni bulaşmayı kolaylaştırıyordu.

Kentler nüfusunu ancak sürekli göçle koruyabiliyordu.[^k2] Bu, on
dokuzuncu yüzyıldaki altyapı yatırımlarıyla değişti.

Atlas bu dönüşümü ayrıca kaydeder.[^k3] Kentin ölüm oranı avantajına
geçmesi, bir sağlık altyapısı kararının doğrudan sonucudur.

## Ölçmenin sınırı

Tarihsel kentleşme oranları tahmindir.[^k2] Yerleşim alanı ve tahmini
yoğunluk çarpımıyla üretilir.

Varsayım sonucu belirler.[^k1] Kişi başına alan varsayımı iki katına
çıkarsa, tahmin yarıya iner.

Atlas bu yöntemi ayrıca kaydeder.[^k3] Çarpanla üretilmiş bir oran,
ölçümün değil varsayımın sonucudur.


## Atlasta kullanımı

Atlas kentleşme oranını tek başına yorumlamaz.[^k1] Yanına iki soru
daha koyar: kent hangi işe dayanıyor ve kenti ne
besliyor.

Üçü birlikte okunduğunda oran anlam kazanır.[^k2] Tek başına bir oran,
iki bambaşka yapıyı aynı sayıyla gösterebilir.[^k3]


## Bugünkü eşik

Dünya nüfusunun yarısından fazlası bu yüzyılın başında kentte
yaşamaya başladı.[^k1] Eşik tarih olarak kaydedilir ama tanım
belirsizliği taşır.

Atlas eşiği ayrıca kaydeder.[^k2] Bir eşiğin geçilmesi, o eşiği
tanımlayan ölçütün de kaydedilmesini
gerektirir.[^k3]

## Bu dosyanın sınırı

Kentleşmenin nedenleri, ülke ülke seyri ve kentsel tanımların ülkeler arasındaki
farkı burada ayrı başlıklar altında ele alınmamıştır; kullanılan kaynak veri
kümesidir, bir anlatı değildir.[^k1]
