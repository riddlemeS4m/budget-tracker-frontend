import Link from "next/link";

interface ReportCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ReportCard({ title, description, href }: ReportCardProps) {
  return (
    <Link
      href={href}
      className="block p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm transition-all"
    >
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </Link>
  );
}
