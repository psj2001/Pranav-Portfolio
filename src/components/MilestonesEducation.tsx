import { useState } from 'react';
import { BookOpen, GraduationCap, Laptop, Terminal, Quote, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TESTIMONIALS = [
  {
    quote: "Pranav delivered our multi-vendor kitchen listing system within a record timeframe. His mastery of Flutter and location-aware search transformed our dynamic home-food service in Dubai. Highly recommended!",
    author: "Ahmed Al-Mansoori",
    role: "Founder & CEO",
    company: "SMN Kitchens (Dubai)",
    rating: 5,
    avatar: "/src/assets/images/partner_dark_suit_1780401826336.png"
  },
  {
    quote: "Integrating real-time WebRTC live video workouts and Stripe GCC payment channels was a complex task, but Pranav executed it perfectly. The codebase is clean, scalable, and beautifully structured.",
    author: "Fahad Al-Shammari",
    role: "Operations Director",
    company: "MyFitBuddy (Kuwait)",
    rating: 5,
    avatar: "/src/assets/images/partner_al_shammari_1780401764134.png"
  },
  {
    quote: "Pranav is a brilliant software engineer. He revamped our complex property portal using Next.js and Google Maps SDK, boosting speed by 40% and delivering a highly intuitive user interface.",
    author: "Marcus Keller",
    role: "CTO",
    company: "Casakey Real Estate (Dubai)",
    rating: 5,
    avatar: "/src/assets/images/partner_keller_1780401791864.png"
  },
  {
    quote: "Our global talent matching platform Creova demands high-performance workflows. Pranav engineered robust cross-platform mobile logic, showcasing immaculate visual fidelity and performance structure.",
    author: "Elias Rostov",
    role: "Product Owner",
    company: "CREOVA Platform",
    rating: 5,
    avatar: "/src/assets/images/partner_young_bearded_1780401809072.png"
  }
];

export default function MilestonesEducation() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full bg-surface-dim relative py-20 overflow-hidden select-none">
      
      {/* Background visual graphics */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-[8%] w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        
        {/* SECTION 1: Client Testimonials */}
        <section id="testimonials" className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-display font-bold text-[11px] tracking-widest text-primary uppercase animate-pulse">
              Endorsements
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Client Success Stories
            </h2>
            <p className="text-on-surface-variant font-sans text-xs sm:text-sm max-w-xl">
              Hear directly from founders, project owners, and operations leads who have partner-engineered cross-platform systems and high-profile digital products with me.
            </p>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>

          {/* Interactive Testimonial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Left Column: Testimonial Quotes Frame (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="relative glass-card p-8 sm:p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-surface-container-low to-surface-dim overflow-hidden h-full flex flex-col justify-between min-h-[300px]">
                {/* Large Background Quote Symbol */}
                <div className="absolute top-6 right-8 text-primary/5 pointer-events-none select-none">
                  <Quote size={180} strokeWidth={1} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="space-y-6 relative z-10 flex flex-col justify-between h-full"
                  >
                    {/* Stars Rating and Title */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1">
                        {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                          <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      
                      {/* Quote Text */}
                      <blockquote className="font-display font-medium text-lg sm:text-xl text-white leading-relaxed italic tracking-wide">
                        "{TESTIMONIALS[activeIndex].quote}"
                      </blockquote>
                    </div>

                    {/* Client Identity */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <img
                        src={TESTIMONIALS[activeIndex].avatar}
                        alt={TESTIMONIALS[activeIndex].author}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-primary/20 shadow-md"
                      />
                      <div>
                        <cite className="not-italic font-display font-bold text-white text-sm block">
                          {TESTIMONIALS[activeIndex].author}
                        </cite>
                        <span className="text-[10px] font-sans text-on-surface-variant uppercase tracking-wider block mt-0.5">
                          {TESTIMONIALS[activeIndex].role} • <span className="text-primary font-semibold">{TESTIMONIALS[activeIndex].company}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Interactive Client Selector (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-on-surface-variant uppercase ml-2 mb-1">
                Select Partner
              </span>
              
              <div className="space-y-2.5">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.author}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer group ${
                      activeIndex === idx
                        ? 'border-primary bg-primary/10 shadow-lg scale-102'
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt={t.author}
                      referrerPolicy="no-referrer"
                      className={`w-10 h-10 rounded-full object-cover border transition-all duration-300 ${
                        activeIndex === idx ? 'border-primary scale-105 shadow-inner' : 'border-white/10'
                      }`}
                    />
                    <div className="truncate">
                      <div className={`font-display font-bold text-xs truncate ${activeIndex === idx ? 'text-primary' : 'text-white'}`}>
                        {t.author}
                      </div>
                      <div className="font-sans text-[10px] text-on-surface-variant truncate mt-0.5">
                        {t.role}, {t.company.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: Academic Background / Education */}
        <section className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-display font-bold text-[11px] tracking-widest text-[#4cd7f6] uppercase">
              Credentials
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Academic Background
            </h2>
            <div className="h-1 w-12 bg-[#4cd7f6] rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Left: Interactive Degrees Blocks (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* B.Com Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-7 rounded-[2rem] border border-white/5 bg-gradient-to-br from-surface-container to-surface-dim flex items-start gap-4 sm:gap-5 group relative"
              >
                <div className="p-3.5 rounded-xl bg-[#4cd7f6]/10 border border-[#4cd7f6]/20 text-[#4cd7f6] shrink-0 mt-1 shadow-inner">
                  <GraduationCap size={24} />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#4cd7f6] uppercase tracking-widest font-bold leading-none">
                    Calicut University • 2019 - 2022
                  </span>
                  <h3 className="font-display font-extrabold text-white text-base sm:text-lg">
                    Bachelor of Commerce (B.Com)
                  </h3>
                  <div className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-2">
                    <p>Developed strong knowledge in business, finance, accounting, and management fundamentals during the academic program.</p>
                    <p>Built analytical and problem-solving skills that support product development and business-oriented decision making.</p>
                  </div>
                </div>
              </motion.div>

              {/* Technical Mastery Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="glass-card p-6 sm:p-7 rounded-[2rem] border border-white/5 bg-gradient-to-br from-surface-container to-surface-dim flex items-start gap-4 sm:gap-5 group relative"
              >
                <div className="p-3.5 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary shrink-0 mt-1 shadow-inner">
                  <BookOpen size={24} />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-bold leading-none">
                    Engineering Strategy • Specialization
                  </span>
                  <h3 className="font-display font-extrabold text-white text-base sm:text-lg">
                    Technical Mastery & AI-first Engineering
                  </h3>
                  <div className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-2">
                    <p>Expertise in architectural blueprints including Clean Architecture, SOLID, and feature-based architectures.</p>
                    <p>Advanced proficiency with AI-assisted software delivery (Cursor AI, Claude, ChatGPT, GitHub Copilot) to ship optimized products rapidly and securely.</p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right: Desk Graphic Mockup drawing (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <div className="relative w-full max-w-[360px] aspect-square p-2 bg-gradient-to-tr from-white/10 to-transparent rounded-[2.5rem] border border-white/5 bg-[#0a0f20]/40 shadow-inner flex items-center justify-center group overflow-hidden">
                {/* Desk Illustration Graphic mockup */}
                <div className="relative w-full h-full flex flex-col items-center justify-center scale-95 group-hover:scale-100 transition-transform duration-500">
                  
                  {/* Laptop base */}
                  <div className="w-[180px] h-[105px] bg-gradient-to-b from-[#1c2646] to-[#0a0f20] border border-white/15 rounded-xl flex flex-col justify-between p-2 shadow-2xl relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="w-full h-1 bg-[#4cd7f6]/30 rounded-full animate-pulse" />
                    {/* Simulated terminal lines */}
                    <div className="space-y-1 font-mono text-[6px] text-primary/70">
                      <div className="flex gap-1"><span className="text-emerald-500">➜</span><span>git push origin main</span></div>
                      <div className="text-secondary"># deployment pending</div>
                      <div className="text-tertiary">10+ Deployed app store assets</div>
                    </div>
                    <div className="w-full flex items-center gap-1.5 pt-1.5 border-t border-white/10 text-[6px] text-on-surface-variant font-mono">
                      <Laptop size={7} />
                      <span>PRANAV-PRO-OS</span>
                    </div>
                  </div>

                  {/* Keyboard layout base under laptop */}
                  <div className="w-[200px] h-3 bg-[#111a33] border-b border-primary/20 rounded-md relative -top-1 z-20"></div>

                  {/* Tablet behind laptop */}
                  <div className="absolute top-[20%] left-[10%] w-[120px] h-[145px] bg-[#121932]/70 border border-white/10 rounded-2xl p-2 rotate-[-12deg] shadow-lg flex flex-col justify-between transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:translate-x-1">
                    <div className="w-full h-full rounded-lg bg-surface-dim p-1.5 flex flex-col justify-between">
                      <div className="w-full h-2 rounded bg-primary/25" />
                      <div className="flex flex-col gap-1">
                        <div className="w-full h-1 rounded bg-secondary/20" />
                        <div className="w-[85%] h-1 rounded bg-secondary/20" />
                      </div>
                      <div className="w-full h-8 flex items-center justify-center p-1 border border-white/5 rounded-md bg-[#0a0f20]/40">
                        <span className="font-mono text-[8px] text-[#4cd7f6] font-bold animate-pulse">NEXT.JS / REACT</span>
                      </div>
                    </div>
                  </div>

                  {/* Coffee Cup / Accent circles */}
                  <div className="absolute bottom-[20%] right-[10%] w-10 h-10 rounded-full bg-gradient-to-tr from-[#c7a67f] to-[#7f5c35] border border-white/10 shadow-lg flex items-center justify-center rotate-[15deg] transition-transform duration-500 group-hover:rotate-[30deg]">
                    <div className="w-8 h-8 rounded-full bg-surface-dim border border-white/5 flex items-center justify-center">
                      <span className="text-[6px] font-bold text-[#c7a67f] font-mono leading-none">COFFEE</span>
                    </div>
                  </div>
                  
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  );
}
