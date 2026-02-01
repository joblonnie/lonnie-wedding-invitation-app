import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  base: "/lonnie-wedding-invitation-app/",
  plugins: [vanillaExtractPlugin(), react()],
});

