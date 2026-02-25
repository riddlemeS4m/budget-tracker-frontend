"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStatements, type StatementFilters } from "@/lib/hooks";
import StatementRow from "@/components/admin/statements/StatementRow";
import StatementFiltersBar from "@/components/admin/statements/StatementFilters";
import SortableHeader from "@/components/admin/transactions/SortableHeader";

const STORAGE_KEY = "stmtFilterState";

function parseFiltersFromParams(params: URLSearchParams): StatementFilters {
  const filters: StatementFilters = {};
  const account = params.get("account");
  if (account) filters.account = Number(account);
  const dateFrom = params.get("date_from");
  if (dateFrom) filters.date_from = dateFrom;
  const dateTo = params.get("date_to");
  if (dateTo) filters.date_to = dateTo;
  return filters;
}

function buildSearchParams(
  filters: StatementFilters,
  sortField: string | null,
  sortDir: "asc" | "desc",
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.account) params.set("account", String(filters.account));
  if (filters.date_from) params.set("date_from", filters.date_from);
  if (filters.date_to) params.set("date_to", filters.date_to);
  if (sortField) {
    params.set("sort", sortField);
    if (sortDir === "desc") params.set("dir", "desc");
  }
  return params;
}

export default function StatementsListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const filters = parseFiltersFromParams(searchParams);
  const sortField = searchParams.get("sort") || null;
  const sortDir: "asc" | "desc" = searchParams.get("dir") === "desc" ? "desc" : "asc";

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (searchParams.toString() === "") {
        try {
          const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
          if (saved) {
            const p = buildSearchParams(
              saved.filters ?? {},
              saved.sortField ?? null,
              saved.sortDir ?? "asc",
            );
            if (p.toString()) {
              router.replace(`/admin/statements?${p.toString()}`, { scroll: false });
              return;
            }
          }
        } catch { /* corrupted storage, ignore */ }
      }
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ filters, sortField, sortDir }));
  });

  function updateUrl(
    newFilters: StatementFilters,
    newSortField: string | null,
    newSortDir: "asc" | "desc",
  ) {
    const params = buildSearchParams(newFilters, newSortField, newSortDir);
    const query = params.toString();
    router.replace(`/admin/statements${query ? `?${query}` : ""}`, { scroll: false });
  }

  function handleFiltersChange(newFilters: StatementFilters) {
    updateUrl(newFilters, sortField, sortDir);
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
    updateUrl(filters, newField, newDir);
  }

  const sort_by = sortField ? `${sortDir === "desc" ? "-" : ""}${sortField}` : undefined;
  const { data, isLoading, isError } = useStatements({ ...filters, sort_by });

  const statements = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Statements</h1>
        <Link
          href="/admin/statements/new"
          className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          Add Statement
        </Link>
      </div>

      <StatementFiltersBar
        filters={filters}
        onChange={handleFiltersChange}
        resultCount={data ? statements.length : undefined}
      />

      {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>}
      {isError && <p className="text-sm text-red-600 dark:text-red-400">Failed to load statements.</p>}

      {data && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <SortableHeader label="ID" field="id" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
              <SortableHeader label="Account" field="account__name" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
              <SortableHeader label="Period Start" field="period_start" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
              <SortableHeader label="Period End" field="period_end" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
              <SortableHeader label="Opening Balance" field="opening_balance" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
              <SortableHeader label="Closing Balance" field="closing_balance" currentField={sortField} currentDir={sortDir} onSort={handleSort} />
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement) => (
              <StatementRow key={statement.id} statement={statement} />
            ))}
          </tbody>
        </table>
      )}

      {statements.length === 0 && !isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">No statements found.</p>
      )}
    </div>
  );
}
