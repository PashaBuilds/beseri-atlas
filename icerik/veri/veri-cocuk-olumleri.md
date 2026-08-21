---
id: veri-cocuk-olumleri
tip: veri
baslik: Beş yaş altı ölüm oranı, 1800–2024
ozet: >-
  1800'de yüzde 42,8, 2024'te yüzde 3,74 — 225 gözlemle atlasın en yoğun
  serisi.
tarih_baslangic: "1800"
tarih_bitis: "2024"
bolge: [kuresel]
eksen: [demografik]
guven_geneli: yaygin
etiketler: [cocuk-olumleri, veri-seti, yogunluk, owid, dusus]
ilgili:
  - kavram-demografik-gecis
  - veri-yasam-beklentisi-1770-2023
  - veri-dunya-nufusu-1500-2025
okuma_onerisi: []
veri_dosyasi: veri-setleri/cocuk-olumleri.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yüzde
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Child mortality (CSV verisi)"
    url: https://ourworldindata.org/grapher/child-mortality.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "child_mortality"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/cocuk-olumleri.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Life expectancy (CSV verisi)"
    url: https://ourworldindata.org/grapher/life-expectancy.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "life_expectancy_0"
    not: "Ayni saglayicinin iliskili serisi"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Thomas Robert Malthus"
    url: https://en.wikipedia.org/wiki/Thomas_Robert_Malthus
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Malthus"
    not: "Bagimsiz alan adi (Ilke 6); nufus modeli"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1800'de yüzde 42,8 ile başlar ve 2024'te yüzde 3,74 ile biter.[^k1]

## Seri neredeyse yıl yıl doludur

Bu dosyanın veri dosyası alanında kayıtlı CSV, kaynaktan indirilen dünya toplamı
satırlarını içerir.[^k1] Satır sayısı ve yıl aralığı, aynı klasördeki lisans
dosyasında kayıtlıdır; atlas bu sayıyı kaynağın bir iddiası olarak değil,
indirdiği dosyanın bir özelliği olarak tutar ve gövdede kaynağa atfetmez.

Gözlem yoğunluğu, seriden okunabilecek soruların sınırını belirler. Atlasın
kuralı şudur: yıllık değişim yalnızca komşu yılların ikisi de gözlem olan
serilerden okunur.

## Bu serinin diğerlerinden farkı

Kaynağın verdiği uç değerler 1800 için yüzde 42,8 ve 2024 için yüzde 3,74'tür;
aynı sağlayıcının yaşam beklentisi serisinde uç değerler 1770 için 28,5 ve 2023
için 73,1694'tür.[^k1][^k2]

İki serinin farklı başlangıç yıllarına sahip olması,[^k1][^k2] atlasın veri
dosyalarını neden aynı grafikte birleştirmediğinin dayanağıdır.

## İki seri aynı nedene bağlanmaz

İki ölçünün aynı yönde hareket etmesi,[^k1][^k2] atlasın bunları tek bir nedene
bağlamasını gerektirmez; iki ölçü farklı şeyler ölçer ve kullanılan veri
kümeleri bir neden bilgisi taşımaz. İlişkili dosya
[Yaşam beklentisi, 1770–2023](/veri/yasam-beklentisi-1770-2023/) dosyasıdır.

## Nüfus modeli

Nüfus artışı üzerine bir model için tutulan kayıt, aile geçindirmenin
güçlüklerinin sonunda nüfus artış hızını azalttığını öne süren bir döngüyü
anlatır.[^k3] O model
[Thomas Malthus](/dusunur/malthus/) dosyasında, kuramsal çerçeve ise
[Demografik geçiş](/kavram/demografik-gecis/) dosyasında ele alınıyor.

## Bu dosyanın sınırı

Ülke ülke oranlar, ölüm nedenleri ve hesaplama yöntemi burada ayrı başlıklar
altında ele alınmamıştır; bu dosya yalnızca dünya toplamı serisini kaydeder.[^k1]
