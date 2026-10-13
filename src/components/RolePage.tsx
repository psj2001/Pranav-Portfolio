import AboutMe from './AboutMe';
import ContactMe from './ContactMe';
import Education from './Education';
import ExperienceProjects from './ExperienceProjects';
import { FullStackCapabilities, MarketingWork } from './RoleFocus';
import SkillsArsenal from './SkillsArsenal';
import WorkExperience from './WorkExperience';
import { BLOG_TRACKS, ROLE_ROUTES, type RoleId } from '../routes';
import RouteLink from './RouteLink';

export default function RolePage({ role }: { role: RoleId }) {
  const flutter = role === 'flutter';
  const fullstack = role === 'fullstack';
  const marketing = role === 'marketing';
  const tone = flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : 'text-[#FFD000]';
  const border = flutter ? 'border-[#027DFD]/40 text-[#9fd2ff]' : fullstack ? 'border-[#FF7A00]/40 text-[#ffd0a8]' : 'border-[#FFD000]/40 text-[#FFF4C2]';

  return (
    <>
      <AboutMe variant={role} />
      {flutter ? <WorkExperience flutter /> : null}
      {fullstack ? <FullStackCapabilities /> : null}
      {marketing ? <MarketingWork /> : null}
      <SkillsArsenal surface={role} flutter={flutter} fullstack={fullstack} marketing={marketing} />
      {flutter ? null : <WorkExperience fullstack={fullstack} marketing={marketing} />}
      <ExperienceProjects
        surface={role}
        accent={flutter ? 'flutter' : fullstack ? 'fullstack' : 'marketing'}
        heading={
          flutter
            ? {
                kicker: 'Mobile apps',
                title: 'Apps I can describe.',
                body: 'Flutter work where the product and my contribution are both on record. Employment is marked when the app belongs to a role. PropTelli is the Casa Key Real Estate app.',
              }
            : fullstack
              ? {
                  kicker: 'Websites and dashboards',
                  title: 'Web work I can describe.',
                  body: 'Dashboards and websites I can describe, including the ChooseMy Fresh website. The stack is limited to what the project record supports.',
                }
              : {
                  kicker: 'Marketing work',
                  title: 'ChooseMy Fresh.',
                  body: 'I created the ChooseMy Fresh website, managed its social media platforms, and worked on its website SEO. I also work on social content, SEO, Meta Ads, Google Ads, and WhatsApp automation.',
                }
        }
      />
      <Education flutter={flutter} fullstack={fullstack} marketing={marketing} />
      <section className="relative z-10 border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 sm:flex-row sm:items-end sm:justify-between lg:px-8">
          <div className="max-w-xl">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${tone}`}>From the blog</p>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              {marketing ? 'Notes on social content and websites.' : 'Notes on building products.'}
            </h2>
          </div>
          <RouteLink
            href={marketing ? BLOG_TRACKS.marketing.path : BLOG_TRACKS.software.path}
            className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${border}`}
          >
            {marketing ? 'Read the marketing blog' : 'Read the software blog'}
          </RouteLink>
        </div>
      </section>
      <ContactMe defaultInterest={ROLE_ROUTES[role].interest} flutter={flutter} fullstack={fullstack} marketing={marketing} />
    </>
  );
}
