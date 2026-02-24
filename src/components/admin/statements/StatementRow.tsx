import Link from "next/link";
import type { Statement } from "@/lib/api";

interface StatementRowProps {
  statement: Statement;
}

export default function StatementRow({ statement }: StatementRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{statement.id}</td>
      <td className="px-3 py-2 text-sm">{statement.account.name}</td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {statement.period_start ?? "—"}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{statement.period_end}</td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {statement.opening_balance ?? "—"}
      </td>
      <td className="px-3 py-2 text-sm">{statement.closing_balance}</td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/statements/${statement.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/statements/${statement.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
