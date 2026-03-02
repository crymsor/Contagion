import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/TopBar';
import StatCard from './Components/StatCard';
import ActivityFeed from './Components/ActivityFeed';
import QuickActions from './Components/QuickActions';
import SubmissionsTable from './Components/SubmissionsTable';
import RankPanel from './Components/RankPanel';

const DashboardPage = () => {
  const [sidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour12: false });
  const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Mock data
  const stats = [
    { label: 'Total Analyses', rawValue: '1247', suffix: '', change: '+14%', changePos: true, accentColor: '34,197,94', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, delay: 0 },
    { label: 'Threats Detected', rawValue: '389', suffix: '', change: '+23%', changePos: true, accentColor: '239,68,68', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, delay: 100 },
    { label: 'Reputation Score', rawValue: '2450', suffix: ' XP', change: '+180', changePos: true, accentColor: '139,92,246', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, delay: 200 },
    { label: 'Active Sandboxes', rawValue: '3', suffix: '', change: 'LIVE', changePos: true, accentColor: '34,211,238', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, delay: 300 },
  ];

  const submissions = [
    { id: 1, hash: '7f3ab9c1d2e4', family: 'Emotet', threat: 'CRITICAL', status: 'Completed', date: '2 hrs ago', score: 94 },
    { id: 2, hash: 'a1b2c3d4e5f6', family: 'AsyncRAT', threat: 'HIGH', status: 'Analyzing', date: '4 hrs ago', score: 81 },
    { id: 3, hash: 'f9e8d7c6b5a4', family: 'Mirai Botnet', threat: 'HIGH', status: 'Peer Review', date: '6 hrs ago', score: 77 },
    { id: 4, hash: '3c4d5e6f7a8b', family: 'LockBit 3.0', threat: 'CRITICAL', status: 'Completed', date: '1 day ago', score: 98 },
    { id: 5, hash: 'b1c2d3e4f5a6', family: 'Cobalt Strike', threat: 'HIGH', status: 'Queued', date: '1 day ago', score: null },
    { id: 6, hash: '9a8b7c6d5e4f', family: 'XMRig Miner', threat: 'MEDIUM', status: 'Completed', date: '2 days ago', score: 62 },
  ];

  const activityFeed = [
    { type: 'threat', msg: 'Critical threat detected in sample 7f3ab9c1', time: '2m ago', color: '#F87171' },
    { type: 'badge', msg: 'Achievement unlocked: Ransomware Analyst', time: '1h ago', color: '#FBBF24' },
    { type: 'review', msg: 'Peer review assigned for LockBit analysis', time: '3h ago', color: '#A78BFA' },
    { type: 'rank', msg: 'You moved up to rank #42 on leaderboard', time: '5h ago', color: '#22D3EE' },
    { type: 'ai', msg: 'AI eval completed: 94% accuracy score', time: '6h ago', color: '#22C55E' },
  ];

  return (
    <div
      className="min-h-screen flex relative"
      style={{ background: '#0A0B10' }}
    >

      {/* Grid */}
      <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />

      {/* Scanlines */}
      <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: sidebarOpen ? '220px' : '64px' }}>
        <TopBar currentTime={currentTime} formatDate={formatDate} />

        {/* Page body */}
        <main className="flex-1 p-6 space-y-6 relative z-10 overflow-auto">
          {/* Welcome row */}
          <div className="flex items-start justify-between animate-fade-up">
            <div>
              <h2 className="font-display text-2xl font-bold" style={{ color: '#F1F5F9' }}>
                Welcome back,{' '}
                <span style={{ color: '#22C55E', textShadow: '0 0 20px rgba(34,197,94,0.4)' }}>
                  Rafeel
                </span>
              </h2>
              <p className="font-body text-sm mt-1" style={{ color: '#475569' }}>
                Here's your threat intelligence overview.
              </p>
            </div>
            <Link
              to="/submissions"
              className="btn-toxic hidden md:flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Analysis
            </Link>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <SubmissionsTable submissions={submissions} />

            <div className="space-y-5">
              <ActivityFeed items={activityFeed} />
              <QuickActions />
            </div>
          </div>

          {/* Rank panel */}
          <RankPanel />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
