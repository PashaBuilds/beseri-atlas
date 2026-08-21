# Beşeri Atlas — Nihai Rapor

_Üretim tarihi: 2026-08-21 · Bu dosya `npm run rapor` ile ölçümlerden üretilir, elle yazılmaz._

## Kapsam

Üretilen: **277** | Onaylanan: **277** | Karantinada: **0**

Planlanan tam kapsam **312** makaledir; bu raporun yazıldığı anda
**%88.8**'i yayına girmiştir. Kalan iş `plan/kuyruk.yaml` içinde durumuyla
birlikte kayıtlıdır ve hat kaldığı yerden devam edebilir.

| Tip | Yayımlanan |
|---|---|
| aktor | 64 |
| donem | 16 |
| dusunur | 36 |
| kavram | 64 |
| kaynak | 1 |
| olay | 86 |
| tartisma | 9 |
| veri | 1 |

Toplam gövde: **90.868** kelime.

## Doğrulama

Örnekleme kapısı geçmişi: 0.9583 / 0.8333 / 0.875 / 0.875 / 0.875 / 0.875 / 0.875 / 1 / 1 / 1 / 1 / 1
Nihai skor: **1** (13 ölçülen değer: 13 doğrulandı, 0 çelişki)
Ham skor: **0.4643** (28 değerlik örneklem, 15 değer bağımsız olarak türetilemedi)

Geçiş 2 (kaynak denetimi): 1656 OK · 4 ISARET · 0 HATA · 1502 programatik olarak ölçülemedi
Kaynak doğrulama oranı: **0.9988**
Makale başına ortalama kaynak: **3.10**
Çürütücünün ürettiği itiraz adayı: **401**
Çapraz tutarlılık çelişkisi: **0**

### İki skorun anlamı

İki sayı ayrı ayrı verilir çünkü aynı şeyi ölçmezler:

- **Ölçülen skor**, bağımsız olarak yeniden türetilebilen iddialar arasında
  doğrulananların oranıdır.
- **Ham skor**, örneklemin tamamı üzerinden hesaplanır ve türetilemeyen her
  iddiayı başarısız sayar.

Aradaki fark, korpusun yanlışlığını değil **ölçüm kapasitesinin sınırını**
gösterir. Türetilemeyen iddialar çürütülmemiştir; hiç ölçülememiştir.
Bu ayrımı gizlemek, hattın kendi kendini kandırması olurdu.

## Zayıf noktalar

Ayrıntılı liste `denetim/MUDAHALE-GEREKLI.md` dosyasındadır. Başlıklar:

- 1. Bağımsız yeniden türetme için doğrulanabilir kaynak yetersiz
- 2. Çözülemeyen tarih ayrışması: Warren Thompson
- 3. Osmanlı kuruluş tarihi: 1299 mu 1300 mü?
- Tanı — neden 0.875?
- Yapılan onarım denemesi
- UYGULANMAYAN onarım — bilerek kullanıcıya bırakılıyor
- Durum
- Karar alındı ve uygulandı — 2026-08-21

Karantinaya alınan makale yok.

## Hattın kendi bulduğu kusurlar

Doğrulama geçişlerinin değeri, ne yakaladıklarıyla ölçülür. Bu koşuda:

- Geçiş 2, cümle bölücüsündeki bir hatayı ve `normalize()` fonksiyonundaki
  Türkçe yerel küçültme sorununu ortaya çıkardı; ikisi de referansların
  yanlış iddialara atfedilmesine yol açıyordu.
- Geçiş 2, grafik sayfalarının sayısal değerleri taşımadığını gösterdi;
  künyeler değerlerin gerçekten bulunduğu CSV uç noktalarına taşındı.
- Geçiş 3, KAPI 2'nin yazıyla yazılmış nicelikleri kaçırdığını buldu;
  linter sıkılaştırıldı ve iki kaynaksız iddia yakalandı.
- Geçiş 4, bir tarihte kaynaklar arası ayrışma buldu ve iddia çıkarıldı.
- Geçiş 4, türetme cevabının bloke bir alan adından geldiğini yakalayıp
  reddetti — bağımsızlık şartı fiilen zorlanıyor.

## Güvenilirlik beyanı

Bu korpus otonom olarak üretildi ve otonom olarak denetlendi.
Ölçülen doğrulama oranı %100'tir; yani her 20 iddiadan yaklaşık
1 tanesinin kaynağa gidildiğinde
doğrulanamaması beklenir. Örneklemin bir bölümü ise bağımsız olarak hiç
türetilemedi; bu iddialar hakkında ölçülmüş bir güvence yoktur.
Ortak kaynaklı hatalar bu ölçümde görünmez: üreten ve denetleyen oturum aynı
hatalı kaynağa dayanıyorsa ikisi de aynı yanlışa varır.

**Site, kitapların yerine değil, onlara giden yol olarak kullanılmalıdır.**

## Hattın durduğu nokta

Aktif faz: **4** · Aktif parti: **B01**
Kuyrukta bekleyen iş: **32** · Karantinada: **0**
Harcanan bütçe: 1.320.000 / 40.000.000 token

### Neden burada duruyor

Hat bir kapı kırılması ya da durdurma kuralı nedeniyle durmadı:
bütün kapılar geçildi, örnekleme kapısı eşiğin üzerinde ve karantinada
makale yok. Kuyrukta bekleyen iş, henüz üretilmemiş içeriktir.

`npm run otonom` yeniden çalıştırıldığında hat `DURUM.md` ile
`plan/kuyruk.yaml`yi okuyup sıradaki partiden devam eder; üretilmiş
hiçbir iş tekrarlanmaz.
