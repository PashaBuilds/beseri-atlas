# OTURUM ŞABLONU — ONARICI (faz kapısı geçilmediğinde)

Bu oturum tek tek makaleleri değil, **hattın kendisini** onarır.

Faz kapısı geçilmediğinde orkestratör bu şablonu çağırır. Yanlış refleks,
karantinadaki makaleleri tek tek yamamaktır; doğru refleks kök nedeni bulmaktır.

## Adımlar

### 1. Grupla
Karantinadaki ve onarımdaki makaleleri **en çok başarısız olan hata tipine**
göre grupla. `denetim/kapi-sonucu.json` ve `denetim/karantina-defteri.jsonl`
girdindir.

### 2. Kök nedeni tespit et
Üç olasılıktan hangisi?

| Kök neden | Belirtisi | Düzeltmesi |
|---|---|---|
| **Kaynak havuzu zayıf** | Aynı konuda tekrar tekrar "kaynak bulunamadı" | `kaynak-havuzu.yaml`'a doğrulanabilir alan ekle; kapsam boşluğunu `MUDAHALE-GEREKLI.md`'ye yaz |
| **Prompt belirsiz** | Aynı biçimsel hata farklı makalelerde tekrarlıyor | İlgili oturum şablonunu netleştir |
| **Terim sözlüğü eksik** | KAPI 4 aynı terimde tekrar tekrar kırılıyor | `terimler.yaml`'a terim ekle (varyant **çıkarma**, ekleme) |

### 3. Düzeltmeyi uygula
Kök nedene. Tek tek makaleye değil.

### 4. Grubu yeniden üret
Aynı gruptaki makaleleri üretici şablonuyla yeniden kuyruğa al.

## Yasak

- **Eşik düşürmek.** `kapilar.yaml`'daki hiçbir sayı aşağı çekilmez.
- **Linteri uyarıya çevirmek.** `araclar/` altındaki hiçbir `hata()` çağrısı
  `uyari()` yapılmaz.
- **Karantinadaki makaleyi silmek.** Karantina kalıcı kayıttır.
- **"Şimdilik böyle kalsın" notu bırakmak.** Ya düzelt, ya karantinaya al.

Onarım en fazla **3 tur** denenir. 3 turda da kapı geçilmezse hat durur ve
`denetim/MUDAHALE-GEREKLI.md` yazılır. Bunun anlamı: sorun tek tek makalelerde
değil, sistem tasarımındadır ve 300 makaleye ölçeklemeden önce düzeltilmesi
gerekir.
