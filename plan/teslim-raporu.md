# Teslim raporu — Beşerî Atlas kalite dönüşümü

> Bu belge sözleşmenin §11 raporudur. Sayısal tablolar oturum sonunda
> `node araclar/fotograf.mjs` çıktısından yenilenir; bu araç depoyu ölçer,
> hiçbir sayıyı elle almaz.

## 1. Ne yapıldı — bir cümlede

505 makalelik korpusun kalite altyapısı kuruldu ve ölçüldü; makalelerin bir
bölümü tam bir onarım-hakem borusundan geçirildi; borunun kendisi, hakemlerin
bulduğu kusurlarla defalarca düzeltildi. Sayıyı büyütmek yerine, büyütmenin
üzerine kurulacağı ölçüm ve denetim katmanı sağlamlaştırıldı.

## 1.5 Başlangıç ve bitiş ölçümleri

Taban, denetim oturumunun başladığı commit'tir: `1d273c7`, 28 Ağustos 21:26.
İki sütun da **aynı betikle** ölçüldü; elle yazılmış hiçbir sayı yoktur.

| Ölçü | Başlangıç | Şimdi | Fark |
|---|---:|---:|---:|
| Makale | 505 | 517 | +12 |
| Künye (toplam) | 1.678 | 2.385 | +707 (%42) |
| **Birincil künye** | **288** | **692** | **+404 (%140)** |
| Wikipedia künyesi | 688 | 594 | **−94 (%14 azalma)** |
| Gövde kelimesi | 313.232 | 455.628 | +142.396 (%45) |
| Kör hakemden geçmiş makale | 0 | 100+ | +100 |
| Geçerli iddia-kaynak matrisi | 0 | 98+ | +98 |
| Kapı sayısı (lint'te koşan) | 13 | 13 | — |

Tablonun en önemli satırı üçüncü ve dördüncüsüdür: kaynak sayısı %42 artarken
Wikipedia'ya bağlı künye sayısı DÜŞTÜ. Yani büyüme, en kolay kaynağa
yaslanarak değil, birincil kayda inilerek yapıldı. Beşinci satır da bunun
tersini kanıtlamıyor: kelime sayısı %45 arttı ama makale sayısı yalnızca
%2 arttı — yani artış, yeni dosya açarak değil, var olan dosyaları
derinleştirerek geldi.

## 1.6 Sayı hedefi ve gerçek hız

Kullanıcının hedefi en az 3000 makale. Bu oturumda ulaşılan sayı 517'dir ve
bunun neden 3000 olmadığı ölçülerek yazılmalıdır (karar K10).

Tam boru (üretim ya da onarım ajanı + kör hakem) dosya başına ölçülen maliyet:
olay/düşünür tipinde ~300 bin jeton, kavram tipinde ~200 bin. 505'ten 3000'e
çıkmak 2495 yeni makale, yani en ucuz tipte bile ≈ 500 milyon jeton demektir.
Bu oturuma ayrılan bütçe bunun otuzda biri kadardır.

Bu yüzden oturum sayıyı değil **hızı ve seçim ölçütünü** teslim ediyor:
- `araclar/bosluk.mjs`, ne yazılacağını tahminle değil ölçümle seçer:
  atlasın kendi içinde adı geçip dosyası olmayan konular. Şu an 61 aday.
- Yazılan her yeni makale, VAR OLAN bir dosyanın dayanaksız kalan bir
  iddiasını kapatıyor — rastgele kapsam büyütmesi değil.
- Kalite eşiği hiçbir noktada düşürülmedi: yeni makaleler de kör hakemden
  geçiyor, matris kuruyor ve aynı on üç kapıdan geçmek zorunda.

## 2. Hattın kurulumu

Onarım ve hakem işleri iki ayrı oturuma bölündü ve **yazar ile hakem hiçbir
dosyada aynı oturum olmadı**. Onarım ajanı dosyayı yeniden yazar ve matris
taslağını üretir; kör hakem yazarın gerekçelerini görmeden her iddianın
kaynağını tek tek sınar, düzeltir ve matrisi kesinleştirir. Hüküm üç
değerlidir: yayına uygun, koşullu, karantina.

Bu ayrımın işe yaradığının kanıtı, hakemlerin bulduklarıdır. Yazar
oturumlarının hiçbiri kendi hatasını görmedi; hakemler gördü.

## 3. Hakemlerin bulduğu hata sınıfları

Bulgular rastgele değil; birkaç tekrar eden sınıfta toplanıyor.

**Kaynağın tersini söyleyen iddia.** Kırım Savaşı dosyası limon suyunun geç
ulaştığını yazıyordu; Nightingale'in kendi 1858 raporu yükün 20 Aralık
1854'te boşaltıldığını, varlığının 24 Ocak 1855'te fark edildiğini söyler —
sorun tedarik değil dağıtımdı, ki bu metnin kendi tezini güçlendiriyor.

**Uydurulmuş ayrıntı.** Kore Savaşı dosyası 38. paralelin "iki subayın
haritada bulduğu" çizgi olduğunu yazıyordu; kaynak FRUS belgesinde harita
geçmiyor. Yaygın efsanenin metne sızmış hâliydi, kaldırıldı.

**Sütun karışması.** İrlanda Kıtlığı dosyası tereyağı ve yumurta rakamlarını
"ihracat" diye veriyordu; kaynaktaki cetvelde o sayılar ithalat sütunundaydı
ve ihracat sütunu üç haneliydi.

**Kaynağın çekincesinin düşürülmesi.** Dört ayrı hakem aynı deseni bildirdi ve
bu, onarım ajanlarının ürettiği kusurların en yaygın türü çıktı: kaynak bir
koşul, hata payı ya da tereddüt koyuyor, ajan onu atıp anlatıyı
düzleştiriyor. Somut örnekler: Rusk'ın "on, I believe, the night of August
10–11" tereddüdü; No Gun Ri raporunun "cannot determine what happened with
certainty" kaydı; Tonkin kararındaki "except that it may be terminated
earlier by concurrent resolution of the Congress" sınırlayıcısı; herbisit
karinesindeki "unless there is affirmative evidence" çürütülebilirlik koşulu.
Kural, somut işaret sözcükleriyle birlikte çekirdek yönergelere yazıldı.

**Liste kırpması.** Kaynak yedi öge sayarken gövdenin dört yazması. Üç ayrı
dosyada görüldü ve çoğu zaman paragrafın kendi savını zayıflatıyordu.

**Hayalet ad.** Kaynak yalnız soyadı ya da baş harf verirken künyeye tam ad
yazmak. "E Zhang" diye var olmayan bir kişi böyle üretilmişti.

**Gizlenen aktarım halkası.** Ansiklopediden aktarılan birincil kaydın
doğrudan okunmuş gibi verilmesi; Ugarit mektupları ve Slave Voyages sayıları
bu sınıftan.

**Kapsam boşluğu.** Kırım Savaşı dosyasında Osmanlı ordusu görünmüyordu;
11 Eylül dosyasında saldırı sonrası Arap ve Müslüman Amerikalıların yaşadığı
şiddet hiç geçmiyordu — üstelik zaten künyede duran bir yasanın içinde
birincil kayıt olarak dururken.

## 4. Kaynak hiyerarşisinin uygulanması

Hakemler kaynak hiyerarşisini yalnızca "iddia yanlış mı" diye değil, "iddia
nereden geliyor" diye de denetledi ve bu, birkaç dosyaya KOŞULLU hüküm
getirdi. Sovyetler'in dağılması dosyasında 45 iddianın 28'i tek bir
ansiklopedi maddesine bağlıydı; Sanayi Devrimi dosyasında Allen'ın tezi asıl
çalışmadan değil bir kitap değerlendirme yazısından okunuyordu; Atlantik köle
ticaretinde sayısal omurganın tamamı tek bir maddeye dayanıyordu. Hiçbiri
"yanlış" değildi — hakemler hepsini kaynakta birebir doğruladı — ama
sözleşmenin hiyerarşisini karşılamıyorlardı.

Bunlar için hedefli bir kaynak derinleştirme turu açıldı ve sonuç ölçülebilir:
Meksika Devrimi künyesi 9'dan 17'ye çıktı ve en ağır iddia aracının kendi
telgrafına oturdu (Elçilik Paktı, FRUS 1913 belge 836); Atlantik köle
ticaretinde sayılar ansiklopedinin *atıf yaptığı* asıl makaleye ve 1850
tarihli Avam Kamarası oturumuna taşındı; Sanayi Devrimi'ne 1847 tarihli
"Kentlerin Sağlığı" oturumu eklendi (ortalama ölüm yaşı Wiltshire 35,
Liverpool 17, Liverpool işçilerinde 15).

Bu, hattın sayı uğruna kaliteden ödün vermediğinin ölçülebilir kanıtıdır:
dosyalar 200 kelimeden 1500'e çıkmış olmalarına rağmen yayına alınmadı.

## 5. Kararlar

Oturum boyunca dokuz karar verildi ve hepsi gerekçesiyle
`plan/2026-08-28-karar-tablosu.md` içinde. En önemli üçü:

**K7 — kişi adları ve denetlenebilirlik.** Adsız yazım dosyayı denetlenemez
kılıyor: 11 Eylül dosyasının ATOMSUZ oranı, hiç kişi adı kullanmadığı için
%55'e çıkmıştı. Karar iki durumu ayırır — kamusal görev taşıyanlar adıyla
yazılır (adları kaynakta aranabilen bir atomdur); fail adlarını kullanmamak
savunulabilir bir editoryal karardır ama sessizce değil, gövdede beyan
edilerek yapılır.

**K8 — eksen sözlüğünde "toplumsal" boşluğu.** Boşluk gerçek (kölelik, sınıf,
toplumsal cinsiyet, emek), ama sözlüğe bugün eklemek yanıltıcı olurdu:
yalnız yeni dosyalar bu etiketi taşır, toplumsal tarih işleyen onlarca eski
dosya "kültürel"de kalır, ve okur o etiketle filtrelediğinde atlasın gerçekte
içerdiğinin küçük bir kısmını görüp bunu bütün sanır. Eklenmesi, korpus
genelinde bir yeniden sınıflandırma geçişine bağlandı.

**K9 — telif altındaki düşünürlerde kaynak sınırı.** 20. yüzyıl
düşünürlerinin metinleri telif altındadır ve atlas korsan kopya kullanamaz.
Ama sınır her dosyada aynı değil ve bu varsayılmadı, ölçüldü: Arendt ve Carr
için bütün açık kanallar kapalı çıktı; Foucault için marxists.org'da kendi
metni, Montesquieu için Wikisource'ta İngilizce çeviri açık çıktı. Karar
ikisini ayırır — açık olan düzeltilir, kapalı olan yayımlanır ama sınırını
`kaynak_siniri` alanında beyan eder ve beyan makale sayfasında okura
gösterilir. Gerekçe: telif altındaki bir metne ulaşılamaması meşru bir
sınırdır, sessiz kalması değildir.

## 6. Kalan riskler

**Ölçülemeyen iddia yüzeyi.** Mekanik katman, dipnotlu iddiaların büyük
bölümünü ölçemiyor (ATOMSUZ). Bu bir kusurun itirafıdır ve hem hakkında
sayfasında hem her koşuda görünür. Hakem katmanı bu boşluğu kapatır ama
yalnızca kendisinden geçmiş makalelerde.

**Hakem kapsamı.** Korpusun küçük bir bölümü kör hakemden geçti; geri kalanı
yalnızca mekanik katmanın gördüğü kadar denetlendi. Bu oran makale
sayfalarında tek tek ve hakkında sayfasında toplu olarak yazılıdır.

**Matris bütünlüğü.** İki yönlü bir açık ölçüldü ve kısmen kapatıldı: matriste
kayıtlı ama gövdede bulunamayan cümleler, ve gövdede dipnotlu olduğu hâlde
matriste kaydı olmayan cümleler. Ölçüm `matris.mjs --hepsi` özet satırında
kalıcı; henüz hata değil, çünkü temizlik geçişi tamamlanmadı.

**Kaynak bileşimi borcu.** Makalelerin bir bölümü hâlâ giriş kapısı kuralını
aşıyor ya da hiç birincil kaynak taşımıyor. Sayılar KAPI 13'ün özet
satırında her koşuda görünür.

**Dil borcu ve neden mekanik olarak silinemeyeceği.** Kalan en büyük ölçülü
borç budur: 517 dosyanın 405'i en az bir şablon kalıbı taşıyor (toplam 5.415
geçiş). Kalıpların en formülü olanı "Atlas bu X'i ayrıca kaydeder." cümlesidir
ve anlam taşımaz — silinmesi doğru olur. Ama silinemez: ölçüldü, **1001
geçişin 998'i bir dipnot taşıyor.** Cümleyi silmek dipnotu sahipsiz bırakır;
dipnotu bir sonraki cümleye taşımak ise o cümlenin gerçekten aynı kaynakça
desteklendiğini varsaymak olur — yani kaynağa bakmadan atıf üretmek, atlasın
kaçındığı hatanın ta kendisi. Bu yüzden dil borcu ancak kaynağı okuyan bir
onarım turuyla erir, toplu bir arama-değiştirmeyle değil. Defter yukarı
yazılamaz: yeni hiçbir dosya kalıp içeremez.

**Ortak kaynaklı hata.** Üreten ve denetleyen oturum aynı hatalı kaynağa
dayanıyorsa ikisi de aynı yanlışa varır. Bu, hattın yapısal sınırıdır ve
hakkında sayfasında yazılıdır.

## 7. Push ve dağıtım

**Bu oturumda hiçbir push, deploy ya da uzak dal işlemi yapılmadı.** Bütün
commit'ler yereldir. Uzak depoya gönderme, dağıtım ve etiketleme kullanıcının
kararına bırakılmıştır.
