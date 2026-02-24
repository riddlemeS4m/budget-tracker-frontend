import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TimeClassificationsService,
  type TimeClassification,
  type PatchedTimeClassification,
} from "../api";

export const timeClassificationKeys = {
  all: ["time-classifications"] as const,
  lists: () => [...timeClassificationKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...timeClassificationKeys.lists(), filters] as const,
  details: () => [...timeClassificationKeys.all, "detail"] as const,
  detail: (id: number) => [...timeClassificationKeys.details(), id] as const,
};

export function useTimeClassifications() {
  return useQuery({
    queryKey: timeClassificationKeys.lists(),
    queryFn: () => TimeClassificationsService.timeClassificationsList(),
  });
}

export function useTimeClassification(id: number) {
  return useQuery({
    queryKey: timeClassificationKeys.detail(id),
    queryFn: () => TimeClassificationsService.timeClassificationsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreateTimeClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TimeClassification) =>
      TimeClassificationsService.timeClassificationsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timeClassificationKeys.lists() });
    },
  });
}

export function useUpdateTimeClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedTimeClassification }) =>
      TimeClassificationsService.timeClassificationsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: timeClassificationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: timeClassificationKeys.lists() });
    },
  });
}

export function useDeleteTimeClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      TimeClassificationsService.timeClassificationsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timeClassificationKeys.lists() });
    },
  });
}
