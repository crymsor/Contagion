import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import CustomButton from './CustomButton';
import PasswordStrength from './PasswordStrength';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  // Green theme orbs for login
  const orbs = [
    { x: 0.15, y: 0.25, r: 0.5, color: [34, 197, 94], angle: 0, speed: 0.0004, sineX: 0.15, cosY: 0.71, cosX: 0.12 },
    { x: 0.82, y: 0.7, r: 0.45, color: [139, 92, 246], angle: 2.1, speed: 0.0003, sineX: 0.15, cosY: 0.71, cosX: 0.12 },
    { x: 0.45, y: 0.85, r: 0.4, color: [34, 211, 238], angle: 4.2, speed: 0.0005, sineX: 0.15, cosY: 0.71, cosX: 0.12 },
    { x: 0.78, y: 0.12, r: 0.35, color: [34, 197, 94], angle: 1.0, speed: 0.00025, sineX: 0.15, cosY: 0.71, cosX: 0.12 },
  ];

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
    <AuthLayout
      orbs={orbs}
      title="CONTAGION"
      subtitle="Secure Access Portal"
      canvasRef={canvasRef}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{
        background: 'rgba(34,197,94,0.08)',
        border: '1px solid rgba(34,197,94,0.2)',
        boxShadow: '0 0 20px rgba(34,197,94,0.1)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.5" fill="#22C55E"/>
          <path d="M12 9.5a5 5 0 0 1 4.33 2.5M12 9.5a5 5 0 0 0-4.33 2.5M12 14.5a5 5 0 0 0 0 5M12 14.5a5 5 0 0 1 0 5M7.67 12a5 5 0 0 0-4.33 2.5M16.33 12a5 5 0 0 1 4.33 2.5"
            stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          placeholder="you@contagion.sec"
          required
          customStyle={inputStyle('email')}
          focusedColor="rgba(34,197,94,0.4)"
        />

        <div>
          <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
            style={{ color: focused === 'password' ? '#22C55E' : '#475569' }}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              required
              placeholder="••••••••••••"
              className="w-full pl-4 pr-10 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200"
              style={{
                background: focused === 'password' ? 'rgba(34,197,94,0.05)' : 'rgba(5,5,8,0.95)',
                border: `1px solid ${focused === 'password' ? 'rgba(34,197,94,0.4)' : 'rgba(30,34,51,1)'}`,
                color: '#E2E8F0',
                boxShadow: focused === 'password' ? '0 0 0 3px rgba(34,197,94,0.07)' : 'none',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
              style={{ color: showPass ? '#22C55E' : '#334155' }}
            >
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

        <CustomButton type="submit" disabled={loading} loading={loading}>
          {loading ? 'Authenticating...' : '→ Sign In'}
        </CustomButton>
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
    </AuthLayout>
  );
};

export default LoginForm;
