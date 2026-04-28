import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getUser, getAchievements, saveAchievements, categoryIcon } from '../types';
import type { Achievement } from '../types';

const CATEGORIES = ['All', 'work', 'certificate', 'course', 'book', 'project'] as const;
type FilterCat = typeof CATEGORIES[number];

const emptyForm = (): Omit<Achievement, 'id'> => ({
  category: 'work',
  title: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  impact: '',
  tags: [],
  employer: '',
});

export default function Achievements() {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<FilterCat>('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [tagInput, setTagInput] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate('/signup'); return; }
    setAchievements(getAchievements());
  }, [navigate]);

  const filtered = filter === 'All' ? achievements : achievements.filter(a => a.category === filter);

  const openAdd = () => { setForm(emptyForm()); setTagInput(''); setEditId(null); setShowModal(true); };
  const openEdit = (item: Achievement) => {
    setForm({ category: item.category, title: item.title, date: item.date, description: item.description, impact: item.impact, tags: item.tags, employer: item.employer });
    setTagInput(item.tags.join(', '));
    setEditId(item.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    const updated = editId
      ? achievements.map(a => a.id === editId ? { ...form, tags, id: editId } : a)
      : [{ ...form, tags, id: Date.now().toString() }, ...achievements];
    saveAchievements(updated);
    setAchievements(updated);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = achievements.filter(a => a.id !== id);
    saveAchievements(updated);
    setAchievements(updated);
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0F1E' }}>
      <Sidebar />
      <main className="flex-1 px-8 py-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Achievements</h1>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>{achievements.length} total</p>
          </div>
          <button
            onClick={openAdd}
            className="px-4 py-2 rounded-lg font-semibold text-white text-sm cursor-pointer"
            style={{ background: '#FF6B2B' }}
          >
            + Add achievement
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all"
              style={{
                background: filter === cat ? '#FF6B2B' : '#141929',
                color: filter === cat ? '#fff' : '#9CA3AF',
                border: `1px solid ${filter === cat ? '#FF6B2B' : '#1E2740'}`,
              }}
            >
              {cat === 'All' ? 'All' : `${categoryIcon(cat)} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
            </button>
          ))}
        </div>

        {/* Achievement cards */}
        {filtered.length === 0 ? (
          <div className="rounded-xl py-16 text-center" style={{ background: '#141929', border: '1px solid #1E2740' }}>
            <div className="text-4xl mb-3">🏆</div>
            <p style={{ color: '#4B5563' }}>No achievements here yet. Add your first win!</p>
            <button
              onClick={openAdd}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer"
              style={{ background: '#FF6B2B' }}
            >
              + Add achievement
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="rounded-xl p-5" style={{ background: '#141929', border: '1px solid #1E2740' }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{categoryIcon(item.category)}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{item.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{item.date}{item.employer ? ` · ${item.employer}` : ''}</p>
                    {item.description && (
                      <p className="text-sm mt-2" style={{ color: '#9CA3AF' }}>{item.description}</p>
                    )}
                    {item.impact && (
                      <p className="text-sm mt-1 font-medium" style={{ color: '#10B981' }}>↑ {item.impact}</p>
                    )}
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1E2740', color: '#9CA3AF' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-xs px-2 py-1 rounded cursor-pointer"
                      style={{ background: '#1E2740', color: '#9CA3AF' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs px-2 py-1 rounded cursor-pointer"
                      style={{ background: '#1E2740', color: '#EF4444' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FAB */}
        <button
          onClick={openAdd}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-white text-2xl shadow-lg cursor-pointer"
          style={{ background: '#FF6B2B' }}
        >
          +
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <div className="w-full max-w-lg rounded-xl p-6" style={{ background: '#141929', border: '1px solid #1E2740' }}>
              <h2 className="text-lg font-semibold text-white mb-4">{editId ? 'Edit achievement' : 'Add achievement'}</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Title *</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                    style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="What did you accomplish?"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Category</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                      style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value as Achievement['category'] }))}
                    >
                      <option value="work">Work Win</option>
                      <option value="certificate">Certificate</option>
                      <option value="course">Course</option>
                      <option value="book">Book</option>
                      <option value="project">Project</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                      style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                      value={form.date}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Description</label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none resize-none"
                    style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                    rows={2}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="What did you do?"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Impact</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                    style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                    value={form.impact}
                    onChange={e => setForm(f => ({ ...f, impact: e.target.value }))}
                    placeholder="e.g. Saved £50k, Increased conversion 20%"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Tags (comma-separated)</label>
                    <input
                      className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                      style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      placeholder="leadership, product"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Employer</label>
                    <input
                      className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                      style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                      value={form.employer}
                      onChange={e => setForm(f => ({ ...f, employer: e.target.value }))}
                      placeholder="Company name"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 rounded-lg text-sm cursor-pointer"
                  style={{ background: '#1E2740', color: '#9CA3AF' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer"
                  style={{ background: '#FF6B2B' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
