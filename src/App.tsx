import { Suspense, useState, useEffect } from 'react';
import { LazyMotion, domAnimation } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import WhatIDo from './components/WhatIDo';
import WorkExperience from './components/WorkExperience';
import ExperienceProjects from './components/ExperienceProjects';
import SkillsArsenal from './components/SkillsArsenal';
import Education from './components/Education';
import ContactMe from './components/ContactMe';
import { BlogArticle, BlogHub, BlogTrackIndex, CaseStudy, RolePage, ShopifyService } from './routeChunks';
import { usePortfolioReady } from './components/PortfolioLoader';
import { usePageMeta } from './components/usePageMeta';
import { findPublicProject } from './data/siteContent';
import { accentForProduct } from './components/ProjectCard';
import { BLOG_HUB_PATH, blogFromPath, caseStudyFromPath, ROLE_ROUTES, roleFromPath, scrollBehavior, shopifyFromPath, usePathname } from './routes';
import { markEntranceReady } from './components/entrance';
import RouteLink from './components/RouteLink';
import { trackEvent } from './analytics';
import { Terminal } from 'lucide-react';
import { siBuymeacoffee, siInstagram, siMedium, siReddit } from 'simple-icons';

const footerLinks = [
  { href: ROLE_ROUTES.flutter.path, label: 'Flutter developer' },
  { href: ROLE_ROUTES.fullstack.path, label: 'Full-stack developer' },
  { href: ROLE_ROUTES.marketing.path, label: 'Digital marketer' },
  { href: BLOG_HUB_PATH, label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

const linkedInIcon = {
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};

const profileLinks: { href: string; label: string; path: string }[] = [
  { href: 'https://www.linkedin.com/in/pranav-p-s/', label: 'LinkedIn', path: linkedInIcon.path },
  { href: 'https://www.instagram.com/_pranav_p_s_j/', label: 'Instagram', path: siInstagram.path },
  { href: 'https://medium.com/@pranavputhoor91', label: 'Medium', path: siMedium.path },
  { href: 'https://www.reddit.com/u/Pranavpsj/s/CQhffN52wn', label: 'Reddit', path: siReddit.path },
  { href: 'https://buymeacoffee.com/pranavps', label: 'Buy Me a Coffee', path: siBuymeacoffee.path },
];

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const pathname = usePathname(initialPath);
  const role = roleFromPath(pathname);
  const blog = blogFromPath(pathname);
  const caseSlug = caseStudyFromPath(pathname);
  const shopify = shopifyFromPath(pathname);
  const caseProject = caseSlug ? findPublicProject(caseSlug) : undefined;
  const blogTrack = blog && blog.kind !== 'hub' ? blog.track : null;
  const caseAccent = caseProject ? accentForProduct(caseProject.productType) : null;
  const [activeSection, setActiveSection] = useState('home');
  const postsReady = usePortfolioReady();
  const missing = pathname !== '/' && !role && !blog && !caseSlug && !shopify;

  usePageMeta(pathname, postsReady);

  useEffect(() => {
    markEntranceReady();
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (role || blog || caseSlug || shopify) {
      if (!id) {
        window.scrollTo({ top: 0 });
        return;
      }
      let cancelled = false;
      const started = performance.now();
      const align = () => {
        if (cancelled || window.location.hash.slice(1) !== id) return;
        const element = document.getElementById(id);
        if (!element) {
          if (performance.now() - started < 1500) requestAnimationFrame(align);
          return;
        }
        const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - 85);
        window.scrollTo({ top, behavior: scrollBehavior() });
      };
      requestAnimationFrame(align);
      return () => {
        cancelled = true;
      };
    }
    if (!id) {
      window.scrollTo({ top: 0 });
      return;
    }

    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top, behavior: scrollBehavior() });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, role, blog?.kind, blog && 'track' in blog ? blog.track : '', blog && 'slug' in blog ? blog.slug : '', caseSlug, shopify]);

  useEffect(() => {
    if (blog || caseSlug || shopify) {
      setActiveSection(blog ? 'blog' : caseSlug ? 'projects' : '');
      return;
    }

    const handleScroll = () => {
      const sections =
        role === 'flutter'
          ? ['home', 'about', 'experience', 'skills', 'projects', 'contact']
          : role === 'fullstack'
          ? ['home', 'about', 'skills', 'experience', 'projects', 'contact']
          : role === 'marketing'
            ? ['home', 'about', 'skills', 'experience', 'projects', 'contact']
            : ['home', 'about', 'what-i-do', 'skills', 'experience', 'projects', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 140) currentSection = section;
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [role, blog?.kind, caseSlug, shopify]);

  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: scrollBehavior() });
    }
  };

  const flutter = role === 'flutter' || caseAccent === 'flutter';
  const fullstack = role === 'fullstack' || caseAccent === 'fullstack';
  const marketing = role === 'marketing' || blogTrack === 'marketing' || caseAccent === 'marketing';

  return (
    <LazyMotion features={domAnimation} strict>
    <div className="min-h-screen overflow-x-hidden bg-[#030304] font-sans text-on-surface antialiased selection:bg-primary/20 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <Navbar activeSection={activeSection} flutter={flutter} fullstack={fullstack} marketing={marketing} />

      <Suspense fallback={<main className="min-h-screen" />}>
      {missing || (caseSlug && !caseProject) ? (
        <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">This page is not on the site.</h1>
          <p className="mt-4 text-base leading-relaxed text-[#c5d2de]">The link does not match a published page or project.</p>
        </main>
      ) : blog?.kind === 'hub' ? (
        <BlogHub />
      ) : blog?.kind === 'index' ? (
        <BlogTrackIndex track={blog.track} />
      ) : blog?.kind === 'article' ? (
        <BlogArticle track={blog.track} slug={blog.slug} />
      ) : caseProject ? (
        <CaseStudy project={caseProject} />
      ) : shopify ? (
        <ShopifyService />
      ) : (
        <>
          <Hero onNavigate={handleScrollToSegment} flutter={role === 'flutter'} fullstack={role === 'fullstack'} marketing={role === 'marketing'} />
          {role ? (
            <div key={role}>
              <RolePage role={role} />
            </div>
          ) : (
            <>
              <AboutMe />
              <WhatIDo onNavigate={handleScrollToSegment} />
              <SkillsArsenal />
              <WorkExperience />
              <ExperienceProjects
                showFilters
                surface="home"
                heading={{
                  kicker: 'Selected work',
                  title: 'Projects I can describe.',
                  body: 'Mobile apps, websites, and marketing work. Employment is marked when a project belongs to a role. ChooseMy Fresh covers the mobile app, the CRM, the website, its social media, and its website SEO.',
                }}
              />
              <Education />
              <ContactMe defaultInterest="A role" />
            </>
          )}
        </>
      )}
      </Suspense>

      <footer className="relative z-10 w-full border-t border-white/5 bg-[#010101] py-12 text-center font-display text-[#a4afd5]/50">
        <div className="mx-auto max-w-7xl space-y-4 px-6">
          <div className="flex items-center justify-center gap-2 text-white">
            <Terminal
              size={16}
              className={`motion-reduce:animate-none ${role || caseAccent ? '' : 'animate-pulse'} ${
                flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : marketing ? 'text-[#FFD000]' : 'text-primary'
              }`}
            />
            <span className="text-xs font-extrabold uppercase tracking-wide">Pranav P S</span>
          </div>
          <nav aria-label="Site" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <RouteLink key={link.href} href={link.href} className="text-[#c5d2de] hover:text-white">
                {link.label}
              </RouteLink>
            ))}
          </nav>
          <nav aria-label="Profiles" className="flex flex-wrap items-center justify-center gap-1">
            {profileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                onClick={() => trackEvent('outbound_click', { link_url: link.href, link_text: link.label })}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#c5d2de] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d={link.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </nav>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#a4afd5]/30">© 2026 Pranav P S. All rights reserved.</div>
        </div>
      </footer>
    </div>
    </LazyMotion>
  );
}
