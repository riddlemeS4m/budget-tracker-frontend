"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FileUpload } from "@/lib/api";
import { StatusEnum } from "@/lib/api";

type FileUploadFormData = Omit<FileUpload, "id" | "created_at" | "updated_at" | "account" | "headers"> & { account_id: number };

interface FileUploadFormProps {
  initial?: Partial<FileUpload>;
  onSubmit: (data: FileUploadFormData) => Promise<unknown>;
}

export default function FileUploadForm({
  initial = {},
  onSubmit,
}: FileUploadFormProps) {
  const router = useRouter();
  const [account, setAccount] = useState(String(initial.account?.id ?? ""));
  const [filename, setFilename] = useState(initial.filename ?? "");
  const [transactionCount, setTransactionCount] = useState(
    String(initial.transaction_count ?? "0")
  );
  const [status, setStatus] = useState(initial.status ?? "");
  const [errors, setErrors] = useState(initial.errors ?? "");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        account_id: Number(account),
        filename,
        transaction_count: Number(transactionCount),
        status: status as StatusEnum,
        errors: errors || null,
      });
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred.");
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
        <label className={labelClass}>Account ID</label>
        <input
          type="number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Filename</label>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Transaction Count</label>
        <input
          type="number"
          value={transactionCount}
          onChange={(e) => setTransactionCount(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>
          Errors <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
        </label>
        <textarea
          value={errors}
          onChange={(e) => setErrors(e.target.value)}
          rows={4}
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
