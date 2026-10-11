import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { formatBlogDate, postsForTrack } from '../data/blogPosts';
import { BLOG_HUB_PATH, BLOG_TRACKS, navigate } from '../routes';
import type { BlogTrack } from '../types';

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

const rise = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

const tracks: Record<
  BlogTrack,
  {
    kicker: string;
    title: string;
    summary: string;
    accentText: string;
    accentBorder: string;
    chip: string;
  }
> = {
  software: {
    kicker: 'Flutter and full stack',
    title: 'Notes on building products.',
    summary: 'Flutter apps, React frontends, and the backends behind them.',
    accentText: 'text-[#00e5e5]',
    accentBorder: 'border-[#00e5e5]/35',
    chip: 'border-[#00e5e5]/30 text-[#b8fbff]',
  },
  marketing: {
    kicker: 'Social and websites',
    title: 'Notes on reaching the right audience.',
    summary: 'Social content and website updates. Advertising is not listed as a service.',
    accentText: 'text-[#FFD000]',
    accentBorder: 'border-[#FFD000]/40',
    chip: 'border-[#FFD000]/35 text-[#FFF4C2]',
  },
};

export function BlogHub() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative z-10 scroll-mt-24 pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.header
          className="max-w-3xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={rise}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00e5e5] sm:text-xs">Blog</p>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Two blogs. <span className="text-[#00e5e5]">Pick a track.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#a7b5c5] sm:text-lg">
            Software writing stays with Flutter and full-stack work. Digital marketing stays on its own.
          </p>
        </motion.header>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {(Object.keys(tracks) as BlogTrack[]).map((track, index) => {
            const content = tracks[track];
            return (
              <motion.button
                key={track}
                type="button"
                onClick={() => navigate(BLOG_TRACKS[track].path)}
                className={`group cursor-pointer rounded-2xl border bg-[#07141c] p-7 text-left transition-colors hover:bg-[#0b1c26] ${content.accentBorder}`}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...rise, delay: reduced ? 0 : 0.08 * index }}
              >
                <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${content.accentText}`}>
                  {BLOG_TRACKS[track].title}
                </p>
                <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-3xl">
                  {content.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#a7b5c5]">{content.summary}</p>
                <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${content.accentText}`}>
                  Open {BLOG_TRACKS[track].title.toLowerCase()}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BlogTrackIndex({ track }: { track: BlogTrack }) {
  const reduced = usePrefersReducedMotion();
  const content = tracks[track];
  const posts = postsForTrack(track);

  return (
    <section className="relative z-10 scroll-mt-24 pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.header
          className="max-w-3xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={rise}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${content.accentText}`}>
            {content.kicker}
          </p>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            {BLOG_TRACKS[track].title} <span className={content.accentText}>blog.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#a7b5c5] sm:text-lg">{content.summary}</p>
          <button
            type="button"
            onClick={() => navigate(BLOG_HUB_PATH)}
            className="mt-5 cursor-pointer text-sm font-semibold text-white/70 hover:text-white"
          >
            Both blogs
          </button>
        </motion.header>

        <ul className="mt-12 flex flex-col gap-4">
          {posts.map((post, index) => (
            <motion.li
              key={post.slug}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...rise, delay: reduced ? 0 : Math.min(index * 0.06, 0.18) }}
            >
              <button
                type="button"
                onClick={() => navigate(`${BLOG_TRACKS[track].path}/${post.slug}`)}
                className={`w-full cursor-pointer rounded-2xl border bg-[#07141c] p-6 text-left transition-colors hover:bg-[#0b1c26] sm:p-7 ${content.accentBorder}`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#a7b5c5]">
                  {formatBlogDate(post.date)} · {post.readingMinutes} min read
                </p>
                <h2 className="mt-3 text-xl font-extrabold tracking-[-0.03em] text-white sm:text-2xl">{post.title}</h2>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#a7b5c5]">{post.excerpt}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className={`rounded-full border bg-black/30 px-3 py-1 text-xs font-semibold ${content.chip}`}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
