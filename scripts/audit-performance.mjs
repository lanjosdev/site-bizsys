import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const PORT = 4328;
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}`;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.otf': 'font/otf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startServer() {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) {
      reqPath += 'index.html';
    }

    let filePath = path.join(distDir, reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache',
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(PORT, HOST, () => {
      console.log(`🚀 Servidor estático ativo em ${BASE_URL}`);
      resolve(server);
    });
  });
}

function runLighthouseAsync(url, outputPath) {
  return new Promise((resolve, reject) => {
    const cmd = `npx lighthouse ${url} --preset=desktop --output=json --output-path="${outputPath}" --chrome-flags="--headless=new --no-sandbox --disable-gpu" --only-categories=performance,accessibility,best-practices,seo --quiet`;
    exec(cmd, { timeout: 60000, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

const routesToAudit = [
  { name: 'Home', path: '/' },
  { name: 'Projetos', path: '/projetos/' },
  { name: 'News & Imprensa', path: '/news/' },
  { name: 'Sobre Nós', path: '/sobre-nos/' },
  { name: 'Prêmios', path: '/premios/' },
  { name: 'Contato', path: '/contato/' },
  { name: 'Case Detalhe', path: '/posts/mega-mcfritas-mcdonalds/' },
];

async function runAudit() {
  if (!fs.existsSync(distDir)) {
    console.error('❌ Diretório dist/ não encontrado. Execute npm run build antes da auditoria.');
    process.exit(1);
  }

  const server = await startServer();
  const results = [];
  const tempReportPath = path.join(__dirname, 'temp_lh.json');

  console.log('\n🔍 Iniciando auditoria Lighthouse e Core Web Vitals (Desktop)...');
  console.log('='.repeat(70));

  for (const route of routesToAudit) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`\n⏳ Auditando [${route.name}]: ${url}`);

    try {
      if (fs.existsSync(tempReportPath)) {
        fs.unlinkSync(tempReportPath);
      }

      await runLighthouseAsync(url, tempReportPath);

      if (fs.existsSync(tempReportPath)) {
        const report = JSON.parse(fs.readFileSync(tempReportPath, 'utf-8'));
        const cats = report.categories;
        const audits = report.audits;

        const perfScore = Math.round((cats.performance?.score || 0) * 100);
        const a11yScore = Math.round((cats.accessibility?.score || 0) * 100);
        const bpScore = Math.round((cats['best-practices']?.score || 0) * 100);
        const seoScore = Math.round((cats.seo?.score || 0) * 100);

        const fcp = audits['first-contentful-paint']?.displayValue || 'N/A';
        const lcp = audits['largest-contentful-paint']?.displayValue || 'N/A';
        const tbt = audits['total-blocking-time']?.displayValue || 'N/A';
        const cls = audits['cumulative-layout-shift']?.displayValue || 'N/A';
        const si = audits['speed-index']?.displayValue || 'N/A';

        const row = {
          name: route.name,
          path: route.path,
          scores: {
            performance: perfScore,
            accessibility: a11yScore,
            bestPractices: bpScore,
            seo: seoScore,
          },
          coreWebVitals: {
            FCP: fcp,
            LCP: lcp,
            TBT: tbt,
            CLS: cls,
            SpeedIndex: si,
          },
        };

        results.push(row);
        console.log(`   ✅ Scores: Perf: ${perfScore} | A11y: ${a11yScore} | BestPractices: ${bpScore} | SEO: ${seoScore}`);
        console.log(`   📊 Vitals: FCP: ${fcp} | LCP: ${lcp} | TBT: ${tbt} | CLS: ${cls}`);
      }
    } catch (err) {
      console.error(`   ❌ Erro ao auditar ${route.path}:`, err.message);
    }
  }

  // Cleanup temp report
  if (fs.existsSync(tempReportPath)) {
    fs.unlinkSync(tempReportPath);
  }

  // Fechar servidor
  server.close();

  // Salvar resultados consolidados
  const outputPath = path.join(__dirname, 'performance_results.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    routesCount: results.length,
    routes: results
  }, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 Auditoria concluída! Relatório salvo em: ${outputPath}\n`);

  console.table(results.map(r => ({
    Rota: r.name,
    Path: r.path,
    Performance: r.scores.performance,
    Acessibilidade: r.scores.accessibility,
    MelhoresPráticas: r.scores.bestPractices,
    SEO: r.scores.seo,
    LCP: r.coreWebVitals.LCP,
    CLS: r.coreWebVitals.CLS,
    TBT: r.coreWebVitals.TBT
  })));
}

runAudit();
