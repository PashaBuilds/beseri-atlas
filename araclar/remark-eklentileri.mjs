// Beşeri Atlas'a özgü markdown uzantıları.
//
//  1. [^k1]  -> kaynak listesine giden üst simge bağ. Kaynaklar frontmatter'da
//               tanımlıdır; gövdede dipnot tanımı bulunmaz. JS kapalıyken de
//               çalışan düz bir sayfa içi bağdır.
//  2. ::tartismali[metin]{harita=tartisma-...} -> tartışma haritasına yönlendiren
//               blok. Bu direktif harita parametresi olmadan kullanılamaz (§6);
//               KAPI 2 bunu build'den önce yakalar, burada ikinci savunma vardır.
import { visit } from 'unist-util-visit';

export function remarkDipnot() {
  return (agac) => {
    visit(agac, 'text', (dugum, indis, ebeveyn) => {
      if (!ebeveyn || typeof indis !== 'number') return;
      const parcalar = String(dugum.value).split(/(\[\^k\d+\])/g);
      if (parcalar.length === 1) return;
      const yeni = [];
      for (const p of parcalar) {
        const e = /^\[\^(k(\d+))\]$/.exec(p);
        if (!e) { if (p) yeni.push({ type: 'text', value: p }); continue; }
        yeni.push({
          type: 'html',
          value: `<sup class="dipnot"><a href="#kaynak-${e[1]}" id="atif-${e[1]}" `
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
      if (!['textDirective', 'leafDirective', 'containerDirective'].includes(dugum.type)) return;
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
      const yol = `/${tip}/${rest.join('-')}/`;
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
