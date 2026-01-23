'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Linkedin, Github, Twitter, Instagram, Copy, Check } from 'lucide-react'
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
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ]

  return (
    <motion.section
      id="contact"
      ref={ref}
      style={{ y }}
      className="py-32 px-6 lg:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            LET'S BUILD SOMETHING.
          </h2>
          <p className="text-white/50 mb-8 text-lg leading-relaxed max-w-2xl">
            I am currently open to freelance projects and new opportunities.
          </p>

          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 rounded-sm text-white hover:bg-white/10 transition-all duration-300"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Email'}</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
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
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-sm text-white hover:bg-white/10 transition-all duration-300"
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{link.label}</span>
                <span className="text-sm">↗</span>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
