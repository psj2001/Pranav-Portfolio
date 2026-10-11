import type {
  ContributionKind,
  EngagementType,
  ExperienceItem,
  MonthPoint,
  ProductType,
  ProjectItem,
  SkillCategory,
  SkillItem,
  TrainingItem,
} from '../types';

export type ContentRole = 'flutter' | 'fullstack' | 'marketing';

export const SITE_URL = 'https://pranavps.com';

export const profile = {
  name: 'Pranav P S',
  location: 'Dubai, UAE',
  availability: 'Open to roles in the UAE',
  email: 'contact@pranavps.com',
  url: SITE_URL,
  cvs: {
    flutter: null as string | null,
    fullstack: null as string | null,
    marketing: null as string | null,
  },
};

export const education = {
  credential: 'Bachelor of Commerce (B.Com)',
  school: 'Calicut University',
  period: '2019 – 2022',
};

/** Courses and certificates. Keep these out of `experiences`. */
export const training: TrainingItem[] = [
  {
    id: 'train-luminar',
    course: 'Flutter Development Course',
    provider: 'Luminar Technohub',
    location: 'Kochi, India',
    start: { year: 2023, month: 3 },
    end: { year: 2023, month: 7 },
  },
];

/**
 * Employment only, newest first.
 * Dates are inclusive calendar months. Leave `end` unset until the end date is confirmed.
 * Do not add training, and do not add a technology the role record does not name.
 */
const experiences: ExperienceItem[] = [
  {
    id: 'exp-ulegendary',
    role: 'Web & Mobile App Developer',
    company: 'ULEGENDARY DIGITAL',
    location: 'Dubai, UAE',
    start: { year: 2026, month: 1 },
    bullets: [
      'Developed and maintained websites, web applications, and Android and iOS mobile applications.',
      'Worked on frontend interfaces, backend functionality, databases, and API integrations.',
      'Tested applications, resolved technical issues, and supported deployments, updates, and maintenance.',
      'Collaborated with management, marketing, and operations teams on business requirements.',
    ],
    related: [],
    technologies: [],
    projectIds: [],
  },
  {
    id: 'exp-casakey',
    role: 'Mobile Application Developer',
    company: 'Casa Key Real Estate',
    location: 'Dubai, UAE',
    start: { year: 2024, month: 10 },
    end: { year: 2025, month: 12 },
    bullets: [
      'Built the PropTelli mobile application using Flutter.',
      'Integrated Google Maps, push notifications, and offline storage.',
      'Managed Android and iOS releases, maintenance, and ongoing updates.',
    ],
    related: ['Created the supporting CRM and PropTelli website.'],
    technologies: ['Flutter', 'Google Maps'],
    projectIds: ['proptelli'],
  },
  {
    id: 'exp-globosoft',
    role: 'Flutter Developer',
    company: 'Globosoft',
    location: 'Kochi, India',
    start: { year: 2023, month: 8 },
    end: { year: 2024, month: 10 },
    bullets: [
      'Developed and maintained 10+ mobile applications, with Flutter development as my primary responsibility.',
      'Built application features and integrated APIs.',
      'Fixed bugs and delivered ongoing updates.',
      'Maintained applications and improved their reliability.',
    ],
    related: [],
    technologies: ['Flutter'],
    projectIds: [],
  },
  {
    id: 'exp-slr',
    role: 'Flutter Developer',
    company: 'SLR SHOPPEE PVT LTD',
    location: 'Thrissur, India',
    start: { year: 2022, month: 3 },
    end: { year: 2023, month: 3 },
    bullets: [],
    related: [],
    technologies: [],
    projectIds: [],
  },
];

const projects: Array<ProjectItem & { status: 'public' | 'review' }> = [
  {
    status: 'public',
    id: 'creova',
    title: 'CREOVA',
    summary: 'A platform that connects brands with creators and influencers.',
    productType: 'mobile-app',
    contributionKind: 'features',
    contribution: 'Implemented core features in the Flutter app.',
    technologies: ['Flutter', 'Clean Architecture'],
    tasks: ['Implemented core features in the Flutter app.'],
    completed: 'The app connects brands with creators and influencers.',
    links: [],
    featured: true,
  },
  {
    status: 'public',
    id: 'proptelli',
    title: 'PropTelli',
    summary: 'A Flutter mobile application for Casa Key Real Estate, with a supporting CRM and website.',
    productType: 'mobile-app',
    engagement: 'employment',
    contributionKind: 'built',
    contribution: 'Built the PropTelli mobile application in Flutter as Mobile Application Developer at Casa Key Real Estate.',
    technologies: ['Flutter', 'Google Maps'],
    tasks: [
      'Built the PropTelli mobile application using Flutter.',
      'Integrated Google Maps, push notifications, and offline storage.',
      'Managed Android and iOS releases, maintenance, and ongoing updates.',
    ],
    links: [{ label: 'PropTelli website', href: 'https://proptelli.com/' }],
    featured: true,
    experienceId: 'exp-casakey',
    audiences: ['home', 'flutter'],
  },
  {
    status: 'public',
    id: 'choose-n-fly',
    title: 'Choose n Fly',
    summary: 'A hotel booking application for travel agents.',
    productType: 'mobile-app',
    contributionKind: 'built',
    contribution: 'Built the travel booking application.',
    technologies: [],
    tasks: ['Built booking flows for travel agents, including room bookings and itineraries.'],
    completed: 'Travel agents can manage hotel room bookings and itineraries.',
    links: [],
  },
  {
    status: 'public',
    id: 'choosemyfresh',
    title: 'ChooseMy Fresh',
    summary: 'Website, social media, and website SEO for ChooseMy Fresh.',
    productType: 'marketing',
    alsoTypes: ['website'],
    contribution: 'Created the ChooseMy Fresh website, managed its social media platforms, and worked on its website SEO.',
    technologies: [],
    tasks: [
      'Created the ChooseMy Fresh website.',
      'Managed its social media platforms.',
      'Worked on its website SEO.',
    ],
    links: [],
    featured: true,
    audiences: ['home', 'marketing', 'fullstack'],
  },
  {
    status: 'public',
    id: 'malankara',
    title: 'Malankara Devotional',
    summary: 'A devotional app for the Syro Malankara Catholic Church.',
    productType: 'mobile-app',
    contributionKind: 'built',
    contribution: 'Built the devotional app.',
    technologies: [],
    tasks: ['Built prayer times, church locations, and daily prayers.'],
    completed: 'The app includes prayer times, church locations, and daily prayers.',
    links: [],
    featured: true,
  },
  {
    status: 'public',
    id: 'crm-falcon',
    title: 'CRM Falcon Force',
    summary: 'A CRM for clients, leads, and sales workflows.',
    productType: 'dashboard',
    contributionKind: 'built',
    contribution: 'Developed the CRM for clients, leads, and sales workflows.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    tasks: ['Developed the CRM with React, Node.js, Express, and MongoDB.'],
    completed: 'The CRM manages clients, leads, and sales workflows.',
    links: [],
    featured: true,
  },
  {
    status: 'review',
    id: 'smn-kitchen',
    title: 'SMN Kitchen',
    summary: 'A UAE app for home kitchens and food menus.',
    productType: 'mobile-app',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'hrf-handicrafts',
    title: 'HRF Handicrafts',
    summary: 'An online store for handmade goods.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'cooplus',
    title: 'Cooplus Grocery',
    summary: 'A grocery delivery app.',
    productType: 'mobile-app',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'land-bank',
    title: 'Land Bank App',
    summary: 'A real estate suite for leads and plots.',
    productType: 'mobile-app',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'myfitbuddy',
    title: 'MyFitBuddy',
    summary: 'A fitness commerce and training app.',
    productType: 'mobile-app',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'jawhara-jewellery',
    title: 'Jawhara Jewellery',
    summary: 'A jewellery store website.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'american-tourister',
    title: 'American Tourister regional portals',
    summary: 'Regional store websites.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'samsonite-gcc',
    title: 'Samsonite GCC Platforms',
    summary: 'Regional store websites.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'lipault-saudi',
    title: 'Lipault Saudi Arabia',
    summary: 'A store website.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'al-wifaq',
    title: 'Al Wifaq Online Store',
    summary: 'A retail catalogue website.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'lulu-celebrate',
    title: 'Lulu Celebrate',
    summary: 'An event and gifting website.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'al-zarrab',
    title: 'Al Zarrab Equine Hub',
    summary: 'An equine products website.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'origindia',
    title: 'OrigIndia Brain Health',
    summary: 'A supplements store website.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
  {
    status: 'review',
    id: 'coral-perfumes',
    title: 'Coral Perfumes GCC',
    summary: 'A perfume store website.',
    productType: 'website',
    technologies: [],
    tasks: [],
    links: [],
  },
];

const brand = (name: string, slug: string): SkillItem => ({ name, mark: { kind: 'brand', slug } });
const mono = (name: string, letters: string): SkillItem => ({ name, mark: { kind: 'monogram', letters } });
const social: SkillItem = { name: 'Social media', mark: { kind: 'outline', icon: 'social' } };

const codingTools: SkillItem[] = [
  brand('Cursor', 'cursor'),
  brand('Claude Code', 'claudecode'),
  mono('Codex', 'CX'),
];

const toolNote = 'Tools I use while building. They are not the same as hands-on product skills.';

function categories(surface: 'home' | ContentRole): SkillCategory[] {
  const tools = (skills: SkillItem[], note = toolNote): SkillCategory => ({
    id: 'tools',
    title: 'Tools I use',
    variant: 'tools',
    note,
    skills,
  });

  if (surface === 'flutter') {
    return [
      {
        id: 'mobile',
        title: 'Mobile development',
        skills: [
          brand('Flutter', 'flutter'),
          brand('Dart', 'dart'),
          brand('Android', 'android'),
          brand('iOS', 'ios'),
        ],
      },
      {
        id: 'app-work',
        title: 'App delivery',
        skills: [
          { name: 'APIs', mark: { kind: 'outline', icon: 'api' } },
          mono('Google Maps', 'GM'),
          mono('Offline storage', 'Of'),
        ],
      },
      tools([
        ...codingTools,
        brand('Git', 'git'),
        brand('GitHub', 'github'),
        brand('Android Studio', 'androidstudio'),
        brand('Postman', 'postman'),
      ]),
    ];
  }

  if (surface === 'fullstack') {
    return [
      {
        id: 'frontend',
        title: 'Frontend',
        skills: [
          brand('HTML', 'html5'),
          brand('CSS', 'css'),
          brand('JavaScript', 'javascript'),
          brand('React', 'react'),
          brand('Tailwind CSS', 'tailwindcss'),
        ],
      },
      {
        id: 'backend',
        title: 'Backend',
        skills: [
          brand('Node.js', 'nodedotjs'),
          brand('Express.js', 'express'),
          { name: 'REST APIs', mark: { kind: 'outline', icon: 'api' } },
        ],
      },
      {
        id: 'data',
        title: 'Data and deployment',
        skills: [brand('MongoDB', 'mongodb'), brand('Git', 'git'), brand('GitHub', 'github')],
      },
      tools([...codingTools, mono('VS Code', 'VS'), brand('Postman', 'postman')]),
    ];
  }

  if (surface === 'marketing') {
    return [
      {
        id: 'marketing-work',
        title: 'Marketing work',
        skills: [social, mono('Content updates', 'Cu')],
      },
      {
        id: 'site-support',
        title: 'Website skills',
        note: 'I use these to update landing pages, add tracking, and ship website fixes.',
        skills: [
          brand('HTML', 'html5'),
          brand('CSS', 'css'),
          brand('JavaScript', 'javascript'),
          brand('React', 'react'),
        ],
      },
      tools(
        [
          brand('Google Analytics', 'googleanalytics'),
          brand('Search Console', 'googlesearchconsole'),
          brand('Tag Manager', 'googletagmanager'),
          brand('Semrush', 'semrush'),
        ],
        'Tools I use. Listing them is not a claim of SEO or paid advertising work.',
      ),
    ];
  }

  return [
    {
      id: 'mobile',
      title: 'Mobile development',
      skills: [
        brand('Flutter', 'flutter'),
        brand('Dart', 'dart'),
        brand('Android', 'android'),
        brand('iOS', 'ios'),
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      skills: [
        brand('HTML', 'html5'),
        brand('CSS', 'css'),
        brand('JavaScript', 'javascript'),
        brand('React', 'react'),
      ],
    },
    {
      id: 'backend',
      title: 'Backend and data',
      skills: [
        brand('Node.js', 'nodedotjs'),
        brand('Express.js', 'express'),
        { name: 'REST APIs', mark: { kind: 'outline', icon: 'api' } },
        brand('MongoDB', 'mongodb'),
      ],
    },
    {
      id: 'marketing-work',
      title: 'Digital marketing',
      skills: [social, mono('Website updates', 'We')],
    },
    tools([...codingTools, brand('Git', 'git'), brand('GitHub', 'github')]),
    {
      id: 'soft-skills',
      title: 'Working with people',
      wide: true,
      skills: [
        { name: 'Teamwork', mark: { kind: 'outline', icon: 'team' } },
        { name: 'Problem solving', mark: { kind: 'outline', icon: 'problem' } },
        { name: 'Communication', mark: { kind: 'outline', icon: 'communication' } },
        { name: 'Adaptability', mark: { kind: 'outline', icon: 'adapt' } },
      ],
    },
  ];
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

function monthIndex(point: MonthPoint) {
  return point.year * 12 + point.month;
}

export function formatMonth(point: MonthPoint) {
  return `${MONTHS[point.month - 1]} ${point.year}`;
}

export function formatPeriod(item: { start: MonthPoint; end?: MonthPoint }) {
  const start = formatMonth(item.start);
  if (!item.end) return `${start} – end date to confirm`;
  return `${start} – ${formatMonth(item.end)}`;
}

function eachMonth(start: MonthPoint, end: MonthPoint) {
  const keys: string[] = [];
  let year = start.year;
  let month = start.month;
  while (monthIndex({ year, month }) <= monthIndex(end)) {
    keys.push(`${year}-${String(month).padStart(2, '0')}`);
    month += 1;
    if (month === 13) {
      month = 1;
      year += 1;
    }
  }
  return keys;
}

function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const yearLabel = years === 1 ? '1 year' : `${years} years`;
  const monthLabel = remainder === 1 ? '1 month' : `${remainder} months`;
  if (years && remainder) return `${yearLabel} ${monthLabel}`;
  if (years) return yearLabel;
  return monthLabel;
}

/** Closed employment months, with any shared month counted once. Training is not included. */
export function confirmedEmployment() {
  const counted = new Set<string>();
  const included: ExperienceItem[] = [];
  const open: ExperienceItem[] = [];
  for (const job of experiences) {
    if (!job.end) {
      open.push(job);
      continue;
    }
    included.push(job);
    for (const key of eachMonth(job.start, job.end)) counted.add(key);
  }
  const months = counted.size;
  return { months, label: formatDuration(months), included, open };
}

export function employmentSummary() {
  const record = confirmedEmployment();
  const ranges = [...record.included]
    .sort((a, b) => monthIndex(a.start) - monthIndex(b.start))
    .map((job) => `${job.company} (${formatPeriod(job)})`)
    .join('; ');
  const open = record.open
    .map((job) => `${job.company} is listed from ${formatMonth(job.start)}, and that span waits on a confirmed end date`)
    .join('. ');
  const trainingNote = training.length ? ' Training sits in its own section, outside this total.' : '';
  const openNote = open ? ` ${open}.` : '';
  return {
    months: record.months,
    label: record.label,
    detail: `Counted from ${ranges}. Overlapping months are counted once.${openNote}${trainingNote}`,
  };
}

export function publicExperiences() {
  return [...experiences].sort((a, b) => monthIndex(b.start) - monthIndex(a.start));
}

export function findExperience(id: string) {
  return publicExperiences().find((job) => job.id === id);
}

export function publicProjects() {
  return projects
    .filter((project) => project.status === 'public')
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export function findPublicProject(id: string) {
  return publicProjects().find((project) => project.id === id);
}

export function projectMatchesSurface(project: ProjectItem, surface: 'home' | ContentRole) {
  if (surface === 'home') return true;
  if (project.audiences?.length) return project.audiences.includes(surface);
  if (surface === 'flutter') return project.productType === 'mobile-app' || project.alsoTypes?.includes('mobile-app');
  if (surface === 'fullstack') {
    return (
      project.productType === 'website' ||
      project.productType === 'dashboard' ||
      project.alsoTypes?.includes('website') ||
      project.alsoTypes?.includes('dashboard')
    );
  }
  return project.productType === 'marketing' || project.alsoTypes?.includes('marketing');
}

export function projectsForRole(role: ContentRole) {
  return publicProjects().filter((project) => projectMatchesSurface(project, role));
}

export function skillCategoriesFor(surface: 'home' | ContentRole) {
  return categories(surface);
}

export function productTypeLabel(type: ProductType) {
  if (type === 'mobile-app') return 'Mobile app';
  if (type === 'website') return 'Website';
  if (type === 'dashboard') return 'Dashboard';
  return 'Marketing';
}

export function engagementLabel(type: EngagementType) {
  if (type === 'employment') return 'Employment';
  if (type === 'freelance') return 'Freelance';
  return 'Personal';
}

export function contributionKindLabel(kind: ContributionKind) {
  if (kind === 'built') return 'Built the product';
  if (kind === 'features') return 'Contributed features';
  return 'Maintained an existing product';
}

export function projectPath(id: string) {
  return `/work/${id}`;
}

export function chatSystemInstruction() {
  const jobs = publicExperiences()
    .map((job) => {
      const lines = job.bullets.map((bullet) => `- ${bullet}`);
      if (job.related.length) lines.push(...job.related.map((item) => `- Related: ${item}`));
      const tech = job.technologies.length ? `\nTechnologies: ${job.technologies.join(', ')}` : '';
      const body = lines.length ? `\n${lines.join('\n')}` : '';
      return `${job.role} | ${job.company} | ${job.location} | ${formatPeriod(job)}${body}${tech}`;
    })
    .join('\n\n');
  const courses = training
    .map((item) => `${item.course} | ${item.provider} | ${item.location} | ${formatPeriod(item)}`)
    .join('\n');
  const summary = employmentSummary();
  const work = publicProjects()
    .map((project) => {
      const tech = project.technologies.length ? ` Technologies: ${project.technologies.join(', ')}.` : '';
      const role = project.contribution ? ` Contribution: ${project.contribution}` : '';
      const engagement = project.engagement ? ` Engagement: ${engagementLabel(project.engagement)}.` : '';
      const tasks = project.tasks.length ? ` Tasks: ${project.tasks.join(' ')}` : '';
      return `${project.title} (${productTypeLabel(project.productType)}). ${project.summary}${role}${engagement}${tech}${tasks}`;
    })
    .join('\n');

  return `You speak in the first person as ${profile.name}. Use only the facts below. If a detail is not listed, say you can share it by email and do not guess.

Name: ${profile.name}
Location: ${profile.location}
Availability: ${profile.availability}
Email: ${profile.email}
Website: ${profile.url}
Education: ${education.credential}, ${education.school}, ${education.period}

Confirmed employment length: ${summary.label}. ${summary.detail}

Work (employment only):
${jobs}

Training (not employment):
${courses}

Projects:
${work}

Do not state an end date for ULEGENDARY DIGITAL or describe that role as current. Do not say the mobile work there used Flutter. Do not describe Luminar Technohub as a job, and do not attach production apps or shared component libraries to that course. Do not invent responsibilities for SLR SHOPPEE PVT LTD. Do not claim SEO rankings, download numbers, revenue, team leadership, or testimonials. ChooseMy Fresh website SEO is limited to the tasks listed for that project. Do not describe Pranav as a student or beginner.`;
}
