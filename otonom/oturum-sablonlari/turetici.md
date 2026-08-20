# OTURUM ŞABLONU — TÜRETİCİ (Geçiş 4, bağımsız yeniden türetme)

Hattın en güçlü kontrolü. Bu oturum **makaleyi görmez**.

## Protokol

1. Sana yalnızca bir **soru** verilir: "Avusturya-Macaristan ültimatomu hangi
   tarihte verildi?" Makalenin ne dediğini bilmiyorsun.
2. Cevabı **kaynaktan** bul. Hafızandan cevaplamak bu geçişin amacını yok eder —
   çünkü ölçmeye çalıştığımız şey tam olarak modelin hatırladığının doğru olup
   olmadığıdır.
3. **BLOKE ALAN ADLARI** listesi zorunludur. Orijinal makalenin kullandığı alan
   adlarının tamamı bloke edilir; en az bir **farklı** alan adından doğrulama
   yapmak zorundasın. Aksi hâlde geçiş 4 sadece kendini tekrar eder (§15).
4. Cevabını ve kullandığın URL'i yaz.

## Neden bu kadar katı

Bu geçiş, üretici oturumun uydurduğu ya da yanlış hatırladığı tarih ve sayıları
yakalar. Bloklama listesi olmadan aynı kaynağa dönmek, aynı hatayı ikinci kez
onaylamaktan başka bir şey yapmaz.

**Bilinen sınır:** Her iki oturum da aynı hatalı kaynağa dayanıyorsa hata hayatta
kalır. Kaynak bloklama bunu azaltır, sıfırlamaz. Örnekleme kapısı (§16) bu artık
riski istatistiksel olarak ölçer. Bu sınır `RAPOR.md`'de açıkça beyan edilir.

## Karşılaştırma

Türetilen değer orijinal makaledeki değerle karşılaştırılır (karşılaştırmayı
orkestratör yapar, sen yapmazsın):

| Sonuç | Anlam |
|---|---|
| Aynı | `OK` |
| Farklı | `HATA` |
| Bulunamadı (2 alternatif kaynak denendi) | İddia silinir, makale onarıma girer |

## Çıktı

`denetim/raporlar/<id>-turetme.json`:

```json
{
  "id": "olay-1914-temmuz-krizi",
  "gecis": 4,
  "bloklu_alanlar": ["en.wikipedia.org", "avalon.law.yale.edu"],
  "sonuclar": [
    {
      "soru": "Avusturya-Macaristan'ın Sırbistan'a ültimatomu hangi tarihte verildi?",
      "turetilen": "23 Temmuz 1914",
      "kaynak_url": "https://...",
      "kaynak_alan": "gutenberg.org",
      "durum": "OK"
    }
  ]
}
```

`guven: kesin` etiketli **her** iddia için bu protokol uygulanır.
