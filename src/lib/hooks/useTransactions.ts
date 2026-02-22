import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TransactionsService,
  type TransactionFilters,
  type TransactionWrite,
  type PatchedTransaction,
} from "../api";

export const transactionKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...transactionKeys.lists(), filters] as const,
  details: () => [...transactionKeys.all, "detail"] as const,
  detail: (id: number) => [...transactionKeys.details(), id] as const,
};

export function useTransactions(page: number = 1, pageSize: number = 100, filters?: TransactionFilters) {
  return useQuery({
    queryKey: transactionKeys.list({ page, pageSize, ...filters }),
    queryFn: () => TransactionsService.transactionsList(page, pageSize, filters),
  });
}

export function useTransaction(id: number) {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => TransactionsService.transactionsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransactionWrite) =>
      TransactionsService.transactionsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedTransaction }) =>
      TransactionsService.transactionsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => TransactionsService.transactionsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}
