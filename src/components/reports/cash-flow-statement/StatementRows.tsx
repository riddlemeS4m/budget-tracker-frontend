"use client";

import Link from "next/link";
import type { CashFlowSection, CashFlowCategory, CashFlowSubcategory } from "@/lib/hooks/useCashFlowStatement";
import { buildTransactionDrillUrl } from "@/lib/utils/reportLinks";

interface DrillContext {
  dateFrom?: string;
  dateTo?: string;
  accountId?: number;
}

function formatAmount(value: string): string {
  const num = parseFloat(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(num);
}

function amountClass(value: string): string {
  return parseFloat(value) < 0 ? "text-red-600 dark:text-red-400" : "";
}

interface SectionHeaderRowProps {
  label: string;
}

export function SectionHeaderRow({ label }: SectionHeaderRowProps) {
  return (
    <div className="flex items-baseline justify-between py-1 mt-4 first:mt-0">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}

interface SubcategoryRowProps {
  subcategory: CashFlowSubcategory;
  drill?: DrillContext;
}

export function SubcategoryRow({ subcategory, drill }: SubcategoryRowProps) {
  const nameNode =
    subcategory.id && drill ? (
      <Link
        href={buildTransactionDrillUrl({
          locationSubclassification: subcategory.id,
          dateFrom: drill.dateFrom,
          dateTo: drill.dateTo,
          account: drill.accountId,
        })}
        className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
      >
        {subcategory.name}
      </Link>
    ) : (
      subcategory.name
    );
  return (
    <div className="flex items-baseline justify-between py-0.5 pl-10">
      <span className="text-sm text-gray-700 dark:text-gray-300">{nameNode}</span>
      <span className={`text-sm tabular-nums ml-4 shrink-0 ${amountClass(subcategory.total)}`}>
        {formatAmount(subcategory.total)}
      </span>
    </div>
  );
}

interface CategoryRowsProps {
  category: CashFlowCategory;
  drill?: DrillContext;
}

export function CategoryRows({ category, drill }: CategoryRowsProps) {
  const nameNode =
    category.id && drill ? (
      <Link
        href={buildTransactionDrillUrl({
          locationClassification: category.id,
          dateFrom: drill.dateFrom,
          dateTo: drill.dateTo,
          account: drill.accountId,
        })}
        className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
      >
        {category.name}
      </Link>
    ) : (
      category.name
    );
  return (
    <>
      <div className="flex items-baseline justify-between py-1 pl-4 mt-2">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {nameNode}
        </span>
      </div>
      {category.subcategories.map((sub, i) => (
        <SubcategoryRow key={sub.id ?? `sub-${i}`} subcategory={sub} drill={drill} />
      ))}
      <div className="flex items-baseline justify-between py-1 pl-10 border-t border-gray-200 dark:border-gray-700 mt-1">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Total {category.name}
        </span>
        <span className={`text-sm font-semibold tabular-nums ml-4 shrink-0 ${amountClass(category.total)}`}>
          {formatAmount(category.total)}
        </span>
      </div>
    </>
  );
}

interface SectionTotalRowProps {
  label: string;
  total: string;
}

export function SectionTotalRow({ label, total }: SectionTotalRowProps) {
  return (
    <div className="flex items-baseline justify-between py-1.5 pl-4 mt-2 border-t-2 border-gray-300 dark:border-gray-600">
      <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
        {label}
      </span>
      <span className={`text-sm font-bold tabular-nums ml-4 shrink-0 ${amountClass(total)}`}>
        {formatAmount(total)}
      </span>
    </div>
  );
}

interface NetIncomeRowProps {
  total: string;
}

export function NetIncomeRow({ total }: NetIncomeRowProps) {
  return (
    <div className="flex items-baseline justify-between py-2 mt-4 border-t-2 border-b-2 border-gray-900 dark:border-gray-100">
      <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
        Net Income
      </span>
      <span className={`text-sm font-bold tabular-nums ml-4 shrink-0 ${amountClass(total)}`}>
        {formatAmount(total)}
      </span>
    </div>
  );
}

interface StatementBodyProps {
  sections: CashFlowSection[];
  totalRevenues: string;
  totalExpenses: string;
  netIncome: string;
  dateFrom?: string;
  dateTo?: string;
  accountId?: number;
}

export function StatementBody({
  sections,
  totalRevenues,
  totalExpenses,
  netIncome,
  dateFrom,
  dateTo,
  accountId,
}: StatementBodyProps) {
  const revenues = sections.find((s) => s.type === "income");
  const expenses = sections.find((s) => s.type === "expense");
  const drill: DrillContext | undefined =
    dateFrom || dateTo || accountId !== undefined
      ? { dateFrom, dateTo, accountId }
      : undefined;

  return (
    <div className="font-mono text-sm">
      {revenues && (
        <div className="mb-2">
          <SectionHeaderRow label="Revenues" />
          {revenues.categories.map((cat, i) => (
            <CategoryRows key={cat.id ?? `cat-${i}`} category={cat} drill={drill} />
          ))}
          <SectionTotalRow label="Total Revenues" total={totalRevenues} />
        </div>
      )}

      {expenses && (
        <div className="mb-2">
          <SectionHeaderRow label="Expenses" />
          {expenses.categories.map((cat, i) => (
            <CategoryRows key={cat.id ?? `cat-${i}`} category={cat} drill={drill} />
          ))}
          <SectionTotalRow label="Total Expenses" total={totalExpenses} />
        </div>
      )}

      <NetIncomeRow total={netIncome} />
    </div>
  );
}
