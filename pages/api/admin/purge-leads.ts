import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import HomeLead from '../../../models/HomeLead';
import B2CLead from '../../../models/B2CLead';

// DELETE /api/admin/purge-leads?type=all|home|b2c&before=ISO_STRING
// Headers: Authorization: Bearer <ADMIN_TOKEN>
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

  if (!ADMIN_TOKEN) {
    return res.status(500).json({ success: false, message: 'ADMIN_TOKEN not configured on server' });
  }
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { type = 'all', before } = req.query as { type?: 'all' | 'home' | 'b2c'; before?: string };

  const dateFilter: any = {};
  if (before) {
    const d = new Date(before);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid before date (use ISO string)' });
    }
    dateFilter.createdAt = { $lt: d };
  }

  try {
    let result: any = {};

    if (type === 'home') {
      const r = await HomeLead.deleteMany(dateFilter);
      result = { deletedCount: r.deletedCount || 0, type: 'home' };
    } else if (type === 'b2c') {
      const r = await B2CLead.deleteMany(dateFilter);
      result = { deletedCount: r.deletedCount || 0, type: 'b2c' };
    } else {
      const [rh, rb] = await Promise.all([
        HomeLead.deleteMany(dateFilter),
        B2CLead.deleteMany(dateFilter),
      ]);
      result = { deleted: { home: rh.deletedCount || 0, b2c: rb.deletedCount || 0 }, type: 'all' };
    }

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Purge leads error:', error);
    return res.status(500).json({ success: false, message: 'Failed to purge leads' });
  }
}
