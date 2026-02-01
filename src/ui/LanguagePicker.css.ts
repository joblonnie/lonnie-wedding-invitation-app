import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const picker = style({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
});

export const pickerButton = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  color: vars.color.text,
  borderRadius: 999,
  padding: "8px 10px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
  transition: "transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease",
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
    },
    "&:focus-visible": {
      outline: `3px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
});

export const pickerButtonActive = style({
  borderColor: vars.color.primary,
  boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
});

export const pickerLabel = style({
  fontSize: 13,
  fontWeight: 600,
});

