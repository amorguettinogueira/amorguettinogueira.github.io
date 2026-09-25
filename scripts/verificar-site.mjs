/**
 * verificar-site.mjs — run via "npm run verificar" (does the build first)
 *
 * Safety net for moving things around (backlog REPO-01). Checks dist/ for:
 *   1. every URL that is already public still existing — a file moved out of
 *      public/ changes its URL and the build does not warn;
 *   2. every internal href/src/url() in the generated HTML and CSS pointing
 *      to a file that exists.
 * Exits with code 1 and a list of what is wrong. No dependencies.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";

const DIST = "dist";

// URLs that are live on michellenogueira.info and must not disappear.
// Every cover in public/<ano>.jpg counts on its own; pages and other files of a
// new year go in the list below.
const ANOS = readdirSync("public")
  .filter((f) => /^\d{4}\.jpg$/.test(f))
  .map((f) => f.slice(0, 4));
const PUBLICAS = [
  "/",
  "/404.html",
  "/CNAME",
  "/favicon.ico",
  "/robots.txt",
  ...ANOS.map((ano) => `/${ano}.jpg`),
  "/2014/video-text.txt",
  "/2015/video-text.txt",
  "/2020/video-text.txt",
  "/2023/index.html",
  "/2024/index.html",
  "/2025/",
  "/2026/",
  "/2026/raw-text.txt",
  "/2026/rafa-9-anos.mp3",
];

if (!existsSync(DIST)) {
  console.error(`✗ ${DIST}/ não existe. Rode "npm run build" antes.`);
  process.exit(1);
}

/** Maps a site URL path to the file that serves it, or null. */
function arquivoDaUrl(caminho) {
  const limpo = decodeURIComponent(caminho.split(/[?#]/)[0]);
  const alvo = join(DIST, limpo);
  if (existsSync(alvo) && statSync(alvo).isFile()) return alvo;
  const indice = join(alvo, "index.html");
  if (existsSync(indice)) return indice;
  return null;
}

function listar(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? listar(p) : [p];
  });
}

/** Turns a file inside dist/ back into the URL directory it lives at. */
function urlDoDiretorio(arquivo) {
  const rel = relative(DIST, dirname(arquivo)).split(sep).join("/");
  return "/" + (rel ? rel + "/" : "");
}

const EXTERNO = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i; // http:, mailto:, data:, //cdn…
const ATRIBUTOS = /\s(?:href|src|poster)\s*=\s*["']([^"']+)["']/gi;
const SRCSET = /\ssrcset\s*=\s*["']([^"']+)["']/gi;
const CSS_URL = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

function referencias(arquivo) {
  // Commented-out markup (e.g. 2024's <!--img src="./image07.jpg"/-->) is not a link.
  const texto = readFileSync(arquivo, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const refs = [];
  if (arquivo.endsWith(".html")) {
    for (const m of texto.matchAll(ATRIBUTOS)) refs.push(m[1]);
    for (const m of texto.matchAll(SRCSET))
      m[1].split(",").forEach((parte) => refs.push(parte.trim().split(/\s+/)[0]));
  }
  // url() in CSS files and in inline <style> blocks.
  if (arquivo.endsWith(".css") || arquivo.endsWith(".html")) {
    for (const m of texto.matchAll(CSS_URL)) refs.push(m[1]);
  }
  // Inline SVG data URIs carry url(%23id) filter references: fragments, not files.
  return refs
    .map((r) => r.trim())
    .filter((r) => r && !/^(?:#|%23)/i.test(r) && !EXTERNO.test(r) && !r.startsWith("{"));
}

const erros = [];

// 1. Public URLs still exist.
for (const url of PUBLICAS) {
  if (!arquivoDaUrl(url)) erros.push(`URL pública sumiu: ${url}`);
}

// 2. Internal links resolve.
let conferidas = 0;
for (const arquivo of listar(DIST).filter((f) => /\.(html|css)$/.test(f))) {
  const base = new URL(urlDoDiretorio(arquivo), "https://site.local");
  for (const ref of referencias(arquivo)) {
    conferidas++;
    const caminho = new URL(ref, base).pathname;
    if (!arquivoDaUrl(caminho)) {
      erros.push(`Link quebrado em ${relative(DIST, arquivo)}: "${ref}" → ${caminho}`);
    }
  }
}

if (erros.length) {
  console.error(`✗ ${erros.length} problema(s):`);
  erros.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(
  `✓ ${PUBLICAS.length} URLs públicas presentes; ${conferidas} links internos conferidos, nenhum quebrado.`
);
