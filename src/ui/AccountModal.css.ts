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
  maxHeight: "80vh",
  overflowY: "auto",
  animation: `${slideUp} 0.3s ease`,
});

export const modalTitle = style({
  fontSize: 18,
  fontWeight: 500,
  marginBottom: 20,
  textAlign: "center",
});

export const tabContainer = style({
  display: "flex",
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  overflow: "hidden",
  marginBottom: 20,
});

export const tab = style({
  flex: 1,
  appearance: "none",
  border: "none",
  background: "transparent",
  padding: "10px 16px",
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.text,
  cursor: "pointer",
  opacity: 0.5,
  transition: "all 0.2s ease",
  selectors: {
    "&:first-child": {
      borderRight: `1px solid ${vars.color.border}`,
    },
  },
});

export const tabActive = style({
  opacity: 1,
  background: vars.color.primary,
  color: "#fff",
});

export const accountCard = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  selectors: {
    "&:last-child": {
      marginBottom: 0,
    },
  },
});

export const bankName = style({
  fontSize: 12,
  fontWeight: 500,
  opacity: 0.5,
  marginBottom: 8,
});

export const accountNumber = style({
  fontSize: 16,
  fontWeight: 400,
  letterSpacing: "0.02em",
  marginBottom: 4,
});

export const holderName = style({
  fontSize: 13,
  opacity: 0.6,
  marginBottom: 12,
});

export const copyButton = style({
  width: "100%",
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  color: vars.color.text,
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.primary,
      color: vars.color.primary,
    },
  },
});

export const copyButtonCopied = style({
  background: vars.color.primary,
  borderColor: vars.color.primary,
  color: "#fff",
});

export const closeButton = style({
  width: "100%",
  padding: "10px 16px",
  fontSize: 13,
  fontWeight: 400,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  background: "transparent",
  color: vars.color.text,
  opacity: 0.6,
  marginTop: 16,
  transition: "opacity 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 1,
    },
  },
});
