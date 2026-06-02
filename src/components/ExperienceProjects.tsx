import { useState } from 'react';
import { EXPERIENCES, PROJECTS } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, Tag, Smartphone, FolderGit2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExperienceProjects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mobileapp' | 'website' | 'freelance'>('all');

  // Helper to determine all categories a project belongs to
  const getProjectCategories = (p: typeof PROJECTS[0]): ('mobileapp' | 'website' | 'freelance')[] => {
    const cats: ('mobileapp' | 'website' | 'freelance')[] = [];

    // Ensure we start with database category
    if (p.category === 'mobileapp' || p.category === 'website' || p.category === 'freelance') {
      cats.push(p.category);
    }

    // Force freelance status for requested projects
    if (['smn-kitchen', 'cooplus', 'hrf-handicrafts', 'crm-falcon'].includes(p.id)) {
      if (!cats.includes('freelance')) cats.push('freelance');
    }

    // Force mobileapp status for requested projects (excluding crm-falcon)
    if (['smn-kitchen', 'cooplus', 'hrf-handicrafts'].includes(p.id)) {
      if (!cats.includes('mobileapp')) cats.push('mobileapp');
    }

    return cats;
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    const cats = getProjectCategories(p);
    return cats.includes(activeFilter);
  });

  const categories = [
    { id: 'all' as const, label: 'All' },
    { id: 'mobileapp' as const, label: 'Mobile App' },
    { id: 'website' as const, label: 'Website' },
    { id: 'freelance' as const, label: 'Freelance' }
  ];

  return (
    <div className="w-full bg-surface-dim relative py-20 overflow-hidden">
      
      {/* Background vector glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-32">
        
        {/* SECTION 1: Professional Experience (Timeline / Career Journey) */}
        <section id="experience" className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-display font-bold text-[11px] tracking-widest text-primary uppercase">
              Career Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Professional Experience
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>

          {/* Timeline Node Chain */}
          <div className="max-w-4xl mx-auto relative pl-4 sm:pl-8 border-l border-white/10 space-y-12 py-4">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Timeline Pulsing Node */}
                <div className={`absolute -left-[27px] sm:-left-[43px] top-1 p-2 rounded-full border shadow-xl transition-transform duration-300 group-hover:scale-115 ${
                  exp.badgeType === 'current' 
                    ? 'bg-gradient-to-r from-primary to-secondary border-primary/20 text-surface-dim' 
                    : 'bg-surface-container border-white/15 text-on-surface-variant'
                }`}>
                  <Briefcase size={14} className="animate-pulse" />
                </div>

                {/* Glassmorphic Experience Card */}
                <div className="glass-card p-6 sm:p-8 rounded-2xl relative border border-white/5 space-y-4 select-none">
                  
                  {/* Badge & Period Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-primary transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <span className={`text-[10px] uppercase font-mono font-bold tracking-widest p-1 px-2.5 rounded-md ${
                        exp.badgeType === 'current'
                          ? 'bg-primary-container/20 border border-primary-container/30 text-primary animate-pulse'
                          : 'bg-white/5 border border-white/10 text-on-surface-variant'
                      }`}>
                        {exp.badgeType === 'current' ? 'Active App Specialist' : 'Historical Milestone'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
                      <Calendar size={13} className="text-primary/70" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-on-surface">
                    <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                      {exp.company}
                    </span>
                    <span className="h-1 w-1 bg-white/20 rounded-full hidden sm:inline" />
                    <div className="flex items-center gap-1 font-sans text-on-surface-variant">
                      <MapPin size={13} className="text-secondary" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Role Description */}
                  <div className="space-y-3">
                    <p className="font-sans text-sm sm:text-base text-on-surface leading-relaxed">
                      {exp.description}
                    </p>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-2.5 pl-4 sm:pl-5 list-disc text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="marker:text-primary">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Framework & Technology Pills */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono text-outline uppercase tracking-wider mr-2">Featured:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#121932] hover:bg-[#1c2646] border border-white/5 rounded-md font-mono text-xs text-on-surface transition-all whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Filterable Unified Portfolio */}
        <section id="projects" className="space-y-12 pt-8">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-display font-bold text-[11px] tracking-widest text-primary uppercase animate-pulse">
              Portfolio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-on-surface-variant font-sans text-xs sm:text-sm max-w-xl">
              A curated collection of production-ready cross-platform mobile systems, high-profile global e-commerce structures, regional portals, and boutique custom apps I have engineered.
            </p>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>

          {/* Interactive filter row */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto select-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-display font-semibold transition-all duration-300 cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-gradient-to-r from-primary-container to-secondary-container text-white border border-primary-container shadow-lg scale-102 font-bold'
                    : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-on-surface-variant'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Combined Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => {
                const cats = getProjectCategories(proj);
                const isMobile = cats.includes('mobileapp');
                const isWeb = cats.includes('website');
                const isFreelance = cats.includes('freelance');
                
                let hoverTextClass = 'group-hover:text-primary';
                let badgeLabel = 'Project';
                let badgeClass = 'text-primary bg-[#6366f1]/10 border-[#6366f1]/20';
                let iconColor = 'text-secondary';

                let displayType: 'mobileapp' | 'website' | 'freelance' = proj.category as any;
                if (activeFilter !== 'all' && cats.includes(activeFilter)) {
                  displayType = activeFilter;
                } else if (isFreelance) {
                  displayType = 'freelance';
                } else if (isMobile) {
                  displayType = 'mobileapp';
                } else if (isWeb) {
                  displayType = 'website';
                }

                if (displayType === 'mobileapp') {
                  hoverTextClass = 'group-hover:text-primary';
                  badgeLabel = 'Mobile App';
                  badgeClass = 'text-primary bg-primary/10 border-primary/20';
                  iconColor = 'text-secondary';
                } else if (displayType === 'website') {
                  hoverTextClass = 'group-hover:text-[#4cd7f6]';
                  badgeLabel = 'Website';
                  badgeClass = 'text-[#4cd7f6] bg-[#4cd7f6]/10 border-[#4cd7f6]/20';
                  iconColor = 'text-[#4cd7f6]';
                } else if (displayType === 'freelance') {
                  hoverTextClass = 'group-hover:text-amber-400';
                  badgeLabel = 'Freelance';
                  badgeClass = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
                  iconColor = 'text-amber-400';
                }

                return (
                  <motion.div
                    key={proj.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="glass-card rounded-[2rem] overflow-hidden flex flex-col h-full border border-white/5 group relative"
                  >
                    {/* Image Frame */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[#0c1328]">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030304] to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40"></div>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter saturate-[1.1] brightness-[0.88]"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`p-1.5 px-3 rounded-lg backdrop-blur-md border font-mono text-[9px] uppercase tracking-wider font-bold shadow-lg ${badgeClass}`}>
                          {badgeLabel}
                        </span>
                      </div>
                    </div>

                    {/* Info Panel */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-display font-extrabold text-white text-base sm:text-lg transition-colors cursor-pointer ${hoverTextClass}`}>
                            {proj.title}
                          </h4>
                          <div className="p-1.5 rounded-lg border border-white/10 text-on-surface-variant hover:text-white transition-all cursor-pointer">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
}
