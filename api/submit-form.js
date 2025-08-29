import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { name, company, email, phone, service } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Required fields missing (name and phone are required)' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,            // use 587 with secure: false if 465 times out
      secure: true,         // true for 465, false for 587 (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    // Verify connection configuration; logs detailed SMTP errors if any
    await transporter.verify();

    const mailOptions = {
      from: `"VerifyCheck" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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
      text: `New Form Submission
Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email || 'Not provided'}
Phone: ${phone}
Service Needed: ${service || 'Not specified'}
Submission Time: ${new Date().toLocaleString()}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ success: false, message: 'Failed to submit form' });
  }
}
