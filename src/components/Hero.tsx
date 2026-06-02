import { Terminal, Download, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { downloadResume } from '../utils/resume';
import { PROJECTS } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const handleDownloadResume = () => {
    downloadResume();
  };

  const mobileAppsCount = 12;
  const websitesCount = PROJECTS.filter((p) => p.category === 'website').length;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-mesh-glow"
    >
      {/* Waveform floating particle backgrounds */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-1/4 left-[8%] w-48 h-48 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-[5%] w-64 h-64 bg-secondary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 left-10 w-2 h-2 bg-primary rounded-full blur-xs opacity-50 animate-float-slow"></div>
        <div className="absolute top-1/2 right-24 w-3.5 h-3.5 bg-secondary rounded-full blur-xs opacity-40 animate-float-medium" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center gap-8">
        
        {/* Giant Title - Space Grotesk */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[84px] font-extrabold text-white leading-[1.05] tracking-tight">
          Full Stack <br />
          <span className="text-gradient">Mobile App Developer</span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed mx-auto">
          I am Pranav P S, a Full-Stack & Mobile Developer based in Dubai with 4 years of professional experience. I craft responsive mobile experiences, scalable web applications, and high-performance backend systems with a focus on clean architecture and modern technologies.
        </p>

        {/* Quick Stats monitor block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 px-6 w-full max-w-[600px] rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm font-mono text-[10px] text-on-surface-variant mx-auto">
          <div>
            <div className="text-outline uppercase tracking-wider mb-1">Mobile Apps</div>
            <div className="text-white font-bold font-sans text-xs">{mobileAppsCount} Apps Developed</div>
          </div>
          <div>
            <div className="text-outline uppercase tracking-wider mb-1">Web Engineering</div>
            <div className="text-white font-bold font-sans text-xs">{websitesCount} Websites Developed</div>
          </div>
          <div>
            <div className="text-outline uppercase tracking-wider mb-1">Location</div>
            <div className="text-primary font-bold font-sans text-xs">Dubai, UAE</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 w-full sm:w-auto">
          <button
            onClick={handleDownloadResume}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <Download size={14} />
            <span>Download CV</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
          >
            <span>Initialize Project</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
