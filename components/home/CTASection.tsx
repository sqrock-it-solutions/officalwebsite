// components/CTA.tsx
'use client'

import React, { useState } from 'react'
import { Check, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { submitCTAForm } from '@/actions/home/cta'

const CTA: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
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
      formDataObj.append('description', formData.description)

      const result = await submitCTAForm(formDataObj)

      if (result.success) {
        setSuccess(result.message)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          description: '',
        })
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
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column - Text & Benefits */}
          <div>
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase block mb-4">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Ready to Turn Your Idea into Reality?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Book a free consultation and get expert advice for your business.
            </p>
            
            {/* Benefits Checklist */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-300 font-medium">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-white" />
                Free Consultation
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-white" />
                No Obligation
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-white" />
                Quick Response
              </span>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {/* Success/Error Messages */}
            {success && (
              <div className="mb-4 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-start gap-3 animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <p className="text-sm text-green-300">{success}</p>
              </div>
            )}
            {error && (
              <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder-gray-500 w-full"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder-gray-500 w-full"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder-gray-500 w-full"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder-gray-500 w-full"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Row 3: Textarea */}
              <div>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder-gray-500 w-full min-h-[120px] resize-y"
                  required
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#0a0a0a] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get a Free Quote
                    <ArrowRight size={18} className="inline-block" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA