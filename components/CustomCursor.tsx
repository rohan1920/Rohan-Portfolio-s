'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [hoveredText, setHoveredText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if hovering over text elements or interactive elements
      const isTextElement = 
        target.tagName === 'P' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'H5' ||
        target.tagName === 'H6' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'LI' ||
        target.tagName === 'LABEL'

      if (isTextElement) {
        // Get the text content, prefer innerText for better word extraction
        const text = target.innerText?.trim() || target.textContent?.trim() || ''
        
        // Extract first word or short phrase
        const words = text.split(/\s+/)
        const displayText = words.length > 0 && words[0].length < 20 
          ? words[0] 
          : text.length < 30 
            ? text 
            : ''
        
        if (displayText.length > 0) {
          setIsHovering(true)
          setHoveredText(displayText)
        } else {
          setIsHovering(false)
          setHoveredText('')
        }
      } else {
        setIsHovering(false)
        setHoveredText('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className={`w-full h-full rounded-full border backdrop-blur-sm transition-all duration-300 ${
          isHovering 
            ? 'bg-white/40 border-white/70 scale-125' 
            : 'bg-white/20 border-white/40 scale-100'
        }`} />
      </motion.div>

      {/* Microscope effect - shows text on hover */}
      <AnimatePresence>
        {isHovering && hoveredText && (
          <motion.div
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y + 20,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
              <p className="text-white text-xs font-medium whitespace-nowrap">{hoveredText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
