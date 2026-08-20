# Tasarım planı — Beşeri Atlas

_Yazıldı: 2026-08-20 · §12 gereği kod yazmadan önce._

## Konsept: stratigrafik kesit

Bu sitenin metaforu "eski kâğıt" değil, **jeolojik kesit ve mesaha haritası**.
Arşivin maddi dünyasından alınan şey dokusu değil, **aygıtı**: cetvel, gratikül
(koordinat ızgarası), derinlik ölçeği, lejant, rubrikasyon.

Neden bu: projenin ana iddiası "aynı anda, altı yerde ne oluyordu" sorusudur.
Bu soru bir gazete sayfasının değil, **bir sondaj kesitinin** sorusudur — yan yana
duran altı karot, tek bir derinlik ekseninde okunur.

Ortaçağ el yazmasında **rubrikasyon** (kırmızı mürekkep) metni değil, metnin
*aygıtını* işaretlerdi: başlıklar, bölüm işaretleri. Burada kırmızı, **şüphenin
aygıtını** işaretler — tartışmalı iddiaları. Dekorasyon değil, kavramsal bağ.

### Kaçınılan üç varsayılan (§12)

| Klişe | Neden bu tasarım ona düşmüyor |
|---|---|
| Krem zemin + yüksek kontrastlı serif + terracotta | Zemin **soğuk gri-yeşil** (#E6EAE7), krem değil. Gövde fontu **düşük kontrastlı** okuma serifi. Vurgu **koyu kızıl** (#9E2B2B), terracotta (#D97757) değil — turuncu değil, kızıl. |
| Siyaha yakın zemin + tek parlak asit vurgu | Koyu tema **mürekkep mavisi** (#131C21) ve **üç** işlevsel vurgu taşıyor, tek asit vurgu değil. Vurgular güven seviyesini kodlar, süs değil. |
| Gazete/broadsheet düzeni | Çok sütun yok. **Tek asimetrik okuma sütunu + sol aygıt rayı.** Saç teli çizgi yerine ölçekli gratikül; köşeler yumuşatılmış (2-4px), sıfır değil. |

## Palet — 6 isimlendirilmiş renk

Açık tema (birincil; bu bir okuma sitesidir):

| İsim | Hex | Rol |
|---|---|---|
| `mürekkep` | `#16232B` | Gövde metni. Saf siyah değil — demir safra mürekkebinin solmuş mavi-siyahı. |
| `tabaka` | `#E6EAE7` | Zemin. Soğuk gri-yeşil çizim kâğıdı. |
| `bakır` | `#2E6B62` | Verdigris. Birincil etkileşim rengi **ve** `kesin` güven seviyesi. |
| `oksit` | `#8A5D14` | Koyu kehribar. `yaygin` güven seviyesi. |
| `zincifre` | `#9E2B2B` | Rubrikasyon kızılı. `tartismali` güven seviyesi ve aygıt işaretleri. |
| `gölge` | `#5E6C69` | İkincil metin, gratikül çizgileri, tik işaretleri. |

Koyu tema kardeş palet (ton rolleri korunur, kontrast yeniden kurulur):
`mürekkep`→`#DBE3E0` (metin), `tabaka`→`#131C21` (zemin), `bakır`→`#6FBFAE`,
`oksit`→`#D8A550`, `zincifre`→`#E0796B`, `gölge`→`#8B9A96`.

### Güven seviyesi kodlaması — renk tek başına taşımaz

Erişilebilirlik şartı: renk körlüğünde de ayrışmalı.

| Seviye | Renk | Çizgi | Glif |
|---|---|---|---|
| `kesin` | bakır | düz alt çizgi | `▪` |
| `yaygin` | oksit | kesikli alt çizgi | `▫` |
| `tartismali` | zincifre | çift alt çizgi | `⁘` |

## Tipografi — 3 rol

| Rol | Font | Gerekçe |
|---|---|---|
| **Display** | Fraunces (variable) | Optik boyut ekseni büyük puntoda yüksek kontrast, küçük puntoda sağlamlık verir. Karakterli ama kostüm değil. `WONK=0` ile dizginlendi. Latin-ext: ğ ı İ ö ş ü ç tam. |
| **Gövde** | Literata (variable) | E-okuyucu için tasarlanmış **düşük kontrastlı** okuma serifi. "Yüksek kontrastlı serif" klişesinin tam tersi. Uzun Türkçe metinde yorulmaz. |
| **Veri etiketi** | IBM Plex Sans Condensed | Harita lejantının/mesaha çiziminin sesi. Büyük harf + harf aralığı ile tarih, bölge adı, kaynak numarası, güven rozeti. |

Fontlar **self-host** edilir (fontsource). Runtime'da dış istek yok — §11'deki
bağımlılık disiplininin fontlara da uygulanması.

## Düzen konsepti

**Tek asimetrik okuma sütunu + kalıcı sol aygıt rayı.**

```
┌──────────┬────────────────────────────────────┐
│ AYGIT    │                                    │
│ RAYI     │   okuma sütunu (~68ch)             │
│          │                                    │
│ · dönem  │   Gövde metni. Dipnot işaretleri   │
│ · bölge  │   raya hizalanır.¹                 │
│ · güven  │                                    │
│   anahtarı│                                   │
│ · kaynak │                                    │
│   numara │                                    │
└──────────┴────────────────────────────────────┘
```

- Ray, tik işaretli dikey bir gratikül çizgisidir — kesitin derinlik ölçeği.
- Dipnot işaretleri raya hizalanır; odaklandığında kaynak kartı raya açılır.
  JS kapalıyken işaret, sayfa sonundaki kaynak listesine giden düz bir bağdır.
- Mobilde ray yatay bir banda dönüşür, içerik tam genişlik alır.
- Ölçü ~68ch, satır aralığı 1.72 — bu bir okuma sitesidir.
- **Izgarayı kıran tek öğe zaman şeridi**: tam genişlik, raydan taşar.

## İmza öğesi — Paralel Zaman Şeridi

Altı bölge (Avrupa / İslam dünyası / Doğu Asya / Güney Asya / Afrika / Amerika)
tek zaman ekseninde **yan yana altı şerit**. Seçili dönem, altı şeridi birden
kesen **dikey bir bant**tır — imza tam olarak bu kesittir: "aynı an, altı yer".

**Eksen kararı (bilinçli):** eksen doğrusal değil **sıralı**dır — 16 dönem eşit
genişlikte sütunlar. Gerekçe: MÖ 10000–3000 ile 1991–2008 doğrusal bir eksende
yan yana konursa tarihin %90'ı bir piksele sıkışır ve karşılaştırma imkânsızlaşır.
Bileşenin sorusu "kaç yıl sürdü" değil, "aynı anda ne oluyordu"dur. Süre bilgisi
kaybolmasın diye her sütun başlığı **gerçek tarih aralığını** veri etiketi olarak
taşır. Bu bir basitleştirme değil, sorunun şekline uydurulmuş bir eksendir.

- **JS'siz çalışır:** CSS grid + semantik tablo. Dönem seçimi bir URL rotasıdır
  (`/donem/13`). JS varsa seçim sayfa içinde kayar.
- **Klavye:** her şerit odaklanabilir, ok tuşlarıyla dönemler arası gezinir.
- **Hareket:** yüklemede gratikül çizgileri `scaleX` ile çizilir, sonra şerit
  içerikleri kademeli belirir. `prefers-reduced-motion` hepsini kapatır.

## Atmosfer

- Zeminde çok düşük opaklıkta **gratikül ızgarası** (CSS gradient) — çizim kâğıdı
  hissi, skeuomorfizm yok.
- İnce **grain** katmanı (inline SVG turbulence, ~2% opaklık) — düz rengin
  ölülüğünü kırar, metinle yarışmaz.
- Gölge yok denecek kadar az; derinlik **çizgi ağırlığı** ve **değer** ile kurulur.
  Kesit çiziminde gölge olmaz.

## Kalite tabanı (§12)

- [x] Mobilde çalışır (ray yatay banda dönüşür)
- [x] Klavye odağı görünür (2px bakır outline + offset)
- [x] `prefers-reduced-motion` desteklenir
- [x] Çift tema — sistem tercihi + elle geçiş, seçim `localStorage`'da
- [x] JS olmadan içerik tamamen okunabilir
- [x] Renk tek başına anlam taşımaz (çizgi stili + glif)
