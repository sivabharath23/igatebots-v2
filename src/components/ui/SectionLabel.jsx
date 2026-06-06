export default function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1
                    border border-cyan/30 rounded-full bg-cyan/10">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
      <span className="text-cyan text-xs font-mono tracking-widest uppercase">
        {children}
      </span>
    </div>
  )
}
