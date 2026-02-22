"use client";

import Link from "next/link";
import { useTransactions } from "@/lib/hooks";
import TransactionRow from "@/components/admin/transactions/TransactionRow";
import type { Transaction } from "@/lib/api";

export default function TransactionsListPage() {
  const { data, isLoading, isError } = useTransactions();

  const transactions = Array.isArray(data)
    ? (data as Transaction[])
    : data
    ? [data as Transaction]
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Transactions</h1>
        <Link
          href="/admin/transactions/new"
          className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          Add Transaction
        </Link>
      </div>

      {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>}
      {isError && <p className="text-sm text-red-600 dark:text-red-400">Failed to load transactions.</p>}

      {data && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Updated</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}
          </tbody>
        </table>
      )}

      {transactions.length === 0 && !isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">No transactions found.</p>
      )}
    </div>
  );
}
