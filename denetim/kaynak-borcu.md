# Kaynak borcu

_Bu dosya `araclar/linter-kaynak.mjs` (KAPI 13) tarafından her koşuda
yeniden yazılır. Elle düzenlenmez._

Ölçülen kural, kaynak havuzunun kendi kuralıdır: bir makalede en fazla bir
giriş kapısı (ansiklopedi) künyesi bulunabilir ve makale en az bir birincil
kanıta dayanmalı veya neden erişilemediğini açık bir `kaynak_siniri` beyanıyla
okura göstermelidir. Veri setleri, kullanıldıkları her makale tipinde birincil
kanıt sayılır. Havuz `gutenberg.org`, `archive.org`, `perseus.tufts.edu`,
`avalon.law.yale.edu`, `marxists.org` ve `en.wikisource.org` alanlarını birincil
olarak zaten onaylıyor — izin vardı, kullanılmadı.

| Ölçüm | Değer |
|---|---|
| Ölçülen makale | 542 |
| Toplam künye | 2564 |
| Giriş kapısı kuralını aşan makale | 114 |
| Birincil kanıt taşımayan makale | 31 |
| Açık kaynak sınırı beyanlı makale | 45 |
| Kanıtı da sınır beyanı da olmayan makale | 0 |
| Giriş kapısı künyesi payı | 22% |

## Tipe göre borçlu makale

| Tip | Borçlu |
|---|---|
| olay | 39 |
| aktor | 35 |
| kavram | 24 |
| kaynak | 8 |
| dusunur | 7 |
| donem | 1 |

## Makale dökümü

| Makale | Künye | Giriş kapısı | Birincil | Sorun |
|---|---|---|---|---|
| `aktor-bizans-imparatorlugu` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-cin-halk-cumhuriyeti` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-dunya-bankasi` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-dunya-ticaret-orgutu` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-tacitus` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-cin-devrimi-1949` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-iskender-seferleri` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-kavimler-gocu` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-otuz-yil-savaslari` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-pon-savaslari` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-reform` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-roma-cumhuriyetinin-sonu` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-abd` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-ahamenis-imparatorlugu` | 6 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-aksum-kralligi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-alman-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-avrupa-birligi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-birlesmis-milletler` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-britanya-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-buyuk-zimbabve` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-delhi-sultanligi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-eyyubi-devleti` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-gokturk-kaganligi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-goryeo-choson` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-gupta-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-hansa-birligi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-hitit-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-hun-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-ingiliz-doguhindistan-sirketi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-ispanyol-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-japonya-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-khmer-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-maurya-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-maya-uygarligi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-misir-yeni-kralligi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-qing-hanedani` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-roma-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-rus-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-sasani-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-song-hanedani` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-songhay-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-srivijaya` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-timur-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `donem-07` | 6 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-herodotos` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-mackinder` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-mahan` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-polanyi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-tocqueville` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-wallerstein` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-arkeolojik-kanit` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-askeri-devrim` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-bagimlilik-kurami` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-birincil-kaynak` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-bozkir-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-burokrasi` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-caydiricilik` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-donemlendirme` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-dunya-sistemi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-feodalite` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-gini-katsayisi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-haracguzarlik` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-imparatorluk` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-kaynak-elestirisi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-mandala-devleti` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-milliyetcilik` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-para` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-sekulerlesme` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-sivil-toplum` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-somurgesizlesme` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-surtunme` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-ticaret-diasporasi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-ulus-devlet` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-yazi-sistemi` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-braudel-akdeniz` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-carr-tarih-nedir` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-durkheim-intihar` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-gibbon-roma` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-herodotos-tarihler` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-hobsbawm-caglar` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-polanyi-buyuk-donusum` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-tooze-felaketin-bedeli` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-1848-devrimleri` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-1905-rus-devrimi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-1968-hareketleri` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-1973-petrol-krizi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-2008-finansal-krizi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-afrika-bagimsizlik-dalgasi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-bandung-konferansi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-birinci-dunya-savasi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-bretton-woods` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-cernobil` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-cheng-ho-seferleri` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-cin-reformlari-1978` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-ekim-devrimi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-gobeklitepe` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-han-hanedani-kurulusu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-hindistan-bolunmesi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-ingiliz-ic-savasi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-internetin-yayginlasmasi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-ipek-yolu-kurulusu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-islam-fetihleri` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-ispanya-ic-savasi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-istanbulun-fethi` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-justinyen-vebasi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-kuba-fuze-krizi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-mansa-musa-haci` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-meiji-restorasyonu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-napolyon-savaslari` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-pers-yunan-savaslari` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-ronesans` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-suveys-krizi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-taiping-isyani` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-viyana-kongresi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
