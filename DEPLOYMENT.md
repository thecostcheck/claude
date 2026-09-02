# Deployment Guide — The Cost Check

## Quick Start

This guide covers setting up **The Cost Check** on Vercel with GitHub integration, domain configuration, and environment secrets.

---

## Prerequisites

- [ ] GitHub repository pushed (main branch)
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] Domain ownership (thecostcheck.com)
- [ ] SMTP credentials ready (Gmail App Password, SendGrid, etc.)
- [ ] GoDaddy or domain registrar access (for DNS)

---

## Step 1: GitHub Repository Setup

1. **Verify code is ready:**
   ```bash
   cd claude
   git status
   git log --oneline | head -5
   ```
   Ensure you're on `main` branch and all changes are committed.

2. **Double-check `.gitignore` includes `.env.local`:**
   ```bash
   cat .gitignore | grep env
   ```
   Should output: `.env.local`

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```
   Verify on [github.com/thecostcheck/claude](https://github.com/thecostcheck/claude) that files are present.

---

## Step 2: Connect Repository to Vercel

1. **Go to Vercel Dashboard:**
   - Log in to [vercel.com](https://vercel.com)
   - Click **"Add New..."** → **"Project"**

2. **Import GitHub Repository:**
   - Select **GitHub**
   - Authorize Vercel to access your GitHub account (if prompted)
   - Find and click **`thecostcheck/claude`**
   - Click **"Import"**

3. **Configure Project Settings:**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)
   - Leave other settings as default
   - Click **"Deploy"**

   Vercel will now build and deploy the project. Initial deployment may take 2-3 minutes.

---

## Step 3: Add Environment Variables

1. **In Vercel Dashboard**, go to **Settings** → **Environment Variables**

2. **Add the following variables** (these must match `.env.local.example`):

   | Variable | Value | Visibility | Notes |
   |----------|-------|------------|-------|
   | `SMTP_HOST` | `smtp.gmail.com` (or your SMTP host) | Secret | |
   | `SMTP_PORT` | `587` | Secret | Use 465 for SSL |
   | `SMTP_USER` | `your-email@gmail.com` | Secret | Sender email |
   | `SMTP_PASSWORD` | (Gmail App Password or SMTP password) | Secret | **Never use your Gmail password** |
   | `FORM_SUBMISSION_EMAIL` | `lead@thecostcheck.com` | Secret | Destination for leads |
   | `NEXT_PUBLIC_GA_ID` | `G_XXXXXXXXXX` | Public | Google Analytics (optional) |

3. **For each variable:**
   - Click **"Add New"**
   - Enter **Name** and **Value**
   - Select **Environments**: `Production`, `Preview`, `Development`
   - Click **"Save"**

4. **Redeploy to apply changes:**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **"Redeploy"**
   - Wait for build to complete

---

## Step 4: Verify Email Setup

### Using Gmail

1. **Enable App Passwords:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Sign in with your email account
   - Select **App**: Mail
   - Select **Device**: Windows/Linux/Mac
   - Generate a 16-character password
   - Copy this into `SMTP_PASSWORD` in Vercel

2. **Test Email Sending:**
   - Navigate to `https://<your-vercel-domain>/intake` or `https://thecostcheck.com/intake` (once domain is set)
   - Fill out test form and submit
   - Check Gmail inbox (or destination email) for submission confirmation

### Using SendGrid / Other SMTP

- Refer to provider documentation for SMTP credentials
- Update `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` accordingly
- Test with form submission

---

## Step 5: Configure Domain

### Add Domain in Vercel

1. **In Vercel Dashboard**, go to **Settings** → **Domains**

2. **Add Domain:**
   - Enter `thecostcheck.com`
   - Click **"Add"**
   - Vercel will provide DNS records (typically 2-3 nameserver entries)

3. **Update DNS at GoDaddy:**
   - Log in to [GoDaddy](https://www.godaddy.com)
   - Go to **Domains** → **thecostcheck.com**
   - Click **"DNS"** or **"Manage"**
   - Replace existing nameservers with Vercel's nameservers
   - Save changes
   - **Note:** DNS propagation takes 24-48 hours (sometimes faster)

4. **Verify Domain in Vercel:**
   - In Vercel Domains settings, you should see a green checkmark once DNS propagates
   - Test access: `https://thecostcheck.com`

### Optional: Add www Subdomain

- In Vercel Domains, also add `www.thecostcheck.com`
- In GoDaddy, add a CNAME record: `www → thecostcheck.com`
- Both `thecostcheck.com` and `www.thecostcheck.com` will now work

---

## Step 6: Enable Auto-Deployment

1. **In Vercel Dashboard**, go to **Settings** → **Git**

2. **Verify Production Branch:**
   - Should be set to `main`
   - Enable **"Automatically deploy when pushing to main"**

3. **Test Auto-Deploy:**
   ```bash
   echo "<!-- Test comment -->" >> app/page.tsx
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```
   - Watch Vercel dashboard; deployment should start automatically
   - Undo test change: `git revert HEAD`

---

## Step 7: Verify Everything Works

### Checklist

- [ ] Vercel deployment shows "Ready" status
- [ ] `https://thecostcheck.com` loads homepage
- [ ] `/intake` form is accessible
- [ ] File upload in form works (accepts PDF, JPG, PNG)
- [ ] Form submission sends email to destination
- [ ] WhatsApp button on all pages links to +1-336-606-6975
- [ ] Mobile view is responsive (test on phone or DevTools)
- [ ] Google Analytics loads (check browser Network tab for `analytics.js`)
- [ ] Keyboard navigation works (Tab through all links/buttons)
- [ ] No console errors (check browser DevTools)

### Test Form Submission

1. Go to `https://thecostcheck.com/intake`
2. Fill out form:
   - Name: "Test User"
   - Business Name: "Acme Corp"
   - Business Email: your email
   - Phone: (555) 123-4567
   - Business Type: "Manufacturing"
   - City/State: "Charlotte, NC"
   - Bill Category: "Telecommunications"
   - Upload: Any PDF or image
   - Comments: "Test submission"
3. Click **"Submit"**
4. Check email for lead notification

---

## Monitoring & Maintenance

### View Logs

1. **In Vercel Dashboard**, go to **Deployments**
2. Click on a deployment
3. View **Build Logs** (build-time errors) or **Function Logs** (runtime errors)

### Monitor Performance

1. **In Vercel Dashboard**, go to **Analytics**
   - View Web Vitals, traffic, error rates

2. **In Google Analytics** (if configured):
   - Go to [analytics.google.com](https://analytics.google.com)
   - View real-time visitors, page views, conversions

### Update Code

1. **Make changes locally:**
   ```bash
   # Edit files, test locally
   npm run dev
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

3. **Vercel auto-deploys** (watch dashboard)

---

## Troubleshooting

### Deployment fails with build error

- [ ] Check **Build Logs** in Vercel dashboard
- [ ] Common issues:
  - TypeScript errors: `npm run type-check` locally
  - Missing dependencies: `npm install` and verify `package.json`
  - Environment variables: Ensure all required vars are set in Vercel

### Email not sending

- [ ] Verify `SMTP_*` variables are correct in Vercel
- [ ] Check **Function Logs** in Vercel for errors
- [ ] Test SMTP credentials locally first
- [ ] Ensure `FORM_SUBMISSION_EMAIL` is not the same as `SMTP_USER`

### Domain not resolving

- [ ] Verify DNS nameservers at GoDaddy match Vercel's
- [ ] Allow 24-48 hours for propagation
- [ ] Use `nslookup` or `dig` to check DNS:
  ```bash
  nslookup thecostcheck.com
  # Should resolve to Vercel IP
  ```

### Form submission returns 500 error

- [ ] Check Vercel **Function Logs** for stack trace
- [ ] Ensure `nodemailer` is installed: `npm ls nodemailer`
- [ ] Verify environment variables are set correctly
- [ ] Test email configuration locally

---

## Rollback

If a deployment breaks production:

1. **In Vercel Dashboard**, go to **Deployments**
2. Find the last known-good deployment
3. Click **"Promote to Production"**
4. Site reverts to that version instantly
5. Fix issues locally and push again

---

## Analytics & Tracking Setup

### Google Analytics

1. Create a new GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy **Measurement ID** (format: `G_XXXXXXXXXX`)
3. Add to Vercel Environment Variables:
   ```
   NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
   ```
4. Redeploy
5. GA script will load automatically on all pages

### Vercel Analytics

- No setup required; automatically enabled
- View in Vercel Dashboard → Analytics tab
- Tracks Web Vitals (LCP, FID, CLS, FCP, TTFB)

---

## Next Steps (Phase 2)

- [ ] Integrate CRM (HubSpot, Pipedrive, etc.) for lead management
- [ ] Add document storage (Vercel Blob, AWS S3)
- [ ] Implement email workflows (lead acknowledgment, follow-ups)
- [ ] Build client portal with authentication
- [ ] Add OpenAI bill extraction and analysis

---

**Questions?** Review the main [README.md](README.md) or GitHub Issues.
