import nodemailer from 'nodemailer'

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface FormSubmissionData {
  name: string
  businessName: string
  businessEmail: string
  phone: string
  businessType: string
  city: string
  state: string
  billCategory: string
  comments?: string
  fileName?: string
}

export async function sendFormSubmissionEmail(data: FormSubmissionData) {
  const destinationEmail = process.env.FORM_SUBMISSION_EMAIL

  if (!destinationEmail) {
    throw new Error('FORM_SUBMISSION_EMAIL environment variable not configured')
  }

  const emailBody = `
New Cost Check Intake Form Submission

Name: ${data.name}
Business Name: ${data.businessName}
Business Email: ${data.businessEmail}
Phone: ${data.phone}
Business Type: ${data.businessType}
City: ${data.city}
State: ${data.state}
Bill Category: ${data.billCategory}

Comments:
${data.comments || 'None provided'}

Attached File: ${data.fileName || 'None'}

---
Submitted from thecostcheck.com
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: destinationEmail,
      subject: `New Cost Check Submission: ${data.businessName}`,
      text: emailBody,
      replyTo: data.businessEmail,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}
