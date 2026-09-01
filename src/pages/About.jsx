import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import PCBBackground from '../components/PCBBackground';
import { ServiceIcon } from '../components/ServiceIcon';
import { IMAGES, COMPANY, SERVICES } from '../data/siteData';

const values = [
  { key: 'precision', title: 'Precision', desc: 'Every design is crafted with meticulous attention to detail and technical accuracy.' },
  { key: 'innovation', title: 'Innovation', desc: 'We push boundaries using cutting-edge tools, techniques, and methodologies.' },
  { key: 'collaboration', title: 'Collaboration', desc: 'We work closely with clients as partners throughout every stage of the project.' },
  { key: 'speed', title: 'Speed', desc: 'Rapid iteration and delivery without compromising quality or reliability.' },
  { key: 'expertise', title: 'Expertise', desc: 'Deep domain knowledge across electronics, PCB design, and product development.' },
  { key: 'reliability', title: 'Reliability', desc: 'Consistent, dependable results that our clients can build their business on.' },
];

const valueIcons = {
  precision: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  innovation: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
  collaboration: <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />,
  speed: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />,
  expertise: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />,
  reliability: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
};

const workflowSteps = [
  {
    number: '01',
    title: 'Consult & Analyze',
    subtitle: 'Scope & Specifications',
    desc: 'We begin by collaborating closely to define design specifications, operational parameters, components selection strategy, and system architecture feasibility.',
    features: ['Technical Feasibility Study', 'Component Sourcing Research', 'Architecture & Cost Estimation'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-2.533-3.076l-1.3-.414m-3.353-.39L12 18.75V21M12 3v3.75m0 11.25V18M12 9.75v3M3 13.5h.75m16.5 0h.75m-9-9h.008v.008H12V4.5z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Design & Simulate',
    subtitle: 'Schematic Capture & Verification',
    desc: 'Creating accurate circuit schematics with rigorous component mapping. We perform simulations to verify circuit behavior, power calculations, and thermal characteristics.',
    features: ['Analog & Digital Simulation', 'Component Footprint Validation', 'Power/Thermal Management'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'PCB Layout Design',
    subtitle: 'Precision Routing & Layering',
    desc: 'Routing multi-layer high-density boards. We optimize trace geometries for signal integrity, EMI/EMC compliance, and thermal dispersion with full 3D interference checking.',
    features: ['High-Speed Signal routing', 'Impedance Control & Stackup', '3D CAD Clearance Checking'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Prototype & Debug',
    subtitle: 'Hardware Bring-up & Verification',
    desc: 'Fabricating sample boards and conducting hands-on hardware testing. We write test drivers and basic firmware to validate inputs, outputs, and sensor communications.',
    features: ['Oscilloscope/Logic Analyzer Analysis', 'Firmware Integration & Board Support', 'Environmental Stress Testing'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    )
  },
  {
    number: '05',
    title: 'Production Support',
    subtitle: 'Sourcing & DFMA Optimization',
    desc: 'Providing full manufacturing-ready packages containing Gerber, ODB++, assembly drawings, and optimized Bill of Materials (BOM) to facilitate bulk manufacturing.',
    features: ['DFMA Manufacturing Audit', 'BOM Consolidation & Cost Down', 'Contract Manufacturer Coordination'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    )
  }
];

const techStack = [
  { name: 'Altium Designer', type: 'ECAD Tool', desc: 'Industry-standard PCB routing and schematic design suite.' },
  { name: 'KiCAD / Eagle', type: 'ECAD Tool', desc: 'Flexible layout and circuit simulation platforms for rapid prototyping.' },
  { name: 'Embedded C/C++', type: 'Firmware & Logic', desc: 'Low-latency code for microcontrollers, bare metal, and RTOS.' },
  { name: 'STM32 / ESP32', type: 'MCU Platforms', desc: 'Arm Cortex-M processors and IoT modules with integrated RF.' },
  { name: 'FreeRTOS / Zephyr', type: 'Real-Time OS', desc: 'Multithreading and modular task scheduling in embedded systems.' },
  { name: 'High-Speed Signal Integrity', type: 'Specialty', desc: 'Impedance matching, crosstalk reduction, and multi-Gbps design.' },
  { name: 'RoHS / CE Standards', type: 'Certifications', desc: 'Adhering to strict safety, health, and environmental compliance standards.' },
  { name: 'RF & Wireless Design', type: 'Specialty', desc: 'Designing antennas, impedance matching networks, and EMI shieldings.' }
];

const faqs = [
  {
    q: 'What is the typical turnaround time for a PCB design project?',
    a: 'It varies depending on complexity. A standard 2 to 4-layer layout typically takes 3-7 business days. High-density, high-speed multi-layer layouts (8+ layers) or RF boards may take 2-3 weeks to ensure complete signal integrity and clearance audits.'
  },
  {
    q: 'Can you help with low-volume prototyping and mass manufacturing?',
    a: 'Absolutely. We support you through full prototyping and low-volume assembly, and provide complete, verified manufacturing packages (Gerbers, BOM, Pick-and-Place files) that any global EMS provider can immediately build.'
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Yes. Intellectual property protection is critical. We routinely execute NDAs with clients before receiving any project description, schematics, or sample hardware.'
  },
  {
    q: 'What inputs do you require to begin a reverse engineering project?',
    a: 'Ideally, a functional hardware sample, along with any existing schematics, block diagrams, or lists of core component requirements. We use optical inspections, chip level tracing, and logic analyzers to recreate complete schematics.'
  }
];

export default function About() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    document.title = 'About Us | iGatebots';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <PCBBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              About Us
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mt-2 mb-6">
              Leading in <span className="gradient-text">Electronic</span> Innovation
            </h1>
            <p className="text-white/45 text-lg max-w-2xl mx-auto font-body">
              A team of passionate engineers and designers dedicated to turning your electronic ideas into reality with precision and expertise.
            </p>
            <nav className="flex items-center justify-center gap-2 mt-6 text-sm text-white/35 font-body">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/60">About Us</span>
            </nav>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-2xl overflow-hidden gradient-border">
                <img
                  src={IMAGES.about}
                  alt="iGatebots engineering workspace"
                  className="w-full h-[480px] object-cover"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x480/0a1220/1a6cff?text=iGatebots+Team'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-900/50 to-transparent" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                Our Story
              </div>
              <h2 className="font-display text-4xl font-bold text-white mt-2 mb-6">
                Leading <span className="gradient-text">Industrial Solutions</span> Worldwide
              </h2>
              <p className="text-white/45 leading-relaxed mb-4 font-body">
                iGatebots was founded with a singular mission: to bridge the gap between innovative ideas and market-ready electronic products. Based in the heart of Bangalore's Electronic City, we have grown into a trusted partner for businesses worldwide.
              </p>
              <p className="text-white/45 leading-relaxed mb-8 font-body">
                Our team of expert engineers and designers brings decades of combined experience in product design, electronics, PCB layout, and reverse engineering. We believe in a collaborative approach — your vision, our expertise, exceptional results.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-dark-800/60 border border-white/8 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div>
                      <p className="text-white/70 text-xs font-mono uppercase font-semibold mb-1">Bangalore Office</p>
                      <p className="text-white/40 text-xs font-body leading-relaxed">{COMPANY.address1}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-800/60 border border-white/8 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="text-white/70 text-xs font-mono uppercase font-semibold mb-1">Kanyakumari Office</p>
                      <p className="text-white/40 text-xs font-body leading-relaxed">{COMPANY.address2}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
              >
                Contact Us Today
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-dark-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Our Values
            </div>
            <h2 className="font-display text-4xl font-bold text-white mt-2">
              What <span className="gradient-text">Drives Us</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <AnimatedSection key={v.key} delay={i * 70}>
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 hover:border-primary-500/15">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {valueIcons[v.key]}
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-body">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              What We Do
            </div>
            <h2 className="font-display text-4xl font-bold text-white mt-2">
              Our <span className="gradient-text">Capabilities</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 70}>
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-6 flex gap-5 hover:border-primary-500/15 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0 mt-0.5">
                    <ServiceIcon slug={s.slug} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-3 font-body">{s.description}</p>
                    <Link
                      to={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1.5 text-primary-400 text-xs font-body font-medium hover:text-primary-300 transition-colors"
                    >
                      Explore Service
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-24 bg-dark-800/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Our Methodology
            </div>
            <h2 className="font-display text-4xl font-bold text-white mt-2">
              Development <span className="gradient-text">Workflow</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto mt-4 font-body">
              How we take your product requirements and transform them into high-performing electronic realities.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Timeline Left: Steps Selection */}
            <div className="lg:col-span-5 relative pl-8 border-l border-white/10 space-y-8">
              {workflowSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="w-full text-left relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 group hover:bg-white/5"
                >
                  {/* Active dot indicator on vertical line */}
                  <span className={`absolute -left-[37px] top-6 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    activeStep === idx 
                      ? 'bg-accent-400 border-accent-400 scale-125 shadow-glow-accent' 
                      : 'bg-dark-900 border-white/20 group-hover:border-primary-400'
                  }`} />
                  
                  <span className={`font-display text-lg font-bold transition-colors duration-300 shrink-0 ${
                    activeStep === idx ? 'text-accent-400' : 'text-white/30 group-hover:text-white/60'
                  }`}>
                    {step.number}
                  </span>
                  <div>
                    <h4 className={`font-display font-semibold text-base transition-colors duration-300 ${
                      activeStep === idx ? 'text-white' : 'text-white/65 group-hover:text-white'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-white/35 text-xs mt-1 font-body leading-relaxed">{step.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Timeline Right: Detail view */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-dark-800/80 border border-white/5 rounded-3xl p-8 shadow-xl shadow-black/30 backdrop-blur-md relative overflow-hidden shimmer-effect"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                    <span className="font-display text-9xl font-black text-white">{workflowSteps[activeStep].number}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent-400/10 border border-accent-400/20 flex items-center justify-center text-accent-400 shadow-glow-accent">
                      {workflowSteps[activeStep].icon}
                    </div>
                    <div>
                      <span className="text-accent-400 text-xs font-body tracking-wider uppercase font-semibold">
                        Step {workflowSteps[activeStep].number}
                      </span>
                      <h3 className="font-display font-bold text-2xl text-white mt-0.5">
                        {workflowSteps[activeStep].title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/50 leading-relaxed mb-6 font-body text-sm">
                    {workflowSteps[activeStep].desc}
                  </p>

                  <div className="border-t border-white/5 pt-6">
                    <h5 className="text-white/70 text-xs font-body font-semibold tracking-wider uppercase mb-4">Key Deliverables:</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {workflowSteps[activeStep].features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-accent-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-white/60 text-xs font-body">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 border-t border-white/5 bg-dark-800/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Technologies & Standards
            </div>
            <h2 className="font-display text-4xl font-bold text-white mt-2">
              Our Technical <span className="gradient-text">Core</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto mt-4 font-body">
              A brief list of design platforms, architectures, and guidelines we support to build top-tier hardware.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((tech, idx) => (
              <AnimatedSection key={idx} delay={idx * 60}>
                <div className="group h-full bg-dark-800/40 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/30 hover:bg-dark-800/80 shadow-glow-primary hover:shadow-primary-500/[0.04] flex flex-col justify-between">
                  <div>
                    <span className="text-primary-400 text-[10px] font-mono tracking-wider uppercase bg-primary-500/5 border border-primary-500/10 px-2 py-0.5 rounded">
                      {tech.type}
                    </span>
                    <h4 className="font-display font-semibold text-white mt-4 mb-2 group-hover:text-primary-300 transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-white/40 text-xs font-body leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Frequently Asked Questions
            </div>
            <h2 className="font-display text-4xl font-bold text-white mt-2">
              Common <span className="gradient-text">Inquiries</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <AnimatedSection key={idx} delay={idx * 60}>
                  <div className="bg-dark-800/40 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-display font-medium text-white text-sm pr-4">
                        {faq.q}
                      </span>
                      <span className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/55 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45 text-accent-400 bg-accent-500/10' : ''}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </span>
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 border-t border-white/5' : 'max-h-0'}`}>
                      <div className="p-6 text-white/40 text-xs font-body leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,108,255,0.12) 0%, rgba(0,200,255,0.06) 100%)' }} />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Work Together?</h2>
            <p className="text-white/45 mb-8 font-body">Let's turn your next project idea into reality. Our team is ready to help.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
