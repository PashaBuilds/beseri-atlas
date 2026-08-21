// OWID grapher CSV'sini indirir, entity=World satirlarini suzer ve
// veri-setleri/ altina CSV + LISANS.md yazar.
//
// Kullanim:
//   node araclar/owid-indir.mjs <slug> <dosya-adi> <sutun-basligi> <birim-aciklamasi>
//
// arastir.mjs cekimi 400.000 karakterde kesiliyor ve alfabetik siralama
// nedeniyle "World" satiri pencerenin disinda kaliyor. Bu arac tam dosyayi
// indirir; boylece veri dosyalari eksiksiz olur.
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const [slug, dosya, basligi, birim] = process.argv.slice(2);
if (!slug || !dosya || !basligi) {
  console.error('kullanim: node araclar/owid-indir.mjs <slug> <dosya-adi> <sutun-basligi> [birim]');
  process.exit(2);
}
const url = `https://ourworldindata.org/grapher/${slug}.csv?csvType=full&useColumnShortNames=true`;

const metin = await new Promise((cz, rd) => {
  https.get(url, { headers: { 'user-agent': 'beseri-atlas/1.0' } }, (r) => {
    if (r.statusCode !== 200) return rd(new Error(`durum ${r.statusCode}`));
    let d = ''; r.on('data', (c) => { d += c; }); r.on('end', () => cz(d));
  }).on('error', rd);
});

const satirlar = metin.split('\n');
const dunya = satirlar.filter((l) => l.startsWith('World,OWID_WRL,'));
if (!dunya.length) { console.error('World satiri bulunamadi'); process.exit(1); }

const kayitlar = dunya.map((l) => { const p = l.split(','); return { yil: p[2], deger: p[3].trim() }; });
const csv = [`yil,${basligi}`, ...kayitlar.map((k) => `${k.yil},${k.deger}`)].join('\n') + '\n';

const kok = path.join(process.cwd(), 'veri-setleri');
fs.writeFileSync(path.join(kok, `${dosya}.csv`), csv, 'utf8');
fs.writeFileSync(path.join(kok, `${dosya}.LISANS.md`), `# ${dosya}.csv — kaynak ve lisans

**Kaynak:** Our World in Data, grapher slug \`${slug}\`
https://ourworldindata.org/grapher/${slug}

**İndirilme tarihi:** ${new Date().toISOString().slice(0, 10)}
**İndirilen uç nokta:**
\`${url}\`

**Lisans:** CC BY 4.0 (Our World in Data)

**Filtre:** yalnızca \`entity = World\` (\`code = OWID_WRL\`) satırları.
**Satır sayısı:** ${kayitlar.length}
**İlk yıl:** ${kayitlar[0].yil} · **Son yıl:** ${kayitlar[kayitlar.length - 1].yil}
**Birim:** ${birim || basligi}

Bu dosya \`araclar/owid-indir.mjs\` ile üretildi; elle düzenlenmemiştir.
`, 'utf8');

console.log(`${dosya}.csv yazildi — ${kayitlar.length} satir, ${kayitlar[0].yil}-${kayitlar[kayitlar.length - 1].yil}`);
console.log('ilk:', kayitlar[0].yil, kayitlar[0].deger, '| son:', kayitlar[kayitlar.length - 1].yil, kayitlar[kayitlar.length - 1].deger);
