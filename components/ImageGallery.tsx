"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [blocker, setBlocker] = useState<{ w: number; h: number } | null>(null);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);

  const closeLightbox = useCallback(() => setLightbox(false), []);

  // Reset the click-blocker whenever the displayed image changes
  useEffect(() => { setBlocker(null); }, [current]);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, images.length, closeLightbox]);

  if (images.length === 0) return null;

  return (
    <>
      <div>
        {/* Main image */}
        <div
          className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg bg-zinc-100"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[current]}
            alt={`${title} - image ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100 transition-opacity ${
                  i === current ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} - thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop — clicking this closes the lightbox */}
          <div className="absolute inset-0 bg-black/90 cursor-pointer" onClick={closeLightbox} />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev / Next arrows — siblings to image, positioned against the outer wrapper */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrent((current - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => setCurrent((current + 1) % images.length)}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Enlarged image */}
          <div
            ref={lightboxContainerRef}
            className="relative z-10 h-[90vh] w-[90vw]"
            onClick={closeLightbox}
          >
            <Image
              src={images[current]}
              alt={`${title} - image ${current + 1}`}
              fill
              className="object-contain pointer-events-none"
              sizes="90vw"
              unoptimized
              onLoad={(e) => {
                const img = e.currentTarget;
                const container = lightboxContainerRef.current;
                if (!container) return;
                const { width: cW, height: cH } = container.getBoundingClientRect();
                const aspect = img.naturalWidth / img.naturalHeight;
                const w = aspect > cW / cH ? cW : cH * aspect;
                const h = aspect > cW / cH ? cW / aspect : cH;
                setBlocker({ w, h });
              }}
            />
            {/* Transparent overlay sized to the visual image — stops clicks on the photo from closing */}
            {blocker && (
              <div
                style={{ width: blocker.w, height: blocker.h }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
