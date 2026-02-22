import Link from "next/link";
import type { FileUpload } from "@/lib/api";

interface FileUploadRowProps {
  fileUpload: FileUpload;
}

export default function FileUploadRow({ fileUpload }: FileUploadRowProps) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{fileUpload.id}</td>
      <td className="px-3 py-2 text-sm">{fileUpload.filename}</td>
      <td className="px-3 py-2 text-sm">{fileUpload.status}</td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{fileUpload.account}</td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(fileUpload.created_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        {new Date(fileUpload.updated_at).toLocaleDateString()}
      </td>
      <td className="px-3 py-2 text-sm space-x-3">
        <Link
          href={`/admin/file-uploads/${fileUpload.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/admin/file-uploads/${fileUpload.id}/edit`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
