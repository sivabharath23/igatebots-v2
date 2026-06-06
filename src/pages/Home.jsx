import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import ServicesGrid from '@/components/sections/ServicesGrid'
import AboutTeaser from '@/components/sections/AboutTeaser'
import StatsCounter from '@/components/sections/StatsCounter'
import Testimonials from '@/components/sections/Testimonials'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>iGatebots | Product Design, Electronics & PCB Design, Reverse Engineering</title>
        <meta name="description" content="igatebots provides expert services in Product Design & Development, Electronics Circuit Design, PCB Design, and Reverse Engineering." />
        <meta name="keywords" content="Product Design, Electronics Design, PCB Design, Reverse Engineering, Engineering Services" />
      </Helmet>
      <HeroSection />
      <ServicesGrid />
      <AboutTeaser />
      <StatsCounter />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
