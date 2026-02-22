"use client";

import { useState } from "react";

export type AmountColumnFormat = "debit_is_negative" | "debit_is_positive" | null;

export type FileUploadSchema = {
  schema: {
    transaction_date: string | null;
    posted_date: string | null;
    description: string | null;
    description_2: string | null;
    category: string | null;
    amount: string | null;
    subcategory: string | null;
  };
  amount_column_format: AmountColumnFormat;
  debit_column?: string | null;
  credit_column?: string | null;
};

interface SchemaWizardFormProps {
  headers: string[];
  onSave: (schema: FileUploadSchema) => Promise<void>;
}

const TRANSACTION_FIELDS: { key: keyof FileUploadSchema["schema"]; label: string }[] = [
  { key: "transaction_date", label: "Transaction Date" },
  { key: "posted_date", label: "Posted Date" },
  { key: "description", label: "Description" },
  { key: "description_2", label: "Description 2" },
  { key: "category", label: "Category" },
  { key: "subcategory", label: "Subcategory" },
  { key: "amount", label: "Amount" },
];

export default function SchemaWizardForm({ headers, onSave }: SchemaWizardFormProps) {
  const [mapping, setMapping] = useState<FileUploadSchema["schema"]>({
    transaction_date: null,
    posted_date: null,
    description: null,
    description_2: null,
    category: null,
    subcategory: null,
    amount: null,
  });

  // "debit_is_negative" | "debit_is_positive" | "split"
  // "split" maps to amount_column_format: null with debit/credit columns
  const [amountMode, setAmountMode] = useState<"debit_is_negative" | "debit_is_positive" | "split">(
    "debit_is_negative"
  );
  const [debitColumn, setDebitColumn] = useState<string>("");
  const [creditColumn, setCreditColumn] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const inputClass =
    "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
  const labelClass = "text-sm font-medium text-gray-700 dark:text-gray-300";

  function setMappingField(key: keyof FileUploadSchema["schema"], value: string) {
    setMapping((prev) => ({ ...prev, [key]: value || null }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const isSplit = amountMode === "split";
    const schema: FileUploadSchema = {
      schema: {
        ...mapping,
        // If split mode, amount mapping is irrelevant
        amount: isSplit ? null : mapping.amount,
      },
      amount_column_format: isSplit ? null : amountMode,
      ...(isSplit
        ? {
            debit_column: debitColumn || null,
            credit_column: creditColumn || null,
          }
        : {}),
    };

    try {
      await onSave(schema);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {formError && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded px-3 py-2">
          {formError}
        </p>
      )}

      {/* Column Mapping */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Column Mapping
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Match each transaction field to the corresponding column in your CSV file.
        </p>
        <div className="space-y-3">
          {TRANSACTION_FIELDS.map(({ key, label }) => {
            // Hide "Amount" row when in split mode
            if (key === "amount" && amountMode === "split") return null;
            return (
              <div key={key} className="grid grid-cols-2 gap-4 items-center">
                <label className={labelClass}>{label}</label>
                <select
                  value={mapping[key] ?? ""}
                  onChange={(e) => setMappingField(key, e.target.value)}
                  className={inputClass}
                >
                  <option value="">— Not mapped —</option>
                  {headers.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>

      {/* Amount Column Format */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Amount Column Format
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          How are expense (debit) amounts represented in your CSV?
        </p>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="amountMode"
              value="debit_is_negative"
              checked={amountMode === "debit_is_negative"}
              onChange={() => setAmountMode("debit_is_negative")}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Negative values are expenses</span>
              <span className="block text-gray-500 dark:text-gray-400">
                e.g. −50.00 is a $50 expense, +200.00 is a $200 deposit
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="amountMode"
              value="debit_is_positive"
              checked={amountMode === "debit_is_positive"}
              onChange={() => setAmountMode("debit_is_positive")}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Positive values are expenses</span>
              <span className="block text-gray-500 dark:text-gray-400">
                e.g. 50.00 is a $50 expense, −200.00 is a $200 deposit
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="amountMode"
              value="split"
              checked={amountMode === "split"}
              onChange={() => setAmountMode("split")}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Separate debit and credit columns</span>
              <span className="block text-gray-500 dark:text-gray-400">
                Expenses and deposits appear in different columns
              </span>
            </span>
          </label>
        </div>

        {amountMode === "split" && (
          <div className="mt-4 space-y-3 pl-7">
            <div className="grid grid-cols-2 gap-4 items-center">
              <label className={labelClass}>Debit column (expenses)</label>
              <select
                value={debitColumn}
                onChange={(e) => setDebitColumn(e.target.value)}
                className={inputClass}
              >
                <option value="">— Not mapped —</option>
                {headers.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <label className={labelClass}>Credit column (deposits)</label>
              <select
                value={creditColumn}
                onChange={(e) => setCreditColumn(e.target.value)}
                className={inputClass}
              >
                <option value="">— Not mapped —</option>
                {headers.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        {submitting ? "Saving…" : "Save and Process"}
      </button>
    </form>
  );
}
