import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData]   = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [focused, setFocused]     = useState(null);
  const [showPass, setShowPass]   = useState(false);
  const [strength, setStrength]   = useState(0);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const canvasRef                 = useRef(null);
  const animRef                   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Purple-tinted orbs for register page
    const orbs = [
      { x: 0.85, y: 0.15, r: 0.45, color: [139, 92, 246], angle: 0,    speed: 0.0003  },
      { x: 0.1,  y: 0.8,  r: 0.5,  color: [34, 197, 94],  angle: 2.5,  speed: 0.00035 },
      { x: 0.6,  y: 0.05, r: 0.38, color: [139, 92, 246], angle: 1.2,  speed: 0.00045 },
      { x: 0.2,  y: 0.4,  r: 0.3,  color: [34, 211, 238], angle: 3.8,  speed: 0.00025 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(o => {
        o.angle += o.speed;
        const cx = (o.x + Math.sin(o.angle)        * 0.14) * canvas.width;
        const cy = (o.y + Math.cos(o.angle * 0.73) * 0.11) * canvas.height;
        const r  = o.r * Math.min(canvas.width, canvas.height);
        const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `rgba(${o.color},0.13)`);
        g.addColorStop(0.5, `rgba(${o.color},0.045)`);
        g.addColorStop(1,   `rgba(${o.color},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  const calcStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (name === 'password') setStrength(calcStrength(value));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { setError("Passwords don't match."); return; }
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
    console.log('register:', formData);
  };

  const strengthColor = ['', '#EF4444', '#F59E0B', '#22D3EE', '#22C55E'][strength];
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];

  const inputStyle = (field, extraBorder) => ({
    background: focused === field ? 'rgba(139,92,246,0.05)' : 'rgba(5,5,8,0.95)',
    border: `1px solid ${extraBorder || (focused === field ? 'rgba(139,92,246,0.4)' : 'rgba(30,34,51,1)')}`,
    color: '#E2E8F0',
    boxShadow: focused === field ? '0 0 0 3px rgba(139,92,246,0.07)' : 'none',
  });

  const pwMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#07080D' }}>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
      }} />

      <div className="relative z-10 w-full max-w-[420px] animate-fade-up">
        <div className="rounded-2xl p-8 relative overflow-hidden" style={{
          background: 'rgba(9,10,16,0.82)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 0 0 1px rgba(139,92,246,0.04), 0 32px 64px rgba(0,0,0,0.6)',
        }}>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px" style={{
            background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)'
          }} />

          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
              boxShadow: '0 0 20px rgba(139,92,246,0.1)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
                  stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(139,92,246,0.1)"/>
                <path d="M9 12l2 2 4-4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="font-display text-2xl tracking-[0.3em] font-bold mb-1" style={{
              color: '#F1F5F9', textShadow: '0 0 30px rgba(139,92,246,0.2)'
            }}>CONTAGION</h1>
            <p className="font-code text-[10px] tracking-widest uppercase" style={{ color: '#334155' }}>Create Analyst Account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg font-code text-xs animate-fade-up" style={{
              background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171'
            }}>⚠ {error}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
                style={{ color: focused === 'name' ? '#8B5CF6' : '#475569' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                required placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
                style={inputStyle('name')} />
            </div>

            {/* Email */}
            <div>
              <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
                style={{ color: focused === 'email' ? '#8B5CF6' : '#475569' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                required placeholder="you@contagion.sec"
                className="w-full px-4 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
                style={inputStyle('email')} />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-code text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
                  style={{ color: focused === 'password' ? '#8B5CF6' : '#475569' }}>Password</label>
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="font-code text-[9px] tracking-widest uppercase transition-colors duration-150"
                  style={{ color: showPass ? '#8B5CF6' : '#334155' }}>
                  [{showPass ? 'HIDE' : 'SHOW'}]
                </button>
              </div>
              <input type={showPass ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                required placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
                style={inputStyle('password')} />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(n => (
                      <div key={n} className="flex-1 h-[2px] rounded-full transition-all duration-300"
                        style={{ background: n <= strength ? strengthColor : 'rgba(30,34,51,0.9)' }} />
                    ))}
                  </div>
                  <span className="font-code text-[9px]" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div>
              <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
                style={{ color: focused === 'confirmPassword' ? '#8B5CF6' : '#475569' }}>Confirm Password</label>
              <div className="relative">
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  onFocus={() => setFocused('confirmPassword')} onBlur={() => setFocused(null)}
                  required placeholder="••••••••••••"
                  className="w-full pl-4 pr-9 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
                  style={inputStyle('confirmPassword', pwMismatch ? 'rgba(239,68,68,0.4)' : undefined)} />
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {!pwMismatch
                      ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                    }
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-display text-sm tracking-[0.2em] uppercase font-bold transition-all duration-200 mt-1"
              style={{
                background: loading ? 'rgba(139,92,246,0.15)' : '#8B5CF6',
                color: loading ? 'rgba(139,92,246,0.4)' : '#F1F5F9',
                boxShadow: loading ? 'none' : '0 0 24px rgba(139,92,246,0.3)',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background='#A78BFA'; e.currentTarget.style.boxShadow='0 0 36px rgba(139,92,246,0.5)'; }}}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background='#8B5CF6'; e.currentTarget.style.boxShadow='0 0 24px rgba(139,92,246,0.3)'; }}}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 rounded-full inline-block"
                      style={{ borderColor: 'rgba(139,92,246,0.3)', borderTopColor: 'transparent', animation: 'spinSlow 0.7s linear infinite' }}/>
                    Creating account...
                  </span>
                : '→ Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid rgba(30,34,51,0.7)' }}>
            <p className="font-code text-xs" style={{ color: '#334155' }}>
              Already have access?{' '}
              <Link to="/login" style={{ color: '#8B5CF6' }}
                onMouseEnter={e => e.currentTarget.style.color='#A78BFA'}
                onMouseLeave={e => e.currentTarget.style.color='#8B5CF6'}>
                Sign in →
              </Link>
            </p>
          </div>
        </div>
        <p className="text-center mt-4 font-code text-[10px] tracking-widest" style={{ color: '#1A1D2A' }}>CONTAGION v2.4.1</p>
      </div>
    </div>
  );
};

export default RegisterForm;
