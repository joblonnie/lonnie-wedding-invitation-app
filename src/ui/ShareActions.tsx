import { useState } from "react";
import { type Language, t } from "./i18n";
import { downloadIcs } from "./calendar/downloadIcs";
import { actionRow, actionButton } from "./ShareActions.css";
import type { Invitation } from "./invitation/types";
import { ShareModal } from "./ShareModal";

function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildGoogleCalendarUrl(
  title: string,
  start: Date,
  end: Date,
  location: string,
  description: string
): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatDateForGoogle(start)}/${formatDateForGoogle(end)}`,
    location,
    details: description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function ShareActions({
  invitation,
  language,
  onBulkShare,
  onAccountInfo,
}: {
  invitation: Invitation;
  language: Language;
  onBulkShare?: () => void;
  onAccountInfo?: () => void;
}) {
  const strings = t(language);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = async (recipientName: string) => {
    setShowShareModal(false);

    // Build URL with recipient name
    const url = new URL(window.location.href);
    if (recipientName) {
      url.searchParams.set("to", recipientName);
    }
    const shareUrl = url.toString();

    const title = invitation.meta.title[language];
    const text = invitation.meta.description[language];

    if (navigator.share) {
      await navigator.share({ title, text, url: shareUrl });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    alert(strings.copiedLink);
  };

  return (
    <>
      <div className={actionRow}>
        <button
          className={actionButton}
          type="button"
          onClick={() => {
            downloadIcs({
              title: invitation.meta.title[language],
              start: invitation.event.start,
              end: invitation.event.end,
              location: invitation.event.locationIcs,
              description: invitation.meta.description[language],
            });
          }}
        >
          {strings.addToCalendar}
        </button>

        <a
          className={actionButton}
          href={buildGoogleCalendarUrl(
            invitation.meta.title[language],
            invitation.event.start,
            invitation.event.end,
            invitation.event.locationIcs,
            invitation.meta.description[language]
          )}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          {strings.googleCalendar}
        </a>

        <button
          className={actionButton}
          type="button"
          onClick={() => setShowShareModal(true)}
        >
          {strings.share}
        </button>

        {onAccountInfo && (
          <button
            className={actionButton}
            type="button"
            onClick={onAccountInfo}
          >
            {strings.accountInfo}
          </button>
        )}

        {onBulkShare && (
          <button
            className={actionButton}
            type="button"
            onClick={onBulkShare}
          >
            {strings.bulkShare}
          </button>
        )}
      </div>

      {showShareModal && (
        <ShareModal
          language={language}
          onClose={() => setShowShareModal(false)}
          onShare={handleShare}
        />
      )}
    </>
  );
}
