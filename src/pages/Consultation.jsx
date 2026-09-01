import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PCBBackground from '../components/PCBBackground';
import AnimatedSection from '../components/AnimatedSection';
import { COMPANY } from '../data/siteData';

const ADVISORY_DOMAINS = [
  {
    id: 'architecture',
    title: 'Hardware Architecture & Feasibility',
    tag: 'System Strategy',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.25 2.25L15 7.5" />
      </svg>
    ),
    description: 'System partitioning, MCU/SoC & FPGA selection, power tree budgeting, high-speed bus architectures, and trade-off analysis before silicon commit.',
    topics: ['MCU/SoC/FPGA Selection', 'Power Budget & PMIC Architecture', 'Sensor & Peripheral Interfaces', 'Technical Feasibility Audits', 'Form-Factor Constraints'],
  },
  {
    id: 'dfm',
    title: 'PCB Layout & DFM Optimization',
    tag: 'Manufacturability',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
    description: 'Stack-up optimization, high-density HDI design review, microvia reliability, panelization strategy, and Design for Manufacturing (DFM/DFA) validation to maximize factory yields.',
    topics: ['Controlled Impedance Stackup', 'HDI & Microvia Architecture', 'DFM / DFA Rule Check', 'Thermal Pad & Copper Balancing', 'High-Speed Differential Routing'],
  },
  {
    id: 'sipi',
    title: 'Signal & Power Integrity (SI / PI)',
    tag: 'Performance & EMC',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    description: 'Electromagnetic interference (EMI) mitigation, crosstalk elimination, power distribution network (PDN) impedance tuning, and high-frequency return path planning.',
    topics: ['PDN Impedance & Decoupling', 'EMI/EMC Pre-Compliance', 'Jitter & Eye Diagram Checks', 'Return Path Discontinuity Fixes', 'Switching Noise Suppression'],
  },
  {
    id: 'iot',
    title: 'IoT & Wireless Integration',
    tag: 'RF & Embedded',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.121a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12z" />
      </svg>
    ),
    description: 'Antenna matching networks, Bluetooth LE, Wi-Fi 6, LoRaWAN, cellular IoT connectivity, and ultra-low-power sleep architecture for battery-operated devices.',
    topics: ['Antenna Tuning & Matching', 'BLE / Wi-Fi / Cellular NB-IoT', 'Ultra-low-power Sleep Profiling', 'Mesh & Protocol Optimization', 'RF Coexistence Analysis'],
  },
  {
    id: 'bom',
    title: 'Component Sourcing & BOM Cost Reduction',
    tag: 'Supply Chain',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Eliminate single-source bottlenecks, replace end-of-life (EOL) components, and optimize Bill of Materials (BOM) cost by up to 40% without compromising performance.',
    topics: ['Drop-in Alternate Sourcing', 'EOL & Obsolescence Remediation', 'High-Volume Cost Engineering', 'Authorized Distributor Strategy', 'Lead Time Reduction'],
  },
  {
    id: 'troubleshooting',
    title: 'Hardware Debugging & Root Cause Analysis',
    tag: 'Diagnostic',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 0021 17.25l-5.83-5.83M3 13.5v-3a2.25 2.25 0 012.25-2.25h3.38a2.25 2.25 0 011.59.66l2.12 2.12m0 0l3 3m-3-3l-3 3" />
      </svg>
    ),
    description: 'Rapid diagnostic troubleshooting for bricked prototypes, intermittent reset anomalies, thermal hotspots, power rail droop, and unexpected latch-up conditions.',
    topics: ['Power Rail Transient Analysis', 'Intermittent Reset Debugging', 'Thermal Hotspot Identification', 'Signal Jitter & Ringing Root-Cause', 'Board Bring-Up Roadblocks'],
  },
];

const PACKAGES = [
  {
    id: 'diagnostic',
    name: 'Discovery & Quick Diagnostic',
    badge: 'Popular for Scoping',
    duration: '30 Minutes',
    price: 'Free Initial Assessment',
    description: 'Ideal for initial feasibility screening, high-level project roadmap guidance, and reviewing high-level block diagrams.',
    features: [
      '1-on-1 Session with Senior Hardware Architect',
      'High-Level Architecture & Feasibility Review',
      'Mutual NDA Prior to Technical Review',
      'Preliminary Project Cost & Timeline Estimate',
      'Actionable Next-Step Recommendations',
    ],
    highlight: false,
  },
  {
    id: 'audit',
    name: 'Deep-Dive Architecture & DFM Audit',
    badge: 'Most Comprehensive',
    duration: '2-Hour Intensive + Written Report',
    price: 'Fixed-Price Technical Sprint',
    description: 'Full schematic, layout, stackup, and component audit designed to prevent expensive re-spins and factory delays.',
    features: [
      'Line-by-Line Schematic & Pinout Inspection',
      'Gerber & PCB Stackup DFM / DFA Audit',
      'Component Sourcing & Obsolescence Screening',
      'EMI/EMC & Signal Integrity Risk Analysis',
      'Comprehensive Written Report with Annotated CAD Fixes',
      '14-Day Post-Session Email Support',
    ],
    highlight: true,
  },
  {
    id: 'retainer',
    name: 'Dedicated Hardware Advisory Retainer',
    badge: 'For Fast-Growing Teams',
    duration: 'Monthly Ongoing Support',
    price: 'Custom Engineering Retainer',
    description: 'Embed senior hardware and PCB engineering capacity into your design cycle without full-time hiring overhead.',
    features: [
      'Direct Slack / Teams Channel with Our Lead Engineers',
      'Continuous Design Review at Every Milestone',
      'Prototype Bring-Up & Lab Debugging Support',
      'Factory & Assembly Liaison Assistance',
      'Priority SLA Turnaround for Rapid Schematic Reviews',
    ],
    highlight: false,
  },
];

const FAQS = [
  {
    q: 'Do you execute a Non-Disclosure Agreement (NDA) before we discuss details?',
    a: 'Absolutely. We treat all client intellectual property with the highest confidentiality. We provide our standard mutual NDA or can review and sign your company’s standard NDA before any proprietary files or specifications are shared.',
  },
  {
    q: 'What files or data should we prepare for a technical consultation?',
    a: 'Depending on the depth of the consultation, helpful materials include block diagrams, schematic PDFs, ECAD files (Altium, KiCad, Eagle, OrCAD), PCB Gerbers/ODB++, BOM lists, and any errata logs or test oscilloscope captures if debugging an issue.',
  },
  {
    q: 'Which CAD and EDA tools does iGatebots support?',
    a: 'Our engineering team is fluent across all industry-standard EDA packages including Altium Designer, KiCad, Autodesk Eagle, Cadence OrCAD/Allegro, and Mentor Graphics PADS.',
  },
  {
    q: 'How quickly will we receive the written audit report after our session?',
    a: 'For our Deep-Dive Architecture & DFM Audit, you will receive our structured technical report complete with annotated schematics, PCB stackup modifications, and component recommendations within 48 to 72 business hours.',
  },
  {
    q: 'Can iGatebots also execute the full design or redesign if fixes are required?',
    a: 'Yes. If our consultation reveals changes you prefer not to implement in-house, our full engineering team can seamlessly handle the schematic modification, PCB re-routing, prototyping, and turnkey fabrication.',
  },
];

export default function Consultation() {
  const [selectedDomain, setSelectedDomain] = useState(ADVISORY_DOMAINS[0].id);
  const [activeFaq, setActiveFaq] = useState(null);

  // Booking Form State
  const [bookingTier, setBookingTier] = useState('audit');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    domain: 'architecture',
    urgency: 'Standard (Next few days)',
    projectStage: 'Prototype in development',
    notes: '',
    ndaRequired: true,
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  useEffect(() => {
    document.title = 'Engineering Consultation & Technical Advisory | iGatebots';
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
    }, 1200);
  };

  const activeDomainData = ADVISORY_DOMAINS.find((d) => d.id === selectedDomain);

  return (
    <>
      {/* ── HERO SECTION ────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <PCBBackground />
        
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 35%, rgba(26,108,255,0.15) 0%, rgba(0,200,255,0.05) 50%, transparent 80%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-6 shadow-glow-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              1-on-1 Technical Advisory & Hardware Strategy
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
              Expert <span className="gradient-text">Engineering Consultation</span> for Hardware Innovation
            </h1>

            <p className="text-white/55 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-body">
              Eliminate costly PCB re-spins, validate hardware architectures, optimize bill-of-materials, and resolve critical bring-up roadblocks with direct access to veteran electronics engineers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="#book-consultation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-primary-500/30 hover:shadow-glow-primary hover:-translate-y-0.5"
              >
                Schedule a Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
              <a
                href="#advisory-domains"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/70 hover:text-white hover:border-primary-400/40 hover:bg-white/5 font-body font-medium rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                Explore Advisory Domains
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10">
              {[
                { label: 'Hardware Audits Delivered', value: '150+' },
                { label: 'First-Pass PCB Success', value: '99%' },
                { label: 'Average BOM Savings', value: '25% - 40%' },
                { label: 'Confidentiality Guarantee', value: '100% NDA' },
              ].map((stat, i) => (
                <div key={i} className="p-3 bg-dark-800/40 border border-white/5 rounded-xl">
                  <p className="font-display text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-white/40 text-xs font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ADVISORY FOCUS DOMAINS ──────────────────────────────────────────────── */}
      <section id="advisory-domains" className="py-24 bg-dark-800/30 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Specialized Guidance
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Key <span className="gradient-text">Consultation Areas</span>
            </h2>
            <p className="text-white/45 max-w-2xl mx-auto text-base font-body">
              Whether you need strategic architecture planning, production validation, or emergency lab debugging, we provide targeted technical insights.
            </p>
          </AnimatedSection>

          {/* Interactive domain matrix */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {ADVISORY_DOMAINS.map((domain) => {
              const isSelected = domain.id === selectedDomain;
              return (
                <div
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`cursor-pointer rounded-2xl p-7 transition-all duration-300 relative border ${
                    isSelected
                      ? 'bg-dark-800/90 border-primary-500/50 shadow-lg shadow-primary-500/15 -translate-y-1'
                      : 'bg-dark-800/50 border-white/5 hover:border-white/15 hover:bg-dark-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-primary-500 text-white shadow-glow-primary'
                          : 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                      }`}
                    >
                      {domain.icon}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-primary-400/80 px-2.5 py-1 bg-primary-500/10 rounded-full border border-primary-500/20">
                      {domain.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2">{domain.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-6 font-body">{domain.description}</p>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    {domain.topics.map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                        <span className="text-white/60 text-xs font-body">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Domain Spotlight banner */}
          {activeDomainData && (
            <AnimatedSection>
              <div className="bg-gradient-to-r from-primary-900/40 via-dark-800 to-dark-900 border border-primary-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono uppercase text-primary-400 tracking-wider">Ready to review</span>
                  <h4 className="font-display text-2xl font-bold text-white mt-1">{activeDomainData.title}</h4>
                  <p className="text-white/50 text-sm max-w-2xl mt-1 font-body">
                    Schedule an advisory session specifically tailored to {activeDomainData.title.toLowerCase()}.
                  </p>
                </div>
                <a
                  href="#book-consultation"
                  onClick={() => setFormData((p) => ({ ...p, domain: activeDomainData.id }))}
                  className="shrink-0 px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white text-sm font-body font-medium rounded-full transition-all hover:shadow-lg hover:shadow-primary-500/25"
                >
                  Consult on This Domain &rarr;
                </a>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── PACKAGES & TIERS ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Engagement Formats
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Flexible <span className="gradient-text">Consultation Tiers</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base font-body">
              Select the engagement model that fits your project velocity and technical requirements.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => {
              const isAudit = pkg.highlight;
              return (
                <AnimatedSection key={pkg.id}>
                  <div
                    className={`rounded-3xl p-8 flex flex-col justify-between h-full transition-all duration-300 relative ${
                      isAudit
                        ? 'bg-dark-800 border-2 border-primary-500 shadow-2xl shadow-primary-500/20 md:-translate-y-2'
                        : 'bg-dark-800/60 border border-white/8 hover:border-white/20'
                    }`}
                  >
                    {isAudit && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-400 text-white text-xs font-body font-bold rounded-full uppercase tracking-wider shadow-lg">
                        Recommended
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-mono uppercase text-primary-400 px-3 py-1 bg-primary-500/10 rounded-full border border-primary-500/20">
                          {pkg.badge}
                        </span>
                        <span className="text-xs text-white/40 font-body">{pkg.duration}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                      <p className="text-primary-300 font-display font-semibold text-lg mb-4">{pkg.price}</p>
                      <p className="text-white/45 text-sm leading-relaxed mb-8 font-body">{pkg.description}</p>

                      <div className="space-y-3 mb-8">
                        <p className="text-xs font-mono uppercase text-white/30 tracking-wider">What’s Included:</p>
                        {pkg.features.map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 shrink-0 mt-0.5">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-white/70 text-sm font-body leading-snug">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#book-consultation"
                      onClick={() => setBookingTier(pkg.id)}
                      className={`w-full py-3.5 rounded-full text-sm font-body font-medium flex items-center justify-center gap-2 transition-all ${
                        isAudit
                          ? 'bg-primary-500 hover:bg-primary-400 text-white shadow-lg shadow-primary-500/30'
                          : 'border border-white/20 text-white hover:bg-white/5 hover:border-white/40'
                      }`}
                    >
                      Choose {pkg.name.split(' ')[0]}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4-STEP CONSULTATION ROADMAP ─────────────────────────────────────────── */}
      <section className="py-24 bg-dark-800/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              How It Works
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              The Consultation <span className="gradient-text">Process</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base font-body">
              Structured, efficient, and oriented toward concrete engineering deliverables.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Intake & Mutual NDA',
                desc: 'We execute our mutual NDA and receive your project background, requirements, block diagrams, or CAD files via secure channel.',
              },
              {
                step: '02',
                title: 'Pre-Session Technical Audit',
                desc: 'Our lead engineers inspect schematics, datasheets, PCB stackups, and component availability prior to the live meeting.',
              },
              {
                step: '03',
                title: 'Interactive Live Advisory',
                desc: 'A focused video session with screen-share walkthrough, real-time CAD annotations, and direct Q&A addressing your bottleneck.',
              },
              {
                step: '04',
                title: 'Actionable Report & Next Steps',
                desc: 'Receive a written summary report detailing exact fixes, component part numbers, stackup tables, and next milestone roadmap.',
              },
            ].map((p, i) => (
              <AnimatedSection key={p.step} delay={i * 80}>
                <div className="bg-dark-800/80 border border-white/8 rounded-2xl p-6 h-full flex flex-col justify-between hover:border-primary-500/30 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center font-display font-bold text-primary-400 text-lg mb-6">
                      {p.step}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed font-body">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CONSULTATION BOOKING WIZARD ──────────────────────────────── */}
      <section id="book-consultation" className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Direct Engineering Access
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Request Your <span className="gradient-text">Advisory Session</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base font-body">
              Fill out your project parameters below. Our engineering team will review and confirm your session within 24 hours.
            </p>
          </AnimatedSection>

          <div className="bg-dark-800/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative gradient-border">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-3">Consultation Request Received!</h3>
                <p className="text-white/60 text-base max-w-lg mx-auto font-body mb-6">
                  Thank you, <span className="text-white font-semibold">{formData.name || 'there'}</span>. A senior hardware engineer has been assigned to review your inquiry for the <span className="text-primary-300 font-semibold">{formData.domain}</span> domain.
                </p>

                <div className="bg-dark-900/80 border border-white/10 rounded-2xl p-6 max-w-md mx-auto text-left mb-8 space-y-2">
                  <p className="text-xs font-mono uppercase text-white/40">Next Steps Checklist:</p>
                  <div className="flex items-center gap-2 text-white/70 text-sm font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    We will send our mutual NDA to <span className="text-white font-medium">{formData.email}</span>.
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    You’ll receive a direct calendar invitation link with our lead architect.
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    Secure upload portal link for CAD/Gerber files.
                  </div>
                </div>

                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-8 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm transition-all"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Select Format */}
                <div>
                  <label className="text-white/60 text-xs font-mono uppercase tracking-wider block mb-3">
                    1. Select Consultation Engagement Tier
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setBookingTier(pkg.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          bookingTier === pkg.id
                            ? 'bg-primary-500/15 border-primary-500 text-white shadow-sm'
                            : 'bg-white/5 border-white/8 text-white/60 hover:border-white/20'
                        }`}
                      >
                        <p className="font-display font-bold text-sm text-white mb-1">{pkg.name.split('&')[0]}</p>
                        <p className="text-xs text-primary-300 font-mono">{pkg.duration}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Area of Focus */}
                <div>
                  <label className="text-white/60 text-xs font-mono uppercase tracking-wider block mb-3">
                    2. Primary Technical Focus
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ADVISORY_DOMAINS.map((domain) => (
                      <button
                        key={domain.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, domain: domain.id }))}
                        className={`text-left p-3.5 rounded-xl border text-xs font-body transition-all ${
                          formData.domain === domain.id
                            ? 'bg-primary-500/15 border-primary-500 text-white font-medium'
                            : 'bg-white/5 border-white/8 text-white/60 hover:border-white/20'
                        }`}
                      >
                        {domain.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Contact & Project Parameters */}
                <div className="space-y-4">
                  <label className="text-white/60 text-xs font-mono uppercase tracking-wider block">
                    3. Contact & Project Parameters
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary-400 focus:bg-primary-500/5 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Work Email *"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary-400 focus:bg-primary-500/5 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company / Organization"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary-400 focus:bg-primary-500/5 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone / WhatsApp Number"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary-400 focus:bg-primary-500/5 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-xs font-body mb-1 block">Project Stage</label>
                      <select
                        name="projectStage"
                        value={formData.projectStage}
                        onChange={handleInputChange}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-400"
                      >
                        <option value="Concept / Ideation">Concept / Ideation</option>
                        <option value="Schematic in progress">Schematic in progress</option>
                        <option value="PCB layout review ready">PCB layout review ready</option>
                        <option value="Prototype bring-up failure / debugging">Prototype bring-up failure / debugging</option>
                        <option value="Preparing for high-volume production">Preparing for high-volume production</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-white/40 text-xs font-body mb-1 block">Urgency Timeline</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-400"
                      >
                        <option value="Standard (Next few days)">Standard (Next few days)</option>
                        <option value="Urgent (Within 24-48 hours)">Urgent (Within 24-48 hours)</option>
                        <option value="Critical (Emergency bring-up support)">Critical (Emergency bring-up support)</option>
                        <option value="Planning for next quarter">Planning for next quarter</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your hardware challenge, target MCU/ICs, or key questions for the session..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder-white/25 focus:outline-none focus:border-primary-400 focus:bg-primary-500/5 transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="ndaRequired"
                      name="ndaRequired"
                      checked={formData.ndaRequired}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-400"
                    />
                    <label htmlFor="ndaRequired" className="text-white/60 text-xs font-body cursor-pointer">
                      Please send a Mutual Non-Disclosure Agreement (NDA) prior to our consultation call.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-400 text-white font-body font-semibold rounded-full text-base tracking-wide transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Confirming Request...
                    </>
                  ) : (
                    <>
                      Schedule Engineering Advisory Session
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ────────────────────────────────────────── */}
      <section className="py-24 bg-dark-800/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Common Questions
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Consultation <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base font-body">
              Everything you need to know about preparing for and executing a technical consultation.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <AnimatedSection key={idx} delay={idx * 50}>
                  <div
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? 'bg-dark-800/90 border-primary-500/40 shadow-lg shadow-primary-500/5'
                        : 'bg-dark-800/50 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                    >
                      <span className="font-display font-semibold text-white text-base sm:text-lg">{faq.q}</span>
                      <div
                        className={`w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 bg-primary-500 text-white' : ''
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-1 text-white/50 text-sm leading-relaxed font-body border-t border-white/5">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY DIRECT HOTLINE CTA ─────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26,108,255,0.15) 0%, rgba(0,200,255,0.08) 100%)' }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Need Immediate Hardware Support?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-8 font-body">
              Facing an urgent prototype failure or tight silicon deadline? Call our engineering desk directly or email our priority queue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white font-body font-semibold rounded-full text-sm tracking-wide transition-all shadow-lg shadow-primary-500/25 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}?subject=Urgent%20Engineering%20Consultation%20Inquiry`}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-body font-medium rounded-full text-sm transition-all hover:bg-white/5"
              >
                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {COMPANY.email}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
