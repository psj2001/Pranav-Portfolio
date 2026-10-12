import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { entranceInitial } from './entrance';
import ProjectCard, { accentForProduct, type ProjectAccent } from './ProjectCard';
import { projectMatchesSurface, publicProjects, type ContentRole } from '../data/siteContent';
import type { ProductType, ProjectItem } from '../types';

type FilterId = 'all' | ProductType;

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mobile-app', label: 'Mobile app' },
  { id: 'website', label: 'Website' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'marketing', label: 'Marketing' },
];

interface ExperienceProjectsProps {
  surface?: 'home' | ContentRole;
  showFilters?: boolean;
  accent?: ProjectAccent;
  heading: { kicker: string; title: string; body: string };
}

function matchesType(project: ProjectItem, filter: FilterId) {
  if (filter === 'all') return true;
  return project.productType === filter || project.alsoTypes?.includes(filter);
}

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

export default function ExperienceProjects({
  surface = 'home',
  showFilters = false,
  accent = 'home',
  heading,
}: ExperienceProjectsProps) {
  const reduced = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const tone =
    accent === 'flutter' ? 'text-[#027DFD]' : accent === 'fullstack' ? 'text-[#FF7A00]' : accent === 'marketing' ? 'text-[#FFD000]' : 'text-[#00e5e5]';
  const activeButton =
    accent === 'flutter'
      ? 'border-[#027DFD] bg-[#027DFD] text-white'
      : accent === 'fullstack'
        ? 'border-[#FF7A00] bg-[#FF7A00] text-[#1a1008]'
        : accent === 'marketing'
          ? 'border-[#FFD000] bg-[#FFD000] text-[#1a1404]'
          : 'border-[#00e5e5] bg-[#00e5e5] text-[#04181c]';

  useEffect(() => {
    const onFilter = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if (value === 'all' || value === 'mobile-app' || value === 'website' || value === 'dashboard' || value === 'marketing') {
        setActiveFilter(value);
      }
    };
    window.addEventListener('portfolio-project-filter', onFilter);
    return () => window.removeEventListener('portfolio-project-filter', onFilter);
  }, []);

  const scoped = publicProjects().filter((project) => projectMatchesSurface(project, surface));
  const visible = scoped.filter((project) => matchesType(project, activeFilter));

  return (
    <section id="projects" className="relative z-10 scroll-mt-24 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.header
          className="max-w-3xl"
          initial={entranceInitial(reduced, { opacity: 0, y: 18 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${tone}`}>{heading.kicker}</p>
          <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">{heading.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c5d2de] sm:text-lg">{heading.body}</p>
        </motion.header>

        {showFilters ? (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Project type">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  activeFilter === filter.id ? activeButton : 'border-white/15 text-[#d5deea] hover:border-white/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        ) : null}

        {visible.length === 0 ? (
          <p className="mt-10 text-base text-[#c5d2de]">Nothing is listed in this category yet.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {visible.map((project) => (
              <div key={project.id} className="h-full">
                <ProjectCard project={project} accent={accent === 'home' ? accentForProduct(project.productType) : accent} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
