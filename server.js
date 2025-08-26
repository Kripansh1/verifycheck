import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
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

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'verifykart2@gmail.com',
    pass: process.env.EMAIL_PASS || 'zccp glnf bxcu ogqz'
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  debug: true, // show debug output
  logger: true // log information in console
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Server cannot send emails, error: ', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// API endpoint for form submission
app.post('/api/submit-form', async (req, res) => {
  const { name, company, email, phone, service } = req.body;
  
  console.log('Form submission received:', { name, email, phone, service });
  
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }
  
  try {
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'verifykart2@gmail.com',
      to: process.env.EMAIL_USER || 'verifykart2@gmail.com', // Send to the same email
      subject: 'New Form Submission from VerifyCheck Website',
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Needed:</strong> ${service || 'Not specified'}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      `,
      // Add text alternative for email clients that don't support HTML
      text: `New Form Submission\nName: ${name}\nCompany: ${company || 'Not provided'}\nEmail: ${email}\nPhone: ${phone}\nService Needed: ${service || 'Not specified'}\nSubmission Time: ${new Date().toLocaleString()}`
    };
    
    // Send email
    try {
      console.log('Attempting to send email...');
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully: ', info.response);
      console.log('Message ID:', info.messageId);
      
      // Send success response
      res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (emailError) {
      console.error('Detailed email error:', JSON.stringify(emailError, null, 2));
      console.error('Error stack:', emailError.stack);
      
      // Try with a different configuration as fallback
      try {
        console.log('Trying fallback email configuration...');
        const fallbackTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER || 'verifykart2@gmail.com',
            pass: process.env.EMAIL_PASS || 'zccp glnf bxcu ogqz'
          }
        });
        
        const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
        console.log('Fallback email sent successfully: ', fallbackInfo.response);
        res.status(200).json({ success: true, message: 'Form submitted successfully via fallback' });
      } catch (fallbackError) {
        console.error('Fallback email also failed:', fallbackError);
        res.status(500).json({ 
          success: false, 
          message: 'Failed to submit form. Please try again later.',
          error: process.env.NODE_ENV === 'development' ? emailError.message : 'Email service unavailable'
        });
      }
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
