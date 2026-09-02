'use client'

import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-narrow flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-navy hover:text-charcoal transition-colors">
          The Cost Check
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-charcoal hover:text-accent transition-colors font-medium">
            Home
          </Link>
          <Link href="/services" className="text-charcoal hover:text-accent transition-colors font-medium">
            Services
          </Link>
          <Link href="/industries" className="text-charcoal hover:text-accent transition-colors font-medium">
            Industries
          </Link>
          <Link href="/pricing" className="text-charcoal hover:text-accent transition-colors font-medium">
            Pricing
          </Link>
          <Link href="/about" className="text-charcoal hover:text-accent transition-colors font-medium">
            About
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/13366066975?text=Hi%20The%20Cost%20Check%20team%21%20I%27d%20like%20to%20schedule%20a%20free%20cost%20review."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border-2 border-accent text-accent rounded font-semibold hover:bg-accent hover:text-white transition-all"
          >
            WhatsApp
          </a>
          <Link href="/intake" className="cta-primary">
            Start With One Bill
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-charcoal text-2xl font-bold"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          <div className="container-narrow py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-charcoal hover:text-accent transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-charcoal hover:text-accent transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/industries"
              className="text-charcoal hover:text-accent transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Industries
            </Link>
            <Link
              href="/pricing"
              className="text-charcoal hover:text-accent transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-charcoal hover:text-accent transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <hr className="my-2" />
            <a
              href="https://wa.me/13366066975?text=Hi%20The%20Cost%20Check%20team%21%20I%27d%20like%20to%20schedule%20a%20free%20cost%20review."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-accent text-accent rounded font-semibold hover:bg-accent hover:text-white transition-all text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              WhatsApp Us
            </a>
            <Link
              href="/intake"
              className="cta-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start With One Bill
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
