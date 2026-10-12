import { useEffect } from 'react';
import { canonicalUrl, pageMetaForPath, structuredData } from '../data/pageMeta';
import { SITE_URL, profile } from '../data/siteContent';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

function upsertRobots(content?: string) {
  const existing = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!content) {
    existing?.remove();
    return;
  }
  upsertMeta('name', 'robots', content);
}

export function usePageMeta(pathname: string, ready = false) {
  useEffect(() => {
    const page = pageMetaForPath(pathname);
    const url = canonicalUrl(page.path);
    document.title = page.title;
    upsertMeta('name', 'description', page.description);
    upsertRobots(page.robots);
    upsertCanonical(url);
    upsertMeta('property', 'og:type', page.kind === 'article' ? 'article' : 'website');
    upsertMeta('property', 'og:site_name', profile.name);
    upsertMeta('property', 'og:title', page.title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', `${SITE_URL}/og-portrait.jpg`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', page.title);
    upsertMeta('name', 'twitter:description', page.description);
    upsertMeta('name', 'twitter:image', `${SITE_URL}/og-portrait.jpg`);

    let script = document.getElementById('page-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'page-jsonld';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData(page));
  }, [pathname, ready]);
}
