---
id: veri-demokrasi-endeksi
tip: veri
baslik: Seçimsel demokrasi endeksi, 1789–2025
ozet: >-
  Endeks 1789'da 0,0527, 2012'de en yüksek değeri 0,528 ve 2025'te 0,4828; seri
  bir uzman değerlendirmesinin sayıya çevrilmiş halidir.
tarih_baslangic: "1789"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [siyasi]
guven_geneli: tartismali
etiketler: [demokrasi, endeks, uzman-degerlendirmesi, owid, vdem]
ilgili:
  - kavram-mesruiyet
  - kavram-ulus-devlet
  - veri-okuryazarlik-1475-2023
  - tartisma-tarihsel-sayilar-nasil-okunur
okuma_onerisi: []
veri_dosyasi: veri-setleri/demokrasi-endeksi.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: endeks değeri (0–1)
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Electoral democracy index (CSV verisi)"
    url: https://ourworldindata.org/grapher/electoral-democracy-index.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "electdem_vdem__estimate_best"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/demokrasi-endeksi.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Olcek karsilastirmasi icin gereken toplam"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - V-Dem Institute"
    url: https://en.wikipedia.org/wiki/V-Dem_Institute
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "V-Dem"
    not: "Bagimsiz alan adi (Ilke 6); endeksi ureten kurum"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Bu incelemenin taşıdığı sayılar bir sayım değil, bir değerlendirmedir: sütun adı
tahmin sözcüğünü içerir.[^k1]

## Sütun adı bir tahmin olduğunu söylüyor

Sağlayıcının sütun adı `electdem_vdem__estimate_best` biçimindedir; adın kendisi
değerin en iyi tahmin olduğunu kaydeder.[^k1]

::tartismali[Bu seri ölçülmüş bir büyüklük değil, kodlayıcı değerlendirmelerinden türetilmiş bir tahmindir. Korpus onu ölçüm gibi aktarmaz.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Bir değerin adında tahmin sözcüğünün bulunması,[^k1] korpusun şu kuralının
dayanağıdır: endeks değerleri, üretim yöntemi yazılmadan aktarılmaz. Okuma
yöntemi
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Seri iki yüz otuz yedi yıl kapsıyor

Sağlayıcının toplam satırında endeks 1789'da 0,0527, 1900'de 0,1422, 1945'te
0,1591, 1989'da 0,3602, 2000'de 0,4905 ve 2025'te 0,4828'dir.[^k1]

Serinin en yüksek değeri 2012'de 0,528'dir; 2025 değeri bunun altındadır.[^k1]
Zirvenin serinin sonunda değil ortasında bulunması,[^k1] "demokrasi sürekli
yayıldı" cümlesinin bu seriden çıkarılamayacağını gösterir.

## Endeksi üreten kurum

Endeksi üreten kurum için tutulan kayıt, onu İsveç'teki Göteborg
Üniversitesi'nde bulunan bağımsız bir araştırma enstitüsü olarak tanımlar ve
demokrasinin doğasını ölçmeye yönelik veri ürettiğini yazar.[^k3]

Bir endeksin belirli bir üniversitedeki belirli bir enstitüye bağlanabilmesi,[^k3]
değerlerin kurumsal bir yöntem tercihinin ürünü olduğunu gösterir; meşruiyetin
kendisi [Meşruiyet](/kavram/mesruiyet/) dosyasında ele alınıyor.

## Ölçek

Uzun dönemli seride dünya nüfusu 1790'da yaklaşık 942,3 milyon, 2025'te yaklaşık
8,23 milyardır.[^k2] Endeks bir orandır ve nüfusla ağırlıklandırılmamıştır; bu
dosyada nüfusa göre yeniden hesaplama yapılmamıştır.[^k1]

## Kanıtın ve kapsamın sınırı
Ülke dağılımı, rejim türleri ve endeksin alt bileşenleri burada ele
alınmamıştır; bu inceleme tek bir sütunun yıl bazlı değerlerini taşır.[^k1]
