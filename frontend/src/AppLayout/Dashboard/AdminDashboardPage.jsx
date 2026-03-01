import React from 'react';
import useAuth from '../../hooks/useAuth';

function AdminDashboardPage() {
  const { user, toggleAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
      <div className="flex flex-row justify-between items-end mb-10 pb-6 border-b border-phantom">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-red-500 shadow-[0_0_8px_#EF4444]"></div>
            <h3 className="text-3xl font-black text-slate-100 tracking-tighter uppercase">Admin Nexus</h3>
          </div>
          <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">System Overlord Access</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-red-500 font-mono font-bold uppercase tracking-[0.3em] animate-pulse">Critical Access Only</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Status Cards */}
        {[
          { label: 'Total Node Load', value: '42%', color: 'text-toxic' },
          { label: 'Active Breaches', value: '03', color: 'text-red-500' },
          { label: 'Neural Accuracy', value: '99.9%', color: 'text-cyan-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-obsidian border border-phantom p-6 rounded-sm">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Admin Controls */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-l-2 border-red-500 pl-4">Funky Controls</h4>
          <div className="bg-obsidian border border-phantom p-6 space-y-4">
            <div className="flex items-center justify-between p-3 border border-phantom/30 rounded bg-void/50 group hover:border-red-500/50 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-200 uppercase tracking-tight">Erase Database</p>
                <p className="text-[10px] text-slate-500 font-mono">Irreversible system wipe protocol</p>
              </div>
              <button className="bg-red-900/20 text-red-500 border border-red-500/30 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Execute</button>
            </div>

            <div className="flex items-center justify-between p-3 border border-phantom/30 rounded bg-void/50 group hover:border-toxic/50 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-200 uppercase tracking-tight">Neural Re-sync</p>
                <p className="text-[10px] text-slate-500 font-mono">Calibrate neural analysis nodes</p>
              </div>
              <button className="bg-toxic/10 text-toxic border border-toxic/30 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-toxic hover:text-void transition-all">Calibrate</button>
            </div>

            <div className="flex items-center justify-between p-3 border border-phantom/30 rounded bg-void/50">
              <div>
                <p className="text-sm font-bold text-slate-200 uppercase tracking-tight">Developer Mode</p>
                <p className="text-[10px] text-slate-500 font-mono">Toggle admin status for testing</p>
              </div>
              <button 
                onClick={toggleAdmin}
                className="bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all"
              >
                Toggle {user?.isAdmin ? 'OFF' : 'ON'}
              </button>
            </div>
          </div>
        </div>

        {/* User Management Mock */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-l-2 border-cyan-500 pl-4">System Access Logs</h4>
          <div className="bg-obsidian border border-phantom p-6">
            <div className="space-y-3">
              {[
                { user: 'root', action: 'Login Success', time: '02:44:12', status: 'Secure' },
                { user: 'user_883', action: 'Neural Access', time: '02:41:05', status: 'Authorized' },
                { user: 'anon_ext', action: 'Unauthorized Ping', time: '02:38:22', status: 'Blocked' }
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-phantom/30 pb-3">
                  <div className="flex gap-4">
                    <span className="text-slate-500">{log.time}</span>
                    <span className="text-slate-100 font-bold">{log.user}</span>
                  </div>
                  <span className="text-slate-400 uppercase">{log.action}</span>
                  <span className={log.status === 'Blocked' ? 'text-red-500' : 'text-toxic'}>{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
