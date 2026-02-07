'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { NAME } from '@/lib/constants'

const statusQuotes = [
  'TRAINING AI AGENTS...',
  'BUILD NEXT.JS APPS',
  'BUILD RESPONSIVE UI/UX',
  'BUILD AUTOMATION AGENTS',
  'ERROR DEBUGGING',
  'OPEN FOR COLLAB',
  'OPEN FOR SAAS PROJECTS',
]

const nameStatusLines = [
  'Agentic AI • Automation • Full Stack',
  'Building digital FTEs & AI workflows',
  'Shipping modern web products',
]

function StatCard({ stat, index, isInView }: { stat: { label: string; values: string[] }; index: number; isInView: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stat.values.length)
    }, 5000 + index * 300)
    return () => clearInterval(interval)
  }, [stat.values.length, index])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: 0.7 + index * 0.15, duration: 0.6, ease: 'easeInOut' }} // Framer Motion safe
      className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-5 text-center group hover:border-white/20 transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-white text-3xl font-bold mb-1"
        >
          {stat.values[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <div className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const statusCardRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [currentNameStatusIndex, setCurrentNameStatusIndex] = useState(0)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  useEffect(() => {
    // Name animation (GSAP safe)
    if (nameRef.current) {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "cubic-bezier(0.22, 1, 0.36, 1)", delay: 0.3 }
      )
    }

    // Cards reveal (GSAP safe)
    if (leftCardRef.current) {
      gsap.fromTo(leftCardRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "cubic-bezier(0.22, 1, 0.36, 1)", delay: 0.5 })
    }
    if (rightCardRef.current) {
      gsap.fromTo(rightCardRef.current, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "cubic-bezier(0.22, 1, 0.36, 1)", delay: 0.7 })
    }
    if (statusCardRef.current) {
      gsap.fromTo(statusCardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "cubic-bezier(0.22, 1, 0.36, 1)", delay: 0.9 })
    }
  }, [])

  // Quotes rotation
  useEffect(() => {
    const interval = setInterval(() => setCurrentQuoteIndex(prev => (prev + 1) % statusQuotes.length), 2000)
    return () => clearInterval(interval)
  }, [])

  // Name status rotation
  useEffect(() => {
    const interval = setInterval(() => setCurrentNameStatusIndex(prev => (prev + 1) % nameStatusLines.length), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      id="home"
      ref={containerRef}
      style={{ y, opacity }}
      className="min-h-screen flex items-center px-6 lg:px-12 relative z-10 pt-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Left Panel */}
          <motion.div ref={leftCardRef} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="text-white/60 text-xs mb-6 font-medium">{NAME} / DEV</div>
            <div ref={nameRef} className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight">
                ROHAN <br /> MAJEED
              </h1>
            </div>
            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNameStatusIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="text-white/60 text-sm uppercase tracking-wider"
                >
                  {nameStatusLines[currentNameStatusIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.div className="absolute top-8 right-8" whileHover={{ scale: 1.1, rotate: 45 }} transition={{ duration: 0.2 }}>
              <ArrowUpRight size={24} className="text-white/60" />
            </motion.div>
          </motion.div>

          {/* Right Panel */}
          <motion.div ref={rightCardRef} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="mb-8">
              <div className="text-white/60 text-xs uppercase tracking-wider mb-6">ACHIEVEMENTS</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Projects', values: ['30+', '35+', '40+'] },
                  { label: 'Clients', values: ['5+', '7+', '10+'] },
                  { label: 'Certifications', values: ['3', '3', '3'] },
                  { label: 'Avg Score', values: ['73%', '73%', '73%'] },
                ].map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="text-white/60 text-xs uppercase tracking-wider mb-2">STATUS</div>
              <div className="text-white text-2xl font-bold">OPEN FOR WORK</div>
            </div>
          </motion.div>
        </div>

        {/* Current Status Card */}
        <motion.div ref={statusCardRef} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 max-w-md">
          <div className="flex items-start justify-between mb-4">
            <div className="text-white/60 text-xs uppercase tracking-wider">CURRENT STATUS</div>
            <motion.div
              className="w-3 h-3 rounded-full bg-orange-400/80"
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="relative h-12 md:h-14 mb-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-2xl md:text-3xl font-bold text-white absolute inset-0"
              >
                {statusQuotes[currentQuoteIndex]}
              </motion.h3>
            </AnimatePresence>
          </div>
          <div className="text-white/60 text-sm uppercase tracking-wider">AI AGENT ACTIVE</div>
        </motion.div>
      </div>
    </motion.section>
  )
}
