import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";
import { scrollReveal } from "./theme/global.css";

const staggerIn = keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const appContainer = style({
  minHeight: "100vh",
  background: vars.color.surface,
});

export const card = style({
  width: "min(560px, 100%)",
  margin: "0 auto",
  padding: "60px 24px 80px",
});

export const headerRow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 16,
  marginBottom: 48,
});

export const headerTitle = style({
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: vars.color.primary,
  margin: 0,
});

export const greeting = style({
  fontSize: 14,
  fontWeight: 400,
  color: vars.color.textMuted,
  margin: "0 0 8px",
});

export const headerSubtitle = style({
  fontSize: 14,
  color: vars.color.textMuted,
  margin: 0,
  fontWeight: 400,
});

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  textAlign: "center",
});

export const section = style({
  marginTop: 56,
});

export const sectionTitle = style({
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: vars.color.primary,
  marginTop: 0,
  marginBottom: 24,
  textAlign: "center",
});

export const divider = style({
  width: 40,
  height: 1,
  background: vars.color.border,
  margin: "48px auto",
});

// === 메인 페이지: 커플 이름 ===

export const coupleNamesLarge = style({
  fontFamily: vars.font.handwriting,
  fontSize: 36,
  fontWeight: 400,
  letterSpacing: "0.02em",
  margin: 0,
  lineHeight: 1.4,
  color: vars.color.text,
});

export const ampersand = style({
  display: "inline-block",
  margin: "0 10px",
  fontSize: 24,
  color: vars.color.primary,
  fontWeight: 300,
});

// === 메인 페이지: 예식 요약 ===

export const heroSummary = style({
  textAlign: "center",
  marginTop: 20,
});

export const heroDate = style({
  fontSize: 15,
  fontWeight: 400,
  color: vars.color.text,
  margin: 0,
  letterSpacing: "0.02em",
});

export const heroVenue = style({
  fontSize: 13,
  color: vars.color.textMuted,
  margin: "4px 0 0",
  fontWeight: 400,
});

// === 메인 페이지: 퀵 액션 (캘린더/공유) ===

export const quickActions = style({
  display: "flex",
  justifyContent: "center",
  gap: 10,
  marginTop: 28,
  flexWrap: "wrap",
});

export const quickActionButton = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 18px",
  border: `1px solid ${vars.color.border}`,
  borderRadius: 999,
  background: "transparent",
  color: vars.color.text,
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.02em",
  cursor: "pointer",
  fontFamily: "inherit",
  textDecoration: "none",
  transition: "all 0.2s ease",
  ":active": {
    transform: "scale(0.96)",
  },
});

// === 메인 페이지: 네비게이션 ===

export const navGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginTop: 44,
});

export const navCard = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "24px 16px",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  color: vars.color.text,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "all 0.25s ease",
  animation: `${staggerIn} 0.5s ease-out backwards`,
  ":active": {
    transform: "scale(0.97)",
  },
});

export const navCardIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  color: vars.color.primary,
});

export const navCardFullWidth = style({
  gridColumn: "1 / -1",
});

// === 서브 페이지: 뒤로 가기 ===

export const backButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 0",
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontSize: 13,
  fontWeight: 400,
  cursor: "pointer",
  fontFamily: "inherit",
  marginBottom: 20,
  transition: "color 0.2s ease",
  ":active": {
    color: vars.color.text,
  },
});

// === 스크롤 애니메이션 ===

export const scrollRevealHidden = style({
  opacity: 0,
  transform: "translateY(30px)",
});

export const scrollRevealVisible = style({
  animation: `${scrollReveal} 0.7s ease-out forwards`,
});
