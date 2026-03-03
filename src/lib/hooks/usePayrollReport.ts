import { useQuery } from "@tanstack/react-query";
import { ReportsService } from "../api";

export type PayrollCategory = {
  id: number;
  name: string;
  total: string;
  transaction_count: number;
  percent: string;
};

export type PayrollUncategorized = {
  total: string;
  transaction_count: number;
  percent: string;
};

export type PayrollSection = {
  type: "transfers" | "payroll_expenses" | "other_expenses";
  label: string;
  total: string;
  transaction_count: number;
  categories: PayrollCategory[];
  uncategorized: PayrollUncategorized;
};

export type PayrollReportData = {
  date_from: string | null;
  date_to: string | null;
  payroll_total: string;
  net_change: string;
  sections: PayrollSection[];
};

export const payrollReportKeys = {
  all: ["payroll-report"] as const,
  summaries: () => [...payrollReportKeys.all, "summary"] as const,
  summary: (filters: { dateFrom?: string; dateTo?: string }) =>
    [...payrollReportKeys.summaries(), filters] as const,
};

export function usePayrollReport(params: {
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: payrollReportKeys.summary(params),
    queryFn: () =>
      ReportsService.payrollSummary(
        params.dateFrom,
        params.dateTo,
      ) as unknown as Promise<PayrollReportData>,
    enabled: !!(params.dateFrom && params.dateTo),
  });
}
