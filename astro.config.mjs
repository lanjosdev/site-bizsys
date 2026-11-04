import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.bizsys.com.br',
  redirects: {
    '/work': '/projetos',
    '/nosso-projetos': '/projetos',
    '/premios-2': '/premios',
    '/categoria': '/categoria/todos',
    '/category': '/categoria/todos',
    '/category/todos': '/categoria/todos',
    '/category/ooh': '/categoria/ooh',
    '/category/cenografia': '/categoria/cenografia',
    '/category/ia': '/categoria/ia',
    '/category/projetos-especiais': '/categoria/projetos-especiais',
    '/category/webapp': '/categoria/webapp',
    '/category/ar': '/categoria/ar',
    '/category/led': '/categoria/led',
    '/category/sampling': '/categoria/sampling',
    '/category/produto': '/categoria/produto',
    '/category/lives': '/categoria/lives',
    '/category/sensor-de-movimento': '/categoria/sensor-de-movimento',
    '/category/player-de-audio': '/categoria/player-de-audio',
    '/category/impressao-lenticular': '/categoria/impressao-lenticular',
    '/category/aromatizador': '/categoria/aromatizador',
    '/category/reconhecimento-de-voz': '/categoria/reconhecimento-de-voz',
    '/category/news': '/categoria/news',
    '/politica-de-privacidade-solar': '/politica-de-privacidade',
  }
});
