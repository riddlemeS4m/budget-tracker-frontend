"use client";

import { useRouter } from "next/navigation";
import { useCreateFileUpload } from "@/lib/hooks";
import FileUploadForm from "@/components/admin/file-uploads/FileUploadForm";
import type { FileUpload } from "@/lib/api";

type FileUploadFormData = Omit<FileUpload, "id" | "created_at" | "updated_at">;

export default function NewFileUploadPage() {
  const router = useRouter();
  const createFileUpload = useCreateFileUpload();

  async function handleSubmit(data: FileUploadFormData) {
    await createFileUpload.mutateAsync(data as FileUpload);
    router.push("/admin/file-uploads");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New File Upload</h1>
      <FileUploadForm onSubmit={handleSubmit} />
    </div>
  );
}
