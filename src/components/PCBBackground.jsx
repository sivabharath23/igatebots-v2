export default function PCBBackground({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-primary-400/6 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* PCB Traces SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Horizontal traces */}
        <path d="M0 200 H300 L350 250 H600 L650 200 H900" stroke="#1a6cff" strokeWidth="1" className="trace-anim" />
        <path d="M500 450 H800 L850 400 H1100 L1150 450 H1440" stroke="#00c8ff" strokeWidth="0.5" className="trace-anim" style={{ animationDelay: '0.5s' }} />
        <path d="M0 650 H200 L250 700 H550 L600 650 H800" stroke="#1a6cff" strokeWidth="1" className="trace-anim" style={{ animationDelay: '1s' }} />
        
        {/* Vertical traces */}
        <path d="M300 0 V200 L350 250 V500 L300 550 V900" stroke="#1a6cff" strokeWidth="0.5" className="trace-anim" style={{ animationDelay: '0.3s' }} />
        <path d="M900 100 V300 L950 350 V600 L900 650 V900" stroke="#00c8ff" strokeWidth="1" className="trace-anim" style={{ animationDelay: '0.8s' }} />
        
        {/* Via dots */}
        {[
          [350, 250], [650, 200], [850, 400], [1150, 450], [250, 700], [600, 650],
          [300, 200], [300, 550], [900, 300], [900, 650],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#1a6cff" stroke="#00c8ff" strokeWidth="1" opacity="0.6" />
        ))}
        
        {/* Chip outlines */}
        <rect x="120" y="120" width="80" height="60" rx="4" stroke="#1a6cff" strokeWidth="0.5" fill="none" />
        <rect x="680" y="320" width="100" height="80" rx="4" stroke="#00c8ff" strokeWidth="0.5" fill="none" />
        <rect x="1100" y="150" width="80" height="60" rx="4" stroke="#1a6cff" strokeWidth="0.5" fill="none" />

        {/* Component legs */}
        {[130, 145, 160, 175].map((x, i) => (
          <line key={i} x1={x} y1={120} x2={x} y2={110} stroke="#1a6cff" strokeWidth="0.5" />
        ))}
        {[130, 145, 160, 175].map((x, i) => (
          <line key={i + 10} x1={x} y1={180} x2={x} y2={190} stroke="#1a6cff" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-400/40"
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${15 + ((i * 13) % 70)}%`,
            animation: `particle-float ${4 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
