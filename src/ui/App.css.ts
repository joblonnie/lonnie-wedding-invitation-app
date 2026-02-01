import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const appContainer = style({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: 24,
  background: `linear-gradient(180deg, ${vars.color.background} 0%, ${vars.color.surface} 70%)`,
});

export const card = style({
  width: "min(720px, 100%)",
  borderRadius: 16,
  padding: 20,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
});

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const sectionTitle = style({
  marginTop: 18,
  marginBottom: 8,
  fontSize: 16,
});
