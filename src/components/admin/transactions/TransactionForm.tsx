"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Transaction } from "@/lib/api";

type TransactionFormData = Omit<Transaction, "id" | "created_at" | "updated_at">;

interface TransactionFormProps {
  initial?: Partial<Transaction>;
  onSubmit: (data: TransactionFormData) => Promise<unknown>;
}

export default function TransactionForm({
  initial = {},
  onSubmit,
}: TransactionFormProps) {
  const router = useRouter();
  const [account, setAccount] = useState(String(initial.account ?? ""));
  const [fileUpload, setFileUpload] = useState(String(initial.file_upload ?? ""));
  const [transactionDate, setTransactionDate] = useState(
    initial.transaction_date
      ? initial.transaction_date.slice(0, 10)
      : ""
  );
  const [description, setDescription] = useState(initial.description ?? "");
  const [description2, setDescription2] = useState(initial.description_2 ?? "");
  const [category, setCategory] = useState(initial.category ?? "");
  const [amount, setAmount] = useState(initial.amount ?? "");
  const [rawDataText, setRawDataText] = useState(
    initial.raw_data ? JSON.stringify(initial.raw_data, null, 2) : "{}"
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    let raw_data: unknown;
    try {
      raw_data = JSON.parse(rawDataText);
    } catch {
      setFormError("Raw data must be valid JSON.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        account: Number(account),
        file_upload: Number(fileUpload),
        transaction_date: transactionDate || null,
        posted_date: null,
        description: description || null,
        description_2: description2 || null,
        category: category || null,
        amount: amount || null,
        raw_data,
      });
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {formError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {formError}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account ID
        </label>
        <input
          type="number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          File Upload ID
        </label>
        <input
          type="number"
          value={fileUpload}
          onChange={(e) => setFileUpload(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transaction Date <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description 2 <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={description2}
          onChange={(e) => setDescription2(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
          placeholder="0.00"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Raw Data <span className="text-gray-400 font-normal">(JSON)</span>
        </label>
        <textarea
          value={rawDataText}
          onChange={(e) => setRawDataText(e.target.value)}
          rows={5}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full font-mono"
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
