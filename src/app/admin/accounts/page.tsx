"use client";

import Link from "next/link";
import { useAccounts } from "@/lib/hooks";
import AccountRow from "@/components/admin/accounts/AccountRow";

export default function AccountsListPage() {
  const { data, isLoading, isError } = useAccounts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Accounts</h1>
        <Link
          href="/admin/accounts/new"
          className="px-3 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          Add Account
        </Link>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading…</p>}
      {isError && <p className="text-sm text-red-600">Failed to load accounts.</p>}

      {data && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Schema</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
              <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((account) => (
              <AccountRow key={account.id} account={account} />
            ))}
          </tbody>
        </table>
      )}

      {data?.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">No accounts found.</p>
      )}
    </div>
  );
}
