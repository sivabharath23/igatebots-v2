import { Link } from 'react-router-dom'
import { Cpu, Zap, CircuitBoard, Search, ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedSection from '@/components/ui/AnimatedSection'

const iconMap = {
  Cpu: Cpu,
  Zap: Zap,
  CircuitBoard: CircuitBoard,
  Search: Search,
}

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-navy-900">
      <div className="container-max">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Our Expertise</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Engineering Services
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your electronic design and engineering needs
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const IconComponent = iconMap[service.icon]
            return (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <Link
                  to={service.slug}
                  className="group card-dark flex flex-col h-full hover:border-cyan"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-cyan text-xs font-mono mb-2">{service.label}</p>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {service.title}
                      </h3>
                    </div>
                    <div className="p-3 bg-cyan/10 rounded-lg group-hover:bg-cyan/20 transition-colors">
                      <IconComponent size={24} className="text-cyan" />
                    </div>
                  </div>
                  <p className="text-white/70 text-sm flex-1 mb-4">{service.shortDesc}</p>
                  <div className="flex items-center text-cyan text-sm font-medium">
                    Learn More
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
