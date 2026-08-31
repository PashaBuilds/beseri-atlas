---
id: veri-kuresel-esitsizlik
tip: veri
baslik: Küresel gelir eşitsizliği, 1820–2024
ozet: >-
  Gini katsayısı 1820'de 0,5909, 2000'de 0,7144, 2024'te 0,6769; seri iki yüz yıl
  boyunca tek yönlü ilerlemiyor.
tarih_baslangic: "1820"
tarih_bitis: "2024"
bolge: [kuresel]
eksen: [ekonomik, demografik]
guven_geneli: tartismali
etiketler: [esitsizlik, gini, veri-seti, owid, vergi-oncesi]
ilgili:
  - kavram-gini-katsayisi
  - veri-kisi-basi-gsyh-1-2022
  - veri-yoksulluk-orani
  - tartisma-somurgeciligin-ekonomik-bilancosu
okuma_onerisi: []
veri_dosyasi: veri-setleri/kuresel-esitsizlik.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: Gini katsayısı (0–1)
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Gini coefficient (WID) (CSV verisi)"
    url: https://ourworldindata.org/grapher/gini-coefficient-wid.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "welfare_type_before_tax"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/kuresel-esitsizlik.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Share of population in extreme poverty (CSV verisi)"
    url: https://ourworldindata.org/grapher/share-of-population-in-extreme-poverty.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "headcount_ratio"
    not: "Ayni yillar icin baska bir esitsizlik olcusu degil, yoksulluk olcusu"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Gini coefficient"
    url: https://en.wikipedia.org/wiki/Gini_coefficient
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Gini coefficient"
    not: "Bagimsiz alan adi (Ilke 6); olcunun tanimi ve sinirlari"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---
## Seri iki yüzyıl kapsıyor

Sağlayıcının toplam satırında Gini katsayısı 1820'de 0,5909, 1900'de 0,6917,
1950'de 0,654, 1980'de 0,6895, 2000'de 0,7144 ve 2024'te 0,6769'dur.[^k1]

Serinin 1900'den 1950'ye düşüp 1950'den 2000'e yükselmesi ve sonra yeniden
düşmesi,[^k1] iki yüz yıllık bir eğilim cümlesi kurmayı engeller: hangi iki yıl
seçilirse o yönde bir cümle kurulabilir.

::tartismali[Aynı seriden "eşitsizlik arttı" da "eşitsizlik azaldı" da çıkarılabilir.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Okuma yöntemi
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Sütun adı bir tanım taşır

Sağlayıcının sütun adı ölçünün vergi öncesi refah türüne dayandığını
kaydeder.[^k1]

## Ölçünün kendi sınırları

Ölçü için tutulan kayıt, onu bir ulusun ya da toplumsal grubun gelir ya da
servet eşitsizliğinin ölçüsü olarak tanımlar ve İtalyan istatistikçi Corrado
Gini'ye bağlar.[^k3]

Aynı kayıt, katsayının 0 ile 1 arasında değer aldığını ve 0'ın tam eşitliği
gösterdiğini yazar.[^k3] Bir ölçünün adını taşıdığı kişiye bağlanabilmesi,[^k3]
ölçünün doğal bir büyüklük değil bir tasarım olduğunu gösterir; kavram
[Gini katsayısı](/kavram/gini-katsayisi/) dosyasında ele alınıyor.

## Aynı yıllarda başka bir ölçü

Aşırı yoksulluk oranı serisinde dünya değeri 1990'da yaklaşık yüzde 43,41,
2000'de yaklaşık yüzde 36,20, 2010'da yaklaşık yüzde 20,98'dir.[^k2]

Yoksulluk oranının bu yıllarda düşerken Gini katsayısının 2000'de en yüksek
değerine ulaşması,[^k1][^k2] iki ölçünün aynı şeyi ölçmediğini gösterir: biri
alt eşiğin altındakilerin payını, diğeri dağılımın bütününü özetler. Yoksulluk
serisi [Aşırı yoksulluk oranı](/veri/yoksulluk-orani/) dosyasında ele alınıyor.
