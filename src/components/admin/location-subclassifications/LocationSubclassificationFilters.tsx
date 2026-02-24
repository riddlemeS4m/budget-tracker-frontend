"use client";

import { useEffect, useRef, useState } from "react";
import { useLocationClassifications, type LocationSubclassificationFilters } from "@/lib/hooks";

interface LocationSubclassificationFiltersProps {
  filters: LocationSubclassificationFilters;
  onChange: (filters: LocationSubclassificationFilters) => void;
}

const NAME_DEBOUNCE_MS = 300;

const TYPE_OPTIONS = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
  { value: "transfer", label: "Transfer" },
];

export default function LocationSubclassificationFiltersBar({
  filters,
  onChange,
}: LocationSubclassificationFiltersProps) {
  const { data: locationClassificationsData } = useLocationClassifications();

  const [nameInput, setNameInput] = useState(filters.name ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNameInput(filters.name ?? "");
  }, [filters.name]);

  function handleNameChange(value: string) {
    setNameInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ ...filters, name: value || undefined });
    }, NAME_DEBOUNCE_MS);
  }

  function handleClear() {
    setNameInput("");
    onChange({});
  }

  const hasActiveFilters =
    !!filters.location_classification || !!filters.type || !!filters.name;

  const locationClassifications = locationClassificationsData ?? [];

  return (
    <div className="flex flex-col gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Location Classification dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Location Classification
          </label>
          <select
            value={filters.location_classification ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                location_classification: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5 min-w-48"
          >
            <option value="">All classifications</option>
            {locationClassifications.map((lc) => (
              <option key={lc.id} value={lc.id}>
                {lc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Type
          </label>
          <select
            value={filters.type ?? ""}
            onChange={(e) =>
              onChange({ ...filters, type: e.target.value || undefined })
            }
            className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5 min-w-36"
          >
            <option value="">All types</option>
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Name search */}
        <div className="flex flex-col gap-1 flex-1 min-w-48">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            placeholder="Search name…"
            value={nameInput}
            onChange={(e) => handleNameChange(e.target.value)}
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
    </div>
  );
}
