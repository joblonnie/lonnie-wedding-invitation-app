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
  color: vars.color.text,
  width: 44,
  height: 44,
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      transform: "scale(1.05)",
    },
  },
});

export const dropdown = style({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  overflow: "hidden",
  minWidth: 120,
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
  transition: "background 0.15s ease",
  selectors: {
    "&:hover": {
      background: vars.color.background,
    },
  },
});

export const dropdownItemActive = style({
  color: vars.color.primary,
  fontWeight: 500,
});

export const flag = style({
  fontSize: 16,
});

export const picker = style({});
export const pickerButton = style({});
export const pickerButtonActive = style({});
export const pickerLabel = style({});
