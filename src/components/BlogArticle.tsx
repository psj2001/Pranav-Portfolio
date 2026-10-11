import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { findPost, formatBlogDate } from '../data/blogPosts';
import { BLOG_TRACKS, navigate } from '../routes';
import type { BlogTrack } from '../types';

function usePrefersReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

const rise = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

const accent: Record<BlogTrack, { text: string; chip: string }> = {
  software: { text: 'text-[#00e5e5]', chip: 'border-[#00e5e5]/30 text-[#b8fbff]' },
  marketing: { text: 'text-[#FFD000]', chip: 'border-[#FFD000]/35 text-[#FFF4C2]' },
};

export default function BlogArticle({ track, slug }: { track: BlogTrack; slug: string }) {
  const reduced = usePrefersReducedMotion();
  const post = findPost(track, slug);
  const tone = accent[track];
  const indexPath = BLOG_TRACKS[track].path;

  return (
    <article className="relative z-10 scroll-mt-24 pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={rise}
        >
          <button
            type="button"
            onClick={() => navigate(indexPath)}
            className={`inline-flex cursor-pointer items-center gap-2 text-sm font-semibold ${tone.text}`}
          >
            <ArrowLeft size={16} />
            {BLOG_TRACKS[track].title} blog
          </button>

          {post ? (
            <>
              <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-[#a7b5c5]">
                {formatBlogDate(post.date)} · {post.readingMinutes} min read
              </p>
              <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
                {post.title}
              </h1>
              <ul className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className={`rounded-full border bg-[#07141c] px-3 py-1 text-xs font-semibold ${tone.chip}`}>
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-5 text-base leading-relaxed text-[#c5d0dc] sm:text-lg">
                {post.body.map((block, index) => {
                  if (block.type === 'heading') {
                    return (
                      <h2 key={index} className="pt-3 text-xl font-extrabold tracking-[-0.03em] text-white sm:text-2xl">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={index} className="list-disc space-y-2 pl-5">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index}>{block.text}</p>;
                })}
              </div>
            </>
          ) : (
            <>
              <h1 className="mt-8 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
                This note is not on the {BLOG_TRACKS[track].title.toLowerCase()} blog.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#a7b5c5]">
                The link does not match a post on this track.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </article>
  );
}
