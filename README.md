# iGatebots – Modernized Website

A fully revamped, production-grade website for **iGatebots** built with **React + Vite + Tailwind CSS**.

## Tech Stack

- **React 18** – Component-based UI
- **Vite 8** – Lightning-fast build tool
- **Tailwind CSS 3** – Utility-first styling
- **React Router DOM** – Client-side routing

## Features

### Design
- Dark theme matching the iGatebots brand (blue/electric palette)
- Animated PCB traces & circuit board background with SVG
- Glassmorphism card components
- Syne (display) + DM Sans (body) font pairing
- Fully responsive (mobile-first)

### Pages
- **/** – Home (Hero slider, Stats, About, Services, Projects, Testimonials, CTA)
- **/about** – Company story, values, team
- **/services** – All services overview
- **/services/product-design** – Product Design detail
- **/services/electronics-circuit** – Electronics Circuit detail
- **/services/pcb-design** – PCB Design detail
- **/services/reverse-engineering** – Reverse Engineering detail
- **/projects** – Filterable portfolio grid
- **/contact** – Contact form + Google Maps + info

### SEO
- Dynamic title per page, meta description, og:tags
- Semantic HTML, proper heading hierarchy, alt tags on all images

## Image URLs (Live from igatebots.com CDN)

All images in src/data/siteData.js:
- logo: https://igatebots.com/assets/img/logo.png
- about: https://igatebots.com/assets/img/about.jpg
- productDesign: https://igatebots.com/assets/img/har.jpg
- electricCircuit: https://igatebots.com/assets/img/electric.jpg
- pcbDesign: https://igatebots.com/assets/img/des.jpg
- reverseEngineering: https://igatebots.com/assets/img/service/component-engineering.jpg
- clients: https://igatebots.com/assets/img/testimonial/1-4.jpg
- projects: https://igatebots.com/assets/img/project/single-project*.jpg

## Getting Started

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview production build
```

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PCBBackground.jsx
│   └── AnimatedSection.jsx
├── data/
│   └── siteData.js        # All content & image URLs
├── hooks/
│   └── useInView.js
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── ServiceDetail.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Deploy

The dist/ folder can be deployed to Vercel, Netlify, or any static host.

© 2024 iGateBots. All rights reserved.
