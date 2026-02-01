import type { Language } from "./i18n";
import { t } from "./i18n";
import type { Invitation } from "./invitation/types";
import { frame, mapWrap, metaRow, metaKey, metaValue, openLink } from "./MapSection.css";

function buildGoogleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function MapSection({
  invitation,
  language,
}: {
  invitation: Invitation;
  language: Language;
}) {
  const strings = t(language);

  return (
    <div>
      <div className={metaRow}>
        <div className={metaKey}>{strings.address}</div>
        <div className={metaValue}>{invitation.event.addressText[language]}</div>
      </div>

      <div className={mapWrap}>
        <iframe
          className={frame}
          title="Map"
          src={invitation.event.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a className={openLink} href={buildGoogleMapsUrl(invitation.event.mapQuery)} target="_blank" rel="noreferrer">
        {strings.openInMaps}
      </a>
    </div>
  );
}

