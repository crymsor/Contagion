import { useState } from "react";
import Dropdown from "../../SubmissionsPage/Components/Dropdown";

function FilterBar() {
  const [filters, setFilters] = useState({
    view: "leaderboard",
    duration: "all",
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center gap-6">
      {/* View Switch Buttons */}
      <div className="flex gap-2 bg-obsidian rounded-md overflow-hidden border border-phantom">
        {["leaderboard", "achievements"].map((option) => (
          <button
            key={option}
            onClick={() => handleFilterChange("view", option)}
            className={`px-6 py-2 text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${filters.view === option
              ? "bg-toxic text-black"
              : "bg-obsidian text-slate-300 hover:bg-toxic/20"
              }`}
          >
            {option === "leaderboard" ? "Leaderboard" : "Achievements"}
          </button>
        ))}
      </div>

      {/* Dropdown Container (reserve space) */}
      <div
        style={{ minWidth: "140px" }}
        className={`${filters.view === "leaderboard" ? "" : "invisible"}`}
      >
        <Dropdown
          name="duration"
          value={filters.duration}
          onChange={(e) => handleFilterChange("duration", e.target.value)}
          options={[
            { value: "all", label: "All Time" },
            { value: "month", label: "Monthly" },
            { value: "week", label: "Weekly" },
          ]}
        />      </div>
    </div>
  );
}

export default FilterBar;
