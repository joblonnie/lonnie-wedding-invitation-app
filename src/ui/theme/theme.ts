import { classicThemeClass, midnightThemeClass } from "./theme.css";

export type ThemeName = "classic" | "midnight";

export function themeClassFromName(theme: ThemeName) {
  return theme === "midnight" ? midnightThemeClass : classicThemeClass;
}

