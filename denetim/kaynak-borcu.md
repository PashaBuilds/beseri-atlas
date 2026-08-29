# Kaynak borcu

_Bu dosya `araclar/linter-kaynak.mjs` (KAPI 13) tarafından her koşuda
yeniden yazılır. Elle düzenlenmez._

Ölçülen kural, kaynak havuzunun kendi kuralıdır: bir makalede en fazla bir
giriş kapısı (ansiklopedi) künyesi bulunabilir ve makale en az bir birincil
kaynağa dayanmalıdır. Havuz `gutenberg.org`, `archive.org`, `perseus.tufts.edu`,
`avalon.law.yale.edu`, `marxists.org` ve `en.wikisource.org` alanlarını birincil
olarak zaten onaylıyor — izin vardı, kullanılmadı.

| Ölçüm | Değer |
|---|---|
| Ölçülen makale | 530 |
| Toplam künye | 2475 |
| Giriş kapısı kuralını aşan makale | 144 |
| Birincil kaynağı olmayan makale | 175 |
| Giriş kapısı künyesi payı | 24% |

## Tipe göre borçlu makale

| Tip | Borçlu |
|---|---|
| aktor | 61 |
| kavram | 59 |
| olay | 52 |
| kaynak | 28 |
| dusunur | 16 |
| donem | 4 |
| tartisma | 1 |

## Makale dökümü

| Makale | Künye | Giriş kapısı | Birincil | Sorun |
|---|---|---|---|---|
| `aktor-bizans-imparatorlugu` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-dunya-bankasi` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-dunya-ticaret-orgutu` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `dusunur-tacitus` | 4 | 3 | 1 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-cin-devrimi-1949` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-iskender-seferleri` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-kavimler-gocu` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-otuz-yil-savaslari` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-pon-savaslari` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-reform` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-roma-cumhuriyetinin-sonu` | 4 | 3 | 0 | 3 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-abd` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-ahamenis-imparatorlugu` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-aksum-kralligi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-alman-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-asur-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-avrupa-birligi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-birlesmis-milletler` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-britanya-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-buyuk-zimbabve` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-cin-halk-cumhuriyeti` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-delhi-sultanligi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-eyyubi-devleti` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-gokturk-kaganligi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-goryeo-choson` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-gupta-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-han-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-hansa-birligi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-hitit-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-hun-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-ingiliz-doguhindistan-sirketi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-ispanyol-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-japonya-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-khmer-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-maurya-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-maya-uygarligi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-misir-yeni-kralligi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-nato` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `aktor-qing-hanedani` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-roma-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-rus-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-sasani-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-song-hanedani` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-songhay-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-srivijaya` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-timur-imparatorlugu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `donem-07` | 6 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-clausewitz` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-herodotos` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-kautilya` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-mackinder` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-mahan` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-polanyi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `dusunur-sima-qian` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-tocqueville` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `dusunur-wallerstein` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-arkeolojik-kanit` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-askeri-devrim` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-bagimlilik-kurami` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-birincil-kaynak` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-bozkir-imparatorlugu` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-burokrasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-caydiricilik` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-donemlendirme` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-dunya-sistemi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-egemenlik` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-feodalite` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-gini-katsayisi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-guc-dengesi` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-haracguzarlik` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-hukuk-devleti` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-imparatorluk` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-kapitalizm` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-kaynak-elestirisi` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-malthus-tuzagi` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-mandala-devleti` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-merkantilizm` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-milliyetcilik` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-para` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-sehir-devleti` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-sekulerlesme` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-sivil-toplum` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-somurgesizlesme` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-surtunme` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-tarihsel-materyalizm` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-ticaret-diasporasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-topyekun-savas` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kavram-ulus-devlet` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kavram-yazi-sistemi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kaynak-aristoteles-politika` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-braudel-akdeniz` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kaynak-carr-tarih-nedir` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kaynak-clausewitz-savas-uzerine` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-durkheim-intihar` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-gibbon-roma` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-herodotos-tarihler` | 3 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-hobbes-leviathan` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-hobsbawm-caglar` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kaynak-konfucyus-lunyu` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-machiavelli-prens` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-mackinder-cografi-eksen` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-mahan-deniz-gucu` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-malthus-nufus` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-marx-kapital` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-montesquieu-kanunlarin-ruhu` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-platon-devlet` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-polanyi-buyuk-donusum` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kaynak-sima-qian-shiji` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-smith-uluslarin-zenginligi` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-tacitus-annales` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `kaynak-tooze-felaketin-bedeli` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `kaynak-weber-protestan-ahlaki` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-1848-devrimleri` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-1905-rus-devrimi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-1968-hareketleri` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-1973-petrol-krizi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-2008-finansal-krizi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-afrika-bagimsizlik-dalgasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-bandung-konferansi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-birinci-dunya-savasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-bretton-woods` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-cernobil` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-cheng-ho-seferleri` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-cin-reformlari-1978` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-ekim-devrimi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-gobeklitepe` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-han-hanedani-kurulusu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-hindistan-bolunmesi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-ingiliz-ic-savasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-internetin-yayginlasmasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-ipek-yolu-kurulusu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-islam-fetihleri` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-ispanya-ic-savasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-istanbulun-fethi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-justinyen-vebasi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-kuba-fuze-krizi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-mansa-musa-haci` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-meiji-restorasyonu` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-napolyon-savaslari` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-ronesans` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-suveys-krizi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-taiping-isyani` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `olay-vestfalya-barisi` | 4 | 2 | 1 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor |
| `olay-viyana-kongresi` | 3 | 2 | 0 | 2 giris kapisi kunyesi (en.wikipedia.org, en.wikipedia.org) — havuz en fazla 1 diyor; birincil kaynak yok |
| `aktor-abbasi-hilafeti` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-altin-orda` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-avusturya-macaristan` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-buhara-hanligi` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-cagatay-hanligi` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-etiyopya-imparatorlugu` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-gana-imparatorlugu` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-hive-hanligi` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-hokand-hanligi` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-karluklar` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-karolenj-imparatorlugu` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-kirgizlar` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-mali-imparatorlugu` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-ming-hanedani` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-mogol-imparatorlugu` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-murabitlar` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-muvahhidler` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-osmanli-imparatorlugu` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-seybaniler` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-sogdlular` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-sokoto-hilafeti` | 4 | 1 | 0 | birincil kaynak yok |
| `aktor-sovyetler-birligi` | 3 | 1 | 0 | birincil kaynak yok |
| `aktor-tang-hanedani` | 3 | 1 | 0 | birincil kaynak yok |
| `donem-14` | 5 | 1 | 0 | birincil kaynak yok |
| `donem-15` | 5 | 1 | 0 | birincil kaynak yok |
| `donem-16` | 5 | 1 | 0 | birincil kaynak yok |
| `dusunur-katib-celebi` | 3 | 1 | 0 | birincil kaynak yok |
| `dusunur-nagarjuna` | 3 | 1 | 0 | birincil kaynak yok |
| `dusunur-ulug-bey` | 3 | 1 | 0 | birincil kaynak yok |
| `dusunur-wang-yangming` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-akrabalik` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-barut-imparatorluklari` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-buyuk-ayrisma` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-canak-comleksiz-neolitik` | 6 | 1 | 0 | birincil kaynak yok |
| `kavram-demografik-gecis` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-ikincil-kaynak` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-kamusal-alan` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-kanit-turu` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-konjonktur` | 7 | 1 | 0 | birincil kaynak yok |
| `kavram-kuresellesme` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-longue-duree` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-mesruiyet` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-millet-sistemi` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-okuryazarlik` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-olay-tarihi` | 7 | 1 | 0 | birincil kaynak yok |
| `kavram-patrimonyalizm` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-silahli-ticaret` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-takvim` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-tarihsel-iklimbilim` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-toplumsal-cinsiyet-duzeni` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-umran` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-veraset` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-vergi` | 3 | 1 | 0 | birincil kaynak yok |
| `kavram-yasam-beklentisi` | 3 | 1 | 0 | birincil kaynak yok |
| `kaynak-keynes-genel-teori` | 3 | 1 | 0 | birincil kaynak yok |
| `kaynak-milanovic-kuresel-esitsizlik` | 3 | 1 | 0 | birincil kaynak yok |
| `kaynak-piri-reis-kitab-i-bahriye` | 3 | 1 | 0 | birincil kaynak yok |
| `kaynak-pomeranz-buyuk-ayrisma` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-amerikan-ic-savasi` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-amerikanin-kesfi` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-balkan-savaslari` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-berlin-konferansi` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-hacli-seferleri` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-ikinci-dunya-savasi` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-kara-olum` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-malazgirt` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-mogol-fetihleri` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-plassey-1757` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-rus-turkistan-fethi` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-talas-savasi` | 3 | 1 | 0 | birincil kaynak yok |
| `olay-tanzimat-fermani` | 3 | 1 | 0 | birincil kaynak yok |
| `tartisma-orta-asya-neden-cekildi` | 4 | 1 | 0 | birincil kaynak yok |
| `dusunur-arendt` | 9 | 0 | 0 | birincil kaynak yok |
| `dusunur-farabi` | 3 | 0 | 0 | birincil kaynak yok |
| `kavram-kentlesme` | 3 | 0 | 0 | birincil kaynak yok |
| `kavram-tasavvuf` | 3 | 0 | 0 | birincil kaynak yok |
| `kaynak-farabi-medinetul-fazila` | 3 | 0 | 0 | birincil kaynak yok |
