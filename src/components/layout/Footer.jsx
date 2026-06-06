import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

const serviceLinks = [
  { label: 'Product Design & Development', href: '/services/product-design' },
  { label: 'Electronics Circuit Design',   href: '/services/circuit-design' },
  { label: 'PCB Design',                   href: '/services/pcb-design' },
  { label: 'Reverse Engineering',          href: '/services/reverse-engineering' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-surface-border">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-bold text-xl text-cyan mb-4">iGatebots</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              iGatebots is at the forefront of electronic innovation, offering expert solutions
              in product design, circuit design, PCB design, and reverse engineering.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin,  href: '#', label: 'LinkedIn'  },
                { icon: Twitter,   href: '#', label: 'Twitter'   },
                { icon: Facebook,  href: '#', label: 'Facebook'  },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center
                             text-white/60 hover:text-cyan hover:border-cyan transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link to={link.href}
                    className="text-white/60 hover:text-cyan text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home',      href: '/'         },
                { label: 'About Us',  href: '/about'    },
                { label: 'Portfolio', href: '/portfolio'},
                { label: 'Contact',   href: '/contact'  },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href}
                    className="text-white/60 hover:text-cyan text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-cyan mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  374, 8th Cross, GPR Royale Layout,<br />
                  Electronic City Phase 2,<br />
                  Bangalore, Karnataka 560100
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-cyan flex-shrink-0" />
                <a href="mailto:info@igatebots.com"
                  className="text-white/60 hover:text-cyan text-sm transition-colors duration-200">
                  info@igatebots.com
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-cyan flex-shrink-0" />
                <a href="tel:+911234567890"
                  className="text-white/60 hover:text-cyan text-sm transition-colors duration-200">
                  +91 1234567890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-surface-border flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2023 iGateBots. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
