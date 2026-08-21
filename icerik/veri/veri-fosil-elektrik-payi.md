---
id: veri-fosil-elektrik-payi
tip: veri
baslik: Elektrik üretiminde fosil yakıt payı, 1900–2025
ozet: >-
  Pay 1900'de yüzde 58,78, 2025'te yüzde 57,39; yüz yirmi beş yılın iki ucu
  birbirine yakın, arası değil.
tarih_baslangic: "1900"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [ekonomik, demografik]
guven_geneli: yaygin
etiketler: [enerji, elektrik, fosil-yakit, veri-seti, owid]
ilgili:
  - veri-enerji-tuketimi-1800-2023
  - veri-kisi-basi-enerji
  - veri-co2-emisyonu
  - tartisma-tarihsel-sayilar-nasil-okunur
okuma_onerisi: []
veri_dosyasi: veri-setleri/fosil-elektrik-payi.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yüzde
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Electricity mix, fossil share of generation (CSV verisi)"
    url: https://ourworldindata.org/grapher/electricity-mix.csv?frequency=annual&metric=share_of_generation&source=fossil&csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "fossil_share_of_electricity"
    not: "share-of-electricity-production-from-fossil-fuels adresi buraya yonlendiriyor; varilan adres yazildi"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Energy mix, total primary energy (CSV verisi)"
    url: https://ourworldindata.org/grapher/energy-mix.csv?metric=total&source=total&csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "energy"
    not: "Toplam tuketim; pay ile miktar ayri seylerdir"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Fossil fuel"
    url: https://en.wikipedia.org/wiki/Fossil_fuel
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Fossil fuel"
    not: "Bagimsiz alan adi (Ilke 6); olculen seyin tanimi"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Bu dosyanın gösterdiği şey bir eğilim değil, iki ucun benzerliğidir.

## İki uç birbirine yakın

Sağlayıcının toplam satırında pay 1900'de yaklaşık yüzde 58,78, 2025'te yaklaşık
yüzde 57,39'dur.[^k1]

::tartismali[Yalnızca ilk ve son yıla bakan biri "hiçbir şey değişmedi" sonucuna varır. Aradaki yıllar bunu yalanlar.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

İki uç değerin birbirine bu kadar yakın olması,[^k1] atlasın şu kuralının
dayanağıdır: bir seri iki uç değerle özetlenmez. Okuma yöntemi
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Ara yıllar başka bir şey söylüyor

Aynı seride pay 1918'de yaklaşık yüzde 52,88, 1950'de yaklaşık yüzde 64,35,
1973'te yaklaşık yüzde 75,13, 2000'de yaklaşık yüzde 64,66 ve 2010'da yaklaşık
yüzde 67,46'dır.[^k1]

Serinin en yüksek değeri 1973'te, en düşük değeri ise 1919'da yaklaşık yüzde
49,04 olarak kayıtlıdır.[^k1] Zirvenin serinin ortasında bulunması,[^k1] payın
tek yönlü hareket etmediğini gösterir.

## Pay ile miktar aynı şey değildir

Toplam birincil enerji tüketimi serisinde dünya değeri 1900'de yaklaşık 12.132
terawatt-saat, 2023'te yaklaşık 183.230 terawatt-saattir.[^k2]

Payın iki uçta neredeyse aynı kalmasına karşın toplam tüketimin bu ölçüde
artması,[^k1][^k2] oran ile miktarın ayrı ayrı okunması gerektiğini gösterir;
toplam seri
[Enerji tüketimi, 1800–2023](/veri/enerji-tuketimi-1800-2023/) dosyasında ele
alınıyor.

## Ölçülen şeyin tanımı

Ölçülen şey için tutulan kayıt, fosil yakıtı ölü organizmaların kalıntılarından
doğal süreçlerle oluşan bir hidrokarbon içerikli malzeme olarak tanımlar.[^k3]

Tanımın oluşum sürecine dayanması,[^k3] bu payın bir teknoloji ölçüsü değil bir
kaynak ölçüsü olduğunu gösterir.

## Bu dosyanın sınırı

Ülke dağılımı, yakıt türleri ve elektrik dışındaki enerji kullanımları burada
ele alınmamıştır; bu dosya tek bir sütunun yıl bazlı değerlerini taşır.[^k1]
