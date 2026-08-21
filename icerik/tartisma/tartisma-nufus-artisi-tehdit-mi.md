---
id: tartisma-nufus-artisi-tehdit-mi
tip: tartisma
baslik: Nüfus artışı bir tehdit mi?
ozet: >-
  Kaynak modelin öngördüğü olayı yedi ayrı adla anar ve bu adlardan ikisinin
  yanına kendi kaynak gerekli işaretini koyar.
soru: >-
  Nüfus artışı kaynak kısıtlarına çarpar mı; model bir öngörü müdür yoksa
  koşullu bir mekanizma mı?
neden_onemli: >
  Bu harita, atlasın veri katmanıyla kavram katmanının doğrudan karşılaştığı
  yerdir. Model iki yüz yıl önce kurulmuş bir mekanizma önerir; atlasın veri
  dosyaları o iki yüz yılın sayılarını taşır. İkisini yan yana koymak kolaydır;
  birinin diğerini kanıtladığını söylemek değildir.
donem: "16"
tarih_baslangic: "1798"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [demografik, ekonomik]
guven_geneli: tartismali
etiketler: [nufus-artisi, malthus, ongoru, kosul, veri-karsilastirmasi]
ilgili:
  - kavram-malthus-tuzagi
  - dusunur-malthus
  - veri-nufus-artis-hizi
  - veri-tarimsal-verim
  - donem-16
okuma_onerisi: []
hakem_yok: true
pozisyonlar:
  - ad: Model bir öngörüdür
    savunanlar: [Kaynağın kuram anlatımı]
    tez: >
      Nüfus artışı potansiyel olarak üsteldir, gıda arzının büyümesi ise
      doğrusaldır; bu, yaşam standartlarını sonunda bir nüfus düşüşünü
      tetikleyecek noktaya indirir.
    guclu_yani: >
      Kaynak mekanizmayı açıkça formüle eder ve sonucun kıtlığa ya da savaşa yol
      açacağının öngörüldüğünü yazar.
    zayif_yani: >
      Aynı kaynak bu olayın gerçekleştiğini değil öngörüldüğünü kaydeder;
      koşullu bir ifadedir.
  - ad: Model koşulludur, öngörü değildir
    savunanlar: [Atlasın kendi kaydı]
    tez: >
      Model, nüfus artışı tarımsal üretimi geçerse bir sonuç öngörür; koşul
      gerçekleşmediğinde model yanlışlanmış olmaz.
    guclu_yani: >
      Kaynak koşulu açıkça yazar: olayın nüfus artışı tarımsal üretimi geçerse
      gerçekleşeceği öngörülmüştür.
    zayif_yani: >
      Koşullu bir modelin yanlışlanamaz hâle gelmesi riski vardır; hangi
      gözlemin modeli çürüteceği kaynakta belirtilmez.
  - ad: Adlandırmanın kendisi belirsizdir
    savunanlar: [Kaynağın ad listesi]
    tez: >
      Modelin öngördüğü olay için yedi ayrı ad kullanılır ve bunlardan ikisi
      kaynakta kaynaksız işaretlenmiştir.
    guclu_yani: >
      Bir olgunun bu kadar çok adla anılması, üzerinde uzlaşılmış tek bir
      tanımın bulunmadığını gösterir.
    zayif_yani: >
      Ad çokluğu, modelin mekanizmasını çürütmez; yalnızca literatürün
      dağınıklığını gösterir.
kaynaklar:
  - anahtar: k1
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Malthusianism"
    url: https://en.wikipedia.org/wiki/Malthusianism
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Malthusianism"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population growth rates (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-growth-rates.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "growth_rate"
    not: "Modelin sinandigi seri; bagimsiz alan adi"
  - anahtar: k3
    tur: veri
    ad: "Our World in Data - Key crop yields (CSV verisi)"
    url: https://ourworldindata.org/grapher/key-crop-yields.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "yield"
    not: "Modelin diger tarafi: gida arzi"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Bu haritanın çıkış noktası kaynağın kendi kipi: olay gerçekleşmiş değil
öngörülmüş olarak kaydedilir.[^k1]

## Mekanizma ve koşul birlikte verilir

Kaynak, nüfus artışının potansiyel olarak üstel, gıda arzının ya da diğer
kaynakların büyümesinin ise doğrusal olduğunu ve bunun yaşam standartlarını
sonunda bir nüfus düşüşünü tetikleyecek noktaya indirdiğini yazar; olayın nüfus
artışı tarımsal üretimi geçerse gerçekleşeceğinin öngörüldüğünü ve bunun kıtlığa
ya da savaşa yol açacağını kaydeder.[^k1]

::tartismali[Kaynak modeli koşullu bir öngörü olarak yazıyor. Atlas bu modeli ne doğrulanmış ne çürütülmüş sayar; koşulun gerçekleşip gerçekleşmediği ayrı bir sorudur.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Okuma yöntemi
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Yedi ad ve iki kaynaksız işaret

Kaynak olayın adlarını sıralar: Malthusçu felaket, Malthus tuzağı, nüfus tuzağı,
Malthusçu denetim, Malthusçu kapma, Malthusçu kriz, kriz noktası ve Malthusçu
daralma; bu adlardan ikisinin yanına kendi kaynak gerekli işaretini koyar.[^k1]

Kavram [Malthus tuzağı](/kavram/malthus-tuzagi/) dosyasında, yazarı ise
[Thomas Malthus](/dusunur/malthus/) dosyasında ele alınıyor.

## İki seri modelin iki tarafını verir

Nüfus artış hızı serisinde sağlayıcının toplam satırı 1950 için yüzde 1,738,
2023 için yüzde 0,871 verir.[^k2] Buğday verimi serisinde ise 1961 için hektar
başına 1,0889001 ton, 2024 için 3,6374002 ton verilir.[^k3]

Artış hızı düşerken verimin artması,[^k2][^k3] modelin öngördüğü koşulun bu
dönemde gerçekleşmediğini düşündürür; atlas bundan modelin yanlışlandığı
sonucunu çıkarmaz, çünkü model belirli bir koşula bağlıdır ve kaynak koşulun
sınanma ölçütünü vermez.[^k1] Seriler
[Nüfus artış hızı, 1950–2023](/veri/nufus-artis-hizi/) ve
[Buğday verimi, 1961–2024](/veri/tarimsal-verim/) dosyalarında ele alınıyor.

## Bu harita hakem değildir

Atlas üç pozisyondan hiçbirini benimsemez.
