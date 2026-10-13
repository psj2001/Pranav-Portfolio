import { useEffect, useState } from 'react';
import type { BlogTrack } from './types';

export type RoleId = 'flutter' | 'fullstack' | 'marketing';

export const BLOG_HUB_PATH = '/blog';

export const BLOG_TRACKS: Record<BlogTrack, { path: string; title: string }> = {
  software: { path: '/blog/software', title: 'Software' },
  marketing: { path: '/blog/marketing', title: 'Digital Marketing' },
};

export type BlogLocation =
  | { kind: 'hub' }
  | { kind: 'index'; track: BlogTrack }
  | { kind: 'article'; track: BlogTrack; slug: string };

export const ROLE_ROUTES: Record<RoleId, { path: string; interest: string; title: string }> = {
  flutter: {
    path: '/flutter-developer',
    interest: 'Mobile app development',
    title: 'Flutter Developer',
  },
  fullstack: {
    path: '/full-stack-developer',
    interest: 'Full-stack web development',
    title: 'Full Stack Developer',
  },
  marketing: {
    path: '/digital-marketer',
    interest: 'Digital marketing',
    title: 'Digital Marketer',
  },
};

function normalizePath(pathname: string) {
  const path = pathname.split('#')[0] || '/';
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path || '/';
}

/** Public URL path. Directory routes keep the trailing slash used in canonicals. */
export function toPublicPath(path: string) {
  if (path.startsWith('/#')) return path;
  const hashAt = path.indexOf('#');
  const hash = hashAt >= 0 ? path.slice(hashAt) : '';
  const normalized = normalizePath(path);
  if (normalized === '/') return hash ? `/${hash}` : '/';
  return `${normalized}/${hash}`;
}

export function roleFromPath(pathname: string): RoleId | null {
  const path = normalizePath(pathname);
  const match = (Object.entries(ROLE_ROUTES) as [RoleId, (typeof ROLE_ROUTES)[RoleId]][]).find(
    ([, route]) => route.path === path,
  );
  return match?.[0] ?? null;
}

export function blogFromPath(pathname: string): BlogLocation | null {
  const path = normalizePath(pathname);
  if (path === BLOG_HUB_PATH) return { kind: 'hub' };

  const parts = path.split('/').filter(Boolean);
  if (parts[0] !== 'blog' || parts.length < 2 || parts.length > 3) return null;

  const track = parts[1];
  if (track !== 'software' && track !== 'marketing') return null;
  if (parts.length === 2) return { kind: 'index', track };
  return { kind: 'article', track, slug: decodeURIComponent(parts[2]) };
}

export function blogPathForRole(role: RoleId | null): string {
  if (role === 'marketing') return BLOG_TRACKS.marketing.path;
  if (role === 'flutter' || role === 'fullstack') return BLOG_TRACKS.software.path;
  return BLOG_HUB_PATH;
}

export function blogDestination(pathname: string): string {
  const blog = blogFromPath(pathname);
  if (blog && blog.kind !== 'hub') return BLOG_TRACKS[blog.track].path;
  if (blog?.kind === 'hub') return BLOG_HUB_PATH;
  return blogPathForRole(roleFromPath(pathname));
}

function publishPath() {
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function scrollBehavior(): ScrollBehavior {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'auto';
  return 'smooth';
}

export function caseStudyFromPath(pathname: string) {
  const path = normalizePath(pathname);
  const parts = path.split('/').filter(Boolean);
  if (parts[0] !== 'work' || parts.length !== 2) return null;
  return decodeURIComponent(parts[1]);
}

export function navigate(path: string) {
  const next = toPublicPath(path);
  if (normalizePath(window.location.pathname) === normalizePath(next) && !window.location.hash && !next.includes('#')) {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    return;
  }
  window.history.pushState({}, '', next);
  publishPath();
}

export function goHome(section?: string) {
  const target = !section || section === 'home' ? '/' : `/#${section}`;
  const current = `${normalizePath(window.location.pathname)}${window.location.hash}`;
  if (current === target) {
    if (!section || section === 'home') {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      return;
    }
    const element = document.getElementById(section);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top, behavior: scrollBehavior() });
    }
    return;
  }
  window.history.pushState({}, '', target);
  publishPath();
}

export function usePathname(initialPath = '/') {
  const [pathname, setPathname] = useState(() =>
    normalizePath(typeof window === 'undefined' ? initialPath : window.location.pathname),
  );

  useEffect(() => {
    const sync = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return pathname;
}
