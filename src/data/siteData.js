// All image URLs directly from igatebots.com CDN
export const IMAGES = {
  logo: 'https://igatebots.com/assets/img/logo.png',
  logoWhite: 'https://igatebots.com/assets/img/logo-white.png',
  about: 'https://igatebots.com/assets/img/about.jpg',
  aboutPage: 'https://igatebots.com/assets/img/about/about-1.png',
  // Services
  productDesign: 'https://igatebots.com/assets/img/har.jpg',
  electricCircuit: 'https://igatebots.com/assets/img/electric.jpg',
  pcbDesign: 'https://igatebots.com/assets/img/des.jpg',
  reverseEngineering: 'https://igatebots.com/assets/img/har.jpg',
  // Projects
  project1: 'https://igatebots.com/assets/img/project/single-project.jpg',
  project2: 'https://igatebots.com/assets/img/project/single-project-2.jpg',
  project3: 'https://igatebots.com/assets/img/project/single-project-3.jpg',
  // Testimonials
  client1: 'https://igatebots.com/assets/img/testimonial/1.jpg',
  client2: 'https://igatebots.com/assets/img/testimonial/2.jpg',
  client3: 'https://igatebots.com/assets/img/testimonial/3.jpg',
  client4: 'https://igatebots.com/assets/img/testimonial/4.jpg',
  // Contact icons
  contactIcon1: 'https://igatebots.com/assets/img/contact/1.png',
  contactIcon2: 'https://igatebots.com/assets/img/contact/2.png',
};

export const COMPANY = {
  name: 'iGatebots',
  tagline: 'Engineering the Future',
  description: 'iGatebots is at the forefront of electronic innovation, offering expert solutions in product design, circuit design, PCB design, and reverse engineering. We are committed to turning your electronic ideas into reality with precision and expertise.',
  address: '374, 8th Cross, GPR Royale Layout, Electronic City Phase 2, Bangalore, Karnataka 560100',
  email: 'info@igatebots.com',
  phone: '+91 1234567890',
  founded: '2015',
};

export const SERVICES = [
  {
    id: 'product-design',
    title: 'Product Design & Development',
    subtitle: 'Custom Solutions',
    description: 'Transforming concepts into functional and aesthetically pleasing designs tailored to your needs. From ideation to market-ready products.',
    longDesc: 'We bring your product vision to life through comprehensive design and development services. Our team handles everything from initial concept sketches to fully functional prototypes, ensuring every detail meets your specifications.',
    image: IMAGES.productDesign,
    icon: 'product',
    features: ['Concept Design', 'Rapid Prototyping', 'Industrial Design', '3D Modeling', 'Design for Manufacturing', 'User Experience'],
    slug: 'product-design',
  },
  {
    id: 'electronics-circuit',
    title: 'Electronics Circuit Design',
    subtitle: 'Reliable & Efficient',
    description: 'Designing robust and efficient electronic circuits to meet your technical requirements. Precision at every junction.',
    longDesc: 'Our electronics circuit design team delivers reliable, efficient, and innovative circuit solutions. We specialize in analog, digital, and mixed-signal circuits optimized for performance and manufacturability.',
    image: IMAGES.electricCircuit,
    icon: 'circuit',
    features: ['Analog Circuit Design', 'Digital Circuit Design', 'Mixed-Signal Design', 'Power Electronics', 'Signal Processing', 'Circuit Simulation'],
    slug: 'electronics-circuit',
  },
  {
    id: 'pcb-design',
    title: 'PCB Design',
    subtitle: 'Efficient & Reliable',
    description: 'Designing high-performance PCBs with precision to meet your electronic needs. Multi-layer, high-speed, compact designs.',
    longDesc: 'From single-layer to complex multi-layer PCBs, we deliver high-performance board designs with optimal signal integrity, thermal management, and manufacturability. Our designs are ready for production.',
    image: IMAGES.pcbDesign,
    icon: 'pcb',
    features: ['Multi-layer PCB', 'High-Speed Design', 'RF/Microwave PCB', 'Flex & Rigid-Flex', 'DFM Analysis', 'Signal Integrity'],
    slug: 'pcb-design',
  },
  {
    id: 'reverse-engineering',
    title: 'Reverse Engineering',
    subtitle: 'Detailed Analysis & Reengineering',
    description: 'Providing comprehensive reverse engineering services to enhance and understand existing products.',
    longDesc: 'Our reverse engineering service helps you understand, replicate, or improve existing electronic products. We use advanced analysis tools to deconstruct hardware and recreate or enhance designs.',
    image: IMAGES.reverseEngineering,
    icon: 'reverse',
    features: ['Hardware Analysis', 'Schematic Recreation', 'BOM Generation', 'Firmware Analysis', 'Product Cloning', 'Failure Analysis'],
    slug: 'reverse-engineering',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "iGateBots' PCB design services have significantly enhanced our product development cycle. Their precision and innovative solutions have been instrumental in our success.",
    name: 'Emily Carter',
    role: 'Electronics Engineer',
    image: IMAGES.client1,
    rating: 5,
  },
  {
    id: 2,
    quote: "iGateBots' expertise in electronic circuit design was beyond our expectations. Their thorough approach and creativity brought our project to a new level of excellence.",
    name: 'Michael Johnson',
    role: 'Product Manager',
    image: IMAGES.client2,
    rating: 5,
  },
  {
    id: 3,
    quote: "The IoT hardware and sensors designed by iGateBots have greatly improved our system's performance. Their innovative solutions and reliability were key to our project's success.",
    name: 'Sarah Lee',
    role: 'Hardware Developer',
    image: IMAGES.client3,
    rating: 5,
  },
  {
    id: 4,
    quote: "iGateBots' comprehensive electronic manufacturing services have streamlined our production process. Their dedication and expertise have been essential to our operations.",
    name: 'David Thompson',
    role: 'IT Director',
    image: IMAGES.client4,
    rating: 5,
  },
];

export const STATS = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Advanced PCB Design',
    category: 'PCB Design',
    image: IMAGES.pcbDesign,
    description: 'High-density multi-layer PCB for IoT applications.',
    link: '/services/pcb-design',
  },
  {
    id: 2,
    title: 'Cutting-Edge Product Design',
    category: 'Product Design',
    image: IMAGES.productDesign,
    description: 'End-to-end product design from concept to prototype.',
    link: '/services/product-design',
  },
  {
    id: 3,
    title: 'Firmware Development Project',
    category: 'Electronics',
    image: IMAGES.project1,
    description: 'Embedded firmware for industrial sensor array.',
    link: '/services/electronics-circuit',
  },
  {
    id: 4,
    title: 'Electric Circuit Design',
    category: 'Circuit Design',
    image: IMAGES.electricCircuit,
    description: 'Power-efficient mixed-signal circuit architecture.',
    link: '/services/electronics-circuit',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    dropdown: SERVICES.map(s => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];
