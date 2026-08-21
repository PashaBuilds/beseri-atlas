---
id: veri-co2-emisyonu
tip: veri
baslik: Yıllık CO2 emisyonu, 1750–2024
ozet: >-
  1750'de yaklaşık 9,3 milyon ton, 2024'te yaklaşık 38,6 milyar ton — dört bin
  kattan fazla; seri Sanayi Devrimi'nden önce başlıyor.
tarih_baslangic: "1750"
tarih_bitis: "2024"
bolge: [kuresel]
eksen: [ekonomik, demografik]
guven_geneli: yaygin
etiketler: [co2, emisyon, sanayi-devrimi, yogun-seri, owid]
ilgili:
  - veri-enerji-tuketimi-1800-2023
  - olay-sanayi-devrimi
  - olay-paris-iklim-anlasmasi
  - veri-fosil-elektrik-payi
okuma_onerisi: []
veri_dosyasi: veri-setleri/co2-emisyonu.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: ton
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Annual CO2 emissions (CSV verisi)"
    url: https://ourworldindata.org/grapher/annual-co2-emissions-per-country.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "emissions_total"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/co2-emisyonu.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Energy mix, total primary energy (CSV verisi)"
    url: https://ourworldindata.org/grapher/energy-mix.csv?metric=total&source=total&csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "energy"
    not: "Ayni saglayicinin iliskili serisi"
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

Seri 1750'de 9.305.937 ton ile başlar ve 2024'te 38.598.580.000 ton ile
biter.[^k1]

## Seri sanayileşmeden önce başlar

Veri kümesinde dünya toplamı için ilk gözlem 1750 yılına aittir.[^k1]

Bir emisyon serisinin sanayileşmenin yaygın olarak tarihlendiği dönemden önce
başlaması,[^k1] atlasın şu kuralının dayanağıdır: bu dosyadan okunan değerler bir
başlangıç noktası iddiası taşımaz; seri yalnızca kayıt başlangıcını gösterir.
İlgili dönüşüm
[Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasında ele alınıyor.[^k3]

## İlişkili seri aynı yönü gösterir

Aynı sağlayıcının birincil enerji serisinde dünya değeri 1800 için 97 TWh, 2025
için 166.753,6 TWh'dir.[^k2]

İki serinin aynı yönde ve benzer büyüklükte artması,[^k1][^k2] atlasın bunları
tek bir nedene bağlamasını gerektirmez; iki ölçü farklı birimlerde farklı
şeyleri ölçer. İlişkili dosya
[Birincil enerji tüketimi, 1800–2025](/veri/enerji-tuketimi-1800-2023/)
dosyasıdır.

## Ölçünün kapsamı bir karardır

Serinin sütun adı toplam emisyonu verir; hangi kaynakların (fosil yakıt, çimento,
arazi kullanımı) sayıldığı ölçünün tanımına bağlıdır.[^k1]

Atlasın kuralı şudur: bu seriden okunan değerler, hangi kaynakların dâhil
edildiği belirtilmeden aktarılmaz.[^k1] İlgili anlaşma
[Paris İklim Anlaşması](/olay/paris-iklim-anlasmasi/) dosyasında ele alınıyor.

## Bu dosyanın sınırı

Ülke ülke emisyonlar, kişi başına değerler ve kaynak kırılımı burada ayrı
başlıklar altında ele alınmamıştır; bu dosya yalnızca dünya toplamı serisini
kaydeder.[^k1]
