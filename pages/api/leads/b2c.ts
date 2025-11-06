import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import B2CLead from '../../../models/B2CLead';
import { sendLeadEmail } from '../../../lib/mailer';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Basic CORS handling for cross-origin/form submissions
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, X-CSRF-Token'
  );
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    // Preflight
    return res.status(200).end();
  }

  if (req.method === 'HEAD') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // Connect to DB with proper error reporting
    try {
      await dbConnect();
    } catch (e) {
      console.error('DB connect failed (b2c POST):', e);
      return res.status(500).json({ success: false, message: 'Database connection failed' });
    }

    const { name, phone, email, service, pagePath, utm_source, utm_medium, utm_campaign, meta } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'name and phone are required' });
    }

    try {
      const doc = await B2CLead.create({
        name,
        phone,
        email,
        service,
        source: 'Employee Verification',
        type: 'B2C',
        pagePath,
        utm_source,
        utm_medium,
        utm_campaign,
        meta,
      });

      // Send email notification - this is critical and should always happen
      let emailSent = false;
      let emailError = null;
      
      try {
        await sendLeadEmail({
          lead: doc.toObject(),
          type: 'b2c',
        });
        
        emailSent = true;
        console.log('Email sent successfully for b2c lead:', {
          leadId: doc._id,
          name,
          email,
        });
      } catch (emailSendError) {
        emailError = emailSendError;
        console.error('Failed to send email for b2c lead:', {
          leadId: doc._id,
          error: emailSendError instanceof Error ? emailSendError.message : String(emailSendError),
          stack: emailSendError instanceof Error ? emailSendError.stack : undefined
        });
      }

      // Return success if email was sent, even if there were warnings
      if (emailSent) {
        return res.status(201).json({ 
          success: true, 
          data: doc 
        });
      } else {
        // Email failed - this is a critical error
        return res.status(500).json({ 
          success: false, 
          message: 'Lead saved to database but failed to send email notification',
          error: emailError instanceof Error ? emailError.message : 'Unknown email error',
          data: doc // Still return the saved lead data
        });
      }
    } catch (error) {
      console.error('Create b2c lead error:', error);
      return res.status(500).json({ success: false, message: 'Failed to create b2c lead' });
    }
  }

  if (req.method === 'GET') {
    try {
      await dbConnect();
    } catch (e) {
      console.error('DB connect failed (b2c GET):', e);
      return res.status(500).json({ success: false, message: 'Database connection failed' });
    }

    const { page = '1', limit = '20' } = req.query as { page?: string; limit?: string };
    const p = Math.max(parseInt(page as string) || 1, 1);
    const l = Math.min(Math.max(parseInt(limit as string) || 20, 1), 100);

    try {
      const [items, total] = await Promise.all([
        B2CLead.find({}).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
        B2CLead.countDocuments({}),
      ]);

      return res.status(200).json({ success: true, total, page: p, limit: l, items });
    } catch (error) {
      console.error('List b2c leads error:', error);
      return res.status(500).json({ success: false, message: 'Failed to list b2c leads' });
    }
  }

  // Unexpected method; log for diagnostics
  try {
    console.warn('b2c endpoint received unexpected method:', req.method, 'headers:', req.headers);
  } catch { }
  res.setHeader('Allow', 'GET, POST, OPTIONS, HEAD');
  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

