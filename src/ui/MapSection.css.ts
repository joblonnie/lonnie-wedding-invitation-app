import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const metaRow = style({
  display: "grid",
  gridTemplateColumns: "72px 1fr",
  gap: 10,
  alignItems: "start",
});

export const metaKey = style({
  fontSize: 13,
  opacity: 0.75,
});

export const metaValue = style({
  fontSize: 14,
});

export const mapWrap = style({
  marginTop: 10,
  borderRadius: 14,
  overflow: "hidden",
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
});

export const frame = style({
  width: "100%",
  height: 320,
  border: 0,
  display: "block",
});

export const openLink = style({
  display: "inline-flex",
  alignItems: "center",
  marginTop: 10,
  padding: "10px 12px",
  borderRadius: 12,
  textDecoration: "none",
  border: `1px solid ${vars.color.border}`,
  color: vars.color.text,
  background: vars.color.surface,
});

