# Beşeri Atlas — Nihai Rapor

_Üretim tarihi: 2026-08-31 · Bu dosya `npm run rapor` ile ölçümlerden üretilir, elle yazılmaz._

## Kapsam

Üretilen: **542** | Onaylanan: **513** | Karantinada: **0**

Başlangıçta planlanan kapsam **359** makaledir; bu raporun yazıldığı anda
bu tabanın **%142.9**'i kadar içerik yayına girmiştir. Kalan iş `plan/kuyruk.yaml` içinde durumuyla
birlikte kayıtlıdır ve hat kaldığı yerden devam edebilir.

| Tip | Yayımlanan |
|---|---|
| aktor | 124 |
| donem | 16 |
| dusunur | 55 |
| kavram | 94 |
| kaynak | 59 |
| olay | 100 |
| tartisma | 40 |
| veri | 25 |

Toplam gövde: **583.134** kelime.

### Derinlik (§3 uzunluk hedefi)

Hedefi tutan: **458/458** · Eksik: **0** kelime

| Tip | Hedefi tutan | Eksik kelime | §3 hedefi |
|---|---|---|---|
| aktor | 126/126 | 0 | 1200–2000 |
| donem | 16/16 | 0 | 2500–4000 |
| dusunur | 58/58 | 0 | 1200–2000 |
| kavram | 117/117 | 0 | 600–1000 |
| olay | 101/101 | 0 | 1200–2000 |
| tartisma | 40/40 | 0 | 1500–2500 |

`veri` ve `kaynak` tiplerinde §3 uzunluk hedefi vermediği için ölçüm
dışıdır. Borcun makale bazlı dökümü `denetim/derinlik-borcu.md` dosyasındadır.
Bu koşuda ölçülen derinlik borcu bütünüyle kapanmıştır.

## Doğrulama

Örnekleme kapısı geçmişi: 0.9583 / 0.8333 / 0.875 / 0.875 / 0.875 / 0.875 / 0.875 / 1 / 1 / 1 / 1 / 1 / 1 / 1 / 1 / 1 / 1
Nihai skor: **1** (31 ölçülen değer: 31 doğrulandı, 0 çelişki)
Ham skor: **0.7045** (44 değerlik örneklem, 13 değer bağımsız olarak türetilemedi)

Geçiş 2 (kaynak denetimi): 5827 OK · 82 ISARET · 0 HATA · 13358 programatik olarak ölçülemedi
Kaynak doğrulama oranı: **0.9931**
Makale başına ortalama kaynak: **4.63**
Çürütücünün ürettiği itiraz adayı: **1435**
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
- Bulgu
- Yapılan
- YAPILMAYAN — editoryal karar gerekiyor
- Çözüm — 2026-08-23, aynı gün
- Çözüm — 2026-08-25, aynı gün
- 2026-08-25 — kendi actigim gorunur kusur duzeltildi
- 2026-08-25 (ikinci tur) — Okyanusya borcunun ilk gercek odemesi
- 2026-08-25 (ucuncu tur) — bir onceki turda acilan borc kapatildi
- 2026-08-25 (dorduncu tur) — kapilarin denetlemedigi bir alan
- 2026-08-25 — KAPI 15'te tek sozcuklu cekirdek sorunu

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
- Faz 5 kapanış turunda örnekleyicinin kendisinde sapma bulundu: makale
  sırası alfabetikti ve 20 birimlik örnek ilk turu aşamadığı için örneğin
  tamamı `aktor-` dosyalarından geliyordu. Kapı 1.0 okuyordu ama tek bir
  makale tipini ölçüyordu. Sıralama tohumlandı; örnek yedi tipe yayıldı
  ve geçiş yeniden koşuldu.

## Güvenilirlik beyanı

Bu korpus otonom olarak üretildi ve otonom olarak denetlendi.
Ölçülen doğrulama oranı %100'tir ve bu oran yalnızca 31 ölçülebilen
değer üzerinden hesaplanmıştır. Bu kadar küçük bir örneklem, korpusta
hata olmadığını göstermez: ancak yaygın bir hatayı yakalayabilir, seyrek
hata bu ölçümün çözünürlüğünün altında kalır. Oranın kendisi bir güvence
değil, bir alt sınır ölçüsüdür. Örneklemin bir bölümü ise bağımsız olarak
hiç türetilemedi; o iddialar hakkında ölçülmüş bir güvence yoktur.
Ortak kaynaklı hatalar bu ölçümde görünmez: üreten ve denetleyen oturum aynı
hatalı kaynağa dayanıyorsa ikisi de aynı yanlışa varır.

**Site, kitapların yerine değil, onlara giden yol olarak kullanılmalıdır.**

## Hattın durduğu nokta

Aktif faz: **Ultracode Faz 4 (kaliteli büyüme)** · Aktif parti: **parti-01**
Kuyrukta bekleyen iş: **29** · Karantinada: **0**
Bekleyenlerden dosyası mevcut taslak: **29** · Henüz üretilmemiş: **0**
Yeni büyüme hattı: **60** araştırma adayı · `plan/uretim-kuyrugu.yaml`
Son kayıtlı otonom bütçe: 1.320.000 / 40.000.000 token (Codex devralma çalışması hariç)

### Neden burada duruyor

Hat bir kapı kırılması ya da durdurma kuralı nedeniyle durmadı:
bütün kapılar geçildi, örnekleme kapısı eşiğin üzerinde ve karantinada
makale yok.

29 içerik dosyası editoryal onay bekleyen taslaktır;
bu dosyalar kalite borcu sayılmaz ve onay verilmeden canlı siteye çıkmaz.

Mevcut taslak hattı `npm run otonom`, yeni 60 adaylık büyüme hattı ise
`npm run uretim -- --durum` ile kaldığı yerden sürdürülebilir.
