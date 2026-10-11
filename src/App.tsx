import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import WhatIDo from './components/WhatIDo';
import WorkExperience from './components/WorkExperience';
import ExperienceProjects from './components/ExperienceProjects';
import SkillsArsenal from './components/SkillsArsenal';
import Education from './components/Education';
import ContactMe from './components/ContactMe';
import RolePage from './components/RolePage';
import BlogArticle from './components/BlogArticle';
import CaseStudy from './components/CaseStudy';
import { BlogHub, BlogTrackIndex } from './components/BlogIndex';
import { usePageMeta } from './components/usePageMeta';
import { findPublicProject } from './data/siteContent';
import { accentForProduct } from './components/ProjectCard';
import { blogFromPath, caseStudyFromPath, roleFromPath, scrollBehavior, usePathname } from './routes';
import { Terminal } from 'lucide-react';

export default function App() {
  const pathname = usePathname();
  const role = roleFromPath(pathname);
  const blog = blogFromPath(pathname);
  const caseSlug = caseStudyFromPath(pathname);
  const caseProject = caseSlug ? findPublicProject(caseSlug) : undefined;
  const blogTrack = blog && blog.kind !== 'hub' ? blog.track : null;
  const caseAccent = caseProject ? accentForProduct(caseProject.productType) : null;
  const [activeSection, setActiveSection] = useState('home');
  const missing = pathname !== '/' && !role && !blog && !caseSlug;

  usePageMeta(pathname);

  useEffect(() => {
    if (role || blog || caseSlug) {
      window.scrollTo({ top: 0 });
      return;
    }

    const id = window.location.hash.slice(1);
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
  }, [pathname, role, blog?.kind, blog && 'track' in blog ? blog.track : '', blog && 'slug' in blog ? blog.slug : '', caseSlug]);

  useEffect(() => {
    if (blog || caseSlug) {
      setActiveSection(blog ? 'blog' : 'projects');
      return;
    }

    const handleScroll = () => {
      const sections =
        role === 'flutter'
          ? ['home', 'about', 'experience', 'skills', 'projects', 'contact']
          : role === 'fullstack'
          ? ['home', 'about', 'skills', 'experience', 'projects', 'contact']
          : role === 'marketing'
            ? ['home', 'about', 'skills', 'projects', 'contact']
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
  }, [role, blog?.kind, caseSlug]);

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
    <div className="min-h-screen overflow-x-hidden bg-[#030304] font-sans text-on-surface antialiased selection:bg-primary/20 selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <Navbar activeSection={activeSection} flutter={flutter} fullstack={fullstack} marketing={marketing} />

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
                  body: 'Mobile apps, websites, and marketing work. Employment is marked when a project belongs to a role. ChooseMy Fresh covers the website, its social media, and its website SEO.',
                }}
              />
              <Education />
              <ContactMe defaultInterest="A role" />
            </>
          )}
        </>
      )}

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
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#a4afd5]/30">© 2026 Pranav P S. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
