import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = localStorage.getItem('achievement_record_user');
    if (raw) {
      try {
        const user = JSON.parse(raw);
        if (user.email === email) {
          navigate('/dashboard');
          return;
        }
      } catch { /* ignore */ }
    }
    setError('No account found — sign up for free.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0A0F1E' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>Sign in to your Achievement Record account</p>
        </div>

        <div className="rounded-xl p-8" style={{ background: '#141929', border: '1px solid #1E2740' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg text-white outline-none"
                style={{ background: '#0A0F1E', border: `1px solid ${error ? '#EF4444' : '#1E2740'}` }}
                required
              />
            </div>
            {error && (
              <p className="text-sm" style={{ color: '#EF4444' }}>
                {error}{' '}
                <Link to="/signup" style={{ color: '#FF6B2B' }}>Sign up for free</Link>
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white cursor-pointer"
              style={{ background: '#FF6B2B' }}
            >
              Continue →
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#6B7280' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#FF6B2B' }} className="font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
