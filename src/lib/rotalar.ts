export type RotaAdimi = {
  id: string;
  rol: string;
  soru: string;
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
  ilkTahmin: string;
  kapanisSorusu: string;
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
    ozet: 'Bir buyruğun korkudan fazlasına nasıl dönüştüğünü; gelenek, kurum, temsil ve uluslararası yetki üzerinden sınayan temel rota.',
    sure: '55 dk',
    seviye: 'Başlangıç',
    vurgu: 'bakir',
    kazanımlar: [
      'Zor kullanma ile meşru otorite arasındaki farkı açıklamak',
      'Meşruiyetin farklı toplumlarda aynı biçimi almadığını karşılaştırmak',
      'Bir kurumun kâğıt üzerindeki yetkisi ile gerçek etki alanını ayırmak',
    ],
    ilkTahmin: 'Bir yönetimi ayakta tutan asıl güç sence nedir: korku, çıkar, alışkanlık, kurumlar yoksa insanların haklı bulduğu bir gerekçe mi?',
    kapanisSorusu: 'Zor kullanabilen bir yönetim ile kalıcı otorite kurabilen bir yönetim arasındaki farkı, en az üç mekanizmayı birbirine bağlayarak açıkla.',
    adimlar: [
      { id: 'aktor-avam-kamarasi', rol: 'Somut başlangıç', soru: 'Bir meclisin gücü binadan, gelenekten, yasadan ve seçmenden hangisine dayanır?' },
      { id: 'kavram-goksel-yetki', rol: 'Karşılaştırmalı kavram', soru: 'Bir hükümdarın yönetme hakkını davranışına bağlamak, itaati nasıl koşullu hâle getirir?' },
      { id: 'dusunur-weber', rol: 'Açıklama çerçevesi', soru: 'Weber tarihsel çeşitliliği hangi otorite tipleriyle sadeleştiriyor; bu sadeleştirme neyi görünür kılıyor?' },
      { id: 'kavram-ideal-tip', rol: 'Yöntem aracı', soru: 'Gerçekte saf biçimde bulunmayan bir model, karmaşık bir kurumu anlamaya nasıl yardım edebilir?' },
      { id: 'aktor-bm-guvenlik-konseyi', rol: 'Kurumsal sınama', soru: 'Bir kurumun hukuki yetkisi ile üyelerinin güç dağılımı çatıştığında hangisi belirleyici olur?' },
      { id: 'tartisma-imparatorluk-siniri-nasil-cizilir', rol: 'Aktarım ve açık soru', soru: 'Bir devletin gerçek sınırı haritadaki çizgi mi, vergi ve emirlerinin ulaşabildiği yer mi?' },
    ],
  },
  {
    slug: 'zenginlik-neden-birikir',
    no: '02',
    baslik: 'Zenginlik neden bazı yerlerde birikir?',
    soru: 'Sanayileşme bir buluşlar dizisi miydi, yoksa küresel bir güç ilişkisinin sonucu mu?',
    ozet: 'Şirket, kölelik, sanayi ve sermaye birikimini aynı dünya ekonomisinin birbirine bağlı parçaları olarak okuyan rota.',
    sure: '60 dk',
    seviye: 'Orta',
    vurgu: 'oksit',
    kazanımlar: [
      'Sanayileşmeyi teknolojiye indirgemeyen çok nedenli bir açıklama kurmak',
      'Zenginliğin üretimi ile zor ve mülksüzleştirme arasındaki bağı tartmak',
      'Avrupa merkezli ilerleme anlatısının varsayımlarını sınamak',
    ],
    ilkTahmin: 'Sanayi Devrimi’nin Britanya’da başlamasını tek bir nedenle açıklamak zorunda olsan hangi nedeni seçerdin?',
    kapanisSorusu: 'Britanya’nın sanayileşmesini teknoloji, kurum, emek, enerji ve küresel güç ilişkilerinden en az üçünü bağlayarak açıkla; sonra açıklamanın sınırını belirt.',
    adimlar: [
      { id: 'aktor-hollanda-doguhindistan-sirketi', rol: 'Somut başlangıç', soru: 'Ticaret yapan bir şirket hangi koşullarda vergi toplayan, savaşan ve yöneten bir güce dönüşür?' },
      { id: 'olay-atlantik-kole-ticareti', rol: 'Zorun görünmeyen maliyeti', soru: 'Atlantik ekonomisinin büyümesini yalnız pazar ve yenilik diliyle anlatmak hangi emeği görünmez kılar?' },
      { id: 'olay-sanayi-devrimi', rol: 'Üretim kırılması', soru: 'Bu dönüşüm bir dizi icattan hangi noktada toplumsal bir sisteme dönüştü?' },
      { id: 'kavram-ilkel-birikim', rol: 'Tartışmalı mekanizma', soru: 'Yeni üretim ilişkilerinin başlangıcında tasarruftan çok mülksüzleştirme olduğunu söylemek açıklamayı nasıl değiştirir?' },
      { id: 'dusunur-marx', rol: 'Kuramsal çerçeve', soru: 'Marx zenginleşme sürecinde üretkenlikle birlikte hangi çatışmayı merkeze alıyor?' },
      { id: 'tartisma-sanayi-devrimi-neden-ingiltere', rol: 'Sentez ve açık soru', soru: 'Hangi açıklama tek başına yetersiz; hangi açıklamalar birlikte daha güçlü?' },
    ],
  },
  {
    slug: 'savas-nasil-kacinilmaz-olur',
    no: '03',
    baslik: 'Barış neden kırılganlaşır?',
    soru: 'Güvenlik için kurulan ittifaklar ve hazırlıklar hangi koşullarda karşılıklı korkuyu büyütür?',
    ozet: 'Kırım Savaşı’ndan Soğuk Savaş’a uzanan örneklerle ittifak, seferberlik ve güvenlik ikilemini çözümleyen rota.',
    sure: '65 dk',
    seviye: 'Orta',
    vurgu: 'zincifre',
    kazanımlar: [
      'Yapısal neden ile karar vericinin sorumluluğunu birbirinden ayırmak',
      'Güç dengesi ve caydırıcılığın hangi koşullarda ters tepebildiğini görmek',
      'Savaş sonrasında kurulan düzenlerin bir sonraki çatışmaya nasıl zemin hazırlayabildiğini görmek',
    ],
    ilkTahmin: 'Bir ülke kendini daha güvende yapmak için silahlandığında komşusu neden daha güvensiz hissedebilir?',
    kapanisSorusu: 'İttifak, seferberlik ve güç dengesi güvenlik üretmek yerine hangi mekanizmalarla çatışmayı hızlandırabilir? En az iki tarihsel örneği bağla.',
    adimlar: [
      { id: 'olay-kirim-savasi', rol: 'Somut başlangıç', soru: 'Yerel görünen bir anlaşmazlık hangi bağlar yüzünden büyük güç savaşına dönüştü?' },
      { id: 'kavram-seferberlik', rol: 'Geri sayım mekanizması', soru: 'Hazırlık için atılan askerî bir adım neden karşı tarafa saldırı işareti gibi görünebilir?' },
      { id: 'aktor-varsova-pakti', rol: 'Kurumsal sınama', soru: 'Savunma ittifakı üyelerini korurken onların hareket alanını da nasıl sınırladı?' },
      { id: 'olay-uzay-yarisi', rol: 'Savaş eşiğinin altı', soru: 'Askerî rekabet doğrudan savaşa dönüşmeden bilim, prestij ve teknoloji yarışına nasıl taşındı?' },
      { id: 'olay-berlin-duvarinin-yikilisi', rol: 'Beklenmedik kırılma', soru: 'Katı görünen bir güvenlik düzeni hangi küçük kararlar ve kitlesel davranışlarla hızla çözülebilir?' },
      { id: 'tartisma-soguk-savasin-baslangici', rol: 'Sorumluluk muhakemesi', soru: 'Karşılıklı korkuyu açıklamak, tarafların kararlarındaki sorumluluğu ortadan kaldırır mı?' },
    ],
  },
  {
    slug: 'fikirler-duzeni-nasil-degistirir',
    no: '04',
    baslik: 'Fikirler düzeni nasıl değiştirir?',
    soru: 'Bir düşünce toplumu mu dönüştürür, yoksa dönüşen toplum kendine yeni düşünceler mi bulur?',
    ozet: 'Hak, temsil ve özgürlük fikirlerinin kurumlara nasıl çevrildiğini; vaatleri kadar dışarıda bıraktıkları üzerinden de okuyan rota.',
    sure: '70 dk',
    seviye: 'Orta',
    vurgu: 'bakir',
    kazanımlar: [
      'Fikirleri ortaya çıktıkları kurum ve krizlerle birlikte okumak',
      'Aynı geleneğin içindeki özgürlük ve dışlama gerilimlerini karşılaştırmak',
      'Aydınlanmayı tek çizgili bir ilerleme öyküsü olarak görmemek',
    ],
    ilkTahmin: 'Yeni bir fikir toplumu kendi başına değiştirebilir mi, yoksa ancak toplum zaten değişirken mi etkili olur?',
    kapanisSorusu: 'Bir fikrin tarihsel etkisini değerlendirirken düşünürün metni, kurumlar, taşıyıcı gruplar ve krizler arasında nasıl bir bağ kurmalıyız?',
    adimlar: [
      { id: 'dusunur-locke', rol: 'Somut başlangıç', soru: 'Rıza ve doğal haklar savunusu, kölelik ve sömürge bağlamıyla birlikte okununca nasıl değişir?' },
      { id: 'dusunur-montesquieu', rol: 'Kurumsal çeviri', soru: 'İktidarı bölmek özgürlüğü nasıl koruyabilir ve bu model hangi toplumsal varsayımlara dayanır?' },
      { id: 'dusunur-bentham', rol: 'Rakip ölçüt', soru: 'Bir kararın doğruluğunu toplam yararla ölçmek bireysel hakları hangi durumda tehlikeye atar?' },
      { id: 'dusunur-mill', rol: 'Özgürlüğün sınırı', soru: 'Zarar ilkesi çoğunluğun baskısını gerçekten sınırlamaya yeter mi?' },
      { id: 'dusunur-foucault', rol: 'İçeriden eleştiri', soru: 'Özgürleştirici görünen kurumlar insanları aynı anda nasıl sınıflandırıp disipline edebilir?' },
      { id: 'tartisma-aydinlanmanin-sinirlari', rol: 'Sentez ve itiraz', soru: 'Evrensel akıl iddiası hangi tarihsel deneyimleri dışarıda bıraktı?' },
    ],
  },
  {
    slug: 'bugunku-dunya-nasil-kuruldu',
    no: '05',
    baslik: 'Bugünkü dünya hangi krizlerden çıktı?',
    soru: '1929’dan 1991’e uzanan krizler, kurumları ve siyasal seçenekleri nasıl yeniden kurdu?',
    ozet: 'Bunalım, devrim, kalkınma, bağlantısızlık ve blokların çözülmesi üzerinden bugünkü düzenin yakın tarihini açar.',
    sure: '75 dk',
    seviye: 'Başlangıç',
    vurgu: 'oksit',
    kazanımlar: [
      'Bugünkü dünya düzenini tek bir kuruluş tarihine bağlamamak',
      'Ekonomik kriz, ideolojik seferberlik ve uluslararası kurumlar arasındaki bağı izlemek',
      'Bugünkü kurumların hangi sorunlara cevap olarak doğduğunu açıklamak',
    ],
    ilkTahmin: 'Bugünkü dünyayı en çok hangi yirminci yüzyıl krizi biçimlendirdi: ekonomik bunalım, devrim, Soğuk Savaş ya da blokların çöküşü?',
    kapanisSorusu: 'Bugünkü dünya düzenini tek bir zafere bağlamadan; kriz, kalkınma, devrim ve uluslararası kurumların üst üste binen tarihini anlat.',
    adimlar: [
      { id: 'olay-buyuk-buhran', rol: 'Sistem krizi', soru: 'Bir finans çöküşü hangi kanallarla işsizliğe, siyasal kutuplaşmaya ve devlet müdahalesine dönüştü?' },
      { id: 'aktor-imf', rol: 'Kurumsal cevap', soru: 'Krizleri sınırlamak için kurulan bir kurum, borç alan devletlerin karar alanını nasıl etkiler?' },
      { id: 'olay-kultur-devrimi', rol: 'Toplumsal seferberlik', soru: 'Bir lider kurumsal rakiplerini aşmak için gençliği ve ideolojiyi nasıl siyasal güce çevirebilir?' },
      { id: 'aktor-baglantisizlar-hareketi', rol: 'İki blok dışındaki dünya', soru: 'Bağlantısızlık tarafsızlık mıydı, yoksa yeni devletlerin hareket alanı kurma stratejisi mi?' },
      { id: 'olay-iran-devrimi-1979', rol: 'Beklenmedik devrim', soru: 'Modernleşme, eşitsizlik, din ve dış müdahale aynı devrimci koalisyonda nasıl birleşti?' },
      { id: 'tartisma-kalkinma-neden-basarisiz', rol: 'Sentez ve açık soru', soru: 'Kalkınma farklarını kurum, tarih ve küresel güç ilişkilerinden yalnız biriyle açıklamak neden yetersiz kalır?' },
    ],
  },
  {
    slug: 'tarihci-gibi-dusunmek',
    no: '06',
    baslik: 'Tarihçi gibi düşünmek',
    soru: 'Bir anlatının ikna edici olması, onun doğru olduğu anlamına gelir mi?',
    ozet: 'Tek bir tarihsel vaka üzerinde kaynağı, ölçeği, anlatıyı ve gerçekleşmemiş ihtimalleri ayrı ayrı sınayan yöntem rotası.',
    sure: '50 dk',
    seviye: 'Başlangıç',
    vurgu: 'zincifre',
    kazanımlar: [
      'Bir olayı, seçilmiş olgular ile kurulmuş bir anlatı olarak okumak',
      'Bugünün kategorilerini geçmişe taşıyan anakronizmleri fark etmek',
      'Tek nedenli ve sonuca kilitli tarih anlatılarına karşı soru üretmek',
    ],
    ilkTahmin: 'Bir tarih anlatısına güvenmek için hangi üç sorunun cevabını bilmen gerekir?',
    kapanisSorusu: 'İkna edici bir tarih anlatısını güvenilir bir açıklamadan ayırmak için kullanacağın kişisel kontrol listesini oluştur.',
    adimlar: [
      { id: 'olay-1857-hint-ayaklanmasi', rol: 'Ortak vaka', soru: 'Aynı olayın “isyan”, “ayaklanma” ya da “bağımsızlık savaşı” diye adlandırılması açıklamayı nasıl yönlendirir?' },
      { id: 'kavram-olay-tarihi', rol: 'İlk ölçek', soru: 'Gün gün olay dizmek nedenselliği ne zaman görünür kılar, ne zaman daha yavaş yapıları saklar?' },
      { id: 'dusunur-carr', rol: 'Olgu ve seçim', soru: 'Tarihçinin seçimi olmadan “yalnızca olguların konuşması” neden mümkün değildir?' },
      { id: 'dusunur-braudel', rol: 'Ölçeği değiştir', soru: 'Aynı olayı gündelik kararlar, toplumsal yapılar ve uzun süre açısından ayrı ayrı okumak neyi değiştirir?' },
      { id: 'kavram-anakronizm', rol: 'Yaygın hata', soru: 'Bugünün kavramlarını geçmişe taşımak hangi görünmez yanlış sonuçları üretir?' },
      { id: 'tartisma-karsi-olgusal-tarih', rol: 'Yöntemi sınayan açık soru', soru: 'Gerçekleşmemiş bir ihtimali düşünmek nedenselliği sınar mı, yoksa kanıttan uzaklaştırır mı?' },
    ],
  },
];

export function rotaBul(slug: string) {
  return ROTALAR.find((rota) => rota.slug === slug);
}

export function makaleRotalari(id: string) {
  return ROTALAR.filter((rota) => rota.adimlar.some((adim) => adim.id === id));
}
