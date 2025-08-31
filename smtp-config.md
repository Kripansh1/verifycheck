# SMTP Configuration Guide for VerifyCheck

## Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
# SMTP Server Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Addresses
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=verifykart2@gmail.com
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification
   - Enable if not already enabled

2. **Generate App Password**
   - In Security settings, go to 2-Step Verification
   - Click on "App passwords"
   - Select "Mail" as the app
   - Generate a new app password
   - Use this password in `SMTP_PASS` (not your regular Gmail password)

3. **Update Environment Variables**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=your-16-character-app-password
   EMAIL_FROM=your-gmail@gmail.com
   EMAIL_TO=verifykart2@gmail.com
   ```

## Alternative Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Security Notes

- ✅ Never commit `.env` files to version control
- ✅ Use app passwords instead of regular passwords
- ✅ Keep credentials secure and private
- ✅ The `.env` file is already in `.gitignore`

## Testing

After configuration, test the form submission to ensure emails are sent to `verifykart2@gmail.com`.

## Current Implementation

The email functionality is already implemented in `/pages/api/submit-form.js` and includes:
- ✅ Nodemailer integration
- ✅ HTML and text email templates
- ✅ Error handling and debugging
- ✅ CORS configuration
- ✅ Form validation
- ✅ Automatic email sending to `verifykart2@gmail.com`
