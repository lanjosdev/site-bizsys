const fs = require('fs');
const path = require('path');

function run() {
  const dataRawDir = path.join(__dirname, '..', 'data', 'raw');
  const pagesPath = path.join(dataRawDir, 'pages.json');
  const postsPath = path.join(dataRawDir, 'posts.json');

  if (!fs.existsSync(pagesPath) || !fs.existsSync(postsPath)) {
    console.error('pages.json ou posts.json não encontrados em data/raw/');
    process.exit(1);
  }

  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

  // Create a map of post slugs and links
  const postSlugMap = new Map();
  posts.forEach(p => {
    postSlugMap.set(p.slug.toLowerCase(), p);
    // Also map id
    postSlugMap.set(`post-${p.id}`, p);
  });

  // Priority institutional page slugs
  const prioritySlugs = [
    'home',
    'bizsys',
    'sobre-nos',
    'sobre',
    'contato',
    'contato-2',
    'nosso-projetos',
    'nossos-clientes'
  ];

  const priorityPages = pages.filter(p => prioritySlugs.includes(p.slug.toLowerCase()));
  console.log(`Encontradas ${priorityPages.length} páginas institucionais prioritárias.`);

  const linkedPostSlugs = new Set();
  const linkDetails = [];

  for (const page of priorityPages) {
    const content = (page.content && page.content.rendered) || '';
    // Extract all hrefs
    const hrefMatches = content.match(/href=["']([^"']+)["']/gi) || [];
    const foundLinks = [];

    for (const match of hrefMatches) {
      const url = match.replace(/href=["']/i, '').replace(/["']$/, '');
      if (url.includes('bizsys.com.br')) {
        try {
          const parsed = new URL(url);
          const pathSegments = parsed.pathname.split('/').filter(Boolean);
          // Check if any segment matches a post slug
          for (const segment of pathSegments) {
            const cleanSlug = segment.toLowerCase();
            if (postSlugMap.has(cleanSlug)) {
              linkedPostSlugs.add(cleanSlug);
              foundLinks.push({
                url,
                matchedSlug: cleanSlug,
                postTitle: postSlugMap.get(cleanSlug).title.rendered
              });
            }
          }
        } catch (e) {
          // ignore invalid URLs
        }
      }
    }

    linkDetails.push({
      pageId: page.id,
      pageSlug: page.slug,
      pageTitle: page.title.rendered,
      linksFound: foundLinks
    });
  }

  // Get full post objects for the linked posts
  const priorityPosts = [];
  for (const slug of linkedPostSlugs) {
    const postObj = postSlugMap.get(slug);
    if (postObj) {
      priorityPosts.push({
        id: postObj.id,
        slug: postObj.slug,
        title: postObj.title.rendered,
        date: postObj.date,
        featuredMediaUrl: postObj._embedded && postObj._embedded['wp:featuredmedia'] 
          ? postObj._embedded['wp:featuredmedia'][0].source_url 
          : null
      });
    }
  }

  const result = {
    totalLinkedPosts: priorityPosts.length,
    priorityPostSlugs: Array.from(linkedPostSlugs),
    priorityPosts,
    detailsByPage: linkDetails
  };

  const outputPath = path.join(__dirname, '..', 'data', 'linked_posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');

  console.log(`\n✓ Mapeamento concluído!`);
  console.log(`Total de posts prioritários vinculados diretamente: ${priorityPosts.length}`);
  priorityPosts.forEach((p, idx) => {
    console.log(`  ${idx + 1}. [${p.slug}] ${p.title}`);
  });
}

run();
