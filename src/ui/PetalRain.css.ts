import { style } from "@vanilla-extract/css";

export const canvasOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 100,
});
