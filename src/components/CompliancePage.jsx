import { useMemo, useState } from 'react';
import { complianceArchiveRows, complianceTabs } from '../data/mock/complianceData';

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('Archive');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return complianceArchiveRows
      .filter((row) => {
        const matchesQuery =
          !q ||
          row.submitter_id.toLowerCase().includes(q) ||
          row.approver_id.toLowerCase().includes(q) ||
          row.website_id.toLowerCase().includes(q) ||
          row.bas_account_id.toLowerCase().includes(q);

        const matchesStatus = !status || row.status === status;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
  }, [query, status]);

  return (
    <section className="bg-white p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Compliance</h1>
        <p className="mt-1 text-sm text-muted">React migration in progress. Archive tab has first-pass functional parity.</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 border-b border-line pb-2">
        {complianceTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${
              activeTab === tab ? 'bg-accent text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== 'Archive' ? (
        <div className="rounded-xl border border-line bg-panel p-5 text-sm text-muted">
          {activeTab} migration queued next.
        </div>
      ) : (
        <>
          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <input
              className="rounded-lg border border-line px-3 py-2 text-sm"
              placeholder="Search submitter, approver, website, or account"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select className="rounded-lg border border-line px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <p className="mb-3 text-sm text-muted">Showing {filteredRows.length} of {complianceArchiveRows.length} records</p>

          <div className="table-wrap">
            <table className="min-w-[1100px] border-collapse">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="border-b border-line px-3 py-3 text-left">Event Date</th>
                  <th className="border-b border-line px-3 py-3 text-left">Website</th>
                  <th className="border-b border-line px-3 py-3 text-left">Submitter</th>
                  <th className="border-b border-line px-3 py-3 text-left">Approver</th>
                  <th className="border-b border-line px-3 py-3 text-left">Status</th>
                  <th className="border-b border-line px-3 py-3 text-left">BAS Account</th>
                  <th className="border-b border-line px-3 py-3 text-left">Revision</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={`${row.website_id}-${row.event_date}-${row.revision}`} className="hover:bg-slate-50">
                    <td className="border-b border-slate-100 px-3 py-3">{row.event_date}</td>
                    <td className="border-b border-slate-100 px-3 py-3">{row.website_id}</td>
                    <td className="border-b border-slate-100 px-3 py-3">{row.submitter_id}</td>
                    <td className="border-b border-slate-100 px-3 py-3">{row.approver_id}</td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          row.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : row.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">{row.bas_account_id}</td>
                    <td className="border-b border-slate-100 px-3 py-3">{row.revision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
