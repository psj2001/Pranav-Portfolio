import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceProjects from './components/ExperienceProjects';
import SkillsArsenal from './components/SkillsArsenal';
import MilestonesEducation from './components/MilestonesEducation';
import ContactMe from './components/ContactMe';
import { Network, Terminal, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      let currentSection = 'about';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold to set active state when top of section rises above halfway of page
          if (rect.top <= 140) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial evaluation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030304] select-none text-on-surface overflow-x-hidden selection:bg-primary/20 selection:text-white font-sans antialiased">
      
      {/* Decorative background grid mesh pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Floating Header */}
      <Navbar activeSection={activeSection} />

      {/* Hero layout */}
      <Hero onNavigate={handleScrollToSegment} />

      {/* Career timeline & Filterable portfolio grid */}
      <ExperienceProjects />

      {/* Skills classifications */}
      <SkillsArsenal onNavigate={handleScrollToSegment} />

      {/* Stats milestones & academic background */}
      <MilestonesEducation />

      {/* Map, parameters, and form coords */}
      <ContactMe />

      {/* Signature dynamic Footer */}
      <footer className="w-full bg-[#010101] text-[#a4afd5]/50 border-t border-white/5 py-12 relative z-10 text-center font-display select-none">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-white">
            <Terminal size={16} className="text-primary animate-pulse" />
            <span className="font-extrabold tracking-wide uppercase text-xs">Digital Workspace of Pranav P S</span>
          </div>
          
          <p className="text-xs font-sans max-w-md mx-auto leading-relaxed">
            Architected and deployed utilizing React 19, TypeScript, and Tailwind CSS. Backed by secured Gemini AI twins.
          </p>

          <div className="text-[10px] uppercase font-mono tracking-widest text-[#a4afd5]/30">
            © 2026 Pranav P S. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
}
