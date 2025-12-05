import { useState } from "react";
import Filters from "./components/filters";
import Header from "./components/header";
import { DEFAULT_FILTERS } from "./constants";
import type { FilterState } from "./types";

function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Reset pagination on filter change
    // setPageCursor({ token: undefined, type: null });
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* intro text */}
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-slate-900">
              Dashboard Overview
            </h2>
            <p className="text-slate-500 text-sm">
              Track sales performance and filter historical data.
            </p>
          </div>

          {/* Filter section */}
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </main>
      </div>
    </>
  );
}

export default App;
