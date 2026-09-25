import { defineConfig } from "astro/config";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://astro.build/config
export default defineConfig({
  // Custom domain served at the root.
  site: "https://michellenogueira.info",
  // Astro 7 changed the default to "jsx", which drops the space between inline
  // elements written on separate lines (`<em>só</em>` + newline + `para você`
  // would read "sópara você"). The letters are hand-written HTML: keep the old rule.
  compressHTML: true,
  vite: {
    css: {
      postcss: {
        // Tailwind 3 is used ONLY by the 2025 page (its content globs in
        // tailwind.config.mjs are scoped to it, and 2025.css carries its own
        // @tailwind base). This is exactly what @astrojs/tailwind did with
        // applyBaseStyles: false; the integration stopped at Astro 5.
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    build: {
      // Vite 8 minifies CSS with Lightning CSS, which rewrites rules (hsl → hex,
      // gradients reversed) and drops -webkit-backdrop-filter when the
      // unprefixed one sits next to it (iOS < 18 loses the blur). esbuild is
      // what Astro 5 used: same output as before the upgrade.
      cssMinify: "esbuild",
    },
    resolve: {
      // Added when the repo lived under an NTFS junction (C:\GitHub →
      // D:\moved-from-C\GitHub): without it, Vite followed the junction via
      // fs.realpath() and generated /@fs/D:/... URLs that its own sandbox then
      // blocked. The repo is now on X:\ which is not a junction anymore, and
      // since `npm run dev` and `npm run build` still work (REPO-05) I turned off.
      preserveSymlinks: false,
    },
  },
});
