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
  - `feat/fase-4-expansao-total`: Ingestão dos 136 artigos completos, catalogação de mídias e sistema de busca estática.
  - `feat/fase-5-auditoria-deploy`: Verificação de links legados, sitemap.xml, robots.txt, performance e deploy.

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

### [ ] Fase 3: Artigos Prioritários & Rotas de Categorias
- [ ] Setup de Content Collections (`src/content/config.ts`) com schema estrito para posts e cases
- [ ] Template dinâmico `src/pages/posts/[slug].astro` para renderização dos artigos
- [ ] Template dinâmico `src/pages/categoria/[slug].astro`: páginas estáticas dedicadas para cada categoria com layout de Projetos
- [ ] Redirecionamento 301 de rotas antigas do WordPress `/category/*` para `/categoria/*`
- [ ] Ingestão dos artigos prioritários vinculados às páginas institucionais
- [ ] Validação dos links internos entre páginas institucionais e artigos

### [ ] Fase 4: Expansão Total de Conteúdo & Busca
- [ ] Ingestão em lote dos 136 artigos completos da Bizsys
- [ ] Ingestão das 25 páginas institucionais secundárias
- [ ] Download e catalogação local das 745 imagens/mídias em `public/uploads/` com reescrita de caminhos
- [ ] Implementação da página estática de busca `src/pages/busca.astro` com indexação estática (Pagefind ou client-side)
  - Visual idêntico ao template original do WordPress (cards horizontais com thumbnail, título, excerto de texto, link `CONTINUAR LENDO` e paginação numerada)
  - Ativação das flags `enableSearch = true` no `Header.astro` e na `404.astro`

### [ ] Fase 5: Auditoria, SEO e Build Final
- [ ] Verificação contra referências a `wp-content` ou domínios PHP antigos
- [ ] Geração de `sitemap.xml` e `robots.txt`
- [ ] Auditoria de performance (Lighthouse / Core Web Vitals)
- [ ] Teste de build estático final (`npm run build`)
- [ ] Merge final da branch `feat/fase-2-institucionais` para `main` e preparação para publicação
