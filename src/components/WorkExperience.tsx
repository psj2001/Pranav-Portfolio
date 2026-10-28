import { useState } from 'react';
import * as m from 'motion/react-m';
import {
  employmentSummary,
  findPublicProject,
  formatPeriod,
  projectPath,
  publicExperiences,
} from '../data/siteContent';
import { ROLE_ROUTES } from '../routes';
import type { ProjectItem } from '../types';
import RouteLink from './RouteLink';
import { entranceInitial } from './entrance';

type Focus = 'home' | 'flutter' | 'fullstack' | 'marketing';

function bulletKind(text: string) {
  const value = text.toLowerCase();
  const mobile = /flutter|android|ios|mobile|getx|provider|push notification|offline storage|google maps|application/.test(value);
  const web = /website|web application|frontend|backend|database|api integration|crm|dashboard|deployment/.test(value);
  const marketing = /marketing|social|\bseo\b|\bads\b/.test(value);
  return { mobile, web, marketing };
}

function showBullet(text: string, focus: Focus, jobHasWeb = false) {
  if (focus === 'home') return true;
  const kind = bulletKind(text);
  if (focus === 'marketing') return kind.marketing;
  if (focus === 'flutter') return kind.mobile || (!kind.web && !kind.marketing);
  if (kind.web) return true;
  if (kind.mobile || kind.marketing) return false;
  return jobHasWeb;
}

function projectFits(project: ProjectItem, focus: Focus) {
  if (focus === 'home') return true;
  if (focus === 'flutter') return project.productType === 'mobile-app';
  if (focus === 'fullstack') return project.productType === 'website' || project.productType === 'dashboard' || Boolean(project.alsoTypes?.includes('website'));
  return project.productType === 'marketing';
}

function englishList(items: string[]) {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, or ${items[items.length - 1]}`;
}

function QuietMarketingNote({ jobs }: { jobs: ReturnType<typeof publicExperiences> }) {
  const quiet = jobs.filter((job) => ![...job.bullets, ...job.related].some((item) => bulletKind(item).marketing));
  if (quiet.length === 0) return null;
  return (
    <p className="mt-6 text-sm leading-relaxed text-[#8ea0b0]">
      No marketing deliverable is published for {englishList(quiet.map((job) => job.company))}.
    </p>
  );
}

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

export default function WorkExperience({ flutter = false, fullstack = false, marketing = false }: { flutter?: boolean; fullstack?: boolean; marketing?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const focus: Focus = flutter ? 'flutter' : fullstack ? 'fullstack' : marketing ? 'marketing' : 'home';
  const accent = flutter ? '#027DFD' : fullstack ? '#FF7A00' : marketing ? '#FFD000' : '#00e5e5';
  const accentText = flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : marketing ? 'text-[#FFD000]' : 'text-[#00e5e5]';
  const summary = employmentSummary();
  const jobs = publicExperiences();

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative z-10 scroll-mt-24 border-t border-[#1a3038] bg-[#050b0e]">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
        <m.header
          className="max-w-3xl"
          initial={entranceInitial(reduced, { opacity: 0, y: 18 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${accentText}`}>Work experience</p>
          <h2 id="experience-heading" className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            {flutter ? (
              <>
                Flutter work <span className={accentText}>experience.</span>
              </>
            ) : fullstack ? (
              <>
                Website and dashboard <span className={accentText}>experience.</span>
              </>
            ) : marketing ? (
              <>
                Marketing and online <span className={accentText}>presence.</span>
              </>
            ) : (
              <>
                Roles and <span className={accentText}>dates.</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c5d2de] sm:text-lg">
            {flutter
              ? 'Newest role first. Titles, locations, and dates come from the employment record. Website work is linked from the role it belongs to.'
              : fullstack
                ? 'The same employers and dates, with the website, API, and dashboard work called out. Mobile work stays on the Flutter page.'
                : marketing
                  ? 'The same employers, titles, and dates. This page keeps the marketing sentence from the record instead of repeating the engineering bullets.'
                  : 'Employers, official titles, and the work I can describe for each role.'}
          </p>
          {marketing ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c5d2de]">
              The published marketing project is{' '}
              <RouteLink href={projectPath('choosemyfresh')} className={`font-semibold underline-offset-4 hover:underline ${accentText}`}>
                ChooseMy Fresh
              </RouteLink>
              . I created the website, managed its social media platforms, and worked on its website SEO.
            </p>
          ) : null}
        </m.header>

        <m.div
          className="mt-8 rounded-2xl border border-white/10 bg-[#07141c] p-5 sm:p-7"
          style={{ borderLeftWidth: 3, borderLeftColor: accent }}
          initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.45 }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${accentText}`}>Experience</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{summary.label}</p>
        </m.div>

        {marketing ? <QuietMarketingNote jobs={jobs} /> : null}

        <ol className="mt-6 space-y-4">
          {jobs.map((job, index) => (
            <m.li
              key={job.id}
              initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.45, delay: reduced ? 0 : index * 0.04 }}
            >
              <article className="rounded-2xl border border-white/10 bg-[#07141c] p-5 sm:p-7" style={{ borderLeftWidth: 3, borderLeftColor: accent }}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b0]">Employment</p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">{job.company}</h3>
                    <p className={`mt-1 text-base font-semibold ${accentText}`}>{job.role}</p>
                    <p className="mt-1 text-sm text-[#d5deea] sm:text-base">{job.location}</p>
                  </div>
                  <p className={`text-sm font-semibold sm:shrink-0 sm:text-right ${accentText}`}>{formatPeriod(job)}</p>
                </div>
                {(() => {
                  const jobHasWeb = [...job.bullets, ...job.related].some((item) => bulletKind(item).web);
                  const bullets = job.bullets.filter((bullet) => showBullet(bullet, focus, jobHasWeb));
                  const related = job.related.filter((item) => showBullet(item, focus, jobHasWeb));
                  const lines = [...job.bullets, ...job.related];
                  const hiddenWeb = focus === 'flutter' && lines.some((item) => bulletKind(item).web && !showBullet(item, 'flutter'));
                  const hiddenMobile = focus === 'fullstack' && lines.some((item) => bulletKind(item).mobile && !showBullet(item, 'fullstack'));
                  const hiddenMarketing =
                    (focus === 'flutter' || focus === 'fullstack') && lines.some((item) => bulletKind(item).marketing && !showBullet(item, focus));
                  const technologies = job.technologies.filter((tech) => showBullet(tech, focus));
                  const projects = job.projectIds.flatMap((id) => {
                    const project = findPublicProject(id);
                    if (!project || !projectFits(project, focus)) return [];
                    return [project];
                  });
                  return (
                    <>
                      {bullets.length > 0 ? (
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#c5d2de] sm:text-base">
                          {bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                      {related.length > 0 ? (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-white">Related contributions</p>
                          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#c5d2de] sm:text-base">
                            {related.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {hiddenWeb ? (
                        <p className="mt-4 text-sm leading-relaxed text-[#c5d2de]">
                          Website, API, and dashboard work from this role is on the{' '}
                          <RouteLink href={ROLE_ROUTES.fullstack.path} className={`font-semibold underline-offset-4 hover:underline ${accentText}`}>
                            full-stack developer
                          </RouteLink>{' '}
                          page.
                        </p>
                      ) : null}
                      {hiddenMobile ? (
                        <p className="mt-4 text-sm leading-relaxed text-[#c5d2de]">
                          Mobile application work from this role is on the{' '}
                          <RouteLink href={ROLE_ROUTES.flutter.path} className={`font-semibold underline-offset-4 hover:underline ${accentText}`}>
                            Flutter developer
                          </RouteLink>{' '}
                          page.
                        </p>
                      ) : null}
                      {hiddenMarketing ? (
                        <p className="mt-4 text-sm leading-relaxed text-[#c5d2de]">
                          Marketing work from this role is on the{' '}
                          <RouteLink href={ROLE_ROUTES.marketing.path} className={`font-semibold underline-offset-4 hover:underline ${accentText}`}>
                            digital marketer
                          </RouteLink>{' '}
                          page.
                        </p>
                      ) : null}
                      {technologies.length > 0 ? (
                        <p className="mt-4 text-sm leading-relaxed text-[#d5deea]">
                          <span className="font-semibold text-white">Technologies: </span>
                          {technologies.join(', ')}
                        </p>
                      ) : null}
                      {projects.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {projects.map((project) => (
                            <RouteLink
                              key={project.id}
                              href={projectPath(project.id)}
                              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${accentText}`}
                              style={{ borderColor: accent }}
                            >
                              {project.title} case study
                            </RouteLink>
                          ))}
                        </div>
                      ) : null}
                    </>
                  );
                })()}
              </article>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
