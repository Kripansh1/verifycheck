import type { NextApiRequest, NextApiResponse } from 'next';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Security: Only allow in development or with a secret key
  const secret = req.query.secret;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment && secret !== process.env.DIAGNOSTIC_SECRET) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized. Set DIAGNOSTIC_SECRET env var to use in production.' 
    });
  }

  const envCheck = {
    nodeEnv: process.env.NODE_ENV,
    hasResendApiKey: !!process.env.RESEND_API_KEY,
    resendApiKeyPrefix: process.env.RESEND_API_KEY 
      ? process.env.RESEND_API_KEY.substring(0, 10) + '...' 
      : 'MISSING',
    resendApiKeyValid: process.env.RESEND_API_KEY?.startsWith('re_') || false,
    emailFrom: process.env.EMAIL_FROM || 'Not set (using default)',
    emailTo: process.env.EMAIL_TO || 'Not set (using default)',
    allEnvVars: Object.keys(process.env)
      .filter(k => k.includes('RESEND') || k.includes('EMAIL'))
      .reduce((acc, key) => {
        acc[key] = key.includes('KEY') 
          ? (process.env[key]?.substring(0, 10) + '...' || 'MISSING')
          : (process.env[key] || 'MISSING');
        return acc;
      }, {} as Record<string, string>),
  };

  return res.status(200).json({
    success: true,
    message: 'Email configuration diagnostic',
    config: envCheck,
    recommendations: !envCheck.hasResendApiKey 
      ? ['Set RESEND_API_KEY in Vercel environment variables and redeploy']
      : !envCheck.resendApiKeyValid
      ? ['RESEND_API_KEY format is invalid. It should start with "re_"']
      : ['Configuration looks good!'],
  });
}

