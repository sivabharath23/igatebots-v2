import { motion } from 'framer-motion';

export default function EngineeringTelemetryBar() {
  const telemetryItems = [
    { label: 'CAD SUITE', value: 'Altium Designer 24 / KiCad 8.0' },
    { label: 'LAB INSTRUMENTATION', value: 'Keysight 2GHz 4-CH DSO • R&S EMI Analyzer' },
    { label: 'STANDARDS COMPLIANCE', value: 'IPC-2221B Class 3 • ISO 26262 ASIL-D' },
    { label: 'IP PROTECTION', value: 'Mutual NDA Prior to File Transfer' },
    { label: 'TURNAROUND SPRINT', value: '24-48H Emergency Bring-Up Available' },
    { label: 'DESK STATUS', value: 'Senior Hardware Leads Active' },
  ];

  return (
    <div className="w-full bg-dark-900/90 border-y border-white/[0.08] backdrop-blur-md overflow-hidden py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-white font-semibold tracking-wider">LAB TELEMETRY:</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {telemetryItems.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-slate-400">{item.label}:</span>
                <span className="text-slate-200 font-medium">{item.value}</span>
                {idx < 3 && <span className="text-white/10 ml-4">•</span>}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-primary-500/10 border border-primary-500/20 text-primary-300">
              LOCATION: Electronic City, BLR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
