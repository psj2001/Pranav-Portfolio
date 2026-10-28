import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { indexablePages, pageMetaForPath, renderHead, renderNoscript, renderRobots, renderSitemap, type PageMeta } from '../src/data/pageMeta';

export async function writeRouteFiles(distDir: string) {
  const indexPath = path.join(distDir, 'index.html');
  const template = inlineStylesheet(fs.readFileSync(indexPath, 'utf8'), distDir);
  const serverEntry = path.join(distDir, 'ssr', 'entry-server.js');
  const { render } = (await import(pathToFileURL(serverEntry).href)) as {
    render: (url: string) => Promise<string>;
  };

  const pages: PageMeta[] = [...indexablePages(), pageMetaForPath('/404')];

  for (const page of pages) {
    const html = template
      .replace(/<!--route-meta-->[\s\S]*?<!--\/route-meta-->/, `<!--route-meta-->${renderHead(page)}<!--/route-meta-->`)
      .replace(/<!--noscript-->[\s\S]*?<!--\/noscript-->/, `<!--noscript-->${renderNoscript(page)}<!--/noscript-->`)
      .replace('<div id="root"></div>', `<div id="root">${await render(page.path)}</div>`);

    if (page.path === '/404') {
      fs.writeFileSync(path.join(distDir, '404.html'), html);
      continue;
    }

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
  fs.rmSync(path.join(distDir, 'ssr'), { recursive: true, force: true });
}

function inlineStylesheet(html: string, distDir: string) {
  return html.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_full, href: string) => {
    const relative = href.startsWith('/') ? href.slice(1) : href;
    const css = fs.readFileSync(path.join(distDir, relative), 'utf8').replace(/<\/style/gi, '<\\/style');
    return `<style>${css}</style>`;
  });
}
