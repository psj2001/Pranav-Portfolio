import fs from 'node:fs';
import path from 'node:path';
import { indexablePages, renderHead, renderNoscript, renderRobots, renderSitemap } from '../src/data/pageMeta';

export function writeRouteFiles(distDir: string) {
  const indexPath = path.join(distDir, 'index.html');
  const template = fs.readFileSync(indexPath, 'utf8');

  for (const page of indexablePages()) {
    const html = template
      .replace(/<!--route-meta-->[\s\S]*?<!--\/route-meta-->/, `<!--route-meta-->${renderHead(page)}<!--/route-meta-->`)
      .replace(/<!--noscript-->[\s\S]*?<!--\/noscript-->/, `<!--noscript-->${renderNoscript(page)}<!--/noscript-->`);

    if (page.path === '/') {
      fs.writeFileSync(indexPath, html);
      continue;
    }

    const dir = path.join(distDir, page.path.slice(1));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), renderSitemap());
  fs.writeFileSync(path.join(distDir, 'robots.txt'), renderRobots());
}
