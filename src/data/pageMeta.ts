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
import type { BlogBlock, BlogTrack } from '../types';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noscript: string;
  date?: string;
  kind?: 'article';
  robots?: 'noindex';
}

const pages: Record<'home' | 'flutter' | 'fullstack' | 'marketing' | 'blog' | 'software' | 'marketingBlog', PageMeta> = {
  home: {
    path: '/',
    title: 'Pranav P S | Mobile App Developer & Digital Marketer in Dubai',
    description:
      'Explore the portfolio of Pranav P S, a Dubai-based mobile app developer, full-stack web developer, and digital marketer building digital solutions.',
    noscript: '',
  },
  flutter: {
    path: '/flutter-developer',
    title: 'Flutter Developer in Dubai | Pranav P S',
    description:
      'Explore Flutter mobile apps developed by Pranav P S, a Flutter developer in Dubai experienced in Android, iOS, API integration, and production app delivery.',
    noscript: '',
  },
  fullstack: {
    path: '/full-stack-developer',
    title: 'Full Stack Developer in Dubai | React & Node.js | Pranav P S',
    description:
      'Explore full-stack web development projects by Pranav P S in Dubai, including websites, dashboards, APIs, and scalable web applications.',
    noscript: '',
  },
  marketing: {
    path: '/digital-marketer',
    title: 'Digital Marketer in Dubai | SEO & Social Media | Pranav P S',
    description:
      'Explore digital marketing, SEO, social media management, website optimization, and online branding work by Pranav P S in Dubai.',
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
  const study = education.map((item) => `${item.credential}, ${item.school}, ${item.period}`).join('. ');
  return `${profile.name} is based in ${profile.location}. ${profile.availability}. He builds mobile apps and websites and works on digital marketing tasks. ${jobs} Projects: ${work} Education: ${study}. Email: ${profile.email}.`;
}

pages.home.noscript = homeNoscript();
pages.flutter.noscript = `${profile.name}, Flutter developer in ${profile.location}. ${employmentSummary().label} of confirmed employment. ${employmentSummary().detail} ${publicExperiences()
  .map((job) => `${job.role} at ${job.company}, ${job.location}, ${formatPeriod(job)}. ${[...job.bullets, ...job.related].join(' ')}`)
  .join(' ')} Training: ${training.map((item) => `${item.course} at ${item.provider}, ${item.location}, ${formatPeriod(item)}.`).join(' ')}`;
pages.fullstack.noscript = `${profile.name}, full-stack developer in ${profile.location}. Websites, dashboards, and APIs, including the Tripzza website, the Falcon Force Academy website, CRM Falcon Force with React, Node.js, Express, and MongoDB, and the ChooseMy Fresh website.`;
pages.marketing.noscript = `${profile.name} works on social content, SEO, and ads in ${profile.location}. For ChooseMy Fresh, he created the website, managed its social media platforms, and worked on its website SEO. Skills include Meta Ads, Google Ads, and WhatsApp automation.`;

function stripSlash(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname || '/';
}

export function canonicalUrl(path: string) {
  const clean = stripSlash(path);
  if (clean === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${clean}/`;
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
      date: post.date,
      kind: 'article' as const,
      noscript: [post.title, post.excerpt, ...post.body.map(blockPlainText)].join(
        ' ',
      ),
    })),
  );
  return [pages.home, pages.flutter, pages.fullstack, pages.marketing, pages.blog, pages.software, pages.marketingBlog, ...caseStudies, ...articles];
}

function blockPlainText(block: BlogBlock) {
  if (block.type === 'list') return block.items.join(' ');
  if (block.type === 'image') return block.alt;
  return block.text;
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
  const path = stripSlash(pathname);
  const known = indexablePages().find((page) => stripSlash(page.path) === path);
  if (known) return known;
  if (path.startsWith('/work/')) {
    return {
      path,
      title: 'Project not found | Pranav P S',
      description: 'This project is not published on the portfolio.',
      noscript: 'This project is not published.',
      robots: 'noindex',
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
        robots: 'noindex',
      };
    }
    return {
      path,
      title: `${post.title} | Pranav P S`,
      description: post.excerpt,
      date: post.date,
      kind: 'article',
      noscript: [post.title, post.excerpt, ...post.body.map(blockPlainText)].join(
        ' ',
      ),
    };
  }
  return {
    path,
    title: 'Page not found | Pranav P S',
    description: 'This page is not on the portfolio of Pranav P S.',
    noscript: 'This page is not on the portfolio.',
    robots: 'noindex',
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const shareImage = `${SITE_URL}/og-portrait.jpg`;
const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function personNode() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    jobTitle: ['Flutter developer', 'Full-stack developer', 'Digital marketer'],
    email: profile.email,
    image: shareImage,
    url: `${SITE_URL}/`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    name: profile.name,
    url: `${SITE_URL}/`,
    publisher: { '@id': personId },
  };
}

function roleCrumb(path: string): BreadcrumbItem | null {
  if (path === '/flutter-developer') return { name: 'Flutter Developer', path };
  if (path === '/full-stack-developer') return { name: 'Full Stack Developer', path };
  if (path === '/digital-marketer') return { name: 'Digital Marketer', path };
  return null;
}

export function breadcrumbsForPath(pathname: string): BreadcrumbItem[] | null {
  const path = stripSlash(pathname);
  const role = roleCrumb(path);
  if (role) return [{ name: 'Home', path: '/' }, role];
  if (!path.startsWith('/work/')) return null;
  const id = path.split('/').filter(Boolean)[1];
  const project = publicProjects().find((item) => item.id === id);
  if (!project) return null;
  const parent =
    project.productType === 'mobile-app'
      ? { name: 'Flutter Developer', path: '/flutter-developer' }
      : project.productType === 'marketing'
        ? { name: 'Digital Marketer', path: '/digital-marketer' }
        : { name: 'Full Stack Developer', path: '/full-stack-developer' };
  return [{ name: 'Home', path: '/' }, parent, { name: project.title, path }];
}

function breadcrumbNode(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [personNode(), websiteNode()],
  };
}

export function structuredData(page: PageMeta) {
  const canonical = canonicalUrl(page.path);
  const crumbs = breadcrumbsForPath(page.path);
  if (page.path === '/' || roleCrumb(stripSlash(page.path))) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        personNode(),
        websiteNode(),
        {
          '@type': 'ProfilePage',
          '@id': canonical,
          url: canonical,
          name: page.title,
          description: page.description,
          mainEntity: { '@id': personId },
          isPartOf: { '@id': websiteId },
        },
        ...(crumbs ? [breadcrumbNode(crumbs)] : []),
      ],
    };
  }
  if (page.kind === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: page.title.replace(/ \| Pranav P S$/, ''),
      description: page.description,
      datePublished: page.date,
      image: shareImage,
      url: canonical,
      author: {
        '@type': 'Person',
        name: profile.name,
        url: `${SITE_URL}/`,
      },
      mainEntityOfPage: canonical,
    };
  }
  const webPage = {
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
  if (!crumbs) {
    return { '@context': 'https://schema.org', ...webPage };
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, breadcrumbNode(crumbs)],
  };
}

export function renderHead(page: PageMeta) {
  const canonical = canonicalUrl(page.path);
  const json = JSON.stringify(structuredData(page)).replace(/</g, '\\u003c');
  const robots = page.robots === 'noindex' ? `\n    <meta name="robots" content="noindex" />` : '';
  return `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />${robots}
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${page.kind === 'article' ? 'article' : 'website'}" />
    <meta property="og:site_name" content="${escapeHtml(profile.name)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${shareImage}" />
    <meta property="og:image:width" content="1088" />
    <meta property="og:image:height" content="1445" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${shareImage}" />
    <script type="application/ld+json" id="page-jsonld">${json}</script>`;
}

export function renderNoscript(page: PageMeta) {
  return `<noscript><p>${escapeHtml(page.noscript)}</p></noscript>`;
}

export function renderSitemap() {
  const urls = indexablePages()
    .map((page) => {
      const lastmod = page.date ? `\n    <lastmod>${page.date}</lastmod>` : '';
      return `  <url>\n    <loc>${canonicalUrl(page.path)}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
