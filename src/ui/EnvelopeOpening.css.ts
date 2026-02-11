import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const pulseGlow = keyframes({
  "0%, 100%": { boxShadow: `0 0 8px ${vars.color.accent}` },
  "50%": { boxShadow: `0 0 18px ${vars.color.accent}` },
});

const hintBounce = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-4px)" },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: vars.color.background,
  opacity: 1,
  transition: "opacity 0.6s ease, visibility 0.6s ease",
});

export const overlayHidden = style({
  opacity: 0,
  pointerEvents: "none",
  visibility: "hidden",
  transition: "opacity 0.6s ease, visibility 0.6s ease",
});

export const envelope = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  perspective: "1000px",
  maxWidth: 280,
  width: "100%",
  cursor: "pointer",
  "@media": {
    "(max-width: 320px)": {
      transform: "scale(0.85)",
    },
  },
});

export const envelopeBody = style({
  position: "relative",
  width: "100%",
  aspectRatio: "3 / 4",
  background: vars.color.surfaceAlt,
  borderRadius: vars.radius.md,
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
});

export const flapContainer = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "50%",
  transformOrigin: "top center",
  transformStyle: "preserve-3d",
  zIndex: 2,
});

export const flap = style({
  width: "100%",
  height: "100%",
  background: vars.color.primaryLight,
  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  transformOrigin: "top center",
});

export const flapOpen = style({
  transform: "rotateX(180deg)",
});

export const cardInner = style({
  position: "absolute",
  top: "10%",
  left: "10%",
  right: "10%",
  bottom: "10%",
  background: vars.color.surface,
  borderRadius: vars.radius.sm,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 1,
});

export const cardSlideUp = style({
  transform: "translateY(-60%)",
});

export const waxSeal = style({
  position: "absolute",
  bottom: "8%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: vars.color.accent,
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 2px 8px rgba(0,0,0,0.15)`,
  animation: `${pulseGlow} 2s ease-in-out infinite`,
  transition: "opacity 0.4s ease",
});

export const waxSealHidden = style({
  opacity: 0,
  animation: "none",
});

export const sealIcon = style({
  color: vars.color.surface,
  fontSize: 18,
  fontFamily: vars.font.heading,
  fontWeight: 600,
  lineHeight: 1,
});

export const tapHint = style({
  marginTop: 24,
  color: vars.color.textMuted,
  fontSize: 14,
  fontFamily: vars.font.body,
  letterSpacing: "0.02em",
  animation: `${hintBounce} 2s ease-in-out infinite`,
});
