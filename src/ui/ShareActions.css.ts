import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const actionRow = style({
  display: "flex",
  gap: 12,
  marginTop: 24,
  justifyContent: "center",
  flexWrap: "wrap",
});

export const actionButton = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  padding: "12px 20px",
  borderRadius: 999,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.text,
  letterSpacing: "0.02em",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.primary,
      color: vars.color.primary,
    },
  },
});
