import { useCounter, useTilt } from './HooksAndBadges';

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
          {displayValue}
          {suffix}
        </p>
        <p className="font-body text-sm" style={{ color: '#64748B' }}>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
