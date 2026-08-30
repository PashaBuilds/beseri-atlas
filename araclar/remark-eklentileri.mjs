// Beşeri Atlas'a özgü markdown uzantıları.
//
//  1. [^k1]  -> kaynak listesine giden üst simge bağ. Kaynaklar frontmatter'da
//               tanımlıdır; gövdede dipnot tanımı bulunmaz. JS kapalıyken de
//               çalışan düz bir sayfa içi bağdır.
//  2. ::tartismali[metin]{harita=tartisma-...} -> tartışma haritasına yönlendiren
//               blok. Bu direktif harita parametresi olmadan kullanılamaz (§6);
//               KAPI 2 bunu build'den önce yakalar, burada ikinci savunma vardır.
//  3. Taban öneki -> site bir alt dizinde yayımlandığında (GitHub Pages proje
//               sayfası) gövdedeki kök-göreli bağlar kırılır. Önek build
//               sırasında burada eklenir; makaleler dağıtım yolundan habersiz
//               kalır ve `/kavram/asabiyet/` yazmaya devam eder.
import { visit } from 'unist-util-visit';

// Taban ÇAĞRI ANINDA okunur, modül yüklenirken değil: astro.config.mjs bu
// modülü import ettikten SONRA process.env'e yazar (import'lar hoist edilir),
// yüklenme anında okunsaydı taban her zaman boş görünürdü.
const taban = () => (process.env.BESERI_TABAN ?? '').replace(/\/+$/, '');

/** Kök-göreli bir yola taban önekini ekler. Dış bağlara ve çapalara dokunmaz. */
export function tabanla(yol) {
  const t = taban();
  if (!t || typeof yol !== 'string') return yol;
  if (!yol.startsWith('/') || yol.startsWith('//')) return yol;
  return yol.startsWith(`${t}/`) ? yol : `${t}${yol}`;
}

export function remarkTaban() {
  return (agac) => {
    if (!taban()) return;
    visit(agac, ['link', 'image'], (dugum) => { dugum.url = tabanla(dugum.url); });
  };
}

export function remarkDipnot() {
  return (agac) => {
    // Ayni anahtara ikinci atif, ayni id'yi tekrarlayamaz (HTML'de id tekildir;
    // tekrar, "metne don" bagini ve erisilebilirlik agacini bozuyordu).
    // Ilk gecis id="atif-kN" alir, sonrakiler "atif-kN-2", "atif-kN-3"...
    const gecisler = new Map();
    visit(agac, 'text', (dugum, indis, ebeveyn) => {
      if (!ebeveyn || typeof indis !== 'number') return;
      const parcalar = String(dugum.value).split(/(\[\^k\d+\])/g);
      if (parcalar.length === 1) return;
      const yeni = [];
      for (const p of parcalar) {
        const e = /^\[\^(k(\d+))\]$/.exec(p);
        if (!e) { if (p) yeni.push({ type: 'text', value: p }); continue; }
        const n = (gecisler.get(e[1]) || 0) + 1;
        gecisler.set(e[1], n);
        const id = n === 1 ? `atif-${e[1]}` : `atif-${e[1]}-${n}`;
        yeni.push({
          type: 'html',
          value: `<sup class="dipnot"><a href="#kaynak-${e[1]}" id="${id}" `
            + `aria-describedby="kaynak-${e[1]}" data-kaynak="${e[1]}">${e[2]}</a></sup>`,
        });
      }
      ebeveyn.children.splice(indis, 1, ...yeni);
      return indis + yeni.length;
    });
  };
}

export function remarkDirektif() {
  return (agac, dosya) => {
    visit(agac, (dugum) => {
      // remark-directive'in leaf bicimi tek satirda calisir. Icerik uretim
      // hattinin satir saricisi uzun ::tartismali cagrisini iki ya da daha cok
      // satira boldugunde parser onu `leafDirective` yerine duz `paragraph`
      // olarak birakiyordu. Build basarili gorunuyor, okur ise ham
      // `::tartismali[...]` soz dizimini goruyordu. Paragraf geri dususu ayni
      // sozlesmeyi cok satirli metin icin de uygular.
      if (dugum.type === 'paragraph') {
        const ham = (dugum.children ?? []).map((c) => c.value ?? '').join('').trim();
        const e = /^::tartismali\[([\s\S]+)\]\{harita=([^}\s]+)\}$/.exec(ham);
        if (!e) return;
        const [tip, ...rest] = e[2].split('-');
        const yol = tabanla(`/${tip}/${rest.join('-')}/`);
        dugum.type = 'html';
        dugum.value = `<aside class="tartismali-cagri" role="note">`
          + `<span class="tartismali-cagri__etiket">TARTIŞMALI</span>`
          + `<p class="tartismali-cagri__metin">${e[1].replace(/\s+/g, ' ')}</p>`
          + `<a class="tartismali-cagri__bag" href="${yol}">Tartışma haritasını aç<span aria-hidden="true"> →</span></a>`
          + `</aside>`;
        dugum.children = [];
        return;
      }

      if (!['textDirective', 'leafDirective', 'containerDirective'].includes(dugum.type)) return;

      // METIN DIREKTIFI (tek iki nokta) — 2026-08-25'te eklendi.
      //
      // remark-directive `:ad` bicimini metin direktifi olarak ayristirir. Turkce
      // duz yazida iki nokta sik gecer: saat ("01:23'te"), oran ("2:1"), ayet
      // numarasi. Bunlarin hicbiri direktif degildir, ama eklenti hepsini
      // "bilinmeyen direktif" sayip dosya.fail() cagiriyordu.
      //
      // Astro bu hatayi dosya bazinda yakalayip GOVDEYI BOS render ediyor:
      // build kirilmiyor, sayfa sessizce icerigini kaybediyor. olay-cernobil
      // dosyasi 2026-08-21'den beri bu yuzden govdesiz yayindaydi ve on uc
      // kapinin hicbiri gormedi; KAPI 14 bulup bisect ile buraya kadar indi.
      //
      // Proje `::tartismali[...]{harita=...}` bicimini kullanir; bu bir LEAF
      // direktiftir. Tek iki noktali metin direktifi hicbir zaman kasitli
      // degildir, dolayisiyla duz metne geri cevrilir. Tek istisna: adi
      // "tartismali" ise bu bir yazim hatasidir ve build kirilir.
      if (dugum.type === 'textDirective') {
        if (dugum.name === 'tartismali') {
          dosya.fail('::tartismali tek iki nokta ile yazilmis; leaf direktif icin `::` gerekir', dugum);
          return;
        }
        const etiket = dugum.children?.map((c) => c.value || '').join('') || '';
        dugum.type = 'text';
        dugum.value = `:${dugum.name}${etiket ? `[${etiket}]` : ''}`;
        dugum.children = [];
        return;
      }

      if (dugum.name !== 'tartismali') {
        dosya.fail(`bilinmeyen direktif: ::${dugum.name}`, dugum);
        return;
      }
      const harita = dugum.attributes?.harita;
      if (!harita) {
        // İkinci savunma hattı: KAPI 2 kaçırırsa build burada kırılır.
        dosya.fail('::tartismali direktifi `harita` parametresi olmadan kullanılamaz (§6)', dugum);
        return;
      }
      const [tip, ...rest] = harita.split('-');
      const yol = tabanla(`/${tip}/${rest.join('-')}/`);
      const metin = dugum.children?.map((c) => c.value || '').join('') || '';
      dugum.type = 'html';
      dugum.value = `<aside class="tartismali-cagri" role="note">`
        + `<span class="tartismali-cagri__etiket">TARTIŞMALI</span>`
        + `<p class="tartismali-cagri__metin">${metin}</p>`
        + `<a class="tartismali-cagri__bag" href="${yol}">Tartışma haritasını aç<span aria-hidden="true"> →</span></a>`
        + `</aside>`;
      dugum.children = [];
    });
  };
}
