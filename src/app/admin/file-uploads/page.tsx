"use client";

import Link from "next/link";
import { useFileUploads } from "@/lib/hooks";
import FileUploadRow from "@/components/admin/file-uploads/FileUploadRow";

export default function FileUploadsListPage() {
  const { data, isLoading, isError } = useFileUploads();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">File Uploads</h1>
        <Link
          href="/admin/file-uploads/new"
          className="px-3 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          Add File Upload
        </Link>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading…</p>}
      {isError && <p className="text-sm text-red-600">Failed to load file uploads.</p>}

      {data && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((fu) => (
              <FileUploadRow key={fu.id} fileUpload={fu} />
            ))}
          </tbody>
        </table>
      )}

      {data?.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">No file uploads found.</p>
      )}
    </div>
  );
}
