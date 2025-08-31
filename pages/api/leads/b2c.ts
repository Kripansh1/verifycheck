import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import B2CLead from '../../../models/B2CLead';
import { sendLeadEmail } from '../../../lib/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
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
        source: 'b2c',
        pagePath,
        utm_source,
        utm_medium,
        utm_campaign,
        meta,
      });
      // Fire-and-forget email
      try {
        await sendLeadEmail({ type: 'b2c', lead: doc.toObject?.() || (doc as any) });
      } catch (e) {
        console.error('Email send failed (b2c lead):', e);
      }

      return res.status(201).json({ success: true, data: doc });
    } catch (error) {
      console.error('Create b2c lead error:', error);
      return res.status(500).json({ success: false, message: 'Failed to create b2c lead' });
    }
  }

  if (req.method === 'GET') {
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

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

