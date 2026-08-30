---
id: veri-yoksulluk-orani
tip: veri
baslik: Aşırı yoksulluk oranı, 1990–2026
ozet: >-
  1990'da yüzde 43,41, 2026'da yüzde 9,98; sütun adı yoksulluk sınırını ve
  satın alma gücü paritesi sürümünü birlikte taşıyor.
tarih_baslangic: "1990"
tarih_bitis: "2026"
bolge: [kuresel]
eksen: [ekonomik, demografik]
guven_geneli: tartismali
etiketler: [yoksulluk, yoksulluk-siniri, ppp, esik, owid]
ilgili:
  - kavram-gini-katsayisi
  - veri-kisi-basi-gsyh-1-2022
  - kavram-bagimlilik-kurami
  - tartisma-kalkinma-yardimi-ise-yariyor-mu
  - veri-kuresel-esitsizlik
  - tartisma-kalkinma-neden-basarisiz
okuma_onerisi: []
veri_dosyasi: veri-setleri/yoksulluk-orani.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yüzde
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Share of population in extreme poverty (CSV verisi)"
    url: https://ourworldindata.org/grapher/share-of-population-in-extreme-poverty.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "headcount_ratio"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/yoksulluk-orani.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - GDP per capita (Maddison Project Database, CSV verisi)"
    url: https://ourworldindata.org/grapher/gdp-per-capita-maddison-project-database.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "gdp_per_capita"
    not: "Ayni saglayicinin iliskili serisi"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Gini coefficient"
    url: https://en.wikipedia.org/wiki/Gini_coefficient
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Gini coefficient"
    not: "Bagimsiz alan adi (Ilke 6); dagilim olcusu"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1990'da yüzde 43,41358244419098 ile başlar ve 2026'da yüzde
9,975934773683548 ile biter.[^k1]

## Sütun adı eşiği ve sürümü birlikte taşır

Veri kümesinin sütun adı, sayım oranını satın alma gücü paritesinin 2021
sürümüyle ve belirli bir yoksulluk sınırıyla birlikte tanımlar; ayrıca refah
türünün gelir ya da tüketim olduğunu ve anket karşılaştırılabilirliğine dair bir
kaydı içerir.[^k1]

::tartismali[Ölçünün adı tek başına altı ayrı karar taşıyor: eşik, parite sürümü, refah türü, tablo, anket karşılaştırılabilirliği ve sayım yöntemi. Bu kararlardan biri değişince oran da değişir. Korpus bu seriden okunan değerleri eşik belirtilmeden aktarmaz.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Sayıların nasıl okunacağı
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Seri 1990'dan önce yoktur

Veri kümesinde dünya toplamı için 1990'dan önce gözlem bulunmaz.[^k1]

Bir yoksulluk serisinin yalnızca son otuz beş yılı kapsaması,[^k1] korpusun şu
kuralının dayanağıdır: bu incelemeden sanayi öncesi ya da sömürge dönemine dair bir
yoksulluk oranı okunamaz. İlgili kuram
[Bağımlılık kuramı](/kavram/bagimlilik-kurami/) dosyasında ele alınıyor.

## İlişkili seri

Aynı sağlayıcının kişi başına GSYH serisinde dünya değeri 1820 için 1.127,73,
2022 için 16.676,75'tir.[^k2]

Bir ortalama ile bir dağılım ölçüsünün aynı yıl için farklı şeyler
söyleyebilmesi,[^k1][^k2] korpusun bu iki seriyi ayrı dosyalarda tutmasının
dayanağıdır; ilişkili dosyalar
[Kişi başına GSYH, 1820–2022](/veri/kisi-basi-gsyh-1-2022/) ve
[Gini katsayısı](/kavram/gini-katsayisi/) dosyalarıdır.[^k3]

## Kanıtın ve kapsamın sınırı
Ülke ülke oranlar, eşik seçiminin etkisi ve anket yöntemleri burada ayrı
başlıklar altında ele alınmamıştır; bu inceleme yalnızca dünya toplamı serisini
kaydeder.[^k1]
