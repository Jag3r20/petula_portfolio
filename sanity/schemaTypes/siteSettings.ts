import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Nastavení webu",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Podtitulek",
      description: "Krátce pod jménem na úvodu, např. „fotografka — reportáž, portréty, volná tvorba“.",
      type: "string",
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "heroPhoto",
      title: "Hlavní fotka na úvodu",
      description: "Silná fotka na šířku, přes celou obrazovku.",
      type: "photo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Uvítací text",
      description: "Pár vět o tobě na úvodní stránce.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      description: "Např. +420 777 123 456",
      type: "string",
    }),
    defineField({ name: "instagram", title: "Instagram (celá adresa)", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn (celá adresa)", type: "url" }),
    defineField({ name: "city", title: "Město", type: "string" }),
    defineField({
      name: "seoDescription",
      title: "Popis webu pro vyhledávače",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Nastavení webu" }),
  },
});
