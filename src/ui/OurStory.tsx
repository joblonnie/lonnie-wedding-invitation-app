import type { Invitation } from "./invitation/types";
import type { Language } from "./i18n";
import { t } from "./i18n";
import {
  storyContainer,
  coupleNames,
  heart,
  storyText,
  timeline,
  timelineLine,
  timelineItem,
  timelineDot,
  timelineLabel,
  daysCount,
  decoSvg,
} from "./OurStory.css";

type Props = {
  invitation: Invitation;
  language: Language;
};

function formatDate(date: Date, language: Language): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (language === "ko") return `${year}. ${month}. ${day}`;
  if (language === "zh") return `${year}年${month}月${day}日`;
  return `${date.toLocaleDateString("en-US", { month: "short" })} ${day}, ${year}`;
}

function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
}

function LeafDeco() {
  return (
    <svg className={decoSvg} viewBox="0 0 60 24" fill="none">
      <path d="M10 12c6-10 18-10 20-2-4 1-14 4-20 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M50 12c-6-10-18-10-20-2 4 1 14 4 20 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M20 10c4 3 12 3 20 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function OurStory({ invitation, language }: Props) {
  const strings = t(language);
  const { couple, event } = invitation;

  const today = new Date();
  const togetherDays = daysBetween(couple.firstMet, today);
  const daysUntilWedding = daysBetween(today, event.start);
  const isPastWedding = today > event.start;

  return (
    <div className={storyContainer}>
      <LeafDeco />

      <h1 className={coupleNames}>
        <span>{couple.groom[language]}</span>
        <span className={heart}>&</span>
        <span>{couple.bride[language]}</span>
      </h1>

      {couple.story && <p className={storyText}>{couple.story[language]}</p>}

      <LeafDeco />

      <div className={timeline}>
        <div className={timelineLine} />

        <div className={timelineItem}>
          <div className={timelineDot} />
          <span className={timelineLabel}>{strings.firstMet}</span>
          <span className={daysCount}>{formatDate(couple.firstMet, language)}</span>
        </div>

        <div className={timelineItem}>
          <div className={timelineDot} />
          <span className={timelineLabel}>{strings.togetherFor}</span>
          <span className={daysCount}>
            {togetherDays.toLocaleString()}{strings.days}
          </span>
        </div>

        <div className={timelineItem}>
          <div className={timelineDot} />
          <span className={timelineLabel}>{strings.untilWedding}</span>
          <span className={daysCount}>
            {isPastWedding ? "D-Day" : `D-${daysUntilWedding}`}
          </span>
        </div>
      </div>
    </div>
  );
}
