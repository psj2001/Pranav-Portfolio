import { lazy } from 'react';
import { blogFromPath, caseStudyFromPath, roleFromPath, shopifyFromPath } from './routes';

export const loadRolePage = () => import('./components/RolePage');
export const loadBlogIndex = () => import('./components/BlogIndex');
export const loadBlogArticle = () => import('./components/BlogArticle');
export const loadCaseStudy = () => import('./components/CaseStudy');
export const loadShopifyService = () => import('./components/ShopifyService');

export const RolePage = lazy(loadRolePage);
export const BlogHub = lazy(() => loadBlogIndex().then((mod) => ({ default: mod.BlogHub })));
export const BlogTrackIndex = lazy(() => loadBlogIndex().then((mod) => ({ default: mod.BlogTrackIndex })));
export const BlogArticle = lazy(loadBlogArticle);
export const CaseStudy = lazy(loadCaseStudy);
export const ShopifyService = lazy(loadShopifyService);

export function preloadRoute(pathname: string) {
  const jobs: Promise<unknown>[] = [];
  if (roleFromPath(pathname)) jobs.push(loadRolePage());
  const blog = blogFromPath(pathname);
  if (blog?.kind === 'article') jobs.push(loadBlogArticle());
  else if (blog) jobs.push(loadBlogIndex());
  if (caseStudyFromPath(pathname)) jobs.push(loadCaseStudy());
  if (shopifyFromPath(pathname)) jobs.push(loadShopifyService());
  return Promise.all(jobs);
}
