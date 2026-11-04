/**
 * scripts/generate-search-index.mjs
 * Gera o índice estático e leve para busca client-side instantânea em public/search-index.json
 */

import fs from 'node:fs';
import path from 'node:path';

const postsDir = path.resolve('src/content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const searchIndex = [];

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');

  // Extrair frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) continue;

  const fmText = fmMatch[1];
  const bodyText = content.slice(fmMatch[0].length).trim();

  // Helper para ler campos simples do frontmatter
  const getFmField = (fieldName) => {
    const m = fmText.match(new RegExp(`^${fieldName}:\\s*(.+)$`, 'm'));
    if (!m) return '';
    let val = m[1].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      try { val = JSON.parse(val); } catch {}
    }
    return val;
  };

  // Helper para ler campos array
  const getFmArray = (fieldName) => {
    const m = fmText.match(new RegExp(`^${fieldName}:\\s*(\\[[^\\]]*\\])`, 'm'));
    if (!m) return [];
    try { return JSON.parse(m[1]); } catch { return []; }
  };

  const id = parseInt(getFmField('id'), 10) || 0;
  const title = getFmField('title') || slug;
  const client = getFmField('client') || 'Bizsys';
  const year = parseInt(getFmField('year'), 10) || undefined;
  const categories = getFmArray('categories');
  const featuredImage = getFmField('featuredImage') || '/images/awards-bg.png';
  const excerpt = getFmField('excerpt') || bodyText.slice(0, 160).replace(/\n+/g, ' ');
  const date = getFmField('date') || '';

  searchIndex.push({
    slug,
    id,
    title,
    client,
    year,
    categories,
    featuredImage,
    excerpt,
    date
  });
}

// Ordenar por data decrescente
searchIndex.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const outputPath = path.resolve('public/search-index.json');
fs.writeFileSync(outputPath, JSON.stringify(searchIndex), 'utf8');

console.log(`✅ Índice de busca gerado com sucesso!`);
console.log(`   Itens indexados: ${searchIndex.length}`);
console.log(`   Arquivo: public/search-index.json (${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB)\n`);
