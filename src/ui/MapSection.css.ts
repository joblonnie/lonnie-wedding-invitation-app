import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const addressRow = style({
  textAlign: "center",
  marginBottom: 20,
  animation: `${fadeUp} 0.5s ease-out backwards`,
});

export const addressText = style({
  fontFamily: vars.font.handwriting,
  fontSize: 18,
  color: vars.color.text,
  margin: 0,
});

export const mapWrap = style({
  borderRadius: vars.radius.md,
  overflow: "hidden",
  border: `1px solid ${vars.color.border}`,
  animation: `${fadeUp} 0.5s ease-out 0.1s backwards`,
});

export const frame = style({
  width: "100%",
  height: 220,
  border: 0,
  display: "block",
  filter: "grayscale(15%)",
});

export const tabContainer = style({
  display: "flex",
  gap: 0,
  marginTop: 24,
  borderRadius: vars.radius.md,
  overflow: "hidden",
  border: `1px solid ${vars.color.border}`,
  animation: `${fadeUp} 0.5s ease-out 0.2s backwards`,
});

export const tab = style({
  flex: 1,
  appearance: "none",
  border: "none",
  background: "transparent",
  padding: "12px 16px",
  fontSize: 14,
  fontFamily: vars.font.handwriting,
  fontWeight: 400,
  color: vars.color.textMuted,
  cursor: "pointer",
  transition: "all 0.2s ease",
  selectors: {
    "&:not(:last-child)": {
      borderRight: `1px solid ${vars.color.border}`,
    },
  },
});

export const tabActive = style({
  background: vars.color.background,
  color: vars.color.primary,
  fontWeight: 700,
});

export const transportInfo = style({
  marginTop: 16,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  animation: `${fadeUp} 0.4s ease-out backwards`,
});

export const transportItem = style({
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
});

export const transportIcon = style({
  width: 34,
  height: 34,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.primary,
  flexShrink: 0,
});

export const transportContent = style({
  flex: 1,
  paddingTop: 2,
});

export const transportLabel = style({
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: "0.1em",
  color: vars.color.textMuted,
  textTransform: "uppercase",
  marginBottom: 3,
});

export const transportValue = style({
  fontSize: 14,
  color: vars.color.text,
  lineHeight: 1.6,
});

export const naviButtons = style({
  display: "flex",
  gap: 8,
  marginTop: 20,
  animation: `${fadeUp} 0.5s ease-out 0.3s backwards`,
});

export const naviButton = style({
  flex: 1,
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  padding: "12px 12px",
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontSize: 13,
  fontFamily: vars.font.handwriting,
  fontWeight: 400,
  color: vars.color.text,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  transition: "all 0.2s ease",
  textDecoration: "none",
  ":active": {
    transform: "scale(0.97)",
  },
});

export const naviIcon = style({
  fontSize: 16,
});
