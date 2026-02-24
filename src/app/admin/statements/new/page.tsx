"use client";

import { useRouter } from "next/navigation";
import { useCreateStatement } from "@/lib/hooks";
import StatementForm from "@/components/admin/statements/StatementForm";
import type { Statement } from "@/lib/api";

type StatementFormData = Omit<Statement, "id" | "created_at" | "updated_at" | "account"> & { account_id: number };

export default function NewStatementPage() {
  const router = useRouter();
  const createStatement = useCreateStatement();

  async function handleSubmit(data: StatementFormData) {
    const result = await createStatement.mutateAsync(data as unknown as Statement);
    router.push(`/admin/statements/${result.id}`);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Statement</h1>
      <StatementForm onSubmit={handleSubmit} />
    </div>
  );
}
