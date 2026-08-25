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
    ad: "Wikipedia (EN) - Industrial Revolution"
    url: https://en.wikipedia.org/wiki/Industrial_Revolution
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Industrial Revolution"
    not: "Kentlesmenin siklikla baglandigi donusum; bagimsiz alan adi"
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
için yaklaşık 7,84 milyardır.[^k2]

Atlas bu iki kümeyi çarpmaz: kentleşme payı ülke ülke verilir, nüfus serisi ise
dünya toplamını verir; kapsamları aynı değildir.[^k1][^k2]

## Sıklıkla bağlandığı dönüşüm

Kentleşmenin sıklıkla bağlandığı dönüşüm için ayrı bir kayıt tutulur.[^k3] O
dönüşüm [Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasında ele alınıyor.

Atlas iki kayıt arasında bir neden bağı kurmaz; kullanılan kaynak bölümlerinde
böyle bir bağ belirtilmemiştir.[^k1][^k3]

## Bu dosyanın sınırı

Kentleşmenin nedenleri, ülke ülke seyri ve kentsel tanımların ülkeler arasındaki
farkı burada ayrı başlıklar altında ele alınmamıştır; kullanılan kaynak veri
kümesidir, bir anlatı değildir.[^k1]
