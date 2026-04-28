import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getUser, getAchievements, getBooks } from '../types';
import type { Achievement, Book } from '../types';

type Tab = 'cv' | 'review' | 'payrise' | 'linkedin';

function generateCVBullets(achievements: Achievement[]): string {
  if (achievements.length === 0) return '• Add achievements to generate CV bullets.';
  return achievements.map(a => {
    if (a.impact) {
      return `• ${a.title}${a.description ? ' — ' + a.description : ''}, resulting in ${a.impact}`;
    }
    return `• ${a.title}${a.description ? ' — ' + a.description : ''}`;
  }).join('\n');
}

function generateReview(achievements: Achievement[], books: Book[]): string {
  const workWins = achievements.filter(a => a.category === 'work' || a.category === 'project');
  const learning = achievements.filter(a => a.category === 'course' || a.category === 'certificate');

  const lines = ['KEY ACHIEVEMENTS THIS PERIOD'];
  if (workWins.length > 0) {
    workWins.forEach(a => lines.push(`  • ${a.title}${a.impact ? ' (' + a.impact + ')' : ''}`));
  } else {
    lines.push('  • Add work wins to populate this section');
  }

  lines.push('\nIMPACT DELIVERED');
  const impacts = achievements.filter(a => a.impact);
  if (impacts.length > 0) {
    impacts.forEach(a => lines.push(`  • ${a.impact} — via ${a.title}`));
  } else {
    lines.push('  • Add impact to your achievements to populate this section');
  }

  lines.push('\nPROFESSIONAL DEVELOPMENT');
  if (learning.length > 0) {
    learning.forEach(a => lines.push(`  • ${a.title}`));
  }
  if (books.length > 0) {
    books.forEach(b => lines.push(`  • Read: ${b.title} by ${b.author}`));
  }
  if (learning.length === 0 && books.length === 0) {
    lines.push('  • Add courses, certifications, and books to populate this section');
  }

  lines.push('\nLOOKING AHEAD');
  lines.push('  • [Add your goals for the next period here]');
  lines.push('  • [What are you working towards?]');

  return lines.join('\n');
}

function generatePayRise(achievements: Achievement[], books: Book[]): string {
  const lines = ['PAY RISE EVIDENCE PACK\n'];

  lines.push('EVIDENCE OF IMPACT');
  const withImpact = achievements.filter(a => a.impact);
  if (withImpact.length > 0) {
    withImpact.forEach(a => lines.push(`  • ${a.title}: ${a.impact}`));
  } else {
    lines.push('  • Add achievements with impact metrics to build your case');
  }

  lines.push('\nPROFESSIONAL DEVELOPMENT INVESTMENT');
  const learning = achievements.filter(a => a.category === 'course' || a.category === 'certificate');
  learning.forEach(a => lines.push(`  • ${a.title}`));
  books.forEach(b => lines.push(`  • Read: ${b.title} (${b.author})`));
  if (learning.length === 0 && books.length === 0) {
    lines.push('  • Add learning to show your professional investment');
  }

  lines.push('\nMARKET CONTEXT');
  lines.push('  • [Insert market salary data for your role]');
  lines.push('  • [Reference industry benchmarks]');
  lines.push('  • [Note tenure and progression since last review]');

  lines.push('\nSUMMARY');
  lines.push('  Based on the evidence above, I am requesting a salary review reflecting my contributions and professional growth over the past period.');

  return lines.join('\n');
}

function generateLinkedIn(achievements: Achievement[], books: Book[]): string {
  const user = JSON.parse(localStorage.getItem('proofline_user') || '{}');
  const name = user.name || 'Professional';
  const topWins = achievements.filter(a => a.category === 'work').slice(0, 3);
  const skills = [...new Set(achievements.flatMap(a => a.tags))].slice(0, 5);

  const lines = [];
  lines.push(`I'm ${name} — a results-driven professional focused on delivering measurable impact.`);
  lines.push('');

  if (topWins.length > 0) {
    lines.push('Recent highlights:');
    topWins.forEach(a => {
      lines.push(`→ ${a.title}${a.impact ? ' (' + a.impact + ')' : ''}`);
    });
    lines.push('');
  }

  if (skills.length > 0) {
    lines.push(`Core strengths: ${skills.join(' · ')}`);
    lines.push('');
  }

  if (books.length > 0) {
    lines.push(`Committed to continuous learning — currently building on insights from ${books[0].title} and more.`);
    lines.push('');
  }

  lines.push('Always open to conversations about [your focus area]. Connect or reach out anytime.');

  return lines.join('\n');
}

function OutputPanel({ content, locked }: { content: string; locked?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {locked && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl z-10"
          style={{ background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(4px)' }}
        >
          <div className="text-3xl mb-3">🔒</div>
          <p className="font-semibold text-white mb-1">Pro feature</p>
          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Unlock with Proofline Pro</p>
          <button
            className="px-5 py-2 rounded-lg font-semibold text-white text-sm cursor-pointer"
            style={{ background: '#FF6B2B' }}
          >
            Upgrade to Pro — £7/month
          </button>
        </div>
      )}
      <div className="rounded-xl p-5" style={{ background: '#141929', border: '1px solid #1E2740', filter: locked ? 'blur(2px)' : 'none' }}>
        <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed" style={{ color: '#D1D5DB' }}>
          {content}
        </pre>
      </div>
      {!locked && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
            style={{ background: '#1E2740', color: '#9CA3AF' }}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
            style={{ background: '#1E2740', color: '#9CA3AF' }}
          >
            📄 Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default function Outputs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('cv');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate('/signup'); return; }
    setAchievements(getAchievements());
    setBooks(getBooks());
  }, [navigate]);

  const tabs: { key: Tab; label: string; locked?: boolean }[] = [
    { key: 'cv', label: '📄 CV Bullets' },
    { key: 'review', label: '📋 Annual Review' },
    { key: 'payrise', label: '💰 Pay Rise Pack', locked: true },
    { key: 'linkedin', label: '💼 LinkedIn About', locked: true },
  ];

  const content = {
    cv: generateCVBullets(achievements),
    review: generateReview(achievements, books),
    payrise: generatePayRise(achievements, books),
    linkedin: generateLinkedIn(achievements, books),
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0F1E' }}>
      <Sidebar />
      <main className="flex-1 px-8 py-8 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Career Outputs</h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Generated from your achievements — ready to use</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all flex items-center gap-2"
              style={{
                background: tab === t.key ? '#FF6B2B' : '#141929',
                color: tab === t.key ? '#fff' : '#9CA3AF',
                border: `1px solid ${tab === t.key ? '#FF6B2B' : '#1E2740'}`,
              }}
            >
              {t.label}
              {t.locked && <span className="text-xs" style={{ opacity: 0.7 }}>🔒</span>}
            </button>
          ))}
        </div>

        {/* Output */}
        <OutputPanel
          content={content[tab]}
          locked={tabs.find(t => t.key === tab)?.locked}
        />

        {achievements.length === 0 && (
          <div className="mt-4 px-4 py-3 rounded-lg text-sm" style={{ background: '#141929', border: '1px solid #1E2740', color: '#9CA3AF' }}>
            💡 Your outputs will improve as you add more achievements. Head to{' '}
            <a href="/achievements" style={{ color: '#FF6B2B' }}>Achievements</a> to add your wins.
          </div>
        )}
      </main>
    </div>
  );
}
