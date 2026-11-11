import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.bizsys.com.br',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/search-index.json'),
    }),
  ],
  redirects: {
    // Rotas institucionais históricas do WP
    '/work': '/projetos',
    '/nosso-projetos': '/projetos',
    '/premios-2': '/premios',
    '/sobre': '/sobre-nos',
    '/contato-2': '/contato',
    '/categoria/news': '/news',
    '/posts': '/categoria/todos',
    '/politica-de-privacidade-solar': '/politica-de-privacidade',

    // TranslatePress (rotas em inglês legadas do WP)
    '/en': '/',

    // Subpáginas e serviços legados do portfólio WP
    '/nosso-projetos/ooh': '/categoria/ooh',
    '/nosso-projetos/interaction': '/categoria/projetos-especiais',
    '/nosso-projetos/software': '/categoria/webapp',
    '/nosso-projetos/sampling': '/categoria/sampling',
    '/nosso-projetos/mobile-app': '/categoria/webapp',
    '/nosso-projetos/prototipos': '/categoria/produto',
    '/prototipos': '/categoria/produto',
    '/design-de-produto': '/categoria/produto',
    '/software': '/categoria/webapp',
    '/website-and-portals': '/categoria/webapp',
    '/interaction': '/categoria/projetos-especiais',
    '/interacao': '/categoria/projetos-especiais',

    // Redirecionamento legado de /category/* para /categoria/*
    '/categoria': '/categoria/todos',
    '/category': '/categoria/todos',
    '/category/todos': '/categoria/todos',
    '/category/ooh': '/categoria/ooh',
    '/category/cenografia': '/categoria/cenografia',
    '/category/ia': '/categoria/ia',
    '/category/projetos-especiais': '/categoria/projetos-especiais',
    '/category/webapp': '/categoria/webapp',
    '/category/ar': '/categoria/ar',
    '/category/vr': '/categoria/vr',
    '/category/led': '/categoria/led',
    '/category/sampling': '/categoria/sampling',
    '/category/produto': '/categoria/produto',
    '/category/lives': '/categoria/lives',
    '/category/sensor-de-movimento': '/categoria/sensor-de-movimento',
    '/category/player-de-audio': '/categoria/player-de-audio',
    '/category/impressao-lenticular': '/categoria/impressao-lenticular',
    '/category/aromatizador': '/categoria/aromatizador',
    '/category/reconhecimento-de-voz': '/categoria/reconhecimento-de-voz',
    '/category/midia': '/categoria/midia',
    '/category/na-bizys': '/categoria/na-bizys',
    '/category/news': '/news',
  },
});
