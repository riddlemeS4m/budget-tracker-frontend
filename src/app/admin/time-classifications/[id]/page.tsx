"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useTimeClassification, useDeleteTimeClassification } from "@/lib/hooks";

export default function TimeClassificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const tcId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useTimeClassification(tcId);
  const deleteTimeClassification = useDeleteTimeClassification();

  function handleDelete() {
    if (confirm("Delete this time classification?")) {
      deleteTimeClassification.mutate(tcId, {
        onSuccess: () => router.push("/admin/time-classifications"),
      });
    }
  }

  if (isLoading)
    return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load time classification.
      </p>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Time Classification #{data.id}</h1>
        <div className="flex gap-3">
          <Link
            href={`/admin/time-classifications/${data.id}/edit`}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-3 py-2 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded hover:bg-red-50 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>

      <dl className="space-y-3 max-w-lg">
        {(
          [
            ["ID", data.id],
            ["Name", data.name],
            ["Created At", new Date(data.created_at).toLocaleString()],
            ["Updated At", new Date(data.updated_at).toLocaleString()],
          ] as [string, string | number][]
        ).map(([label, value]) => (
          <div key={label} className="flex gap-4">
            <dt className="w-44 shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400">
              {label}
            </dt>
            <dd className="text-sm text-gray-900 dark:text-gray-100">
              {String(value)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <Link
          href="/admin/time-classifications"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Time Classifications
        </Link>
      </div>
    </div>
  );
}
