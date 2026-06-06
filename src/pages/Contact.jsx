import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import AnimatedSection from '@/components/ui/AnimatedSection'

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

const EMAILJS_CONFIG = {
  serviceId:  'service_YOUR_ID',
  templateId: 'template_YOUR_ID',
  publicKey:  'YOUR_PUBLIC_KEY',
}

export default function Contact() {
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

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

            {/* Left: contact info + map */}
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

            {/* Right: contact form */}
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
