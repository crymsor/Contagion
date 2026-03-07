import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    family: '',
    hash: '',
    threat: 'MEDIUM',
    caption: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission logic
    console.log('Post Created:', formData);
    // Redirect to feed after "creation"
    navigate('/feed');
  };

  return (
    <main className="flex-1 overflow-auto relative z-10">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
        <div className="mb-8 animate-fade-up">
          <h2 className="font-display text-2xl font-bold" style={{ color: '#F1F5F9' }}>
            New <span style={{ color: '#22C55E' }}>Analysis Report</span>
          </h2>
          <p className="font-body text-sm mt-2" style={{ color: '#475569' }}>
            Share your latest findings with the threat intelligence network.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
          {/* File Dropzone Mock */}
          <div 
            className="group relative rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-12 cursor-pointer hover:bg-white/5"
            style={{ 
              borderColor: 'rgba(30,34,51,0.8)',
              background: 'rgba(12,13,20,0.5)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(30,34,51,0.8)')}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
            </div>
            <p className="font-display text-sm font-bold mb-1" style={{ color: '#F1F5F9' }}>Upload Malware Sample</p>
            <p className="font-code text-[10px]" style={{ color: '#475569' }}>DRAG & DROP OR CLICK TO BROWSE</p>
          </div>

          <div 
            className="rounded-xl p-8 border space-y-6"
            style={{
              background: 'rgba(12,13,20,0.8)',
              border: '1px solid rgba(30,34,51,0.8)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Malware Family */}
            <div className="space-y-2">
              <label className="font-code text-[10px] uppercase tracking-widest block" style={{ color: '#475569' }}>
                Malware Family
              </label>
              <input
                type="text"
                name="family"
                value={formData.family}
                onChange={handleChange}
                placeholder="e.g. Emotet, LockBit, Cobalt Strike"
                className="w-full px-4 py-3 rounded-lg bg-[#0A0B10] border border-white/5 font-body text-sm focus:outline-none focus:border-[#22C55E]/40 transition-colors"
                style={{ color: '#F1F5F9' }}
                required
              />
            </div>

            {/* Sample Hash */}
            <div className="space-y-2">
              <label className="font-code text-[10px] uppercase tracking-widest block" style={{ color: '#475569' }}>
                Sample Hash (SHA-256)
              </label>
              <input
                type="text"
                name="hash"
                value={formData.hash}
                onChange={handleChange}
                placeholder="0x7f3ab9c1d2e4..."
                className="w-full px-4 py-3 rounded-lg bg-[#0A0B10] border border-white/5 font-code text-xs focus:outline-none focus:border-[#22C55E]/40 transition-colors"
                style={{ color: '#22C55E' }}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Threat Level */}
              <div className="space-y-2">
                <label className="font-code text-[10px] uppercase tracking-widest block" style={{ color: '#475569' }}>
                  Threat Level
                </label>
                <select
                  name="threat"
                  value={formData.threat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0A0B10] border border-white/5 font-body text-sm focus:outline-none focus:border-[#22C55E]/40 transition-colors appearance-none"
                  style={{ color: '#F1F5F9' }}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="font-code text-[10px] uppercase tracking-widest block" style={{ color: '#475569' }}>
                  Origin (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Global, Ukraine, USA"
                  className="w-full px-4 py-3 rounded-lg bg-[#0A0B10] border border-white/5 font-body text-sm focus:outline-none focus:border-[#22C55E]/40 transition-colors"
                  style={{ color: '#F1F5F9' }}
                />
              </div>
            </div>

            {/* Description/Caption */}
            <div className="space-y-2">
              <label className="font-code text-[10px] uppercase tracking-widest block" style={{ color: '#475569' }}>
                Analysis Summary
              </label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                placeholder="Describe your findings, indicators of compromise, and behavioral observations..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-[#0A0B10] border border-white/5 font-body text-sm focus:outline-none focus:border-[#22C55E]/40 transition-colors resize-none"
                style={{ color: '#F1F5F9' }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg font-display text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group"
              style={{ background: '#22C55E', color: '#0A0B10' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                PUBLISH ANALYSIS
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
