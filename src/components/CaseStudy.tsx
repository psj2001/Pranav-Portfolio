import { useState } from 'react';
import * as m from 'motion/react-m';
import { trackEvent } from '../analytics';
import Breadcrumb from './Breadcrumb';
import { entranceInitial } from './entrance';
import { accentForProduct, useSelectedView, ViewSwitch } from './ProjectCard';
import {
  contributionKindLabel,
  engagementLabel,
  findExperience,
  formatPeriod,
  projectPath,
  viewLabel,
} from '../data/siteContent';
import type { ProjectItem } from '../types';

function sameFact(left: string, right: string) {
  const words = (value: string) => new Set(value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter((word) => word.length > 3));
  const a = words(left);
  const b = words(right);
  if (a.size === 0 || b.size === 0) return false;
  let shared = 0;
  for (const word of a) if (b.has(word)) shared += 1;
  return shared / Math.min(a.size, b.size) >= 0.75;
}

function implementationLines(project: ProjectItem, employer: ReturnType<typeof findExperience>) {
  const lines: string[] = [];
  const add = (value?: string) => {
    const text = value?.trim().replace(/\s+/g, ' ');
    if (!text || lines.some((line) => sameFact(line, text))) return;
    lines.push(/[.!?]$/.test(text) ? text : `${text}.`);
  };
  for (const task of project.tasks) add(task);
  add(project.contribution);
  add(project.completed);
  if (project.technologies.length) add(`Published technologies: ${project.technologies.join(', ')}`);
  for (const item of employer?.related ?? []) add(item);
  if (employer) add(`${employer.role} at ${employer.company}, ${employer.location}, ${formatPeriod(employer)}`);
  for (const link of project.links) add(`${link.label}: ${link.href}`);
  return lines;
}

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

export default function CaseStudy({ project }: { project: ProjectItem }) {
  const reduced = usePrefersReducedMotion();
  const employer = project.experienceId ? findExperience(project.experienceId) : undefined;
  const { views, selected, setIndex } = useSelectedView(project);
  const types = views.map((view) => viewLabel(view));
  const accent = accentForProduct(project.productType);
  const tone =
    accent === 'flutter' ? 'text-[#027DFD]' : accent === 'fullstack' ? 'text-[#FF7A00]' : accent === 'marketing' ? 'text-[#FFD000]' : 'text-[#00e5e5]';
  return (
    <article className="relative z-10 scroll-mt-24 px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <m.div initial={entranceInitial(reduced, { opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Breadcrumb path={projectPath(project.id)} />
          <p className={`mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] ${tone}`}>
            {types.join(' · ')}
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
        </m.div>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-[#c5d2de]">
          <section>
            <h2 className="text-xl font-bold text-white">Overview</h2>
            <p className="mt-3">{project.summary}</p>
          </section>
          {project.problem ? (
            <section>
              <h2 className="text-xl font-bold text-white">Problem solved</h2>
              <p className="mt-3">{project.problem}</p>
            </section>
          ) : null}
          <section>
            <h2 className="text-xl font-bold text-white">Implementation</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {implementationLines(project, employer).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
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
              <p className="mt-3 text-sm text-[#8ea0b0]">No technology list is published for this project.</p>
            )}
          </section>
          <section>
            <h2 className="text-xl font-bold text-white">Screenshots and project links</h2>
            <div className="mt-4">
              <ViewSwitch
                views={views}
                selected={selected}
                onSelect={setIndex}
                className="border-white/20 bg-white/10 text-white"
              />
            </div>
            {selected.shots.length > 0 ? (
              <div className="mt-4 space-y-4">
                {selected.shots.map((shot) => (
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="w-full rounded-2xl border border-white/10"
                  />
                ))}
              </div>
            ) : selected.links.length === 0 ? (
              <p className="mt-3 text-sm text-[#8ea0b0]">
                {selected.type === 'website' ? 'Link not published yet.' : 'Screenshot not published yet.'}
              </p>
            ) : null}
            {selected.links.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {selected.links.map((link) => (
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
