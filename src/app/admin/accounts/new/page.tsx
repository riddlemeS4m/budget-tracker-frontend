"use client";

import { useRouter } from "next/navigation";
import { useCreateAccount } from "@/lib/hooks";
import AccountForm from "@/components/admin/accounts/AccountForm";
import type { Account } from "@/lib/api";

export default function NewAccountPage() {
  const router = useRouter();
  const createAccount = useCreateAccount();

  async function handleSubmit(data: Omit<Account, "id" | "created_at" | "updated_at">) {
    try {
      await createAccount.mutateAsync(data as Account);
      router.push("/admin/accounts");
    } catch (error) {
      // TODO: Handle error
      console.error("Failed to create account:", error);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">New Account</h1>
      <AccountForm onSubmit={handleSubmit} />
    </div>
  );
}
