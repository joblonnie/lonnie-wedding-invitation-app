import { useState, useCallback, useEffect, useRef } from "react";
import {
  overlay,
  imageWrapper,
  lightboxImage,
  navButton,
  navPrev,
  navNext,
  closeButton,
  counter,
} from "./Lightbox.css";

type Props = {
  photos: Array<{ src: string; alt: string }>;
  initialIndex: number;
  onClose: () => void;
};

export function Lightbox({ photos, initialIndex, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastTapRef = useRef(0);

  const goToPrev = useCallback(() => {
    setScale(1);
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setScale(1);
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goToPrev, goToNext]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - touchStartRef.current.x;
      const deltaY = endY - touchStartRef.current.y;

      // Swipe down to close
      if (deltaY > 80 && Math.abs(deltaX) < 50) {
        onClose();
        touchStartRef.current = null;
        return;
      }

      // Horizontal swipe
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) goToPrev();
        else goToNext();
      }

      // Double tap zoom
      const now = Date.now();
      if (now - lastTapRef.current < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        setScale((s) => (s === 1 ? 2 : 1));
      }
      lastTapRef.current = now;

      touchStartRef.current = null;
    },
    [onClose, goToPrev, goToNext]
  );

  const photo = photos[currentIndex];

  return (
    <div className={overlay}>
      <button type="button" className={closeButton} onClick={onClose}>
        ✕
      </button>

      <div
        className={imageWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button type="button" className={`${navButton} ${navPrev}`} onClick={goToPrev}>
          ‹
        </button>

        <img
          className={lightboxImage}
          src={photo.src}
          alt={photo.alt}
          style={{ transform: `scale(${scale})` }}
          draggable={false}
        />

        <button type="button" className={`${navButton} ${navNext}`} onClick={goToNext}>
          ›
        </button>
      </div>

      <span className={counter}>
        {currentIndex + 1} / {photos.length}
      </span>
    </div>
  );
}
