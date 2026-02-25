"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCreateStatement } from "@/lib/hooks";
import StatementForm from "@/components/admin/statements/StatementForm";
import type { Statement } from "@/lib/api";

type StatementFormData = Omit<Statement, "id" | "created_at" | "updated_at" | "account"> & { account_id: number };

export default function NewStatementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createStatement = useCreateStatement();

  const accountId = searchParams.get("account_id");
  const initial: Partial<Statement> = accountId
    ? { account: { id: Number(accountId) } as Statement["account"] }
    : {};

  async function handleSubmit(data: StatementFormData) {
    const result = await createStatement.mutateAsync(data as unknown as Statement);
    router.push(`/admin/statements/${result.id}`);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Statement</h1>
      <StatementForm initial={initial} onSubmit={handleSubmit} />
    </div>
  );
}
