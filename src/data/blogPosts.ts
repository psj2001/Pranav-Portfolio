import type { BlogPost, BlogTrack } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    track: 'software',
    slug: 'flutter-and-react-on-the-same-desk',
    title: 'Flutter and React on the same desk',
    excerpt: 'The employment record covers Flutter apps in Kochi and Thrissur, and web and mobile work in Dubai.',
    date: '2026-09-02',
    readingMinutes: 3,
    tags: ['Flutter', 'React'],
    body: [
      {
        type: 'paragraph',
        text: 'ULEGENDARY DIGITAL in Dubai is listed as Web & Mobile App Developer from January 2026. The end date is still to confirm. The work there covers websites, web applications, and Android and iOS mobile applications, including frontend, backend, databases, and API integrations.',
      },
      {
        type: 'paragraph',
        text: 'Casa Key Real Estate in Dubai was Mobile Application Developer from October 2024 to December 2025. That role built the PropTelli mobile application in Flutter, with Google Maps, push notifications, offline storage, and Android and iOS releases. The same role created the supporting CRM and the PropTelli website. Globosoft in Kochi was Flutter Developer from August 2023 to October 2024, maintaining 10+ mobile applications. SLR SHOPPEE PVT LTD in Thrissur was Flutter Developer from March 2022 to March 2023.',
      },
      { type: 'heading', text: 'Roles' },
      {
        type: 'list',
        items: [
          'ULEGENDARY DIGITAL — Web & Mobile App Developer, Dubai, from January 2026',
          'Casa Key Real Estate — Mobile Application Developer, Dubai, October 2024 to December 2025',
          'Globosoft — Flutter Developer, Kochi, August 2023 to October 2024',
          'SLR SHOPPEE PVT LTD — Flutter Developer, Thrissur, March 2022 to March 2023',
        ],
      },
      {
        type: 'paragraph',
        text: 'Luminar Technohub in Kochi was a Flutter Development Course from March 2023 to July 2023. It is listed under training.',
      },
    ],
  },
  {
    track: 'software',
    slug: 'products-in-the-software-portfolio',
    title: 'Products in the software portfolio',
    excerpt: 'The mobile apps and the CRM that are described in both the project list and the resume notes.',
    date: '2026-08-18',
    readingMinutes: 3,
    tags: ['Flutter', 'React', 'Product'],
    body: [
      {
        type: 'paragraph',
        text: 'These are the products named in both places. The case studies stay with what those two sources agree on.',
      },
      { type: 'heading', text: 'Mobile' },
      {
        type: 'list',
        items: [
          'CREOVA — a platform connecting brands with creators and influencers. Core Flutter features.',
          'PropTelli — a Flutter mobile application for Casa Key Real Estate, with Google Maps, push notifications, offline storage, a supporting CRM, and the PropTelli website.',
          'Choose n Fly — hotel booking for travel agents.',
          'Malankara Devotional — a devotional app for the Syro Malankara Catholic Church, with prayer times, church locations, and daily prayers.',
        ],
      },
      { type: 'heading', text: 'Website and marketing' },
      {
        type: 'list',
        items: ['ChooseMy Fresh — the website, its social media platforms, and its website SEO.'],
      },
      { type: 'heading', text: 'Dashboard' },
      {
        type: 'list',
        items: ['CRM Falcon Force — a CRM for clients, leads, and sales workflows, built with React, Node.js, Express, and MongoDB.'],
      },
    ],
  },
  {
    track: 'software',
    slug: 'offline-first-on-real-networks',
    title: 'Flutter work I can describe',
    excerpt: 'PropTelli at Casa Key includes offline storage. Globosoft was Flutter development across 10+ mobile applications.',
    date: '2026-07-09',
    readingMinutes: 2,
    tags: ['Flutter'],
    body: [
      {
        type: 'paragraph',
        text: 'At Casa Key Real Estate I built the PropTelli mobile application in Flutter. The app work included Google Maps, push notifications, offline storage, and Android and iOS releases. I also created the supporting CRM and the PropTelli website.',
      },
      {
        type: 'paragraph',
        text: 'At Globosoft, Flutter development was my primary responsibility. I developed and maintained 10+ mobile applications, built features, integrated APIs, fixed bugs, and kept the apps updated.',
      },
    ],
  },
  {
    track: 'marketing',
    slug: 'services-on-the-marketing-side',
    title: 'What the marketing page covers',
    excerpt: 'ChooseMy Fresh covers a website, social media, and website SEO. Advertising campaigns are not listed.',
    date: '2026-09-16',
    readingMinutes: 2,
    tags: ['Social media', 'Websites'],
    body: [
      {
        type: 'paragraph',
        text: 'The digital marketing page includes ChooseMy Fresh: I created the website, managed its social media platforms, and worked on its website SEO. Paid advertising and search rankings are not listed.',
      },
      {
        type: 'paragraph',
        text: 'I also work on social content and website updates. Development skills sit under that work because they help with landing pages, tracking snippets, and fixes on the site itself.',
      },
    ],
  },
  {
    track: 'marketing',
    slug: 'reading-a-site-before-changing-it',
    title: 'Checking a site before changing it',
    excerpt: 'Analytics, Search Console, Tag Manager, and Semrush are tools on the marketing page, not a claim of campaign work.',
    date: '2026-08-04',
    readingMinutes: 2,
    tags: ['Analytics', 'Websites'],
    body: [
      {
        type: 'paragraph',
        text: 'Google Analytics, Search Console, Tag Manager, and Semrush are listed under tools. They are there for checking a site. They are not presented as proof of SEO retainers or paid ads.',
      },
      {
        type: 'paragraph',
        text: 'The published website SEO work is ChooseMy Fresh. The rest of the marketing page is social content, landing-page updates, and website fixes.',
      },
    ],
  },
  {
    track: 'marketing',
    slug: 'web-storefronts-in-the-portfolio',
    title: 'Website work I can describe',
    excerpt: 'CRM Falcon Force has an agreed stack. ChooseMy Fresh and the PropTelli website are listed from the employment notes.',
    date: '2026-07-21',
    readingMinutes: 2,
    tags: ['Websites', 'CRM'],
    body: [
      {
        type: 'paragraph',
        text: 'CRM Falcon Force is the web product described in both the project list and the resume notes: a CRM for clients, leads, and sales workflows, using React, Node.js, Express, and MongoDB.',
      },
      {
        type: 'paragraph',
        text: 'ChooseMy Fresh is the website I created, alongside its social media and website SEO. The PropTelli website sits with the Casa Key Real Estate role, at proptelli.com. Other store names stay unpublished until the personal contribution, stack, and a real screenshot are confirmed.',
      },
    ],
  },
];

export function postsForTrack(track: BlogTrack) {
  return BLOG_POSTS.filter((post) => post.track === track).sort((a, b) => b.date.localeCompare(a.date));
}

export function findPost(track: BlogTrack, slug: string) {
  return BLOG_POSTS.find((post) => post.track === track && post.slug === slug);
}

export function formatBlogDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
