"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useUpdateAccount } from "@/lib/hooks";
import AccountForm from "@/components/admin/accounts/AccountForm";
import type { Account } from "@/lib/api";

export default function EditAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const accountId = Number(id);
  const router = useRouter();

  const { data, isLoading, isError } = useAccount(accountId);
  const updateAccount = useUpdateAccount();

  async function handleSubmit(updates: Omit<Account, "id" | "created_at" | "updated_at">) {
    await updateAccount.mutateAsync({ id: accountId, data: updates });
    router.push(`/admin/accounts/${accountId}`);
  }

  if (isLoading) return <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>;
  if (isError || !data)
    return <p className="text-sm text-red-600 dark:text-red-400">Failed to load account.</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Edit Account #{data.id}</h1>
      <AccountForm initial={data} onSubmit={handleSubmit} />
      <div className="mt-4">
        <Link
          href={`/admin/accounts/${accountId}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Account
        </Link>
      </div>
    </div>
  );
}
