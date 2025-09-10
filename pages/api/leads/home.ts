import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import HomeLead from '../../../models/HomeLead';
import { sendLeadEmail } from '../../../lib/mailer';
import { validateBusinessEmail } from '../../../lib/emailValidation';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, phone, email, company, service, pagePath, utm_source, utm_medium, utm_campaign, meta } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    // Validate business email if provided
    if (email) {
      const emailValidation = validateBusinessEmail(email);
      if (!emailValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: emailValidation.message || 'Invalid email address',
          field: 'email'
        });
      }
      if (!emailValidation.isBusiness) {
        return res.status(400).json({
          success: false,
          message: emailValidation.message || 'Business email required. Free email domains (Gmail, Yahoo, Hotmail, etc.) are not accepted for business inquiries.',
          field: 'email'
        });
      }
    }

    try {
      const doc = await HomeLead.create({
        name,
        phone,
        email,
        company,
        service,
        source: 'Home Page',
        type: 'B2B',
        pagePath,
        utm_source,
        utm_medium,
        utm_campaign,
        meta,
      });

      // Send response first, then email (fire-and-forget)
      res.status(201).json({ success: true, data: doc });

      // Send email asynchronously after response
      setImmediate(async () => {
        try {
          await sendLeadEmail({ type: 'home', lead: doc.toObject?.() || (doc as any) });
        } catch (e) {
          console.error('Email send failed (home lead):', e);
        }
      });

      return;
    } catch (error) {
      console.error('Create home lead error:', error);
      return res.status(500).json({ success: false, message: 'Failed to create home lead' });
    }
  }

  if (req.method === 'GET') {
    // Simple listing for home leads (optional, for convenience)
    const { page = '1', limit = '20' } = req.query as { page?: string; limit?: string };
    const p = Math.max(parseInt(page as string) || 1, 1);
    const l = Math.min(Math.max(parseInt(limit as string) || 20, 1), 100);

    try {
      const [items, total] = await Promise.all([
        HomeLead.find({}).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
        HomeLead.countDocuments({}),
      ]);

      return res.status(200).json({ success: true, total, page: p, limit: l, items });
    } catch (error) {
      console.error('List home leads error:', error);
      return res.status(500).json({ success: false, message: 'Failed to list home leads' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

