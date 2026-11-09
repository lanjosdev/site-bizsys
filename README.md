# Bizsys — Site Institucional

Reengenharia reversa e migração do site oficial da **Bizsys** de WordPress (PHP/Elementor/OceanWP) para **Astro (Static Site Generation - SSG)**, garantindo performance extrema, fidelidade visual rigorosa, zero dependência de banco de dados e SEO otimizado.

---

## ⚡ Stack Tecnológica

- **Framework**: [Astro 5](https://astro.build/) (Modo `output: 'static'`)
- **Linguagem**: TypeScript
- **Content Collections**: Content Layer nativo do Astro com validação de schemas em [Zod](https://zod.dev/)
- **Estilização**: CSS moderno escopado nativamente pelo Astro, tokens em CSS Variables e fontes tipográficas locais (**Good Sans**)
- **Motor de Busca**: Busca estática instantânea client-side com índice JSON minificado (51 KB) gerado no pré-build
- **SEO Técnico & Indexação**: Sitemap XML gerado automaticamente via `@astrojs/sitemap`, arquivo `robots.txt` oficial e metadados OpenGraph/Twitter Cards completos
- **Analytics & Rastreamento**: Google Tag Manager (`GTM-K53DP29`) integrado no `<head>` e `<noscript>` com suporte a override via `PUBLIC_GTM_ID`
- **Formulários**: [Web3Forms](https://web3forms.com/) (envio seguro de mensagens sem necessidade de backend próprio)
- **Qualidade de Código**: Zero declarações de `!important` na codebase ativa, garantindo especificidade limpa e modular
- **Autonomia de Mídias**: 100% dos 120 posts canônicos operam com imagens locais (201 mídias em `public/images/`) sem qualquer dependência de servidores legados
- **Core Web Vitals**: Performance validada via Lighthouse (scores 90–100, zero layout shift e zero blocking time)

---

## 📁 Estrutura do Projeto

```text
site-bizsys/
├── baseline/              # Acervo bruto HTML/CSS/JS do WordPress original (referência histórica)
├── data/                  # Metadados JSON extraídos da WP REST API (posts, pages, taxionomias)
├── public/                # Arquivos públicos estáticos
│   ├── favicon.ico        # Monograma circular oficial Bizsys
│   ├── favicon.png        # Favicon PNG 16x16 oficial
│   ├── robots.txt         # Diretrizes de rastreamento de indexação
│   ├── search-index.json  # Índice estático minificado para busca rápida (120 artigos)
│   ├── fonts/             # Família Good Sans (Light, Regular, Medium, Bold)
│   └── images/            # Logos, banners institucionais, capas e galerias locais
│       ├── posts/         # Imagens de destaque e galerias de todos os cases
│       └── premios/       # Mídias em alta resolução dos cases premiados
├── scripts/               # Scripts de automação, ingestão e auditoria
│   ├── audit-images.mjs   # Auditoria de integridade e ausência de links remotos
│   ├── audit-performance.mjs # Auditoria automatizada de Core Web Vitals e Lighthouse
│   ├── download-and-fix-all-galleries.mjs # Download de galerias e correção de caminhos
│   ├── download-post-media.mjs # Download automatizado das mídias de destaque
│   ├── generate-search-index.mjs # Geração automatizada de public/search-index.json
│   └── ingest-all-posts.mjs # Ingestão dos 120 posts canônicos para Markdown tipado
├── src/
│   ├── components/        # Componentes Astro reutilizáveis (Header, Footer, CaseMedia, FichaTecnica)
│   ├── content.config.ts  # Configuração e schema Zod das Content Collections
│   ├── content/           # Coleções de conteúdo tipadas em Markdown
│   │   └── posts/         # 120 artigos e cases individuais canônicos (.md)
│   ├── data/              # Bases de dados estruturadas em TypeScript (wpData.ts, premiosData.ts)
│   ├── layouts/           # Layouts mestres (BaseLayout.astro com SEO, GTM e OpenGraph)
│   ├── pages/             # Rotas do site (SSG)
│   │   ├── index.astro            # Página inicial (Home)
│   │   ├── news.astro             # Rota dedicada de notícias e clipping de imprensa
│   │   ├── sobre-nos.astro        # Sobre Nós
│   │   ├── contato.astro          # Contato com Web3Forms
│   │   ├── busca.astro            # Sistema de busca estática instantânea
│   │   ├── politica-de-privacidade.astro # Política de Privacidade e SolAR (LGPD)
│   │   ├── projetos/index.astro   # Vitrine de Portfólio (Work) e 19 cases curados
│   │   ├── premios/index.astro    # Prêmios e contadores
│   │   ├── nossos-clientes.astro  # Clientes
│   │   ├── 404.astro              # Página de erro 404 personalizada com busca integrada
│   │   ├── posts/[slug].astro     # Template dinâmico de cases (120 rotas estáticas)
│   │   └── categoria/[slug].astro # Template de categorias e /categoria/todos
│   └── styles/            # Folhas de estilo globais e variáveis de design
├── astro.config.mjs       # Configurações do Astro, @astrojs/sitemap e redirecionamentos 301 legados
├── package.json           # Dependências e scripts do projeto
├── README.md              # Documentação geral do repositório
└── ROADMAP.md             # Acompanhamento detalhado das fases de migração
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18+ ou 20+ recomendada)
- `npm` ou gerenciador de pacotes equivalente

### Instalação das dependências
```bash
npm install
```

### Desenvolvimento local
Inicia o servidor de desenvolvimento com hot-reload na porta `4321`:
```bash
npm run dev
```
Acesse no navegador: `http://localhost:4321`

### Build estático de produção
Gera o índice de busca estático e compila os arquivos HTML/CSS/JS na pasta `dist/`:
```bash
npm run build
```

### Visualização do build de produção
Inicia um servidor local servindo diretamente os arquivos compilados da pasta `dist/`:
```bash
npm run preview
```

### Auditoria de Performance & Core Web Vitals
Executa auditoria automatizada contra o build estático de produção (`dist/`):
```bash
node scripts/audit-performance.mjs
```

---

## 🗺️ Rotas e Status Atual (Fase 5 Concluída — 149 Rotas SSG, SEO & Redirecionamentos)

| Rota | Descrição | Status |
| :--- | :--- | :--- |
| `/` | **Home**: Hero com vídeo showreel, carrossel de cases conectados, nuvem de categorias e banner de prêmios | Concluída |
| `/sobre-nos` | **Sobre Nós**: Manifesto, método dos 3 círculos conexos, time, clientes e 16 prêmios documentados | Concluída |
| `/contato` | **Contato**: Informações de atendimento, formulário Web3Forms integrado e mapa Google Maps | Concluída |
| `/projetos` | **Vitrine de Portfólio**: Vitrine fiel a `/work` com 19 cases selecionados, nuvem técnica e link para catálogo completo | Concluída |
| `/categoria/todos` | **Todos os Projetos**: Acervo completo com 94 cases de portfólio, paginação progressiva de 16 itens e contadores | Concluída |
| `/news` | **Notícias e Imprensa**: Rota dedicada com 26 matérias editoriais da Bizsys, badges com datas, clipping e paginação | Concluída |
| `/categoria/[slug]` | **Páginas de Categoria**: 19 páginas de arquivo por categoria técnica (OOH, Cenografia, IA, etc.) | Concluída (19 rotas) |
| `/busca` | **Buscador do Acervo**: Busca client-side ultrarrápida cobrindo os 120 posts com debounce de 150ms e highlight | Concluída |
| `/politica-de-privacidade` | **Política de Privacidade**: Diretrizes de privacidade, conformidade LGPD e declaração do app SolAR (ID 1629) | Concluída |
| `/premios` | **Prêmios**: 4 contadores estatísticos animados e galeria com 23 cases premiados conectados | Concluída |
| `/nossos-clientes` | **Clientes**: Grid institucional dos principais clientes atendidos | Concluída |
| `/404` | **404 Not Found**: Página personalizada minimalista em fundo preto e formulário de busca integrado | Concluída |
| `/posts/[slug]` | **Cases e Artigos**: 120 páginas estáticas individuais com player 16:9, galeria local e Ficha Técnica | Concluída (120 rotas) |
| `/sitemap-index.xml` | **Sitemap XML**: Índice oficial de sitemaps cobrindo todas as páginas canônicas | Ativo |
| `/robots.txt` | **Robots TXT**: Instruções de rastreamento apontando para o sitemap canônico | Ativo |
| `/work` e `/nosso-projetos` | Redirecionamentos 301 automáticos para `/projetos` | Ativo |
| `/premios-2` | Redirecionamento 301 automático para `/premios` | Ativo |
| `/sobre` | Redirecionamento 301 automático para `/sobre-nos` | Ativo |
| `/contato-2` | Redirecionamento 301 automático para `/contato` | Ativo |
| `/categoria/news` e `/category/news` | Redirecionamentos 301 automáticos para a rota canônica `/news` | Ativo |
| `/posts` | Redirecionamento 301 automático para `/categoria/todos` | Ativo |
| `/en` | Redirecionamento 301 automático para `/` (legado TranslatePress) | Ativo |
| `/politica-de-privacidade-solar` | Redirecionamento 301 automático para `/politica-de-privacidade` | Ativo |
| `/categoria` e `/category` | Redirecionamentos 301 automáticos para `/categoria/todos` | Ativo |
| `/category/:slug` | 19 redirecionamentos 301 automáticos de `/category/*` legados do WP para `/categoria/*` | Ativo |
| `/nosso-projetos/*` e serviços antigos | Redirecionamentos 301 para categorias correspondentes | Ativo |

---

## 📌 Convenções de Git & Branching

O repositório adota um fluxo de trabalho estruturado e branch-per-phase:
- `main`: Branch estável de produção.
- `feat/fase-5-auditoria-seo-news`: Branch onde a Fase 5 foi integralmente implementada, validada e documentada.
- Commits atômicos e descritivos seguindo o padrão Conventional Commits.
