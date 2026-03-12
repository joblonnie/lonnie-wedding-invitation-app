import { useState } from "react";
import type { Language } from "./i18n";
import { t } from "./i18n";
import type { Invitation } from "./invitation/types";
import {
  addressRow,
  addressText,
  mapWrap,
  frame,
  tabContainer,
  tab,
  tabActive,
  transportInfo,
  transportItem,
  transportIcon,
  transportContent,
  transportLabel,
  transportValue,
  naviButtons,
  naviButton,
} from "./MapSection.css";

type TabType = "public" | "car";

// 네비게이션 앱 URL 생성
function buildKakaoNaviUrl(name: string, lat: number, lng: number) {
  return `kakaomap://route?ep=${lat},${lng}&by=CAR`;
}

function buildTmapUrl(name: string, lat: number, lng: number) {
  return `tmap://route?goalname=${encodeURIComponent(name)}&goalx=${lng}&goaly=${lat}`;
}

function buildNaverMapUrl(name: string, lat: number, lng: number) {
  return `nmap://navigation?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=wedding`;
}

export function MapSection({
  invitation,
  language,
}: {
  invitation: Invitation;
  language: Language;
}) {
  const strings = t(language);
  const [activeTab, setActiveTab] = useState<TabType>("public");
  const { event } = invitation;
  const { transportation } = event;

  return (
    <div>
      <div className={addressRow}>
        <p className={addressText}>{event.addressText[language]}</p>
      </div>

      <div className={mapWrap}>
        <iframe
          className={frame}
          title="Map"
          src={event.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className={tabContainer}>
        <button
          type="button"
          className={`${tab} ${activeTab === "public" ? tabActive : ""}`}
          onClick={() => setActiveTab("public")}
        >
          {strings.publicTransport}
        </button>
        <button
          type="button"
          className={`${tab} ${activeTab === "car" ? tabActive : ""}`}
          onClick={() => setActiveTab("car")}
        >
          {strings.byCar}
        </button>
      </div>

      {activeTab === "public" && (
        <div className={transportInfo}>
          {transportation.subway && (
            <div className={transportItem}>
              <div className={transportIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="14" rx="3"/><line x1="4" y1="11" x2="20" y2="11"/><circle cx="8.5" cy="14" r="1"/><circle cx="15.5" cy="14" r="1"/><path d="M7 17l-2 4M17 17l2 4M9 21h6"/></svg>
              </div>
              <div className={transportContent}>
                <div className={transportLabel}>{strings.subway}</div>
                <div className={transportValue}>{transportation.subway[language]}</div>
              </div>
            </div>
          )}
          {transportation.bus && (
            <div className={transportItem}>
              <div className={transportIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="15" rx="3"/><line x1="4" y1="10" x2="20" y2="10"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/><path d="M6 18v2M18 18v2"/></svg>
              </div>
              <div className={transportContent}>
                <div className={transportLabel}>{strings.bus}</div>
                <div className={transportValue}>{transportation.bus[language]}</div>
              </div>
            </div>
          )}
          {transportation.shuttle && (
            <div className={transportItem}>
              <div className={transportIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="13" rx="3"/><line x1="2" y1="11" x2="22" y2="11"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/><path d="M7 5V3M17 5V3"/></svg>
              </div>
              <div className={transportContent}>
                <div className={transportLabel}>{strings.shuttle}</div>
                <div className={transportValue} style={{ whiteSpace: "pre-line" }}>{transportation.shuttle[language]}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "car" && (
        <>
          <div className={transportInfo}>
            {transportation.car && (
              <div className={transportItem}>
                <div className={transportIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14V11l-2-5H7l-2 5v6z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M5 11h14"/></svg>
                </div>
                <div className={transportContent}>
                  <div className={transportLabel}>{strings.navigation}</div>
                  <div className={transportValue}>{transportation.car[language]}</div>
                </div>
              </div>
            )}
            {transportation.parking && (
              <div className={transportItem}>
                <div className={transportIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M10 8h3a3 3 0 010 6h-3V8z"/><line x1="10" y1="14" x2="10" y2="18"/></svg>
                </div>
                <div className={transportContent}>
                  <div className={transportLabel}>{strings.parking}</div>
                  <div className={transportValue}>{transportation.parking[language]}</div>
                </div>
              </div>
            )}
            {transportation.externalParking && (
              <div className={transportItem}>
                <div className={transportIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3c-4 0-7 3-7 7 0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z"/><path d="M12.5 7h2a2 2 0 010 4h-2V7z"/><line x1="12.5" y1="11" x2="12.5" y2="13.5"/><rect x="2" y="14" width="8" height="7" rx="1"/><path d="M4.5 17h2a1.5 1.5 0 000-3h-2v3z"/></svg>
                </div>
                <div className={transportContent}>
                  <div className={transportLabel}>{strings.externalParking}</div>
                  <div className={transportValue} style={{ whiteSpace: "pre-line" }}>{transportation.externalParking[language]}</div>
                </div>
              </div>
            )}
          </div>

          <div className={naviButtons}>
            <a
              className={naviButton}
              href={buildKakaoNaviUrl(event.whereText[language], event.lat, event.lng)}
              target="_blank"
              rel="noreferrer"
            >
              {strings.kakaoNavi}
            </a>
            <a
              className={naviButton}
              href={buildTmapUrl(event.whereText[language], event.lat, event.lng)}
              target="_blank"
              rel="noreferrer"
            >
              {strings.tmap}
            </a>
            <a
              className={naviButton}
              href={buildNaverMapUrl(event.whereText[language], event.lat, event.lng)}
              target="_blank"
              rel="noreferrer"
            >
              {strings.naverMap}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
