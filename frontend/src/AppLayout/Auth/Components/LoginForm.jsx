import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [focused, setFocused]   = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const canvasRef               = useRef(null);
  const animRef                 = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.15, y: 0.25, r: 0.5,  color: [34,  197, 94],  angle: 0,    speed: 0.0004 },
      { x: 0.82, y: 0.7,  r: 0.45, color: [139, 92,  246], angle: 2.1,  speed: 0.0003 },
      { x: 0.45, y: 0.85, r: 0.4,  color: [34,  211, 238], angle: 4.2,  speed: 0.0005 },
      { x: 0.78, y: 0.12, r: 0.35, color: [34,  197, 94],  angle: 1.0,  speed: 0.00025 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(o => {
        o.angle += o.speed;
        const cx = (o.x + Math.sin(o.angle)        * 0.15) * canvas.width;
        const cy = (o.y + Math.cos(o.angle * 0.71) * 0.12) * canvas.height;
        const r  = o.r * Math.min(canvas.width, canvas.height);
        const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `rgba(${o.color},0.14)`);
        g.addColorStop(0.5, `rgba(${o.color},0.05)`);
        g.addColorStop(1,   `rgba(${o.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
    console.log('login:', formData);
  };

  const inputStyle = (field) => ({
    background: focused === field ? 'rgba(34,197,94,0.05)' : 'rgba(5,5,8,0.95)',
    border: `1px solid ${focused === field ? 'rgba(34,197,94,0.4)' : 'rgba(30,34,51,1)'}`,
    color: '#E2E8F0',
    boxShadow: focused === field ? '0 0 0 3px rgba(34,197,94,0.07)' : 'none',
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#07080D' }}>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
      }} />

      <div className="relative z-10 w-full max-w-[400px] animate-fade-up">
        <div className="rounded-2xl p-8 relative overflow-hidden" style={{
          background: 'rgba(9,10,16,0.82)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 0 0 1px rgba(34,197,94,0.04), 0 32px 64px rgba(0,0,0,0.6)',
        }}>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px" style={{
            background: 'linear-gradient(to right, transparent, rgba(34,197,94,0.5), transparent)'
          }} />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
              boxShadow: '0 0 20px rgba(34,197,94,0.1)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="2.5" fill="#22C55E"/>
                <path d="M12 9.5a5 5 0 0 1 4.33 2.5M12 9.5a5 5 0 0 0-4.33 2.5M12 14.5a5 5 0 0 0 0 5M12 14.5a5 5 0 0 1 0 5M7.67 12a5 5 0 0 0-4.33 2.5M16.33 12a5 5 0 0 1 4.33 2.5"
                  stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="font-display text-2xl tracking-[0.3em] font-bold mb-1" style={{
              color: '#F1F5F9', textShadow: '0 0 30px rgba(34,197,94,0.2)'
            }}>CONTAGION</h1>
            <p className="font-code text-[10px] tracking-widest uppercase" style={{ color: '#334155' }}>Secure Access Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
                style={{ color: focused === 'email' ? '#22C55E' : '#475569' }}>Email Address</label>
              <input type="email" name="email" value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                required placeholder="you@contagion.sec"
                className="w-full px-4 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
                style={inputStyle('email')} />
            </div>

            <div>
              <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
                style={{ color: focused === 'password' ? '#22C55E' : '#475569' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password" value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                  required placeholder="••••••••••••"
                  className="w-full pl-4 pr-10 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
                  style={inputStyle('password')} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
                  style={{ color: showPass ? '#22C55E' : '#334155' }}>
                  {showPass
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" strokeLinecap="round"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-code text-xs" style={{ color: '#334155' }}>Remember me</span>
              <Link to="/forgot-password" className="font-code text-xs" style={{ color: '#22C55E' }}
                onMouseEnter={e => e.currentTarget.style.color='#4ADE80'}
                onMouseLeave={e => e.currentTarget.style.color='#22C55E'}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-display text-sm tracking-[0.2em] uppercase font-bold transition-all duration-200"
              style={{
                background: loading ? 'rgba(34,197,94,0.15)' : '#22C55E',
                color: loading ? 'rgba(34,197,94,0.4)' : '#050508',
                boxShadow: loading ? 'none' : '0 0 24px rgba(34,197,94,0.3)',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background='#4ADE80'; e.currentTarget.style.boxShadow='0 0 36px rgba(34,197,94,0.5)'; }}}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background='#22C55E'; e.currentTarget.style.boxShadow='0 0 24px rgba(34,197,94,0.3)'; }}}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 rounded-full inline-block"
                      style={{ borderColor: 'rgba(34,197,94,0.3)', borderTopColor: 'transparent', animation: 'spinSlow 0.7s linear infinite' }}/>
                    Authenticating...
                  </span>
                : '→ Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid rgba(30,34,51,0.7)' }}>
            <p className="font-code text-xs" style={{ color: '#334155' }}>
              No account?{' '}
              <Link to="/register" style={{ color: '#22C55E' }}
                onMouseEnter={e => e.currentTarget.style.color='#4ADE80'}
                onMouseLeave={e => e.currentTarget.style.color='#22C55E'}>
                Request access →
              </Link>
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 5px #22C55E', animation: 'blink 2s ease-in-out infinite' }}/>
              <span className="font-code text-[9px] tracking-widest uppercase" style={{ color: '#1A3526' }}>Encrypted Connection</span>
            </div>
          </div>
        </div>
        <p className="text-center mt-4 font-code text-[10px] tracking-widest" style={{ color: '#1A1D2A' }}>CONTAGION v2.4.1</p>
      </div>
    </div>
  );
};

export default LoginForm;
