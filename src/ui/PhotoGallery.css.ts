import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const carouselContainer = style({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  userSelect: "none",
  WebkitUserSelect: "none",
});

export const carouselTrack = style({
  display: "flex",
});

export const carouselSlide = style({
  minWidth: "100%",
  padding: "0 4px",
  boxSizing: "border-box",
  cursor: "pointer",
});

export const image = style({
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  borderRadius: 8,
  background: vars.color.background,
  pointerEvents: "none",
});

export const carouselNav = style({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.9)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  color: vars.color.text,
  transition: "all 0.2s ease",
  zIndex: 10,
  selectors: {
    "&:hover": {
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    "&:disabled": {
      opacity: 0.3,
      cursor: "not-allowed",
    },
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
  width: 8,
  height: 8,
  borderRadius: "50%",
  border: "none",
  background: vars.color.border,
  cursor: "pointer",
  padding: 0,
  transition: "all 0.2s ease",
});

export const indicatorActive = style({
  background: vars.color.primary,
  transform: "scale(1.2)",
});
