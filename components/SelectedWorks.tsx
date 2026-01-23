'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { gsap } from 'gsap'
import Image from 'next/image'

const projects = [
  { number: '01', category: 'Agency', title: 'CLEAN COLLECTED', tech: 'Next.js / GSAP', link: '#' },
  { number: '02', category: 'Luxury Sport', title: 'SIDCUP GOLF', tech: 'GSAP / JS', link: '#' },
  { number: '03', category: 'Studio', title: 'RELEVANCE', tech: 'Framer Motion', link: '#' },
  { number: '04', category: 'E-Commerce', title: 'NEXUS UI', tech: 'React / Tailwind', link: '#' },
]

function ProjectCard({ project, index, isInView, isActive, isVisible }: {
  project: typeof projects[0]
  index: number
  isInView: boolean
  isActive: boolean
  isVisible: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    if (isVisible) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 150, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' } // ✅ safe
      )
    } else {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: -100,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out', // ✅ safe
      })
    }
  }, [isVisible])

  return (
    <motion.div
      ref={cardRef}
      className={`group cursor-pointer relative transition-all duration-700 rounded-2xl ${
        isActive ? 'opacity-100' : 'opacity-60'
      }`}
      style={{ opacity: isVisible ? undefined : 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div
        className={`absolute inset-0 border-b transition-all duration-700 rounded-2xl ${
          isActive ? 'border-white/30' : 'border-white/10'
        }`}
      />
      <a href={project.link} className="block">
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-10 px-6 md:px-8 rounded-2xl">
          <div className="flex items-start gap-8 md:gap-12">
            <div className="text-white/30 text-sm font-mono w-8 md:w-12">{project.number}</div>
            <div>
              <div className="text-white/40 text-xs uppercase tracking-wider mb-3">{project.category}</div>
              <h3
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 transition-colors leading-tight ${
                  isActive ? 'text-white' : 'text-white/70'
                }`}
              >
                {project.title}
              </h3>
              <div className="text-white/30 text-sm">{project.tech}</div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 45 }}
            transition={{ duration: 0.3 }}
            className={`transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}
          >
            <ExternalLink size={24} />
          </motion.div>
        </div>
      </a>
    </motion.div>
  )
}

export default function SelectedWorks() {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleIndex, setVisibleIndex] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('[data-project-index]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-project-index') || '0')
            setActiveIndex(index)
            setVisibleIndex(index)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => cards.forEach((card) => observer.unobserve(card))
  }, [])

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            })
          }
        },
      })
    }
  }, [activeIndex])

  return (
    <motion.section id="work" ref={ref} className="py-32 px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div ref={containerRef} className="space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }} // ✅ safe
              className="mb-20"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Selected <span className="text-purple-200 drop-shadow-[0_0_15px_rgba(196,181,253,0.6)]">Work</span>
              </h2>
              <div className="text-white/50 text-sm uppercase tracking-wider mb-3">Case Studies</div>
              <div className="text-white/50 text-sm uppercase tracking-wider">04 PROJECTS</div>
            </motion.div>

            {projects.map((project, index) => (
              <div key={project.number} data-project-index={index}>
                <ProjectCard
                  project={project}
                  index={index}
                  isInView={isInView}
                  isActive={activeIndex === index}
                  isVisible={visibleIndex >= index}
                />
              </div>
            ))}
          </div>

          <div className="sticky top-32 h-[600px] hidden lg:block">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
              <motion.div
                ref={imageRef}
                key={activeIndex}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/rohan-portrait.jpg"
                    alt="Rohan Majeed"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center center', objectFit: 'cover' }}
                    priority={activeIndex === 0}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-black/80 backdrop-blur-sm pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-black via-black/90 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <motion.a
                  href={projects[activeIndex].link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  Visit Site
                  <ExternalLink size={16} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
