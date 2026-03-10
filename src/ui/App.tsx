import { useEffect, useMemo, useState, useCallback, Suspense, type ReactNode } from "react";
import {
  appContainer,
  card,
  headerRow,
  headerTitle,
  headerSubtitle,
  greeting as greetingStyle,
  row,
  section,
  sectionTitle,
  divider,
  scrollRevealHidden,
  scrollRevealVisible,
  quickActions,
  quickActionButton,
  navGrid,
  navCard,
  navCardIcon,
  navCardFullWidth,
  backButton,
} from "./App.css";
import { detectDefaultLanguage, type Language, t } from "../ui/i18n";
import { DEFAULT_INVITATION } from "../ui/invitation/defaultInvitation";
import { setSocialMeta } from "../ui/meta/setSocialMeta";
import { ShareActions } from "./ShareActions";
import { themeClassFromName, type ThemeName } from "./theme/theme";
import { LanguagePicker } from "./LanguagePicker";
import { MapSection } from "./MapSection";
import { PhotoGallery } from "./PhotoGallery";
import { OurStory } from "./OurStory";
import { CelebrationButton } from "./CelebrationButton";
import { BulkShare } from "./BulkShare";
import { HeroIllust } from "./HeroIllust";
import { GuestBook } from "./GuestBook";
import { AccountModal } from "./AccountModal";
import { ShareModal } from "./ShareModal";
import { downloadIcs } from "./calendar/downloadIcs";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useEnvelopeAnimation } from "./hooks/useEnvelopeAnimation";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { IconStory, IconCeremony, IconGallery, IconMap, IconGuestbook } from "./HandDrawnIcons";
import { EnvelopeOpening } from "./EnvelopeOpening";
import { PetalRain } from "./PetalRain";
import { ScrollScene } from "./three/ScrollScene";

type Page = "home" | "story" | "event" | "gallery" | "map" | "guestbook";

function getUrlParams() {
  return new URLSearchParams(window.location.search);
}

function readThemeOverride(): ThemeName | null {
  const value = getUrlParams().get("theme");
  if (value === "classic" || value === "midnight" || value === "botanical") return value;
  return null;
}

function readLanguageOverride(): Language | null {
  const value = getUrlParams().get("lang");
  if (value === "ko" || value === "en" || value === "zh") return value;
  return null;
}

function readRecipientName(): string | null {
  return getUrlParams().get("to");
}

function readMode(): "bulk" | "invitation" {
  return getUrlParams().get("mode") === "bulk" ? "bulk" : "invitation";
}

function readPage(): Page {
  const value = getUrlParams().get("page");
  if (value === "story" || value === "event" || value === "gallery" || value === "map" || value === "guestbook") return value;
  return "home";
}

function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildGoogleCalendarUrl(title: string, start: Date, end: Date, location: string, description: string): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatDateForGoogle(start)}/${formatDateForGoogle(end)}`,
    location,
    details: description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function ScrollRevealSection({ children }: { children: ReactNode }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div ref={ref} className={isVisible ? scrollRevealVisible : scrollRevealHidden}>
      {children}
    </div>
  );
}

export function App() {
  const [mode, setMode] = useState<"bulk" | "invitation">(() => readMode());
  const invitation = DEFAULT_INVITATION;
  const [recipientName] = useState<string | null>(() => readRecipientName());
  const [language, setLanguage] = useState<Language>(
    () => readLanguageOverride() ?? detectDefaultLanguage()
  );
  const [themeName] = useState<ThemeName>(() => readThemeOverride() ?? invitation.theme);
  const themeClass = themeClassFromName(themeName);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [page, setPage] = useState<Page>(() => readPage());

  const strings = useMemo(() => t(language), [language]);
  const reducedMotion = useReducedMotion();
  const { phase, skip } = useEnvelopeAnimation(800);
  const petalActive = phase === "revealed" && !reducedMotion;

  const navigateTo = useCallback((p: Page) => {
    const url = new URL(window.location.href);
    if (p === "home") {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", p);
    }
    window.history.pushState({}, "", url.toString());
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPage(readPage());
      setMode(readMode());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    setSocialMeta(invitation.meta, language);
  }, [invitation.meta, language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(themeClass);
    return () => root.classList.remove(themeClass);
  }, [themeClass]);

  const handleGoToBulk = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", "bulk");
    window.history.pushState({}, "", url.toString());
    setMode("bulk");
  };

  const handleBackFromBulk = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("mode");
    window.history.pushState({}, "", url.toString());
    setMode("invitation");
  };

  const handleShare = async (recipientNameInput: string) => {
    setShowShareModal(false);
    const url = new URL(window.location.href);
    if (recipientNameInput) url.searchParams.set("to", recipientNameInput);
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

  if (mode === "bulk") {
    return <BulkShare onBack={handleBackFromBulk} />;
  }

  const backBtn = (
    <button type="button" className={backButton} onClick={() => navigateTo("home")}>
      <span style={{ fontSize: 16 }}>&#8592;</span> {strings.navBack}
    </button>
  );

  const renderPage = () => {
    switch (page) {
      case "story":
        return (
          <div className={card}>
            {backBtn}
            <ScrollRevealSection>
              <header className={headerRow}>
                <p className={headerTitle}>{strings.ourStoryTitle}</p>
                <OurStory invitation={invitation} language={language} />
              </header>
            </ScrollRevealSection>
          </div>
        );

      case "event":
        return (
          <div className={card}>
            {backBtn}
            <ScrollRevealSection>
              <section className={section} style={{ marginTop: 0 }}>
                <h2 className={sectionTitle}>{strings.eventTitle}</h2>
                <div className={row}>
                  <p style={{ fontSize: 18, fontWeight: 300, margin: 0 }}>
                    {invitation.event.whenText[language]}
                  </p>
                  <p style={{ fontSize: 15, color: "var(--textMuted)", margin: "8px 0 0" }}>
                    {invitation.event.whereText[language]}
                  </p>
                </div>
                <ShareActions
                  invitation={invitation}
                  language={language}
                  onBulkShare={handleGoToBulk}
                  onAccountInfo={invitation.accounts ? () => setShowAccountModal(true) : undefined}
                />
                <CelebrationButton themeName={themeName} />
              </section>
            </ScrollRevealSection>
          </div>
        );

      case "gallery":
        return (
          <div className={card}>
            {backBtn}
            <ScrollRevealSection>
              <section className={section} style={{ marginTop: 0 }}>
                <h2 className={sectionTitle}>{strings.photosTitle}</h2>
                <PhotoGallery invitation={invitation} language={language} />
              </section>
            </ScrollRevealSection>
          </div>
        );

      case "map":
        return (
          <div className={card}>
            {backBtn}
            <ScrollRevealSection>
              <section className={section} style={{ marginTop: 0 }}>
                <h2 className={sectionTitle}>{strings.mapTitle}</h2>
                <MapSection invitation={invitation} language={language} />
              </section>
            </ScrollRevealSection>
          </div>
        );

      case "guestbook":
        return (
          <div className={card}>
            {backBtn}
            <ScrollRevealSection>
              <section className={section} style={{ marginTop: 0 }}>
                <h2 className={sectionTitle}>{strings.guestBook}</h2>
                <GuestBook language={language} />
              </section>
            </ScrollRevealSection>
          </div>
        );

      default:
        return (
          <div className={card}>
            {recipientName && (
              <p className={greetingStyle} style={{ textAlign: "center" }}>{strings.greeting(recipientName)}</p>
            )}

            <HeroIllust invitation={invitation} language={language} />

            {/* 퀵 액션: 캘린더 등록, 공유 */}
            <div className={quickActions}>
              <button
                type="button"
                className={quickActionButton}
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
                className={quickActionButton}
                href={buildGoogleCalendarUrl(
                  invitation.meta.title[language],
                  invitation.event.start,
                  invitation.event.end,
                  invitation.event.locationIcs,
                  invitation.meta.description[language]
                )}
                target="_blank"
                rel="noreferrer"
              >
                {strings.googleCalendar}
              </a>
              <button
                type="button"
                className={quickActionButton}
                onClick={() => setShowShareModal(true)}
              >
                {strings.share}
              </button>
            </div>

            <div className={divider} />

            {/* 네비게이션 카드 */}
            <nav className={navGrid}>
              <button
                type="button"
                className={navCard}
                style={{ animationDelay: "0.05s" }}
                onClick={() => navigateTo("story")}
              >
                <span className={navCardIcon}><IconStory /></span>
                {strings.navStory}
              </button>
              <button
                type="button"
                className={navCard}
                style={{ animationDelay: "0.1s" }}
                onClick={() => navigateTo("event")}
              >
                <span className={navCardIcon}><IconCeremony /></span>
                {strings.navEvent}
              </button>
              <button
                type="button"
                className={navCard}
                style={{ animationDelay: "0.15s" }}
                onClick={() => navigateTo("gallery")}
              >
                <span className={navCardIcon}><IconGallery /></span>
                {strings.navGallery}
              </button>
              <button
                type="button"
                className={navCard}
                style={{ animationDelay: "0.2s" }}
                onClick={() => navigateTo("map")}
              >
                <span className={navCardIcon}><IconMap /></span>
                {strings.navMap}
              </button>
              <button
                type="button"
                className={`${navCard} ${navCardFullWidth}`}
                style={{ animationDelay: "0.25s" }}
                onClick={() => navigateTo("guestbook")}
              >
                <span className={navCardIcon}><IconGuestbook /></span>
                {strings.navGuestBook}
              </button>
            </nav>

            <p className={headerSubtitle} style={{ marginTop: 56, textAlign: "center" }}>
              {strings.subtitle}
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <EnvelopeOpening phase={phase} onSkip={skip} tapToOpenText={strings.tapToOpen}>
        <div className={appContainer}>
          <LanguagePicker value={language} onChange={setLanguage} />

          {!reducedMotion && (
            <Suspense fallback={null}>
              <ScrollScene />
            </Suspense>
          )}

          <PetalRain active={petalActive} />

          {renderPage()}

          {showAccountModal && invitation.accounts && (
            <AccountModal
              language={language}
              groomAccounts={invitation.accounts.groom}
              brideAccounts={invitation.accounts.bride}
              onClose={() => setShowAccountModal(false)}
            />
          )}

          {showShareModal && (
            <ShareModal
              language={language}
              onClose={() => setShowShareModal(false)}
              onShare={handleShare}
            />
          )}
        </div>
      </EnvelopeOpening>
    </>
  );
}
