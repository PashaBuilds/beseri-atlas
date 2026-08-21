---
id: veri-savas-olumleri
tip: veri
baslik: Silahlı çatışma ölümleri, 1989–2025
ozet: >-
  Sağlayıcı aynı yıl için yüksek, merkezî ve düşük olmak üzere üç ayrı tahmin
  sütunu tutar; bu dosya yalnızca yüksek tahmini taşır.
tarih_baslangic: "1989"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [askeri, demografik]
guven_geneli: tartismali
etiketler: [savas-olumleri, veri-seti, tahmin-araligi, owid, belirsizlik]
ilgili:
  - veri-askeri-harcama
  - tartisma-tarihsel-sayilar-nasil-okunur
  - kavram-topyekun-savas
  - kavram-caydiricilik
  - veri-savas-kayiplari-1800-2023
  - tartisma-soykirim-kavrami
okuma_onerisi: []
veri_dosyasi: veri-setleri/savas-olumleri.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yıl başına ölüm sayısı (yüksek tahmin)
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Deaths in armed conflicts (CSV verisi)"
    url: https://ourworldindata.org/grapher/deaths-in-armed-conflicts.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "number_deaths_ongoing_conflicts"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/savas-olumleri.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Kisi basi hesap icin gereken toplam"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Rwandan genocide"
    url: https://en.wikipedia.org/wiki/Rwandan_genocide
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Rwandan genocide"
    not: "Serinin en yuksek yilinin adlandirildigi olay; bagimsiz sayfa"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Bu dosyanın ilk özelliği bir sayı değil, bir sütun sayısıdır: sağlayıcının aynı
yıl için tuttuğu tahmin sayısı birden fazladır.[^k1]

## Sağlayıcı üç tahmin tutar

Sağlayıcının uç noktası, yıl sütunundan sonra üç ayrı ölüm sütunu taşır:
`number_deaths_ongoing_conflicts_high__conflict_type_all`,
`number_deaths_ongoing_conflicts__conflict_type_all` ve
`number_deaths_ongoing_conflicts_low__conflict_type_all`.[^k1]

::tartismali[Aynı yıl için üç ayrı sayı bulunuyor. Tek bir sayı vermek bir ölçüm değil bir seçimdir; bu dosya yüksek tahmini seçtiğini başlığında yazar.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Bir sağlayıcının aynı olgu için alt ve üst sınır tutması,[^k1] atlasın şu
kuralının dayanağıdır: bir savaş ölüm sayısı, hangi tahmin sütunundan alındığı
belirtilmeden aktarılamaz. Okuma yöntemi
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Serinin sınırları

Sağlayıcının toplam satırında seri 1989'da başlar ve 2025'te biter; 1989 değeri
108.225, 2025 değeri 350.592'dir.[^k1]

Serinin 1989'dan önce hiçbir değer taşımaması,[^k1] bu dosyanın "savaş ölümleri
tarih boyunca azaldı mı" sorusuna cevap veremeyeceğini gösterir: veri, sorunun
kapsadığı dönemin çok küçük bir bölümünü ölçer.

## En yüksek ve en düşük yıllar

Serinin en yüksek değeri 1994'te 1.701.127, en düşük değeri ise 2005'te
24.844'tür.[^k1] Aradaki fark yaklaşık altmış sekiz kattır.

Tek bir yılın komşularının onlarca katı olması,[^k1] bu serinin ortalamayla
özetlenmesini yanıltıcı kılar; bir ortalama, 1994'ü de 2005'i de temsil etmez.

## En yüksek yılın adı

Serinin en yüksek yılını taşıyan olay için tutulan kayıt, olayı 7 Nisan – 19
Temmuz 1994 tarihleri arasına yerleştirir ve ölü sayısını yaklaşık 500.000 ile
800.000 arasında verir.[^k3]

İki kaynağın aynı yıl için farklı büyüklükler vermesi,[^k1][^k3] tesadüf değil
tanım farkıdır: biri dünya genelindeki tüm süregelen çatışmaları, diğeri tek bir
ülkedeki tek bir olayı sayar. Savaşın kendisinin kavram olarak sınırı
[Topyekûn savaş](/kavram/topyekun-savas/) dosyasında ele alınıyor.

## Ölçek

Uzun dönemli seride dünya nüfusu 1994'te yaklaşık 5,68 milyar, 2025'te yaklaşık
8,23 milyardır.[^k2] Kişi başı bir oran burada hesaplanmamıştır: yüksek tahmin
ile merkezî tahmin arasındaki fark, oranın kendisinden büyüktür.[^k1]

## Bu dosyanın sınırı

Çatışma türleri, bölge dağılımı, dolaylı ölümler ve sivil–asker ayrımı burada
ele alınmamıştır; bu dosya yalnızca tek bir sütunun yıl bazlı değerlerini
taşır. Askerî harcama serisi
[Askerî harcama, 1988–2025](/veri/askeri-harcama/) dosyasında ele alınıyor.
