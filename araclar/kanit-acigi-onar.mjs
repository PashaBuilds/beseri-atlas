#!/usr/bin/env node
// KAPI 13 kanit aciklarini yalniz editoryal olarak okunmus eslemelerle kapatir.
//
// Bu arac bir "birincil kaynak ekle" genelleyicisi degildir. Her satirda:
// - kaynagin hangi makaleye neden ait oldugu,
// - govdede hangi mevcut cumleyi destekledigi,
// - kor-hakem matrisinde destegin gucu
// tek tek belirlenir. Eslesme tekil degilse veya matris cumlesi bulunamazsa
// arac hicbir dosyayi degistirmeden durur.
//
// Kuru prova: node araclar/kanit-acigi-onar.mjs
// Uygulama:   node araclar/kanit-acigi-onar.mjs --uygula

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { KOK, makaleleriTopla } from './ortak.mjs';
import { govdeHash, suankiCommit } from './denetle.mjs';
import { MATRIS_DIZINI, cumleSadelestir, sayaclariHesapla } from './matris.mjs';

const UYGULA = process.argv.includes('--uygula');
const BUGUN = '2026-08-30';

const KAYNAKLAR = {
  morgan: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'Lewis Henry Morgan — Ancient Society (1877), Project Gutenberg tam metni',
    url: 'https://www.gutenberg.org/files/45950/45950-h/45950-h.htm',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'the lineage in the female line',
    not: 'Akrabalik terminolojisinin tarihsel birincil metni; Morgan\'in tek-cizgili evrim semasi bugun kabul edilmez. Kunyeye, savlarini evrensel olgu diye degil kavram tarihini ve soy yonu ayrimini gostermek icin alindi.',
  },
  harappa: {
    tur: 'birincil', birincil_tur: 'kazi',
    ad: 'M. S. Vats — Excavations at Harappa (1940), Internet Archive tam kazi raporu',
    url: 'https://archive.org/details/in.ernet.dli.2015.210462',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Excavations At Harappa',
    not: 'Maddi buluntunun baglam, tabaka ve katalog kaydiyla kanita donusmesine somut ornek; yazar Vats Madho Sarup.',
  },
  weber_org: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'Max Weber — The Theory of Social and Economic Organization (1947 Parsons cevirisi), tam metin',
    url: 'https://archive.org/download/dli.ernet.233771/233771-The%20Theory%20%20Of%20%20Social%20And%20Economic%20Organization_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Three Pure Types of Legitimate Authority',
    not: 'Mesru otorite tipleri, patrimonyal otorite ve burokratik yonetim kesimlerini tasiyan metin. Bu Ingilizce ceviri Almanca aslin kendisi degildir.',
  },
  islahat1856: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'World History Commons — Ottoman Decree, 1856 (İngilizce çeviri; Jina Reader metin aynası)',
    url: 'https://r.jina.ai/https://worldhistorycommons.org/ottoman-decree-1856',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Ottoman Decree, 1856',
    not: 'Fermanın modern İngilizce çevirisinin metin aynası; eşit tebaa güvencesini gösterir. Osmanlıca asıl değildir ve vaadin uygulandığını tek başına kanıtlamaz.',
  },
  renan: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'Ernest Renan — Qu\'est-ce qu\'une nation? (1882), Wikisource tam metni',
    url: 'https://fr.wikisource.org/wiki/Qu%E2%80%99est-ce_qu%E2%80%99une_nation_%3F',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'un plébiscite de tous les jours',
    not: '11 Mart 1882 Sorbonne konferansinin 1882 Calmann Levy basimi; ulusu irade ve ortak hafiza uzerinden kuran belirli bir tarihsel konumdur, kavramin butun tanimi degildir.',
  },
  smith: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'Adam Smith — An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Project Gutenberg',
    url: 'https://www.gutenberg.org/cache/epub/3300/pg3300.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'OF THE ORIGIN AND USE OF MONEY',
    not: 'Kamu mali tam metin; para ve vergilendirme bolumleri icin donem kaynagi. Smith\'in kurami tarihsel olgularin tek aciklamasi sayilmaz.',
  },
  coen: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'H. T. Colenbrander (der.) — Jan Pietersz. Coen: Bescheiden omtrent zijn bedrijf in Indie, cilt 1 (1919)',
    url: 'https://archive.org/download/janpieterszcoenb01coen/janpieterszcoenb01coen_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'COLENBRANDER',
    not: 'Coen\'in VOC yonetimine mektuplarini derler; silah, tekel ve ticaretin ayni kurumsal yapida birlesmesine failin kendi kaydidir, tarafsiz bir anlatim degildir.',
  },
  un1514: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'BM Genel Kurulu 1514 (XV) — Somurge Ulkelerine ve Halklarina Bagimsizlik Bildirisi (1960)',
    url: 'https://en.wikisource.org/wiki/Declaration_on_the_Granting_of_Independence_to_Colonial_Countries_and_Peoples',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Declaration on the Granting of Independence',
    not: '14 Aralik 1960 tarihli karar metninin Ingilizce asli; hukuki-siyasi bagimsizlik talebini gosterir, ekonomik ve toplumsal somurgesizlesmenin tamamlandigini kanitlamaz.',
  },
  gregorius: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'Papa XIII. Gregorius — Inter gravissimas (1582), Latince tam metin',
    url: 'https://la.wikisource.org/wiki/Inter_Gravissimas',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'kalendarium emendatum',
    not: 'Gregoryen takvim reformunu emreden papalik fermani; reformun kurumsal yetki islemini dogrudan, farkli toplumlarda benimsenmesini ise yalniz dolayli gosterir.',
  },
  mukaddime: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'Ibn Haldun — Mukaddime, Arapca tam metin',
    url: 'https://ar.wikisource.org/wiki/%D9%85%D9%82%D8%AF%D9%85%D8%A9_%D8%A7%D8%A8%D9%86_%D8%AE%D9%84%D8%AF%D9%88%D9%86',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'مقدمة ابن خلدون',
    not: 'Umran kavraminin kaynak metni; modern Turkce karsiliklar metnin kavram alanini tam olarak tuketmez.',
  },
  orhon: {
    tur: 'birincil', birincil_tur: 'kitabe',
    ad: 'The Orkhon Inscriptions — Thomsen okumasindan E. D. Ross cevirisi (1930)',
    url: 'https://archive.org/details/orkhoninscriptions',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Orkhon',
    not: 'Yazitlarin Ingilizce cevirisi ve nesri; yazinin dil, siyasal hitap ve dayanikli malzeme uzerindeki kullanimina birincil ornek. Taslarin kendisi degil bilimsel nesirdir.',
  },
  londra1913: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'Londra Antlasmasi — Balkan devletleri ile Osmanli Devleti arasindaki baris metni (1913)',
    url: 'https://en.wikisource.org/wiki/Treaty_of_London_%281913%29',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'all the territories of his Empire on the continent of Europe to the west of a line drawn from Enos',
    not: '17/30 Mayis 1913 tarihli antlasma metni; savasin ilk safhasini kapatan toprak devrini dogrudan gosterir, antlasmanin sahadaki uygulamasini tek basina kanitlamaz.',
  },
  krey: {
    tur: 'birincil', birincil_tur: 'tanik',
    ad: 'August C. Krey (der. ve cev.) — The First Crusade: Accounts of Eye-Witnesses and Participants (1921)',
    url: 'https://r.jina.ai/http://archive.org/download/firstcrusadeacco00kreyuoft/firstcrusadeacco00kreyuoft_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Council of Clermont',
    not: 'Clermont konusmasinin birbiriyle ayni olmayan aktarimlarini ve katilimci anlatilarini birlikte verir; derleme olaydan yüzyillar sonra basilmistir, tanikliklarin kendisi de taraflidir.',
  },
  baladhuri: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'el-Belazuri — The Origins of the Islamic State / Futuh al-Buldan (1916 Hitti cevirisi)',
    url: 'https://archive.org/download/originsofislamic01bald/originsofislamic01bald_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'THE BATTLE OF AL-YARMUK',
    not: 'Dokuzuncu yuzyilda derlenen fetih rivayetlerinin Ingilizce cevirisi; yedinci yuzyilin cagdas tutanagi degil, aktarim zincirleri ve sonraki hukuki ilgilerle bicimlenmis bir kaynak.',
  },
  doukas: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'Doukas — Decline and Fall of Byzantium to the Ottoman Turks (Magoulias cevirisi), tam metin',
    url: 'https://archive.org/download/doukas_decline_fall_byzantium_to_ottoman_turks/doukas_decline_fall_byzantium_to_ottoman_turks_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'The Fall of Constantinople',
    not: 'On besinci yuzyil Bizans kronigi; fethi kaybeden dunyanin bakisindan anlatir. Cagdas kaynaktir ama kusatmanin her anina gorgu tanikligi sayilamaz.',
  },
  clive: {
    tur: 'birincil', birincil_tur: 'tanik',
    ad: 'Robert Clive — The Battle of Plassey (1757), Newcastle Dukuna mektup',
    url: 'https://sourcebooks.web.fordham.edu/mod/1757plassey.asp',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'the placing of Meer Jaffier on the throne',
    not: 'Muharebeden kisa sure sonra kazanan komutanin kendi raporu; yonetici degisimini dogrudan kaydeder, kuvvet ve basari anlatiminda tarafsiz degildir.',
  },
  schuyler: {
    tur: 'birincil', birincil_tur: 'tanik',
    ad: 'Eugene Schuyler — Turkistan: Notes of a Journey in Russian Turkistan, Khokand, Bukhara, and Kuldja (1876), cilt 1',
    url: 'https://archive.org/download/turkistannotesof01schu/turkistannotesof01schu_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'RUSSIAN TURKISTAN',
    not: '1873 yolculugunun ABD diplomati tarafindan yazilmis tanikligi; Rus idaresinin izin verdigi hareket alaniyla ve yazarin somurgeci donem diliyle sinirlidir.',
  },
  gulhane: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'Gulhane Hatt-i Humayunu (3 Kasim 1839) — donemin Fransizca diplomatik dolasim metni',
    url: 'https://en.wikisource.org/wiki/The_European_Concert_in_the_Eastern_Question/Appendix_1',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Tanzimat',
    not: 'Fermanin donem cevirisi; ilan edilen can, mal, vergi ve askerlik guvencelerini dogrudan, uygulanma derecesini ise yalnizca dolayli gosterir. Osmanlica asil degildir.',
  },
  abbasid_coin: {
    tur: 'birincil', birincil_tur: 'nesne',
    ad: 'Danimarka Ulusal Muzesi — el-Mansur dirhemi, MS 768-769 (KMM 275102)',
    url: 'https://samlinger.natmus.dk/kmm/object/275102',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'al-Mansur',
    not: 'Resmi muze kaydi dirhemi el-Mansur, MS 768-769 ve Madinat al-Salam ile baglar; sikkenin dolasim hacmini veya ekonominin butununu tek basina gostermez.',
  },
  ibn_battuta: {
    tur: 'birincil', birincil_tur: 'tanik',
    ad: 'Ibn Battuta — The Travels of Ibn Batuta, Samuel Lee cevirisi (1829)',
    url: 'https://archive.org/details/b28406084',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Ibn Batuta',
    not: 'On dorduncu yuzyil Avrasya agina ve Altin Orda sahasina disaridan gelen gezginin tanikligi; kendi gozlemi ile kendisine anlatilanlari her zaman kesin ayirmaz.',
  },
  baburname: {
    tur: 'birincil', birincil_tur: 'tanik',
    ad: 'Babur — The Babur-nama in English, A. S. Beveridge cevirisi (Project Gutenberg)',
    url: 'https://www.gutenberg.org/cache/epub/44608/pg44608.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Shaibaq Khan',
    not: 'Maveraunnehir mucadelesinin yenilen tarafinin kendi anisi; Seybani Han ve Cagatay mirasina dogrudan erisim verir, rakibin bakisini temsil etmez.',
  },
  ibn_khaldun_berber: {
    tur: 'birincil', birincil_tur: 'eser',
    ad: 'Ibn Haldun — Histoire des Berberes et des dynasties musulmanes de l\'Afrique septentrionale, cilt 1',
    url: 'https://archive.org/download/histoiredesberbe01ibnk/histoiredesberbe01ibnk_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Ibn Khaldoun',
    not: 'Kitab el-Iber\'in on dokuzuncu yuzyil Fransizca cevirisi; Murabit ve Muvahhid donemlerinden sonra yazilmis tarihsel birincil eserdir, cagdas tutanak degildir.',
  },
  ottoman_land: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'The Ottoman Land Code — 1858 Arazi Kanunnamesinin 1892 Ingilizce cevirisi',
    url: 'https://archive.org/download/32882019066664-theottomanlandc/HighRes_32882019066664_djvu.txt',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Land in Turkey is divided into five classes',
    not: 'Kanunun 1. ve 3. maddeleri toprak siniflarini ve timar-zeamet mirasini kendi adlariyla kaydeder; on dokuzuncu yuzyil metni klasik donemin fiili uygulamasini tek basina kanitlamaz.',
  },
  sogd_letters: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'Sogdian Ancient Letters 1, 2, 3 ve 5 — Nicholas Sims-Williams cevirisi',
    url: 'https://depts.washington.edu/silkroad/texts/sogdlet.html',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'The Sogdian Ancient Letters',
    not: 'MS 313/314 dolaylarina tarihlenen mektuplarin uzman cevirisi; aile, ticaret ve diaspora agina dogrudan erisim verir. Ozgun elyazmasi degil ceviridir.',
  },
  sokoto_wathiqa: {
    tur: 'birincil', birincil_tur: 'belge',
    ad: 'Osman dan Fodio — Wathiqa ila Ahl al-Sudan / Declaration of Independence (1806 dolayi), Ingilizce ceviri',
    url: 'https://siiasi.org/digital-archive/shaykh-uthman-ibn-fuduye/the-declaration-of-independence/',
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: 'Wathiqa Ila Ahl as-Sudan',
    not: 'Kurucu hareketin normatif programini tasiyan metnin modern Ingilizce cevirisi; tarihlendirme ve ceviri editorun aciklamasina dayanir, uygulamanin tarafsiz kaydi degildir.',
  },
};

// `govde` tam olarak govdede bulunan bir parcadir; ona yeni dipnot eklenir.
// `matris` ayni iddianin matris cumlesinde bulunan daha sade bir parcadir.
const ESLEMELER = [
  { id: 'kavram-akrabalik', kaynak: 'morgan', govde: 'Birinci ayrım soyun hangi yoldan sayıldığıdır.[^k1]', matris: 'Birinci ayrım soyun hangi yoldan sayıldığıdır', destek: 'kismi' },
  { id: 'kavram-arkeolojik-kanit', kaynak: 'harappa', govde: 'anlatıyı sınayan bağımsız kanıt ürettiğini gösterir.[^k1]', matris: 'Bu örnekler arkeolojinin', destek: 'dogrudan' },
  { id: 'kavram-burokrasi', kaynak: 'weber_org', govde: 'Kavramı tanımlayan yazar altı ölçüt sayar.[^k1]', matris: 'Kavramı tanımlayan yazar altı ölçüt sayar', destek: 'dogrudan' },
  { id: 'kavram-mesruiyet', kaynak: 'weber_org', govde: 'Weber’in üçlü sınıflandırması, kabulün kaynağını ayırır.[^k1]', matris: 'Weber’in üçlü sınıflandırması', destek: 'dogrudan' },
  { id: 'kavram-millet-sistemi', kaynak: 'islahat1856', govde: 'güvence dilini genişletti.', matris: 'On dokuzuncu yüzyıldaki reformlar', destek: 'dogrudan' },
  { id: 'kavram-milliyetcilik', kaynak: 'renan', govde: 'gizler.[^k1]', matris: 'Bu üç kelimeyi eş anlamlı kullanmak', destek: 'kismi' },
  { id: 'kavram-para', kaynak: 'smith', govde: 'Bir nesne değişim aracı, hesap birimi, değer saklama aracı ve ertelenmiş ödeme ölçüsü\nişlevlerinin hepsini aynı anda taşımayabilir.[^k1]', matris: 'Bir nesne değişim aracı', destek: 'kismi' },
  { id: 'kavram-patrimonyalizm', kaynak: 'weber_org', govde: 'Kavramı bugünkü biçimiyle tanımlayan yazar, onu bir ideal tip olarak\nkurdu.[^k2]', matris: 'Kavramı bugünkü biçimiyle tanımlayan yazar', destek: 'dogrudan' },
  { id: 'kavram-silahli-ticaret', kaynak: 'coen', govde: 'birleştiren şirketlerdir.[^k3]', matris: 'Düzeneğin olgun hâli', destek: 'dogrudan' },
  { id: 'kavram-somurgesizlesme', kaynak: 'un1514', govde: 'Sömürgesizleşme bayrak, anayasa veya uluslararası tanınmayla görünür bir tarih\nkazanır; fakat sömürge ilişkisinin bütün katmanları aynı gün sona ermez.[^k1]', matris: 'Sömürgesizleşme bayrak', destek: 'kismi' },
  { id: 'kavram-takvim', kaynak: 'gregorius', govde: 'Takvim koymak bir yetki işlemidir.[^k1]', matris: 'Takvim koymak bir yetki işlemidir', destek: 'dogrudan' },
  { id: 'kavram-ulus-devlet', kaynak: 'renan', govde: 'iddia da taşır.[^k1][^k3]', matris: 'Ulus-devlet, siyasal sınırlar', destek: 'kismi' },
  { id: 'kavram-umran', kaynak: 'mukaddime', govde: 'anlamaktır.[^k1]', matris: 'İbn Haldûn’un düşüncesinde umran', destek: 'dogrudan' },
  { id: 'kavram-vergi', kaynak: 'smith', govde: 'ödeme zamanı ve yükün sonunda kimin üzerinde kaldığı ayrı sorulardır.[^k1]', matris: 'Vergiyi anlamak için oranı bilmek yetmez', destek: 'kismi' },
  { id: 'kavram-yazi-sistemi', kaynak: 'orhon', govde: 'Bir yazının biçimi, o yazının taşındığı\nmalzemeden ayrı düşünülemez.[^k3]', matris: 'Bir yazının biçimi', destek: 'dogrudan' },
  { id: 'olay-balkan-savaslari', kaynak: 'londra1913', govde: 'büyük güçlere bırakıldı.[^k1]', matris: 'Mayıs 1913 Londra Antlaşması', destek: 'dogrudan' },
  { id: 'olay-hacli-seferleri', kaynak: 'krey', govde: 'adamlarından ve halktan oluşan büyük bir kalabalığa hitap ederek onları Haçlı\nseferine katılmaya çağırdı (27 Kasım 1095).[^k1]', matris: 'Papa II. Urbanus', destek: 'dogrudan' },
  { id: 'olay-islam-fetihleri', kaynak: 'baladhuri', govde: "Bizans'ın ağır yenilgisiyle\nsonuçlandı.[^k1]", matris: 'Yermük Muharebesi', destek: 'kismi' },
  { id: 'olay-istanbulun-fethi', kaynak: 'doukas', govde: '1453 bu devletin başkent\nve hanedan egemenliğinin sonudur.[^k3]', matris: 'Bizans kendisini', destek: 'dogrudan' },
  { id: 'olay-plassey-1757', kaynak: 'clive', govde: 'Şirket kazandı ve eyaletin yönetimi fiilen el değiştirdi.', matris: 'Şirket kazandı', destek: 'dogrudan' },
  { id: 'olay-rus-turkistan-fethi', kaynak: 'schuyler', govde: 'girdi.[^k1] Süreç tek bir savaşla değil, adım adım ilerledi.', matris: 'On dokuzuncu yüzyılın ortasından', destek: 'kismi' },
  { id: 'olay-tanzimat-fermani', kaynak: 'gulhane', govde: "1839'da ilan edilen Gülhane Hatt-ı Hümâyunu can, ırz ve mal güvenliğini; verginin\ndüzene bağlanmasını; askerlik süresinin belirlenmesini ve yargılama olmadan ceza\nverilmemesini birbiriyle ilişkili vaatler olarak sundu.[^k1]", matris: '1839’da ilan edilen Gülhane', destek: 'dogrudan' },
  { id: 'aktor-abbasi-hilafeti', kaynak: 'abbasid_coin', govde: "Mansûr 762'de Bağdat'ı dairesel planlı yeni başkent olarak kurdu.[^k1]", matris: 'Mansûr 762’de', destek: 'kismi' },
  { id: 'aktor-altin-orda', kaynak: 'ibn_battuta', govde: 'Altın Orda’nın yönetici hanedanı Cengizliydi; yönettiği bozkır ve kent nüfusunun\nbüyük bölümü Kıpçak Türkçesi konuşan ve farklı dinî gelenekler taşıyan\ntopluluklardan oluşuyordu.[^k1][^k4]', matris: 'Altın Orda’nın yönetici', destek: 'kismi' },
  { id: 'aktor-buhara-hanligi', kaynak: 'schuyler', govde: 'Rus himayesi altında emirlik adı ve iç kurumların bir bölümü sürerken dış politika\nile ekonomik karar alanı daraldı.[^k4]', matris: 'Rus himayesi altında', destek: 'dogrudan' },
  { id: 'aktor-cagatay-hanligi', kaynak: 'baburname', govde: 'Çağatay ulusu, Cengiz Han soyuna dayanan hükümdarlık iddiasını korurken\nMâverâünnehir’in şehirli, tarımsal ve İslamî kurumlarıyla birlikte yaşamak\nzorundaydı.[^k1][^k2]', matris: 'Çağatay ulusu', destek: 'kismi' },
  { id: 'aktor-hive-hanligi', kaynak: 'schuyler', govde: 'Hanlık, on dokuzuncu yüzyılın ikinci yarısında kuzeydeki devletin\nhimayesine girdi.[^k4]', matris: 'Hanlık, on dokuzuncu', destek: 'dogrudan' },
  { id: 'aktor-hokand-hanligi', kaynak: 'schuyler', govde: 'Rus İmparatorluğu Hîve ve Buhara’da hanedanı sınırlı yetkiyle korurken Hokand’ı\ndoğrudan kaldırdı.', matris: 'Rus İmparatorluğu Hîve', destek: 'kismi' },
  { id: 'aktor-karluklar', kaynak: 'orhon', govde: 'Aynı bozkır geleneğinden çıkan komşu düzenler uzun yazıtlar\nbırakmıştır.', matris: 'Aynı bozkır geleneğinden', destek: 'dogrudan' },
  { id: 'aktor-kirgizlar', kaynak: 'orhon', govde: 'Kullanılan yazı, aynı bozkır geleneğinin yazı sistemidir.[^k1]', matris: 'Kullanılan yazı', destek: 'kismi' },
  { id: 'aktor-murabitlar', kaynak: 'ibn_khaldun_berber', govde: 'Murabıt gücü, Sahra’nın güneyindeki ticaret yolları ile Mağrip kentlerini aynı\nsiyasal ağda buluşturdu; Endülüs’e geçiş bu ağı Cebelitarık’ın ötesine taşıdı.[^k1][^k2]', matris: 'Murabıt gücü', destek: 'kismi' },
  { id: 'aktor-muvahhidler', kaynak: 'ibn_khaldun_berber', govde: 'Muvahhid hareketinin Murabıtları dinî tutarlılık üzerinden eleştirmesi, iktidara\ngeldikten sonra aynı iddianın kurumlara nasıl çevrildiği sorusunu açar.[^k1][^k2]', matris: 'Muvahhid hareketinin', destek: 'kismi' },
  { id: 'aktor-osmanli-imparatorlugu', kaynak: 'ottoman_land', govde: "Devletin klasik dönemdeki taşıyıcı kurumu tımardır. Halil İnalcık'ın tanımıyla\ntımar, Osmanlılarda devlete ait toprakların askerî ve idari gayelerle tahsisine\ndayalı sistemdir.[^k2]", matris: 'Sistemin idari karşılığı', destek: 'kismi' },
  { id: 'aktor-seybaniler', kaynak: 'baburname', govde: 'Bağlantının en ayrıntılı kaydı, güneye çekilen kişinin kendi anılarındadır.[^k3]', matris: 'Bağlantının en ayrıntılı kaydı', destek: 'dogrudan' },
  { id: 'aktor-sogdlular', kaynak: 'sogd_letters', govde: 'MS 313–314 dolaylarına tarihlenen Soğd mektupları, uzak ticaret ağının aile hayatı,\nborç, terk edilme ve savaş haberiyle nasıl iç içe geçtiğini doğrudan gösterir.', matris: 'Topluluğun kendi mektupları', destek: 'dogrudan' },
  { id: 'aktor-sokoto-hilafeti', kaynak: 'sokoto_wathiqa', govde: 'Osman dan Fodio ve çevresinin yazıları dinî yenilenme, adalet ve meşru yönetim\niddialarını açık biçimde kaydeder.[^k1][^k2]', matris: 'Osman dan Fodio', destek: 'dogrudan' },
];

const SINIRLAR = new Map([
  ['kavram-haracguzarlik', 'Haraçgüzarlık, farklı devletlerin vergi, armağan ve tâbilik kayıtlarını tek karşılaştırmalı başlıkta toplar; bu modern analitik kategoriyi bütün dönemler için tanımlayan tek bir çağdaş belge yoktur. Dosya bu nedenle ikincil senteze dayanır ve her örneğin özgün kaydı aktör dosyasında sınanmalıdır.'],
  ['kavram-imparatorluk', 'İmparatorluk, çok farklı dönem ve dillerdeki yönetimleri karşılaştıran modern bir üst kategoridir; bütün örneklerin kendini aynı adla tanımladığı tek bir birincil metin yoktur. Dosya tipolojiyi ikincil sentezle kurar, tarihsel uygulamalar ilgili aktör ve belge dosyalarındaki birincil kayıtlarla sınanır.'],
  ['kavram-tasavvuf', 'Tasavvuf yüzyıllara, bölgelere ve farklı metin türlerine yayılan bir gelenektir; tek bir müellifin eseri bütün kavramı temsil edemez. Bu genel dosya imzalı uzmanlık sentezine dayanır; belirli öğreti ve pratiklerin birincil metinleri düşünür ve kaynak dosyalarında ayrı ayrı okunmalıdır.'],
  ['kavram-veraset', 'Veraset karşılaştırmalı bir hukuk ve iktidar kategorisidir; hanedanların yazılı kuralı, teamülü ve fiilî geçişi aynı değildir ve bütün biçimleri doğrulayan tek bir birincil belge bulunmaz. Dosya genel tipolojiyi ikincil kaynaklarla kurar; her tarihsel geçiş ilgili aktör veya olay dosyasındaki belgeyle sınanmalıdır.'],
  ['olay-malazgirt', 'Malazgirt hakkında çağdaş Bizans anlatıları ile daha geç İslam tarihleri aynı ayrıntıları ve sayıları vermez; açık erişimde güvenle satır satır doğrulanabilen Türkçe bir çağdaş metin bu dosyanın kaynak setinde yoktur. Bu nedenle asker sayıları ve konuşmalar ikincil sentezden aktarılır, kesin tanıklık gibi sunulmaz.'],
  ['olay-talas-savasi', 'Talas Savaşı hakkında ayrıntılı anlatılar olaydan sonra derlenen Arapça ve Çince tarihlere dayanır; açık erişimde satır satır doğrulanmış çağdaş bir savaş tutanağı bu dosyanın kaynak setinde yoktur. Karlukların rolü, savaşın ölçeği ve kâğıt aktarımı bu yüzden kesin tanıklık değil kaynaklar arası yorum olarak okunmalıdır.'],
]);

function yeniAnahtar(kaynaklar) {
  const sayilar = kaynaklar.map((k) => Number(String(k.anahtar || '').slice(1))).filter(Number.isFinite);
  return `k${Math.max(0, ...sayilar) + 1}`;
}

function kaynakBlogu(kaynak) {
  const metin = YAML.stringify({ kaynaklar: [kaynak] }, { lineWidth: 100 });
  return metin.replace(/^kaynaklar:\n/, '').trimEnd();
}

function tekGecis(metin, parca, etiket) {
  const n = metin.split(parca).length - 1;
  if (n !== 1) throw new Error(`${etiket}: eslesme ${n} kez bulundu`);
}

const harita = new Map(makaleleriTopla().map((m) => [m.fm.id, m]));
const rapor = { uygulandi: UYGULA, kaynak: [], sinir: [], zaten: [], sorunlar: [] };

for (const e of ESLEMELER) {
  try {
    const m = harita.get(e.id);
    if (!m) throw new Error('makale bulunamadi');
    const tanim = KAYNAKLAR[e.kaynak];
    if (!tanim) throw new Error(`kaynak tanimi yok: ${e.kaynak}`);
    if ((m.fm.kaynaklar || []).some((k) => k.url === tanim.url)) {
      rapor.zaten.push({ id: e.id, tur: 'kaynak', url: tanim.url });
      continue;
    }
    if (m.fm.kaynak_siniri) throw new Error('makalede zaten kaynak_siniri var; kaynak ile sinir birlikte eklenmez');
    tekGecis(m.govde, e.govde, `${e.id} govde`);

    const anahtar = yeniAnahtar(m.fm.kaynaklar || []);
    const kaynak = { anahtar, ...tanim };
    const yeniFm = m.hamFm.replace('\nson_denetim:', `\n${kaynakBlogu(kaynak)}\nson_denetim:`);
    const yeniGovde = m.govde.replace(e.govde, `${e.govde}[^${anahtar}]`);

    const matrisYolu = path.join(MATRIS_DIZINI, `${e.id}-matris.json`);
    let matris = null;
    if (fs.existsSync(matrisYolu)) {
      matris = JSON.parse(fs.readFileSync(matrisYolu, 'utf8'));
      const matrisParca = cumleSadelestir(e.matris);
      const adaylar = (matris.iddialar || []).filter((i) => cumleSadelestir(i.cumle).includes(matrisParca));
      if (adaylar.length !== 1) throw new Error(`matris iddiasi ${adaylar.length} kez bulundu`);
      if ((adaylar[0].kaynaklar || []).some((k) => k.anahtar === anahtar)) throw new Error('matriste kaynak zaten var');
      adaylar[0].kaynaklar.push({ anahtar, destek: e.destek });
      adaylar[0].inceleme = `${adaylar[0].inceleme ? `${adaylar[0].inceleme} ` : ''}2026-08-30 kaynak hiyerarsisi gecisi: ${tanim.not}`;
      matris.sayaclar = sayaclariHesapla(matris.iddialar);
      matris.govde_hash = govdeHash(yeniGovde);
      matris.commit = suankiCommit();
      (matris.tazeleme ||= []).push({
        zaman: BUGUN,
        gerekce: `${anahtar} birincil kaniti insan tarafindan okunmus mevcut iddiaya ${e.destek} destekle baglandi`,
      });
    }

    rapor.kaynak.push({ id: e.id, anahtar, url: kaynak.url, destek: e.destek });
    if (UYGULA) {
      fs.writeFileSync(m.yol, m.ham.replace(m.hamFm, yeniFm).replace(m.govde, yeniGovde));
      if (matris) fs.writeFileSync(matrisYolu, `${JSON.stringify(matris, null, 2)}\n`);
    }
  } catch (hata) {
    rapor.sorunlar.push({ id: e.id, hata: hata.message });
  }
}

for (const [id, sinir] of SINIRLAR) {
  try {
    const m = harita.get(id);
    if (!m) throw new Error('makale bulunamadi');
    if (m.fm.kaynak_siniri) {
      rapor.zaten.push({ id, tur: 'sinir' });
      continue;
    }
    if ((m.fm.kaynaklar || []).some((k) => k.tur === 'birincil')) throw new Error('birincil kaynak zaten var');
    const yeniFm = m.hamFm.replace('\nson_denetim:', `\nkaynak_siniri: >-\n  ${sinir}\nson_denetim:`);
    rapor.sinir.push({ id, sinir });
    if (UYGULA) fs.writeFileSync(m.yol, m.ham.replace(m.hamFm, yeniFm));
  } catch (hata) {
    rapor.sorunlar.push({ id, hata: hata.message });
  }
}

const raporYolu = path.join(KOK, 'denetim', 'kanit-acigi-onarim.json');
fs.writeFileSync(raporYolu, `${JSON.stringify(rapor, null, 2)}\n`);
console.log(`kanit acigi onarimi: ${rapor.kaynak.length} birincil kaynak · ${rapor.sinir.length} acik sinir · ${rapor.zaten.length} zaten tamam · ${rapor.sorunlar.length} sorun · ${UYGULA ? 'uygulandi' : 'kuru prova'}`);
for (const s of rapor.sorunlar) console.log(`SORUN ${s.id}: ${s.hata}`);
process.exit(rapor.sorunlar.length ? 1 : 0);
