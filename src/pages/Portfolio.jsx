import { Helmet } from 'react-helmet-async'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CtaBanner from '@/components/sections/CtaBanner'

const projects = [
  {
    id: 1,
    title: 'IoT Temperature Sensor System',
    category: 'Electronics Circuit Design',
    description: 'Designed and developed a wireless temperature monitoring system for industrial applications.',
  },
  {
    id: 2,
    title: 'Medical Device PCB',
    category: 'PCB Design',
    description: 'High-precision PCB design for portable medical diagnostic equipment with FDA compliance.',
  },
  {
    id: 3,
    title: 'Consumer Electronics Redesign',
    category: 'Reverse Engineering',
    description: 'Complete reverse engineering and redesign of legacy consumer electronics for modern manufacturing.',
  },
]

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | iGatebots</title>
        <meta name="description" content="View our portfolio of successful projects in electronics design and engineering." />
      </Helmet>

      <section className="pt-28 pb-12 bg-navy-950 border-b border-surface-border">
        <div className="container-max px-4 md:px-8 lg:px-16">
          <p className="text-cyan text-sm font-mono mb-2">Home / Portfolio</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Our Portfolio</h1>
        </div>
      </section>

      <section className="section-padding bg-navy-900">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <SectionLabel>Our Work</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <div className="card-dark h-full flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-cyan/10 to-teal/10 rounded-lg mb-4 border border-surface-border flex items-center justify-center">
                    <p className="text-white/40">Project Image</p>
                  </div>
                  <p className="text-cyan text-xs font-mono mb-2">{project.category}</p>
                  <h3 className="font-display text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-white/70 text-sm flex-1">{project.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
