"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccounts, useUploadFile, useProcessFileUpload } from "@/lib/hooks";

const inputClass =
  "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function CsvUploadForm() {
  const router = useRouter();
  const { data: accounts, isLoading: accountsLoading } = useAccounts();
  const uploadFile = useUploadFile();
  const processFileUpload = useProcessFileUpload();

  const [accountId, setAccountId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!accountId) {
      setFormError("Please select an account.");
      return;
    }
    if (!file) {
      setFormError("Please select a CSV file.");
      return;
    }

    try {
      const result = await uploadFile.mutateAsync({
        file,
        accountId: Number(accountId),
      });

      if (!result.account.file_upload_schema) {
        router.push(`/admin/file-uploads/${result.id}/schema-wizard`);
      } else {
        await processFileUpload.mutateAsync(result.id);
        router.push(`/admin/file-uploads/${result.id}`);
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {formError && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded px-3 py-2">
          {formError}
        </p>
      )}

      <div>
        <label className={labelClass}>Account</label>
        {accountsLoading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading accounts…</p>
        ) : (
          <select
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
            className={inputClass}
          >
            <option value="">— Select an account —</option>
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className={labelClass}>CSV File</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
          className={inputClass}
        />
        {file && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={uploadFile.isPending || processFileUpload.isPending}
          className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          {uploadFile.isPending ? "Uploading…" : processFileUpload.isPending ? "Processing…" : "Upload"}
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
