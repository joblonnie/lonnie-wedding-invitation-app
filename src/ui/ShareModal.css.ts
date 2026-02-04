import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  zIndex: 2000,
  animation: `${fadeIn} 0.2s ease`,
});

export const modal = style({
  background: vars.color.surface,
  borderRadius: 16,
  padding: 24,
  width: "100%",
  maxWidth: 360,
  animation: `${slideUp} 0.3s ease`,
});

export const title = style({
  fontSize: 18,
  fontWeight: 500,
  marginBottom: 16,
  textAlign: "center",
});

export const inputGroup = style({
  marginBottom: 20,
});

export const label = style({
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: vars.color.text,
  opacity: 0.6,
  marginBottom: 8,
});

export const input = style({
  width: "100%",
  padding: "12px 16px",
  fontSize: 15,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  background: vars.color.background,
  color: vars.color.text,
  outline: "none",
  transition: "border-color 0.2s ease",
  selectors: {
    "&:focus": {
      borderColor: vars.color.primary,
    },
    "&::placeholder": {
      color: vars.color.text,
      opacity: 0.4,
    },
  },
});

export const buttons = style({
  display: "flex",
  gap: 10,
});

export const button = style({
  flex: 1,
  padding: "12px 16px",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
});

export const cancelButton = style([
  button,
  {
    background: vars.color.background,
    color: vars.color.text,
  },
]);

export const confirmButton = style([
  button,
  {
    background: vars.color.primary,
    color: "#fff",
  },
]);
