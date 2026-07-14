import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt na fotografku Petulu Trávníčkovou.",
};

/** Velký kontaktní odkaz s animovaným podtržením. */
function ContactLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group relative inline-block break-all font-display text-2xl tracking-tight sm:text-5xl"
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-1.5 left-0 h-px w-full bg-line sm:-bottom-2.5"
      />
      <span
        aria-hidden
        className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-x-100 sm:-bottom-2.5"
      />
    </a>
  );
}

export default async function ContactPage() {
  const settings = await getSettings();
  const socials = [
    settings.instagram && { label: "Instagram", href: settings.instagram },
    settings.linkedin && { label: "LinkedIn", href: settings.linkedin },
  ].filter((s): s is { label: string; href: string } => Boolean(s));

  return (
    <div className="mx-auto flex min-h-[calc(100svh-3.75rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="rise text-[11px] uppercase tracking-[0.3em] text-muted sm:text-xs">
        Kontakt
      </p>
      <h1
        className="rise mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl"
        style={{ animationDelay: "100ms" }}
      >
        Pojďme spolu
        <br />
        <span className="italic">něco nafotit.</span>
      </h1>

      <div className="mt-14 space-y-10 sm:mt-20 sm:space-y-12">
        <div className="rise" style={{ animationDelay: "250ms" }}>
          <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted">
            E-mail
          </p>
          <ContactLink href={`mailto:${settings.email}`}>
            {settings.email}
          </ContactLink>
        </div>

        {settings.phone && (
          <div className="rise" style={{ animationDelay: "350ms" }}>
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted">
              Telefon
            </p>
            <ContactLink href={`tel:${settings.phone.replace(/\s/g, "")}`}>
              {settings.phone}
            </ContactLink>
          </div>
        )}
      </div>

      <div
        className="rise mt-16 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-line pt-6 text-sm text-muted sm:mt-24"
        style={{ animationDelay: "450ms" }}
      >
        {settings.city && <span>{settings.city}</span>}
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group transition-colors hover:text-foreground"
          >
            {social.label}
            <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
