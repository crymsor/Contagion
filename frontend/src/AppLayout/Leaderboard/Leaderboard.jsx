import { useState } from 'react';
import Sidebar from '../Dashboard/Components/Sidebar.jsx'

function Leaderboard() {

  const [sidebarOpen] = useState(true);

  const contentMargin = sidebarOpen ? '220px' : '64px';
  return (
    <>
      <Sidebar isOpen={sidebarOpen} />
      <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />
      <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />

      <div style={{ marginLeft: contentMargin }} className="transition-all duration-300">


      </div>

    </>
  )
}

export default Leaderboard;
