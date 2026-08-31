#!/usr/bin/env node
// KAPI 13'teki fazla Wikipedia kunyelerini konuya ozgu daha guclu
// kaynaklarla degistirir. Ana konu icin bir tek giris kapisi korunur;
// karsilastirma ve baglam kaynaklari ders kitabi, uzmanlik yayini ya da
// birincil metne yukseltilebilir.
//
// Liste otomatik uretilmez: her URL karsiligi editoryal olarak secilmistir.
// Kuru prova: node araclar/giris-kapisi-yukselt.mjs
// Uygulama:   node araclar/giris-kapisi-yukselt.mjs --uygula

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { KOK, ICERIK, makaleleriTopla, yamlOku } from './ortak.mjs';
import { govdeHash, suankiCommit } from './denetle.mjs';
import { MATRIS_DIZINI, sayaclariHesapla } from './matris.mjs';

const UYGULA = process.argv.includes('--uygula');
const BUGUN = '2026-08-30';

function openstax(cilt, sayfa, baslik, dize) {
  return {
    tur: 'ders',
    ad: `OpenStax — World History Volume ${cilt}, ${baslik}`,
    url: `https://openstax.org/books/world-history-volume-${cilt}/pages/${sayfa}`,
    erisim_tarihi: BUGUN,
    dogrulama_dizesi: dize || baslik,
    not: 'Rice University tarafindan acik lisansla yayimlanan, yazar ve hakem kurulu acik universite ders kitabi; onceki genel Wikipedia baglam kaynaginin yerine kullanildi.',
  };
}

function birincil(ad, url, dize, birincil_tur = 'belge', not = '') {
  return { tur: 'birincil', birincil_tur, ad, url, erisim_tarihi: BUGUN,
    dogrulama_dizesi: dize, not };
}

function akademik(ad, url, dize, not = '') {
  return { tur: 'akademik', ad, url, erisim_tarihi: BUGUN,
    dogrulama_dizesi: dize, not };
}

const YUKSELTMELER = new Map([
  ['https://en.wikipedia.org/wiki/Cold_War', openstax(2, '14-1-the-cold-war-begins', '14.1 The Cold War Begins', 'The Cold War Begins')],
  ['https://en.wikipedia.org/wiki/Fernand_Braudel', akademik('Fernand Braudel — Histoire et Sciences sociales: La longue durée, Annales ESC 13/4 (1958)', 'https://www.persee.fr/doc/ahess_0395-2649_1958_num_13_4_2781', 'La longue durée', 'Braudel\'in kendi yöntem makalesinin Persée tam metni; biyografik ayrıntıların değil longue durée yaklaşımının birincil kavramsal kaynağıdır.')],
  ['https://en.wikipedia.org/wiki/Roman_Empire', openstax(1, '7-introduction', 'Ch. 7 Introduction', 'Roman Empire')],
  ['https://en.wikipedia.org/wiki/Byzantine_Empire', openstax(1, '10-2-the-byzantine-empire-and-persia', '10.2 The Byzantine Empire and Persia', 'The Byzantine Empire and Persia')],
  ['https://en.wikipedia.org/wiki/Bretton_Woods_system', birincil('The Bretton Woods Agreements — Avalon Project, Yale Law School', 'https://avalon.law.yale.edu/20th_century/decad047.asp', 'Articles of Agreement of the International Monetary Fund, July 22, 1944', 'belge', 'Konferansin kapanis gununde kabul edilen IMF ve IBRD anlasmalarinin metni; sonraki uygulamayi tek basina gostermez.')],
  ['https://en.wikipedia.org/wiki/International_Monetary_Fund', birincil('Articles of Agreement of the International Monetary Fund — UN Treaty Series transkripsiyonu', 'https://en.wikisource.org/wiki/United_Nations_Treaty_Series/Volume_2/1/20', 'To promote international monetary co-operation', 'belge', 'Fonun amac, uyelik ve yetki cercevesini kuran metin; kurumun sonraki performansinin tarafsiz degerlendirmesi degildir.')],
  ['https://en.wikipedia.org/wiki/Qing_dynasty', openstax(2, '6-2-the-rise-of-a-global-economy', '6.2 The Rise of a Global Economy', 'Qing')],
  ['https://en.wikipedia.org/wiki/Indian_Rebellion_of_1857', birincil('Queen Victoria — Proclamation to the Princes, Chiefs, and People of India (1858)', 'https://en.wikisource.org/wiki/Proclamation_by_the_Queen_in_Council,_to_the_princes,_chiefs,_and_people_of_India', 'We hereby announce to the native princes of India', 'belge', '1857 ayaklanmasindan sonra Dogu Hindistan Sirketi yonetiminin taca devrini ilan eden galip devlet belgesi; ayaklananlarin bakisini temsil etmez.')],
  ['https://en.wikipedia.org/wiki/Achaemenid_Empire', openstax(1, '4-3-the-persian-empire', '4.3 The Persian Empire', 'The Persian Empire')],
  ['https://en.wikipedia.org/wiki/Sasanian_Empire', openstax(1, '10-2-the-byzantine-empire-and-persia', '10.2 The Byzantine Empire and Persia', 'Sasanian Empire')],
  ['https://en.wikipedia.org/wiki/Mali_Empire', openstax(1, '15-2-medieval-sub-saharan-africa', '15.2 Medieval Sub-Saharan Africa', 'Mali Empire')],
  ['https://en.wikipedia.org/wiki/Max_Weber', akademik('Stanford Encyclopedia of Philosophy — Max Weber', 'https://plato.stanford.edu/entries/weber/', 'Max Weber', 'Hakemli uzmanlik maddesi; Weber\'in kavramlarini tarihsel ve elestirel baglamina yerlestirir.')],
  ['https://en.wikipedia.org/wiki/Congress_of_Vienna', openstax(2, '7-4-nationalism-liberalism-conservatism-and-the-political-order', '7.4 Nationalism, Liberalism, Conservatism, and the Political Order', 'Congress of Vienna')],
  ['https://en.wikipedia.org/wiki/Song_dynasty', openstax(1, '14-1-song-china-and-the-steppe-peoples', '14.1 Song China and the Steppe Peoples', 'Song China')],
  ['https://en.wikipedia.org/wiki/Thirty_Years%27_War', openstax(2, '5-1-the-protestant-reformation', '5.1 The Protestant Reformation', 'Thirty Years')],
  ['https://en.wikipedia.org/wiki/United_States', openstax(2, '7-3-revolutions-america-france-and-haiti', '7.3 Revolutions: America, France, and Haiti', 'United States')],
  ['https://en.wikipedia.org/wiki/Maurya_Empire', openstax(1, '5-4-vedic-india-to-the-fall-of-the-maurya-empire', '5.4 Vedic India to the Fall of the Maurya Empire', 'Maurya Empire')],
  ['https://en.wikipedia.org/wiki/Interwar_period', openstax(2, '12-1-recovering-from-world-war-i', '12.1 Recovering from World War I', 'Recovering from World War I')],
  ['https://en.wikipedia.org/wiki/Peace_of_Westphalia', birincil('Treaty of Westphalia — Avalon Project, Yale Law School', 'https://avalon.law.yale.edu/17th_century/westphal.asp', 'Treaty of Westphalia', 'belge', '1648 antlasma metninin Ingilizce cevirisi; sonraki egemenlik mitlerini kendiliginden dogrulamaz.')],
  ['https://en.wikipedia.org/wiki/Reformation', openstax(2, '5-1-the-protestant-reformation', '5.1 The Protestant Reformation', 'The Protestant Reformation')],
  ['https://en.wikipedia.org/wiki/Tang_dynasty', openstax(1, '12-3-border-states-sogdiana-korea-and-japan', '12.3 Border States: Sogdiana, Korea, and Japan', 'Tang dynasty')],
  ['https://en.wikipedia.org/wiki/Thucydides', birincil('Thukydides — History of the Peloponnesian War, Richard Crawley cevirisi', 'https://www.gutenberg.org/cache/epub/7142/pg7142.txt', 'make the speakers say what was in my opinion demanded of them', 'eser', 'Kamu mali Ingilizce ceviri; yazarin yontem beyanini ve anlatim tercihlerini dogrudan verir.')],
  ['https://en.wikipedia.org/wiki/Periodization', openstax(2, '1-3-causation-and-interpretation-in-history', '1.3 Causation and Interpretation in History', '1.3 Causation and Interpretation in History')],
  ['https://en.wikipedia.org/wiki/Carl_von_Clausewitz', birincil('Carl von Clausewitz — On War, Project Gutenberg tam metni', 'https://www.gutenberg.org/ebooks/1946', 'ON WAR', 'eser', 'Dusunurun kendi eseri; kavramlarin sonraki askeri kullanimlarini tek basina temsil etmez.')],
  ['https://en.wikipedia.org/wiki/Immanuel_Wallerstein', akademik('University of California Press — Immanuel Wallerstein, The Modern World-System I', 'https://www.ucpress.edu/books/the-modern-world-system-i/epub-pdf', 'The Modern World-System I', 'Yayincinin eser, yazar, baski ve kapsam sayfasi; kitap telifli oldugu icin tam metin kaniti sayilmaz.')],
  ['https://en.wikipedia.org/wiki/First_Turkic_Khaganate', birincil('The Orkhon Inscriptions — Thomsen okumasindan E. D. Ross cevirisi (1930)', 'https://archive.org/details/orkhoninscriptions', 'Orkhon', 'kitabe', 'Kaganligin siyasal hitabina kendi yazitlari uzerinden erisim verir; modern Ingilizce nesirdir.')],
  ['https://en.wikipedia.org/wiki/M%C4%81ori_people', akademik('Petchey vd. — A new chronology for the Māori settlement of Aotearoa, PNAS', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9674228/', 'A new chronology for the Māori settlement of Aotearoa', 'Hakemli acik erisim calisma 1.558 radyokarbon tarihini yeniden modeller; kronolojinin arkeolojik kanit sinirlarini aciklar.')],
  ['https://en.wikipedia.org/wiki/Russian_Empire', openstax(2, '11-5-the-war-ends', '11.5 The War Ends', 'tsarist')],
  ['https://en.wikipedia.org/wiki/Vietnam_War', openstax(2, '14-4-global-tensions-and-decolonization', '14.4 Global Tensions and Decolonization', 'Vietnam')],
  ['https://en.wikipedia.org/wiki/Berlin_Conference', openstax(2, '9-3-colonial-empires', '9.3 Colonial Empires', 'Berlin Conference')],
  ['https://en.wikipedia.org/wiki/Treaty_of_Versailles', birincil('Treaty of Versailles, 28 June 1919 — Avalon Project', 'https://avalon.law.yale.edu/imt/parti.asp', 'The Versailles Treaty June 28, 1919', 'belge', 'Antlasmanin Ingilizce metni; uygulanmasi ve toplumsal etkileri icin ikincil calisma gerekir.')],
  ['https://en.wikipedia.org/wiki/Soviet_Union', openstax(2, '12-2-the-formation-of-the-soviet-union', '12.2 The Formation of the Soviet Union', 'Soviet Union')],
  ['https://en.wikipedia.org/wiki/Cultural_Revolution', openstax(2, '14-5-a-new-world-order', '14.5 A New World Order', 'Cultural Revolution')],
  ['https://en.wikipedia.org/wiki/Neolithic_Revolution', openstax(1, '2-3-the-neolithic-revolution', '2.3 The Neolithic Revolution', 'Neolithic Revolution')],
  ['https://en.wikipedia.org/wiki/Han_dynasty', openstax(1, '5-1-ancient-china', '5.1 Ancient China', 'Han dynasty')],
  ['https://en.wikipedia.org/wiki/Roman_Republic', openstax(1, '6-4-the-roman-republic', '6.4 The Roman Republic', 'Roman Republic')],
  ['https://en.wikipedia.org/wiki/Punic_Wars', openstax(1, '6-4-the-roman-republic', '6.4 The Roman Republic', 'Punic Wars')],
  ['https://en.wikipedia.org/wiki/French_Revolution', openstax(2, '7-3-revolutions-america-france-and-haiti', '7.3 Revolutions: America, France, and Haiti', 'French Revolution')],
  ['https://en.wikipedia.org/wiki/American_Revolution', openstax(2, '7-3-revolutions-america-france-and-haiti', '7.3 Revolutions: America, France, and Haiti', 'American Revolution')],
  ['https://en.wikipedia.org/wiki/Neo-Assyrian_Empire', openstax(1, '4-1-from-old-babylon-to-the-medes', '4.1 From Old Babylon to the Medes', 'Neo-Assyrian')],
  ['https://en.wikipedia.org/wiki/Austria-Hungary', openstax(2, '11-2-the-collapse-of-the-ottomans-and-the-coming-of-war', '11.2 The Collapse of the Ottomans and the Coming of War', 'Austria-Hungary')],
  ['https://en.wikipedia.org/wiki/United_Nations', birincil('Charter of the United Nations — United Nations', 'https://www.un.org/en/about-us/un-charter/full-text', 'WE THE PEOPLES OF THE UNITED NATIONS', 'belge', 'Kurucu antlasmanin BM tarafindan yayimlanan tam metni; kurumun fiili etkisini tek basina olcmez.')],
  ['https://en.wikipedia.org/wiki/History_of_the_People%27s_Republic_of_China', openstax(2, '14-2-the-spread-of-communism', '14.2 The Spread of Communism', 'People’s Republic of China')],
  ['https://en.wikipedia.org/wiki/Timurid_Empire', openstax(1, '17-1-the-ottomans-and-the-mongols', '17.1 The Ottomans and the Mongols', 'Timur')],
  ['https://en.wikipedia.org/wiki/World_Trade_Organization', birincil('Marrakesh Agreement Establishing the World Trade Organization — WTO', 'https://www.wto.org/english/docs_e/legal_e/04-wto_e.htm', 'AGREEMENT ESTABLISHING THE WORLD TRADE ORGANIZATION', 'belge', 'Orgutun kapsam ve islevini kuran resmi anlasma metni; ticaretin dagilimsal etkisini tek basina gostermez.')],
  ['https://en.wikipedia.org/wiki/Mamluk_Sultanate', openstax(1, '17-2-from-the-mamluks-to-ming-china', '17.2 From the Mamluks to Ming China', 'Mamluk')],
  ['https://en.wikipedia.org/wiki/Joseon', openstax(2, '2-3-exchange-in-east-asia', '2.3 Exchange in East Asia', 'Joseon')],
  ['https://en.wikipedia.org/wiki/Ming_dynasty', openstax(1, '17-2-from-the-mamluks-to-ming-china', '17.2 From the Mamluks to Ming China', 'Ming China')],
  ['https://en.wikipedia.org/wiki/New_Kingdom_of_Egypt', openstax(1, '4-2-egypts-new-kingdom', '4.2 Egypt’s New Kingdom', 'New Kingdom')],
  ['https://en.wikipedia.org/wiki/Migration_Period', openstax(1, '10-1-the-eastward-shift', '10.1 The Eastward Shift', 'Germanic')],
  ['https://en.wikipedia.org/wiki/Columbian_exchange', openstax(2, '5-2-crossing-the-atlantic', '5.2 Crossing the Atlantic', 'Columbian Exchange')],
  ['https://en.wikipedia.org/wiki/Black_Death', openstax(1, '16-3-the-black-death-from-east-to-west', '16.3 The Black Death from East to West', 'Black Death')],
  ['https://en.wikipedia.org/wiki/Aztec_Empire', openstax(1, '8-3-the-age-of-empires-in-the-americas', '8.3 The Age of Empires in the Americas', 'Aztec')],
  ['https://en.wikipedia.org/wiki/Hittites', openstax(1, '4-1-from-old-babylon-to-the-medes', '4.1 From Old Babylon to the Medes', 'Hittite')],
  ['https://en.wikipedia.org/wiki/Taiping_Rebellion', openstax(2, '9-1-the-second-industrial-revolution', '9.1 The Second Industrial Revolution', 'Taiping Rebellion')],
  ['https://en.wikipedia.org/wiki/October_Revolution', openstax(2, '11-5-the-war-ends', '11.5 The War Ends', 'October Revolution')],
  ['https://en.wikipedia.org/wiki/Majapahit', openstax(2, '2-2-the-malacca-sultanate', '2.2 The Malacca Sultanate', 'Majapahit')],
  ['https://en.wikipedia.org/wiki/Ottoman_Empire', openstax(2, '4-2-the-ottoman-empire', '4.2 The Ottoman Empire', 'Ottoman Empire')],
  ['https://en.wikipedia.org/wiki/Alfred_Thayer_Mahan', birincil('Alfred Thayer Mahan — The Influence of Sea Power upon History, Project Gutenberg', 'https://www.gutenberg.org/ebooks/13529', 'The Influence of Sea Power Upon History', 'eser', 'Dusunurun temel eserinin kamu mali tam metni; sonraki jeopolitik etkisini tek basina kanitlamaz.')],
  ['https://en.wikipedia.org/wiki/Halford_Mackinder', birincil('Halford Mackinder — The Geographical Pivot of History, tam metin', 'https://archive.org/details/the-geographical-pivot-of-history-by-halford-john-mackinder', 'The Geographical Pivot of History', 'eser', '1904 tarihli metin; Mackinder\'in sonraki goruslerinin tamami degildir.')],
  ['https://en.wikipedia.org/wiki/Sima_Qian', birincil('Sima Qian — Les Mémoires historiques, Chavannes cevirisi', 'https://archive.org/details/SimaQianChavannesMemoiresHistoriquesV6', 'memoires', 'eser', 'Shiji\'nin kamu mali Fransizca cevirisi; Cince ozgun metnin kendisi degildir.')],
  ['https://en.wikipedia.org/wiki/Anachronism', openstax(2, '1-3-causation-and-interpretation-in-history', '1.3 Causation and Interpretation in History', 'interpretation')],
  ['https://en.wikipedia.org/wiki/Balance_of_power_(international_relations)', openstax(2, '7-4-nationalism-liberalism-conservatism-and-the-political-order', '7.4 Nationalism, Liberalism, Conservatism, and the Political Order', 'balance of power')],
  ['https://en.wikipedia.org/wiki/Goryeo', openstax(1, '12-3-border-states-sogdiana-korea-and-japan', '12.3 Border States: Sogdiana, Korea, and Japan', 'Goryeo')],
  ['https://en.wikipedia.org/wiki/Decolonization', openstax(2, '14-4-global-tensions-and-decolonization', '14.4 Global Tensions and Decolonization', 'Decolonization')],
  ['https://en.wikipedia.org/wiki/Herodotus', birincil('Herodotos — The Histories, Book 1, Perseus Digital Library', 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126', 'Herodotus, The Histories', 'eser', 'Kamu mali Ingilizce ceviri; yazarin anlatimini verir, sonraki tarih yazimi etkisini tek basina olcmez.')],
  ['https://en.wikipedia.org/wiki/Srivijaya', openstax(2, '2-2-the-malacca-sultanate', '2.2 The Malacca Sultanate', 'Srivijaya')],
  ['https://en.wikipedia.org/wiki/Unification_of_Italy', openstax(2, '7-4-nationalism-liberalism-conservatism-and-the-political-order', '7.4 Nationalism, Liberalism, Conservatism, and the Political Order', 'Italian unification')],
  ['https://en.wikipedia.org/wiki/Alexis_de_Tocqueville', birincil('Alexis de Tocqueville — Democracy in America, Project Gutenberg', 'https://www.gutenberg.org/ebooks/815', 'Democracy in America', 'eser', 'Dusunurun kendi eseri; Amerika gozlemlerinin temsil siniri korunmalidir.')],
  ['https://en.wikipedia.org/wiki/Decolonisation_of_Africa', openstax(2, '14-4-global-tensions-and-decolonization', '14.4 Global Tensions and Decolonization', 'African colonies')],
  ['https://en.wikipedia.org/wiki/Silk_Road', openstax(1, '12-2-east-west-interactions-in-the-early-middle-ages', '12.2 East-West Interactions in the Early Middle Ages', 'Silk Roads')],
  ['https://en.wikipedia.org/wiki/Nationalism', openstax(2, '7-4-nationalism-liberalism-conservatism-and-the-political-order', '7.4 Nationalism, Liberalism, Conservatism, and the Political Order', 'Nationalism')],
  ['https://en.wikipedia.org/wiki/Historiography', openstax(2, '1-3-causation-and-interpretation-in-history', '1.3 Causation and Interpretation in History', '1.3 Causation and Interpretation in History')],
  ['https://en.wikipedia.org/wiki/Historiography_of_the_fall_of_the_Western_Roman_Empire', openstax(1, '10-1-the-eastward-shift', '10.1 The Eastward Shift', 'Roman West')],
  ['https://en.wikipedia.org/wiki/History_of_the_Peloponnesian_War', birincil('Thukydides — History of the Peloponnesian War, Richard Crawley cevirisi', 'https://www.gutenberg.org/cache/epub/7142/pg7142.txt', 'make the speakers say what was in my opinion demanded of them', 'eser', 'Eserin kamu mali Ingilizce tam metni; modern edisyon ve ceviri tartismalarini kapsamaz.')],
  ['https://en.wikipedia.org/wiki/The_Age_of_Extremes', akademik('Eric Hobsbawm — Age of Extremes: The Short Twentieth Century, Open Library katalog kaydi', 'https://openlibrary.org/books/OL1103939M.json', 'The age of extremes', 'Eser teliflidir; künye ve baskı bilgisi için Open Library katalog kaydının makinece okunabilir sürümüdür, bölüm düzeyinde tam metin kanıtı değildir.')],
  ['https://en.wikipedia.org/wiki/Operation_Barbarossa', openstax(2, '13-2-theaters-of-war', '13.2 Theaters of War', '13.2 Theaters of War')],
  ['https://en.wikipedia.org/wiki/Axial_Age', akademik('Internet Archive katalog kaydı — Karl Jaspers, The Origin and Goal of History (1953)', 'https://archive.org/details/origingoalofhist0000jasp', 'The origin and goal of history', 'Eksen Cagi terimini yayginlastiran eserin katalog kaydi; tezin evrenselligini dogrulamaz.')],
]);

// Pers-Yunan dosyasi iki Wikipedia kaynagindan konuya dogrudan ait olani tutar.
const TUTULACAK = new Map([
  ['olay-pers-yunan-savaslari', 'k4'],
]);

function alan(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

function kaynakBlogu(kaynak) {
  return YAML.stringify({ kaynaklar: [kaynak] }, { lineWidth: 100 })
    .replace(/^kaynaklar:\n/, '').trimEnd().split('\n');
}

function kaynakAraligi(satirlar, anahtar) {
  const bas = satirlar.findIndex((s) => s === `  - anahtar: ${anahtar}`);
  if (bas < 0) throw new Error(`kaynak blogu bulunamadi: ${anahtar}`);
  let son = bas + 1;
  while (son < satirlar.length) {
    const s = satirlar[son];
    if (/^  - anahtar: /.test(s) || (s && !/^\s/.test(s))) break;
    son += 1;
  }
  return { bas, son };
}

function kaynakDegistir(hamFm, anahtar, kaynak) {
  const satirlar = hamFm.split('\n');
  const { bas, son } = kaynakAraligi(satirlar, anahtar);
  satirlar.splice(bas, son - bas, ...kaynakBlogu({ anahtar, ...kaynak }));
  return satirlar.join('\n');
}

function kaynakKaldir(hamFm, anahtar) {
  const satirlar = hamFm.split('\n');
  const { bas, son } = kaynakAraligi(satirlar, anahtar);
  satirlar.splice(bas, son - bas);
  return satirlar.join('\n');
}

function matristeBirlestir(matris, eski, yeni) {
  let degisen = 0;
  for (const iddia of matris.iddialar || []) {
    const kaynaklar = iddia.kaynaklar || [];
    const eskiKayit = kaynaklar.find((k) => k.anahtar === eski);
    if (!eskiKayit) continue;
    const yeniKayit = kaynaklar.find((k) => k.anahtar === yeni);
    if (yeniKayit) iddia.kaynaklar = kaynaklar.filter((k) => k !== eskiKayit);
    else eskiKayit.anahtar = yeni;
    degisen += 1;
  }
  matris.sayaclar = sayaclariHesapla(matris.iddialar || []);
  return degisen;
}

const havuz = yamlOku(path.join(ICERIK, '_sistem', 'kaynak-havuzu.yaml'));
const girisAlanlari = new Set((havuz.whitelist || [])
  .filter((w) => w.kullanim === 'giris_kapisi').map((w) => w.alan));
const rapor = { uygulandi: UYGULA, makale: [], degisim: 0, birlesme: 0, sorunlar: [] };

for (const m of makaleleriTopla()) {
  const kaynaklar = m.fm.kaynaklar || [];
  const giris = kaynaklar.filter((k) => girisAlanlari.has(alan(k.url)));
  if (giris.length <= 1) continue;
  try {
    const tutulacak = TUTULACAK.get(m.fm.id) || giris[0].anahtar;
    if (!giris.some((k) => k.anahtar === tutulacak)) throw new Error(`tutulacak giris yok: ${tutulacak}`);
    let yeniFm = m.hamFm;
    let yeniGovde = m.govde;
    let matris = null;
    let matrisDegisimi = 0;
    const islemler = [];

    for (const eski of giris.filter((k) => k.anahtar !== tutulacak)) {
      const yeniKaynak = YUKSELTMELER.get(eski.url);
      if (!yeniKaynak) throw new Error(`yukseltme tanimi yok: ${eski.url}`);
      const ayni = kaynaklar.find((k) => k.anahtar !== eski.anahtar && k.url === yeniKaynak.url);
      if (ayni) {
        yeniFm = kaynakKaldir(yeniFm, eski.anahtar);
        yeniGovde = yeniGovde.replaceAll(`[^${eski.anahtar}]`, `[^${ayni.anahtar}]`);
        const matrisYolu = path.join(MATRIS_DIZINI, `${m.fm.id}-matris.json`);
        if (fs.existsSync(matrisYolu)) {
          matris ||= JSON.parse(fs.readFileSync(matrisYolu, 'utf8'));
          matrisDegisimi += matristeBirlestir(matris, eski.anahtar, ayni.anahtar);
        }
        rapor.birlesme += 1;
        islemler.push({ anahtar: eski.anahtar, eski: eski.url, birlesti: ayni.anahtar, yeni: yeniKaynak.url });
      } else {
        yeniFm = kaynakDegistir(yeniFm, eski.anahtar, yeniKaynak);
        rapor.degisim += 1;
        islemler.push({ anahtar: eski.anahtar, eski: eski.url, yeni: yeniKaynak.url });
      }
    }
    yeniFm = yeniFm.replace(/\nson_denetim: [^\n]+/, `\nson_denetim: ${BUGUN}`);
    YAML.parse(yeniFm);
    const kalan = YAML.parse(yeniFm).kaynaklar || [];
    if (kalan.length < 3) throw new Error(`islem sonunda yalniz ${kalan.length} kunye kaldi`);
    if (new Set(kalan.map((k) => k.url)).size !== kalan.length) throw new Error('islem sonunda yinelenen URL var');

    if (matris) {
      matris.govde_hash = govdeHash(yeniGovde);
      matris.commit = suankiCommit();
      (matris.tazeleme ||= []).push({ zaman: BUGUN,
        gerekce: `fazla giris-kapisi anahtarlari mevcut guclu kunyelerle birlestirildi; ${matrisDegisimi} matris baglantisi guncellendi` });
    }
    rapor.makale.push({ id: m.fm.id, tutulacak, islemler, matrisDegisimi });
    if (UYGULA) {
      fs.writeFileSync(m.yol, m.ham.replace(m.hamFm, yeniFm).replace(m.govde, yeniGovde));
      if (matris) fs.writeFileSync(path.join(MATRIS_DIZINI, `${m.fm.id}-matris.json`), `${JSON.stringify(matris, null, 2)}\n`);
    }
  } catch (hata) {
    rapor.sorunlar.push({ id: m.fm.id, hata: hata.message });
  }
}

const raporYolu = path.join(KOK, 'denetim', 'giris-kapisi-yukseltme.json');
fs.writeFileSync(raporYolu, `${JSON.stringify(rapor, null, 2)}\n`);
console.log(`giris kapisi yukseltme: ${rapor.makale.length} makale · ${rapor.degisim} kaynak degisimi · ${rapor.birlesme} kunye birlesmesi · ${rapor.sorunlar.length} sorun · ${UYGULA ? 'uygulandi' : 'kuru prova'}`);
for (const s of rapor.sorunlar) console.log(`SORUN ${s.id}: ${s.hata}`);
process.exit(rapor.sorunlar.length ? 1 : 0);
