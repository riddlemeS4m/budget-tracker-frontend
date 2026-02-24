"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useStatement, useUpdateStatement } from "@/lib/hooks";
import StatementForm from "@/components/admin/statements/StatementForm";
import type { Statement } from "@/lib/api";

type StatementFormData = Omit<Statement, "id" | "created_at" | "updated_at" | "account"> & { account_id: number };

export default function EditStatementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const statementId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useStatement(statementId);
  const updateStatement = useUpdateStatement();

  async function handleSubmit(updates: StatementFormData) {
    await updateStatement.mutateAsync({ id: statementId, data: updates });
    router.push(`/admin/statements/${statementId}`);
  }

  if (isLoading) return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return <p className="text-sm text-red-600 dark:text-red-400">Failed to load statement.</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Edit Statement #{data.id}</h1>
      <StatementForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/statements/${statementId}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Statement
        </Link>
      </div>
    </div>
  );
}
