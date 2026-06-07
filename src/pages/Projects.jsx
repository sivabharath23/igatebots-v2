import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import PCBBackground from '../components/PCBBackground';
import { IMAGES } from '../data/siteData';

const allProjects = [
  { id: 1, title: 'Advanced PCB Design', category: 'PCB Design', image: IMAGES.pcbDesign, description: 'High-density multi-layer PCB for IoT applications with optimised signal integrity.', link: '/services/pcb-design' },
  { id: 2, title: 'Cutting-Edge Product Design', category: 'Product Design', image: IMAGES.productDesign, description: 'End-to-end product design from initial concept through to validated prototype.', link: '/services/product-design' },
  { id: 3, title: 'Firmware Development', category: 'Electronics', image: IMAGES.project1, description: 'Embedded firmware for an industrial sensor array with real-time data processing.', link: '/services/electronics-circuit' },
  { id: 4, title: 'Electric Circuit Design', category: 'Circuit Design', image: IMAGES.electricCircuit, description: 'Power-efficient mixed-signal circuit architecture for portable medical device.', link: '/services/electronics-circuit' },
  { id: 5, title: 'IoT Sensor Network', category: 'Electronics', image: IMAGES.reverseEngineering, description: 'Wireless sensor array with cloud connectivity for industrial monitoring.', link: '/services/electronics-circuit' },
  { id: 6, title: 'Power Supply Unit', category: 'PCB Design', image: IMAGES.pcbDesign, description: 'High-efficiency 500W switching power supply with active PFC correction.', link: '/services/pcb-design' },
  { id: 7, title: 'Motor Controller Board', category: 'PCB Design', image: IMAGES.electricCircuit, description: 'Precision brushless DC motor controller for collaborative robotics applications.', link: '/services/pcb-design' },
  { id: 8, title: 'Legacy Hardware Analysis', category: 'Reverse Engineering', image: IMAGES.project2, description: 'Complete reverse engineering of a discontinued industrial PLC controller.', link: '/services/reverse-engineering' },
];

const categories = ['All', ...new Set(allProjects.map((p) => p.category))];

export default function Projects() {
  const [active, setActive] = useState('All');

  useEffect(() => {
    document.title = 'Projects | iGatebots';
    window.scrollTo(0, 0);
  }, []);

  const filtered = active === 'All' ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <PCBBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Our Portfolio
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mt-2 mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-white/45 text-lg max-w-xl mx-auto font-body">
              A showcase of our engineering excellence across all service verticals.
            </p>
            <nav className="flex items-center justify-center gap-2 mt-6 text-sm text-white/35 font-body">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/60">Projects</span>
            </nav>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-200 ${
                  active === cat
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'border border-white/10 text-white/45 hover:border-white/20 hover:text-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 55}>
                <Link
                  to={project.link}
                  className="group block bg-dark-800/60 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:border-primary-500/20 hover:shadow-xl hover:shadow-primary-500/8"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = `https://placehold.co/400x300/0a1220/1a6cff?text=${encodeURIComponent(project.title)}`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/10 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-dark-900/80 border border-white/10 text-white/60 text-xs rounded-full font-body">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-white text-sm mb-1.5 group-hover:text-primary-300 transition-colors">{project.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed font-body">{project.description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,108,255,0.12) 0%, rgba(0,200,255,0.06) 100%)' }} />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Have a Project in Mind?</h2>
            <p className="text-white/45 mb-8 font-body">We'd love to add your project to our portfolio. Let's get started.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Start Your Project
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
