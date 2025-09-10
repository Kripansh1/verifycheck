import type { NextApiRequest, NextApiResponse } from 'next';
import { sendLeadEmail } from '../../lib/mailer';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Basic CORS handling
  const origin = req.headers.origin || '';
  const allowedOrigins = new Set([
    'https://www.verifycheck.in',
    'https://verifycheck.in',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]);
  if (allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { type, lead } = req.body || {};

  if (!type || !lead) {
    return res.status(400).json({ success: false, message: 'type and lead are required' });
  }

  if (!['home', 'b2c'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Invalid type. Must be "home" or "b2c"' });
  }

  try {
    await sendLeadEmail({ type, lead });
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}
