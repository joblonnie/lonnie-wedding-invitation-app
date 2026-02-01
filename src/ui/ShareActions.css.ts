import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const actionRow = style({
  display: "flex",
  gap: 10,
  marginTop: 16,
  flexWrap: "wrap",
});

export const actionButton = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  padding: "10px 12px",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 14,
  color: vars.color.text,
});
