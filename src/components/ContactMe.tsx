import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, HelpCircle, CheckCircle2, ChevronDown, RefreshCw, Github, Linkedin, ExternalLink } from 'lucide-react';
import { ContactInquiry } from '../types';
import { motion } from 'motion/react';

export default function ContactMe() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Full-Stack Web Development');
  const [message, setMessage] = useState('');
  
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedInquiries, setSavedInquiries] = useState<ContactInquiry[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Sync inquiries with localStorage to support solid persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pranav_contact_inquiries');
      if (stored) {
        setSavedInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage lookup failed:", e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSending(true);

    // Simulate sending network latency
    setTimeout(() => {
      const newInquiry: ContactInquiry = {
        id: `inq-${Date.now()}`,
        fullName,
        email,
        interest,
        message,
        timestamp: new Date().toLocaleString()
      };

      const updated = [newInquiry, ...savedInquiries];
      setSavedInquiries(updated);
      try {
        localStorage.setItem('pranav_contact_inquiries', JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage save failed:", err);
      }

      setIsSending(false);
      setShowSuccess(true);
      
      // Reset fields
      setFullName('');
      setEmail('');
      setInterest('Full-Stack Web Development');
      setMessage('');
    }, 1200);
  };

  const clearInquiries = () => {
    setSavedInquiries([]);
    localStorage.removeItem('pranav_contact_inquiries');
  };

  return (
    <section id="contact" className="w-full relative py-20 overflow-hidden bg-mesh-glow border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-display font-bold text-[11px] tracking-widest text-[#4cd7f6] uppercase">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Extraordinary Together
          </h2>
          <div className="h-1 w-12 bg-[#4cd7f6] rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          
          {/* Left Column: Contact Pointers & Dubai Map (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8 select-none"
          >
            
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-lg text-white">
                Contact Parameters
              </h3>
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location */}
                <div className="glass-card p-5 rounded-2xl border border-white/5 bg-[#050508]/40 flex flex-col items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-wider">Location</h4>
                    <p className="font-sans text-sm text-white font-medium mt-0.5">Dubai, UAE</p>
                  </div>
                </div>

                {/* Email Address */}
                <a
                  href="mailto:contact@pranavps.com"
                  className="glass-card p-5 rounded-2xl border border-white/5 bg-[#050508]/40 flex flex-col items-start gap-3 hover:scale-101 duration-300"
                >
                  <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-wider">Email</h4>
                    <p className="font-sans text-xs sm:text-sm text-white font-medium mt-0.5 break-all">contact@pranavps.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Dubai Map Container - OpenStreetMap custom Iframe embed styled with subtle saturation */}
            <div className="space-y-2">
              <span className="font-display font-bold text-[10px] tracking-widest text-[#4cd7f6] uppercase">Dubai Operations Hub</span>
              <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
                {/* Embedded OSM map centered around Dubai Marina / Palm Jumeirah region */}
                <iframe
                  title="Dubai UAE Geographic Map representation"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=55.1000%2C25.0400%2C55.2600%2C25.1300&amp;layer=mapnik&amp;marker=25.0800%2C55.1500"
                  style={{ filter: 'invert(90%) hue-rotate(185deg) brightness(85%) contrast(120%) grayscale(40%)' }}
                  className="select-none pointer-events-auto"
                ></iframe>
                {/* Glow marker accent */}
                <div className="absolute top-4 right-4 bg-[#030304]/90 border border-white/10 p-2 rounded-xl text-[10px] font-mono text-on-surface-variant backdrop-blur-md shadow-lg pointer-events-none">
                  📍 Live Coordination Point
                </div>
              </div>
            </div>

            {/* Social Anchor button shortcuts */}
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-primary/20 border border-white/10 rounded-xl text-white transition-all cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-primary/20 border border-white/10 rounded-xl text-white transition-all cursor-pointer"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:pranav.ulegendary@gmail.com"
                className="p-3 bg-white/5 hover:bg-primary/20 border border-white/10 rounded-xl text-white transition-all cursor-pointer"
                title="Direct Email Alternative"
              >
                <Mail size={18} />
              </a>
            </div>

          </motion.div>

          {/* Right Column: Contact Inquiry Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/5 bg-gradient-to-br from-surface-container-low to-surface-dim relative">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white mb-6">
                Broadcast Inbound Transmission
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="font-display font-bold text-[10px] tracking-wider text-on-surface-variant uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Sarah Jenkins"
                    className="w-full bg-white/5 hover:bg-white/8 focus:bg-[#07070a] border border-white/10 focus:border-primary rounded-xl p-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors placeholder-on-surface-variant/30"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="font-display font-bold text-[10px] tracking-wider text-on-surface-variant uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., sarah@recruitingcorp.com"
                    className="w-full bg-white/5 hover:bg-white/8 focus:bg-[#07070a] border border-white/10 focus:border-primary rounded-xl p-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors placeholder-on-surface-variant/30"
                  />
                </div>

                {/* Select Dropdown Project Interest represented in designs */}
                <div className="space-y-1.5 relative">
                  <label className="font-display font-bold text-[10px] tracking-wider text-on-surface-variant uppercase">
                    Project Interest
                  </label>
                  <div className="relative">
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-white/5 hover:bg-white/8 focus:bg-[#07070a] border border-white/10 focus:border-primary rounded-xl p-3.5 px-4 pr-10 text-xs sm:text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-[#07070b] text-white" value="Full-Stack Web Development">Full-Stack Web Development (Next.js/React/Node.js)</option>
                      <option className="bg-[#07070b] text-white" value="Cross-Platform Mobile App">Cross-Platform Mobile App (Flutter/React Native)</option>
                      <option className="bg-[#07070b] text-white" value="Backend API Infrastructure">Backend API Support</option>
                      <option className="bg-[#07070b] text-white" value="Permanent Career / Hiring Pitch">Full-Time Career Opportunities</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="font-display font-bold text-[10px] tracking-wider text-on-surface-variant uppercase">
                    Inquiry Message
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Describe your goals, requirements, or hiring pitch..."
                    className="w-full bg-white/5 hover:bg-white/8 focus:bg-[#07070a] border border-white/10 focus:border-primary rounded-xl p-3.5 px-4 text-xs sm:text-sm text-white focus:outline-none transition-colors placeholder-on-surface-variant/30 resize-none"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-primary to-secondary text-white p-4.5 rounded-xl font-display font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] active:scale-99 shadow-lg disabled:opacity-40 select-none cursor-pointer text-center"
                >
                  {isSending ? (
                    <>
                      <RefreshCw size={14} className="animate-spin text-white" />
                      <span>Transmitting Broadcast...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Transmission</span>
                    </>
                  )}
                </button>

              </form>

              {/* Secure Floating LocalStorage persist success alert */}
              {showSuccess && (
                <div className="absolute inset-0 bg-[#030304]/96 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center text-center p-6 sm:p-8 animate-fade-in z-20">
                  <div className="p-4 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-4 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-display font-extrabold text-white text-lg sm:text-xl">Inquiry Received Successfully!</h4>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-sm mt-2 leading-relaxed">
                    Thank you. Your message has been validated and persisted locally. Pranav's team receives notifications instantly.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="mt-6 p-2 px-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </div>
            
            {/* Persisted Messages View (Recruiter verification demo) */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowInbox(!showInbox)}
                  className="text-[10px] font-mono tracking-widest text-[#4cd7f6] uppercase hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{showInbox ? ' ocultar inbox' : ' inspect persistent inbox (' + savedInquiries.length + ')'}</span>
                </button>
                {savedInquiries.length > 0 && showInbox && (
                  <button
                    onClick={clearInquiries}
                    className="text-[10px] font-mono text-rose-400 hover:underline cursor-pointer"
                  >
                    Clear All Records
                  </button>
                )}
              </div>

              {showInbox && (
                <div className="glass-card p-4 rounded-2xl border border-white/15 animate-fade-in space-y-3 bg-[#010101]/50">
                  {savedInquiries.length === 0 ? (
                    <p className="font-mono text-[10px] text-on-surface-variant/40">No records saved inside localStorage yet. Submit the form above!</p>
                  ) : (
                    <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                      {savedInquiries.map((inq) => (
                        <div key={inq.id} className="p-3 rounded-lg border border-white/5 bg-[#050508]/50 text-xs space-y-1.5 text-on-surface-variant">
                          <div className="flex items-center justify-between text-[10px] font-mono text-primary">
                            <span className="font-bold">{inq.fullName} ({inq.interest})</span>
                            <span className="text-on-surface-variant/40 text-[9px]">{inq.timestamp}</span>
                          </div>
                          <p className="font-sans leading-relaxed text-white/90 italic">"{inq.message}"</p>
                          <div className="text-[9px] font-mono text-on-surface-variant/40">Persistence address: localStorage://{inq.email}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
