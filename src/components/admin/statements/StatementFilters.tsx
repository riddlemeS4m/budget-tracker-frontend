"use client";

import { useEffect, useRef, useState } from "react";
import { useAccounts, type StatementFilters } from "@/lib/hooks";

interface StatementFiltersProps {
  filters: StatementFilters;
  onChange: (filters: StatementFilters) => void;
  resultCount?: number;
}

const DATE_DEBOUNCE_MS = 400;

export default function StatementFiltersBar({ filters, onChange, resultCount }: StatementFiltersProps) {
  const { data: accountsData } = useAccounts();

  const [dateFromInput, setDateFromInput] = useState(filters.date_from ?? "");
  const [dateToInput, setDateToInput] = useState(filters.date_to ?? "");
  const dateFromDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dateToDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDateFromInput(filters.date_from ?? "");
  }, [filters.date_from]);

  useEffect(() => {
    setDateToInput(filters.date_to ?? "");
  }, [filters.date_to]);

  function handleDateFromChange(value: string) {
    setDateFromInput(value);
    if (dateFromDebounceRef.current) clearTimeout(dateFromDebounceRef.current);
    dateFromDebounceRef.current = setTimeout(() => {
      onChange({ ...filters, date_from: value || undefined });
    }, DATE_DEBOUNCE_MS);
  }

  function handleDateToChange(value: string) {
    setDateToInput(value);
    if (dateToDebounceRef.current) clearTimeout(dateToDebounceRef.current);
    dateToDebounceRef.current = setTimeout(() => {
      onChange({ ...filters, date_to: value || undefined });
    }, DATE_DEBOUNCE_MS);
  }

  function handleClear() {
    setDateFromInput("");
    setDateToInput("");
    onChange({});
  }

  const hasActiveFilters = !!filters.account || !!filters.date_from || !!filters.date_to;

  const accounts = accountsData ?? [];

  return (
    <div className="flex flex-col gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Account dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Account
          </label>
          <select
            value={filters.account ?? ""}
            onChange={(e) =>
              onChange({ ...filters, account: e.target.value ? Number(e.target.value) : undefined })
            }
            className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5 min-w-36"
          >
            <option value="">All accounts</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date range */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Date From
          </label>
          <input
            type="date"
            value={dateFromInput}
            onChange={(e) => handleDateFromChange(e.target.value)}
            className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Date To
          </label>
          <input
            type="date"
            value={dateToInput}
            onChange={(e) => handleDateToChange(e.target.value)}
            className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 self-end"
          >
            Clear
          </button>
        )}
      </div>

      {resultCount !== undefined && (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </p>
      )}
    </div>
  );
}
