export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  bullets?: string[];
  technologies: string[];
  icon: string;
  badgeType?: 'current' | 'previous';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'mobileapp' | 'website' | 'freelance' | 'realestate' | 'ecommerce' | 'all' | 'flutter' | 'mern';
  techStack: string[];
  image: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: { name: string; isPrimary: boolean }[];
}

export interface MilestoneItem {
  id: string;
  number: string;
  label: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
}
