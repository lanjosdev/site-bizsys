# Roadmap de Migração: Bizsys (WordPress -> Astro Estático)

Este documento acompanha a evolução da engenharia reversa e migração do site **Bizsys** para Astro estático.

---

## 📌 Convenções de Git & Branching

- `main`: Branch estável de produção. Nenhum código de desenvolvimento entra diretamente nela.
- Branches de funcionalidade por fase:
  - `feat/fase-0-setup-extracao`: Extração de dados da API, análise de dependências e baseline de CSS/fontes.
  - `feat/fase-1-astro-shell`: Setup do Astro, Header, Footer, menu mobile e design system global.
  - `feat/fase-2-institucionais`: Home (estática fiel), Sobre Nós, Contato (Web3Forms), Portfólio e Clientes.
  - `feat/fase-3-artigos-vinculados`: Content Collections e geração dos artigos prioritários vinculados às institucionais.
  - `feat/fase-4-expansao-total`: Ingestão dos artigos restantes e catalogação das 745 mídias.
  - `feat/fase-5-auditoria-deploy`: Verificação contra links quebrados/antigos, sitemap e build de produção.

---

## 🚀 Fases do Projeto

### [ ] Fase 0: Inicialização, Setup e Extração Analítica
- [ ] Inicialização do repositório Git e `.gitignore`
- [ ] Extração de metadados completos da WP REST API (`data/raw/pages.json`, `data/raw/posts.json`, `data/raw/taxonomies.json`)
- [ ] Mapeamento e análise de dependências: identificar quais posts/cases são linkados nas páginas institucionais prioritárias (`data/linked_posts.json`)
- [ ] Incorporação do baseline visual local (`D:\Downloads\bizsys.com.br`) com CSS compilado, fontes WOFF/WOFF2 e assets da Home

### [ ] Fase 1: Astro Shell & Design System
- [ ] Inicialização da estrutura Astro (`output: 'static'`)
- [ ] Configuração das fontes locais e variáveis globais de CSS
- [ ] Implementação de `BaseLayout.astro` (metadados, OpenGraph, viewport)
- [ ] Componente `Header.astro` com navegação idêntica e menu mobile responsivo
- [ ] Componente `Footer.astro` com links institucionais e redes sociais

### [ ] Fase 2: Páginas Institucionais Prioritárias
- [ ] `src/pages/index.astro`: Home com hero estático leve e seções fiéis
- [ ] `src/pages/sobre-nos.astro`: Página Sobre Nós
- [ ] `src/pages/contato.astro`: Página de Contato com formulário Web3Forms integrado
- [ ] `src/pages/nosso-projetos/index.astro`: Portfólio com grid de projetos
- [ ] `src/pages/nossos-clientes.astro`: Página de Clientes

### [ ] Fase 3: Artigos Prioritários Conectados
- [ ] Setup de Content Collections (`src/content/config.ts`)
- [ ] Template dinâmico `src/pages/posts/[slug].astro`
- [ ] Ingestão dos artigos identificados no mapeamento de dependências
- [ ] Validação dos links internos entre páginas institucionais e artigos

### [ ] Fase 4: Expansão Total de Conteúdo
- [ ] Ingestão em lote dos 136 artigos completos
- [ ] Ingestão das 25 páginas institucionais secundárias
- [ ] Download das 745 imagens/mídias para `public/uploads/` com reescrita de caminhos

### [ ] Fase 5: Auditoria, SEO e Build Final
- [ ] Verificação contra referências a `wp-content` ou domínios PHP antigos
- [ ] Geração de `sitemap.xml` e `robots.txt`
- [ ] Teste de build estático final (`npm run build`)
- [ ] Merge final na `main` e preparação para publicação
