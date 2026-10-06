import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Los archivos compilados van a dist/static para no mezclarse con public/assets (fuentes e imágenes).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "static",
  },
});
