import { client } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import {
  aboutQuery,
  categoriesQuery,
  categoryQuery,
  featuredPhotosQuery,
  seriesByCategoryQuery,
  settingsQuery,
} from "@/sanity/queries";
import {
  demoAbout,
  demoCategories,
  demoCategoryWithSeries,
  demoFeaturedPhotos,
  demoSettings,
} from "./demo-data";
import type {
  AboutPage,
  Category,
  CategoryWithSeries,
  Photo,
  SiteSettings,
} from "./types";

/**
 * Datová vrstva: čte ze Sanity; bez nakonfigurovaného projektu
 * (NEXT_PUBLIC_SANITY_PROJECT_ID) NEBO dokud je dataset prázdný
 * vrací demo obsah — web tak nikdy není poloprázdný.
 */

export async function getSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) return demoSettings;
  const settings = await client.fetch(settingsQuery);
  return (settings as SiteSettings | null) ?? demoSettings;
}

export async function getCategories(): Promise<Category[]> {
  if (!sanityConfigured) return demoCategories;
  const categories = (await client.fetch(categoriesQuery)) as Category[] | null;
  return categories?.length ? categories : demoCategories;
}

export async function getCategoryWithSeries(
  slug: string,
): Promise<CategoryWithSeries | null> {
  if (!sanityConfigured) return demoCategoryWithSeries(slug);
  const [category, series] = await Promise.all([
    client.fetch(categoryQuery, { slug }),
    client.fetch(seriesByCategoryQuery, { slug }),
  ]);
  if (!category) return demoCategoryWithSeries(slug);
  return {
    category: category as Category,
    series: (series ?? []) as CategoryWithSeries["series"],
  };
}

export async function getFeaturedPhotos(): Promise<Photo[]> {
  if (!sanityConfigured) return demoFeaturedPhotos;
  const photos = await client.fetch(featuredPhotosQuery);
  const valid = ((photos ?? []) as Photo[]).filter((p) => p?.url);
  return valid.length ? valid : demoFeaturedPhotos;
}

export async function getAbout(): Promise<AboutPage> {
  if (!sanityConfigured) return demoAbout;
  const about = await client.fetch(aboutQuery);
  return (about as AboutPage | null) ?? demoAbout;
}
