import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdvisoryScopeCalculator({ onApplyScope }) {
  const [complexity, setComplexity] = useState('4-layer');
  const [challenge, setChallenge] = useState('sipi');
  const [urgency, setUrgency] = useState('priority');

  const COMPLEXITY_OPTIONS = [
    { id: '2-layer', label: '2-Layer', desc: 'Low-Speed / IoT Sensor', hours: 6 },
    { id: '4-layer', label: '4-Layer', desc: 'Industrial / Automotive CAN', hours: 10 },
    { id: '6-layer', label: '6-Layer HDI', desc: 'DDR4 / High-Speed MCU', hours: 16 },
    { id: '8-layer', label: '8+ Layer', desc: 'FPGA / RF / Multi-GHz', hours: 24 },
  ];

  const CHALLENGE_OPTIONS = [
    { id: 'schematic', label: 'Schematic & IC Selection', mult: 1.0, domainId: 'architecture' },
    { id: 'sipi', label: 'Signal & Power Integrity (SI/PI)', mult: 1.25, domainId: 'sipi' },
    { id: 'dfm', label: 'DFM & Panelization Yield', mult: 0.9, domainId: 'dfm' },
    { id: 'emc', label: 'EMI / EMC Pre-Compliance', mult: 1.3, domainId: 'sipi' },
    { id: 'bringup', label: 'Lab Bring-Up Debugging', mult: 1.4, domainId: 'troubleshooting' },
  ];

  const URGENCY_OPTIONS = [
    { id: 'standard', label: 'Standard (3-5 Days)', mult: 1.0, tag: 'Scheduled' },
    { id: 'priority', label: 'Priority Sprint (24-48h)', mult: 1.2, tag: 'Rapid Response' },
    { id: 'emergency', label: 'Emergency Hotline (Same Day)', mult: 1.5, tag: 'Immediate Desk' },
  ];

  const selectedComplexityObj = COMPLEXITY_OPTIONS.find((c) => c.id === complexity) || COMPLEXITY_OPTIONS[1];
  const selectedChallengeObj = CHALLENGE_OPTIONS.find((c) => c.id === challenge) || CHALLENGE_OPTIONS[1];
  const selectedUrgencyObj = URGENCY_OPTIONS.find((u) => u.id === urgency) || URGENCY_OPTIONS[1];

  const estimatedHours = Math.round(
    selectedComplexityObj.hours * selectedChallengeObj.mult * selectedUrgencyObj.mult
  );

  const handleTransfer = () => {
    if (onApplyScope) {
      onApplyScope({
        domain: selectedChallengeObj.domainId,
        tier: estimatedHours > 18 ? 'comprehensive' : estimatedHours > 10 ? 'deep-dive' : 'quick-audit',
        urgencyText: selectedUrgencyObj.label,
        notes: `Selected Scoping: ${selectedComplexityObj.label} (${selectedComplexityObj.desc}) with focus on ${selectedChallengeObj.label}. Turnaround: ${selectedUrgencyObj.label}. Est. ${estimatedHours} engineering hours.`,
      });
    }

    const target = document.getElementById('book-consultation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-primary-400 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Advisory Scoping & Turnaround Calculator
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            Estimate Your Project Review Scope
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-body mt-1">
            Select your hardware parameters to see expected review hours, assigned engineering leads, and generated deliverables.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-primary-600/10 border border-primary-500/20 text-xs font-mono text-primary-300 self-start lg:self-center">
          CONFIDENTIAL • NO SIGN-IN REQUIRED
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 my-6">
        {/* Left Column: Parameter Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Parameter 1: Complexity */}
          <div>
            <label className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-2.5">
              1. Board Stackup Complexity
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {COMPLEXITY_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setComplexity(c.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    complexity === c.id
                      ? 'bg-primary-600/15 border-primary-500 text-white shadow-sm'
                      : 'bg-dark-900/60 border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <p className="font-mono text-xs font-bold text-white mb-0.5">{c.label}</p>
                  <p className="text-[11px] font-body text-slate-400 leading-tight">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Parameter 2: Challenge */}
          <div>
            <label className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-2.5">
              2. Core Hardware Challenge
            </label>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {CHALLENGE_OPTIONS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setChallenge(ch.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    challenge === ch.id
                      ? 'bg-primary-600/15 border-primary-500 text-white shadow-sm'
                      : 'bg-dark-900/60 border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <p className="font-mono text-xs font-semibold text-white">{ch.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Parameter 3: Urgency */}
          <div>
            <label className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-2.5">
              3. Delivery Timeline
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {URGENCY_OPTIONS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUrgency(u.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    urgency === u.id
                      ? 'bg-primary-600/15 border-primary-500 text-white shadow-sm'
                      : 'bg-dark-900/60 border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/5 rounded text-primary-300 block w-max mb-1">
                    {u.tag}
                  </span>
                  <p className="font-mono text-xs text-white font-medium">{u.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Output Card */}
        <div className="lg:col-span-5 bg-dark-900 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono uppercase text-slate-400">Scoping Estimate</span>
              <span className="text-xs font-mono text-emerald-400">Fixed-Fee Guarantee</span>
            </div>

            <div className="mb-6">
              <p className="text-xs font-mono text-slate-400 uppercase">Estimated Review Effort</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-4xl font-bold text-white">{estimatedHours} - {estimatedHours + 4}</span>
                <span className="text-slate-400 text-sm font-mono">Engineering Hours</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-body">
                Conducted by Senior Hardware Architect (10+ yrs industry exp.)
              </p>
            </div>

            {/* Checklist of deliverables */}
            <div className="space-y-2 mb-6">
              <p className="text-[11px] font-mono uppercase text-slate-400">Included Deliverables:</p>
              <div className="flex items-start gap-2 text-xs font-body text-slate-300">
                <span className="text-primary-400 font-bold shrink-0 mt-0.5">✓</span>
                <span>Annotated Gerber & Schematic PDF with exact coordinate callouts.</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-body text-slate-300">
                <span className="text-primary-400 font-bold shrink-0 mt-0.5">✓</span>
                <span>Polar SI9000-compliant impedance and stackup table.</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-body text-slate-300">
                <span className="text-primary-400 font-bold shrink-0 mt-0.5">✓</span>
                <span>Bill of Materials (BOM) alternate second-source parts matrix.</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-body text-slate-300">
                <span className="text-primary-400 font-bold shrink-0 mt-0.5">✓</span>
                <span>Mutual Non-Disclosure Agreement (NDA) prior to file upload.</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTransfer}
            className="btn-primary w-full py-3 text-sm font-semibold tracking-wide text-center"
          >
            <span>Transfer Scope to Booking Wizard &darr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
