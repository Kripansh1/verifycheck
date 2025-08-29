import * as brevo from '@getbrevo/brevo';

export default async function handler(req, res) {
  // CORS headers (adjust origin as needed)
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
    return res.status(400).json({ success: false, message: 'Required fields missing (name and phone are required)' });
  }

  try {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: 'VerifyCheck',
      email: process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_USER,
    };

    sendSmtpEmail.to = [
      {
        email: process.env.BREVO_RECIPIENT_EMAIL || process.env.EMAIL_USER,
        name: 'VerifyCheck Team',
      },
    ];

    sendSmtpEmail.subject = 'New Form Submission from VerifyCheck Website';
    sendSmtpEmail.htmlContent = `
      <html>
        <head></head>
        <body>
          <h2>New Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Needed:</strong> ${service || 'Not specified'}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `;
    sendSmtpEmail.textContent = `New Form Submission
Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email || 'Not provided'}
Phone: ${phone}
Service Needed: ${service || 'Not specified'}
Submission Time: ${new Date().toLocaleString()}`;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Brevo email sent (api function):', result && (result.messageId || 'OK'));
    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Brevo email error (api function):', err);
    return res.status(500).json({ success: false, message: 'Failed to submit form' });
  }
}
