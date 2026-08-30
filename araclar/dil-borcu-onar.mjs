#!/usr/bin/env node
// Eski uretim dalgalarinin biraktigi meta-dili dogal gecislere donusturur.
//
// Bu arac sayaci kandirmak icin marka adini baska bir adla degistirmez:
// "Atlas ... kaydeder" diye baslayan, ardindan asil yorumu veren paragraflarda
// gereksiz ilk cumleyi kaldirir; dipnotu yoruma tasir ve yorumun turune uygun
// bir epistemik kopru kurar. Kalan acik proje gonderimleri `korpus` diye
// adlandirilir; kitap adi ya da cografi terim olan gercek "atlas"
// kullanimlarina dokunulmaz. Kapsam basliklari ve "bu dosya" kalibi okunur
// Turkceye cevrilir.
// Varsayilan kip kuru provadir; yazmak icin `--uygula` gerekir.
import fs from 'node:fs';
import path from 'node:path';
import { KOK, makaleleriTopla } from './ortak.mjs';
import { KALIPLAR, kalipSay } from './linter-dil.mjs';

const ESKI_KOPRULER = [
  'Bu ayrımın gösterdiği nokta şudur:',
  'Kanıtın sınırları içinde söylenebilecek olan şudur:',
  'Olgular arasındaki ilişki şu sonucu düşündürür:',
  'Sayılar birlikte okunduğunda şu sonuç ortaya çıkar:',
  'Kaynakların birlikte okunması şu noktayı belirginleştirir:',
  'Tartışmayı açık tutan nokta şudur:',
  'Aktarılan bulgulardan şu çıkarım yapılabilir:',
  'Bu karşılaştırmadan çıkan sonuç şudur:',
  'Buradaki kanıtların düşündürdüğü nokta şudur:',
  'Ayrıntılar yan yana getirildiğinde şu örüntü belirir:',
  'Bu kayıtların birlikte gösterdiği sonuç şudur:',
  'Buradaki mekanizma şöyle özetlenebilir:',
];

function dipnotuIlkCumleyeTasi(metin, dipnotlar) {
  if (metin.includes(dipnotlar)) return metin;
  const es = /[.!?](?=\s|$)/u.exec(metin);
  if (!es) return `${metin}${dipnotlar}`;
  const konum = es.index + 1;
  return `${metin.slice(0, konum)}${dipnotlar}${metin.slice(konum)}`;
}

function satirla(metin, genislik = 88) {
  const kelimeler = metin.replace(/\s+/g, ' ').trim().split(' ');
  const satirlar = [];
  let satir = '';
  for (const kelime of kelimeler) {
    if (satir && satir.length + kelime.length + 1 > genislik) {
      satirlar.push(satir); satir = kelime;
    } else satir = satir ? `${satir} ${kelime}` : kelime;
  }
  if (satir) satirlar.push(satir);
  return satirlar.join('\n');
}

const DOSYA_BICIMLERI = {
  '': 'bu inceleme', nın: 'bu incelemenin', nin: 'bu incelemenin',
  da: 'bu incelemede', dan: 'bu incelemeden', daki: 'bu incelemedeki',
  ya: 'bu incelemeye', yı: 'bu incelemeyi', yi: 'bu incelemeyi',
  yla: 'bu incelemeyle', lar: 'bu incelemeler', sı: 'bu incelemesi',
  sında: 'bu incelemesinde', 'nındır': 'bu incelemenindir',
};

function dosyaDiliniDuzelt(metin) {
  const uyumlu = metin.replace(/\bbu dosya da\b/giu, (es) =>
    /^[A-ZÇĞİÖŞÜ]/u.test(es) ? 'Bu inceleme de' : 'bu inceleme de');
  return uyumlu.replace(/\bbu dosya(nındır|nın|nin|sında|sı|daki|dan|da|yı|yi|yla|ya|lar)?(?=$|[^a-zçğıöşü])/giu,
    (es, ek = '') => {
      const yeni = DOSYA_BICIMLERI[String(ek).toLocaleLowerCase('tr')] || 'bu inceleme';
      return /^[A-ZÇĞİÖŞÜ]/u.test(es) ? yeni[0].toLocaleUpperCase('tr') + yeni.slice(1) : yeni;
    });
}

function atlasDiliniDuzelt(metin) {
  // Buyuk harfle baslayan kullanimlar proje oz-gonderimidir. Kucuk harfli
  // "tarih atlasi", "atlasta gosterilen" gibi gercek tur adlari korunur.
  return metin.replace(/\b(Atlasın|Atlasin|Atlastaki|Atlasta|Atlasa|Atlası|Atlas)\b/gu,
    (es, _x, konum, tumu) => {
      const devam = tumu.slice(konum + es.length, konum + es.length + 12);
      if (/^\s+(Okyanus|Dağ|of\b)/u.test(devam)) return es;
      const k = es.toLocaleLowerCase('tr');
      if (k === 'atlasın' || k === 'atlasin') return /^[A-Z]/.test(es) ? 'Korpusun' : 'korpusun';
      if (k === 'atlastaki') return /^[A-Z]/.test(es) ? 'Korpustaki' : 'korpustaki';
      if (k === 'atlasta') return /^[A-Z]/.test(es) ? 'Korpusta' : 'korpusta';
      if (k === 'atlasa') return /^[A-Z]/.test(es) ? 'Korpusa' : 'korpusa';
      if (k === 'atlası') return /^[A-Z]/.test(es) ? 'Korpusu' : 'korpusu';
      return /^[A-Z]/.test(es) ? 'Korpus' : 'korpus';
    });
}

export function govdeyiOnar(govde) {
  let yeni = govde.split(/(\n\s*\n)/).map((parca) => {
    if (/^\n\s*\n$/.test(parca)) return parca;
    const es = /^(Atlas(?:'?[a-zçğıöşü]+)?[\s\S]*?[.!?])\s*((?:\[\^[^\]]+\])+?)\s+([\s\S]+)$/u.exec(parca.trim());
    if (!es) return parca;
    // Ilk cumle yalniz platformun ne yaptigini soyluyor; asil dusunce hemen
    // ardindan geliyor. Meta cumleyi at, dipnotu dogrudan asil cumleye tasi.
    return satirla(dipnotuIlkCumleyeTasi(es[3], es[2]));
  }).join('');

  // Aracin ilk kuru-prova surumunun ekledigi stok kopruler de temizlenir.
  // Bu satirlar yayinlanmadan once fark edildi; tekrar calistirma guvencesi
  // sayesinde donusum idempotent kalir.
  for (const kopru of ESKI_KOPRULER) {
    yeni = yeni.replaceAll(kopru, '');
  }

  yeni = yeni
    .replace(/^#{2,3}\s+Bu dosyanın sınırı\s*$/gimu, '## Kanıtın ve kapsamın sınırı')
    .replace(/^#{2,3}\s+Bu dosyanın kapsamadıkları\s*$/gimu, '## Açıkta kalan sorular')
    .replace(/^#{2,3}\s+Okuma yönlendirmesi\s*$/gimu, '## Okumayı sürdürmek için')
    .replace(/^#{2,3}\s+Dönemi atlasta okumak\s*$/gimu, '## Dönemin bağlantıları')
    .replace(/ayrıca kaydeder/giu, 'bu noktayı da belirtir');
  yeni = dosyaDiliniDuzelt(yeni);
  yeni = atlasDiliniDuzelt(yeni);
  // Ilk geciste marka adi "korpus"a cevrilmis ama anlatim dogallasmamissa
  // bunu borc kapanmis saymayiz. Guvenle donusturulebilen gezinme ve
  // karsilastirma kaliplari dogrudan, insan diline cevrilir.
  const dosyaEki = {
    dosyasındaki: 'incelemesindeki', dosyasında: 'incelemesinde',
    dosyasının: 'incelemesinin', dosyasıyla: 'incelemesiyle', dosyası: 'incelemesi',
  };
  yeni = yeni
    .replace(/\bKorpusun\s+(\[[^\]]+\]\(\/[^)]+\))\s+(dosyasındaki|dosyasında|dosyasının|dosyasıyla|dosyası)\b/giu,
      (_es, bag, ek) => `${bag} ${dosyaEki[ek.toLocaleLowerCase('tr')]}`)
    .replace(/\bkorpusun ayrı bir ([^.!?\n]{1,50}) dosyas([ıi]|ında|ının)\b/giu,
      (_es, tur, ek) => `ayrı bir ${tur} incelemes${String(ek).toLocaleLowerCase('tr') === 'ında' ? 'inde' : String(ek).toLocaleLowerCase('tr') === 'ının' ? 'inin' : 'i'}`)
    .replace(/\bkorpusun veri dosyalarında\b/giu, 'bağlantılı veri incelemelerinde')
    .replace(/\bkorpusun sonraki dönem dosyalarında\b/giu, 'sonraki dönem incelemelerinde')
    .replace(/\bBu, korpusun kaydettiği\b/gu, 'Bu')
    .replace(/\bbu, korpusun kaydettiği\b/gu, 'bu')
    .replace(/\bkorpusun kaydettiği en\b/giu, 'incelenen örnekler arasındaki en')
    .replace(/\bkorpusun kaydettiği\b/giu, 'incelenen')
    .replace(/^#{2,3}\s+(?:Bu incelemenin )?Korpustaki yeri(?: ve sınırı)?\s*$/gimu, '## Bağlantılar ve karşılaştırmalar')
    .replace(/^#{2,3}\s+(?:Kavramın )?Korpusta kullanımı\s*$/gimu, '## Nasıl kullanılır?')
    .replace(/^#{2,3}\s+Bu dönemi korpusta okumak\s*$/gimu, '## Dönemin bağlantıları')
    .replace(/^ (?=\S)/gmu, '');
  return yeni;
}

export function borcOzeti(makaleler) {
  const toplam = { ...Object.fromEntries(Object.keys(KALIPLAR).map((k) => [k, 0])), borclu: 0 };
  for (const m of makaleler) {
    const sayim = kalipSay(m.govde);
    let borclu = false;
    for (const [k, n] of Object.entries(sayim)) { toplam[k] += n; if (n) borclu = true; }
    if (borclu) toplam.borclu += 1;
  }
  return toplam;
}

if (process.argv[1]?.endsWith('dil-borcu-onar.mjs')) {
  const uygula = process.argv.includes('--uygula');
  const yalnizMatrissiz = process.argv.includes('--matrissiz');
  const makaleler = makaleleriTopla();
  const once = borcOzeti(makaleler);
  let degisen = 0;
  const sonrakiler = makaleler.map((m) => {
    const matrisli = fs.existsSync(path.join(KOK, 'denetim', 'matris', `${m.fm.id}-matris.json`));
    if (yalnizMatrissiz && matrisli) return m;
    const govde = govdeyiOnar(m.govde);
    if (govde !== m.govde) {
      degisen += 1;
      if (uygula) fs.writeFileSync(m.yol, m.ham.replace(m.govde, govde));
    }
    return { ...m, govde };
  });
  const sonra = borcOzeti(sonrakiler);
  console.log(JSON.stringify({ kip: uygula ? 'uygula' : 'kuru', kapsam: yalnizMatrissiz ? 'matrissiz' : 'tum-makaleler', degisen, once, sonra }, null, 2));
}
