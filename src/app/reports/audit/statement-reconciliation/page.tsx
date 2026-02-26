"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useStatementReconciliation,
  type ReconciliationRow,
  type ReconciliationSummary,
} from "@/lib/hooks/useStatementReconciliation";
import { useAccounts } from "@/lib/hooks/useAccounts";

function fmt(value: string | null | undefined): string {
  if (value === null || value === undefined) return "—";
  const num = parseFloat(value);
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

function amountCls(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  return parseFloat(value) < 0 ? "text-red-600 dark:text-red-400" : "";
}

function discrepancyCls(row: ReconciliationRow): string {
  if (row.discrepancy === null) return "text-amber-600 dark:text-amber-400";
  return parseFloat(row.discrepancy) === 0
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
}

function discrepancyDisplay(row: ReconciliationRow): string {
  if (row.discrepancy === null) return "N/A";
  return fmt(row.discrepancy);
}

function formatPeriod(start: string | null, end: string): string {
  if (start) return `${start} – ${end}`;
  return end;
}

function buildDrillUrl(row: ReconciliationRow): string {
  const sp = new URLSearchParams();
  sp.set("account", String(row.account_id));
  if (row.period_start) sp.set("transaction_date_from", row.period_start);
  sp.set("transaction_date_to", row.period_end);
  return `/admin/transactions?${sp.toString()}`;
}

function SummaryFooter({ summary }: { summary: ReconciliationSummary }) {
  return (
    <tr className="border-t-2 border-gray-900 dark:border-gray-100">
      <td
        colSpan={6}
        className="sticky left-0 z-10 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide whitespace-nowrap"
      >
        {summary.total_statements} statements — {summary.reconciled_count}{" "}
        reconciled, {summary.unreconciled_count} unreconciled
      </td>
      <td className="px-3 py-2.5 text-right text-sm font-bold tabular-nums whitespace-nowrap text-gray-500 dark:text-gray-400">
        &nbsp;
      </td>
      <td
        className={`px-3 py-2.5 text-right text-sm font-bold tabular-nums whitespace-nowrap ${amountCls(summary.total_discrepancy)}`}
      >
        {fmt(summary.total_discrepancy)}
      </td>
    </tr>
  );
}

function ReconciliationTableRow({ row }: { row: ReconciliationRow }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
      {/* Account */}
      <td className="sticky left-0 z-10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[160px]">
        {row.account_name}
      </td>
      {/* Period */}
      <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
        <Link
          href={buildDrillUrl(row)}
          className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
        >
          {formatPeriod(row.period_start, row.period_end)}
        </Link>
      </td>
      {/* Opening balance */}
      <td
        className={`px-3 py-2 text-right text-sm tabular-nums whitespace-nowrap ${amountCls(row.opening_balance)}`}
      >
        {fmt(row.opening_balance)}
      </td>
      {/* Closing balance */}
      <td
        className={`px-3 py-2 text-right text-sm tabular-nums whitespace-nowrap ${amountCls(row.closing_balance)}`}
      >
        {fmt(row.closing_balance)}
      </td>
      {/* Expected change */}
      <td
        className={`px-3 py-2 text-right text-sm tabular-nums whitespace-nowrap ${amountCls(row.expected_change)}`}
      >
        {fmt(row.expected_change)}
      </td>
      {/* Transaction sum */}
      <td
        className={`px-3 py-2 text-right text-sm tabular-nums whitespace-nowrap ${amountCls(row.transaction_sum)}`}
      >
        {fmt(row.transaction_sum)}
      </td>
      {/* Txn count */}
      <td className="px-3 py-2 text-right text-sm tabular-nums whitespace-nowrap text-gray-500 dark:text-gray-400">
        {row.transaction_count}
      </td>
      {/* Discrepancy */}
      <td
        className={`px-3 py-2 text-right text-sm font-medium tabular-nums whitespace-nowrap ${discrepancyCls(row)}`}
      >
        {discrepancyDisplay(row)}
      </td>
    </tr>
  );
}

export default function StatementReconciliationPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number | undefined>(currentYear);
  const [accountId, setAccountId] = useState<number | undefined>(undefined);

  const { data: accounts } = useAccounts();
  const { data, isLoading, isError } = useStatementReconciliation({
    account: accountId,
    year,
  });

  const yearOptions = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => currentYear - i,
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-1">Statement Reconciliation</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          For each statement, compares the expected balance change against the
          sum of its transactions. Surfaces import gaps or sign convention
          issues.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="year-select"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Year
          </label>
          <select
            id="year-select"
            value={year ?? ""}
            onChange={(e) =>
              setYear(e.target.value ? Number(e.target.value) : undefined)
            }
            className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All years</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="account-select"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Account
          </label>
          <select
            id="account-select"
            value={accountId ?? ""}
            onChange={(e) =>
              setAccountId(e.target.value ? Number(e.target.value) : undefined)
            }
            className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All accounts</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status messages */}
      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      )}
      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load report. Please try again.
        </p>
      )}
      {data && data.rows.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No statements found for the selected filters.
        </p>
      )}

      {/* Table */}
      {data && data.rows.length > 0 && (
        <div className="overflow-x-auto overflow-y-auto flex-1 border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-max w-full border-collapse text-sm">
            <thead className="sticky top-0 z-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="sticky left-0 z-30 bg-white dark:bg-gray-950 px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap min-w-[160px]">
                  Account
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Period
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Opening Bal
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Closing Bal
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Expected Change
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Txn Sum
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  # Txns
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  Discrepancy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-950">
              {data.rows.map((row) => (
                <ReconciliationTableRow
                  key={row.statement_id}
                  row={row}
                />
              ))}
              <SummaryFooter summary={data.summary} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
