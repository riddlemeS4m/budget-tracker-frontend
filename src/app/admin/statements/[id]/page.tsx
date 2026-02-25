"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useStatement, useDeleteStatement } from "@/lib/hooks";

export default function StatementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const statementId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useStatement(statementId);
  const deleteStatement = useDeleteStatement();

  function handleDelete() {
    if (confirm("Delete this statement?")) {
      deleteStatement.mutate(statementId, {
        onSuccess: () => router.push("/admin/statements"),
      });
    }
  }

  if (isLoading) return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return <p className="text-sm text-red-600 dark:text-red-400">Failed to load statement.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Statement #{data.id}</h1>
        <div className="flex gap-3">
          <Link
            href={`/admin/statements/new?account_id=${data.account.id}`}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
          >
            Add
          </Link>
          <Link
            href={`/admin/statements/${data.id}/edit`}
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
        {[
          ["ID", data.id],
          ["Account", data.account.name],
          ["Period Start", data.period_start ?? "—"],
          ["Period End", data.period_end],
          ["Opening Balance", data.opening_balance ?? "—"],
          ["Closing Balance", data.closing_balance],
          ["Created At", new Date(data.created_at).toLocaleString()],
          ["Updated At", new Date(data.updated_at).toLocaleString()],
        ].map(([label, value]) => (
          <div key={String(label)} className="flex gap-4">
            <dt className="w-44 shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
            <dd className="text-sm text-gray-900 dark:text-gray-100">{String(value)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <Link href="/admin/statements" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Statements
        </Link>
      </div>
    </div>
  );
}
