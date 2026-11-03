import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.bizsys.com.br',
  redirects: {
    '/work': '/projetos',
    '/nosso-projetos': '/projetos',
    '/premios-2': '/premios',
  }
});
