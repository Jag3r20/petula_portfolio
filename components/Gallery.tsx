"use client";

import { useState } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { photoSrc } from "@/lib/image";
import type { Photo } from "@/lib/types";

/** Masonry galerie s lightboxem (šipky, swipe, popisky). */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);

  const albumPhotos = photos.map((p) => ({
    src: photoSrc(p, 1200),
    width: p.width,
    height: p.height,
    alt: p.alt,
  }));

  const slides = photos.map((p) => ({
    src: photoSrc(p, 2560),
    width: p.width,
    height: p.height,
    alt: p.alt,
    description: p.caption,
  }));

  return (
    <>
      <MasonryPhotoAlbum
        photos={albumPhotos}
        columns={(width) => (width < 640 ? 1 : width < 1024 ? 2 : 3)}
        spacing={16}
        onClick={({ index: i }) => setIndex(i)}
      />
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions]}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
