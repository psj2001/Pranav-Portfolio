import { useState } from 'react';
import { motion } from 'motion/react';
import RouteLink from './RouteLink';
import { entranceInitial } from './entrance';
import { accentForProduct } from './ProjectCard';
import {
  contributionKindLabel,
  engagementLabel,
  findExperience,
  formatPeriod,
  productTypeLabel,
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
  const back =
    project.productType === 'mobile-app'
      ? '/flutter-developer'
      : project.productType === 'marketing'
        ? '/digital-marketer'
        : '/full-stack-developer';

  return (
    <article className="relative z-10 scroll-mt-24 px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={entranceInitial(reduced, { opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <RouteLink
            href={back}
            className={`inline-flex min-h-11 items-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${tone}`}
          >
            Back to projects
          </RouteLink>
          <p className={`mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] ${tone}`}>
            {types.map((type) => productTypeLabel(type)).join(' · ')}
          </p>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-[#c5d2de] sm:text-lg">{project.summary}</p>
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
          {project.problem ? (
            <section>
              <h2 className="text-xl font-bold text-white">The problem</h2>
              <p className="mt-3">{project.problem}</p>
            </section>
          ) : null}
          {project.contribution ? (
            <section>
              <h2 className="text-xl font-bold text-white">My role</h2>
              <p className="mt-3">{project.contribution}</p>
            </section>
          ) : null}
          {project.tasks.length > 0 ? (
            <section>
              <h2 className="text-xl font-bold text-white">What I did</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {project.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {employer && employer.related.length > 0 ? (
            <section>
              <h2 className="text-xl font-bold text-white">Related contributions</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {employer.related.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-[#8ea0b0]">
                {employer.role} at {employer.company}, {formatPeriod(employer)}.
              </p>
            </section>
          ) : null}
          {project.technologies.length > 0 ? (
            <section>
              <h2 className="text-xl font-bold text-white">Technologies</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full bg-white/5 px-3 py-1 text-sm text-[#d5deea]">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {project.screenshot ? (
            <section>
              <h2 className="text-xl font-bold text-white">Screenshot</h2>
              <img
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                width={project.screenshot.width}
                height={project.screenshot.height}
                loading="lazy"
                decoding="async"
                className="mt-4 w-full rounded-2xl border border-white/10"
              />
            </section>
          ) : null}
          {project.completed ? (
            <section>
              <h2 className="text-xl font-bold text-white">What it does</h2>
              <p className="mt-3">{project.completed}</p>
            </section>
          ) : null}
          {project.links.length > 0 ? (
            <section>
              <h2 className="text-xl font-bold text-white">Links</h2>
              <ul className="mt-3 space-y-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-semibold underline-offset-4 hover:underline ${tone}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
