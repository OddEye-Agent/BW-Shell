import { useState } from 'react';
import TopBar from './components/TopBar';
import AccountsPage from './components/AccountsPage';

const navItems = ['Accounts', 'Users', 'Compliance', 'Content', 'Websites', 'Locator', 'Video', 'Admin Tools'];

export default function App() {
  const [active, setActive] = useState('Accounts');

  return (
    <div className="min-h-screen bg-panel text-text">
      <TopBar />

      <nav className="flex items-center gap-1 overflow-x-auto border-b border-line bg-white px-3" aria-label="Primary">
        {navItems.map((item) => (
          <button key={item} onClick={() => setActive(item)} className={`nav-item ${active === item ? 'active' : ''}`}>
            {item}
          </button>
        ))}
      </nav>

      <main>{active === 'Accounts' ? <AccountsPage /> : <section className="bg-white p-6"><h1 className="text-2xl font-semibold">{active}</h1><p className="mt-1 text-sm text-muted">Section migration in progress.</p></section>}</main>
    </div>
  );
}
