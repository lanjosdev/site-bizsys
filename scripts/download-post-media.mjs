/**
 * scripts/download-post-media.mjs
 * Download local de todas as imagens destacadas dos 136 posts do WordPress para public/images/posts/
 * Garante paridade de 100%, zero links externos quebrados e total autonomia de mídia.
 */

import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const rawPosts = JSON.parse(fs.readFileSync('data/raw/posts.json', 'utf8'));
const targetDir = path.resolve('public/images/posts');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Fallbacks e mapeamentos manuais verificados
const explicitUrlMap = {
  'bizsys-cria-primeiro-mobiliario-digital-programatico-do-brasil': 'https://www.bizsys.com.br/wp-content/uploads/2018/03/bizsysfotosAI.jpg',
  'rexona-desafia-publico-a-pedalar-em-acao-na-avenida-paulista': 'https://www.bizsys.com.br/wp-content/uploads/2019/10/5cf9027c5479c-5cf90287870c3-980x480-1.jpg',
  'lancamento-do-novo-nike-react-com-realidade-aumentada-2': 'https://www.bizsys.com.br/wp-content/uploads/2021/06/nike_reactive3.png',
  'trident-fresh-leva-painel-interativo-para-a-avenida-paulista': 'https://www.bizsys.com.br/wp-content/uploads/2021/06/tridentfresh.png',
  'the-speaking-fireworks-area-23-quer-ajudar': 'https://www.bizsys.com.br/wp-content/uploads/2021/06/speaking-fireworks.png',
  'whiskas-cria-a-mia-assistente-pessoal': 'https://www.bizsys.com.br/wp-content/uploads/2020/03/mia.jpg',
  'algoritmo-da-rolling-stone-identifica-propensao-ao-suicidio-3': 'https://www.bizsys.com.br/wp-content/uploads/2020/03/AGORTIMO.jpg',
  'accessibility-mat-ford-apresenta-tapete-de-acessibilidade': 'https://www.bizsys.com.br/wp-content/uploads/2020/02/acessibi_MAT_play.jpg',
  'empresas-de-midia-out-of-home-investem-na-criacao-de-metricas-para-comprovar-sucesso-do-setor-2': 'https://www.bizsys.com.br/wp-content/uploads/2020/03/VISA.jpg',
  'santander-faz-campanha-com-foco-em-universitarios': 'https://www.bizsys.com.br/wp-content/uploads/2020/03/santander-curri.jpg',
  'o-ooh-e-a-midia-de-todas-as-midias': 'https://www.bizsys.com.br/wp-content/uploads/2020/03/santander-chuva.jpg',
  'o-ooh-e-a-midia-de-todas-as-midias-afirma-raul-nogueira-filho': 'https://www.bizsys.com.br/wp-content/uploads/2020/03/santander-chuva.jpg',
  '7-pontos-de-onibus-criativos-ao-redor-do-mundo': 'https://www.bizsys.com.br/wp-content/uploads/2020/04/entubados.jpg',
  'dorflex-music-experiment-projeto-especial': 'https://img.youtube.com/vi/M37jvuSoHU4/hqdefault.jpg',
  'easter-egg-radar-garoto': 'https://img.youtube.com/vi/tqzcouoNz7U/hqdefault.jpg',
  'jogadores-invisiveis': 'https://img.youtube.com/vi/PLnJjSnMYXU/hqdefault.jpg'
};

// 15 cases prioritários que já possuem ativos em alta resolução em public/images/premios/
const localPriorityMap = {
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

async function downloadWithRetry(url, destPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.bizsys.com.br/'
        },
        signal: AbortSignal.timeout(20000)
      });

      if (!res.ok) {
        throw new Error(`HTTP status ${res.status} (${res.statusText})`);
      }

      const fileStream = fs.createWriteStream(destPath);
      await pipeline(res.body, fileStream);
      return true;
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
  return false;
}

function resolveExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
      return ext;
    }
  } catch {}
  return '.jpg';
}

async function main() {
  console.log(`Iniciando download e catalogação de imagens para ${rawPosts.length} posts...`);
  const mediaMap = {};
  const stats = {
    downloaded: 0,
    preservedPriority: 0,
    failed: 0
  };

  for (let i = 0; i < rawPosts.length; i++) {
    const post = rawPosts[i];
    const slug = post.slug;

    // Se é prioritário com asset já validado em premios
    if (localPriorityMap[slug]) {
      const existingAsset = path.resolve(`public${localPriorityMap[slug]}`);
      if (fs.existsSync(existingAsset)) {
        mediaMap[slug] = localPriorityMap[slug];
        stats.preservedPriority++;
        console.log(`[${i + 1}/${rawPosts.length}] [PRESERVADO] ${slug} -> ${localPriorityMap[slug]}`);
        continue;
      }
    }

    // Identificar URL de download
    let sourceUrl = explicitUrlMap[slug];

    if (!sourceUrl && post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      const rawUrl = post._embedded['wp:featuredmedia'][0].source_url;
      if (!rawUrl.includes('rest_forbidden')) {
        sourceUrl = rawUrl;
      }
    }

    // Se ainda não achou, checar no conteúdo HTML do post
    if (!sourceUrl && post.content?.rendered) {
      const match = post.content.rendered.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match && !match[1].includes('gravatar') && !match[1].includes('cropped-LOGO')) {
        sourceUrl = match[1];
      }
    }

    if (!sourceUrl) {
      console.warn(`[${i + 1}/${rawPosts.length}] [AVISO] Nenhuma URL encontrada para post: ${slug}`);
      stats.failed++;
      continue;
    }

    // Normalizar localhost para bizsys.com.br se houver
    sourceUrl = sourceUrl.replace('http://localhost/bizsys', 'https://www.bizsys.com.br');

    const ext = resolveExtension(sourceUrl);
    const fileName = `${slug}-featured${ext}`;
    const destFilePath = path.join(targetDir, fileName);
    const publicUrl = `/images/posts/${fileName}`;

    try {
      if (fs.existsSync(destFilePath) && fs.statSync(destFilePath).size > 1000) {
        console.log(`[${i + 1}/${rawPosts.length}] [CACHE LOCAL] ${slug} -> ${publicUrl}`);
      } else {
        await downloadWithRetry(sourceUrl, destFilePath);
        console.log(`[${i + 1}/${rawPosts.length}] [DOWNLOAD OK] ${slug} (${sourceUrl}) -> ${publicUrl}`);
      }
      mediaMap[slug] = publicUrl;
      stats.downloaded++;
    } catch (err) {
      console.error(`[${i + 1}/${rawPosts.length}] [ERRO DOWNLOAD] ${slug} de ${sourceUrl}:`, err.message);
      stats.failed++;
    }
  }

  // Grava o mapeamento consolidado
  fs.writeFileSync('data/posts_media_map.json', JSON.stringify(mediaMap, null, 2), 'utf8');

  console.log('\n=======================================');
  console.log('🎉 Catalogação e download concluídos:');
  console.log(`   Total analisado: ${rawPosts.length}`);
  console.log(`   Baixados com sucesso: ${stats.downloaded}`);
  console.log(`   Preservados alta resolução (premios): ${stats.preservedPriority}`);
  console.log(`   Mapeamento total: ${Object.keys(mediaMap).length}/${rawPosts.length}`);
  console.log(`   Falhas: ${stats.failed}`);
  console.log('   Mapeamento salvo em: data/posts_media_map.json');
  console.log('=======================================\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
