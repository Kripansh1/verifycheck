import nodemailer from 'nodemailer';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ success: false, message: 'Method not allowed (use POST)' });
  }

  const { name, company, email, phone, service } = req.body || {};
  
  if (!name || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: 'Required fields missing (name and phone are required)' 
    });
  }

  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: 'Email configuration is missing. Please check environment variables.',
        error: process.env.NODE_ENV === 'development' ? 'Missing EMAIL_HOST, EMAIL_USER, or EMAIL_PASS' : undefined
      });
    }

    // Create transporter
    console.log('Email config:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    const toAddress = process.env.EMAIL_TO || 'verifykart2@gmail.com';

    // Send email
    const info = await transporter.sendMail({
      from: `"VerifyCheck" <${fromAddress}>`,
      to: toAddress,
      subject: 'New Form Submission from VerifyCheck Website',
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; }
              .content { padding: 20px 0; }
              .field { margin-bottom: 10px; }
              .label { font-weight: bold; color: #555; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span> ${name}
                </div>
                <div class="field">
                  <span class="label">Company:</span> ${company || 'Not provided'}
                </div>
                <div class="field">
                  <span class="label">Email:</span> ${email || 'Not provided'}
                </div>
                <div class="field">
                  <span class="label">Phone:</span> ${phone}
                </div>
                <div class="field">
                  <span class="label">Service Needed:</span> ${service || 'Not specified'}
                </div>
                <div class="field">
                  <span class="label">Submission Time:</span> ${new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Form Submission

Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email || 'Not provided'}
Phone: ${phone}
Service Needed: ${service || 'Not specified'}
Submission Time: ${new Date().toLocaleString()}
      `.trim(),
    });

    console.log('Email sent successfully:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Return specific error messages for debugging
    let errorMessage = 'Failed to submit form';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Check SMTP credentials.';
    } else if (error.code === 'ECONNECTION' || error.message.includes('ECONNREFUSED')) {
      errorMessage = 'Could not connect to email server. Check SMTP settings and internet connection.';
    } else if (error.message.includes('Missing credentials')) {
      errorMessage = 'SMTP credentials not configured. Check environment variables.';
    }

    return res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
