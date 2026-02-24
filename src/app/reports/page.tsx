import Link from "next/link";

const sections = [
  {
    href: "/reports/exploration",
    label: "Exploration",
    description:
      "Ad-hoc reports with flexible date range filtering. Use these to drill into specific time periods and answer questions about your finances.",
    reports: ["Cash Flow Statement"],
  },
  {
    href: "/reports/audit",
    label: "Audit",
    description:
      "Fixed-period reports spanning full calendar years. Use these for year-end review, tax preparation, and month-over-month comparison.",
    reports: ["Cash Flow Statement"],
  },
];

export default function ReportsHomePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-1">Reports</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Choose a section to get started.
      </p>

      <div className="space-y-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm transition-all"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {section.label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {section.description}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {section.reports.join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
