import { useEffect, useMemo, useState } from 'react';

interface LeadItem {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service?: string;
  source?: string;
  pagePath?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  createdAt: string;
  _type?: 'home' | 'b2c';
}

interface ApiResponse {
  success: boolean;
  type: 'home' | 'b2c' | 'all';
  total: number;
  page: number;
  limit: number;
  items: LeadItem[];
  totals?: { home: number; b2c: number };
}

export default function LeadsDashboard() {
  const [type, setType] = useState<'all' | 'home' | 'b2c'>('all');
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set('type', type);
    params.set('page', String(page));
    params.set('limit', String(limit));
    if (search.trim()) params.set('search', search.trim());
    if (from) params.set('from', new Date(from).toISOString());
    if (to) params.set('to', new Date(to).toISOString());
    return params.toString();
  }, [type, page, limit, search, from, to]);

  useEffect(() => {
    let ignore = false;
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/leads?${query}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json: ApiResponse = await res.json();
        if (!ignore) setData(json);
      } catch (e: any) {
        if (!ignore) setError(e?.message || 'Failed to fetch');
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchLeads();
    return () => {
      ignore = true;
    };
  }, [query]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.limit));
  }, [data]);

  const resetToFirstPage = () => setPage(1);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Leads Dashboard</h1>

        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-5">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="w-full rounded border border-gray-300 bg-white px-3 py-2"
              value={type}
              onChange={(e) => {
                setType(e.target.value as any);
                resetToFirstPage();
              }}
            >
              <option value="all">All</option>
              <option value="home">B2B Profile Verification Leads</option>
              <option value="b2c">Employee Verification Leads</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              placeholder="Search name, email, phone, company, service, source"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetToFirstPage();
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <input
              type="date"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                resetToFirstPage();
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <input
              type="date"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                resetToFirstPage();
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">
            {data ? (
              <span>
                Showing page {data.page} of {totalPages} • Total {data.total} leads
                {data.totals && (
                  <>
                    {' '}• Home: {data.totals.home} • B2C: {data.totals.b2c}
                  </>
                )}
              </span>
            ) : (
              <span>\u00A0</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Per page</label>
            <select
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                resetToFirstPage();
              }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Phone</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company/Service</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Source</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">Loading...</td>
                </tr>
              )}

              {error && !loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-sm text-red-600">{error}</td>
                </tr>
              )}

              {!loading && !error && data && data.items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">No leads found</td>
                </tr>
              )}

              {!loading && !error && data && data.items.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      (lead._type || (type === 'home' ? 'home' : 'b2c')) === 'home'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {lead._type || (type === 'all' ? (lead.company ? 'home' : 'b2c') : type)}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{lead.name || '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{lead.phone || '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{lead.email || '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{lead.company || lead.service || '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{lead.source || '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
          >
            Previous
          </button>
          <div className="text-sm text-gray-700">Page {page} of {totalPages}</div>
          <button
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
