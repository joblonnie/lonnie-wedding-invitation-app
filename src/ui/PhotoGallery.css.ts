import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
  "@media": {
    "(min-width: 720px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
  },
});

export const image = style({
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  borderRadius: 14,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
});

