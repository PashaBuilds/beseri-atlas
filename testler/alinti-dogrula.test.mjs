// alinti-dogrula.mjs — tirnak siniflandirmasi ve curutucu kategori senkronu.
//
// Bu arac, kor hakemlerin IKI ayri turda ELLE yakaladigi bir hata sinifini
// mekaniklestiriyor: matris `inceleme` notunun, kaynakta hic gecmeyen bir
// dizeyi tirnak icinde kaynaga mal etmesi. Ilk korpus kosusunda 119 aday
// bildirdi ve bunlarin 55'i ARACIN KENDI kusurlariydi. Asagidaki sinamalar o
// kusurlarin her birini dondurur; biri geri gelirse burada kirilir.
//   node testler/alinti-dogrula.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { govdeAlintilari, matrisAlintilari } from '../araclar/alinti-dogrula.mjs';
import { ITIRAZ_TURLERI } from '../araclar/curut.mjs';

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let n = 0;
const test = (ad, fn) => { fn(); n += 1; console.log(`ok  ${ad}`); };

// --- Curutucu kategori senkronu ------------------------------------------
// ITIRAZ_TURLERI, alinti dogrulayicinin "denetim sozlugu" muafiyetini besler.
// Curutucuya yeni bir itiraz turu eklenip listeye yazilmazsa, hakemlerin o
// turu anan notlari sessizce "uydurma alinti adayi" olur. Liste iki yerde
// duruyor (ekle() cagrilari ve sabit); senkronu sinama tutar.
test('curut.mjs: kullanilan her itiraz turu ITIRAZ_TURLERI icinde', () => {
  const kaynak = readFileSync(path.join(KOK, 'araclar/curut.mjs'), 'utf8');
  const kullanilan = [...kaynak.matchAll(/ekle\('[a-z]+',\s*'([a-z-]+)'/g)].map((m) => m[1]);
  assert.ok(kullanilan.length > 0, 'curut.mjs icinde ekle() cagrisi bulunamadi');
  for (const tur of new Set(kullanilan)) {
    assert.ok(ITIRAZ_TURLERI.includes(tur),
      `curut.mjs "${tur}" turunu uretiyor ama ITIRAZ_TURLERI icinde yok`);
  }
});

test('ITIRAZ_TURLERI icinde kullanilmayan ad yok', () => {
  const kaynak = readFileSync(path.join(KOK, 'araclar/curut.mjs'), 'utf8');
  const kullanilan = new Set([...kaynak.matchAll(/ekle\('[a-z]+',\s*'([a-z-]+)'/g)].map((m) => m[1]));
  for (const tur of ITIRAZ_TURLERI) {
    assert.ok(kullanilan.has(tur), `ITIRAZ_TURLERI "${tur}" tasiyor ama curut.mjs uretmiyor`);
  }
});

// --- Govde alintisi cikarma ----------------------------------------------
test('govde: alintiyi TAKIP eden dipnot baglanir', () => {
  const g = govdeAlintilari('Kaynak "effective occupation" der.[^k3] Devam.');
  assert.equal(g.length, 1);
  assert.equal(g[0].anahtar, 'k3');
});

test('govde: cok dipnotlu cumlede HEPSI aday olur', () => {
  // Olculdu: Berlin dosyasi "Wir sind das Volk" sloganini [^k4][^k2] diye iki
  // kaynaga bagliyor ve dize k4'te degil k2'de duruyordu. Yalnizca ilkine
  // bakan surum saglam bir alintiyi "uydurma" ilan ediyordu.
  const g = govdeAlintilari('O gun atilan "Wir sind das Volk" sloganı,[^k4][^k2] gucu artirdi.');
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].adaylar, ['k4', 'k2']);
});

test('govde: kaynakca satiri alinti sayilmaz', () => {
  // Atif usulunde makale adlari tirnak icine yazilir; Braudel dosyasi bu
  // yuzden "k1'den 6 alinti" hatasi veriyordu ve altisi da baslikti.
  const g = govdeAlintilari('[^k1]: Fernand Braudel, "Histoire et Sciences sociales", *Annales* 13-4.');
  assert.equal(g.length, 0);
});

test('govde: adlandirma cercevesi alinti sayilmaz', () => {
  // `"X" olarak adlandirilmasi` kalibinda tirnak bir ALINTI degil bir ADDIR.
  const g = govdeAlintilari('Donemin "Fars rönesansı" olarak adlandırılması tartışmalıdır.[^k1]');
  assert.equal(g.length, 0);
});

test('govde: dipnotsuz alinti bu aracin isi degil', () => {
  assert.equal(govdeAlintilari('Bir yerde "uzunca bir ifade" geciyor.').length, 0);
});

// --- Matris notu cikarma --------------------------------------------------
const matris = (inceleme) => ({
  iddialar: [{ iddia_id: 'i01', inceleme, kaynaklar: [{ anahtar: 'k1' }, { anahtar: 'k2' }] }],
});

test('matris: inceleme notundaki alinti cikarilir', () => {
  const a = matrisAlintilari(matris('Kaynak "los de Tlaxcalla sus leales" der.'));
  assert.equal(a.length, 1);
  assert.deepEqual(a[0].adaylar, ['k1', 'k2']);
});

test('matris: denetim sozlugu muaf', () => {
  // Hakemler hangi curutucu itirazini degerlendirdiklerini yazarken kategori
  // adini tirnak icine aliyor. Fatimi dosyasindaki 27 adayin dokuzu buydu.
  for (const tur of ITIRAZ_TURLERI) {
    const a = matrisAlintilari(matris(`Curutucunun "${tur}" itirazi REDDEDILDI.`));
    assert.equal(a.length, 0, `"${tur}" denetim sozlugu olarak muaf olmali`);
  }
});

test('matris: tek sayida tirnak artigi atlanir', () => {
  // Uc tirnakli bir notta desen, ikinci alintinin KAPANISI ile ucuncunun
  // ACILISI arasindaki metni alinti sanir.
  const a = matrisAlintilari(matris('Ilk "gercek alinti burada" ) kismen kabul edildi: kaynak nitelemeyi yapiyor ('));
  for (const x of a) {
    assert.ok(!x.dize.trim().startsWith(')'), `kapanisla baslayan artik alinti sayildi: ${x.dize}`);
    assert.ok(!x.dize.trim().endsWith('('), `acilisla biten artik alinti sayildi: ${x.dize}`);
  }
});

test('matris: kaynaksiz iddiada alinti aranmaz', () => {
  const a = matrisAlintilari({ iddialar: [{ iddia_id: 'i1', inceleme: 'Bir "uzunca ifade" var.', kaynaklar: [] }] });
  assert.equal(a.length, 0);
});

console.log(`\n${n} sinama gecti`);
