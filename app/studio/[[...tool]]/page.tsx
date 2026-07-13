import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { sanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-2xl">Administrace zatím neběží</h1>
        <p className="max-w-md text-sm text-muted">
          Chybí nastavení Sanity projektu (NEXT_PUBLIC_SANITY_PROJECT_ID).
          Postup je popsaný v README v sekci „Napojení Sanity“.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
