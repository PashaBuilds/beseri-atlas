# Faz notları — her fazın sonunda ne öğrenildi

Bu dosya, hattın kendi işleyişi hakkında öğrendiklerini tutar. İçerik değil,
**süreç** kaydıdır. Kapı eşikleri hiçbir zaman aşağı çekilmez; öğrenilen şey
ölçme aracının ya da planın düzeltilmesidir.

---

## Faz 0 — Altyapı ve kalibrasyon (10 makale)

**Kapı sonucu:** 8/8 kontrol geçti. Örnekleme kapısı 0,9583 → DEVAM.

### Doğrulama geçişlerinin bulduğu gerçek kusurlar

1. **Geçiş 2, cümle bölücüsünde bir hata buldu.** Cümle sonu noktasından sonra
   gelen dipnot işareti (`…verildi.[^k1] Bu…`) hesaba katılmıyordu; iki ayrı
   iddia tek cümlede birleşiyor ve referanslar yanlış iddiaya atfediliyordu.
2. **Geçiş 2, `normalize()` fonksiyonunda bir dil hatası buldu.** Türkçe yerel
   küçültme, İngilizce metindeki `I` harfini noktasız `ı` yapıyor; "India"
   aranırken bulunamıyordu. İki tarafta birden uygulanan noktalı/noktasız i
   katlaması sorunu çözdü.
3. **Geçiş 2, grafik sayfalarının sayısal değer taşımadığını gösterdi.** OWID
   grafik sayfaları künyede kullanılıyordu ama sayılar orada yok; künyeler
   değerlerin gerçekten bulunduğu CSV uç noktalarına taşındı.
4. **Geçiş 3, KAPI 2'nin bir boşluğunu buldu.** Yazıyla yazılmış nicelikler
   ("dört büyük imparatorluk dağıldı") dipnotsuz geçebiliyordu. Linter
   sıkılaştırıldı; iki makalede kaynaksız iddia bulundu.
5. **Geçiş 4, bir tarihte kaynaklar arası ayrışma buldu.** Warren Thompson'ın
   çalışması bir kaynakta 1930, bağımsız türetmede 1929. İki alternatif kaynak
   denendikten sonra yıl iddiası makaleden çıkarıldı ve ayrışma beyan edildi.
6. **Geçiş 4, kendi türetme cevabını reddetti.** Verilen doğrulama kaynağı,
   makalenin bloke edilmiş alan adlarından biriydi; orkestratör bunu yakaladı ve
   HATA olarak işaretledi. Bağımsızlık şartı fiilen zorlanıyor.

### Kaynak havuzu hakkında öğrenilen

Beyaz listedeki alanların programatik doğrulanabilirliği **ölçüldü**, varsayılmadı:

- `britannica.com` ve `iranicaonline.org` bot koruması nedeniyle HTTP 403
- `population.un.org` ve `jstor.org` istemci tarafında çiziliyor, gövde boş
- `dergipark.org.tr` yalnızca özet + kaynakça veriyor, tam metin yok

Bunlar `dogrulanabilir: false` işaretlendi ve künyede kullanılamaz hâle getirildi.
Bu bir gevşetme değil sıkılaştırmadır: doğrulanamayan bir künye, doğrulanmış gibi
görünen bir künyeden daha tehlikelidir.

**Sonuç:** geriye üç doğrulanabilir omurga kalıyor (`archive.org`,
`islamansiklopedisi.org.tr`, `en.wikipedia.org`). Bloklama kuralı bunlardan
ikisini kullanan bir makalede üçüncüsünü tek doğrulayıcı bırakıyor. Ayrıntı ve
editoryal karar talebi `denetim/MUDAHALE-GEREKLI.md` dosyasındadır.

---

## Faz 1 — Kronolojik omurga (16 dönem makalesi)

**Kapı sonucu:** 6/6 kontrol geçti. Kaynak doğrulama oranı 0,9938.

### Orkestratörde bulunan tasarım hatası

Boş kuyruk "faz bitti" sayılıyordu. Hat, hiçbir şey üretmeden bütün fazları
geçip "tüm fazlar tamamlandı" diyebiliyordu. İki düzeltme yapıldı:

1. Faz hedefi tutmadan faz ilerlemiyor.
2. Hedef, kuyruk satırlarıyla değil **korpustaki onaylı makalelerle** ölçülüyor —
   bir makale önceki bir fazda üretilmiş olabilir (donem-13 Faz 0'da üretildi
   ama kronolojik omurganın parçasıdır).

### Geçiş 5'in bulduğu

On tek yönlü `ilgili` bağı çelişki olarak raporlandı. Bunun üzerine
`araclar/bag-onar.mjs` yazıldı: eksik geri bağları ekler, bağ **silmez** (bir
bağın yanlış olduğuna karar vermek editoryal bir iştir).

### Yazım disiplini hakkında öğrenilen

İlk dönem makalelerinde tekrar eden tek hata tipi şuydu: çerçeve paragrafları
(giriş, geçiş, kapanış cümleleri) dipnotsuz yazılıyor ve KAPI 2 bunları
yakalıyordu. Düzeltme içeriği zayıflatmadı, tersine güçlendirdi — her çerçeve
cümlesi kaynağa bağlanabilir bir olguya dayandırıldı.

---

## Faz 2 — Ana gövde (devam ediyor)

### Planda bulunan sıralama hatası

`olay-neolitik-devrim` ve `olay-gobeklitepe` makaleleri `guven_geneli:
tartismali` işaretlidir; KAPI 9 bunların bir tartışma haritasına bağlanmasını
zorunlu kılar (İlke 2). Ama ihtiyaç duydukları harita —
`tartisma-tarim-devrimi-ilerleme-mi` — planda **Faz 4**'e konmuştu.

Bu bir faz atlama gerekçesi değil, **planın kendisindeki bir bağımlılık
hatasıdır**. Doğru düzeltme kök nedene yapıldı: ilgili tartışma haritası
Faz 2'ye taşındı ve `plan/kapsam.yaml` içinde bağımlılık olarak kaydedildi.

**Genel kural olarak çıkarılan ders:** `tartismali` etiketli bir olay/aktör
makalesi, bağlı olduğu tartışma haritasından **sonra** üretilmelidir. Kalan
fazlarda bu bağımlılık kuyruk sırasına yansıtılmalıdır.
