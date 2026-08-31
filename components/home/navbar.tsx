// components/Navbar.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ArrowRight, Phone, Mail, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { submitConsultationForm } from '@/actions/home/navbar'

interface NavLink {
  href: string
  label: string
}


const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/career', label: 'Career' },

]

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const openConsultation = () => {
    setIsMobileMenuOpen(false)
    setIsConsultationOpen(true)
    // Reset messages when opening
    setSuccess(null)
    setError(null)
  }

  const closeConsultation = () => {
    setIsConsultationOpen(false)
    setSuccess(null)
    setError(null)
    // Reset form when closing
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        // Auto close after 3 seconds
        setTimeout(() => {
          closeConsultation()
        }, 3000)
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

  // Close modal with Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeConsultation()
      }
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

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/logo.png"
                  alt="SQROCK IT Solutions"
                  width={125}
                  height={40}
                  className="h-auto w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-medium text-gray-800 hover:text-black transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <motion.button
                type="button"
                onClick={openConsultation}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-2.5 rounded-md hover:bg-[#1a1a1a] transition-colors duration-200"
              >
                Book a Free Consultation
                <ArrowRight size={18} />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-800 hover:text-black hover:bg-gray-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen ? 'Close menu' : 'Open menu'
              }
            >
              {isMobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 space-y-1.5">

            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMobileMenu}
                className="block font-medium text-gray-800 hover:text-black hover:bg-gray-50 px-3 py-2.5 rounded-md transition-colors duration-200"
              >
                {label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-2 pb-1">
              <motion.button
                type="button"
                onClick={openConsultation}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-2.5 rounded-md hover:bg-[#1a1a1a] transition-colors duration-200"
              >
                Book a Free Consultation
                <ArrowRight size={18} />
              </motion.button>
            </div>

          </div>
        </motion.div>
      </header>

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
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
                ease: 'easeOut',
              }}
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
                  Tell us about your project and our team will get back to
                  you to discuss the best solution.
                </p>
              </div>

              {/* Form */}
              <form className="p-6 sm:p-8" onSubmit={handleSubmit}>

                {/* Success/Error Messages */}
                {success && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                )}
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-fadeIn">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Name */}
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

                  {/* Email */}
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

                  {/* Phone */}
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

                  {/* Company */}
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

                {/* Service */}
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
                    <option value="web-development">
                      Web Development
                    </option>
                    <option value="mobile-development">
                      Mobile App Development
                    </option>
                    <option value="software-development">
                      Custom Software Development
                    </option>
                    <option value="it-consulting">
                      IT Consulting & Strategy
                    </option>
                    <option value="digital-marketing">
                      Digital Marketing
                    </option>
                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Tell us about your project <span className="text-red-500">*</span>
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

                {/* Submit */}
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

export default Navbar