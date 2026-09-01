import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES, SERVICES, COMPANY } from '../data/siteData';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const SERVICE_ICONS = {
  'product-design': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-9 5.25-9-5.25v-2.25" />
    </svg>
  ),
  'electronics-circuit': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  'pcb-design': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),
  'reverse-engineering': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
    </svg>
  ),
  'consultation': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.874-.962 4.492 4.492 0 00.75-2.023C3.82 16.326 3 14.267 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop & Main Navigation Bar ────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-900/98 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={IMAGES.logo}
                alt="iGatebots"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    ref={triggerRef}
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-body transition-colors duration-200 relative ${
                        isActive(link.href)
                          ? 'text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {link.label}
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      {isActive(link.href) && (
                        <motion.span
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-white/5 rounded-lg border-b-2 border-primary-400"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Invisible bridge to prevent gap-triggered close */}
                    {servicesOpen && (
                      <div className="absolute top-full left-0 right-0 h-3 z-10" />
                    )}

                    <div
                      ref={dropdownRef}
                      onMouseEnter={openDropdown}
                      onMouseLeave={scheduleClose}
                      className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-88 max-w-[90vw] transition-all duration-200 z-50 ${
                        servicesOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-dark-800 border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/80 max-h-[calc(100vh-6rem)] overflow-y-auto">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.id}
                            to={`/services/${s.slug}`}
                            className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-primary-500/10 transition-colors duration-150 group/item"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0 group-hover/item:bg-primary-500/20 transition-colors">
                              {SERVICE_ICONS[s.slug]}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-body font-medium text-white/90 group-hover/item:text-white transition-colors leading-tight truncate">
                                {s.title}
                              </p>
                              <p className="text-xs text-white/40 mt-0.5 truncate">{s.subtitle}</p>
                            </div>
                          </Link>
                        ))}
                        <div className="mt-2 pt-2 border-t border-white/5 px-2">
                          <Link
                            to="/services"
                            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-primary-400 hover:text-primary-300 hover:bg-primary-500/5 transition-colors font-medium"
                          >
                            View all services
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-4 py-2.5 rounded-lg text-sm font-body transition-colors duration-200 relative ${
                      isActive(link.href)
                        ? 'text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-white/5 rounded-lg border-b-2 border-primary-400"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              )}
              <div className="w-px h-5 bg-white/10 mx-2" />
              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-400 text-white text-sm font-body font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25 hover:shadow-glow-primary hover:-translate-y-0.5 active:scale-95"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile hamburger button */}
            <button
              className="lg:hidden p-2.5 rounded-xl border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Slide-Out Mobile Navigation Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out Sidebar Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] max-w-[92vw] h-full bg-dark-900 border-l border-white/10 z-[1000] lg:hidden flex flex-col shadow-2xl shadow-black"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-dark-900/95 shrink-0">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                  <img src={IMAGES.logo} alt="iGatebots" className="h-9 w-auto" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 overscroll-contain">
                {/* Main Links */}
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                    isActive('/')
                      ? 'bg-primary-500/15 border border-primary-500/30 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                    isActive('/about')
                      ? 'bg-primary-500/15 border border-primary-500/30 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  About Us
                </Link>

                {/* All 5 Services Section */}
                <div className="rounded-2xl bg-dark-800/80 border border-white/8 p-3 space-y-1">
                  <div className="flex items-center justify-between px-2 py-1.5 mb-1">
                    <span className="text-xs font-mono uppercase text-primary-400 font-semibold tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                      Our Services ({SERVICES.length})
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs text-primary-400 hover:text-primary-300 font-body font-medium"
                    >
                      View All &rarr;
                    </Link>
                  </div>

                  {SERVICES.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary-500/10 active:bg-primary-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-500/15 border border-primary-500/25 flex items-center justify-center text-primary-400 shrink-0 group-hover:bg-primary-500/25 transition-colors">
                        {SERVICE_ICONS[s.slug]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-body font-medium text-white group-hover:text-primary-300 transition-colors leading-tight">
                          {s.title}
                        </p>
                        <p className="text-[11px] text-white/40 mt-0.5 truncate">
                          {s.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/consultation"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                    isActive('/consultation')
                      ? 'bg-primary-500/15 border border-primary-500/30 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Consultation</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30">
                    NEW
                  </span>
                </Link>

                <Link
                  to="/projects"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                    isActive('/projects')
                      ? 'bg-primary-500/15 border border-primary-500/30 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Projects & Portfolio
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                    isActive('/contact')
                      ? 'bg-primary-500/15 border border-primary-500/30 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Contact Us
                </Link>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-4 border-t border-white/10 bg-dark-900/95 shrink-0 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/consultation"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center py-3 px-2 border border-primary-500/40 text-primary-300 hover:text-white hover:bg-primary-500/10 text-xs font-body font-semibold rounded-xl transition-all text-center"
                  >
                    Book Advisory
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center py-3 px-2 bg-primary-500 hover:bg-primary-400 text-white text-xs font-body font-semibold rounded-xl transition-all text-center shadow-lg shadow-primary-500/25"
                  >
                    Get a Quote
                  </Link>
                </div>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center justify-center gap-2 text-xs text-white/50 hover:text-primary-300 py-1 transition-colors font-body"
                >
                  <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {COMPANY.phone}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
