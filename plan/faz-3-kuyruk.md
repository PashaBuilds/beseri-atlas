# Faz 3 onarım kuyruğu (29 Ağustos 2026, ölçümden üretildi)

Hedef altı 254 dosya: 34 tartışma · 83 olay · 35 düşünür · 61 aktör ·
41 kavram. Sıralama sözleşme gereği tartışma+olay öncelikli; tip içinde
en büyük açık önce. Tam liste scratchpad ölçümünden yeniden üretilebilir
(kelimeSay + KALIPLAR; tanımlar karar tablosu K6 ile dondurulmuş).

## Bütçe dürüstlüğü

Pilot maliyet ölçümü: onarım ajanı ~170-210k + kör hakem ~95-140k
≈ dosya başına ~300k jeton (tam boru). 254 dosyanın tamamı ≈ 75M —
bu oturumun kalan bütçesinin (~15M) beş katı. Karar (karar tablosu K3
ruhu): sayı değil kalite; bu oturumda tam-boru onarım TARTIŞMA
katmanına ve olay katmanının en kötülerine odaklanır, kalan kuyruk
sonraki oturumlara sıralı devredilir. Kuyruk eritme hızı raporda açık
yazılır; "bitti" beyanı yalnız gerçekten biten katman için yapılır.

## Parti sırası (5'erli dalgalar, her dalga: onarım → kör hakem → kapılar → tek commit)

### P1 — tartışma en kötü 10 (228-276 kelime; hepsi 1500 hedefe)
1. tartisma-nufus-artisi-tehdit-mi (228)
2. tartisma-antik-kolelik-ekonomisi (230)
3. tartisma-feodalite-kavrami (234)
4. tartisma-iklim-ve-cokus (237)
5. tartisma-milliyetcilik-ne-zaman (258)
6. tartisma-kalkinma-neden-basarisiz (259)
7. tartisma-kara-olumun-sonuclari (263)
8. tartisma-vestfalya-miti (271)
9. tartisma-soykirim-kavrami (272)
10. tartisma-imparatorluk-nufusu-nasil-sayilir (276)

### P2 — tartışma kalan 24  ✔ TAMAMLANDI
### P3 — tartışma son 14  ✔ TAMAMLANDI (katman 40/40 hedefte, açık 0)

### P4 — olay katmanı (29 Ağustos ölçümü, DÜZELTİLMİŞ)

**Önce bir düzeltme.** Bu bölümün ilk hâlinde "99 olay dosyasının tamamı
hedef altında, açık 100.020 kelime" yazıyordu. O sayılar yanlıştı: kendi
ölçüm betiğimde elle yazdığım eşiklerden (olay 1500, kavram 1200) geliyordu.
Kanonik eşikler KAPI 11'in tablosundadır ve şartname §3'ten birebir alınmıştır
(olay/aktör/düşünür 1200, kavram 600; `veri` ve `kaynak` tiplerinde hedef
YOKTUR). Ölçüm aracı artık o tabloyu içe aktarıyor. Kanonik tablo:

| Tip | Adet | Hedef altı | Açık kelime |
|---|---|---|---|
| olay | 99 | 76 | 64.613 |
| aktör | 122 | 61 | 53.925 |
| düşünür | 54 | 35 | 30.038 |
| kavram | 90 | 41 | 12.937 |
| dönem · tartışma · veri · kaynak | 140 | 0 | 0 |
| **toplam** | **505** | **213** | **161.513** |

Bu, kendi kendine ölçen bir depoda üçüncü tanım ayrışmasıydı (öncekiler:
kelime sayımı ve "birincil kaynak"). Ders kayda geçti: bir eşik ya da tanım
iki yerde duruyorsa, biri er geç yanlış olur; ölçüm araçları kapıların
tanımlarını içe aktarmalı, kopyalamamalıdır.

Olay dosyalarının çoğu yine de 200-300 kelimelik taslak:
Wikipedia'dan türetilmiş, şablon dolgusuyla şişirilmiş, konuyla ilgisiz
"aynı dönemin çatışma serisi" tarzı bölümler taşıyor. Bu yüzden olay
onarımı bir *genişletme* değil *yeniden yazım*dır.

Dalga 1 (en kötü 6): yesil-devrim 196, berlin-duvarinin-yikilisi 202,
italyan-birligi 212, kirim-savasi 221, 11-eylul 224, afyon-savaslari 229.

### P5 — aktör (120 dosya hedef altında, açık 88.899)
### P6 — kavram (90 dosya, açık 65.315)
### P7 — kaynak (59 dosya, açık 63.436) · veri (25 dosya, açık 31.205)
### P8 — düşünür (54 dosya, açık 62.121; ROL 13'ün boş-içerik kümesi burada)

### Kapanan kuyruk maddeleri
- terimler.yaml "Kavimler Göçü / Migration Period" tuzağı: kayda uyarı
  notu düşüldü (kör hakem bulgusu).
- Ölü kütük kayıtları: 63 yer tutucu silindi, kütük 333 → 270 ad;
  KAPI 16 artık ölü kayıt sayısını özet satırında yazıyor.
- tarihsel-sayilar'a giden konu dışı `::tartismali` bağları: yeniden
  ölçüldü, 67 işaretin tamamı sayı/ölçü sözcük alanında — onarım
  dalgaları ilgisiz olanları zaten temizlemiş. Madde kapandı.
- KAPI 19 kör noktası: kapı tek seriye bağlıydı, seri kütüğüne
  genişletildi (7 seri, 312 ölçülen iddia) ve ölçülemeyen sayı yüzeyi
  (4611 sayının 4299'u) özet satırında görünür kılındı.

## Kural setleri (promptlara giren sabitler)
- Yazım: tip hedefi; ilk iki paragraf konu+önem; KAPI 18 kalıpları 0;
  telif ≤1 alıntı/kaynak; "çeper"→"çevre".
- Kaynak: tip aralığı (tartışma 7-12, olay 5-9); ≤1 Wikipedia; alan
  tekeli yok; dogrulama_dizesi fetch'te birebir; wikisource `Page:`
  dersi; archive.org `_djvu.txt` 400k penceresi; britannica/sacred-texts
  403.
- Matris: taslak yazar, finalize kör hakem; MERKEZİ desteksiz/ölçülemez
  olamaz; hash+commit bağı.
- Entegrasyon: commit yalnız dalga sonunda, orkestratörde; ajan lint
  koşmaz; KAPI 18 defteri her dalga sonrası aşağı çekilir.
