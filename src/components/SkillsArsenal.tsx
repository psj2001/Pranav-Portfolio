import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Layers,
  MessageCircle,
  Puzzle,
  Search,
  Share2,
  Shuffle,
  Unplug,
  Users,
  Workflow,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { SimpleIcon } from 'simple-icons';
import {
  siAndroid,
  siAndroidstudio,
  siAnimedotjs,
  siClaudecode,
  siCss,
  siCursor,
  siDart,
  siDocker,
  siExpress,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGoogleads,
  siGoogleanalytics,
  siGooglesearchconsole,
  siGoogletagmanager,
  siHtml5,
  siIos,
  siJavascript,
  siMeta,
  siModelcontextprotocol,
  siMongodb,
  siMysql,
  siNodedotjs,
  siPostman,
  siReact,
  siSemrush,
  siTailwindcss,
  siWhatsapp,
  siWordpress,
} from 'simple-icons';
import { skillCategoriesFor, type ContentRole } from '../data/siteContent';
import type { SkillItem, SkillOutline } from '../types';

const easeOut = [0.22, 1, 0.36, 1] as const;

const brands: Record<string, SimpleIcon> = {
  android: siAndroid,
  androidstudio: siAndroidstudio,
  animedotjs: siAnimedotjs,
  claudecode: siClaudecode,
  css: siCss,
  cursor: siCursor,
  dart: siDart,
  docker: siDocker,
  express: siExpress,
  figma: siFigma,
  firebase: siFirebase,
  flutter: siFlutter,
  git: siGit,
  github: siGithub,
  googleads: siGoogleads,
  googleanalytics: siGoogleanalytics,
  googlesearchconsole: siGooglesearchconsole,
  googletagmanager: siGoogletagmanager,
  html5: siHtml5,
  ios: siIos,
  javascript: siJavascript,
  meta: siMeta,
  modelcontextprotocol: siModelcontextprotocol,
  mongodb: siMongodb,
  mysql: siMysql,
  nodedotjs: siNodedotjs,
  postman: siPostman,
  react: siReact,
  semrush: siSemrush,
  tailwindcss: siTailwindcss,
  whatsapp: siWhatsapp,
  wordpress: siWordpress,
};

const outlines: Record<SkillOutline, LucideIcon> = {
  api: Unplug,
  llm: Bot,
  rag: Layers,
  agent: Workflow,
  seo: Search,
  social: Share2,
  team: Users,
  problem: Puzzle,
  communication: MessageCircle,
  adapt: Shuffle,
};

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

function isDarkBrand(hex: string) {
  const value = Number.parseInt(hex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance < 0.22;
}

function SkillMark({ skill, flutter = false, fullstack = false, marketing = false }: { skill: SkillItem; flutter?: boolean; fullstack?: boolean; marketing?: boolean }) {
  if (skill.mark.kind === 'brand') {
    const icon = brands[skill.mark.slug];
    if (!icon) {
      return <Monogram letters={skill.name.slice(0, 2)} flutter={flutter} fullstack={fullstack} marketing={marketing} />;
    }
    const plate = isDarkBrand(icon.hex);
    return (
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center ${plate ? 'rounded-lg bg-[#f4f7f8]' : ''}`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" preserveAspectRatio="xMidYMid meet">
          <path d={icon.path} fill={`#${icon.hex}`} />
        </svg>
      </span>
    );
  }

  if (skill.mark.kind === 'outline') {
    const Icon = outlines[skill.mark.icon];
    return (
      <span aria-hidden="true" className={`flex h-9 w-9 items-center justify-center ${flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : marketing ? 'text-[#FFD000]' : 'text-[#00e5e5]'}`}>
        <Icon size={22} strokeWidth={1.75} />
      </span>
    );
  }

  return <Monogram letters={skill.mark.letters} flutter={flutter} fullstack={fullstack} marketing={marketing} />;
}

function Monogram({ letters, flutter = false, fullstack = false, marketing = false }: { letters: string; flutter?: boolean; fullstack?: boolean; marketing?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 items-center justify-center rounded-lg border bg-[#0c1c24] font-display font-semibold tracking-wide text-[#d7e4ee] ${
        flutter ? 'border-[#027DFD]/35' : fullstack ? 'border-[#FF7A00]/35' : marketing ? 'border-[#FFD000]/35' : 'border-[#00e5e5]/35'
      } ${
        letters.length > 2 ? 'text-[9px]' : 'text-[11px]'
      }`}
    >
      {letters}
    </span>
  );
}

interface SkillsArsenalProps {
  surface?: 'home' | ContentRole;
  categoryIds?: string[];
  flutter?: boolean;
  fullstack?: boolean;
  marketing?: boolean;
}

export default function SkillsArsenal({ surface = 'home', categoryIds, flutter = false, fullstack = false, marketing = false }: SkillsArsenalProps) {
  const reduced = usePrefersReducedMotion();
  const source = skillCategoriesFor(surface);
  const categories = categoryIds
    ? categoryIds.map((id) => source.find((category) => category.id === id)).filter((category) => category !== undefined)
    : source;
  const primary = categories.filter((category) => category.variant !== 'tools');
  const toolGroups = categories.filter((category) => category.variant === 'tools');
  const accent = flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : marketing ? 'text-[#FFD000]' : 'text-[#00e5e5]';

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <motion.header
          className="skills-reveal max-w-3xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${accent}`}>
            My toolkit
          </p>
          <h2
            id="skills-heading"
            className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
          >
            Skills & <span className={accent}>tools.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c5d2de] sm:text-lg">
            {marketing
              ? 'Social content and the website skills that support landing pages, tracking, and site updates.'
              : 'The skills used on the work described on this page.'}
          </p>
        </motion.header>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {primary.map((category, categoryIndex) => (
            <motion.article
              key={category.id}
              aria-labelledby={`skills-${category.id}`}
              className={`skills-reveal rounded-2xl border bg-[#07141c] p-5 transition-[border-color,box-shadow] duration-300 sm:p-6 ${
                flutter
                  ? 'border-[#027DFD]/35 shadow-[0_0_22px_rgba(2,125,253,0.08)] hover:border-[#027DFD] hover:shadow-[0_0_28px_rgba(2,125,253,0.2)]'
                  : fullstack
                    ? 'border-[#FF7A00]/35 shadow-[0_0_22px_rgba(255,122,0,0.08)] hover:border-[#FF7A00] hover:shadow-[0_0_28px_rgba(255,122,0,0.2)]'
                    : marketing
                      ? 'border-[#FFD000]/35 shadow-[0_0_22px_rgba(255,208,0,0.08)] hover:border-[#FFD000] hover:shadow-[0_0_28px_rgba(255,208,0,0.2)]'
                      : 'border-[#00e5e5]/35 shadow-[0_0_22px_rgba(0,229,229,0.06)] hover:border-[#00e5e5] hover:shadow-[0_0_28px_rgba(0,229,229,0.16)]'
              } ${category.wide ? 'md:col-span-2 xl:col-span-3' : ''}`}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduced ? undefined : { y: -4 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.5, delay: reduced ? 0 : (categoryIndex % 3) * 0.08, ease: easeOut }}
            >
              <h3 id={`skills-${category.id}`} className="text-base font-semibold tracking-tight text-white">
                {category.title}
              </h3>
              {category.note ? <p className="mt-2 text-sm leading-relaxed text-[#c5d2de]">{category.note}</p> : null}
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill.name}
                    className={`skills-reveal flex w-[6.5rem] max-w-full flex-col items-center gap-2 rounded-xl border border-transparent px-1 py-1 text-center transition-[border-color,background-color] duration-300 hover:bg-[#0c1c24] ${
                      flutter ? 'hover:border-[#027DFD]/55' : fullstack ? 'hover:border-[#FF7A00]/55' : marketing ? 'hover:border-[#FFD000]/55' : 'hover:border-[#00e5e5]/55'
                    }`}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                    transition={{
                      duration: 0.4,
                      delay: reduced ? 0 : 0.12 + skillIndex * 0.05,
                      ease: easeOut,
                    }}
                  >
                    <SkillMark skill={skill} flutter={flutter} fullstack={fullstack} marketing={marketing} />
                    <span className="text-xs leading-4 text-[#c5d2de]">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
        {toolGroups.map((category) => (
          <div key={category.id} className="mt-8 rounded-2xl border border-white/10 bg-[#07141c] p-5 sm:p-6">
            <h3 className="text-base font-semibold text-white">{category.title}</h3>
            {category.note ? <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#c5d2de]">{category.note}</p> : null}
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li key={skill.name} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-[#d5deea]">
                  <SkillMark skill={skill} flutter={flutter} fullstack={fullstack} marketing={marketing} />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
