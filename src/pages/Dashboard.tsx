import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getUser, getAchievements, saveAchievements, categoryIcon } from '../types';
import type { Achievement } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [quickAdd, setQuickAdd] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Achievement['category']>('work');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate('/signup'); return; }
    setAchievements(getAchievements());
  }, [navigate]);

  const stats = {
    total: achievements.length,
    certificates: achievements.filter(a => a.category === 'certificate').length,
    courses: achievements.filter(a => a.category === 'course').length,
    books: achievements.filter(a => a.category === 'book').length,
    projects: achievements.filter(a => a.category === 'project').length,
  };

  const profileStrength = Math.min(100, 10 + achievements.length * 12);

  const handleQuickAdd = () => {
    if (!quickAdd.trim()) return;
    const newItem: Achievement = {
      id: Date.now().toString(),
      category: selectedCategory,
      title: quickAdd,
      date: new Date().toISOString().split('T')[0],
      description: '',
      impact: '',
      tags: [],
      employer: '',
    };
    const updated = [newItem, ...achievements];
    saveAchievements(updated);
    setAchievements(updated);
    setQuickAdd('');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const recent = achievements.slice(0, 5);

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0F1E' }}>
      <Sidebar />
      <main className="flex-1 px-8 py-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Your career command centre</p>
        </div>

        {/* Profile strength */}
        <div className="rounded-xl p-6 mb-6" style={{ background: '#141929', border: '1px solid #1E2740' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold text-white">Profile strength</h2>
              <p className="text-sm mt-0.5" style={{ color: '#9CA3AF' }}>
                {profileStrength < 50
                  ? 'Add more achievements to improve your score'
                  : 'Great progress! Keep adding wins.'}
              </p>
            </div>
            <span className="text-2xl font-bold" style={{ color: '#FF6B2B' }}>{profileStrength}%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: '#1E2740' }}>
            <div
              className="h-2 rounded-full transition-all"
              style={{ background: '#FF6B2B', width: `${profileStrength}%` }}
            />
          </div>
        </div>

        {/* Quick add */}
        <div className="rounded-xl p-6 mb-6" style={{ background: '#141929', border: '1px solid #1E2740' }}>
          <h2 className="font-semibold text-white mb-4">Quick add</h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={quickAdd}
              onChange={e => setQuickAdd(e.target.value)}
              placeholder="What did you achieve today?"
              className="flex-1 px-4 py-3 rounded-lg text-white outline-none text-sm"
              style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
              onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
            />
            <button
              onClick={handleQuickAdd}
              className="px-5 py-3 rounded-lg font-semibold text-white cursor-pointer text-sm"
              style={{ background: '#FF6B2B' }}
            >
              {added ? '✓ Added!' : 'Add'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['work', 'certificate', 'course', 'book', 'project'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all"
                style={{
                  background: selectedCategory === cat ? '#FF6B2B' : '#1E2740',
                  color: selectedCategory === cat ? '#fff' : '#9CA3AF',
                  border: 'none',
                }}
              >
                {categoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total', value: stats.total },
            { label: 'Certificates', value: stats.certificates },
            { label: 'Courses', value: stats.courses },
            { label: 'Books', value: stats.books },
            { label: 'Projects', value: stats.projects },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: '#141929', border: '1px solid #1E2740' }}>
              <div className="text-2xl font-bold" style={{ color: '#FF6B2B' }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: '#6B7280' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent achievements */}
        <div className="rounded-xl" style={{ background: '#141929', border: '1px solid #1E2740' }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #1E2740' }}>
            <h2 className="font-semibold text-white">Recent achievements</h2>
            <Link to="/achievements" className="text-sm" style={{ color: '#FF6B2B', textDecoration: 'none' }}>View all →</Link>
          </div>
          {recent.length === 0 ? (
            <div className="px-6 py-12 text-center" style={{ color: '#4B5563' }}>
              <div className="text-3xl mb-3">🏆</div>
              <p>No achievements yet. Add your first win above.</p>
            </div>
          ) : (
            <div>
              {recent.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-6 py-4"
                  style={{ borderBottom: i < recent.length - 1 ? '1px solid #1E2740' : 'none' }}
                >
                  <span className="text-2xl">{categoryIcon(item.category)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1E2740', color: '#9CA3AF' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: '#4B5563' }}>{item.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
