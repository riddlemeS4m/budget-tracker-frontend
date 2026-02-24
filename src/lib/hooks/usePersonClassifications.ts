import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PersonClassificationsService,
  type PersonClassification,
  type PatchedPersonClassification,
} from "../api";

export const personClassificationKeys = {
  all: ["person-classifications"] as const,
  lists: () => [...personClassificationKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...personClassificationKeys.lists(), filters] as const,
  details: () => [...personClassificationKeys.all, "detail"] as const,
  detail: (id: number) => [...personClassificationKeys.details(), id] as const,
};

export function usePersonClassifications() {
  return useQuery({
    queryKey: personClassificationKeys.lists(),
    queryFn: () => PersonClassificationsService.personClassificationsList(),
  });
}

export function usePersonClassification(id: number) {
  return useQuery({
    queryKey: personClassificationKeys.detail(id),
    queryFn: () => PersonClassificationsService.personClassificationsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreatePersonClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PersonClassification) =>
      PersonClassificationsService.personClassificationsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personClassificationKeys.lists() });
    },
  });
}

export function useUpdatePersonClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedPersonClassification }) =>
      PersonClassificationsService.personClassificationsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: personClassificationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: personClassificationKeys.lists() });
    },
  });
}

export function useDeletePersonClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      PersonClassificationsService.personClassificationsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personClassificationKeys.lists() });
    },
  });
}
