# Backlog de melhorias — michellenogueira.info

Auditoria de UI/UX e de estrutura feita em 25/09/2026 (skill `frontend-design`).
Cada item foi escrito para ser resolvido numa sessão própria, sem precisar
reler a auditoria inteira: tem o problema, a evidência, a correção sugerida e
os arquivos envolvidos.

**Como dar baixa:** troque `- [ ]` por `- [x]` e anote a data ao lado
(`✅ 02/10/2026`). Se um item for descartado, marque `- [~]` e diga por quê
numa linha — isso evita que uma sessão futura proponha a mesma coisa de novo.

**Legenda de esforço:** **P** = pequeno (até ~30 min) · **M** = médio (1–2 h) · **G** = grande (meio dia ou mais).

> ✅ **Publicação.** Desde 25/09/2026 (REPO-02) pode-se fazer push à vontade: o
> card de cada ano só aparece no site a partir de 29/09 daquele ano, e o
> `release.yml` reconstrói o site sozinho nesse dia. Ver CLAUDE.md §4.

> **Como a auditoria foi feita** (para repetir e comparar depois): `npm run build`
> + `npx astro preview`, Edge sem janela controlado por script, emulando iPhone
> (390 px, tela retina 2×) e desktop (1440 px). No navegador foram medidos o
> tamanho de fonte de cada texto visível, o contraste, as áreas de toque, as
> imagens e as capturas em várias posições de rolagem. O script da auditoria
> ficou na pasta temporária da sessão e se perde; o **REPO-01** propõe trazer
> uma versão dele para `scripts/`.

---

## Parte 1 — UI/UX

### P0 · Antes de 30/09 (o que a Mi vê no celular no dia)

- [ ] **UX-01 · Home: ano e idade invisíveis no celular** — M
  - **Problema:** o rótulo `.photo-title` (ano + idade) só aparece com `:hover`.
    Celular não tem hover: a galeria vira sete fotos sem dizer de que ano são.
  - **Correção:** mostrar o rótulo sempre em `@media (hover: none)` (e com a
    `.card-overlay` junto, para ter contraste sobre a foto). No desktop pode
    continuar aparecendo no hover.
  - **Arquivo:** `src/pages/index.astro`.

- [ ] **UX-02 · Home: foco de teclado invisível nos cards** — P
  - **Problema:** o `overflow: hidden` do `.grid-cell` corta o contorno de foco
    do link. Com teclado, não dá para saber qual card está selecionado.
  - **Correção:** aplicar em `:focus-visible` o mesmo efeito do hover (rótulo,
    overlay e a moldura `.card-frame`).
  - **Arquivo:** `src/pages/index.astro`. Faz par com o UX-01.

- [ ] **UX-03 · Home: textos abaixo da regra dos óculos** — P
  - **Evidência (medida no iPhone):** "uma homenagem, ano a ano" em **11,2 px**,
    caixa-alta espaçada e contraste de 3,8:1; idade no card ("44 anos") em **12 px**;
    selo "Vídeo YouTube" em **10,5 px**.
  - **Correção:** nada com informação abaixo de ~18 px no celular (CLAUDE.md §3).
    Tirar a caixa-alta espaçada do subtítulo e escurecer a cor.
  - **Arquivo:** `src/pages/index.astro`.

- [ ] **UX-04 · Home: as primeiras capas carregam por último** — P
  - **Problema:** todas as `<img>` usam `loading="lazy"`, inclusive as que estão
    na primeira tela, e isso atrasa o que ela vê primeiro.
  - **Correção:** `loading="eager"` + `fetchpriority="high"` para os dois
    primeiros cards (`i < 2`), `lazy` para o resto.
  - **Arquivo:** `src/pages/index.astro`.

- [ ] **UX-05 · 2026: informação menor que o corpo do texto** — P
  - **Evidência:** o corpo tem 19,2 px, mas o selo "27 de agosto de 2041 / 30 de
    setembro de 2026" (justamente a data que vira) está em **16 px**; "Ouvir no
    vídeo de 2020" em **16 px**; "27 anos", "9 anos hoje — para reler mais tarde" e
    "← início" em **17 px**.
  - **Correção:** subir todos para ≥ 18–19 px (regra do CLAUDE.md §3).
  - **Arquivo:** `src/styles/2026.css` (`.selo`, `.citacao__fonte`, `.para__quando`, `.voltar`).

- [ ] **UX-06 · 2026: a carta termina sem saída** — P
  - **Problema:** são ~15.000 px no celular (≈ 18 telas). O "← início" só existe
    no topo, fora do fluxo, e tem área de toque de 58×31 px (o mínimo recomendado é 44×44).
  - **Correção:** acrescentar depois da assinatura um link discreto "← todas as
    cartas" e aumentar a área de toque do link do topo (padding).
  - **Arquivos:** `src/pages/2026/index.astro`, `src/styles/2026.css`.
    A versão completa (anterior/próxima em todos os anos) é o **UX-09**.

- [ ] **UX-07 · 2026: a página não tem `<h1>`** — P
  - **Problema:** "Não é só para você." é um `<p>`; os títulos começam em `<h2>`.
    Leitor de tela e buscadores ficam sem o título principal.
  - **Correção:** trocar `<p class="abertura__frase">` por `<h1 class="abertura__frase">`
    (zerar a margem padrão). O visual não muda.
  - **Arquivo:** `src/pages/2026/index.astro`.

- [ ] **UX-08 · 2026: números espaçados em itálico** — P
  - **Problema:** `font-variant-numeric: tabular-nums` está no `body`, e na frase
    do marco ("Faltam 71 dias para o dia 5.379…") os dígitos ficam com buracos em
    itálico.
  - **Correção:** tirar do `body` e deixar só em `.contador__dias` e `.contador__nota`
    (os que mudam a cada segundo e não podem tremer).
  - **Arquivo:** `src/styles/2026.css`.

### P1 · Consistência do arquivo (depois de 30/09)

- [ ] **UX-09 · Navegação entre os anos** — M
  - **Problema:** cada ano tem um "voltar" diferente (pílula em Lobster em
    2023/2024/2025, itálico discreto em 2026) e nenhum oferece "carta anterior /
    próxima". Quem quiser reler o arquivo tem que voltar à home toda vez.
  - **Correção:** um componente único (`← início · 2025 · 2027 →`) no fim de cada
    carta, alimentado pela lista de anos do **REPO-03**.
  - **Depende de:** REPO-03. Nos anos legados, depende do REPO-08 (ou copiar o HTML).

- [ ] **UX-10 · Pílula "← início" fixa cobre o texto** — P
  - **Evidência:** nas capturas de 2023, 2024 e 2025 a pílula fica em cima das
    linhas do parágrafo enquanto se lê no celular.
  - **Correção:** deixar de ser fixa (só no topo) ou sumir ao rolar para baixo e
    voltar ao rolar para cima.
  - **Arquivos:** `public/2023/index.html` (CSS inline), `public/2024/2024.css`,
    `src/pages/2025/index.astro` (`.back-home`).

- [ ] **UX-11 · 2023: contraste do texto muito baixo** — P
  - **Evidência:** texto `#DB7093` sobre fundo rosa ≈ **2,6:1** (o mínimo para
    leitura é 4,5:1). É a página mais difícil de ler do site para quem usa óculos.
  - **Correção:** `#A63D62` dá 5,0:1 sem perder o tom rosa. Também: o avatar
    `mi.png` fixo cobre palavras no celular (mover para o fluxo ou reduzir no celular).
  - **Arquivo:** `public/2023/index.html`.

- [ ] **UX-12 · 2024: a página rola dentro de uma caixa** — M
  - **Evidência:** o documento mede 844 px (uma tela); os 6.911 px de conteúdo
    rolam dentro de `.container { height: 100vh; overflow-y: auto; perspective }`,
    que existe por causa do parallax do topo.
  - **Efeito no celular:** a barra do navegador não recolhe, tocar no topo da
    tela não volta ao início, e o iOS pode cortar o fim da página.
  - **Correção:** tirar a rolagem da caixa e deixar o `body` rolar; refazer o
    parallax do topo de outro jeito ou abrir mão dele.
  - **Arquivo:** `public/2024/2024.css`.

- [ ] **UX-13 · 2024: leitura cansativa no celular** — P
  - **Evidência:** corpo em **16 px** e parágrafos longos **centralizados** abaixo
    de 500 px (`body { text-align: center }`).
  - **Correção:** 19 px e parágrafos alinhados à esquerda; centralizar só títulos.
  - **Arquivo:** `public/2024/2024.css`.

- [ ] **UX-14 · 2024: título ilegível e enfeites por cima do texto** — P
  - **Evidência:** "Feliz Aniversário!" em `#4bb4ff` sobre a foto clara ≈ **1,8:1**.
    As pétalas (`.petals`, z-index 1000) e a granulação (`.grain`, z-index 500,
    `mix-blend-mode: multiply`) passam **por cima** do texto e viram manchas cinzas.
  - **Correção:** título com cor escura ou fundo próprio; pétalas e granulação
    com z-index abaixo do conteúdo.
  - **Arquivo:** `public/2024/2024.css`.

- [ ] **UX-15 · 2025: a festa final cobre a mensagem final** — M
  - **Evidência:** confete + 20 balões disparam a 95% da rolagem — exatamente
    quando ela lê o fecho. Balões e barbantes passam por cima do texto; o creme
    sobre o degradê claro dá ≈ **2,4:1**, com sombra preta dura. E dispara de novo
    toda vez que se volta ao fim.
  - **Correção:** manter a festa (é o conceito de 2025), mas **atrás** do cartão,
    com o fundo do cartão mais escuro/opaco, e disparar uma vez só.
  - **Arquivo:** `src/pages/2025/index.astro`.

- [ ] **UX-16 · 2025: coração fixo cobre o texto** — P
  - **Evidência:** o coração vermelho fixo no canto inferior direito tampa
    palavras do texto no celular.
  - **Correção:** esconder abaixo de ~48rem ou tirar do `position: fixed`.
  - **Arquivo:** `src/pages/2025/index.astro` (último `div.fixed.bottom-10.right-10`).

- [ ] **UX-17 · Acessibilidade básica do legado** — P
  - A foto de 2025 tem `alt="Garden of Love"` (em inglês e errado) → descrever a foto.
  - 2023 e 2024 não têm `<html lang="pt-BR">` → o Chrome no Android pode oferecer
    "Traduzir esta página?".
  - Imagens de 2023 (`mi.png`) e 2024 (`image01–08.png`, `bottom.jpg`) sem `alt`
    (as decorativas levam `alt=""`).
  - **Arquivos:** `src/pages/2025/index.astro`, `public/2023/index.html`, `public/2024/index.html`.

### P2 · Infraestrutura e compartilhamento

- [ ] **UX-18 · Fotos borradas em tela retina** — M
  - **Evidência:** capas e fotos de 2026 têm 622 px de largura; no iPhone ocupam
    351 px × 3 de densidade ≈ 1.050 px necessários. No desktop, 587 × 2 ≈ 1.170.
  - **Correção:** usar o `<Picture>` do Astro (gera AVIF/WebP em vários tamanhos,
    com `srcset`) a partir de originais maiores em `src/`. O `public/<ano>.jpg` de
    622 px continua existindo só como imagem de prévia do WhatsApp (CLAUDE.md §5).
  - **Precisa de:** os originais das fotos em resolução maior.
  - **Depende de:** idealmente REPO-07 (imagens de cada ano em `src/anos/<ano>/`).

- [ ] **UX-19 · Fonte Lobster carregada em todas as páginas** — P
  - **Problema:** o `BaseLayout` carrega a Lobster sempre, mas só a pílula de 2025
    usa. Na home e em 2026 é uma requisição a mais antes da primeira exibição.
  - **Correção:** tirar do `BaseLayout` e passar via `fontsHref` só na página de 2025.
  - **Arquivos:** `src/layouts/BaseLayout.astro`, `src/pages/2025/index.astro`.

- [ ] **UX-20 · Metadados de compartilhamento** — P
  - Faltam `og:url`, `og:locale` (`pt_BR`), `og:image:width/height/alt`,
    `twitter:card` (`summary_large_image`) e `<meta name="theme-color">`.
  - Os títulos "30/09/2026" são enigmáticos na aba e na prévia; algo como
    "Para a Mi — 30/09/2026" diz mais.
  - **Arquivo:** `src/layouts/BaseLayout.astro` (+ `title` em cada página).

- [ ] **UX-21 · Home com movimento o tempo todo** — P · *decisão de gosto, sua*
  - 20 partículas subindo, brilhos a cada 750 ms, título cintilando, assinatura
    pulsando e corações quicando — tudo em loop infinito. No celular gasta bateria
    e compete com as fotos. Sugestão: manter a entrada animada e a chuva leve de
    corações; cortar brilhos periódicos, cintilar do título e pulsar da assinatura.
  - **Arquivo:** `src/pages/index.astro`.

- [ ] **UX-22 · A 404 destoa do resto** — P
  - Dancing Script vermelho e emoji 💔, fora da linguagem da home. Alinhar fontes e
    cores com a home.
  - **Arquivo:** `src/pages/404.astro`.

### P3 · Ideias (não são defeitos)

- [ ] **UX-23 · Home como linha do tempo** — M
  - Sob cada card, uma linha com o conceito do ano (tabela do CLAUDE.md §6:
    "2025 — não consigo lê-la"). A galeria passa a contar o arco.
  - **Depende de:** REPO-03.

- [ ] **UX-24 · Anos em vídeo sem sair do site** — M
  - 2014, 2015 e 2020 hoje mandam para o YouTube numa aba nova. Uma página
    intermediária com o vídeo embutido e a transcrição que já existe em
    `public/<ano>/video-text.txt` a manteria dentro do arquivo.

- [ ] **UX-25 · Player do áudio da Rafa** — P
  - Mostrar a duração (ex.: "0:42") e deixar tocar na barra para avançar. Hoje a
    barra é uma linha de 2 px que não responde ao toque.
  - **Arquivos:** `src/pages/2026/index.astro`, `src/styles/2026.css`.

- [ ] **UX-26 · Barra do navegador acompanhando a carta** — P
  - `theme-color` no papel quente e trocado para a noite durante o trecho de 2041
    (no mesmo observador que vira o selo). Só aparece no Chrome Android.

---

## Parte 2 — Organização do repositório

### O que quebra e o que não quebra (leia antes de mexer)

O medo de reorganizar é justo, mas o risco está concentrado em poucos lugares.
A regra de ouro do Astro: **o caminho de um arquivo em `src/pages/` ou em
`public/` É a URL dele.** Todo o resto é interno.

| Mexer em… | O que acontece | Risco |
|---|---|---|
| `src/components/`, `src/styles/`, `src/layouts/`, `src/assets/` (mover, renomear) | Só é preciso corrigir os `import`. Se esquecer um, o `npm run build` **falha com erro dizendo qual**. Nunca quebra em silêncio. | 🟢 baixo |
| Arquivos dentro de `src/pages/` | Cada `.astro`/`.md`/`.html` vira uma página; cada `.js`/`.ts` vira um *endpoint*. Renomear muda a URL. Arquivos com prefixo `_` (ex.: `_estilo.css`, `_Carta.astro`) **não** viram página. | 🟡 médio |
| Arquivos dentro de `public/` | Copiados como estão. Mover muda a URL, e **o build não avisa**: o link só dá 404 no site. | 🔴 alto sem o REPO-01 |
| `public/CNAME`, `.github/workflows/deploy.yml` | Domínio e publicação. | ⛔ não mexer |
| `public/<ano>.jpg` | É a imagem das prévias de WhatsApp já enviadas. Mudar o caminho quebra prévias antigas. | ⛔ manter |

Com o **REPO-01** feito, a linha vermelha vira amarela: o script aponta o link
quebrado antes do push.

### Itens

- [ ] **REPO-01 · Rede de segurança antes de reorganizar** — M · *fazer primeiro*
  - **Por quê:** é o que tira o medo. Hoje o build só falha se um `import` estiver
    errado; arquivo sumido de `public/` ou link interno quebrado passa em silêncio.
  - **O quê:** um `scripts/verificar-site.mjs` + `npm run verificar` que, depois do
    build, confere em `dist/`:
    1. que cada URL que já existe continua existindo (`/`, `/2023/index.html`,
       `/2024/index.html`, `/2025/`, `/2026/`, `/404.html`, `/CNAME`, `/<ano>.jpg`,
       `/2026/raw-text.txt`, os `video-text.txt`…);
    2. que todo `href`/`src` interno de todo HTML gerado aponta para um arquivo que existe.
  - Opcional: trazer para `scripts/` o script de capturas da auditoria (Edge
    sem janela, celular e desktop), para comparar antes/depois visualmente.
  - Opcional: rodar o `verificar` também no `deploy.yml`, antes de publicar.

- [x] **REPO-02 · Chave de lançamento no código, não no push** — P · *alto valor*
  - Feito em 25/09/2026, por **data** em vez de booleano: a home só mostra o card
    se o build rodar em ou depois de 29/09 do ano do card (fuso de Brasília);
    `npm run dev` mostra todos. O `.github/workflows/release.yml` dispara o deploy
    nos dias 29 e 30/09. O `ogImage` da home segue o card mais recente visível.
  - **Atenção anual:** o GitHub desliga o agendamento depois de 60 dias sem
    atividade. Religar com `gh workflow enable release.yml` antes de 29/09 —
    CLAUDE.md §4 e §5.

- [ ] **REPO-03 · Lista de anos num arquivo só** — P
  - **Problema:** o array `years` mora dentro de `src/pages/index.astro`, com a
    idade digitada à mão.
  - **Correção:** `src/data/anos.ts` com `{ ano, href, capa, tipo: "carta" | "video" | "legado", conceito }`;
    idade calculada (`ano - 1982`). Home, navegação (UX-09), linha do tempo (UX-23)
    leem daqui (o filtro de data do REPO-02 continua valendo sobre essa lista).
  - Risco baixo: só código dentro de `src/`.

- [ ] **REPO-04 · Limpar a raiz: três jeitos de fazer a mesma coisa** — P
  - `run.bat`, `kill-zombie-process.ps1` e `scripts/dev-fresh.mjs` fazem quase o
    mesmo (matar a porta 4321 e limpar o cache). O `.ps1` também cuida da porta
    4322 (a do `preview`); o `.mjs`, não.
  - **Correção:** o `dev-fresh.mjs` passa a cuidar das portas 4321 e 4322; apagar
    `run.bat` e `kill-zombie-process.ps1`; usar só `npm run dev:fresh`.
  - Risco zero para o site: nenhum dos três entra no build.

- [ ] **REPO-05 · Referências a pastas que não existem mais** — P
  - `.gitignore` cita `2025-src/`; `tsconfig.json` exclui `2025-src` e
    `birthday-scroll-src`. Sobras da migração para o Astro. Apagar as linhas.
  - `astro.config.mjs`: o comentário do `preserveSymlinks` fala da junção
    `C:\GitHub → D:\…`, mas o repo agora está em `X:\`. É inofensivo; remover só
    depois do REPO-01, testando com `npm run dev` e `npm run build`.

- [ ] **REPO-06 · README desatualizado e duplicado** — P
  - O `README.md` não menciona 2026, diz que o jeito de começar um ano é copiar a
    página de 2025 (o CLAUDE.md diz o contrário: CSS puro, sem Tailwind) e mostra
    uma árvore de pastas antiga.
  - **Correção:** README curto (o que é, como rodar, como publicar) apontando para
    o `CLAUDE.md` como fonte dos detalhes. Atualizar também o CLAUDE.md §8, que
    ainda diz que o card está "no working tree, not yet pushed" (já está commitado).

- [ ] **REPO-07 · Cada ano num lugar só** — M
  - **Hoje**, um ano se espalha por até seis lugares: `public/<ano>.jpg`,
    `public/<ano>/`, `src/pages/<ano>/`, `src/styles/<ano>.css`,
    `src/components/year<ano>/`, `src/assets/<ano>/`.
  - **Proposta:**
    ```
    src/pages/<ano>/index.astro   ← só a rota (fina: importa a carta)
    src/anos/<ano>/               ← estilo, componentes, fotos (importadas → otimizadas)
    public/<ano>/                 ← só o que precisa de URL fixa (raw-text.txt, mp3)
    public/<ano>.jpg              ← fica onde está (prévias do WhatsApp)
    ```
  - Mover estilos, componentes e imagens é risco 🟢 (o build acusa `import` errado).
    As fotos de 2026 hoje estão em `public/2026/foto*.jpg`; movê-las para `src/`
    muda a URL delas, o que não tem problema (ninguém linka foto direto) e habilita o UX-18.
  - **Depende de:** REPO-01.

- [ ] **REPO-08 · Trazer 2023 e 2024 para dentro do Astro** — G · *opcional*
  - Hoje são HTML soltos em `public/` com CSS e scripts copiados entre si (pílula
    de voltar, granulação, corações). Migrar para `src/pages/2023/index.astro` e
    `src/pages/2024/index.astro` com o `BaseLayout` permite compartilhar navegação
    (UX-09), `lang`, metadados e correções.
  - O Astro gera `/2023/index.html`, então **a URL antiga continua funcionando**.
  - Só vale a pena se for mexer nos itens UX-10 a UX-14; senão, deixar preservado.
  - **Depende de:** REPO-01 (conferir que imagens relativas como `./image01.png` continuam resolvendo).

- [ ] **REPO-09 · Tailwind: congelar, não atualizar** — P (congelar) / G (remover)
  - O Tailwind (3 pacotes + config) existe só para a página de 2025. A integração
    `@astrojs/tailwind` foi descontinuada para o Tailwind 4, e o
    `tailwind.config.mjs` usa `require` dentro de um arquivo ESM, o que só funciona
    por acaso do carregador do Tailwind 3.
  - **Agora:** não atualizar o Tailwind para a versão 4 (o `package-lock.json` já
    segura a versão; não rodar `npm update` às cegas).
  - **Um dia, opcional:** converter 2025 para CSS puro, como 2026, e remover o
    Tailwind do projeto. Risco de a página mudar visualmente: comparar capturas antes/depois.

- [ ] **REPO-10 · Mesma versão de Node local e no deploy** — P
  - O deploy usa Node 22; a máquina local tem 20.16. Criar `.nvmrc` com `22` e
    `"engines": { "node": ">=22" }` no `package.json`, e atualizar o Node local.

- [ ] **REPO-11 · A partir de 2027: carta em Markdown, `raw-text.txt` automático** — M
  - Hoje o texto é escrito à mão em `raw-text.txt` e copiado parágrafo por
    parágrafo para `<p>`s, e o pareamento é conferido manualmente (CLAUDE.md §5).
  - **Proposta:** o corpo da carta em `src/anos/<ano>/carta.md` (ou uma `.md` por
    seção), renderizado pela página; um endpoint `src/pages/<ano>/raw-text.txt.ts`
    gera o `.txt` a partir do mesmo arquivo. Uma fonte só, sem risco de divergir.
  - Não vale retrofitar 2026; é para a próxima carta.
