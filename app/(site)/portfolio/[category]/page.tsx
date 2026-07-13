import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { getCategories, getCategoryWithSeries } from "@/lib/data";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const data = await getCategoryWithSeries(slug);
  if (!data) return {};
  return {
    title: data.category.title,
    description: data.category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const data = await getCategoryWithSeries(slug);
  if (!data) notFound();

  const { category, series } = data;
  const multipleSeries = series.length > 1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl">{category.title}</h1>
      {category.description && (
        <p className="mt-3 max-w-xl text-muted">{category.description}</p>
      )}
      <div className="mt-10 space-y-16">
        {series.map((s) => (
          <section key={s.slug}>
            {multipleSeries && (
              <div className="mb-6">
                <h2 className="font-display text-xl sm:text-2xl">
                  {s.title}
                  {s.year && (
                    <span className="ml-2 text-base text-muted">{s.year}</span>
                  )}
                </h2>
                {s.description && (
                  <p className="mt-2 max-w-xl text-sm text-muted">
                    {s.description}
                  </p>
                )}
              </div>
            )}
            <Gallery photos={s.photos} />
          </section>
        ))}
      </div>
    </div>
  );
}
