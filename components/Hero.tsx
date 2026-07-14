"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { photoSrc } from "@/lib/image";
import type { Photo } from "@/lib/types";

const SLIDE_MS = 6000;

/**
 * Úvodní hero: pomalá crossfade slideshow fotek s jemným Ken Burns zoomem,
 * jméno vysazené editorialově u spodního okraje. Animace čistě v CSS
 * (globals.css), respektují prefers-reduced-motion.
 */
export function Hero({
  photos,
  tagline,
}: {
  photos: Photo[];
  tagline?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % photos.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <section className="relative h-[calc(100svh-3.75rem)] min-h-[480px] overflow-hidden bg-foreground">
      {/* Slideshow */}
      {photos.map((photo, i) => (
        <div
          key={photo.url}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={photoSrc(photo, 2400)}
            alt={photo.alt}
            fill
            preload={i === 0}
            sizes="100vw"
            placeholder={photo.lqip ? "blur" : "empty"}
            blurDataURL={photo.lqip}
            className="hero-kenburns object-cover"
          />
        </div>
      ))}

      {/* Overlay pro čitelnost textu */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />

      {/* Obsah */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 text-white">
          <div>
            {tagline && (
              <p className="rise mb-4 text-[11px] uppercase tracking-[0.3em] text-white/75 sm:text-xs">
                {tagline}
              </p>
            )}
            <h1 className="font-display leading-[0.95] tracking-tight">
              <span
                className="rise block text-[clamp(2.75rem,9vw,7rem)]"
                style={{ animationDelay: "150ms" }}
              >
                Petula
              </span>
              <span
                className="rise block italic text-[clamp(2.75rem,9vw,7rem)]"
                style={{ animationDelay: "300ms" }}
              >
                Trávníčková
              </span>
            </h1>
          </div>

          <div
            className="rise hidden flex-col items-end gap-8 sm:flex"
            style={{ animationDelay: "450ms" }}
          >
            {photos.length > 1 && (
              <div className="flex gap-2" role="tablist" aria-label="Fotky v úvodu">
                {photos.map((photo, i) => (
                  <button
                    key={photo.url}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Fotka ${i + 1} z ${photos.length}`}
                    aria-current={i === active}
                    className={`h-px w-8 transition-colors duration-500 ${
                      i === active ? "bg-white" : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
            <div className="hero-scroll-line" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
