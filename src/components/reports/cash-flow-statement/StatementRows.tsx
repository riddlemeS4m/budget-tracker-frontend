"use client";

import type { CashFlowSection, CashFlowCategory, CashFlowSubcategory } from "@/lib/hooks/useCashFlowStatement";

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
}

export function SubcategoryRow({ subcategory }: SubcategoryRowProps) {
  return (
    <div className="flex items-baseline justify-between py-0.5 pl-10">
      <span className="text-sm text-gray-700 dark:text-gray-300">{subcategory.name}</span>
      <span className={`text-sm tabular-nums ml-4 shrink-0 ${amountClass(subcategory.total)}`}>
        {formatAmount(subcategory.total)}
      </span>
    </div>
  );
}

interface CategoryRowsProps {
  category: CashFlowCategory;
}

export function CategoryRows({ category }: CategoryRowsProps) {
  return (
    <>
      <div className="flex items-baseline justify-between py-1 pl-4 mt-2">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {category.name}
        </span>
      </div>
      {category.subcategories.map((sub, i) => (
        <SubcategoryRow key={sub.id ?? `sub-${i}`} subcategory={sub} />
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
}

export function StatementBody({
  sections,
  totalRevenues,
  totalExpenses,
  netIncome,
}: StatementBodyProps) {
  const revenues = sections.find((s) => s.type === "income");
  const expenses = sections.find((s) => s.type === "expense");

  return (
    <div className="font-mono text-sm">
      {revenues && (
        <div className="mb-2">
          <SectionHeaderRow label="Revenues" />
          {revenues.categories.map((cat, i) => (
            <CategoryRows key={cat.id ?? `cat-${i}`} category={cat} />
          ))}
          <SectionTotalRow label="Total Revenues" total={totalRevenues} />
        </div>
      )}

      {expenses && (
        <div className="mb-2">
          <SectionHeaderRow label="Expenses" />
          {expenses.categories.map((cat, i) => (
            <CategoryRows key={cat.id ?? `cat-${i}`} category={cat} />
          ))}
          <SectionTotalRow label="Total Expenses" total={totalExpenses} />
        </div>
      )}

      <NetIncomeRow total={netIncome} />
    </div>
  );
}
