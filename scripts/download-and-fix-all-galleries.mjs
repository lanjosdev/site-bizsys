process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import fs from 'node:fs';
import path from 'node:path';

const postsDir = 'src/content/posts';
const outDir = 'public/images/posts';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const premiosFiles = fs.readdirSync('public/images/premios');

// Mapeamento manual de arquivos já existentes em premios/
const manualPremiosMap = {
  'rota.jpg': '/images/premios/rota-de-emergencia.png',
  'CozinhaAsCegas_Conjunto-1.jpg': '/images/premios/CozinhaAsCegas_Conjunto.jpg',
  'kanui.jpg': '/images/premios/Kanui.jpg',
  'amstel03.jpg': '/images/premios/amstel.png',
  'insta-jw.jpg': '/images/premios/johnnie-walker.png',
  'braille1.jpg': '/images/premios/clean-braille.png',
  'banners_produtos_BIZSYS_mccode2.png': '/images/premios/mcode3.jpg',
  'pin5.jpg': '/images/premios/pin5.jpg',
  'REXONAPEDALOU4.jpg': '/images/premios/PF_04.jpg',
  'schooradio3.jpg': '/images/premios/school-zone-radio-min.png',
  'book3.jpg': '/images/premios/book3.jpg',
  'tripbookj3.jpg': '/images/premios/tripbookj3.jpg',
  'xixi_eletrico.jpg': '/images/premios/xixi_eletrico.jpg',
  'WhatsApp-Image-2020-10-29-at-20.34.52.jpeg': '/images/premios/WhatsApp-Image-2020-10-29-at-20.34.52.jpeg'
};

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { success: false, status: res.status };
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 500) {
      return { success: false, status: 'too_small' };
    }
    fs.writeFileSync(destPath, buffer);
    return { success: true, size: buffer.length };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

async function run() {
  let totalDownloaded = 0;
  let totalMapped = 0;
  let totalOmitted = 0;
  let postsUpdated = 0;

  for (const f of files) {
    const filePath = path.join(postsDir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    const m = content.match(/galleryImages:\s*(\[[^\]]*\])/);
    if (!m) continue;

    const urls = JSON.parse(m[1]);
    if (urls.length === 0) continue;

    const postSlug = f.replace('.md', '');
    const validGallery = [];

    for (let i = 0; i < urls.length; i++) {
      const rawUrl = urls[i];
      const filename = path.basename(rawUrl.split('?')[0]);

      // 1. Verificar mapa manual
      if (manualPremiosMap[filename]) {
        validGallery.push(manualPremiosMap[filename]);
        totalMapped++;
        continue;
      }

      // 2. Verificar se existe exatamente em premios/
      const inPremios = premiosFiles.find(p => p.toLowerCase() === filename.toLowerCase());
      if (inPremios) {
        validGallery.push(`/images/premios/${inPremios}`);
        totalMapped++;
        continue;
      }

      // 3. Normalizar URL remota (troca localhost por bizsys.com.br)
      let downloadUrl = rawUrl
        .replace('http://localhost/bizsys-real/', 'https://www.bizsys.com.br/')
        .replace('http://localhost/bizsys/', 'https://www.bizsys.com.br/');

      // Nome de arquivo limpo e seguro
      const ext = path.extname(filename) || '.jpg';
      const cleanBase = filename.replace(ext, '').replace(/[^a-zA-Z0-9_\-\.]/g, '_');
      const localFileName = `${postSlug}-gallery-${i + 1}-${cleanBase}${ext}`;
      const destPath = path.join(outDir, localFileName);
      const publicPath = `/images/posts/${localFileName}`;

      // Se já foi baixado previamente
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 500) {
        validGallery.push(publicPath);
        totalMapped++;
        continue;
      }

      // Download da imagem
      console.log(`[Baixando] ${postSlug} #${i + 1}: ${downloadUrl}`);
      const result = await downloadFile(downloadUrl, destPath);
      if (result.success) {
        console.log(`  -> Salvo: ${localFileName} (${Math.round(result.size / 1024)} KB)`);
        validGallery.push(publicPath);
        totalDownloaded++;
      } else {
        console.warn(`  -> Falha (${result.status || result.error}) ao baixar ${downloadUrl}`);
        totalOmitted++;
      }
    }

    // Se houve alteração na lista de imagens
    const newGalleryJson = JSON.stringify(validGallery);
    if (newGalleryJson !== m[1]) {
      content = content.replace(m[0], `galleryImages: ${newGalleryJson}`);
      fs.writeFileSync(filePath, content, 'utf8');
      postsUpdated++;
      console.log(`[ATUALIZADO] ${f}: ${urls.length} -> ${validGallery.length} imagens`);
    }
  }

  console.log('\n=== RESUMO DO PROCESSAMENTO ===');
  console.log('Posts atualizados:', postsUpdated);
  console.log('Imagens mapeadas localmente:', totalMapped);
  console.log('Novas imagens baixadas:', totalDownloaded);
  console.log('URLs quebradas/omitidas:', totalOmitted);
}

run();
