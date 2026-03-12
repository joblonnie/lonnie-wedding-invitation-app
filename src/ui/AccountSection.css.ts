import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const container = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
  animation: `${fadeUp} 0.5s ease-out 0.5s backwards`,
});

export const label = style({
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
  textAlign: "center",
  margin: 0,
});

export const tabGroup = style({
  display: "flex",
  gap: 0,
  borderRadius: 8,
  overflow: "hidden",
  border: `1px solid ${vars.color.border}`,
  width: "100%",
});

export const tabButton = style({
  flex: 1,
  appearance: "none",
  border: "none",
  padding: "10px 16px",
  fontSize: 14,
  fontFamily: vars.font.handwriting,
  cursor: "pointer",
  background: "transparent",
  color: vars.color.text,
  fontWeight: 400,
  transition: "all 0.2s ease",
});

export const tabButtonActive = style({
  background: vars.color.background,
  color: vars.color.primary,
  fontWeight: 700,
});

export const tabButtonFirst = style({
  borderRight: `1px solid ${vars.color.border}`,
});

export const accountCard = style({
  width: "100%",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: "28px 24px",
  textAlign: "left",
  animation: `${fadeUp} 0.5s ease-out 0.1s backwards`,
});

export const bankName = style({
  fontSize: 11,
  color: vars.color.textMuted,
  margin: "0 0 6px",
  letterSpacing: "0.05em",
});

export const accountNumber = style({
  fontSize: 16,
  margin: "0 0 4px",
  letterSpacing: "0.02em",
});

export const holderName = style({
  fontSize: 13,
  color: vars.color.textMuted,
  margin: "0 0 12px",
});

export const copyButton = style({
  width: "100%",
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  borderRadius: 999,
  padding: "9px 16px",
  fontSize: 13,
  fontFamily: vars.font.handwriting,
  cursor: "pointer",
  background: "transparent",
  color: vars.color.text,
  transition: "all 0.2s ease",
});

export const copyButtonCopied = style({
  background: vars.color.primary,
  color: "#fff",
  borderColor: vars.color.primary,
});
