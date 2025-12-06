import { Package } from "lucide-react";
import type { PaginationMeta, Sale, SortProps } from "../../types";
import Pagination from "./pagination";
import Skeleton from "./skeleton";
import TableHeader from "./table-header";

interface SalesTableProps {
  data: Sale[];
  isLoading: boolean;
  sort: SortProps;
  onSortChange: (column: "date" | "price") => void;
  pagination: PaginationMeta;
  onPageChange: (direction: "before" | "after", token: string) => void;
}

export default function SalesTable({
  data,
  isLoading,
  sort,
  onSortChange,
  pagination,
  onPageChange,
}: SalesTableProps) {
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }).format(date);
    } catch (e) {
      console.log(e);
      return isoString;
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-black/2 overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-slate-100">
          <TableHeader sort={sort} onSortChange={onSortChange} />

          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <Skeleton />
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-slate-50 p-4 rounded-full mb-4 ring-8 ring-slate-50/50">
                      <Package className="h-8 w-8 text-slate-300" />
                    </div>
                    <p className="text-base font-semibold text-slate-900">
                      No transactions found
                    </p>
                    <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                      We couldn't find any data matching your filters. Try
                      adjusting dates or removing filters.
                    </p>

                    {/* add a button to reload the window */}
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Reload Page
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((sale) => (
                <tr
                  key={sale._id}
                  className="group hover:bg-slate-50/60 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700 group-hover:text-slate-900">
                    {formatDate(sale.date)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">
                        {sale._id.slice(-8)}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold shadow-sm ring-2 ring-white">
                        {(sale.customerEmail || "?").charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                          {sale.customerEmail}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {sale.customerPhone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                      ${sale.price.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        data={data}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </div>
  );
}
