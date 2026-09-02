# The Cost Check — Business Cost Reduction & Vendor Optimization

**thecostcheck.com** — A premium, responsive marketing website for cost-reduction consulting services.

## Overview

This is **Phase 1: Launch Website** of The Cost Check platform. It delivers a clean, professional marketing site with a one-bill intake form, WhatsApp integration, and analytics tracking.

### What's Built (Phase 1)

- ✅ Responsive marketing site (homepage, services, industries, pricing, about, legal pages)
- ✅ One-bill intake form (collects name, business info, bill category, one document upload, optional comments)
- ✅ Email submission pipeline (nodemailer integration → lead notifications)
- ✅ WhatsApp CTA button/widget on every page (links to +1-336-606-6975)
- ✅ Vercel Analytics & Google Analytics ready
- ✅ Mobile-first design with immediate CTA visibility
- ✅ WCAG accessibility (contrast, keyboard nav, alt text, readable fonts)
- ✅ Legal pages (Privacy Policy, Terms of Service) with 'Nanuk Connect Solution LLC d/b/a The Cost Check'

### What's Stubbed / Out of Scope (Phase 2+)

- ❌ Client portal, authenticated login, document dashboard
- ❌ Database / CRM / automation workflows (Make, Dext, OpenAI extraction)
- ❌ Savings ledger, verification tracking, client-facing analytics
- ❌ Fabricated case studies, testimonials, or savings calculator with assumed percentages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Nodemailer (SMTP)
- **Analytics**: Vercel Analytics + Google Analytics (optional)
- **Deployment**: Vercel
- **Repository**: GitHub (private)

## Project Structure

```
thecostcheck/
├── app/
│   ├── layout.tsx          # Root layout with metadata (Next.js Metadata API)
│   ├── globals.css         # Tailwind directives + utility classes
│   ├── page.tsx            # Homepage (placeholder)
│   ├── intake/
│   │   └── page.tsx        # One-bill intake form
│   ├── services/
│   │   └── page.tsx        # Services page
│   ├── industries/
│   │   └── page.tsx        # Industries page
│   ├── pricing/
│   │   └── page.tsx        # Pricing page
│   ├── about/
│   │   └── page.tsx        # About/Founder page
│   ├── privacy/
│   │   └── page.tsx        # Privacy Policy
│   ├── terms/
│   │   └── page.tsx        # Terms of Service
│   └── api/
│       └── intake/
│           └── route.ts    # Form submission API endpoint
├── components/
│   ├── Header.tsx          # Navigation header with WhatsApp CTA
│   ├── Footer.tsx          # Footer with legal links
│   ├── WhatsAppCTA.tsx     # WhatsApp widget/button
│   └── ...
├── lib/
│   └── email.ts            # Nodemailer setup + email sender
├── public/
│   └── ...                 # Static assets (images, icons)
├── .env.local.example      # Environment variables template
├── .gitignore              # Excludes .env.local and node_modules
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind theme (navy, charcoal, accent green)
├── postcss.config.js       # PostCSS + Autoprefixer
├── next.config.js          # Next.js config
├── package.json            # Dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- A Vercel account (for deployment)
- SMTP credentials (Gmail, SendGrid, or your email provider)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thecostcheck/claude.git
   cd claude
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your actual SMTP credentials and destination email:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-specific-password
   FORM_SUBMISSION_EMAIL=lead@thecostcheck.com
   NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX  # Optional: Google Analytics ID
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

5. **Type-check:**
   ```bash
   npm run type-check
   ```

6. **Lint:**
   ```bash
   npm run lint
   ```

## Environment Variables

**Do NOT commit `.env.local` to the repository.** It is already in `.gitignore`.

Required for form submissions:
- `SMTP_HOST` — Your SMTP server hostname (e.g., `smtp.gmail.com`)
- `SMTP_PORT` — SMTP port (typically `587` for TLS or `465` for SSL)
- `SMTP_USER` — SMTP username (your email address)
- `SMTP_PASSWORD` — SMTP password or app-specific password (never hardcoded in code)
- `FORM_SUBMISSION_EMAIL` — Destination email for intake form leads

Optional:
- `NEXT_PUBLIC_GA_ID` — Google Analytics ID (client-side tracking)

For Gmail:
1. Enable "Less secure app access" or create an [App Password](https://myaccount.google.com/apppasswords)
2. Use the app password in `SMTP_PASSWORD`

For other providers (SendGrid, Mailgun, etc.), refer to their SMTP documentation.

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   - Ensure your code is committed and pushed to `main` branch
   - Verify `.env.local` is NOT in the repository (check `.gitignore`)

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import the `thecostcheck/claude` repository
   - Select Next.js as the framework

3. **Set environment variables:**
   - In the Vercel dashboard, go to **Settings → Environment Variables**
   - Add:
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `SMTP_USER`
     - `SMTP_PASSWORD`
     - `FORM_SUBMISSION_EMAIL`
     - `NEXT_PUBLIC_GA_ID` (optional, must be marked as public)

4. **Connect domain:**
   - In Vercel dashboard, go to **Settings → Domains**
   - Add `thecostcheck.com`
   - Update DNS records at GoDaddy (Vercel will provide the nameservers)

5. **Deploy:**
   - Click "Deploy"
   - Vercel will auto-deploy on every push to `main`

### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables when prompted, or pre-configure in vercel.json
```

## Analytics

### Vercel Analytics (Built-in)
- No additional setup required; Vercel automatically tracks Web Vitals
- View in Vercel dashboard → Analytics

### Google Analytics (Optional)
1. Create a property at [analytics.google.com](https://analytics.google.com)
2. Copy your Measurement ID (format: `G_XXXXXXXXXX`)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
   ```
4. GA script will load client-side automatically

## Brand Guidelines

- ✅ **Language**: Use "Free Cost Check," "Free Review," or "potential/estimated savings" — never "audit" in CTAs
- ✅ **Savings claims**: Always qualify with "potential," "estimated," or "verified" — never guarantee outcomes
- ✅ **Vendor names**: Never name real companies (e.g., avoid "Verizon," "Comcast") — use descriptive categories instead
- ✅ **Visual style**:
  - Primary: Deep navy (`#1a3a52`) and charcoal (`#2d3e50`)
  - Accent: Subtle green (`#2ecc71`) for savings-related highlights
  - Background: White with generous whitespace
  - No gradients, cartoons, or generic AI stock imagery
  - Clean, readable typography; high contrast for accessibility

## WhatsApp Integration

Every page includes a WhatsApp CTA linking to `+1-336-606-6975`. Users can:
- Click the WhatsApp button to initiate a chat
- Be redirected to WhatsApp Web or mobile app (if installed)

Implementation is in `components/WhatsAppCTA.tsx`.

## Form Submission Flow

1. User fills out one-bill intake form at `/intake`
2. Form validates required fields and file upload
3. On submit, data POSTs to `/api/intake`
4. API endpoint (route.ts) sends email via nodemailer
5. User sees success/error message
6. Lead email arrives at `FORM_SUBMISSION_EMAIL`

**File upload:** Supports PDF, JPG, JPEG, PNG. Files are not persisted to disk in Phase 1; they're passed to the email (or can be stored in Phase 2 via S3/Vercel Blob).

## Legal Entity

All legal pages (Privacy Policy, Terms of Service) reference:
- **Legal Name**: Nanuk Connect Solution LLC
- **DBA**: The Cost Check
- **Website**: thecostcheck.com

Update footer and legal page footers accordingly.

## Testing

### Email Testing
During development, use a test SMTP account or service:
- [Mailtrap](https://mailtrap.io) — Free tier with inbox
- [MailHog](https://github.com/mailhog/MailHog) — Local testing
- Gmail App Password

### Form Testing
1. Navigate to `/intake`
2. Fill out form with test data
3. Upload a small PDF/image
4. Submit
5. Check terminal logs for success message or errors
6. Verify email in inbox (or Mailtrap)

### Accessibility Testing
- Keyboard navigation: Tab through all interactive elements
- Screen reader: Test with NVDA (Windows) or VoiceOver (Mac)
- Contrast: Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Mobile: Test on device or Chrome DevTools mobile emulation

## Troubleshooting

### Email not sending
- Verify `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` in `.env.local`
- Check browser console and terminal logs for errors
- Ensure SMTP credentials are correct (test with a mail client first)
- If using Gmail, ensure App Password is enabled and used (not your Gmail password)

### Form validation errors
- Ensure required fields are filled (name, business email, phone, bill category)
- File must be ≤5MB and one of: PDF, JPG, JPEG, PNG
- Check browser console for specific error messages

### Deployment issues
- Verify environment variables are set in Vercel dashboard
- Check Vercel build logs for TypeScript or build errors
- Ensure default branch is `main`

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit with clear messages: `git commit -m "Add feature X"`
3. Push and open a pull request
4. Await review before merging to `main`

## Roadmap (Phase 2+)

- Client portal with login and document dashboard
- CRM integration and lead scoring
- Automation workflows (Make, Dext, OpenAI bill extraction)
- Savings verification and reporting
- Payment processing and invoice management
- Advanced analytics and ROI tracking

## Support

For issues or questions:
- Check this README first
- Review the GitHub Issues tab
- Contact the development team

## License

Private repository. All rights reserved by Nanuk Connect Solution LLC d/b/a The Cost Check.

---

**Last Updated**: September 2026  
**Maintained by**: The Cost Check Development Team
