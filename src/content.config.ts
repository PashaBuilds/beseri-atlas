// Astro Content Collections — frontmatter build-time doğrulanır (§11, KAPI 1).
// Şema tanımı icerik/_sistem/sema.mjs'dedir; linterler ve Astro aynı şemayı
// kullanır. Şemaya uymayan dosya build'i kırar.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { semalar } from '../icerik/_sistem/sema.mjs';

const koleksiyon = (tip: keyof typeof semalar) => defineCollection({
  loader: glob({
    base: `./icerik/${tip}`,
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: semalar[tip] as any,
});

export const collections = {
  donem: koleksiyon('donem'),
  olay: koleksiyon('olay'),
  aktor: koleksiyon('aktor'),
  dusunur: koleksiyon('dusunur'),
  kavram: koleksiyon('kavram'),
  tartisma: koleksiyon('tartisma'),
  veri: koleksiyon('veri'),
  kaynak: koleksiyon('kaynak'),
};
