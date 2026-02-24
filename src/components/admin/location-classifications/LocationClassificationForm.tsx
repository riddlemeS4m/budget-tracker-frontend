"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LocationClassification } from "@/lib/api";
import { LocationClassificationTypeEnum } from "@/lib/api";

const TYPE_OPTIONS: { value: LocationClassificationTypeEnum; label: string }[] = [
  { value: LocationClassificationTypeEnum.INCOME, label: "Income" },
  { value: LocationClassificationTypeEnum.EXPENSE, label: "Expense" },
  { value: LocationClassificationTypeEnum.TRANSFER, label: "Transfer" },
];

interface LocationClassificationFormProps {
  initial?: Partial<LocationClassification>;
  onSubmit: (
    data: Pick<LocationClassification, "name" | "type">
  ) => Promise<unknown>;
}

export default function LocationClassificationForm({
  initial = {},
  onSubmit,
}: LocationClassificationFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initial.name ?? "");
  const [type, setType] = useState<LocationClassificationTypeEnum>(
    initial.type ?? LocationClassificationTypeEnum.EXPENSE
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const inputClass =
    "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ name, type });
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
        <label className={labelClass}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Type</label>
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as LocationClassificationTypeEnum)
          }
          required
          className={inputClass}
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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
