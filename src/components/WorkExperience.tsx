import { useState } from 'react';
import { motion } from 'motion/react';
import {
  employmentSummary,
  findPublicProject,
  formatPeriod,
  projectPath,
  publicExperiences,
} from '../data/siteContent';
import RouteLink from './RouteLink';
import { entranceInitial } from './entrance';

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

export default function WorkExperience({ flutter = false, fullstack = false }: { flutter?: boolean; fullstack?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const accent = flutter ? '#027DFD' : fullstack ? '#FF7A00' : '#00e5e5';
  const accentText = flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : 'text-[#00e5e5]';
  const summary = employmentSummary();
  const jobs = publicExperiences();

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative z-10 scroll-mt-24 border-t border-[#1a3038] bg-[#050b0e]">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.header
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
            ) : (
              <>
                Roles and <span className={accentText}>dates.</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c5d2de] sm:text-lg">
            {flutter
              ? 'Newest role first. Titles, locations, and dates come from the employment record.'
              : fullstack
                ? 'The same employment record, including the website and CRM work that sits with the mobile roles.'
                : 'Employers, official titles, and the work I can describe for each role.'}
          </p>
        </motion.header>

        <motion.div
          className="mt-8 rounded-2xl border border-white/10 bg-[#07141c] p-5 sm:p-7"
          style={{ borderLeftWidth: 3, borderLeftColor: accent }}
          initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.45 }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${accentText}`}>Confirmed employment</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{summary.label}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c5d2de] sm:text-base">{summary.detail}</p>
        </motion.div>

        <ol className="mt-6 space-y-4">
          {jobs.map((job, index) => (
            <motion.li
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
                {job.bullets.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#c5d2de] sm:text-base">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {job.related.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-white">Related contributions</p>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#c5d2de] sm:text-base">
                      {job.related.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {job.technologies.length > 0 ? (
                  <p className="mt-4 text-sm leading-relaxed text-[#d5deea]">
                    <span className="font-semibold text-white">Technologies: </span>
                    {job.technologies.join(', ')}
                  </p>
                ) : null}
                {job.projectIds.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.projectIds.map((id) => {
                      const project = findPublicProject(id);
                      if (!project) return null;
                      return (
                        <RouteLink
                          key={id}
                          href={projectPath(id)}
                          className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${accentText}`}
                          style={{ borderColor: accent }}
                        >
                          {project.title} case study
                        </RouteLink>
                      );
                    })}
                  </div>
                ) : null}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
