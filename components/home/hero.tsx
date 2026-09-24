// components/Hero.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Play,
  Check,
  Lightbulb,
  X,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { getActiveHeroContent, type HeroDataWithStats } from '@/actions/home/hero'
import { submitConsultationForm } from '@/actions/home/navbar'

interface HeroProps {
  initialData: HeroDataWithStats
}

const Hero: React.FC<HeroProps> = ({ initialData }) => {
  const [heroData, setHeroData] = useState<HeroDataWithStats>(initialData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // ====== Consultation Modal States ======
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })

  // ====== Background refresh (hero content) ======
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
      } catch (err) {
        console.error('Background refresh error:', err)
      } finally {
        setIsRefreshing(false)
      }
    }

    const intervalId = setInterval(fetchLatestContent, 30000)
    return () => clearInterval(intervalId)
  }, [heroData])

  // ====== Modal open/close ======
  const openConsultation = () => {
    setSuccess(null)
    setError(null)
    setIsConsultationOpen(true)
  }

  const closeConsultation = () => {
    setIsConsultationOpen(false)
    setSuccess(null)
    setError(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    })
  }

  // ====== Escape key + body scroll lock ======
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeConsultation()
    }

    if (isConsultationOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isConsultationOpen])

  // ====== Form handlers ======
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('phone', formData.phone)
      formDataObj.append('company', formData.company)
      formDataObj.append('service', formData.service)
      formDataObj.append('message', formData.message)

      const result = await submitConsultationForm(formDataObj)

      if (result.success) {
        setSuccess(result.message)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        })
        setTimeout(() => closeConsultation(), 3000)
      } else {
        setError(result.message)
        setTimeout(() => setError(null), 5000)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setTimeout(() => setError(null), 5000)
    } finally {
      setLoading(false)
    }
  }

  const {
    heroHeading,
    heroSubHeading,
    heroShortDescription,
    heroImage,
    stats,
    blog,
  } = heroData

  return (
    <>
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
            <div
              className={`transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
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
                {heroShortDescription ||
                  'Custom software, web & mobile solutions to transform your ideas into powerful digital products.'}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3 rounded-md hover:bg-[#1a1a1a] transition-colors duration-200 text-sm sm:text-base cursor-pointer"
                >
                  Book a Free Consultation
                  <ArrowRight size={18} className="inline-block" aria-hidden="true" />
                </button>

                {blog ? (
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Read Our Blog
                    <ArrowRight size={18} className="inline-block" aria-hidden="true" />
                  </Link>
                ) : (
                  <></>
                  // <button className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base">
                  //   View Our Work
                  //   <Play size={18} className="inline-block" aria-hidden="true" />
                  // </button>
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

              {blog && (
                <div className="mt-4 text-sm text-gray-400">
                  Featured:{' '}
                  <span className="font-medium text-gray-600">{blog.title}</span>
                </div>
              )}
            </div>

            {/* Right Column - Image with Floating Badges */}
            <div
              className={`relative w-full transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
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

              {/* Floating Badge 1 */}
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

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:bottom-6 md:right-6 bg-white rounded-xl shadow-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Lightbulb size={16} className="sm:w-5 sm:h-5 text-[#0a0a0a]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#0a0a0a]">
                    {blog
                      ? `Read: ${blog.title.substring(0, 20)}...`
                      : 'Turning Ideas into Impact'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONSULTATION MODAL
      ===================================================== */}
      <AnimatePresence>
        {isConsultationOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeConsultation}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#0a0a0a] text-white px-6 sm:px-8 py-7">
                <button
                  type="button"
                  onClick={closeConsultation}
                  className="absolute right-5 top-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close consultation popup"
                >
                  <X size={20} />
                </button>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Let&apos;s Talk
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Book a Free Consultation
                </h2>

                <p className="mt-2 text-sm text-gray-400 max-w-lg">
                  Tell us about your project and our team will get back to you to
                  discuss the best solution.
                </p>
              </div>

              {/* Form */}
              <form className="p-6 sm:p-8" onSubmit={handleSubmit}>
                {success && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                )}
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      disabled={loading}
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      disabled={loading}
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      disabled={loading}
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none focus:border-black focus:ring-1 focus:ring-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    What do you need? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile App Development</option>
                    <option value="software-development">
                      Custom Software Development
                    </option>
                    <option value="it-consulting">IT Consulting & Strategy</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Tell us about your project{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Briefly describe your project, requirements or idea..."
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none resize-none focus:border-black focus:ring-1 focus:ring-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="mt-5 w-full h-12 bg-[#0a0a0a] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book My Free Consultation
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  No commitment. Just a conversation about your project.
                </p>
              </form>

              {/* Quick Contact */}
              <div className="border-t border-gray-100 px-6 sm:px-8 py-4 bg-gray-50">
                <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-600">
                  <a
                    href="tel:+916378695548"
                    className="flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <Phone size={15} />
                    Call Us
                  </a>

                  <a
                    href="mailto:support@sqrock.cloud"
                    className="flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <Mail size={15} />
                    Email Us
                  </a>

                  <a
                    href="https://wa.me/916378695548"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Hero