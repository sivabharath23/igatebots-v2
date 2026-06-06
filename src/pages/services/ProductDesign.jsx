import { Helmet } from 'react-helmet-async'
import { services } from '@/data/services'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CtaBanner from '@/components/sections/CtaBanner'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const service = services.find(s => s.id === 'product-design')

export default function ProductDesign() {
  return (
    <>
      <Helmet>
        <title>{service.title} | iGatebots</title>
        <meta name="description" content={service.metaDesc} />
        <meta name="keywords" content="Product Design, Product Development, Design Services" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-navy-950 border-b border-surface-border">
        <div className="container-max px-4 md:px-8 lg:px-16">
          <p className="text-cyan text-sm font-mono mb-4">{service.label}</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">{service.title}</h1>
          <p className="text-white/70 text-lg max-w-3xl">{service.fullDesc}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-navy-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image */}
            <AnimatedSection>
              <div className="h-96 bg-gradient-to-br from-cyan/10 to-teal/10 rounded-2xl border border-surface-border overflow-hidden flex items-center justify-center">
                <p className="text-white/40">Service Image</p>
              </div>
            </AnimatedSection>

            {/* Features */}
            <AnimatedSection delay={0.2}>
              <h2 className="font-display text-3xl font-bold mb-8">Key Features</h2>
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 rounded-full bg-cyan" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-surface-muted border-y border-surface-border">
        <div className="container-max px-4 md:px-8 lg:px-16">
          <h3 className="font-display text-2xl font-bold mb-8">Other Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services
              .filter(s => s.id !== 'product-design')
              .slice(0, 3)
              .map(s => (
                <Link
                  key={s.id}
                  to={s.slug}
                  className="card-dark group"
                >
                  <h4 className="font-semibold text-white mb-2 group-hover:text-cyan transition-colors">{s.title}</h4>
                  <p className="text-white/60 text-sm mb-4">{s.shortDesc}</p>
                  <div className="flex items-center text-cyan text-sm font-medium">
                    Learn More
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
