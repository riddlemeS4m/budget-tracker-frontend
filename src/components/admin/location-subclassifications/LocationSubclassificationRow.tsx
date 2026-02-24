import Link from "next/link";
import type { LocationSubClassification } from "@/lib/api";

interface LocationSubclassificationRowProps {
  locationSubclassification: LocationSubClassification;
}

export default function LocationSubclassificationRow({
  locationSubclassification,
}: LocationSubclassificationRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {locationSubclassification.id}
      </td>
      <td className="px-3 py-2 text-sm">{locationSubclassification.name}</td>
      <td className="px-3 py-2 text-sm">
        <Link
          href={`/admin/location-classifications/${locationSubclassification.location_classification.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {locationSubclassification.location_classification.name}
        </Link>
      </td>
      <td className="px-3 py-2 text-sm capitalize">
        {locationSubclassification.location_classification.type}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          href={`/admin/transactions?location_subclassification=${locationSubclassification.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {locationSubclassification.transaction_count}
        </Link>
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(locationSubclassification.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/location-subclassifications/${locationSubclassification.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/location-subclassifications/${locationSubclassification.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
