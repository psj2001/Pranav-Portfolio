import type { ReactNode } from 'react';
import { projectPath } from '../data/siteContent';
import RouteLink from './RouteLink';

function Unpublished({ children }: { children: string }) {
  return <p className="mt-2 text-sm leading-relaxed text-[#8ea0b0]">{children}</p>;
}

function FocusSection({
  id,
  kicker,
  title,
  tone,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  tone: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 scroll-mt-24 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${tone}`}>{kicker}</p>
        <h2 className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">{title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{children}</div>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#07141c] p-5 sm:p-6">
      <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-[#c5d2de] sm:text-base">{children}</div>
    </article>
  );
}

function ProjectLinks({ links, tone }: { links: { href: string; label: string }[]; tone: string }) {
  if (links.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
      {links.map((link) => (
        <RouteLink key={link.href} href={link.href} className={`text-sm font-semibold underline-offset-4 hover:underline ${tone}`}>
          {link.label}
        </RouteLink>
      ))}
    </div>
  );
}

export function FullStackCapabilities() {
  const tone = 'text-[#FF7A00]';
  return (
    <FocusSection id="capabilities" kicker="Full-stack work" title="What the public record covers." tone={tone}>
      <Card title="Frontend development">
        <p>Built the Tripzza website, the Falcon Force Academy website, and the ChooseMy Fresh website. CRM Falcon Force uses React.</p>
        <ProjectLinks
          tone={tone}
          links={[
            { href: projectPath('tripzza'), label: 'Tripzza' },
            { href: projectPath('falcon-force'), label: 'Falcon Force Academy' },
            { href: projectPath('choosemyfresh'), label: 'ChooseMy Fresh' },
            { href: projectPath('crm-falcon'), label: 'CRM Falcon Force' },
          ]}
        />
      </Card>
      <Card title="Backend development">
        <p>CRM Falcon Force uses Node.js and Express. At ULEGENDARY DIGITAL I worked on backend functionality.</p>
        <ProjectLinks tone={tone} links={[{ href: projectPath('crm-falcon'), label: 'CRM Falcon Force' }]} />
      </Card>
      <Card title="API integrations">
        <p>At ULEGENDARY DIGITAL I worked on API integrations. REST APIs are listed with my skills. No public project names a specific API contract.</p>
      </Card>
      <Card title="Databases">
        <p>CRM Falcon Force uses MongoDB. At ULEGENDARY DIGITAL I worked on databases. That role does not name the database.</p>
      </Card>
      <Card title="Authentication and authorization">
        <Unpublished>Not published yet.</Unpublished>
      </Card>
      <Card title="Admin dashboards">
        <p>Built CRM Falcon Force for clients, staff, salaries, expenses, income, and payment orders.</p>
        <ProjectLinks tone={tone} links={[{ href: projectPath('crm-falcon'), label: 'CRM Falcon Force case study' }]} />
      </Card>
      <Card title="Deployment and maintenance">
        <p>At ULEGENDARY DIGITAL I tested applications, resolved technical issues, and supported deployments, updates, and maintenance.</p>
      </Card>
    </FocusSection>
  );
}

export function MarketingWork() {
  const tone = 'text-[#FFD000]';
  const fresh = projectPath('choosemyfresh');
  return (
    <FocusSection id="marketing-work" kicker="Marketing work" title="ChooseMy Fresh, and what is still unpublished." tone={tone}>
      <Card title="Search engine optimization">
        <p>
          For <RouteLink href={fresh} className={`font-semibold underline-offset-4 hover:underline ${tone}`}>ChooseMy Fresh</RouteLink>, I worked on its website SEO.
        </p>
        <Unpublished>Rankings and other SEO outcomes are not published yet.</Unpublished>
      </Card>
      <Card title="Social media management">
        <p>I managed the social media platforms for ChooseMy Fresh.</p>
        <Unpublished>The platforms and campaign screenshots are not published yet.</Unpublished>
      </Card>
      <Card title="Meta Ads">
        <p>Meta Ads is listed in my marketing skills.</p>
        <Unpublished>No Meta Ads campaign is published yet.</Unpublished>
      </Card>
      <Card title="Google Ads">
        <p>Google Ads is listed in my marketing skills. It is not a published campaign.</p>
        <Unpublished>No Google Ads campaign is published yet.</Unpublished>
      </Card>
      <Card title="Website development and optimization">
        <p>I created the ChooseMy Fresh website.</p>
        <ProjectLinks tone={tone} links={[{ href: fresh, label: 'ChooseMy Fresh case study' }]} />
      </Card>
      <Card title="Content creation">
        <p>I work on social content.</p>
        <Unpublished>Content samples are not published yet.</Unpublished>
      </Card>
      <Card title="Online branding">
        <Unpublished>Not published yet.</Unpublished>
      </Card>
      <Card title="Marketing automation">
        <p>WhatsApp automation is listed in my marketing skills.</p>
        <Unpublished>No automation project is published yet.</Unpublished>
      </Card>
    </FocusSection>
  );
}
