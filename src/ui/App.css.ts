import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";
import { scrollReveal } from "./theme/global.css";

export const appContainer = style({
  minHeight: "100vh",
  background: vars.color.surface,
});

export const card = style({
  width: "min(560px, 100%)",
  margin: "0 auto",
  padding: "60px 24px 80px",
});

export const headerRow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 16,
  marginBottom: 48,
});

export const headerTitle = style({
  fontSize: 13,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: vars.color.primary,
  margin: 0,
});

export const greeting = style({
  fontSize: 14,
  fontWeight: 400,
  color: vars.color.textMuted,
  margin: "0 0 8px",
});

export const headerSubtitle = style({
  fontSize: 14,
  color: vars.color.textMuted,
  margin: 0,
  fontWeight: 400,
});

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  textAlign: "center",
});

export const section = style({
  marginTop: 56,
});

export const sectionTitle = style({
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: vars.color.primary,
  marginTop: 0,
  marginBottom: 24,
  textAlign: "center",
});

export const divider = style({
  width: 40,
  height: 1,
  background: vars.color.border,
  margin: "48px auto",
});

export const scrollRevealHidden = style({
  opacity: 0,
  transform: "translateY(30px)",
});

export const scrollRevealVisible = style({
  animation: `${scrollReveal} 0.7s ease-out forwards`,
});
