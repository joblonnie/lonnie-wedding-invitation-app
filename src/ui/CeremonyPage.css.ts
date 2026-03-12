import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(14px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 32,
});

export const infoCard = style({
  width: "100%",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: "28px 24px",
  textAlign: "center",
  animation: `${fadeUp} 0.5s ease-out 0.1s backwards`,
});

export const infoLabel = style({
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
  margin: "0 0 10px",
});

export const infoDate = style({
  fontFamily: vars.font.handwriting,
  fontSize: 24,
  fontWeight: 400,
  color: vars.color.text,
  margin: 0,
  lineHeight: 1.4,
});

export const infoVenue = style({
  fontFamily: vars.font.handwriting,
  fontSize: 20,
  fontWeight: 400,
  color: vars.color.text,
  margin: 0,
  lineHeight: 1.4,
});

export const infoAddress = style({
  fontSize: 13,
  color: vars.color.textMuted,
  margin: "8px 0 0",
});

export const dividerDeco = style({
  width: 50,
  color: vars.color.primary,
  opacity: 0.3,
});

// 예식 순서
export const orderSection = style({
  width: "100%",
  animation: `${fadeUp} 0.5s ease-out 0.3s backwards`,
});

export const orderTitle = style({
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
  textAlign: "center",
  margin: "0 0 20px",
});

export const orderList = style({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  position: "relative",
});

export const orderLine = style({
  position: "absolute",
  left: 20,
  top: 12,
  bottom: 12,
  width: 1,
  background: vars.color.border,
});

export const orderItem = style({
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "12px 0",
  position: "relative",
  zIndex: 1,
});

export const orderDot = style({
  width: 9,
  height: 9,
  borderRadius: "50%",
  border: `1.5px solid ${vars.color.primary}`,
  background: vars.color.surface,
  flexShrink: 0,
  marginLeft: 16,
});

export const orderText = style({
  fontSize: 15,
  color: vars.color.text,
  fontFamily: vars.font.handwriting,
});

export const orderTime = style({
  fontSize: 12,
  color: vars.color.textMuted,
  marginLeft: "auto",
  flexShrink: 0,
});

// 액션 영역
export const actionsSection = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
  animation: `${fadeUp} 0.5s ease-out 0.5s backwards`,
});
