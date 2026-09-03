import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STACKUP_PRESETS = [
  {
    id: 'high-speed-6l',
    title: '6-Layer High-Speed HDI',
    subtitle: 'DDR4 / STM32H7 / Gigabit Ethernet PHY',
    application: 'Mixed-Signal High-Speed Compute & DSP',
    totalThickness: '1.60 mm (63 mil)',
    impedanceTolerance: '± 5% Controlled',
    dielectricType: 'Isola 370HR / FR-4 High-Tg (180°C)',
    layers: [
      {
        num: 1,
        name: 'Top Layer (Signal / RF)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#38bdf8',
        impedance: '50.2 Ω SE / 90.4 Ω Diff (USB/Ethernet)',
        desc: 'Component mounting & high-speed microstrip traces. Microstrip width 5.2 mil, ground clearance 6.0 mil.',
      },
      {
        num: 'PP1',
        name: 'Dielectric Pre-Preg (1080 x 2)',
        type: 'dielectric',
        thickness: '100 µm (3.9 mil)',
        color: '#1e293b',
        impedance: 'εr = 4.12 @ 1 GHz',
        desc: 'Ultra-thin prepreg for low-inductance loop path directly under L1 high-speed lines.',
      },
      {
        num: 2,
        name: 'Inner Layer 1 (Solid GND Return)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#10b981',
        impedance: '0.002 Ω/sq DC Resistance',
        desc: 'Continuous uninterrupted zero-slot reference plane ensuring low-jitter return current paths.',
      },
      {
        num: 'CORE',
        name: 'Core FR-4 Dielectric',
        type: 'dielectric',
        thickness: '500 µm (19.7 mil)',
        color: '#0f172a',
        impedance: 'εr = 4.25 @ 1 GHz',
        desc: 'Rigid mechanical structural backbone with glass weave skew mitigation (spread glass fabric).',
      },
      {
        num: 3,
        name: 'Inner Layer 2 (High-Speed Signal 2)',
        type: 'copper',
        thickness: '18 µm (0.5 oz)',
        color: '#38bdf8',
        impedance: '50.0 Ω Stripline (DDR4 Address/Clock)',
        desc: 'Stripline routing shielded between GND and Power planes. Crosstalk isolation > 42 dB.',
      },
      {
        num: 'PP2',
        name: 'Dielectric Pre-Preg (2116)',
        type: 'dielectric',
        thickness: '120 µm (4.7 mil)',
        color: '#1e293b',
        impedance: 'εr = 4.15 @ 1 GHz',
        desc: 'High breakdown voltage isolation separating high-speed lines from internal power distribution.',
      },
      {
        num: 4,
        name: 'Inner Layer 3 (Power Plane Split)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#f59e0b',
        impedance: 'Z_PDN < 0.08 Ω up to 250 MHz',
        desc: 'Split power islands for 3.3V I/O, 1.8V PLL, and 1.2V Core with distributed 0402 bypass capacitors.',
      },
      {
        num: 'PP3',
        name: 'Dielectric Pre-Preg (1080 x 2)',
        type: 'dielectric',
        thickness: '100 µm (3.9 mil)',
        color: '#1e293b',
        impedance: 'εr = 4.12 @ 1 GHz',
        desc: 'Isolation prepreg providing reference for bottom layer component tracks.',
      },
      {
        num: 5,
        name: 'Inner Layer 4 (Secondary GND)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#10b981',
        impedance: 'Reference Shield',
        desc: 'Shielding layer preventing power rail noise injection into analog/sensor bottom routing.',
      },
      {
        num: 6,
        name: 'Bottom Layer (Signal & Decoupling)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#38bdf8',
        impedance: '50.2 Ω SE Microstrip',
        desc: 'Test point probing pads, decoupling capacitor array, and non-critical low-speed routing.',
      },
    ],
  },
  {
    id: 'automotive-power-4l',
    title: '4-Layer Automotive Power & CAN-FD',
    subtitle: 'ISO 26262 ASIL-D / 48V-12V DC-DC / CAN-FD',
    application: 'Traction Inverters, BMS & Rugged Control',
    totalThickness: '2.00 mm (78.7 mil)',
    impedanceTolerance: 'Heavy Copper 2.0 oz',
    dielectricType: 'High-CTI > 600V / Halogen-Free',
    layers: [
      {
        num: 1,
        name: 'Top Layer (MOSFET Stage & Power Traces)',
        type: 'copper',
        thickness: '70 µm (2.0 oz Heavy Cu)',
        color: '#f59e0b',
        impedance: 'High Current (30A Cont.)',
        desc: 'Heavy copper with thermal vias underneath switching power FETs for heat pipe conduction.',
      },
      {
        num: 'PP1',
        name: 'Reinforced Pre-Preg (High Dielectric Withstand)',
        type: 'dielectric',
        thickness: '180 µm (7.1 mil)',
        color: '#1e293b',
        impedance: 'Dielectric Breakdown > 3 kV',
        desc: 'Ensures creepage & clearance safety compliance according to IEC 60664-1.',
      },
      {
        num: 2,
        name: 'Inner Layer 1 (Power GND Star Ground)',
        type: 'copper',
        thickness: '70 µm (2.0 oz Heavy Cu)',
        color: '#10b981',
        impedance: 'Low Parasitic Inductance Ground',
        desc: 'Solid high-current return copper sink absorbing switching transients and inductive spikes.',
      },
      {
        num: 'CORE',
        name: 'Automotive Grade Core',
        type: 'dielectric',
        thickness: '1100 µm (43.3 mil)',
        color: '#0f172a',
        impedance: 'Tg = 180°C / Td = 360°C',
        desc: 'Engineered for high vibration and thermal shock cycles (-40°C to +125°C AEC-Q100).',
      },
      {
        num: 3,
        name: 'Inner Layer 2 (Logic Power 5V/3.3V)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#f59e0b',
        impedance: 'Regulated Logic Rail',
        desc: 'Isolated logic rail isolated from high-current power bridges via galvanic keepouts.',
      },
      {
        num: 4,
        name: 'Bottom Layer (CAN-FD Differential & MCU)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#38bdf8',
        impedance: '120 Ω Differential CAN-FD',
        desc: 'Tightly coupled 120Ω differential trace geometry with split-termination filtering.',
      },
    ],
  },
  {
    id: 'iot-rf-2l',
    title: '2-Layer Low-Power BLE / Sub-1GHz',
    subtitle: 'Nordic nRF5340 / ESP32-C6 / LoRaWAN',
    application: 'Battery-Operated Wearables & Field Sensors',
    totalThickness: '1.00 mm (39.4 mil)',
    impedanceTolerance: 'Coplanar Waveguide 50 Ω',
    dielectricType: 'FR-4 High-Frequency Loss Tangent Tan δ = 0.015',
    layers: [
      {
        num: 1,
        name: 'Top Layer (RF Traces & Components)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#38bdf8',
        impedance: '50 Ω Coplanar Waveguide with Ground',
        desc: 'RF transmission lines with ground pour fence and stitching vias spaced at λ/20 to prevent radiation.',
      },
      {
        num: 'CORE',
        name: 'Low-Loss FR-4 Core',
        type: 'dielectric',
        thickness: '900 µm (35.4 mil)',
        color: '#0f172a',
        impedance: 'εr = 4.3 @ 2.45 GHz',
        desc: 'Controlled dielectric constant substrate tested for 2.4GHz BLE and 868MHz/915MHz LoRa antennas.',
      },
      {
        num: 2,
        name: 'Bottom Layer (Solid Ground & Battery Clip)',
        type: 'copper',
        thickness: '35 µm (1.0 oz)',
        color: '#10b981',
        impedance: 'Unbroken RF Ground Return',
        desc: 'Zero-trace keepout area under ceramic chip antenna and ground contact for coin cell CR2032.',
      },
    ],
  },
];

export default function HardwareStackupInspector() {
  const [selectedPreset, setSelectedPreset] = useState(STACKUP_PRESETS[0]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('stackup'); // 'stackup' | 'dfm' | 'bench'

  const activeLayer = selectedPreset.layers[activeLayerIndex] || selectedPreset.layers[0];

  return (
    <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-primary-400 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Interactive Hardware Inspection Utility
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            CAD Layer Stackup & Impedance Simulator
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-body mt-1">
            Select an architecture preset to inspect physical layer stackup, dielectric properties, and high-frequency return paths verified in our Bangalore labs.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex rounded-xl bg-dark-900 p-1 border border-white/10 self-start lg:self-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('stackup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'stackup'
                ? 'bg-primary-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Layer Stackup
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dfm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'dfm'
                ? 'bg-primary-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DFM Tolerances
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bench')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'bench'
                ? 'bg-primary-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Lab Equipment
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid sm:grid-cols-3 gap-3 my-6">
        {STACKUP_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => {
              setSelectedPreset(preset);
              setActiveLayerIndex(0);
            }}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              selectedPreset.id === preset.id
                ? 'bg-primary-600/10 border-primary-500 shadow-sm'
                : 'bg-dark-900/60 border-white/[0.08] hover:border-white/20'
            }`}
          >
            <p className="font-mono text-xs text-primary-400 font-semibold mb-0.5">{preset.title}</p>
            <p className="font-body text-xs text-slate-300 font-medium truncate">{preset.subtitle}</p>
            <p className="font-mono text-[11px] text-slate-400 mt-2">Thickness: {preset.totalThickness}</p>
          </button>
        ))}
      </div>

      {activeTab === 'stackup' ? (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Stackup Visualization Cross-Section */}
          <div className="lg:col-span-7 bg-dark-900/80 border border-white/[0.08] rounded-xl p-5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-white/5">
              <span>CROSS-SECTION VIEW (CLICK LAYER TO INSPECT)</span>
              <span className="text-primary-400">{selectedPreset.layers.length} Layers Total</span>
            </div>

            <div className="space-y-1.5">
              {selectedPreset.layers.map((layer, idx) => {
                const isSelected = activeLayerIndex === idx;
                const isCopper = layer.type === 'copper';

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveLayerIndex(idx)}
                    className={`cursor-pointer rounded-lg px-3 py-2 transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'border-primary-400 bg-primary-500/15 shadow-sm'
                        : isCopper
                        ? 'border-white/10 bg-dark-850 hover:border-white/25'
                        : 'border-dashed border-white/5 bg-dark-950/70 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] font-bold ${
                          isSelected
                            ? 'bg-primary-400 text-dark-950'
                            : isCopper
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {layer.num}
                      </span>
                      <div>
                        <p className="text-xs font-mono text-white font-medium flex items-center gap-2">
                          <span>{layer.name}</span>
                          {isCopper && (
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                          )}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400">{layer.thickness}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-mono text-primary-300 block">
                        {layer.impedance.split('/')[0]}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {isCopper ? 'Conductor' : 'Substrate'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Layer Inspector HUD */}
          <div className="lg:col-span-5 bg-dark-900 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase text-slate-400">
                  LAYER TELEMETRY INSPECTOR
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ACTIVE LAYER: {activeLayer.num}
                </span>
              </div>

              <h4 className="font-display font-bold text-white text-lg mb-2">
                {activeLayer.name}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm font-body leading-relaxed mb-6">
                {activeLayer.desc}
              </p>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-dark-850 rounded-lg border border-white/5">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Layer Thickness</p>
                  <p className="text-xs font-mono font-semibold text-white mt-0.5">{activeLayer.thickness}</p>
                </div>
                <div className="p-3 bg-dark-850 rounded-lg border border-white/5">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Target Impedance</p>
                  <p className="text-xs font-mono font-semibold text-primary-400 mt-0.5">{activeLayer.impedance}</p>
                </div>
                <div className="p-3 bg-dark-850 rounded-lg border border-white/5">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Stackup Standard</p>
                  <p className="text-xs font-mono font-semibold text-white mt-0.5">IPC-2141A High-Speed</p>
                </div>
                <div className="p-3 bg-dark-850 rounded-lg border border-white/5">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Board Finish</p>
                  <p className="text-xs font-mono font-semibold text-emerald-400 mt-0.5">ENIG (Electroless Ni/Au)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Audited in iGatebots CAD Workbench
              </span>
              <a
                href="#book-consultation"
                className="text-xs font-mono text-primary-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                Request Custom Stackup &rarr;
              </a>
            </div>
          </div>
        </div>
      ) : activeTab === 'dfm' ? (
        /* DFM View */
        <div className="bg-dark-900/80 border border-white/[0.08] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <span className="text-xs font-mono uppercase text-slate-400">
              DESIGN FOR MANUFACTURABILITY (DFM) FABRICATION MATRIX
            </span>
            <span className="text-xs font-mono text-primary-400">IPC-A-600 / IPC-2221 Class 3</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-dark-850 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary-400 font-semibold uppercase">Trace & Space Rules</p>
              <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                <span>Standard Outer:</span>
                <span className="text-white">4 mil / 4 mil</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                <span>HDI Inner Signals:</span>
                <span className="text-white">3.5 mil / 3.5 mil</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1">
                <span>Heavy Cu Power:</span>
                <span className="text-white">8 mil / 8 mil</span>
              </div>
            </div>

            <div className="p-4 bg-dark-850 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary-400 font-semibold uppercase">Drill & Annular Ring</p>
              <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                <span>Min Laser Microvia:</span>
                <span className="text-white">0.10 mm (4 mil)</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                <span>Min Mechanical Drill:</span>
                <span className="text-white">0.20 mm (8 mil)</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1">
                <span>Annular Ring Allowance:</span>
                <span className="text-white">≥ 4.0 mil</span>
              </div>
            </div>

            <div className="p-4 bg-dark-850 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary-400 font-semibold uppercase">Assembly & Solder Mask</p>
              <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                <span>Solder Mask Dam:</span>
                <span className="text-white">≥ 3.0 mil</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                <span>Component Pitch:</span>
                <span className="text-white">Down to 0.35 mm BGA</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1">
                <span>Aspect Ratio (Max):</span>
                <span className="text-white">10:1 Through-Hole</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Bench Equipment View */
        <div className="bg-dark-900/80 border border-white/[0.08] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <span className="text-xs font-mono uppercase text-slate-400">
              BANGALORE ELECTRONICS CITY VERIFICATION & BRING-UP BENCH
            </span>
            <span className="text-xs font-mono text-emerald-400">All Equipment In-House</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-dark-850 rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">Oscilloscopes</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">Keysight Infiniium 4-Channel 2.5GHz with Serial Bus Decoders (CAN-FD, I2C, SPI, UART, PCIe Gen2).</p>
            </div>
            <div className="p-4 bg-dark-850 rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">Spectrum Analyzers</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">Rohde & Schwarz 3.6GHz EMI Pre-Compliance Analyzer with near-field H-field & E-field probe sets.</p>
            </div>
            <div className="p-4 bg-dark-850 rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">Thermal Telemetry</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">FLIR Precision Infrared Thermal Camera calibrated for board hotspots, power FETs, and heatsink profiling.</p>
            </div>
            <div className="p-4 bg-dark-850 rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">Rework & Bring-up</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">JBC Professional Hot Air / Micro-Soldering Station for BGA, 0201 passives, and jumper-wire modifications.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
