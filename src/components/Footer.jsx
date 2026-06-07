import { Link } from 'react-router-dom';
import { IMAGES, COMPANY, SERVICES } from '../data/siteData';
import { ServiceIcon } from './ServiceIcon';

const socials = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />,
  },
  {
    name: 'Twitter / X',
    href: '#',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    name: 'YouTube',
    href: '#',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.59 6.69a4.83 4.83 0 01-3.77-2.73 19.58 19.58 0 00-9.65 0 4.83 4.83 0 01-3.77 2.73C2.18 7.45 2 8.27 2 9.1c0 2.3.77 4.45 2.05 6.17a4.27 4.27 0 003.76 1.77c.65-.01 1.3-.13 1.9-.35L12 18l2.29-.31c.6.22 1.25.34 1.9.35a4.27 4.27 0 003.76-1.77A10.77 10.77 0 0022 9.1c0-.83-.18-1.65-.41-2.41zM9.75 13.5v-4.5l4.5 2.25-4.5 2.25z" />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M17.5 6.5h.01" /><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /></>,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img
                src={IMAGES.logo}
                alt="iGatebots"
                className="h-11 w-auto"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6 font-body">
              {COMPANY.description}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:border-primary-500/40 hover:bg-primary-500/8 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="flex items-center gap-2.5 text-white/40 text-sm font-body hover:text-primary-400 transition-colors duration-200 group"
                  >
                    <div className="w-5 h-5 rounded flex items-center justify-center text-white/20 group-hover:text-primary-400/60 transition-colors shrink-0">
                      <ServiceIcon slug={s.slug} className="w-3.5 h-3.5" />
                    </div>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-primary-400/60 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-white/40 text-sm font-body leading-relaxed">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary-400/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${COMPANY.email}`} className="text-white/40 text-sm font-body hover:text-primary-400 transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary-400/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href={`tel:${COMPANY.phone}`} className="text-white/40 text-sm font-body hover:text-primary-400 transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-body">
            © {year} iGateBots. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/25 text-xs font-body hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/25 text-xs font-body hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
