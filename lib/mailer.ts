import { Resend } from 'resend';

// Note: These are read at module load time, but we also check at runtime in getResendClient()
// to ensure they're available in Vercel's serverless environment
const EMAIL_FROM = process.env.EMAIL_FROM || 'VerifyCheck <onboarding@resend.dev>';
const EMAIL_TO_DEFAULT = process.env.EMAIL_TO || 'verifykart2@gmail.com';

let resendClient: Resend | null = null;

export function getResendClient() {
  if (!resendClient) {
    // Check at runtime (not just module load time) to ensure env vars are available
    const runtimeApiKey = process.env.RESEND_API_KEY;
    
    if (!runtimeApiKey) {
      const errorMsg = 'RESEND_API_KEY environment variable is required. Please set it in your Vercel environment variables and redeploy.';
      console.error('=== RESEND_API_KEY MISSING ===');
      console.error('Current NODE_ENV:', process.env.NODE_ENV);
      console.error('Vercel environment:', process.env.VERCEL ? 'YES' : 'NO');
      console.error('Available env vars with RESEND/EMAIL:', 
        Object.keys(process.env)
          .filter(k => k.includes('RESEND') || k.includes('EMAIL'))
          .join(', ') || 'NONE FOUND'
      );
      console.error('Total env vars count:', Object.keys(process.env).length);
      throw new Error(errorMsg);
    }

    // Validate API key format (Resend keys start with 're_')
    if (!runtimeApiKey.startsWith('re_')) {
      const errorMsg = `Invalid RESEND_API_KEY format. Resend API keys should start with "re_". Got: ${runtimeApiKey.substring(0, 10)}...`;
      console.error('Invalid RESEND_API_KEY format:', runtimeApiKey.substring(0, 10) + '...');
      throw new Error(errorMsg);
    }

    console.log('✓ Creating Resend client with API key:', runtimeApiKey.substring(0, 10) + '...');
    resendClient = new Resend(runtimeApiKey);
  }
  return resendClient;
}

export async function sendLeadEmail(params: {
  to?: string;
  subject?: string;
  lead: Record<string, any>;
  type: 'home' | 'b2c';
}) {
  const { to = EMAIL_TO_DEFAULT, subject = `New ${params.type.toUpperCase()} Lead`, lead, type } = params;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 640px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f4f4f4; padding: 16px; border-radius: 6px; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #2563eb; }
          .grid { margin-top: 16px; }
          .row { margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .row:last-child { border-bottom: none; }
          .label { font-weight: 600; color: #555; display: inline-block; width: 140px; }
          .value { color: #111; }
          code { background: #f6f8fa; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New ${type.toUpperCase()} Lead</h2>
          </div>
          <div class="grid">
            ${['name', 'company', 'email', 'phone', 'service', 'source', 'pagePath', 'utm_source', 'utm_medium', 'utm_campaign']
              .map((k) => `<div class="row"><span class="label">${k}:</span> <span class="value">${lead[k] ?? '-'}</span></div>`)
              .join('')}
            <div class="row"><span class="label">Time:</span> <span class="value">${new Date().toLocaleString()}</span></div>
            ${lead._id ? `<div class="row"><span class="label">Lead ID:</span> <code>${lead._id}</code></div>` : ''}
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `New ${type.toUpperCase()} Lead\n\n` +
    ['name', 'company', 'email', 'phone', 'service', 'source', 'pagePath', 'utm_source', 'utm_medium', 'utm_campaign']
      .map((k) => `${k}: ${lead[k] ?? '-'}`)
      .join('\n') +
    `\n\nTime: ${new Date().toLocaleString()}` +
    (lead._id ? `\nLead ID: ${lead._id}` : '');

  const client = getResendClient();

  console.log('Sending email via Resend:', {
    from: EMAIL_FROM,
    to,
    subject,
    leadId: lead._id,
    type
  });

  try {
    const { data, error: resendError } = await client.emails.send({
      from: EMAIL_FROM,
      to: to,
      subject: subject,
      html: html,
      text: text,
    });

    if (resendError) {
      console.error('Resend API returned an error:', {
        error: resendError,
        leadId: lead._id,
        type,
        from: EMAIL_FROM,
        to
      });
      throw new Error(`Resend API error: ${JSON.stringify(resendError)}`);
    }

    if (!data) {
      console.error('Resend API returned no data:', {
        leadId: lead._id,
        type,
        from: EMAIL_FROM,
        to
      });
      throw new Error('Resend API returned no data');
    }

    console.log('Email sent successfully via Resend:', {
      leadId: lead._id,
      emailId: data?.id,
      to,
      type,
      from: EMAIL_FROM
    });

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = {
      message: errorMessage,
      leadId: lead._id,
      type,
      from: EMAIL_FROM,
      to,
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'MISSING'
    };
    
    console.error('Resend email error - Full details:', errorDetails);
    console.error('Resend email error - Stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Re-throw with more context
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
}
