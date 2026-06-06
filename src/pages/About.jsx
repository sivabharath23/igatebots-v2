import { Helmet } from 'react-helmet-async'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CtaBanner from '@/components/sections/CtaBanner'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | iGatebots</title>
        <meta name="description" content="Learn about iGatebots, our team, and our mission in electronics innovation." />
      </Helmet>

      <section className="pt-28 pb-12 bg-navy-950 border-b border-surface-border">
        <div className="container-max px-4 md:px-8 lg:px-16">
          <p className="text-cyan text-sm font-mono mb-2">Home / About Us</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">About iGatebots</h1>
        </div>
      </section>

      <section className="section-padding bg-navy-900">
        <div className="container-max">
          <AnimatedSection className="max-w-3xl">
            <h2 className="font-display text-4xl font-bold mb-8">Our Story</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              iGatebots was founded with a vision to revolutionize electronic innovation through precision engineering
              and creative problem-solving. With over a decade of industry experience, we've established ourselves as a
              trusted partner for businesses seeking cutting-edge solutions in product design, circuit design, PCB design,
              and reverse engineering.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Our team comprises experienced engineers and designers who are passionate about transforming ideas into
              market-ready products. We combine technical excellence with customer-centric service to deliver
              exceptional results that exceed expectations.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              At iGatebots, we believe in the power of innovation and continuous improvement. Every project is an
              opportunity to push boundaries and create solutions that make a real impact in the world of electronics
              and engineering.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
