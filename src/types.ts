export type FactStatus = 'public' | 'review';

export type ProductType = 'mobile-app' | 'website' | 'dashboard' | 'marketing';

export type EngagementType = 'employment' | 'freelance' | 'personal';

export type ContributionKind = 'built' | 'features' | 'maintained';

/** Calendar month. `month` is 1–12. */
export interface MonthPoint {
  year: number;
  month: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  start: MonthPoint;
  /** Omit when the end date is not confirmed. */
  end?: MonthPoint;
  bullets: string[];
  /** Work at the same employer that is secondary on a role-focused page. */
  related: string[];
  technologies: string[];
  projectIds: string[];
}

export interface TrainingItem {
  id: string;
  course: string;
  provider: string;
  location: string;
  start: MonthPoint;
  end: MonthPoint;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectShot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** One product inside a project, such as the app and the CRM on the same client. */
export interface ProjectView {
  type: ProductType;
  /** Shown on the switcher. Dashboard can read “CRM”. */
  label?: string;
  shots: ProjectShot[];
  links: ProjectLink[];
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  productType: ProductType;
  engagement?: EngagementType;
  contribution?: string;
  contributionKind?: ContributionKind;
  technologies: string[];
  tasks: string[];
  problem?: string;
  completed?: string;
  screenshot?: ProjectShot;
  links: ProjectLink[];
  /** App, website, or CRM parts a visitor can switch between. */
  views?: ProjectView[];
  featured?: boolean;
  experienceId?: string;
  /** Extra type filters, in addition to `productType`. */
  alsoTypes?: ProductType[];
  /** Role pages that list this project. Homepage always lists public projects. */
  audiences?: Array<'home' | 'flutter' | 'fullstack' | 'marketing'>;
}

export type SkillOutline =
  | 'api'
  | 'llm'
  | 'rag'
  | 'agent'
  | 'seo'
  | 'social'
  | 'team'
  | 'problem'
  | 'communication'
  | 'adapt';

export type SkillMark =
  | { kind: 'brand'; slug: string }
  | { kind: 'outline'; icon: SkillOutline }
  | { kind: 'monogram'; letters: string };

export interface SkillItem {
  name: string;
  mark: SkillMark;
}

export interface SkillCategory {
  id: string;
  title: string;
  wide?: boolean;
  variant?: 'tools';
  note?: string;
  skills: SkillItem[];
}

export interface MilestoneItem {
  id: string;
  number: string;
  label: string;
  description: string;
  tags: string[];
  icon: string;
}

export type BlogTrack = 'software' | 'marketing';

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; width: number; height: number };

export interface BlogPost {
  track: BlogTrack;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  body: BlogBlock[];
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
}
