import { useState, useCallback, useRef } from "react";
import type { Language } from "./i18n";
import type { Invitation } from "./invitation/types";
import { Lightbox } from "./Lightbox";
import {
  carouselContainer,
  carouselTrack,
  carouselSlide,
  image,
  carouselNav,
  navPrev,
  navNext,
  indicators,
  indicator,
  indicatorActive,
} from "./PhotoGallery.css";

export function PhotoGallery({
  invitation,
  language,
}: {
  invitation: Invitation;
  language: Language;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = invitation.photos;

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchDelta = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
    isDragging.current = true;
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.touches[0].clientX - touchStartX.current;
      touchDelta.current = delta;
      if (trackRef.current) {
        const base = -currentIndex * 100;
        const pct = (delta / trackRef.current.parentElement!.offsetWidth) * 100;
        trackRef.current.style.transform = `translateX(${base + pct}%)`;
      }
    },
    [currentIndex]
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.4s ease";
    }
    if (Math.abs(touchDelta.current) > 50) {
      if (touchDelta.current > 0) goToPrev();
      else goToNext();
    } else {
      // Snap back
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }
    touchStartX.current = null;
    touchDelta.current = 0;
  }, [currentIndex, goToPrev, goToNext]);

  return (
    <div>
      <div className={carouselContainer}>
        <div
          ref={trackRef}
          className={carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.4s ease",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className={carouselSlide}
              onClick={() => setLightboxIndex(index)}
            >
              <img
                className={image}
                src={photo.src}
                alt={photo.alt[language]}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${carouselNav} ${navPrev}`}
          onClick={goToPrev}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          type="button"
          className={`${carouselNav} ${navNext}`}
          onClick={goToNext}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className={indicators}>
        {photos.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${indicator} ${index === currentIndex ? indicatorActive : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos.map((p) => ({ src: p.src, alt: p.alt[language] }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
