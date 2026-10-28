import { useState } from 'react';
import * as m from 'motion/react-m';
import { projectPath, profile } from '../data/siteContent';
import { ROLE_ROUTES } from '../routes';
import { entranceInitial } from './entrance';
import RouteLink from './RouteLink';

const easeOut = [0.22, 1, 0.36, 1] as const;

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Availability', value: profile.availability },
  {
    label: 'Education',
    value: 'B.Com, Calicut University',
  },
];

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

export default function AboutMe({ variant = 'home' }: { variant?: 'home' | 'flutter' | 'fullstack' | 'marketing' }) {
  const reduced = usePrefersReducedMotion();
  const accent =
    variant === 'flutter'
      ? 'text-[#027DFD]'
      : variant === 'fullstack'
        ? 'text-[#FF7A00]'
        : variant === 'marketing'
          ? 'text-[#FFD000]'
          : 'text-[#00e5e5]';

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 scroll-mt-24 border-t border-white/10 bg-black"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
        <m.header
          className="about-reveal"
          initial={entranceInitial(reduced, { opacity: 0, y: 20 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${accent}`}>
            About me
          </p>
          <h2
            id="about-heading"
            className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
          >
            {variant === 'flutter' ? (
              <>
                I build apps for <span className={accent}>Android and iOS.</span>
              </>
            ) : variant === 'fullstack' ? (
              <>
                I build websites and <span className={accent}>the systems behind them.</span>
              </>
            ) : variant === 'marketing' ? (
              <>
                I help brands reach <span className={accent}>the right audience.</span>
              </>
            ) : (
              <>
                I build products and <span className={accent}>help brands grow.</span>
              </>
            )}
          </h2>
        </m.header>

        <m.div
          className="about-reveal mt-6 space-y-4 text-base leading-relaxed text-[#a7b5c5] sm:text-lg"
          initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.55, delay: reduced ? 0 : 0.08, ease: easeOut }}
        >
          {variant === 'flutter' ? (
            <>
              <p>
                I build and maintain Flutter apps for Android and iOS. The work includes API integration, state management, maintenance, and taking a build through release.
              </p>
              <p>
                I connect the app to the services it needs, handle loading and error states, and keep the code understandable when the requirements change.
              </p>
            </>
          ) : variant === 'fullstack' ? (
            <>
              <p>
                I build websites, dashboards, and the APIs behind them. The public work I can point to uses React, Node.js, Express, and MongoDB on{' '}
                <RouteLink href={projectPath('crm-falcon')} className={`font-semibold underline-offset-4 hover:underline ${accent}`}>
                  CRM Falcon Force
                </RouteLink>
                .
              </p>
              <p>
                That includes the screens people use and the endpoints those screens call. I keep the two sides aligned so a change in the product is a change in the system, not only in the page.
              </p>
            </>
          ) : variant === 'marketing' ? (
            <>
              <p>
                I created the{' '}
                <RouteLink href={projectPath('choosemyfresh')} className={`font-semibold underline-offset-4 hover:underline ${accent}`}>
                  ChooseMy Fresh
                </RouteLink>{' '}
                website, managed its social media platforms, and worked on its website SEO.
              </p>
              <p>
                I also work on social content, SEO, and ads, including Meta Ads, Google Ads, and WhatsApp automation.
              </p>
            </>
          ) : (
            <>
              <p>
                I’m {profile.name}, based in {profile.location}. I build and maintain{' '}
                <RouteLink href={ROLE_ROUTES.flutter.path} className={`font-semibold underline-offset-4 hover:underline ${accent}`}>
                  apps for Android and iOS
                </RouteLink>
                , and I build{' '}
                <RouteLink href={ROLE_ROUTES.fullstack.path} className={`font-semibold underline-offset-4 hover:underline ${accent}`}>
                  websites and dashboards
                </RouteLink>{' '}
                that sit with them.
              </p>
              <p>
                I also do{' '}
                <RouteLink href={ROLE_ROUTES.marketing.path} className={`font-semibold underline-offset-4 hover:underline ${accent}`}>
                  digital marketing
                </RouteLink>{' '}
                work: social content, website updates, and website SEO. For{' '}
                <RouteLink href={projectPath('choosemyfresh')} className={`font-semibold underline-offset-4 hover:underline ${accent}`}>
                  ChooseMy Fresh
                </RouteLink>
                , I created the website, managed its social media platforms, and worked on its website SEO. {profile.availability}.
              </p>
            </>
          )}
        </m.div>

        {variant === 'home' ? (
          <m.dl
            className="about-reveal mt-10 grid gap-4 sm:grid-cols-3"
            initial={entranceInitial(reduced, { opacity: 0, y: 16 })}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.16, ease: easeOut }}
          >
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-white/15 pt-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea0b0]">{fact.label}</dt>
                <dd className="mt-2 whitespace-pre-line text-sm leading-snug text-white sm:text-[15px]">{fact.value}</dd>
              </div>
            ))}
          </m.dl>
        ) : null}
      </div>
    </section>
  );
}
