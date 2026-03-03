import Dropdown from "../../SubmissionsPage/Components/Dropdown";
import { useState } from "react";

function FilterBar() {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const [filters, setFilters] = useState({
    query: "",
    status: "all",
    family: "all",
    duration: "all",
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const selectBaseStyles = "bg-obsidian border border-phantom text-slate-300 py-2 px-3 focus:outline-none focus:border-toxic cursor-pointer font-mono text-xs uppercase tracking-wider";
  return (
    <>

      <div className="flex flex-wrap items-center gap-3 p-4 bg-void/50 border-b border-phantom">
        {/*Filter Dropdown*/}
        <Dropdown
          name="duration"
          value={filters.duration}
          onChange={handleChange}
          options={[
            { value: "all", label: "All Time" },
            { value: "month", label: "Monthly" },
            { value: "week", label: "Weekly" },
          ]}
        />
      </div>

    </>
  )
}

export default FilterBar;
