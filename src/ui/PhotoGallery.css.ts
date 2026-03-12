import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const carouselContainer = style({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  userSelect: "none",
  WebkitUserSelect: "none",
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
});

export const carouselTrack = style({
  display: "flex",
});

export const carouselSlide = style({
  minWidth: "100%",
  boxSizing: "border-box",
  cursor: "pointer",
});

export const image = style({
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  display: "block",
  background: vars.color.background,
  pointerEvents: "none",
  animation: `${fadeIn} 0.4s ease`,
});

export const carouselNav = style({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.primary,
  transition: "all 0.2s ease",
  zIndex: 10,
  padding: 0,
  ":active": {
    transform: "translateY(-50%) scale(0.95)",
  },
});

export const navPrev = style({
  left: 8,
});

export const navNext = style({
  right: 8,
});

export const indicators = style({
  display: "flex",
  justifyContent: "center",
  gap: 8,
  marginTop: 16,
});

export const indicator = style({
  width: 7,
  height: 7,
  borderRadius: "50%",
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  cursor: "pointer",
  padding: 0,
  transition: "all 0.2s ease",
});

export const indicatorActive = style({
  background: vars.color.primary,
  borderColor: vars.color.primary,
  transform: "scale(1.3)",
});
