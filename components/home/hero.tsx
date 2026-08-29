// components/Hero.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, Check, Lightbulb } from 'lucide-react'
import { getActiveHeroContent, type HeroDataWithStats } from '@/actions/home/hero'

interface HeroProps {
  initialData: HeroDataWithStats
}

const Hero: React.FC<HeroProps> = ({ initialData }) => {
  const [heroData, setHeroData] = useState<HeroDataWithStats>(initialData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Background me fresh data fetch karo (automatic update)
  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        setIsRefreshing(true)
        const freshData = await getActiveHeroContent()
        
        if (JSON.stringify(freshData) !== JSON.stringify(heroData)) {
          setIsVisible(false)
          setTimeout(() => {
            setHeroData(freshData)
            setIsVisible(true)
          }, 200)
        }
      } catch (error) {
        console.error('Background refresh error:', error)
      } finally {
        setIsRefreshing(false)
      }
    }

    const intervalId = setInterval(fetchLatestContent, 30000)
    return () => clearInterval(intervalId)
  }, [heroData])

  const { heroHeading, heroSubHeading, heroShortDescription, heroImage, stats, blog } = heroData

  return (
    <section className="py-16 md:py-24 relative">
      {/* Background refresh indicator */}
      {isRefreshing && (
        <div className="fixed top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 text-xs text-gray-500 z-50 flex items-center gap-2">
          <span className="animate-spin">⟳</span>
          Updating...
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Eyebrow Tag */}
            <div className="bg-gray-100 rounded-full px-4 py-1 inline-block mb-6">
              <span className="text-xs font-bold text-gray-600 tracking-wider uppercase">
                {heroSubHeading || 'SOFTWARE • IDEAS • GROWTH'}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0a0a0a] leading-tight mb-6">
              {heroHeading}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg">
              {heroShortDescription || 'Custom software, web & mobile solutions to transform your ideas into powerful digital products.'}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3 rounded-md hover:bg-[#1a1a1a] transition-colors duration-200 text-sm sm:text-base">
                Book a Free Consultation
                <ArrowRight size={18} className="inline-block" aria-hidden="true" />
              </button>
              
              {/* Read More Button - Only shows if blog exists */}
              {blog ? (
                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
                >
                  Read Our Blog
                  <ArrowRight size={18} className="inline-block" aria-hidden="true" />
                </Link>
              ) : (
                <button className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base">
                  View Our Work
                  <Play size={18} className="inline-block" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-500 font-medium">
              {stats && (
                <>
                  <span className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" aria-hidden="true" />
                    {stats.happyClients}+ Happy Clients
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" aria-hidden="true" />
                    {stats.projectsDelivered}+ Projects
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" aria-hidden="true" />
                    {stats.yearsExperience}+ Years Experience
                  </span>
                </>
              )}
            </div>

            {/* Optional: Show blog title if linked */}
            {blog && (
              <div className="mt-4 text-sm text-gray-400">
                Featured: <span className="font-medium text-gray-600">{blog.title}</span>
              </div>
            )}
          </div>

          {/* Right Column - Image with Floating Badges */}
          <div className={`relative w-full transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Main Image Container */}
            <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <Image
                  src={heroImage || '/heroimg.png'}
                  alt="Hero Laptop"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Floating Badge 1 - Top Right */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:top-6 md:right-6 bg-white rounded-full shadow-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 border-2 border-white" />
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-400 border-2 border-white" />
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-500 border-2 border-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#0a0a0a]">
                  {stats?.happyClients || 250}+ Happy Clients
                </p>
              </div>
            </div>

            {/* Floating Badge 2 - Bottom Right */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:bottom-6 md:right-6 bg-white rounded-xl shadow-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Lightbulb size={16} className="sm:w-5 sm:h-5 text-[#0a0a0a]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#0a0a0a]">
                  {blog ? `Read: ${blog.title.substring(0, 20)}...` : 'Turning Ideas into Impact'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero