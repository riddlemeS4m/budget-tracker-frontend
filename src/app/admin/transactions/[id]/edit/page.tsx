"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useTransaction, useUpdateTransaction } from "@/lib/hooks";
import TransactionForm from "@/components/admin/transactions/TransactionForm";

export default function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const transactionId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useTransaction(transactionId);
  const updateTransaction = useUpdateTransaction();

  async function handleSubmit(updates: Record<string, unknown>) {
    await updateTransaction.mutateAsync({ id: transactionId, data: updates });
    router.push(`/admin/transactions/${transactionId}`);
  }

  if (isLoading) return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return <p className="text-sm text-red-600 dark:text-red-400">Failed to load transaction.</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Edit Transaction #{data.id}</h1>
      <TransactionForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/transactions/${transactionId}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Transaction
        </Link>
      </div>
    </div>
  );
}
