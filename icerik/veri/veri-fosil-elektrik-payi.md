---
id: veri-fosil-elektrik-payi
tip: veri
baslik: Elektrik üretiminde fosil yakıt payı, 1900–2025
ozet: >-
  Pay 1900'de yüzde 58,78, 2025'te yüzde 57,39; iki uç neredeyse aynıdır ama
  ara yıllar 1919'da yüzde 49,04'e inen, 1973'te yüzde 75,13'e çıkan bir yay
  çizer.
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
    erisim_tarihi: 2026-08-29
    dogrulama_dizesi: "fossil_share_of_electricity"
    not: "share-of-electricity-production-from-fossil-fuels adresi buraya yonlendiriyor; varilan adres yazildi. Yerel kopya: veri-setleri/fosil-elektrik-payi.csv"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Energy mix, toplam enerji arzi (CSV verisi)"
    url: https://ourworldindata.org/grapher/energy-mix.csv?metric=total&source=total&csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-29
    dogrulama_dizesi: "total_energy_supply_twh"
    not: "primary-energy-cons adresi buraya yonlendiriyor. Ikame yontemli seri DEGILDIR: sutun dogrudan toplam enerji arzini (total_energy_supply_twh) verir, geleneksel biyokutle haric. Yerel kopya: veri-setleri/enerji-tuketimi.csv"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Fossil fuel"
    url: https://en.wikipedia.org/wiki/Fossil_fuel
    erisim_tarihi: 2026-08-29
    dogrulama_dizesi: "Fossil fuel"
    not: "Bagimsiz alan adi (Ilke 6); olculen seyin tanimi"
  - anahtar: k4
    tur: veri
    ad: "Our World in Data - Energy mix veri seti künyesi (metadata.json)"
    url: https://ourworldindata.org/grapher/energy-mix.metadata.json?metric=total&source=total&csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-29
    dogrulama_dizesi: "Traditional biomass is not included"
    not: "Yontem beyani: toplam 'total energy supply' olarak olculur, ikame yontemi anilmaz, geleneksel biyokutle dahil edilmez"
son_denetim: 2026-08-29
denetim_durumu: onaylandi
onarim_turu: 1
---

Dünyada üretilen elektriğin ne kadarının kömürden, petrolden ve doğal gazdan
geldiğini sayan bu seri, 1900'den 2025'e dünya toplamını yıl yıl izler; pay bu
aralıkta yalnızca bir kez, 1919'da yüzde 50'nin altına iner.[^k1] Elektriği
fosil yakıttan çıkarmak iklim tartışmasının en görünür başlığı olduğu için bu
tek sütun sık sık bütün enerji dönüşümünün özeti gibi okunur; serinin kendisi
böyle bir özetin neden yanıltacağını gösterir.

## İki uç birbirine yakın

Payın 1900 değeri yüzde 58,78, 2025 değeri yüzde 57,39'dur; yüz yirmi beş
yılın iki ucu arasındaki fark 1,39 puandır.[^k1]

::tartismali[Yalnızca ilk ve son yıla bakan biri "hiçbir şey değişmedi" sonucuna varır. Aradaki yıllar bunu yalanlar.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

İki ucun bu kadar yakın düşmesi, bir serinin iki uç değerle özetlenmemesi
gerektiğinin en açık dayanağıdır; okuma yöntemi
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Ara yıllar başka bir şey söylüyor

Aynı seride pay 1918'de yüzde 52,88, 1950'de yüzde 64,35, 1973'te yüzde 75,13,
2000'de yüzde 64,66, 2010'da yüzde 67,46 ve 2023'te yüzde 60,58'dir.[^k1]

En düşük değer 1919'da yüzde 49,04, en yüksek değer 1973'te yüzde 75,13 olarak
kayıtlıdır; yüzde 75 sınırını gören tek yıl da 1973'tür.[^k1] Dibin başlangıca
yakın, zirvenin ortada durması payın tek yönlü hareket etmediğini gösterir; iki
uçla kurulan her özet bu yayı siler.[^k1]

## Pay ile miktar aynı şey değildir

Toplam enerji arzı serisinde dünya değeri 1900'de 5.990 terawatt-saat, 2025'te
166.753,6 terawatt-saattir; pay iki uçta neredeyse yerinde sayarken toplam
yaklaşık 28 kat büyümüştür.[^k1][^k2]

Bu toplam ikame yöntemli bir birincil enerji serisi değildir: fosil dışı
elektriği fosil eşdeğerine çevirerek toplamı büyüten ikame hesabı burada
uygulanmaz, sayılar doğrudan toplam enerji arzını verir ve geleneksel biyokütle
toplamın dışında tutulur.[^k2][^k4]

İki seri aynı bütünü de bölmez: pay yalnızca elektrik üretimine, toplam ise
elektriğin de içinde olduğu bütün enerji arzına aittir; oran ile miktarın ayrı
ayrı okunması bu yüzden zorunludur.[^k1][^k2] Toplam seri
[Birincil enerji tüketimi, 1800–2025](/veri/enerji-tuketimi-1800-2023/)
dosyasında ele alınıyor.

## Ölçülen şeyin tanımı

Fosil yakıt, ölü organizmaların kalıntılarından yer kabuğunda doğal süreçlerle
oluşan, hidrokarbon içeren yakıtların ortak adıdır.[^k3] Tanımın teknolojiye
değil oluşum sürecine dayanması bu payı bir santral ölçüsü değil bir kaynak
ölçüsü yapar: aynı türbini döndüren buhar kömürden geliyorsa paya girer,
uranyumdan geliyorsa girmez.[^k3]

Ülke dağılımı, fosil yakıtların kendi içindeki kırılımı ve elektrik dışındaki
enerji kullanımı bu serinin dışında kalır; grafikte çizilen, tek bir sütunun
1900'den 2025'e aldığı yıllık değerlerdir.[^k1]
