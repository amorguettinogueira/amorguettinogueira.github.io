# CLAUDE.md — michellenogueira.info

Briefing for any future Claude session working on this repo. It exists so the
next letter (2027 and beyond) does not start from zero.

Read this file first, then `notes/banco-de-ideias.md`, which is the *content*
memory: raw material, unused concepts, verified dates and numbers, pendências.
This file is the *working* memory: who the reader is, how Adriano likes to work,
the rules that must not be broken, and what was learned building past pages.
Pending UI/UX and repo-structure work lives in `notes/backlog-melhorias.md`,
one checkbox per item, meant to be tackled one session at a time.

---

## 1. What this is

One page per year, each a declaration of love from **Adriano ("Dri")** to his
wife **Michelle ("Mi") Nogueira**, published on her birthday, **30 September**.
Michelle was born 30/09/1982, so her age in any year is `ano - 1982`.

Two daughters, both of whom have appeared in the letters:

- **Gabriela ("Gab")** — Adriano's daughter from an earlier relationship. 27 in 2026.
- **Rafaela ("Rafa")** — Adriano and Michelle's daughter. 9 in 2026.

The couple's own start date, the base of every count on the site, is
**14/03/2012** (when the relationship was made official). Civil marriage
04/05/2013; religious ceremony 20/09/2014.

Michelle **does not know** the page exists until the day. See §4 — including
the yearly step of re-enabling the release schedule, which must be done
before 29/09 or the new card never goes live.

---

## 2. How Adriano wants to work

These are preferences he has stated explicitly. They are not guesses.

- **Ideas, not prose.** When he asks for help conceiving a letter he wants
  *concepts* to react to — "ideas to fill her eyes with tears" — not a draft.
  He writes the text himself. Offer structure, angles and an argument; let him
  put it in his own voice.
- **Invoke the design skills.** He said: *"you have at your disposal two or
  three web design skills so remember to invoke them when the time comes."*
  The 2026 page used `frontend-design:frontend-design`. Do this before
  designing, not after.
- **Review in plain Brazilian Portuguese.** Feedback, critique and grammar
  notes go in pt-BR, plainly, without jargon.
- **Grammar review focus.** He asks for this every year and names the same
  weak spots: **porquês, crase, pontuação (vírgula, ponto, traço)** — and
  above all **vírgula de vocativo**, which he says is what he most tends to
  miss. Check every "Mi,", "Gab e Rafa,", "Lindula," and every direct address
  buried mid-sentence. Also watch: hyphens that should be em dashes,
  `daqui há` → `daqui a`, `onde` used for non-places, subject–verb agreement
  after long subjects, and compound words (`mal-estar`, `superpoder`).
- **He iterates.** Expect several rounds of structural critique followed by
  several rounds of proofreading. Do not rush to the page: in 2026 he said
  *"não parta ainda à confecção da página, quero validar o texto antes."*
- **He commits and pushes as he goes.** Assume anything written to disk may be
  on `main` within minutes. See §4.

---

## 3. The reader — non-negotiable constraints

- **Mobile is paramount.** His words: *"é importante (paramount) que funcione
  bem em celular"* — Michelle reads these on her phone, as a rule. Design
  mobile-first and verify on a real phone over the LAN
  (`npm run dev -- --host` and open `http://<lan-ip>:4321/<ano>/`).
- **She wears reading glasses. So does he.** In 2026 he rejected the first
  build for small type. The rule that came out of it: **nothing carrying real
  information may be smaller than the body text.** Body settled at **19px on
  mobile, 21px on desktop**. Secondary lines (dates, counter captions) went to
  18–19px. Never demote a paragraph with `font-size: 0.9em` to make a layout
  work.
- **It is a birthday, not a memorial.** He rejected a first pass as *"meio
  sério demais para aniversário, sem nada para animar."* The fix he accepted
  was warmth, not decoration: a warmer paper, gradient bands opening and
  closing the page. He explicitly did **not** want floating hearts or confetti.
- **Use the width on desktop.** A 34rem measure made the 2026 page scroll
  12.539px. Widening to a 64ch prose column cut it to ~10.000px. Long letters
  need a real desktop layout, not a phone layout stretched.

---

## 4. The surprise — publishing rules

This is the rule most easily broken by an agent being helpful.

- Work on **`main`**. He accepted this over a branch.
- **`public/` is copied verbatim to the site root.** Anything placed there is a
  live URL the moment it is pushed. `public/2026/raw-text.txt` has been public
  at `michellenogueira.info/2026/raw-text.txt` since 08/09/2026. He knows and
  accepts this: *"a Mi não vai ficar googlando ou procurando pelo texto no site
  via URL direta, isso não me preocupa."* Do not propose `robots.txt` changes.
- **The one thing that spoils the surprise is the gallery card.** Since
  25/09/2026 the card releases itself: the gallery (`src/pages/index.astro`,
  reading `src/data/anos.ts`) only renders a year's card — and the previous
  letter only links "next" to it — when the build runs on or after **29/09 of that year, Brasília
  time** (`npm run dev` shows every card). So the card can be added, committed
  and pushed at any time. The page itself may be shared as a direct URL for
  testing well before that.
- **The release only happens if the site is rebuilt on 29/09.** The date check
  runs at build time, and builds only run on push — so
  `.github/workflows/release.yml` triggers the deploy on its own on 29 and 30
  September at 03:15 UTC (00:15 in Brasília).

> **⚠ Every year, as soon as work on the new page starts** (the moment Adriano
> asks for help with the visual part at the latest): GitHub **disables
> scheduled workflows after 60 days without repository activity**, and this
> repo sleeps most of the year. A new commit does **not** re-enable it. Run
> `gh workflow list --all`; if `Release year card` shows `disabled_inactivity`
> (or anything but `active`), run `gh workflow enable release.yml` and tell
> Adriano it was done. Without this the card never appears on the 29th. The
> build log repeats the reminder (`[galeria] Card de <ano> escondido…`) while
> a card is being held back. If it fails anyway, the fallback is Actions →
> "Deploy to GitHub Pages" → "Run workflow", which works from the GitHub app
> on a phone.
>
> The schedule lives in its own file on purpose: a disabled `release.yml` must
> not take the push-triggered `deploy.yml` down with it.
- **The dev toolbar is dev-only.** The "bregueço" at the bottom of the page in
  local preview is the Astro Dev Toolbar. It is absent from `dist/`; nothing
  needs to be done about it. Verified with
  `grep -ril "toolbar\|@vite/client" dist/` (no matches).

---

## 5. Repo facts worth not rediscovering

- **Astro 5.6**, static, deployed by `.github/workflows/deploy.yml` on every
  push to `main` (plus `workflow_dispatch`). Source = "GitHub Actions" in
  repo settings. Custom domain via `public/CNAME`.
- **Tailwind is scoped to the 2025 page only**, via the content globs in
  `tailwind.config.mjs`, and `applyBaseStyles: false` in `astro.config.mjs`.
  New year pages should use **plain CSS** in `src/styles/<ano>.css`, imported
  by the page. Do not widen the Tailwind globs.
- **`src/layouts/BaseLayout.astro`** is the document shell. Props:
  `title`, `description`, `fontsHref` (a Google Fonts URL), `ogImage`
  (absolute path from site root), `lang` (defaults `pt-BR`).
- **Legacy pages 2023 and 2024** are hand-written HTML under `public/<ano>/`;
  they do not use BaseLayout. "Preserved" means the text and the concept, not
  the CSS: both already had a "beautification" pass, and on 25/09/2026 got
  readability fixes (contrast, type size, `lang`, `alt`, page-level scroll).
  Their "← ano · todas as cartas · ano →" footer is a hand-made copy of
  `src/components/NavAnos.astro`. 2014/2015/2020 are pages generated by
  `src/pages/[video]/index.astro`: the YouTube video embedded plus the
  transcript read from `public/<ano>/video-text.txt` at build time.
- **`notes/` is committed on purpose.** He chose public-with-backup over
  private-without: *"melhor ele público com backup do que sem."*
- Shell here is PowerShell; `npm run dev` piped into `head` dies of SIGPIPE.
  Run it unpiped and in the background.
- **`npm run verificar`** builds and then runs `scripts/verificar-site.mjs`:
  every URL already public must still exist in `dist/`, and every internal
  `href`/`src`/`url()` must resolve. Run it before and after moving anything
  out of `public/` — that is the one change the build does not catch. The list
  of public URLs is at the top of the script: covers are picked up on their
  own, but add each new year's page and extra files (`raw-text.txt`, audio). Pull
  requests run it automatically (`.github/workflows/verificar.yml`).
- **`npm run dev:fresh`** frees ports 4321 (dev) and 4322 (preview) and
  clears the Vite/Astro caches. It replaced `run.bat` and
  `kill-zombie-process.ps1`. Windows-only (`netstat` + `taskkill`).
- **Node 22** (`.nvmrc`, `engines`), the same as the deploy.
- **Tailwind is frozen at 3.4.19** (exact versions in `package.json`). Do not
  run `npm update` blindly and do not move to Tailwind 4: `@astrojs/tailwind`
  does not support it and `tailwind.config.mjs` uses `require` in an ESM file.

### Constraints found in the repo-hygiene PR (for Adriano to review)

- **`preserveSymlinks` was kept (REPO-05).** Only its comment was updated.
  Whether `X:\` is also a junction/`subst` cannot be tested from a cloud
  session; remove it on the Windows machine, then run `npm run dev` and
  `npm run build`.
- **Local Node is still 20.16 (REPO-10).** `engines` only warns, it does not
  block `npm install`. Update the local Node to 22 (`nvm install 22` /
  `nvm use`), or `npm ci` will keep printing an engine warning.
- **`dev-fresh.mjs` stays Windows-only.** It no-ops harmlessly elsewhere
  (reports both ports free), which is what a cloud session sees.
- **The first run of the checker found only false positives** — a
  commented-out `<!--img src="./image07.jpg"/-->` in `public/2024/index.html`
  and `url(%23n)` filter references inside inline SVG data URIs. Both are now
  skipped. No real broken link exists on the site today.
- **The optional screenshot script** from the audit (REPO-01) was not
  recreated: it depended on Edge on his machine. The cloud sessions can use
  the preinstalled Playwright Chromium instead; worth a `scripts/` version
  when REPO-07/08 move files around.
- **`verificar` was not added to `deploy.yml`** (the backlog marks that file
  "não mexer"); it runs on pull requests instead. Commits pushed straight to
  `main` are not checked — run `npm run verificar` locally first.

### Adding a year

1. Cover image at `public/<ano>.jpg` — also the Open Graph image, so the
   WhatsApp link preview depends on it. Keep it in the ~100–300 KB range like
   the others.
2. `src/pages/<ano>/index.astro` + `src/styles/<ano>.css`. End the letter
   with `<NavAnos ano={<ano>} />` (`src/components/NavAnos.astro`).
3. Body text at `public/<ano>/raw-text.txt`, kept **paired with what the page
   publishes**. Page chrome (headings, captions, counter labels) does *not*
   need to match — he confirmed this. Only the letter body does.
4. In `src/data/anos.ts`, prepend to `ANOS`
   `{ ano: <ano>, href: "/<ano>/", capa: "/<ano>.jpg", tipo: "carta", conceito: "…" },`.
   The age is computed (`ano - 1982`). This can be done any time: the card,
   and the previous letter's "next" link, stay hidden on the live site until
   29/09 (see §4). The landing page's `ogImage` follows the newest visible
   card on its own.
5. **Re-enable the release schedule** — `gh workflow list --all`, then
   `gh workflow enable release.yml` if it is not `active`. See the warning in
   §4. Do not skip this; it is the step nobody will remember.

The gallery needs nothing else. Since 2026 the card entrance delay is computed
from each card's index, and an odd count centres the last card instead of
orphaning it on the left — both scale to any number of years. `BaseLayout`
turns `ogImage` into an absolute URL (Open Graph requires it; WhatsApp drops
the preview image with a relative path), so pass a site-root path as usual.

---

## 6. The archive — what each year already did

Do not repeat a concept. The arc so far:

| Ano | Conceito |
|---|---|
| 2014 | Alquimia — ela transforma o que toca |
| 2015 | Etimologia — a origem das palavras dela |
| 2020 | Crowd-sourcing — outras pessoas falando dela (vídeo) |
| 2023 | Os atos ordinários, o que não se vê |
| 2024 | Fábula; promessa de bodas de ouro em 2063 |
| 2025 | Admitir que ele não consegue lê-la |
| 2026 | Falar com as filhas e deixar que ela leia por cima do ombro |

Six unused concepts, plus the wedding-story letter he wants to write next, are
written up in `notes/banco-de-ideias.md` §2. The "Quem é como Deus?" ending is
deliberately held in reserve there (§2.7).

---

## 7. The 2026 page — design decisions and why

`src/pages/2026/index.astro` + `src/styles/2026.css`. Worth reading before
building 2027; worth reusing where it earned its keep.

**Concept.** A letter addressed to the daughters that Michelle reads over their
shoulder. One typeface (Newsreader) because it is one person's handwriting;
the voices are separated by measure, alignment and addressee — not by font.
Warm bands at the open and close (it is a birthday), pale paper through the
middle (it is testimony), and night for the 2041 section.

**Section order.** abertura → bilhete "Mi," → "Gab e Rafa," → Gabriela →
Rafaela → tese "Para as duas" → tempo (selo + futuro + revelação) → fecho.

**Three pieces of client JS**, all progressive-enhancement:

1. **Live counter**, ticking every second from `INICIO = "2012-03-14"`, with
   `dias.toLocaleString("pt-BR")` and the next unpassed milestone from `MARCOS`.
2. **Direction-aware selo flip** between "27 de agosto de 2041" and "30 de
   setembro de 2026". Use `entry.boundingClientRect.top <= LINHA`, **not**
   `isIntersecting` — on a tall section `isIntersecting` goes false at the
   bottom and flips the seal back. This cost a debugging round.
3. **Custom audio player** for Rafa's recording, revealed on `loadedmetadata`
   and hidden on `error`, so a missing file degrades to nothing.

**Desktop layout (≥64rem).** A two-column grid — `14rem` sticky margin heading
+ `minmax(0, 64ch)` prose — with an **explicit** `width: min(100%, calc(14rem +
4rem + 64ch))` on every section.

> **The trap:** the grid is centered, so any section with a *different* total
> width sits at a different left edge. A narrower `--medida-nota` track on two
> sections produced two visibly different left alignments and Adriano caught
> it: *"não entendi bem qual é a intenção com isso, mas me pareceu estranho."*
> Give every left-aligned section one identical, explicitly declared width.
> The narrow measure now survives only on the centered `abertura` and `fecho`,
> where it cannot misalign anything.

Also in there: `ch` units so the measure scales with font-size,
`font-variant-numeric: tabular-nums` so the ticking counter does not jitter,
`prefers-reduced-motion`, visible keyboard focus, and `[hidden]` fallbacks.

**Photos.** Adriano feared photos would make an already long letter feel
longer (his daughters found the text tiring), but the text-only page felt
"frio/seco" next to earlier years. A preview behind `?fotos` settled it in one
look: *"muito melhor com as fotos."* The rule that worked: **three photos, one
per story, placed *between* sections as chapter breaks — replacing the hairline
divider — never inside a paragraph.** Slightly tilted white polaroid frame, no
caption. `public/2026/foto1–3.jpg`: the three women (before Gabriela), Rafa and
Mi (before Rafaela), the couple (in the closing band). When in doubt about a
visual choice, build a toggleable preview and let him see it on his phone.

**One editorial note.** The hero first read "Não é para você." He changed it to
**"Não é *só* para você"** because the page ends addressed only to her: *"senti
que estou mentindo."* Watch for that kind of thing — a framing device that the
ending quietly contradicts.

---

## 8. State as of 24/09/2026

- Letter, page and CSS are written, committed and live at
  `michellenogueira.info/2026/`.
- `public/2026.jpg` added (622×415, same as every other cover).
- Three photos inside the letter (`public/2026/foto1–3.jpg`), final, always on.
- The 2026 card is in `src/pages/index.astro` and safe to push: it is held
  back by the date filter until `release.yml` rebuilds the site on 29/09/2026.
- Page body verified paragraph by paragraph against `raw-text.txt`; the only
  difference is the YouTube URL, which the page renders as a link.
- Open items live in `notes/banco-de-ideias.md` §5. The two that decay with
  time: writing down the four details of editorial note nº 4, and asking
  Michelle and his mother about what he blocked out of Oct–Dec 2013.

---

## 9. Backlog sessions — constraints found (for Adriano to review)

Written while working `notes/backlog-melhorias.md` in a cloud session on
25/09/2026. Each entry is something that limited or shaped the work and
deserves a decision of his in a later session. Delete an entry once decided.

### PR "P0" (UX-01 to UX-08)

- **The design skill named in §2 was not available.** The cloud session had
  no `frontend-design:frontend-design`; the P0 fixes were small enough to
  follow the audit's own prescriptions instead. Check again before designing
  2027.
- **Cloud screenshots render with fallback fonts.** Headless Chromium in the
  cloud container does not load Google Fonts through the proxy, so every
  screenshot there shows a generic serif/sans. Sizes and layout can be
  verified there; the final look must still be checked on the phone.
- **The 2026 card cannot be previewed from `dist/` before 29/09.** The date
  filter runs at build time, so `astro preview` hides it; only `npm run dev`
  shows it. The home fixes were verified on the other six cards.
- **Home labels on touch screens (UX-01).** `@media (hover: none)` now keeps
  year and age always visible, with a shorter gradient than the desktop hover
  one so the photos are not tinted all over. A touchscreen laptop with a mouse
  reports `hover: hover` and keeps the hover behaviour — intended.
- **The "Vídeo YouTube" badge at 18px (UX-03)** is visibly bigger than before
  and covers more of the 2014/2015/2020 photos. It follows the §3 rule; if it
  feels loud, shorten the text (e.g. "Vídeo") rather than shrinking it.

### PR "Legado" (UX-11 to UX-17)

- **2024 petals and grain are now effectively invisible.** The backlog asked
  for them *below* the text; every 2024 section has an opaque background, so
  below the text means behind it. Decide: delete them (and their script), or
  bring them back on top only over the header/footer photos.
- **2024 parallax is now a 12-line script.** The old one was a CSS 3D trick
  that only worked because the page scrolled inside a 100vh box (UX-12). The
  new one moves the mobile header photo at 40% of the scroll and does nothing
  on desktop, like before.
- **2024 had a latent bug the old scroll box hid**: from 500px up, the
  footer's wave was anchored to the top of the page (a 2px blue line above the
  header). `.footer` is now `position: relative`.
- **2024 desktop still right-aligns every other paragraph** (`.even p`). Only
  the phone layout was changed to left-aligned (UX-13). Worth a look if
  right-aligned blocks feel tiring on the computer too.
- **2024 title** is now dark blue `#175a8f`; on phones it sits on a white
  pill over the photo. The light blue and the black offset shadow are gone.
- **2025 final card changed colour.** The translucent pink→gold gradient is
  now an opaque rose→amber one, so the cream text reads at 6.5–7.9:1 instead
  of ~2.4:1. It is the climax of 2025, so this is a taste call: any darker
  warm pair works, as long as cream stays at least 4.5:1 on both ends.
- **2025 party**: confetti and balloons now fly *behind* the card
  (z-index 5 < content's 10) and fire once per visit. The fixed heart only
  shows from 1280px up (`xl:`), where it no longer overlaps the column.
- **2023 avatar** is `position: absolute` now: it stays at the top instead
  of following the reader. Checked at 390px and 1440px; tablet widths
  (577–1024px) were not looked at.
- **Not in this PR**: the "← início" pill of 2023/2024/2025 (UX-10) goes with
  the navigation PR, which replaces it.

### PR "Navegação" (REPO-03, UX-09, UX-10, UX-23, UX-24)

- **The timeline lines under each card (UX-23) are my drafts, hidden.** They
  are text Michelle reads, and §2 says the prose is his. They live in
  `conceito` in `src/data/anos.ts`, stay hidden until `MOSTRAR_CONCEITOS` is
  `true`, and can be previewed on the live site with `/?conceitos`. Rewrite
  them before switching on.
- **The video cards now open pages on the site** (`/2014/`, `/2015/`,
  `/2020/`) instead of YouTube in a new tab (UX-24), and the badge reads
  "Vídeo". The embed uses `youtube-nocookie.com`; it could not be played from
  the cloud container (YouTube is not reachable there), so check that the
  three videos still allow embedding. If one does not, the "Abrir no YouTube"
  link under the player still works.
- **The transcripts are shown as they are**, including the "Trilha Sonora:"
  first line and the names of the relatives in 2020. They were already public
  as `.txt`; now they are also on a page that search engines index.
- **The legacy pages' nav is a copy, not the component** (2023 and 2024 are
  plain HTML in `public/`). Their neighbours are fixed (2020/2024 and
  2023/2025), so the copy never needs to change unless a year is added
  between them. REPO-08 would remove the duplication.
- **"← início" pill (UX-10)**: kept `position: fixed`, but it slides away
  while reading down and comes back on the way up; 18px, 106×48 touch area.
  Chosen over `position: absolute` because 2023's `body` is positioned with
  per-breakpoint margins, which would push the pill onto the flowers.
- **The 2026 end link from the P0 PR ("← todas as cartas") is replaced** by
  the full component. Before 29/09 the 2026 page shows only "← 2025"; the
  "2026 →" link on 2025 appears with the release rebuild.
