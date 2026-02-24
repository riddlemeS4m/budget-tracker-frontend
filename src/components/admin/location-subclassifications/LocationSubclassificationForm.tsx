"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LocationSubClassification } from "@/lib/api";
import { useLocationClassifications } from "@/lib/hooks/useLocationClassifications";

interface LocationSubclassificationFormProps {
  initial?: Partial<LocationSubClassification>;
  onSubmit: (
    data: Pick<LocationSubClassification, "name" | "location_classification_id">
  ) => Promise<unknown>;
}

export default function LocationSubclassificationForm({
  initial = {},
  onSubmit,
}: LocationSubclassificationFormProps) {
  const router = useRouter();
  const { data: locationClassifications, isLoading: lcLoading } =
    useLocationClassifications();

  const [name, setName] = useState(initial.name ?? "");
  const [locationClassificationId, setLocationClassificationId] = useState(
    String(initial.location_classification?.id ?? initial.location_classification_id ?? "")
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
      await onSubmit({
        name,
        location_classification_id: Number(locationClassificationId),
      });
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
        <label className={labelClass}>Location Classification</label>
        <select
          value={locationClassificationId}
          onChange={(e) => setLocationClassificationId(e.target.value)}
          required
          disabled={lcLoading}
          className={inputClass}
        >
          <option value="">
            {lcLoading ? "Loading…" : "Select a location classification"}
          </option>
          {locationClassifications?.map((lc) => (
            <option key={lc.id} value={String(lc.id)}>
              {lc.name} ({lc.type})
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
