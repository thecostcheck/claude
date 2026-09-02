'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <WhatsAppCTA />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-navy to-charcoal text-white py-20 md:py-32">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Hidden Savings in Your Business Bills
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We analyze your vendor contracts and subscriptions to uncover estimated savings. Free cost reviews. No long-term commitments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/intake"
                className="px-8 py-4 bg-accent text-white rounded font-bold text-lg hover:bg-opacity-90 transition-all inline-block"
              >
                Start With One Bill
              </Link>
              <a
                href="https://wa.me/13366066975?text=Hi%20The%20Cost%20Check%20team%21%20I%27d%20like%20to%20schedule%20a%20free%20cost%20review."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white text-white rounded font-bold text-lg hover:bg-white hover:text-navy transition-all inline-block"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-narrow">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">The Problem</h2>
              <p className="text-gray-700 text-lg mb-4">
                Most businesses are overpaying for vendors, SaaS subscriptions, and service contracts. Renewal notices pile up. Contract terms blur together. Nobody has time to negotiate.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Meanwhile, your competitors are quietly optimizing. We help you catch up—and get ahead.
              </p>
              <p className="text-gray-700 text-lg">
                The Cost Check finds potential savings you didn't know existed.
              </p>
            </div>
          </div>
        </section>

        {/* What We Check Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">What We Check</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Telecommunications',
                  description: 'Phone, internet, and connectivity service agreements',
                },
                {
                  title: 'Software & SaaS',
                  description: 'Subscriptions, licensing, and cloud service contracts',
                },
                {
                  title: 'Utilities & Facilities',
                  description: 'Electric, gas, waste, and facility management agreements',
                },
                {
                  title: 'Insurance & Compliance',
                  description: 'Business insurance policies and vendor coverage plans',
                },
                {
                  title: 'Logistics & Shipping',
                  description: 'Carrier contracts, freight, and shipping service terms',
                },
                {
                  title: 'Office & Operations',
                  description: 'Supply contracts, maintenance, and support agreements',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">We Serve These Industries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                'Manufacturing',
                'Healthcare & Wellness',
                'Retail & E-Commerce',
                'Financial Services',
                'Professional Services',
                'Technology & Software',
                'Logistics & Distribution',
                'Education & Training',
                'Hospitality & Food Service',
              ].map((industry) => (
                <div key={industry} className="p-4 bg-gray-50 rounded-lg text-center border border-gray-200">
                  <p className="text-charcoal font-semibold">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Submit Your Bill',
                  description: 'Upload one bill or contract. Include your phone number and basic business info.',
                },
                {
                  step: '2',
                  title: 'We Analyze',
                  description: 'Our team reviews your document and identifies potential savings opportunities.',
                },
                {
                  step: '3',
                  title: 'Discover Savings',
                  description: 'We share verified savings and a path to optimize your contract or find alternatives.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* No-BS Trust Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">No Nonsense. Just Real Savings.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                  <span className="text-accent text-3xl">✓</span> No Hidden Fees
                </h3>
                <p className="text-gray-600">
                  We don't charge you for the review. No setup fees. No subscriptions. No surprise costs.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                  <span className="text-accent text-3xl">✓</span> No Contracts
                </h3>
                <p className="text-gray-600">
                  Work with us on a per-bill basis. No long-term commitments. Cancel anytime.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                  <span className="text-accent text-3xl">✓</span> Transparent Process
                </h3>
                <p className="text-gray-600">
                  We show you exactly what we found and how we calculated potential savings.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                  <span className="text-accent text-3xl">✓</span> You Stay in Control
                </h3>
                <p className="text-gray-600">
                  We recommend actions. You decide. We never negotiate or change contracts without your approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-narrow">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Meet the Founder</h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Your Cost Optimization Expert</h3>
                <p className="text-gray-600 mb-4">
                  Years of vendor negotiation experience. Obsessed with finding savings that companies don't know exist.
                </p>
                <p className="text-gray-600">
                  The Cost Check was built to solve a real problem: businesses losing thousands every year to contracts they never thought to question.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-navy text-white py-16 md:py-24">
          <div className="container-narrow text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Costs?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Start with one bill. Let us show you what potential savings look like. It's free, fast, and completely confidential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/intake"
                className="px-8 py-4 bg-accent text-white rounded font-bold text-lg hover:bg-opacity-90 transition-all inline-block"
              >
                Start With One Bill
              </Link>
              <a
                href="https://wa.me/13366066975?text=Hi%20The%20Cost%20Check%20team%21%20I%27d%20like%20to%20schedule%20a%20free%20cost%20review."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white text-white rounded font-bold text-lg hover:bg-white hover:text-navy transition-all inline-block"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
