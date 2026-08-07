import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PCBBackground from '../components/PCBBackground';
import AnimatedSection from '../components/AnimatedSection';
import { ServiceIcon } from '../components/ServiceIcon';
import { IMAGES, SERVICES, TESTIMONIALS, STATS, PROJECTS, COMPANY } from '../data/siteData';
import { useInView, useCounter } from '../hooks/useInView';

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      tag: 'Innovative Solutions',
      title: 'Product Design &',
      accent: 'Development',
      sub: 'From concept to market-ready product',
      desc: 'Transforming your ideas into functional, manufacturable designs with precision engineering.',
      link: '/services/product-design',
    },
    {
      tag: 'Precision Engineering',
      title: 'Electronics Circuit',
      accent: 'Design',
      sub: 'Reliable, efficient, production-ready',
      desc: 'Designing robust electronic circuits that meet your exact technical requirements.',
      link: '/services/electronics-circuit',
    },
    {
      tag: 'High-Performance Boards',
      title: 'PCB Design &',
      accent: 'Layout',
      sub: 'Multi-layer, high-speed, compact',
      desc: 'High-performance PCBs engineered for signal integrity, thermal management, and manufacturability.',
      link: '/services/pcb-design',
    },
    {
      tag: 'Advanced Analysis',
      title: 'Reverse',
      accent: 'Engineering',
      sub: 'Detailed analysis and reengineering',
      desc: 'Comprehensive reverse engineering services to understand, replicate, or improve existing products.',
      link: '/services/reverse-engineering',
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const s = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <PCBBackground />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(26,108,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <div key={currentSlide} className="animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            {s.tag}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] mb-4">
            <span className="text-white">{s.title}</span>
            <br />
            <span className="gradient-text">{s.accent}</span>
          </h1>

          <p className="text-primary-300/70 font-body text-sm tracking-widest uppercase mb-5">{s.sub}</p>
          <p className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed font-body">{s.desc}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={s.link}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30"
            >
              Explore Service
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary-500/40 text-primary-300 font-body font-medium rounded-full text-sm tracking-wide transition-all duration-200 hover:border-primary-400 hover:text-white hover:bg-primary-500/10"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex items-center justify-center gap-2 mt-16">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 h-2 bg-primary-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-xs font-body tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function StatsSection() {
  const [ref, isInView] = useInView();
  const c0 = useCounter(STATS[0].value, 2000, isInView);
  const c1 = useCounter(STATS[1].value, 2000, isInView);
  const c2 = useCounter(STATS[2].value, 2000, isInView);
  const c3 = useCounter(STATS[3].value, 2000, isInView);
  const counts = [c0, c1, c2, c3];

  return (
    <section ref={ref} className="py-16 border-y border-white/5 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-2">
                {counts[i]}{stat.suffix}
              </p>
              <p className="text-white/40 text-sm font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden gradient-border">
                <img
                  src={IMAGES.about}
                  alt="iGatebots engineering lab"
                  className="w-full h-80 lg:h-[480px] object-cover"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x480/0a1220/1a6cff?text=iGatebots'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-900/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-dark-800 border border-white/8 rounded-2xl p-5">
                <p className="font-display text-3xl font-bold gradient-text">8+</p>
                <p className="text-white/40 text-xs mt-1 font-body">Years of Excellence</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Welcome to iGatebots
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Innovative Solutions for Your{' '}
              <span className="gradient-text">Technological Needs</span>
            </h2>
            <p className="text-white/45 leading-relaxed mb-5 font-body">
              At iGatebots, we are dedicated to delivering high-quality and innovative solutions that propel the future of technology. Our expert team excels at transforming complex challenges into practical engineering solutions.
            </p>
            <p className="text-white/45 leading-relaxed mb-8 font-body">
              Our core services include{' '}
              <span className="text-white/70">Product Design & Development</span>,{' '}
              <span className="text-white/70">Electronics Circuit Design</span>,{' '}
              <span className="text-white/70">PCB Design</span>, and{' '}
              <span className="text-white/70">Reverse Engineering</span> — all engineered for performance, reliability, and efficiency.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['Industry Standards', 'Quality Engineering', 'Expert Team', 'Affordable Pricing'].map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-primary-500/15 border border-primary-500/25 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/55 text-sm font-body">{f}</span>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section className="py-28 bg-dark-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            What We Offer
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Global <span className="gradient-text">Industry Services</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 80}>
              <ServiceCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block bg-dark-800/60 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/20 hover:shadow-xl hover:shadow-primary-500/8"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = `https://placehold.co/400x300/0a1220/1a6cff?text=${encodeURIComponent(service.title)}`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />
        <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400">
          <ServiceIcon slug={service.slug} className="w-5 h-5" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-white text-sm mb-2 group-hover:text-primary-300 transition-colors">{service.title}</h3>
        <p className="text-white/40 text-xs leading-relaxed mb-4 font-body line-clamp-3">{service.description}</p>
        <span className="inline-flex items-center gap-1.5 text-primary-400 text-xs font-body font-medium">
          Learn More
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section className="py-28 circuit-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Our Work
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 70}>
              <Link
                to={project.link}
                className="group block bg-dark-800/60 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:border-primary-500/20 hover:shadow-xl hover:shadow-primary-500/8"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = `https://placehold.co/400x300/0a1220/1a6cff?text=${encodeURIComponent(project.title)}`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-dark-900/80 border border-white/10 text-white/70 text-xs rounded-full font-body">
                    {project.category}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-display font-semibold text-white text-sm mb-1 group-hover:text-primary-300 transition-colors">{project.title}</h4>
                  <p className="text-white/35 text-xs font-body">{project.description}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white/60 hover:text-white hover:border-white/20 rounded-full text-sm font-body transition-all duration-200"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 bg-dark-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Client Feedback
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 80}>
              <div
                className={`bg-dark-800/60 border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  active === i
                    ? 'border-primary-500/30 shadow-lg shadow-primary-500/8'
                    : 'border-white/5 hover:border-white/10'
                }`}
                onClick={() => setActive(i)}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5 font-body">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0f1e35&color=4d8dff&size=36`; }}
                  />
                  <div>
                    <p className="font-display font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-white/35 text-xs font-body">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,108,255,0.12) 0%, rgba(0,200,255,0.06) 100%)' }} />
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Build Something <span className="gradient-text">Exceptional?</span>
          </h2>
          <p className="text-white/45 text-lg mb-10 max-w-xl mx-auto font-body">
            Let's collaborate to turn your ideas into innovative electronic solutions. Contact us for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-primary-500/30"
            >
              Start Your Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/60 hover:text-white hover:border-white/25 font-body font-medium rounded-full text-sm transition-all duration-200"
            >
              View All Services
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'iGatebots | Product Design, Electronics & PCB Design, Reverse Engineering';
  }, []);

  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
