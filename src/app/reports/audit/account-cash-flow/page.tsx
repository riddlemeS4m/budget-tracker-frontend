"use client";

import { useState } from "react";
import { useCashFlowStatementSummary } from "@/lib/hooks/useCashFlowStatement";
import { useAccounts } from "@/lib/hooks/useAccounts";
import { StatementBody } from "@/components/reports/cash-flow-statement/StatementRows";

export default function AuditAccountCashFlowPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [accountId, setAccountId] = useState<number | undefined>(undefined);

  const { data: accounts } = useAccounts();

  const { data, isLoading, isError } = useCashFlowStatementSummary({
    dateFrom: `${year}-01-01`,
    dateTo: `${year}-12-31`,
    accountId,
  });

  const yearOptions = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => currentYear - i,
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Account Cash Flow</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Revenues and expenses for a single account and calendar year, grouped by category.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 mb-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="year-select"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Year
          </label>
          <select
            id="year-select"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
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

        {accountId !== undefined && (
          <button
            onClick={() => setAccountId(undefined)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline self-end pb-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Statement body */}
      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      )}

      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load report. Please try again.
        </p>
      )}

      {data && data.sections.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No classified transactions found for {year}.
        </p>
      )}

      {data && data.sections.length > 0 && (
        <StatementBody
          sections={data.sections}
          totalRevenues={data.total_revenues}
          totalExpenses={data.total_expenses}
          netIncome={data.net_income}
        />
      )}
    </div>
  );
}
