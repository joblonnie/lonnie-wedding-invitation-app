import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const heroContainer = style({
  display: "flex",
  justifyContent: "center",
  padding: "12px 0 0",
  marginBottom: 0,
  color: vars.color.text,
});

export const heroFrame = style({
  position: "relative",
  width: "min(340px, 88%)",
  aspectRatio: "360 / 440",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const heroContent = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  animation: `${fadeUp} 1s ease-out 0.3s backwards`,
});

export const heroNames = style({
  fontFamily: vars.font.handwriting,
  fontSize: 34,
  fontWeight: 400,
  letterSpacing: "0.02em",
  lineHeight: 1.5,
  margin: 0,
  textAlign: "center",
  color: vars.color.text,
  "@media": {
    "(min-width: 480px)": {
      fontSize: 40,
    },
  },
});

export const heroAmp = style({
  display: "block",
  fontSize: 20,
  fontFamily: vars.font.heading,
  fontWeight: 300,
  fontStyle: "italic",
  color: vars.color.primary,
  margin: "2px 0",
  "@media": {
    "(min-width: 480px)": {
      fontSize: 24,
    },
  },
});

export const heroDateText = style({
  fontSize: 15,
  fontWeight: 400,
  color: vars.color.text,
  margin: 0,
  letterSpacing: "0.03em",
  marginTop: 8,
});

export const heroVenueText = style({
  fontSize: 13,
  color: vars.color.textMuted,
  margin: 0,
  fontWeight: 400,
});
