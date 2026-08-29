// Ajanlara cakismayan bir gecici calisma dizini verir.
//
// 2026-08-29, kor hakem bulgusu: paralel calisan iki oturum ortak scratchpad
// kokune ayni adla (k6.txt) dosya yazdi ve biri otekinin indirdigi kaynak
// metnin uzerine yazdi. Hakem birkac dakika boyunca YANLIS kaynak metnini
// dogruluyordu. Bu, getir.mjs onbelleginde kapatilan hatanin dosya sistemi
// karsiligidir: ayni ada iki farkli icerik.
//
// Cozum tek satirlik: her oturum kendi dizinine yazar. Dizin adi id + PID +
// zaman damgasi tasir, boylece ayni id'yi isleyen iki oturum bile carpismaz.
//
//   D=$(node araclar/calisma-dizini.mjs <id>) && curl ... > "$D/k6.txt"
import fs from 'node:fs';
import path from 'node:path';

const id = (process.argv[2] || 'gorev').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 60);
const kok = process.env.CLAUDE_SCRATCHPAD
  || '/private/tmp/claude-501/-Users-mpcukur-Projects-claude-beseri-atlas/9bdf70fd-6c11-45c6-a119-f646115bffd7/scratchpad';
const dizin = path.join(kok, 'calisma', `${id}-${process.pid}-${Date.now().toString(36)}`);
fs.mkdirSync(dizin, { recursive: true });
process.stdout.write(dizin);
