import { useQuery } from "@tanstack/react-query";
import { ReportsService } from "../api";

export type ReconciliationRow = {
  statement_id: number;
  account_id: number;
  account_name: string;
  period_start: string | null;
  period_end: string;
  opening_balance: string | null;
  closing_balance: string;
  expected_change: string | null;
  transaction_sum: string;
  transaction_count: number;
  discrepancy: string | null;
  is_reconciled: boolean;
};

export type ReconciliationSummary = {
  total_statements: number;
  reconciled_count: number;
  unreconciled_count: number;
  total_discrepancy: string;
};

export type ReconciliationData = {
  rows: ReconciliationRow[];
  summary: ReconciliationSummary;
};

export const statementReconciliationKeys = {
  all: ["statement-reconciliation"] as const,
  lists: () => [...statementReconciliationKeys.all, "list"] as const,
  list: (filters: { account?: number; year?: number }) =>
    [...statementReconciliationKeys.lists(), filters] as const,
};

export function useStatementReconciliation(params: {
  account?: number;
  year?: number;
}) {
  return useQuery({
    queryKey: statementReconciliationKeys.list(params),
    queryFn: () =>
      ReportsService.statementReconciliationList(
        params.account,
        params.year,
      ) as unknown as Promise<ReconciliationData>,
  });
}
