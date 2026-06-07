import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import PCBBackground from '../components/PCBBackground';
import { ServiceIcon } from '../components/ServiceIcon';
import { SERVICES } from '../data/siteData';

export default function Services() {
  useEffect(() => {
    document.title = 'Engineering Services | iGatebots';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <PCBBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Engineering Services
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mt-2 mb-6">
              What We <span className="gradient-text">Offer</span>
            </h1>
            <p className="text-white/45 text-lg max-w-xl mx-auto font-body">
              From concept to deployment — comprehensive engineering services tailored for modern electronic challenges.
            </p>
            <nav className="flex items-center justify-center gap-2 mt-6 text-sm text-white/35 font-body">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/60">Services</span>
            </nav>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.id} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={`grid lg:grid-cols-2 gap-16 items-center`}>
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden gradient-border">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => { e.target.src = `https://placehold.co/600x400/0a1220/1a6cff?text=${encodeURIComponent(service.title)}`; }}
                    />
                  </div>
                </div>
                <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                      <ServiceIcon slug={service.slug} className="w-5 h-5" />
                    </div>
                    <span className="text-primary-400 text-xs font-body tracking-widest uppercase">{service.subtitle}</span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-white/45 leading-relaxed mb-6 font-body">{service.longDesc}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                        <span className="text-white/55 text-sm font-body">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,108,255,0.12) 0%, rgba(0,200,255,0.06) 100%)' }} />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-white/45 mb-8 font-body">Our team is ready to discuss your specific requirements and create a tailored engineering plan.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Request a Consultation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
