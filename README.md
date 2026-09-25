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
src/pages/<ano>/index.astro   route of each letter: metadata only, renders the letter
src/anos/<ano>/               each letter: Carta.astro, estilo.css, fotos/, componentes/
src/pages/[video]/            the video years (2014, 2015, 2020)
src/components/               shared: NavAnos, VoltarInicio
src/data/                     anos.ts (the list of years), transcricoes/
src/layouts/BaseLayout.astro  shared <head>
public/                       copied verbatim to the site root — paths are URLs
  <ano>.jpg                   covers, also the WhatsApp preview image
  <ano>/                      only files that need a fixed URL (raw-text.txt, mp3)
scripts/                      dev-fresh.mjs, verificar-site.mjs
notes/                        idea bank and backlog (public on purpose)
```
