import Link from "next/link";
import type { Account } from "@/lib/api";

interface AccountRowProps {
  account: Account;
}

export default function AccountRow({ account }: AccountRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{account.id}</td>
      <td className="px-3 py-2 text-sm">{account.name}</td>
      <td className="px-3 py-2 text-sm">{account.type}</td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {account.file_upload_schema ? "Set" : "—"}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(account.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(account.updated_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/accounts/${account.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/accounts/${account.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
