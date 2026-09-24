'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { submitCTAForm } from '@/actions/home/cta'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  description: '',
}

export default function CTA() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target
    setFormData((current) => ({ ...current, [id]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    const payload = new FormData()
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value))

    try {
      const result = await submitCTAForm(payload)
      if (result.success) {
        setSuccess(result.message)
        setFormData(initialFormData)
      } else {
        setError(result.message)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#0F0F10] py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30"
        style={{
          background:
            'radial-gradient(circle at 14% 30%, rgba(239,43,45,.22), transparent 34%), radial-gradient(circle at 85% 70%, rgba(239,43,45,.16), transparent 30%), linear-gradient(135deg, #0F0F10 0%, #161313 52%, #0F0F10 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-20 h-72 opacity-80"
        style={{
          clipPath:
            'polygon(0 100%, 0 72%, 15% 42%, 28% 70%, 42% 24%, 55% 66%, 68% 36%, 81% 68%, 100% 28%, 100% 100%)',
          background: 'linear-gradient(180deg, rgba(239,43,45,.28), rgba(15,15,16,.96) 82%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-20 lg:px-10">
        <div className="reveal-up">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#EF2B2D]">Start a Conversation</span>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            Ready to Start Your Project?
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
            Get a free consultation and let&apos;s discuss how we can help your business grow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#quote-form"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#EF2B2D] px-6 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(239,43,45,.25)] transition duration-300 hover:-translate-y-1 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F10]"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-white/55">
            <span className="h-2 w-2 rounded-full bg-[#EF2B2D] shadow-[0_0_16px_#EF2B2D]" />
            No commitment. Just a practical conversation about your project.
          </div>
        </div>

        <div id="quote-form" className="reveal-up reveal-delay-2 scroll-mt-28 rounded-[24px] border border-white/15 bg-white/[0.07] p-5 shadow-[0_35px_90px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-7 lg:p-8">
          <div className="mb-7">
            <h3 className="text-2xl font-semibold text-white">Tell us what you need</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">Share a few details and we will respond with the right next step.</p>
          </div>

          {success && (
            <div role="status" className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-medium text-white/65">
              Full Name
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Your name"
                className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#EF2B2D] focus:ring-2 focus:ring-[#EF2B2D]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <label className="grid gap-2 text-xs font-medium text-white/65">
              Email Address
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="you@company.com"
                className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#EF2B2D] focus:ring-2 focus:ring-[#EF2B2D]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <label className="grid gap-2 text-xs font-medium text-white/65">
              Phone Number
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="+91 XXXXX XXXXX"
                className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#EF2B2D] focus:ring-2 focus:ring-[#EF2B2D]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <label className="grid gap-2 text-xs font-medium text-white/65">
              Company
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                disabled={loading}
                placeholder="Company name"
                className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#EF2B2D] focus:ring-2 focus:ring-[#EF2B2D]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <label className="grid gap-2 text-xs font-medium text-white/65 sm:col-span-2">
              Project Details
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Briefly describe your project, goals, or idea..."
                className="min-h-36 resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-[#EF2B2D] focus:ring-2 focus:ring-[#EF2B2D]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-[#EF2B2D] px-6 text-sm font-semibold text-white transition duration-300 hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
