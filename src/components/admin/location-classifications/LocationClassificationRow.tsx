import Link from "next/link";
import type { LocationClassification } from "@/lib/api";

interface LocationClassificationRowProps {
  locationClassification: LocationClassification;
}

export default function LocationClassificationRow({
  locationClassification,
}: LocationClassificationRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {locationClassification.id}
      </td>
      <td className="px-3 py-2 text-sm">{locationClassification.name}</td>
      <td className="px-3 py-2 text-sm capitalize">
        {locationClassification.type}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {locationClassification.subcategory_count}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {locationClassification.transaction_count}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(locationClassification.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/location-classifications/${locationClassification.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/location-classifications/${locationClassification.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
