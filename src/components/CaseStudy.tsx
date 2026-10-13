import { useState } from 'react';
import { motion } from 'motion/react';
import { trackEvent } from '../analytics';
import Breadcrumb from './Breadcrumb';
import { entranceInitial } from './entrance';
import { accentForProduct } from './ProjectCard';
import {
  contributionKindLabel,
  engagementLabel,
  findExperience,
  formatPeriod,
  productTypeLabel,
  projectPath,
} from '../data/siteContent';
import type { ProjectItem } from '../types';

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

export default function CaseStudy({ project }: { project: ProjectItem }) {
  const reduced = usePrefersReducedMotion();
  const employer = project.experienceId ? findExperience(project.experienceId) : undefined;
  const types = [project.productType, ...(project.alsoTypes ?? [])];
  const accent = accentForProduct(project.productType);
  const tone =
    accent === 'flutter' ? 'text-[#027DFD]' : accent === 'fullstack' ? 'text-[#FF7A00]' : accent === 'marketing' ? 'text-[#FFD000]' : 'text-[#00e5e5]';
  return (
    <article className="relative z-10 scroll-mt-24 px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={entranceInitial(reduced, { opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Breadcrumb path={projectPath(project.id)} />
          <p className={`mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] ${tone}`}>
            {types.map((type) => productTypeLabel(type)).join(' · ')}
          </p>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">{project.title}</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.engagement ? (
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-[#d5deea]">
                {engagementLabel(project.engagement)}
                {employer ? ` · ${employer.company}` : ''}
              </span>
            ) : null}
            {project.contributionKind ? (
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-[#d5deea]">
                {contributionKindLabel(project.contributionKind)}
              </span>
            ) : null}
          </div>
        </motion.div>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-[#c5d2de]">
          <section>
            <h2 className="text-xl font-bold text-white">Overview</h2>
            <p className="mt-3">{project.summary}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">Problem solved</h2>
            {project.problem ? <p className="mt-3">{project.problem}</p> : <p className="mt-3 text-sm text-[#8ea0b0]">Not published yet.</p>}
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">My responsibilities</h2>
            {project.contribution ? <p className="mt-3">{project.contribution}</p> : <p className="mt-3 text-sm text-[#8ea0b0]">Not published yet.</p>}
            {employer && employer.related.length > 0 ? (
              <>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {employer.related.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-[#8ea0b0]">
                  {employer.role} at {employer.company}, {formatPeriod(employer)}.
                </p>
              </>
            ) : null}
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">Technologies used</h2>
            {project.technologies.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full bg-white/5 px-3 py-1 text-sm text-[#d5deea]">
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#8ea0b0]">Not published yet.</p>
            )}
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">Key features</h2>
            {project.tasks.length > 0 ? (
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {project.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#8ea0b0]">Not published yet.</p>
            )}
            {project.completed ? <p className="mt-3">{project.completed}</p> : null}
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">Technical challenges</h2>
            <p className="mt-3 text-sm text-[#8ea0b0]">Not published yet.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">Screenshots and project links</h2>
            {project.screenshot ? (
              <img
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                width={project.screenshot.width}
                height={project.screenshot.height}
                loading="lazy"
                decoding="async"
                className="mt-4 w-full rounded-2xl border border-white/10"
              />
            ) : (
              <p className="mt-3 text-sm text-[#8ea0b0]">Screenshot not published yet.</p>
            )}
            {project.links.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('outbound_click', { link_url: link.href, link_text: link.label })}
                      className={`font-semibold underline-offset-4 hover:underline ${tone}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {!project.screenshot && project.links.length === 0 ? <p className="mt-3 text-sm text-[#8ea0b0]">Not published yet.</p> : null}
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">Verified results</h2>
            <p className="mt-3 text-sm text-[#8ea0b0]">Not published yet.</p>
          </section>
        </div>
      </div>
    </article>
  );
}
