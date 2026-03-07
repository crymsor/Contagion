import React from 'react';

const Stories = () => {
  const users = ['Your Story', 'MalwareHunter', 'CyberGuardian', 'Infosec_Joe', 'RansomAware', 'ZeroDay'];

  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-4 max-w-[400px]">
      {users.map((user, i) => (
        <div key={user} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group">
          <div 
            className="w-10 h-10 rounded-full p-[1.5px] transition-transform group-hover:scale-105"
            style={{ background: i === 0 ? 'rgba(30,34,51,0.5)' : 'linear-gradient(45deg, #22C55E, #166534)' }}
          >
            <div className="w-full h-full rounded-full bg-[#0A0B10] flex items-center justify-center border-[1.5px] border-[#0A0B10]">
              <div 
                className="w-full h-full rounded-full flex items-center justify-center font-display font-bold text-[8px]"
                style={{ 
                  background: 'rgba(34,197,94,0.1)',
                  color: '#22C55E'
                }}
              >
                {user.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
          <span className="text-[8px] font-code truncate w-10 text-center" style={{ color: '#475569' }}>
            {user.split(' ')[0]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
