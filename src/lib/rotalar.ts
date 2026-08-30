export type RotaAdimi = {
  id: string;
  rol: string;
};

export type Rota = {
  slug: string;
  no: string;
  baslik: string;
  soru: string;
  ozet: string;
  sure: string;
  seviye: string;
  vurgu: 'bakir' | 'oksit' | 'zincifre';
  kazanımlar: string[];
  adimlar: RotaAdimi[];
};

/**
 * Korpusun kendisi bir arşivdir; rotalar ise öğrenme tasarımıdır.
 * Her rota olgudan kavrama, kavramdan tartışmaya ilerler. Böylece okur yalnız
 * bilgi toplamaz; nedensellik kurmayı ve rakip açıklamaları tartmayı dener.
 */
export const ROTALAR: Rota[] = [
  {
    slug: 'guc-nasil-kurulur',
    no: '01',
    baslik: 'Güç nasıl kurulur?',
    soru: 'İnsanlar neden bazı yönetimlere itaat eder, bazılarına başkaldırır?',
    ozet: 'Meşruiyet, vergi ve bürokrasiyi bir imparatorluğun gündelik işleyişi üzerinden birbirine bağlayan temel rota.',
    sure: '55 dk',
    seviye: 'Başlangıç',
    vurgu: 'bakir',
    kazanımlar: [
      'Zor kullanma ile meşru otorite arasındaki farkı açıklamak',
      'Vergi, kayıt ve bürokrasinin birlikte nasıl devlet kapasitesi ürettiğini görmek',
      'Bir imparatorluğun sınırını yalnız haritayla tanımlamanın neden yetersiz olduğunu tartmak',
    ],
    adimlar: [
      { id: 'kavram-mesruiyet', rol: 'Ana kavram' },
      { id: 'kavram-vergi', rol: 'Maddi temel' },
      { id: 'kavram-burokrasi', rol: 'İşleyen mekanizma' },
      { id: 'aktor-osmanli-imparatorlugu', rol: 'Tarihsel örnek' },
      { id: 'dusunur-weber', rol: 'Açıklama çerçevesi' },
      { id: 'tartisma-imparatorluk-siniri-nasil-cizilir', rol: 'Açık soru' },
    ],
  },
  {
    slug: 'zenginlik-neden-birikir',
    no: '02',
    baslik: 'Zenginlik neden bazı yerlerde birikir?',
    soru: 'Sanayileşme bir buluşlar dizisi miydi, yoksa küresel bir güç ilişkisinin sonucu mu?',
    ozet: 'Sanayi Devrimi’ni kapitalizm, sömürge ağları ve Büyük Ayrışma tartışması içinde okuyan ekonomi rotası.',
    sure: '60 dk',
    seviye: 'Orta',
    vurgu: 'oksit',
    kazanımlar: [
      'Sanayileşmeyi teknolojiye indirgemeyen çok nedenli bir açıklama kurmak',
      'Smith ile Marx’ın aynı dönüşümde neyi farklı gördüğünü ayırt etmek',
      'Avrupa merkezli ilerleme anlatısının varsayımlarını sınamak',
    ],
    adimlar: [
      { id: 'olay-sanayi-devrimi', rol: 'Dönüm noktası' },
      { id: 'kavram-kapitalizm', rol: 'Sistem' },
      { id: 'kavram-buyuk-ayrisma', rol: 'Küresel karşılaştırma' },
      { id: 'dusunur-smith', rol: 'Birinci çerçeve' },
      { id: 'dusunur-marx', rol: 'Karşı çerçeve' },
      { id: 'tartisma-sanayi-devrimi-neden-ingiltere', rol: 'Açık soru' },
    ],
  },
  {
    slug: 'savas-nasil-kacinilmaz-olur',
    no: '03',
    baslik: 'Savaş nasıl kaçınılmaz görünür?',
    soru: 'Bir kriz hangi anda seçenekler dizisi olmaktan çıkıp kader gibi anlatılmaya başlanır?',
    ozet: '1914 Temmuz Krizi üzerinden ittifak, seferberlik, yanlış hesap ve sorumluluk problemini çözümleyen rota.',
    sure: '65 dk',
    seviye: 'Orta',
    vurgu: 'zincifre',
    kazanımlar: [
      'Yapısal neden ile karar vericinin sorumluluğunu birbirinden ayırmak',
      'Güç dengesi ve caydırıcılığın hangi koşullarda ters tepebildiğini görmek',
      'Kaçınılmazlık anlatısının geriye dönük bir kurgu olabileceğini fark etmek',
    ],
    adimlar: [
      { id: 'kavram-guc-dengesi', rol: 'Sistem mantığı' },
      { id: 'olay-1914-temmuz-krizi', rol: 'Karar anı' },
      { id: 'olay-birinci-dunya-savasi', rol: 'Sonuç' },
      { id: 'dusunur-clausewitz', rol: 'Savaş çerçevesi' },
      { id: 'kavram-caydiricilik', rol: 'Karşılaştırma' },
      { id: 'tartisma-1914-savas-sorumlulugu', rol: 'Açık soru' },
    ],
  },
  {
    slug: 'fikirler-duzeni-nasil-degistirir',
    no: '04',
    baslik: 'Fikirler düzeni nasıl değiştirir?',
    soru: 'Bir düşünce toplumu mu dönüştürür, yoksa dönüşen toplum kendine yeni düşünceler mi bulur?',
    ozet: 'Farklı coğrafyalardan düşünürleri, meşruiyet ve sekülerleşme sorunları çevresinde konuşturan fikir tarihi rotası.',
    sure: '70 dk',
    seviye: 'Orta',
    vurgu: 'bakir',
    kazanımlar: [
      'Fikirleri ortaya çıktıkları kurum ve krizlerle birlikte okumak',
      'Aynı soruya farklı geleneklerin verdiği cevapları karşılaştırmak',
      'Aydınlanmayı tek çizgili bir ilerleme öyküsü olarak görmemek',
    ],
    adimlar: [
      { id: 'kavram-eksen-cagi', rol: 'Karşılaştırma zemini' },
      { id: 'dusunur-konfucyus', rol: 'Ahlak ve düzen' },
      { id: 'dusunur-ibn-haldun', rol: 'Toplum ve iktidar' },
      { id: 'dusunur-machiavelli', rol: 'Siyasetin özerkliği' },
      { id: 'kavram-sekulerlesme', rol: 'Uzun dönüşüm' },
      { id: 'tartisma-aydinlanmanin-sinirlari', rol: 'Açık soru' },
    ],
  },
  {
    slug: 'bugunku-dunya-nasil-kuruldu',
    no: '05',
    baslik: 'Bugünkü dünya nasıl kuruldu?',
    soru: 'Devletler, sınırlar ve küresel kurumlar bize hangi tarihsel kırılmalardan kaldı?',
    ozet: 'Vestfalya’dan Sovyetler Birliği’nin dağılmasına uzanan altı eşikte modern dünya düzeninin katmanlarını açar.',
    sure: '75 dk',
    seviye: 'Başlangıç',
    vurgu: 'oksit',
    kazanımlar: [
      'Modern dünya düzenini tek bir kuruluş tarihine bağlamamak',
      'Sanayi, imparatorluk ve savaş arasındaki bağı izlemek',
      'Bugünkü kurumların hangi sorunlara cevap olarak doğduğunu açıklamak',
    ],
    adimlar: [
      { id: 'olay-vestfalya-barisi', rol: 'Egemenlik anlatısı' },
      { id: 'olay-sanayi-devrimi', rol: 'Üretim kırılması' },
      { id: 'olay-berlin-konferansi', rol: 'İmparatorluk düzeni' },
      { id: 'olay-birinci-dunya-savasi', rol: 'Sistem krizi' },
      { id: 'olay-bretton-woods', rol: 'Kurumların kuruluşu' },
      { id: 'olay-sovyetler-dagilmasi', rol: 'Yeni dönem' },
    ],
  },
  {
    slug: 'tarihci-gibi-dusunmek',
    no: '06',
    baslik: 'Tarihçi gibi düşünmek',
    soru: 'Bir anlatının ikna edici olması, onun doğru olduğu anlamına gelir mi?',
    ozet: 'Kaynağı sorgulama, anakronizmi fark etme ve rakip açıklamaları tartma becerisi için yöntem rotası.',
    sure: '50 dk',
    seviye: 'Başlangıç',
    vurgu: 'zincifre',
    kazanımlar: [
      'Birincil kaynağı ayrıcalıklı ama yanılmaz olmayan bir tanık olarak okumak',
      'Bugünün kategorilerini geçmişe taşıyan anakronizmleri fark etmek',
      'Tek nedenli ve sonuca kilitli tarih anlatılarına karşı soru üretmek',
    ],
    adimlar: [
      { id: 'kavram-birincil-kaynak', rol: 'Kanıtın başlangıcı' },
      { id: 'kavram-kaynak-elestirisi', rol: 'Sorgulama yöntemi' },
      { id: 'kavram-anakronizm', rol: 'Yaygın hata' },
      { id: 'kavram-donemlendirme', rol: 'Zamanı kurmak' },
      { id: 'kavram-tarih-yazimi', rol: 'Anlatıyı kurmak' },
      { id: 'tartisma-karsi-olgusal-tarih', rol: 'Açık soru' },
    ],
  },
];

export function rotaBul(slug: string) {
  return ROTALAR.find((rota) => rota.slug === slug);
}

export function makaleRotalari(id: string) {
  return ROTALAR.filter((rota) => rota.adimlar.some((adim) => adim.id === id));
}
