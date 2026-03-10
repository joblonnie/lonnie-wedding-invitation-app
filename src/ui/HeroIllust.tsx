import type { Language } from "./i18n";
import type { Invitation } from "./invitation/types";
import { heroContainer, heroFrame, heroContent, heroNames, heroAmp, heroDateText, heroVenueText } from "./HeroIllust.css";

type Props = {
  invitation: Invitation;
  language: Language;
};

export function HeroIllust({ invitation, language }: Props) {
  const { couple, event } = invitation;

  return (
    <div className={heroContainer}>
      <div className={heroFrame}>
        {/* Botanical wreath frame */}
        <svg
          viewBox="0 0 360 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {/* Top center leaf cluster */}
          <g opacity="0.55">
            <path d="M180 28c-6-14-22-20-30-14 10 2 20 10 26 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M180 28c6-14 22-20 30-14-10 2-20 10-26 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M170 22c-3-10-14-18-22-14 8 1 14 8 18 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M190 22c3-10 14-18 22-14-8 1-14 8-18 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            {/* Small berries */}
            <circle cx="148" cy="14" r="2.5" stroke="currentColor" strokeWidth="1" />
            <circle cx="153" cy="10" r="2" stroke="currentColor" strokeWidth="1" />
            <circle cx="212" cy="14" r="2.5" stroke="currentColor" strokeWidth="1" />
            <circle cx="207" cy="10" r="2" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* Left vine */}
          <g opacity="0.4">
            <path d="M68 60c-10 30-20 70-22 120s4 90 20 140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Leaves on left vine */}
            <path d="M62 90c-12-4-20 2-18 10 6-2 14-4 18-10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M52 140c-14 0-20 8-16 16 6-4 14-8 16-16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M48 190c-12 4-16 14-10 20 4-6 10-12 10-20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M52 240c-14 2-18 12-12 18 4-6 12-10 12-18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M60 290c-12 6-14 16-8 22 2-6 8-14 8-22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            {/* Small buds */}
            <circle cx="44" cy="165" r="2" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="215" r="1.5" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="55" cy="265" r="2" stroke="currentColor" strokeWidth="0.8" />
          </g>

          {/* Right vine */}
          <g opacity="0.4">
            <path d="M292 60c10 30 20 70 22 120s-4 90-20 140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Leaves on right vine */}
            <path d="M298 90c12-4 20 2 18 10-6-2-14-4-18-10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M308 140c14 0 20 8 16 16-6-4-14-8-16-16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M312 190c12 4 16 14 10 20-4-6-10-12-10-20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M308 240c14 2 18 12 12 18-4-6-12-10-12-18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M300 290c12 6 14 16 8 22-2-6-8-14-8-22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            {/* Small buds */}
            <circle cx="316" cy="165" r="2" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="310" cy="215" r="1.5" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="305" cy="265" r="2" stroke="currentColor" strokeWidth="0.8" />
          </g>

          {/* Bottom center floral */}
          <g opacity="0.45">
            <path d="M140 410c10-8 24-12 40-12s30 4 40 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M160 406c-8 4-12 12-8 18 4-4 8-10 8-18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M200 406c8 4 12 12 8 18-4-4-8-10-8-18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M175 402c-4 6-4 14 2 18 0-6 2-12-2-18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M185 402c4 6 4 14-2 18 0-6-2-12 2-18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <circle cx="150" cy="414" r="2" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="210" cy="414" r="2" stroke="currentColor" strokeWidth="0.8" />
          </g>

          {/* Corner accents - top left */}
          <g opacity="0.3">
            <path d="M90 44c-8-6-18-4-20 4 8-2 16 0 20-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M100 38c-4-10-14-12-18-4 6 0 14 2 18 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Corner accents - top right */}
          <g opacity="0.3">
            <path d="M270 44c8-6 18-4 20 4-8-2-16 0-20-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M260 38c4-10 14-12 18-4-6 0-14 2-18 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Delicate dots scattered */}
          <circle cx="100" cy="70" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="260" cy="75" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="85" cy="340" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="275" cy="335" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="120" cy="395" r="1" fill="currentColor" opacity="0.12" />
          <circle cx="240" cy="390" r="1" fill="currentColor" opacity="0.12" />
        </svg>

        {/* Content overlay */}
        <div className={heroContent}>
          <p className={heroNames}>
            {couple.groom[language]}
            <span className={heroAmp}>&</span>
            {couple.bride[language]}
          </p>
          <p className={heroDateText}>{event.whenText[language]}</p>
          <p className={heroVenueText}>{event.whereText[language]}</p>
        </div>
      </div>
    </div>
  );
}
