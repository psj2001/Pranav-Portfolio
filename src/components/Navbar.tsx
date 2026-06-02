import { useState, useEffect } from 'react';
import { Menu, X, Star } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleScrollToSegment = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };



  return (
    <nav
      id="top-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030304]/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(1,1,2,0.6)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Name */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl font-extrabold text-white tracking-tight cursor-pointer selection:bg-none flex items-center gap-2 pr-4"
        >
          <span>Pranav P S</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse hidden md:inline-block h-2 w-2"></span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8 font-display text-xs uppercase tracking-wider font-semibold">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`hover:text-primary transition-all duration-150 cursor-pointer relative py-2 ${
                activeSection === item.id ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
              onClick={() => handleScrollToSegment(item.id)}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all cursor-pointer text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="absolute top-full left-0 right-0 bg-[#030304]/95 backdrop-blur-xl border-b border-white/5 p-5 flex flex-col gap-4 shadow-xl z-50 md:hidden animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollToSegment(item.id)}
              className={`text-left text-sm uppercase tracking-widest font-semibold p-2 border-b border-white/5 cursor-pointer ${
                activeSection === item.id ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
