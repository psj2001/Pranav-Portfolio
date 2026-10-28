import { useState } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import * as m from 'motion/react-m';
import { entranceInitial } from './entrance';
import { education, formatPeriod, training } from '../data/siteContent';

const easeOut = [0.22, 1, 0.36, 1] as const;

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

export default function Education({
  flutter = false,
  fullstack = false,
  marketing = false,
}: {
  flutter?: boolean;
  fullstack?: boolean;
  marketing?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const accentText = flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : marketing ? 'text-[#FFD000]' : 'text-[#00e5e5]';
  const border = flutter ? 'border-[#027DFD]/30' : fullstack ? 'border-[#FF7A00]/30' : marketing ? 'border-[#FFD000]/30' : 'border-[#00e5e5]/30';
  const icon = flutter
    ? 'border-[#027DFD]/25 bg-[#027DFD]/10 text-[#027DFD]'
    : fullstack
      ? 'border-[#FF7A00]/25 bg-[#FF7A00]/10 text-[#FF7A00]'
      : marketing
        ? 'border-[#FFD000]/25 bg-[#FFD000]/10 text-[#FFD000]'
        : 'border-[#00e5e5]/25 bg-[#00e5e5]/10 text-[#00e5e5]';

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative z-10 scroll-mt-24 border-t border-white/10 bg-black"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
        <m.header
          initial={entranceInitial(reduced, { opacity: 0, y: 20 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${accentText}`}>
            Education and training
          </p>
          <h2
            id="education-heading"
            className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl"
          >
            Study and <span className={accentText}>courses.</span>
          </h2>
        </m.header>

        <div className="mt-10 space-y-6">
          {education.map((item) => (
            <m.article
              key={item.credential}
              className={`border-t pt-6 ${border}`}
              initial={entranceInitial(reduced, { opacity: 0, y: 18 })}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.55, delay: reduced ? 0 : 0.08, ease: easeOut }}
            >
              <div className="flex items-start gap-4">
                <span className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${icon}`}>
                  <GraduationCap aria-hidden="true" size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <p className={`text-sm font-semibold ${accentText}`}>
                    {item.school} · {item.period}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">{item.credential}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#c5d2de] sm:text-base">
                    {item.detail} Studied at {item.school}.
                  </p>
                </div>
              </div>
            </m.article>
          ))}
        </div>

        {training.length > 0 ? (
          <div id="training" className="mt-12">
            <h3 className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${accentText}`}>Training</h3>
            <div className="mt-4 space-y-6">
              {training.map((item) => (
                <m.article
                  key={item.id}
                  className={`border-t pt-6 ${border}`}
                  initial={entranceInitial(reduced, { opacity: 0, y: 18 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.55, delay: reduced ? 0 : 0.08, ease: easeOut }}
                >
                  <div className="flex items-start gap-4">
                    <span className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${icon}`}>
                      <BookOpen aria-hidden="true" size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className={`text-sm font-semibold ${accentText}`}>
                        {item.provider} · {item.location}
                      </p>
                      <h4 className="mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">{item.course}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-[#c5d2de] sm:text-base">{formatPeriod(item)}</p>
                    </div>
                  </div>
                </m.article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
