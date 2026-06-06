import { testimonials } from '@/data/testimonials'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function Testimonials() {
  return (
    <section className="section-padding bg-navy-900">
      <div className="container-max">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>What Our Clients Say</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={testimonial.id} delay={i * 0.1}>
              <div className="card-dark flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan/20 to-teal/20 border border-surface-border flex items-center justify-center text-lg font-bold text-cyan">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-cyan text-xs">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/70 italic flex-1 mb-4">"{testimonial.quote}"</p>
                <p className="text-teal text-sm font-medium">Service: {testimonial.service}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
