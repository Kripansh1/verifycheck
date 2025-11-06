import type { NextApiRequest, NextApiResponse } from 'next';
import { sendLeadEmail } from '../../lib/mailer';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { type, lead } = req.body || {};

  if (!type || !lead) {
    return res.status(400).json({ success: false, message: 'type and lead are required' });
  }

  if (!['home', 'b2c'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Invalid type. Must be "home" or "b2c"' });
  }

  // Send email immediately in this dedicated function
  try {
    console.log('Email queue processing:', { type, leadId: lead._id });
    await sendLeadEmail({ type, lead });
    console.log('Email queue completed:', { type, leadId: lead._id });
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email queue error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
