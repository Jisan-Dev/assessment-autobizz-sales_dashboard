import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { SortProps } from "../../types";

export default function TableHeader({
  sort,
  onSortChange,
}: {
  sort: SortProps;
  onSortChange: (column: "date" | "price") => void;
}) {
  const renderSortIcon = (column: "date" | "price") => {
    if (sort.column !== column)
      return (
        <ChevronsUpDown className="ml-1.5 h-3.5 w-3.5 text-slate-400 group-hover:text-slate-500 transition-colors" />
      );
    return sort.direction === "asc" ? (
      <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-indigo-600" />
    ) : (
      <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-indigo-600" />
    );
  };

  return (
    <thead className="bg-slate-50/80">
      <tr>
        <th
          scope="col"
          className="group cursor-pointer px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          onClick={() => onSortChange("date")}
        >
          <div className="flex items-center">
            Date
            {renderSortIcon("date")}
          </div>
        </th>
        <th
          scope="col"
          className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Transaction ID
        </th>
        <th
          scope="col"
          className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Customer
        </th>
        <th
          scope="col"
          className="group cursor-pointer px-6 py-5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          onClick={() => onSortChange("price")}
        >
          <div className="flex items-center justify-end">
            Price
            {renderSortIcon("price")}
          </div>
        </th>
      </tr>
    </thead>
  );
}
