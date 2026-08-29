// components/ContactDetailsForm.tsx
'use client'

import React, { useState } from 'react'
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { 
  FiLinkedin as Linkedin, 
  FiInstagram as Instagram,
  FiGithub as Github,
  FiYoutube as Youtube 
} from 'react-icons/fi'
import { submitContactForm } from '@/app/contact/actions'

const ContactDetailsForm = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Clear previous messages
    setSuccess(null)
    setError(null)
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('phone', formData.phone)
      formDataObj.append('subject', formData.subject)
      formDataObj.append('description', formData.description)

      const result = await submitContactForm(formDataObj)

      if (result.success) {
        setSuccess(result.message)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          description: '',
        })
        // Auto hide success after 5 seconds
        setTimeout(() => setSuccess(null), 5000)
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column - Contact Information */}
        <div className="lg:col-span-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-8">
            Contact Information
          </h2>

          {/* Cards Container */}
          <div className="space-y-4">
            {/* Card 1 - Location */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0a0a0a] text-base mb-1">Our Location</p>
                <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line">
                  123 Innovation Drive, Tech Park
                  Jaipur, Rajasthan 302017, India
                </p>
              </div>
            </div>

            {/* Card 2 - Email */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0a0a0a] text-base mb-1">Email Us</p>
                <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line">
                  hello@sqrock.cloud
                  support@sqrock.cloud
                </p>
              </div>
            </div>

            {/* Card 3 - Phone */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0a0a0a] text-base mb-1">Call Us</p>
                <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line">
                  +91 98765 43210
                  +91 87654 32109
                </p>
              </div>
            </div>

            {/* Card 4 - Business Hours */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0a0a0a] text-base mb-1">Business Hours</p>
                <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line">
                  Mon - Sat: 9:00 AM - 7:00 PM
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Card 5 - Socials */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#0a0a0a] text-base mb-1">Follow Us</p>
                <div className="flex gap-4 text-gray-700 hover:text-black mt-2">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="hover:text-[#0a0a0a] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="hover:text-[#0a0a0a] transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="hover:text-[#0a0a0a] transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="hover:text-[#0a0a0a] transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-7">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-8">
            Send Us a Message
          </h2>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Row 1 - Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-[#0a0a0a] mb-2 block"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#0a0a0a] mb-2 block"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Row 2 - Phone & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-[#0a0a0a] mb-2 block"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-[#0a0a0a] mb-2 block"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Row 3 - Message */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-[#0a0a0a] mb-2 block"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your project or requirement..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[160px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition resize-y"
                  required
                  disabled={loading}
                ></textarea>
              </div>

              {/* Submit Area */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0a0a0a] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed mb-4"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    By submitting this form, you agree to our{' '}
                    <a
                      href="#"
                      className="underline hover:text-[#0a0a0a] transition-colors"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactDetailsForm