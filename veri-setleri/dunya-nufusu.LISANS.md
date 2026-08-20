# dunya-nufusu.csv — kaynak ve lisans

**Kaynak:** Our World in Data, "Population, long-run with projections"
https://ourworldindata.org/grapher/population-long-run-with-projections

**İndirilme tarihi:** 2026-08-20
**İndirilen uç nokta:**
`https://ourworldindata.org/grapher/population-long-run-with-projections.csv?csvType=full&useColumnShortNames=true`

**Lisans:** CC BY 4.0 (Our World in Data)

**Filtre:** yalnızca `entity = World` satırları; seçilmiş yıllar.

**Sütunlar**
- `yil` — takvim yılı
- `nufus` — dünya nüfusu (kişi)
- `not` — `tarihsel tahmin` (OWID tarihsel seri) veya `BM projeksiyonu`
  (Birleşmiş Milletler World Population Prospects orta varyant projeksiyonu)

**Önemli:** Tarihsel seri 2023'te biter. 2025 değeri bir ölçüm değil,
projeksiyondur ve `not` sütununda böyle işaretlenmiştir. 1500–1900 aralığındaki
değerler de doğrudan sayım değil, tarihsel demografi tahminleridir; bu yüzden
makalede `guven: yaygin` etiketiyle sunulurlar.

Veri build sırasında repodan okunur; runtime'da dış istek yapılmaz (§11).
