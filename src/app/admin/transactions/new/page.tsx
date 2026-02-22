"use client";

import { useRouter } from "next/navigation";
import { useCreateTransaction } from "@/lib/hooks";
import TransactionForm from "@/components/admin/transactions/TransactionForm";
import type { TransactionWrite } from "@/lib/api";

export default function NewTransactionPage() {
  const router = useRouter();
  const createTransaction = useCreateTransaction();

  async function handleSubmit(data: TransactionWrite) {
    await createTransaction.mutateAsync(data);
    router.push("/admin/transactions");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Transaction</h1>
      <TransactionForm onSubmit={handleSubmit} />
    </div>
  );
}
