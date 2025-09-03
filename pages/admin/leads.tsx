import { useEffect, useMemo, useState } from 'react';

interface LeadItem {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service?: string;
  source: string;
  type: 'B2B' | 'B2C';
  pagePath?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  createdAt: string;
  _type?: 'home' | 'b2c';
}

interface ApiResponse {
  success: boolean;
  type: 'b2b' | 'b2c' | 'all';
  total: number;
  page: number;
  limit: number;
  items: LeadItem[];
  totals?: { home: number; b2c: number };
}

export default function LeadsDashboard() {
  const [type, setType] = useState<'all' | 'b2b' | 'b2c'>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
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
    // Map frontend "b2b" to backend "home"
    const apiType = type === 'b2b' ? 'home' : type;
    params.set('type', apiType);
    params.set('page', String(page));
    params.set('limit', String(limit));
    if (sourceFilter !== 'all') params.set('source', sourceFilter);
    if (search.trim()) params.set('search', search.trim());
    if (from) params.set('from', new Date(from).toISOString());
    if (to) params.set('to', new Date(to).toISOString());
    return params.toString();
  }, [type, sourceFilter, page, limit, search, from, to]);

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

        {/* Statistics Cards */}
        {data?.totals && (
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="text-2xl font-bold text-blue-600">{data.totals.home + data.totals.b2c}</div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="text-2xl font-bold text-green-600">{data.totals.home}</div>
              <div className="text-sm text-gray-600">B2B Leads</div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="text-2xl font-bold text-purple-600">{data.totals.b2c}</div>
              <div className="text-sm text-gray-600">B2C Leads</div>
            </div>
          </div>
        )}

        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-6">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="w-full rounded border border-gray-300 bg-white px-3 py-2"
              value={type}
              onChange={(e) => {
                setType(e.target.value as any);
                setSourceFilter('all'); // Reset source filter when type changes
                resetToFirstPage();
              }}
            >
              <option value="all">All Types</option>
              <option value="b2b">B2B Leads</option>
              <option value="b2c">B2C Leads</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <select
              className="w-full rounded border border-gray-300 bg-white px-3 py-2"
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                resetToFirstPage();
              }}
            >
              <option value="all">All Sources</option>
              {type === 'all' && (
                <>
                  <option value="Home Page">Home Page</option>
                  <option value="Employee Verification">Employee Verification</option>
                </>
              )}
              {type === 'b2b' && (
                <option value="Home Page">Home Page</option>
              )}
              {type === 'b2c' && (
                <option value="Employee Verification">Employee Verification</option>
              )}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              placeholder="Search name, email, phone, company, service"
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

              {!loading && !error && data && data.items.map((lead) => {
                // Map the backend types to display types
                // Priority: lead.type > _type mapping > fallback based on company field
                let leadType = 'B2C'; // default
                if (lead.type === 'B2B' || lead.type === 'B2C') {
                  leadType = lead.type;
                } else if (lead._type === 'home') {
                  leadType = 'B2B';
                } else if (lead._type === 'b2c') {
                  leadType = 'B2C';
                } else if (lead.company) {
                  // Fallback: if has company field, likely B2B
                  leadType = 'B2B';
                }
                return (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${leadType === 'B2B'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                        }`}>
                        {leadType}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">{lead.name || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{lead.phone || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {lead.email ? (
                        <div className="flex items-center gap-1">
                          <span>{lead.email}</span>
                          {leadType === 'B2B' && (
                            <span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                              Business
                            </span>
                          )}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{lead.company || lead.service || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <span className="inline-flex items-center rounded px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700">
                        {lead.source || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{new Date(lead.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
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
