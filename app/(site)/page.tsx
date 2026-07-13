import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Gallery } from "@/components/Gallery";
import { getCategories, getFeaturedPhotos, getSettings } from "@/lib/data";
import { photoSrc } from "@/lib/image";

export default async function HomePage() {
  const [settings, featured, categories] = await Promise.all([
    getSettings(),
    getFeaturedPhotos(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[calc(100svh-3.75rem)] min-h-[420px]">
        <Image
          src={photoSrc(settings.heroPhoto, 2400)}
          alt={settings.heroPhoto.alt}
          fill
          priority
          sizes="100vw"
          placeholder={settings.heroPhoto.lqip ? "blur" : "empty"}
          blurDataURL={settings.heroPhoto.lqip}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-display text-4xl tracking-tight sm:text-6xl">
            Petula Trávníčková
          </h1>
          {settings.tagline && (
            <p className="mt-3 text-sm text-white/85 sm:text-base">
              {settings.tagline}
            </p>
          )}
        </div>
      </section>

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
