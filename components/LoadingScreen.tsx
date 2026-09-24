'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsComplete(true), 700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0F0F10] px-6"
        >
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF2B2D]/20 blur-[90px]" />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <p className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">SQROCK</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/45">IT Solutions</p>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              className="mt-7 h-1 w-44 origin-left rounded-full bg-[#EF2B2D] sm:w-56"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
