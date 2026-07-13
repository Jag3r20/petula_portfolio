# Petula Trávníčková — portfolio

Osobní portfolio fotografky. Next.js + Tailwind + Sanity CMS, hostované na Vercelu
(`petulatravnickova.vercel.app`). Detailní plán v [PLAN.md](PLAN.md).

## Vývoj

```bash
npm install
npm run dev   # http://localhost:3000
```

Bez nastaveného Sanity běží web na **demo datech** (fotky z picsum.photos) —
všechno se dá vyvíjet a prohlížet i bez CMS.

## Napojení Sanity (jednorázově)

1. Vytvoř projekt na [sanity.io/manage](https://www.sanity.io/manage) (free plán).
2. Zkopíruj `.env.local.example` → `.env.local` a doplň `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. V nastavení Sanity projektu (API → CORS origins) povol `http://localhost:3000`
   a `https://petulatravnickova.vercel.app` (s credentials).
4. Studio běží na `/studio` — přihlásí se tam Petula a nahrává obsah:
   Nastavení webu, Stránka O mně, 4 Kategorie, Série fotek.

## Deploy na Vercel

1. Pushni repo na GitHub, na Vercelu „Import Project“, pojmenuj projekt
   `petulatravnickova` (tím vznikne doména petulatravnickova.vercel.app).
2. Nastav env proměnné z `.env.local.example`.
3. Webhook pro okamžité propsání změn z CMS: v Sanity (API → Webhooks)
   vytvoř POST webhook na `https://petulatravnickova.vercel.app/api/revalidate`,
   secret = hodnota `SANITY_REVALIDATE_SECRET`.

## Pro Petulu — nahrávání fotek

- Fotky nahrávej jako JPEG, delší strana ~4000 px, sRGB.
- Každá fotka musí mít vyplněný „Popis fotky“.
- Fotky na úvodní stránku: zapni u fotky „Zobrazit na úvodní stránce“ (~12 nejlepších).
