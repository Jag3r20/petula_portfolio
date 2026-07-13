import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Stránka O mně",
  type: "document",
  fields: [
    defineField({
      name: "portrait",
      title: "Portrét",
      type: "photo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "O mně",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "experience",
      title: "Zkušenosti",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "period", title: "Období", type: "string" }),
            defineField({ name: "role", title: "Co", type: "string" }),
            defineField({ name: "place", title: "Kde", type: "string" }),
          ],
          preview: {
            select: { title: "role", subtitle: "period" },
          },
        },
      ],
    }),
    defineField({
      name: "gear",
      title: "Technika",
      description: "Volitelné — s čím fotíš.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cvFile",
      title: "CV ke stažení (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Stránka O mně" }),
  },
});
