import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Fotografické portfolio — reportáž, portréty, firemní fotografie a volná tvorba.",
};

export default async function PortfolioPage() {
  const categories = await getCategories();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-10 font-display text-3xl sm:text-4xl">Portfolio</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
