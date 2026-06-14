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
});
