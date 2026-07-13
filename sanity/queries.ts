import { defineQuery } from "next-sanity";

/** Projekce fotky: URL + rozměry + LQIP placeholder z metadat. */
const PHOTO = /* groq */ `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  alt,
  caption
}`;

export const settingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    tagline,
    "heroPhoto": heroPhoto${PHOTO},
    intro,
    email,
    phone,
    instagram,
    linkedin,
    city,
    seoDescription
  }
`);

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(order asc){
    title,
    "slug": slug.current,
    description,
    "cover": cover${PHOTO}
  }
`);

export const categoryQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description,
    "cover": cover${PHOTO}
  }
`);

export const seriesByCategoryQuery = defineQuery(`
  *[_type == "series" && category->slug.current == $slug]
    | order(order asc, year desc){
    title,
    "slug": slug.current,
    year,
    description,
    "photos": photos[]${PHOTO}
  }
`);

export const featuredPhotosQuery = defineQuery(`
  *[_type == "series"]{
    "photos": photos[featured == true]${PHOTO}
  }.photos[]
`);

export const aboutQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    "portrait": portrait${PHOTO},
    bio,
    experience,
    gear,
    "cvUrl": cvFile.asset->url
  }
`);
