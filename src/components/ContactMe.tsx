import { useEffect, useState, type FormEvent } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { entranceInitial } from './entrance';
import { profile } from '../data/siteContent';

interface ContactMeProps {
  defaultInterest?: string;
  flutter?: boolean;
  fullstack?: boolean;
  marketing?: boolean;
}

const interests = [
  'Mobile app development',
  'Full-stack web development',
  'Digital marketing',
  'A role',
];

export default function ContactMe({
  defaultInterest = 'Full-stack web development',
  flutter = false,
  fullstack = false,
  marketing = false,
}: ContactMeProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(defaultInterest);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; message?: string }>({});

  const accent = flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : marketing ? 'text-[#FFD000]' : 'text-[#00e5e5]';
  const ring = flutter ? 'focus-visible:border-[#027DFD]' : fullstack ? 'focus-visible:border-[#FF7A00]' : marketing ? 'focus-visible:border-[#FFD000]' : 'focus-visible:border-[#00e5e5]';
  const button = flutter
    ? 'bg-[#027DFD] text-white hover:bg-[#02569B]'
    : fullstack
      ? 'bg-[#FF7A00] text-[#1a1008] hover:bg-[#E06800]'
      : marketing
        ? 'bg-[#FFD000] text-[#1a1404] hover:bg-[#E6BC00]'
        : 'bg-[#00e5e5] text-[#04181c] hover:bg-[#7af6f6]';

  useEffect(() => {
    setInterest(defaultInterest);
  }, [defaultInterest]);

  useEffect(() => {
    const onHire = (event: Event) => {
      const interestValue = (event as CustomEvent<string>).detail;
      if (interestValue && interests.includes(interestValue)) setInterest(interestValue);
    };
    window.addEventListener('portfolio-hire', onHire);
    return () => window.removeEventListener('portfolio-hire', onHire);
  }, []);

  const validate = () => {
    const next: { fullName?: string; email?: string; message?: string } = {};
    if (!fullName.trim()) next.fullName = 'Enter your name.';
    if (!email.trim()) next.email = 'Enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!message.trim()) next.message = 'Enter a message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (String(formData.get('bot-field') || '').trim()) {
      setStatus('error');
      return;
    }
    if (!validate()) {
      setStatus('idle');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          interest,
          message: message.trim(),
        }),
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      setStatus('sent');
      setFullName('');
      setEmail('');
      setInterest(defaultInterest);
      setMessage('');
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative z-10 scroll-mt-24 border-t border-white/10 bg-black py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12 lg:px-8">
        <motion.div
          className="lg:col-span-5"
          initial={entranceInitial(false, { opacity: 0, y: 16 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${accent}`}>Get in touch</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Tell me about the role or project.</h2>
          <p className="mt-4 text-base leading-relaxed text-[#c5d2de]">
            {profile.availability}. Send a message or email me directly.
          </p>
          <h3 className="mt-8 text-lg font-bold text-white">Contact details</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07141c] p-4">
              <MapPin aria-hidden="true" className={accent} size={18} />
              <div>
                <p className="text-sm font-semibold text-white">Location</p>
                <p className="text-sm text-[#c5d2de]">{profile.location}</p>
              </div>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex min-h-11 items-start gap-3 rounded-2xl border border-white/10 bg-[#07141c] p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail aria-hidden="true" className={accent} size={18} />
                <div>
                  <p className="text-sm font-semibold text-white">Email</p>
                  <p className="text-sm text-[#c5d2de]">{profile.email}</p>
                </div>
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={entranceInitial(false, { opacity: 0, y: 16 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <div className="rounded-3xl border border-white/10 bg-[#07141c] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white">Send a message</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#c5d2de] sm:text-base">Tell me about the role or project you have in mind.</p>
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <p className="hidden">
                <label htmlFor="bot-field">Don’t fill this in</label>
                <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
              </p>
              <div>
                <label htmlFor="contact-name" className="text-sm font-semibold text-white">
                  Full name
                </label>
                <input
                  id="contact-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'contact-name-error' : undefined}
                  className={`mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-black px-4 text-base text-white outline-none ${ring}`}
                />
                {errors.fullName ? (
                  <p id="contact-name-error" className="mt-2 text-sm text-[#ffb4b4]">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-semibold text-white">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-black px-4 text-base text-white outline-none ${ring}`}
                />
                {errors.email ? (
                  <p id="contact-email-error" className="mt-2 text-sm text-[#ffb4b4]">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact-interest" className="text-sm font-semibold text-white">
                  What is this about?
                </label>
                <select
                  id="contact-interest"
                  name="interest"
                  value={interest}
                  onChange={(event) => setInterest(event.target.value)}
                  className={`mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-black px-4 text-base text-white outline-none ${ring}`}
                >
                  {interests.map((option) => (
                    <option key={option} value={option} className="bg-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm font-semibold text-white">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-base text-white outline-none ${ring}`}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-2 text-sm text-[#ffb4b4]">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60 ${button}`}
              >
                <Send aria-hidden="true" size={16} />
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <div aria-live="polite" className="min-h-6 text-sm">
                {status === 'sent' ? <p className="text-[#b8f5c8]">Your message was sent. I’ll reply by email.</p> : null}
                {status === 'error' ? (
                  <p className="text-[#ffb4b4]">
                    This message was not sent. Email{' '}
                    <a className="underline" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>{' '}
                    instead.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
