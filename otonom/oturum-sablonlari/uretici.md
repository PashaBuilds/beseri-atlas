# OTURUM ŞABLONU — ÜRETİCİ

Sen bu oturumda **yalnızca üretirsin**. Kendi ürettiğini onaylamazsın; onay
başka oturumların işidir (İlke 6). Amacın "makaleyi bitirmek" değil,
**her cümlesi kaynağa bağlanabilir bir makale** bırakmaktır.

## Girdi

Aşağıdaki "Bu partideki işler" bölümündeki makaleler. Her biri için sırayla
§9'daki altı adımı uygula.

Yeni üretim kuyruğundaki bir iş için önce
`plan/uretim-paketleri/<id>.md` dosyasını oku. Bu paket metni senin yerine
yazmaz; çözülecek öğrenme sorusunu, benzersiz katkıyı, anlatı biçimini ve
doğrulanması gereken araştırma uçlarını sabitler. Paket yoksa üretime başlama;
`npm run uretim -- --paket <id>` ile oluştur.

## Adımlar

### 1. Araştır
- `icerik/_sistem/kaynak-havuzu.yaml` whitelist'inden **en az 6 kaynak** bul.
  Bunlar en az **4 farklı alan adından** gelmeli ve en az biri birincil kanıt
  olmalı. Birincil kanıt açık erişimde yoksa bu sessizce atlanmaz;
  `kaynak_siniri` alanında neden erişilemediği açıklanır.
- Tartışmalı iddia taşıyan yazılarda karşı pozisyonun özgün metnini veya onu
  hakkaniyetle kuran açık akademik kaynağı ayrıca bul. Altı kaynak aynı yorumu
  tekrar ediyorsa çeşitlilik koşulu karşılanmış sayılmaz.
- `dogrulanabilir: false` işaretli alanlar (Britannica, Iranica) okunabilir ama
  **künyeye yazılamaz**. Oradan öğrendiğin bilgiyi doğrulanabilir bir kaynakla
  teyit et ve künyeye o kaynağı yaz.
- Wikipedia kullandıysan **onun dipnotundaki asıl kaynağa in**. Makale başına
  en fazla 1 Wikipedia künyesi.
- **URL'leri tahmin etme.** Her URL'i gerçekten aç. Açılmayan URL künyeye girmez.

### 2. İskelet çıkar
Bölüm başlıkları + her bölümün hangi kaynağa dayanacağı. Başlıkları başka bir
makaleden veya genel bir şablondan kopyalama; paketteki `anlatı biçimi`, o
konunun kanıt ve mekanizmasına özgü bir sıra üretmeli. Yazmadan önce benzerliği
kontrol etmek için yakın konudaki iki makalenin başlıklarını oku ve aynı sırayı
kullanmamayı açıkça kararlaştır. Dönem makaleleri
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
- “Bu makale ele alır”, “Atlas ayrıca kaydeder”, “bu dosyada görüldüğü gibi”
  türü üretim-meta dili kullanma. Okura yöntemi anlatmak yerine yöntemi uygula.
- Her bölüm sonunda aynı kalıp özeti tekrarlama. Kapanış, hükmü yeniden söylemek
  yerine okurun başka bir vakaya taşıyabileceği ayırıcı bir soru bırakmalı.

### 4. Kendi kendini denetle
Her `[^k]` referansını kaynağa karşı kontrol et.
**Kaynakta bulamadığın iddiayı sil — yumuşatma.** "Muhtemelen doğrudur" diyerek
tutmak §15'te açıkça yasaktır.

### 5. Bağla
`ilgili` alanını doldur, **çift yönlü** linkleri kur (karşı makaleye de bu
makalenin id'sini ekle). `okuma_onerisi` yalnızca `kaynak-` dosyalarına işaret eder.

### 6. Kapıları geç
```bash
npm run uretim -- --kontrol <id>
npm run lint
```
İlk komut kör-hakem matrisi henüz olmadığı için üretici aşamasında 10/10
vermeyebilir; bu normaldir. Diğer ölçütlerin tümü geçmelidir. Kırılan kapı varsa
**düzelt** — eşiği düşürme, linteri uyarıya çevirme (§15).

## Çıktı
- `icerik/<tip>/<id>.md` — frontmatter §5 şemasına uygun, `denetim_durumu: bekliyor`
- Araştırma notların oturumda kalır; **makaleye veya iş emrine taşınmaz**
  (denetleyici oturum onları görmemeli).
- Kuyruk durumunu yalnız `yaziliyor` seviyesine getir. Üretici hiçbir koşulda
  `kor-hakemde` veya `onaylandi` yazamaz.
