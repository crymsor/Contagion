const QuickActions = () => {
  const actions = [
    { label: 'Submit New Sample', desc: 'Upload for analysis', color: '34,197,94', icon: '↑' },
    { label: 'View Leaderboard', desc: 'Check your ranking', color: '139,92,246', icon: '★' },
    { label: 'Pending Reviews', desc: '2 reviews awaiting you', color: '34,211,238', icon: '◎' },
    { label: 'Export Report', desc: 'PDF or JSON format', color: '245,158,11', icon: '⤓' },
  ];

  return (
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
        {actions.map((action, i) => (
          <button
            key={action.label}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group animate-fade-up"
            style={{
              background: 'transparent',
              border: '1px solid transparent',
              animationDelay: `${550 + i * 60}ms`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(${action.color},0.06)`;
              e.currentTarget.style.borderColor = `rgba(${action.color},0.2)`;
            }}
            onMouseLeave={(e) => {
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
  );
};

export default QuickActions;
