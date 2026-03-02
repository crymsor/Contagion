const RankPanel = () => {
  return (
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
              { label: '🛡 APT Analyst', color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#A78BFA' },
              { label: '⚡ Top Reviewer', color: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.3)', text: '#4ADE80' },
            ].map((badge) => (
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
  );
};

export default RankPanel;
