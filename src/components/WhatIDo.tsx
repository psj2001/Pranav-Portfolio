import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, AppWindow, Megaphone, Smartphone, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { createTimeline } from 'animejs/timeline';
import { createDrawable } from 'animejs/svg';
import { siShopify } from 'simple-icons';
import { SHOPIFY_ROUTE } from '../routes';
import { shouldPlayEntrance } from './entrance';
import RouteLink from './RouteLink';
import type { Timeline } from 'animejs';

interface WhatIDoProps {
  onNavigate: (id: string) => void;
}

type ProjectFilter = 'all' | 'mobile-app' | 'website' | 'dashboard' | 'marketing';

interface Service {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  project: { filter: ProjectFilter; anchor: string } | null;
}

const services: Service[] = [
  {
    number: '01',
    title: 'Digital marketing',
    description: 'Social content, website updates, and website SEO, including the ChooseMy Fresh website.',
    tags: ['ChooseMy Fresh', 'Social media', 'Website SEO'],
    icon: Megaphone,
    project: { filter: 'marketing', anchor: 'projects' },
  },
  {
    number: '02',
    title: 'Websites',
    description: 'Pages and landing pages, including the updates after they go live.',
    tags: ['Websites', 'Landing pages'],
    icon: AppWindow,
    project: { filter: 'website', anchor: 'projects' },
  },
  {
    number: '03',
    title: 'Dashboards',
    description: 'The CRM for Falcon Force Academy: clients, staff, salaries, expenses, income, and payment orders.',
    tags: ['Clients', 'Staff', 'Expenses'],
    icon: Users,
    project: { filter: 'dashboard', anchor: 'project-crm-falcon' },
  },
  {
    number: '04',
    title: 'Mobile apps',
    description: 'Flutter apps for Android and iOS.',
    tags: ['Flutter', 'Android', 'iOS'],
    icon: Smartphone,
    project: { filter: 'mobile-app', anchor: 'projects' },
  },
];

interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
  cx: number;
  cy: number;
}

interface Route {
  d: string;
  arrow: string;
}

const ARROW = 8;
const RADIUS = 12;

function roundedElbow(x1: number, y1: number, x2: number, y2: number) {
  const dirX = Math.sign(x2 - x1) || 1;
  const dirY = Math.sign(y2 - y1) || 1;
  const midX = x1 + (x2 - x1) / 2;
  const radius = Math.min(RADIUS, Math.abs(x2 - x1) / 2 - 1, Math.abs(y2 - y1) / 2);
  if (radius < 3 || Math.abs(y2 - y1) < 6) {
    return `M ${x1} ${y1} H ${x2}`;
  }
  return [
    `M ${x1} ${y1}`,
    `H ${midX - dirX * radius}`,
    `Q ${midX} ${y1} ${midX} ${y1 + dirY * radius}`,
    `V ${y2 - dirY * radius}`,
    `Q ${midX} ${y2} ${midX + dirX * radius} ${y2}`,
    `H ${x2}`,
  ].join(' ');
}

function verticalDrop(x1: number, y1: number, x2: number, y2: number) {
  const dirX = Math.sign(x2 - x1) || 1;
  const dirY = y2 >= y1 ? 1 : -1;
  const midY = (y1 + y2) / 2;
  const radius = Math.min(RADIUS, Math.abs(y2 - y1) / 4, Math.abs(x2 - x1) / 2 - 1);
  if (Math.abs(x2 - x1) < 8) return `M ${x1} ${y1} V ${y2}`;
  if (radius < 3) return `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;
  return [
    `M ${x1} ${y1}`,
    `V ${midY - dirY * radius}`,
    `Q ${x1} ${midY} ${x1 + dirX * radius} ${midY}`,
    `H ${x2 - dirX * radius}`,
    `Q ${x2} ${midY} ${x2} ${midY + dirY * radius}`,
    `V ${y2}`,
  ].join(' ');
}

function arrowPath(x: number, y: number, direction: 'right' | 'down') {
  const size = 7;
  if (direction === 'right') {
    return `M ${x - size} ${y - 4.5} L ${x} ${y} L ${x - size} ${y + 4.5}`;
  }
  return `M ${x - 4.5} ${y - size} L ${x} ${y} L ${x + 4.5} ${y - size}`;
}

function linkBoxes(from: Box, to: Box): Route {
  const horizontalGap = to.left - from.right;
  if (horizontalGap > 12) {
    const endX = to.left - 1;
    return {
      d: roundedElbow(from.right, from.cy, endX - ARROW, to.cy),
      arrow: arrowPath(endX, to.cy, 'right'),
    };
  }

  const endY = to.top - 1;
  return {
    d: verticalDrop(from.cx, from.bottom, to.cx, endY - ARROW),
    arrow: arrowPath(to.cx, endY, 'down'),
  };
}

function boxFrom(card: HTMLElement, origin: DOMRect): Box {
  const rect = card.getBoundingClientRect();
  return {
    left: rect.left - origin.left,
    right: rect.right - origin.left,
    top: rect.top - origin.top,
    bottom: rect.bottom - origin.top,
    cx: rect.left - origin.left + rect.width / 2,
    cy: rect.top - origin.top + rect.height / 2,
  };
}

export default function WhatIDo({ onNavigate }: WhatIDoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const wrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const arrowRefs = useRef<Array<SVGPathElement | null>>([]);

  const openProjects = (filter: ProjectFilter, anchor: string) => {
    window.dispatchEvent(new CustomEvent('portfolio-project-filter', { detail: filter }));
    const started = performance.now();
    let previous = Number.NaN;
    let stableFrames = 0;

    const settleThenScroll = () => {
      const target = document.getElementById(anchor);
      if (!target) {
        if (performance.now() - started > 700) onNavigate('projects');
        else requestAnimationFrame(settleThenScroll);
        return;
      }
      const top = target.getBoundingClientRect().top;
      stableFrames = Math.abs(top - previous) < 0.5 ? stableFrames + 1 : 0;
      previous = top;
      if (stableFrames >= 3 || performance.now() - started > 700) onNavigate(anchor);
      else requestAnimationFrame(settleThenScroll);
    };

    requestAnimationFrame(settleThenScroll);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const board = boardRef.current;
    if (!section || !board) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = media.matches || !shouldPlayEntrance();
    let started = false;
    let finished = false;
    let timeline: Timeline | null = null;

    const revealNodes = () =>
      [introRef.current, ...wrapRefs.current].filter((node): node is HTMLElement => Boolean(node));

    const paintConnectors = (visible: boolean) => {
      const origin = board.getBoundingClientRect();
      const boxes = cardRefs.current.map((card) => (card ? boxFrom(card, origin) : null));
      for (let index = 0; index < boxes.length - 1; index += 1) {
        const from = boxes[index];
        const to = boxes[index + 1];
        const path = pathRefs.current[index];
        const arrow = arrowRefs.current[index];
        if (!from || !to || !path || !arrow || from.right <= 0 || to.right <= 0) continue;
        const route = linkBoxes(from, to);
        path.setAttribute('d', route.d);
        arrow.setAttribute('d', route.arrow);
        const drawable = createDrawable(path)[0];
        drawable?.setAttribute('draw', visible ? '0 1' : '0 0');
        arrow.style.opacity = visible ? '1' : '0';
      }
    };

    const setReveal = (hidden: boolean) => {
      revealNodes().forEach((node) => {
        node.style.opacity = hidden ? '0' : '1';
        node.style.transform = hidden ? 'translateY(20px)' : 'none';
      });
    };

    if (reduced) {
      setReveal(false);
      paintConnectors(true);
      finished = true;
    } else {
      setReveal(true);
      paintConnectors(false);
    }

    const fallback = window.setTimeout(() => {
      if (finished) return;
      timeline?.cancel();
      started = true;
      finished = true;
      setReveal(false);
      paintConnectors(true);
    }, 2500);

    const play = () => {
      if (started || reduced) return;
      started = true;
      try {
      paintConnectors(false);

      const intro = introRef.current;
      const cards = wrapRefs.current.filter((node): node is HTMLDivElement => Boolean(node));
      const paths = pathRefs.current.filter((node): node is SVGPathElement => Boolean(node?.getAttribute('d')));
      const arrows = arrowRefs.current.filter((node): node is SVGPathElement => Boolean(node?.getAttribute('d')));
      if (!intro || cards.length !== 4 || paths.length !== 3 || arrows.length !== 3) {
        setReveal(false);
        paintConnectors(true);
        finished = true;
        return;
      }

      const drawables = paths.map((path) => createDrawable(path)[0]).filter(Boolean);
      const tl = createTimeline({ defaults: { ease: 'outCubic' } });
      tl.add(intro, { opacity: [0, 1], y: [20, 0], duration: 500 }, 0);
      tl.add(cards[0], { opacity: [0, 1], y: [18, 0], duration: 440 }, 260);
      tl.add(drawables[0], { draw: ['0 0', '0 1'], duration: 380, ease: 'inOutQuad' }, 620);
      tl.add(arrows[0], { opacity: [0, 1], duration: 160, ease: 'outQuad' }, 880);
      tl.add(cards[1], { opacity: [0, 1], y: [18, 0], duration: 420 }, 960);
      tl.add(drawables[1], { draw: ['0 0', '0 1'], duration: 360, ease: 'inOutQuad' }, 1280);
      tl.add(arrows[1], { opacity: [0, 1], duration: 150, ease: 'outQuad' }, 1500);
      tl.add(cards[2], { opacity: [0, 1], y: [18, 0], duration: 380 }, 1580);
      tl.add(drawables[2], { draw: ['0 0', '0 1'], duration: 340, ease: 'inOutQuad' }, 1860);
      tl.add(arrows[2], { opacity: [0, 1], duration: 140, ease: 'outQuad' }, 2060);
      tl.add(cards[3], { opacity: [0, 1], y: [18, 0], duration: 380 }, 2100);
      tl.then(() => {
        finished = true;
      });
      timeline = tl;
      } catch {
        setReveal(false);
        paintConnectors(true);
        finished = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    if (!reduced) observer.observe(section);

    const resizeObserver = new ResizeObserver(() => {
      if (reduced || finished) paintConnectors(true);
      else if (!started) paintConnectors(false);
      else {
        const origin = board.getBoundingClientRect();
        const boxes = cardRefs.current.map((card) => (card ? boxFrom(card, origin) : null));
        for (let index = 0; index < boxes.length - 1; index += 1) {
          const from = boxes[index];
          const to = boxes[index + 1];
          const path = pathRefs.current[index];
          const arrow = arrowRefs.current[index];
          if (!from || !to || !path || !arrow) continue;
          const route = linkBoxes(from, to);
          path.setAttribute('d', route.d);
          arrow.setAttribute('d', route.arrow);
        }
      }
    });
    resizeObserver.observe(board);

    const onMotionChange = () => {
      reduced = media.matches;
      if (!reduced) return;
      timeline?.cancel();
      started = true;
      finished = true;
      setReveal(false);
      paintConnectors(true);
      observer.disconnect();
    };
    media.addEventListener('change', onMotionChange);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
      resizeObserver.disconnect();
      media.removeEventListener('change', onMotionChange);
      timeline?.cancel();
    };
  }, []);

  return (
    <>
    <section
      id="what-i-do"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#1a3038] bg-[#050b0e]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,229,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,229,0.08)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_92%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div ref={introRef} className="what-i-do-reveal max-w-3xl">
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8ea0b0] sm:text-xs">
              What I do
            </p>
            <span aria-hidden="true" className="h-px w-12 bg-[#00e5e5]/80" />
          </div>
          <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            I build your <span className="text-[#00e5e5]">digital presence.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#a7b5c5] sm:text-lg">
            Websites, apps, dashboards, digital marketing, and Shopify.
          </p>
        </div>

        <div ref={boardRef} className="relative mt-14 md:mt-16">
          <svg
            aria-hidden="true"
            focusable="false"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
          >
            {[0, 1, 2].map((index) => (
              <g key={index}>
                <path
                  ref={(node) => {
                    pathRefs.current[index] = node;
                  }}
                  fill="none"
                  stroke="#00e5e5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  ref={(node) => {
                    arrowRefs.current[index] = node;
                  }}
                  fill="none"
                  stroke="#00e5e5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-14 md:gap-y-14 xl:grid-cols-4 xl:gap-x-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.number}
                  ref={(node) => {
                    wrapRefs.current[index] = node;
                  }}
                  className={`what-i-do-reveal ${index % 2 === 1 ? 'md:mt-16 xl:mt-24' : ''}`}
                >
                  <article
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className="flex min-h-[292px] flex-col rounded-2xl border border-[#00e5e5]/35 bg-[#07141c] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-1 hover:border-[#00e5e5] focus-within:-translate-y-1 focus-within:border-[#00e5e5] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00e5e5]/35 bg-[#00e5e5]/10 text-[#00e5e5]">
                        <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                      </span>
                      <span aria-hidden="true" className="font-mono text-xs tracking-[0.16em] text-[#00e5e5]/70">
                        {service.number}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#a7b5c5]">{service.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-[#00e5e5]/25 bg-[#00e5e5]/[0.06] px-2.5 py-1 text-[11px] text-[#d5f7f7]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {service.project && (
                      <button
                        type="button"
                        onClick={() => openProjects(service.project!.filter, service.project!.anchor)}
                        className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-semibold text-[#00e5e5] outline-none transition hover:gap-2.5 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00e5e5]"
                      >
                        View projects
                        <ArrowRight aria-hidden="true" size={15} />
                      </button>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="shopify-heading" className="relative z-10 border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-[auto_minmax(0,42rem)] md:justify-center md:gap-20 lg:px-8 lg:py-24">
        <svg role="img" aria-label="Shopify" viewBox="0 0 24 24" className="h-28 w-28 fill-white sm:h-36 sm:w-36 md:h-44 md:w-44">
          <path d={siShopify.path} />
        </svg>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00e5e5] sm:text-xs">
            Shopify
          </p>
          <h2
            id="shopify-heading"
            className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
          >
            Shopify websites and <span className="text-[#00e5e5]">mobile apps.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#a7b5c5] sm:text-lg">
            I build a Shopify store: theme, pages, products, and the updates after it goes live. I also turn an existing Shopify store into an iOS and Android app. The shop stays on Shopify.
          </p>
          <RouteLink
            href={SHOPIFY_ROUTE.path}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#00e5e5] px-5 text-sm font-semibold text-[#04181c] hover:bg-[#7af6f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            See details
          </RouteLink>
        </div>
      </div>
    </section>
    </>
  );
}
