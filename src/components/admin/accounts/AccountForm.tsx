"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Account } from "@/lib/api";
import { AccountTypeEnum } from "@/lib/api";

const ACCOUNT_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "credit_card", label: "Credit Card" },
  { value: "investment", label: "Investment" },
  { value: "loan", label: "Loan" },
  { value: "other", label: "Other" },
  { value: "payroll", label: "Payroll" },
];

interface AccountFormProps {
  initial?: Partial<Account>;
  onSubmit: (data: Omit<Account, "id" | "created_at" | "updated_at">) => Promise<unknown>;
}

export default function AccountForm({ initial = {}, onSubmit }: AccountFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initial.name ?? "");
  const [type, setType] = useState(initial.type ?? "checking");
  const [schemaText, setSchemaText] = useState(
    initial.file_upload_schema
      ? JSON.stringify(initial.file_upload_schema, null, 2)
      : ""
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    let file_upload_schema = undefined;
    if (schemaText.trim()) {
      try {
        file_upload_schema = JSON.parse(schemaText);
      } catch {
        setError("File upload schema must be valid JSON.");
        return;
      }
    }

    setSubmitting(true);
    try {
      await onSubmit({ name, type: type as AccountTypeEnum, file_upload_schema });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded px-3 py-2">
          {error}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {ACCOUNT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          File Upload Schema{" "}
          <span className="text-gray-400 dark:text-gray-500 font-normal">(JSON, optional)</span>
        </label>
        <textarea
          value={schemaText}
          onChange={(e) => setSchemaText(e.target.value)}
          rows={6}
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="{}"
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
