import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { getCategories, getFeaturedPhotos, getSettings } from "@/lib/data";

export default async function HomePage() {
  const [settings, featured, categories] = await Promise.all([
    getSettings(),
    getFeaturedPhotos(),
    getCategories(),
  ]);

  // Slideshow v hero: hero fotka + pár vybraných na šířku (portréty se
  // na fullscreen nehodí), bez duplicit.
  const heroPhotos = [
    settings.heroPhoto,
    ...featured.filter((p) => p.width >= p.height).slice(0, 3),
  ].filter(
    (photo, i, all) => all.findIndex((p) => p.url === photo.url) === i,
  );

  return (
    <>
      <Hero photos={heroPhotos} tagline={settings.tagline} />

      {/* Intro */}
      {settings.intro && (
        <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="text-lg leading-relaxed text-muted">{settings.intro}</p>
        </section>
      )}

      {/* Výběr fotek */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 font-display text-2xl sm:text-3xl">Výběr</h2>
          <Gallery photos={featured} />
        </section>
      )}

      {/* Kategorie */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-2xl sm:text-3xl">Portfolio</h2>
          <Link href="/portfolio" className="text-sm text-muted hover:text-foreground">
            Vše →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </>
  );
}
