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
  fontFamily:
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", sans-serif',
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

