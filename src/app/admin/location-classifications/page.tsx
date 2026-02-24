"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocationClassifications } from "@/lib/hooks";
import LocationClassificationRow from "@/components/admin/location-classifications/LocationClassificationRow";
import SortableHeader from "@/components/admin/transactions/SortableHeader";
import type { LocationClassification } from "@/lib/api";

type SortKey = keyof Pick<
  LocationClassification,
  "id" | "name" | "type" | "subcategory_count" | "transaction_count" | "created_at"
>;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "subcategory_count", label: "Subcategories" },
  { key: "transaction_count", label: "Transactions" },
  { key: "created_at", label: "Created" },
];

export default function LocationClassificationsListPage() {
  const { data, isLoading, isError } = useLocationClassifications();
  const [sortKey, setSortKey] = useState<string | null>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function handleSort(key: string) {
    if (key === sortKey) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = (() => {
    if (!data) return [];
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey as SortKey];
      const bv = b[sortKey as SortKey];
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  })();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Location Classifications</h1>
        <Link
          href="/admin/location-classifications/new"
          className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          Add Location Classification
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      )}
      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load location classifications.
        </p>
      )}

      {data && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {COLUMNS.map(({ key, label }) => (
                <SortableHeader
                  key={key}
                  label={label}
                  field={key}
                  currentField={sortKey}
                  currentDir={sortDir}
                  onSort={handleSort}
                />
              ))}
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((lc) => (
              <LocationClassificationRow
                key={lc.id}
                locationClassification={lc}
              />
            ))}
          </tbody>
        </table>
      )}

      {data?.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          No location classifications found.
        </p>
      )}
    </div>
  );
}
