import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  StatementsService,
  type Statement,
  type PatchedStatement,
} from "../api";

export type StatementFilters = {
  account?: number;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
};

export const statementKeys = {
  all: ["statements"] as const,
  lists: () => [...statementKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...statementKeys.lists(), filters] as const,
  details: () => [...statementKeys.all, "detail"] as const,
  detail: (id: number) => [...statementKeys.details(), id] as const,
};

export function useStatements(filters?: StatementFilters) {
  return useQuery({
    queryKey: statementKeys.list(filters),
    queryFn: () =>
      StatementsService.statementsList(
        filters?.account,
        filters?.date_from,
        filters?.date_to,
        filters?.sort_by,
      ),
  });
}

export function useStatement(id: number) {
  return useQuery({
    queryKey: statementKeys.detail(id),
    queryFn: () => StatementsService.statementsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreateStatement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Statement) => StatementsService.statementsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: statementKeys.lists() });
    },
  });
}

export function useUpdateStatement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedStatement }) =>
      StatementsService.statementsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: statementKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: statementKeys.lists() });
    },
  });
}

export function useDeleteStatement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => StatementsService.statementsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: statementKeys.lists() });
    },
  });
}
