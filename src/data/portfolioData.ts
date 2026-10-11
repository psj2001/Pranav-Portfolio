import { publicExperiences, publicProjects, skillCategoriesFor } from './siteContent';

export { skillCategoriesFor };
export const EXPERIENCES = publicExperiences();
export const PROJECTS = publicProjects();
export const SKILL_CATEGORIES = skillCategoriesFor('home');
