import { useQuery } from "@tanstack/react-query";
import { Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import Header from "./components/header";
import SalesChart from "./components/sales-chart";
import SalesTable from "./components/sales-table";
import { DEFAULT_FILTERS } from "./constants";
import { useDebounce } from "./hooks/useDebounce";
import { api } from "./services/api";
import type { FilterState, SortProps } from "./types";

function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Reset pagination on filter change
    setPageCursor(undefined);
  };

  // Debounce filters to avoid refetching on every keystroke
  const debouncedFilters = useDebounce(filters, 500);

  // Sorting State
  const [sort, setSort] = useState<SortProps>({
    column: "date",
    direction: "desc",
  });

  // Pagination State (Cursor based)
  const [pageCursor, setPageCursor] = useState<
    { token: string; type: "before" | "after" } | undefined
  >(undefined);

  // Data Fetching with React Query
  const { data, isLoading, isError, error } = useQuery({
    // Unique key for caching based on all parameters
    queryKey: ["sales", debouncedFilters, sort, pageCursor],
    queryFn: () => api.getSales(debouncedFilters, sort, pageCursor),
    // placeholderData: keepPreviousData,
  });

  const handleSortChange = (column: "date" | "price") => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (type: "before" | "after", token: string) => {
    setPageCursor({ type, token });
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  // Auth Initialization
  useEffect(() => {
    const initAuth = async () => {
      if (!api.loadToken()) {
        try {
          await api.authorize();
        } catch (e) {
          console.error("Failed to authorize on startup", e);
        }
      }
    };
    initAuth();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900 overflow-auto">
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

          {/* Error State */}
          {isError && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700 border border-red-100 shadow-sm flex items-start gap-3">
              <div className="mt-0.5">⚠️</div>
              <div>
                <p className="font-semibold">Unable to load data</p>
                <p className="text-sm opacity-90">{(error as Error).message}</p>
              </div>
            </div>
          )}

          {!isError && (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Chart */}
              <div className="lg:col-span-3">
                <section
                  aria-label="Sales Chart"
                  className="transition-all duration-300 ease-in-out"
                >
                  {isLoading && !data ? (
                    <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <div className="flex flex-col items-center gap-2 text-indigo-600">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="text-sm font-medium">
                          Loading Analytics...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <SalesChart data={data?.results.TotalSales || []} />
                  )}
                </section>
              </div>

              {/* Table */}
              <div className="lg:col-span-3 overflow-x-auto">
                <section aria-label="Sales Data Table">
                  <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                      Recent Transactions
                    </h2>
                    {isLoading && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        <Loader2 className="h-3 w-3 animate-spin" /> Updating
                      </span>
                    )}
                  </div>

                  <SalesTable
                    data={data?.results.Sales || []}
                    isLoading={isLoading && !data}
                    sort={sort}
                    onSortChange={handleSortChange}
                    pagination={data?.pagination || {}}
                    onPageChange={handlePageChange}
                  />
                </section>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 text-sm font-medium animate-in fade-in slide-in-from-bottom-4">
              <RefreshCw className="animate-spin" size={16} />
              Loading Data...
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
