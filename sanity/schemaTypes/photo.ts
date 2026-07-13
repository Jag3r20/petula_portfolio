import { defineField, defineType } from "sanity";

/** Fotografie s povinným alt textem — používá se ve všech galeriích. */
export const photoType = defineType({
  name: "photo",
  title: "Fotografie",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Popis fotky (alt text)",
      description:
        "Krátce popiš, co je na fotce — např. „Nevěsta a ženich při prvním tanci“. Důležité pro vyhledávače a nevidomé návštěvníky.",
      type: "string",
      validation: (rule) => rule.required().error("Popis fotky je povinný."),
    }),
    defineField({
      name: "caption",
      title: "Popisek (volitelný)",
      description: "Zobrazí se pod fotkou ve zvětšeném náhledu.",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Zobrazit na úvodní stránce",
      description: "Zapni u ~12 nejlepších fotek napříč kategoriemi.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
