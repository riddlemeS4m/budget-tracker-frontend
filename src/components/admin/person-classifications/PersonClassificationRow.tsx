import Link from "next/link";
import type { PersonClassification } from "@/lib/api";

interface PersonClassificationRowProps {
  personClassification: PersonClassification;
}

export default function PersonClassificationRow({
  personClassification,
}: PersonClassificationRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {personClassification.id}
      </td>
      <td className="px-3 py-2 text-sm">{personClassification.name}</td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(personClassification.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(personClassification.updated_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/person-classifications/${personClassification.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/person-classifications/${personClassification.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
