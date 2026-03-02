import { useState, useEffect, useRef, useCallback } from 'react';

const useCounter = (target, duration = 1200, delay = 0) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start;
    let raf;
    const delayTimer = setTimeout(() => {
      const tick = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);
  return value;
};

const useTilt = (strength = 8) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovering: false });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -strength,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * strength,
      hovering: true,
    });
  }, [strength]);

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0, hovering: false }), []);

  return { ref, tilt, onMove, onLeave };
};

const SeverityBadge = ({ level }) => {
  const map = {
    CRITICAL: { cls: 'badge-critical', dot: '#F87171' },
    HIGH: { cls: 'badge-high', dot: '#FB923C' },
    MEDIUM: { cls: 'badge-medium', dot: '#FBBF24' },
    LOW: { cls: 'badge-low', dot: '#4ADE80' },
    INFO: { cls: 'badge-info', dot: '#22D3EE' },
  };
  const cfg = map[level] || map.INFO;
  return (
    <span className={cfg.cls + ' inline-flex items-center gap-1'}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {level}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    Completed: { bg: 'rgba(34,197,94,0.08)', color: '#4ADE80', border: 'rgba(34,197,94,0.2)' },
    Analyzing: { bg: 'rgba(34,211,238,0.08)', color: '#22D3EE', border: 'rgba(34,211,238,0.2)', pulse: true },
    Queued: { bg: 'rgba(245,158,11,0.08)', color: '#FBBF24', border: 'rgba(245,158,11,0.2)' },
    Failed: { bg: 'rgba(239,68,68,0.08)', color: '#F87171', border: 'rgba(239,68,68,0.2)' },
    'Peer Review': { bg: 'rgba(139,92,246,0.08)', color: '#A78BFA', border: 'rgba(139,92,246,0.2)' },
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

export { useCounter, useTilt, SeverityBadge, StatusBadge };
