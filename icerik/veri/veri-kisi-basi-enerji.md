---
id: veri-kisi-basi-enerji
tip: veri
baslik: Kişi başına enerji arzı, 1800–2025
ozet: >-
  1800'de 98,67 kWh, 2025'te 20.257,71 kWh; toplam enerji serisiyle aynı yılları
  kapsıyor ama farklı bir soruya cevap veriyor.
tarih_baslangic: "1800"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [ekonomik, demografik]
guven_geneli: yaygin
etiketler: [enerji, kisi-basi, toplam-fark, owid, birim]
ilgili:
  - veri-enerji-tuketimi-1800-2023
  - veri-dunya-nufusu-1500-2025
  - veri-fosil-elektrik-payi
baglam:
  - olay-sanayi-devrimi
okuma_onerisi: []
veri_dosyasi: veri-setleri/kisi-basi-enerji.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: kWh
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Per capita energy use (CSV verisi)"
    url: https://ourworldindata.org/grapher/per-capita-energy-use.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "total_energy_supply_per_capita_kwh"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/kisi-basi-enerji.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Energy mix, total primary energy (CSV verisi)"
    url: https://ourworldindata.org/grapher/energy-mix.csv?metric=total&source=total&csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "energy"
    not: "Ayni olgunun toplam bicimi"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Industrial Revolution"
    url: https://en.wikipedia.org/wiki/Industrial_Revolution
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Industrial Revolution"
    not: "Bagimsiz alan adi (Ilke 6); serinin baslangicina denk gelen donusum"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1800'de 98,667 kWh ile başlar ve 2025'te 20.257,705 kWh ile biter.[^k1]

## Aynı olgunun iki biçimi ayrı dosyalardadır

Aynı sağlayıcının toplam birincil enerji serisinde uç değerler 1800 için 97 TWh
ve 2025 için 166.753,6 TWh'dir.[^k2]

Toplam yaklaşık bin yediyüz kat artarken kişi başına değerin yaklaşık iki yüz kat
artması,[^k1][^k2] iki ölçünün farklı soruları cevapladığını gösterir: biri
ne kadar enerji kullanıldığını, diğeri kişi başına ne düştüğünü verir. Korpus
bunları ayrı dosyalarda tutar; toplam biçim
[Birincil enerji tüketimi, 1800–2025](/veri/enerji-tuketimi-1800-2023/)
dosyasındadır.

## Kişi başı hesap sağlayıcı tarafından yapılmıştır

Bu seri sağlayıcının kendi hesabıdır; korpus iki seriyi bölerek kendi kişi başı
değerini üretmez.[^k1][^k2]

Bu, korpusun diğer veri dosyalarında koyduğu kuralın karşılığıdır: kaynak bir
oranı kendisi veriyorsa o kullanılır, vermiyorsa korpus türetmez.

## Birim bir dönüştürme kararıdır

Serinin birimi kilovatsaattir; farklı enerji kaynaklarının ortak bir birime
çevrilmesi bir dönüştürme kararıdır ve dönüştürme katsayısı bu incelemede
verilmez.[^k1]

Korpusun kuralı şudur: bu seriden okunan değerler, birimin ne olduğu belirtilmeden
aktarılmaz.

## Serinin başlangıcına denk gelen dönüşüm

Serinin başlangıç yıllarına denk gelen dönüşüm için tutulan kayıt, o dönüşümü
ayrı bir madde olarak işler.[^k3] O dönüşüm
[Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasında ele alınıyor.

## Kanıtın ve kapsamın sınırı
Ülke ülke değerler, enerji kaynağı kırılımı ve dönüştürme yöntemi burada ayrı
başlıklar altında ele alınmamıştır; bu inceleme yalnızca sağlayıcının toplam
satırını kaydeder.[^k1]
