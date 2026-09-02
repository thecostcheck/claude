import { NextRequest, NextResponse } from 'next/server'
import { sendFormSubmissionEmail, FormSubmissionData } from '@/lib/email'

interface RequestBody {
  name: string
  businessName: string
  businessEmail: string
  phone: string
  businessType: string
  city: string
  state: string
  billCategory: string
  comments?: string
  fileName: string
  fileBase64: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      )
    }

    // Parse request body
    const body: RequestBody = await request.json()

    // Validate required fields
    if (
      !body.name ||
      !body.businessName ||
      !body.businessEmail ||
      !body.phone ||
      !body.businessType ||
      !body.city ||
      !body.state ||
      !body.billCategory ||
      !body.fileName ||
      !body.fileBase64
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.businessEmail)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Prepare submission data for email
    const submissionData: FormSubmissionData = {
      name: body.name,
      businessName: body.businessName,
      businessEmail: body.businessEmail,
      phone: body.phone,
      businessType: body.businessType,
      city: body.city,
      state: body.state,
      billCategory: body.billCategory,
      comments: body.comments || '',
      fileName: body.fileName,
    }

    // Send email
    const emailResult = await sendFormSubmissionEmail(submissionData)

    if (!emailResult.success) {
      return NextResponse.json(
        { message: 'Failed to process submission' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json(
      {
        message: 'Submission received successfully',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Intake API error:', error)
    return NextResponse.json(
      {
        message: 'An error occurred while processing your submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
