import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkDipnot, remarkDirektif } from './araclar/remark-eklentileri.mjs';

export default defineConfig({
  site: 'https://beseri-atlas.example',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    // remarkDirective once calisir, sonra kendi donusturucumuz devralir.
    remarkPlugins: [remarkDirective, remarkDirektif, remarkDipnot],
    gfm: true,
    smartypants: false,
    shikiConfig: { theme: 'github-light' },
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
