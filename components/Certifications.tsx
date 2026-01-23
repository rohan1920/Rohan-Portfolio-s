'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'

const certifications = [
  {
    id: 1,
    title: 'Agent Factory Fundamentals: Building Digital Full-Time Equivalents (FTEs)',
    issuer: 'Panaversity',
    date: 'Jan 18, 2026',
    score: '70%',
    link: 'https://panaversity.org/p/fiaz-majeed-ofe9',
    badgeId: '8217',
  },
  {
    id: 2,
    title: 'Fundamentals of Agentic AI Quiz Level 1',
    issuer: 'Panaversity',
    date: 'Jul 13, 2025',
    score: '72%',
    link: 'https://panaversity.org/p/p-4854-rohan',
    badgeId: '2093',
  },
  {
    id: 3,
    title: 'Level 2 Fundamentals of Agentic AI Professional Quiz',
    issuer: 'Panaversity',
    date: 'Jul 27, 2025',
    score: '77%',
    link: 'https://panaversity.org/p/p-4854-rohan',
    badgeId: '4058',
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      id="certifications"
      ref={ref}
      className="py-32 px-6 lg:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Certifications
          </h2>
          <div className="text-white/50 text-sm uppercase tracking-wider">Professional Credentials</div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                delay: 0.3 + index * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                  <Award className="text-purple-300" size={24} />
                </div>
                <ExternalLink className="text-white/40 group-hover:text-white transition-colors" size={20} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-200 transition-colors">
                {cert.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="text-white/60 text-sm">
                  <span className="text-white/40">Issuer:</span> {cert.issuer}
                </div>
                <div className="text-white/60 text-sm">
                  <span className="text-white/40">Date:</span> {cert.date}
                </div>
                <div className="text-white/60 text-sm">
                  <span className="text-white/40">Score:</span>{' '}
                  <span className="text-green-400 font-medium">{cert.score}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-white/40 text-xs uppercase tracking-wider">Badge ID: {cert.badgeId}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
