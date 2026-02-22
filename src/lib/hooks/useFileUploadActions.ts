import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileUploadActionsService } from "../api/services/FileUploadActionsService";
import { fileUploadKeys } from "./useFileUploads";
import { transactionKeys } from "./useTransactions";

export function useProcessFileUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => FileUploadActionsService.processFileUpload(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: fileUploadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}
