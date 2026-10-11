import { findPost, postsForTrack } from './blogPosts';

const BLOG_HUB_PATH = '/blog';
const BLOG_TRACKS = {
  software: { path: '/blog/software' },
  marketing: { path: '/blog/marketing' },
} as const;
import {
  SITE_URL,
  contributionKindLabel,
  education,
  employmentSummary,
  formatPeriod,
  productTypeLabel,
  profile,
  projectPath,
  publicExperiences,
  publicProjects,
  training,
} from './siteContent';
import type { BlogTrack } from '../types';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noscript: string;
}

const pages: Record<'home' | 'flutter' | 'fullstack' | 'marketing' | 'blog' | 'software' | 'marketingBlog', PageMeta> = {
  home: {
    path: '/',
    title: 'Pranav P S | Mobile apps, websites, and digital marketing',
    description:
      'Pranav P S builds Flutter apps and websites in Dubai, and works on digital marketing tasks around them. View selected projects and get in touch.',
    noscript: '',
  },
  flutter: {
    path: '/flutter-developer',
    title: 'Pranav P S | Flutter developer in Dubai',
    description:
      'Flutter work by Pranav P S in Dubai: PropTelli at Casa Key, mobile apps at Globosoft and SLR SHOPPEE, and web and mobile work at ULEGENDARY DIGITAL.',
    noscript: '',
  },
  fullstack: {
    path: '/full-stack-developer',
    title: 'Pranav P S | Full-stack web developer in Dubai',
    description:
      'Websites, dashboards, and APIs by Pranav P S in Dubai, including React, Node.js, and CRM Falcon Force.',
    noscript: '',
  },
  marketing: {
    path: '/digital-marketer',
    title: 'Pranav P S | Digital marketing and websites',
    description:
      'Digital marketing by Pranav P S in Dubai, including the ChooseMy Fresh website, its social media, and its website SEO.',
    noscript: '',
  },
  blog: {
    path: BLOG_HUB_PATH,
    title: 'Blog | Pranav P S',
    description: 'Notes from Pranav P S on Flutter, full-stack development, and digital marketing.',
    noscript: 'Blog by Pranav P S. One track covers Flutter and full-stack work. The other covers digital marketing and websites.',
  },
  software: {
    path: BLOG_TRACKS.software.path,
    title: 'Software blog | Pranav P S',
    description: 'Notes on Flutter apps, React, and the backends behind them.',
    noscript: 'Software notes by Pranav P S on Flutter apps and web development.',
  },
  marketingBlog: {
    path: BLOG_TRACKS.marketing.path,
    title: 'Digital marketing blog | Pranav P S',
    description: 'Notes on social content and website updates by Pranav P S.',
    noscript: 'Digital marketing notes by Pranav P S on social content and website updates.',
  },
};

function homeNoscript() {
  const jobs = publicExperiences()
    .map((job) => `${job.role} at ${job.company}, ${job.location}, ${formatPeriod(job)}.`)
    .join(' ');
  const work = publicProjects()
    .map((project) => `${project.title} (${productTypeLabel(project.productType)}): ${project.summary}`)
    .join(' ');
  return `${profile.name} is based in ${profile.location}. ${profile.availability}. He builds mobile apps and websites and works on digital marketing tasks. ${jobs} Projects: ${work} Education: ${education.credential}, ${education.school}, ${education.period}. Email: ${profile.email}.`;
}

pages.home.noscript = homeNoscript();
pages.flutter.noscript = `${profile.name}, Flutter developer in ${profile.location}. ${employmentSummary().label} of confirmed employment. ${employmentSummary().detail} ${publicExperiences()
  .map((job) => `${job.role} at ${job.company}, ${job.location}, ${formatPeriod(job)}. ${[...job.bullets, ...job.related].join(' ')}`)
  .join(' ')} Training: ${training.map((item) => `${item.course} at ${item.provider}, ${item.location}, ${formatPeriod(item)}.`).join(' ')}`;
pages.fullstack.noscript = `${profile.name}, full-stack developer in ${profile.location}. Websites, dashboards, and APIs, including CRM Falcon Force with React, Node.js, Express, and MongoDB, and the ChooseMy Fresh website.`;
pages.marketing.noscript = `${profile.name} works on social content and websites in ${profile.location}. For ChooseMy Fresh, he created the website, managed its social media platforms, and worked on its website SEO. Paid advertising is not described on this page.`;

export function canonicalUrl(path: string) {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export function indexablePages(): PageMeta[] {
  const caseStudies = publicProjects().map((project) => ({
    path: projectPath(project.id),
    title: `${project.title} | Pranav P S`,
    description: project.summary,
    noscript: caseStudyText(project.id) ?? project.summary,
  }));
  const articles = (['software', 'marketing'] as BlogTrack[]).flatMap((track) =>
    postsForTrack(track).map((post) => ({
      path: `${BLOG_TRACKS[track].path}/${post.slug}`,
      title: `${post.title} | Pranav P S`,
      description: post.excerpt,
      noscript: [post.title, post.excerpt, ...post.body.map((block) => (block.type === 'list' ? block.items.join(' ') : block.text))].join(
        ' ',
      ),
    })),
  );
  return [pages.home, pages.flutter, pages.fullstack, pages.marketing, pages.blog, pages.software, pages.marketingBlog, ...caseStudies, ...articles];
}

function caseStudyText(id: string) {
  const project = publicProjects().find((item) => item.id === id);
  if (!project) return null;
  const parts = [
    project.title,
    productTypeLabel(project.productType),
    project.summary,
    project.contributionKind ? contributionKindLabel(project.contributionKind) : '',
    project.contribution ?? '',
    project.problem ?? '',
    project.tasks.join(' '),
    project.technologies.length ? `Technologies: ${project.technologies.join(', ')}.` : '',
    project.completed ?? '',
  ];
  return parts.filter(Boolean).join(' ');
}

export function pageMetaForPath(pathname: string): PageMeta {
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname || '/';
  const known = indexablePages().find((page) => page.path === path);
  if (known) return known;
  if (path.startsWith('/work/')) {
    return {
      path,
      title: 'Project not found | Pranav P S',
      description: 'This project is not published on the portfolio.',
      noscript: 'This project is not published.',
    };
  }
  const article = path.split('/').filter(Boolean);
  if (article[0] === 'blog' && (article[1] === 'software' || article[1] === 'marketing') && article[2]) {
    const post = findPost(article[1], decodeURIComponent(article[2]));
    if (!post) {
      return {
        path,
        title: 'Note not found | Pranav P S',
        description: 'This note is not on the site.',
        noscript: 'This note is not on the site.',
      };
    }
  }
  return {
    path,
    title: 'Page not found | Pranav P S',
    description: 'This page is not on the portfolio of Pranav P S.',
    noscript: 'This page is not on the portfolio.',
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `${SITE_URL}/`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
  };
}

export function renderHead(page: PageMeta) {
  const canonical = canonicalUrl(page.path);
  const image = `${SITE_URL}/og-portrait.jpg`;
  const structured = page.path === '/' ? personSchema() : {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: canonical,
    description: page.description,
    isPartOf: {
      '@type': 'WebSite',
      name: profile.name,
      url: `${SITE_URL}/`,
    },
  };
  const json = JSON.stringify(structured).replace(/</g, '\\u003c');
  return `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(profile.name)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1088" />
    <meta property="og:image:height" content="1445" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json" id="page-jsonld">${json}</script>`;
}

export function renderNoscript(page: PageMeta) {
  return `<noscript><p>${escapeHtml(page.noscript)}</p></noscript>`;
}

export function renderSitemap() {
  const urls = indexablePages()
    .map((page) => `  <url><loc>${canonicalUrl(page.path)}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
