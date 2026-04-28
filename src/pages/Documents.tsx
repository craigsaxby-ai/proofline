import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getUser } from '../types';

export default function Documents() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate('/signup'); return; }
  }, [navigate]);

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0F1E' }}>
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Your career documents vault</p>
        </div>

        <div className="rounded-xl py-16 text-center" style={{ background: '#141929', border: '1px solid #1E2740' }}>
          <div className="text-5xl mb-4">📁</div>
          <h3 className="text-lg font-semibold text-white mb-2">Document uploads coming soon</h3>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>Upload your CV, certificates, and LinkedIn profile for AI analysis.</p>
          <div className="mt-6">
            <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: '#FF6B2B20', color: '#FF6B2B', border: '1px solid #FF6B2B40' }}>
              Pro feature — coming soon
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
