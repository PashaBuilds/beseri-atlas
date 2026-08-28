# Başlangıç fotoğrafı — 28 Ağustos 2026 (Ultracode ana görev)

HEAD: `895507048c37906c581cbfcc4c8945da9d43d548`
Çalışma ağacı: yalnızca `denetim/kapi-sonucu.json` değişik (kapı
çalıştırmalarının ürettiği dosya; korunuyor).

## Kanonik tanımlar

- **Gövde kelimesi**: `linter-derinlik.mjs` içindeki `kelimeSay` tanımı
  KANONİKTİR: kod blokları, `[^kN]` işaretleri, direktif süsleri, bağlantı
  URL'leri ve markdown işaretleri sayımdan düşülür; harf/rakam içermeyen
  parçalar sayılmaz. `uzunluk.mjs` bu fonksiyonu zaten içe aktarır — iki
  araç arasında ayrışma YOKTUR (28 Ağustos düzeltmesi: ilk fotoğraftaki
  "iki tanım var" notu, ölçüm betiğimin ham bölme kullanmasından
  kaynaklanan yanlış alarmdı).
- **Wikipedia payı**: URL hostname'i `wikipedia.org` içeren künye / toplam künye.
- **Birincilsiz makale**: KANONİK ölçü `linter-kaynak.mjs` içindeki
  `birincilSayilirMi` fonksiyonudur (alan sınıflandırmasını da hesaba
  katar; `veri` tipinde veri seti kaynağı yeterlidir) → 249 makale.
  `tur: birincil` alanına bakan dar sayım (292) kanonik değildir.
- **Hedef altı**: tip hedefinin alt sınırının altındaki gövde
  (donem 2500, olay/aktor/dusunur 1200, kavram 600, tartisma 1500).

## Ölçülen değerler (komutlar: node + araclar/ortak.mjs makaleleriTopla)

| Metrik | Değer |
|---|---|
| Makale | 505 |
| Gövde kelimesi (kanonik `kelimeSay`) | 307.469 |
| Künye | 1.674 |
| `onaylandi` | 505/505 |
| Denetim JSON (`denetim/raporlar/*-denetim.json`) | 359 → **146 makale raporsuz** |
| Çürütücü JSON | 359 |
| Wikipedia künyesi | 688 (%41,1) |
| >1 Wikipedia taşıyan makale (giriş kapısı ihlali) | 210 |
| Birincil kaynaksız makale | 292 |
| Benzersiz alan adı | **14** |
| İlk 3 alan | wikipedia 688, ourworldindata 273, islamansiklopedisi 200 |
| Kapsam içi makale (tip hedefi olan) | 421 |
| Hedef tutan | 164 |
| Hedef altı | 257 (olay 84, aktör 62, kavram 41, düşünür 36, tartışma 34) |
| Kelime borcu | 209.926 |
| "Atlas" geçişi | 2.843 (370 makalede) |
| "bu dosya" geçişi | 1.516 |
| "ayrıca kaydeder" kalıbı | 1.045 |
| "Bu dosyanın sınırı" başlığı | 344 makale |
| "Okuma yönlendirmesi" başlığı | 177 makale |
| Dolu `okuma_onerisi` | 4/505 |
| `any` kullanımı (src+araclar) | 48 |
| CI | yalnızca `npm ci && npm run build` (pages.yml) |
| `DURUM.md` | 28 makalelik eski aşamayı anlatıyor (bayat) |
| `RAPOR.md` | 359 makalelik korpusu anlatıyor (bayat) |

## Görev dosyası hipotezlerinden sapmalar

- Kelime toplamı kanonik tanımla 307.469 (hipotez ~307.430) — görev
  dosyasının sayıları kanonik tanımla uyumlu; ilk ölçümümdeki 313.182 ham
  bölme tanımının ürünüydü, geçersiz sayıldı.
- Birincilsiz makale kanonik ölçüyle 249 (hipotezle birebir);
  ilk ölçümümdeki 292, yalnızca `tur:` alanına bakan dar tanımdı.
- Hedef altı kanonik tanımla 259 (hipotez 261); toplam eksik 211.623
  kelime; ölçüm kapsamı 421, hedefte 162.
- Dönem sayacı çelişkisi (16/16 vs 14/16) ÇÖZÜLDÜ: kanonik tanımla
  donem-04 (2478) ve donem-06 (2489) hedef altındaydı; 28 Ağustos'ta
  ikisi de "Atlas ... ayrıca kaydeder" kalıbı doğal çözümleme cümleleriyle
  değiştirilerek 2500+ yapıldı → 16/16 kanonik tanımla da hedefte.

## Süreç durumu

- 16 rollü salt-okunur keşif dalgası başlatıldı (workflow `wf_91a6dbb1-e71`).
- Bu dosya, bitiş raporundaki karşılaştırmanın sabit başlangıç noktasıdır.
