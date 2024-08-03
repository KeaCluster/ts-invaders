// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  base: "/ts-invaders/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
