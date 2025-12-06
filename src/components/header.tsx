import { LayoutDashboard } from "lucide-react";
import logo from "/main-logo.svg";
export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-linear-to-br from-slate-500 to-violet-600 text-white p-2 rounded-xl shadow-md shadow-indigo-200">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <img
                src={logo}
                alt="AutoBizz Logo"
                className="bg-linear-to-br from-slate-500 to-violet-600 p-2 rounded-xl h-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold">Live Connection</span>
            </div>
            <div className="h-9 w-9 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600 shadow-sm">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
