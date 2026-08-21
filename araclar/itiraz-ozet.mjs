// Curutucu (Gecis 3) raporlarindan ORTA ve YUKSEK ciddiyetli itirazlari ozetler.
//
// Neden var: onay adimi ile itiraz okuma adimi ayni komutta calistirildiginda
// cikti onaydan SONRA goruluyor ve cozulmemis bir itiraz onaylanabiliyor
// (bkz. denetim/curutucu-kararlari.yaml, kavram-vergi ve
// kaynak-pomeranz-buyuk-ayrisma kayitlari). Bu arac cikis kodunu da
// ayarladigi icin zincire guvenli bicimde eklenebilir:
//
//   node araclar/itiraz-ozet.mjs <id...> && <onay adimi>
//
// Cikis kodu: 0 = orta/yuksek itiraz yok, 1 = var.
import fs from 'node:fs';
import path from 'node:path';

const idler = process.argv.slice(2);
if (!idler.length) { console.error('kullanim: node araclar/itiraz-ozet.mjs <id...>'); process.exit(2); }

let acik = 0;
for (const id of idler) {
  const p = path.join(process.cwd(), 'denetim', 'raporlar', `${id}-curutucu.json`);
  if (!fs.existsSync(p)) { console.log(`${id}: curutucu raporu yok`); continue; }
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  const agir = (d.itirazlar || []).filter((i) => i.ciddiyet !== 'dusuk');
  if (!agir.length) { console.log(`${id}: temiz (orta/yuksek yok)`); continue; }
  acik += agir.length;
  for (const i of agir) {
    console.log(`\n${id} | ${i.ciddiyet.toUpperCase()} | ${i.tip}`);
    console.log(`  cumle: ${i.cumle.slice(0, 200)}`);
    console.log(`  sorun: ${i.sorun}`);
  }
}
console.log(`\ntoplam cozulmemis (orta/yuksek): ${acik}`);
process.exit(acik ? 1 : 0);
