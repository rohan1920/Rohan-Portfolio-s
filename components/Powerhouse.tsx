'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { NAME } from '@/lib/constants'

const techStack = ['Next.js', 'AI Agents', 'GSAP', '+ More']

export default function Powerhouse() {
  const ref = useRef(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (isInView && cardRef.current) {
      // Smooth reveal animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      )
    }
  }, [isInView])

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="py-32 px-6 lg:px-12 relative z-10"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-rose-500/20" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={cardRef}
          className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Purple gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-purple-500/20 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 mb-12">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">Powerhouse</div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                    transition={{
                      delay: 0.5 + index * 0.15,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`px-5 py-2.5 rounded-lg text-white text-sm font-medium border transition-colors ${
                      tech === '+ More'
                        ? 'bg-black/40 border-white/20'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2"
            >
              <div className="text-white text-xl font-medium">{NAME}</div>
              <div className="text-white/50 text-sm uppercase tracking-wider">Status</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">OPEN FOR WORK</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
