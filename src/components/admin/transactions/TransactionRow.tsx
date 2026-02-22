import Link from "next/link";
import type { Transaction } from "@/lib/api";

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-3 py-2 text-sm text-gray-500">{transaction.id}</td>
      <td className="px-3 py-2 text-sm truncate max-w-xs">
        {transaction.description ?? "—"}
      </td>
      <td className="px-3 py-2 text-sm">
        {transaction.amount != null ? transaction.amount : "—"}
      </td>
      <td className="px-3 py-2 text-sm">{transaction.category ?? "—"}</td>
      <td className="px-3 py-2 text-sm text-gray-500">
        {new Date(transaction.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500">
        {new Date(transaction.updated_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/transactions/${transaction.id}`}
          className="text-blue-600 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/transactions/${transaction.id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
