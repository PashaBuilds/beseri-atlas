---
id: veri-kentli-nufus-sayisi
tip: veri
baslik: Kentsel nüfus payı, MÖ 10000–2025
ozet: >-
  MÖ 10000'de sıfır, 2025'te yüzde 57,83; seri on iki bin yılı 128 gözlemle
  kapsıyor ve ilk on bin yılı tek bir değerle temsil ediliyor.
tarih_baslangic: "-10000"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [demografik, ekonomik]
guven_geneli: tartismali
etiketler: [kentsel-pay, uzun-seri, seyreklik, sifir-degeri, owid]
ilgili:
  - kavram-kentlesme
  - veri-kentlesme-orani-1500-2023
  - olay-neolitik-devrim
okuma_onerisi: []
veri_dosyasi: veri-setleri/kentli-nufus-sayisi.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yüzde
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Urban population share, long run (CSV verisi)"
    url: https://ourworldindata.org/grapher/urban-population-share-2050.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "urban"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/kentli-nufus-sayisi.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Ayni uzunlukta baska bir seri"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Writing system"
    url: https://en.wikipedia.org/wiki/Writing_system
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Writing system"
    not: "Bagimsiz alan adi (Ilke 6); kentlesmeyle ayni donemde kaydedilen olgu"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri MÖ 10000'de 0 ile başlar ve 2025'te yüzde 57,8335 ile biter.[^k1]

## Sıfır bir ölçüm değil bir varsayımdır

::tartismali[Serinin ilk değeri MÖ 10000 için sıfırdır. Bu bir sayım sonucu değil, kentin henüz var olmadığı varsayımının sayıya çevrilmiş hâlidir. Atlas bu değeri bir ölçüm olarak aktarmaz.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Sayıların nasıl okunacağı
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Aynı olgu için iki ayrı seri vardır

Atlasın bir başka dosyası aynı olguyu 1950'den başlayan ve tahmin türü ayrıca
belirtilmiş bir seriyle kaydeder; o serinin 1950 değeri yüzde 28,7983'tür.[^k1]

Aynı olgu için biri on iki bin yılı, diğeri yetmiş beş yılı kapsayan iki ayrı
kümenin bulunması,[^k1] atlasın şu kuralının dayanağıdır: bir kentleşme değeri
aktarılırken hangi kümeden okunduğu belirtilir. Kısa seri
[Kentleşme oranı, 1950–2025](/veri/kentlesme-orani-1500-2023/) dosyasında,
kavram ise [Kentleşme](/kavram/kentlesme/) dosyasında ele alınıyor.

## Aynı uzunlukta başka bir seri

Uzun dönemli nüfus serisi de benzer bir aralığı kapsar; o seride dünya nüfusu MÖ
10000 için yaklaşık 4,5 milyon, 2020 için yaklaşık 7,89 milyardır.[^k2]

İki uzun serinin de erken bölümlerinin seyrek olması,[^k1][^k2] atlasın tarih
öncesi dönem dosyalarında sayı kullanırken neden çekince koyduğunun
dayanağıdır.

## Aynı dönemde kaydedilen başka bir olgu

Kentleşmeyle yakın dönemlerde kaydedilen bir başka olgu için tutulan kayıt, yazı
sistemlerini iki ayrı ölçüte göre sınıflandırır.[^k3] O kavram
[Yazı sistemi](/kavram/yazi-sistemi/) dosyasında, dönemin dönüşümü ise
[Neolitik Devrim](/olay/neolitik-devrim/) dosyasında ele alınıyor.

## Bu dosyanın sınırı

Kentin tanımı, bölge bölge oranlar ve erken dönem tahmin yöntemleri burada ayrı
başlıklar altında ele alınmamıştır; bu dosya yalnızca dünya toplamı serisini
kaydeder.[^k1]
