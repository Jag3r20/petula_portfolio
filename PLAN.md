# Portfolio — Petula Trávníčková

Osobní portfolio fotografky. Primární účel: **prezentace práce při hledání zaměstnání / spolupráce** — zaměstnavatel si má během 2 minut prohlédnout její nejlepší práci a pochopit, co umí. Ne prodejní web, žádný ceník ani rezervace.

Zaměření tvorby: **reportáž, portréty/rodiny, firemní & branding, volná tvorba**.
Jazyk: pouze čeština. Hosting: Vercel, doména **petulatravnickova.vercel.app** (Vercel projekt pojmenovat `petulatravnickova`). Správa obsahu: Sanity CMS (Petula si nahrává fotky sama).

Rozhodnuto: žádné logo — jméno vysazené typograficky. Kontakt bez formuláře, jen e-mail a telefon.

---

## 1. Tech stack

| Vrstva | Volba | Proč |
|---|---|---|
| Framework | Next.js 15 (App Router, TypeScript) | Standard pro Vercel, výborný image pipeline, SSG/ISR |
| Styling | Tailwind CSS 4 | Rychlý vývoj, snadná údržba |
| CMS | Sanity (free tier) | Hostované Studio, image CDN s ořezy a LQIP, webhooky na revalidaci |
| Obrázky | `next/image` + Sanity CDN (`@sanity/image-url`) | Automatické srcsety, WebP/AVIF, blur placeholdery z metadat |
| Lightbox | `yet-another-react-lightbox` | Lehký, klávesnice, swipe na mobilu, zoom |
| Animace | Motion (framer-motion) — střídmě | Fade-in galerie, page transitions |
| Analytika | Vercel Analytics | Zdarma, bez cookie lišty |

Repo: jeden Next.js projekt, Sanity Studio embedované na route `/studio` (žádný druhý deploy, Petula se přihlásí na `web.cz/studio`).

## 2. Struktura webu

```
/                  Úvod — fullscreen hero fotka (nebo pomalý slideshow),
                   jméno + jednovětá pozice, kurátorský výběr ~12 nejlepších
                   fotek napříč kategoriemi, odkazy do kategorií
/portfolio         Přehled kategorií (4 velké dlaždice s cover fotkou)
/portfolio/[kategorie]        Galerie kategorie — masonry grid + lightbox
/portfolio/[kategorie]/[serie] (volitelné) Detail série/projektu — pro
                   reportáže a volnou tvorbu dává smysl ukázat ucelený celek
/o-mne             Foto, bio, přístup k focení, zkušenosti/reference,
                   technika, odkaz na CV (PDF ke stažení — pro personalisty)
/kontakt           E-mail, telefon (klikací mailto: a tel:), Instagram/LinkedIn,
                   město — žádný formulář
/studio            Sanity Studio (admin, jen pro Petulu)
```

Kategorie (slugy): `reportaz`, `portrety`, `firemni`, `volna-tvorba`.

Navigace: minimalistický header (jméno vlevo, 3 položky vpravo), na mobilu fullscreen menu. Footer: jméno, e-mail, Instagram, © rok.

## 3. Datový model (Sanity schémata)

- **siteSettings** (singleton): název webu, hero fotky, výběr fotek na úvod, kontaktní údaje, sociální sítě, SEO defaulty (OG obrázek, popis).
- **category**: název, slug, pořadí, cover fotka, krátký popis (1–2 věty nad galerií).
- **series** (série/projekt): název, slug, kategorie (reference), rok, popis, cover, pole fotek. Pro portréty/firemní může existovat jedna „průběžná" série na kategorii — frontend pak sérii nezobrazuje jako samostatnou stránku, ale slije fotky do galerie kategorie.
- **photo** (objekt v poli, ne samostatný dokument): image + `alt` (povinné kvůli přístupnosti a SEO) + volitelný popisek + flag „vybrat na úvod".
- **aboutPage** (singleton): portrét, bio (portable text), zkušenosti (pole položek: rok, co, kde), technika, soubor CV (PDF).

Validace ve schématech: povinný alt, povinný cover, limit délky popisů — ať Petula nemůže rozbít layout.

## 4. Design

Směr: **fotky jsou hvězda, web je paspartou**. Minimalismus à la fotografická portfolia (viz reference: stránky fotografů Magnum, formát „bílá galerie").

- Barvy: bílá / téměř černá (#111), žádné akcentní barvy — barvu dodávají fotky. Volitelně tmavý režim podle systému (tmavé pozadí fotkám často sluší — rozhodnout podle jejích fotek).
- Typografie: jeden charakterní font na nadpisy/jméno (např. serif — Fraunces, Libre Caslon) + neutrální sans na text (Inter/Geist). Načítání přes `next/font` (self-hosted, žádný FOUT).
- Grid galerie: **masonry** (CSS columns nebo `react-photo-album`) — zachová poměry stran, míchá landscape/portrait. Mezery velkorysé.
- Lightbox: klik na fotku → fullscreen, šipky/swipe, popisek, ESC.
- Animace: jemný fade-up při scrollu, nic víc. Žádné parallaxy a kurzorové efekty — působí lacině a zdržují.
- Hero na úvodu: jedna silná fotka přes celý viewport, jméno přes ni, scroll indikátor.

## 5. Obrázky a výkon

Kritické — web bude z 95 % obrázky:

- Všechny fotky přes Sanity CDN: automatický formát (AVIF/WebP), responsive šířky přes `next/image` loader pro Sanity.
- **LQIP blur placeholder** z `asset->metadata.lqip` — galerie se „rozostřeně" vykreslí okamžitě.
- Lazy loading všeho pod fold; hero fotka `priority`.
- Do lightboxu vyšší rozlišení (max ~2560px), do gridu max ~1200px.
- Cíl: Lighthouse Performance 90+, LCP < 2 s na 4G.
- Doporučení pro Petulu: nahrávat JPEG max ~4000px delší strana, sRGB (sepsat do předávacího návodu).

## 6. SEO a metadata

- `generateMetadata` per stránka: title `Stránka — Petula Trávníčková | Fotografka`, popisy z CMS.
- OG obrázek (její nejlepší fotka) — důležité, odkaz na portfolio se bude posílat v e-mailech a zprávách, náhled musí vypadat dobře.
- `sitemap.xml`, `robots.txt` (vygenerované Next.js), `/studio` v robots disallow.
- Strukturovaná data: `Person` (jméno, povolání, sociální sítě).
- Alt texty ze Sanity (povinné pole).

## 7. Rendering a deploy

- Stránky staticky generované (SSG), obsah ze Sanity.
- **On-demand revalidace**: Sanity webhook → `/api/revalidate` → změna v CMS je na webu do pár sekund bez redeploye.
- Vercel: propojit GitHub repo, preview deploye na PR, env proměnné (`SANITY_PROJECT_ID`, `SANITY_DATASET`, revalidační secret).
- Doména: **petulatravnickova.vercel.app** — zdarma, stačí pojmenovat Vercel projekt `petulatravnickova`. Vlastní doménu lze kdykoli přidat později bez změn v kódu.

## 8. Fáze realizace

1. **Setup** ✅ — Next.js + Tailwind + Sanity (embedded studio na /studio), schémata, demo data. Zbývá: založit Sanity projekt (sanity.io/manage) a deploy na Vercel.
2. **Design system + layout** ✅ — Fraunces + Inter, header/footer, responzivní layout.
3. **Galerie** ✅ — masonry grid (react-photo-album), lightbox (yet-another-react-lightbox), stránky kategorií se sekcemi sérií, úvod s kurátorským výběrem. Běží na demo fotkách z picsum.
4. **O mně + Kontakt** ✅ — obsahové stránky, CV download, klikací e-mail a telefon.
5. **Obsah** — Petula nahraje fotky do Studia, doladění gridu na reálných fotkách (tohle vždy něco rozbije — počítat s iterací), texty. 
6. **Polish + launch** — SEO, OG obrázky, Lighthouse audit, favicon, 404, doména, analytika. Předání: krátký návod pro Petulu (jak nahrát fotky, jak změnit pořadí, doporučené rozměry).

Hrubý odhad čisté práce na kódu: **2,5–3 dny**, plus čekání na obsah od Petuly.

## 9. Otevřené otázky (před fází 1–2)

- [x] Logo: nemá — jméno „Petula Trávníčková" vysazené typograficky.
- [x] Kontakt: bez formuláře, jen klikací e-mail + telefon.
- [x] Doména: `petulatravnickova.vercel.app` (zdarma, vlastní doménu lze doplnit později).
- [ ] Světlý vs. tmavý základ — rozhodnout až podle vzorku jejích fotek.
- [ ] Série jako samostatné stránky u reportáží — potvrdit, jestli má ucelené reportážní celky, nebo spíš jednotlivé fotky.
- [ ] CV jako PDF — dodá Petula, nebo vytvoříme i to?
- [ ] Konkrétní e-mail a telefon na Petulu (doplní se do Sanity siteSettings).
