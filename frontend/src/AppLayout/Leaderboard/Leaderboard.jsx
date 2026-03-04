import { useState } from 'react';
import Sidebar from '../Dashboard/Components/Sidebar.jsx'
import TopBar from '../Dashboard/Components/TopBar.jsx';
import FilterBar from './Components/FilterBar.jsx';
import PositionCard from './Components/PositionCard.jsx';

function Leaderboard() {

  const [sidebarOpen] = useState(true);

  const contentMargin = sidebarOpen ? '220px' : '64px';

  const leaderboardData = Array.from({ length: 10 }, (_, i) => ({
    position: i + 1,
    username: `User_${i + 1}`,
    userpfp: "/pfp1.png",
    trophies: Math.floor(Math.random() * 50),
    analyses: Math.floor(Math.random() * 40),
    reviews: Math.floor(Math.random() * 30),
    avgScore: Math.floor(Math.random() * 100),
  }));

  const currentUser = {
    position: 17,
    username: "You",
    userpfp: "/pfp1.png",
    trophies: 22,
    analyses: 15,
    reviews: 9,
    avgScore: 81,
  };

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

          <div className="flex flex-col gap-2">
            {leaderboardData.map((user) => (
              <PositionCard
                key={user.position}
                {...user}
              />
            ))}
          </div>
          <div className="sticky bottom-0 mt-6 pt-4 bg-abyss">
            <div className="border-t border-phantom/40 pt-4">
              <PositionCard {...currentUser} />
            </div>
          </div>



        </div>
      </div>

    </>
  )
}

export default Leaderboard;
