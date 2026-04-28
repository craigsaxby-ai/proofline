import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getUser, getAchievements, categoryIcon } from '../types';
import type { Achievement } from '../types';

interface YearGroup {
  year: string;
  achievements: Achievement[];
}

function groupByYear(achievements: Achievement[]): YearGroup[] {
  const map: Record<string, Achievement[]> = {};
  for (const a of achievements) {
    const year = a.date?.split('-')[0] || 'Unknown';
    if (!map[year]) map[year] = [];
    map[year].push(a);
  }
  return Object.entries(map)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, achievements]) => ({ year, achievements }));
}

export default function Timeline() {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate('/signup'); return; }
    setAchievements(getAchievements());
  }, [navigate]);

  const groups = groupByYear(achievements);

  const toggleYear = (year: string) => {
    setExpandedYears(prev => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0F1E' }}>
      <Sidebar />
      <main className="flex-1 px-8 py-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Career Timeline</h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Your achievements, year by year</p>
        </div>

        {groups.length === 0 ? (
          <div
            className="rounded-xl py-20 text-center"
            style={{ background: '#141929', border: '1px solid #1E2740' }}
          >
            <div className="text-4xl mb-4">📅</div>
            <p style={{ color: '#4B5563' }}>No achievements yet. Start adding wins to see your timeline.</p>
          </div>
        ) : (
          <div className="relative ml-4">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{ background: '#1E2740' }}
            />

            <div className="space-y-10">
              {groups.map(({ year, achievements: yearAchievements }) => {
                const isExpanded = expandedYears.has(year);
                const topTitles = yearAchievements.slice(0, 4);

                return (
                  <div key={year} className="relative pl-16">
                    {/* Year circle */}
                    <div
                      className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-lg"
                      style={{ background: '#FF6B2B', top: 0, zIndex: 1 }}
                    >
                      {yearAchievements.length}
                    </div>

                    {/* Year header — clickable */}
                    <button
                      onClick={() => toggleYear(year)}
                      className="w-full text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-xl font-bold text-white">{year}</h2>
                        <span
                          className="px-3 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(255,107,43,0.15)', color: '#FF6B2B', border: '1px solid rgba(255,107,43,0.3)' }}
                        >
                          {yearAchievements.length} achievement{yearAchievements.length !== 1 ? 's' : ''}
                        </span>
                        <span style={{ color: '#4B5563', fontSize: 12 }}>{isExpanded ? '▲ collapse' : '▼ expand'}</span>
                      </div>

                      {/* Tag pills — top achievements preview */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {topTitles.map(a => (
                          <span
                            key={a.id}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: '#141929', color: '#9CA3AF', border: '1px solid #1E2740' }}
                          >
                            {categoryIcon(a.category)} {a.title.length > 40 ? a.title.slice(0, 40) + '…' : a.title}
                          </span>
                        ))}
                        {yearAchievements.length > 4 && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: '#1E2740', color: '#6B7280' }}
                          >
                            +{yearAchievements.length - 4} more
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Expanded achievements list */}
                    {isExpanded && (
                      <div
                        className="mt-3 rounded-xl overflow-hidden"
                        style={{ border: '1px solid #1E2740' }}
                      >
                        {yearAchievements.map((item, i) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-4 px-5 py-4"
                            style={{
                              background: '#141929',
                              borderBottom: i < yearAchievements.length - 1 ? '1px solid #1E2740' : 'none',
                            }}
                          >
                            <span className="text-xl mt-0.5">{categoryIcon(item.category)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white">{item.title}</p>
                              {item.description && (
                                <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{item.description}</p>
                              )}
                              {item.impact && (
                                <p className="text-xs mt-1 font-medium" style={{ color: '#10B981' }}>↑ {item.impact}</p>
                              )}
                              {item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {item.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className="text-xs px-2 py-0.5 rounded"
                                      style={{ background: '#1E2740', color: '#6B7280' }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs shrink-0" style={{ color: '#4B5563' }}>{item.date}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
