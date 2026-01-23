'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { NAME } from '@/lib/constants'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      {/* Glassmorphism container */}
      <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="text-white font-medium text-sm">
            {NAME} / DEV
          </Link>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link href="#work" className="text-white hover:text-white/80 transition-colors text-sm font-medium">
                Work
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link href="#services" className="text-white hover:text-white/80 transition-colors text-sm font-medium">
                Services
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link href="#about" className="text-white hover:text-white/80 transition-colors text-sm font-medium">
                About
              </Link>
            </motion.div>
          </div>

          {/* Right - Initialize Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-white/20 rounded-lg text-white text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            INITIALIZE
            <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
