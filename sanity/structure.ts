import type { StructureResolver } from "sanity/structure";

/** Singletony (nastavení, o mně) nahoře, pak obsah. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Obsah")
    .items([
      S.listItem()
        .title("Nastavení webu")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Stránka O mně")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("category").title("Kategorie"),
      S.documentTypeListItem("series").title("Série fotek"),
    ]);
