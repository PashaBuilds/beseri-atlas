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
  - anahtar: k4
    tur: akademik
    ad: "Our World in Data — Life Expectancy"
    url: https://ourworldindata.org/life-expectancy
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "The large reduction in child mortality has played an important role"
son_denetim: 2026-08-21
denetim_durumu: onaylandi
onarim_turu: 0
---
Veri kümesinin sütun adı ölçünün hangi yaşta hesaplandığını taşır: sıfır yaşta
yaşam beklentisi.[^k1]

## Sütun adı ölçünün başlangıç yaşını verir

Doğumdaki beklenti ile belirli bir yaşa ulaşmış kişilerin beklentisi aynı sayı değildir.

## Doğrulanabilir bir seri

Aynı veri kümesinde Afganistan için doğumdaki yaşam beklentisi 1950'de yaklaşık
28,16, 1960'ta yaklaşık 32,80, 1970'te yaklaşık 37,46'dır.[^k1]

## Yirmi yılda dokuz yıllık artış

Aynı ülke için 1950 ile 1970 arasındaki üç kayıt arasındaki fark, verinin
kendisinde okunabilir.[^k1]

## Aynı sağlayıcının başka bir serisi

Aynı sağlayıcının uzun dönemli nüfus serisinde dünya nüfusu 1950 için yaklaşık
2,49 milyar, 2020 için yaklaşık 7,89 milyardır.[^k2]

## Nüfus ve geçim ilişkisi üzerine erken kayıt

Nüfus ve geçim ilişkisi üzerine erken bir kayıt, emekçi nüfusu gıda üretiminden
hızlı büyüdüğünde gerçek ücretlerin düştüğünü öne süren bir modeli anlatır.[^k3]
O model [Thomas Malthus](/dusunur/malthus/) dosyasında ele alınıyor.

## Kanıtın ve kapsamın sınırı
Ölçünün hesaplanma yöntemi, ülke ülke seyri ve alt gruplar arası farklar burada
ayrı başlıklar altında ele alınmamıştır; kullanılan kaynak veri kümesidir, bir
anlatı değildir.[^k1]

## Ortalama bir ömür kehaneti değildir

Doğuşta yaşam beklentisi, belirli bir dönemde gözlenen yaşa özgü ölüm oranları
bir kişinin bütün ömrü boyunca değişmeden kalsaydı yeni doğanın ortalama kaç yıl
yaşayacağını hesaplayan dönem ölçüsüdür. Bugün doğan her bebeğin gerçekten tam bu
yaşa kadar yaşayacağı tahmini değildir. Tıp, savaş, salgın ve yaşam koşulları
gelecekte değişeceği için ölçü mevcut ölüm düzeninin özetidir.[^k1]

Özellikle bebek ve çocuk ölümleri ortalamayı güçlü biçimde aşağı çeker. Doğuşta
yaşam beklentisinin otuz yıl olduğu bir toplumda herkesin otuz yaşında öldüğü
sonucu çıkarılamaz; çok sayıda erken ölüm ile ileri yaşa ulaşan yetişkinler aynı
ortalamanın içinde olabilir. Belirli bir yaşa ulaşmış kişinin kalan yaşam
beklentisi ayrıca hesaplanır. “Geçmişte kırk yaşında yaşlı olunuyordu” gibi
cümleler, yaş dağılımını ve çocuk ölümlerini görmeden kurulamaz.[^k4]

## Ölçüyü değiştiren mekanizmalar

Temiz su, kanalizasyon, aşılama, beslenme, doğum bakımı, antibiyotik, iş güvenliği
ve eğitim farklı yaşlardaki ölüm riskini azaltır. İlk büyük kazanımlar sıklıkla
çocuk ölümlerindeki düşüşten gelir; daha sonra kalp-damar hastalıkları, kanser ve
ileri yaş bakımı öne çıkabilir. Gelir önemlidir ama tek başına belirleyici
değildir: kamusal sağlık, eşitsizlik, barış ve hizmetlere erişim aynı gelir
düzeyindeki toplumlarda farklı sonuç üretebilir.

[Demografik geçiş](/kavram/demografik-gecis/) ölüm oranlarındaki düşüşün doğum
oranları ve nüfus yapısıyla ilişkisini açıklar. Ölüm azalırken doğumlar bir süre
yüksek kalırsa [Nüfus patlaması](/olay/nufus-patlamasi/) görülebilir. Malthusçu
yaklaşım nüfus ile kaynak baskısı arasındaki geri beslemeyi kurar; uzun ömür
artışının üretim, dağıtım ve kurumlarla nasıl birlikte gerçekleştiği ayrıca
gösterilmelidir.[^k3]

## Ülke ortalamasının örttüğü farklar

Ulusal değer kadınlar ve erkekler, bölgeler, gelir grupları ve etnik topluluklar
arasındaki büyük eşitsizlikleri gizleyebilir. Göç, savaş veya salgın birkaç yıl
içinde keskin düşüş yaratabilir. Küçük nüfuslarda yıllık dalgalanma yüksek
olabilir; veri kalitesi zayıf yerlerde ölüm kayıtlarının eksikliği tahmin
belirsizliğini artırır. Seri okunurken kaynağın kayıt mı model mi kullandığı ve
sınır değişikliklerini nasıl ele aldığı sorulmalıdır.

[Yaşam beklentisi 1770–2023](/veri/yasam-beklentisi-1770-2023/) uzun dönemli
değişimi görünür kılar. Nüfus serisi toplam ölçeği verir, bireylerin sağlık
dağılımını göstermez.[^k2] [Gini katsayısı](/kavram/gini-katsayisi/) gelir
dağılımını ölçer; sağlık eşitsizliğiyle ilişkisi ayrıca test edilmelidir.

Yaşam beklentisi sağlık ve yaşam koşullarını tek sayıda özetlediği için güçlüdür;
iyi yaşamın tüm boyutlarını ölçmez. Engellilik, hastalıkla geçirilen yıl, ruh
sağlığı ve yaşam kalitesi aynı değere sahip toplumlarda farklı olabilir. Sağlam
yorum, doğuşta mı belirli yaşta mı ölçüldüğünü, dönemi, alt grupları ve ölüm
nedenlerini birlikte belirtir.[^k1]

Salgın dönemlerinde dönem yaşam beklentisi hızla düşebilir; bu, doğan kuşağın
ömrünün kesin olarak aynı ölçüde kısalacağı anlamına gelmez. Salgın geçer ve ölüm
oranları toparlanırsa kuşağın gerçek deneyimi farklı olur. Dönem tablosu o yılın
şokunu, kuşak tablosu insanların zaman içinde yaşadığı oranları izler. Hangi
hesabın kullanıldığı sonuçla birlikte yazılmalıdır.

Ortalamanın yanında güven aralığı ve veri kaynağı verilmesi özellikle eksik nüfus kaydı bulunan dönemlerde zorunludur. Yuvarlatılmış tek değer, model varsayımlarının taşıdığı belirsizliği saklayabilir. Eğilim çoğu zaman tek yıl düzeyinden daha güvenilir bilgi verir.

Ani kırılmalar nedenleriyle birlikte gösterilmelidir.
