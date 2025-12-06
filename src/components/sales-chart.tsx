import { TrendingUp } from "lucide-react";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TotalDailySale } from "../types";

interface SalesChartProps {
  data: TotalDailySale[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  // Sort data by date just in case
  const chartData = useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );
  }, [data]);

  // Calculate Total Revenue from the aggregated daily sales
  const totalRevenue = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.totalSale, 0);
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-slate-400">
        No data available to display
      </div>
    );
  }

  return (
    <div className="min-h-[420px] w-full rounded-2xl bg-white max-sm:py-6 p-4 sm:p-6 shadow-sm border border-slate-100 ring-1 ring-black/2">
      <div className="flex items-center justify-between mb-8">
        <div className="max-sm:max-w-40">
          <h3 className="text-lg font-bold text-slate-800">Sales Trend</h3>
          <p className="text-sm text-slate-500">Sales performance over time</p>
        </div>
        <div className="text-left sm:text-right">
          <div className="flex items-center gap-2 sm:justify-end">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
              Total Revenue
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
              <TrendingUp size={12} className="mr-1" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ${totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={30}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              tickMargin={10}
            />
            <Tooltip
              cursor={{
                stroke: "#6366f1",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-slate-900 p-3 shadow-xl ring-1 ring-white/10">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-white">
                        ${(payload[0].value as number).toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="totalSale"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTotal)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "#4f46e5" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
