import { useEffect, useMemo, useState } from "react";
import { appContainer, card, headerRow, row, sectionTitle } from "./App.css";
import { detectDefaultLanguage, type Language, t } from "../ui/i18n";
import { DEFAULT_INVITATION } from "../ui/invitation/defaultInvitation";
import { setSocialMeta } from "../ui/meta/setSocialMeta";
import { ShareActions } from "./ShareActions";
import { themeClassFromName, type ThemeName } from "./theme/theme";
import { LanguagePicker } from "./LanguagePicker";
import { MapSection } from "./MapSection";
import { PhotoGallery } from "./PhotoGallery";

function readThemeOverride(): ThemeName | null {
  const value = new URLSearchParams(window.location.search).get("theme");
  if (value === "classic" || value === "midnight") return value;
  return null;
}

export function App() {
  const invitation = DEFAULT_INVITATION;
  const [language, setLanguage] = useState<Language>(() => detectDefaultLanguage());
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

  return (
    <div className={appContainer}>
      <div className={card}>
        <div className={headerRow}>
          <div>
            <h1>{strings.title}</h1>
            <p>{strings.subtitle}</p>
          </div>
          <LanguagePicker value={language} onChange={setLanguage} />
        </div>

        <h2 className={sectionTitle}>{strings.eventTitle}</h2>
        <div className={row}>
          <p>{invitation.event.whenText[language]}</p>
          <p>{invitation.event.whereText[language]}</p>
        </div>

        <ShareActions invitation={invitation} language={language} />

        <h2 className={sectionTitle}>{strings.photosTitle}</h2>
        <PhotoGallery invitation={invitation} language={language} />

        <h2 className={sectionTitle}>{strings.mapTitle}</h2>
        <MapSection invitation={invitation} language={language} />
      </div>
    </div>
  );
}
