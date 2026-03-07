import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SeverityBadge, StatusBadge } from '../Dashboard/Components/HooksAndBadges';

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Mock detailed data for the post
  const post = {
    id: postId,
    user: 'MalwareHunter',
    location: 'Kiev, Ukraine',
    hash: '7f3ab9c1d2e4b8a9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    family: 'Emotet',
    threat: 'CRITICAL',
    status: 'Completed',
    date: 'MARCH 7, 2026',
    score: 94,
    size: '245 KB',
    type: 'Win32 EXE',
    entropy: '7.84 (Highly Packed)',
    firstSeen: '2026-03-07 04:21:12',
    caption: 'Just found this Emotet variant in a phishing campaign. Stay safe everyone!',
    analysis: [
      { category: 'Persistence', detail: 'Creates scheduled task "WindowsUpdateCheck"', status: 'DETECTED' },
      { category: 'Network', detail: 'Attempts connection to 185.244.150.82:443', status: 'BLOCKED' },
      { category: 'Stealth', detail: 'Injects code into explorer.exe process', status: 'DETECTED' },
      { category: 'Discovery', detail: 'Queries installed antivirus software', status: 'DETECTED' },
    ]
  };

  return (
    <main className="flex-1 overflow-auto relative z-10">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 font-code text-xs transition-colors"
          style={{ color: '#475569' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#22C55E')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          RETURN TO FEED
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Header Card */}
            <div 
              className="rounded-xl p-6 border animate-fade-up"
              style={{
                background: 'rgba(12,13,20,0.8)',
                border: '1px solid rgba(30,34,51,0.8)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{ 
                      background: 'linear-gradient(135deg, #22C55E 0%, #166534 100%)',
                      color: '#0A0B10',
                      border: '2px solid rgba(34,197,94,0.3)'
                    }}
                  >
                    {post.user.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold" style={{ color: '#F1F5F9' }}>
                      {post.family} Analysis
                    </h2>
                    <p className="font-code text-xs" style={{ color: '#475569' }}>
                      UPLOADED BY <span style={{ color: '#22C55E' }}>{post.user}</span> • {post.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <SeverityBadge level={post.threat} />
                   <StatusBadge status={post.status} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0A0B10] border border-white/5">
                  <span className="font-code text-[10px] uppercase tracking-widest block mb-2" style={{ color: '#475569' }}>SHA-256 HASH</span>
                  <code className="font-code text-xs break-all" style={{ color: '#22C55E' }}>
                    {post.hash}
                  </code>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                  {post.caption}
                </p>
              </div>
            </div>

            {/* Analysis Details */}
            <div 
              className="rounded-xl overflow-hidden border animate-fade-up"
              style={{
                background: 'rgba(12,13,20,0.8)',
                border: '1px solid rgba(30,34,51,0.8)',
                backdropFilter: 'blur(16px)',
                animationDelay: '100ms'
              }}
            >
              <div className="px-6 py-4 border-b border-[rgba(30,34,51,0.5)] bg-white/5">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider" style={{ color: '#F1F5F9' }}>
                  Behavioral Indicators
                </h3>
              </div>
              <div className="divide-y divide-[rgba(30,34,51,0.3)]">
                {post.analysis.map((item, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                    <div>
                      <span className="font-code text-[10px] text-[#22C55E] uppercase tracking-widest block mb-1">{item.category}</span>
                      <p className="font-body text-sm" style={{ color: '#F1F5F9' }}>{item.detail}</p>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded font-code text-[9px] tracking-widest border"
                      style={{ 
                        background: 'rgba(239,68,68,0.08)', 
                        color: '#EF4444', 
                        border: '1px solid rgba(239,68,68,0.15)' 
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Score Card */}
            <div 
              className="rounded-xl p-6 border animate-fade-up"
              style={{
                background: 'rgba(12,13,20,0.8)',
                border: '1px solid rgba(30,34,51,0.8)',
                backdropFilter: 'blur(16px)',
                animationDelay: '200ms'
              }}
            >
              <h3 className="font-display text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#475569' }}>
                Threat Score
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-white/5"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.42}
                      strokeDashoffset={364.42 - (364.42 * post.score) / 100}
                      className="text-[#EF4444]"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.4))' }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-display text-3xl font-bold" style={{ color: '#F1F5F9' }}>{post.score}</span>
                    <span className="font-code text-[10px] text-[#475569]">/ 100</span>
                  </div>
                </div>
                <p className="mt-4 font-code text-[10px] text-center" style={{ color: '#EF4444' }}>
                  CRITICAL THREAT LEVEL
                </p>
              </div>
            </div>

            {/* File Info Card */}
            <div 
              className="rounded-xl p-6 border animate-fade-up"
              style={{
                background: 'rgba(12,13,20,0.8)',
                border: '1px solid rgba(30,34,51,0.8)',
                backdropFilter: 'blur(16px)',
                animationDelay: '300ms'
              }}
            >
              <h3 className="font-display text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#475569' }}>
                Static Information
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'File Type', value: post.type },
                  { label: 'File Size', value: post.size },
                  { label: 'Entropy', value: post.entropy },
                  { label: 'First Seen', value: '2026-03-07' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-code text-[10px]" style={{ color: '#475569' }}>{item.label}</span>
                    <span className="font-code text-xs text-right" style={{ color: '#F1F5F9' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;
