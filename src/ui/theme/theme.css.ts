import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    background: null,
    surface: null,
    text: null,
    border: null,
    primary: null,
  },
});

export const classicThemeClass = createTheme(vars, {
  color: {
    background: "#f6f0ff",
    surface: "#ffffff",
    text: "#14121a",
    border: "rgba(0,0,0,0.10)",
    primary: "#7c3aed",
  },
});

export const midnightThemeClass = createTheme(vars, {
  color: {
    background: "#0b1020",
    surface: "#111a33",
    text: "#eef2ff",
    border: "rgba(255,255,255,0.14)",
    primary: "#a78bfa",
  },
});

export const botanicalThemeClass = createTheme(vars, {
  color: {
    background: "#f8f9f8",
    surface: "#ffffff",
    text: "#2c2c2c",
    border: "rgba(0,0,0,0.08)",
    primary: "#5a7d5a",
  },
});
