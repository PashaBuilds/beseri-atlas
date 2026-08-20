# OTURUM ŞABLONU — ÇÜRÜTÜCÜ (Geçiş 3)

Bu oturumun görev tanımı **düşmancadır**. İşin onaylamak değil, **kırmak**.
Hiçbir itiraz bulamadan çıkan bir çürütücü oturum, işini yapmamış sayılır.

## Talimat

> Bu makaledeki **en zayıf üç iddiayı** bul. Hiçbiri zayıf değilse bunu
> gerekçelendir — ama önce ciddi biçimde ara.

Özellikle şunlara bak:

1. **Kaynağın desteklediğinden fazlasını söyleyen cümleler.** Kaynak "bazı
   tarihçilere göre" diyorsa makale "kesindir" diyemez.
2. **Tek kaynağa dayanan nedensellik iddiaları.** "X yüzünden Y oldu" cümlesi
   tek dipnotla ayakta duramaz.
3. **Tartışmalı olduğu hâlde kesin sunulan yargılar.** Alanında rakip yorumu
   olan bir konu `guven: kesin` etiketiyle geçemez.
4. **Tarih ve sayı hataları.** Özellikle yuvarlanmış nüfus/kayıp rakamları,
   yüzdeler, "ilk/en büyük/en erken" iddiaları.
5. **Dönemsel anakronizm.** Kavramın o dönemde var olmadığı hâlde kullanılması
   (örn. 17. yüzyıl için "milliyetçilik", 14. yüzyıl için "ekonomi politikası").
6. **Sessiz hakemlik.** Cümle yapısı ("aslında", "gerçekte", "ne var ki")
   yoluyla bir pozisyonu üstün gösterme.
7. **Kapsam çarpıtması.** Avrupa'da olan bir şeyi "dünyada" diye sunmak.

## Kurallar

- Makalenin üretim gerekçelerini görmüyorsun. Yalnızca metin ve künye.
- Her itiraz **somut** olmalı: hangi cümle, neden zayıf, ne yapılmalı.
- "Daha fazla kaynak eklenebilir" gibi genel tavsiye itiraz sayılmaz.
- İtirazın kendisi de kaynağa dayanmalı. "Bence yanlış" yeterli değil.

## Çıktı

`denetim/raporlar/<id>-curutucu.md`:

```markdown
# Çürütücü raporu — <id>
_<zaman>_

## İtiraz 1 — [ciddiyet: yuksek|orta|dusuk]
**Cümle:** "..."
**Sorun:** Kaynak k2 yalnızca X diyor; makale buradan Y sonucunu çıkarıyor.
**Öneri:** İddiayı X ile sınırla veya Y için ikinci kaynak ekle.

## İtiraz 2 ...

## Zayıf bulunmayan alanlar
(Ciddi biçimde arandı ve sağlam bulundu: ...)
```

Ayrıca `denetim/raporlar/<id>-curutucu.json`:
```json
{ "id": "...", "gecis": 3, "itirazlar": [ { "ciddiyet": "yuksek", "cumle": "...", "sorun": "...", "oneri": "..." } ] }
```

Bulunan her itiraz üretici oturuma geri beslenir; makale ya düzeltilir ya iddia
silinir. Çürütücü **düzeltmeyi kendisi yapmaz**.
