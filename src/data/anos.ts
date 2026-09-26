// The list of years, in one place (backlog REPO-03). The gallery, the
// navigation at the end of each letter and the video pages all read from here.
//
// Adding a year: prepend an entry. The card, the "next" link on the previous
// letter and the timeline line only go live on 29/09 of that year (see
// `anosVisiveis` and CLAUDE.md §4).

export type Tipo = "carta" | "video";

export interface Ano {
  ano: number;
  /** Where the year lives on the site. */
  href: string;
  /** Cover, also the WhatsApp preview image. Never move it (CLAUDE.md §5). */
  capa: string;
  /** "carta": a letter in src/anos/<ano>/ · "video": YouTube + transcript. */
  tipo: Tipo;
  /** One line under the card in the gallery (UX-23). Draft wording — Adriano's to rewrite. */
  conceito: string;
  /** Only for "video": the YouTube id. */
  youtube?: string;
}

/** Michelle was born on 30/09/1982. */
export const NASCIMENTO = 1982;
export const idade = (ano: number) => ano - NASCIMENTO;

/**
 * The concept lines under each card (UX-23) stay hidden on the live site until
 * this is true. Preview them any time with `?conceitos` at the end of the URL.
 */
export const MOSTRAR_CONCEITOS = true;

export const ANOS: Ano[] = [
  { ano: 2026, href: "/2026/", capa: "/2026.jpg", tipo: "carta", conceito: "a carta às filhas, lida por cima do ombro" },
  { ano: 2025, href: "/2025/", capa: "/2025.jpg", tipo: "carta", conceito: "o quadro que eu ainda não consigo ler" },
  { ano: 2024, href: "/2024/", capa: "/2024.jpg", tipo: "carta", conceito: "uma fábula, e a promessa das bodas de ouro" },
  { ano: 2023, href: "/2023/", capa: "/2023.jpg", tipo: "carta", conceito: "o que ninguém vê, nos atos de todo dia" },
  { ano: 2020, href: "/2020/", capa: "/2020.jpg", tipo: "video", youtube: "gbf-Ln3W1r8", conceito: "outras vozes falando de você" },
  { ano: 2015, href: "/2015/", capa: "/2015.jpg", tipo: "video", youtube: "iaZs_Lzxa48", conceito: "a origem do seu nome" },
  { ano: 2014, href: "/2014/", capa: "/2014.jpg", tipo: "video", youtube: "Gb7v0Ki5Dm4", conceito: "tudo o que você toca se transforma" },
];

/** Today in Brasília, as YYYY-MM-DD. */
export const hoje = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());

/**
 * Release switch: a year only appears from 29/09 of that year, Brasília time.
 * Checked at build time, so the site must be rebuilt that day — the scheduled
 * .github/workflows/release.yml does it (CLAUDE.md §4). `npm run dev` shows
 * every year for local preview.
 */
export const visivel = (a: Ano) => import.meta.env.DEV || hoje() >= `${a.ano}-09-29`;

export const anosVisiveis = () => ANOS.filter(visivel);

/**
 * Older and newer year around `ano`. The newer one only once it is released,
 * so the 2025 letter does not point at 2026 before 29/09/2026. (A page shared
 * by direct link before its release still gets its "older" link.)
 */
export function vizinhos(ano: number) {
  const i = ANOS.findIndex((a) => a.ano === ano); // newest first
  const proximo = i > 0 ? ANOS[i - 1] : undefined;
  return {
    anterior: i >= 0 ? ANOS[i + 1] : undefined,
    proximo: proximo && visivel(proximo) ? proximo : undefined,
  };
}
