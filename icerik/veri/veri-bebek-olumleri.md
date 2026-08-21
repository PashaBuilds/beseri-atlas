---
id: veri-bebek-olumleri
tip: veri
baslik: Bebek ölüm oranı, 1990–2024
ozet: >-
  1990'da 6,40, 2024'te 2,77; sütun adı ölçünün cinsiyet ve varlık dilimi
  kırılımlarını da taşıyor.
tarih_baslangic: "1990"
tarih_bitis: "2024"
bolge: [kuresel]
eksen: [demografik]
guven_geneli: yaygin
etiketler: [bebek-olumleri, kirilim, sutun-adi, owid, olcut]
ilgili:
  - veri-cocuk-olumleri
  - veri-yasam-beklentisi-1770-2023
  - kavram-demografik-gecis
okuma_onerisi: []
veri_dosyasi: veri-setleri/bebek-olumleri.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: oran
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Infant mortality (CSV verisi)"
    url: https://ourworldindata.org/grapher/infant-mortality.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "infant_mortality_rate"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/bebek-olumleri.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Child mortality (CSV verisi)"
    url: https://ourworldindata.org/grapher/child-mortality.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "child_mortality"
    not: "Yakin ama ayni olmayan olcu"
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

Seri 1990'da 6,399028 ile başlar ve 2024'te 2,7679465 ile biter.[^k1]

## Sütun adı kırılımları taşır

Veri kümesinin sütun adı, gözlem değerini bebek ölüm oranı göstergesi için ve
cinsiyet ile varlık dilimi kırılımları toplam olarak tanımlar.[^k1]

Bir ölçünün adında hangi alt grupların birleştirildiğinin yazması,[^k1] atlasın
şu kuralının dayanağıdır: bu seriden okunan değerler, hangi kırılımın toplandığı
belirtilmeden aktarılmaz. Aynı yıl için farklı kırılımlar farklı sayılar verir.

## Yakın ama aynı olmayan ölçü

Aynı sağlayıcının beş yaş altı ölüm oranı serisinde uç değerler 1800 için yüzde
42,8 ve 2024 için yüzde 3,74'tür.[^k2]

İki serinin aynı yıl için farklı sayılar vermesi,[^k1][^k2] iki ölçünün farklı yaş
aralıklarını kapsadığını gösterir; atlas bu iki dosyayı ayrı tutar ve değerlerini
birbirinin yerine kullanmaz. İlişkili dosya
[Beş yaş altı ölüm oranı, 1800–2024](/veri/cocuk-olumleri/) dosyasıdır.

## Seri 1990'dan önce yoktur

Veri kümesinde sağlayıcının toplam satırı için 1990'dan önce gözlem
bulunmaz.[^k1]

Bu, atlasın şu kuralının dayanağıdır: bu dosyadan yirminci yüzyılın ilk
yarısına dair bir bebek ölüm oranı okunamaz.

## Nüfus modeli

Nüfus artışı üzerine bir model için tutulan kayıt, aile geçindirmenin
güçlüklerinin sonunda nüfus artış hızını azalttığını öne süren bir döngüyü
anlatır.[^k3] O model
[Thomas Malthus](/dusunur/malthus/) dosyasında, kuramsal çerçeve ise
[Demografik geçiş](/kavram/demografik-gecis/) dosyasında ele alınıyor.

## Bu dosyanın sınırı

Ülke ülke oranlar, kırılımlara göre dağılım ve ölçüm yöntemi burada ayrı
başlıklar altında ele alınmamıştır; bu dosya yalnızca sağlayıcının toplam
satırını kaydeder.[^k1]
