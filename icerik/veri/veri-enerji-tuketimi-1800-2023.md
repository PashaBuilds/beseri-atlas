---
id: veri-enerji-tuketimi-1800-2023
tip: veri
baslik: Birincil enerji tüketimi, 1800–2025
ozet: >-
  1800'de 97 TWh, 2025'te 166.753,6 TWh — bin yediyüz kattan fazla; serinin
  kendisi bir büyüklük sıçraması kaydıdır.
tarih_baslangic: "1800"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [ekonomik, demografik]
guven_geneli: yaygin
etiketler: [enerji, twh, sicrama, sanayi-devrimi, owid]
ilgili:
  - olay-sanayi-devrimi
  - kavram-buyuk-ayrisma
  - veri-dunya-nufusu-1500-2025
okuma_onerisi: []
veri_dosyasi: veri-setleri/enerji-tuketimi.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: TWh
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Energy mix, total primary energy (CSV verisi)"
    url: https://ourworldindata.org/grapher/energy-mix.csv?metric=total&source=total&csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "energy"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/enerji-tuketimi.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Kisi basi hesap icin gereken toplam"
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

Seri 1800'de 97 TWh ile başlar ve 2025'te 166.753,6 TWh ile biter; toplam 78
gözlem vardır.[^k1]

## Artış oranı diğer serilerden farklıdır

Serinin ilk ve son değeri arasındaki oran, atlasın diğer veri dosyalarında
kaydedilen artışların hiçbirine benzemez: nüfus yaklaşık sekiz, okuryazarlık
yaklaşık yedi kat artarken bu seri bin yediyüz katın üzerinde bir artış
gösterir.[^k1][^k2]

Atlas bu farkı bir açıklamayla değil bir uyarıyla kaydeder: dört serinin aynı
grafikte gösterilmesi, ölçek farkı nedeniyle üçünü görünmez kılar.[^k1][^k2]

## Kişi başı hesap kaynakta yoktur

Uzun dönemli nüfus serisinde dünya nüfusu 1800 için yaklaşık 990,4 milyon, 2020
için yaklaşık 7,84 milyardır.[^k2]

Atlas iki seriyi bölerek kişi başına enerji tüketimi üretmez; iki kümenin gözlem
yılları aynı değildir ve böyle bir hesap kullanılan kaynak bölümlerinde
verilmemiştir.[^k1][^k2] Nüfus serisi
[Dünya nüfusu, 1500–2025](/veri/dunya-nufusu-1500-2025/) dosyasında ele alınıyor.

## Birincil enerji ne demektir

Serinin ölçtüğü şey birincil enerjidir; bu, dönüşüm kayıpları düşülmeden önceki
toplam enerji girdisidir ve son kullanıcıya ulaşan enerjiden farklıdır.[^k1]

Atlas bu ayrımı kaydeder çünkü iki ölçü aynı yıl için farklı sayılar verir; bu
dosyadan okunan değerler hangi ölçünün kullanıldığı belirtilmeden
aktarılmaz.[^k1]

## Serinin başlangıcına denk gelen dönüşüm

Serinin başlangıç yıllarına denk gelen dönüşüm için tutulan kayıt, o dönüşümü
ayrı bir madde olarak işler.[^k3] O dönüşüm
[Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasında, ilgili kavram ise
[Büyük Ayrışma](/kavram/buyuk-ayrisma/) dosyasında ele alınıyor.

Atlas iki kayıt arasında bir neden bağı kurmaz; kullanılan kaynak bölümlerinde
böyle bir bağ belirtilmemiştir.[^k1][^k3]

## Bu dosyanın sınırı

Enerji kaynaklarına göre dağılım, ülke ülke tüketim ve dönüşüm verimliliği
burada ayrı başlıklar altında ele alınmamıştır; bu dosya yalnızca dünya toplamı
serisini kaydeder.[^k1]
