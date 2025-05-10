import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0, // Prevents inlining assets
    rollupOptions: {
      input: "src/main.jsx",
      output: {
        entryFileNames: "[name].js", // Ensures output is .js instead of .jsx
        assetFileNames: "[name].[ext]", // Prevents random renaming of assets
      },
    },
  },
});