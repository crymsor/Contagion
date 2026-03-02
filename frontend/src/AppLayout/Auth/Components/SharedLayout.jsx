import React from 'react';

const SharedLayout = ({
  children,
  footerText = 'CONTAGION v2.4.1',
  containerStyle = {},
  canvasRef,
}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#07080D', ...containerStyle }}
    >
      {/* Background canvas for animated orbs */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

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

          {children}
        </div>
        <p className="text-center mt-4 font-code text-[10px] tracking-widest" style={{ color: '#1A1D2A' }}>
          {footerText}
        </p>
      </div>
    </div>
  );
};

export default SharedLayout;
