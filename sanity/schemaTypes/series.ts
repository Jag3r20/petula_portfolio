import { defineField, defineType } from "sanity";

export const seriesType = defineType({
  name: "series",
  title: "Série fotek",
  type: "document",
  description:
    "Ucelená série (reportáž, projekt) nebo průběžná sbírka fotek v kategorii.",
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
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Rok",
      type: "number",
      validation: (rule) => rule.integer().min(1990).max(2100),
    }),
    defineField({
      name: "order",
      title: "Pořadí v kategorii",
      description: "Nižší číslo = výš na stránce kategorie.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      title: "Popis",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "photos",
      title: "Fotky",
      type: "array",
      of: [{ type: "photo" }],
      options: { layout: "grid" },
      validation: (rule) => rule.min(1),
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
    select: { title: "title", subtitle: "category.title", media: "photos.0" },
  },
});
