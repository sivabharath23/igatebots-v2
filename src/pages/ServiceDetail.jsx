import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import PCBBackground from '../components/PCBBackground';
import { ServiceIcon } from '../components/ServiceIcon';
import { SERVICES } from '../data/siteData';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) document.title = `${service.title} | iGatebots`;
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <PCBBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-white/35 font-body mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white/60 transition-colors">Services</Link>
              <span>/</span>
              <span className="text-white/60">{service.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                <ServiceIcon slug={service.slug} className="w-5 h-5" />
              </div>
              <span className="text-primary-400 text-xs font-body tracking-widest uppercase">{service.subtitle}</span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl">
              {service.title}
            </h1>
            <p className="text-white/45 text-lg max-w-2xl leading-relaxed font-body">{service.longDesc}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection>
                <div className="rounded-2xl overflow-hidden gradient-border">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-80 object-cover"
                    onError={(e) => { e.target.src = `https://placehold.co/800x400/0a1220/1a6cff?text=${encodeURIComponent(service.title)}`; }}
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-8">
                  <h2 className="font-display text-2xl font-bold text-white mb-4">Service Overview</h2>
                  <p className="text-white/45 leading-relaxed mb-4 font-body">{service.longDesc}</p>
                  <p className="text-white/45 leading-relaxed font-body">
                    Our experienced team uses industry-leading tools and methodologies to deliver results that exceed expectations. Every project is approached with the same level of care, precision, and dedication regardless of scale.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-8">
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Key Capabilities</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 p-3.5 bg-primary-500/5 border border-primary-500/10 rounded-xl">
                        <div className="w-7 h-7 rounded-lg bg-primary-500/15 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/65 text-sm font-body">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-8">
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Our Process</h2>
                  <div className="space-y-5">
                    {[
                      { step: '01', title: 'Discovery & Requirements', desc: 'We begin by understanding your project requirements, constraints, and goals in detail.' },
                      { step: '02', title: 'Design & Planning', desc: 'Our engineers create detailed specifications and design plans for review and approval.' },
                      { step: '03', title: 'Development & Prototyping', desc: 'We build and iterate on prototypes, testing at each stage for quality assurance.' },
                      { step: '04', title: 'Review & Delivery', desc: 'Final review, documentation, and delivery of production-ready designs and files.' },
                    ].map((p, i) => (
                      <div key={p.step} className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <span className="font-display text-primary-400/60 text-sm font-bold w-8 text-center">{p.step}</span>
                          {i < 3 && <div className="w-px flex-1 bg-primary-500/15 mt-2" />}
                        </div>
                        <div className="pb-5">
                          <h4 className="font-display font-semibold text-white text-sm mb-1">{p.title}</h4>
                          <p className="text-white/40 text-sm font-body">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <AnimatedSection direction="left">
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-6">
                  <h3 className="font-display font-bold text-white mb-3">Get a Quote</h3>
                  <p className="text-white/40 text-sm mb-5 font-body">Ready to start your project? Let's discuss your requirements.</p>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary-500 hover:bg-primary-400 text-white font-body font-medium rounded-xl text-sm transition-all duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={100}>
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-6">
                  <h3 className="font-display font-bold text-white mb-4">Other Services</h3>
                  <ul className="space-y-2">
                    {related.map((s) => (
                      <li key={s.id}>
                        <Link
                          to={`/services/${s.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-500/5 hover:border-primary-500/15 border border-transparent transition-all"
                        >
                          <div className="w-7 h-7 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                            <ServiceIcon slug={s.slug} className="w-4 h-4" />
                          </div>
                          <span className="text-white/55 text-sm font-body hover:text-white transition-colors">{s.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={200}>
                <div className="bg-dark-800/60 border border-white/5 rounded-2xl p-6">
                  <h3 className="font-display font-bold text-white mb-2">Direct Contact</h3>
                  <p className="text-white/40 text-sm mb-4 font-body">Call us directly for urgent inquiries.</p>
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-2 text-primary-400 font-body font-medium text-sm hover:text-primary-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    +91 1234567890
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
