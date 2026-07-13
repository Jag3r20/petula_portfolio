import type { Metadata } from "next";
import Image from "next/image";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { getAbout } from "@/lib/data";
import { photoSrc } from "@/lib/image";

export const metadata: Metadata = {
  title: "O mně",
  description: "Kdo je Petula Trávníčková — fotografka.",
};

export default async function AboutPage() {
  const about = await getAbout();
  const bioIsPlainText = about.bio.every((b) => typeof b === "string");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-10 font-display text-3xl sm:text-4xl">O mně</h1>
      <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
        <div className="relative aspect-[3/4] overflow-hidden bg-line">
          <Image
            src={photoSrc(about.portrait, 1200)}
            alt={about.portrait.alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            placeholder={about.portrait.lqip ? "blur" : "empty"}
            blurDataURL={about.portrait.lqip}
            className="object-cover"
          />
        </div>
        <div>
          <div className="space-y-4 text-lg leading-relaxed">
            {bioIsPlainText ? (
              (about.bio as string[]).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))
            ) : (
              <PortableText value={about.bio as PortableTextBlock[]} />
            )}
          </div>

          {about.experience && about.experience.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 font-display text-xl">Zkušenosti</h2>
              <ul className="space-y-3 border-t border-line">
                {about.experience.map((item) => (
                  <li
                    key={`${item.period}-${item.role}`}
                    className="grid gap-x-6 border-b border-line py-3 text-sm sm:grid-cols-[8rem_1fr]"
                  >
                    <span className="text-muted">{item.period}</span>
                    <span>
                      {item.role}
                      {item.place && item.place !== "—" && (
                        <span className="text-muted"> · {item.place}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {about.gear && about.gear.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-3 font-display text-xl">Technika</h2>
              <p className="text-sm text-muted">{about.gear.join(" · ")}</p>
            </section>
          )}

          {about.cvUrl && (
            <a
              href={about.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-12 inline-block border border-foreground px-6 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              Stáhnout CV (PDF)
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
