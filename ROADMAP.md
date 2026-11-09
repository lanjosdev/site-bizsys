# Roadmap de Migração: Bizsys (WordPress -> Astro Estático)

Este documento acompanha a evolução da engenharia reversa e migração do site **Bizsys** para Astro estático.

---

## 📌 Convenções de Git & Branching

- `main`: Branch estável de produção. Nenhum código de desenvolvimento entra diretamente nela.
- Branches de funcionalidade por fase:
  - `feat/fase-0-setup-extracao`: Extração de dados da API, análise de dependências e baseline de CSS/fontes.
  - `feat/fase-1-astro-shell`: Setup do Astro, Header, Footer, menu mobile e design system global.
  - `feat/fase-2-institucionais`: Home (estática fiel), Sobre Nós, Contato (Web3Forms), Portfólio, Prêmios, Clientes e 404.
  - `feat/fase-3-artigos-vinculados`: Content Collections, páginas de categorias `/categoria/[slug]` e artigos prioritários.
  - `feat/fase-4-expansao-total`: Ingestão dos 136 artigos completos, catalogação de mídias, galerias locais, motor de busca e páginas institucionais secundárias.
  - `feat/fase-5-auditoria-seo-news`: Página dedicada /news, sitemap.xml, robots.txt, 301 legados, GTM e auditoria de performance.

---

## 🚀 Fases do Projeto

### [x] Fase 0: Inicialização, Setup e Extração Analítica
- [x] Inicialização do repositório Git e `.gitignore`
- [x] Extração de metadados completos da WP REST API (`data/raw/pages.json`, `data/raw/posts.json`, `data/raw/taxonomies.json`)
- [x] Mapeamento e análise de dependências: identificar quais posts/cases são linkados nas páginas institucionais prioritárias (`data/linked_posts.json` - 15 posts identificados)
- [x] Incorporação do baseline visual local (`baseline/`) com CSS compilado, fontes WOFF/WOFF2 e assets da Home

### [x] Fase 1: Astro Shell & Design System
- [x] Inicialização da estrutura Astro (`output: 'static'`)
- [x] Configuração das fontes locais (Good Sans) e variáveis globais de CSS
- [x] Implementação de `BaseLayout.astro` (metadados, OpenGraph, viewport, favicons oficiais)
- [x] Componente `Header.astro` com navegação fiel, responsividade mobile e controle de transparência no scroll
- [x] Componente `Footer.astro` com links institucionais e redes sociais

### [x] Fase 2: Páginas Institucionais Prioritárias & Shell
- [x] `src/pages/index.astro`: Home com hero estático leve e seções fiéis (carrossel, nuvem de categorias responsiva com `clamp()` e banner de prêmios conectados)
- [x] `src/pages/sobre-nos.astro`: Reconstrução fiel baseada no WordPress original:
  - Hero com mensagem institucional
  - Seção Método com os 3 círculos conexos e linha de fluxo no desktop (fluxo vertical com setas no mobile)
  - Seção Time Multidisciplinar centralizada e compacta
  - Seção Clientes com grid de 3 colunas centralizado
  - Seção Prêmios ampla com 16 linhas horizontais com dados reais dos prêmios
  - Callout link `Todos os cases premiados →`
- [x] `src/pages/contato.astro`: Página de Contato com formulário Web3Forms integrado e embed do Google Maps
- [x] `src/pages/projetos/index.astro`: Portfólio oficial (Work) com grid de 19 cases e nuvem de categorias
- [x] `src/pages/premios/index.astro`: Página de Prêmios com 4 contadores animados e galeria de 23 cases premiados
- [x] `src/pages/nossos-clientes.astro`: Página de Clientes
- [x] `src/pages/404.astro`: Página de erro 404 personalizada e minimalista com fundo preto e retorno à página inicial
- [x] Higienização completa de CSS: zero declarações `!important` no código-fonte ativo (`src/`)
- [x] Ocultação temporária da busca via flag `enableSearch = false` no Header e 404 (evita erro 404 enquanto a Fase 4 não for implementada)
- [x] Redirecionamentos 301 configurados no Astro (`/work`, `/nosso-projetos`, `/premios-2`)

### [x] Fase 3: Artigos Prioritários & Rotas de Categorias
- [x] Setup de Content Collections (`src/content.config.ts`) com schema estrito Zod para posts e cases
- [x] Ingestão automatizada dos 15 artigos prioritários vinculados às páginas institucionais em `src/content/posts/*.md` via `scripts/ingest-priority-posts.mjs`
- [x] Criação de componentes modulares reutilizáveis `CaseMedia.astro` (vídeo responsivo 16:9 do YouTube/Vimeo e galeria) e `FichaTecnica.astro` (metadados estruturados, badges de categorias e prêmios)
- [x] Template dinâmico `src/pages/posts/[slug].astro` para renderização SSG dos artigos individuais com paginação anterior/próximo
- [x] Template dinâmico `src/pages/categoria/[slug].astro`: páginas estáticas dedicadas para as 19 categorias com layout de Projetos, nuvem com filtro ativo e fallback elegante
- [x] Redirecionamento 301 de rotas legadas do WordPress `/category/*` para `/categoria/*` em `astro.config.mjs`
- [x] Conexão ativa de todos os cards da Home, Projetos e Prêmios apontando diretamente para as novas rotas canônicas `/posts/[slug]`
- [x] Build SSG validado com sucesso gerando 41 rotas estáticas no `dist/`, zero erros e zero declarações de `!important`

### [x] Fase 4: Expansão Total de Conteúdo & Busca
- [x] **Ingestão Completa & Deduplicação de Artigos**:
  - Ingestão em lote dos 136 artigos do WordPress para Markdown tipado em `src/content/posts/*.md` via `scripts/ingest-all-posts.mjs`;
  - Deduplicação inteligente de 16 notícias clonadas no WordPress em junho de 2021, consolidando o acervo em **120 artigos canônicos** (94 cases técnicos de portfólio + 26 matérias de imprensa/news).
- [x] **Catalogação e Autonomia Total de Mídias (201 Imagens Locais)**:
  - Download e catalogação de 121 imagens de destaque em `public/images/posts/` via `scripts/download-post-media.mjs`;
  - Resgate e download de 77 novas imagens de galerias e mapeamento de 15 imagens locais em `public/images/premios/` via `scripts/download-and-fix-all-galleries.mjs`;
  - Eliminação de 18 referências a `localhost` herdadas da base do WordPress;
  - Auditoria automatizada (`scripts/audit-images.mjs`) confirmando 0 referências a servidores externos ou links quebrados.
- [x] **Rotas de Categorias & Arquivo Completo**:
  - Implementação de paginação progressiva em lotes de 16 itens ("Carregar mais projetos"), badges contadoras de cases e ordenação cronológica decrescente em `src/pages/categoria/[slug].astro`;
  - Layout editorial diferenciado para `/categoria/news` (exibindo badges de data e resumos jornalísticos);
  - Criação da página estática `/categoria/todos` exibindo o acervo completo de projetos (94 cases) com pill "Todos os Projetos";
  - Alinhamento da vitrine `/projetos` com a página original `/work` da Bizsys (19 cases selecionados + nuvem de categorias + CTA para `/categoria/todos`).
- [x] **Sistema de Busca Estática Instantânea**:
  - Gerador automatizado de índice minificado `public/search-index.json` (51.24 KB, 120 itens) integrado ao ciclo de build (`scripts/generate-search-index.mjs`);
  - Criação da rota `src/pages/busca.astro` com busca reativa client-side, debounce de 150ms, accent folding, highlight de termos, tags sugeridas rápidas, cards horizontais (estilo OceanWP) e botão de limpar exclusivo com ícone SVG;
  - Ativação das flags `enableSearch = true` no `Header.astro` e na `404.astro`;
  - Ajuste de espaçamento desktop de 36px na lupa do Header em perfeita harmonia com o menu institucional.
- [x] **Páginas Institucionais Secundárias & Conformidade**:
  - Criação da rota institucional `src/pages/politica-de-privacidade.astro` com diretrizes LGPD e preservação da declaração do app **SolAR** (ID 1629 do WordPress);
  - Redirecionamento 301 de `/politica-de-privacidade-solar` para `/politica-de-privacidade` em `astro.config.mjs`;
  - Inclusão do link de Privacidade no rodapé (`Footer.astro`).
- [x] **Validação SSG**:
  - Total de **149 rotas estáticas** geradas com sucesso no `dist/` (contra 41 da Fase 3);
  - Zero declarações `!important` na codebase ativa.

### [x] Fase 5: Auditoria, SEO, Redirecionamentos & News Dedicada
- [x] **Página Dedicada `/news` & Menu Institucional**:
  - Criação da rota estática canônica `src/pages/news.astro` para abrigar o acervo editorial completo de 26 notícias e matérias de imprensa da Bizsys;
  - Cards com badges de data de publicação (`dd de mmm de aaaa`), cliente/veículo, clipping e paginação progressiva em lotes de 16;
  - Inclusão do link institucional canônico para `/news` no rodapé oficial (`Footer.astro`);
  - Limpeza dos filtros de tecnologia em `src/pages/categoria/[slug].astro`, mantendo o portfólio restrito a serviços técnicos.
- [x] **SEO Técnico & Indexação**:
  - Instalação e configuração da integração oficial `@astrojs/sitemap` gerando `sitemap-index.xml` e `sitemap-0.xml` com todas as 149 páginas canônicas;
  - Criação do `public/robots.txt` oficial apontando diretamente para o sitemap canônico `https://www.bizsys.com.br/sitemap.xml`.
- [x] **Mapeamento Abrangente de Redirecionamentos 301 Legados**:
  - Configuração em `astro.config.mjs` de todas as rotas históricas mapeadas na varredura ao vivo contra o WordPress (`/sobre`, `/contato-2`, `/posts`, `/categoria/news`, `/category/news`, `/en`, `/prototipos`, subrotas `/nosso-projetos/*` e todas as 19 `/category/*`).
- [x] **Integração do Google Tag Manager**:
  - Inserção do container oficial `GTM-K53DP29` no `<head>` e `<noscript>` do `<body>` em `src/layouts/BaseLayout.astro`, com suporte à sobrescrita configurável via variável de ambiente `PUBLIC_GTM_ID`.
- [x] **Auditoria Automatizada de Performance & Core Web Vitals**:
  - Criação do script de auditoria `scripts/audit-performance.mjs` executando o Lighthouse CLI contra o build estático de produção;
  - Relatório consolidado em `scripts/performance_results.json` comprovando notas 90–100 nas 7 rotas prioritárias (SEO 100 em todas as páginas, Acessibilidade 92–96, Melhores Práticas 96–100 e Performance até 100);
  - Métricas Core Web Vitals excelentes: CLS 0.000–0.001 (zero deslocamento visual), TBT 0ms (zero tempo de bloqueio) e LCP entre 0.3s e 2.5s.
- [x] **Validação SSG Final**:
  - Build estático concluído com 100% de sucesso gerando todas as rotas e redirecionamentos sem erros.
