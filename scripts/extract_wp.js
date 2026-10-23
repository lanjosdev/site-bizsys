const fs = require('fs');
const path = require('path');
const https = require('https');

const agent = new https.Agent({ rejectUnauthorized: false });

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { agent, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data)
          });
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}\nData snippet: ${data.slice(0, 200)}`));
        }
      });
    }).on('error', reject);
  });
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function run() {
  const dataRawDir = path.join(__dirname, '..', 'data', 'raw');
  await ensureDir(dataRawDir);

  console.log('1. Extraindo Páginas Institucionais...');
  const pagesResp = await fetchJson('https://www.bizsys.com.br/wp-json/wp/v2/pages?per_page=100&_embed');
  console.log(`Total de páginas obtidas: ${pagesResp.body.length}`);
  fs.writeFileSync(path.join(dataRawDir, 'pages.json'), JSON.stringify(pagesResp.body, null, 2), 'utf8');

  console.log('\n2. Extraindo Artigos / Posts (Paginado)...');
  let allPosts = [];
  let page = 1;
  while (true) {
    console.log(`Buscando posts página ${page}...`);
    const postsResp = await fetchJson(`https://www.bizsys.com.br/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed`);
    if (Array.isArray(postsResp.body) && postsResp.body.length > 0) {
      allPosts = allPosts.concat(postsResp.body);
      const totalPages = parseInt(postsResp.headers['x-wp-totalpages'] || '1', 10);
      if (page >= totalPages) break;
      page++;
    } else {
      break;
    }
  }
  console.log(`Total de posts obtidos: ${allPosts.length}`);
  fs.writeFileSync(path.join(dataRawDir, 'posts.json'), JSON.stringify(allPosts, null, 2), 'utf8');

  console.log('\n3. Extraindo Categorias e Tags...');
  const catResp = await fetchJson('https://www.bizsys.com.br/wp-json/wp/v2/categories?per_page=100');
  console.log(`Total de categorias obtidas: ${catResp.body.length}`);
  fs.writeFileSync(path.join(dataRawDir, 'categories.json'), JSON.stringify(catResp.body, null, 2), 'utf8');

  console.log('\n✓ Extração da WP REST API concluída com sucesso!');
}

run().catch((err) => {
  console.error('Erro na extração:', err);
  process.exit(1);
});
