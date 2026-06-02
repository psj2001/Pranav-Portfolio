import { ExperienceItem, ProjectItem, SkillCategory, MilestoneItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack Developer / Mobile App Developer',
    company: 'ULegendary Digital Marketing',
    location: 'Dubai, UAE',
    period: 'Jan 2026 – Present',
    description: 'Lead development and shipping of production applications for Android, iOS, and high-performance React frontends. Translating complex system requirements into modular, user-centric ecosystems.',
    bullets: [
      'Managed the mobile development team, driving architecture decisions, sprint planning, code reviews, and feature delivery.',
      'Built scalable Android and iOS applications using Flutter while collaborating with design, backend, and business teams.',
      'Defined technical roadmap and ensured successful product delivery from concept, development, testing, deployment, and maintenance.',
      'Integrated APIs, authentication, push notifications, analytics, and performance optimizations for a seamless user experience.'
    ],
    technologies: ['Node.js', 'React JS', 'Next.js', 'TypeScript', 'MongoDB', 'AWS', 'Flutter', 'Bloc/Cubit'],
    icon: 'developer_mode',
    badgeType: 'current'
  },
  {
    id: 'exp-2',
    role: 'Full-Stack & Mobile Developer',
    company: 'Casakey Real Estate',
    location: 'Dubai, UAE',
    period: 'Oct 2024 – Dec 2025',
    description: 'Built and maintained high-performance real estate platforms, mapping grids, custom backend queries, and offline database layers.',
    bullets: [
      'Delivered features through small, reviewable commits while maintaining application quality and performance.',
      'Integrated REST APIs, authentication, maps, notifications, and dynamic property feeds.',
      'Added offline support using Hive to ensure a smooth experience on unreliable network connections.',
      'Improved performance through caching, optimized rendering, and efficient state management.',
      'Worked directly with backend teams to define and consume API endpoints.',
      'Managed application releases and continuous feature shipping for both Android and iOS platforms.'
    ],
    technologies: ['TypeScript', 'React JS', 'Node.js', 'Google Maps SDK', 'Hive', 'REST APIs', 'AWS'],
    icon: 'apartment',
    badgeType: 'previous'
  },
  {
    id: 'exp-3',
    role: 'Flutter & Full-Stack Developer',
    company: 'Globosoft Solution Pvt Ltd',
    location: 'Kochi, Kerala, India',
    period: 'Aug 2023 – Oct 2024',
    description: 'Engineered over 10 production-ready cross-platform applications, integrating complex analytical trackers, payment systems, and offline storage formats.',
    bullets: [
      'Developed 10+ production applications across multiple business domains.',
      'Built scalable mobile solutions using Flutter, REST APIs, and GraphQL integrations.',
      'Applied Clean Architecture and SOLID principles to create maintainable and extensible codebases.',
      'Implemented offline-first solutions using Hive and Sqflite.',
      'Developed multilingual mobile experiences with localization support.',
      'Integrated payment gateways, notifications, analytics, and third-party services.',
      'Focused on performance optimization to make applications feel fast and responsive.',
      'Collaborated with cross-functional teams to deliver production-ready features efficiently.'
    ],
    technologies: ['Flutter', 'REST APIs', 'GraphQL', 'SOLID', 'Hive', 'Sqflite', 'Dart'],
    icon: 'account_tree',
    badgeType: 'previous'
  },
  {
    id: 'exp-4',
    role: 'Flutter Developer',
    company: 'Luminar Technohub',
    location: 'Kochi, Kerala, India',
    period: 'Mar 2022 – Jul 2023',
    description: 'Designed reusable mobile components, state flows, and modular widgets, contributing heavily across full deployment lifecycles.',
    bullets: [
      'Developed mobile application features and reusable UI components using Flutter.',
      'Integrated REST APIs and state management solutions.',
      'Fixed bugs, improved performance, and maintained existing application codebases.',
      'Worked across the full development lifecycle from implementation to deployment.',
      'Contributed to delivering high-quality mobile experiences through consistent feature shipping and maintenance.'
    ],
    technologies: ['Flutter', 'REST APIs', 'State Management', 'UI Widgets', 'Dart', 'Git'],
    icon: 'construction',
    badgeType: 'previous'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'creova',
    title: 'CREOVA',
    description: 'A global self-service platform designed to connect brands with verified creators, influencers, and premium talent—including celebrities and sports personalities—through a structured, data-driven ecosystem.',
    category: 'mobileapp',
    techStack: ['Flutter', 'Dart', 'Clean Architecture', 'REST APIs', 'Brand Integrations'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'smn-kitchen',
    title: 'SMN Kitchen',
    description: 'A specialized App gathering all home-cooked kitchens in the UAE in one place. Allows kitchen providers to easily register, showcase kitchens, list food menu details, and add custom food items.',
    category: 'mobileapp',
    techStack: ['Flutter', 'Dart', 'REST APIs', 'Multi-Vendor', 'Location Services'],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'hrf-handicrafts',
    title: 'HRF Handicrafts',
    description: 'A secure e-commerce platform offering unique handmade items, home decoration, cultural clothes, accessories, art, crochet, jewelry, and gifts with highly-focused customer service.',
    category: 'freelance',
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'Secure Payments', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cooplus',
    title: 'Cooplus Grocery',
    description: 'Discover the all-new Cooplus, the UAE\'s leading online grocery delivery app, now enhanced with a sleek new interface, expanded product categories, and a seamless shopping experience.',
    category: 'mobileapp',
    techStack: ['Flutter', 'Dart', 'State Cache', 'Push Notifications', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proptelli',
    title: 'PropTelli',
    description: 'A cutting-edge digital portal venture by Casa Key Real Estate LLC, based in Dubai, empowering real estate professionals worldwide to connect with the dynamic Dubai property market.',
    category: 'mobileapp',
    techStack: ['Next.js', 'React JS', 'TypeScript', 'Google Maps SDK', 'AWS'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'choose-n-fly',
    title: 'Choose n Fly',
    description: 'A comprehensive hotel booking application designed specifically for travel agents to secure room bookings, manage itineraries, and process payments.',
    category: 'mobileapp',
    techStack: ['Flutter', 'Dart', 'Hotel Booking APIs', 'B2B billing panels'],
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'malankara',
    title: 'Malankara Devotional',
    description: 'The official mobile application of the Syro Malankara Catholic Church, serving as a comprehensive directory and resource for the faithful laity and clergy.',
    category: 'mobileapp',
    techStack: ['Flutter', 'SQLite', 'i18n Localization', 'Maps API'],
    image: 'https://images.unsplash.com/photo-1438210125608-ab1f22144dd0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'land-bank',
    title: 'Land Bank App',
    description: 'A robust four-app real estate suite (Agent, Client, Admin, and Investor apps) used to manage Pazheri Group real estate leads, plots, and investor coordination details.',
    category: 'mobileapp',
    techStack: ['Flutter', 'Rest APIs', 'SQLite', 'Notification Engine', 'Dart'],
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'myfitbuddy',
    title: 'MyFitBuddy',
    description: 'A dedicated fitness platform enabling Kuwait-based clients to purchase fitness products, personalized exercise training schedules, and attend active live workout sessions.',
    category: 'mobileapp',
    techStack: ['Flutter', 'Live WebRTC Streaming', 'Stripe Payments', 'Dart'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'choosemyfresh',
    title: 'Choose My Fresh',
    description: 'The leading home delivery app in Kochi, serving ozone-washed, vacuum-packed meat, poultry, fish, farm-fresh vegetables, and groceries in rural and urban areas in Kochi.',
    category: 'mobileapp',
    techStack: ['Flutter', 'NodeJS', 'Ozone Wash API', 'Location Map routing'],
    image: 'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'jawhara-jewellery',
    title: 'Jawhara Jewellery',
    description: 'A high-end luxury gold and jewel online store operating in Saudi Arabia, featuring a premium showcase with seamless, elegant product discovery.',
    category: 'website',
    techStack: ['eCommerce Website', 'Shopify Plus', 'Custom Slide transitions', 'Saudi Payments'],
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'american-tourister',
    title: 'American Tourister regional portals',
    description: 'Multi-regional checkout nodes for the renowned luggage brand, delivering localized experiences, secure shopping, and optimized cart performance in Saudi Arabia and Egypt.',
    category: 'website',
    techStack: ['eCommerce Website', 'Multi-brand logistics', 'Checkout optimizing'],
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'samsonite-gcc',
    title: 'Samsonite GCC Platforms',
    description: 'High-performance, multi-currency traveler shopping setups for the global leader in travel solutions, incorporating regional currencies, payments, and logistics.',
    category: 'website',
    techStack: ['eCommerce Website', 'Currencies API', 'Logistics Integrators'],
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'lipault-saudi',
    title: 'Lipault Saudi Arabia',
    description: 'Boutique luxury fashion and stylish luggage outlet built for premium user experience, high-conversion product views, and sleek visual presence.',
    category: 'website',
    techStack: ['eCommerce Website', 'Boutique UI/UX', 'Product Filtering', 'Vite/React'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'al-wifaq',
    title: 'Al Wifaq Online Store',
    description: 'A comprehensive multi-category digital superstore catalogue for a leading retailer, utilizing strong item catalog systems and automated order dispatches.',
    category: 'website',
    techStack: ['eCommerce Website', 'Product Cataloging', 'MySQL', 'NodeJS'],
    image: 'https://images.unsplash.com/photo-1583258292688-d0213df4a3a8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'lulu-celebrate',
    title: 'Lulu Celebrate',
    description: 'Premium event collections, gifting, and wedding dress registry under the Lulu Group, featuring curated event product listings and delivery integration.',
    category: 'website',
    techStack: ['eCommerce Website', 'Lulu Group APIs', 'Visual Cataloging'],
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'al-zarrab',
    title: 'Al Zarrab Equine Hub',
    description: 'Specialized high-nutrition platform supporting UAE stables and racehorse diets, aligning horse supplement options with secure fast-checkout channels.',
    category: 'website',
    techStack: ['eCommerce Website', 'Secure Checkout', 'Niche equine lists'],
    image: 'https://images.unsplash.com/photo-1516222338250-863216ce01fa?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'origindia',
    title: 'OrigIndia Brain Health',
    description: 'Direct-to-consumer organic supplements e-commerce focused on wellness, mental focus, and Lion\'s Mane premium herbal products.',
    category: 'website',
    techStack: ['DTC design', 'eCommerce Website', 'Tracking API'],
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'coral-perfumes',
    title: 'Coral Perfumes GCC',
    description: 'Scalable, high-conversion scent marketplace supporting localized promotions, multi-region perfume collections, and secure fast delivery.',
    category: 'website',
    techStack: ['Multi-region Website', 'Payment Hub', 'High conversion UI/UX'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'crm-falcon',
    title: 'CRM Falcon Force',
    description: 'Full-stack enterprise B2B customer relationship management and sales workflow pipeline. Equipped with optimized table performance, client tracking grids, and RESTful API integrations.',
    category: 'website',
    techStack: ['Node.js', 'React JS', 'Express', 'MongoDB', 'Redux'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'web-frontend',
    title: 'Frontend Web Engineering',
    icon: 'smartphone',
    skills: [
      { name: 'React JS', isPrimary: true },
      { name: 'Next.js', isPrimary: true },
      { name: 'TypeScript', isPrimary: true },
      { name: 'HTML', isPrimary: true },
      { name: 'Tailwind CSS', isPrimary: true }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Mobile Architecture',
    icon: 'smartphone',
    skills: [
      { name: 'Flutter', isPrimary: true },
      { name: 'React Native', isPrimary: true },
      { name: 'Dart', isPrimary: false },
      { name: 'Bloc / Cubit', isPrimary: true },
      { name: 'Riverpod / GetX', isPrimary: false }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Infrastructure & API',
    icon: 'account_tree',
    skills: [
      { name: 'NodeJS', isPrimary: true },
      { name: 'Express', isPrimary: false },
      { name: 'REST APIs', isPrimary: true },
      { name: 'GraphQL', isPrimary: false },
      { name: 'WebSockets', isPrimary: false }
    ]
  },
  {
    id: 'cloud-db',
    title: 'Database & Cloud Ecosystem',
    icon: 'database',
    skills: [
      { name: 'MongoDB', isPrimary: true },
      { name: 'AWS', isPrimary: true },
      { name: 'Firebase / Firestore', isPrimary: true },
      { name: 'SQLite / Hive', isPrimary: false }
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI-Assisted Workflows',
    icon: 'construction',
    skills: [
      { name: 'Cursor AI & Claude', isPrimary: true },
      { name: 'ChatGPT & Copilot', isPrimary: true },
      { name: 'Prompt Engineering', isPrimary: false },
      { name: 'Automated Refactoring', isPrimary: false }
    ]
  }
];

export const MILESTONES: MilestoneItem[] = [
  {
    id: 'stat-1',
    number: '12+',
    label: 'Deployed Applications',
    description: 'Production-ready mobile & web applications successfully deployed globally.',
    tags: ['Google Play', 'App Store', 'Web'],
    icon: 'deployed_code'
  },
  {
    id: 'stat-2',
    number: '4+',
    label: 'Years of Experience',
    description: 'Four consecutive years of production engineering experience with modular development cycles.',
    tags: ['Professional CV'],
    icon: 'terminal'
  },
  {
    id: 'stat-3',
    number: '100%',
    label: 'Code Efficiency',
    description: 'Maintaining robust test suites, reviewable micro-commits, and agile sprints.',
    tags: ['Clean Architecture', 'SOLID'],
    icon: 'groups'
  }
];
