import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getUser, getBooks, saveBooks } from '../types';
import type { Book } from '../types';
import { supabase } from '../lib/supabase';

const emptyBook = (): Omit<Book, 'id'> => ({
  title: '',
  author: '',
  dateRead: new Date().toISOString().split('T')[0],
  takeaway: '',
  rating: 4,
});

function Stars({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
          style={{ background: 'none', border: 'none', padding: 0, fontSize: 16 }}
        >
          <span style={{ color: s <= rating ? '#FF6B2B' : '#1E2740' }}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyBook());

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate('/signup'); return; }
    setBooks(getBooks());
  }, [navigate]);

  const handleSave = () => {
    if (!form.title.trim()) return;
    const updated = [{ ...form, id: Date.now().toString() }, ...books];
    saveBooks(updated);
    setBooks(updated);
    setShowModal(false);
    setForm(emptyBook());

    // Persist to Supabase for cross-device sync
    const user = JSON.parse(localStorage.getItem('achievement_record_user') || '{}')
    if (user.email && supabase) {
      supabase.from('ar_books').insert({
        user_email: user.email,
        title: form.title,
        author: form.author,
        date_read: form.dateRead,
        key_takeaway: form.takeaway,
        rating: form.rating,
      }).then(({ error }: { error: unknown }) => {
        if (error) console.error('[ar] book save error:', error)
      })
    }
  };

  const handleDelete = (id: string) => {
    const updated = books.filter(b => b.id !== id);
    saveBooks(updated);
    setBooks(updated);
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0F1E' }}>
      <Sidebar />
      <main className="flex-1 px-8 py-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Books read</h1>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>{books.length} books logged</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg font-semibold text-white text-sm cursor-pointer"
            style={{ background: '#FF6B2B' }}
          >
            + Add book
          </button>
        </div>

        {books.length === 0 ? (
          <div className="rounded-xl py-16 text-center" style={{ background: '#141929', border: '1px solid #1E2740' }}>
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-white mb-2">The best professionals never stop learning.</h3>
            <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>Add the first book you've read.</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer"
              style={{ background: '#FF6B2B' }}
            >
              + Add your first book
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map(book => (
              <div key={book.id} className="rounded-xl p-5" style={{ background: '#141929', border: '1px solid #1E2740' }}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="text-3xl">📖</div>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-xs px-2 py-1 rounded cursor-pointer shrink-0"
                    style={{ background: '#1E2740', color: '#EF4444' }}
                  >
                    ✕
                  </button>
                </div>
                <h3 className="font-semibold text-white mb-0.5 leading-tight">{book.title}</h3>
                <p className="text-sm mb-2" style={{ color: '#9CA3AF' }}>{book.author}</p>
                <Stars rating={book.rating} />
                {book.takeaway && (
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: '#9CA3AF' }}>
                    "{book.takeaway}"
                  </p>
                )}
                <p className="text-xs mt-3" style={{ color: '#4B5563' }}>Read {book.dateRead}</p>
              </div>
            ))}
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-white text-2xl shadow-lg cursor-pointer"
          style={{ background: '#FF6B2B' }}
        >
          +
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <div className="w-full max-w-md rounded-xl p-6" style={{ background: '#141929', border: '1px solid #1E2740' }}>
              <h2 className="text-lg font-semibold text-white mb-4">Add a book</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Title *</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                    style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Book title"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Author</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                    style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                    value={form.author}
                    onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Date read</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                    style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                    value={form.dateRead}
                    onChange={e => setForm(f => ({ ...f, dateRead: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>Key takeaway</label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none resize-none"
                    style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                    rows={3}
                    value={form.takeaway}
                    onChange={e => setForm(f => ({ ...f, takeaway: e.target.value }))}
                    placeholder="What was the main lesson you took from this book?"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#9CA3AF' }}>Rating</label>
                  <Stars rating={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
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
                  Save book
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
