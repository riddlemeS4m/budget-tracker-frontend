"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTransactions, type TransactionFilters } from "@/lib/hooks";
import TransactionRow from "@/components/admin/transactions/TransactionRow";
import TransactionFiltersBar from "@/components/admin/transactions/TransactionFilters";
import SortableHeader from "@/components/admin/transactions/SortableHeader";
import Pagination from "@/components/core/Pagination";

const PAGE_SIZE = 100;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getInitialFilters(searchParams: URLSearchParams): TransactionFilters {
  const filters: TransactionFilters = {};
  const locationSubclassification = searchParams.get("location_subclassification");
  if (locationSubclassification) filters.location_subclassification = Number(locationSubclassification);
  return filters;
}

export default function TransactionsListPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TransactionFilters>(() => getInitialFilters(searchParams));
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function handleFiltersChange(newFilters: TransactionFilters) {
    setFilters(newFilters);
    setPage(1);
  }

  function handleSort(field: string) {
    if (field === sortField) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
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

      <TransactionFiltersBar filters={filters} onChange={handleFiltersChange} resultCount={data ? totalCount : undefined} />

      {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>}
      {isError && <p className="text-sm text-red-600 dark:text-red-400">Failed to load transactions.</p>}

      {data && (
        <>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
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
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </tbody>
          </table>

          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={setPage}
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
