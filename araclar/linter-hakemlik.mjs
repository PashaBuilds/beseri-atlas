// KAPI 9 — Hakemlik dedektoru (Ilke 3).
// Site bir konuda "dogru cevabi" vermez. Hakemlik yapan hukum cumleleri hatadir.
import { Rapor, paragraflar } from './ortak.mjs';

// Hukum kaliplari. Bunlar "baglac" degil, "karar" cumleleridir.
const HUKUM_KALIPLARI = [
  { re: /\ben doğrusu\b/i, ad: 'en doğrusu' },
  { re: /\bdoğru (cevap|yanıt|açıklama)\b/i, ad: 'doğru cevap' },
  { re: /\baslında (şudur|şu ?dur|durum şudur|gerçek şudur)\b/i, ad: 'aslında şudur' },
  { re: /\bgerçek şudur\b/i, ad: 'gerçek şudur' },
  { re: /\bsonuç olarak[^.!?]{0,80}\b(doğru|haklı|kazan|üstün|geçerli|kabul edilmelidir|söylenebilir ki)\b/i, ad: 'sonuç olarak + hüküm' },
  { re: /\bbu tartışmayı[^.!?]{0,40}\b(kazan|çöz)/i, ad: 'tartışmayı kazanan' },
  { re: /\bhaklı olan\b/i, ad: 'haklı olan' },
  { re: /\b(tartışma|mesele) (artık )?(kapanmıştır|çözülmüştür)\b/i, ad: 'tartışma kapandı' },
  { re: /\bkesin olarak (söylemek gerekirse|bilinmektedir ki)\b/i, ad: 'kesin hüküm' },
  { re: /\bnihai (cevap|yargı|hüküm)\b/i, ad: 'nihai hüküm' },
  { re: /\ben ikna edici (açıklama|tez|pozisyon)\b/i, ad: 'en ikna edici' },
  { re: /\bbugün (artık )?kabul edilen (görüş|doğru) şudur\b/i, ad: 'kabul edilen doğru' },
];

export function hakemlikDenetimi(makaleler) {
  const r = new Rapor('KAPI 9 — hakemlik dedektoru');
  for (const m of makaleler) {
    if (m.ayristirmaHatasi) continue;

    // tartisma tipinde hakem_yok daima true olmak zorundadir (§7)
    if (m.fm.tip === 'tartisma' && m.fm.hakem_yok !== true) {
      r.hata(m.goreli, 'tartisma tipinde hakem_yok != true');
    }

    for (const p of paragraflar(m.govde)) {
      for (const k of HUKUM_KALIPLARI) {
        const e = k.re.exec(p.metin);
        if (e) {
          r.hata(m.goreli, `hakemlik kalibi "${k.ad}": "${e[0].slice(0, 70)}"`);
        }
      }
    }

    // tartismali etiketli iddia tek cevapla sunulamaz (Ilke 2):
    // guven_geneli tartismali ise ya pozisyonlar ya da bir tartisma haritasi baglantisi olmali.
    if (m.fm.guven_geneli === 'tartismali' && m.fm.tip !== 'tartisma') {
      const haritaVar = /::tartismali\[[^\]]*\]\{[^}]*harita\s*=/i.test(m.govde)
        || (m.fm.ilgili || []).some((x) => String(x).startsWith('tartisma-'));
      if (!haritaVar) {
        r.hata(m.goreli, 'guven_geneli=tartismali ama ne ::tartismali haritasi ne de ilgili bir tartisma dosyasi var (Ilke 2)');
      }
    }
  }
  return r;
}
