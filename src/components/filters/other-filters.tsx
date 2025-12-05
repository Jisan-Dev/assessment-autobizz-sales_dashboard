import { DollarSign, Mail, Phone } from "lucide-react";
import type { FilterProps } from ".";

export default function OtherFilters({ filters, onFilterChange }: FilterProps) {
  return (
    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Min Price */}
      <div className="relative group">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
          Min Price
        </label>
        <div className="relative">
          <DollarSign
            className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={16}
          />
          <input
            type="number"
            placeholder="0.00"
            value={filters.minPrice}
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Email */}
      <div className="relative group">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
          Customer Email
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={16}
          />
          <input
            type="email"
            placeholder="Search email..."
            value={filters.email}
            onChange={(e) => onFilterChange("email", e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="relative group">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone
            className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={16}
          />
          <input
            type="tel"
            placeholder="Search phone..."
            value={filters.phone}
            onChange={(e) => onFilterChange("phone", e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
