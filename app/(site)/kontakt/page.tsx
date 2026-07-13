import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt na fotografku Petulu Trávníčkovou.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl">Kontakt</h1>
      <div className="mt-12 space-y-6">
        <a
          href={`mailto:${settings.email}`}
          className="block font-display text-2xl underline decoration-line underline-offset-8 transition-colors hover:decoration-foreground sm:text-4xl"
        >
          {settings.email}
        </a>
        {settings.phone && (
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="block font-display text-2xl underline decoration-line underline-offset-8 transition-colors hover:decoration-foreground sm:text-4xl"
          >
            {settings.phone}
          </a>
        )}
      </div>
      <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
        {settings.city && <span>{settings.city}</span>}
        {settings.instagram && (
          <a
            href={settings.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Instagram
          </a>
        )}
        {settings.linkedin && (
          <a
            href={settings.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
