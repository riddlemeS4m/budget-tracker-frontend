import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AccountsService,
  type Account,
  type PatchedAccount,
} from "../api";

export const accountKeys = {
  all: ["accounts"] as const,
  lists: () => [...accountKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...accountKeys.lists(), filters] as const,
  details: () => [...accountKeys.all, "detail"] as const,
  detail: (id: number) => [...accountKeys.details(), id] as const,
};

export function useAccounts() {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: () => AccountsService.accountsList(),
  });
}

export function useAccount(id: number) {
  return useQuery({
    queryKey: accountKeys.detail(id),
    queryFn: () => AccountsService.accountsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Account) => AccountsService.accountsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedAccount }) =>
      AccountsService.accountsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: accountKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => AccountsService.accountsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
    },
  });
}
