import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail]       = useState('');
  const [focused, setFocused]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
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

    // Cyan-tinted orbs for forgot page
    const orbs = [
      { x: 0.2,  y: 0.15, r: 0.42, color: [34, 211, 238], angle: 0,   speed: 0.0004  },
      { x: 0.8,  y: 0.8,  r: 0.48, color: [34, 197, 94],  angle: 1.8, speed: 0.0003  },
      { x: 0.75, y: 0.2,  r: 0.32, color: [34, 211, 238], angle: 3.5, speed: 0.0005  },
      { x: 0.15, y: 0.7,  r: 0.28, color: [139, 92, 246], angle: 2.2, speed: 0.00025 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(o => {
        o.angle += o.speed;
        const cx = (o.x + Math.sin(o.angle)        * 0.13) * canvas.width;
        const cy = (o.y + Math.cos(o.angle * 0.69) * 0.1)  * canvas.height;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
    console.log('forgot:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#07080D' }}>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
      }} />

      <div className="relative z-10 w-full max-w-[400px] animate-fade-up">
        <div className="rounded-2xl p-8 relative overflow-hidden" style={{
          background: 'rgba(9,10,16,0.82)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${submitted ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: `0 0 0 1px rgba(34,211,238,0.04), 0 32px 64px rgba(0,0,0,0.6)`,
          transition: 'border-color 0.6s ease',
        }}>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px" style={{
            background: submitted
              ? 'linear-gradient(to right, transparent, rgba(34,197,94,0.5), transparent)'
              : 'linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)',
            transition: 'background 0.6s ease',
          }} />

          {submitted ? (
            /* ── Success state ── */
            <div className="text-center py-4 animate-scale-in">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg width="68" height="68" viewBox="0 0 68 68">
                    <circle cx="34" cy="34" r="30" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="2"/>
                    <circle cx="34" cy="34" r="30" fill="none" stroke="#22C55E" strokeWidth="2"
                      strokeLinecap="round" transform="rotate(-90 34 34)"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.7))', animation: 'fadeIn 0.8s ease 0.1s both' }}/>
                    <path d="M21 34l9 9 17-18" fill="none" stroke="#22C55E" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(34,197,94,0.8))', animation: 'fadeIn 0.4s ease 0.6s both' }}/>
                  </svg>
                </div>
              </div>

              <h2 className="font-display text-xl font-bold tracking-wider mb-3"
                style={{ color: '#F1F5F9', textShadow: '0 0 20px rgba(34,197,94,0.25)', animation: 'fadeUp 0.5s ease 0.35s both', opacity: 0 }}>
                Check Your Inbox
              </h2>

              <div style={{ animation: 'fadeUp 0.5s ease 0.5s both', opacity: 0 }}>
                <p className="font-body text-sm mb-3" style={{ color: '#64748B' }}>Reset link sent to:</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-code text-sm mb-5" style={{
                  background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {email}
                </div>
                <p className="font-code text-xs mb-6" style={{ color: '#334155' }}>Link expires in 15 minutes.</p>
              </div>

              <div style={{ animation: 'fadeUp 0.5s ease 0.65s both', opacity: 0 }}>
                <Link to="/login"
                  className="inline-block px-6 py-2.5 rounded-lg font-display text-sm tracking-widest uppercase font-bold transition-all duration-200"
                  style={{ background: 'transparent', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(34,197,94,0.08)'; e.currentTarget.style.borderColor='rgba(34,197,94,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(34,197,94,0.3)'; }}>
                  ← Back to Login
                </Link>
              </div>
            </div>

          ) : (
            /* ── Form state ── */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{
                  background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.2)',
                  boxShadow: '0 0 20px rgba(34,211,238,0.1)',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#22D3EE" strokeWidth="1.5"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1.5" fill="#22D3EE"/>
                  </svg>
                </div>
                <h1 className="font-display text-2xl tracking-[0.3em] font-bold mb-1" style={{
                  color: '#F1F5F9', textShadow: '0 0 30px rgba(34,211,238,0.15)'
                }}>CONTAGION</h1>
                <p className="font-code text-[10px] tracking-widest uppercase" style={{ color: '#334155' }}>Password Recovery</p>
                <p className="font-body text-sm mt-3" style={{ color: '#475569' }}>
                  Enter your email to receive a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
                    style={{ color: focused === 'email' ? '#22D3EE' : '#475569' }}>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    required placeholder="you@contagion.sec"
                    className="w-full px-4 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
                    style={{
                      background: focused === 'email' ? 'rgba(34,211,238,0.05)' : 'rgba(5,5,8,0.95)',
                      border: `1px solid ${focused === 'email' ? 'rgba(34,211,238,0.4)' : 'rgba(30,34,51,1)'}`,
                      color: '#E2E8F0',
                      boxShadow: focused === 'email' ? '0 0 0 3px rgba(34,211,238,0.07)' : 'none',
                    }} />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-lg font-display text-sm tracking-[0.2em] uppercase font-bold transition-all duration-200"
                  style={{
                    background: loading ? 'rgba(34,211,238,0.12)' : '#0891B2',
                    color: loading ? 'rgba(34,211,238,0.4)' : '#F1F5F9',
                    boxShadow: loading ? 'none' : '0 0 24px rgba(34,211,238,0.2)',
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background='#22D3EE'; e.currentTarget.style.color='#050508'; e.currentTarget.style.boxShadow='0 0 36px rgba(34,211,238,0.4)'; }}}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background='#0891B2'; e.currentTarget.style.color='#F1F5F9'; e.currentTarget.style.boxShadow='0 0 24px rgba(34,211,238,0.2)'; }}}>
                  {loading
                    ? <span className="flex items-center justify-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 rounded-full inline-block"
                          style={{ borderColor: 'rgba(34,211,238,0.3)', borderTopColor: 'transparent', animation: 'spinSlow 0.7s linear infinite' }}/>
                        Sending...
                      </span>
                    : '→ Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid rgba(30,34,51,0.7)' }}>
                <Link to="/login" className="font-code text-xs transition-colors duration-150" style={{ color: '#22D3EE' }}
                  onMouseEnter={e => e.currentTarget.style.color='#67E8F9'}
                  onMouseLeave={e => e.currentTarget.style.color='#22D3EE'}>
                  ← Back to login
                </Link>
              </div>
            </>
          )}
        </div>
        <p className="text-center mt-4 font-code text-[10px] tracking-widest" style={{ color: '#1A1D2A' }}>CONTAGION v2.4.1</p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
