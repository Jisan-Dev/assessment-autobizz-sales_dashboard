import type { FilterState } from "../../types";
import DateRangeGroup from "./date-range-group";
import Heading from "./heading";
import OtherFilters from "./other-filters";

export interface FilterProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export default function Filters({ filters, onFilterChange }: FilterProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
      <Heading />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* Date Range Group */}
        <DateRangeGroup filters={filters} onFilterChange={onFilterChange} />

        {/* Separator for large screens */}
        <div className="hidden lg:block w-px bg-slate-100 mx-auto h-12 self-end mb-1"></div>

        {/* Other Filters */}
        <OtherFilters filters={filters} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
}
