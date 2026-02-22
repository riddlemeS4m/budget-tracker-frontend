"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Account } from "@/lib/api";

interface AccountFormProps {
  initial?: Partial<Account>;
  onSubmit: (data: Omit<Account, "id" | "created_at" | "updated_at">) => Promise<unknown>;
}

export default function AccountForm({ initial = {}, onSubmit }: AccountFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initial.name ?? "");
  const [type, setType] = useState(initial.type ?? "");
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
      await onSubmit({ name, type, file_upload_schema });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          File Upload Schema{" "}
          <span className="text-gray-400 font-normal">(JSON, optional)</span>
        </label>
        <textarea
          value={schemaText}
          onChange={(e) => setSchemaText(e.target.value)}
          rows={6}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full font-mono"
          placeholder="{}"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
