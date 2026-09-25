// Transcripts of the video years (2014, 2015, 2020). The source files in
// transcricoes/<ano>.txt may carry working notes in [square brackets] — who
// someone is, what the video shows. Those are for Adriano and the AI only:
// they are stripped here, before anything reaches the page or the public
// /<ano>/video-text.txt.
const arquivos = import.meta.glob<string>("./transcricoes/*.txt", {
  query: "?raw",
  import: "default",
  eager: true,
});

const NOTA = /\s*\[[^\]\n]*\]/g;

/** The public transcript of a year: paragraphs of lines, notes removed. */
export function transcricao(ano: number): string[][] {
  const bruto = arquivos[`./transcricoes/${ano}.txt`];
  if (bruto === undefined) throw new Error(`Sem transcrição para ${ano}: src/data/transcricoes/${ano}.txt`);
  return bruto
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .split("\n")
        .map((l) => l.replace(NOTA, "").trimEnd())
        .filter((l) => l.trim())
    )
    .filter((linhas) => linhas.length > 0);
}
