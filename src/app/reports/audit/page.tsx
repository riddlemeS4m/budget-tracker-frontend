import ReportCard from "@/components/reports/ReportCard";

const reports = [
  {
    title: "Cash Flow Statement",
    description:
      "View revenues and expenses across all 12 months for a given calendar year, with YTD totals.",
    href: "/reports/audit/cash-flow-statement",
  },
  {
    title: "Account Cash Flow",
    description:
      "View revenues and expenses for a single account and calendar year, grouped by category.",
    href: "/reports/audit/account-cash-flow",
  },
];

export default function AuditIndexPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold mb-1">Audit</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Fixed-period reports spanning full calendar years. Use these for year-end
        review, tax preparation, and comparing month-over-month performance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((report) => (
          <ReportCard key={report.href} {...report} />
        ))}
      </div>
    </div>
  );
}
