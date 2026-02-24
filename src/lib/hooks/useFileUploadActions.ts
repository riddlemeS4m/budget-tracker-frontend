import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileUploadsService, type FileUpload } from "../api";
import { fileUploadKeys } from "./useFileUploads";
import { transactionKeys } from "./useTransactions";

export function useProcessFileUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FileUploadsService.fileUploadsProcess(id, {} as FileUpload),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}
