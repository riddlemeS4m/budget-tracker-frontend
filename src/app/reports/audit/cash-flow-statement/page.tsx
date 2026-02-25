"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useCashFlowStatementMonthly,
  type CashFlowSectionMonthly,
  type CashFlowCategoryMonthly,
  type CashFlowSubcategoryMonthly,
  type MonthlyTotals,
} from "@/lib/hooks/useCashFlowStatement";
import { buildTransactionDrillUrl } from "@/lib/utils/reportLinks";

function fmt(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function amountCls(value: string): string {
  return parseFloat(value) < 0 ? "text-red-600 dark:text-red-400" : "";
}

// Column count = 12 months + 1 YTD
const MONTH_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function SectionHeaderRow({ label }: { label: string }) {
  return (
    <tr>
      <td
        colSpan={14}
        className="sticky left-0 z-10 bg-white dark:bg-gray-950 px-4 pt-6 pb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
      >
        {label}
      </td>
    </tr>
  );
}

function CategoryHeaderRow({
  name,
  id,
  year,
}: {
  name: string;
  id: number | null;
  year: number;
}) {
  const label = id ? (
    <Link
      href={buildTransactionDrillUrl({
        locationClassification: id,
        dateFrom: `${year}-01-01`,
        dateTo: `${year}-12-31`,
      })}
      className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
    >
      {name}
    </Link>
  ) : (
    name
  );
  return (
    <tr>
      <td
        colSpan={14}
        className="sticky left-0 z-10 bg-white dark:bg-gray-950 pl-6 pr-4 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200"
      >
        {label}
      </td>
    </tr>
  );
}

function SubcategoryRow({
  sub,
  year,
}: {
  sub: CashFlowSubcategoryMonthly;
  year: number;
}) {
  const label = sub.id ? (
    <Link
      href={buildTransactionDrillUrl({
        locationSubclassification: sub.id,
        dateFrom: `${year}-01-01`,
        dateTo: `${year}-12-31`,
      })}
      className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
    >
      {sub.name}
    </Link>
  ) : (
    sub.name
  );
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
      <td className="sticky left-0 z-10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 pl-10 pr-4 py-1 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[180px]">
        {label}
      </td>
      {MONTH_KEYS.map((m) => (
        <td
          key={m}
          className={`px-3 py-1 text-right text-sm tabular-nums whitespace-nowrap ${amountCls(sub.months[m] ?? "0")}`}
        >
          {fmt(sub.months[m] ?? "0")}
        </td>
      ))}
      <td className={`px-3 py-1 text-right text-sm font-medium tabular-nums whitespace-nowrap border-l border-gray-200 dark:border-gray-700 ${amountCls(sub.ytd)}`}>
        {fmt(sub.ytd)}
      </td>
    </tr>
  );
}

function CategoryTotalRow({
  category,
  months,
}: {
  category: CashFlowCategoryMonthly;
  months: string[];
}) {
  return (
    <tr className="border-t border-gray-200 dark:border-gray-700">
      <td className="sticky left-0 z-10 bg-white dark:bg-gray-950 pl-10 pr-4 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
        Total {category.name}
      </td>
      {MONTH_KEYS.map((m) => (
        <td
          key={m}
          className={`px-3 py-1.5 text-right text-sm font-semibold tabular-nums whitespace-nowrap ${amountCls(category.months[m] ?? "0")}`}
        >
          {fmt(category.months[m] ?? "0")}
        </td>
      ))}
      <td className={`px-3 py-1.5 text-right text-sm font-semibold tabular-nums whitespace-nowrap border-l border-gray-200 dark:border-gray-700 ${amountCls(category.ytd)}`}>
        {fmt(category.ytd)}
      </td>
    </tr>
  );
}

function SectionTotalRow({
  label,
  totals,
}: {
  label: string;
  totals: { months: Record<string, string>; ytd: string };
}) {
  return (
    <tr className="border-t-2 border-gray-400 dark:border-gray-500">
      <td className="sticky left-0 z-10 bg-white dark:bg-gray-950 pl-6 pr-4 py-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide whitespace-nowrap">
        {label}
      </td>
      {MONTH_KEYS.map((m) => (
        <td
          key={m}
          className={`px-3 py-2 text-right text-sm font-bold tabular-nums whitespace-nowrap ${amountCls(totals.months[m] ?? "0")}`}
        >
          {fmt(totals.months[m] ?? "0")}
        </td>
      ))}
      <td className={`px-3 py-2 text-right text-sm font-bold tabular-nums whitespace-nowrap border-l border-gray-200 dark:border-gray-700 ${amountCls(totals.ytd)}`}>
        {fmt(totals.ytd)}
      </td>
    </tr>
  );
}

function NetIncomeRow({ totals }: { totals: MonthlyTotals }) {
  return (
    <tr className="border-t-2 border-b-2 border-gray-900 dark:border-gray-100">
      <td className="sticky left-0 z-10 bg-white dark:bg-gray-950 pl-6 pr-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide whitespace-nowrap">
        Net Income
      </td>
      {MONTH_KEYS.map((m) => (
        <td
          key={m}
          className={`px-3 py-2.5 text-right text-sm font-bold tabular-nums whitespace-nowrap ${amountCls(totals.months[m] ?? "0")}`}
        >
          {fmt(totals.months[m] ?? "0")}
        </td>
      ))}
      <td className={`px-3 py-2.5 text-right text-sm font-bold tabular-nums whitespace-nowrap border-l border-gray-200 dark:border-gray-700 ${amountCls(totals.ytd)}`}>
        {fmt(totals.ytd)}
      </td>
    </tr>
  );
}

function SectionRows({
  section,
  months,
  sectionTotals,
  year,
}: {
  section: CashFlowSectionMonthly;
  months: string[];
  sectionTotals: { months: Record<string, string>; ytd: string };
  year: number;
}) {
  return (
    <>
      <SectionHeaderRow label={section.label} />
      {section.categories.map((cat, ci) => (
        <React.Fragment key={`cat-${cat.id ?? ci}`}>
          <CategoryHeaderRow name={cat.name} id={cat.id} year={year} />
          {cat.subcategories.map((sub, si) => (
            <SubcategoryRow
              key={`sub-${sub.id ?? si}`}
              sub={sub}
              year={year}
            />
          ))}
          <CategoryTotalRow category={cat} months={months} />
        </React.Fragment>
      ))}
      <SectionTotalRow
        label={`Total ${section.label}`}
        totals={sectionTotals}
      />
    </>
  );
}

export default function AuditCashFlowStatementPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isLoading, isError } = useCashFlowStatementMonthly(year);

  const yearOptions = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => currentYear - i,
  );

  const revenues = data?.sections.find((s) => s.type === "income");
  const expenses = data?.sections.find((s) => s.type === "expense");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold mb-1">Cash Flow Statement</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Full 12-month breakdown with year-to-date totals.
          </p>
        </div>

        {/* Year selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="year-select" className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
      {data && data.sections.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No classified transactions found for {year}.
        </p>
      )}

      {/* Scrollable table */}
      {data && data.sections.length > 0 && (
        <div className="overflow-x-auto overflow-y-auto flex-1 border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-max w-full border-collapse text-sm">
            {/* Column headers */}
            <thead className="sticky top-0 z-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="sticky left-0 z-30 bg-white dark:bg-gray-950 px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap min-w-[180px]">
                  &nbsp;
                </th>
                {data.months.map((m) => (
                  <th
                    key={m}
                    className="px-3 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap"
                  >
                    {m}
                  </th>
                ))}
                <th className="px-3 py-3 text-right text-xs font-semibold text-gray-900 dark:text-white whitespace-nowrap border-l border-gray-200 dark:border-gray-700">
                  YTD
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-950">
              {revenues && (
                <SectionRows
                  section={revenues}
                  months={data.months}
                  sectionTotals={data.total_revenues}
                  year={year}
                />
              )}
              {expenses && (
                <SectionRows
                  section={expenses}
                  months={data.months}
                  sectionTotals={data.total_expenses}
                  year={year}
                />
              )}
              <NetIncomeRow totals={data.net_income} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
