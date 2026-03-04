const ActivityFeed = ({ items }) => {
  return (
    <div
      className="rounded-lg overflow-hidden animate-fade-up"
      style={{
        background: 'rgba(12,13,20,0.8)',
        border: '1px solid rgba(30,34,51,0.8)',
        backdropFilter: 'blur(16px)',
        animationDelay: '300ms',
      }}
    >
      {/* Header - consistent with submissions table */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid rgba(30,34,51,0.6)' }}
      >
        <h3 className="font-display text-sm font-bold tracking-wider" style={{ color: '#F1F5F9' }}>
          Activity Feed
        </h3>
      </div>

      {/* Items - consistent spacing */}
      <div className="divide-y divide-phantom/30">
        {items.map((item, i) => (
          <div
            key={i}
            className="px-6 py-4 transition-all duration-150 animate-fade-up"
            style={{
              animationDelay: `${400 + i * 70}ms`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div className="flex items-start gap-3">
              {/* Status dot */}
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
              />
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm" style={{ color: '#94A3B8' }}>
                  {item.msg}
                </p>
                <p className="font-code text-[9px] mt-1" style={{ color: '#1E2233' }}>
                  {item.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
