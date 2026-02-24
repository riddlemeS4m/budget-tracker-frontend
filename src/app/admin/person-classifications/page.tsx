"use client";

import Link from "next/link";
import { usePersonClassifications } from "@/lib/hooks";
import PersonClassificationRow from "@/components/admin/person-classifications/PersonClassificationRow";

export default function PersonClassificationsListPage() {
  const { data, isLoading, isError } = usePersonClassifications();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Person Classifications</h1>
        <Link
          href="/admin/person-classifications/new"
          className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          Add Person Classification
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      )}
      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load person classifications.
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
            {data.map((pc) => (
              <PersonClassificationRow key={pc.id} personClassification={pc} />
            ))}
          </tbody>
        </table>
      )}

      {data?.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          No person classifications found.
        </p>
      )}
    </div>
  );
}
