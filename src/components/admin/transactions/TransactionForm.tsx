"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Transaction } from "@/lib/api";
import { useAccounts } from "@/lib/hooks/useAccounts";
import { useFileUploads } from "@/lib/hooks/useFileUploads";
import { useLocationClassifications } from "@/lib/hooks/useLocationClassifications";
import { useLocationSubclassifications } from "@/lib/hooks/useLocationSubclassifications";
import { usePersonClassifications } from "@/lib/hooks/usePersonClassifications";
import { useTimeClassifications } from "@/lib/hooks/useTimeClassifications";

type TransactionFormData = {
  account_id: number;
  file_upload_id: number | null;
  transaction_date: string | null;
  posted_date: string | null;
  description: string | null;
  description_2: string | null;
  category: string | null;
  subcategory: string | null;
  amount: string | null;
  raw_data: unknown;
  location_classification: number | null;
  location_subclassification: number | null;
  person_classification: number | null;
  time_classification: number | null;
};

interface TransactionFormProps {
  initial?: Partial<Transaction>;
  onSubmit: (data: TransactionFormData) => Promise<unknown>;
}

export default function TransactionForm({
  initial = {},
  onSubmit,
}: TransactionFormProps) {
  const router = useRouter();
  const { data: accounts, isLoading: accountsLoading } = useAccounts();
  const { data: fileUploads, isLoading: fileUploadsLoading } = useFileUploads();
  const { data: locationClassifications, isLoading: locationClassificationsLoading } = useLocationClassifications();
  const { data: locationSubclassifications, isLoading: locationSubclassificationsLoading } = useLocationSubclassifications();
  const { data: personClassifications, isLoading: personClassificationsLoading } = usePersonClassifications();
  const { data: timeClassifications, isLoading: timeClassificationsLoading } = useTimeClassifications();

  const [account, setAccount] = useState(String(initial.account?.id ?? ""));
  const [fileUpload, setFileUpload] = useState(String(initial.file_upload?.id ?? ""));
  const [transactionDate, setTransactionDate] = useState(
    initial.transaction_date
      ? initial.transaction_date.slice(0, 10)
      : ""
  );
  const [description, setDescription] = useState(initial.description ?? "");
  const [description2, setDescription2] = useState(initial.description_2 ?? "");
  const [category, setCategory] = useState(initial.category ?? "");
  const [subcategory, setSubcategory] = useState(initial.subcategory ?? "");
  const [amount, setAmount] = useState(initial.amount ?? "");
  const [locationClassification, setLocationClassification] = useState(
    String(initial.location_classification ?? "")
  );
  const [locationSubclassification, setLocationSubclassification] = useState(
    String(initial.location_subclassification ?? "")
  );
  const [personClassification, setPersonClassification] = useState(
    String(initial.person_classification ?? "")
  );
  const [timeClassification, setTimeClassification] = useState(
    String(initial.time_classification ?? "")
  );
  const [rawDataText, setRawDataText] = useState(
    initial.raw_data ? JSON.stringify(initial.raw_data, null, 2) : "{}"
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredSubclassifications = useMemo(() => {
    if (!locationSubclassifications) return [];
    if (!locationClassification) return locationSubclassifications;
    return locationSubclassifications.filter(
      (s) => String(s.location_classification.id) === locationClassification
    );
  }, [locationSubclassifications, locationClassification]);

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
        account_id: Number(account),
        file_upload_id: fileUpload !== "" ? Number(fileUpload) : null,
        transaction_date: transactionDate || null,
        posted_date: null,
        description: description || null,
        description_2: description2 || null,
        category: category || null,
        subcategory: subcategory || null,
        amount: amount || null,
        raw_data,
        location_classification: locationClassification ? Number(locationClassification) : null,
        location_subclassification: locationSubclassification ? Number(locationSubclassification) : null,
        person_classification: personClassification ? Number(personClassification) : null,
        time_classification: timeClassification ? Number(timeClassification) : null,
      });
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const optionalClass = "text-gray-400 dark:text-gray-500 font-normal";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
      {formError && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded px-3 py-2">
          {formError}
        </p>
      )}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-start">
        {/* Left column — core transaction fields */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Account</label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
              disabled={accountsLoading}
              className={inputClass}
            >
              <option value="">
                {accountsLoading ? "Loading accounts…" : "Select an account"}
              </option>
              {accounts?.map((a) => (
                <option key={a.id} value={String(a.id)}>
                  {a.name} ({a.type})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              File Upload <span className={optionalClass}>(optional)</span>
            </label>
            <select
              value={fileUpload}
              onChange={(e) => setFileUpload(e.target.value)}
              disabled={fileUploadsLoading}
              className={inputClass}
            >
              <option value="">
                {fileUploadsLoading ? "Loading file uploads…" : "None"}
              </option>
              {fileUploads?.map((f) => (
                <option key={f.id} value={String(f.id)}>
                  {f.filename} — {f.account.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Transaction Date <span className={optionalClass}>(optional)</span>
            </label>
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Description <span className={optionalClass}>(optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Description 2 <span className={optionalClass}>(optional)</span>
            </label>
            <input
              type="text"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Category <span className={optionalClass}>(optional)</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Subcategory <span className={optionalClass}>(optional)</span>
            </label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Amount <span className={optionalClass}>(optional)</span>
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={labelClass}>
              Raw Data <span className={optionalClass}>(JSON)</span>
            </label>
            <textarea
              value={rawDataText}
              onChange={(e) => setRawDataText(e.target.value)}
              rows={5}
              required
              className={`${inputClass} font-mono`}
            />
          </div>
        </div>

        {/* Right column — classifications */}
        <div className="space-y-4">
          <div>
            <label className={labelClass}>
              Location Classification <span className={optionalClass}>(optional)</span>
            </label>
            <select
              value={locationClassification}
              onChange={(e) => {
                setLocationClassification(e.target.value);
                setLocationSubclassification("");
              }}
              disabled={locationClassificationsLoading}
              className={inputClass}
            >
              <option value="">
                {locationClassificationsLoading ? "Loading…" : "None"}
              </option>
              {locationClassifications?.map((lc) => (
                <option key={lc.id} value={String(lc.id)}>
                  {lc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Location Subclassification <span className={optionalClass}>(optional)</span>
            </label>
            <select
              value={locationSubclassification}
              onChange={(e) => setLocationSubclassification(e.target.value)}
              disabled={locationSubclassificationsLoading}
              className={inputClass}
            >
              <option value="">
                {locationSubclassificationsLoading ? "Loading…" : "None"}
              </option>
              {filteredSubclassifications.map((ls) => (
                <option key={ls.id} value={String(ls.id)}>
                  {ls.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Person Classification <span className={optionalClass}>(optional)</span>
            </label>
            <select
              value={personClassification}
              onChange={(e) => setPersonClassification(e.target.value)}
              disabled={personClassificationsLoading}
              className={inputClass}
            >
              <option value="">
                {personClassificationsLoading ? "Loading…" : "None"}
              </option>
              {personClassifications?.map((pc) => (
                <option key={pc.id} value={String(pc.id)}>
                  {pc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Time Classification <span className={optionalClass}>(optional)</span>
            </label>
            <select
              value={timeClassification}
              onChange={(e) => setTimeClassification(e.target.value)}
              disabled={timeClassificationsLoading}
              className={inputClass}
            >
              <option value="">
                {timeClassificationsLoading ? "Loading…" : "None"}
              </option>
              {timeClassifications?.map((tc) => (
                <option key={tc.id} value={String(tc.id)}>
                  {tc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
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
