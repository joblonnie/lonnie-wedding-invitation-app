import { useState, useCallback } from "react";
import type { Language } from "./i18n";
import type { Invitation } from "./invitation/types";
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
  const photos = invitation.photos;

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div>
      <div className={carouselContainer}>
        <div
          className={carouselTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photos.map((photo, index) => (
            <div key={index} className={carouselSlide}>
              <img
                className={image}
                src={photo.src}
                alt={photo.alt[language]}
                loading="lazy"
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
    </div>
  );
}
