import type { Photo } from "./types";

/**
 * URL fotky v požadované šířce. Sanity CDN umí ořez a formát přes
 * query parametry; demo fotky (picsum) vracíme beze změny.
 */
export function photoSrc(photo: Photo, width: number): string {
  if (photo.url.includes("cdn.sanity.io")) {
    return `${photo.url}?w=${width}&auto=format&q=80`;
  }
  return photo.url;
}
