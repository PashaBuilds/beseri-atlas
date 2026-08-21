---
id: veri-dunya-nufusu-1500-2025
tip: veri
baslik: Dünya nüfusu, 1500–2025
ozet: >-
  Beş yüz yılda yarım milyardan sekiz milyarın üzerine — serinin kendisi, nereden
  geldiği ve hangi kısmının ölçüm değil tahmin olduğu.
tarih_baslangic: "1500"
tarih_bitis: "2025"
bolge: [kuresel]
eksen: [demografik, ekonomik]
guven_geneli: yaygin
etiketler: [nufus, demografik-gecis, veri-seti, projeksiyon]
ilgili:
  - kavram-demografik-gecis
  - donem-16
  - olay-nufus-patlamasi
  - veri-dogurganlik-hizi-1950-2023
  - veri-kentlesme-orani-1500-2023
  - veri-yasam-beklentisi-1770-2023
  - kaynak-milanovic-kuresel-esitsizlik
  - veri-enerji-tuketimi-1800-2023
  - veri-kisi-basi-gsyh-1-2022
  - veri-okuryazarlik-1475-2023
  - tartisma-kara-olumun-sonuclari
okuma_onerisi: []
veri_dosyasi: veri-setleri/dunya-nufusu.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: kişi
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data — Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-20
    dogrulama_dizesi: "population_historical"
    not: "CSV uç noktasından 2026-08-20'de indirildi; veri-setleri/dunya-nufusu.LISANS.md"
  - anahtar: k2
    tur: ansiklopedi
    ad: "Wikipedia (EN) — World population"
    url: https://en.wikipedia.org/wiki/World_population
    erisim_tarihi: 2026-08-20
    dogrulama_dizesi: "World population"
    not: >-
      Bağımsız ikinci alan adı (İlke 6). Tarihsel nüfus tahminlerinin kaynak
      çeşitliliğini ve tahmin aralıklarını karşılaştırmak için.
  - anahtar: k3
    tur: veri
    ad: "Our World in Data — Demographic transition"
    url: https://ourworldindata.org/demographic-transition
    erisim_tarihi: 2026-08-20
    dogrulama_dizesi: "Demographic transition"
  - anahtar: k4
    tur: veri
    ad: "Our World in Data — veri seti künyesi (metadata.json)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.metadata.json
    erisim_tarihi: 2026-08-20
    dogrulama_dizesi: "United Nations"
    not: >-
      Projeksiyonların asıl kaynağını (BM World Population Prospects, orta varyant)
      belgeleyen makine-okunur künye. population.un.org yalnızca istemci tarafında
      çizildiği için programatik doğrulanamıyor; bu yüzden künyede o adres yerine
      doğrulanabilir bu uç nokta kullanıldı.
son_denetim: 2026-08-20
denetim_durumu: onaylandi
onarim_turu: 0
---

## Serinin okunması

Yukarıdaki eğri tek bir ölçümün sonucu değildir. Seri, Our World in Data'nın
uzun dönemli nüfus veri setinden alınmıştır ve iki farklı türde sayı
içerir.[^k1] 1500–2023 aralığındaki değerler tarihsel tahminlerdir, 2025 değeri
ise bir projeksiyondur.[^k1] Projeksiyonun asıl kaynağı Birleşmiş Milletler'in
*World Population Prospects* çalışmasıdır.[^k4] Grafiğin altındaki tabloda her satırın hangi türde olduğu
`not` sütununda işaretlidir.

Bu ayrım kozmetik değildir. Birleşmiş Milletler'in projeksiyonları varyantlara
göre üretilir ve buradaki değer orta varyanttan alınmıştır.[^k4] Bir projeksiyonu
bir ölçümle aynı çizgide göstermek, verinin en çok yanlış okunduğu yerdir; bu
yüzden veri dosyası, hangi satırın gözleme hangisinin modele dayandığını taşıyacak
biçimde saklanır.

## Ne söylüyor

Serinin en çarpıcı özelliği ilk üç yüz yılının ne kadar düz olmasıdır. 1500'de
yaklaşık 503 milyon olan dünya nüfusu, 1600'de yaklaşık 516 milyondu — bir
yüzyılda yüzde üçün altında bir artış.[^k1] 1700'e gelindiğinde yaklaşık 595
milyona, 1800'de yaklaşık 983 milyona çıktı.[^k1] Yani ilk milyara ulaşmak
1800'lerin başını buldu.

Sonrasında eğrinin karakteri değişir. 1900'de yaklaşık 1,63 milyar olan nüfus
1950'de yaklaşık 2,49 milyara, 1970'te yaklaşık 3,69 milyara, 2000'de yaklaşık
6,17 milyara ulaştı.[^k1] 2023'teki tarihsel tahmin yaklaşık 8,09 milyardır;
2025 için projeksiyon değeri yaklaşık 8,23 milyardır.[^k1]

## Neden böyle bir eğri

Bu biçim, [demografik geçiş](/kavram/demografik-gecis/) modelinin tarif ettiği
mekanizmanın izidir. Model, önce ölüm hızının düştüğünü, doğum hızının düşüşünün
ise onu gecikmeli olarak izlediğini söyler; iki eğri arasında açılan makas hızlı
nüfus artışının kaynağıdır.[^k3] Serinin uzun düz kısmı, toplumların bin yıllar
boyunca yüksek doğum ve yüksek ölüm hızlarının birbirini dengelediği birinci
aşamada kalmasına karşılık gelir.[^k3]

Aynı mekanizma, artışın neden geçici olduğunu da söyler: doğum hızı da düştüğünde
makas kapanır ve büyüme yavaşlar.[^k3] Serinin son kırk yılındaki eğim azalması
bu kapanmanın görünür hâlidir.

## Sınırlar

Erken dönem değerleri tarihsel demografi tahminleridir; sayım kaydına değil, kısmi
kanıtlardan yapılan yeniden kurgulara dayanır.[^k2] Bu yüzden 1500 veya 1700 için
verilen rakamlar, 2000 için verilen rakamla aynı türden bir kesinlik taşımaz.
Aynı sebeple bu makalenin genel güven seviyesi `kesin` değil `yaygin` olarak
işaretlenmiştir: seriyi üreten yöntem yaygın kabul görür, tek tek erken değerler
ise tahmin aralıklarıyla birlikte okunmalıdır.

Veri setinin tam künyesi, indirilme tarihi, uç noktası ve filtresi
`veri-setleri/dunya-nufusu.LISANS.md` dosyasındadır. CSV repoda tutulur ve sayfa
oluşturulurken build sırasında okunur; siteyi görüntülerken hiçbir dış istek
yapılmaz.
