import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as brevo from '@getbrevo/brevo';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file in development
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Brevo API setup
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Verify Brevo API connection on startup
(async () => {
  try {
    // Test API connection by attempting to get account info
    const accountApi = new brevo.AccountApi();
    accountApi.setApiKey(brevo.AccountApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    const account = await accountApi.getAccount();
    console.log('Brevo API connected successfully for:', account.email);
  } catch (e) {
    console.error('Brevo API connection failed:', e && e.message);
  }
})();

// Debug endpoint to verify Brevo API connectivity quickly
app.get('/api/debug-email', async (req, res) => {
  try {
    const accountApi = new brevo.AccountApi();
    accountApi.setApiKey(brevo.AccountApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    const account = await accountApi.getAccount();
    return res.json({ ok: true, email: account.email, plan: account.plan });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Brevo API verify failed',
      error: err && err.message,
      hint: 'Ensure BREVO_API_KEY is set with a valid Brevo API key from https://app.brevo.com/settings/keys/api'
    });
  }
});

// Legacy transporter verify removed - now using Brevo API

// Log which email user is configured (masked)
try {
  const user = process.env.EMAIL_USER || 'not set';
  const masked = typeof user === 'string' && user.includes('@')
    ? user.replace(/(^.).+(@.*$)/, '$1***$2')
    : 'not set';
  console.log('Mailer configured with EMAIL_USER:', masked);
} catch {}

// Handle CORS preflight explicitly for this endpoint (cors() middleware already set, but this is explicit)
app.options('/api/submit-form', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.sendStatus(200);
});

// Return JSON 405 for accidental GETs so the client never parses HTML
app.get('/api/submit-form', (req, res) => {
  res.setHeader('Allow', 'POST, OPTIONS');
  return res.status(405).json({ success: false, message: 'Method not allowed (use POST)' });
});

// API endpoint for form submission
app.post('/api/submit-form', async (req, res) => {
  const { name, company, email, phone, service } = req.body;
  
  console.log('Form submission received:', { name, email, phone, service });
  
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Required fields missing (name and phone are required)' });
  }
  
  try {
    // Email content
    const mailOptions = {
      from: `"VerifyCheck" <${process.env.EMAIL_USER || 'verifykart2@gmail.com'}>`,
      to: process.env.EMAIL_USER || 'verifykart2@gmail.com', // Send to the same email
      subject: 'New Form Submission from VerifyCheck Website',
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Needed:</strong> ${service || 'Not specified'}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      `,
      // Add text alternative for email clients that don't support HTML
      text: `New Form Submission\nName: ${name}\nCompany: ${company || 'Not provided'}\nEmail: ${email || 'Not provided'}\nPhone: ${phone}\nService Needed: ${service || 'Not specified'}\nSubmission Time: ${new Date().toLocaleString()}`
    };
    
    // Send email using Brevo API
    try {
      console.log('Attempting to send email via Brevo...');
      
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      
      sendSmtpEmail.sender = {
        name: "VerifyCheck",
        email: process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_USER || 'verifykart2@gmail.com'
      };
      
      sendSmtpEmail.to = [{
        email: process.env.BREVO_RECIPIENT_EMAIL || process.env.EMAIL_USER || 'verifykart2@gmail.com',
        name: "VerifyCheck Team"
      }];
      
      sendSmtpEmail.subject = 'New Form Submission from VerifyCheck Website';
      sendSmtpEmail.htmlContent = mailOptions.html;
      sendSmtpEmail.textContent = mailOptions.text;

      const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Brevo email sent successfully:', result.messageId);
      
      res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (emailError) {
      console.error('Brevo email error:', emailError);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to submit form. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? emailError.message : 'Email service unavailable'
      });
    }
  } catch (error) {
    console.error('General error in form submission:', error);
    res.status(500).json({ success: false, message: 'Failed to process form submission' });
  }
});

// For all other routes, serve the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
