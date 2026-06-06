import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function CtaBanner() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-navy-900 via-cyan/5 to-navy-900">
      <div className="container-max">
        <AnimatedSection className="text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="gradient-text">Electronic Ideas?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Let's collaborate to bring your product concepts into reality with expert engineering solutions.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 btn-primary text-lg">
            Start Your Project
            <ArrowRight size={20} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
