---
id: veri-kisi-basi-gsyh-1-2022
tip: veri
baslik: Kişi başına GSYH, 1820–2022
ozet: >-
  Yirmi bir gözlem iki yüz yılı kapsıyor; 1820'de 1.127,73, 2022'de 16.676,75 —
  ve arada uzun boşluklar var.
tarih_baslangic: "1820"
tarih_bitis: "2022"
bolge: [kuresel]
eksen: [ekonomik]
guven_geneli: tartismali
etiketler: [gsyh, maddison, seyreklik, tahmin, karsilastirma]
ilgili:
  - kavram-buyuk-ayrisma
  - veri-dunya-nufusu-1500-2025
  - kaynak-pomeranz-buyuk-ayrisma
  - veri-yoksulluk-orani
  - veri-kuresel-esitsizlik
  - tartisma-1929-krizinin-nedeni
  - tartisma-kalkinma-neden-basarisiz
  - veri-ticaret-payi
  - kavram-satin-alma-gucu-paritesi
okuma_onerisi: []
veri_dosyasi: veri-setleri/kisi-basi-gsyh.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: uluslararası dolar
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - GDP per capita (Maddison Project Database, CSV verisi)"
    url: https://ourworldindata.org/grapher/gdp-per-capita-maddison-project-database.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "gdp_per_capita"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/kisi-basi-gsyh.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Ayni saglayicinin nufus serisi"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - The Great Divergence (book)"
    url: https://en.wikipedia.org/wiki/The_Great_Divergence_(book)
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "The Great Divergence"
    not: "Bagimsiz alan adi (Ilke 6); serinin tartisildigi tez"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1820'de 1.127,73 ile başlar ve 2022'de 16.676,75 ile biter; iki yüz iki yıl
için toplam 21 gözlem vardır.[^k1]

## Yirmi bir gözlem iki yüz yılı kapsar

Gözlem sayısının yıl sayısına oranı yaklaşık on yılda bir noktaya karşılık
gelir.[^k1]

::tartismali[Bu seri bir ölçüm dizisi değil, bir yeniden kurma projesidir. Aradaki yıllar için değer okunamaz ve iki gözlem arasında çizilen çizgi bir varsayımdır. Atlas bu seriden yıllık büyüme oranı türetmez.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Sayıların nasıl okunacağı
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Birim bir karşılaştırma kurgusudur

Serinin birimi uluslararası dolardır; bu birim, farklı ülkelerin ve farklı
yılların değerlerini karşılaştırılabilir kılmak için kurulmuş bir hesap
birimidir.[^k1]

Bir ölçünün biriminin doğrudan bir para birimi değil bir dönüştürme kurgusu
olması,[^k1] atlasın şu kuralının dayanağıdır: bu seriden okunan değerler,
birimin ne olduğu belirtilmeden aktarılmaz.

## Aynı sağlayıcının nüfus serisi

Aynı sağlayıcının uzun dönemli nüfus serisinde dünya nüfusu 1820 için yaklaşık
1,09 milyar, 2020 için yaklaşık 7,89 milyardır.[^k2]

Atlas iki seriyi çarparak toplam hasıla üretmez; iki kümenin gözlem yılları ve
yeniden kurma yöntemi aynı değildir.[^k1][^k2] Nüfus serisi
[Dünya nüfusu, 1500–2025](/veri/dunya-nufusu-1500-2025/) dosyasında ele alınıyor.

## Serinin tartışıldığı tez

Bu tür serilerin tartışıldığı bir tez için tutulan kayıt, Avrupa ve Asya'nın en
gelişmiş bölgelerinin 19. yüzyıl başında karşılaştırılabilir iktisadi gelişme
düzeylerine ulaştığını savunan bir kitabı anlatır.[^k3] O tez
[Pomeranz — Büyük Ayrışma](/kaynak/pomeranz-buyuk-ayrisma/) dosyasında, kavram
ise [Büyük Ayrışma](/kavram/buyuk-ayrisma/) dosyasında ele alınıyor.

Atlas bu seriyi o tezin kanıtı ya da çürütmesi olarak sunmaz: seri dünya
toplamını verir, tez ise bölgeler arası bir karşılaştırma yapar.[^k1][^k3]

## Bu dosyanın sınırı

Ülke ülke değerler, satın alma gücü düzeltmeleri ve yeniden kurma yöntemi burada
ayrı başlıklar altında ele alınmamıştır; bu dosya yalnızca dünya toplamı
serisini kaydeder.[^k1]
