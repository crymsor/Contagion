import { StatusBadge, SeverityBadge } from './HooksAndBadges';

const SubmissionsTable = ({ submissions }) => {
  return (
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
        <a href="/submissions" className="font-code text-xs transition-colors duration-200" style={{ color: '#475569' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#22C55E')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
        >
          View all →
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(30,34,51,0.5)' }}>
              {['Sample Hash', 'Malware Family', 'Threat', 'Status', 'Score', 'Time'].map((col) => (
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
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
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
  );
};

export default SubmissionsTable;
