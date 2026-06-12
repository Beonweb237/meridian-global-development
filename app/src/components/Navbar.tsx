import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import MobileMenu from './MobileMenu';
import type { MegaMenuItem } from '../data/siteData';

/* ------------------------------------------------------------------ */
/*  MegaMenuDropdown – full-width fixed panel below the navbar        */
/* ------------------------------------------------------------------ */
interface MegaMenuDropdownProps {
  items: MegaMenuItem[];
  onNavigate: (href: string) => void;
}

function MegaMenuDropdown({ items, onNavigate }: MegaMenuDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="megamenu-panel"
    >
      <div className="container-main py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
          {items.map((item) => (
            <div key={item.label} className="min-w-0">
              <button
                onClick={() => onNavigate(item.href)}
                className="text-left group w-full"
              >
                <span
                  className="block text-sm font-semibold mb-1 transition-colors group-hover:text-[var(--medium-blue)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.label}
                </span>
                {item.description && (
                  <span
                    className="text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.description}
                  </span>
                )}
              </button>

              {item.children && item.children.length > 0 && (
                <div className="mt-2 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      onClick={() => onNavigate(child.href)}
                      className="block w-full text-left py-1 text-sm transition-colors hover:text-[var(--medium-blue)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { siteData } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  /* close search on ESC */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setHoveredNav(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavigate = useCallback(
    (href: string) => {
      navigate(href);
      setHoveredNav(null);
      setSearchOpen(false);
    },
    [navigate]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-50 bg-white transition-shadow duration-200"
        style={{
          height: 64,
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="container-main h-full flex items-center justify-between">
          {/* ---- Logo (left) ---- */}
          <Link to="/" className="flex flex-col justify-center shrink-0">
            <span
              className="text-xl font-bold tracking-[0.12em] leading-none"
              style={{ color: 'var(--primary-blue)' }}
            >
              MERIDIAN
            </span>
            <span
              className="text-[10px] tracking-[0.2em] leading-tight mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              GLOBAL DEVELOPMENT
            </span>
          </Link>

          {/* ---- Desktop Nav (center) ---- */}
          <nav className="hidden md:flex items-center gap-0.5">
            {siteData.navItems.map((item, idx) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredNav(idx)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <button
                  onClick={() => handleNavigate(item.href)}
                  className="relative px-3 py-2 nav-link-style transition-colors"
                  style={{
                    color:
                      hoveredNav === idx
                        ? 'var(--medium-blue)'
                        : 'var(--text-primary)',
                  }}
                >
                  {item.label}
                  {/* underline hover effect */}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] transition-transform duration-200 origin-left"
                    style={{
                      backgroundColor: 'var(--medium-blue)',
                      transform:
                        hoveredNav === idx ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </button>

                {/* Full-width mega menu dropdown */}
                <AnimatePresence>
                  {item.megaMenu && hoveredNav === idx && (
                    <MegaMenuDropdown
                      items={item.megaMenu}
                      onNavigate={handleNavigate}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ---- Right actions ---- */}
          <div className="flex items-center gap-2">
            {/* Search icon – desktop only */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded hover:bg-gray-50 transition-colors"
              aria-label="Toggle search"
            >
              {searchOpen ? (
                <X size={18} style={{ color: 'var(--text-secondary)' }} />
              ) : (
                <Search size={18} style={{ color: 'var(--text-secondary)' }} />
              )}
            </button>

            {/* Language badge – desktop only */}
            <span
              className="hidden md:inline-block text-xs font-medium px-2 py-1 rounded"
              style={{
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
              }}
            >
              EN
            </span>

            {/* Hamburger – mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden w-10 h-10 items-center justify-center"
              aria-label="Open menu"
            >
              <Menu size={24} style={{ color: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>

        {/* ---- Search dropdown ---- */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-b bg-white"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="container-main py-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                    className="w-full h-12 px-4 pr-12 text-base border rounded"
                    style={{ borderColor: 'var(--border)' }}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
                    aria-label="Submit search"
                  >
                    <Search
                      size={18}
                      style={{ color: 'var(--text-secondary)' }}
                    />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ---- Mobile menu ---- */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
