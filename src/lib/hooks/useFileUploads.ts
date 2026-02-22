import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FileUploadsService,
  type FileUpload,
  type PatchedFileUpload,
} from "../api";
import { transactionKeys } from "./useTransactions";

export const fileUploadKeys = {
  all: ["fileUploads"] as const,
  lists: () => [...fileUploadKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...fileUploadKeys.lists(), filters] as const,
  details: () => [...fileUploadKeys.all, "detail"] as const,
  detail: (id: number) => [...fileUploadKeys.details(), id] as const,
};

export function useFileUploads() {
  return useQuery({
    queryKey: fileUploadKeys.lists(),
    queryFn: () => FileUploadsService.fileUploadsList(),
  });
}

export function useFileUpload(id: number) {
  return useQuery({
    queryKey: fileUploadKeys.detail(id),
    queryFn: () => FileUploadsService.fileUploadsRetrieve(id),
    enabled: !!id,
  });
}

export function useCreateFileUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FileUpload) => FileUploadsService.fileUploadsCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.lists() });
    },
  });
}

export function useUpdateFileUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchedFileUpload }) =>
      FileUploadsService.fileUploadsPartialUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.lists() });
    },
  });
}

export function useDeleteFileUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FileUploadsService.fileUploadsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.lists() });
    },
  });
}

export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, accountId }: { file: File; accountId: number }) =>
      FileUploadsService.uploadFile(file, accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}
