import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export default function About() {
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

              <div className="bg-dark-800/60 border border-white/8 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="text-white/60 text-sm font-body font-medium mb-1">Head Office</p>
                    <p className="text-white/35 text-sm font-body">{COMPANY.address}</p>
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
