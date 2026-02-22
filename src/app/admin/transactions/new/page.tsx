"use client";

import { useRouter } from "next/navigation";
import { useCreateTransaction } from "@/lib/hooks";
import TransactionForm from "@/components/admin/transactions/TransactionForm";
import type { Transaction } from "@/lib/api";

type TransactionFormData = Omit<Transaction, "id" | "created_at" | "updated_at">;

export default function NewTransactionPage() {
  const router = useRouter();
  const createTransaction = useCreateTransaction();

  async function handleSubmit(data: TransactionFormData) {
    await createTransaction.mutateAsync(data as Transaction);
    router.push("/admin/transactions");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Transaction</h1>
      <TransactionForm onSubmit={handleSubmit} />
    </div>
  );
}
