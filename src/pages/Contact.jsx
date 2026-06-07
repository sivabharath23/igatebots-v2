import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import PCBBackground from '../components/PCBBackground';
import { COMPANY } from '../data/siteData';

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Visit Us',
    value: COMPANY.address,
    link: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email Us',
    value: COMPANY.email,
    link: `mailto:${COMPANY.email}`,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Call Us',
    value: COMPANY.phone,
    link: `tel:${COMPANY.phone}`,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  useEffect(() => {
    document.title = 'Contact Us | iGatebots';
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <PCBBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="section-tag mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Contact Us
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mt-4 mb-6">
              Let's <span className="gradient-text">Talk</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>
            <nav className="flex items-center justify-center gap-2 mt-6 text-sm text-white/40">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">Contact</span>
            </nav>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection direction="left">
                <h2 className="font-display text-2xl font-bold text-white mb-2">Get in Touch</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  We're here to help you with any engineering challenge. Reach out and let's start building something great together.
                </p>
              </AnimatedSection>

              {contactInfo.map((item, i) => (
                <AnimatedSection key={item.label} direction="left" delay={i * 100}>
                  <div className="card-glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-wide mb-1">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="text-white/80 text-sm hover:text-primary-300 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-white/80 text-sm leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              {/* Map */}
              <AnimatedSection direction="left" delay={400}>
                <div className="rounded-2xl overflow-hidden h-48 border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089930093!2d77.46612614452614!3d12.953945614144494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1722176137888!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="iGatebots Location"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <AnimatedSection className="lg:col-span-3" direction="right">
              <div className="card-glass rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h2>

                {status === 'sent' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm">We'll get back to you within 24 hours.</p>
                    <button onClick={() => { setStatus(null); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-outline mt-6">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-white/40 text-xs font-mono uppercase tracking-wide mb-2 block">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-mono uppercase tracking-wide mb-2 block">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs font-mono uppercase tracking-wide mb-2 block">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="PCB Design Inquiry"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs font-mono uppercase tracking-wide mb-2 block">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project requirements..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 transition-all duration-200 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
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
  );
}
