export default function PCBBackground({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Precision CAD grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle ambient lighting vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(37, 99, 235, 0.07) 0%, rgba(6, 10, 18, 0.4) 60%, rgba(6, 10, 18, 0.95) 100%)'
        }}
      />

      {/* Technical Schematic Blueprint Traces - Subtle & Elegant */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Engineering Crosshairs / Alignment Vias */}
        {[
          [180, 120], [720, 80], [1260, 140],
          [240, 520], [840, 480], [1200, 680],
          [480, 820], [960, 800]
        ].map(([x, y], i) => (
          <g key={`cross-${i}`} opacity="0.6">
            <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="#38bdf8" strokeWidth="0.75" />
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="#38bdf8" strokeWidth="0.75" />
            <circle cx={x} cy={y} r="2" fill="#090e1a" stroke="#38bdf8" strokeWidth="0.75" />
          </g>
        ))}

        {/* Clean, sharp PCB bus routes with subtle flow */}
        <g stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
          <path d="M0 160 H280 L340 220 H640 L690 170 H1020 L1080 230 H1440" />
          <path d="M0 168 H276 L336 228 H636 L686 178 H1016 L1076 238 H1440" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />

          <path d="M140 0 V120 L180 160 V420 L220 460 V900" strokeWidth="0.75" />
          <path d="M1280 0 V140 L1240 180 V620 L1200 660 V900" strokeWidth="0.75" />

          <path d="M420 380 H780 L830 430 H1120 L1170 380 H1440" opacity="0.5" />
          <path d="M0 680 H360 L410 630 H760 L810 680 H1440" opacity="0.6" />
        </g>

        {/* Subtle data flow trace */}
        <path
          d="M0 160 H280 L340 220 H640 L690 170 H1020 L1080 230 H1440"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="flow-trace"
          opacity="0.8"
        />
        <path
          d="M0 680 H360 L410 630 H760 L810 680 H1440"
          stroke="#60a5fa"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="flow-trace-slow"
          opacity="0.7"
        />

        {/* Precision IC Footprints & Test Points */}
        <g opacity="0.5">
          {/* Main processor package outline */}
          <rect x="520" y="440" width="110" height="90" rx="3" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="3 3" fill="#0d1526" fillOpacity="0.4" />
          <circle cx="530" cy="450" r="1.5" fill="#38bdf8" />
          
          {/* Peripheral IC */}
          <rect x="940" y="280" width="80" height="60" rx="2" stroke="#3b82f6" strokeWidth="0.75" fill="#0d1526" fillOpacity="0.4" />
        </g>

        {/* Via arrays */}
        {[
          [280, 160], [340, 220], [640, 220], [690, 170], [1020, 170], [1080, 230],
          [360, 680], [410, 630], [760, 630], [810, 680]
        ].map(([cx, cy], i) => (
          <g key={`via-${i}`}>
            <circle cx={cx} cy={cy} r="3" fill="#090e1a" stroke="#38bdf8" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="1" fill="#38bdf8" />
          </g>
        ))}
      </svg>
    </div>
  );
}
