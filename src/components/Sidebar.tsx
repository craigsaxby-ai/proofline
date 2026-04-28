import { Link, useLocation } from 'react-router-dom';
import { getUser } from '../types';

const navItems = [
  { icon: '⊞', label: 'Dashboard', path: '/dashboard' },
  { icon: '🏆', label: 'Achievements', path: '/achievements' },
  { icon: '📁', label: 'Documents', path: '/documents' },
  { icon: '📚', label: 'Books', path: '/books' },
  { icon: '✦', label: 'Outputs', path: '/outputs' },
  { icon: '📅', label: 'Timeline', path: '/timeline' },
];

export default function Sidebar() {
  const location = useLocation();
  const user = getUser();

  return (
    <aside className="flex flex-col h-full" style={{ width: 220, background: '#141929', borderRight: '1px solid #1E2740', minHeight: '100vh' }}>
      {/* Logo */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid #1E2740' }}>
        <span className="text-lg font-bold text-white">Achievement Record</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: active ? '#1E2740' : 'transparent',
                color: active ? '#FF6B2B' : '#9CA3AF',
                textDecoration: 'none',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="px-3 pb-4 space-y-1" style={{ borderTop: '1px solid #1E2740', paddingTop: 12 }}>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#FF6B2B' }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm text-white truncate">{user?.name || 'User'}</span>
        </div>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
          style={{ color: '#6B7280', textDecoration: 'none' }}
        >
          ⚙ Settings
        </Link>
      </div>
    </aside>
  );
}
