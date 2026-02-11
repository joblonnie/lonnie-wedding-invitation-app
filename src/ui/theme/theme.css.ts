import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    background: null,
    surface: null,
    surfaceAlt: null,
    text: null,
    textMuted: null,
    border: null,
    primary: null,
    primaryLight: null,
    primaryDark: null,
    accent: null,
    celebration: null,
  },
  font: {
    heading: null,
    body: null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
  },
});

export const classicThemeClass = createTheme(vars, {
  color: {
    background: "#f6f0ff",
    surface: "#ffffff",
    surfaceAlt: "#f0e8fa",
    text: "#14121a",
    textMuted: "rgba(20, 18, 26, 0.55)",
    border: "rgba(0,0,0,0.10)",
    primary: "#7c3aed",
    primaryLight: "#a78bfa",
    primaryDark: "#5b21b6",
    accent: "#d4a853",
    celebration: "#ff4d6d",
  },
  font: {
    heading: '"Cormorant Garamond", "Pretendard Variable", serif',
    body: '"Pretendard Variable", Pretendard, "Noto Sans SC", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "20px",
  },
});

export const midnightThemeClass = createTheme(vars, {
  color: {
    background: "#0b1020",
    surface: "#111a33",
    surfaceAlt: "#1a2440",
    text: "#eef2ff",
    textMuted: "rgba(238, 242, 255, 0.55)",
    border: "rgba(255,255,255,0.14)",
    primary: "#a78bfa",
    primaryLight: "#c4b5fd",
    primaryDark: "#7c3aed",
    accent: "#fbbf24",
    celebration: "#f472b6",
  },
  font: {
    heading: '"Cormorant Garamond", "Pretendard Variable", serif',
    body: '"Pretendard Variable", Pretendard, "Noto Sans SC", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "20px",
  },
});

export const botanicalThemeClass = createTheme(vars, {
  color: {
    background: "#f7f9f5",
    surface: "#ffffff",
    surfaceAlt: "#eef3eb",
    text: "#2c2c2c",
    textMuted: "rgba(44, 44, 44, 0.55)",
    border: "rgba(0,0,0,0.08)",
    primary: "#4a7c59",
    primaryLight: "#7daa8a",
    primaryDark: "#2d5a3a",
    accent: "#c4a96a",
    celebration: "#e8806a",
  },
  font: {
    heading: '"Cormorant Garamond", "Pretendard Variable", serif',
    body: '"Pretendard Variable", Pretendard, "Noto Sans SC", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "20px",
  },
});
