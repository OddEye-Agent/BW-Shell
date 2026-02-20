import { useMemo, useState } from 'react';
import {
  adminToolsTabs,
  basAccountsRows,
  basRolesRows,
  basUsersRows,
  calculatorsRows,
  wixFoldersRows,
  wixRolesCustom,
  wixRolesPredefined,
  wixWebsitesRows
} from '../data/mock/adminToolsData';

function Pill({ value }) {
  const v = String(value);
  const cls = v === 'Active' || v === 'Healthy' || v === 'Yes' || v === 'Deployed'
    ? 'bg-emerald-100 text-emerald-700'
    : v === 'Disabled' || v === 'Archived' || v === 'No'
      ? 'bg-rose-100 text-rose-700'
      : 'bg-amber-100 text-amber-700';
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${cls}`}>{v}</span>;
}

export default function AdminToolsPage() {
  const [activeTab, setActiveTab] = useState('BAS Roles');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source =
      activeTab === 'BAS Roles' ? basRolesRows :
      activeTab === 'BAS Users' ? basUsersRows :
      activeTab === 'BAS Accounts' ? basAccountsRows :
      activeTab === 'Wix Websites' ? wixWebsitesRows :
      activeTab === 'Wix Folders' ? wixFoldersRows :
      activeTab === 'Calculators' ? calculatorsRows : [];

    if (!q) return source;
    return source.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(q)));
  }, [activeTab, query]);

  return (
    <section className="bg-white p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Admin Tools</h1>
        <p className="mt-1 text-sm text-muted">React migration in progress. BAS + Wix + Calculators slices are active.</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 border-b border-line pb-2">
        {adminToolsTabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-md px-3 py-2 text-sm font-semibold ${activeTab === tab ? 'bg-accent text-white' : 'bg-slate-100 text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Wix Roles' ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="table-wrap">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">Predefined Role</th><th className="border-b border-line px-3 py-3 text-left">Permissions</th></tr></thead>
              <tbody>{wixRolesPredefined.map((r) => <tr key={r.roleName}><td className="border-b border-slate-100 px-3 py-3">{r.roleName}</td><td className="border-b border-slate-100 px-3 py-3">{r.permissions}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="table-wrap">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">Custom Role</th><th className="border-b border-line px-3 py-3 text-left">Permissions</th></tr></thead>
              <tbody>{wixRolesCustom.map((r) => <tr key={r.roleName}><td className="border-b border-slate-100 px-3 py-3">{r.roleName}</td><td className="border-b border-slate-100 px-3 py-3">{r.permissions}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input className="w-full rounded-lg border border-line px-3 py-2 text-sm md:w-[420px]" placeholder="Search records" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="table-wrap">
            {activeTab === 'BAS Roles' && <table className="min-w-full border-collapse"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">Role Name</th><th className="border-b border-line px-3 py-3 text-left">Role Key</th><th className="border-b border-line px-3 py-3 text-left">Users Assigned</th><th className="border-b border-line px-3 py-3 text-left">Updated On</th></tr></thead><tbody>{rows.map((r) => <tr key={r.roleKey} className="hover:bg-slate-50"><td className="border-b border-slate-100 px-3 py-3">{r.roleName}</td><td className="border-b border-slate-100 px-3 py-3">{r.roleKey}</td><td className="border-b border-slate-100 px-3 py-3">{r.usersAssigned}</td><td className="border-b border-slate-100 px-3 py-3">{r.updatedOn}</td></tr>)}</tbody></table>}

            {activeTab === 'BAS Users' && <table className="min-w-full border-collapse"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">User ID</th><th className="border-b border-line px-3 py-3 text-left">Name</th><th className="border-b border-line px-3 py-3 text-left">Email</th><th className="border-b border-line px-3 py-3 text-left">Role</th><th className="border-b border-line px-3 py-3 text-left">Status</th></tr></thead><tbody>{rows.map((r) => <tr key={r.userId} className="hover:bg-slate-50"><td className="border-b border-slate-100 px-3 py-3">{r.userId}</td><td className="border-b border-slate-100 px-3 py-3">{r.name}</td><td className="border-b border-slate-100 px-3 py-3">{r.email}</td><td className="border-b border-slate-100 px-3 py-3">{r.role}</td><td className="border-b border-slate-100 px-3 py-3"><Pill value={r.state} /></td></tr>)}</tbody></table>}

            {activeTab === 'BAS Accounts' && <table className="min-w-full border-collapse"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">Account ID</th><th className="border-b border-line px-3 py-3 text-left">Account Name</th><th className="border-b border-line px-3 py-3 text-left">Owner</th><th className="border-b border-line px-3 py-3 text-left">Linked Users</th><th className="border-b border-line px-3 py-3 text-left">Health</th></tr></thead><tbody>{rows.map((r) => <tr key={r.accountId} className="hover:bg-slate-50"><td className="border-b border-slate-100 px-3 py-3">{r.accountId}</td><td className="border-b border-slate-100 px-3 py-3">{r.accountName}</td><td className="border-b border-slate-100 px-3 py-3">{r.owner}</td><td className="border-b border-slate-100 px-3 py-3">{r.linkedUsers}</td><td className="border-b border-slate-100 px-3 py-3"><Pill value={r.health} /></td></tr>)}</tbody></table>}

            {activeTab === 'Wix Websites' && <table className="min-w-full border-collapse"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">Name</th><th className="border-b border-line px-3 py-3 text-left">Display Name</th><th className="border-b border-line px-3 py-3 text-left">Published</th><th className="border-b border-line px-3 py-3 text-left">Premium</th><th className="border-b border-line px-3 py-3 text-left">Blocked</th><th className="border-b border-line px-3 py-3 text-left">Editor</th></tr></thead><tbody>{rows.map((r) => <tr key={r.name} className="hover:bg-slate-50"><td className="border-b border-slate-100 px-3 py-3">{r.name}</td><td className="border-b border-slate-100 px-3 py-3">{r.displayName}</td><td className="border-b border-slate-100 px-3 py-3"><Pill value={r.published} /></td><td className="border-b border-slate-100 px-3 py-3"><Pill value={r.isPremium} /></td><td className="border-b border-slate-100 px-3 py-3"><Pill value={r.blocked} /></td><td className="border-b border-slate-100 px-3 py-3">{r.editorType}</td></tr>)}</tbody></table>}

            {activeTab === 'Wix Folders' && <table className="min-w-full border-collapse"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">Folder Name</th><th className="border-b border-line px-3 py-3 text-left">Path</th><th className="border-b border-line px-3 py-3 text-left">Site Count</th></tr></thead><tbody>{rows.map((r) => <tr key={r.folderName} className="hover:bg-slate-50"><td className="border-b border-slate-100 px-3 py-3">{r.folderName}</td><td className="border-b border-slate-100 px-3 py-3">{r.path}</td><td className="border-b border-slate-100 px-3 py-3">{r.siteCount}</td></tr>)}</tbody></table>}

            {activeTab === 'Calculators' && <table className="min-w-full border-collapse"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted"><tr><th className="border-b border-line px-3 py-3 text-left">Status</th><th className="border-b border-line px-3 py-3 text-left">Description</th><th className="border-b border-line px-3 py-3 text-left">Publish Date</th><th className="border-b border-line px-3 py-3 text-left">Expiry Date</th></tr></thead><tbody>{rows.map((r) => <tr key={`${r.description}-${r.publishDate}`} className="hover:bg-slate-50"><td className="border-b border-slate-100 px-3 py-3"><Pill value={r.status} /></td><td className="border-b border-slate-100 px-3 py-3">{r.description}</td><td className="border-b border-slate-100 px-3 py-3">{r.publishDate}</td><td className="border-b border-slate-100 px-3 py-3">{r.expiryDate}</td></tr>)}</tbody></table>}
          </div>
        </>
      )}
    </section>
  );
}
