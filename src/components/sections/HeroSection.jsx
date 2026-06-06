import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Zap, CircuitBoard, Search } from 'lucide-react'

const floatingBadges = [
  { icon: Cpu,          label: 'Product Design'  },
  { icon: Zap,          label: 'Circuit Design'  },
  { icon: CircuitBoard, label: 'PCB Design'      },
  { icon: Search,       label: 'Reverse Eng.'    },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy-900 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[800px] rounded-full
                      bg-gradient-radial from-cyan/10 via-transparent to-transparent
                      pointer-events-none" />

      <div className="container-max section-padding relative z-10 pt-32">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5
                       border border-cyan/30 rounded-full bg-cyan/10"
          >
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-slow" />
            <span className="text-cyan text-xs font-mono tracking-widest uppercase">
              Innovative Engineering Solutions
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Bringing Your{' '}
            <span className="gradient-text">Electronic Ideas</span>{' '}
            to Life
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
          >
            iGatebots delivers expert solutions in Product Design, Electronics Circuit Design,
            PCB Design, and Reverse Engineering — from concept to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-2">
              Get In Touch <ArrowRight size={16} />
            </Link>
            <Link to="/services/product-design" className="btn-outline">
              Explore Services
            </Link>
          </motion.div>

          {/* Floating service badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {floatingBadges.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full
                           bg-surface-card border border-surface-border
                           text-white/70 text-sm"
              >
                <Icon size={13} className="text-cyan" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
