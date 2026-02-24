"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocationSubclassifications, type LocationSubclassificationFilters } from "@/lib/hooks";
import LocationSubclassificationRow from "@/components/admin/location-subclassifications/LocationSubclassificationRow";
import LocationSubclassificationFiltersBar from "@/components/admin/location-subclassifications/LocationSubclassificationFilters";
import SortableHeader from "@/components/admin/transactions/SortableHeader";
import type { LocationSubClassification } from "@/lib/api";

type SortKey = keyof Pick<
  LocationSubClassification,
  "id" | "name" | "transaction_count" | "created_at"
>;

export default function LocationSubclassificationsListPage() {
  const [filters, setFilters] = useState<LocationSubclassificationFilters>({});
  const { data, isLoading, isError } = useLocationSubclassifications(filters);
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
        <h1 className="text-xl font-semibold">Location Subclassifications</h1>
        <Link
          href="/admin/location-subclassifications/new"
          className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          Add Location Subclassification
        </Link>
      </div>

      <LocationSubclassificationFiltersBar filters={filters} onChange={setFilters} resultCount={data?.length} />

      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      )}
      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load location subclassifications.
        </p>
      )}

      {data && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <SortableHeader
                label="ID"
                field="id"
                currentField={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <SortableHeader
                label="Name"
                field="name"
                currentField={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location Classification
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <SortableHeader
                label="Transactions"
                field="transaction_count"
                currentField={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <SortableHeader
                label="Created"
                field="created_at"
                currentField={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((lsc) => (
              <LocationSubclassificationRow
                key={lsc.id}
                locationSubclassification={lsc}
              />
            ))}
          </tbody>
        </table>
      )}

      {data?.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          No location subclassifications found.
        </p>
      )}
    </div>
  );
}
