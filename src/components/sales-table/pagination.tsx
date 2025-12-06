import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationMeta, Sale } from "../../types";

interface PaginationProps {
  data: Sale[];
  isLoading: boolean;
  pagination: PaginationMeta;
  onPageChange: (direction: "before" | "after", token: string) => void;
}

export default function Pagination({
  data,
  isLoading,
  pagination,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() =>
            pagination.before && onPageChange("before", pagination.before)
          }
          disabled={!pagination.before || isLoading}
          className="relative inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() =>
            pagination.after && onPageChange("after", pagination.after)
          }
          disabled={!pagination.after || isLoading}
          className="relative ml-3 inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            Showing{" "}
            <span className="font-bold text-slate-900">{data.length}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex shadow-sm rounded-lg"
            aria-label="Pagination"
          >
            <button
              onClick={() =>
                pagination.before && onPageChange("before", pagination.before)
              }
              disabled={!pagination.before || isLoading}
              className="relative inline-flex items-center gap-2 rounded-l-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Previous</span>
            </button>
            <button
              onClick={() =>
                pagination.after && onPageChange("after", pagination.after)
              }
              disabled={!pagination.after || isLoading}
              className="relative -ml-px inline-flex items-center gap-2 rounded-r-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
