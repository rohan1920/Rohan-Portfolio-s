'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { CONTACT } from '@/lib/constants'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  const email = CONTACT

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialLinks = [
    { href: 'https://linkedin.com', label: 'LINKEDIN' },
    { href: 'https://github.com', label: 'GITHUB' },
    { href: 'https://twitter.com', label: 'TWITTER' },
    { href: 'https://instagram.com', label: 'INSTAGRAM' },
  ]

  return (
    <motion.section
      id="contact"
      ref={ref}
      style={{ y }}
      className="py-32 px-6 lg:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Text and Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }} // ✅ safe
            className="relative"
          >
            {/* Small white circle */}
            <div className="absolute -left-4 top-8 w-2 h-2 bg-white rounded-full hidden lg:block" />
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9] tracking-tight">
              <span className="text-white">LET&apos;S BUILD</span>
              <br />
              <span className="text-white/30">SOMETHING.</span>
            </h2>
            
            <p className="text-white/70 mb-8 text-base leading-relaxed">
              {"I am currently open to freelance projects and new opportunities."}
            </p>

            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-black border border-white/20 rounded-lg text-white hover:bg-white/5 transition-all duration-300"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="text-sm font-medium">{copied ? 'Copied!' : 'COPY EMAIL'}</span>
            </motion.button>
          </motion.div>

          {/* Right Side - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }} // ✅ safe
            className="flex flex-col"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.6,
                  ease: 'easeInOut', // ✅ safe
                }}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between py-4 border-b border-white/10 last:border-b-0 group"
              >
                <span className="text-white font-bold text-sm uppercase tracking-wider">{link.label}</span>
                <ArrowUpRight 
                  size={18} 
                  className="text-white/60 group-hover:text-white transition-colors" 
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
