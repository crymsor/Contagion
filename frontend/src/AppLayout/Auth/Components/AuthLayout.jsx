import { useState, useRef, useEffect } from 'react';
import ThemeOrbs from './ThemeOrbs';

/**
 * AuthLayout - A reusable layout component for authentication pages
 * Supports different themes (green for login, purple for register, cyan for forgot password)
 *
 * @param {Object} props
 * @param {Array} props.orbs - Configuration for animated orbs (color, position, etc.)
 * @param {React.ReactNode} props.children - Children elements to render inside the layout
 * @param {string} props.title - Main title displayed in header
 * @param {string} props.subtitle - Subtitle displayed below title
 * @param {React.ReactNode} props.icon - Custom icon to display
 * @param {string} props.footerText - Footer text (default: CONTAGION v2.4.1)
 * @param {string} props.containerStyle - Additional container styles
 */
const AuthLayout = ({
  orbs,
  children,
  title,
  subtitle,
  icon,
  footerText = 'CONTAGION v2.4.1',
  containerStyle = {},
}) => {
  const canvasRef = useRef(null);
  const [orbConfig, setOrbConfig] = useState(orbs);

  useEffect(() => {
    // Update orbs if they change
    if (orbs) {
      setOrbConfig(orbs);
    }
  }, [orbs]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#07080D', ...containerStyle }}
    >
      {/* Animated orbs */}
      {orbConfig && <ThemeOrbs orbs={orbConfig} containerRef={canvasRef} />}

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
      }} />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-[420px] animate-fade-up">
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: 'rgba(9,10,16,0.82)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 0 0 1px rgba(139,92,246,0.04), 0 32px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Decorative gradient line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)',
            }}
          />

          {/* Header */}
          {title && (
            <div className="text-center mb-8">
              <h1
                className="font-display text-2xl tracking-[0.3em] font-bold mb-1"
                style={{ color: '#F1F5F9', textShadow: '0 0 30px rgba(139,92,246,0.2)' }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="font-code text-[10px] tracking-widest uppercase" style={{ color: '#334155' }}>
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {children}
        </div>
        <p className="text-center mt-4 font-code text-[10px] tracking-widest" style={{ color: '#1A1D2A' }}>
          {footerText}
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
