import {
  classicThemeClass,
  midnightThemeClass,
  botanicalThemeClass,
} from "./theme.css";

export type ThemeName = "classic" | "midnight" | "botanical";

export function themeClassFromName(theme: ThemeName) {
  switch (theme) {
    case "midnight":
      return midnightThemeClass;
    case "botanical":
      return botanicalThemeClass;
    default:
      return classicThemeClass;
  }
}

