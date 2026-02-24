"use client";

import Link from "next/link";
import { useTimeClassifications } from "@/lib/hooks";
import TimeClassificationRow from "@/components/admin/time-classifications/TimeClassificationRow";

export default function TimeClassificationsListPage() {
  const { data, isLoading, isError } = useTimeClassifications();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Time Classifications</h1>
        <Link
          href="/admin/time-classifications/new"
          className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          Add Time Classification
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      )}
      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load time classifications.
        </p>
      )}

      {data && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((tc) => (
              <TimeClassificationRow key={tc.id} timeClassification={tc} />
            ))}
          </tbody>
        </table>
      )}

      {data?.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          No time classifications found.
        </p>
      )}
    </div>
  );
}
