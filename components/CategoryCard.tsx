import Image from "next/image";
import Link from "next/link";
import { photoSrc } from "@/lib/image";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/portfolio/${category.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden bg-line"
    >
      <Image
        src={photoSrc(category.cover, 1600)}
        alt={category.cover.alt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        placeholder={category.cover.lqip ? "blur" : "empty"}
        blurDataURL={category.cover.lqip}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
      <div className="absolute bottom-0 left-0 p-5 text-white">
        <h2 className="font-display text-2xl">{category.title}</h2>
        {category.description && (
          <p className="mt-1 max-w-xs text-sm text-white/80">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
