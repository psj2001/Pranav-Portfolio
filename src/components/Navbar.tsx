import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { blogDestination, blogFromPath, caseStudyFromPath, goHome, roleFromPath, scrollBehavior, shopifyFromPath, usePathname } from '../routes';
import RouteLink from './RouteLink';

interface NavbarProps {
  activeSection: string;
  flutter?: boolean;
  fullstack?: boolean;
  marketing?: boolean;
}

export default function Navbar({ activeSection, flutter = false, fullstack = false, marketing = false }: NavbarProps) {
  const pathname = usePathname();
  const onRolePage = roleFromPath(pathname) !== null;
  const onBlog = blogFromPath(pathname) !== null;
  const onCase = caseStudyFromPath(pathname) !== null;
  const onShopify = shopifyFromPath(pathname) !== null;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    ...(flutter
      ? [
          { id: 'experience', label: 'Experience' },
          { id: 'skills', label: 'Skills' },
        ]
      : [
          { id: 'skills', label: 'Skills' },
          { id: 'experience', label: 'Experience' },
        ]),
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const roleSections = new Set(['about', 'skills', 'experience', 'projects', 'contact']);
  const activeText = flutter ? 'text-[#027DFD]' : fullstack ? 'text-[#FF7A00]' : marketing ? 'text-[#FFD000]' : 'text-[#00e5e5]';
  const activeBar = flutter ? 'bg-[#027DFD]' : fullstack ? 'bg-[#FF7A00]' : marketing ? 'bg-[#FFD000]' : 'bg-[#00e5e5]';

  const routeHref = (id: string) => {
    if (id === 'home') return '/';
    if (id === 'blog') return blogDestination(pathname);
    return null;
  };

  const handleScrollToSegment = (id: string) => {
    setMobileMenuOpen(false);
    if (onBlog || onCase || onShopify) {
      goHome(id);
      return;
    }
    if (onRolePage && id === 'home') {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      return;
    }
    if ((flutter || fullstack || marketing) && roleSections.has(id)) {
      const element = document.getElementById(id);
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({ top: topOffset, behavior: scrollBehavior() });
        return;
      }
    }
    if (onRolePage) {
      goHome(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top: topOffset, behavior: scrollBehavior() });
    }
  };

  const itemClass = (id: string) =>
    `relative min-h-11 cursor-pointer py-2 transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
      (id === 'blog' ? onBlog : !onBlog && activeSection === id) ? activeText : 'text-white/80'
    }`;

  const mobileItemClass = (id: string) =>
    `min-h-11 cursor-pointer border-b border-white/5 p-2 text-left text-[15px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
      (id === 'blog' ? onBlog : !onBlog && activeSection === id) ? activeText : 'text-white/80'
    }`;



  return (
    <nav
      id="top-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050b0e]/85 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(1,1,2,0.6)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Name */}
        <RouteLink
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex cursor-pointer items-center gap-1.5 pr-4 font-sans text-[1.15rem] font-bold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span>Pranav P S.</span>
          <span className={`h-1.5 w-1.5 rounded-full ${flutter ? 'bg-[#027DFD]' : fullstack ? 'bg-[#FF7A00]' : marketing ? 'bg-[#FFD000]' : 'bg-[#00e5e5]'}`}></span>
        </RouteLink>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-5 font-sans text-[15px] font-medium lg:gap-7">
          {navItems.map((item) => {
            const href = routeHref(item.id);
            const activeMark = (item.id === 'blog' ? onBlog : !onBlog && activeSection === item.id) ? (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${activeBar}`} />
            ) : null;
            if (href) {
              return (
                <RouteLink key={item.id} href={href} className={itemClass(item.id)} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                  {activeMark}
                </RouteLink>
              );
            }
            return (
              <button
                key={item.id}
                type="button"
                className={itemClass(item.id)}
                onClick={() => handleScrollToSegment(item.id)}
              >
                {item.label}
                {activeMark}
              </button>
            );
          })}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="absolute top-full left-0 right-0 bg-[#030304]/95 backdrop-blur-xl border-b border-white/5 p-5 flex flex-col gap-4 shadow-xl z-50 md:hidden animate-fade-in">
          {navItems.map((item) => {
            const href = routeHref(item.id);
            if (href) {
              return (
                <RouteLink key={item.id} href={href} className={mobileItemClass(item.id)} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </RouteLink>
              );
            }
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollToSegment(item.id)}
                className={mobileItemClass(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
