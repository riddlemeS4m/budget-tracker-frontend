"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Statement } from "@/lib/api";
import { ApiError } from "@/lib/api/core/ApiError";
import { useAccounts } from "@/lib/hooks";

function extractApiErrors(err: unknown): string {
  if (err instanceof ApiError && err.body && typeof err.body === "object") {
    const messages: string[] = [];
    for (const [key, value] of Object.entries(err.body)) {
      const items = Array.isArray(value) ? value : [value];
      if (key === "non_field_errors" || key === "detail") {
        messages.push(...items.map(String));
      } else {
        messages.push(...items.map((v) => `${key}: ${v}`));
      }
    }
    if (messages.length > 0) return messages.join(" ");
  }
  if (err instanceof Error) return err.message;
  return "An error occurred.";
}

type StatementFormData = Omit<Statement, "id" | "created_at" | "updated_at" | "account"> & { account_id: number };

interface StatementFormProps {
  initial?: Partial<Statement>;
  onSubmit: (data: StatementFormData) => Promise<unknown>;
}

export default function StatementForm({
  initial = {},
  onSubmit,
}: StatementFormProps) {
  const router = useRouter();
  const { data: accounts } = useAccounts();

  const [accountId, setAccountId] = useState(String(initial.account?.id ?? ""));
  const [periodStart, setPeriodStart] = useState(initial.period_start ?? "");
  const [periodEnd, setPeriodEnd] = useState(initial.period_end ?? "");
  const [openingBalance, setOpeningBalance] = useState(initial.opening_balance ?? "");
  const [closingBalance, setClosingBalance] = useState(initial.closing_balance ?? "");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        account_id: Number(accountId),
        period_start: periodStart || null,
        period_end: periodEnd,
        opening_balance: openingBalance || null,
        closing_balance: closingBalance,
      });
    } catch (err: unknown) {
      setFormError(extractApiErrors(err));
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {formError && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded px-3 py-2">
          {formError}
        </p>
      )}
      <div>
        <label className={labelClass}>Account</label>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
          className={inputClass}
        >
          <option value="">Select an account…</option>
          {accounts?.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>
          Period Start <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
        </label>
        <input
          type="date"
          value={periodStart ?? ""}
          onChange={(e) => setPeriodStart(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Period End</label>
        <input
          type="date"
          value={periodEnd}
          onChange={(e) => setPeriodEnd(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>
          Opening Balance <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={openingBalance ?? ""}
          onChange={(e) => setOpeningBalance(e.target.value)}
          placeholder="0.00"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Closing Balance</label>
        <input
          type="text"
          value={closingBalance}
          onChange={(e) => setClosingBalance(e.target.value)}
          required
          placeholder="0.00"
          className={inputClass}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
