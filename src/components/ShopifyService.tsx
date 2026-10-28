import { useState, type Key, type ReactNode } from 'react';
import * as m from 'motion/react-m';
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  Compass,
  FlaskConical,
  Handshake,
  Heart,
  Layers,
  PenLine,
  Rocket,
  Search,
  ShoppingBag,
  Smartphone,
  Store,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { siAndroid, siDart, siFirebase, siFlutter, siGraphql, siIos, siShopify } from 'simple-icons';
import { shopifyFaqs } from '../data/shopifyPage';
import { queueContactInterest } from '../contactIntent';
import { SHOPIFY_ROUTE } from '../routes';
import Breadcrumb from './Breadcrumb';
import { entranceInitial } from './entrance';
import RouteLink from './RouteLink';
import { HeroStage } from './shopifyVisuals';

const easeOut = [0.22, 1, 0.36, 1] as const;
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/SpBAgTKE-t8';

const primaryCta =
  'inline-flex min-h-12 items-center justify-center rounded-full bg-[#95BF47] px-6 text-sm font-semibold text-[#062118] transition hover:bg-[#c6e58a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
const secondaryCta =
  'inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:border-[#95BF47] hover:text-[#d4f5a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const tech = [
  { name: 'Shopify', path: siShopify.path },
  { name: 'Flutter', path: siFlutter.path },
  { name: 'Dart', path: siDart.path },
  { name: 'GraphQL', path: siGraphql.path },
  { name: 'Firebase', path: siFirebase.path },
  { name: 'Android', path: siAndroid.path },
  { name: 'iOS', path: siIos.path },
];

const services: { title: string; copy: string; items: string[]; icon: LucideIcon }[] = [
  {
    title: 'Shopify Website Development',
    copy: 'Launch a Shopify storefront designed around your brand, products, and customers.',
    icon: Store,
    items: [
      'Shopify store setup and configuration',
      'Theme customization and responsive storefront design',
      'Product and collection setup',
      'Navigation, product pages, and shopping experience',
      'Storefront enhancements and API integrations',
      'Ongoing improvements and maintenance',
    ],
  },
  {
    title: 'Shopify Mobile App Development',
    copy: 'Already selling on Shopify? I can build a custom Flutter shopping app for Android and iOS that connects to your existing store.',
    icon: Smartphone,
    items: [
      'Branded Flutter mobile application',
      'Shopify Storefront GraphQL API integration',
      'Product catalog, collections, search, and filtering',
      'Product variants and shopping cart',
      'Shopify-powered checkout',
      'Customer authentication and order history, subject to store configuration and API access',
      'Wishlist and push notifications',
      'Firebase Analytics integration',
    ],
  },
];

const flow = [
  { title: 'Shopify Store', body: 'Products, prices, inventory, and orders stay in Shopify.' },
  { title: 'Shopify APIs', body: 'Supported store data and shopping actions are requested through Shopify APIs.' },
  { title: 'Flutter Mobile App', body: 'Android and iOS screens built for the phone, using that store.' },
];

const benefits: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: 'Branded mobile shopping experience',
    body: 'The app can use your name, colors, and layout instead of sending people through a generic browser tab.',
    icon: Smartphone,
  },
  {
    title: 'Easier access for returning customers',
    body: 'A home-screen icon gives people who already shop with you a direct way back to the store.',
    icon: ShoppingBag,
  },
  {
    title: 'Push notification opportunities',
    body: 'With permission, the app can send the messages you choose. People can turn notifications off.',
    icon: Bell,
  },
  {
    title: 'Mobile-first navigation and discovery',
    body: 'Collections, search, and product details can be laid out for a phone and for touch.',
    icon: Search,
  },
  {
    title: 'Consistent catalog and commerce backend',
    body: 'The app reads from the same Shopify store as the website, so the catalog stays in one place.',
    icon: Layers,
  },
  {
    title: 'Custom experiences beyond a standard storefront',
    body: 'A wishlist or a tailored home screen can sit alongside the Shopify storefront.',
    icon: Heart,
  },
];

const comparison = [
  {
    label: 'Customer touchpoints',
    website: 'The browser storefront.',
    app: 'The same store, plus a branded Android and iOS app.',
  },
  {
    label: 'Device experience',
    website: 'Responsive web pages.',
    app: 'Screens designed around a phone.',
  },
  {
    label: 'Distribution',
    website: 'A link opened in a browser.',
    app: 'App stores, in addition to the website.',
  },
  {
    label: 'Notifications',
    website: 'Email and the messages you configure in Shopify.',
    app: 'Those options, plus push notifications if you add them.',
  },
  {
    label: 'Implementation',
    website: 'Store setup, theme, and storefront work.',
    app: 'That work, plus app design, API integration, and each store’s release steps.',
  },
];

const audiences = [
  {
    title: 'Shopify Store Owners',
    body: 'Wanting to launch or improve a storefront.',
    icon: Store,
  },
  {
    title: 'E-commerce Brands',
    body: 'Wanting a custom Shopify-connected Android/iOS app.',
    icon: Building2,
  },
  {
    title: 'Shopify Agencies',
    body: 'Looking for freelance or white-label Flutter mobile app development support.',
    icon: Handshake,
    extra:
      'Already building Shopify websites for clients? I can collaborate on the mobile app development side, helping you extend existing Shopify storefronts into Android and iOS applications.',
  },
];

const steps: { title: string; body: string; icon: LucideIcon }[] = [
  { title: 'Discovery', body: 'Understand business requirements and the existing Shopify setup.', icon: Compass },
  { title: 'Planning', body: 'Define features, integrations, design, and scope.', icon: PenLine },
  { title: 'Development', body: 'Build the Shopify website or the Flutter app.', icon: Smartphone },
  { title: 'Testing', body: 'Validate shopping flows, API behavior, and the device experience.', icon: FlaskConical },
  { title: 'Launch & Support', body: 'Deployment assistance and agreed post-launch improvements.', icon: Rocket },
];

const projectPoints = [
  'Flutter shopping screens',
  'Shopify Storefront GraphQL API',
  'Shopify Customer Account API',
  'Firebase',
];

function useReducedMotion() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced;
}

function Reveal({ children, className = '', delay = 0 }: { key?: Key; children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={entranceInitial(reduced, { opacity: 0, y: 18 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: easeOut }}
    >
      {children}
    </m.div>
  );
}

function ContactLink({ children, className }: { children: ReactNode; className: string }) {
  return (
    <RouteLink href="/#contact" className={className} onClick={() => queueContactInterest(SHOPIFY_ROUTE.interest)}>
      {children}
    </RouteLink>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c6e58a] sm:text-xs">{children}</p>;
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#95BF47]/40 bg-[#95BF47]/10 text-[#c6e58a]">
      <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
    </span>
  );
}

export default function ShopifyService() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [playDemo, setPlayDemo] = useState(false);

  return (
    <article className="relative z-10 min-h-screen overflow-x-clip bg-black text-[#c5d2de]">
      <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(149,191,71,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(149,191,71,0.07)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Breadcrumb path={SHOPIFY_ROUTE.path} />
            <div className="mt-8 flex items-center gap-3">
              <svg role="img" aria-label="Shopify" viewBox="0 0 24 24" className="h-8 w-8 fill-white">
                <path d={siShopify.path} />
              </svg>
              <Eyebrow>Shopify website & mobile app development</Eyebrow>
            </div>
            <h1 className="mt-5 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">
              Your Shopify Store.
              <span className="mt-1 block">
                Now on{' '}
                <span className="bg-gradient-to-r from-[#e7f8c8] via-[#95BF47] to-[#6ea332] bg-clip-text text-transparent">
                  Every Screen.
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c5d2de] sm:text-lg">
              I build custom Shopify storefronts and turn existing Shopify stores into branded Android and iOS shopping apps using Flutter. Your products, inventory, and commerce operations stay connected to Shopify.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactLink className={primaryCta}>Start Your Project</ContactLink>
              <a href="#trendirea" className={secondaryCta}>
                Watch App Demo
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {['Shopify Websites', 'Flutter iOS & Android', 'Shopify API Integration'].map((chip) => (
                <li key={chip} className="rounded-full border border-[#95BF47]/35 bg-[#95BF47]/10 px-3 py-1.5 text-xs font-semibold text-[#d4f5a8]">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <HeroStage />
        </div>
      </section>

      <section aria-label="Technologies" className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {tech.map((item) => (
            <li key={item.name} className="flex items-center gap-2 text-sm font-semibold text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                <path d={item.path} />
              </svg>
              {item.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>What I build</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              Everything You Need to Launch and Extend Your Shopify Store
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <Reveal key={service.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#07120f] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-1 hover:border-[#95BF47]/50 motion-reduce:transform-none sm:p-8">
                  <IconBadge icon={service.icon} />
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">{service.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">{service.copy}</p>
                  <ul className="mt-6 space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#d5deea]">
                        <Check aria-hidden="true" className="mt-0.5 shrink-0 text-[#95BF47]" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>How it connects</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              One Shopify Store. A Connected Mobile Experience.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed sm:text-lg">
              Your Shopify store remains the commerce backend. The mobile app uses Shopify APIs to access supported store data and shopping functionality, while providing a mobile-first user experience.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {flow.map((step, index) => (
              <li key={step.title} className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d241c] to-black p-6">
                {index < flow.length - 1 ? (
                  <span className="absolute -bottom-4 left-1/2 h-4 w-px -translate-x-1/2 bg-[#95BF47]/70 md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:h-px md:w-4 md:translate-x-full md:-translate-y-1/2" aria-hidden="true" />
                ) : null}
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#95BF47]">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-8 grid gap-3 text-sm leading-relaxed sm:grid-cols-2">
            {[
              'Products and collections come from Shopify.',
              'Pricing and available variants are retrieved from Shopify.',
              'Cart and checkout use Shopify commerce capabilities.',
              'Customer accounts can connect through Shopify’s supported authentication APIs.',
              'Orders, inventory, and fulfillment remain managed through Shopify.',
              'Mobile-specific experiences such as push notifications and analytics can be implemented through Firebase.',
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Why an app</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              Give Customers Another Way to Shop.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Reveal key={benefit.title}>
                <article className="h-full rounded-3xl border border-white/10 bg-[#07120f] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#95BF47]/40 motion-reduce:transform-none">
                  <IconBadge icon={benefit.icon} />
                  <h3 className="mt-4 text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{benefit.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-2xl font-bold tracking-tight text-white">Shopify Website versus Shopify Website + Mobile App</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
              A mobile app complements the website. Customers can still shop in the browser. The app is another way to reach the same Shopify catalog.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-3xl border border-white/10 p-6">
                <h4 className="text-lg font-bold text-white">Shopify website</h4>
                <dl className="mt-4 space-y-4">
                  {comparison.map((row) => (
                    <div key={row.label}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8ea0b0]">{row.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed">{row.website}</dd>
                    </div>
                  ))}
                </dl>
              </article>
              <article className="rounded-3xl border border-[#95BF47]/40 bg-[#07120f] p-6">
                <h4 className="text-lg font-bold text-white">Shopify website + mobile app</h4>
                <dl className="mt-4 space-y-4">
                  {comparison.map((row) => (
                    <div key={row.label}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c6e58a]">{row.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed">{row.app}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="trendirea" className="scroll-mt-28 border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Featured project</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              Meet Trendirea — Flutter Meets Shopify.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed sm:text-lg">
              Trendirea is a headless e-commerce mobile app I built to demonstrate how Flutter, Shopify APIs, and Firebase can work together to deliver a branded shopping experience connected to a Shopify store.
            </p>
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#95BF47]/30 bg-gradient-to-br from-[#0c241c] via-black to-black p-5 shadow-[0_0_80px_rgba(149,191,71,0.12)] sm:p-8">
            <p className="text-sm font-semibold text-[#d4f5a8]">Portfolio demonstration. Not a commercial client deployment.</p>
            <div className="relative mt-5 aspect-video overflow-hidden rounded-2xl bg-[#071410]">
              {playDemo ? (
                <iframe
                  title="Trendirea — Flutter meets Shopify demo"
                  src={YOUTUBE_EMBED}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlayDemo(true)}
                  className="absolute inset-0 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <img
                    src="https://i.ytimg.com/vi/SpBAgTKE-t8/hqdefault.jpg"
                    alt="Thumbnail for the Trendirea portfolio demo video"
                    width={480}
                    height={360}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="relative inline-flex min-h-12 items-center rounded-full bg-[#95BF47] px-5 text-sm font-semibold text-[#062118]">
                    Play demo
                  </span>
                </button>
              )}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#a7b5c5]">
              Trendirea walkthrough. The video starts when you press play, without sound until you start it in the player.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {['Flutter', 'Shopify GraphQL API', 'Shopify Customer Account API', 'Firebase'].map((chip) => (
                <li key={chip} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white">
                  {chip}
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {projectPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-[#d5deea]">
                  <Check aria-hidden="true" size={16} className="text-[#95BF47]" />
                  {point}
                </li>
              ))}
            </ul>
            <ContactLink className={`${primaryCta} mt-8`}>Discuss a Similar Project</ContactLink>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Who I work with</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              Built for Merchants. Available for Agency Partnerships.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {audiences.map((audience) => (
              <article key={audience.title} className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#07120f] p-6">
                <IconBadge icon={audience.icon} />
                <h3 className="mt-4 text-xl font-bold text-white">{audience.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{audience.body}</p>
                {audience.extra ? <p className="mt-4 text-sm leading-relaxed text-[#d5deea]">{audience.extra}</p> : null}
                {audience.extra ? <ContactLink className={`${primaryCta} mt-6 w-fit`}>Let&apos;s Collaborate</ContactLink> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Development process</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              From Storefront to Launch.
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-white/10 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#95BF47]">0{index + 1}</p>
                <IconBadge icon={step.icon} />
                <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="shopify-faq-heading">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="shopify-faq-heading" className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-white/10 rounded-3xl border border-white/10">
            {shopifyFaqs.map((item, index) => {
              const open = openFaq === index;
              const panelId = `shopify-faq-panel-${index}`;
              const buttonId = `shopify-faq-button-${index}`;
              return (
                <div key={item.question} className="px-5">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {item.question}
                      <ChevronDown aria-hidden="true" className={`shrink-0 transition duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} size={18} />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!open}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-[#c5d2de]">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#95BF47]/30 bg-gradient-to-br from-[#004C3F] via-[#07120f] to-black px-6 py-14 text-center shadow-[0_0_80px_rgba(149,191,71,0.16)] sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#95BF47]/30 blur-3xl" />
          <h2 className="relative text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Ready to Bring Your Shopify Store to Life?
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#e7f8c8] sm:text-lg">
            Whether you&apos;re launching a Shopify storefront, extending an existing store into a mobile app, or looking for a development partner, let&apos;s talk about your project.
          </p>
          <ContactLink className={`${primaryCta} relative mt-8`}>Let&apos;s Discuss Your Project</ContactLink>
          <p className="relative mt-5 text-sm text-[#d4f5a8]">Shopify Websites • Android & iOS Apps • Agency Collaborations</p>
          <nav aria-label="Related pages" className="relative mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <RouteLink href="/" className="font-semibold text-white underline-offset-4 hover:underline">
              Portfolio
            </RouteLink>
            <RouteLink href="/#projects" className="font-semibold text-white underline-offset-4 hover:underline">
              Projects
            </RouteLink>
            <ContactLink className="font-semibold text-white underline-offset-4 hover:underline">Contact</ContactLink>
          </nav>
        </div>
      </section>

    </article>
  );
}
