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
              <div className={transportIcon}>🚇</div>
              <div className={transportContent}>
                <div className={transportLabel}>{strings.subway}</div>
                <div className={transportValue}>{transportation.subway[language]}</div>
              </div>
            </div>
          )}
          {transportation.bus && (
            <div className={transportItem}>
              <div className={transportIcon}>🚌</div>
              <div className={transportContent}>
                <div className={transportLabel}>{strings.bus}</div>
                <div className={transportValue}>{transportation.bus[language]}</div>
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
                <div className={transportIcon}>🚗</div>
                <div className={transportContent}>
                  <div className={transportLabel}>{strings.navigation}</div>
                  <div className={transportValue}>{transportation.car[language]}</div>
                </div>
              </div>
            )}
            {transportation.parking && (
              <div className={transportItem}>
                <div className={transportIcon}>🅿️</div>
                <div className={transportContent}>
                  <div className={transportLabel}>{strings.parking}</div>
                  <div className={transportValue}>{transportation.parking[language]}</div>
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
