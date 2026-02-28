import React from "react";

function SearchBar({ filters, onFilterChange }) {
  const inputBaseStyles = "bg-abyss border border-phantom text-slate-100 py-2 px-4 focus:outline-none focus:border-toxic focus:ring-1 focus:ring-toxic/30 transition-all duration-200 placeholder:text-slate-600 font-mono text-sm";
  const selectBaseStyles = "bg-obsidian border border-phantom text-slate-300 py-2 px-3 focus:outline-none focus:border-toxic cursor-pointer font-mono text-xs uppercase tracking-wider";

  // Helper to update specific filter keys
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-void/50 border-b border-phantom">
      {/* Search Input */}
      <div className="relative flex-grow max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-toxic/50 font-mono pointer-events-none">
          {">"}
        </span>
        <input
          name="query"
          type="text"
          value={filters.query}
          onChange={handleChange}
          placeholder="Search Submissions..."
          className={`${inputBaseStyles} w-full pl-8`}
        />
      </div>

      {/* Status Filter */}
      <div className="flex flex-col">
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className={selectBaseStyles}
        >
          <option value="all">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Under Review">Under Review</option>
          <option value="Archived">Archived</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Family Filter */}
      <div className="flex flex-col">
        <select
          name="family"
          value={filters.family}
          onChange={handleChange}
          className={selectBaseStyles}
        >
          <option value="all">All Families</option>
          <option value="Ransomware">Ransomware</option>
          <option value="Trojan">Trojan</option>
          <option value="Worm">Worm</option>
          <option value="APT">APT</option>
        </select>
      </div>

      {/* Terminal Pulse Indicator */}
      <div className="ml-auto flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-toxic animate-pulse shadow-[0_0_8px_#22C55E]"></div>
        <span className="text-[10px] text-toxic font-mono font-bold uppercase tracking-widest">Live Uplink</span>
      </div>
    </div>
  );
}

export default SearchBar;
