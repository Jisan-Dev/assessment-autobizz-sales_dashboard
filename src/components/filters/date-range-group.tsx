import type { FilterProps } from ".";
import { DatePicker } from "../ui/date-picker";

export default function DateRangeGroup({
  filters,
  onFilterChange,
}: FilterProps) {
  return (
    <div className="lg:col-span-4 grid grid-cols-2 gap-3">
      <DatePicker
        label="From"
        value={filters.startDate}
        onChange={(date) => onFilterChange("startDate", date)}
      />
      <DatePicker
        label="To"
        value={filters.endDate}
        onChange={(date) => onFilterChange("endDate", date)}
      />
    </div>
  );
}
