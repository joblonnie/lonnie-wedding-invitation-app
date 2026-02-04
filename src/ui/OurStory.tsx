import type { Invitation } from "./invitation/types";
import type { Language } from "./i18n";
import { t } from "./i18n";
import {
  storyContainer,
  coupleNames,
  heart,
  storyText,
  timeline,
  timelineItem,
  timelineLabel,
  timelineValue,
  daysCount,
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

export function OurStory({ invitation, language }: Props) {
  const strings = t(language);
  const { couple, event } = invitation;

  const today = new Date();
  const togetherDays = daysBetween(couple.firstMet, today);
  const daysUntilWedding = daysBetween(today, event.start);
  const isPastWedding = today > event.start;

  return (
    <div className={storyContainer}>
      <h1 className={coupleNames}>
        <span>{couple.groom[language]}</span>
        <span className={heart}>&</span>
        <span>{couple.bride[language]}</span>
      </h1>

      {couple.story && <p className={storyText}>{couple.story[language]}</p>}

      <div className={timeline}>
        <div className={timelineItem}>
          <span className={timelineLabel}>{strings.firstMet}</span>
          <span className={daysCount}>{formatDate(couple.firstMet, language)}</span>
        </div>

        <div className={timelineItem}>
          <span className={timelineLabel}>{strings.togetherFor}</span>
          <span className={daysCount}>
            {togetherDays.toLocaleString()}{strings.days}
          </span>
        </div>

        <div className={timelineItem}>
          <span className={timelineLabel}>{strings.untilWedding}</span>
          <span className={daysCount}>
            {isPastWedding ? "D-Day" : `D-${daysUntilWedding}`}
          </span>
        </div>
      </div>
    </div>
  );
}
