import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

type ViewMode = "days" | "months" | "years";

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("days");
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to parse "YYYY-MM-DD" as local date to avoid timezone shifts
  const parseDate = (str: string) => {
    if (!str) return new Date();
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const [viewDate, setViewDate] = useState(() => parseDate(value));

  // Sync internal view when external value changes
  useEffect(() => {
    if (value) {
      setViewDate(parseDate(value));
    }
  }, [value]);

  // Reset view mode when closed
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setViewMode("days"), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === "days") {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    } else if (viewMode === "months") {
      setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
    } else if (viewMode === "years") {
      setViewDate(
        new Date(viewDate.getFullYear() - 12, viewDate.getMonth(), 1)
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === "days") {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    } else if (viewMode === "months") {
      setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));
    } else if (viewMode === "years") {
      setViewDate(
        new Date(viewDate.getFullYear() + 12, viewDate.getMonth(), 1)
      );
    }
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

    // Format to YYYY-MM-DD manually to ensure local time consistency
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const d = String(newDate.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${d}`);
    setIsOpen(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(viewDate.getFullYear(), monthIndex, 1);
    setViewDate(newDate);
    setViewMode("days");
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, viewDate.getMonth(), 1);
    setViewDate(newDate);
    setViewMode("days");
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = parseDate(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Render Logic
  const renderCalendarDays = () => {
    const totalDays = daysInMonth(viewDate);
    const startDay = startDayOfMonth(viewDate);
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    // Days
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        i
      );
      const currentYMD = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
      const isSelected = value === currentYMD;

      const today = new Date();
      const isToday =
        today.getDate() === i &&
        today.getMonth() === viewDate.getMonth() &&
        today.getFullYear() === viewDate.getFullYear();

      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(i)}
          className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all duration-200
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200 scale-105"
                        : "hover:bg-slate-100 text-slate-700 hover:text-indigo-600"
                    }
                    ${
                      !isSelected && isToday
                        ? "text-indigo-600 font-bold bg-indigo-50 ring-1 ring-indigo-200"
                        : ""
                    }
                `}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const renderMonths = () => (
    <div className="grid grid-cols-3 gap-2 py-2">
      {monthNames.map((name, index) => (
        <button
          key={name}
          onClick={() => handleMonthSelect(index)}
          className={`p-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        viewDate.getMonth() === index
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-slate-100 text-slate-700 hover:text-indigo-600"
                      }`}
        >
          {name.slice(0, 3)}
        </button>
      ))}
    </div>
  );

  const renderYears = () => {
    const currentYear = viewDate.getFullYear();
    // Center the range roughly around current year, 12 years grid
    const startYear = currentYear - 6;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return (
      <div className="grid grid-cols-3 gap-2 py-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearSelect(year)}
            className={`p-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          viewDate.getFullYear() === year
                            ? "bg-indigo-600 text-white shadow-md"
                            : "hover:bg-slate-100 text-slate-700 hover:text-indigo-600"
                        }`}
          >
            {year}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative group w-full" ref={containerRef}>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full pl-10 pr-9 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium cursor-pointer flex items-center transition-all shadow-sm select-none
                ${
                  isOpen
                    ? "ring-2 ring-indigo-500/20 border-indigo-500 bg-white"
                    : "border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                }
            `}
        >
          <CalendarIcon
            className={`absolute left-3 top-2.5 transition-colors ${
              isOpen ? "text-indigo-500" : "text-slate-400"
            }`}
            size={18}
          />
          <span
            className={`truncate ${
              value ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {value ? formatDateDisplay(value) : "Select date"}
          </span>
          {value && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute right-3 top-2.5 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={14} />
            </div>
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-200/60 p-4 w-72 animate-in fade-in zoom-in-95 duration-200 slide-in-from-top-2">
            {/* Header with Navigation and View Toggles */}
            <div className="flex items-center justify-between mb-4 px-1">
              <button
                onClick={handlePrev}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode("months")}
                  className={`px-2 py-1 rounded-md text-sm font-bold transition-colors
                                ${
                                  viewMode === "months"
                                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                                    : "text-slate-800 hover:bg-slate-100"
                                }`}
                >
                  {monthNames[viewDate.getMonth()]}
                </button>
                <button
                  onClick={() => setViewMode("years")}
                  className={`px-2 py-1 rounded-md text-sm font-bold transition-colors
                                ${
                                  viewMode === "years"
                                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                                    : "text-slate-800 hover:bg-slate-100"
                                }`}
                >
                  {viewDate.getFullYear()}
                </button>
              </div>

              <button
                onClick={handleNext}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* View Content */}
            <div className="min-h-[220px]">
              {viewMode === "days" && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="h-8 w-8 flex items-center justify-center text-[11px] font-bold text-slate-400 uppercase"
                      >
                        {day}
                      </div>
                    ))}
                    {renderCalendarDays()}
                  </div>
                </>
              )}
              {viewMode === "months" && renderMonths()}
              {viewMode === "years" && renderYears()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
