---
id: veri-savas-kayiplari-1800-2023
tip: veri
baslik: Savaş kayıpları, 1800–2011
ozet: >-
  Sağlayıcının uzun serisi 1800'de başlar ve 2011'de biter; bazı yıllarda değer
  sıfırdır, bu "veri yok" değil "sayılan çatışma yok" demektir.
tarih_baslangic: "1800"
tarih_bitis: "2011"
bolge: [kuresel]
eksen: [askeri, demografik]
guven_geneli: tartismali
etiketler: [savas-kayiplari, veri-seti, sifir-degeri, owid, tahmin-araligi]
ilgili:
  - veri-savas-olumleri
  - veri-askeri-harcama
  - tartisma-tarihsel-sayilar-nasil-okunur
  - kavram-topyekun-savas
  - kaynak-tooze-felaketin-bedeli
okuma_onerisi: []
veri_dosyasi: veri-setleri/savas-kayiplari.csv
veri_lisansi: "CC BY 4.0 — Our World in Data"
veri_kaynagi_anahtari: k1
birim: yıl başına savaş ölümü (yüksek tahmin)
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "Our World in Data - Deaths in wars (CSV verisi)"
    url: https://ourworldindata.org/grapher/deaths-in-wars.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "number_deaths_ongoing_conflicts"
    not: "CSV uc noktasindan 2026-08-21'de indirildi; veri-setleri/savas-kayiplari.LISANS.md"
  - anahtar: k2
    tur: veri
    ad: "Our World in Data - Population, long-run with projections (CSV verisi)"
    url: https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "population_historical"
    not: "Olcek karsilastirmasi icin gereken toplam"
  - anahtar: k3
    tur: ansiklopedi
    ad: "Wikipedia (EN) - World War II casualties"
    url: https://en.wikipedia.org/wiki/World_War_II_casualties
    erisim_tarihi: 2026-08-21
    dogrulama_dizesi: "casualties"
    not: "Ayni yillar icin farkli tanimla sayan kayit"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---

Bu incelemenin en dikkat çekici değeri bir zirve değil, bir sıfırdır.

## Seri iki yüz on iki yıl kapsıyor

Sağlayıcının toplam satırında seri 1800'de başlar ve 2011'de biter; 1800 değeri
2.063, 2011 değeri 9.400'dür.[^k1]

Planın kapsam satırı daha geç bir bitiş yılı öngörüyordu; sağlayıcının serisi
2011'de bittiği için bu incelemenin başlığı serinin gerçek sınırını taşır.[^k1]

## Sıfır bir ölçüm değeridir

Seride en düşük değerler sıfırdır: 1957 ve 1959 yıllarında değer 0'dır.[^k1]

::tartismali[Sıfır burada "o yıl kimse ölmedi" demek değildir; sağlayıcının bu veri kümesinde saydığı türde bir çatışmanın o yıl kaydedilmediği anlamına gelir.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Bir serideki sıfırın iki farklı okuması olması,[^k1] korpusun şu kuralının
dayanağıdır: sıfır değeri, veri kümesinin sayma tanımıyla birlikte aktarılır.
Okuma yöntemi
[Tarihsel sayılar nasıl okunur?](/tartisma/tarihsel-sayilar-nasil-okunur/)
haritasında ele alınıyor.

## Zirveler bir yıla değil bir kümeye yayılır

Serinin en yüksek dört değeri ardışık yıllardadır: 1941'de 6.354.402, 1943'te
6.375.478, 1944'te 6.572.072 ve 1945'te 6.581.340.[^k1] Birinci Dünya Savaşı
yıllarında ise 1914 değeri 1.577.016, 1918 değeri 1.630.593'tür.[^k1]

Dört yılın birbirine bu kadar yakın olması,[^k1] "en ölümcül yıl" ifadesinin bu
seride ayırt edici olmadığını gösterir; kavram
[Topyekûn savaş](/kavram/topyekun-savas/) dosyasında ele alınıyor.

## Aynı yıllar, başka bir tanım

Aynı yılları farklı bir tanımla sayan kayıt, İkinci Dünya Savaşı'nın toplam
ölümlerini 70 ile 85 milyon arasında verir ve bunları askerî ölümler, sivil
ölümler ile hastalık ve kıtlık ölümleri diye ayırır.[^k3]

İki kaydın aynı savaş için farklı büyüklükler vermesi,[^k1][^k3] tanım farkından
gelir: bu inceleme yıl başına muharebe ölümlerini, diğeri savaşın bütün ölüm
türlerini sayar.

## Ölçek

Uzun dönemli seride dünya nüfusu 1800'de yaklaşık 983,1 milyon, 1945'te yaklaşık
2,4 milyar, 2011'de yaklaşık 7,11 milyardır.[^k2] Kişi başı bir oran burada
hesaplanmamıştır; sağlayıcı bu incelemede yüksek ve düşük olmak üzere iki ayrı
tahmin sütunu tutar ve oran hangi sütundan hesaplandığına göre değişir.[^k1]

## Kanıtın ve kapsamın sınırı
Savaş türleri, bölge dağılımı ve dolaylı ölümler burada ele alınmamıştır; bu
dosya tek bir sütunun yıl bazlı değerlerini taşır.[^k1] Daha yeni yıllar için
farklı bir sayım
[Silahlı çatışma ölümleri, 1989–2025](/veri/savas-olumleri/) dosyasında ele
alınıyor.
