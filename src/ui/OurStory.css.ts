import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const drawIn = keyframes({
  from: { strokeDashoffset: "100" },
  to: { strokeDashoffset: "0" },
});

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(14px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const storyContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
});

// 커플 이름 영역
export const coupleNames = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  fontFamily: vars.font.handwriting,
  fontSize: 34,
  fontWeight: 400,
  letterSpacing: "0.02em",
  color: vars.color.text,
  lineHeight: 1.4,
  "@media": {
    "(min-width: 480px)": {
      fontSize: 40,
    },
  },
});

export const heart = style({
  fontFamily: vars.font.heading,
  fontStyle: "italic",
  color: vars.color.primary,
  fontSize: 18,
});

// 스토리 텍스트
export const storyText = style({
  textAlign: "center",
  fontFamily: vars.font.handwriting,
  color: vars.color.text,
  fontSize: 18,
  lineHeight: 2,
  maxWidth: 300,
  margin: 0,
  padding: "28px 20px",
  position: "relative",
  animation: `${fadeUp} 0.6s ease-out 0.3s backwards`,
});

// 세로 타임라인
export const timeline = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
  marginTop: 32,
  width: "100%",
  maxWidth: 320,
  position: "relative",
});

export const timelineLine = style({
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: 1,
  background: vars.color.border,
  transform: "translateX(-50%)",
});

export const timelineItem = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
  padding: "20px 0",
  position: "relative",
  zIndex: 1,
  animation: `${fadeUp} 0.5s ease-out backwards`,
  selectors: {
    "&:nth-child(1)": { animationDelay: "0.2s" },
    "&:nth-child(2)": { animationDelay: "0.4s" },
    "&:nth-child(3)": { animationDelay: "0.6s" },
  },
});

export const timelineDot = style({
  width: 10,
  height: 10,
  borderRadius: "50%",
  border: `1.5px solid ${vars.color.primary}`,
  background: vars.color.surface,
  marginBottom: 8,
});

export const timelineLabel = style({
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: "0.12em",
  color: vars.color.textMuted,
  textTransform: "uppercase",
});

export const timelineValue = style({
  fontSize: 13,
  color: vars.color.text,
});

export const daysCount = style({
  fontFamily: vars.font.handwriting,
  fontSize: 24,
  fontWeight: 400,
  color: vars.color.primary,
  "@media": {
    "(min-width: 480px)": {
      fontSize: 28,
    },
  },
});

// 장식용 SVG
export const decoSvg = style({
  width: 60,
  height: "auto",
  color: vars.color.primary,
  opacity: 0.35,
  animation: `${fadeUp} 0.8s ease-out 0.1s backwards`,
});
