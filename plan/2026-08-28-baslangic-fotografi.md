# Başlangıç fotoğrafı — 28 Ağustos 2026 (Ultracode ana görev)

HEAD: `895507048c37906c581cbfcc4c8945da9d43d548`
Çalışma ağacı: yalnızca `denetim/kapi-sonucu.json` değişik (kapı
çalıştırmalarının ürettiği dosya; korunuyor).

## Kanonik tanımlar

- **Gövde kelimesi**: frontmatter (`---...---`) çıkarılır, `[^kN]`
  işaretleri çıkarılır, boşluğa bölünür, boş olmayan parçalar sayılır.
  (`araclar/uzunluk.mjs` ile aynı tanım. `linter-derinlik.mjs` içindeki
  `kelimeSay` ayrıca direktif süslerini de çıkarır — iki araç arasındaki
  fark budur ve Faz 1'de tek tanıma bağlanacak.)
- **Wikipedia payı**: URL hostname'i `wikipedia.org` içeren künye / toplam künye.
- **Birincilsiz makale**: `kaynaklar` içinde `tur: birincil` bulunmayan makale.
- **Hedef altı**: tip hedefinin alt sınırının altındaki gövde
  (donem 2500, olay/aktor/dusunur 1200, kavram 600, tartisma 1500).

## Ölçülen değerler (komutlar: node + araclar/ortak.mjs makaleleriTopla)

| Metrik | Değer |
|---|---|
| Makale | 505 |
| Gövde kelimesi (kanonik) | 313.182 |
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

- Kelime toplamı 313.182 çıktı (hipotez ~307.430) — kelime tanımı farkı;
  kanonik tanım yukarıda sabitlendi.
- Birincilsiz makale 292 çıktı (hipotez 249) — tanım: `tur: birincil`
  içermeyen; hipotezdeki sayı muhtemelen farklı bir tanım kullanıyordu.
- Hedef altı 257 çıktı (hipotez 261) — bu oturumda dönem katmanı (16/16)
  ve ~20 kavram dosyası hedefe getirildiği için sayı düşmüş durumda.
- Dönem 16/16 hedefte (bu oturumda onarıldı); 14/16 diyen sayaç
  `linter-derinlik.mjs`'in farklı kelime tanımı olabilir → Faz 1'de
  tekilleştirilecek.

## Süreç durumu

- 16 rollü salt-okunur keşif dalgası başlatıldı (workflow `wf_91a6dbb1-e71`).
- Bu dosya, bitiş raporundaki karşılaştırmanın sabit başlangıç noktasıdır.
