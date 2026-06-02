import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Smartphone, Network, Container, Database, Wrench, ArrowRight, ShieldCheck, Stars, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface SkillsArsenalProps {
  onNavigate: (id: string) => void;
}

export default function SkillsArsenal({ onNavigate }: SkillsArsenalProps) {
  
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'smartphone':
        return <Smartphone className="text-primary" size={20} />;
      case 'account_tree':
        return <Network className="text-secondary" size={20} />;
      case 'cloud_done':
        return <Container className="text-tertiary" size={20} />;
      case 'database':
        return <Database className="text-primary" size={20} />;
      case 'construction':
        return <Wrench className="text-secondary" size={20} />;
      default:
        return <Sparkles className="text-primary" size={20} />;
    }
  };

  return (
    <section id="skills" className="w-full relative py-20 overflow-hidden bg-mesh-glow">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-display font-bold text-[11px] tracking-widest text-secondary uppercase">
            Technical Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Arsenal
          </h2>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-lg leading-relaxed">
            A curated stack of technologies I utilize to engineer fluid, production-ready digital products.
          </p>
          <div className="h-1 w-12 bg-secondary rounded-full" />
        </div>

        {/* Skills Layout Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Custom Categories grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 sm:p-7 rounded-[2rem] border border-white/5 space-y-5 flex flex-col h-full"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <h3 className="font-display font-extrabold text-white text-sm sm:text-base tracking-wide uppercase">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`flex items-center gap-1.5 p-2 px-3.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                        skill.isPrimary
                          ? 'bg-gradient-to-r from-primary-container/10 to-secondary-container/10 border-primary-container/30 text-primary hover:scale-[1.03]'
                          : 'bg-white/5 border-white/5 hover:border-white/10 text-on-surface-variant'
                      }`}
                    >
                      {skill.isPrimary && <Stars size={12} className="text-secondary shrink-0 animate-spin" style={{ animationDuration: '6s' }} />}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Architecture Banner card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            
            {/* The Mobile Architect Teaser card layout shown in the designs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-7 sm:p-8 rounded-[2rem] border border-primary-container/20 bg-gradient-to-b from-primary-container/5 to-surface-dim/95 relative overflow-hidden flex flex-col justify-between h-full group min-h-[360px]"
            >
              {/* Pattern Background Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/15 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

              <div className="space-y-6 relative z-10">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary w-fit">
                  <Smartphone size={24} className="animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-white text-xl sm:text-2xl leading-tight">
                    Need a Full Stack Engineer?
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Let's collaborate on your next digital innovation. I'll translate technical blueprints into production-ready platforms that perform with speed and design precision.
                  </p>
                </div>
              </div>

              {/* Action trigger button */}
              <button
                onClick={() => onNavigate('contact')}
                className="mt-8 flex items-center justify-between bg-gradient-to-r from-primary-container to-secondary-container text-white p-4.5 rounded-2xl font-display font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-lg cursor-pointer text-center relative z-10"
              >
                <span>Get in touch</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
