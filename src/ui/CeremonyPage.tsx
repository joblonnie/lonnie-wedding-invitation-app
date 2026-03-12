import type { Language } from "./i18n";
import type { Invitation } from "./invitation/types";
import {
  container,
  infoCard,
  infoLabel,
  infoDate,
  infoVenue,
  infoAddress,
  dividerDeco,
  orderSection,
  orderTitle,
  orderList,
  orderLine,
  orderItem,
  orderDot,
  orderText,
  orderTime,
} from "./CeremonyPage.css";
import { t } from "./i18n";

type Props = {
  invitation: Invitation;
  language: Language;
};

function DecoLine() {
  return (
    <svg className={dividerDeco} viewBox="0 0 50 12" fill="none">
      <path d="M5 6c8-5 14-3 20 0s12 5 20 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

type CeremonyStep = {
  label: { ko: string; en: string; zh: string };
  time?: string;
};

const CEREMONY_ORDER: CeremonyStep[] = [
  { label: { ko: "개식", en: "Opening", zh: "开始" } },
  { label: { ko: "신랑 입장", en: "Groom's Entrance", zh: "新郎入场" } },
  { label: { ko: "신부 입장", en: "Bride's Entrance", zh: "新娘入场" } },
  { label: { ko: "혼인 서약", en: "Wedding Vows", zh: "婚礼宣誓" } },
  { label: { ko: "성혼 선언", en: "Declaration", zh: "宣布成婚" } },
  { label: { ko: "축가", en: "Celebration Song", zh: "祝歌" } },
  { label: { ko: "양가 인사", en: "Family Greetings", zh: "两家致辞" } },
  { label: { ko: "폐식", en: "Closing", zh: "闭幕" } },
];

export function CeremonyPage({ invitation, language }: Props) {
  const strings = t(language);

  return (
    <div className={container}>
      {/* 일시 카드 */}
      <div className={infoCard}>
        <p className={infoLabel}>{strings.eventTitle}</p>
        <p className={infoDate}>{invitation.event.whenText[language]}</p>
      </div>

      <DecoLine />

      {/* 장소 카드 */}
      <div className={infoCard}>
        <p className={infoLabel}>{strings.address}</p>
        <p className={infoVenue}>{invitation.event.whereText[language]}</p>
        <p className={infoAddress}>{invitation.event.addressText[language]}</p>
      </div>

      <DecoLine />

      {/* 예식 순서 */}
      <div className={orderSection}>
        <p className={orderTitle}>
          {strings.ceremonyOrder}
        </p>
        <div className={orderList}>
          <div className={orderLine} />
          {CEREMONY_ORDER.map((step, i) => (
            <div key={i} className={orderItem}>
              <div className={orderDot} />
              <span className={orderText}>{step.label[language]}</span>
              {step.time && <span className={orderTime}>{step.time}</span>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
