// /<ano>/video-text.txt — the transcript as plain text, at the URL it has had
// since it lived in public/. Built from src/data/transcricoes/<ano>.txt with
// the [working notes] removed.
import type { APIRoute } from "astro";
import { ANOS } from "../../data/anos";
import { transcricao } from "../../data/transcricoes";

export function getStaticPaths() {
  return ANOS.filter((a) => a.tipo === "video").map((a) => ({
    params: { video: String(a.ano) },
  }));
}

export const GET: APIRoute = ({ params }) => {
  const texto = transcricao(Number(params.video))
    .map((linhas) => linhas.join("\n"))
    .join("\n\n");
  return new Response(texto + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
