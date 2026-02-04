import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const storyContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 32,
});

export const coupleNames = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  fontSize: 32,
  fontWeight: 200,
  letterSpacing: "-0.02em",
  color: vars.color.text,
  "@media": {
    "(min-width: 480px)": {
      fontSize: 40,
      gap: 32,
    },
  },
});

export const heart = style({
  color: vars.color.primary,
  fontSize: 14,
  opacity: 0.6,
});

export const storyText = style({
  textAlign: "center",
  color: vars.color.text,
  opacity: 0.6,
  fontSize: 14,
  lineHeight: 1.8,
  maxWidth: 320,
  margin: 0,
});

export const timeline = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
  marginTop: 8,
  width: "100%",
  maxWidth: 400,
  "@media": {
    "(min-width: 480px)": {
      gap: 24,
    },
  },
});

export const timelineItem = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 6,
  minHeight: 80,
});

export const timelineLabel = style({
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: vars.color.text,
  opacity: 0.4,
});

export const timelineValue = style({
  fontSize: 13,
  color: vars.color.text,
  opacity: 0.8,
});

export const daysCount = style({
  fontSize: 18,
  fontWeight: 300,
  color: vars.color.primary,
  letterSpacing: "-0.01em",
  "@media": {
    "(min-width: 480px)": {
      fontSize: 20,
    },
  },
});
