# OTURUM ŞABLONU — ÜRETİCİ

Sen bu oturumda **yalnızca üretirsin**. Kendi ürettiğini onaylamazsın; onay
başka oturumların işidir (İlke 6). Amacın "makaleyi bitirmek" değil,
**her cümlesi kaynağa bağlanabilir bir makale** bırakmaktır.

## Girdi

Aşağıdaki "Bu partideki işler" bölümündeki makaleler. Her biri için sırayla
§9'daki altı adımı uygula.

## Adımlar

### 1. Araştır
- `icerik/_sistem/kaynak-havuzu.yaml` whitelist'inden **en az 3 bağımsız kaynak**
  bul. Bağımsız = en az 2 farklı alan adı.
- `dogrulanabilir: false` işaretli alanlar (Britannica, Iranica) okunabilir ama
  **künyeye yazılamaz**. Oradan öğrendiğin bilgiyi doğrulanabilir bir kaynakla
  teyit et ve künyeye o kaynağı yaz.
- Wikipedia kullandıysan **onun dipnotundaki asıl kaynağa in**. Makale başına
  en fazla 1 Wikipedia künyesi.
- **URL'leri tahmin etme.** Her URL'i gerçekten aç. Açılmayan URL künyeye girmez.

### 2. İskelet çıkar
Bölüm başlıkları + her bölümün hangi kaynağa dayanacağı. Dönem makaleleri
§4'teki beş bölümü **aynı sırayla** taşımak zorundadır:
"Aynı anda dünyada", "Maddi taban", "Siyasi biçim", "Çatışma", "Fikir dünyası".

### 3. Yaz
- Türkçe, sıfırdan. Çeviri kokmayacak. Kaynak künyeleri orijinal dilinde kalır.
- `icerik/_sistem/terimler.yaml`'a **sadık**. `yasak_varyantlar` build'i kırar.
- Tarih, sayı, özel isim veya nedensellik içeren **her paragraf** en az bir
  `[^k]` referansı taşır.
- Uzunluk: dönem 2500-4000 kelime; olay/aktör/düşünür 1200-2000; kavram 600-1000;
  tartışma 1500-2500.
- 15 kelimeden uzun doğrudan alıntı yok; kaynak başına en fazla 1 alıntı.
- Tartışmalı bir konuda **hakemlik yapma**. "Sonuç olarak en doğrusu şudur"
  cümlesi yasaktır. Rakip pozisyonları göster ya da tartışma haritasına link ver.

### 4. Kendi kendini denetle
Her `[^k]` referansını kaynağa karşı kontrol et.
**Kaynakta bulamadığın iddiayı sil — yumuşatma.** "Muhtemelen doğrudur" diyerek
tutmak §15'te açıkça yasaktır.

### 5. Bağla
`ilgili` alanını doldur, **çift yönlü** linkleri kur (karşı makaleye de bu
makalenin id'sini ekle). `okuma_onerisi` yalnızca `kaynak-` dosyalarına işaret eder.

### 6. Kapıları geç
```bash
npm run lint
```
Kırılan kapı varsa **düzelt** — eşiği düşürme, linteri uyarıya çevirme (§15).

## Çıktı
- `icerik/<tip>/<id>.md` — frontmatter §5 şemasına uygun, `denetim_durumu: bekliyor`
- Araştırma notların oturumda kalır; **makaleye veya iş emrine taşınmaz**
  (denetleyici oturum onları görmemeli).
