import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import CustomButton from './CustomButton';
import PasswordStrength, { usePasswordStrength } from './PasswordStrength';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  // Purple-tinted orbs for register page
  const orbs = [
    { x: 0.85, y: 0.15, r: 0.45, color: [139, 92, 246], angle: 0, speed: 0.0003, sineX: 0.14, cosY: 0.73, cosX: 0.11 },
    { x: 0.1, y: 0.8, r: 0.5, color: [34, 197, 94], angle: 2.5, speed: 0.00035, sineX: 0.14, cosY: 0.73, cosX: 0.11 },
    { x: 0.6, y: 0.05, r: 0.38, color: [139, 92, 246], angle: 1.2, speed: 0.00045, sineX: 0.14, cosY: 0.73, cosX: 0.11 },
    { x: 0.2, y: 0.4, r: 0.3, color: [34, 211, 238], angle: 3.8, speed: 0.00025, sineX: 0.14, cosY: 0.73, cosX: 0.11 },
  ];

  const { strength, strengthColor, strengthLabel, calcStrength } = usePasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (name === 'password') calcStrength(value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
    console.log('register:', formData);
  };

  const inputStyle = (field) => ({
    background: focused === field ? 'rgba(139,92,246,0.05)' : 'rgba(5,5,8,0.95)',
    border: `1px solid ${focused === field ? 'rgba(139,92,246,0.4)' : 'rgba(30,34,51,1)'}`,
    color: '#E2E8F0',
    boxShadow: focused === field ? '0 0 0 3px rgba(139,92,246,0.07)' : 'none',
  });

  const pwMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <AuthLayout
      orbs={orbs}
      title="CONTAGION"
      subtitle="Create Analyst Account"
      canvasRef={canvasRef}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{
        background: 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.2)',
        boxShadow: '0 0 20px rgba(139,92,246,0.1)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
            stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(139,92,246,0.1)"/>
          <path d="M9 12l2 2 4-4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg font-code text-xs animate-fade-up" style={{
          background: 'rgba(239,68,68,0.07)',
          border: '1px solid rgba(239,68,68,0.2)',
          color: '#F87171'
        }}>⚠ {error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          placeholder="John Doe"
          required
          customStyle={inputStyle('name')}
          focusedColor="rgba(139,92,246,0.4)"
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          placeholder="you@contagion.sec"
          required
          customStyle={inputStyle('email')}
          focusedColor="rgba(139,92,246,0.4)"
        />

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
          <InputField
            name="password"
            type={showPass ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused(null)}
            placeholder="••••••••••••"
            required
            customStyle={inputStyle('password')}
            focusedColor="rgba(139,92,246,0.4)"
          />
          {formData.password && (
            <PasswordStrength password={formData.password} strength={strength} />
          )}
        </div>

        <div>
          <label className="block font-code text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200"
            style={{ color: focused === 'confirmPassword' ? '#8B5CF6' : '#475569' }}>
            Confirm Password
          </label>
          <div className="relative">
            <InputField
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setFocused('confirmPassword')}
              onBlur={() => setFocused(null)}
              placeholder="••••••••••••"
              required
              customStyle={{
                ...inputStyle('confirmPassword'),
                border: pwMismatch ? '1px solid rgba(239,68,68,0.4)' : inputStyle('confirmPassword').border,
              }}
              focusedColor="rgba(139,92,246,0.4)"
            />
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

        <CustomButton type="submit" disabled={loading} loading={loading}>
          {loading ? 'Creating account...' : '→ Create Account'}
        </CustomButton>
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
    </AuthLayout>
  );
};

export default RegisterForm;
