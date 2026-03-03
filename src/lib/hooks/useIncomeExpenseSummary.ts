import { useQuery } from "@tanstack/react-query";
import { ReportsService } from "../api";

export type IncomeExpenseCategory = {
  id: number;
  name: string;
  total: string;
  transaction_count: number;
  percent: string;
};

export type IncomeExpenseUncategorized = {
  total: string;
  transaction_count: number;
  percent: string;
};

export type IncomeExpenseSection = {
  type: "income" | "expense";
  label: string;
  total: string;
  transaction_count: number;
  categories: IncomeExpenseCategory[];
  uncategorized: IncomeExpenseUncategorized;
};

export type IncomeExpenseSummaryData = {
  date_from: string | null;
  date_to: string | null;
  sections: IncomeExpenseSection[];
};

export const incomeExpenseSummaryKeys = {
  all: ["income-expense-summary"] as const,
  summaries: () => [...incomeExpenseSummaryKeys.all, "summary"] as const,
  summary: (filters: { dateFrom?: string; dateTo?: string; accountId?: number }) =>
    [...incomeExpenseSummaryKeys.summaries(), filters] as const,
};

export function useIncomeExpenseSummary(params: {
  dateFrom?: string;
  dateTo?: string;
  accountId?: number;
}) {
  return useQuery({
    queryKey: incomeExpenseSummaryKeys.summary(params),
    queryFn: () =>
      ReportsService.incomeExpenseSummary(
        params.accountId,
        params.dateFrom,
        params.dateTo,
      ) as unknown as Promise<IncomeExpenseSummaryData>,
  });
}
