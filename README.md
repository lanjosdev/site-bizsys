# Bizsys — Site Institucional

Reengenharia reversa e migração do site oficial da **Bizsys** de WordPress (PHP/Elementor/OceanWP) para **Astro (Static Site Generation - SSG)**, garantindo performance extrema, fidelidade visual rigorosa, zero dependência de banco de dados e SEO otimizado.

---

## ⚡ Stack Tecnológica

- **Framework**: [Astro 5](https://astro.build/) (Modo `output: 'static'`)
- **Linguagem**: TypeScript
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
├── src/
│   ├── components/        # Componentes Astro reutilizáveis (Header, Footer, etc.)
│   ├── data/              # Bases de dados estruturadas em TypeScript (wpData.ts)
│   ├── layouts/           # Layouts mestres (BaseLayout.astro com SEO e OpenGraph)
│   ├── pages/             # Rotas do site (SSG)
│   │   ├── index.astro            # Página inicial (Home)
│   │   ├── sobre-nos.astro        # Sobre Nós
│   │   ├── contato.astro          # Contato com Web3Forms
│   │   ├── projetos/index.astro   # Portfólio (Work)
│   │   ├── premios/index.astro    # Prêmios e contadores
│   │   ├── nossos-clientes.astro  # Clientes
│   │   └── 404.astro              # Página de erro 404 personalizada
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

## 🗺️ Rotas e Status Atual (Fase 2 Concluída)

| Rota | Descrição | Status |
| :--- | :--- | :--- |
| `/` | **Home**: Hero leve com imagem de fundo, carrossel de cases, nuvem de categorias responsiva e banner de prêmios | Concluída |
| `/sobre-nos` | **Sobre Nós**: Manifesto, método dos 3 círculos conexos, time, clientes e 16 prêmios documentados | Concluída |
| `/contato` | **Contato**: Informações de atendimento, formulário Web3Forms integrado e mapa Google Maps | Concluída |
| `/projetos` | **Portfólio**: Grid de 19 cases destacados e nuvem categorizada de atuação | Concluída |
| `/premios` | **Prêmios**: 4 contadores estatísticos animados e galeria com 23 cases premiados | Concluída |
| `/nossos-clientes` | **Clientes**: Grid institucional dos principais clientes atendidos | Concluída |
| `/404` | **404 Not Found**: Página personalizada minimalista em fundo preto e retorno à home | Concluída |
| `/work` | Redirecionamento 301 automático para `/projetos` | Ativo |
| `/nosso-projetos` | Redirecionamento 301 automático para `/projetos` | Ativo |
| `/premios-2` | Redirecionamento 301 automático para `/premios` | Ativo |

---

## 📌 Convenções de Git & Branching

O repositório adota um fluxo de trabalho estruturado e branch-per-phase:

- `main`: Branch estável de produção. Nenhum código de desenvolvimento entra diretamente nela sem aprovação.
- Branches por fase de migração:
  - `feat/fase-0-setup-extracao`: Extração de dados da API e baseline.
  - `feat/fase-1-astro-shell`: Shell, layout mestre, fontes e componentes globais.
  - `feat/fase-2-institucionais`: Páginas institucionais prioritárias e refinamento visual.
  - `feat/fase-3-artigos-vinculados`: Content Collections, páginas de categorias `/categoria/[slug]` e artigos vinculados.
  - `feat/fase-4-expansao-total`: Ingestão dos 136 artigos completos e sistema de busca estática.
  - `feat/fase-5-auditoria-deploy`: Auditoria final de links, SEO e deploy em produção.

---

## 📋 Roadmap Completo

Para detalhes técnicos, decisões de engenharia reversa e checklist das próximas etapas, consulte o arquivo [ROADMAP.md](ROADMAP.md).
