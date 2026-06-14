# michellenogueira.info

A tribute site for Michelle Nogueira — one page per year, growing over time.
Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## How it works

- **One stack, one build, one deploy.** Everything lives in this repo and is
  built by a single GitHub Action on every push to `main`. There is no more
  "build the React app and copy `dist/` by hand" step.
- The site is **static HTML/CSS/JS** — fully native to GitHub Pages.

## Project layout

```
src/
  layouts/BaseLayout.astro      Shared <head>/meta/fonts shell for Astro pages
  pages/
    index.astro                 The gallery landing (the hub of years)
    2025/index.astro            The 2025 letter (Astro + vanilla JS + Tailwind)
    404.astro                   Friendly not-found page
  components/year2025/          Small building blocks used only by the 2025 page
  styles/2025.css               Romantic design tokens (scoped to 2025)
  assets/2025/                  Images imported & optimized by Astro

public/                         Copied to the site root verbatim
  CNAME  robots.txt  favicon.ico
  2014.jpg … 2025.jpg           Gallery cover images
  2023/  2024/                  Older bespoke pages, preserved exactly as-is
```

Tailwind is used **only** by the 2025 page; it is scoped in
`tailwind.config.mjs` so its reset and utilities never touch the other pages.

## Local development

```bash
npm install     # once
npm run dev      # live-reloading preview at http://localhost:4321
npm run build    # produce dist/ (what gets deployed)
npm run preview  # serve the built dist/ locally
```

## Adding a new year

1. Add the cover image to `public/<year>.jpg`.
2. Add an entry to the top of the `years` array in `src/pages/index.astro`.
3. Create the page at `src/pages/<year>/index.astro`. Two easy options:
   - **Simple/bespoke:** use `BaseLayout` and write plain HTML + a `<style>`
     block (see `404.astro` for the pattern).
   - **Rich/animated:** copy `src/pages/2025/index.astro` as a starting point.
4. `git commit` and push to `main` — the Action builds and deploys.

To preserve an old hand-written page exactly as-is, just drop its folder into
`public/<year>/` (like `2023/` and `2024/`); it's served untouched.

## Deployment (one-time setup)

This repo deploys via GitHub Actions (`.github/workflows/deploy.yml`).
In **GitHub → Settings → Pages**, set **Source = "GitHub Actions"** (instead of
"Deploy from a branch"). After that, every push to `main` publishes
automatically. The custom domain (`michellenogueira.info`) is kept via
`public/CNAME`.
