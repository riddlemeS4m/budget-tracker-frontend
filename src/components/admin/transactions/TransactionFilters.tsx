"use client";

import { useEffect, useRef, useState } from "react";
import { useAccounts, useFileUploads } from "@/lib/hooks";
import type { TransactionFilters } from "@/lib/api";

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onChange: (filters: TransactionFilters) => void;
}

const DESCRIPTION_DEBOUNCE_MS = 300;

export default function TransactionFiltersBar({ filters, onChange }: TransactionFiltersProps) {
  const { data: accountsData } = useAccounts();
  const { data: fileUploadsData } = useFileUploads();

  const [descriptionInput, setDescriptionInput] = useState(filters.description ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDescriptionInput(filters.description ?? "");
  }, [filters.description]);

  function handleDescriptionChange(value: string) {
    setDescriptionInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ ...filters, description: value || undefined });
    }, DESCRIPTION_DEBOUNCE_MS);
  }

  function handleClear() {
    setDescriptionInput("");
    onChange({});
  }

  const hasActiveFilters =
    !!filters.account ||
    !!filters.file_upload ||
    !!filters.transaction_date_from ||
    !!filters.transaction_date_to ||
    !!filters.description;

  const accounts = accountsData ?? [];
  const fileUploads = fileUploadsData ?? [];

  return (
    <div className="flex flex-wrap gap-3 items-end mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
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

      {/* File Upload dropdown */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          File Upload
        </label>
        <select
          value={filters.file_upload ?? ""}
          onChange={(e) =>
            onChange({ ...filters, file_upload: e.target.value ? Number(e.target.value) : undefined })
          }
          className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5 min-w-36"
        >
          <option value="">All uploads</option>
          {fileUploads.map((upload) => (
            <option key={upload.id} value={upload.id}>
              {upload.filename}
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
          value={filters.transaction_date_from ?? ""}
          onChange={(e) =>
            onChange({ ...filters, transaction_date_from: e.target.value || undefined })
          }
          className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Date To
        </label>
        <input
          type="date"
          value={filters.transaction_date_to ?? ""}
          onChange={(e) =>
            onChange({ ...filters, transaction_date_to: e.target.value || undefined })
          }
          className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5"
        />
      </div>

      {/* Description search */}
      <div className="flex flex-col gap-1 flex-1 min-w-48">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Description
        </label>
        <input
          type="text"
          placeholder="Search description…"
          value={descriptionInput}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5"
        />
      </div>

      {/* Clear button */}
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 self-end"
        >
          Clear
        </button>
      )}
    </div>
  );
}
