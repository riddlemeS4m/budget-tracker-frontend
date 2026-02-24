import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LocationSubclassificationsService,
  type LocationSubClassification,
  type PatchedLocationSubClassification,
} from "../api";
import { locationClassificationKeys } from "./useLocationClassifications";

export type LocationSubclassificationFilters = {
  location_classification?: number;
  type?: string;
  name?: string;
};

export const locationSubclassificationKeys = {
  all: ["location-subclassifications"] as const,
  lists: () => [...locationSubclassificationKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...locationSubclassificationKeys.lists(), filters] as const,
  details: () => [...locationSubclassificationKeys.all, "detail"] as const,
  detail: (id: number) => [...locationSubclassificationKeys.details(), id] as const,
};

export function useLocationSubclassifications(filters?: LocationSubclassificationFilters) {
  return useQuery({
    queryKey: locationSubclassificationKeys.list(filters),
    queryFn: () =>
      LocationSubclassificationsService.locationSubclassificationsList(
        filters?.location_classification,
        filters?.name,
        filters?.type,
      ),
  });
}

export function useLocationSubclassification(id: number) {
  return useQuery({
    queryKey: locationSubclassificationKeys.detail(id),
    queryFn: () => LocationSubclassificationsService.locationSubclassificationsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreateLocationSubclassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LocationSubClassification) =>
      LocationSubclassificationsService.locationSubclassificationsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationSubclassificationKeys.lists() });
    },
  });
}

export function useUpdateLocationSubclassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedLocationSubClassification }) =>
      LocationSubclassificationsService.locationSubclassificationsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: locationSubclassificationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: locationSubclassificationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: locationClassificationKeys.lists() });
    },
  });
}

export function useDeleteLocationSubclassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      LocationSubclassificationsService.locationSubclassificationsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationSubclassificationKeys.lists() });
    },
  });
}
