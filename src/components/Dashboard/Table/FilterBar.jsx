import React from "react";

const FilterBar = ({
  search,
  setSearch,
  subscription,
  setSubscription,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-4 py-2 w-1/3"
      />

      <select
        value={subscription}
        onChange={(e) => setSubscription(e.target.value)}
        className="border rounded px-4 py-2 w-1/4"
      >
        <option value="">All</option>
        <option value="Free">Free</option>
        <option value="Premium">Premium</option>
      </select>

      <div className="relative w-1/4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-4 py-2 w-full appearance-none"
        >
          <option value="start-end">Starting - Ending</option>
          <option value="end-start">Ending - Starting</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
