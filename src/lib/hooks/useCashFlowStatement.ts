import { useQuery } from "@tanstack/react-query";
import { ReportsService } from "../api";

export type CashFlowSubcategory = {
  id: number | null;
  name: string;
  total: string;
};

export type CashFlowCategory = {
  id: number | null;
  name: string;
  subcategories: CashFlowSubcategory[];
  total: string;
};

export type CashFlowSection = {
  type: "income" | "expense";
  label: string;
  categories: CashFlowCategory[];
  total: string;
};

export type CashFlowStatementSummaryData = {
  date_from: string | null;
  date_to: string | null;
  sections: CashFlowSection[];
  total_revenues: string;
  total_expenses: string;
  net_income: string;
};

// Monthly variant

export type CashFlowSubcategoryMonthly = {
  id: number | null;
  name: string;
  months: Record<string, string>; // "1" to "12"
  ytd: string;
};

export type CashFlowCategoryMonthly = {
  id: number | null;
  name: string;
  subcategories: CashFlowSubcategoryMonthly[];
  months: Record<string, string>;
  ytd: string;
};

export type CashFlowSectionMonthly = {
  type: "income" | "expense";
  label: string;
  categories: CashFlowCategoryMonthly[];
  months: Record<string, string>;
  ytd: string;
};

export type MonthlyTotals = {
  months: Record<string, string>;
  ytd: string;
};

export type CashFlowStatementMonthlyData = {
  year: number;
  months: string[]; // ["Jan", "Feb", ...]
  sections: CashFlowSectionMonthly[];
  total_revenues: MonthlyTotals;
  total_expenses: MonthlyTotals;
  net_income: MonthlyTotals;
};

export const cashFlowStatementKeys = {
  all: ["cash-flow-statement"] as const,
  summaries: () => [...cashFlowStatementKeys.all, "summary"] as const,
  summary: (filters: { dateFrom?: string; dateTo?: string }) =>
    [...cashFlowStatementKeys.summaries(), filters] as const,
  monthlies: () => [...cashFlowStatementKeys.all, "monthly"] as const,
  monthly: (year: number) => [...cashFlowStatementKeys.monthlies(), year] as const,
};

export function useCashFlowStatementSummary(params: {
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: cashFlowStatementKeys.summary(params),
    queryFn: () =>
      ReportsService.cashFlowStatementSummary(
        params.dateFrom,
        params.dateTo,
      ) as unknown as Promise<CashFlowStatementSummaryData>,
  });
}

export function useCashFlowStatementMonthly(year: number) {
  return useQuery({
    queryKey: cashFlowStatementKeys.monthly(year),
    queryFn: () =>
      ReportsService.cashFlowStatementMonthly(year) as unknown as Promise<CashFlowStatementMonthlyData>,
    enabled: !!year,
  });
}
