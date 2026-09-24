'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/#process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-[70] border-b border-white/10 bg-[#0F0F10]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:px-10">
        <Link href="/" onClick={closeMenu} aria-label="SQROCK IT Solutions home" className="shrink-0">
          <Image
            src="/logo.png"
            alt="SQROCK IT Solutions"
            width={164}
            height={41}
            preload
            className="h-auto w-[138px] brightness-0 invert sm:w-[164px]"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative py-2 text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="group hidden h-11 items-center gap-2 rounded-xl bg-[#EF2B2D] px-5 text-sm font-semibold text-white transition duration-300 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F10] sm:inline-flex lg:hidden"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <Link
            href="/#contact"
            className="group hidden h-11 items-center gap-2 rounded-xl bg-[#EF2B2D] px-5 text-sm font-semibold text-white transition duration-300 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F10] lg:inline-flex"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white transition hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D] lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 bottom-0 z-[60] overflow-y-auto border-t border-white/10 bg-[#0F0F10]/98 px-5 py-7 backdrop-blur-xl sm:px-8 lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between border-b border-white/10 py-4 text-xl font-medium text-white"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-[#EF2B2D]" aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contact"
                onClick={closeMenu}
                className="mt-7 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#EF2B2D] px-6 text-sm font-semibold text-white sm:hidden"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
