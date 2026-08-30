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
  {
    slug: 'toplumlar-neden-coker',
    no: '07',
    baslik: 'Toplumlar neden çöker?',
    soru: 'Bir toplum gerçekten bir anda mı çöker, yoksa yalnızca başka bir düzene mi dönüşür?',
    ozet: 'Rapa Nui’den Roma’ya, çevre baskısı ile siyasal tercihleri ayırır; “çöküş” etiketinin kanıtı açıklamak yerine ne zaman örttüğünü sınar.',
    sure: '70 dk',
    seviye: 'Orta',
    vurgu: 'bakir',
    kazanımlar: [
      'Ani şok, uzun süreli kırılganlık ve siyasal tercihleri birbirinden ayırmak',
      'Çöküş anlatılarında tek nedenli çevre açıklamalarını sınamak',
      'Bir kurumun sonu ile toplumun bütünüyle yok oluşunu aynı şey saymamak',
    ],
    ilkTahmin: 'Bir toplumun çöküşünü açıklarken sence belirleyici olan dış şoklar mı, çevresel sınırlar mı, eşitsizlik mi, yoksa kurumların uyum sağlayamaması mı?',
    kapanisSorusu: 'Rapa Nui, Cahokia, Tunç Çağı, Roma ve COVID-19 örneklerinden en az üçünü karşılaştırarak “çöküş” için çok nedenli bir açıklama kur; sonra bu kelimenin hangi durumda yanıltıcı olduğunu belirt.',
    adimlar: [
      { id: 'aktor-rapa-nui', rol: 'Kurucu yanılgı', soru: 'Ekolojik intihar anlatısı, köle akınları ve sömürge şiddetinin belgeli etkisini neden gölgede bırakır?' },
      { id: 'aktor-cahokia', rol: 'Yazısız kent vakası', soru: 'Bir kentin terk edilmesini yazılı tanıklık olmadan hangi arkeolojik izlerle açıklayabiliriz?' },
      { id: 'olay-covid-19-pandemisi', rol: 'Çağdaş dayanıklılık sınaması', soru: 'Aynı biyolojik şokun toplumlarda farklı sonuç vermesi, kurumların ve eşitsizliğin rolü hakkında ne gösterir?' },
      { id: 'tartisma-tunc-cagi-cokusunun-nedeni', rol: 'Birleşik sistem kırılması', soru: 'Kuraklık, savaş, deprem ve ticaret ağlarının çözülmesi tek tek yetersizse bunlar nasıl bir geri besleme döngüsü kurmuş olabilir?' },
      { id: 'tartisma-romanin-cokus-nedeni', rol: 'Etiketi sorgula', soru: 'Batı Roma’nın siyasal sonuna “çöküş” demek dönüşen kurumları ve devam eden hayatı hangi ölçüde görünmez kılar?' },
      { id: 'tartisma-iklim-ve-cokus', rol: 'Sentez ve nedensellik', soru: 'İklim kaydı ile toplumsal sonuç arasındaki boşluğu doldurmak için hangi ara mekanizmaları kanıtlamamız gerekir?' },
    ],
  },
  {
    slug: 'imparatorluklar-nasil-yonetir',
    no: '08',
    baslik: 'İmparatorluklar nasıl yönetir?',
    soru: 'Çok farklı toplulukları tek bir siyasal düzen içinde tutmak için hangi araçlar kullanılır?',
    ozet: 'Nil’den Japonya’ya uzanan karşılaştırmalarla imparatorluğu yalnız fetih değil; vergi, inanç, aracılar, dolaşım ve gevşek egemenlik üzerinden okur.',
    sure: '75 dk',
    seviye: 'Orta',
    vurgu: 'oksit',
    kazanımlar: [
      'Doğrudan yönetim ile aracılar üzerinden kurulan egemenliği ayırmak',
      'Din, vergi ve hanedan meşruiyetinin farklı bileşimlerini karşılaştırmak',
      'Haritadaki genişlik ile emirlerin gerçek erişimini aynı şey saymamak',
    ],
    ilkTahmin: 'Bir imparatorluğu uzun süre bir arada tutan asıl unsur sence ordu mu, vergi düzeni mi, ortak inanç mı, yerel seçkinlerle pazarlık mı, yoksa ticaret ağları mı?',
    kapanisSorusu: 'Kuş, Fâtımî, Safevî, Majapahit ve Tokugawa örneklerinden en az üçünü karşılaştır; bir imparatorluğun merkezî görünürken gerçekte nasıl katmanlı ve pazarlıklı yönetilebildiğini açıkla.',
    adimlar: [
      { id: 'aktor-kus-kralligi', rol: 'Merkez dışı başlangıç', soru: 'Mısır kaynaklarının gölgesinde anlatılan bir Nil krallığını kendi maddi ve yazılı izleriyle okumak neyi değiştirir?' },
      { id: 'aktor-fatimi-hilafeti', rol: 'Azınlık yönetimi', soru: 'Nüfusun çoğunluğundan farklı bir mezhebe dayanan hanedan, meşruiyetini ve gündelik idaresini hangi ortaklıklarla sürdürebildi?' },
      { id: 'aktor-safevi-devleti', rol: 'İnanç ve ordu dengesi', soru: 'Bir tarikat devlete dönüşürken kendisini iktidara taşıyan askerî tabanı neden yeni kullarla dengelemek zorunda kaldı?' },
      { id: 'aktor-majapahit', rol: 'Harita yanılsaması', soru: 'Bir saray metninde bağlı sayılan bölgelerle vergi ve emirlerin gerçekten ulaştığı alanı nasıl ayırabiliriz?' },
      { id: 'aktor-tokugawa-sogunlugu', rol: 'Dolaylı denetim', soru: 'Taşra beylerini yerinde bırakıp ailelerini ve hareketlerini denetlemek merkezî gücü nasıl ucuza genişletir?' },
      { id: 'tartisma-mogol-etkisi', rol: 'Bilanço ve sentez', soru: 'Moğol yönetiminin yıkımı ile kıtalararası dolaşımı aynı bilançoda tartmak için hangi sonuçları, zamanları ve bölgeleri ayırmalıyız?' },
    ],
  },
  {
    slug: 'kanit-ne-zaman-ikna-eder',
    no: '09',
    baslik: 'Kanıt ne zaman ikna eder?',
    soru: 'Bir kaynak çok eski, ayrıntılı ya da sayısal olduğu için kendiliğinden güvenilir olur mu?',
    ozet: 'Konuşma metninden intihar istatistiğine, sözlü gelenekten dönemlendirmeye uzanır; farklı kanıt türlerinin neyi gösterebildiğini ve nerede sustuğunu öğretir.',
    sure: '65 dk',
    seviye: 'Başlangıç',
    vurgu: 'zincifre',
    kazanımlar: [
      'Kaynağın yakınlığı ile güvenilirliğini birbirine karıştırmamak',
      'Metin, sayı, sözlü gelenek ve karşılaştırmalı veri için ayrı kontrol soruları kurmak',
      'Bir iddianın kanıttan daha geniş olduğu noktayı fark etmek',
    ],
    ilkTahmin: 'Geçmiş hakkında bir iddiaya güvenmek için kaynağın yaşı, yazarı, sayısal görünmesi, başka kaynaklarla uyuşması ve nasıl üretildiği arasında nasıl bir öncelik kurarsın?',
    kapanisSorusu: 'Metin, istatistik, sözlü gelenek ve karşılaştırmalı dönemlendirme için ayrı ayrı kullanacağın kanıt kontrol listesini oluştur; her türün güçlü olduğu ve yanıltabildiği bir noktayı belirt.',
    adimlar: [
      { id: 'dusunur-thukydides', rol: 'Metnin içindeki uyarı', soru: 'Bir tarihçinin konuşmaları kendisinin kurduğunu açıklaması, metni değersiz mi kılar yoksa nasıl okunacağını mı öğretir?' },
      { id: 'dusunur-durkheim', rol: 'Sayının üretimi', soru: 'İntihar oranlarındaki düzenlilik toplumsal bir nedeni gösterebilir; peki kayıt biçimi ve ekolojik yanılgı bu sonucu nasıl sınırlar?' },
      { id: 'tartisma-sozlu-gelenek-kaynak-mi', rol: 'Aktarım zinciri', soru: 'Kuşaktan kuşağa aktarılan bir anlatının değişmesi onu kullanılamaz mı yapar, yoksa değişimin kendisi de kanıt olabilir mi?' },
      { id: 'tartisma-tarihsel-sayilar-nasil-okunur', rol: 'Kesinlik yanılsaması', soru: 'Tek bir tarihsel sayı yerine aralık vermek hangi belirsizlikleri görünür kılar ve hangi kararları hâlâ çözmez?' },
      { id: 'kavram-eksen-cagi', rol: 'Karşılaştırmalı önerme', soru: 'Farklı coğrafyalardaki düşünsel değişimleri aynı döneme toplamak gerçek bir örüntü mü kurar, yoksa seçilmiş örnekleri mi büyütür?' },
      { id: 'tartisma-eksen-cagi-gercek-mi', rol: 'Hipotezi sınayan sentez', soru: 'Bir dönemlendirme iddiasını yanlışlanabilir kılmak için tarih aralığı, bölge listesi ve ölçütler ne kadar kesin tanımlanmalıdır?' },
    ],
  },
  {
    slug: 'kitleler-ne-zaman-duzen-kurar',
    no: '10',
    baslik: 'Kitleler ne zaman düzen kurar?',
    soru: 'Bir rejimi devirmek neden yeni ve kalıcı bir siyasal düzen kurmaktan daha kolaydır?',
    ozet: 'Ulusal birlikten devrime ve devlet çözülmesine uzanan vakalarla kitlesel seferberliğin koalisyon, kurum ve anlatı olmadan neden kalıcılaşamadığını inceler.',
    sure: '70 dk',
    seviye: 'Orta',
    vurgu: 'bakir',
    kazanımlar: [
      'Birleşme, devrim, rejim değişimi ve devlet çözülmesini birbirinden ayırmak',
      'Ortak düşmana karşı kurulan koalisyonların zaferden sonra neden bölündüğünü açıklamak',
      'Milliyetçi anlatı ile kurumsal kapasitenin farklı rollerini tartmak',
    ],
    ilkTahmin: 'Bir rejimi deviren kalabalığın yeni bir düzen kurabilmesi için sence ortak öfke dışında hangi kurumlara, anlatılara, liderlik biçimlerine ve uzlaşmalara ihtiyacı vardır?',
    kapanisSorusu: 'İtalyan birliği, Meksika Devrimi, Sovyetlerin dağılması ve Arap Baharı’nı karşılaştır; seferberliğin hangi koşullarda devlet kurduğunu, hangi koşullarda parçalanma ürettiğini açıkla.',
    adimlar: [
      { id: 'olay-italyan-birligi', rol: 'Rakip gelecekler', soru: 'Aynı birlik hedefini savunan cumhuriyetçi, papalıkçı ve monarşik projelerden birinin kazanmasını hangi güç ilişkileri açıkladı?' },
      { id: 'olay-meksika-devrimi', rol: 'Zaferden sonra bölünme', soru: 'Aynı diktatörlüğü deviren hareketlerin sonrasında birbirleriyle savaşması ortak düşmanın neden yeterli olmadığını nasıl gösterir?' },
      { id: 'dusunur-arendt', rol: 'Kitle ve sorumluluk', soru: 'İnsanların düşünmeden kurallara uyması, büyük siyasal şiddeti yalnız kötü niyetli liderlerle açıklamayı neden yetersiz bırakır?' },
      { id: 'olay-sovyetler-dagilmasi', rol: 'İmza ile çözülme', soru: 'Birliği koruma yönündeki halkoyuna rağmen devletin aylar içinde dağılması, kurumlarla siyasal seçkinler arasındaki hangi kopuşu gösterir?' },
      { id: 'olay-arap-bahari', rol: 'Aynı dalga, farklı sonuç', soru: 'Benzer taleplerle başlayan ayaklanmaların demokrasi, restorasyon ve iç savaşa ayrılmasını hangi kurumsal farklar açıklar?' },
      { id: 'tartisma-milliyetcilik-ne-zaman', rol: 'Anlatı ve sentez', soru: 'Milleti eski bir topluluk gibi anlatmak yeni devlet kurmayı nasıl kolaylaştırır ve bu anlatı hangi grupları dışarıda bırakabilir?' },
    ],
  },
];

export function rotaBul(slug: string) {
  return ROTALAR.find((rota) => rota.slug === slug);
}

export function makaleRotalari(id: string) {
  return ROTALAR.filter((rota) => rota.adimlar.some((adim) => adim.id === id));
}
