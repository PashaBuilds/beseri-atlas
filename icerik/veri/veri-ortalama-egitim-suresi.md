---
id: veri-ortalama-egitim-suresi
tip: veri
baslik: Ortalama eğitim süresi, 1870–2020
ozet: >-
  1870'te 0,46 yıl, 2020'de 8,84 yıl — yüz elli yılda on dokuz kat; ölçü 15-64
  yaş grubu için tanımlıdır.
tarih_baslangic: "1870"
tarih_bitis: "2020"
bolge: [kuresel]
eksen: [kulturel, demografik]
guven_geneli: yaygin
etiketler: [egitim-suresi, yas-grubu, veri-seti, owid, tanim]
ilgili:
  - veri-okuryazarlik-1475-2023
  - kavram-kentlesme
  - veri-dunya-nufusu-1500-2025
okuma_onerisi: []
veri_dosyasi: veri-setleri/ortalama-egitim-suresi.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yıl
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Mean years of schooling, long run (CSV verisi)"
    url: https://ourworldindata.org/grapher/mean-years-of-schooling-long-run.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "average_years_of_education"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/ortalama-egitim-suresi.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Literacy rates (CSV verisi)"
    url: https://ourworldindata.org/grapher/cross-country-literacy-rates.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "literacy"
    not: "Ayni saglayicinin iliskili serisi"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Writing system"
    url: https://en.wikipedia.org/wiki/Writing_system
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Writing system"
    not: "Bagimsiz alan adi (Ilke 6); olcunun konusu"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1870'te 0,46026796 yıl ile başlar ve 2020'de 8,840671 yıl ile biter.[^k1]

## Ölçü bir yaş grubu için tanımlıdır

Veri kümesinin sütun adı ölçünün kapsadığı yaş grubunu taşır: gençler ve
yetişkinler, 15-64 yaş.[^k1]

Bir ölçünün adında yaş aralığının bulunması,[^k1] atlasın şu kuralının
dayanağıdır: bu seriden okunan değerler, hangi yaş grubu için hesaplandığı
belirtilmeden aktarılmaz. Aynı yıl için farklı yaş grupları farklı sayılar
verir.

## İlişkili seri

Aynı sağlayıcının okuryazarlık serisinde dünya değeri 1820 için yüzde
12,046689, 2024 için yüzde 87,74'tür.[^k2]

İki serinin farklı birimlerde olması (biri yıl, diğeri yüzde),[^k1][^k2] atlasın
veri dosyalarında birim alanını neden ayrı tuttuğunun dayanağıdır; ilişkili dosya
[Okuryazarlık oranı, 1820–2024](/veri/okuryazarlik-1475-2023/) dosyasıdır.

## Ölçünün konusu

Ölçünün konusu için tutulan kayıt, yazı sistemlerini iki ayrı ölçüte göre
sınıflandırır.[^k3] O kavram
[Yazı sistemi](/kavram/yazi-sistemi/) dosyasında ele alınıyor.

## Bu dosyanın sınırı

Ülke ülke değerler, cinsiyete göre dağılım ve eğitim tanımları burada ayrı
başlıklar altında ele alınmamıştır; bu dosya yalnızca dünya toplamı serisini
kaydeder.[^k1]
