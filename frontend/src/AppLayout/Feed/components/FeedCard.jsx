import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SeverityBadge } from '../../Dashboard/Components/HooksAndBadges';

const FeedCard = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer rounded-xl overflow-hidden animate-fade-up border transition-all duration-300 hover:border-[#22C55E]/40"
      style={{
        background: 'rgba(12,13,20,0.8)',
        border: '1px solid rgba(30,34,51,0.8)',
        backdropFilter: 'blur(16px)',
        marginBottom: '2rem',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(30,34,51,0.5)]">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs"
            style={{ 
              background: 'linear-gradient(135deg, #22C55E 0%, #166534 100%)',
              color: '#0A0B10',
              border: '2px solid rgba(34,197,94,0.3)'
            }}
          >
            {post.user.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="font-display text-sm font-bold" style={{ color: '#F1F5F9' }}>
              {post.user}
            </h4>
            <p className="font-code text-[10px] tracking-wider" style={{ color: '#475569' }}>
              {post.location || 'GLOBAL NETWORK'}
            </p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* Content Body */}
      <div className="relative aspect-square sm:aspect-video flex items-center justify-center overflow-hidden bg-[#0A0B10]">
        <div className="absolute inset-0 bg-grid-toxic opacity-20 pointer-events-none" />
        
        {/* Placeholder for "Image/Content" */}
        <div className="z-10 text-center p-8 flex flex-col items-center">
          <div 
            className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 className="font-display text-xl font-bold mb-1 tracking-tight" style={{ color: '#F1F5F9' }}>
            {post.family}
          </h3>
          <code className="font-code text-xs px-2 py-1 rounded" style={{ background: 'rgba(30,34,51,0.5)', color: '#22C55E' }}>
            {post.hash}
          </code>
          <div className="mt-4">
             <SeverityBadge level={post.threat} />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#22C55E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button className="transition-transform active:scale-90">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F1F5F9" strokeWidth="2" className="hover:text-[#EF4444] transition-colors">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="transition-transform active:scale-90">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F1F5F9" strokeWidth="2" className="hover:text-[#22C55E] transition-colors">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
          <button className="transition-transform active:scale-90">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F1F5F9" strokeWidth="2" className="hover:text-[#8B5CF6] transition-colors">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>

        {/* Caption Area */}
        <div className="space-y-1">
          <p className="font-body text-sm" style={{ color: '#94A3B8' }}>
            <span className="font-bold mr-2 text-[#F1F5F9]">{post.user}</span>
            {post.caption || `Detected new variant of ${post.family}. Analyzing behavior in sandbox...`}
          </p>
          <button className="text-xs font-code mt-1" style={{ color: '#475569' }}>
            View all {post.comments || 0} comments
          </button>
          <p className="text-[10px] font-code uppercase tracking-widest mt-2" style={{ color: '#334155' }}>
            {post.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
