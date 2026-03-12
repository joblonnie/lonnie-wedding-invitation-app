import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const floatingContainer = style({
  position: "fixed",
  top: 16,
  right: 16,
  zIndex: 1000,
});

export const toggleButton = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  color: vars.color.primary,
  width: 40,
  height: 40,
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  transition: "all 0.2s ease",
  ":active": {
    transform: "scale(0.95)",
  },
});

export const dropdown = style({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  overflow: "hidden",
  minWidth: 130,
});

export const dropdownItem = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: vars.color.text,
  width: "100%",
  padding: "12px 16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 14,
  fontFamily: vars.font.handwriting,
  transition: "background 0.15s ease",
  ":active": {
    background: vars.color.background,
  },
});

export const dropdownItemActive = style({
  color: vars.color.primary,
  fontWeight: 700,
});

export const flag = style({
  fontSize: 15,
  lineHeight: 1,
});
