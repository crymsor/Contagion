import React from 'react';
import { Link } from 'react-router-dom';

const SuccessView = ({
  title = 'Check Your Inbox',
  subtitle = 'Reset link sent to:',
  email,
  linkText = 'Back to Login',
  linkTo = '/login',
  iconColor = '#22C55E',
}) => {
  return (
    <div className="text-center py-4 animate-scale-in">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="68" height="68" viewBox="0 0 68 68">
            <circle cx="34" cy="34" r="30" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="2"/>
            <circle cx="34" cy="34" r="30" fill="none" stroke={iconColor} strokeWidth="2"
              strokeLinecap="round" transform="rotate(-90 34 34)"
              style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.7))', animation: 'fadeIn 0.8s ease 0.1s both' }}/>
            <path d="M21 34l9 9 17-18" fill="none" stroke={iconColor} strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 4px rgba(34,197,94,0.8))', animation: 'fadeIn 0.4s ease 0.6s both' }}/>
          </svg>
        </div>
      </div>

      <h2
        className="font-display text-xl font-bold tracking-wider mb-3"
        style={{ color: '#F1F5F9', textShadow: '0 0 20px rgba(34,197,94,0.25)', animation: 'fadeUp 0.5s ease 0.35s both', opacity: 0 }}
      >
        {title}
      </h2>

      <div style={{ animation: 'fadeUp 0.5s ease 0.5s both', opacity: 0 }}>
        <p className="font-body text-sm mb-3" style={{ color: '#64748B' }}>{subtitle}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-code text-sm mb-5" style={{
          background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', color: iconColor
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
        <Link
          to={linkTo}
          className="inline-block px-6 py-2.5 rounded-lg font-display text-sm tracking-widest uppercase font-bold transition-all duration-200"
          style={{ background: 'transparent', border: '1px solid rgba(34,197,94,0.3)', color: iconColor }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(34,197,94,0.08)'; e.currentTarget.style.borderColor='rgba(34,197,94,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(34,197,94,0.3)'; }}
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default SuccessView;
