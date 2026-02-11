import { style, keyframes } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.92)",
  zIndex: 3000,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  animation: `${fadeIn} 0.2s ease`,
  userSelect: "none",
  WebkitUserSelect: "none",
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  touchAction: "none",
});

export const lightboxImage = style({
  maxWidth: "90vw",
  maxHeight: "80vh",
  objectFit: "contain",
  transition: "transform 0.2s ease",
  pointerEvents: "none",
});

export const navButton = style({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.15)",
  color: "#fff",
  fontSize: 20,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s ease",
  zIndex: 10,
  selectors: {
    "&:hover": {
      background: "rgba(255,255,255,0.3)",
    },
  },
});

export const navPrev = style({
  left: 12,
});

export const navNext = style({
  right: 12,
});

export const closeButton = style({
  position: "absolute",
  top: 16,
  right: 16,
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.15)",
  color: "#fff",
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  transition: "background 0.2s ease",
  selectors: {
    "&:hover": {
      background: "rgba(255,255,255,0.3)",
    },
  },
});

export const counter = style({
  position: "absolute",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  color: "rgba(255,255,255,0.7)",
  fontSize: 14,
  fontWeight: 400,
  zIndex: 10,
});
