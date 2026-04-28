export interface Achievement {
  id: string;
  category: 'work' | 'course' | 'book' | 'certificate' | 'project';
  title: string;
  date: string;
  description: string;
  impact: string;
  tags: string[];
  employer: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  dateRead: string;
  takeaway: string;
  rating: number;
}

export interface User {
  name: string;
  email: string;
}

export const SEED_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    category: 'work',
    title: 'Led Q3 product launch',
    date: '2025-09-01',
    description: 'Coordinated cross-functional team of 8 to deliver on time',
    impact: 'Generated £200k incremental revenue',
    tags: ['leadership', 'product'],
    employer: 'Current',
  },
  {
    id: '2',
    category: 'course',
    title: 'Completed AWS Solutions Architect',
    date: '2025-10-15',
    description: 'Passed certification exam on first attempt',
    impact: 'Cloud infrastructure expertise',
    tags: ['technical', 'certification'],
    employer: '',
  },
  {
    id: '3',
    category: 'book',
    title: 'The Hard Thing About Hard Things',
    date: '2025-11-01',
    description: 'Ben Horowitz on building a business when there are no easy answers',
    impact: 'Applied learnings to team management decisions',
    tags: ['leadership', 'strategy'],
    employer: '',
  },
];

export function getUser(): User | null {
  const raw = localStorage.getItem('proofline_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function getAchievements(): Achievement[] {
  const raw = localStorage.getItem('proofline_achievements');
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function saveAchievements(items: Achievement[]): void {
  localStorage.setItem('proofline_achievements', JSON.stringify(items));
}

export function getBooks(): Book[] {
  const raw = localStorage.getItem('proofline_books');
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function saveBooks(items: Book[]): void {
  localStorage.setItem('proofline_books', JSON.stringify(items));
}

export function categoryIcon(cat: string): string {
  switch (cat) {
    case 'work': return '🏆';
    case 'course': return '🎓';
    case 'book': return '📖';
    case 'certificate': return '📜';
    case 'project': return '🚀';
    default: return '⭐';
  }
}
