---
id: kavram-yasam-beklentisi
tip: kavram
baslik: Yaşam beklentisi
ozet: >-
  Doğumdaki beklenen yaşam süresi; ölçü bir öngörü değil, o yılın ölüm
  oranlarından türetilen bir hesaptır.
bolge: [kuresel]
eksen: [demografik, ekonomik]
guven_geneli: yaygin
etiketler: [yasam-beklentisi, olcum, dogumda, seri, veri]
ilgili:
  - kavram-demografik-gecis
  - kavram-kentlesme
  - olay-nufus-patlamasi
  - kavram-gini-katsayisi
  - veri-yasam-beklentisi-1770-2023
okuma_onerisi: []
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Life expectancy (CSV verisi)"
    url: https://ourworldindata.org/grapher/life-expectancy.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "life_expectancy_0"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Ayni saglayicinin baska bir serisi"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Thomas Robert Malthus"
    url: https://en.wikipedia.org/wiki/Thomas_Robert_Malthus
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "Malthus"
    not: "Nufus ve gecim iliskisi uzerine erken kayit; bagimsiz alan adi"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Veri kümesinin sütun adı ölçünün hangi yaşta hesaplandığını taşır: sıfır yaşta
yaşam beklentisi.[^k1]

## Sütun adı ölçünün başlangıç yaşını verir

Bir ölçünün adında başlangıç yaşının bulunması,[^k1] atlasın şu kuralının
dayanağıdır: bu dosyada yaşam beklentisi, hangi yaşta hesaplandığı belirtilmeden
aktarılmaz. Doğumdaki beklenti ile belirli bir yaşa ulaşmış kişilerin beklentisi
aynı sayı değildir.

## Doğrulanabilir bir seri

Aynı veri kümesinde Afganistan için doğumdaki yaşam beklentisi 1950'de yaklaşık
28,16, 1960'ta yaklaşık 32,80, 1970'te yaklaşık 37,46'dır.[^k1]

Atlas burada tek bir ülkenin satırlarını örnek olarak verir; bu, iddianın kaynağa
gidip doğrulanabilir olmasını sağlar.

## Yirmi yılda dokuz yıllık artış

Aynı ülke için 1950 ile 1970 arasındaki üç kayıt arasındaki fark, verinin
kendisinde okunabilir.[^k1]

Atlas bu farkı bir nedenle açıklamaz; kullanılan veri kümesi yalnızca ölçüm
sağlar, açıklama sağlamaz.

## Aynı sağlayıcının başka bir serisi

Aynı sağlayıcının uzun dönemli nüfus serisinde dünya nüfusu 1950 için yaklaşık
2,49 milyar, 2020 için yaklaşık 7,84 milyardır.[^k2]

İki serinin farklı birimlerde olması (biri yıl, diğeri kişi),[^k1][^k2] atlasın
veri dosyalarında neden birim alanını ayrı tuttuğunun dayanağıdır.

## Nüfus ve geçim ilişkisi üzerine erken kayıt

Nüfus ve geçim ilişkisi üzerine erken bir kayıt, emekçi nüfusu gıda üretiminden
hızlı büyüdüğünde gerçek ücretlerin düştüğünü öne süren bir modeli anlatır.[^k3]
O model [Thomas Malthus](/dusunur/malthus/) dosyasında ele alınıyor.

## Bu dosyanın sınırı

Ölçünün hesaplanma yöntemi, ülke ülke seyri ve alt gruplar arası farklar burada
ayrı başlıklar altında ele alınmamıştır; kullanılan kaynak veri kümesidir, bir
anlatı değildir.[^k1]
