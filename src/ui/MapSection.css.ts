import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const addressRow = style({
  textAlign: "center",
  marginBottom: 20,
});

export const addressText = style({
  fontSize: 15,
  color: vars.color.text,
});

export const mapWrap = style({
  borderRadius: 8,
  overflow: "hidden",
  background: vars.color.background,
});

export const frame = style({
  width: "100%",
  height: 240,
  border: 0,
  display: "block",
  filter: "grayscale(20%)",
});

export const tabContainer = style({
  display: "flex",
  gap: 0,
  marginTop: 20,
  borderRadius: 8,
  overflow: "hidden",
  border: `1px solid ${vars.color.border}`,
});

export const tab = style({
  flex: 1,
  appearance: "none",
  border: "none",
  background: "transparent",
  padding: "12px 16px",
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.text,
  opacity: 0.5,
  cursor: "pointer",
  transition: "all 0.2s ease",
  selectors: {
    "&:not(:last-child)": {
      borderRight: `1px solid ${vars.color.border}`,
    },
  },
});

export const tabActive = style({
  opacity: 1,
  background: vars.color.background,
  color: vars.color.primary,
});

export const transportInfo = style({
  marginTop: 16,
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const transportItem = style({
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
});

export const transportIcon = style({
  width: 32,
  height: 32,
  borderRadius: 8,
  background: vars.color.background,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  flexShrink: 0,
});

export const transportContent = style({
  flex: 1,
});

export const transportLabel = style({
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text,
  opacity: 0.5,
  marginBottom: 2,
});

export const transportValue = style({
  fontSize: 14,
  color: vars.color.text,
  lineHeight: 1.5,
});

export const naviButtons = style({
  display: "flex",
  gap: 8,
  marginTop: 20,
  flexWrap: "wrap",
});

export const naviButton = style({
  flex: 1,
  minWidth: 100,
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  padding: "12px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.text,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  transition: "all 0.2s ease",
  textDecoration: "none",
  selectors: {
    "&:hover": {
      borderColor: vars.color.primary,
      color: vars.color.primary,
    },
  },
});

export const naviIcon = style({
  fontSize: 16,
});
