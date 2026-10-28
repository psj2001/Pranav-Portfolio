import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import * as m from 'motion/react-m';
import { animate } from 'animejs/animation';
import { createDrawable } from 'animejs/svg';
import flutterIcon from '../portfolio-hero-assets/flutter-icon.svg';
import fullStackIcon from '../portfolio-hero-assets/full-stack-icon.svg';
import marketingIcon from '../portfolio-hero-assets/digital-marketing-icon.svg';
import { trackEvent } from '../analytics';
import { profile } from '../data/siteContent';
import { ROLE_ROUTES, toPublicPath } from '../routes';
import Breadcrumb from './Breadcrumb';
import { entranceInitial } from './entrance';
import { followRoute } from './RouteLink';
import '../portfolio-hero-assets/design-tokens.css';

interface HeroProps {
  onNavigate: (id: string) => void;
  flutter?: boolean;
  fullstack?: boolean;
  marketing?: boolean;
}

const rise = {
  duration: 0.55,
  ease: 'easeOut' as const,
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

const services = [
  {
    icon: flutterIcon,
    role: 'Flutter Developer',
    path: ROLE_ROUTES.flutter.path,
  },
  {
    icon: fullStackIcon,
    role: 'Full Stack Developer',
    path: ROLE_ROUTES.fullstack.path,
  },
  {
    icon: marketingIcon,
    role: 'Digital Marketer',
    path: ROLE_ROUTES.marketing.path,
  },
];

export default function Hero({ onNavigate, flutter = false, fullstack = false, marketing = false }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const ruleRef = useRef<SVGPathElement>(null);
  const cvHref = flutter ? profile.cvs.flutter : fullstack ? profile.cvs.fullstack : marketing ? profile.cvs.marketing : null;

  useLayoutEffect(() => {
    const rule = ruleRef.current;
    if (!rule) return;
    if (reduced) {
      createDrawable(rule)[0]?.setAttribute('draw', '0 1');
      return;
    }
    const drawable = createDrawable(rule)[0];
    if (drawable) drawable.setAttribute('draw', '0 0');
    const ruleDraw = drawable
      ? animate(drawable, {
          draw: ['0 0', '0 1'],
          duration: 650,
          ease: 'inOutQuad',
        })
      : null;
    return () => {
      ruleDraw?.cancel();
    };
  }, [reduced, flutter, fullstack, marketing]);

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-[#050b0e]">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${
          flutter
            ? 'bg-[radial-gradient(ellipse_at_72%_32%,rgba(2,125,253,0.18),transparent_46%)]'
            : fullstack
              ? 'bg-[radial-gradient(ellipse_at_72%_32%,rgba(255,122,0,0.16),transparent_46%)]'
              : marketing
                ? 'bg-[radial-gradient(ellipse_at_72%_32%,rgba(255,208,0,0.16),transparent_46%)]'
                : 'bg-[radial-gradient(ellipse_at_72%_32%,rgba(0,229,229,0.14),transparent_46%)]'
        }`}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-8 pt-28 lg:px-8 lg:pt-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
          <div className="max-w-xl">
            {flutter || fullstack || marketing ? (
              <div className="mb-5">
                <Breadcrumb
                  path={flutter ? ROLE_ROUTES.flutter.path : fullstack ? ROLE_ROUTES.fullstack.path : ROLE_ROUTES.marketing.path}
                />
              </div>
            ) : null}
            <m.p
              className="hero-reveal text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a7b5c5] sm:text-xs"
              initial={entranceInitial(reduced, { opacity: 0, y: 18 })}
              animate={{ opacity: 1, y: 0 }}
              transition={rise}
            >
              {flutter
                ? 'Flutter Developer • Android & iOS'
                : fullstack
                  ? 'Full-stack developer • React and Node.js'
                  : marketing
                    ? 'Digital marketing and websites'
                    : 'Developer & Digital Marketer'}
            </m.p>

            <m.h1
              className="hero-reveal mt-5 font-sans text-[clamp(2.7rem,4.5vw,4.35rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white"
              initial={entranceInitial(reduced, { opacity: 0, y: 18 })}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...rise, delay: 0.08 }}
            >
              {flutter ? (
                <>
                  Mobile App
                  <br />
                  Developer
                  <br />
                  <span className="text-[#027DFD]">in Dubai</span>
                </>
              ) : fullstack ? (
                <>
                  Full Stack
                  <br />
                  Web Developer
                  <br />
                  <span className="text-[#FF7A00]">in Dubai</span>
                </>
              ) : marketing ? (
                <>
                  Digital Marketing
                  <br />
                  Specialist
                  <br />
                  <span className="text-[#FFD000]">in Dubai</span>
                </>
              ) : (
                <>
                  I build apps.
                  <br />
                  Create websites.
                  <br />
                  <span className="text-[#00e5e5]">Grow brands.</span>
                </>
              )}
            </m.h1>

            <m.p
              className="hero-reveal mt-6 max-w-md text-base leading-relaxed text-[#a7b5c5] sm:text-[17px]"
              initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...rise, delay: 0.16 }}
            >
              {flutter
                ? 'I’m Pranav P S. I build and maintain Flutter apps for Android and iOS, including API integration, state management, and releases.'
                : fullstack
                  ? 'I’m Pranav P S. I build websites, dashboards, and the APIs behind them with React and Node.js.'
                  : marketing
                    ? 'I’m Pranav P S. I work on social content and website updates, and I can change the pages that support that work.'
                    : 'Hi, I’m Pranav P S. I build mobile apps and websites, and I work on the digital marketing around them.'}
            </m.p>

            <m.div
              className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...rise, delay: 0.32 }}
            >
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] ${
                  flutter
                    ? 'bg-[#027DFD] text-white hover:bg-[#02569B]'
                    : fullstack
                      ? 'bg-[#FF7A00] text-[#1a1008] hover:bg-[#E06800]'
                      : marketing
                        ? 'bg-[#FFD000] text-[#1a1404] hover:bg-[#E6BC00]'
                        : 'bg-[#00e5e5] text-[#04181c] hover:bg-[#7af6f6]'
                }`}
              >
                View projects
                <ArrowRight size={18} />
              </button>
              {cvHref ? (
                <a
                  href={cvHref}
                  download
                  onClick={() =>
                    trackEvent('cv_download', {
                      cv_role: flutter ? 'flutter' : fullstack ? 'fullstack' : 'marketing',
                    })
                  }
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[15px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    flutter ? 'border-[#027DFD]' : fullstack ? 'border-[#FF7A00]' : 'border-[#FFD000]'
                  }`}
                >
                  Download CV
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[15px] font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] ${
                  flutter
                    ? 'border-[#1d4e8f] hover:border-[#027DFD] hover:text-[#027DFD]'
                    : fullstack
                      ? 'border-[#8a4e1a] hover:border-[#FF7A00] hover:text-[#FF7A00]'
                      : marketing
                        ? 'border-[#8a7018] hover:border-[#FFD000] hover:text-[#FFD000]'
                        : 'border-[#3c5963] hover:border-[#00e5e5] hover:text-[#00e5e5]'
                }`}
              >
                Get in touch
                <ArrowRight size={18} />
              </button>
            </m.div>
          </div>

          <m.div
            className="hero-reveal relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:max-w-[500px] lg:mr-16"
            initial={entranceInitial(reduced, { opacity: 0, y: 20 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[18%] z-0 aspect-square w-[145%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: flutter
                  ? 'radial-gradient(circle, rgba(2,125,253,0.72) 0%, rgba(2,86,155,0.5) 36%, rgba(19,185,253,0.18) 58%, transparent 74%)'
                  : fullstack
                    ? 'radial-gradient(circle, rgba(255,122,0,0.72) 0%, rgba(224,104,0,0.5) 36%, rgba(255,160,60,0.18) 58%, transparent 74%)'
                    : marketing
                      ? 'radial-gradient(circle, rgba(255,208,0,0.7) 0%, rgba(230,188,0,0.48) 36%, rgba(255,208,0,0.16) 58%, transparent 74%)'
                      : 'radial-gradient(circle, rgba(0,229,229,0.7) 0%, rgba(0,214,218,0.48) 36%, rgba(0,190,200,0.18) 58%, transparent 74%)',
              }}
            />
            <picture className="relative z-10 block w-full">
              <source
                type="image/avif"
                srcSet="/images/pranav-portrait-640.avif 640w, /images/pranav-portrait-800.avif 800w, /images/pranav-portrait-1088.avif 1088w"
                sizes="(min-width: 1024px) 500px, min(520px, calc(100vw - 3rem))"
              />
              <source
                type="image/webp"
                srcSet="/images/pranav-portrait-640.webp 640w, /images/pranav-portrait-800.webp 800w, /images/pranav-portrait-1088.webp 1088w"
                sizes="(min-width: 1024px) 500px, min(520px, calc(100vw - 3rem))"
              />
              <img
                src="/images/pranav-portrait-1088.webp"
                srcSet="/images/pranav-portrait-640.webp 640w, /images/pranav-portrait-800.webp 800w, /images/pranav-portrait-1088.webp 1088w"
                sizes="(min-width: 1024px) 500px, min(520px, calc(100vw - 3rem))"
                alt="Portrait of Pranav P S"
                width={1088}
                height={1445}
                fetchPriority="high"
                className="w-full object-contain"
              />
            </picture>
            {flutter || fullstack || marketing ? null : (
              <div className="relative z-20 mt-3 lg:absolute lg:bottom-[7%] lg:right-[-3.5rem] lg:mt-0">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="mb-2 block h-[2px] w-7"
                  viewBox="0 0 28 2"
                >
                  <path ref={ruleRef} d="M 0 1 H 28" fill="none" stroke={fullstack ? '#FF7A00' : '#00e5e5'} strokeWidth="2" />
                </svg>
                <p className="text-sm font-bold text-white">Pranav P S</p>
                <p className="text-sm text-[#a7b5c5]">Code. Create. Grow.</p>
              </div>
            )}
          </m.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#1a3038] bg-[#04090c]">
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 lg:flex-row lg:items-stretch lg:px-6 lg:py-0">
          <m.div
            className="hero-reveal flex items-center px-2 py-3 lg:w-[230px] lg:shrink-0 lg:border-r lg:border-[#1a3038] lg:pr-6"
            initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...rise, delay: 0.4 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8ea0b0]">
              What can I help you with?
            </p>
          </m.div>

          <div className="grid flex-1 sm:grid-cols-3">
            {services.map((service, index) => (
              <m.a
                key={service.role}
                href={toPublicPath(service.path)}
                onClick={(event) => followRoute(event, service.path)}
                className={`hero-reveal group flex items-center gap-3 px-3 py-3 text-left transition hover:bg-white/[0.03] sm:px-5 ${
                  index > 0 ? 'sm:border-l sm:border-[#1a3038]' : ''
                }`}
                initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...rise, delay: 0.46 + index * 0.08 }}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                    flutter ? 'border-[#027DFD]/40 bg-[#027DFD]/[0.08]' : fullstack ? 'border-[#FF7A00]/40 bg-[#FF7A00]/[0.08]' : marketing ? 'border-[#FFD000]/40 bg-[#FFD000]/[0.08]' : 'border-[#00e5e5]/40 bg-[#00e5e5]/[0.06]'
                  }`}
                >
                  <img src={service.icon} alt="" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] leading-tight text-[#8ea0b0]">Hire me as a</span>
                  <span className="mt-0.5 block text-[15px] font-semibold leading-tight text-white">
                    {service.role}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className={`ml-auto shrink-0 text-[#8ea0b0] transition group-hover:translate-x-0.5 ${
                    flutter ? 'group-hover:text-[#027DFD]' : fullstack ? 'group-hover:text-[#FF7A00]' : marketing ? 'group-hover:text-[#FFD000]' : 'group-hover:text-[#00e5e5]'
                  }`}
                />
              </m.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
