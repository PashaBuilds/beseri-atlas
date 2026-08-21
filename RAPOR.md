# Beşeri Atlas — Nihai Rapor

_Üretim tarihi: 2026-08-21 · Bu dosya `npm run rapor` ile ölçümlerden üretilir, elle yazılmaz._

## Kapsam

Üretilen: **94** | Onaylanan: **94** | Karantinada: **0**

Planlanan tam kapsam **228** makaledir; bu raporun yazıldığı anda
**%41.2**'i yayına girmiştir. Kalan iş `plan/kuyruk.yaml` içinde durumuyla
birlikte kayıtlıdır ve hat kaldığı yerden devam edebilir.

| Tip | Yayımlanan |
|---|---|
| aktor | 20 |
| donem | 16 |
| dusunur | 1 |
| kavram | 2 |
| kaynak | 1 |
| olay | 46 |
| tartisma | 7 |
| veri | 1 |

Toplam gövde: **40.345** kelime.

## Doğrulama

Örnekleme kapısı geçmişi: 0.9583 / 0.8333 / 0.875 / 0.875
Nihai skor: **0.875** (12 ölçülen iddia: 9 tam doğrulama, 3 kısmi doğrulama (yarım puan), 0 çelişki)

> **HAT DURDU.** Ölçülen skor 0,90 eşiğinin altına düştü ve §16 uyarınca
> üretim durduruldu. Tanı, onarım denemesi ve bekleyen karar
> `denetim/MUDAHALE-GEREKLI.md` dosyasındadır.
Ham skor: **0.45** (20 iddialık örneklem, 8 iddia bağımsız olarak türetilemedi)

Geçiş 2 (kaynak denetimi): 885 OK · 7 ISARET · 0 HATA · 393 programatik olarak ölçülemedi
Kaynak doğrulama oranı: **0.9961**
Makale başına ortalama kaynak: **3.26**
Çürütücünün ürettiği itiraz adayı: **190**
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
Ölçülen doğrulama oranı %88'tir; yani her 20 iddiadan yaklaşık
2 tanesinin kaynağa gidildiğinde
doğrulanamaması beklenir. Örneklemin bir bölümü ise bağımsız olarak hiç
türetilemedi; bu iddialar hakkında ölçülmüş bir güvence yoktur.
Ortak kaynaklı hatalar bu ölçümde görünmez: üreten ve denetleyen oturum aynı
hatalı kaynağa dayanıyorsa ikisi de aynı yanlışa varır.

**Site, kitapların yerine değil, onlara giden yol olarak kullanılmalıdır.**

## Hattın durduğu nokta

Aktif faz: **2** · Aktif parti: **B01**
Kuyrukta bekleyen iş: **24** · Karantinada: **0**
Harcanan bütçe: 1.320.000 / 40.000.000 token

### Neden burada duruyor

Hat bir kapı kırılması ya da durdurma kuralı nedeniyle durmadı:
bütün kapılar geçildi, örnekleme kapısı eşiğin üzerinde ve karantinada
makale yok. Kuyrukta bekleyen iş, henüz üretilmemiş içeriktir.

`npm run otonom` yeniden çalıştırıldığında hat `DURUM.md` ile
`plan/kuyruk.yaml`yi okuyup sıradaki partiden devam eder; üretilmiş
hiçbir iş tekrarlanmaz.
