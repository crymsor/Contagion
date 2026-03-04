import { useState } from 'react';
import PositionCard from './Components/PositionCard.jsx';
import Dropdown from '../SubmissionsPage/Components/Dropdown';

function Leaderboard() {
  // Dropdown state
  const [duration, setDuration] = useState("all");

  // Dummy leaderboard data
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
    <div className="min-h-screen bg-abyss text-slate-100 px-6 py-12 md:px-12 lg:px-20">
      <div className="flex flex-row justify-between items-center mb-10 pb-6 border-b border-phantom">
        {/* Left: Heading */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-toxic shadow-[0_0_8px_#22C55E]"></div>
          <h3 className="text-3xl font-black text-slate-100 tracking-tighter uppercase">
            Leaderboard
          </h3>
        </div>

        {/* Right: Duration Dropdown */}
        <div className="ml-6" style={{ minWidth: "140px" }}>
          <Dropdown
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            options={[
              { value: "all", label: "All Time" },
              { value: "month", label: "Monthly" },
              { value: "week", label: "Weekly" },
            ]}
          />
        </div>
      </div>

      {/* Leaderboard Rows */}
      <div className="flex flex-col gap-2">
        {leaderboardData.map((user) => (
          <PositionCard key={user.position} {...user} />
        ))}
      </div>

      {/* Sticky Current User */}
      <div className="sticky bottom-0 mt-6 pt-4 bg-abyss">
        <div className="border-t border-phantom/40 pt-4">
          <PositionCard {...currentUser} />
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
