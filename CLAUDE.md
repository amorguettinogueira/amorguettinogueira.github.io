# CLAUDE.md — michellenogueira.info

Briefing for any future Claude session working on this repo. It exists so the
next letter (2027 and beyond) does not start from zero.

Read this file first, then `notes/banco-de-ideias.md`, which is the *content*
memory: raw material, unused concepts, verified dates and numbers, pendências.
This file is the *working* memory: who the reader is, how Adriano likes to work,
the rules that must not be broken, and what was learned building past pages.

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

Michelle **does not know** the page exists until the day. See §4.

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
- **The one thing that spoils the surprise is the gallery card.** The year's
  entry in `src/pages/index.astro` must only be added on **29 or 30 September**.
  The page itself may be published and shared as a direct URL for testing well
  before that. Treat the card as the release switch.
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
- **Legacy pages 2023 and 2024** are hand-written HTML preserved untouched
  under `public/<ano>/`; they do not use BaseLayout. 2014/2015/2020 are
  YouTube links, transcribed in `public/<ano>/video-text.txt`.
- **`notes/` is committed on purpose.** He chose public-with-backup over
  private-without: *"melhor ele público com backup do que sem."*
- Shell here is PowerShell; `npm run dev` piped into `head` dies of SIGPIPE.
  Run it unpiped and in the background.

### Adding a year

1. Cover image at `public/<ano>.jpg` — also the Open Graph image, so the
   WhatsApp link preview depends on it. Keep it in the ~100–300 KB range like
   the others.
2. `src/pages/<ano>/index.astro` + `src/styles/<ano>.css`.
3. Body text at `public/<ano>/raw-text.txt`, kept **paired with what the page
   publishes**. Page chrome (headings, captions, counter labels) does *not*
   need to match — he confirmed this. Only the letter body does.
4. **Last, on 29/30 September:** in `src/pages/index.astro`, prepend to the
   `years` array
   `{ year: "<ano>", age: "<N> anos", href: "/<ano>/", img: "/<ano>.jpg" },`
   and point the landing page's `ogImage` at `/<ano>.jpg` too, so a shared
   link to the home page previews the new year.

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
- **The 2026 card is in `src/pages/index.astro` in the working tree, not yet
  pushed.** Adriano will commit and push everything at once. The push itself is
  now the release switch: pushed before 29/09, the surprise is out early.
- Page body verified paragraph by paragraph against `raw-text.txt`; the only
  difference is the YouTube URL, which the page renders as a link.
- Open items live in `notes/banco-de-ideias.md` §5. The two that decay with
  time: writing down the four details of editorial note nº 4, and asking
  Michelle and his mother about what he blocked out of Oct–Dec 2013.
