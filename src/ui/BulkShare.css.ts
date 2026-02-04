import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const bulkShareContainer = style({
  padding: "20px",
  maxWidth: 480,
  margin: "0 auto",
  minHeight: "100vh",
  background: vars.color.background,
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 24,
});

export const backButton = style({
  padding: "8px 12px",
  fontSize: 14,
  background: "transparent",
  border: "none",
  color: vars.color.text,
  cursor: "pointer",
  opacity: 0.7,
  transition: "opacity 0.2s",
  selectors: {
    "&:hover": {
      opacity: 1,
    },
  },
});

export const pageTitle = style({
  fontSize: 20,
  fontWeight: 600,
  margin: 0,
});

export const addForm = style({
  display: "flex",
  gap: 8,
  marginBottom: 20,
});

export const nameInput = style({
  flex: 1,
  padding: "12px 14px",
  fontSize: 15,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  background: vars.color.surface,
  color: vars.color.text,
  outline: "none",
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

export const langSelect = style({
  padding: "12px 14px",
  fontSize: 14,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  background: vars.color.surface,
  color: vars.color.text,
  outline: "none",
  cursor: "pointer",
  selectors: {
    "&:focus": {
      borderColor: vars.color.primary,
    },
  },
});

export const addButton = style({
  padding: "12px 20px",
  fontSize: 14,
  fontWeight: 500,
  background: vars.color.primary,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  transition: "opacity 0.2s",
  selectors: {
    "&:hover": {
      opacity: 0.9,
    },
  },
});

export const recipientList = style({
  listStyle: "none",
  padding: 0,
  margin: "0 0 20px 0",
});

export const recipientItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 16px",
  background: vars.color.surface,
  borderRadius: 10,
  marginBottom: 8,
});

export const recipientInfo = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const recipientName = style({
  fontSize: 15,
  fontWeight: 500,
});

export const recipientLang = style({
  fontSize: 12,
  padding: "4px 8px",
  background: vars.color.background,
  borderRadius: 4,
  color: vars.color.text,
  opacity: 0.7,
});

export const removeButton = style({
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  background: "transparent",
  border: "none",
  borderRadius: "50%",
  color: vars.color.text,
  opacity: 0.4,
  cursor: "pointer",
  transition: "all 0.2s",
  selectors: {
    "&:hover": {
      opacity: 1,
      background: "rgba(255,0,0,0.1)",
      color: "#e53935",
    },
  },
});

export const sendAllButton = style({
  width: "100%",
  padding: "16px",
  fontSize: 16,
  fontWeight: 600,
  background: "#FEE500",
  color: "#000",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  transition: "opacity 0.2s",
  selectors: {
    "&:hover": {
      opacity: 0.9,
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
});

export const emptyState = style({
  textAlign: "center",
  padding: "60px 20px",
  color: vars.color.text,
  opacity: 0.5,
  fontSize: 14,
  lineHeight: 1.8,
});

export const sendingOverlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3000,
});

export const sendingText = style({
  background: vars.color.surface,
  padding: "32px 40px",
  borderRadius: 16,
  textAlign: "center",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.8,
});
