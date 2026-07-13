export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-07-01";

/** True, když je nakonfigurovaný Sanity projekt — jinak web běží na demo datech. */
export const sanityConfigured = projectId.length > 0;
