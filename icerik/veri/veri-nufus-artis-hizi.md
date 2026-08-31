---
id: veri-nufus-artis-hizi
tip: veri
baslik: Nüfus artış hızı, 1950–2023
ozet: >-
  1950'de yüzde 1,738, 2023'te yüzde 0,871 — nüfus artarken artış hızının
  yarıya düşmesi.
tarih_baslangic: "1950"
tarih_bitis: "2023"
bolge: [kuresel]
eksen: [demografik]
guven_geneli: yaygin
etiketler: [nufus-artisi, hiz, tahmin-projeksiyon, owid, ayrim]
ilgili:
  - veri-dunya-nufusu-1500-2025
  - veri-dogurganlik-hizi-1950-2023
  - kavram-demografik-gecis
  - kaynak-malthus-nufus
  - tartisma-nufus-artisi-tehdit-mi
  - tartisma-demografik-donum-sonuclari
okuma_onerisi: []
veri_dosyasi: veri-setleri/nufus-artis-hizi.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yüzde
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Population growth rates (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-growth-rates.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "growth_rate"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/nufus-artis-hizi.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Hizin uzerine uygulandigi seri"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Thomas Robert Malthus"
    url: https://en.wikipedia.org/wiki/Thomas_Robert_Malthus
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Malthus"
    not: "Bagimsiz alan adi (Ilke 6); artis modeli"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---
Seri 1950'de yüzde 1,738 ile başlar ve 2023'te yüzde 0,871 ile biter.[^k1]

## Veri kümesi tahmin ile projeksiyonu ayrı sütunlarda tutar

Veri kümesinin sütun adları iki ayrı seriyi taşır: biri tahminler, diğeri orta
varyant projeksiyonu.[^k1]

Böylece dosyadan okunan hiçbir değer bir öngörü değildir.

## Artış hızı düşerken nüfus artmaya devam eder

Aynı sağlayıcının uzun dönemli nüfus serisinde dünya nüfusu 1950 için yaklaşık
2,49 milyar, 2020 için yaklaşık 7,89 milyardır.[^k2]

Nüfus serisi [Dünya nüfusu, 1500–2025](/veri/dunya-nufusu-1500-2025/) dosyasında,
doğurganlık tarafı ise [Doğurganlık hızı, 1950–2023](/veri/dogurganlik-hizi-1950-2023/)
dosyasında ele alınıyor.

## Artış modeli

Nüfus artışı üzerine bir model için tutulan kayıt, nüfus artışının potansiyel
olarak üstel, gıda arzının büyümesinin ise doğrusal olduğunu öne süren bir kuramı
anlatır.[^k3] O model
[Thomas Malthus](/dusunur/malthus/) dosyasında, kuramsal çerçeve ise
[Demografik geçiş](/kavram/demografik-gecis/) dosyasında ele alınıyor.
