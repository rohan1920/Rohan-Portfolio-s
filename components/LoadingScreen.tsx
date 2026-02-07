'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Fast loading - complete in 1 second max
    const maxTime = setTimeout(() => {
      setLoading(false)
    }, 1000)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 12
        if (next >= 100) {
          clearInterval(timer)
          clearTimeout(maxTime)
          setTimeout(() => {
            setLoading(false)
          }, 200)
          return 100
        }
        return next
      })
    }, 20)

    return () => {
      clearInterval(timer)
      clearTimeout(maxTime)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black z-[10000] flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-sm mb-4 font-mono"
            >
              {Math.min(progress, 100)}% LOADING...
            </motion.div>
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
