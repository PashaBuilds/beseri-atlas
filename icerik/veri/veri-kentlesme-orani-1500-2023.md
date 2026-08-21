---
id: veri-kentlesme-orani-1500-2023
tip: veri
baslik: Kentleşme oranı, 1950–2025
ozet: >-
  1950'de yüzde 28,80, 2025'te yüzde 57,83 — ve serinin 1950'den önce hiç
  gözlem içermemesi.
tarih_baslangic: "1950"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [demografik, ekonomik]
guven_geneli: yaygin
etiketler: [kentlesme, veri-seti, baslangic-yili, owid, tahmin]
ilgili:
  - kavram-kentlesme
  - veri-dunya-nufusu-1500-2025
  - olay-nufus-patlamasi
okuma_onerisi: []
veri_dosyasi: veri-setleri/kentlesme-orani.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yüzde
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Share of population living in urban areas (CSV verisi)"
    url: https://ourworldindata.org/grapher/share-of-population-urban.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "share__area_type_urban__data_type_estimates"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/kentlesme-orani.LISANS.md"
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
    not: "Bagimsiz alan adi (Ilke 6); kentlesmenin siklikla baglandigi donusum"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1950'de yüzde 28,7983 ile başlar ve 2025'te yüzde 57,8335 ile biter; toplam
76 gözlem vardır.[^k1]

## Başlık ile veri arasındaki fark kayıtlıdır

Bu dosyanın kimliği 1500'den başlayan bir aralığı adlandırır, ancak veri
kümesinde 1950'den önce dünya toplamı için gözlem yoktur.[^k1]

Atlas bu farkı gizlemez: dosya başlığı serinin gerçek aralığını taşır ve kimlik
alanı plandaki adıyla kalır. Veri kümesinin kapsamadığı yıllar için bu dosyadan
bir değer okunamaz.[^k1]

## Sütun adı ölçüm türünü taşır

Veri kümesinin sütun adı hem alan türünü hem veri türünü belirtir: kentsel alan
türü için pay, veri türü tahminler.[^k1]

Bir ölçünün adında tahmin olduğunun yazması,[^k1] atlasın şu kuralının
dayanağıdır: bu seriden okunan değerler ölçüm değil tahmindir ve öyle aktarılır.

## Yarıyı aşma noktası seride görünür

Seri 1950'de yüzde 28,80'den 2025'te yüzde 57,83'e çıkar; yani aralığın içinde
bir noktada yüzde 50 eşiği aşılmıştır.[^k1]

Atlas bu eşiğin hangi yılda aşıldığını burada tek bir yıl olarak yazmaz; veri
kümesindeki yıllık değerler eşiğin etrafında yakın seyreder ve kesin yıl seçimi
yuvarlama kararına bağlıdır.[^k1]

## Payın üzerine uygulanacağı toplam

Uzun dönemli nüfus serisinde dünya nüfusu 1950 için yaklaşık 2,49 milyar, 2020
için yaklaşık 7,84 milyardır.[^k2]

Atlas iki seriyi çarparak kentsel nüfus sayısı üretmez; iki kümenin yıl kapsamı
ve tahmin yöntemi aynı değildir.[^k1][^k2] Nüfus serisi
[Dünya nüfusu, 1500–2025](/veri/dunya-nufusu-1500-2025/) dosyasında ele alınıyor.

## Sıklıkla bağlanan dönüşüm

Kentleşmenin sıklıkla bağlandığı dönüşüm için tutulan kayıt, o dönüşümü ayrı bir
madde olarak işler.[^k3] O dönüşüm
[Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasında ele alınıyor.

Atlas iki kayıt arasında bir neden bağı kurmaz; kullanılan kaynak bölümlerinde
böyle bir bağ belirtilmemiştir.[^k1][^k3] Kavramın kendisi
[Kentleşme](/kavram/kentlesme/) dosyasında ele alınıyor.

## Bu dosyanın sınırı

Ülke ülke oranlar, kentsel tanımların ülkeler arasındaki farkı ve 1950 öncesi
tahminler burada ayrı başlıklar altında ele alınmamıştır; bu dosya yalnızca dünya
toplamı serisini kaydeder.[^k1]
