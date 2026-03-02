import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import CustomButton from './CustomButton';
import SuccessView from './SuccessView';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  // Cyan-tinted orbs for forgot page
  const orbs = [
    { x: 0.2, y: 0.15, r: 0.42, color: [34, 211, 238], angle: 0, speed: 0.0004, sineX: 0.13, cosY: 0.69, cosX: 0.1 },
    { x: 0.8, y: 0.8, r: 0.48, color: [34, 197, 94], angle: 1.8, speed: 0.0003, sineX: 0.13, cosY: 0.69, cosX: 0.1 },
    { x: 0.75, y: 0.2, r: 0.32, color: [34, 211, 238], angle: 3.5, speed: 0.0005, sineX: 0.13, cosY: 0.69, cosX: 0.1 },
    { x: 0.15, y: 0.7, r: 0.28, color: [139, 92, 246], angle: 2.2, speed: 0.00025, sineX: 0.13, cosY: 0.69, cosX: 0.1 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
    console.log('forgot:', email);
  };

  const inputStyle = (field) => ({
    background: focused === field ? 'rgba(34,211,238,0.05)' : 'rgba(5,5,8,0.95)',
    border: `1px solid ${focused === field ? 'rgba(34,211,238,0.4)' : 'rgba(30,34,51,1)'}`,
    color: '#E2E8F0',
    boxShadow: focused === field ? '0 0 0 3px rgba(34,211,238,0.07)' : 'none',
  });

  return (
    <AuthLayout
      orbs={orbs}
      title="CONTAGION"
      subtitle="Password Recovery"
      canvasRef={canvasRef}
      containerStyle={{
        background: submitted
          ? 'radial-gradient(circle at center, rgba(13,110,128,0.15) 0%, rgba(7,8,13,0.9) 100%)'
          : undefined,
      }}
    >
      {submitted ? (
        <SuccessView
          title="Check Your Inbox"
          subtitle="Reset link sent to:"
          email={email}
          linkText="← Back to Login"
          linkTo="/login"
          iconColor="#22C55E"
        />
      ) : (
        <>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{
            background: 'rgba(34,211,238,0.07)',
            border: '1px solid rgba(34,211,238,0.2)',
            boxShadow: '0 0 20px rgba(34,211,238,0.1)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#22D3EE" strokeWidth="1.5"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="#22D3EE"/>
            </svg>
          </div>

          <p className="font-body text-sm mb-8 text-center" style={{ color: '#475569' }}>
            Enter your email to receive a reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="you@contagion.sec"
              required
              customStyle={inputStyle('email')}
              focusedColor="rgba(34,211,238,0.4)"
            />

            <CustomButton
              type="submit"
              disabled={loading}
              loading={loading}
              variant="cyan"
              style={{ background: loading ? 'rgba(34,211,238,0.12)' : '#0891B2' }}
            >
              {loading ? 'Sending...' : '→ Send Reset Link'}
            </CustomButton>
          </form>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid rgba(30,34,51,0.7)' }}>
            <Link
              to="/login"
              className="font-code text-xs transition-colors duration-150"
              style={{ color: '#22D3EE' }}
              onMouseEnter={e => e.currentTarget.style.color='#67E8F9'}
              onMouseLeave={e => e.currentTarget.style.color='#22D3EE'}
            >
              ← Back to login
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
