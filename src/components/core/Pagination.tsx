interface PaginationProps {
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  noun?: string;
}

export default function Pagination({
  page,
  totalPages,
  totalCount,
  onPageChange,
  noun = "items",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      <span className="text-gray-500 dark:text-gray-400">
        {totalCount.toLocaleString()} {noun} — page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
