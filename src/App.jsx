import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import ProductDesign from './pages/services/ProductDesign'
import CircuitDesign from './pages/services/CircuitDesign'
import PCBDesign from './pages/services/PCBDesign'
import ReverseEngineering from './pages/services/ReverseEngineering'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="services/product-design" element={<ProductDesign />} />
            <Route path="services/circuit-design" element={<CircuitDesign />} />
            <Route path="services/pcb-design" element={<PCBDesign />} />
            <Route path="services/reverse-engineering" element={<ReverseEngineering />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
