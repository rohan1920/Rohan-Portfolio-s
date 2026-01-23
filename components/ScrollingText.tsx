'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const text = [
  'Agentic AI Systems',
  'Full Stack Architecture',
  'Neural Networks',
  'Next.js 14',
  'Engineered Chaos',
  'Defining Future Syntax',
]

export default function ScrollingText() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const items = Array.from(containerRef.current.children) as HTMLElement[]
      const totalWidth = items.reduce((sum, item) => sum + item.offsetWidth, 0)

      // Very smooth and slow scrolling
      gsap.to(containerRef.current, {
        x: -totalWidth / 2,
        duration: 60, // Increased from 30 to 60 for slower movement
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return (
    <section className="py-20 overflow-hidden relative z-10">
      <div className="flex whitespace-nowrap" ref={containerRef}>
        {[...text, ...text, ...text].map((item, index) => (
          <div
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/10 px-8 md:px-12 flex-shrink-0"
          >
            {item}•
          </div>
        ))}
      </div>
    </section>
  )
}
