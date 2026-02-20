const rows = [
  { accountName: 'Northwind Retail Group', parentAccount: 'Global Commerce Holdings', subAccounts: 4, userCount: 58, ownerEmail: 'owner@northwind.com', createdOn: '2024-01-17' },
  { accountName: 'Summit Health Partners', parentAccount: 'Summit Enterprises', subAccounts: 2, userCount: 31, ownerEmail: 'admin@summithealth.com', createdOn: '2023-09-05' },
  { accountName: 'Blue Harbor Logistics', parentAccount: 'Blue Harbor Group', subAccounts: 7, userCount: 102, ownerEmail: 'ops@blueharbor.io', createdOn: '2022-11-28' },
  { accountName: 'Evergreen Academy', parentAccount: 'Evergreen Education Network', subAccounts: 3, userCount: 44, ownerEmail: 'support@evergreenacademy.edu', createdOn: '2024-04-10' }
];

export default function AccountsPage() {
  return (
    <section className="bg-white p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Account Management</h1>
        <p className="mt-1 text-sm text-muted">Prototype accounts table migrated to React + Tailwind.</p>
      </div>

      <div className="table-wrap">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="border-b border-line px-3 py-3 text-left">Account Name</th>
              <th className="border-b border-line px-3 py-3 text-left">Parent Account</th>
              <th className="border-b border-line px-3 py-3 text-left">Sub Accounts</th>
              <th className="border-b border-line px-3 py-3 text-left">Users</th>
              <th className="border-b border-line px-3 py-3 text-left">Owner Email</th>
              <th className="border-b border-line px-3 py-3 text-left">Created On</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.accountName} className="hover:bg-slate-50">
                <td className="border-b border-slate-100 px-3 py-3 font-medium text-accent">{r.accountName}</td>
                <td className="border-b border-slate-100 px-3 py-3">{r.parentAccount}</td>
                <td className="border-b border-slate-100 px-3 py-3">{r.subAccounts}</td>
                <td className="border-b border-slate-100 px-3 py-3">{r.userCount}</td>
                <td className="border-b border-slate-100 px-3 py-3">{r.ownerEmail}</td>
                <td className="border-b border-slate-100 px-3 py-3">{r.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
