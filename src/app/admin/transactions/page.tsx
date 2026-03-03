"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransactions, type TransactionFilters } from "@/lib/hooks";
import TransactionRow from "@/components/admin/transactions/TransactionRow";
import TransactionFiltersBar from "@/components/admin/transactions/TransactionFilters";
import SortableHeader from "@/components/admin/transactions/SortableHeader";
import BatchUpdateBar from "@/components/admin/transactions/BatchUpdateBar";
import Pagination from "@/components/core/Pagination";

const PAGE_SIZE = 100;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const NUMERIC_FILTER_KEYS: (keyof TransactionFilters)[] = [
  "account",
  "file_upload",
  "location_classification",
  "location_subclassification",
  "person_classification",
  "time_classification",
];

const STRING_FILTER_KEYS: (keyof TransactionFilters)[] = [
  "description",
  "transaction_date_from",
  "transaction_date_to",
  "location_classification_null",
];

function parseFiltersFromParams(params: URLSearchParams): TransactionFilters {
  const filters: TransactionFilters = {};
  for (const key of NUMERIC_FILTER_KEYS) {
    const val = params.get(key);
    if (val) (filters[key] as number) = Number(val);
  }
  for (const key of STRING_FILTER_KEYS) {
    const val = params.get(key);
    if (val) (filters[key] as string) = val;
  }
  return filters;
}

function buildSearchParams(
  filters: TransactionFilters,
  page: number,
  sortField: string | null,
  sortDir: "asc" | "desc",
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "" && key !== "sort_by") {
      params.set(key, String(value));
    }
  }
  if (page > 1) params.set("page", String(page));
  if (sortField) {
    params.set("sort", sortField);
    if (sortDir === "desc") params.set("dir", "desc");
  }
  return params;
}

const STORAGE_KEY = "txFilterState";

export default function TransactionsListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const filters = parseFiltersFromParams(searchParams);
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const sortField = searchParams.get("sort") || null;
  const sortDir: "asc" | "desc" = searchParams.get("dir") === "desc" ? "desc" : "asc";

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // Clear selection whenever page, filters, or sort changes
  const filterKey = searchParams.toString();
  const prevFilterKey = useRef(filterKey);
  if (prevFilterKey.current !== filterKey) {
    prevFilterKey.current = filterKey;
    if (selectedIds.size > 0) {
      setSelectedIds(new Set());
    }
  }

  function updateUrl(
    newFilters: TransactionFilters,
    newPage: number,
    newSortField: string | null,
    newSortDir: "asc" | "desc",
  ) {
    const params = buildSearchParams(newFilters, newPage, newSortField, newSortDir);
    const query = params.toString();
    router.replace(`/admin/transactions${query ? `?${query}` : ""}`, { scroll: false });
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (searchParams.toString() === "") {
        try {
          const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
          if (saved) {
            const p = buildSearchParams(
              saved.filters ?? {},
              saved.page ?? 1,
              saved.sortField ?? null,
              saved.sortDir ?? "asc",
            );
            if (p.toString()) {
              router.replace(`/admin/transactions?${p.toString()}`, { scroll: false });
              return;
            }
          }
        } catch { /* corrupted storage, ignore */ }
      }
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ filters, page, sortField, sortDir }));
  });

  function handleFiltersChange(newFilters: TransactionFilters) {
    updateUrl(newFilters, 1, sortField, sortDir);
  }

  function handleSort(field: string) {
    let newField: string | null = field;
    let newDir: "asc" | "desc" = "asc";
    if (field === sortField) {
      if (sortDir === "asc") {
        newDir = "desc";
      } else {
        newField = null;
      }
    }
    updateUrl(filters, 1, newField, newDir);
  }

  function handleExportCsv() {
    const sort_by = sortField ? `${sortDir === "desc" ? "-" : ""}${sortField}` : undefined;
    const params = new URLSearchParams();
    const activeFilters: Record<string, string | number | undefined> = { ...filters, sort_by };
    for (const [key, value] of Object.entries(activeFilters)) {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    }
    const query = params.toString();
    window.open(`${API_BASE}/api/v1/transactions/export/${query ? `?${query}` : ""}`, "_blank");
  }

  const sort_by = sortField ? `${sortDir === "desc" ? "-" : ""}${sortField}` : undefined;
  const { data, isLoading, isError } = useTransactions(page, PAGE_SIZE, { ...filters, sort_by });

  const transactions = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;
  const totalCount = data?.count ?? 0;

  const allPageSelected =
    transactions.length > 0 && transactions.every((tx) => selectedIds.has(tx.id));
  const somePageSelected =
    transactions.some((tx) => selectedIds.has(tx.id)) && !allPageSelected;

  function handleSelectAll() {
    if (allPageSelected) {
      // Deselect all on this page
      setSelectedIds((prev) => {
        const next = new Set(prev);
        transactions.forEach((tx) => next.delete(tx.id));
        return next;
      });
    } else {
      // Select all on this page
      setSelectedIds((prev) => {
        const next = new Set(prev);
        transactions.forEach((tx) => next.add(tx.id));
        return next;
      });
    }
  }

  function handleToggleRow(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Transactions</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Export CSV
          </button>
          <Link
            href="/admin/transactions/new"
            className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            Add Transaction
          </Link>
        </div>
      </div>

      {selectedIds.size > 0 ? (
        <BatchUpdateBar selectedIds={selectedIds} onClear={clearSelection} />
      ) : (
        <TransactionFiltersBar filters={filters} onChange={handleFiltersChange} resultCount={data ? totalCount : undefined} />
      )}

      {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>}
      {isError && <p className="text-sm text-red-600 dark:text-red-400">Failed to load transactions.</p>}

      {data && (
        <>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 py-2 align-middle">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = somePageSelected;
                    }}
                    onChange={handleSelectAll}
                    className="h-3.5 w-3.5 rounded border-gray-300 dark:border-gray-600 accent-gray-700 dark:accent-gray-400 cursor-pointer"
                    aria-label="Select all transactions on this page"
                  />
                </th>
                <SortableHeader label="ID" field="id" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Account" field="account__name" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Transaction Date" field="transaction_date" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Description" field="description" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Amount" field="amount" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Category" field="category" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Subcategory" field="subcategory" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
                <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <TransactionRow
                  key={tx.id}
                  transaction={tx}
                  selected={selectedIds.has(tx.id)}
                  onToggle={handleToggleRow}
                />
              ))}
            </tbody>
          </table>

          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={(p) => updateUrl(filters, p, sortField, sortDir)}
            noun="transactions"
          />
        </>
      )}

      {transactions.length === 0 && !isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">No transactions found.</p>
      )}
    </div>
  );
}
