import { Filter } from "lucide-react";

export default function Heading() {
  return (
    <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-4">
      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
        <Filter size={18} />
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-800">Filter Records</h2>
        <p className="text-xs text-slate-500 font-medium">
          Narrow down your sales data
        </p>
      </div>
    </div>
  );
}
