import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Custom domain served at the root.
  site: "https://michellenogueira.info",
  integrations: [
    tailwind({
      // Tailwind is used ONLY by the 2025 page. Don't inject Tailwind's
      // global base/preflight reset, which would disturb the hand-written
      // landing / 2023 / 2024 pages. The 2025 page imports its own base.
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      // Added when the repo lived under an NTFS junction (C:\GitHub →
      // D:\moved-from-C\GitHub): without it, Vite followed the junction via
      // fs.realpath() and generated /@fs/D:/... URLs that its own sandbox then
      // blocked. The repo is now on X:\. Only remove after checking on that
      // machine that `npm run dev` and `npm run build` still work (REPO-05).
      preserveSymlinks: true,
    },
  },
});
