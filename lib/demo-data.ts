import type {
  AboutPage,
  Category,
  CategoryWithSeries,
  Photo,
  SiteSettings,
} from "./types";

/**
 * Zástupný obsah pro vývoj — používá se, dokud není nastavené Sanity
 * (NEXT_PUBLIC_SANITY_PROJECT_ID). Fotky z picsum.photos.
 */

function demoPhoto(seed: string, width: number, height: number, alt: string): Photo {
  return {
    url: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    width,
    height,
    alt,
  };
}

const demoSets: Record<string, [number, number][]> = {
  reportaz: [
    [1600, 1067],
    [1067, 1600],
    [1600, 1067],
    [1600, 1200],
    [1067, 1600],
    [1600, 1067],
    [1600, 900],
    [1200, 1600],
  ],
  portrety: [
    [1067, 1600],
    [1067, 1600],
    [1600, 1067],
    [1200, 1600],
    [1067, 1600],
    [1600, 1200],
  ],
  firemni: [
    [1600, 1067],
    [1600, 1067],
    [1067, 1600],
    [1600, 900],
    [1600, 1067],
  ],
  "volna-tvorba": [
    [1600, 1600],
    [1067, 1600],
    [1600, 1067],
    [1200, 1600],
    [1600, 1200],
    [1600, 1067],
  ],
};

function photosFor(slug: string): Photo[] {
  return (demoSets[slug] ?? []).map(([w, h], i) =>
    demoPhoto(`${slug}-${i}`, w, h, `Ukázková fotografie — ${slug} ${i + 1}`),
  );
}

export const demoCategories: Category[] = [
  {
    title: "Reportáž",
    slug: "reportaz",
    description: "Události, akce a okamžiky tak, jak se skutečně staly.",
    cover: demoPhoto("reportaz-cover", 1600, 1067, "Reportážní fotografie"),
  },
  {
    title: "Portréty",
    slug: "portrety",
    description: "Portréty a rodinné focení v přirozeném světle.",
    cover: demoPhoto("portrety-cover", 1067, 1600, "Portrétní fotografie"),
  },
  {
    title: "Firemní & branding",
    slug: "firemni",
    description: "Firemní portréty a fotografie pro značky a sociální sítě.",
    cover: demoPhoto("firemni-cover", 1600, 1067, "Firemní fotografie"),
  },
  {
    title: "Volná tvorba",
    slug: "volna-tvorba",
    description: "Autorské projekty a experimenty.",
    cover: demoPhoto("volna-cover", 1600, 1600, "Volná tvorba"),
  },
];

export function demoCategoryWithSeries(slug: string): CategoryWithSeries | null {
  const category = demoCategories.find((c) => c.slug === slug);
  if (!category) return null;
  return {
    category,
    series: [
      {
        title: category.title,
        slug: `${slug}-vyber`,
        photos: photosFor(slug),
      },
    ],
  };
}

export const demoFeaturedPhotos: Photo[] = [
  ...photosFor("reportaz").slice(0, 3),
  ...photosFor("portrety").slice(0, 3),
  ...photosFor("firemni").slice(0, 3),
  ...photosFor("volna-tvorba").slice(0, 3),
];

export const demoSettings: SiteSettings = {
  tagline: "fotografka — reportáž · portréty · volná tvorba",
  heroPhoto: demoPhoto("hero", 2400, 1350, "Úvodní fotografie"),
  intro:
    "Fotím lidi a okamžiky — reportáže, portréty a příběhy značek. Tohle je výběr z mé práce.",
  email: "petula@example.com",
  phone: "+420 777 000 000",
  instagram: "https://instagram.com/",
  city: "Praha",
  seoDescription:
    "Portfolio fotografky Petuly Trávníčkové — reportáž, portréty, firemní fotografie a volná tvorba.",
};

export const demoAbout: AboutPage = {
  portrait: demoPhoto("portrait", 1200, 1600, "Petula Trávníčková"),
  bio: [
    "Jmenuju se Petula Trávníčková a fotím všechno, co má příběh — lidi, události i značky. Nejraději pracuju s přirozeným světlem a čekám na okamžiky, které se nedají naaranžovat.",
    "K fotografii jsem se dostala přes reportáž a dodnes je to způsob, jakým přemýšlím i o portrétech: míň pózování, víc pozorování.",
  ],
  experience: [
    { period: "2023–dosud", role: "Fotografka na volné noze", place: "Praha" },
    { period: "2021–2023", role: "Reportážní fotografie", place: "—" },
  ],
  gear: ["Doplní se…"],
};
