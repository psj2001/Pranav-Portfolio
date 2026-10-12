import {
  contributionKindLabel,
  engagementLabel,
  productTypeLabel,
  projectPath,
} from '../data/siteContent';
import type { ProjectItem } from '../types';
import RouteLink from './RouteLink';

const accents = {
  home: {
    text: 'text-[#00e5e5]',
    border: 'border-[#00e5e5]/30',
    wash: 'bg-[#00e5e5]/10',
    button: 'text-[#04181c] bg-[#00e5e5] hover:bg-[#7af6f6]',
    link: 'text-[#9ff6f6]',
  },
  flutter: {
    text: 'text-[#027DFD]',
    border: 'border-[#027DFD]/35',
    wash: 'bg-[#027DFD]/10',
    button: 'text-white bg-[#027DFD] hover:bg-[#02569B]',
    link: 'text-[#9fd2ff]',
  },
  fullstack: {
    text: 'text-[#FF7A00]',
    border: 'border-[#FF7A00]/35',
    wash: 'bg-[#FF7A00]/10',
    button: 'text-[#1a1008] bg-[#FF7A00] hover:bg-[#E06800]',
    link: 'text-[#ffd0a8]',
  },
  marketing: {
    text: 'text-[#FFD000]',
    border: 'border-[#FFD000]/40',
    wash: 'bg-[#FFD000]/10',
    button: 'text-[#1a1404] bg-[#FFD000] hover:bg-[#E6BC00]',
    link: 'text-[#FFF4C2]',
  },
} as const;

export type ProjectAccent = keyof typeof accents;

export function accentForProduct(type: ProjectItem['productType']): ProjectAccent {
  if (type === 'mobile-app') return 'flutter';
  if (type === 'marketing') return 'marketing';
  if (type === 'dashboard' || type === 'website') return 'fullstack';
  return 'home';
}

export default function ProjectCard({ project, accent = 'home' }: { project: ProjectItem; accent?: ProjectAccent }) {
  const tone = accents[accent];

  return (
    <article id={`project-${project.id}`} className="scroll-mt-28 flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#07141c]">
      {project.screenshot ? (
        <img
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          width={project.screenshot.width}
          height={project.screenshot.height}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className={`flex aspect-video flex-col justify-end border-b p-5 ${tone.border} ${tone.wash}`}>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone.text}`}>{productTypeLabel(project.productType)}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">{project.title}</h3>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {[project.productType, ...(project.alsoTypes ?? [])].map((type) => (
            <span key={type} className={`rounded-full border px-3 py-1 text-xs font-semibold ${tone.border} ${tone.text}`}>
              {productTypeLabel(type)}
            </span>
          ))}
          {project.engagement ? (
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-[#d5deea]">
              {engagementLabel(project.engagement)}
            </span>
          ) : null}
          {project.contributionKind ? (
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-[#d5deea]">
              {contributionKindLabel(project.contributionKind)}
            </span>
          ) : null}
        </div>
        {project.screenshot ? <h3 className="mt-4 text-xl font-bold tracking-tight text-white">{project.title}</h3> : null}
        <p className="mt-4 text-sm leading-relaxed text-[#c5d2de] sm:text-base">{project.summary}</p>
        {project.contribution ? <p className="mt-3 text-sm leading-relaxed text-[#d5deea] sm:text-base">{project.contribution}</p> : null}
        {project.technologies.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#d5deea]">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <RouteLink
            href={projectPath(project.id)}
            className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${tone.button}`}
          >
            View case study
          </RouteLink>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${tone.link}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
