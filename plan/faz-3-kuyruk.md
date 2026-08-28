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

### P2 — tartışma kalan 24 (bütçe elverirse)
### P3 — olay katmanı en kötü 20 (özellikle ROL bulgularıyla kesişenler:
olay-yazinin-icadi 472, olay-neolitik-devrim, olay-kara-olum vb.)
### P4 — düşünür boş-içerik kümesi (ROL 13'ün 29 dosyası; marx deseni şablon alınır)
### P5+ — aktör/kavram kalanı

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
