import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEED_ACHIEVEMENTS, saveAchievements } from '../types';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name, email };
    localStorage.setItem('proofline_user', JSON.stringify(user));
    // Seed sample achievements if none exist
    const existing = localStorage.getItem('proofline_achievements');
    if (!existing) {
      saveAchievements(SEED_ACHIEVEMENTS);
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0A0F1E' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Start tracking your career</h1>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>Free. No credit card required.</p>
        </div>

        <div className="rounded-xl p-8" style={{ background: '#141929', border: '1px solid #1E2740' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Full name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-4 py-3 rounded-lg text-white outline-none"
                style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg text-white outline-none"
                style={{ background: '#0A0F1E', border: '1px solid #1E2740' }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white cursor-pointer mt-2"
              style={{ background: '#FF6B2B' }}
            >
              Start for free →
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#6B7280' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#FF6B2B' }} className="font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: '#4B5563' }}>
          By signing up you agree to our Terms &amp; Privacy Policy
        </p>
      </div>
    </div>
  );
}
