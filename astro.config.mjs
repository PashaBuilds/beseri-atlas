import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkDipnot, remarkDirektif, remarkTaban } from './araclar/remark-eklentileri.mjs';

// Taban tek yerde tanimlidir; remark eklentisi onu ortam degiskeninden okur
// (eklenti Astro yapilandirmasini import edemez, dongusel olurdu).
const TABAN = '/beseri-atlas';
process.env.BESERI_TABAN = TABAN;

export default defineConfig({
  // GitHub Pages proje sayfasi: site kok alan adi, base repo adidir.
  // Ic baglar src/lib/icerik.ts icindeki bag() yardimcisindan gecer.
  site: 'https://pashabuilds.github.io',
  base: TABAN,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    // remarkDirective once calisir, sonra kendi donusturucumuz devralir.
    remarkPlugins: [remarkDirective, remarkDirektif, remarkDipnot, remarkTaban],
    gfm: true,
    smartypants: false,
    shikiConfig: { theme: 'github-light' },
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
