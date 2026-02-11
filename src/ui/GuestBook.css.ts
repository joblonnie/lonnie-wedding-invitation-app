import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 20,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 12,
});

export const inputRow = style({
  display: "flex",
  gap: 10,
});

export const inputField = style({
  flex: 1,
  padding: "10px 14px",
  fontSize: 14,
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

export const textareaField = style({
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  background: vars.color.background,
  color: vars.color.text,
  outline: "none",
  resize: "vertical",
  minHeight: 80,
  fontFamily: "inherit",
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

export const submitButton = style({
  appearance: "none",
  border: "none",
  background: vars.color.primary,
  color: "#fff",
  padding: "12px 24px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  alignSelf: "flex-end",
  transition: "opacity 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 0.85,
    },
    "&:disabled": {
      opacity: 0.5,
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
  padding: 16,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 12,
});

export const messageHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
});

export const messageName = style({
  fontSize: 14,
  fontWeight: 500,
});

export const messageTime = style({
  fontSize: 11,
  color: vars.color.textMuted,
});

export const messageText = style({
  fontSize: 14,
  lineHeight: 1.6,
  opacity: 0.8,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const deleteButton = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: vars.color.text,
  opacity: 0.3,
  cursor: "pointer",
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 4,
  transition: "opacity 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 0.6,
    },
  },
});

export const loadMoreButton = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  color: vars.color.text,
  padding: "10px 20px",
  borderRadius: 999,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  alignSelf: "center",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.primary,
      color: vars.color.primary,
    },
  },
});

export const emptyMessage = style({
  textAlign: "center",
  fontSize: 14,
  color: vars.color.textMuted,
  padding: "24px 0",
});
