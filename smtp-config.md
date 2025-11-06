# Email Configuration for VerifyCheck

## Resend Email Service

We use [Resend](https://resend.com) for reliable email delivery.

### Environment Variables

**⚠️ IMPORTANT**: You **MUST** set these environment variables in your Vercel deployment. The API key is no longer hardcoded for security reasons.

Add these environment variables to your Vercel deployment:

```env
# Resend API Key (REQUIRED - Get from https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# Email Configuration (Optional - has defaults)
EMAIL_FROM=VerifyCheck <onboarding@resend.dev>
EMAIL_TO=verifykart2@gmail.com
```

**How to set in Vercel:**
1. Go to your Vercel project → Settings → Environment Variables
2. Add `RESEND_API_KEY` with your Resend API key
3. **Redeploy** your application after adding environment variables

See `VERCEL_SETUP.md` for detailed instructions.

### Setting Up Custom Domain (Optional)

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your verified domain (e.g., `verifycheck.in`)
3. Update `EMAIL_FROM` to use your domain: `VerifyCheck <contact@verifycheck.in>`

### Current Setup

- **Provider**: Resend
- **API Key**: Configured
- **From Email**: `onboarding@resend.dev` (default for testing)
- **To Email**: `verifykart2@gmail.com`
- **Lead Types**: B2B (home) and B2C (employee verification)

### Email Features

- ✅ Automatic email notifications for all form submissions
- ✅ Professional HTML email templates
- ✅ Delivery tracking via Resend dashboard
- ✅ High deliverability rates
- ✅ No SMTP configuration needed
- ✅ API-based email sending

## Lead Types

### B2B Leads (Home Page)
Submitted via `/api/leads/home` endpoint

### B2C Leads (Employee Verification)
Submitted via `/api/leads/b2c` endpoint

Both lead types automatically send email notifications to `verifykart2@gmail.com` with complete lead details.

## Monitoring

Monitor email delivery in the [Resend Dashboard](https://resend.com/emails):
- View sent emails
- Check delivery status
- View opens and clicks (if enabled)
- Debug failed deliveries
