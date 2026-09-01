import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Cost Check — Business Cost Reduction & Vendor Optimization',
  description: 'Free cost reviews for businesses. Discover hidden savings in vendor contracts, subscriptions, and operational expenses. Expert analysis, no risk, no long-term commitments.',
  keywords: 'cost reduction, vendor optimization, business savings, cost analysis',
  openGraph: {
    title: 'The Cost Check — Business Cost Reduction & Vendor Optimization',
    description: 'Free cost reviews for businesses. Discover hidden savings in vendor contracts, subscriptions, and operational expenses.',
    url: 'https://thecostcheck.com',
    siteName: 'The Cost Check',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-charcoal">
        {children}
      </body>
    </html>
  )
}
