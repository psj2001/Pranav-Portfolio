const shots = {
  splash: '/images/trendirea/splash.jpg',
  home: '/images/trendirea/home.jpg',
  search: '/images/trendirea/search.jpg',
  results: '/images/trendirea/results.jpg',
  product: '/images/trendirea/product.jpg',
  wishlist: '/images/trendirea/wishlist.jpg',
  cart: '/images/trendirea/cart.jpg',
  account: '/images/trendirea/account.jpg',
} as const;

export type TrendireaShot = keyof typeof shots;

export function trendireaSrc(shot: TrendireaShot) {
  return shots[shot];
}

export function PhoneShot({
  shot,
  alt,
  className = '',
  eager = false,
}: {
  shot: TrendireaShot;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={shots[shot]}
      alt={alt}
      width={460}
      height={1024}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-auto w-[6.75rem] shrink-0 rounded-2xl border border-white/15 bg-white shadow-[0_16px_30px_rgba(0,0,0,0.35)] ${className}`}
    />
  );
}

export function HeroStage() {
  return (
    <figure className="relative mx-auto w-fit">
      <div className="pointer-events-none absolute -left-8 top-8 h-40 w-40 rounded-full bg-[#95BF47]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#004C3F] blur-3xl" aria-hidden="true" />
      <div className="relative flex items-end gap-4">
        <PhoneShot shot="splash" alt="Trendirea opening screen, Style your story" eager />
        <PhoneShot shot="home" alt="Trendirea home screen with featured snowboards and collections" eager className="w-[7.5rem]" />
      </div>
      <figcaption className="mt-4 text-center text-xs leading-relaxed text-[#8ea0b0]">
        Screens from the Trendirea portfolio demo.
      </figcaption>
    </figure>
  );
}
