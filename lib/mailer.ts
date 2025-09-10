import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || process.env.EMAIL_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || process.env.EMAIL_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER;
const EMAIL_TO_DEFAULT = process.env.EMAIL_TO || 'verifykart2@gmail.com';

let transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (!transporter) {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      throw new Error('SMTP configuration missing (host/user/pass)');
    }

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465 || process.env.EMAIL_SECURE === 'true',
      auth: {
        user: SMTP_USER!,
        pass: SMTP_PASS!,
      },
    });
  }
  return transporter;
}

export async function sendLeadEmail(params: {
  to?: string;
  subject?: string;
  lead: Record<string, any>;
  type: 'home' | 'b2c';
}) {
  const typeLabel = params.type === 'home' ? 'B2B Profile Verification' : 'Employee Verification';
  const { to = EMAIL_TO_DEFAULT, subject = `New ${typeLabel} Lead`, lead, type } = params;

  const from = EMAIL_FROM || SMTP_USER || 'no-reply@verifycheck';

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 640px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f4f4f4; padding: 16px; border-radius: 6px; }
          .grid { margin-top: 16px; }
          .row { margin-bottom: 8px; }
          .label { font-weight: 600; color: #555; display: inline-block; width: 140px; }
          code { background: #f6f8fa; padding: 2px 4px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New ${typeLabel} Lead</h2>
          </div>
          <div class="grid">
            ${['name', 'company', 'email', 'phone', 'service', 'source', 'pagePath', 'utm_source', 'utm_medium', 'utm_campaign']
      .map((k) => `<div class="row"><span class="label">${k}:</span> ${lead[k] ?? '-'} </div>`)
      .join('')}
            <div class="row"><span class="label">Time:</span> ${new Date().toLocaleString()}</div>
            ${lead._id ? `<div class="row"><span class="label">Lead ID:</span> <code>${lead._id}</code></div>` : ''}
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `New ${typeLabel} Lead\n\n` +
    ['name', 'company', 'email', 'phone', 'service', 'source', 'pagePath', 'utm_source', 'utm_medium', 'utm_campaign']
      .map((k) => `${k}: ${lead[k] ?? '-'}`)
      .join('\n');

  const t = getTransporter();

  // Add timeout for email sending (Vercel serverless optimization)
  const emailPromise = t.sendMail({
    from: `VerifyCheck <${from}>`,
    to,
    subject,
    html,
    text,
  });

  // 5 second timeout for email sending
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Email timeout')), 5000);
  });

  await Promise.race([emailPromise, timeoutPromise]);
}
