'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { NAME } from '@/lib/constants'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const statusCardRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    // Name animation
    if (nameRef.current) {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3,
        }
      )
    }

    // Cards reveal
    if (leftCardRef.current) {
      gsap.fromTo(
        leftCardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.5,
        }
      )
    }

    if (rightCardRef.current) {
      gsap.fromTo(
        rightCardRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.7,
        }
      )
    }

    if (statusCardRef.current) {
      gsap.fromTo(
        statusCardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.9,
        }
      )
    }

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
          {/* Left Panel - Large Name Card */}
          <motion.div
            ref={leftCardRef}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            {/* Small logo at top left */}
            <div className="text-white/60 text-xs mb-6 font-medium">{NAME} / DEV</div>

            {/* Large Name */}
            <div ref={nameRef} className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight">
                ROHAN
                <br />
                MAJEED
              </h1>
            </div>

            {/* Arrow icon top right */}
            <motion.div
              className="absolute top-8 right-8"
              whileHover={{ scale: 1.1, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={24} className="text-white/60" />
            </motion.div>
          </motion.div>

          {/* Right Panel - Portrait Card */}
          <motion.div
            ref={rightCardRef}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            {/* Portrait placeholder */}
            <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-white/10 to-black/50 rounded-2xl mb-6 flex items-center justify-center">
              <div className="text-white/20 text-sm">Portrait Image</div>
            </div>

            {/* Status Badge */}
            <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-white/60 text-xs uppercase tracking-wider mb-2">STATUS</div>
              <div className="text-white text-2xl font-bold">OPEN FOR WORK</div>
            </div>
          </motion.div>
        </div>

        {/* Current Status Card */}
        <motion.div
          ref={statusCardRef}
          className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 max-w-md"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-white/60 text-xs uppercase tracking-wider">CURRENT STATUS</div>
            {/* Glowing orange/yellow dot */}
            <motion.div
              className="w-3 h-3 rounded-full bg-orange-400/80"
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">TRAINING AI AGENTS...</h3>
          <div className="text-white/60 text-sm uppercase tracking-wider">AI AGENT ACTIVE</div>
        </motion.div>
      </div>
    </motion.section>
  )
}
