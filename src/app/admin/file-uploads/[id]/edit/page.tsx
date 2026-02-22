"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useFileUpload, useUpdateFileUpload } from "@/lib/hooks";
import FileUploadForm from "@/components/admin/file-uploads/FileUploadForm";
import type { FileUpload } from "@/lib/api";

type FileUploadFormData = Omit<FileUpload, "id" | "created_at" | "updated_at">;

export default function EditFileUploadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const fileUploadId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useFileUpload(fileUploadId);
  const updateFileUpload = useUpdateFileUpload();

  async function handleSubmit(updates: FileUploadFormData) {
    await updateFileUpload.mutateAsync({ id: fileUploadId, data: updates });
    router.push(`/admin/file-uploads/${fileUploadId}`);
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (isError || !data)
    return <p className="text-sm text-red-600">Failed to load file upload.</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Edit File Upload #{data.id}</h1>
      <FileUploadForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/file-uploads/${fileUploadId}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to File Upload
        </Link>
      </div>
    </div>
  );
}
