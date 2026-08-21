---
id: veri-tarim-istihdami
tip: veri
baslik: Tarımda istihdam payı, 1991–2025
ozet: >-
  1991'de yüzde 42,82, 2025'te yüzde 25,76 — otuz dört yılda üçte bir düşüş; seri
  1991'den önce dünya toplamı içermiyor.
tarih_baslangic: "1991"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [ekonomik, demografik]
guven_geneli: yaygin
etiketler: [tarim, istihdam, veri-seti, baslangic-yili, owid]
ilgili:
  - kavram-kentlesme
  - olay-yesil-devrim
  - veri-kentlesme-orani-1500-2023
okuma_onerisi: []
veri_dosyasi: veri-setleri/tarim-istihdami.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yüzde
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Share of employment in agriculture (CSV verisi)"
    url: https://ourworldindata.org/grapher/share-of-employment-in-agriculture.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "share_employed_agriculture"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/tarim-istihdami.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Share of population living in urban areas (CSV verisi)"
    url: https://ourworldindata.org/grapher/share-of-population-urban.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "share__area_type_urban__data_type_estimates"
    not: "Ayni saglayicinin iliskili serisi"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Industrial Revolution"
    url: https://en.wikipedia.org/wiki/Industrial_Revolution
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Industrial Revolution"
    not: "Bagimsiz alan adi (Ilke 6); siklikla baglanan donusum"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1991'de yüzde 42,822468 ile başlar ve 2025'te yüzde 25,763578 ile
biter.[^k1]

## Seri 1991'den önce yoktur

Veri kümesinde dünya toplamı için 1991'den önce gözlem bulunmaz.[^k1]

Bir istihdam serisinin yalnızca son otuz beş yılı kapsaması,[^k1] atlasın şu
kuralının dayanağıdır: bu dosyadan sanayileşme öncesi ya da sanayileşme
dönemine dair bir istihdam payı okunamaz. Sıklıkla bağlanan dönüşüm
[Sanayi Devrimi](/olay/sanayi-devrimi/) dosyasında ele alınıyor.[^k3]

## İki seri aynı yönde hareket eder

Aynı sağlayıcının kentleşme serisinde dünya değeri 1950 için yüzde 28,7983,
2025 için yüzde 57,8335'tir.[^k2]

Tarımda istihdam payı düşerken kentsel nüfus payının artması,[^k1][^k2] atlasın
bu iki seriyi tek bir nedene bağlamasını gerektirmez; iki ölçü farklı şeyler
ölçer ve kullanılan veri kümeleri bir neden bilgisi taşımaz. İlişkili dosya
[Kentleşme oranı, 1950–2025](/veri/kentlesme-orani-1500-2023/) dosyasıdır.

## Ölçünün tanımı bir karardır

Serinin sütun adı istihdam payını tarım için verir; hangi işlerin tarım
sayıldığı, ölçünün tanımına bağlıdır.[^k1]

Atlasın kuralı şudur: bu seriden okunan değerler, hangi sınıflandırmanın
kullanıldığı belirtilmeden aktarılmaz.[^k1]

## Bu dosyanın sınırı

Ülke ülke oranlar, kayıt dışı istihdam ve sektör tanımları burada ayrı başlıklar
altında ele alınmamıştır; bu dosya yalnızca dünya toplamı serisini kaydeder.[^k1]
