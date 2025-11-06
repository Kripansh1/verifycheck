# Email Not Working on Vercel - Quick Troubleshooting

## Problem
Emails work locally but not on Vercel production.

## Root Cause
The `RESEND_API_KEY` environment variable is **not set in Vercel**. Local `.env.local` files don't automatically sync to Vercel.

## Quick Fix (3 Steps)

### Step 1: Get Your Resend API Key
1. Go to https://resend.com/api-keys
2. Sign in and create a new API key
3. Copy the key (starts with `re_`)

### Step 2: Add to Vercel
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Key: `RESEND_API_KEY`
4. Value: Your API key (paste it)
5. Environments: Select **Production**, **Preview**, and **Development**
6. Click **Save**

### Step 3: Redeploy (CRITICAL!)
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Verify It's Working

### Option 1: Check Diagnostic Endpoint
Visit: `https://your-domain.vercel.app/api/test-email-config`

You should see:
```json
{
  "config": {
    "hasResendApiKey": true,
    "resendApiKeyValid": true
  }
}
```

### Option 2: Check Vercel Logs
1. Submit a test form on your live site
2. Go to Vercel → **Deployments** → Click deployment → **Functions** tab
3. Look for: `✓ Creating Resend client with API key: re_...`
4. Look for: `Email sent successfully via Resend:`

If you see `=== RESEND_API_KEY MISSING ===`, the variable is not set correctly.

### Option 3: Check Resend Dashboard
1. Go to https://resend.com/emails
2. You should see sent emails with delivery status

## Common Mistakes

❌ **Setting the variable but not redeploying**
- Environment variables only take effect after redeployment

❌ **Setting it only for one environment**
- Make sure to select Production, Preview, AND Development

❌ **Typo in variable name**
- Must be exactly: `RESEND_API_KEY` (case-sensitive)

❌ **Using wrong API key**
- Make sure the key starts with `re_`
- Get a fresh key from Resend if unsure

## Still Not Working?

1. **Check Vercel Logs** for the exact error message
2. **Visit diagnostic endpoint** to see what environment variables are available
3. **Verify API key** in Resend dashboard is active
4. **Check Resend dashboard** to see if emails are being sent but not delivered

## Need More Help?

See `VERCEL_SETUP.md` for detailed instructions.

