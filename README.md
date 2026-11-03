# Bizsys — Site Institucional

Reengenharia reversa e migração do site oficial da **Bizsys** de WordPress (PHP/Elementor/OceanWP) para **Astro (Static Site Generation - SSG)**, garantindo performance extrema, fidelidade visual rigorosa, zero dependência de banco de dados e SEO otimizado.

---

## ⚡ Stack Tecnológica

- **Framework**: [Astro 5](https://astro.build/) (Modo `output: 'static'`)
- **Linguagem**: TypeScript
- **Content Collections**: Content Layer nativo do Astro com validação de schemas em [Zod](https://zod.dev/)
- **Estilização**: CSS moderno escopado nativamente pelo Astro, tokens em CSS Variables e fontes tipográficas locais (**Good Sans**)
- **Formulários**: [Web3Forms](https://web3forms.com/) (envio seguro de mensagens sem necessidade de backend próprio)
- **Qualidade de Código**: Zero declarações de `!important` na codebase ativa, garantindo especificidade limpa e modular

---

## 📁 Estrutura do Projeto

```text
site-bizsys/
├── baseline/              # Acervo bruto HTML/CSS/JS do WordPress original (referência histórica)
├── data/                  # Metadados JSON extraídos da WP REST API (posts, pages, taxionomias)
├── public/                # Arquivos públicos estáticos
│   ├── favicon.ico        # Monograma circular oficial Bizsys
│   ├── favicon.png        # Favicon PNG 16x16 oficial
│   ├── fonts/             # Família Good Sans (Light, Regular, Medium, Bold)
│   └── images/            # Logos, banners institucionais e capas de cases
├── scripts/               # Scripts de automação e ingestão de conteúdo
│   └── ingest-priority-posts.mjs # Ingestão dos 15 cases prioritários do WP para Markdown
├── src/
│   ├── components/        # Componentes Astro reutilizáveis (Header, Footer, CaseMedia, FichaTecnica)
│   ├── content.config.ts  # Configuração e schema Zod das Content Collections
│   ├── content/           # Coleções de conteúdo tipadas em Markdown
│   │   └── posts/         # Artigos e cases individuais (.md)
│   ├── data/              # Bases de dados estruturadas em TypeScript (wpData.ts, premiosData.ts)
│   ├── layouts/           # Layouts mestres (BaseLayout.astro com SEO e OpenGraph)
│   ├── pages/             # Rotas do site (SSG)
│   │   ├── index.astro            # Página inicial (Home)
│   │   ├── sobre-nos.astro        # Sobre Nós
│   │   ├── contato.astro          # Contato com Web3Forms
│   │   ├── projetos/index.astro   # Portfólio (Work) e grid de cases
│   │   ├── premios/index.astro    # Prêmios e contadores
│   │   ├── nossos-clientes.astro  # Clientes
│   │   ├── 404.astro              # Página de erro 404 personalizada
│   │   ├── posts/[slug].astro     # Template mestre dinâmico de cases individuais
│   │   └── categoria/[slug].astro # Template de listagem por categoria
│   └── styles/            # Folhas de estilo globais e variáveis de design
├── astro.config.mjs       # Configurações do Astro e redirecionamentos 301 legados
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
Gera os arquivos HTML/CSS/JS estáticos na pasta `dist/`:
```bash
npm run build
```

### Visualização do build de produção
Inicia um servidor local servindo diretamente os arquivos compilados da pasta `dist/`:
```bash
npm run preview
```

---

## 🗺️ Rotas e Status Atual (Fase 3 Concluída — 41 Rotas SSG)

| Rota | Descrição | Status |
| :--- | :--- | :--- |
| `/` | **Home**: Hero com vídeo showreel, carrossel de cases conectados, nuvem de categorias e banner de prêmios | Concluída |
| `/sobre-nos` | **Sobre Nós**: Manifesto, método dos 3 círculos conexos, time, clientes e 16 prêmios documentados | Concluída |
| `/contato` | **Contato**: Informações de atendimento, formulário Web3Forms integrado e mapa Google Maps | Concluída |
| `/projetos` | **Portfólio**: Grid de 19 cases, grid dos 15 cases conectados e nuvem categorizada de atuação | Concluída |
| `/premios` | **Prêmios**: 4 contadores estatísticos animados e galeria com 23 cases premiados conectados | Concluída |
| `/nossos-clientes` | **Clientes**: Grid institucional dos principais clientes atendidos | Concluída |
| `/404` | **404 Not Found**: Página personalizada minimalista em fundo preto e retorno à home | Concluída |
| `/posts/[slug]` | **Template de Cases**: 15 páginas estáticas individuais com player de vídeo 16:9, galeria e Ficha Técnica | Concluída (15 rotas) |
| `/categoria/[slug]` | **Páginas de Categoria**: 19 páginas de arquivo por categoria com hero, filtro ativo e grid de cases | Concluída (19 rotas) |
| `/work` | Redirecionamento 301 automático para `/projetos` | Ativo |
| `/nosso-projetos` | Redirecionamento 301 automático para `/projetos` | Ativo |
| `/premios-2` | Redirecionamento 301 automático para `/premios` | Ativo |
| `/category/:slug` | 14 redirecionamentos 301 automáticos de `/category/*` legados do WP para `/categoria/*` | Ativo |

---

## 📌 Convenções de Git & Branching

O repositório adota um fluxo de trabalho estruturado e branch-per-phase:
- `main`: Branch estável de produção.
- `feat/fase-3-artigos-vinculados`: Branch atual onde a Fase 3 foi implementada e validada.
- Commits atômicos e descritivos seguindo o padrão Conventional Commits.
