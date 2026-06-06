import { useEffect, useRef, useState } from 'react'
import { stats } from '@/data/stats'

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      let start = 0
      const step = Math.ceil(target / 60)
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(start)
      }, 25)
      observer.disconnect()
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold gradient-text">
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-16 bg-surface-muted border-y border-surface-border">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ label, value, suffix }) => (
            <div key={label} className="text-center">
              <Counter target={value} suffix={suffix} />
              <p className="text-white/60 text-sm mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
