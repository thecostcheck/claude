'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppCTA from '@/components/WhatsAppCTA'

interface FormData {
  name: string
  businessName: string
  businessEmail: string
  phone: string
  businessType: string
  city: string
  state: string
  billCategory: string
  comments: string
  file: File | null
}

const BUSINESS_TYPES = [
  'Manufacturing',
  'Healthcare',
  'Retail',
  'Financial Services',
  'Professional Services',
  'Technology',
  'Logistics',
  'Education',
  'Hospitality',
  'Other',
]

const BILL_CATEGORIES = [
  'Telecommunications',
  'Software & SaaS',
  'Utilities',
  'Insurance',
  'Shipping & Logistics',
  'Office Supplies',
  'Cloud Services',
  'Other',
]

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

export default function IntakePage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    businessEmail: '',
    phone: '',
    businessType: '',
    city: '',
    state: '',
    billCategory: '',
    comments: '',
    file: null,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png']
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!validTypes.includes(file.type)) {
        setError('Please upload a PDF, JPG, or PNG file.')
        setFileName('')
        setFormData((prev) => ({
          ...prev,
          file: null,
        }))
        return
      }

      if (file.size > maxSize) {
        setError('File must be smaller than 5MB.')
        setFileName('')
        setFormData((prev) => ({
          ...prev,
          file: null,
        }))
        return
      }

      setError('')
      setFileName(file.name)
      setFormData((prev) => ({
        ...prev,
        file,
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (
      !formData.name ||
      !formData.businessName ||
      !formData.businessEmail ||
      !formData.phone ||
      !formData.businessType ||
      !formData.city ||
      !formData.state ||
      !formData.billCategory ||
      !formData.file
    ) {
      setError('Please fill out all required fields and upload a document.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.businessEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\-\(\)\s\+]+$/
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number.')
      return
    }

    setLoading(true)

    try {
      const fileBase64 = await fileToBase64(formData.file)

      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          businessName: formData.businessName,
          businessEmail: formData.businessEmail,
          phone: formData.phone,
          businessType: formData.businessType,
          city: formData.city,
          state: formData.state,
          billCategory: formData.billCategory,
          comments: formData.comments,
          fileName: formData.file.name,
          fileBase64,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit form')
      }

      setSuccess(true)
      setFormData({
        name: '',
        businessName: '',
        businessEmail: '',
        phone: '',
        businessType: '',
        city: '',
        state: '',
        billCategory: '',
        comments: '',
        file: null,
      })
      setFileName('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(',')[1]) // Remove data:application/pdf;base64, prefix
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <Header />
      <WhatsAppCTA />

      <main className="min-h-screen bg-gray-50 py-12 md:py-20">
        <div className="container-narrow max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Start Your Free Cost Review
            </h1>
            <p className="text-lg text-gray-600">
              Upload one business bill or contract. We'll analyze it and show you potential savings.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-accent p-6 mb-8 rounded">
              <h2 className="text-xl font-bold text-accent mb-2">Submission Successful! 🌟</h2>
              <p className="text-gray-700 mb-4">
                Thank you for submitting your bill. Our team will review it and reach out within 24 business hours via email or phone.
              </p>
              <p className="text-gray-600 text-sm">
                In the meantime, feel free to reach out on WhatsApp at (336) 606-6975 if you have any questions.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-accent font-semibold hover:underline"
              >
                Submit Another Bill
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded">
              <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
              <p className="text-gray-700">{error}</p>
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                />
              </div>

              {/* Business Name */}
              <div className="mb-6">
                <label htmlFor="businessName" className="block text-sm font-semibold text-navy mb-2">
                  Business Name *
                </label>
                <input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Acme Corporation"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                />
              </div>

              {/* Business Email */}
              <div className="mb-6">
                <label htmlFor="businessEmail" className="block text-sm font-semibold text-navy mb-2">
                  Business Email *
                </label>
                <input
                  id="businessEmail"
                  type="email"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  placeholder="john@acme.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                />
              </div>

              {/* Business Type */}
              <div className="mb-6">
                <label htmlFor="businessType" className="block text-sm font-semibold text-navy mb-2">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                >
                  <option value="">-- Select Business Type --</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="mb-6">
                <label htmlFor="city" className="block text-sm font-semibold text-navy mb-2">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Charlotte"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                />
              </div>

              {/* State */}
              <div className="mb-6">
                <label htmlFor="state" className="block text-sm font-semibold text-navy mb-2">
                  State *
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                >
                  <option value="">-- Select State --</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bill Category */}
              <div className="mb-6">
                <label htmlFor="billCategory" className="block text-sm font-semibold text-navy mb-2">
                  Bill Category *
                </label>
                <select
                  id="billCategory"
                  name="billCategory"
                  value={formData.billCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  required
                >
                  <option value="">-- Select Bill Category --</option>
                  {BILL_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label htmlFor="file" className="block text-sm font-semibold text-navy mb-2">
                  Upload Bill or Contract (PDF, JPG, PNG) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    required
                  />
                  <label htmlFor="file" className="cursor-pointer block">
                    <p className="text-gray-600 font-medium">
                      {fileName || 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">PDF, JPG, or PNG (max 5MB)</p>
                  </label>
                </div>
              </div>

              {/* Comments */}
              <div className="mb-8">
                <label htmlFor="comments" className="block text-sm font-semibold text-navy mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Any details that might help us analyze your bill..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-accent text-white rounded font-bold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Your Bill'}
              </button>

              <p className="text-center text-gray-600 text-sm mt-6">
                * Required fields. We'll review your submission and contact you within 24 business hours.
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
