import { style } from "@vanilla-extract/css";
import { vars } from "./theme/theme.css";

export const heroContainer = style({
  width: "100%",
  height: 360,
  position: "relative",
  marginBottom: 16,
  overflow: "hidden",
  borderRadius: vars.radius.lg,
  "@media": {
    "(min-width: 480px)": {
      height: 420,
    },
  },
});
