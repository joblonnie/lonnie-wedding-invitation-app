import { type Language, t } from "./i18n";
import { downloadIcs } from "./calendar/downloadIcs";
import { actionRow, actionButton } from "./ShareActions.css";
import type { Invitation } from "./invitation/types";

export function ShareActions({
  invitation,
  language,
}: {
  invitation: Invitation;
  language: Language;
}) {
  const strings = t(language);

  return (
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

      <button
        className={actionButton}
        type="button"
        onClick={async () => {
          const url = window.location.href;
          const title = invitation.meta.title[language];
          const text = invitation.meta.description[language];

          if (navigator.share) {
            await navigator.share({ title, text, url });
            return;
          }

          await navigator.clipboard.writeText(url);
          alert(strings.copiedLink);
        }}
      >
        {strings.share}
      </button>
    </div>
  );
}

