"use client";

import { useState } from "react";
import Link from "next/link";
import {
  usePayrollReport,
  type PayrollSection,
} from "@/lib/hooks/usePayrollReport";
import { buildTransactionDrillUrl } from "@/lib/utils/reportLinks";

const START_YEAR = 2023;
const START_MONTH = 1;

type MonthOption = {
  label: string;
  year: number;
  month: number;
  dateFrom: string;
  dateTo: string;
};

function buildMonthOptions(): MonthOption[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const options: MonthOption[] = [];

  for (let y = currentYear; y >= START_YEAR; y--) {
    const maxMonth = y === currentYear ? currentMonth : 12;
    const minMonth = y === START_YEAR ? START_MONTH : 1;
    for (let m = maxMonth; m >= minMonth; m--) {
      const dateFrom = `${y}-${String(m).padStart(2, "0")}-01`;
      const lastDay = new Date(y, m, 0).getDate();
      const dateTo = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
      const label = new Date(y, m - 1, 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      options.push({ label, year: y, month: m, dateFrom, dateTo });
    }
  }

  return options;
}

const MONTH_OPTIONS = buildMonthOptions();

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
  dateFrom: string;
  dateTo: string;
}

interface SectionTableProps {
  section: PayrollSection;
  drill: DrillContext;
}

function SectionTable({ section, drill }: SectionTableProps) {
  const hasAnyData =
    section.categories.length > 0 || section.uncategorized.transaction_count > 0;

  function drillLink(cat: { id: number }) {
    if (section.type === "transfers") {
      return buildTransactionDrillUrl({
        account: cat.id,
        locationClassificationType: "transfer",
        dateFrom: drill.dateFrom,
        dateTo: drill.dateTo,
      });
    }
    if (section.type === "payroll_expenses") {
      return buildTransactionDrillUrl({
        accountType: "payroll",
        locationClassification: cat.id,
        dateFrom: drill.dateFrom,
        dateTo: drill.dateTo,
      });
    }
    return buildTransactionDrillUrl({
      excludedAccountType: "payroll",
      locationClassification: cat.id,
      dateFrom: drill.dateFrom,
      dateTo: drill.dateTo,
    });
  }

  function uncategorizedDrillLink() {
    if (section.type === "payroll_expenses") {
      return buildTransactionDrillUrl({
        accountType: "payroll",
        locationClassificationNull: true,
        dateFrom: drill.dateFrom,
        dateTo: drill.dateTo,
      });
    }
    return buildTransactionDrillUrl({
      excludedAccountType: "payroll",
      locationClassificationNull: true,
      dateFrom: drill.dateFrom,
      dateTo: drill.dateTo,
    });
  }

  return (
    <div className="mb-8">
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
        {section.label}
      </h2>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-1.5 pr-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              {section.type === "transfers" ? "Destination Account" : "Location Classification"}
            </th>
            <th className="text-right py-1.5 px-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              Total
            </th>
            <th className="text-right py-1.5 px-4 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              % of Payroll
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
              <td className="py-1.5 pr-4">{cat.name}</td>
              <td className={`py-1.5 px-4 text-right tabular-nums ${amountClass(cat.total)}`}>
                {formatAmount(cat.total)}
              </td>
              <td className="py-1.5 px-4 text-right tabular-nums text-gray-600 dark:text-gray-400">
                {cat.percent}%
              </td>
              <td className="py-1.5 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-400">
                <Link
                  href={drillLink(cat)}
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {formatCount(cat.transaction_count)}
                </Link>
              </td>
            </tr>
          ))}

          {section.type !== "transfers" && section.uncategorized.transaction_count > 0 && (
            <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <td className="py-1.5 pr-4 italic text-gray-500 dark:text-gray-400">
                Uncategorized
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
                <Link
                  href={uncategorizedDrillLink()}
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {formatCount(section.uncategorized.transaction_count)}
                </Link>
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
              {section.categories.reduce(
                (sum, c) => sum + parseFloat(c.percent),
                parseFloat(section.uncategorized.percent),
              ).toFixed(2)}%
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

export default function PayrollReportPage() {
  const monthOptions = MONTH_OPTIONS;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = monthOptions[selectedIdx];

  const { data, isLoading, isError } = usePayrollReport({
    dateFrom: selected.dateFrom,
    dateTo: selected.dateTo,
  });

  const drill: DrillContext = {
    dateFrom: selected.dateFrom,
    dateTo: selected.dateTo,
  };

  const hasSections =
    data &&
    data.sections.some(
      (s) => s.categories.length > 0 || s.uncategorized.transaction_count > 0,
    );

  const netChangeNum = data ? parseFloat(data.net_change) : null;
  const payrollTotalNum = data ? parseFloat(data.payroll_total) : null;
  const netChangePct =
    netChangeNum !== null && payrollTotalNum && payrollTotalNum !== 0
      ? ((netChangeNum / Math.abs(payrollTotalNum)) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Payroll Breakdown</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Where your payroll goes: transfers to savings, deductions, and
          spending across all accounts, as a percentage of gross pay.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 mb-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="month-select"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Month
          </label>
          <select
            id="month-select"
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(Number(e.target.value))}
            className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {monthOptions.map((opt, idx) => (
              <option key={opt.dateFrom} value={idx}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {data && (
          <div className="flex flex-col gap-0.5 self-end pb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
              Total Payroll
            </span>
            <span className="text-lg font-semibold tabular-nums">
              {formatAmount(data.payroll_total)}
            </span>
          </div>
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

      {data && !hasSections && parseFloat(data.payroll_total) === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No payroll transactions found for this period.
        </p>
      )}

      {data && (hasSections || parseFloat(data.payroll_total) !== 0) && (
        <div>
          {data.sections.map((section) => (
            <SectionTable key={section.type} section={section} drill={drill} />
          ))}

          {/* Net Payroll Change row */}
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border-t-2 border-b-2 border-gray-900 dark:border-gray-100">
                <td className="py-2.5 pr-4 font-bold text-gray-900 dark:text-white uppercase tracking-wide text-xs">
                  Net Payroll Change
                </td>
                <td
                  className={`py-2.5 px-4 text-right tabular-nums font-bold ${amountClass(data.net_change)}`}
                >
                  {formatAmount(data.net_change)}
                </td>
                <td className={`py-2.5 px-4 text-right tabular-nums font-bold ${parseFloat(netChangePct) < 0 ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300"}`}>
                  {netChangePct}%
                </td>
                <td className="py-2.5 pl-4 text-right tabular-nums font-bold text-gray-700 dark:text-gray-300">
                  &nbsp;
                </td>
              </tr>
            </tbody>
          </table>

          {netChangeNum !== null && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {netChangeNum >= 0
                ? "You came out ahead this period — more payroll came in than left through tracked categories."
                : "More money left tracked categories than came in as payroll this period."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
