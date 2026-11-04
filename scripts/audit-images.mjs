import fs from 'node:fs';
import path from 'node:path';

const postsDir = 'src/content/posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let stats = {
  totalPosts: files.length,
  localhostUrls: [],
  remoteBizsysUrls: [],
  allImageUrls: new Set(),
  missingLocalImages: []
};

files.forEach(f => {
  const content = fs.readFileSync(path.join(postsDir, f), 'utf8');

  // Check localhost
  const localhostMatches = content.match(/http:\/\/localhost[^\s"'`\]\)]+/g) || [];
  if (localhostMatches.length > 0) {
    stats.localhostUrls.push({ file: f, urls: localhostMatches });
  }

  // Check remote bizsys
  const bizsysMatches = content.match(/https?:\/\/(www\.)?bizsys\.com\.br\/[^\s"'`\]\)]+\.(png|jpe?g|webp|gif)/gi) || [];
  if (bizsysMatches.length > 0) {
    stats.remoteBizsysUrls.push({ file: f, urls: bizsysMatches });
  }

  // Check all images referenced in frontmatter or markdown
  const imgMatches = content.match(/(\/images\/[^\s"'`\]\)]+\.(png|jpe?g|webp|gif))/gi) || [];
  imgMatches.forEach(imgPath => {
    stats.allImageUrls.add(imgPath);
    const localFsPath = path.join('public', imgPath);
    if (!fs.existsSync(localFsPath)) {
      stats.missingLocalImages.push({ file: f, imgPath });
    }
  });
});

console.log('=== RELATÓRIO DE AUDITORIA DE IMAGENS ===');
console.log('Total de posts analisados:', stats.totalPosts);
console.log('Posts com referências a localhost:', stats.localhostUrls.length);
console.log('Posts com imagens remotas bizsys.com.br:', stats.remoteBizsysUrls.length);
console.log('Total de imagens locais referenciadas:', stats.allImageUrls.size);
console.log('Imagens locais faltando em public/:', stats.missingLocalImages.length);

if (stats.localhostUrls.length > 0) {
  console.log('\n--- POSTS COM LOCALHOST ---');
  stats.localhostUrls.forEach(x => {
    console.log(`Arquivo: ${x.file}`);
    x.urls.forEach(u => console.log(`  - ${u}`));
  });
}

if (stats.missingLocalImages.length > 0) {
  console.log('\n--- IMAGENS LOCAIS FALTANDO ---');
  stats.missingLocalImages.forEach(x => {
    console.log(`Arquivo: ${x.file} -> ${x.imgPath}`);
  });
}

if (stats.remoteBizsysUrls.length > 0) {
  console.log('\n--- POSTS COM IMAGENS REMOTAS (AMOSTRA 10) ---');
  stats.remoteBizsysUrls.slice(0, 10).forEach(x => {
    console.log(`Arquivo: ${x.file} (${x.urls.length} URLs)`);
    x.urls.slice(0, 3).forEach(u => console.log(`  - ${u}`));
  });
}
