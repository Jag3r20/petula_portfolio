import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/data";

const BASE = "https://petulatravnickova.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/portfolio`, priority: 0.9 },
    ...categories.map((c) => ({
      url: `${BASE}/portfolio/${c.slug}`,
      priority: 0.8,
    })),
    { url: `${BASE}/o-mne`, priority: 0.7 },
    { url: `${BASE}/kontakt`, priority: 0.7 },
  ];
}
