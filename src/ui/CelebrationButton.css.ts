import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  marginTop: 32,
  position: "relative",
});

const pulse = keyframes({
  "0%": { transform: "scale(1)" },
  "25%": { transform: "scale(1.3)" },
  "50%": { transform: "scale(0.95)" },
  "100%": { transform: "scale(1)" },
});

export const heartButton = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 16,
  fontSize: 32,
  lineHeight: 1,
  transition: "transform 0.1s ease",
  position: "relative",
  selectors: {
    "&:active": {
      transform: "scale(0.9)",
    },
  },
});

export const heartIcon = style({
  display: "block",
  transition: "all 0.2s ease",
});

export const heartIconActive = style({
  animation: `${pulse} 0.4s ease`,
});

export const heartEmpty = style({
  color: vars.color.text,
  opacity: 0.3,
});

export const heartFilled = style({
  color: "#ff4d6d",
});

export const miniHearts = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
});

export const miniHeart = style({
  position: "absolute",
  fontSize: 12,
  color: "#ff4d6d",
  opacity: 0.7,
});

const floatUp = keyframes({
  "0%": {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  },
  "100%": {
    opacity: 0,
    transform: "translateY(-80px) scale(1.5)",
  },
});

export const heartsContainer = style({
  position: "absolute",
  bottom: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  pointerEvents: "none",
  width: 120,
  height: 100,
});

export const floatingHeart = style({
  position: "absolute",
  bottom: 0,
  fontSize: 20,
  animation: `${floatUp} 0.8s ease-out forwards`,
  color: "#ff4d6d",
});
