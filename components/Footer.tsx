'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { NAME } from '@/lib/constants'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-white text-3xl md:text-4xl font-bold">{NAME}</div>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="text-sm uppercase tracking-wider">BACK TO TOP</span>
            <ArrowUp size={16} />
          </motion.button>
        </div>
        <div className="text-center text-white/30 text-sm mb-2">
          © 2026 {NAME}. ALL RIGHTS RESERVED.
        </div>
        <div className="text-center text-white/30 text-sm">ENGINEERED IN PAKISTAN.</div>
      </div>
    </footer>
  )
}
