import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function AboutTeaser() {
  return (
    <section className="section-padding bg-navy-950">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <AnimatedSection>
            <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-cyan/10 to-teal/10 rounded-2xl border border-surface-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/40 text-center">About Us Image</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2}>
            <SectionLabel>About iGatebots</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Pioneering Electronic <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-white/70 text-lg mb-4 leading-relaxed">
              With over a decade of experience, iGatebots stands at the forefront of electronic innovation,
              delivering precision-engineered solutions for product design, circuit design, PCB design, and reverse engineering.
            </p>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Our team of expert engineers combines technical excellence with creative problem-solving to bring
              your electronic ideas from concept to market-ready products.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 btn-primary">
              Discover More
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
