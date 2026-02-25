"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCreateTransaction } from "@/lib/hooks";
import TransactionForm from "@/components/admin/transactions/TransactionForm";
import type { Transaction } from "@/lib/api";

export default function NewTransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createTransaction = useCreateTransaction();

  function numParam(key: string): number | null {
    const v = searchParams.get(key);
    return v ? Number(v) : null;
  }

  const initial: Partial<Transaction> = {
    ...(searchParams.get("account_id")
      ? { account: { id: Number(searchParams.get("account_id")) } as Transaction["account"] }
      : {}),
    description: searchParams.get("description") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    subcategory: searchParams.get("subcategory") ?? undefined,
    amount: searchParams.get("amount") ?? undefined,
    location_classification: numParam("location_classification") ?? undefined,
    location_subclassification: numParam("location_subclassification") ?? undefined,
    person_classification: numParam("person_classification") ?? undefined,
    time_classification: numParam("time_classification") ?? undefined,
  };

  async function handleSubmit(data: unknown) {
    await createTransaction.mutateAsync(data as Transaction);
    router.push("/admin/transactions");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Transaction</h1>
      <TransactionForm initial={initial} onSubmit={handleSubmit} />
    </div>
  );
}
