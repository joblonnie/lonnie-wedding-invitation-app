import { globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("body", {
  margin: 0,
  fontFamily: vars.font.body,
  background: vars.color.background,
  color: vars.color.text,
  lineHeight: 1.6,
  letterSpacing: "-0.01em",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("button, select", {
  font: "inherit",
});

globalStyle("h1, h2, h3", {
  fontFamily: vars.font.heading,
  fontWeight: 300,
  letterSpacing: "-0.02em",
});

// 스크롤바 숨기기 (스크롤 기능은 유지)
globalStyle("::-webkit-scrollbar", {
  display: "none",
});

globalStyle("html", {
  scrollbarWidth: "none",
});

export const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const scrollReveal = keyframes({
  from: { opacity: 0, transform: "translateY(30px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const envelopeSlideUp = keyframes({
  from: { opacity: 0, transform: "translateY(40px) scale(0.95)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

export const petalFall = keyframes({
  "0%": { opacity: 1, transform: "translateY(-10%) rotate(0deg)" },
  "100%": { opacity: 0, transform: "translateY(110vh) rotate(720deg)" },
});

export const gentleSway = keyframes({
  "0%, 100%": { transform: "rotate(-3deg)" },
  "50%": { transform: "rotate(3deg)" },
});
