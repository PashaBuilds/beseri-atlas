---
id: kavram-satin-alma-gucu-paritesi
tip: kavram
baslik: Satın alma gücü paritesi
ozet: >-
  Ülkeler arası gelir karşılaştırmalarını mümkün kılan çevrim oranı; ortak bir
  mal sepetinden kurulduğu için sepetin içeriğine, taban yılına ve tura bağlıdır.
bolge: [kuresel]
eksen: [ekonomik]
guven_geneli: tartismali
etiketler: [satin-alma-gucu, uluslararasi-dolar, olcum, karsilastirma, fiyat]
ilgili:
  - veri-kisi-basi-gsyh-1-2022
baglam:
  - veri-yoksulluk-orani
  - veri-kuresel-esitsizlik
  - kavram-gini-katsayisi
  - kavram-buyuk-ayrisma
  - tartisma-tarihsel-sayilar-nasil-okunur
okuma_onerisi: []
kaynaklar:
  - anahtar: k1
    tur: veri
    ad: "World Bank - International Comparison Program (ICP): Frequently Asked Questions"
    url: https://www.worldbank.org/en/programs/icp/faq
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "spatial price indexes"
    not: "Programin kendi resmi soru-cevap sayfasi; kullanim sinirlarini da burada yaziyor"
  - anahtar: k2
    tur: veri
    ad: "World Bank - International Comparison Program (ICP): History"
    url: https://www.worldbank.org/en/programs/icp/history
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "Gustav Cassel develops a modern definition"
    not: "Turlarin yillari, katilimci sayilari ve kavramin kronolojisi"
  - anahtar: k3
    tur: veri
    ad: "World Bank - ICP: PPP Calculation and Estimation (yontem notu)"
    url: https://www.worldbank.org/en/programs/icp/brief/methodology-calculation
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "change in the mix of economies included in the comparison"
    not: "Hesaplama adimlari: temel baslik, cok tarafli endeks, referans ve atanan pariteler"
  - anahtar: k4
    tur: birincil
    birincil_tur: eser
    ad: "Gustav Cassel - Money and Foreign Exchange After 1914 (New York: Macmillan, 1923 baskisi; ilk basim 1922) tam metin taramasi"
    url: https://archive.org/stream/moneyforeignexch00cassuoft/moneyforeignexch00cassuoft_djvu.txt
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "purchasing power parity"
    not: "Kunye taramanin kendi baslik sayfasindan okundu; onsoz Mart 1922 tarihli. Metin 400k penceresinde kesiliyor, ilgili bolum pencere icinde"
  - anahtar: k5
    tur: veri
    ad: "Our World in Data - What are international dollars?"
    url: https://ourworldindata.org/international-dollars
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "One international dollar is intended to buy the same quantity"
    not: "Iki cevrimin ayni yil icin urettigi farki sayiyla veren aciklama"
  - anahtar: k6
    tur: akademik
    ad: "Crossref kaydi - Deaton & Heston, Understanding PPPs and PPP-based National Accounts (AEJ: Macroeconomics, 2010)"
    url: https://api.crossref.org/works/10.1257/mac.2.4.1
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "close to impossible, even in theory"
    not: "Icerik iddiasi kaydin kendi ozet alanindan okundu; kayittaki baslik ve yazarlar ozetin sahibiyle ayni"
  - anahtar: k7
    tur: akademik
    ad: "Crossref kaydi - Bolt & van Zanden, Maddison-style estimates of the evolution of the world economy (Journal of Economic Surveys, 2024)"
    url: https://api.crossref.org/works/10.1111/joes.12618
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "the 1990 benchmark, the 2011 benchmark"
    not: "Capa yili tercihinin tarihsel gelir tahminleri uzerindeki etkisi; ozet duzeyinde destek"
  - anahtar: k8
    tur: akademik
    ad: "Crossref kaydi - Deaton & Schreyer, GDP, Wellbeing, and Health: Thoughts on the 2017 Round of the ICP (Review of Income and Wealth, 2021)"
    url: https://api.crossref.org/works/10.1111/roiw.12520
    erisim_tarihi: 2026-08-30
    dogrulama_dizesi: "broadly in line with earlier results from 2011"
    not: "Tur degisimlerinin her seferinde buyuk oynama uretmedigine dair karsi olcum"
son_denetim: 2026-08-30
denetim_durumu: bekliyor
onarim_turu: 0
---

Aynı ülkenin aynı yıldaki geliri iki farklı sayıyla anlatılabilir. Hindistan'da
kişi başına düşen gelir, piyasa kurundan dolara çevrildiğinde Amerika Birleşik
Devletleri'ndekinin yaklaşık 30'da biri kadar çıkar; aynı gelir yerel fiyat
düzeyine göre düzeltildiğinde fark sekiz kata iner.[^k5] Her iki sayı da 2023 yılına
aittir ve ikisi de 2021 taban yılına göre enflasyondan arındırılmıştır.[^k5]

Aradaki mesafe bir hesap hatası değil, bir çevrim tercihidir. Ülkeler arası
gelir karşılaştırmalarının neredeyse tamamı, piyasa kurunun yerine geçen ikinci
bir dönüştürme oranına dayanır; bu oran ölçülmez, kurulur. Satın alma gücü
paritesi hem bir para birimi çevrim katsayısı hem de mekânsal bir fiyat
endeksidir: ülkeler arasındaki fiyat düzeyi farklarını ortadan kaldırarak
paraları ortak bir birime taşır.[^k1] Taşıdığı belirsizlik dipnota atılabilecek
bir ayrıntı değil, sayının kendisinin bir parçasıdır.

## Piyasa kuru neyi ölçmez

Piyasa kuru bir para birimine duyulan toplam talebe göre oluşur ve bu talebin
bileşenleri arasında dış ticaretin ve sermaye aktarımlarının finansmanı
vardır.[^k1] Oysa gayrisafi yurt içi hasıla, inşaat, konut, sağlık, eğitim ve
kamu hizmetleri gibi uluslararası ticarete konu olmayan kalemleri de kapsar;
genel fiyat düzeyinin yüksek gelirli ülkelerde daha yüksek olmasının başlıca
sebebi de ticarete konu olmayan bu ürünlerdir.[^k1] Kur bütün kalemlere aynı
uygulandığından, fiyat düzeyi yüksek zengin ülkelerin büyüklüğü olduğundan
geniş, fiyat düzeyi düşük yoksul ülkelerinki olduğundan dar görünür.[^k1]

## Sepetten orana

Oranı üreten iş, 1968'de kurulan ve bugün Dünya Bankası'nın yürüttüğü
Uluslararası Karşılaştırma Programı'na aittir.[^k2] Program katılan ülkelerin
istatistik kurumlarına ortak tanımlı bir listenin fiyatlarını toplatır: 2021
turunda hane halkı tüketimi için kullanılan küresel çekirdek liste 651 kalem
içeriyordu ve harcamalar 155 temel başlığa bölünmüştü.[^k1]

Fiyatlar önce temel başlık düzeyinde ikili oranlara, sonra çok taraflı bir orana
dönüştürülür. Yöntemin can alıcı özelliği şudur: iki ülke arasındaki parite
üçüncü ülkelerin paritelerinden etkilenir, dolayısıyla karşılaştırmaya katılan
ülke bileşimi değiştiğinde herhangi iki ülke arasındaki oran da değişir.[^k3]
Fiyat toplamanın pahalı ya da güvenilmez olduğu bazı temel başlıklarda başka
başlıkların paritelerinden türetilmiş referans oranları kullanılır; programa hiç
katılmamış ülkeler için pariteler bir regresyon modeliyle atanır.[^k3]

## Kavram bir kur kuramı olarak doğdu

Terimi bugünkü anlamıyla ilk kuran, 1918'de İsveçli iktisatçı Gustav Cassel
oldu; pariteden gerçek gelir düzeylerini tahmin etmekte yararlanma fikri ise
1940'ta Colin Clark'a bağlanır.[^k2] Cassel'in *Money and Foreign Exchange After
1914* kitabında sorun gelir karşılaştırması değildi: 1914'ten sonra altın
standardını bırakan ülkelerin birbirinden bağımsız kâğıt paraları arasındaki
normal kurun ne olması gerektiğiydi.[^k4]

Cassel çekincesini de yazdı. İki ülkenin iktisadi durumundaki farklar,
özellikle ulaştırma ve gümrük alanındakiler, normal kurun paritenin gösterdiği
düzeyden bir ölçüde sapmasına yol açabilir; sorunun karmaşıklığı yüzünden bu
kuru kuramsal olarak hesaplamak güçtür.[^k4] Gelirlerin çevrilmesi bu kuramın
sonraki bir kullanımıdır ve program iki işi açıkça ayırır: pariteler denge kuru
sayılamaz ve bir paranın değerinin düşük ya da yüksek olduğunun göstergesi
olarak okunamaz.[^k1]

## Sayı hangi tura ait

Küresel karşılaştırmalar tur tur yapıldı: 1970, 1973, 1975, 1980, 1985, 1993,
2005, 2011, 2017 ve 2021.[^k2] Katılım 10 ülkeden 176'ya çıktı.[^k2] Çin
programa ilk kez 2005 turunda katıldı, Hindistan ise aynı tura 1985'ten sonraki
ilk katılımıyla döndü.[^k2] İki ülkenin o tarihe kadarki pariteleri, kendi fiyat
anketlerine dayanmıyordu.[^k2]

::tartismali[Bir gelir karşılaştırması, hangi turun ve hangi taban yılının paritesiyle çevrildiği söylenmeden aktarılamaz: tur değiştiğinde aynı ülkenin aynı yılı farklı bir sayıyla anlatılabilir.]{harita=tartisma-tarihsel-sayilar-nasil-okunur}

Program bunu kendisi de söylüyor. 2017 ile 2021 turları aynı yöntemi kullandı,
ama katılan ülke kümesi değişti ve iki turun sonuçları ancak bir miktar ihtiyatla
karşılaştırılabilir.[^k1] Aynı kaynak, tur sonuçlarının tek bir ülkenin
hasılasındaki zaman içindeki değişimi izlemek için kullanılmaması gerektiğini,
pariteleri zaman ve mekân boyutlarında aynı anda tutarlı tutmanın ise kavramsal
olarak imkânsız olduğunu belirtiyor.[^k1]

Uzun tarihsel serilerde geçmiş yüzyıllar için verilen kişi başına gelir
değerleri bir fiyat anketinden gelmez; bir çapa yılına bağlanıp zaman
serileriyle geriye taşınmış tahminlerdir.[^k7] Maddison Proje Veritabanı'nın 2023
sürümünü hazırlayan Bolt ve van Zanden, 1990 çapasının, 2011 çapasının ve çoklu
çapa yönteminin 1940 öncesi gelir tahminleri üzerindeki sonuçlarını ve
yanlılıklarını inceleyip projenin 1990 çapasında kalmasını önerdi.[^k7] Böyle
bir serinin dünya toplamı [Kişi başına GSYH, 1820–2022](/veri/kisi-basi-gsyh-1-2022/)
dosyasında tutuluyor.

## İtiraz ve yanlış okuma

Veriyi en yakından kullananlar sınırını da en açık yazanlar oldu. Angus Deaton
ile Alan Heston, 2005 turunun bölgesel yapısını da ele aldıkları
değerlendirmede, bazı uluslararası karşılaştırmaların kuramsal olarak bile
neredeyse imkânsız olduğunu, bazılarındaysa pratik güçlüklerin karşılaştırmayı
son derece riskli kıldığını yazdı.[^k6]

Bu itiraz her tur için aynı ağırlıkta değildir. Deaton ile Paul Schreyer, 2017
turunu değerlendirirken asıl önemli noktanın haberin yokluğu olduğunu, sonuçların
2011 turununkilerle genel olarak uyumlu çıktığını belirtti.[^k8] Ölçünün tur tur
sarsıldığı iddiası, bu yüzden her seferinde doğrulanmıyor.

Kavramın en sık çarpıtıldığı yer sıralama tablolarıdır. Hacim ve fiyat düzeyi
endeksleri ülkeleri kesin biçimde sıralamak için tasarlanmamıştır ve birbirine
yakın değerlerde toplanan ülkeler arasındaki farklar fazla yorumlanmamalıdır.[^k1]
İkinci yaygın hata pariteleri tasarlanmadıkları işlerde kullanmaktır: yatırım
akımları, yardım, dış ticaret, döviz rezervleri ve göçmen havaleleri parite ile
değil piyasa kuruyla karşılaştırılır.[^k1]

## Bugün nerede tartışılıyor

Ölçünün ağırlığı tartışmanın niçin teknik kalmadığını açıklıyor. Dünya Bankası
küresel yoksulluk sayılarında 2022'de 2017 turunun paritelerine geçti; aynı
pariteler Sürdürülebilir Kalkınma Amaçları göstergelerinin, İnsani Gelişme
Endeksi'nin ve Uluslararası Para Fonu ile OECD'nin dünya hasılası tahminlerinin
altında duruyor.[^k1] Bir ülkenin yoksul sayılıp sayılmadığı, bir sepetin
içeriğine ve bir tur numarasına bağlıdır;
[Aşırı yoksulluk oranı, 1990–2026](/veri/yoksulluk-orani/) ile
[Gini katsayısı](/kavram/gini-katsayisi/) dosyalarındaki sayılar da aynı
çevrimin ürünüdür.
