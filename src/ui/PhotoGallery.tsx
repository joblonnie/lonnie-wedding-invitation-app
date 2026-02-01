import type { Language } from "./i18n";
import type { Invitation } from "./invitation/types";
import { grid, image } from "./PhotoGallery.css";

export function PhotoGallery({
  invitation,
  language,
}: {
  invitation: Invitation;
  language: Language;
}) {
  return (
    <div className={grid}>
      {invitation.photos.map((p) => (
        <img
          key={p.src}
          className={image}
          src={p.src}
          alt={p.alt[language]}
          loading="lazy"
        />
      ))}
    </div>
  );
}

