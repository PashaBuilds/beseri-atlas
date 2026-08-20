# KICKOFF — Beşeri Atlas

Claude Code için proje başlatma dokümanı. Bu dosyayı repo köküne koy ve Claude Code'a
şunu söyle:

> `KICKOFF-beseri-atlas.md` dosyasını oku. Faz 0'ı kur, sonra orkestratörü başlat ve
> altı fazın tamamını otonom olarak tamamla. Durman gereken tek durum §10'daki
> örnekleme kapısının kırılmasıdır; onun dışında karşılaştığın her engeli §9 ve §10'daki
> kurallara göre kendin çöz.

**Hat otonomdur.** Onay için beklemez, iş bitince `RAPOR.md` yazar. İnsanın okuyacağı
iki dosya vardır ve ikisi de sondadır: `RAPOR.md` ve `denetim/MUDAHALE-GEREKLI.md`.

---

## 0. Proje tanımı

Türkçe, kaynak-zorunlu, statik bir **beşeri bilimler bilgi atlası**. İnsanlık tarihini
kronolojik bir omurga üzerinde kurar; kültür, ekonomi, siyaset, askeri tarih, felsefe,
mitoloji ve demografiyi bu omurganın üstüne katman olarak bindirir.

**Hedef ölçek:** 300+ makale, tam kapsam.
**Dil:** İçerik tamamen Türkçe. Araştırma dili İngilizce olabilir ve olacaktır.
**Amaç:** Okuyucunun güncel olayları tarihsel derinlikle okuyabilmesi ve iddiaların
kaynağını izleyebilmesi.

### Projenin tek cümlelik testi

Herhangi bir makaledeki herhangi bir iddia için okuyucu "bunu nereden biliyorsun?"
diye sorabilmeli ve iki tıkla asıl kaynağa ulaşabilmeli. Bunu sağlamayan her şey
bu projede hatadır.

---

## 1. Devredilemez ilkeler

Bu altı madde projenin anayasasıdır. Bir tasarım kararı bunlarla çatışıyorsa karar değişir.

### İlke 1 — Kaynaksız iddia yok

Tarih, sayı, özel isim veya nedensellik içeren her paragraf en az bir kaynak dipnotu
taşımak zorundadır. Kaynağı olmayan iddia **build'i kırar**. Bu bir uyarı değil, hatadır.

### İlke 2 — Güven seviyesi görünür olur

Her iddia üç kovadan birine düşer ve arayüzde görsel olarak ayrışır:

| Seviye | Anlamı | Örnek |
|---|---|---|
| `kesin` | Tarih, yer, sayı — kaynaklar hemfikir | "Vestfalya Barışı 1648'de imzalandı" |
| `yaygin` | Akademide baskın görüş, itiraz var | "Kara Ölüm Avrupa nüfusunun ~%40'ını götürdü" |
| `tartismali` | Rakip yorumlar var, biri seçilmez | "Roma'nın çöküş nedeni" |

`tartismali` etiketli bir iddia **asla tek bir cevapla sunulmaz**. Ya rakip pozisyonlar
gösterilir ya da ilgili tartışma haritasına link verilir.

### İlke 3 — Tartışma düzleştirilmez

Tarihin dürüst hali tartışmalıdır. Site bir konuda "doğru cevabı" verme işini yapmaz;
kimin ne dediğini, hangi delile dayandığını ve zayıf noktasının ne olduğunu gösterir.
Hakemlik yapmak yasaktır.

### İlke 4 — Telif sınırı serttir

- **Kamu malı metinler** (yazarı 1929 öncesi vefat etmiş / süresi dolmuş): tam metin
  alıntılanabilir, şerh katmanı eklenebilir. Thukydides, İbn Haldun, Clausewitz,
  Machiavelli, Gibbon, Hobbes, Smith, Mackinder, Mahan, Herodotos, Tacitus vb.
- **Telifli kitaplar** (Hobsbawm, Tooze, Morland, Clark, Milanović vb.): tam metin veya
  bölüm çevirisi **kesinlikle üretilmez**. Sadece: künye, tezinin 2-3 cümlelik atıflı
  özeti, hangi tartışmada hangi pozisyonu savunduğu, ve okuma yönlendirmesi.
- Hiçbir kaynaktan 15 kelimeden uzun doğrudan alıntı yapılmaz. Kaynak başına en fazla
  bir alıntı. Gerisi yeniden yazılır.

### İlke 5 — Otonomi durmakla değil, karantinayla sağlanır

Proje uçtan uca insan müdahalesi olmadan tamamlanır. Bu, hataları görmezden gelmek
anlamına gelmez — tam tersi. Otonom bir hattın tek sürdürülebilir davranışı şudur:

> Şüpheli içerik **yayınlanmaz, ama hattı da durdurmaz.** Karantinaya alınır,
> kaydı tutulur, döngü bir sonraki işe geçer.

Onay bekleyerek duran bir hat otonom değildir. Şüpheli içeriği yayınlayarak devam eden
bir hat ise projeyi çöpe atar. Doğru davranış üçüncüsüdür: ayır, kaydet, devam et.

### İlke 6 — Denetleyen, üretenden bağımsız olmak zorundadır

İnsan gözü devreden çıktığı için doğruluğun tek garantisi **yapısal bağımsızlık**tır:

- Denetleyen oturum, üreten oturumun context'ini görmez
- Yeniden türetme, orijinalden **farklı bir kaynak** kullanmak zorundadır
- Çürütücü oturumun görevi onaylamak değil, hata bulmaktır

Kendi ürettiğini kendi context'inde denetleyen model, kendi hatasını onaylar. Bu hattın
en kritik tasarım kararı bu döngüyü kırmaktır.

**Bilinen sınır:** Yeniden türetme, bağımsız kaynaklardan gelen hataları yakalar;
*ortak kaynaklı* hataları yakalamaz. Üreten ve denetleyen aynı hatalı Wikipedia
maddesine dayanıyorsa ikisi de aynı yanlışa varır. Kaynak çeşitliliği zorunluluğu
(§10, Geçiş 4) bu riski azaltır, sıfırlamaz.

---

## 2. Dil politikası

**Araştır → İngilizce. Yaz → Türkçe.**

Türkçe Wikipedia ve genel Türkçe web, bu konularda İngilizce kaynaklardan belirgin
biçimde zayıftır. Bu yüzden:

1. Araştırma İngilizce (ve gerekirse Fransızca/Almanca) kaynaklardan yapılır.
2. Makale sıfırdan Türkçe yazılır — çeviri kokmayacak şekilde.
3. Kaynak künyeleri **orijinal dilinde** bırakılır, çevrilmez.
4. İstisna: Osmanlı, İslam ve Türkiye tarihi konularında Türkçe kaynaklar
   (TDV İslam Ansiklopedisi, TTK, DergiPark) birincil tercihtir.

### Terim kilidi

Faz 0'da `icerik/_sistem/terimler.yaml` üretilir ve **kilitlenir**. 300 makale boyunca
terminoloji tutarlılığının tek garantisi budur.

```yaml
- tr: güç dengesi
  en: balance of power
  kullanim: zorunlu
  yasak_varyantlar: [kuvvet dengesi, güç muvazenesi]

- tr: longue durée
  en: longue durée
  kullanim: orijinal_birakilir
  aciklama: Braudel terimi, Türkçeleştirilmez; ilk geçtiğinde parantez içi açıklanır

- tr: asabiyet
  en: group solidarity / asabiyyah
  kullanim: zorunlu
  aciklama: İbn Haldun terimi, olduğu gibi kullanılır
```

Bir linter, makalelerde `yasak_varyantlar` geçerse build'i kırar.

---

## 3. İçerik modeli

Yedi içerik tipi. Toplam hedef ~315 makale.

| Tip | Klasör | Adet | Ne anlatır |
|---|---|---|---|
| Dönem | `icerik/donem/` | 16 | Kronolojik omurga. Bir çağın tamamı, tüm bölgeler paralel |
| Olay | `icerik/olay/` | ~100 | Belirli bir olay/süreç: 1914 Temmuz Krizi, Vestfalya, Bandung |
| Aktör | `icerik/aktor/` | ~50 | Devlet, hanedan, kurum: Osmanlı, Song, Hansa Birliği, IMF |
| Düşünür | `icerik/dusunur/` | ~40 | İbn Haldun, Clausewitz, Carr, Polanyi — fikri ve etkisi |
| Kavram | `icerik/kavram/` | ~60 | asabiyet, demografik geçiş, hegemonya, longue durée |
| Tartışma | `icerik/tartisma/` | ~25 | Çekişmeli sorular, rakip pozisyonlarla |
| Veri | `icerik/veri/` | ~15 | Nüfus, GSYH, savaş kayıpları — gerçek veri setleriyle |
| Kaynak | `icerik/kaynak/` | ~40 | Kitap dosyaları: künye, tez, hangi tartışmada nerede durur |

**Uzunluk hedefi:** Dönem makaleleri 2500-4000 kelime; olay/aktör/düşünür 1200-2000;
kavram 600-1000; tartışma 1500-2500.

---

## 4. Kronolojik omurga

16 dönem. Her dönem makalesi **aynı beş bölümü** aynı sırayla içerir — bu, dönemler
arası karşılaştırmayı mümkün kılan yapıdır:

1. **Aynı anda dünyada** — o dönemde Avrupa / İslam dünyası / Doğu Asya / Güney Asya /
   Afrika / Amerika'da paralel olarak ne oluyordu
2. **Maddi taban** — nüfus, tarım, teknoloji, ticaret yolları, iklim
3. **Siyasi biçim** — devletlerin nasıl örgütlendiği, meşruiyetin nereden geldiği
4. **Çatışma** — kimin kiminle neden savaştığı, savaşın nasıl yapıldığı
5. **Fikir dünyası** — din, felsefe, hukuk, sanat, mit

Dönemler:

| # | Dönem | Eksen |
|---|---|---|
| 01 | MÖ 10000–3000 | Tarım devrimi, yerleşiklik, ilk hiyerarşiler |
| 02 | MÖ 3000–1200 | Tunç Çağı imparatorlukları, yazı, ilk uluslararası sistem |
| 03 | MÖ 1200–500 | Tunç Çağı çöküşü, Demir Çağı, alfabe |
| 04 | MÖ 500–MS 200 | Eksen Çağı, klasik imparatorluklar (Roma, Han, Pers, Maurya) |
| 05 | 200–650 | Geç antikite, kavimler göçü, Roma–Sasani düellosu |
| 06 | 650–1000 | İslam'ın yayılışı, Abbasi, Karolenj, Tang |
| 07 | 1000–1350 | Selçuklu, Haçlılar, Song ekonomisi, Moğol dünya sistemi |
| 08 | 1350–1500 | Kara Ölüm, Osmanlı yükselişi, Rönesans, Ming |
| 09 | 1500–1650 | Keşifler, Reform, barut imparatorlukları, Vestfalya |
| 10 | 1650–1789 | Aydınlanma, ticari kapitalizm, ilk küresel savaşlar |
| 11 | 1789–1848 | Devrim Çağı — ulus, sanayi, ideoloji doğuyor |
| 12 | 1848–1914 | Sermaye ve İmparatorluk Çağı, emperyal paylaşım |
| 13 | 1914–1945 | Felaket dönemi, iki savaş, imparatorlukların dağılması |
| 14 | 1945–1991 | Soğuk Savaş, dekolonizasyon, kalkınma yarışı |
| 15 | 1991–2008 | Tek kutupluluk, küreselleşme, teknolojik sıçrama |
| 16 | 2008–bugün | Çok kutupluluğa dönüş, demografik dönüm, kurumsal aşınma |

---

## 5. Frontmatter şeması

Astro Content Collections + Zod ile **build-time doğrulanır**. Şemaya uymayan dosya
build'i kırar.

```yaml
---
id: olay-1914-temmuz-krizi
tip: olay                          # donem|olay|aktor|dusunur|kavram|tartisma|veri|kaynak
baslik: 1914 Temmuz Krizi
ozet: Suikast ile genel seferberlik arasındaki 37 günde Avrupa'nın savaşa nasıl sürüklendiği.
donem: "13"                        # kronolojik omurgaya bağ
tarih_baslangic: 1914-06-28
tarih_bitis: 1914-08-04
bolge: [avrupa]                    # avrupa|islam-dunyasi|dogu-asya|guney-asya|afrika|amerika|kuresel
eksen: [siyasi, askeri]            # siyasi|askeri|ekonomik|kulturel|felsefi|dini|demografik|mitolojik
guven_geneli: yaygin
etiketler: [ittifak-sistemi, seferberlik, diplomasi]
ilgili:
  - aktor-avusturya-macaristan
  - kavram-ittifak-sistemi
  - tartisma-1914-savas-sorumlulugu
okuma_onerisi:
  - kaynak-clark-uyurgezerler
  - kaynak-tuchman-agustos-toplari
kaynaklar:
  - anahtar: k1
    tur: ansiklopedi               # ansiklopedi|akademik|birincil|veri|ders|kitap
    ad: "Encyclopaedia Britannica — July Crisis"
    url: https://...
    erisim_tarihi: 2026-08-20
  - anahtar: k2
    tur: birincil
    ad: "Avusturya-Macaristan Ültimatomu, 23 Temmuz 1914"
    url: https://...
    erisim_tarihi: 2026-08-20
son_denetim: 2026-08-20
denetim_durumu: gecti              # bekliyor|gecti|isaretli
---
```

---

## 6. İddia–kaynak bağı

Makale gövdesinde her iddia, frontmatter'daki `anahtar` alanına referans verir:

```markdown
Avusturya-Macaristan ültimatomu 23 Temmuz'da, suikastten yirmi beş gün sonra
verildi.[^k1] Sırbistan'ın cevabı büyük ölçüde uzlaşmacıydı; reddedilen tek madde
Avusturya memurlarının Sırp topraklarında soruşturma yürütmesiydi.[^k2]

::tartismali[Bu gecikmenin savaşı kaçınılmaz kılıp kılmadığı tartışmalıdır.]{harita=tartisma-1914-savas-sorumlulugu}
```

Linter kuralları:

- Dört haneli yıl, yüzde, "nedeniyle/yüzünden/sonucunda" gibi nedensellik ifadesi ya da
  özel isim içeren her paragrafta **en az bir `[^k]` referansı** olmalı.
- Frontmatter'da tanımlı olmayan bir `[^k]` anahtarı → build hatası.
- Gövdede hiç kullanılmayan bir kaynak anahtarı → uyarı.
- `::tartismali` direktifi `harita` parametresi olmadan kullanılamaz.

---

## 7. Tartışma haritası formatı

Projenin en değerli içerik tipi. Şema:

```yaml
---
id: tartisma-bati-neden-yukseldi
tip: tartisma
baslik: Batı neden yükseldi?
soru: Neden sanayileşme ve küresel hakimiyet 18-19. yüzyılda Batı Avrupa'da gerçekleşti?
neden_onemli: Bugünkü kalkınma politikalarının ve "kurumlar mı kültür mü" tartışmasının kökeni burada.
pozisyonlar:
  - ad: Coğrafi ve ekolojik avantaj
    savunanlar: [Jared Diamond, Alfred Crosby, Kenneth Pomeranz (kısmen)]
    tez: Evcilleştirilebilir tür çeşitliliği, kıta ekseni ve kömür yataklarının konumu belirleyiciydi.
    guclu_yani: Uzun vadeli, kültürel önyargı içermeyen açıklama sunar.
    zayif_yani: Yakın dönemdeki hızlı ayrışmayı ve tersine dönüşleri açıklamakta zorlanır.
  - ad: Kurumsal açıklama
    savunanlar: [Daron Acemoğlu, James Robinson, Douglass North]
    tez: Mülkiyet haklarını güvenceye alan kapsayıcı kurumlar yatırımı ve inovasyonu mümkün kıldı.
    guclu_yani: Neden bazı ülkelerin sıçrayıp bazılarının sıçramadığını açıklar.
    zayif_yani: Kurumların kendisinin nereden geldiği sorusunu geriye iter.
  - ad: Geç ayrışma / Kaliforniya Okulu
    savunanlar: [Kenneth Pomeranz, Bin Wong, Andre Gunder Frank]
    tez: 1750'ye kadar Çin ve Batı Avrupa benzer seviyedeydi; ayrışma geç ve konjonktüreldir.
    guclu_yani: Karşılaştırmalı veriyle Avrupa-merkezciliği ciddi biçimde sarsar.
    zayif_yani: Ayrışmanın neden kalıcı olduğu konusunda ikna edici bir mekanizma vermez.
  - ad: Sömürgeci birikim ve dünya sistemi
    savunanlar: [Immanuel Wallerstein, Eric Williams]
    tez: Sermaye birikimi sömürge yağması ve köle emeğiyle finanse edildi.
    guclu_yani: Kaynak akışının hacmini ve zamanlamasını gösterir.
    zayif_yani: En büyük sömürge imparatorluklarının her zaman en hızlı sanayileşenler olmaması.
hakem_yok: true
---
```

`hakem_yok: true` zorunludur ve daima true'dur. Makale sonunda "sonuç olarak en doğrusu
şudur" cümlesi yazılmaz.

---

## 8. Kaynak havuzu

### İzinli kaynaklar (whitelist)

**Genel referans**
- Wikipedia (EN öncelikli) — *sadece giriş kapısı olarak*; makalenin kendi dipnotlarındaki
  asıl kaynağa inilir ve o kaynak künyeye yazılır
- Encyclopaedia Britannica
- TDV İslam Ansiklopedisi (islamansiklopedisi.org.tr) — Osmanlı/İslam için birincil tercih
- Encyclopaedia Iranica

**Akademik / hakemli**
- Stanford Encyclopedia of Philosophy — felsefe için birincil tercih
- Internet Encyclopedia of Philosophy
- DergiPark — Türkçe akademik makaleler, açık erişim
- JSTOR açık erişim koleksiyonu, SSRN, arXiv (econ/history)

**Birincil metinler (kamu malı, tam metin)**
- Project Gutenberg
- Internet Archive
- Perseus Digital Library — klasik metinler
- Avalon Project (Yale) — antlaşmalar, hukuki belgeler
- Marxists Internet Archive — birincil metin arşivi olarak (Marksist olmayan metinler dahil)

**Veri**
- Our World in Data (CC-BY) — demografi, GSYH, savaş kayıpları
- UN Population Division / World Population Prospects
- Maddison Project Database — tarihsel GSYH serileri
- Correlates of War Project — çatışma verisi
- World Bank Open Data

**Ders / anlatı**
- Yale Open Courses, MIT OpenCourseWare — tam ders serileri

### Yasaklı kaynaklar (blacklist)

- Blog, forum, Reddit, Quora, Medium
- Kaynak göstermeyen YouTube kanalları
- İçerik çiftliği siteleri, SEO ağırlıklı "tarih" siteleri
- Yapay zekâ ile üretilmiş içerik barındıran siteler
- Belirli bir siyasi hareketin propaganda organları
- Telifli kitapların korsan PDF'leri — hiçbir koşulda

---

## 9. Otonom üretim hattı

Hat, tek bir komutla başlar ve altı fazın tamamını insan müdahalesi olmadan tamamlar:

```bash
npm run otonom
```

### Orkestratör döngüsü

```
BAŞLA
  DURUM.md oku → aktif faz, aktif parti, metrikler, bütçe
  DÖNGÜ:
    1. Bütçe kontrolü      → aşıldıysa DURUM.md'ye yaz, temiz çık
    2. Faz kapısı kontrolü → aktif faz bitti mi? Kapı eşikleri geçildi mi?
                             Geçildiyse fazı ilerlet, geçilmediyse onarım fazına gir
    3. Sonraki partiyi al  → kuyruktan ≤5 makale, bağımlılıkları çözülmüş olanlar
    4. Üret                → §9 üretim adımları (temiz oturum)
    5. Denetle             → §10 doğrulama geçişleri (ayrı temiz oturumlar)
    6. Karar ver           → onayla / onar / karantinaya al
    7. Commit + DURUM.md güncelle
    8. Context'i sıfırla, DÖNGÜ'ye dön
  BİTİR: rapor üret → RAPOR.md
```

**Context sıfırlama zorunludur.** Her parti kendi temiz oturumunda çalışır; oturumlar
arası tek iletişim kanalı `DURUM.md` ve git geçmişidir. Bu, hem context limitini hem de
İlke 6'daki bağımsızlık şartını sağlar.

### DURUM.md — hattın hafızası

Otonom döngü kendi context'ini kaybettiği için tüm durum bu dosyada tutulur.
Her adımda güncellenir, her commit'e dahil edilir.

```yaml
aktif_faz: 2
aktif_parti: B07
son_commit: a3f9c21
son_guncelleme: 2026-08-20T14:22:00Z

sayaclar:
  uretilen: 87
  onaylanan: 79
  karantinada: 6
  onarim_dongusunde: 2

metrikler:
  kaynak_dogrulama_orani: 0.94
  ortalama_kaynak_sayisi: 4.2
  ornekleme_kapisi_son_skor: 0.95
  ornekleme_kapisi_son_calisma: 2026-08-20T11:05:00Z

butce:
  makale_basina_max_deneme: 3
  faz_basina_max_parti: 40
  toplam_token_tavani: 40000000
  harcanan_token: 12400000

engeller:
  ardisik_ayni_hata: 0        # 5 olursa hat durur
  mudahale_gereken: 3
```

### Kuyruk

`plan/kuyruk.yaml` merkezi iş listesidir:

```yaml
- id: olay-1914-temmuz-krizi
  tip: olay
  durum: bekliyor        # bekliyor|uretiliyor|denetleniyor|onarimda|onaylandi|karantina
  faz: 2
  bagimlilik: [donem-13]
  atanan_parti: B07
  deneme: 0
```

### Makale üretim adımları

Her makale için sırayla:

1. **Araştır** — whitelist'ten en az 3 bağımsız kaynak. Wikipedia kullanıldıysa
   onun dipnotundaki asıl kaynağa in.
2. **İskelet çıkar** — bölüm başlıkları + her bölümün hangi kaynağa dayanacağı.
3. **Yaz** — Türkçe, terimler.yaml'a sadık, her iddia dipnotlu.
4. **Kendi kendini denetle** — her `[^k]` referansını kaynağa karşı kontrol et.
   Kaynakta bulamadığın iddiayı **sil**, yumuşatma.
5. **Bağla** — `ilgili` alanını doldur, çift yönlü linkleri kur.
6. **Commit** — tek makale = tek commit. Mesaj formatı: `icerik(olay): 1914 Temmuz Krizi`

### Fazlar

| Faz | Kapsam | Çıktı |
|---|---|---|
| **0** | Altyapı + 10 örnek makale (her tipten en az 1) | Şema, linter, terimler.yaml, tasarım, kalite kapısı |
| **1** | 16 dönem makalesi | Kronolojik omurga tamam |
| **2** | ~100 olay + ~50 aktör | Ana gövde |
| **3** | ~40 düşünür + ~60 kavram | Kavramsal katman |
| **4** | ~25 tartışma + ~15 veri + ~40 kaynak | Sentez katmanı |
| **5** | Çapraz denetim, link bütünlüğü, tutarlılık geçişi | Yayına hazır |

### Faz kapıları — otomatik geçiş eşikleri

Fazlar arası geçiş insan onayına değil, ölçülen metriklere bağlıdır.
Eşikler `otonom/kapilar.yaml` dosyasında tanımlıdır:

```yaml
faz_0:
  ornek_makale_sayisi: 10
  kaynak_dogrulama_orani_min: 0.95     # denetim geçişlerinde doğrulanan iddia oranı
  makale_basina_kaynak_min: 3
  build_kapilari: hepsi_gecmeli
  karantina_orani_max: 0.10
  tasarim_plani_yazildi: true
  zaman_seridi_prototipi_calisiyor: true

faz_1_5:
  kaynak_dogrulama_orani_min: 0.92
  karantina_orani_max: 0.15
  ornekleme_kapisi_min: 0.90
  capraz_celiski_sayisi_max: 0
```

**Kapı geçilmezse ne olur:** Faz ilerlemez, hat da durmaz. Orkestratör **onarım fazına**
girer: karantinadaki makaleleri en çok başarısız olan hata tipine göre gruplar, kök
nedeni tespit eder (kaynak havuzu mu zayıf, prompt mu belirsiz, terim sözlüğü mü eksik),
düzeltmeyi uygular ve o grubu yeniden üretir. Onarım en fazla 3 tur denenir.
3 turda da kapı geçilmezse hat durur ve `denetim/MUDAHALE-GEREKLI.md` yazılır.

### Döngü koruyucuları

Otonom bir hattın en büyük riski sonsuz döngü ve sessiz bozulmadır. Sert limitler:

| Koruyucu | Limit | Aşılırsa |
|---|---|---|
| Makale başına üretim denemesi | 3 | Karantina + kayıt, sonraki makaleye geç |
| Kaynak fetch denemesi | 2 farklı kaynak | İddia silinir |
| Onarım turu | 3 | Hat durur, müdahale dosyası yazılır |
| Ardışık aynı hata | 5 | Hat durur, müdahale dosyası yazılır |
| Faz başına parti | `kapilar.yaml` | Faz zorla kapatılır, kalan iş karantinaya |
| Toplam token | `butce.yaml` | Temiz çıkış, DURUM.md kaldığı yeri kaydeder |

Hat durduğunda **kaldığı yerden devam edebilir olmalıdır**: `npm run otonom` yeniden
çalıştırıldığında DURUM.md'yi okuyup aynı noktadan sürer.

---

## 10. Doğrulama hattı

İnsan incelemesi devrede olmadığı için doğrulama beş geçişe çıkar. Geçiş 1 hariç
hepsi **ayrı ve temiz Claude Code oturumlarında** çalışır; denetleyen oturum sadece
makaleyi ve kaynak URL'lerini görür, üretim gerekçelerini görmez.

### Geçiş 1 — Biçimsel denetim (`npm run lint`)

Programatik, model gerektirmez. Şema, dipnot bütünlüğü, terim uyumu, telif kuralları,
link bütünlüğü. Hızlı ve ucuz olduğu için ilk çalışır — buradan geçemeyen makale
pahalı geçişlere hiç girmez.

### Geçiş 2 — Kaynak denetimi (`npm run denetle`)

Makale başına ayrı oturum:
- Her `[^k]` referansını al, kaynağı **gerçekten fetch et**, iddianın o metinde
  bulunup bulunmadığını kontrol et
- URL ölüyse veya iddia metinde yoksa → `HATA`
- İddia kaynaktan çıkarım yoluyla türetilmişse ama doğrudan yazmıyorsa → `ISARET`

```markdown
## olay-1914-temmuz-krizi
- [OK]      k1 → "23 Temmuz ültimatomu" doğrulandı
- [ISARET]  k2 → "yirmi beş gün" — kaynakta bu hesap yok, çıkarım olabilir
- [HATA]    k3 → Kaynak bu iddiayı desteklemiyor, farklı bir olayı anlatıyor
```

### Geçiş 3 — Çürütücü geçişi (`npm run curut`)

Ayrı oturum, **düşmanca görev tanımıyla**. Bu oturuma verilen talimat onaylamak değil,
kırmaktır:

> Bu makaledeki en zayıf üç iddiayı bul. Hiçbiri zayıf değilse bunu gerekçelendir —
> ama önce ciddi biçimde ara. Özellikle şunlara bak: kaynağın desteklediğinden fazlasını
> söyleyen cümleler, tek kaynağa dayanan nedensellik iddiaları, tartışmalı olduğu halde
> kesin sunulan yargılar, tarih/sayı hataları, dönemsel anakronizm.

Çıktı: `denetim/raporlar/<id>-curutucu.md`. Bulunan her itiraz üretici oturuma geri
beslenir; makale ya düzeltilir ya iddia silinir.

### Geçiş 4 — Bağımsız yeniden türetme (`npm run turet`)

Hattın en güçlü kontrolü. `guven: kesin` etiketli her iddia için:

1. Temiz bir oturum açılır, makaleyi **görmez**
2. Sadece soru sorulur: "Avusturya-Macaristan ültimatomu hangi tarihte verildi?"
3. Bu oturum, orijinal makalenin kullandığı kaynaklardan **farklı en az bir kaynak**
   kullanmak zorundadır (kaynak listesi bloke edilir)
4. Sonuç makaledeki değerle karşılaştırılır

Uyuşmazlık → `HATA`. Bu geçiş, üretici oturumun uydurduğu ya da yanlış hatırladığı
tarih ve sayıları yakalar.

**Sınırı:** Her iki oturum da aynı hatalı kaynağa dayanıyorsa hata hayatta kalır.
Kaynak bloklama bunu azaltır, sıfırlamaz. §16'daki örnekleme kapısı bu artık riski
istatistiksel olarak ölçer.

### Geçiş 5 — Çapraz tutarlılık (`npm run capraz`)

Tüm korpus üzerinde, faz sonlarında:
- Aynı tarih farklı makalelerde farklı mı verilmiş?
- Aynı kişinin doğum/ölüm yılı çelişiyor mu?
- İki makale birbiriyle çelişen nedensellik iddiası mı yapıyor?
- Kırık iç link, tek yönlü `ilgili` bağı var mı?

Çelişki bulunursa her iki makale de onarım kuyruğuna alınır.

---

### Karar mekanizması (insan onayının yerine geçen)

Beş geçişin sonunda makale otomatik olarak sınıflanır:

| Sonuç | Karar | Ne olur |
|---|---|---|
| 0 HATA, ≤1 ISARET | `onaylandi` | Yayınlanır |
| 1–2 HATA veya ≥2 ISARET | `onarimda` | Düzeltilir, geçiş 2–4 tekrarlanır (en fazla 3 tur) |
| ≥3 HATA, ya da 3. onarım turu da başarısız | `karantina` | `karantina/` klasörüne taşınır, **yayınlanmaz**, kayıt tutulur |
| Kaynak fetch edilemiyor (2 alternatif denendi) | — | İddia silinir, makale onarıma girer |

`onaylandi` olmayan hiçbir içerik production build'e girmez. Bu kural build kapısı
olarak zorlanır (§11, kapı 6) — orkestratörün onu atlaması mümkün değildir.

### Örnekleme kapısı — hattın kendi kendini denetlemesi

Her 50 onaylanmış makalede bir, otomatik olarak tetiklenir:

1. 20 onaylanmış makale rastgele seçilir
2. Her birinden rastgele bir iddia alınır
3. Her iddia için tam bağımsız yeniden türetme yapılır (Geçiş 4 protokolü)
4. Doğrulanan iddia oranı hesaplanır ve DURUM.md'ye yazılır

| Skor | Davranış |
|---|---|
| ≥ 0.95 | Devam |
| 0.90 – 0.95 | Devam + `RAPOR.md`'ye uyarı, kaynak havuzu gözden geçirilir |
| < 0.90 | **Hat durur.** `denetim/MUDAHALE-GEREKLI.md` yazılır |

Bu, projedeki tek koşulsuz durdurma kuralıdır. Sebebi basit: doğrulama oranı bu eşiğin
altına düştüyse üretmeye devam etmek, doğrulanamayan içerik hacmini büyütmekten
başka bir şey yapmaz.

### Müdahale defteri

`denetim/MUDAHALE-GEREKLI.md` — hattın çözemediği her şeyin tek dosyada toplandığı yer.
İnsan bunu **sonda** okur, akış sırasında değil.

```markdown
## Karantina: 6 makale
- olay-vestfalya-barisi — k2 ve k4 kaynakları erişilemez, alternatif bulunamadı
- kavram-hegemonya — çürütücü 4 itiraz buldu, 3 onarım turu çözmedi

## Çözülemeyen çelişkiler: 2
- Nüfus rakamı: donem-08 (75M) ile veri-dunya-nufusu (68M) çelişiyor,
  kaynaklar da kendi arasında çelişiyor — editoryal karar gerekiyor

## Kaynak havuzu boşlukları
- Güney Asya ve Afrika dönem makaleleri için Türkçe/açık erişim kaynak yetersiz;
  bu bölgelerin kapsamı diğerlerinden sığ kaldı
```

---

## 11. Teknik yığın

- **Astro** (statik çıktı) — Content Collections + Zod ile frontmatter şema doğrulama.
  Şemaya uymayan içerik build'i kırar; bu, İlke 1'in teknik karşılığıdır.
- **Markdown + remark eklentileri** — özel direktifler (`::tartismali`), dipnot linteri
- **Pagefind** — build-time üretilen, sunucusuz tam metin araması (offline çalışır)
- **Veri görselleştirme** — hafif bir kütüphane; OWID/Maddison CSV'leri build'de indirilip
  repoda tutulur, runtime'da dış istek yok
- **Bağımlılık disiplini** — üçüncü parti JS minimumda; site JS kapalıyken de okunabilir olmalı

### Build kapıları (bunlar kırılırsa build başarısız)

İnsan gözü olmadığı için bu kapılar projenin tek gerçek savunma hattıdır.
Hiçbiri uyarıya düşürülemez, hiçbiri atlanamaz.

```
 1. Zod şema doğrulaması        → her frontmatter alanı geçerli
 2. Dipnot linteri              → kaynaksız iddia paragrafı yok
 3. Kaynak anahtarı bütünlüğü   → tanımsız [^k] referansı yok
 4. Terim linteri               → yasak varyant kullanımı yok
 5. Link bütünlüğü              → kırık iç link yok
 6. Onay filtresi               → denetim_durumu != onaylandi olan içerik prod'a girmez
 7. Telif linteri               → tırnak içi span > 15 kelime → hata
                                  aynı kaynaktan > 1 alıntı → hata
 8. Kaynak canlılığı            → her URL HTTP 200 dönmeli
 9. Hakemlik dedektörü          → tartisma tipinde hakem_yok != true → hata
                                  "sonuç olarak / en doğrusu / aslında şudur"
                                  kalıbıyla hüküm cümlesi → hata
10. Uydurma kaynak kontrolü     → künyedeki başlık, fetch edilen sayfada geçmiyorsa → hata
```

### Komutlar

```bash
npm run otonom      # ana orkestratör — tüm fazları uçtan uca çalıştırır
npm run otonom -- --faz 2     # tek faz çalıştır
npm run durum       # DURUM.md'yi okunabilir özet olarak yazdır
npm run lint        # Geçiş 1 — programatik denetim
npm run denetle     # Geçiş 2 — kaynak denetimi
npm run curut       # Geçiş 3 — çürütücü geçişi
npm run turet       # Geçiş 4 — bağımsız yeniden türetme
npm run capraz      # Geçiş 5 — çapraz tutarlılık
npm run ornekle     # örnekleme kapısını manuel tetikle
npm run rapor       # RAPOR.md üret
```

---

## 12. Tasarım yönü

Kod yazmadan önce **yazılı bir tasarım planı üret**: 4-6 isimlendirilmiş hex renk,
2-3 rol için tipografi seçimi (display / gövde / veri-etiket), layout konsepti ve
tek bir imza öğesi. Planı brief'e karşı gözden geçir, sonra kodla.

### Kaçınılacak varsayılanlar

Aşağıdaki üç görünüm yapay zekâ üretimi tasarımın klişeleridir. Bu projede kullanılmaz:

1. Krem arka plan (#F4F1EA civarı) + yüksek kontrastlı serif + terracotta vurgu (#D97757 civarı)
2. Siyaha yakın arka plan + tek parlak asit yeşili/vermilyon vurgu
3. Gazete/broadsheet düzeni — saç teli çizgiler, sıfır border-radius, yoğun sütunlar

Palet ve tipografi, konunun kendi maddi dünyasından türetilmelidir — arşiv, harita,
kronik, palimpsest, kil tablet, matbaa. Ama bunu tema parkına çevirme: bir tarih sitesi
eski görünmek zorunda değil, **okunabilir ve gezinilebilir** olmak zorunda.

### İmza öğesi

Bu sitenin ana etkileşimi **zaman**dır. İmza öğesi paralel zaman şeridi olmalı:
bir dönem seçildiğinde altı bölgenin (Avrupa / İslam dünyası / Doğu Asya / Güney Asya /
Afrika / Amerika) aynı anda ne yaşadığını yan yana gösteren bir görünüm. Cesaretini
buraya harca; gerisi sakin ve disiplinli kalsın.

### Kalite tabanı

Mobilde çalışır, klavye odağı görünür, `prefers-reduced-motion` desteklenir,
çift tema (açık/koyu), JS olmadan da içerik okunabilir.

---

## 13. Klasör yapısı

```
beseri-atlas/
├── KICKOFF-beseri-atlas.md
├── DURUM.md                     # otonom döngünün hafızası — her adımda güncellenir
├── RAPOR.md                     # hat bittiğinde üretilen nihai rapor
├── otonom/
│   ├── orkestrator.ts           # ana döngü
│   ├── kapilar.yaml             # faz geçiş eşikleri
│   ├── butce.yaml               # token/deneme/tur limitleri
│   └── oturum-sablonlari/       # üretici / denetleyici / çürütücü / türetici promptları
├── plan/
│   ├── kuyruk.yaml              # iş listesi, durum takibi
│   └── faz-notlari.md           # her fazın sonunda ne öğrenildi
├── karantina/                   # denetimi geçemeyen makaleler — yayınlanmaz, silinmez
├── icerik/
│   ├── _sistem/
│   │   ├── terimler.yaml        # kilitli terim sözlüğü
│   │   ├── kaynak-havuzu.yaml   # whitelist/blacklist
│   │   └── sema.ts              # Zod şemaları
│   ├── donem/
│   ├── olay/
│   ├── aktor/
│   ├── dusunur/
│   ├── kavram/
│   ├── tartisma/
│   ├── veri/
│   └── kaynak/
├── veri-setleri/                # indirilmiş CSV'ler, lisans dosyalarıyla
├── denetim/
│   ├── raporlar/                # makale başına denetim + çürütücü raporu
│   ├── metrikler.json           # koşan istatistikler, örnekleme kapısı geçmişi
│   └── MUDAHALE-GEREKLI.md      # hattın çözemedikleri — insan bunu SONDA okur
├── src/                         # Astro
└── araclar/
    ├── linter-dipnot.ts
    ├── linter-terim.ts
    ├── linter-telif.ts
    ├── linter-hakemlik.ts
    ├── kaynak-canlilik.ts
    └── capraz-kontrol.ts
```

---

## 14. Faz 0 — ilk teslimat

Faz 0, hattın **kalibrasyon fazıdır**: burada üretilen 10 makale, geri kalan 300'ün
kalite referansıdır. Bu yüzden en yavaş ve en titiz faz odur.

Üretilmesi gerekenler:

1. Astro projesi, Zod şemaları, **on build kapısının hepsi** çalışır durumda
2. Orkestratör (`otonom/orkestrator.ts`), DURUM.md, kapilar.yaml, butce.yaml
3. Dört oturum şablonu: üretici / denetleyici / çürütücü / türetici
4. `terimler.yaml` — en az 80 terim
5. `kaynak-havuzu.yaml` — whitelist/blacklist, tur bazında
6. Tasarım planı (yazılı) + uygulanmış tasarım sistemi, çift tema
7. **10 örnek makale** — her tipten en az bir tane, biri mutlaka dönem makalesi:
   - `donem-13` (1914–1945)
   - `olay-1914-temmuz-krizi`
   - `aktor-osmanli-imparatorlugu`
   - `dusunur-ibn-haldun`
   - `kavram-asabiyet`
   - `kavram-demografik-gecis`
   - `tartisma-1914-savas-sorumlulugu`
   - `tartisma-bati-neden-yukseldi`
   - `veri-dunya-nufusu-1500-2025`
   - `kaynak-clark-uyurgezerler`
8. Bu 10 makale için beş geçişin tamamı + çürütücü raporları
9. Paralel zaman şeridi bileşeninin çalışan bir prototipi

### Faz 0 kapısı — otomatik

Faz 1'e geçiş `otonom/kapilar.yaml` içindeki `faz_0` eşiklerine bağlıdır.
Kapı geçilmezse orkestratör onarım fazına girer (§9), insan beklemez.

Eşikler geçildiğinde Faz 0 kapanır, DURUM.md `aktif_faz: 1` olur ve döngü kendiliğinden
sürer. Kapı üç onarım turunda da geçilmezse hat durur ve müdahale defteri yazılır —
bunun anlamı şudur: sorun tek tek makalelerde değil, sistem tasarımındadır ve
300 makaleye ölçeklemeden önce düzeltilmesi gerekir.

---

## 15. Kesin yasaklar

- Kaynağı doğrulanmamış iddia yazmak
- Kaynakta bulunamayan bir iddiayı "muhtemelen doğrudur" diyerek yumuşatılmış biçimde tutmak
- Telifli kitaptan bölüm çevirisi, uzun özet veya yeniden yapılandırılmış anlatı üretmek
- 15 kelimeden uzun doğrudan alıntı; aynı kaynaktan birden fazla alıntı
- Tartışmalı bir konuda hakemlik yapmak, "aslında şudur" demek
- Tarih anlatısını güncel bir siyasi pozisyonu destekleyecek şekilde çerçevelemek
- Onaylanmamış makaleyi production build'e sokmak
- Faz atlamak, kuyruk dışı toplu üretim yapmak
- Uydurma kaynak künyesi veya çalışmayan URL üretmek

### Otonom çalışmaya özgü yasaklar

Bu maddeler, insan gözü olmadığı için ayrıca vurgulanır. İhlali sessizce projeyi bozar:

- **Kapıyı gevşetmek.** Metrik tutmuyorsa eşik düşürülmez, linter uyarıya çevrilmez,
  build kapısı atlanmaz. Kapı, düzeltilecek şeyin ne olduğunu söyleyen sinyaldir;
  susturulacak gürültü değil.
- **İlerlemek için kaynak uydurmak.** Karantinaya almak, sahte künye ile devam etmekten
  her zaman iyidir.
- **Denetleyici oturuma üretim context'i taşımak.** Bağımsızlık şartı (İlke 6) hız
  gerekçesiyle bile esnetilmez.
- **Yeniden türetmeyi aynı kaynakla yapmak.** Kaynak bloklama listesi zorunludur;
  aksi halde geçiş 4 sadece kendini tekrar eder.
- **Karantinadaki makaleyi silmek.** Karantina kalıcı kayıttır; hattın nerede ve neden
  başarısız olduğunun tek delili odur.
- **DURUM.md'yi güncellemeden commit atmak.** Durum dosyası ile git geçmişi ayrışırsa
  hat kaldığı yerden devam edemez.
- **"Şimdilik böyle kalsın, sonra düzeltilir" notu bırakmak.** Sonra yok. Ya düzelt,
  ya karantinaya al.

---

## 16. Başarı ölçütü ve nihai rapor

Hat kendini şu testle sınar — ve bu testi kendisi çalıştırır (`npm run ornekle`):

Rastgele 20 onaylanmış makale seçilir, her birinden rastgele bir iddia alınır,
her iddia bağımsız olarak yeniden türetilir. 20 iddianın en az 19'u doğrulanabilmelidir.
Bu oranın altındaki her sonuç projenin amacına ulaşmadığı anlamına gelir — çünkü
doğrulanamayan bir bilgi atlası, hiç olmamasından daha kötüdür.

### RAPOR.md — hat bittiğinde otomatik üretilir

Otonom çalışmanın çıktısı sadece site değil, **kendi güvenilirliğinin ölçümüdür.**
İnsanın okuyacağı tek zorunlu belge budur:

```markdown
# Beşeri Atlas — Nihai Rapor

## Kapsam
Üretilen: 312 | Onaylanan: 289 | Karantinada: 23

## Doğrulama
Örnekleme kapısı geçmişi: 0.96 / 0.94 / 0.95 / 0.93 / 0.95 / 0.97
Nihai skor: 0.95 (19/20)
Makale başına ortalama kaynak: 4.1
Çürütücünün yakalayıp düzelttiği iddia: 147

## Zayıf noktalar
- Güney Asya ve Afrika kapsamı, açık erişim kaynak azlığı nedeniyle sığ
- MÖ 3000 öncesi dönem makalelerinde `tartismali` oranı %40 — arkeolojik
  yorum farklılıkları, beklenen bir sonuç
- Karantinadaki 23 makalenin 14'ü aynı sebepten: erişilemeyen kaynak URL'i

## Güvenilirlik beyanı
Bu korpus otonom olarak üretildi ve otonom olarak denetlendi. Ölçülen doğrulama
oranı %95'tir; yani her 20 iddiadan yaklaşık birinin kaynağa gidildiğinde
doğrulanamaması beklenir. Ortak kaynaklı hatalar bu ölçümde görünmez.
Site, kitapların yerine değil, onlara giden yol olarak kullanılmalıdır.
```

Son paragraf **zorunludur ve sitenin hakkında sayfasında da yayınlanır.** Otonom
üretilmiş bir bilgi kaynağının okuyucuya borcu, kendi hata payını gizlememektir.
