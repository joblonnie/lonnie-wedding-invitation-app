import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 20,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  animation: `${fadeUp} 0.5s ease-out backwards`,
});

export const inputRow = style({
  display: "flex",
  gap: 10,
});

export const inputField = style({
  flex: 1,
  padding: "10px 14px",
  fontSize: 14,
  fontFamily: vars.font.handwriting,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: "transparent",
  color: vars.color.text,
  outline: "none",
  transition: "border-color 0.2s ease",
  selectors: {
    "&:focus": {
      borderColor: vars.color.primary,
    },
    "&::placeholder": {
      color: vars.color.text,
      opacity: 0.35,
    },
  },
});

export const textareaField = style({
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  fontFamily: vars.font.handwriting,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: "transparent",
  color: vars.color.text,
  outline: "none",
  resize: "vertical",
  minHeight: 80,
  transition: "border-color 0.2s ease",
  selectors: {
    "&:focus": {
      borderColor: vars.color.primary,
    },
    "&::placeholder": {
      color: vars.color.text,
      opacity: 0.35,
    },
  },
});

export const submitButton = style({
  appearance: "none",
  border: `1.5px solid ${vars.color.primary}`,
  background: "transparent",
  color: vars.color.primary,
  padding: "11px 24px",
  borderRadius: 999,
  cursor: "pointer",
  fontSize: 14,
  fontFamily: vars.font.handwriting,
  fontWeight: 700,
  alignSelf: "flex-end",
  transition: "all 0.2s ease",
  ":active": {
    transform: "scale(0.97)",
  },
  selectors: {
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const messageList = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

export const messageCard = style({
  padding: "16px 18px",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  animation: `${fadeUp} 0.4s ease-out backwards`,
});

export const messageHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
});

export const messageName = style({
  fontSize: 15,
  fontFamily: vars.font.handwriting,
  fontWeight: 700,
  color: vars.color.text,
});

export const messageTime = style({
  fontSize: 11,
  color: vars.color.textMuted,
});

export const messageText = style({
  fontSize: 15,
  fontFamily: vars.font.handwriting,
  lineHeight: 1.7,
  color: vars.color.text,
  opacity: 0.85,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  margin: 0,
});

export const deleteButton = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  cursor: "pointer",
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 4,
  transition: "color 0.2s ease",
  ":active": {
    color: vars.color.text,
  },
});

export const loadMoreButton = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  color: vars.color.text,
  padding: "10px 24px",
  borderRadius: 999,
  cursor: "pointer",
  fontSize: 14,
  fontFamily: vars.font.handwriting,
  fontWeight: 400,
  alignSelf: "center",
  transition: "all 0.2s ease",
  ":active": {
    borderColor: vars.color.primary,
    color: vars.color.primary,
  },
});

export const emptyMessage = style({
  textAlign: "center",
  fontFamily: vars.font.handwriting,
  fontSize: 16,
  color: vars.color.textMuted,
  padding: "32px 0",
});
