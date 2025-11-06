# Vercel Environment Variables Setup

## Issue: Emails Not Sending on Vercel

If emails are not being sent on your Vercel deployment, it's likely because the required environment variables are not configured.

## Required Environment Variables

You **MUST** set these environment variables in your Vercel project:

### 1. RESEND_API_KEY (REQUIRED)
- **What it is**: Your Resend API key for sending emails
- **How to get it**: 
  1. Go to [Resend Dashboard](https://resend.com/api-keys)
  2. Sign in or create an account
  3. Create a new API key
  4. Copy the key (it starts with `re_`)

### 2. EMAIL_FROM (Optional but Recommended)
- **Default**: `VerifyCheck <onboarding@resend.dev>`
- **Recommended**: `VerifyCheck <contact@verifycheck.in>` (if you have a verified domain)
- **Format**: `Display Name <email@domain.com>`

### 3. EMAIL_TO (Optional)
- **Default**: `verifykart2@gmail.com`
- **What it is**: The email address where lead notifications will be sent

## How to Set Environment Variables in Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (e.g., `re_xxxxxxxxxxxxx`)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**
5. **IMPORTANT**: After adding/updating environment variables, you **MUST** redeploy your application:
   - Go to **Deployments** tab
   - Click the **⋯** (three dots) on the latest deployment
   - Click **Redeploy**

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Set environment variables
vercel env add RESEND_API_KEY production
vercel env add RESEND_API_KEY preview
vercel env add RESEND_API_KEY development

# Optional: Set email configuration
vercel env add EMAIL_FROM production
vercel env add EMAIL_TO production

# Redeploy
vercel --prod
```

## Verify Your Setup

After setting the environment variables and redeploying:

1. **Test Environment Variables (Diagnostic Endpoint)**:
   - Visit: `https://your-domain.vercel.app/api/test-email-config`
   - This will show you if `RESEND_API_KEY` is properly configured
   - In production, add `?secret=your-secret` if you set `DIAGNOSTIC_SECRET`

2. **Check Vercel Logs**:
   - Go to your Vercel project → **Deployments** → Click on a deployment → **Functions** tab
   - Look for logs when a form is submitted
   - You should see: `✓ Creating Resend client with API key: re_...`
   - If you see: `=== RESEND_API_KEY MISSING ===`, the variable is not set correctly
   - Check the error details in the logs

3. **Test Email Sending**:
   - Submit a test form on your live site
   - Check Vercel function logs for email sending status
   - Look for: `Email sent successfully via Resend:`
   - Check your email inbox (verifykart2@gmail.com)

4. **Check Resend Dashboard**:
   - Go to [Resend Dashboard](https://resend.com/emails)
   - You should see sent emails and their delivery status
   - If emails aren't showing up, the API key might be invalid

## Common Issues

### Issue: "RESEND_API_KEY environment variable is required"
**Solution**: The environment variable is not set in Vercel. Follow the setup steps above.

### Issue: "Invalid RESEND_API_KEY format"
**Solution**: Make sure your API key starts with `re_`. Get a new key from Resend if needed.

### Issue: Emails sent but not received
**Solution**: 
- Check Resend dashboard for delivery status
- Check spam folder
- Verify EMAIL_TO is set correctly
- Make sure your Resend account is not in test mode

### Issue: Environment variables set but still not working
**Solution**: 
- **Redeploy your application** after setting environment variables
- Environment variables are only available after a new deployment
- Make sure you selected the correct environment (Production/Preview/Development)
- Check Vercel logs to see the actual error message
- Visit `/api/test-email-config` to verify environment variables are loaded

### Issue: Works locally but not on Vercel
**Solution**:
- Local `.env.local` file doesn't sync to Vercel automatically
- You **must** manually add environment variables in Vercel dashboard
- After adding, **redeploy** your application
- Check Vercel function logs for detailed error messages
- The diagnostic endpoint will show what environment variables are available

## Getting a Resend API Key

1. Visit [https://resend.com](https://resend.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Give it a name (e.g., "VerifyCheck Production")
6. Copy the key (you'll only see it once!)
7. Paste it into Vercel environment variables

## Security Notes

- ⚠️ **Never commit API keys to Git**
- ✅ Always use environment variables
- ✅ The hardcoded fallback key has been removed for security
- ✅ API keys are now required and validated

## Next Steps

1. Set `RESEND_API_KEY` in Vercel
2. Optionally set `EMAIL_FROM` and `EMAIL_TO`
3. Redeploy your application
4. Test form submission
5. Check Vercel logs and Resend dashboard

