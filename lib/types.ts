export type Photo = {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  lqip?: string;
};

export type Category = {
  title: string;
  slug: string;
  description?: string;
  cover: Photo;
};

export type Series = {
  title: string;
  slug: string;
  year?: number;
  description?: string;
  photos: Photo[];
};

export type CategoryWithSeries = {
  category: Category;
  series: Series[];
};

export type SiteSettings = {
  tagline?: string;
  heroPhoto: Photo;
  intro?: string;
  email: string;
  phone?: string;
  instagram?: string;
  linkedin?: string;
  city?: string;
  seoDescription?: string;
};

export type ExperienceItem = {
  period?: string;
  role?: string;
  place?: string;
};

export type AboutPage = {
  portrait: Photo;
  /** Portable text bloky ze Sanity; v demo režimu prosté odstavce. */
  bio: unknown[] | string[];
  experience?: ExperienceItem[];
  gear?: string[];
  cvUrl?: string;
};
