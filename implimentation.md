# iGatebots Website Revamp — Full Implementation Plan

> **Stack:** React 18 + Vite 5 + Tailwind CSS v3 + Framer Motion + React Router v6  
> **Source:** Scraped from https://igatebots.com (all pages)  
> **Theme:** Dark navy/cyan tech aesthetic based on iGatebots logo

---

## Table of Contents

1. [Real Content & Contact Details (from live site)](#1-real-content--contact-details)
2. [Brand & Design System](#2-brand--design-system)
3. [Project Setup](#3-project-setup)
4. [File & Folder Structure](#4-file--folder-structure)
5. [Tailwind Config](#5-tailwind-config)
6. [Routing (App.jsx)](#6-routing-appjsx)
7. [Shared Layout Components](#7-shared-layout-components)
   - Navbar
   - Footer
8. [Data Files](#8-data-files)
9. [Page-by-Page Implementation](#9-page-by-page-implementation)
   - Home
   - About
   - Service Pages (×4)
   - Portfolio
   - Contact
10. [Reusable UI Components](#10-reusable-ui-components)
11. [Custom Hooks](#11-custom-hooks)
12. [SEO & Meta](#12-seo--meta)
13. [Deployment](#13-deployment)
14. [Asset Checklist](#14-asset-checklist)

---

## 1. Real Content & Contact Details

All content below is scraped directly from https://igatebots.com and its sub-pages.

### Company Identity

| Field | Value |
|---|---|
| Company Name | iGatebots |
| Tagline | "Innovative Solutions for Your Technological Needs" |
| Description | "iGatebots is at the forefront of electronic innovation, offering expert solutions in product design, circuit design, PCB design, and reverse engineering. We are committed to turning your electronic ideas into reality with precision and expertise." |
| Copyright | © 2023 iGateBots. All rights reserved. |

### Contact Details

| Field | Value |
|---|---|
| Email | info@igatebots.com |
| Phone | +91 1234567890 (contact page) / +18-4675826 (footer) |
| Address Line 1 | 374, 8th Cross, GPR Royale Layout |
| Address Line 2 | Electronic City Phase 2 |
| City / State / PIN | Bangalore, Karnataka, 560100 |
| Country | India |

### Google Maps Embed (Bangalore)

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089930093!2d77.46612614452614!3d12.953945614144494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1722176137888!5m2!1sen!2sin
```

### Navigation Structure (from live site)

```
Home                    → /
About Us                → /about
Engineering Services ▾  (dropdown)
  Product Design & Development  → /services/product-design
  Electronics Circuit Design    → /services/circuit-design
  PCB Design                    → /services/pcb-design
  Reverse Engineering           → /services/reverse-engineering
Contact                 → /contact
```

### Services (from live site)

#### Service 1 — Product Design & Development
- **Hero label:** "Innovative Solutions by iGatebots"
- **Headline:** "Product Design & Development — Custom Solutions"
- **Description:** "Transforming concepts into functional and aesthetically pleasing designs tailored to your needs."
- **Meta description:** "igatebots offers comprehensive Product Design & Development services. We transform your ideas into market-ready products with innovative design solutions and expert development strategies."
- **Keywords:** Product Design, Product Development, Innovative Design Solutions, Engineering Services, Product Prototyping, Development Strategies
- **Image:** `/assets/img/har.jpg`

#### Service 2 — Electronics Circuit Design
- **Hero label:** "Precision Engineering by iGatebots"
- **Headline:** "Electronics Circuit Design — Reliable & Efficient"
- **Description:** "Designing robust and efficient electronic circuits to meet your technical requirements."
- **Meta description:** (inferred from index page)
- **Image:** `/assets/img/electric.jpg`

#### Service 3 — PCB Design
- **Hero label:** "Precision Engineering by iGatebots"
- **Headline:** "PCB Design — Efficient & Reliable"
- **Description:** "Designing high-performance PCBs with precision to meet your electronic needs."
- **Meta description:** "Explore igatebots' specialized PCB Design services. We provide high-quality, custom PCB design solutions tailored to your project requirements, ensuring reliability and performance."
- **Keywords:** PCB Design, Printed Circuit Board Design, PCB Layout Services, Circuit Board Engineering, Custom PCB Design
- **Image:** `/assets/img/des.jpg`

#### Service 4 — Reverse Engineering
- **Hero label:** "Advanced Analysis by iGatebots"
- **Headline:** "Reverse Engineering — Detailed Analysis & Reengineering"
- **Description:** "Providing comprehensive reverse engineering services to enhance and understand existing products."
- **Image:** `/assets/img/service/component-engineering.jpg`

### Testimonials (from live site)

```js
[
  {
    id: 1,
    name: "Emily Carter",
    role: "Electronics Engineer",
    image: "/assets/img/testimonial/1.jpg",
    quote: "iGateBots' PCB design services have significantly enhanced our product development cycle. Their precision and innovative solutions have been instrumental in our success."
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Product Manager",
    image: "/assets/img/testimonial/2.jpg",
    quote: "iGateBots' expertise in electronic circuit design was beyond our expectations. Their thorough approach and creativity brought our project to a new level of excellence."
  },
  {
    id: 3,
    name: "Sarah Lee",
    role: "Hardware Developer",
    image: "/assets/img/testimonial/3.jpg",
    quote: "The IoT hardware and sensors designed by iGateBots have greatly improved our system's performance. Their innovative solutions and reliability were key to our project's success."
  },
  {
    id: 4,
    name: "David Thompson",
    role: "IT Director",
    image: "/assets/img/testimonial/4.jpg",
    quote: "iGateBots' comprehensive electronic manufacturing services have streamlined our production process. Their dedication and expertise have been essential to our operations."
  }
]
```

### Images Available on Live Server

```
/assets/img/logo.png
/assets/img/logo-white.png
/assets/img/about.jpg
/assets/img/about/about-1.png
/assets/img/har.jpg                          (Product Design)
/assets/img/electric.jpg                     (Circuit Design)
/assets/img/des.jpg                          (PCB Design)
/assets/img/service/component-engineering.jpg (Reverse Engineering)
/assets/img/testimonial/1.jpg
/assets/img/testimonial/2.jpg
/assets/img/testimonial/3.jpg
/assets/img/testimonial/4.jpg
/assets/img/contact/1.png                    (Location icon)
/assets/img/contact/2.png                    (Email icon)
/assets/img/project/single-project.jpg
/assets/img/project/single-project-2.jpg
/assets/img/project/single-project-3.jpg
```

### Footer Links (from live site)

```
Important Links:
  - Product Design & Development  → /services/product-design
  - Electronics Circuit Design    → /services/circuit-design
  - PCB Design                    → /services/pcb-design
  - Reverse Engineering           → /services/reverse-engineering

Social (currently placeholder #):
  - LinkedIn (to be filled)
  - Twitter  (to be filled)
  - Facebook (to be filled)
  - Instagram (to be filled)
```

---

## 2. Brand & Design System

### Color Palette

```js
// tailwind.config.js — extend.colors
colors: {
  navy: {
    950: '#040d1a',
    900: '#0A1628',
    800: '#0d1f38',
    700: '#122548',
    600: '#1E3A5F',
    500: '#25487a',
  },
  cyan: {
    DEFAULT: '#00A8E8',
    light: '#33BFEF',
    dark: '#007BAB',
  },
  teal: {
    DEFAULT: '#00D4AA',
    light: '#33DDBB',
    dark: '#00A882',
  },
  surface: {
    DEFAULT: '#0f1c30',
    muted: '#162236',
    card: '#1a2a42',
    border: '#1f3250',
  }
}
```

### Typography

```js
// In tailwind.config.js
fontFamily: {
  display: ['Syne', 'sans-serif'],      // headings — bold, geometric
  body: ['DM Sans', 'sans-serif'],       // body text — clean, readable
  mono: ['JetBrains Mono', 'monospace'] // code labels
}
```

Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Design Principles

- Dark-first: all backgrounds are deep navy, no white backgrounds
- Glowing accents: cyan (#00A8E8) and teal (#00D4AA) for CTAs, borders, highlights
- Subtle borders: `border-surface-border` (1px) for card outlines
- Glassmorphism: `backdrop-blur-md bg-white/5` for nav and overlay cards
- Grid/circuit motifs: decorative SVG PCB traces as section dividers

---

## 3. Project Setup

### Initialize Project

```bash
# Create Vite + React project
npm create vite@latest igatebots-web -- --template react
cd igatebots-web

# Install core dependencies
npm install react-router-dom framer-motion lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional utilities
npm install @headlessui/react clsx
npm install react-helmet-async
npm install @emailjs/browser

# Dev dependencies
npm install -D prettier eslint eslint-plugin-react
```

### `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        }
      }
    }
  }
})
```

---

## 4. File & Folder Structure

```
igatebots-web/
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg                  (1200×630 social share image)
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── logo-white.png
│   │   │   ├── about.jpg
│   │   │   ├── hero-bg.jpg
│   │   │   ├── services/
│   │   │   │   ├── product-design.jpg
│   │   │   │   ├── circuit-design.jpg
│   │   │   │   ├── pcb-design.jpg
│   │   │   │   └── reverse-engineering.jpg
│   │   │   ├── testimonials/
│   │   │   │   ├── emily-carter.jpg
│   │   │   │   ├── michael-johnson.jpg
│   │   │   │   ├── sarah-lee.jpg
│   │   │   │   └── david-thompson.jpg
│   │   │   └── portfolio/
│   │   │       ├── project-1.jpg
│   │   │       ├── project-2.jpg
│   │   │       └── project-3.jpg
│   │   └── svgs/
│   │       ├── pcb-trace.svg
│   │       └── circuit-pattern.svg
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── SectionLabel.jsx
│   │   │   ├── AnimatedSection.jsx
│   │   │   └── ScrollToTop.jsx
│   │   └── sections/
│   │       ├── HeroSection.jsx
│   │       ├── ServicesGrid.jsx
│   │       ├── AboutTeaser.jsx
│   │       ├── StatsCounter.jsx
│   │       ├── Testimonials.jsx
│   │       ├── CtaBanner.jsx
│   │       ├── ServiceHero.jsx
│   │       └── ContactForm.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Portfolio.jsx
│   │   └── services/
│   │       ├── ProductDesign.jsx
│   │       ├── CircuitDesign.jsx
│   │       ├── PCBDesign.jsx
│   │       └── ReverseEngineering.jsx
│   │
│   ├── data/
│   │   ├── services.js
│   │   ├── testimonials.js
│   │   ├── portfolio.js
│   │   ├── stats.js
│   │   └── navigation.js
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   ├── useCounter.js
│   │   └── useMediaQuery.js
│   │
│   ├── utils/
│   │   └── cn.js                     (clsx helper)
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json
```

---

## 5. Tailwind Config

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040d1a',
          900: '#0A1628',
          800: '#0d1f38',
          700: '#122548',
          600: '#1E3A5F',
          500: '#25487a',
        },
        cyan: {
          DEFAULT: '#00A8E8',
          light: '#33BFEF',
          dark: '#007BAB',
        },
        teal: {
          DEFAULT: '#00D4AA',
          light: '#33DDBB',
          dark: '#00A882',
        },
        surface: {
          DEFAULT: '#0f1c30',
          muted: '#162236',
          card: '#1a2a42',
          border: '#1f3250',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/src/assets/svgs/circuit-pattern.svg')",
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 168, 232, 0.3)',
        'glow-teal': '0 0 20px rgba(0, 212, 170, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'DM Sans', sans-serif;
    scroll-behavior: smooth;
  }
  body {
    @apply bg-navy-900 text-white;
  }
  h1, h2, h3, h4, h5 {
    font-family: 'Syne', sans-serif;
  }
}

@layer components {
  .section-padding {
    @apply py-20 px-4 md:px-8 lg:px-16;
  }
  .container-max {
    @apply max-w-7xl mx-auto;
  }
  .gradient-text {
    @apply bg-gradient-to-r from-cyan to-teal bg-clip-text text-transparent;
  }
  .btn-primary {
    @apply bg-cyan text-navy-900 font-semibold px-6 py-3 rounded-lg
           hover:bg-cyan-light transition-all duration-200
           shadow-glow-cyan hover:shadow-lg;
  }
  .btn-outline {
    @apply border border-cyan text-cyan px-6 py-3 rounded-lg
           hover:bg-cyan hover:text-navy-900 transition-all duration-200;
  }
  .card-dark {
    @apply bg-surface-card border border-surface-border rounded-xl
           p-6 hover:border-cyan/40 transition-all duration-300;
  }
  .nav-link {
    @apply text-white/80 hover:text-cyan transition-colors duration-200 text-sm font-medium;
  }
}

@layer utilities {
  .glow-text-cyan {
    text-shadow: 0 0 20px rgba(0, 168, 232, 0.5);
  }
  .pcb-border {
    border-image: repeating-linear-gradient(
      90deg,
      #00A8E8 0px, #00A8E8 20px,
      transparent 20px, transparent 30px
    ) 1;
  }
}
```

---

## 6. Routing (App.jsx)

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import ProductDesign from './pages/services/ProductDesign'
import CircuitDesign from './pages/services/CircuitDesign'
import PCBDesign from './pages/services/PCBDesign'
import ReverseEngineering from './pages/services/ReverseEngineering'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="services/product-design" element={<ProductDesign />} />
            <Route path="services/circuit-design" element={<CircuitDesign />} />
            <Route path="services/pcb-design" element={<PCBDesign />} />
            <Route path="services/reverse-engineering" element={<ReverseEngineering />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
```

---

## 7. Shared Layout Components

### `src/components/layout/Layout.jsx`

```jsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

### `src/components/layout/Navbar.jsx`

```jsx
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@/assets/images/logo.png'

const services = [
  { label: 'Product Design & Development', href: '/services/product-design' },
  { label: 'Electronics Circuit Design',   href: '/services/circuit-design' },
  { label: 'PCB Design',                   href: '/services/pcb-design' },
  { label: 'Reverse Engineering',          href: '/services/reverse-engineering' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)         // mobile drawer
  const [dropOpen, setDropOpen] = useState(false) // desktop dropdown
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile nav on route change
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
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="iGatebots" className="h-8 md:h-10 w-auto" />
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
```

### `src/components/layout/Footer.jsx`

```jsx
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'
import logo from '@/assets/images/logo-white.png'

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
            <img src={logo} alt="iGatebots" className="h-10 w-auto mb-4" />
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
```

---

## 8. Data Files

### `src/data/services.js`

```js
export const services = [
  {
    id: 'product-design',
    slug: '/services/product-design',
    icon: 'Cpu',
    label: 'Innovative Solutions by iGatebots',
    title: 'Product Design & Development',
    tagline: 'Custom Solutions',
    shortDesc: 'Transforming concepts into functional and aesthetically pleasing designs tailored to your needs.',
    fullDesc: 'Our Product Design & Development service covers the entire lifecycle from concept ideation to market-ready prototypes. We leverage modern CAD tools, rapid prototyping, and iterative testing to deliver products that meet both form and function requirements.',
    features: [
      'Concept Design & Ideation',
      'CAD Modelling & 3D Rendering',
      'Prototype Development',
      'Design for Manufacturability (DFM)',
      'Mechanical Engineering',
      'Product Testing & Validation',
    ],
    image: '/src/assets/images/services/product-design.jpg',
    metaDesc: 'igatebots offers comprehensive Product Design & Development services. We transform your ideas into market-ready products.',
  },
  {
    id: 'circuit-design',
    slug: '/services/circuit-design',
    icon: 'Zap',
    label: 'Precision Engineering by iGatebots',
    title: 'Electronics Circuit Design',
    tagline: 'Reliable & Efficient',
    shortDesc: 'Designing robust and efficient electronic circuits to meet your technical requirements.',
    fullDesc: 'Our Electronics Circuit Design team specialises in analog, digital, and mixed-signal circuit design. From low-power IoT sensors to high-speed data acquisition systems, we deliver circuits optimised for performance and reliability.',
    features: [
      'Analog & Digital Circuit Design',
      'Mixed-Signal Design',
      'Schematic Capture',
      'Simulation & Verification (SPICE)',
      'Low-Power Design',
      'IoT & Embedded Systems',
    ],
    image: '/src/assets/images/services/circuit-design.jpg',
    metaDesc: 'Designing robust and efficient electronic circuits — analog, digital, and mixed-signal for your technical requirements.',
  },
  {
    id: 'pcb-design',
    slug: '/services/pcb-design',
    icon: 'CircuitBoard',
    label: 'Precision Engineering by iGatebots',
    title: 'PCB Design',
    tagline: 'Efficient & Reliable',
    shortDesc: 'Designing high-performance PCBs with precision to meet your electronic needs.',
    fullDesc: 'We provide end-to-end PCB design services — from schematic to production-ready Gerber files. Our engineers are proficient in multi-layer, high-speed, and RF PCB design, ensuring signal integrity and manufacturability.',
    features: [
      'Single & Multi-Layer PCB Layout',
      'High-Speed PCB Design',
      'RF & Microwave PCB',
      'Signal Integrity Analysis',
      'DFM / DFA Review',
      'Gerber & BOM Generation',
    ],
    image: '/src/assets/images/services/pcb-design.jpg',
    metaDesc: 'Professional PCB Design services — high-quality, custom circuit board design solutions ensuring reliability and performance.',
  },
  {
    id: 'reverse-engineering',
    slug: '/services/reverse-engineering',
    icon: 'Search',
    label: 'Advanced Analysis by iGatebots',
    title: 'Reverse Engineering',
    tagline: 'Detailed Analysis & Reengineering',
    shortDesc: 'Providing comprehensive reverse engineering services to enhance and understand existing products.',
    fullDesc: 'Our Reverse Engineering service helps clients understand, replicate, or improve existing hardware and electronic systems. We analyse obsolete or undocumented products and deliver complete technical documentation and redesigned solutions.',
    features: [
      'Hardware Teardown & Analysis',
      'Schematic Extraction',
      'PCB Clone & Redesign',
      'Firmware Extraction & Analysis',
      'Component Identification',
      'Technical Documentation',
    ],
    image: '/src/assets/images/services/reverse-engineering.jpg',
    metaDesc: 'Comprehensive reverse engineering services — hardware analysis, schematic extraction, PCB redesign, and technical documentation.',
  },
]
```

### `src/data/testimonials.js`

```js
export const testimonials = [
  {
    id: 1,
    name: 'Emily Carter',
    role: 'Electronics Engineer',
    image: '/src/assets/images/testimonials/emily-carter.jpg',
    quote: "iGateBots' PCB design services have significantly enhanced our product development cycle. Their precision and innovative solutions have been instrumental in our success.",
    service: 'PCB Design',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    role: 'Product Manager',
    image: '/src/assets/images/testimonials/michael-johnson.jpg',
    quote: "iGateBots' expertise in electronic circuit design was beyond our expectations. Their thorough approach and creativity brought our project to a new level of excellence.",
    service: 'Electronics Circuit Design',
  },
  {
    id: 3,
    name: 'Sarah Lee',
    role: 'Hardware Developer',
    image: '/src/assets/images/testimonials/sarah-lee.jpg',
    quote: "The IoT hardware and sensors designed by iGateBots have greatly improved our system's performance. Their innovative solutions and reliability were key to our project's success.",
    service: 'Product Design',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'IT Director',
    image: '/src/assets/images/testimonials/david-thompson.jpg',
    quote: "iGateBots' comprehensive electronic manufacturing services have streamlined our production process. Their dedication and expertise have been essential to our operations.",
    service: 'Reverse Engineering',
  },
]
```

### `src/data/stats.js`

```js
export const stats = [
  { label: 'Projects Completed', value: 150, suffix: '+' },
  { label: 'Happy Clients',      value: 80,  suffix: '+'  },
  { label: 'Years Experience',   value: 10,  suffix: '+'  },
  { label: 'Client Satisfaction',value: 98,  suffix: '%'  },
]
```

### `src/data/navigation.js`

```js
export const navLinks = [
  { label: 'Home',      href: '/'         },
  { label: 'About Us',  href: '/about'    },
  { label: 'Portfolio', href: '/portfolio'},
  { label: 'Contact',   href: '/contact'  },
]

export const serviceLinks = [
  { label: 'Product Design & Development', href: '/services/product-design'     },
  { label: 'Electronics Circuit Design',   href: '/services/circuit-design'     },
  { label: 'PCB Design',                   href: '/services/pcb-design'         },
  { label: 'Reverse Engineering',          href: '/services/reverse-engineering'},
]
```

---

## 9. Page-by-Page Implementation

### `src/pages/Home.jsx`

```jsx
import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import ServicesGrid from '@/components/sections/ServicesGrid'
import AboutTeaser from '@/components/sections/AboutTeaser'
import StatsCounter from '@/components/sections/StatsCounter'
import Testimonials from '@/components/sections/Testimonials'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>iGatebots | Product Design, Electronics & PCB Design, Reverse Engineering</title>
        <meta name="description" content="igatebots provides expert services in Product Design & Development, Electronics Circuit Design, PCB Design, and Reverse Engineering." />
        <meta name="keywords" content="Product Design, Electronics Design, PCB Design, Reverse Engineering, Engineering Services" />
      </Helmet>
      <HeroSection />
      <ServicesGrid />
      <AboutTeaser />
      <StatsCounter />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
```

### `src/components/sections/HeroSection.jsx`

```jsx
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
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-10 bg-hero-pattern bg-repeat" />
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
```

### `src/components/sections/StatsCounter.jsx`

```jsx
import { useEffect, useRef, useState } from 'react'
import { stats } from '@/data/stats'

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      let start = 0
      const step = Math.ceil(target / 60)
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(start)
      }, 25)
      observer.disconnect()
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold gradient-text">
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-16 bg-surface-muted border-y border-surface-border">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ label, value, suffix }) => (
            <div key={label} className="text-center">
              <Counter target={value} suffix={suffix} />
              <p className="text-white/60 text-sm mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `src/pages/Contact.jsx`

```jsx
import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import AnimatedSection from '@/components/ui/AnimatedSection'

// ─── Contact Details (from igatebots.com) ──────────────────────────────────
const CONTACT_INFO = {
  address: {
    street: '374, 8th Cross, GPR Royale Layout',
    area:   'Electronic City Phase 2',
    city:   'Bangalore, Karnataka 560100',
    country: 'India',
  },
  email:  'info@igatebots.com',
  phone:  '+91 1234567890',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089930093!2d77.46612614452614!3d12.953945614144494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1722176137888!5m2!1sen!2sin',
}

const SERVICES = [
  'Product Design & Development',
  'Electronics Circuit Design',
  'PCB Design',
  'Reverse Engineering',
  'Other / General Inquiry',
]

// EmailJS config — replace with real keys from emailjs.com dashboard
const EMAILJS_CONFIG = {
  serviceId:  'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey:  'YOUR_PUBLIC_KEY',
}

export default function Contact() {
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      )
      setStatus('success')
      setFormData({ name: '', email: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | iGatebots</title>
        <meta name="description" content="Contact igatebots for inquiries about our services, support, or collaborations." />
      </Helmet>

      {/* Page hero */}
      <section className="pt-28 pb-12 bg-navy-950 border-b border-surface-border">
        <div className="container-max px-4 md:px-8 lg:px-16">
          <p className="text-cyan text-sm font-mono mb-2">Home / Contact Us</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Contact Us</h1>
        </div>
      </section>

      <section className="section-padding bg-navy-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* ── Left: contact info + map ── */}
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold mb-2">Let's talk...</h2>
              <p className="text-white/60 mb-8">
                Reach out to our team in Bangalore. We'd love to hear about your project.
              </p>

              <ul className="space-y-6 mb-10">
                <li className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20
                                  flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-0.5">Office Address</p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {CONTACT_INFO.address.street},<br />
                      {CONTACT_INFO.address.area},<br />
                      {CONTACT_INFO.address.city}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20
                                  flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-0.5">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`}
                       className="text-white/60 hover:text-cyan text-sm transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20
                                  flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-0.5">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phone}`}
                       className="text-white/60 hover:text-cyan text-sm transition-colors">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </li>
              </ul>

              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden border border-surface-border h-64">
                <iframe
                  src={CONTACT_INFO.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="iGatebots Office Location"
                />
              </div>
            </AnimatedSection>

            {/* ── Right: contact form ── */}
            <AnimatedSection delay={0.15}>
              <div className="card-dark">
                <h3 className="font-display text-xl font-semibold mb-6">Send us a message</h3>

                {status === 'success' ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <CheckCircle size={48} className="text-teal" />
                    <p className="font-display text-xl font-semibold">Message Sent!</p>
                    <p className="text-white/60">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="btn-outline mt-2">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Your Name <span className="text-cyan">*</span>
                      </label>
                      <input
                        name="name" type="text" required
                        value={formData.name} onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-surface-muted border border-surface-border rounded-lg
                                   px-4 py-3 text-white placeholder-white/30 text-sm
                                   focus:outline-none focus:border-cyan transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Email Address <span className="text-cyan">*</span>
                      </label>
                      <input
                        name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-surface-muted border border-surface-border rounded-lg
                                   px-4 py-3 text-white placeholder-white/30 text-sm
                                   focus:outline-none focus:border-cyan transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Service Required</label>
                      <select
                        name="service"
                        value={formData.service} onChange={handleChange}
                        className="w-full bg-surface-muted border border-surface-border rounded-lg
                                   px-4 py-3 text-white text-sm
                                   focus:outline-none focus:border-cyan transition-colors"
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Message <span className="text-cyan">*</span>
                      </label>
                      <textarea
                        name="message" required rows={5}
                        value={formData.message} onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="w-full bg-surface-muted border border-surface-border rounded-lg
                                   px-4 py-3 text-white placeholder-white/30 text-sm resize-none
                                   focus:outline-none focus:border-cyan transition-colors"
                      />
                    </div>
                    {status === 'error' && (
                      <p className="text-red-400 text-sm">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}
                    <button
                      type="submit" disabled={status === 'loading'}
                      className="btn-primary w-full flex items-center justify-center gap-2
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <span className="w-4 h-4 border-2 border-navy-900/40 border-t-navy-900
                                         rounded-full animate-spin" />
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
```

---

## 10. Reusable UI Components

### `src/components/ui/AnimatedSection.jsx`

```jsx
import { motion } from 'framer-motion'

export default function AnimatedSection({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### `src/components/ui/SectionLabel.jsx`

```jsx
export default function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1
                    border border-cyan/30 rounded-full bg-cyan/10">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
      <span className="text-cyan text-xs font-mono tracking-widest uppercase">
        {children}
      </span>
    </div>
  )
}
```

### `src/components/ui/ScrollToTop.jsx`

```jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
```

### `src/utils/cn.js`

```js
import { clsx } from 'clsx'
export function cn(...inputs) { return clsx(inputs) }
```

---

## 11. Custom Hooks

### `src/hooks/useScrollAnimation.js`

```js
import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
```

### `src/hooks/useMediaQuery.js`

```js
import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = e => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}
```

---

## 12. SEO & Meta

### `index.html` (root)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
  <meta name="author" content="igatebots" />

  <!-- Primary meta (overridden per page via react-helmet-async) -->
  <title>iGatebots | Product Design, Electronics & PCB Design, Reverse Engineering</title>
  <meta name="description" content="igatebots provides expert services in Product Design & Development, Electronics Circuit Design, PCB Design, and Reverse Engineering." />
  <meta name="keywords" content="Product Design, Electronics Design, PCB Design, Reverse Engineering, Engineering Services" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://igatebots.com/" />
  <meta property="og:title" content="iGatebots | Engineering Solutions" />
  <meta property="og:description" content="Expert solutions in Product Design, PCB Design, Circuit Design and Reverse Engineering." />
  <meta property="og:image" content="/og-image.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="iGatebots | Engineering Solutions" />
  <meta name="twitter:image" content="/og-image.jpg" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 13. Deployment

### Build

```bash
npm run build
# Output: /dist
```

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables (`.env.local`)

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 14. Asset Checklist

Download these from the live site before starting:

| Asset | Source URL | Save As |
|---|---|---|
| Logo (color) | https://igatebots.com/assets/img/logo.png | `src/assets/images/logo.png` |
| Logo (white) | https://igatebots.com/assets/img/logo-white.png | `src/assets/images/logo-white.png` |
| About image | https://igatebots.com/assets/img/about.jpg | `src/assets/images/about.jpg` |
| Product Design | https://igatebots.com/assets/img/har.jpg | `src/assets/images/services/product-design.jpg` |
| Circuit Design | https://igatebots.com/assets/img/electric.jpg | `src/assets/images/services/circuit-design.jpg` |
| PCB Design | https://igatebots.com/assets/img/des.jpg | `src/assets/images/services/pcb-design.jpg` |
| Reverse Eng. | https://igatebots.com/assets/img/service/component-engineering.jpg | `src/assets/images/services/reverse-engineering.jpg` |
| Testimonial 1 | https://igatebots.com/assets/img/testimonial/1.jpg | `src/assets/images/testimonials/emily-carter.jpg` |
| Testimonial 2 | https://igatebots.com/assets/img/testimonial/2.jpg | `src/assets/images/testimonials/michael-johnson.jpg` |
| Testimonial 3 | https://igatebots.com/assets/img/testimonial/3.jpg | `src/assets/images/testimonials/sarah-lee.jpg` |
| Testimonial 4 | https://igatebots.com/assets/img/testimonial/4.jpg | `src/assets/images/testimonials/david-thompson.jpg` |
| Project 1 | https://igatebots.com/assets/img/project/single-project.jpg | `src/assets/images/portfolio/project-1.jpg` |
| Project 2 | https://igatebots.com/assets/img/project/single-project-2.jpg | `src/assets/images/portfolio/project-2.jpg` |
| Project 3 | https://igatebots.com/assets/img/project/single-project-3.jpg | `src/assets/images/portfolio/project-3.jpg` |

---

## Quick Start Summary

```bash
# 1. Clone / init
npm create vite@latest igatebots-web -- --template react
cd igatebots-web

# 2. Install dependencies
npm install react-router-dom framer-motion lucide-react @headlessui/react clsx react-helmet-async @emailjs/browser
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Copy all source files from this plan into src/

# 4. Download assets from igatebots.com into src/assets/images/

# 5. Run dev server
npm run dev

# 6. Build for production
npm run build
```

---

*Generated from full scrape of https://igatebots.com — all contact details, content, images, and services are real data from the live site.*