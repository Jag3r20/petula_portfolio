import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Kategorie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresa (slug)",
      description: "Část URL, např. „reportaz“ → /portfolio/reportaz",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Pořadí",
      description: "Nižší číslo = dřív v seznamu.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      title: "Krátký popis",
      description: "1–2 věty, zobrazí se nad galerií.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "cover",
      title: "Úvodní fotka kategorie",
      type: "photo",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Podle pořadí",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "cover" },
  },
});
