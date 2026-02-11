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

export const THEME_CONFETTI_COLORS: Record<ThemeName, string[]> = {
  botanical: ["#4a7c59", "#ffffff", "#c4a96a", "#7daa8a"],
  classic: ["#7c3aed", "#ffffff", "#d4a853", "#a78bfa"],
  midnight: ["#a78bfa", "#fbbf24", "#c4b5fd", "#ffffff"],
};
