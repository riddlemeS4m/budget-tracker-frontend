"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useFileUpload, useDeleteFileUpload } from "@/lib/hooks";

export default function FileUploadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const fileUploadId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useFileUpload(fileUploadId);
  const deleteFileUpload = useDeleteFileUpload();

  function handleDelete() {
    if (confirm("Delete this file upload?")) {
      deleteFileUpload.mutate(fileUploadId, {
        onSuccess: () => router.push("/admin/file-uploads"),
      });
    }
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (isError || !data)
    return <p className="text-sm text-red-600">Failed to load file upload.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">File Upload #{data.id}</h1>
        <div className="flex gap-3">
          <Link
            href={`/admin/file-uploads/${data.id}/edit`}
            className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-3 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      <dl className="space-y-3 max-w-lg">
        {[
          ["ID", data.id],
          ["Account", data.account],
          ["Filename", data.filename],
          ["Transaction Count", data.transaction_count],
          ["Status", data.status],
          ["Errors", data.errors ?? "—"],
          ["Created At", new Date(data.created_at).toLocaleString()],
          ["Updated At", new Date(data.updated_at).toLocaleString()],
        ].map(([label, value]) => (
          <div key={String(label)} className="flex gap-4">
            <dt className="w-44 shrink-0 text-sm font-medium text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900 whitespace-pre-wrap break-all">{String(value)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <Link href="/admin/file-uploads" className="text-sm text-blue-600 hover:underline">
          ← Back to File Uploads
        </Link>
      </div>
    </div>
  );
}
