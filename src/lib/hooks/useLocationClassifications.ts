import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LocationClassificationsService,
  type LocationClassification,
  type PatchedLocationClassification,
} from "../api";

export const locationClassificationKeys = {
  all: ["location-classifications"] as const,
  lists: () => [...locationClassificationKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...locationClassificationKeys.lists(), filters] as const,
  details: () => [...locationClassificationKeys.all, "detail"] as const,
  detail: (id: number) => [...locationClassificationKeys.details(), id] as const,
};

export function useLocationClassifications() {
  return useQuery({
    queryKey: locationClassificationKeys.lists(),
    queryFn: () => LocationClassificationsService.locationClassificationsList(),
  });
}

export function useLocationClassification(id: number) {
  return useQuery({
    queryKey: locationClassificationKeys.detail(id),
    queryFn: () => LocationClassificationsService.locationClassificationsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreateLocationClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LocationClassification) =>
      LocationClassificationsService.locationClassificationsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationClassificationKeys.lists() });
    },
  });
}

export function useUpdateLocationClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedLocationClassification }) =>
      LocationClassificationsService.locationClassificationsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: locationClassificationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: locationClassificationKeys.lists() });
    },
  });
}

export function useDeleteLocationClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      LocationClassificationsService.locationClassificationsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationClassificationKeys.lists() });
    },
  });
}
