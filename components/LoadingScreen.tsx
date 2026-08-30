// components/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

export default function LoadingScreen({ 
  onComplete, 
  minDisplayTime = 2500 
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;
    let startProgress = 0;

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const duration = 2000; // 2 seconds for progress animation
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      setProgress(eased);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else {
        // Ensure we hit exactly 1
        setProgress(1);
        
        // Wait for min display time
        const totalElapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - totalElapsed);
        
        setTimeout(() => {
          setIsComplete(true);
          if (onComplete) onComplete();
        }, remainingTime);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [minDisplayTime, onComplete]);

  const loadingTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const dotVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Perspective grid at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-full">
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(0deg, rgba(0,0,0,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(800px) rotateX(60deg) scaleY(0.6)',
                    transformOrigin: 'bottom center',
                    maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* Side dot patterns - desktop only */}
            <div className="hidden lg:block absolute top-20 left-12">
              <div className="grid grid-cols-4 gap-4 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-gray-400" />
                ))}
              </div>
            </div>
            <div className="hidden lg:block absolute top-20 right-12">
              <div className="grid grid-cols-4 gap-4 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-gray-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto">
            {/* Small logo mark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-6"
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
            </motion.div>

            {/* Orbit container */}
            <div className="relative flex items-center justify-center mb-8">
              {/* Orbit ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="absolute"
              >
                <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
                  {/* Main orbit ring */}
                  <div className="absolute inset-0 rounded-full border border-gray-200/60" />
                  
                  {/* Inner orbit ring */}
                  <div className="absolute inset-[15%] rounded-full border border-gray-200/30" />
                  
                  {/* Orbit nodes - rotating */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                    className="absolute inset-0"
                  >
                    {/* Node 1 */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 rounded-full bg-gray-400/60" />
                    </div>
                    {/* Node 2 */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="w-2 h-2 rounded-full bg-gray-400/60" />
                    </div>
                    {/* Node 3 */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-gray-400/60" />
                    </div>
                    {/* Node 4 */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-gray-400/60" />
                    </div>
                  </motion.div>

                  {/* Counter-rotating nodes */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ 
                      duration: 25, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                    className="absolute inset-0"
                  >
                    {/* Node 5 */}
                    <div className="absolute top-[15%] left-[15%]">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400/40" />
                    </div>
                    {/* Node 6 */}
                    <div className="absolute top-[15%] right-[15%]">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400/40" />
                    </div>
                    {/* Node 7 */}
                    <div className="absolute bottom-[15%] left-[15%]">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400/40" />
                    </div>
                    {/* Node 8 */}
                    <div className="absolute bottom-[15%] right-[15%]">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400/40" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Main logo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Try to use existing logo first */}
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    {/* Using text as fallback if logo doesn't exist */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black">
                      SQROCK
                    </h1>
                  </div>
                  <p className="text-xs md:text-sm tracking-[0.35em] text-gray-600 uppercase">
                    IT SOLUTIONS
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={loadingTextVariants}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-1 mb-4"
            >
              <span className="text-sm tracking-[0.35em] text-black uppercase font-medium">
                LOADING
              </span>
              <motion.span
                variants={dotVariants}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                .
              </motion.span>
              <motion.span
                variants={dotVariants}
                transition={{ duration: 0.3, delay: 1.0 }}
              >
                .
              </motion.span>
              <motion.span
                variants={dotVariants}
                transition={{ duration: 0.3, delay: 1.1 }}
              >
                .
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="relative w-48 sm:w-64 md:w-80"
            >
              <div className="h-[2px] bg-gray-200 rounded-full overflow-visible">
                <motion.div
                  className="h-full bg-black rounded-full relative"
                  style={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.1 }}
                >
                  <motion.div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-black bg-white"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-full border border-gray-300 animate-ping" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 text-center"
            >
              <p className="text-[10px] sm:text-xs tracking-[0.25em] text-gray-500 uppercase leading-relaxed">
                BUILDING SCALABLE TECHNOLOGY SOLUTIONS
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                FOR GROWING BUSINESSES
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}