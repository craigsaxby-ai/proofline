import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0A0F1E', color: '#fff' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #1E2740' }} className="px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-white">Proofline</span>
          <span className="ml-3 text-sm" style={{ color: '#6B7280' }}>Your career, always on record.</span>
        </div>
        <button
          onClick={() => navigate('/signup')}
          className="px-4 py-2 rounded-lg font-semibold text-sm text-white cursor-pointer"
          style={{ background: '#FF6B2B' }}
        >
          Get started free
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Every win, every course, every achievement —{' '}
            <span style={{ color: '#FF6B2B' }}>organised for you.</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: '#9CA3AF' }}>
            Drop in your CV, LinkedIn profile, certificates and work wins. Proofline turns them into an always-updated career profile, review summary, and pay-rise evidence pack.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3 rounded-lg font-semibold text-white cursor-pointer"
              style={{ background: '#FF6B2B' }}
            >
              Start for free →
            </button>
            <button
              className="px-6 py-3 rounded-lg font-semibold cursor-pointer"
              style={{ border: '1px solid #1E2740', color: '#9CA3AF', background: 'transparent' }}
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See how it works ↓
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div className="flex-1 w-full max-w-md">
          <div className="rounded-xl p-6" style={{ background: '#141929', border: '1px solid #1E2740' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF6B2B' }}></div>
              <span className="text-sm font-semibold" style={{ color: '#9CA3AF' }}>Recent Achievements</span>
            </div>
            {[
              { icon: '🏆', title: 'Led product launch', detail: '→ £200k revenue', color: '#FF6B2B', date: 'Sep 2025' },
              { icon: '🎓', title: 'Completed AWS certification', detail: '→ Solutions Architect', color: '#10B981', date: 'Oct 2025' },
              { icon: '📖', title: 'Read: The Hard Thing About Hard Things', detail: '→ Ben Horowitz', color: '#8B5CF6', date: 'Nov 2025' },
              { icon: '🚀', title: 'Launched new product feature', detail: '→ 40% engagement lift', color: '#FF6B2B', date: 'Jan 2026' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: i < 3 ? '1px solid #1E2740' : 'none' }}>
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{item.title}</p>
                  <p className="text-xs" style={{ color: item.color }}>{item.detail}</p>
                </div>
                <span className="text-xs shrink-0" style={{ color: '#4B5563' }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Built for the moments that matter most</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📋', title: 'Annual Performance Review', desc: 'Generate a polished evidence pack for your yearly review in minutes.' },
            { icon: '💰', title: 'Pay Rise Evidence', desc: 'Build an undeniable case with structured proof of impact.' },
            { icon: '📄', title: 'Always-Updated CV', desc: 'Your CV updates itself every time you add a win.' },
          ].map((card, i) => (
            <div key={i} className="rounded-xl p-6" style={{ background: '#141929', border: '1px solid #1E2740' }}>
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Books highlight */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-xl p-8 flex flex-col md:flex-row items-center gap-6" style={{ background: '#141929', border: '1px solid #1E2740' }}>
          <div className="text-5xl">📚</div>
          <div>
            <h3 className="text-xl font-bold mb-2">Track the books you've read</h3>
            <p style={{ color: '#9CA3AF' }}>
              Because the best professionals never stop learning. Log your reads, capture key takeaways, and Proofline includes them in your professional development evidence automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Simple pricing. No surprises.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="rounded-xl p-8" style={{ background: '#141929', border: '1px solid #1E2740' }}>
            <div className="text-sm font-medium mb-2" style={{ color: '#9CA3AF' }}>FREE</div>
            <div className="text-3xl font-bold mb-1">£0</div>
            <div className="text-sm mb-6" style={{ color: '#6B7280' }}>forever</div>
            <ul className="space-y-3 mb-8">
              {['Upload your CV', 'Add up to 10 achievements', 'Basic career timeline', 'CV bullet generator'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span style={{ color: '#10B981' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-3 rounded-lg font-semibold cursor-pointer"
              style={{ border: '1px solid #1E2740', color: '#fff', background: 'transparent' }}
            >
              Start free
            </button>
          </div>
          {/* Pro */}
          <div className="rounded-xl p-8 relative overflow-hidden" style={{ background: '#141929', border: '2px solid #FF6B2B' }}>
            <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded" style={{ background: '#FF6B2B' }}>POPULAR</div>
            <div className="text-sm font-medium mb-2" style={{ color: '#FF6B2B' }}>PRO</div>
            <div className="text-3xl font-bold mb-1">£7<span className="text-lg font-normal">/mo</span></div>
            <div className="text-sm mb-6" style={{ color: '#6B7280' }}>cancel anytime</div>
            <ul className="space-y-3 mb-8">
              {[
                'Everything in Free',
                'AI-generated career outputs',
                'LinkedIn About optimisation',
                'Annual review packs',
                'Pay rise evidence pack',
                'Books vault + learning profile',
                'Monthly achievement reminders',
                'PDF export',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span style={{ color: '#FF6B2B' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-3 rounded-lg font-semibold text-white cursor-pointer"
              style={{ background: '#FF6B2B' }}
            >
              Get Pro
            </button>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Join 500+ professionals already tracking their wins</h2>
        <p className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Be the first to know when new features launch.</p>
        {submitted ? (
          <div className="py-4 px-6 rounded-lg" style={{ background: '#10B981', color: '#fff' }}>
            🎉 You're on the list! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-white outline-none"
              style={{ background: '#141929', border: '1px solid #1E2740' }}
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold text-white cursor-pointer whitespace-nowrap"
              style={{ background: '#FF6B2B' }}
            >
              Get early access
            </button>
          </form>
        )}
        <p className="text-xs mt-3" style={{ color: '#4B5563' }}>Free to start. No credit card.</p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-sm" style={{ borderTop: '1px solid #1E2740', color: '#6B7280' }}>
        <div className="flex flex-wrap justify-center gap-6">
          <span className="font-semibold text-white">Proofline</span>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <span>A Second Orbit product</span>
        </div>
      </footer>
    </div>
  );
}
