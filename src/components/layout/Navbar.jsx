import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { label: 'Product Design & Development', href: '/services/product-design' },
  { label: 'Electronics Circuit Design',   href: '/services/circuit-design' },
  { label: 'PCB Design',                   href: '/services/pcb-design' },
  { label: 'Reverse Engineering',          href: '/services/reverse-engineering' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-surface-border'
        : 'bg-transparent'
    }`}>
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-cyan">
            iGatebots
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={({isActive}) =>
              isActive ? 'text-cyan text-sm font-medium' : 'nav-link'
            }>Home</NavLink>

            <NavLink to="/about" className={({isActive}) =>
              isActive ? 'text-cyan text-sm font-medium' : 'nav-link'
            }>About Us</NavLink>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
              <button className="nav-link flex items-center gap-1">
                Engineering Services <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-surface-card border border-surface-border rounded-xl shadow-card overflow-hidden"
                  >
                    {services.map(s => (
                      <NavLink key={s.href} to={s.href}
                        className="block px-4 py-3 text-sm text-white/80 hover:text-cyan hover:bg-surface-muted transition-colors duration-150"
                      >{s.label}</NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/portfolio" className={({isActive}) =>
              isActive ? 'text-cyan text-sm font-medium' : 'nav-link'
            }>Portfolio</NavLink>

            <NavLink to="/contact" className="btn-primary text-sm">
              Contact Us
            </NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 text-white/80 hover:text-cyan"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-900/98 backdrop-blur-md border-t border-surface-border"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <NavLink to="/" className="text-white/80 hover:text-cyan py-2">Home</NavLink>
              <NavLink to="/about" className="text-white/80 hover:text-cyan py-2">About Us</NavLink>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                  Engineering Services
                </p>
                {services.map(s => (
                  <NavLink key={s.href} to={s.href}
                    className="block py-2 pl-3 text-sm text-white/70 hover:text-cyan border-l border-surface-border hover:border-cyan"
                  >{s.label}</NavLink>
                ))}
              </div>
              <NavLink to="/portfolio" className="text-white/80 hover:text-cyan py-2">Portfolio</NavLink>
              <NavLink to="/contact" className="btn-primary text-center mt-2">Contact Us</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
