"use client";

import { useState } from "react";
import Link from "next/link";
import { useIncomeExpenseSummary, type IncomeExpenseSection } from "@/lib/hooks/useIncomeExpenseSummary";
import { useAccounts } from "@/lib/hooks/useAccounts";
import { buildTransactionDrillUrl } from "@/lib/utils/reportLinks";

function formatAmount(value: string): string {
  const num = parseFloat(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(num);
}

function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function amountClass(value: string): string {
  return parseFloat(value) < 0 ? "text-red-600 dark:text-red-400" : "";
}

interface DrillContext {
  dateFrom?: string;
  dateTo?: string;
  accountId?: number;
}

interface SectionTableProps {
  section: IncomeExpenseSection;
  drill: DrillContext;
}

function SectionTable({ section, drill }: SectionTableProps) {
  const hasAnyData =
    section.categories.length > 0 || section.uncategorized.transaction_count > 0;

  return (
    <div className="mb-8">
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
        {section.label}
      </h2>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-1.5 pr-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              Location Classification
            </th>
            <th className="text-right py-1.5 px-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              Total
            </th>
            <th className="text-right py-1.5 px-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              % of Total
            </th>
            <th className="text-right py-1.5 pl-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              Transactions
            </th>
          </tr>
        </thead>
        <tbody>
          {!hasAnyData && (
            <tr>
              <td
                colSpan={4}
                className="py-3 text-sm text-gray-400 dark:text-gray-500 italic"
              >
                No transactions
              </td>
            </tr>
          )}

          {section.categories.map((cat) => (
            <tr
              key={cat.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
            >
              <td className="py-1.5 pr-4">
                <Link
                  href={buildTransactionDrillUrl({
                    locationClassification: cat.id,
                    dateFrom: drill.dateFrom,
                    dateTo: drill.dateTo,
                    account: drill.accountId,
                  })}
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {cat.name}
                </Link>
              </td>
              <td className={`py-1.5 px-4 text-right tabular-nums ${amountClass(cat.total)}`}>
                {formatAmount(cat.total)}
              </td>
              <td className="py-1.5 px-4 text-right tabular-nums text-gray-600 dark:text-gray-400">
                {cat.percent}%
              </td>
              <td className="py-1.5 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-400">
                {formatCount(cat.transaction_count)}
              </td>
            </tr>
          ))}

          {section.uncategorized.transaction_count > 0 && (
            <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <td className="py-1.5 pr-4 italic text-gray-500 dark:text-gray-400">
                <Link
                  href={buildTransactionDrillUrl({
                    locationClassificationNull: true,
                    dateFrom: drill.dateFrom,
                    dateTo: drill.dateTo,
                    account: drill.accountId,
                  })}
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Uncategorized
                </Link>
              </td>
              <td
                className={`py-1.5 px-4 text-right tabular-nums italic ${amountClass(section.uncategorized.total)}`}
              >
                {formatAmount(section.uncategorized.total)}
              </td>
              <td className="py-1.5 px-4 text-right tabular-nums italic text-gray-500 dark:text-gray-400">
                {section.uncategorized.percent}%
              </td>
              <td className="py-1.5 pl-4 text-right tabular-nums italic text-gray-500 dark:text-gray-400">
                {formatCount(section.uncategorized.transaction_count)}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-300 dark:border-gray-600">
            <td className="py-1.5 pr-4 font-bold text-gray-900 dark:text-white uppercase tracking-wide text-xs">
              Total {section.label}
            </td>
            <td
              className={`py-1.5 px-4 text-right tabular-nums font-bold ${amountClass(section.total)}`}
            >
              {formatAmount(section.total)}
            </td>
            <td className="py-1.5 px-4 text-right tabular-nums font-bold text-gray-700 dark:text-gray-300">
              100%
            </td>
            <td className="py-1.5 pl-4 text-right tabular-nums font-bold text-gray-700 dark:text-gray-300">
              {formatCount(section.transaction_count)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function IncomeExpenseSummaryPage() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [accountId, setAccountId] = useState<number | undefined>(undefined);

  const { data: accounts } = useAccounts();

  const { data, isLoading, isError } = useIncomeExpenseSummary({
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    accountId,
  });

  const drill: DrillContext = {
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    accountId,
  };

  const hasSections =
    data &&
    data.sections.some(
      (s) => s.categories.length > 0 || s.uncategorized.transaction_count > 0,
    );

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Income / Expense Summary</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Revenues and expenses grouped by location classification, with totals,
          percentages, and transaction counts for the selected period.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 mb-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="date-from"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            From
          </label>
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="date-to"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            To
          </label>
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="account"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Account
          </label>
          <select
            id="account"
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
        {(dateFrom || dateTo || accountId !== undefined) && (
          <button
            onClick={() => {
              setDateFrom("");
              setDateTo("");
              setAccountId(undefined);
            }}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline self-end pb-2"
          >
            Clear
          </button>
        )}
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      )}

      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load report. Please try again.
        </p>
      )}

      {data && !hasSections && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No transactions found for this period.
        </p>
      )}

      {data && hasSections && (
        <div>
          {data.sections.map((section) => (
            <SectionTable key={section.type} section={section} drill={drill} />
          ))}
        </div>
      )}
    </div>
  );
}
