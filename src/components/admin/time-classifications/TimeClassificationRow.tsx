import Link from "next/link";
import type { TimeClassification } from "@/lib/api";

interface TimeClassificationRowProps {
  timeClassification: TimeClassification;
}

export default function TimeClassificationRow({
  timeClassification,
}: TimeClassificationRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {timeClassification.id}
      </td>
      <td className="px-3 py-2 text-sm">{timeClassification.name}</td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(timeClassification.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(timeClassification.updated_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/time-classifications/${timeClassification.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/time-classifications/${timeClassification.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
