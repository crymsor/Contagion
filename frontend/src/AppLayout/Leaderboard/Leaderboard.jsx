import { useState } from 'react';
import Sidebar from '../Dashboard/Components/Sidebar.jsx'
import TopBar from '../Dashboard/Components/TopBar.jsx';
import FilterBar from './Components/FilterBar.jsx';

function Leaderboard() {

  const [sidebarOpen] = useState(true);

  const contentMargin = sidebarOpen ? '220px' : '64px';
  return (
    <>
      <Sidebar isOpen={sidebarOpen} />
      <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />
      <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />

      <div style={{ marginLeft: contentMargin }} className="transition-all duration-300">
        <TopBar pageName={"Leaderboard"} />

        <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
          <div className="flex flex-row justify-between items-center mb-10 pb-6 border-b border-phantom">
            {/* Left: Heading */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-toxic shadow-[0_0_8px_#22C55E]"></div>
              <h3 className="text-3xl font-black text-slate-100 tracking-tighter uppercase">
                Leaderboard
              </h3>
            </div>

            {/* Right: FilterBar */}
            <div className="ml-6"> {/* adds horizontal breathing space */}
              <FilterBar />
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Leaderboard;
