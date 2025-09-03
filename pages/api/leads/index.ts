import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import HomeLead from '../../../models/HomeLead';
import B2CLead from '../../../models/B2CLead';

// Ensure this route runs on the Node.js runtime (not Edge)
export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    page = '1',
    limit = '20',
    type = 'all', // 'home' | 'b2c' | 'all'
    source = 'all', // specific source filter
    search = '', // matches name, email, phone, company
    from, // ISO date string
    to,   // ISO date string
  } = req.query as Record<string, string | undefined>;

  const p = Math.max(parseInt(page || '1') || 1, 1);
  const l = Math.min(Math.max(parseInt(limit || '20') || 20, 1), 100);

  const dateFilter: any = {};
  if (from) dateFilter.$gte = new Date(from);
  if (to) dateFilter.$lte = new Date(to);

  const baseFilter: any = {};
  if (Object.keys(dateFilter).length) baseFilter.createdAt = dateFilter;

  // Add source filter if specified
  if (source && source !== 'all') {
    baseFilter.source = source;
  }

  if (search) {
    const regex = new RegExp(search, 'i');
    baseFilter.$or = [
      { name: regex },
      { email: regex },
      { phone: regex },
      { company: regex },
      { service: regex },
      { source: regex },
    ];
  }

  try {
    if (type === 'home') {
      const [items, total] = await Promise.all([
        HomeLead.find(baseFilter).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
        HomeLead.countDocuments(baseFilter),
      ]);
      return res.status(200).json({ success: true, type: 'home', total, page: p, limit: l, items });
    }

    if (type === 'b2c') {
      const [items, total] = await Promise.all([
        B2CLead.find(baseFilter).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
        B2CLead.countDocuments(baseFilter),
      ]);
      return res.status(200).json({ success: true, type: 'b2c', total, page: p, limit: l, items });
    }

    // type === 'all' -> aggregate results from both with separate totals
    const [homeItems, homeTotal, b2cItems, b2cTotal] = await Promise.all([
      HomeLead.find(baseFilter).sort({ createdAt: -1 }).limit(l),
      HomeLead.countDocuments(baseFilter),
      B2CLead.find(baseFilter).sort({ createdAt: -1 }).limit(l),
      B2CLead.countDocuments(baseFilter),
    ]);

    // Merge and sort by createdAt desc, then paginate
    const merged = [...homeItems.map(i => ({ ...i.toObject(), _type: 'home' })), ...b2cItems.map(i => ({ ...i.toObject(), _type: 'b2c' }))]
      .sort((a, b) => new Date(b.createdAt as any).getTime() - new Date(a.createdAt as any).getTime());

    const start = (p - 1) * l;
    const items = merged.slice(start, start + l);
    const total = homeTotal + b2cTotal;

    return res.status(200).json({ success: true, type: 'all', total, page: p, limit: l, items, totals: { home: homeTotal, b2c: b2cTotal } });
  } catch (error) {
    console.error('List leads error:', error);
    return res.status(500).json({ success: false, message: 'Failed to list leads' });
  }
}
