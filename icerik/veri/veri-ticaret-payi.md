---
id: veri-ticaret-payi
tip: veri
baslik: Ticaretin GSYH içindeki payı, 1970–2024
ozet: >-
  Dünya toplamında ihracat ve ithalatın millî gelire oranı 1970'te yaklaşık
  %25,8, 2024'te yaklaşık %56,7; seri yalnızca 1970'ten başlıyor ve daha
  eski küreselleşme dalgalarını göstermiyor.
tarih_baslangic: "1970"
tarih_bitis: "2024"
bolge: [kuresel]
eksen: [ekonomik]
guven_geneli: yaygin
etiketler: [ticaret, kuresellesme, disa-aciklik, veri-seti, baslangic-yili, owid]
ilgili:
  - kavram-kuresellesme
  - kavram-dunya-sistemi
  - kavram-silahli-ticaret
  - kavram-hint-okyanusu-ticareti
  - veri-kisi-basi-gsyh-1-2022
  - olay-bretton-woods
  - aktor-dunya-ticaret-orgutu
okuma_onerisi: []
veri_dosyasi: veri-setleri/ticaret-payi.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: GSYH'ye oran (yüzde)
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Trade as a share of GDP (CSV verisi)"
    url: https://ourworldindata.org/grapher/trade-as-share-of-gdp.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-25
    dogrulama_dizesi: "ne_trd_gnfs_zs"
    not: "CSV uc noktasindan 2026-08-25'te indirildi; sutun adi kaynaktaki haliyle korundu; veri-setleri/ticaret-payi.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Ayni donemin nufus serisi; olcek karsilastirmasi icin"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - Globalization"
    url: https://en.wikipedia.org/wiki/Globalization
    erisim_tarihi: 2026-08-25
    dogrulama_dizesi: "Globalization"
    not: "Giris kapisi; serinin kapsamadigi onceki dalgalar icin cerceve"
son_denetim: 2026-08-25
denetim_durumu: onaylandi
onarim_turu: 0
---

Seri 1970'te yaklaşık %25,8 ile başlar ve 2024'te yaklaşık %56,7 ile biter;
toplam 55 gözlem vardır.[^k1]

## Seri 1970'ten başlar

Veri kümesinde dünya toplamı için 1970'ten önce gözlem bulunmaz.[^k1] Bu,
serinin en önemli sınırıdır ve dosyanın adında da belirtilmiştir.

Bir dışa açıklık serisinin yirminci yüzyılın ikinci yarısından
başlaması,[^k1] atlasın şu kuralının dayanağıdır: bu dosyadan on dokuzuncu
yüzyıl küreselleşme dalgasına ya da iki savaş arası kapanmaya dair bir değer
okunamaz.

Sınır önemlidir çünkü serinin gösterdiği yükseliş, tarihteki tek yükseliş
değildir.[^k3] Atlasın kavram dosyaları daha erken dalgaları kaydeder; bu
seri onları göstermez.

## Oranın ne ölçtüğü

Ölçü, ihracat ve ithalat toplamının millî gelire bölünmesiyle
bulunur.[^k1] Yani bir malın sınırı iki kez geçmesi, orana iki kez katkı
yapar.

Bu hesap biçimi, oranın yüzde yüzü aşabileceği anlamına gelir.[^k1] Küçük ve
yeniden ihracat yapan ekonomilerde oran birkaç yüz olabilir; dünya toplamında
ise iki kez sayma etkisi daha sınırlıdır.

Atlas bu yüzden oranı bir ticaret hacmi değil bir dışa açıklık göstergesi
olarak kaydeder.[^k1] Oranın artması, ticaretin arttığını gösterir ama ne
kadar arttığını doğrudan vermez.

## Serinin içindeki iniş

Seri düz bir yükseliş çizmez.[^k1] Kayıtta 2008 sonrasında bir düşüş ve
ardından dalgalı bir seyir bulunur; 2023'te yaklaşık %58,1 olan oran 2024'te
yaklaşık %56,7'ye iner.

Bu iniş, atlasın olay dosyalarıyla birlikte okunmalıdır.[^k3] Bir oranın
düşmesi, ticaretin azaldığını değil, millî gelirin ticaretten daha hızlı
büyüdüğünü de gösterebilir.

Atlas iki açıklamayı ayrı tutar ve seriden bir sebep okumaz.[^k1] Oranın
payı ile paydası ayrı ayrı incelenmeden, hareketin kaynağı belirlenemez.

## Nüfusla birlikte okunması

Aynı dönemde dünya nüfusu da büyümüştür.[^k2] Uzun dönemli nüfus serisinde
1970 için yaklaşık 3,7 milyar, 2020 için yaklaşık 7,89 milyar değer bulunur.

Atlas iki seriyi bölerek kişi başına ticaret üretmez.[^k1] İki kümenin
gözlem yılları ve tanımları farklıdır; bölme işlemi, iki kaynağın
uyumlu olduğu varsayımını gerektirir.

Bu, atlasın veri dosyalarında genel kuraldır.[^k2] Farklı kaynaklardan gelen
seriler, aralarındaki tanım farkı incelenmeden birbirine bölünmez.

## Serinin atlastaki işlevi

Bu dosya, atlasın ticaret kavramı dosyalarına ölçülebilir bir zemin
sağlar.[^k1] Kavram dosyaları ticaretin nasıl örgütlendiğini anlatır; bu seri
ne kadarının sınır geçtiğini verir.

İki katmanın ayrı tutulması önemlidir.[^k3] Bir ticaret düzeninin kurumsal
biçimi ile hacmi ayrı şeylerdir; aynı hacim çok farklı düzenlerle
taşınabilir.

Atlas bu yüzden seriden bir düzen çıkarımı yapmaz.[^k1] Seri bir sonucu
ölçer; sonucu üreten düzeni göstermez.

## Bu dosyanın kapsamadıkları

Ülke ve bölge kırılımları burada işlenmez.[^k1] Dosya yalnızca dünya
toplamını kaydeder ve kaynak dosyasında ülke satırları da bulunur.

Ticaretin bileşimi — hangi malların, hangi hizmetlerin — kapsam
dışıdır.[^k1] Seri toplam değer verir; içerik dağılımı vermez.

1970 öncesi dönem bu dosyadan okunamaz.[^k3] Atlasın daha erken ticaret
düzenleri için kavram ve olay dosyaları vardır ve bu seri onları
desteklemez.

## Okuma yönlendirmesi

Serinin ölçtüğü olgunun kavram karşılığı için
[Küreselleşme](/kavram/kuresellesme/) ve
[Dünya sistemi](/kavram/dunya-sistemi/) dosyaları okunmalıdır.[^k3]

Serinin kapsamadığı erken dönem ticaret düzenleri için
[Hint Okyanusu ticareti](/kavram/hint-okyanusu-ticareti/) ve
[Silahlı ticaret](/kavram/silahli-ticaret/) dosyaları uygundur.[^k1]

Serinin başladığı dönemin kurumsal çerçevesi için
[Bretton Woods](/olay/bretton-woods/) ve
[Dünya Ticaret Örgütü](/aktor/dunya-ticaret-orgutu/) dosyaları
okunabilir.[^k2]
