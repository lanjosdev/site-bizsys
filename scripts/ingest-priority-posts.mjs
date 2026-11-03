/**
 * scripts/ingest-priority-posts.mjs
 * Script de ingestão automatizada dos 15 cases prioritários do WordPress para Astro Content Collections.
 */

import fs from 'node:fs';
import path from 'node:path';

// Carregar bases de dados
const rawPosts = JSON.parse(fs.readFileSync('data/raw/posts.json', 'utf8'));
const linked = JSON.parse(fs.readFileSync('data/linked_posts.json', 'utf8'));
const rawCats = JSON.parse(fs.readFileSync('data/raw/categories.json', 'utf8'));

// Mapa de categorias por ID
const catMap = {};
rawCats.forEach(c => { catMap[c.id] = c.slug; });

// Mapeamento de imagens locais de alta fidelidade
const localImageMap = {
  'desalma-globoplay': '/images/premios/WhatsApp-Image-2020-10-29-at-20.34.52.jpeg',
  'cozinha-as-cegas-maggi': '/images/premios/CozinhaAsCegas_Conjunto.jpg',
  'acessibility-mat': '/images/premios/acessibi_MAT_play.jpg',
  'johnnie-walker-110-anos-aeroporto-projecao-e-ooh': '/images/premios/johnnie-walker.png',
  'freezer-beerboard-amstel': '/images/premios/amstel.png',
  'a-rota-de-emergencia': '/images/premios/rota-de-emergencia.png',
  'reactive-poster-nike': '/images/premios/nike_reactive3.png',
  'lifebuoy-the-clean-braille': '/images/premios/clean-braille.png',
  'mcdonalds-mccode': '/images/premios/mcode3.jpg',
  'pinlist-tokstok': '/images/premios/pin5.jpg',
  'itaipava-radio-finger': '/images/premios/finger.jpg',
  'the-speaking-fireworks': '/images/premios/PF_04.jpg',
  'parking-radio-fma-brasil-insurance': '/images/premios/Parking-Radio.jpg',
  'jogadores-invisiveis': '/images/premios/espnw2.jpg',
  'school-zone-radio-suzuki': '/images/premios/school-zone-radio-min.png'
};

// Mapeamento de Prêmios oficiais
const awardsMap = {
  'desalma-globoplay': [
    'Muse Awards 2021: Gold (Outdoor Advertising)',
    'Muse Awards 2021: Silver (Outdoor Advertising)'
  ],
  'cozinha-as-cegas-maggi': [
    'Cannes Lions 2021: Bronze (Craft)',
    'Cannes Lions 2021: Shortlist (Direct)',
    'Cannes Lions 2021: Shortlist (Design)'
  ],
  'acessibility-mat': [
    'Cannes Lions 2019: Silver (Mobile)',
    'Cannes Lions 2019: Bronze (Design)',
    'Cannes Lions 2019: Bronze (Brand Experience & Activation)',
    'Cannes Lions 2019: Bronze (Sustainable Development Goals)',
    'Wave Festival 2019: Grand Prix (Brand Experience & Activation)',
    'Wave Festival 2019: Ouro (Design)',
    'D&AD Awards 2019: Yellow Pencil (Digital Design / IoT)'
  ],
  'johnnie-walker-110-anos-aeroporto-projecao-e-ooh': [
    'Cannes Lions 2019: Bronze (Craft)',
    'Cannes Lions 2019: Shortlist (Industry Craft)'
  ],
  'freezer-beerboard-amstel': [
    'Cannes Lions 2019: Shortlist (Outdoor)',
    'Cannes Lions 2019: Shortlist (Media)'
  ],
  'a-rota-de-emergencia': [
    'Cannes Lions 2018: Gold (Outdoor – Dynamic Digital Screens)',
    'Cannes Lions 2018: Bronze (Outdoor – Standard Sites)',
    'Cannes Lions 2018: Shortlist'
  ],
  'reactive-poster-nike': [
    'Cannes Lions 2018: Shortlist (Outdoor)'
  ],
  'lifebuoy-the-clean-braille': [
    'Cannes Lions 2017: Shortlist (Outdoor)'
  ],
  'mcdonalds-mccode': [
    'Cannes Lions 2016: Bronze (Cyber)',
    'Cannes Lions 2016: Shortlist'
  ],
  'pinlist-tokstok': [
    'Cannes Lions 2016: Bronze (Cyber – Branded Tech)',
    'Cannes Lions 2016: Bronze (Cyber – Social Business)',
    'Cannes Lions 2016: Shortlist'
  ],
  'itaipava-radio-finger': [
    'Cannes Lions 2016: Bronze (Radio – Medium – Use of Audio Technology)'
  ],
  'the-speaking-fireworks': [
    'Cannes Lions 2016: Bronze'
  ],
  'parking-radio-fma-brasil-insurance': [
    'Cannes Lions 2016: Silver (Radio – Medium – Use of Audio Technology)',
    'Cannes Lions 2016: Shortlist (Outdoor – Ambient – Transit)'
  ],
  'jogadores-invisiveis': [
    'Clio Awards 2016: Grand Clio (Out of Home | Transit)',
    'Clio Awards 2016: Shortlist (Events/Experiential)'
  ],
  'school-zone-radio-suzuki': [
    'Cannes Lions 2016: Silver (Radio – Use of Radio as a Medium)'
  ]
};

function decodeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function escapeYamlString(str) {
  if (!str) return '""';
  // If string contains quotes, newlines, colons, or special characters, wrap in double quotes
  return JSON.stringify(str);
}

const targetDir = path.resolve('src/content/posts');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const summary = [];

for (const slug of linked.priorityPostSlugs) {
  const p = rawPosts.find(x => x.slug === slug);
  if (!p) {
    console.warn(`Post com slug "${slug}" não encontrado em posts.json!`);
    continue;
  }

  const html = p.content.rendered;

  // 1. Extração do Vídeo
  const settingsMatches = [...html.matchAll(/data-settings="([^"]+)"/g)].map(m => {
    try { return JSON.parse(m[1].replace(/&quot;/g, '"')); } catch { return null; }
  }).filter(Boolean);
  const videoSetting = settingsMatches.find(s => s.youtube_url || s.vimeo_url);
  const videoUrl = videoSetting ? (videoSetting.youtube_url || videoSetting.vimeo_url) : undefined;

  // 2. Extração de Imagens da Galeria
  const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"/gi)]
    .map(m => m[1])
    .filter(url => !url.includes('gravatar') && !url.includes('logo') && !url.includes('icon'));

  // 3. Categorias
  const categories = (p.categories || [])
    .map(cid => catMap[cid])
    .filter(Boolean);

  // 4. Ficha Técnica
  const fichaIdx = html.search(/Ficha T[eé]cnica/i);
  let fichaText = '';
  let bodyHtml = html;
  if (fichaIdx !== -1) {
    bodyHtml = html.slice(0, fichaIdx);
    fichaText = html.slice(fichaIdx, fichaIdx + 2000)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/div>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .join('\n');
  }

  // Campos da ficha técnica
  const clientMatch = fichaText.match(/Cliente:\s*([^\n\r]+)/i);
  const partnerMatch = fichaText.match(/Parceria:\s*([^\n\r]+)/i);
  const yearMatch = fichaText.match(/Ano:\s*(\d{4})/i) || p.date.match(/^(\d{4})/);

  let client = clientMatch ? decodeHtml(clientMatch[1]) : 'Bizsys';
  // Limpeza de cliente caso tenha texto extra colado
  client = client.replace(/(Parceria|Ano|Cannes|Muse|Clio|Wave):.*$/i, '').trim();

  let partnership = partnerMatch ? decodeHtml(partnerMatch[1]) : undefined;
  if (partnership) {
    partnership = partnership.replace(/(Ano|Cannes|Muse|Clio|Wave):.*$/i, '').trim();
  }

  const year = yearMatch ? parseInt(yearMatch[1], 10) : parseInt(p.date.slice(0, 4), 10);
  const featuredImage = localImageMap[slug] || '';
  const awards = awardsMap[slug] || [];

  // 5. Extração de Parágrafos Editoriais
  const widgetRegex = /class="elementor-widget-container">([\s\S]*?)<\/div>/gi;
  const blocks = [];
  let m;
  while ((m = widgetRegex.exec(bodyHtml)) !== null) {
    const raw = m[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .trim();
    const cleaned = decodeHtml(raw);
    if (
      cleaned.length > 25 &&
      !cleaned.startsWith('©') &&
      !cleaned.includes('Rua Dom João') &&
      !cleaned.includes('INSTAGRAM') &&
      !cleaned.toLowerCase().includes('ficha técnica') &&
      !cleaned.includes('elementor')
    ) {
      const paras = cleaned.split('\n').map(s => s.trim()).filter(s => s.length > 20);
      blocks.push(...paras);
    }
  }

  // Deduplicar blocos idênticos mantendo ordem
  const editorialParagraphs = blocks.filter((b, idx, arr) => arr.indexOf(b) === idx);

  // Excerpt
  const excerpt = editorialParagraphs[0]
    ? editorialParagraphs[0].slice(0, 160) + (editorialParagraphs[0].length > 160 ? '...' : '')
    : decodeHtml(p.excerpt?.rendered || '').replace(/\[&hellip;\]/, '').trim();

  const title = decodeHtml(p.title.rendered);
  const mediaType = videoUrl ? 'video' : (imgMatches.length > 1 ? 'carousel' : 'image');

  // 6. Montagem do Markdown
  const frontmatter = [
    '---',
    `id: ${p.id}`,
    `title: ${escapeYamlString(title)}`,
    `client: ${escapeYamlString(client)}`,
    `year: ${year}`,
    partnership ? `partnership: ${escapeYamlString(partnership)}` : null,
    `categories: ${JSON.stringify(categories)}`,
    `mediaType: ${escapeYamlString(mediaType)}`,
    videoUrl ? `videoUrl: ${escapeYamlString(videoUrl)}` : null,
    `galleryImages: ${JSON.stringify(imgMatches)}`,
    `featuredImage: ${escapeYamlString(featuredImage)}`,
    `excerpt: ${escapeYamlString(excerpt)}`,
    `date: ${escapeYamlString(p.date)}`,
    `awards: ${JSON.stringify(awards)}`,
    '---',
    '',
    editorialParagraphs.join('\n\n'),
    ''
  ].filter(line => line !== null).join('\n');

  const filePath = path.join(targetDir, `${slug}.md`);
  fs.writeFileSync(filePath, frontmatter, 'utf8');

  summary.push({
    slug,
    id: p.id,
    client,
    year,
    mediaType,
    categories: categories.join(', '),
    paragraphs: editorialParagraphs.length
  });
}

console.log(`\n🎉 Ingestão concluída com sucesso! ${summary.length} posts gerados em src/content/posts/\n`);
console.table(summary);
