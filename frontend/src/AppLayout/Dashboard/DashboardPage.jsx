import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Auth will be wired up later

/* ── Animated counter hook ──────────────────────────────────── */
const useCounter = (target, duration = 1200, delay = 0) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start;
    let raf;
    const delayTimer = setTimeout(() => {
      const tick = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        setValue(Math.floor(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(delayTimer); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return value;
};

/* ── 3D tilt hook ───────────────────────────────────────────── */
const useTilt = (strength = 8) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovering: false });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -strength,
      y: ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  strength,
      hovering: true,
    });
  }, [strength]);

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0, hovering: false }), []);

  return { ref, tilt, onMove, onLeave };
};

/* ── Severity badge ─────────────────────────────────────────── */
const SeverityBadge = ({ level }) => {
  const map = {
    CRITICAL: { cls: 'badge-critical', dot: '#F87171' },
    HIGH:     { cls: 'badge-high',     dot: '#FB923C' },
    MEDIUM:   { cls: 'badge-medium',   dot: '#FBBF24' },
    LOW:      { cls: 'badge-low',      dot: '#4ADE80' },
    INFO:     { cls: 'badge-info',     dot: '#22D3EE' },
  };
  const cfg = map[level] || map.INFO;
  return (
    <span className={cfg.cls + ' inline-flex items-center gap-1'}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {level}
    </span>
  );
};

/* ── Status badge ───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    'Completed':    { bg: 'rgba(34,197,94,0.08)',  color: '#4ADE80', border: 'rgba(34,197,94,0.2)' },
    'Analyzing':    { bg: 'rgba(34,211,238,0.08)', color: '#22D3EE', border: 'rgba(34,211,238,0.2)', pulse: true },
    'Queued':       { bg: 'rgba(245,158,11,0.08)', color: '#FBBF24', border: 'rgba(245,158,11,0.2)' },
    'Failed':       { bg: 'rgba(239,68,68,0.08)',  color: '#F87171', border: 'rgba(239,68,68,0.2)' },
    'Peer Review':  { bg: 'rgba(139,92,246,0.08)', color: '#A78BFA', border: 'rgba(139,92,246,0.2)' },
  };
  const cfg = map[status] || map.Queued;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-code text-[10px] font-semibold tracking-wider"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
    >
      {cfg.pulse ? (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: cfg.color, animation: 'blink 1s step-end infinite' }}
        />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      )}
      {status}
    </span>
  );
};

/* ── Stat card ──────────────────────────────────────────────── */
const StatCard = ({ label, rawValue, suffix = '', change, changePos, icon, accentColor, delay, index }) => {
  const { ref, tilt, onMove, onLeave } = useTilt(6);
  const numericTarget = parseInt(String(rawValue).replace(/[^0-9]/g, ''), 10) || 0;
  const counted = useCounter(numericTarget, 1000, delay);
  const displayValue = rawValue.toString().includes(',')
    ? counted.toLocaleString()
    : counted.toString();

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-xl p-5 relative overflow-hidden transition-glow animate-fade-up"
      style={{
        background: 'rgba(12,13,20,0.8)',
        border: `1px solid ${tilt.hovering ? `rgba(${accentColor},0.25)` : 'rgba(30,34,51,0.9)'}`,
        boxShadow: tilt.hovering ? `0 0 40px rgba(${accentColor},0.1), 0 20px 40px rgba(0,0,0,0.4)` : '0 4px 24px rgba(0,0,0,0.3)',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.hovering ? 1.02 : 1},${tilt.hovering ? 1.02 : 1},${tilt.hovering ? 1.02 : 1})`,
        transition: tilt.hovering ? 'transform 0.08s ease, box-shadow 0.3s ease, border-color 0.3s ease' : 'transform 0.5s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
        animationDelay: `${index * 100}ms`,
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Accent glow corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${accentColor},0.12), transparent)` }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `rgba(${accentColor},0.1)`,
              border: `1px solid rgba(${accentColor},0.2)`,
            }}
          >
            {icon}
          </div>
          <span
            className="font-code text-xs px-2 py-0.5 rounded"
            style={{
              background: changePos ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              color: changePos ? '#4ADE80' : '#F87171',
              border: `1px solid ${changePos ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
            }}
          >
            {change}
          </span>
        </div>

        <p
          className="font-display text-3xl font-bold mb-1 tabular-nums"
          style={{
            color: '#F1F5F9',
            textShadow: `0 0 20px rgba(${accentColor},0.3)`,
          }}
        >
          {displayValue}{suffix}
        </p>
        <p className="font-body text-sm" style={{ color: '#64748B' }}>{label}</p>
      </div>
    </div>
  );
};

/* ── Nav item ───────────────────────────────────────────────── */
const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all duration-200 group"
    style={{
      background: active ? 'rgba(34,197,94,0.08)' : 'transparent',
      color: active ? '#22C55E' : '#64748B',
      border: active ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent',
    }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#94A3B8'; }}}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}}
  >
    <span
      className="transition-colors duration-200"
      style={{ color: active ? '#22C55E' : '#475569' }}
    >
      {icon}
    </span>
    <span>{label}</span>
    {active && (
      <div
        className="ml-auto w-1.5 h-1.5 rounded-full"
        style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.8)' }}
      />
    )}
  </Link>
);

/* ─────────────────────────────────────────────────────────────
   Main Dashboard Component
──────────────────────────────────────────────────────────────── */
const DashboardPage = () => {
  const user = { name: 'Rafeel Subhani', email: 'rafeel@contagion.sec' };
  const logout = () => console.log('logout');
  const location                             = useLocation();
  const [cursorPos, setCursorPos]            = useState({ x: 50, y: 50 });
  const [profileOpen, setProfileOpen]        = useState(false);
  const [sidebarOpen, setSidebarOpen]        = useState(true);
  const [currentTime, setCurrentTime]        = useState(new Date());
  const profileRef                           = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setCursorPos({
      x: (e.clientX / window.innerWidth)  * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour12: false });
  const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  /* ── Mock data ── */
  const stats = [
    { label: 'Total Analyses',   rawValue: '1247',  suffix: '',    change: '+14%',  changePos: true,  accentColor: '34,197,94',   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,  delay: 0 },
    { label: 'Threats Detected', rawValue: '389',   suffix: '',    change: '+23%',  changePos: true,  accentColor: '239,68,68',   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, delay: 100 },
    { label: 'Reputation Score', rawValue: '2450',  suffix: ' XP', change: '+180',  changePos: true,  accentColor: '139,92,246',  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, delay: 200 },
    { label: 'Active Sandboxes', rawValue: '3',     suffix: '',    change: 'LIVE',  changePos: true,  accentColor: '34,211,238',  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, delay: 300 },
  ];

  const submissions = [
    { id: 1, hash: '7f3ab9c1d2e4',  family: 'Emotet',         threat: 'CRITICAL', status: 'Completed',   date: '2 hrs ago',  score: 94 },
    { id: 2, hash: 'a1b2c3d4e5f6',  family: 'AsyncRAT',       threat: 'HIGH',     status: 'Analyzing',   date: '4 hrs ago',  score: 81 },
    { id: 3, hash: 'f9e8d7c6b5a4',  family: 'Mirai Botnet',   threat: 'HIGH',     status: 'Peer Review', date: '6 hrs ago',  score: 77 },
    { id: 4, hash: '3c4d5e6f7a8b',  family: 'LockBit 3.0',    threat: 'CRITICAL', status: 'Completed',   date: '1 day ago',  score: 98 },
    { id: 5, hash: 'b1c2d3e4f5a6',  family: 'Cobalt Strike',  threat: 'HIGH',     status: 'Queued',      date: '1 day ago',  score: null },
    { id: 6, hash: '9a8b7c6d5e4f',  family: 'XMRig Miner',    threat: 'MEDIUM',   status: 'Completed',   date: '2 days ago', score: 62 },
  ];

  const activityFeed = [
    { type: 'threat', msg: 'Critical threat detected in sample 7f3ab9c1', time: '2m ago',  color: '#F87171' },
    { type: 'badge',  msg: 'Achievement unlocked: Ransomware Analyst',    time: '1h ago',  color: '#FBBF24' },
    { type: 'review', msg: 'Peer review assigned for LockBit analysis',   time: '3h ago',  color: '#A78BFA' },
    { type: 'rank',   msg: 'You moved up to rank #42 on leaderboard',     time: '5h ago',  color: '#22D3EE' },
    { type: 'ai',     msg: 'AI eval completed: 94% accuracy score',       time: '6h ago',  color: '#22C55E' },
  ];

  const navItems = [
    { to: '/dashboard',   label: 'Dashboard',   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { to: '/submissions', label: 'Submissions', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> },
    { to: '/sandbox',     label: 'Sandbox',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { to: '/reviews',     label: 'Reviews',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  ];

  return (
    <div
      className="min-h-screen flex relative overflow-hidden"
      style={{ background: '#0A0B10' }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Cursor glow ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          background: `radial-gradient(800px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(34,197,94,0.04) 0%, transparent 60%)`,
        }}
      />

      {/* ── Grid ── */}
      <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40 z-0" />

      {/* ── Scanlines ── */}
      <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20 z-0" />

      {/* ═══════════════════════════════
          SIDEBAR
      ═══════════════════════════════ */}
      <aside
        className="fixed left-0 top-0 bottom-0 flex flex-col z-30 transition-all duration-300"
        style={{
          width: sidebarOpen ? '220px' : '64px',
          background: 'rgba(5,5,8,0.95)',
          borderRight: '1px solid rgba(30,34,51,0.8)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 h-16 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(30,34,51,0.6)' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.3)',
              boxShadow: '0 0 12px rgba(34,197,94,0.2)',
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse-green" style={{ background: '#22C55E' }} />
          </div>
          {sidebarOpen && (
            <span
              className="font-display text-sm font-bold tracking-[0.15em]"
              style={{ color: '#F1F5F9', whiteSpace: 'nowrap' }}
            >
              CONTAGION
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto transition-colors duration-200"
            style={{ color: '#475569' }}
            onMouseEnter={e => e.currentTarget.style.color = '#22C55E'}
            onMouseLeave={e => e.currentTarget.style.color = '#475569'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? (
                <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            sidebarOpen ? (
              <NavItem key={item.to} {...item} active={location.pathname === item.to} />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-center w-10 h-10 rounded-lg mx-auto transition-all duration-200"
                style={{
                  background: location.pathname === item.to ? 'rgba(34,197,94,0.1)' : 'transparent',
                  color: location.pathname === item.to ? '#22C55E' : '#475569',
                  border: location.pathname === item.to ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent',
                }}
              >
                {item.icon}
              </Link>
            )
          ))}
        </nav>

        {/* Sidebar footer */}
        {sidebarOpen && (
          <div
            className="px-4 py-4 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(30,34,51,0.6)' }}
          >
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse-green" style={{ background: '#22C55E' }} />
                <span className="font-code text-[9px] tracking-widest uppercase" style={{ color: '#22C55E' }}>System Online</span>
              </div>
              <p className="font-code text-[9px]" style={{ color: '#1E4D2B' }}>3 sandboxes active</p>
              <p className="font-code text-[9px]" style={{ color: '#1E4D2B' }}>v2.4.1 — stable</p>
            </div>
          </div>
        )}
      </aside>

      {/* ═══════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════ */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '220px' : '64px' }}
      >
        {/* ── Top Navbar ── */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-6 h-16 flex-shrink-0"
          style={{
            background: 'rgba(10,11,16,0.9)',
            borderBottom: '1px solid rgba(30,34,51,0.7)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="font-code text-xs" style={{ color: '#475569' }}>CONTAGION</span>
            <span style={{ color: '#1E2233' }}>/</span>
            <span className="font-code text-xs" style={{ color: '#22C55E' }}>Dashboard</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Clock */}
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(5,5,8,0.6)', border: '1px solid rgba(30,34,51,0.7)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.8)', animation: 'blink 2s ease-in-out infinite' }} />
              <span className="font-code text-xs tabular-nums" style={{ color: '#22C55E' }}>{formatTime(currentTime)}</span>
              <span className="font-code text-[10px]" style={{ color: '#475569' }}>{formatDate(currentTime)}</span>
            </div>

            {/* Notifications */}
            <button
              className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(5,5,8,0.6)', border: '1px solid rgba(30,34,51,0.7)', color: '#64748B' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)'; e.currentTarget.style.color = '#22C55E'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,34,51,0.7)'; e.currentTarget.style.color = '#64748B'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ background: '#EF4444', boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}
              />
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: profileOpen ? 'rgba(34,197,94,0.08)' : 'rgba(5,5,8,0.6)',
                  border: `1px solid ${profileOpen ? 'rgba(34,197,94,0.25)' : 'rgba(30,34,51,0.7)'}`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-display text-xs font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                    color: '#050508',
                    boxShadow: '0 0 10px rgba(34,197,94,0.4)',
                  }}
                >
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="font-body text-sm hidden md:block" style={{ color: '#94A3B8' }}>
                  {user?.name?.split(' ')[0] || 'Analyst'}
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"
                  style={{ transition: 'transform 0.2s ease', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden animate-scale-in z-50"
                  style={{
                    background: 'rgba(10,11,16,0.98)',
                    border: '1px solid rgba(30,34,51,0.9)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(30,34,51,0.6)' }}>
                    <p className="font-body text-sm font-semibold" style={{ color: '#F1F5F9' }}>{user?.name || 'Analyst'}</p>
                    <p className="font-code text-xs mt-0.5" style={{ color: '#475569' }}>{user?.email || 'analyst@contagion.sec'}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="badge-info text-[9px]">ANALYST</span>
                      <span className="badge-low text-[9px]">RANK #42</span>
                    </div>
                  </div>
                  {[
                    { label: 'Profile Settings', icon: '⚙' },
                    { label: 'Security', icon: '🔒' },
                    { label: 'API Keys', icon: '🔑' },
                  ].map(item => (
                    <button key={item.label}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left font-body text-sm transition-all duration-150"
                      style={{ color: '#64748B' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#94A3B8'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(30,34,51,0.6)' }}>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left font-body text-sm transition-all duration-150"
                      style={{ color: '#EF4444' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page body ── */}
        <main className="flex-1 p-6 space-y-6 relative z-10 overflow-auto">

          {/* ── Welcome row ── */}
          <div className="flex items-start justify-between animate-fade-up">
            <div>
              <h2 className="font-display text-2xl font-bold" style={{ color: '#F1F5F9' }}>
                Welcome back,{' '}
                <span style={{ color: '#22C55E', textShadow: '0 0 20px rgba(34,197,94,0.4)' }}>
                  {user?.name?.split(' ')[0] || 'Analyst'}
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
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Analysis
            </Link>
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>

          {/* ── Main grid: table + sidebar ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* ── Submissions table ── */}
            <div
              className="xl:col-span-2 rounded-xl overflow-hidden animate-fade-up"
              style={{
                background: 'rgba(12,13,20,0.8)',
                border: '1px solid rgba(30,34,51,0.8)',
                backdropFilter: 'blur(16px)',
                animationDelay: '200ms',
              }}
            >
              {/* Table header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid rgba(30,34,51,0.6)' }}
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: '#F1F5F9' }}>
                    Recent Submissions
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded font-code text-[9px] tracking-widest"
                    style={{ background: 'rgba(34,197,94,0.08)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.15)' }}
                  >
                    {submissions.length} SAMPLES
                  </span>
                </div>
                <Link to="/submissions" className="font-code text-xs transition-colors duration-200" style={{ color: '#475569' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#22C55E'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                >
                  View all →
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(30,34,51,0.5)' }}>
                      {['Sample Hash', 'Malware Family', 'Threat', 'Status', 'Score', 'Time'].map(col => (
                        <th key={col} className="px-4 py-3 text-left font-code text-[9px] tracking-[0.2em] uppercase" style={{ color: '#475569' }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s, i) => (
                      <tr
                        key={s.id}
                        className="group transition-all duration-150 animate-fade-up"
                        style={{
                          borderBottom: '1px solid rgba(30,34,51,0.3)',
                          animationDelay: `${300 + i * 60}ms`,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td className="px-4 py-3">
                          <span className="font-code text-xs" style={{ color: '#22C55E' }}>
                            {s.hash}
                            <span style={{ color: '#1E2233' }}>...</span>
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-body text-sm font-medium" style={{ color: '#F1F5F9' }}>{s.family}</span>
                        </td>
                        <td className="px-4 py-3">
                          <SeverityBadge level={s.threat} />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="px-4 py-3">
                          {s.score !== null ? (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-16 h-1 rounded-full overflow-hidden"
                                style={{ background: 'rgba(30,34,51,0.8)' }}
                              >
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${s.score}%`,
                                    background: s.score > 85 ? '#EF4444' : s.score > 65 ? '#F59E0B' : '#22C55E',
                                  }}
                                />
                              </div>
                              <span className="font-code text-xs" style={{ color: '#94A3B8' }}>{s.score}</span>
                            </div>
                          ) : (
                            <span className="font-code text-xs" style={{ color: '#1E2233' }}>—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-code text-xs" style={{ color: '#475569' }}>{s.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Right column ── */}
            <div className="space-y-5">

              {/* Activity Feed */}
              <div
                className="rounded-xl overflow-hidden animate-fade-up"
                style={{
                  background: 'rgba(12,13,20,0.8)',
                  border: '1px solid rgba(30,34,51,0.8)',
                  backdropFilter: 'blur(16px)',
                  animationDelay: '300ms',
                }}
              >
                <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(30,34,51,0.6)' }}>
                  <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: '#F1F5F9' }}>
                    Activity Feed
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  {activityFeed.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg transition-all duration-150 animate-fade-up"
                      style={{
                        background: 'transparent',
                        animationDelay: `${400 + i * 70}ms`,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{item.msg}</p>
                        <p className="font-code text-[9px] mt-0.5" style={{ color: '#1E2233' }}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div
                className="rounded-xl overflow-hidden animate-fade-up"
                style={{
                  background: 'rgba(12,13,20,0.8)',
                  border: '1px solid rgba(30,34,51,0.8)',
                  backdropFilter: 'blur(16px)',
                  animationDelay: '500ms',
                }}
              >
                <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(30,34,51,0.6)' }}>
                  <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: '#F1F5F9' }}>Quick Actions</h3>
                </div>
                <div className="p-3 space-y-2">
                  {[
                    { label: 'Submit New Sample',    desc: 'Upload for analysis',    color: '34,197,94',  icon: '↑' },
                    { label: 'View Leaderboard',     desc: 'Check your ranking',     color: '139,92,246', icon: '★' },
                    { label: 'Pending Reviews',      desc: '2 reviews awaiting you', color: '34,211,238', icon: '◎' },
                    { label: 'Export Report',        desc: 'PDF or JSON format',     color: '245,158,11', icon: '⤓' },
                  ].map((action, i) => (
                    <button
                      key={action.label}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group animate-fade-up"
                      style={{
                        background: 'transparent',
                        border: '1px solid transparent',
                        animationDelay: `${550 + i * 60}ms`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `rgba(${action.color},0.06)`;
                        e.currentTarget.style.borderColor = `rgba(${action.color},0.2)`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-sm flex-shrink-0 transition-all duration-200"
                        style={{
                          background: `rgba(${action.color},0.1)`,
                          color: `rgb(${action.color})`,
                          border: `1px solid rgba(${action.color},0.2)`,
                        }}
                      >
                        {action.icon}
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium" style={{ color: '#94A3B8' }}>{action.label}</p>
                        <p className="font-code text-[9px]" style={{ color: '#475569' }}>{action.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Rank + Rep panel ── */}
          <div
            className="rounded-xl p-5 animate-fade-up"
            style={{
              background: 'linear-gradient(135deg, rgba(12,13,20,0.9) 0%, rgba(18,8,58,0.6) 100%)',
              border: '1px solid rgba(139,92,246,0.15)',
              backdropFilter: 'blur(16px)',
              animationDelay: '600ms',
              boxShadow: '0 0 40px rgba(139,92,246,0.06)',
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-code text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: '#475569' }}>Analyst Reputation</p>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-bold" style={{ color: '#A78BFA', textShadow: '0 0 20px rgba(139,92,246,0.4)' }}>
                    2,450 XP
                  </span>
                  <span className="badge-info">RANK #42</span>
                </div>
                <p className="font-body text-sm mt-1" style={{ color: '#64748B' }}>550 XP until Rank #41</p>
              </div>

              {/* XP Progress bar */}
              <div className="flex-1 max-w-sm w-full">
                <div className="flex justify-between mb-2">
                  <span className="font-code text-[9px] tracking-widest" style={{ color: '#475569' }}>XP PROGRESS</span>
                  <span className="font-code text-[9px]" style={{ color: '#A78BFA' }}>2450 / 3000</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(30,34,51,0.8)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '82%',
                      background: 'linear-gradient(to right, #6D28D9, #A78BFA)',
                      boxShadow: '0 0 12px rgba(139,92,246,0.5)',
                      transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </div>
                {/* Badge row */}
                <div className="flex items-center gap-2 mt-3">
                  {[
                    { label: '🏆 Ransomware Hunter', color: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', text: '#FBBF24' },
                    { label: '🛡 APT Analyst',       color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#A78BFA' },
                    { label: '⚡ Top Reviewer',      color: 'rgba(34,197,94,0.10)',  border: 'rgba(34,197,94,0.3)',  text: '#4ADE80' },
                  ].map(badge => (
                    <span
                      key={badge.label}
                      className="px-2.5 py-1 rounded font-code text-[9px] font-semibold tracking-wider"
                      style={{ background: badge.color, border: `1px solid ${badge.border}`, color: badge.text }}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
