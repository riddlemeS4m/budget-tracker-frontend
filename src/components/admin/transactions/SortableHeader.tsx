type Props = {
  label: string;
  field: string;
  currentField: string | null;
  currentDir: "asc" | "desc";
  onSort: (field: string) => void;
};

export default function SortableHeader({ label, field, currentField, currentDir, onSort }: Props) {
  const isActive = currentField === field;

  return (
    <th
      className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200"
      onClick={() => onSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <span className="inline-flex flex-col leading-none" aria-hidden="true">
          <svg
            className={`w-2 h-2 ${isActive && currentDir === "asc" ? "text-gray-800 dark:text-gray-100" : "text-gray-300 dark:text-gray-600"}`}
            viewBox="0 0 8 5"
            fill="currentColor"
          >
            <path d="M4 0L8 5H0z" />
          </svg>
          <svg
            className={`w-2 h-2 ${isActive && currentDir === "desc" ? "text-gray-800 dark:text-gray-100" : "text-gray-300 dark:text-gray-600"}`}
            viewBox="0 0 8 5"
            fill="currentColor"
          >
            <path d="M4 5L0 0h8z" />
          </svg>
        </span>
      </span>
    </th>
  );
}
