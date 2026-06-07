import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGES, SERVICES } from '../data/siteData';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/98 backdrop-blur-xl border-b border-white/5 py-3'
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
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-body transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-white bg-white/5'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
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
                  </button>

                  {/* Invisible bridge between button and dropdown to prevent gap-triggered close */}
                  {servicesOpen && (
                    <div className="absolute top-full left-0 right-0 h-3 z-10" />
                  )}

                  <div
                    ref={dropdownRef}
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                    className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-80 transition-all duration-200 z-50 ${
                      servicesOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-dark-800 border border-white/8 rounded-2xl p-2 shadow-2xl shadow-black/60">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.slug}`}
                          className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-primary-500/10 transition-colors duration-150 group/item"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0 group-hover/item:bg-primary-500/20 transition-colors">
                            {SERVICE_ICONS[s.slug]}
                          </div>
                          <div>
                            <p className="text-sm font-body font-medium text-white/85 group-hover/item:text-white transition-colors leading-tight">
                              {s.title}
                            </p>
                            <p className="text-xs text-white/35 mt-0.5">{s.subtitle}</p>
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
                  className={`px-4 py-2.5 rounded-lg text-sm font-body transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-white bg-white/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="w-px h-5 bg-white/10 mx-2" />
            <Link
              to="/contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-400 text-white text-sm font-body font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-screen mt-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-dark-800/98 border border-white/8 rounded-2xl p-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.label}>
                  <p className="px-4 py-2 text-xs font-body text-white/30 uppercase tracking-widest">
                    {link.label}
                  </p>
                  {SERVICES.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-500/8 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                        {SERVICE_ICONS[s.slug]}
                      </div>
                      <span className="text-sm text-white/70 font-body">{s.title}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-body transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary-500/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2 border-t border-white/5 mt-1">
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary-500 text-white text-sm font-body font-medium rounded-xl transition-all"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
