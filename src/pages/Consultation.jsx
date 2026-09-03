import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PCBBackground from '../components/PCBBackground';
import AnimatedSection from '../components/AnimatedSection';
import EngineeringTelemetryBar from '../components/EngineeringTelemetryBar';
import HardwareStackupInspector from '../components/HardwareStackupInspector';
import AdvisoryScopeCalculator from '../components/AdvisoryScopeCalculator';
import { COMPANY } from '../data/siteData';

const ADVISORY_DOMAINS = [
  {
    id: 'architecture',
    title: 'Hardware Architecture & Feasibility',
    tag: 'System Strategy',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.25 2.25L15 7.5" />
      </svg>
    ),
    description: 'System partitioning, MCU/SoC & FPGA selection, power tree budgeting, high-speed bus architectures, and trade-off analysis before silicon commit.',
    topics: ['MCU/SoC/FPGA Selection', 'Power Budget & PMIC Architecture', 'Sensor & Peripheral Interfaces', 'Technical Feasibility Audits', 'Form-Factor Constraints'],
  },
  {
    id: 'dfm',
    title: 'PCB Layout & DFM Optimization',
    tag: 'Manufacturability',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
    description: 'Stack-up optimization, high-density HDI design review, microvia reliability, panelization strategy, and Design for Manufacturing (DFM/DFA) validation to maximize factory yields.',
    topics: ['Controlled Impedance Stackup', 'HDI & Microvia Architecture', 'DFM / DFA Rule Check', 'Thermal Pad & Copper Balancing', 'High-Speed Differential Routing'],
  },
  {
    id: 'sipi',
    title: 'Signal & Power Integrity (SI / PI)',
    tag: 'Performance & EMC',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    description: 'Electromagnetic interference (EMI) mitigation, crosstalk elimination, power distribution network (PDN) impedance tuning, and high-frequency return path planning.',
    topics: ['PDN Impedance & Decoupling', 'EMI/EMC Pre-Compliance', 'Jitter & Eye Diagram Checks', 'Return Path Discontinuity Fixes', 'Switching Noise Suppression'],
  },
  {
    id: 'iot',
    title: 'IoT & Wireless Integration',
    tag: 'RF & Embedded',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.121a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12z" />
      </svg>
    ),
    description: 'Antenna matching networks, Bluetooth LE, Wi-Fi 6, LoRaWAN, cellular IoT connectivity, and ultra-low-power sleep architecture for battery-operated devices.',
    topics: ['Antenna Tuning & Matching', 'BLE / Wi-Fi / Cellular NB-IoT', 'Ultra-low-power Sleep Profiling', 'Mesh & Protocol Optimization', 'RF Coexistence Analysis'],
  },
  {
    id: 'bom',
    title: 'Component Sourcing & BOM Cost Reduction',
    tag: 'Supply Chain',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Eliminate single-source bottlenecks, replace end-of-life (EOL) components, and optimize Bill of Materials (BOM) cost by up to 40% without compromising performance.',
    topics: ['Drop-in Alternate Sourcing', 'EOL & Obsolescence Remediation', 'High-Volume Cost Engineering', 'Authorized Distributor Strategy', 'Lead Time Reduction'],
  },
  {
    id: 'troubleshooting',
    title: 'Hardware Debugging & Root Cause Analysis',
    tag: 'Diagnostic',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 0021 17.25l-5.83-5.83M3 13.5v-3a2.25 2.25 0 012.25-2.25h3.38a2.25 2.25 0 011.59.66l2.12 2.12m0 0l3 3m-3-3l-3 3" />
      </svg>
    ),
    description: 'Rapid diagnostic troubleshooting for bricked prototypes, intermittent reset anomalies, thermal hotspots, power rail droop, and unexpected latch-up conditions.',
    topics: ['Power Rail Transient Analysis', 'Intermittent Reset Debugging', 'Thermal Hotspot Identification', 'Signal Jitter & Ringing Root-Cause', 'Board Bring-Up Roadblocks'],
  },
];

function RoleBadgeIcon({ category, className = "w-4 h-4" }) {
  switch (category) {
    case 'hardware':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>
      );
    case 'embedded':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6v12A2.25 2.25 0 004.5 18.25z" />
        </svg>
      );
    case 'power-ev':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case 'testing-qa':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      );
    case 'manufacturing':
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
  }
}

// ── 12 ENGINEERING ROLES FOR PARTNER & CLIENT COMPANY VACANCIES ──────────────
export const PARTNER_VACANCIES = [
  {
    id: 'electronic-hardware-design-engineer',
    title: 'Electronic Hardware Design Engineer',
    rawTitle: 'Electronic Hardware Design Engineer',
    category: 'hardware',
    categoryLabel: 'Hardware & Circuit',
    experience: '3 - 7 Years',
    location: 'Bangalore / Chennai / Hybrid',
    type: 'Full-time • Partner Company Vacancy',
    openings: '4 Openings',
    description: 'Lead schematic capture, analog/digital circuit architecture, power tree budgeting, microcontroller/FPGA integration, and system board bring-up for Tier-1 electronic products.',
    skills: ['Schematic Capture', 'Analog & Digital Design', 'Altium / OrCAD', 'Power Tree Budgeting', 'Board Bring-Up', 'BOM Optimization'],
  },
  {
    id: 'pcb-design-engineer',
    title: 'PCB Design Engineer',
    rawTitle: 'PCB Design Engineer',
    category: 'hardware',
    categoryLabel: 'Hardware & Circuit',
    experience: '2 - 6 Years',
    location: 'Bangalore / Pune / On-site',
    type: 'Full-time • Partner Company Vacancy',
    openings: '5 Openings',
    description: 'Design multi-layer high-density interconnect (HDI) printed circuit boards, high-speed differential routing, controlled impedance stackups, and rigorous DFM/DFA checks.',
    skills: ['HDI Multi-Layer (6-16+ Layers)', 'Controlled Impedance', 'High-Speed DDR/PCIe', 'Altium Designer / Allegro', 'DFM / DFA Analysis', 'Gerber & ODB++'],
  },
  {
    id: 'embedded-hardware-engineer',
    title: 'Embedded Hardware Engineer',
    rawTitle: 'Embedded Hardware Engineer',
    category: 'embedded',
    categoryLabel: 'Embedded Systems',
    experience: '3 - 6 Years',
    location: 'Bangalore / Hyderabad / Hybrid',
    type: 'Full-time • Partner Company Vacancy',
    openings: '3 Openings',
    description: 'Architect embedded hardware solutions integrating ARM Cortex microcontrollers, wireless modules (BLE/Wi-Fi/LoRa), sensor suites, and high-reliability peripheral interfaces.',
    skills: ['ARM Cortex-M / SoC', 'SPI / I2C / UART / USB', 'Board-Level Debugging', 'Oscilloscopes & Logic Analyzers', 'Hardware-Software Co-design', 'Low Power Design'],
  },
  {
    id: 'component-engineering',
    title: 'Component & Obsolescence Engineer',
    rawTitle: 'Component & Obsolescence Engineer',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing & DFM',
    experience: '2 - 5 Years',
    location: 'Bangalore / Chennai / Hybrid',
    type: 'Full-time • Partner Company Vacancy',
    openings: '2 Openings',
    description: 'Manage electronic component qualification, lifecycle management, alternate sourcing strategies, second-source vetting, and end-of-life (EOL) obsolescence mitigation.',
    skills: ['Component Qualification', 'Lifecycle & EOL Management', 'SiliconExpert / IHS', 'Alternate Cross-referencing', 'Counterfeit Mitigation', 'Supply Chain Liaison'],
  },
  {
    id: 'hardware-validation-testing-engineer',
    title: 'Hardware Validation & Testing Engineer',
    rawTitle: 'Hardware Validation & Testing Engineer',
    category: 'testing-qa',
    categoryLabel: 'Validation & Testing',
    experience: '2 - 5 Years',
    location: 'Bangalore / On-site Lab',
    type: 'Full-time • Partner Company Vacancy',
    openings: '3 Openings',
    description: 'Develop and execute Design Verification Testing (DVT/EVT) protocols, signal integrity validation, power rail ripple analysis, and pre-compliance electromagnetic compatibility testing.',
    skills: ['DVT & EVT Test Protocols', 'High-Bandwidth Scopes', 'Signal & Power Integrity', 'Automated Python Test Scripts', 'Thermal Profiling', 'Pre-Compliance EMC'],
  },
  {
    id: 'power-electronics-engineer',
    title: 'Power Electronics Engineer',
    rawTitle: 'Power Electronics Engineer',
    category: 'power-ev',
    categoryLabel: 'Power & Automotive / EV',
    experience: '4 - 8 Years',
    location: 'Bangalore / Coimbatore / On-site',
    type: 'Full-time • Partner Company Vacancy',
    openings: '3 Openings',
    description: 'Design high-efficiency SMPS converters, DC-DC buck/boost regulators, GaN/SiC power switching stages, magnetics design, and active thermal management.',
    skills: ['SMPS / DC-DC Converters', 'GaN & SiC Switching', 'Magnetics Design', 'Thermal Dissipation', 'LTspice / PLECS', 'High Voltage Safety'],
  },
  {
    id: 'automotive-electronics-engineer',
    title: 'Automotive Electronics Engineer',
    rawTitle: 'Automotive Electronics Engineer',
    category: 'power-ev',
    categoryLabel: 'Power & Automotive / EV',
    experience: '3 - 7 Years',
    location: 'Pune / Bangalore / Chennai',
    type: 'Full-time • Partner Company Vacancy',
    openings: '4 Openings',
    description: 'Design automotive electronic control units (ECUs) compliant with ISO 26262 functional safety, ISO 7637 transient protection, and CAN-FD/LIN communication buses.',
    skills: ['Automotive ECUs', 'ISO 26262 (ASIL B/D)', 'CAN / LIN / Automotive Ethernet', 'ISO 7637 Transient Protection', 'AEC-Q Qualified Components', 'Vector CANoe'],
  },
  {
    id: 'ev-electronics-engineer',
    title: 'EV Electronics Engineer (BMS & Powertrain)',
    rawTitle: 'EV Electronics Engineer (BMS & Powertrain)',
    category: 'power-ev',
    categoryLabel: 'Power & Automotive / EV',
    experience: '3 - 8 Years',
    location: 'Bangalore / Pune / Hybrid',
    type: 'Full-time • Partner Company Vacancy',
    openings: '3 Openings',
    description: 'Develop Battery Management Systems (BMS), high-voltage isolation, cell balancing circuitry, onboard chargers (OBC), and motor drive interfaces for electric vehicle applications.',
    skills: ['BMS Architecture', 'Cell Monitoring & Balancing ICs', 'High-Voltage Isolation', 'On-Board Chargers (OBC)', 'Motor Controller Interfaces', 'Thermal Runway Safety'],
  },
  {
    id: 'embedded-systems-engineer',
    title: 'Embedded Systems & Firmware Engineer',
    rawTitle: 'Embedded Systems & Firmware Engineer',
    category: 'embedded',
    categoryLabel: 'Embedded Systems',
    experience: '2 - 6 Years',
    location: 'Bangalore / Trivandrum / Hybrid',
    type: 'Full-time • Partner Company Vacancy',
    openings: '5 Openings',
    description: 'Develop robust bare-metal and RTOS firmware, board support packages (BSP), hardware abstraction layers (HAL), device drivers, and connectivity protocol stacks.',
    skills: ['FreeRTOS / Bare-Metal C/C++', 'STM32 / ESP32 / NXP', 'Device Driver Development', 'HAL & BSP Development', 'BLE / Wi-Fi / Zigbee', 'JTAG / SWD Debugging'],
  },
  {
    id: 'electronics-manufacturing-production-engineer',
    title: 'Electronics Manufacturing & SMT Engineer',
    rawTitle: 'Electronics Manufacturing & SMT Engineer',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing & DFM',
    experience: '3 - 7 Years',
    location: 'Bangalore / Sriperumbudur / On-site',
    type: 'Full-time • Partner Company Vacancy',
    openings: '2 Openings',
    description: 'Supervise automated SMT lines, reflow oven profiling, wave soldering setups, stencil thickness design, optical inspection (AOI), and EMS contract manufacturer quality.',
    skills: ['SMT Line Optimization', 'Reflow Thermal Profiling', 'AOI & X-Ray Inspection', 'IPC-A-610 Workmanship', 'EMS Liaison & Audits', 'Yield Root-Cause Analysis'],
  },
  {
    id: 'dfm-dft-engineer',
    title: 'DFM / DFT Quality Engineer',
    rawTitle: 'DFM / DFT Quality Engineer',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing & DFM',
    experience: '3 - 6 Years',
    location: 'Bangalore / Chennai / Hybrid',
    type: 'Full-time • Partner Company Vacancy',
    openings: '2 Openings',
    description: 'Ensure circuit and PCB designs adhere strictly to Design for Manufacturing (DFM) and Design for Testability (DFT), optimizing ICT probe points and panelization yields.',
    skills: ['Valor / Genesis DFM Tools', 'In-Circuit Test (ICT) Testpoints', 'Flying Probe & Bed-of-Nails', 'Panelization & Breakaways', 'FMEA Analysis', 'Solder Mask & Pad Annular Ring Checks'],
  },
  {
    id: 'reliability-testing-engineer',
    title: 'Reliability & Environmental Testing Engineer',
    rawTitle: 'Reliability & Environmental Testing Engineer',
    category: 'testing-qa',
    categoryLabel: 'Validation & Testing',
    experience: '3 - 7 Years',
    location: 'Bangalore / Pune / On-site Lab',
    type: 'Full-time • Partner Company Vacancy',
    openings: '3 Openings',
    description: 'Perform accelerated life testing (HALT/HASS), thermal shock cycling, mechanical vibration & drop testing, MTBF calculations, and physical root-cause failure analysis.',
    skills: ['HALT / HASS Screening', 'Thermal Shock & Cycling', 'Vibration & Drop Testing', 'MIL-STD-810 & IEC 60068', 'MTBF & FIT Rate Calculation', 'SEM / Cross-Section Failure Analysis'],
  },
];

const VACANCY_CATEGORIES = [
  { id: 'all', label: 'All Openings', count: PARTNER_VACANCIES.length },
  { id: 'hardware', label: 'Hardware & Circuit', count: 2 },
  { id: 'embedded', label: 'Embedded Systems', count: 2 },
  { id: 'power-ev', label: 'Power & Automotive / EV', count: 3 },
  { id: 'testing-qa', label: 'Validation & Testing', count: 2 },
  { id: 'manufacturing', label: 'Manufacturing & DFM', count: 3 },
];

const PACKAGES = [
  {
    id: 'diagnostic',
    name: 'Discovery & Quick Diagnostic',
    badge: 'Popular for Scoping',
    duration: '30 Minutes',
    price: 'Free Initial Assessment',
    description: 'Ideal for initial feasibility screening, high-level project roadmap guidance, and reviewing high-level block diagrams.',
    features: [
      '1-on-1 Session with Senior Hardware Architect',
      'High-Level Architecture & Feasibility Review',
      'Mutual NDA Prior to Technical Review',
      'Preliminary Project Cost & Timeline Estimate',
      'Actionable Next-Step Recommendations',
    ],
    highlight: false,
  },
  {
    id: 'audit',
    name: 'Deep-Dive Architecture & DFM Audit',
    badge: 'Most Comprehensive',
    duration: '2-Hour Intensive + Written Report',
    price: 'Fixed-Price Technical Sprint',
    description: 'Full schematic, layout, stackup, and component audit designed to prevent expensive re-spins and factory delays.',
    features: [
      'Line-by-Line Schematic & Pinout Inspection',
      'Gerber & PCB Stackup DFM / DFA Audit',
      'Component Sourcing & Obsolescence Screening',
      'EMI/EMC & Signal Integrity Risk Analysis',
      'Comprehensive Written Report with Annotated CAD Fixes',
      '14-Day Post-Session Email Support',
    ],
    highlight: true,
  },
  {
    id: 'retainer',
    name: 'Dedicated Hardware Advisory Retainer',
    badge: 'For Fast-Growing Teams',
    duration: 'Monthly Ongoing Support',
    price: 'Custom Engineering Retainer',
    description: 'Embed senior hardware and PCB engineering capacity into your design cycle without full-time hiring overhead.',
    features: [
      'Direct Slack / Teams Channel with Our Lead Engineers',
      'Continuous Design Review at Every Milestone',
      'Prototype Bring-Up & Lab Debugging Support',
      'Factory & Assembly Liaison Assistance',
      'Priority SLA Turnaround for Rapid Schematic Reviews',
    ],
    highlight: false,
  },
];

const FAQS = [
  {
    q: 'Why does iGatebots hire for other partner companies and vacancies?',
    a: 'Beyond technical advisory, iGatebots operates a specialized engineering staffing and talent placement consultancy. Because our leadership consists of senior hardware and embedded architects, we have the technical depth to evaluate, screen, and match top-tier electronic talent for partner companies, Tier-1 electronics OEMs, and automotive innovators who need vetted engineers without hiring delays.',
  },
  {
    q: 'Are the 12 engineering vacancies full-time direct roles or contract placements?',
    a: 'We offer both direct full-time placements with our partner companies as well as specialized contract-to-hire arrangements, depending on the client’s project milestones and organization structure. Every candidate is technically vetted by our senior engineering team before referral.',
  },
  {
    q: 'Do you execute a Non-Disclosure Agreement (NDA) before we discuss details?',
    a: 'Absolutely. We treat all client intellectual property with the highest confidentiality. We provide our standard mutual NDA or can review and sign your company’s standard NDA before any proprietary files or specifications are shared.',
  },
  {
    q: 'What files or data should we prepare for a technical consultation?',
    a: 'Depending on the depth of the consultation, helpful materials include block diagrams, schematic PDFs, ECAD files (Altium, KiCad, Eagle, OrCAD), PCB Gerbers/ODB++, BOM lists, and any errata logs or test oscilloscope captures if debugging an issue.',
  },
  {
    q: 'Which CAD and EDA tools does iGatebots support?',
    a: 'Our engineering team is fluent across all industry-standard EDA packages including Altium Designer, KiCad, Autodesk Eagle, Cadence OrCAD/Allegro, and Mentor Graphics PADS.',
  },
  {
    q: 'Can companies submit custom staffing requirements for other niche hardware roles?',
    a: 'Yes. If your company requires hardware engineers with specific domain experience (e.g., medical device electronics, aerospace avionics, radar/RF design), you can use our Company Staffing form or call our technical desk directly to discuss dedicated talent sourcing.',
  },
];

export default function Consultation() {
  const [selectedDomain, setSelectedDomain] = useState(ADVISORY_DOMAINS[0].id);
  const [activeFaq, setActiveFaq] = useState(null);

  // Vacancies Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkillTag, setSelectedSkillTag] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChecklistId, setExpandedChecklistId] = useState(null);

  // Interactive Application / Staffing Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('candidate'); // 'candidate' | 'company'
  const [activeVacancyForModal, setActiveVacancyForModal] = useState(PARTNER_VACANCIES[0]);
  const [appTicketId, setAppTicketId] = useState('IGB-APP-7824');

  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    roleId: PARTNER_VACANCIES[0].id,
    experience: '3-5 Years',
    location: '',
    noticePeriod: 'Immediate to 15 Days',
    portfolioUrl: '',
    notes: '',
  });

  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    roleId: PARTNER_VACANCIES[0].id,
    positionsNeeded: '1-2 Engineers',
    timeline: 'Immediate (Within 2-4 weeks)',
    requirements: '',
  });

  const [modalSubmitStatus, setModalSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  // Booking Form State
  const [bookingTier, setBookingTier] = useState('audit');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    domain: 'architecture',
    urgency: 'Standard (Next few days)',
    projectStage: 'Prototype in development',
    notes: '',
    ndaRequired: true,
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  useEffect(() => {
    document.title = 'Engineering Consultancy & Staffing | iGatebots';
    window.scrollTo(0, 0);
  }, []);

  // Filtered vacancies list with multi-criteria support
  const filteredVacancies = PARTNER_VACANCIES.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesQuery =
      !searchQuery ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkillTag =
      selectedSkillTag === 'All' ||
      v.skills.some((s) => s.toLowerCase().includes(selectedSkillTag.toLowerCase())) ||
      v.title.toLowerCase().includes(selectedSkillTag.toLowerCase());
    const matchesExp =
      selectedExperience === 'all' ||
      (selectedExperience === '1-3' && (v.experience.includes('1') || v.experience.includes('2') || v.experience.includes('3'))) ||
      (selectedExperience === '3-5' && (v.experience.includes('3') || v.experience.includes('4') || v.experience.includes('5'))) ||
      (selectedExperience === '5+' && (v.experience.includes('5') || v.experience.includes('6') || v.experience.includes('7') || v.experience.includes('8') || v.experience.includes('Lead')));

    return matchesCategory && matchesQuery && matchesSkillTag && matchesExp;
  });

  const handleOpenApplyModal = (vacancy, mode = 'candidate') => {
    setActiveVacancyForModal(vacancy);
    setApplicantForm((prev) => ({ ...prev, roleId: vacancy.id }));
    setCompanyForm((prev) => ({ ...prev, roleId: vacancy.id }));
    setModalMode(mode);
    setModalSubmitStatus('idle');
    setModalOpen(true);
  };

  const handleApplicantSubmit = (e) => {
    e.preventDefault();
    setModalSubmitStatus('submitting');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setAppTicketId(`IGB-ENG-${randomCode}`);
    setTimeout(() => {
      setModalSubmitStatus('success');
    }, 1200);
  };

  const handleApplyScope = (scope) => {
    if (scope.domain) setFormData((prev) => ({ ...prev, domain: scope.domain }));
    if (scope.tier) setBookingTier(scope.tier);
    if (scope.urgencyText) setFormData((prev) => ({ ...prev, urgency: scope.urgencyText }));
    if (scope.notes) setFormData((prev) => ({ ...prev, notes: scope.notes }));
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    setModalSubmitStatus('submitting');
    setTimeout(() => {
      setModalSubmitStatus('success');
    }, 1200);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
    }, 1200);
  };

  const activeDomainData = ADVISORY_DOMAINS.find((d) => d.id === selectedDomain);

  return (
    <>
      {/* ── HERO SECTION ────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <PCBBackground />

        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 35%, rgba(26,108,255,0.15) 0%, rgba(0,200,255,0.05) 50%, transparent 80%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            {/* Top Announcement Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-dark-850/90 border border-white/10 rounded-xl text-xs font-mono text-slate-300 mb-8 backdrop-blur-md">
              <span className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Technical Advisory Desk
              </span>
              <span className="text-white/20">|</span>
              <a href="#partner-vacancies" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                <span>12 Partner Engineering Openings</span>
                <span className="text-primary-400 font-bold">&darr;</span>
              </a>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-[1.12]">
              Expert Hardware Consulting & <span className="gradient-text">Engineering Staffing</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed font-body">
              Prevent costly PCB re-spins, validate high-speed architectures, optimize bill-of-materials, and staff specialized electronic engineering talent through our engineering advisory and partner company placement network.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
              <a
                href="#partner-vacancies"
                className="btn-primary"
              >
                <span>View 12 Partner Vacancies</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
              <a
                href="#book-consultation"
                className="btn-outline"
              >
                Schedule Technical Advisory
              </a>
              <a
                href="#advisory-domains"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Advisory Domains &rarr;
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-white/[0.08]">
              {[
                { label: 'Hardware Audits Delivered', value: '150+' },
                { label: 'First-Pass Layout Success', value: '99.2%' },
                { label: 'Active Partner Roles', value: '12 Roles' },
                { label: 'IP & Design Confidentiality', value: '100% NDA' },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-dark-850/70 border border-white/[0.07] rounded-xl text-left hover:border-white/15 transition-all">
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-slate-400 text-xs font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── LIVE ENGINEERING LAB TELEMETRY RIBBON ─────────────────────────────── */}
      <EngineeringTelemetryBar />

      {/* ── 12 OPEN ROLES: HIRING FOR PARTNER & CLIENT COMPANIES ────────────────── */}
      <section id="partner-vacancies" className="py-24 bg-dark-900/90 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-slate-300 text-xs font-mono tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Talent Placement & Staffing
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Hiring for <span className="gradient-text">Partner Company Vacancies</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg font-body leading-relaxed">
              As an electronics engineering consultancy, iGatebots technically evaluates and matches qualified engineering specialists with our partner companies, Tier-1 OEMs, and high-growth hardware ventures.
            </p>
          </AnimatedSection>

          {/* Search & Filter Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {VACANCY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20 border border-primary-500'
                        : 'bg-dark-850/80 border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat.label}
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] ${
                        selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {cat.id === 'all'
                        ? PARTNER_VACANCIES.length
                        : PARTNER_VACANCIES.filter((v) => v.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Controls: Experience & Search */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                {/* Experience Dropdown */}
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-primary-400"
                >
                  <option value="all">All Experience</option>
                  <option value="1-3">1 - 3 Years</option>
                  <option value="3-5">3 - 5 Years</option>
                  <option value="5+">5+ Years (Lead / Senior)</option>
                </select>

                {/* Keyword Search */}
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Search skills, tools, roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-dark-850 border border-white/10 rounded-xl pl-9 pr-7 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary-400 transition-all font-body"
                  />
                  <svg
                    className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Skill / Toolchain Chips Row */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
              <span className="text-[11px] font-mono text-slate-400 mr-1.5 uppercase">Quick Tool Filter:</span>
              {[
                'All',
                'Altium',
                'KiCad',
                'STM32',
                'CAN-FD',
                'High-Speed',
                'BLE',
                'BMS',
                'DFM',
              ].map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => setSelectedSkillTag(tool)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                    selectedSkillTag === tool
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40'
                      : 'bg-dark-900/80 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tool}
                </button>
              ))}

              {(selectedCategory !== 'all' || selectedSkillTag !== 'All' || selectedExperience !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSkillTag('All');
                    setSelectedExperience('all');
                    setSearchQuery('');
                  }}
                  className="ml-auto text-[11px] font-mono text-slate-400 hover:text-primary-400 underline transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono">
            <span>
              Displaying {filteredVacancies.length} of {PARTNER_VACANCIES.length} verified partner openings
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Pre-Screening Live in Bangalore Lab
            </span>
          </div>

          {/* 12 Vacancies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredVacancies.map((vacancy) => (
              <AnimatedSection key={vacancy.id}>
                <div className="bg-dark-850/70 border border-white/[0.08] rounded-2xl p-6 h-full flex flex-col justify-between hover:border-primary-500/40 hover:bg-dark-850 hover:shadow-xl transition-all duration-300 group">
                  <div>
                    {/* Top Row: Tag & Openings */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/10 text-slate-300 rounded-lg text-xs font-mono">
                        <RoleBadgeIcon category={vacancy.category} className="w-3.5 h-3.5 text-primary-400" />
                        <span>{vacancy.categoryLabel}</span>
                      </div>
                      <span className="text-[11px] font-mono text-primary-300 px-2 py-0.5 bg-primary-500/10 rounded-md border border-primary-500/20">
                        {vacancy.openings}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="font-display text-lg font-bold text-white mb-2.5 group-hover:text-primary-300 transition-colors">
                      {vacancy.title}
                    </h3>

                    {/* Meta info tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-body text-slate-400">
                      <span className="inline-flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5 font-mono">
                        <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {vacancy.experience}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                        <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {vacancy.location}
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-body">
                      {vacancy.description}
                    </p>

                    {/* Technical Screening Focus Expandable */}
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedChecklistId(expandedChecklistId === vacancy.id ? null : vacancy.id)
                        }
                        className="w-full text-left py-1.5 px-2.5 bg-dark-900/60 hover:bg-dark-900 border border-white/5 rounded-lg text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                          Evaluation & Interview Criteria
                        </span>
                        <span className="text-[10px] text-primary-400">
                          {expandedChecklistId === vacancy.id ? 'Hide ▲' : 'Inspect ▼'}
                        </span>
                      </button>

                      {expandedChecklistId === vacancy.id && (
                        <div className="mt-2 p-3 bg-dark-900/90 rounded-lg border border-white/10 text-[11px] font-mono space-y-1.5 text-slate-300 animate-fadeIn">
                          <div className="flex items-start gap-1.5 text-primary-300">
                            <span className="text-primary-400 font-bold shrink-0">1.</span>
                            <span>CAD Review: Schematic structure, DRC rules & footprint IPC compliance.</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-slate-300">
                            <span className="text-primary-400 font-bold shrink-0">2.</span>
                            <span>Lab Bringup: Oscilloscope serial bus decoding & hardware troubleshooting.</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-emerald-400">
                            <span className="text-emerald-400 font-bold shrink-0">3.</span>
                            <span>Direct Referral: High-priority interview slot with partner engineering leadership.</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Required Skills Chips */}
                    <div className="space-y-1.5 mb-5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Core Competencies:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {vacancy.skills.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => setSearchQuery(skill)}
                            className="text-[11px] font-mono bg-dark-900/90 hover:bg-primary-500/20 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-white/[0.06] transition-colors"
                            title={`Filter by ${skill}`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenApplyModal(vacancy, 'candidate')}
                      className="flex-1 py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white text-xs font-body font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                    >
                      Apply for Role
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleOpenApplyModal(vacancy, 'company')}
                      className="py-2.5 px-3 border border-white/15 hover:border-white/30 hover:bg-white/[0.04] text-slate-300 hover:text-white text-xs font-body rounded-xl transition-all"
                      title="Hire engineers for this role at your company"
                    >
                      Hire Talent
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Employer Staffing Banner */}
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden bg-dark-850 border border-white/10 p-8 sm:p-10 shadow-xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="max-w-2xl text-center lg:text-left">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-primary-400 tracking-wider mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                      For Employers & Hardware Engineering Teams
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                      Need Dedicated Electronic Engineers for Your In-House Team?
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body">
                      Avoid mis-hires and shorten time-to-hire. iGatebots conducts comprehensive technical screening led by senior hardware and embedded architects to place vetted engineers directly with your organization.
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleOpenApplyModal(PARTNER_VACANCIES[0], 'company')}
                      className="btn-primary text-center"
                    >
                      Request Staffing Call
                    </button>
                    <a
                      href={`mailto:${COMPANY.email}?subject=Partner%20Company%20Engineering%20Staffing%20Inquiry`}
                      className="btn-outline text-center"
                    >
                      Email Staffing Desk
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
        </div>
      </section>

      {/* ── ADVISORY FOCUS DOMAINS ──────────────────────────────────────────────── */}
      <section id="advisory-domains" className="py-24 bg-dark-900/60 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-slate-300 text-xs font-mono tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Specialized Guidance
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Core Technical <span className="gradient-text">Advisory Domains</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base font-body">
              Whether you require upfront architecture review, high-density stackup optimization, or root-cause bench debugging, we provide actionable engineering solutions.
            </p>
          </AnimatedSection>

          {/* Interactive domain matrix */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {ADVISORY_DOMAINS.map((domain) => {
              const isSelected = domain.id === selectedDomain;
              return (
                <div
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`cursor-pointer rounded-2xl p-7 transition-all duration-200 relative border ${
                    isSelected
                      ? 'bg-dark-850 border-primary-500/60 shadow-lg'
                      : 'bg-dark-850/60 border-white/[0.07] hover:border-white/20 hover:bg-dark-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-primary-600 text-white'
                          : 'bg-white/[0.04] text-primary-400 border border-white/10'
                      }`}
                    >
                      {domain.icon}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-300 px-2.5 py-1 bg-white/[0.04] rounded-md border border-white/10">
                      {domain.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2">{domain.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-body">{domain.description}</p>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    {domain.topics.map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                        <span className="text-slate-300 text-xs font-body">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Domain Spotlight banner */}
          {activeDomainData && (
            <AnimatedSection>
              <div className="bg-dark-850 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                <div>
                  <span className="text-xs font-mono uppercase text-primary-400 tracking-wider">Ready for review</span>
                  <h4 className="font-display text-2xl font-bold text-white mt-1">{activeDomainData.title}</h4>
                  <p className="text-slate-400 text-sm max-w-2xl mt-1 font-body">
                    Schedule an advisory sprint tailored to your project's specific {activeDomainData.title.toLowerCase()} requirements.
                  </p>
                </div>
                <a
                  href="#book-consultation"
                  onClick={() => setFormData((p) => ({ ...p, domain: activeDomainData.id }))}
                  className="btn-primary shrink-0"
                >
                  Book Session on This Domain &rarr;
                </a>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── INTERACTIVE HARDWARE STACKUP & DFM LAB INSPECTOR ─────────────────────── */}
      <section className="py-20 bg-dark-900/60 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <HardwareStackupInspector />
          </AnimatedSection>
        </div>
      </section>

      {/* ── PACKAGES & TIERS ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-slate-300 text-xs font-mono tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Engagement Formats
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Flexible <span className="gradient-text">Advisory Formats</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base font-body">
              Select an engagement model that matches your project velocity and engineering scope.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => {
              const isAudit = pkg.highlight;
              return (
                <AnimatedSection key={pkg.id}>
                  <div
                    className={`rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-200 relative ${
                      isAudit
                        ? 'bg-dark-850 border-2 border-primary-500 shadow-2xl md:-translate-y-2'
                        : 'bg-dark-850/60 border border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {isAudit && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-primary-600 text-white text-[11px] font-mono font-bold rounded-full uppercase tracking-wider shadow-md">
                        Recommended
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-mono uppercase text-primary-300 px-2.5 py-1 bg-primary-500/10 rounded-md border border-primary-500/20">
                          {pkg.badge}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{pkg.duration}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                      <p className="text-primary-400 font-mono font-bold text-base mb-4">{pkg.price}</p>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8 font-body">{pkg.description}</p>

                      <div className="space-y-3 mb-8">
                        <p className="text-xs font-mono uppercase text-slate-400 tracking-wider">What’s Included:</p>
                        {pkg.features.map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <div className="w-4 h-4 rounded-md bg-primary-500/15 flex items-center justify-center text-primary-400 shrink-0 mt-0.5 border border-primary-500/20">
                              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-slate-300 text-sm font-body leading-snug">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#book-consultation"
                      onClick={() => setBookingTier(pkg.id)}
                      className={`w-full py-3 rounded-xl text-sm font-body font-semibold flex items-center justify-center gap-2 transition-all ${
                        isAudit
                          ? 'btn-primary'
                          : 'btn-outline'
                      }`}
                    >
                      Choose {pkg.name.split(' ')[0]}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4-STEP CONSULTATION ROADMAP ─────────────────────────────────────────── */}
      <section className="py-24 bg-dark-800/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              How It Works
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              The Consultation <span className="gradient-text">Process</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base font-body">
              Structured, efficient, and oriented toward concrete engineering deliverables.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Intake & Mutual NDA',
                desc: 'We execute our mutual NDA and receive your project background, requirements, block diagrams, or CAD files via secure channel.',
              },
              {
                step: '02',
                title: 'Pre-Session Technical Audit',
                desc: 'Our lead engineers inspect schematics, datasheets, PCB stackups, and component availability prior to the live meeting.',
              },
              {
                step: '03',
                title: 'Interactive Live Advisory',
                desc: 'A focused video session with screen-share walkthrough, real-time CAD annotations, and direct Q&A addressing your bottleneck.',
              },
              {
                step: '04',
                title: 'Actionable Report & Next Steps',
                desc: 'Receive a written summary report detailing exact fixes, component part numbers, stackup tables, and next milestone roadmap.',
              },
            ].map((p, i) => (
              <AnimatedSection key={p.step} delay={i * 80}>
                <div className="bg-dark-800/80 border border-white/8 rounded-2xl p-6 h-full flex flex-col justify-between hover:border-primary-500/30 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center font-display font-bold text-primary-400 text-lg mb-6">
                      {p.step}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed font-body">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE ADVISORY SCOPING CALCULATOR ──────────────────────────── */}
      <section className="py-20 bg-dark-900/80 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <AdvisoryScopeCalculator onApplyScope={handleApplyScope} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── INTERACTIVE CONSULTATION BOOKING WIZARD ──────────────────────────────── */}
      <section id="book-consultation" className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-slate-300 text-xs font-mono tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Direct Engineering Access
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Schedule Your <span className="gradient-text">Technical Advisory Session</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base font-body">
              Submit your engineering parameters below. Our hardware leadership will review the scope and confirm your session within 24 hours.
            </p>
          </AnimatedSection>

          <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl relative">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-sm">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Consultation Request Confirmed</h3>
                <p className="text-slate-300 text-base max-w-lg mx-auto font-body mb-6">
                  Thank you, <span className="text-white font-semibold">{formData.name || 'there'}</span>. A lead hardware architect has been assigned to inspect your inquiry for the <span className="text-primary-400 font-medium">{formData.domain}</span> domain.
                </p>

                <div className="bg-dark-900 border border-white/10 rounded-xl p-6 max-w-md mx-auto text-left mb-8 space-y-2.5">
                  <p className="text-xs font-mono uppercase text-slate-400">Next Steps Checklist:</p>
                  <div className="flex items-center gap-2.5 text-slate-300 text-xs sm:text-sm font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                    <span>Mutual NDA dispatched to <span className="text-white font-medium">{formData.email}</span>.</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300 text-xs sm:text-sm font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                    <span>Direct calendar invite with lead hardware architect.</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300 text-xs sm:text-sm font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                    <span>Encrypted file transfer link for CAD/Gerber/BOM datasets.</span>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="btn-primary"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Select Format */}
                <div>
                  <label className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-3">
                    1. Select Advisory Engagement Format
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setBookingTier(pkg.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          bookingTier === pkg.id
                            ? 'bg-primary-600/10 border-primary-500 text-white shadow-sm'
                            : 'bg-dark-900/60 border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <p className="font-display font-bold text-sm text-white mb-1">{pkg.name.split('&')[0]}</p>
                        <p className="text-xs text-primary-400 font-mono">{pkg.duration}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Area of Focus */}
                <div>
                  <label className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-3">
                    2. Primary Technical Focus
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ADVISORY_DOMAINS.map((domain) => (
                      <button
                        key={domain.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, domain: domain.id }))}
                        className={`text-left p-3.5 rounded-xl border text-xs font-body transition-all ${
                          formData.domain === domain.id
                            ? 'bg-primary-600/15 border-primary-500 text-white font-medium'
                            : 'bg-dark-900/60 border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {domain.title}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, domain: 'staffing-vacancies' }))}
                      className={`text-left p-3.5 rounded-xl border text-xs font-body transition-all ${
                        formData.domain === 'staffing-vacancies'
                          ? 'bg-primary-600/15 border-primary-500 text-white font-medium'
                          : 'bg-dark-900/60 border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      Engineering Talent & Staffing
                    </button>
                  </div>
                </div>

                {/* Step 3: Contact & Project Parameters */}
                <div className="space-y-4">
                  <label className="text-slate-400 text-xs font-mono uppercase tracking-wider block">
                    3. Contact & Project Parameters
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Work Email Address *"
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company / Organization Name"
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone / WhatsApp Number"
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 text-xs font-body mb-1 block">Project Stage / Inquiry Scope</label>
                      <select
                        name="projectStage"
                        value={formData.projectStage}
                        onChange={handleInputChange}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-400 font-body"
                      >
                        <option value="Concept / Ideation">Concept / System Architecture</option>
                        <option value="Schematic in progress">Schematic & Component Selection</option>
                        <option value="PCB layout review ready">PCB Layout & DFM Review Ready</option>
                        <option value="Prototype bring-up failure / debugging">Prototype Bring-Up Debugging</option>
                        <option value="Preparing for high-volume production">Preparing for Mass Production</option>
                        <option value="Hiring / Staffing Requisition">Partner Company Staffing Need</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 text-xs font-body mb-1 block">Urgency Timeline</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-400 font-body"
                      >
                        <option value="Standard (Next few days)">Standard (Within 2-3 business days)</option>
                        <option value="Urgent (Within 24-48 hours)">Priority (Within 24-48 hours)</option>
                        <option value="Critical (Emergency bring-up support)">Critical (Emergency Lab Bring-up)</option>
                        <option value="Planning for next quarter">Roadmap (Future Project Milestone)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your hardware challenge, target MCU/ICs, or specific engineering profile required..."
                      className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="ndaRequired"
                      name="ndaRequired"
                      checked={formData.ndaRequired}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-white/20 bg-dark-900 text-primary-500 focus:ring-primary-400"
                    />
                    <label htmlFor="ndaRequired" className="text-slate-400 text-xs font-body cursor-pointer">
                      Please execute a Mutual Non-Disclosure Agreement (NDA) prior to technical file transfer.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="btn-primary w-full py-3.5 text-base tracking-wide"
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Confirming Request...
                    </>
                  ) : (
                    <>
                      <span>Schedule Engineering Advisory Session</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ────────────────────────────────────────── */}
      <section className="py-24 bg-dark-800/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-body tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Common Questions
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Consultation & Hiring <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base font-body">
              Everything you need to know about preparing for technical advisory and partner company vacancies.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <AnimatedSection key={idx} delay={idx * 50}>
                  <div
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? 'bg-dark-800/90 border-primary-500/40 shadow-lg shadow-primary-500/5'
                        : 'bg-dark-800/50 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                    >
                      <span className="font-display font-semibold text-white text-base sm:text-lg">{faq.q}</span>
                      <div
                        className={`w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 bg-primary-500 text-white' : ''
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-1 text-white/50 text-sm leading-relaxed font-body border-t border-white/5">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY DIRECT HOTLINE CTA ─────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26,108,255,0.15) 0%, rgba(0,200,255,0.08) 100%)' }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Need Immediate Hardware Support or Staffing Consultation?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-8 font-body">
              Facing an urgent prototype failure or need to hire vetted electronics engineers immediately? Call our engineering desk directly or email our priority queue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white font-body font-semibold rounded-full text-sm tracking-wide transition-all shadow-lg shadow-primary-500/25 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}?subject=Urgent%20Engineering%20Consultation%20Inquiry`}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-body font-medium rounded-full text-sm transition-all hover:bg-white/5"
              >
                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {COMPANY.email}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── INTERACTIVE DUAL-MODE MODAL: CANDIDATE APPLY / COMPANY HIRE ─────────── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-dark-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all"
              >
                &times;
              </button>

              {/* Modal Header */}
              <div className="mb-6 pb-5 border-b border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-md text-slate-300 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Partner Company Vacancy Portal
                  </span>
                  <span className="text-xs font-mono text-primary-300 px-2.5 py-0.5 bg-primary-500/10 border border-primary-500/20 rounded-md">
                    {activeVacancyForModal?.openings || 'Active Vacancy'}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeVacancyForModal?.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-slate-400 text-xs font-body mt-2">
                  <span className="flex items-center gap-1.5 bg-dark-900/80 px-2.5 py-1 rounded-md border border-white/5">
                    <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {activeVacancyForModal?.location}
                  </span>
                  <span className="flex items-center gap-1.5 bg-dark-900/80 px-2.5 py-1 rounded-md border border-white/5">
                    <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activeVacancyForModal?.experience}
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Vetted by iGatebots Lead Engineers
                  </span>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex rounded-xl bg-dark-900 p-1 mb-6 border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('candidate');
                    setModalSubmitStatus('idle');
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-body font-medium transition-all ${
                    modalMode === 'candidate'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Candidate Application
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('company');
                    setModalSubmitStatus('idle');
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-body font-medium transition-all ${
                    modalMode === 'company'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Company Staffing Request
                </button>
              </div>

              {/* Modal Body */}
              {modalSubmitStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-mono text-xs mb-3">
                    VERIFICATION TICKET: {appTicketId}
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white mb-2">
                    {modalMode === 'candidate' ? 'Application Logged in Technical Portal' : 'Staffing Requisition Received'}
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 font-body leading-relaxed">
                    {modalMode === 'candidate'
                      ? 'Your technical profile has been assigned to our Bangalore screening desk. A senior engineering lead will review your portfolio and reach out regarding interview scheduling.'
                      : 'Thank you for submitting your staffing requisition. Our talent acquisition team will review your target specifications and contact you within 24 hours.'}
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="btn-primary"
                  >
                    Close Window
                  </button>
                </div>
              ) : modalMode === 'candidate' ? (
                /* Candidate Form */
                <form onSubmit={handleApplicantSubmit} className="space-y-4">
                  {/* Role Selection */}
                  <div>
                    <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                      Target Engineering Vacancy <span className="text-primary-400">*</span>
                    </label>
                    <select
                      value={applicantForm.roleId}
                      onChange={(e) => {
                        const target = PARTNER_VACANCIES.find((v) => v.id === e.target.value);
                        if (target) {
                          setActiveVacancyForModal(target);
                          setApplicantForm((p) => ({ ...p, roleId: target.id }));
                        }
                      }}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 cursor-pointer"
                    >
                      {PARTNER_VACANCIES.map((r) => (
                        <option
                          key={r.id}
                          value={r.id}
                          className="bg-dark-900 text-white py-2"
                        >
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Full Name <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arun Kumar"
                        value={applicantForm.name}
                        onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Email Address <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. arun.kumar@gmail.com"
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                  </div>

                  {/* Phone & Experience */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Phone / WhatsApp Number <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={applicantForm.phone}
                        onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Experience Level <span className="text-primary-400">*</span>
                      </label>
                      <select
                        value={applicantForm.experience}
                        onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 cursor-pointer"
                      >
                        <option value="1-2 Years">1 - 2 Years Experience</option>
                        <option value="3-5 Years">3 - 5 Years Experience</option>
                        <option value="5-8 Years">5 - 8 Years Experience</option>
                        <option value="8+ Years (Lead / Principal)">8+ Years (Lead / Principal)</option>
                      </select>
                    </div>
                  </div>

                  {/* Location & Notice Period */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Current City / Location <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bangalore, Pune, Chennai"
                        required
                        value={applicantForm.location}
                        onChange={(e) => setApplicantForm({ ...applicantForm, location: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Notice Period <span className="text-primary-400">*</span>
                      </label>
                      <select
                        value={applicantForm.noticePeriod}
                        onChange={(e) => setApplicantForm({ ...applicantForm, noticePeriod: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 cursor-pointer"
                      >
                        <option value="Immediate / Serving Notice">Immediate / Serving Notice</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 - 90 Days">60 - 90 Days</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume / Profile link */}
                  <div>
                    <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                      LinkedIn Profile URL or Google Drive Resume Link <span className="text-primary-400">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile or https://drive.google.com/..."
                      required
                      value={applicantForm.portfolioUrl}
                      onChange={(e) => setApplicantForm({ ...applicantForm, portfolioUrl: e.target.value })}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                    />
                  </div>

                  {/* Technical Notes */}
                  <div>
                    <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                      Core Tools & Key Competencies (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Altium Designer (6-layer boards), STM32CubeIDE, KiCad, CAN bus debugging, DFM checks..."
                      value={applicantForm.notes}
                      onChange={(e) => setApplicantForm({ ...applicantForm, notes: e.target.value })}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body resize-none"
                    />
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">Quick Add:</span>
                      {['Altium (6L+)', 'KiCad 8', 'STM32 / RTOS', 'CAN-FD / ISO 26262', 'High-Speed SI', 'DFM / DFX'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setApplicantForm((prev) => ({
                              ...prev,
                              notes: prev.notes ? `${prev.notes}, ${tag}` : tag,
                            }));
                          }}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-850 hover:bg-primary-600/20 text-slate-300 hover:text-white border border-white/10 transition-colors"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={modalSubmitStatus === 'submitting'}
                    className="btn-primary w-full py-3 text-sm font-semibold mt-2"
                  >
                    {modalSubmitStatus === 'submitting' ? 'Submitting Application...' : 'Submit Job Application'}
                  </button>
                </form>
              ) : (
                /* Company Form */
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Company / Organization Name <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Technologies Ltd"
                        value={companyForm.companyName}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Contact Person & Designation <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma, VP Engineering"
                        value={companyForm.contactName}
                        onChange={(e) => setCompanyForm({ ...companyForm, contactName: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Official Work Email <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rajesh@acmetech.com"
                        value={companyForm.workEmail}
                        onChange={(e) => setCompanyForm({ ...companyForm, workEmail: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Phone / WhatsApp Number <span className="text-primary-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={companyForm.phone}
                        onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Target Engineering Role <span className="text-primary-400">*</span>
                      </label>
                      <select
                        value={companyForm.roleId}
                        onChange={(e) => setCompanyForm({ ...companyForm, roleId: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 cursor-pointer"
                      >
                        {PARTNER_VACANCIES.map((r) => (
                          <option
                            key={r.id}
                            value={r.id}
                            className="bg-dark-900 text-white py-2"
                          >
                            {r.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                        Positions Needed <span className="text-primary-400">*</span>
                      </label>
                      <select
                        value={companyForm.positionsNeeded}
                        onChange={(e) => setCompanyForm({ ...companyForm, positionsNeeded: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 cursor-pointer"
                      >
                        <option value="1 Engineer">1 Engineer</option>
                        <option value="2-3 Engineers">2 - 3 Engineers</option>
                        <option value="4-5 Engineers">4 - 5 Engineers</option>
                        <option value="Dedicated Pod / Team (5+)">Dedicated Pod / Team (5+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 text-xs font-body font-semibold mb-1.5 block">
                      Specific Requirements & Work Model
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Must have 4+ years in automotive ISO 26262, on-site in Bangalore, immediate joining required..."
                      value={companyForm.requirements}
                      onChange={(e) => setCompanyForm({ ...companyForm, requirements: e.target.value })}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-all font-body resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={modalSubmitStatus === 'submitting'}
                    className="btn-primary w-full py-3 text-sm font-semibold mt-2"
                  >
                    {modalSubmitStatus === 'submitting' ? 'Submitting Requisition...' : 'Request Candidate Shortlist'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
