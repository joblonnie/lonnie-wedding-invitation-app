import { useEffect, useMemo, useState } from "react";
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

export function App() {
  const [mode, setMode] = useState<"bulk" | "invitation">(() => readMode());
  const invitation = DEFAULT_INVITATION;
  const [recipientName] = useState<string | null>(() => readRecipientName());
  const [language, setLanguage] = useState<Language>(
    () => readLanguageOverride() ?? detectDefaultLanguage()
  );
  const [themeName] = useState<ThemeName>(() => readThemeOverride() ?? invitation.theme);
  const themeClass = themeClassFromName(themeName);

  const strings = useMemo(() => t(language), [language]);

  useEffect(() => {
    setSocialMeta(invitation.meta, language);
  }, [invitation.meta, language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(themeClass);
    return () => {
      root.classList.remove(themeClass);
    };
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

  if (mode === "bulk") {
    return <BulkShare onBack={handleBackFromBulk} />;
  }

  return (
    <div className={appContainer}>
      <LanguagePicker value={language} onChange={setLanguage} />
      <div className={card}>
        <header className={headerRow}>
          {recipientName && (
            <p className={greetingStyle}>{strings.greeting(recipientName)}</p>
          )}
          <p className={headerTitle}>{strings.title}</p>
          <OurStory invitation={invitation} language={language} />
        </header>

        <div className={divider} />

        <section className={section} style={{ animationDelay: "0.1s" }}>
          <h2 className={sectionTitle}>{strings.eventTitle}</h2>
          <div className={row}>
            <p style={{ fontSize: 18, fontWeight: 300, margin: 0 }}>
              {invitation.event.whenText[language]}
            </p>
            <p style={{ fontSize: 15, opacity: 0.7, margin: "8px 0 0" }}>
              {invitation.event.whereText[language]}
            </p>
          </div>
          <ShareActions invitation={invitation} language={language} onBulkShare={handleGoToBulk} />
          <CelebrationButton />
        </section>

        <div className={divider} />

        <section className={section} style={{ animationDelay: "0.2s" }}>
          <h2 className={sectionTitle}>{strings.photosTitle}</h2>
          <PhotoGallery invitation={invitation} language={language} />
        </section>

        <div className={divider} />

        <section className={section} style={{ animationDelay: "0.3s" }}>
          <h2 className={sectionTitle}>{strings.mapTitle}</h2>
          <MapSection invitation={invitation} language={language} />
        </section>

        <p className={headerSubtitle} style={{ marginTop: 56 }}>
          {strings.subtitle}
        </p>
      </div>
    </div>
  );
}
