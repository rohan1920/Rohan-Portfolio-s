'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { gsap } from 'gsap'

const services = [
  {
    number: '01',
    title: 'AI INTEGRATIONS',
    description:
      'Enhancing web applications with intelligent capabilities. I build custom chatbots and smart documentation readers using OpenAI API.',
    tech: ['OpenAI API', 'Docusaurus', 'Prompt Engineering', 'Chatbots'],
    hoverDescription: 'Transform your web applications with AI-powered features. From intelligent chatbots that understand context to smart documentation systems that learn from user interactions.',
  },
  {
    number: '02',
    title: 'WEB DEVELOPMENT',
    description:
      'Building fast, responsive, and functional web applications. From static sites to dynamic apps like Todo lists and dashboards.',
    tech: ['Next.js 14', 'React', 'Tailwind CSS', 'TypeScript'],
    hoverDescription: 'Create blazing-fast, scalable web applications. I specialize in modern frameworks and best practices to deliver production-ready solutions that perform exceptionally.',
  },
  {
    number: '03',
    title: 'INTERACTIVE UI',
    description:
      "Creating 'WOW' moments on the screen. Smooth transitions, scroll animations, and micro-interactions that keep users engaged.",
    tech: ['GSAP', 'Framer Motion', 'Locomotive Scroll', 'CSS3'],
    hoverDescription: 'Design experiences that captivate. Every interaction is crafted to feel natural and delightful, using advanced animation techniques to create memorable user journeys.',
  },
]

const offerTitles = [
  'OFFER',
  'DELIVER',
  'BUILD',
  'ENGINEER',
]

function ServiceCard({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isInView && cardRef.current) {
      // Very slow and smooth card reveal animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.5,
          delay: index * 0.4,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      )

      // Title animation with letter stagger
      if (titleRef.current) {
        const letters = titleRef.current.textContent?.split('') || []
        titleRef.current.innerHTML = letters
          .map((letter, i) => `<span class="inline-block" style="opacity: 0; transform: translateY(20px);">${letter === ' ' ? '&nbsp;' : letter}</span>`)
          .join('')

        const spans = titleRef.current.querySelectorAll('span')
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.4 + 0.5,
          stagger: 0.05,
          ease: 'power2.out',
        })
      }
    }
  }, [isInView, index])

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer relative rounded-2xl overflow-hidden"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Simple border with rounded corners - no gradients */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-2xl transition-all duration-500" />

      <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 py-12 px-6 md:px-8 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: index * 0.4 + 0.3, duration: 0.8 }}
          className="text-white/30 text-sm font-mono w-12 flex-shrink-0"
        >
          {service.number}
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <h3
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-white/80 transition-colors leading-tight"
            >
              {service.title}
            </h3>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink
                size={24}
                className="text-white/40 group-hover:text-white transition-colors"
              />
            </motion.div>
          </div>

          {/* Description - only shows on hover with smooth animation */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 overflow-hidden"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-white/70 leading-relaxed max-w-3xl text-lg"
                >
                  {service.description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-3">
            {service.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
                transition={{
                  delay: index * 0.4 + techIndex * 0.15 + 1,
                  duration: 0.6,
                  ease: 'back.out',
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 text-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [offerTitleIndex, setOfferTitleIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Rotate "WHAT I ..." title every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOfferTitleIndex((prev) => (prev + 1) % offerTitles.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      id="services"
      ref={ref}
      style={{ y, opacity }}
      className="py-32 px-6 lg:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-transform duration-300 ease-out cursor-default"
          >
            WHAT I{' '}
            <span className="inline-block min-w-[7ch]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={offerTitleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="text-purple-200 drop-shadow-[0_0_15px_rgba(196,181,253,0.6)] inline-block"
                >
                  {offerTitles[offerTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/50 text-sm uppercase tracking-wider"
          >
            Skills & Services
          </motion.div>
        </motion.div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
