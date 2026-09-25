# michellenogueira.info

One page per year for Michelle Nogueira, published on her birthday (30/09).
Built with [Astro](https://astro.build) as a static site and deployed to GitHub
Pages.

**Details live in [`CLAUDE.md`](CLAUDE.md)**: who the reader is, the mobile and
type-size rules, how the yearly release works, how to add a year, and what
each year's page already did. Pending work is in
[`notes/backlog-melhorias.md`](notes/backlog-melhorias.md).

## Running it

Node 22 (see `.nvmrc`).

```bash
npm install          # once
npm run dev          # http://localhost:4321 — shows every year's card
npm run dev -- --host   # same, reachable from a phone on the LAN
npm run dev:fresh    # frees ports 4321/4322 and clears caches first (Windows)
npm run build        # produces dist/
npm run verificar    # build + check public URLs and internal links
npm run preview      # serves dist/ at http://localhost:4322
```

## Publishing

Every push to `main` builds and deploys (`.github/workflows/deploy.yml`).
A year's gallery card only appears on the live site from 29/09 of that year;
`.github/workflows/release.yml` rebuilds the site on 29 and 30 September so it
does. **Re-enable that schedule every year** before 29/09 — GitHub turns it off
after 60 days without activity. See `CLAUDE.md` §4.

Pull requests run `npm run verificar` (`.github/workflows/verificar.yml`).

## Layout

```
src/pages/index.astro         the gallery
src/pages/<ano>/index.astro   each year from 2025 on
src/styles/<ano>.css          plain CSS per year (Tailwind is only for 2025)
src/layouts/BaseLayout.astro  shared <head>
public/                       copied verbatim to the site root — paths are URLs
  <ano>.jpg                   covers, also the WhatsApp preview image
  2023/ 2024/                 older hand-written pages, preserved as-is
  2014/ 2015/ 2020/           transcripts of the video years
scripts/                      dev-fresh.mjs, verificar-site.mjs
notes/                        idea bank and backlog (public on purpose)
```
