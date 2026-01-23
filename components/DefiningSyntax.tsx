'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { useEffect } from 'react'

const sections = [
  {
    number: '01',
    label: 'THE APPROACH',
    title: 'Engineered Chaos.',
    description:
      "I don't just write code; I orchestrate systems. Bridging the gap between raw, unstructured data and elegant, functional user experiences.",
  },
  {
    number: '02',
    label: 'THE FOCUS',
    title: 'Beyond Automation.',
    description:
      "Building Agentic AI that doesn't just follow instructions, but understands intent, plans autonomously, and executes complex tasks.",
  },
  {
    number: '03',
    label: 'THE GOAL',
    title: 'Future Proofing.',
    description:
      'Crafting scalable, high-performance digital infrastructure designed to evolve with the rapid pace of technological advancement.',
  },
]

export default function DefiningSyntax() {
  const ref = useRef(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  useEffect(() => {
    if (isInView && titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }
      )
    }
  }, [isInView])

  return (
    <motion.section
      id="about"
      ref={ref}
      style={{ y }}
      className="py-32 px-6 lg:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title with solid/outlined styling */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32 text-center"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight">
            <span className="text-white">DEFINING THE</span>
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_white]">SYNTAX OF</span>
            <br />
            <span className="text-white">INTELLIGENCE.</span>
          </h2>
        </motion.div>

        {/* Three columns layout */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                delay: 0.5 + index * 0.2,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Green label */}
              <div className="text-green-400 text-sm uppercase tracking-wider mb-6 font-medium">
                {section.number} /// {section.label}
              </div>

              {/* White dot indicator (for column 2) */}
              {index === 1 && (
                <motion.div
                  className="absolute -top-2 left-0 w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {section.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 leading-relaxed text-base">
                {section.description}
              </p>

              {/* White circular element (for column 2) */}
              {index === 1 && (
                <motion.div
                  className="mt-8 w-16 h-16 border-2 border-white/30 rounded-full mx-auto"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
