import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import PasswordStrength, { usePasswordStrength } from './PasswordStrength';
import SuccessView from './SuccessView';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
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

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (strength < 2) {
      setError('Password is too weak. Use uppercase, numbers, and symbols');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      console.log('register:', formData);
    }, 1500);
  };

  const inputStyle = (field) => ({
    background: focused === field ? 'rgba(139,92,246,0.05)' : 'rgba(5,5,8,0.95)',
    border: `1px solid ${focused === field ? 'rgba(139,92,246,0.4)' : 'rgba(30,34,51,1)'}`,
    color: '#E2E8F0',
    boxShadow: focused === field ? '0 0 0 3px rgba(139,92,246,0.07)' : 'none',
  });

  const pwMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

  if (isSuccess) {
    return (
      <AuthLayout orbs={orbs} canvasRef={canvasRef}>
        <SuccessView
          title="Account Created!"
          subtitle="Verification link sent to:"
          email={formData.email}
          showEmail={true}
          linkText="← Back to Login"
          linkTo="/login"
          iconColor="#8B5CF6"
          additionalInfo="Please click the link in your email to verify your account."
          showAdditionalInfo={true}
          redirectTo={null}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout orbs={orbs} canvasRef={canvasRef}>
      {/* Title and Subtitle */}
      <div className="text-center mb-8">
        <h1
          className="font-display text-2xl tracking-[0.3em] font-bold mb-1"
          style={{ color: '#F1F5F9', textShadow: '0 0 30px rgba(139,92,246,0.2)' }}
        >
          CONTAGION
        </h1>
        <p className="font-code text-[10px] tracking-widest uppercase" style={{ color: '#334155' }}>
          Create Analyst Account
        </p>
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md font-mono text-xs uppercase tracking-wider font-bold transition-colors duration-200 flex items-center justify-center gap-2"
          style={{
            background: loading ? 'rgba(139, 92, 246, 0.15)' : '#8B5CF6',
            color: loading ? 'rgba(139, 92, 246, 0.4)' : '#FFFFFF',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#A78BFA';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#8B5CF6';
            }
          }}
        >
          {loading ? (
            <>
              <span
                className="w-3.5 h-3.5 border-2 rounded-full inline-block"
                style={{
                  borderColor: 'rgba(139, 92, 246, 0.33)',
                  borderTopColor: 'transparent',
                  animation: 'spinSlow 0.7s linear infinite',
                }}
              />
              Creating account...
            </>
          ) : (
            '→ Create Account'
          )}
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

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AuthLayout>
  );
};

export default RegisterForm;
